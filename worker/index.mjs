const json = (data, init = {}) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json", ...corsHeaders, ...(init.headers ?? {}) },
    status: init.status ?? 200,
  });

const readJson = async (request) => {
  try {
    return await request.json();
  } catch {
    return null;
  }
};

const validate = (body, rules) => {
  const errors = {};
  const values = {};

  for (const [key, rule] of Object.entries(rules)) {
    const value = body?.[key];
    const stringValue = typeof value === "string" ? value.trim() : "";

    if (rule.required && !stringValue) {
      errors[key] = `${rule.label} is required`;
      continue;
    }

    if (stringValue && rule.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
      errors[key] = `Enter a valid ${rule.label.toLowerCase()}`;
      continue;
    }

    values[key] = stringValue || null;
  }

  return { ok: Object.keys(errors).length === 0, errors, values };
};

const formatObjectPath = (value) => String(value ?? "").replace(/^\/+/, "");

const getBearerToken = (request) => {
  const header = request.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  return scheme?.toLowerCase() === "bearer" ? token : null;
};

const getSupabaseAuthConfig = (env) => ({
  issuer: env.SUPABASE_URL ? `${env.SUPABASE_URL.replace(/\/$/, "")}/auth/v1` : null,
  jwksUrl: env.SUPABASE_JWKS_URL ?? null,
});

async function verifySupabaseToken(request, env) {
  const token = getBearerToken(request);
  if (!token) return { ok: false, status: 401, error: "Missing bearer token" };

  const { issuer, jwksUrl } = getSupabaseAuthConfig(env);
  if (!issuer || !jwksUrl) {
    return { ok: false, status: 500, error: "Supabase auth is not configured" };
  }

  const { createRemoteJWKSet, jwtVerify } = await import("jose");
  const JWKS = createRemoteJWKSet(new URL(jwksUrl));

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer,
      audience: "authenticated",
    });

    return { ok: true, payload };
  } catch (error) {
    return { ok: false, status: 401, error: "Invalid token" };
  }
}

const leadToRow = (lead) => {
  const sourceLabel = {
    CONTACT: "Website",
    DISCOVERY_CALL: "Discovery Call",
    PROJECT_INQUIRY: "Project Brief",
  }[lead.source] ?? lead.source;

  const name = lead.source === "DISCOVERY_CALL"
    ? lead.first_name
    : `${lead.first_name} ${lead.last_name ?? ""}`.trim();

  const status = lead.source === "DISCOVERY_CALL" ? "Hot" : "Warm";

  return {
    id: lead.id,
    name,
    company: lead.company ?? "—",
    email: lead.email,
    phone: "—",
    service: lead.service ?? "—",
    budget: lead.budget ?? "—",
    status,
    source: sourceLabel,
    date: lead.created_at,
    notes: lead.message ?? lead.project_summary ?? lead.inspiration ?? "—",
  };
};

const formatCurrency = (amountCents) => {
  const amount = Number(amountCents ?? 0) / 100;
  return amount.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
};

