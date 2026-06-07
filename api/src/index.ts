export interface Env {
	DB: D1Database;
	ADMIN_PASSWORD: string;
	JWT_SECRET: string;
	AI: Ai;
}

const cors = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(data: unknown, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { "Content-Type": "application/json", ...cors },
	});
}

// ── JWT (HS256 via Web Crypto) ───────────────────────────────────────────────

async function sign(payload: object, secret: string): Promise<string> {
	const key = await crypto.subtle.importKey(
		"raw", new TextEncoder().encode(secret),
		{ name: "HMAC", hash: "SHA-256" }, false, ["sign"]
	);
	const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
	const body = btoa(JSON.stringify(payload));
	const data = `${header}.${body}`;
	const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
	const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)))
		.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
	return `${data}.${sigB64}`;
}

async function verify(token: string, secret: string): Promise<boolean> {
	try {
		const [header, body, sig] = token.split(".");
		const key = await crypto.subtle.importKey(
			"raw", new TextEncoder().encode(secret),
			{ name: "HMAC", hash: "SHA-256" }, false, ["verify"]
		);
		const sigBytes = Uint8Array.from(atob(sig.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
		const valid = await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(`${header}.${body}`));
		if (!valid) return false;
		const { exp } = JSON.parse(atob(body));
		return Date.now() < exp;
	} catch { return false; }
}

async function requireAuth(request: Request, env: Env): Promise<Response | null> {
	const auth = request.headers.get("Authorization") ?? "";
	const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
	if (!token || !(await verify(token, env.JWT_SECRET))) {
		return json({ error: "Unauthorized" }, 401);
	}
	return null;
}

// ── D1-backed rate limiter ───────────────────────────────────────────────────

async function checkRateLimit(ip: string, db: D1Database, opts: { limit: number, period: number, lockout: number, prefix?: string }): Promise<{ allowed: boolean, timeLeft?: number }> {
	const key = opts.prefix ? `${opts.prefix}${ip}` : ip;
	const now = Date.now();

	const row = await db.prepare(
		"SELECT count, last_attempt, locked_until FROM login_attempts WHERE ip = ?"
	).bind(key).first<{ count: number, last_attempt: number, locked_until: number }>();

	const rec = row ?? { count: 0, last_attempt: 0, locked_until: 0 };

	if (rec.locked_until > now) {
		return { allowed: false, timeLeft: rec.locked_until - now };
	}

	const count = (now - rec.last_attempt > opts.period) ? 1 : rec.count + 1;
	const locked_until = count > opts.limit ? now + opts.lockout : 0;
	const finalCount = count > opts.limit ? 0 : count;

	await db.prepare(
		"INSERT INTO login_attempts (ip, count, last_attempt, locked_until) VALUES (?,?,?,?) " +
		"ON CONFLICT(ip) DO UPDATE SET count=excluded.count, last_attempt=excluded.last_attempt, locked_until=excluded.locked_until"
	).bind(key, finalCount, now, locked_until).run();

	if (locked_until > 0) return { allowed: false, timeLeft: opts.lockout };
	return { allowed: true };
}

// ── Handler ──────────────────────────────────────────────────────────────────

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === "OPTIONS") return new Response(null, { headers: cors });

		const { pathname } = new URL(request.url);
		const method = request.method;

		try {
			// Login
			if (pathname === "/admin/login" && method === "POST") {
				const ip = request.headers.get("CF-Connecting-IP") || "unknown";
				const { allowed, timeLeft } = await checkRateLimit(ip, env.DB, { limit: 5, period: 15 * 60 * 1000, lockout: 15 * 60 * 1000 });

				if (!allowed) {
					return json({ error: `Too many login attempts. Please try again in ${Math.ceil(timeLeft! / 1000 / 60)} minutes.` }, 429);
				}

				const { password } = await request.json() as any;
				if (password !== env.ADMIN_PASSWORD) {
					return json({ error: "Invalid password" }, 401);
				}
				const token = await sign({ sub: "admin", exp: Date.now() + 8 * 60 * 60 * 1000, iat: Math.floor(Date.now() / 1000), iss: "aesthetix-api" }, env.JWT_SECRET);
				return json({ token });
			}

			// Projects (public read)
			if (pathname === "/api/projects" && method === "GET") {
				const { results } = await env.DB.prepare(
					"SELECT * FROM projects ORDER BY is_featured DESC, created_at DESC"
				).all();
				return json(results.map(p => ({
					...p,
					details: (() => { try { return JSON.parse(p.details as string); } catch { return []; } })(),
				})));
			}

			if (pathname === "/api/projects" && method === "POST") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const b: any = await request.json();
				const id = crypto.randomUUID();
				await env.DB.prepare(
					"INSERT INTO projects (id, title, slug, category, summary, result, year, image, details, is_featured) VALUES (?,?,?,?,?,?,?,?,?,?)"
				).bind(id, b.title, b.slug, b.category ?? null, b.summary ?? null, b.result ?? null, b.year ?? null, b.image ?? null, JSON.stringify(b.details ?? []), b.is_featured ? 1 : 0).run();
				return json({ success: true, id }, 201);
			}

			const slugMatch = pathname.match(/^\/api\/projects\/([^/]+)$/);
			if (slugMatch) {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const slug = slugMatch[1];
				if (method === "PUT") {
					const b: any = await request.json();
					await env.DB.prepare(
						"UPDATE projects SET title=?, category=?, summary=?, result=?, year=?, image=?, details=?, is_featured=? WHERE slug=?"
					).bind(b.title, b.category ?? null, b.summary ?? null, b.result ?? null, b.year ?? null, b.image ?? null, JSON.stringify(b.details ?? []), b.is_featured ? 1 : 0, slug).run();
					return json({ success: true });
				}
				if (method === "DELETE") {
					await env.DB.prepare("DELETE FROM projects WHERE slug=?").bind(slug).run();
					return json({ success: true });
				}
			}

			// Leads (public submit)
			if (pathname === "/api/leads" && method === "POST") {
				const b: any = await request.json();
				if (!b.email) return json({ error: "Email is required" }, 400);
				const id = crypto.randomUUID();
				await env.DB.prepare(
					"INSERT INTO leads (id, name, email, company, budget, project_details) VALUES (?,?,?,?,?,?)"
				).bind(id, b.name || b.email.split("@")[0], b.email, b.company ?? null, b.budget ?? null, b.project_details ?? null).run();
				return json({ success: true, id }, 201);
			}

			if (pathname === "/api/leads" && method === "GET") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const { results } = await env.DB.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
				return json(results);
			}

			const leadStatusMatch = pathname.match(/^\/api\/leads\/([^/]+)\/status$/);
			if (leadStatusMatch && method === "PUT") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const { status }: any = await request.json();
				await env.DB.prepare("UPDATE leads SET status=? WHERE id=?").bind(status, leadStatusMatch[1]).run();
				return json({ success: true });
			}

			// Blog posts (public read)
			if (pathname === "/api/posts" && method === "GET") {
				const { results } = await env.DB.prepare(
					"SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC"
				).all();
				return json(results);
			}

			if (pathname === "/api/posts" && method === "POST") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const b: any = await request.json();
				if (!b.title || !b.content) return json({ error: "Title and content are required" }, 400);
				const id = crypto.randomUUID();
				const slug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
				await env.DB.prepare(
					"INSERT INTO posts (id, title, slug, excerpt, content, cover_image, seo_title, seo_description, published) VALUES (?,?,?,?,?,?,?,?,?)"
				).bind(id, b.title, slug, b.excerpt ?? null, b.content, b.cover_image ?? null, b.seo_title ?? null, b.seo_description ?? null, b.published ? 1 : 0).run();
				return json({ success: true, id, slug }, 201);
			}

			const postSlugMatch = pathname.match(/^\/api\/posts\/([^/]+)$/);
			if (postSlugMatch) {
				const slug = postSlugMatch[1];

				if (method === "GET") {
					const post = await env.DB.prepare(
						"SELECT * FROM posts WHERE slug = ? AND published = 1"
					).bind(slug).first();
					if (!post) return json({ error: "Post not found" }, 404);
					return json(post);
				}

				const denied = await requireAuth(request, env);
				if (denied) return denied;

				if (method === "PUT") {
					const b: any = await request.json();
					const newSlug = b.slug || b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
					await env.DB.prepare(
						"UPDATE posts SET title=?, slug=?, excerpt=?, content=?, cover_image=?, seo_title=?, seo_description=?, published=?, updated_at=datetime('now') WHERE slug=?"
					).bind(b.title, newSlug, b.excerpt ?? null, b.content, b.cover_image ?? null, b.seo_title ?? null, b.seo_description ?? null, b.published ? 1 : 0, slug).run();
					return json({ success: true });
				}

				if (method === "DELETE") {
					await env.DB.prepare("DELETE FROM posts WHERE slug=?").bind(slug).run();
					return json({ success: true });
				}
			}

			// Admin posts (auth required, includes drafts)
			if (pathname === "/api/admin/posts" && method === "GET") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const { results } = await env.DB.prepare(
					"SELECT * FROM posts ORDER BY created_at DESC"
				).all();
				return json(results);
			}

			// Case studies (public read)
			if (pathname === "/api/case-studies" && method === "GET") {
				const { results } = await env.DB.prepare(
					"SELECT * FROM case_studies WHERE published = 1 ORDER BY created_at DESC"
				).all();
				return json(results);
			}

			if (pathname === "/api/case-studies" && method === "POST") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const b: any = await request.json();
				if (!b.client || !b.challenge || !b.process || !b.results) return json({ error: "Client, challenge, process, and results are required" }, 400);
				const id = crypto.randomUUID();
				const slug = b.slug || b.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
				await env.DB.prepare(
					"INSERT INTO case_studies (id, client, slug, challenge, process, results, cover_image, category, year, published) VALUES (?,?,?,?,?,?,?,?,?,?)"
				).bind(id, b.client, slug, b.challenge, b.process, b.results, b.cover_image ?? null, b.category ?? null, b.year ?? null, b.published ? 1 : 0).run();
				return json({ success: true, id, slug }, 201);
			}

			const csSlugMatch = pathname.match(/^\/api\/case-studies\/([^/]+)$/);
			if (csSlugMatch) {
				const slug = csSlugMatch[1];

				if (method === "GET") {
					const cs = await env.DB.prepare(
						"SELECT * FROM case_studies WHERE slug = ? AND published = 1"
					).bind(slug).first();
					if (!cs) return json({ error: "Case study not found" }, 404);
					return json(cs);
				}

				const denied = await requireAuth(request, env);
				if (denied) return denied;

				if (method === "PUT") {
					const b: any = await request.json();
					const newSlug = b.slug || b.client.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
					await env.DB.prepare(
						"UPDATE case_studies SET client=?, slug=?, challenge=?, process=?, results=?, cover_image=?, category=?, year=?, published=?, updated_at=datetime('now') WHERE slug=?"
					).bind(b.client, newSlug, b.challenge, b.process, b.results, b.cover_image ?? null, b.category ?? null, b.year ?? null, b.published ? 1 : 0, slug).run();
					return json({ success: true });
				}

				if (method === "DELETE") {
					await env.DB.prepare("DELETE FROM case_studies WHERE slug=?").bind(slug).run();
					return json({ success: true });
				}
			}

			// Admin case studies (auth required, includes drafts)
			if (pathname === "/api/admin/case-studies" && method === "GET") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const { results } = await env.DB.prepare(
					"SELECT * FROM case_studies ORDER BY created_at DESC"
				).all();
				return json(results);
			}

			// AI Proposal Generator (auth required + rate limited)
			if (pathname === "/api/admin/generate-proposal" && method === "POST") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const ip = request.headers.get("CF-Connecting-IP") || "unknown";
				const { allowed, timeLeft } = await checkRateLimit(ip, env.DB, { limit: 10, period: 60 * 60 * 1000, lockout: 60 * 60 * 1000, prefix: "ai:" });
				if (!allowed) return json({ error: `AI rate limit exceeded. Try again in ${Math.ceil(timeLeft! / 1000 / 60)} minutes.` }, 429);
				const { clientName, projectType, requirements, budget, timeline } = await request.json() as any;
				if (!clientName || !projectType || !requirements) return json({ error: "Client name, project type, and requirements are required" }, 400);

				const prompt = `You are a senior project manager at Aesthetix Studio, a premium digital agency. Generate a professional project proposal based on these details:

Client: ${clientName}
Project Type: ${projectType}
Requirements: ${requirements}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}

Generate a structured proposal with:
1. Executive Summary (2-3 sentences)
2. Project Scope (detailed breakdown)
3. Proposed Solution (approach and methodology)
4. Milestones (4-6 phases with deliverables)
5. Timeline (suggested weeks per phase)
6. Investment (budget breakdown by phase)
7. Why Aesthetix Studio (value proposition)

Format as clean markdown. Be specific, professional, and compelling.`;

				const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
					messages: [{ role: "user", content: prompt }],
				});

				return json({ proposal: response.response });
			}

			// AI Content Assistant (auth required + rate limited)
			if (pathname === "/api/admin/generate-draft" && method === "POST") {
				const denied = await requireAuth(request, env);
				if (denied) return denied;
				const ip = request.headers.get("CF-Connecting-IP") || "unknown";
				const { allowed: aiAllowed, timeLeft: aiTimeLeft } = await checkRateLimit(ip, env.DB, { limit: 10, period: 60 * 60 * 1000, lockout: 60 * 60 * 1000, prefix: "ai:" });
				if (!aiAllowed) return json({ error: `AI rate limit exceeded. Try again in ${Math.ceil(aiTimeLeft! / 1000 / 60)} minutes.` }, 429);
				const { topic, tone, length } = await request.json() as any;
				if (!topic) return json({ error: "Topic is required" }, 400);

				const prompt = `You are a content strategist and writer for Aesthetix Studio, a premium digital agency specializing in UI/UX design, web development, and AI solutions. Write a blog post draft about: ${topic}

Tone: ${tone || "professional yet approachable"}
Length: ${length || "medium"} (short = 400 words, medium = 800 words, long = 1200 words)

Write in markdown format with:
- A compelling title
- An engaging introduction hook
- Clear sections with h2/h3 headings
- Practical insights and actionable advice
- A conclusion with a call to action

Include a 1-2 sentence excerpt at the very beginning (separated by ---) that can be used as a meta description.

Be specific, avoid fluff, and write like an expert practitioner — not a content mill.`;

				const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
					messages: [{ role: "user", content: prompt }],
				});

				return json({ draft: response.response });
			}

			return json({ error: "Not Found" }, 404);
		} catch (e: any) {
			return json({ error: e.message ?? "Internal Server Error" }, 500);
		}
	},
};