const invoiceToRow = (invoice) => ({
  id: invoice.id,
  client: invoice.client,
  project: invoice.project,
  amountCents: invoice.amount_cents,
  amount: formatCurrency(invoice.amount_cents),
  status: invoice.status,
  issued: invoice.issued_at,
  due: invoice.due_at,
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-file-name, x-object-key",
};

const logNotification = async (env, type, recipient, subject, body) => {
  try {
    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO notification_log (id, type, recipient, subject, body, status, created_at) VALUES (?, ?, ?, ?, ?, 'sent', datetime('now'))`
    ).bind(id, type, recipient, subject, body).run();
  } catch {}
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const protectedRequest = async () => {
      const auth = await verifySupabaseToken(request, env);
      if (!auth.ok) return auth;
      return auth;
    };

    if (request.method === "GET" && url.pathname === "/health") {
      return json({ ok: true, service: "aesthetix-worker", timestamp: new Date().toISOString() });
    }

    if (request.method === "GET" && url.pathname === "/api/leads") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, source, first_name, last_name, email, company, service, budget, message, day, time, project_summary, inspiration, start_date, created_at
         FROM lead_submissions
         ORDER BY created_at DESC`
      ).all();

      return json({ ok: true, leads: results.map(leadToRow) });
    }

    if (request.method === "GET" && url.pathname.startsWith("/api/leads/")) {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const id = url.pathname.split("/").pop();
      if (!id) return json({ ok: false, error: "Missing lead id" }, { status: 400 });

      const lead = await env.DB.prepare(
        `SELECT id, source, first_name, last_name, email, company, service, budget, message, day, time, project_summary, inspiration, start_date, created_at
         FROM lead_submissions
         WHERE id = ?`
      ).bind(id).first();

      if (!lead) return json({ ok: false, error: "Lead not found" }, { status: 404 });

      return json({ ok: true, lead: leadToRow(lead) });
    }

    if (request.method === "GET" && url.pathname === "/api/auth/me") {
      const auth = await verifySupabaseToken(request, env);
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      return json({
        ok: true,
        user: {
          id: auth.payload.sub ?? null,
          email: auth.payload.email ?? null,
          role: auth.payload.app_metadata?.role ?? auth.payload.user_role ?? "authenticated",
        },
      });
    }

    if (request.method === "GET" && url.pathname === "/api/uploads") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const supabaseUrl = env.SUPABASE_URL;
      const supabaseKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
      const supabaseBucket = env.SUPABASE_STORAGE_BUCKET;

      if (!supabaseUrl || !supabaseKey || !supabaseBucket) {
        return json({ ok: false, error: "Supabase storage is not configured" }, { status: 500 });
      }

      const listUrl = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/list/${supabaseBucket}`;
      const response = await fetch(listUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${supabaseKey}`,
          "apikey": supabaseKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prefix: "", limit: 100, offset: 0, sortBy: { column: "name", order: "desc" } }),
      });

      if (!response.ok) {
        const text = await response.text();
        return json({ ok: false, error: "Supabase list failed", details: text }, { status: 502 });
      }

      const objects = await response.json();
      const files = Array.isArray(objects)
        ? objects.map((object) => ({
            name: object.name,
            key: formatObjectPath(object.name),
            updatedAt: object.updated_at ?? object.created_at ?? null,
            size: object.metadata?.size ?? null,
            url: `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${supabaseBucket}/${encodeURIComponent(object.name)}`,
          }))
        : [];

      return json({ ok: true, files });
    }

    if (request.method === "GET" && url.pathname === "/api/invoices") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, client, project, amount_cents, status, issued_at, due_at
         FROM invoices
         ORDER BY due_at DESC, created_at DESC`
      ).all();

      const invoices = results.map(invoiceToRow);
      const summary = invoices.reduce(
        (acc, invoice) => {
          acc.total += invoice.amountCents;
          if (invoice.status === "Paid") acc.paid += invoice.amountCents;
          else acc.outstanding += invoice.amountCents;
          return acc;
        },
        { total: 0, paid: 0, outstanding: 0 }
      );

      return json({
        ok: true,
        invoices,
        summary: {
          total: formatCurrency(summary.total),
          paid: formatCurrency(summary.paid),
          outstanding: formatCurrency(summary.outstanding),
        },
      });
    }

    if (request.method === "POST" && url.pathname.startsWith("/api/invoices/") && url.pathname.endsWith("/order")) {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const parts = url.pathname.split("/");
      const id = parts[parts.length - 2];
      if (!id) return json({ ok: false, error: "Missing invoice id" }, { status: 400 });

      const invoice = await env.DB.prepare(
        `SELECT id, client, project, amount_cents, status FROM invoices WHERE id = ?`
      ).bind(id).first();

      if (!invoice) return json({ ok: false, error: "Invoice not found" }, { status: 404 });
      if (invoice.status === "Paid") return json({ ok: false, error: "Invoice already paid" }, { status: 400 });

      const razorpayKeyId = env.RAZORPAY_KEY_ID;
      const razorpayKeySecret = env.RAZORPAY_KEY_SECRET;
      if (!razorpayKeyId || !razorpayKeySecret) {
        return json({ ok: false, error: "Razorpay is not configured" }, { status: 500 });
      }

      const authHeader = "Basic " + btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
      const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: invoice.amount_cents,
          currency: "INR",
          receipt: `inv_${invoice.id}`,
          notes: { invoiceId: invoice.id, client: invoice.client, project: invoice.project },
        }),
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.text();
        return json({ ok: false, error: "Failed to create Razorpay order", details: error }, { status: 502 });
      }

      const order = await orderResponse.json();
      return json({ ok: true, orderId: order.id, amount: order.amount, currency: order.currency, keyId: razorpayKeyId });
    }

    if (request.method === "POST" && url.pathname === "/api/orders") {
      const body = await readJson(request);
      const { amount, currency = "INR", plan, receipt } = body ?? {};
      if (!amount || amount <= 0) return json({ ok: false, error: "Invalid amount" }, { status: 400 });

      const razorpayKeyId = env.RAZORPAY_KEY_ID;
      const razorpayKeySecret = env.RAZORPAY_KEY_SECRET;
      if (!razorpayKeyId || !razorpayKeySecret) {
        return json({ ok: false, error: "Razorpay is not configured" }, { status: 500 });
      }

      const authHeader = "Basic " + btoa(`${razorpayKeyId}:${razorpayKeySecret}`);
      const orderResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Authorization": authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: receipt || `order_${crypto.randomUUID().slice(0, 8)}`,
          notes: { plan: plan ?? "custom" },
        }),
      });

      if (!orderResponse.ok) {
        const error = await orderResponse.text();
        return json({ ok: false, error: "Failed to create order", details: error }, { status: 502 });
      }

      const order = await orderResponse.json();
      return json({ ok: true, orderId: order.id, amount: order.amount, currency: order.currency, keyId: razorpayKeyId });
    }

    if (request.method === "POST" && url.pathname === "/api/payments/verify") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const body = await readJson(request);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, invoiceId } = body ?? {};
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return json({ ok: false, error: "Missing payment verification fields" }, { status: 400 });
      }

      const razorpayKeySecret = env.RAZORPAY_KEY_SECRET;
      if (!razorpayKeySecret) {
        return json({ ok: false, error: "Razorpay is not configured" }, { status: 500 });
      }

      const crypto = await import("crypto");
      const expectedSignature = crypto
        .createHmac("sha256", razorpayKeySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        return json({ ok: false, error: "Invalid payment signature" }, { status: 400 });
      }

      if (invoiceId) {
        await env.DB.prepare(
          `UPDATE invoices SET status = 'Paid', razorpay_order_id = ?, razorpay_payment_id = ? WHERE id = ?`
        ).bind(razorpay_order_id, razorpay_payment_id, invoiceId).run();
      }

      return json({ ok: true, message: "Payment verified successfully", paymentId: razorpay_payment_id });
    }

    if (request.method === "POST" && url.pathname.startsWith("/api/invoices/") && url.pathname.endsWith("/pay")) {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const parts = url.pathname.split("/");
      const id = parts[parts.length - 2];
      if (!id) return json({ ok: false, error: "Missing invoice id" }, { status: 400 });

      const invoice = await env.DB.prepare(
        `SELECT id, status FROM invoices WHERE id = ?`
      ).bind(id).first();

      if (!invoice) return json({ ok: false, error: "Invoice not found" }, { status: 404 });

      await env.DB.prepare(
        `UPDATE invoices SET status = 'Paid' WHERE id = ?`
      ).bind(id).run();

      return json({ ok: true, message: "Payment processed successfully" });
    }


    if (request.method === "POST" && url.pathname === "/api/contact") {
      const body = await readJson(request);
      const result = validate(body, {
        firstName: { required: true, label: "First name" },
        lastName: { required: true, label: "Last name" },
        email: { required: true, label: "Email", email: true },
        message: { required: true, label: "Message" },
        company: { required: false, label: "Company" },
        service: { required: false, label: "Service" },
        budget: { required: false, label: "Budget" },
      });
      if (!result.ok) return json({ ok: false, error: "Validation failed", issues: result.errors }, { status: 400 });

      const id = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO lead_submissions (id, source, first_name, last_name, email, company, service, budget, message, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
      ).bind(
        id,
        "CONTACT",
        result.values.firstName,
        result.values.lastName,
        result.values.email,
        result.values.company,
        result.values.service,
        result.values.budget,
        result.values.message
      ).run();

      await logNotification(env, "LEAD_CONTACT", "hello@aesthetix.studio",
        `New contact form submission from ${result.values.firstName} ${result.values.lastName}`,
        `${result.values.firstName} from ${result.values.company || 'Unknown'} submitted a contact form. Service: ${result.values.service || 'Not specified'}. Budget: ${result.values.budget || 'Not specified'}.`
      );

      return json({ ok: true, id });
    }

    if (request.method === "POST" && url.pathname === "/api/discovery-calls") {
      const body = await readJson(request);
      const result = validate(body, {
        name: { required: true, label: "Name" },
        email: { required: true, label: "Email", email: true },
        day: { required: true, label: "Day" },
        time: { required: true, label: "Time" },
      });
      if (!result.ok) return json({ ok: false, error: "Validation failed", issues: result.errors }, { status: 400 });

      const id = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO lead_submissions (id, source, first_name, last_name, email, day, time, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`
      ).bind(id, "DISCOVERY_CALL", result.values.name, null, result.values.email, result.values.day, result.values.time).run();

      return json({ ok: true, id });
    }

    if (request.method === "POST" && url.pathname === "/api/inquiries") {
      const body = await readJson(request);
      const result = validate(body, {
        firstName: { required: true, label: "First name" },
        lastName: { required: true, label: "Last name" },
        email: { required: true, label: "Email", email: true },
        projectSummary: { required: true, label: "Project summary" },
        company: { required: false, label: "Company" },
        service: { required: false, label: "Service" },
        budget: { required: false, label: "Budget" },
        inspiration: { required: false, label: "Inspiration" },
        startDate: { required: false, label: "Start date" },
      });
      if (!result.ok) return json({ ok: false, error: "Validation failed", issues: result.errors }, { status: 400 });

      const id = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO lead_submissions (id, source, first_name, last_name, email, company, service, budget, project_summary, inspiration, start_date, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
      ).bind(
        id,
        "PROJECT_INQUIRY",
        result.values.firstName,
        result.values.lastName,
        result.values.email,
        result.values.company,
        result.values.service,
        result.values.budget,
        result.values.projectSummary,
        result.values.inspiration,
        result.values.startDate
      ).run();

      return json({ ok: true, id });
    }

    if (request.method === "POST" && url.pathname === "/api/uploads") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const contentType = request.headers.get("content-type") ?? "";
      if (!contentType.startsWith("application/octet-stream")) {
        return json({ ok: false, error: "Upload must use application/octet-stream" }, { status: 400 });
      }

      const fileName = request.headers.get("x-file-name")?.trim();
      const objectKey = request.headers.get("x-object-key")?.trim() || `${crypto.randomUUID()}-${fileName || "upload.bin"}`;
      const supabaseUrl = env.SUPABASE_URL;
      const supabaseKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
      const supabaseBucket = env.SUPABASE_STORAGE_BUCKET;

      if (!supabaseUrl || !supabaseKey || !supabaseBucket) {
        return json({
          ok: false,
          error: "Supabase storage is not configured",
        }, { status: 500 });
      }

      const body = await request.arrayBuffer();
      if (!body.byteLength) {
        return json({ ok: false, error: "Empty upload" }, { status: 400 });
      }

      const uploadUrl = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/${supabaseBucket}/${encodeURIComponent(objectKey)}`;
      const uploadResponse = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${supabaseKey}`,
          "apikey": supabaseKey,
          "Content-Type": contentType,
          "x-upsert": "true",
        },
        body,
      });

      if (!uploadResponse.ok) {
        const text = await uploadResponse.text();
        return json({
          ok: false,
          error: "Supabase upload failed",
          details: text,
        }, { status: 502 });
      }

      return json({ ok: true, key: objectKey });
    }

    if (request.method === "POST" && url.pathname === "/api/newsletter") {
      const body = await readJson(request);
      const result = validate(body, {
        email: { required: true, label: "Email", email: true },
      });
      if (!result.ok) return json({ ok: false, error: "Validation failed", issues: result.errors }, { status: 400 });

      const id = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO lead_submissions (id, source, email, created_at)
         VALUES (?, ?, ?, datetime('now'))`
      ).bind(id, "NEWSLETTER", result.values.email).run();

      return json({ ok: true, id });
    }

    // ── Team endpoints ─────────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/team") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, name, role, email, avatar, color, status, created_at FROM team_members ORDER BY created_at DESC`
      ).all();

      return json({ ok: true, team: results });
    }

    if (request.method === "POST" && url.pathname === "/api/team") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const body = await readJson(request);
      const result = validate(body, {
        name: { required: true, label: "Name" },
        role: { required: true, label: "Role" },
        email: { required: true, label: "Email", email: true },
      });
      if (!result.ok) return json({ ok: false, error: "Validation failed", issues: result.errors }, { status: 400 });

      const id = crypto.randomUUID();
      const initials = result.values.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
      const colors = ["#6150F6","#F59E0B","#EC4899","#10B981","#3B82F6","#EF4444"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      await env.DB.prepare(
        `INSERT INTO team_members (id, name, role, email, avatar, color, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'Active', datetime('now'))`
      ).bind(id, result.values.name, result.values.role, result.values.email, initials, color).run();

      return json({ ok: true, id });
    }

    // ── Client endpoints ───────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/clients") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, name, contact_name, email, phone, plan, status, joined_at, project_count, total_spend_cents FROM clients ORDER BY created_at DESC`
      ).all();

      return json({ ok: true, clients: results.map((c) => ({
        id: c.id, name: c.name, contact: c.contact_name, email: c.email, phone: c.phone ?? "—",
        plan: c.plan ?? "Starter", status: c.status ?? "Active", joined: c.joined_at ?? "—",
        projects: c.project_count ?? 0, spend: formatCurrency(c.total_spend_cents),
      }))});
    }

    // ── Project endpoints ──────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/projects") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, name, client, status, progress, due_date, type, budget, priority, created_at FROM projects ORDER BY created_at DESC`
      ).all();

      return json({ ok: true, projects: results.map((p) => ({
        id: p.id, name: p.name, client: p.client ?? "—", status: p.status ?? "Discovery",
        progress: p.progress ?? 0, dueDate: p.due_date ?? "—", type: p.type ?? "—",
        budget: p.budget ?? "—", priority: p.priority ?? "Medium",
      }))});
    }

    // ── Task endpoints ─────────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/tasks") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, title, project, assignee, due_date, priority, status, created_at FROM tasks ORDER BY created_at DESC`
      ).all();

      return json({ ok: true, tasks: results.map((t) => ({
        id: t.id, title: t.title, project: t.project ?? "—", assignee: t.assignee ?? "—",
        due: t.due_date ?? "—", priority: t.priority ?? "Medium", status: t.status ?? "To Do",
      }))});
    }

    // ── Message endpoints ──────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/messages") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, from_name, from_avatar, from_color, project, preview, sent_at, unread FROM messages ORDER BY sent_at DESC`
      ).all();

      return json({ ok: true, messages: results.map((m) => ({
        id: m.id, from: m.from_name, avatar: m.from_avatar, color: m.from_color ?? "#6150F6",
        project: m.project ?? "—", preview: m.preview ?? "", time: m.sent_at ?? "—", unread: m.unread === 1,
      }))});
    }

    if (request.method === "POST" && url.pathname === "/api/messages") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const body = await readJson(request);
      const result = validate(body, {
        to_name: { required: true, label: "Recipient" },
        project: { required: true, label: "Project" },
        text: { required: true, label: "Message" },
      });
      if (!result.ok) return json({ ok: false, error: "Validation failed", issues: result.errors }, { status: 400 });

      const id = crypto.randomUUID();
      const userName = auth.payload.email ?? "User";
      await env.DB.prepare(
        `INSERT INTO messages (id, from_name, from_avatar, from_color, project, preview, sent_at, unread)
         VALUES (?, ?, ?, ?, ?, ?, datetime('now'), 1)`
      ).bind(id, userName, userName[0]?.toUpperCase() ?? "U", "#6150F6", result.values.project, result.values.text.slice(0, 200)).run();

      await logNotification(env, "NEW_MESSAGE", result.values.to_name,
        `New message from ${userName} re: ${result.values.project}`,
        result.values.text.slice(0, 500)
      );

      return json({ ok: true, id });
    }

    // ── Settings endpoints ─────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/settings") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const settings = await env.DB.prepare(
        `SELECT key, value FROM studio_settings`
      ).all();

      const map = {};
      for (const row of settings.results ?? []) {
        try { map[row.key] = JSON.parse(row.value); } catch { map[row.key] = row.value; }
      }

      return json({ ok: true, settings: map });
    }

    if (request.method === "PUT" && url.pathname === "/api/settings") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const body = await readJson(request);
      if (!body || typeof body !== "object") return json({ ok: false, error: "Invalid body" }, { status: 400 });

      const stmt = env.DB.prepare(
        `INSERT INTO studio_settings (key, value, updated_at) VALUES (?, ?, datetime('now'))
         ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`
      );

      const batch = Object.entries(body).map(([key, value]) =>
        stmt.bind(key, typeof value === "string" ? value : JSON.stringify(value))
      );

      await env.DB.batch(batch);
      return json({ ok: true });
    }

    // ── Blog endpoints ─────────────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/blog") {
      const { results } = await env.DB.prepare(
        `SELECT id, slug, title, excerpt, category, author, read_time, gradient, created_at FROM blog_posts ORDER BY created_at DESC`
      ).all();

      return json({ ok: true, posts: results });
    }

    if (request.method === "GET" && url.pathname.startsWith("/api/blog/")) {
      const slug = url.pathname.split("/api/blog/")[1];
      if (!slug) return json({ ok: false, error: "Missing slug" }, { status: 400 });

      const post = await env.DB.prepare(
        `SELECT id, slug, title, excerpt, content, category, author, author_role, read_time, gradient, created_at FROM blog_posts WHERE slug = ?`
      ).bind(slug).first();

      if (!post) return json({ ok: false, error: "Post not found" }, { status: 404 });
      return json({ ok: true, post });
    }

    if (request.method === "POST" && url.pathname === "/api/blog") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const body = await readJson(request);
      const result = validate(body, {
        slug: { required: true, label: "Slug" },
        title: { required: true, label: "Title" },
        excerpt: { required: true, label: "Excerpt" },
        content: { required: true, label: "Content" },
        category: { required: false, label: "Category" },
        author: { required: false, label: "Author" },
      });
      if (!result.ok) return json({ ok: false, error: "Validation failed", issues: result.errors }, { status: 400 });

      const id = crypto.randomUUID();
      await env.DB.prepare(
        `INSERT INTO blog_posts (id, slug, title, excerpt, content, category, author, read_time, gradient, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, '5 min', 'from-violet-400 to-purple-600', datetime('now'))`
      ).bind(id, result.values.slug, result.values.title, result.values.excerpt, result.values.content, result.values.category ?? "General", result.values.author ?? "Aesthetix Studio").run();

      return json({ ok: true, id });
    }

    // ── Blog edit/delete ──────────────────────────────────────
    if (request.method === "PUT" && url.pathname.startsWith("/api/blog/")) {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const slug = url.pathname.split("/api/blog/")[1];
      if (!slug) return json({ ok: false, error: "Missing slug" }, { status: 400 });

      const body = await readJson(request);
      if (!body || typeof body !== "object") return json({ ok: false, error: "Invalid body" }, { status: 400 });

      const fields: string[] = [];
      const binds: unknown[] = [];
      if (body.title) { fields.push("title = ?"); binds.push(body.title); }
      if (body.excerpt) { fields.push("excerpt = ?"); binds.push(body.excerpt); }
      if (body.content) { fields.push("content = ?"); binds.push(body.content); }
      if (body.category) { fields.push("category = ?"); binds.push(body.category); }
      if (body.author) { fields.push("author = ?"); binds.push(body.author); }

      if (fields.length === 0) return json({ ok: false, error: "No fields to update" }, { status: 400 });

      binds.push(slug);
      await env.DB.prepare(`UPDATE blog_posts SET ${fields.join(", ")} WHERE slug = ?`).bind(...binds).run();
      return json({ ok: true });
    }

    if (request.method === "DELETE" && url.pathname.startsWith("/api/blog/")) {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const slug = url.pathname.split("/api/blog/")[1];
      if (!slug) return json({ ok: false, error: "Missing slug" }, { status: 400 });

      await env.DB.prepare(`DELETE FROM blog_posts WHERE slug = ?`).bind(slug).run();
      return json({ ok: true });
    }

    // ── Notifications endpoint ──────────────────────────────────
    if (request.method === "GET" && url.pathname === "/api/notifications") {
      const auth = await protectedRequest();
      if (!auth.ok) return json({ ok: false, error: auth.error }, { status: auth.status });

      const { results } = await env.DB.prepare(
        `SELECT id, type, recipient, subject, body, status, created_at FROM notification_log ORDER BY created_at DESC LIMIT 50`
      ).all();

      return json({ ok: true, notifications: results });
    }

    return json({ ok: false, error: "Not found" }, { status: 404 });
  },
};
