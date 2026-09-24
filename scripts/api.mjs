// JSON admin API for the tool screens — Node stdlib only (node:sqlite), zero deps.
// Mounted by scripts/serve.mjs at /api/*. Wired to the studio UI via js/admin.js;
// the v1 client-review slice reads/writes files.status directly (no deliverables table yet).
// ponytail: generic CRUD over one SQLite file. Ceiling: single process/file, no auth,
// no pagination. Upgrade path: hosted DB + serverless functions + token auth when deployed.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const now = () => new Date().toISOString();

/* ── session cookie ──────────────────────────────────────────────────────────
   The admin PAGES are static files, so a browser can't authenticate them with
   an Authorization header — navigating to /dashboard sends nothing. So the
   token is exchanged once for a signed cookie (POST /api/session) and serve.mjs
   checks that on every admin route.
   Stateless on purpose: the expiry is HMAC-signed with ADMIN_TOKEN, so there is
   no session store to seed/expire and rotating the token kills every session. */
const SESSION_COOKIE = 'adm_session';
const SESSION_MAX_AGE = 60 * 60 * 8; // 8h, seconds — matches the cookie Max-Age
const sign = (payload, secret) => createHmac('sha256', secret).update(payload).digest('base64url');
const safeEqual = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};
const makeSession = (secret) => {
  const exp = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${exp}.${sign(exp, secret)}`;
};
const cookieValue = (header, name) =>
  (String(header || '').split(';').map((c) => c.trim().split('=')).find(([k]) => k === name) || [])[1] || '';
/** true if `cookieHeader` carries an unexpired session signed with `secret` */
export const verifySession = (cookieHeader, secret) => {
  if (!secret) return false;
  const raw = cookieValue(cookieHeader, SESSION_COOKIE);
  const [exp, sig] = raw.split('.');
  if (!exp || !sig || !(Number(exp) > Date.now())) return false;
  return safeEqual(sig, sign(exp, secret));
};
const sessionHeader = (value) => `${SESSION_COOKIE}=${value}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
export const sessionCookie = (secret, secure) => sessionHeader(makeSession(secret)) + (secure ? '; Secure' : '');
export const clearedSessionCookie = () => `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;

const entities = {
  leads: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, company TEXT DEFAULT '', website TEXT DEFAULT '', project_type TEXT DEFAULT '', source TEXT DEFAULT 'Contact Form', score INTEGER DEFAULT 50, value REAL DEFAULT 0, message TEXT NOT NULL, status TEXT DEFAULT 'new', replied_at TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['name', 'email', 'company', 'website', 'project_type', 'source', 'score', 'value', 'message', 'status'],
    required: ['name', 'email', 'message'],
    defaults: { status: 'new', source: 'Contact Form', score: 50, value: 0 },
    statuses: ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost'],
    search: ['name', 'email', 'company'],
    validate(d) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(d.email ?? ''))) return 'A valid email address is required.';
    },
    seed: [
      ['Sam Chen', 'sam@luminary.com', 'Luminary Financial', '', 'Web application', 'Contact Form', 92, 120000, 'Follow-up on the wealth platform proposal.', 'won'],
      ['Priya Nair', 'priya@kora.health', 'Kora Health', '', 'Website', 'Referral', 88, 250000, 'Rebuild of the care portal.', 'contacted'],
      ['Ravi Menon', 'ravi@vertex.io', 'Vertex', '', 'AI solution', 'LinkedIn', 74, 60000, 'Analytics workflow automation.', 'new'],
      ['Sarah Johnson', 'sarah.j@example.com', 'Luxoré Jewels', 'luxorejewels.com', 'Website', 'Contact Form', 92, 120000, 'Website redesign for the new collection.', 'new'],
      ['Rahul Kumar', 'rahul.k@techcorp.in', 'TechCorp', '', 'Web application', 'LinkedIn', 88, 250000, 'Dashboard product revamp.', 'qualified'],
      ['Priya Mehta', 'priya@studiom.com', 'Studio M', '', 'Website', 'Referral', 74, 85000, 'Brand site with e-commerce.', 'proposal'],
      ['Arjun Singh', 'arjun@nexabrands.io', 'Nexa Brands', '', 'AI solution', 'Organic', 96, 140000, 'AI chatbot for customer support.', 'won'],
      ['Diana Webb', 'd.webb@horizonco.com', 'Horizon Co', '', 'Website', 'Instagram', 61, 60000, 'Landing page refresh.', 'contacted'],
      ['Vikram Nair', 'vnair@example.com', '', '', '', 'Google Ads', 32, 45000, 'Quick quote request.', 'lost'],
    ],
  },
  projects: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, client TEXT NOT NULL, category TEXT DEFAULT '', status TEXT DEFAULT 'active', progress INTEGER DEFAULT 0, timeline TEXT DEFAULT '', budget TEXT DEFAULT '', deadline TEXT DEFAULT '', description TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['title', 'client', 'category', 'status', 'progress', 'timeline', 'budget', 'deadline', 'description'],
    required: ['title', 'client'],
    defaults: { status: 'active', category: '', progress: 0 },
    statuses: ['active', 'review', 'completed', 'on hold', 'cancelled'],
    search: ['title', 'client', 'status'],
    seed: [
      ['Designing trust in financial experiences.', 'Luminary Financial', 'Web Design & Dev', 'completed', 100, '4 Months', '₹1,20,000', '2025-06-15', 'Wealth management platform rebuilt around clarity and trust.'],
      ['Healthcare that feels human.', 'Kora Health', 'Product Design', 'active', 45, '6 Months', '₹62,000', '2025-08-30', 'Patient-first care platform.'],
      ['From data to decisions.', 'Vertex', 'Web Application', 'active', 72, '5 Months', '₹54,000', '2025-09-10', 'Analytics platform for operational decisions.'],
      ['Fintech onboarding redesign.', 'Meridian', 'UX Strategy', 'review', 30, '3 Months', '₹38,000', '2025-07-25', 'Onboarding flow redesign.'],
    ],
  },
  invoices: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, client TEXT NOT NULL, project TEXT DEFAULT '', amount REAL NOT NULL, status TEXT DEFAULT 'draft', issue_date TEXT DEFAULT '', due_date TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['client', 'project', 'amount', 'status', 'issue_date', 'due_date'],
    required: ['client'],
    defaults: { status: 'draft', amount: 0 },
    statuses: ['draft', 'paid', 'outstanding', 'overdue'],
    validate(d) {
      if (d.amount !== undefined && Number.isNaN(Number(d.amount))) return 'amount must be a number.';
    },
    seed: [
      ['Luminary Financial', 'Wealth platform v2', 48000, 'paid', '2026-06-15', '2026-07-01'],
      ['Kora Health', 'Care portal', 15500, 'outstanding', '2026-08-01', '2026-08-15'],
      ['Vertex', 'Analytics platform', 12000, 'draft', '2026-08-20', '2026-09-01'],
      ['Luxoré Jewels', 'Website Redesign', 60000, 'outstanding', '2025-05-24', '2025-06-07'],
      ['Nexa Interiors', 'Website Build', 140000, 'paid', '2025-05-10', '2025-05-24'],
      ['Horizon Labs', 'UI/UX Design', 40000, 'paid', '2025-04-15', '2025-04-30'],
    ],
  },
  users: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, role TEXT DEFAULT 'client', status TEXT DEFAULT 'active', last_active TEXT DEFAULT '', projects INTEGER DEFAULT 0, created_at TEXT NOT NULL",
    fields: ['name', 'email', 'role', 'status', 'last_active', 'projects'],
    required: ['name', 'email'],
    defaults: { role: 'client', status: 'active', projects: 0 },
    statuses: ['active', 'inactive', 'suspended'],
    search: ['name', 'email', 'role'],
    validate(d) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(d.email ?? ''))) return 'A valid email address is required.';
    },
    seed: [
      ['Sarah Mitchell', 'sarah@luminary.com', 'client', 'active', '2 days ago', 1],
      ['Dr. Priya Nair', 'priya@kora.health', 'client', 'active', '1 day ago', 1],
      ['Aarav Shah', 'aarav@aesthetixstudio.com', 'team', 'active', '15 min ago', 12],
      ['Maya Iyer', 'maya@aesthetixstudio.com', 'team', 'active', '30 min ago', 7],
      ['Rohit Malhotra', 'rohit@aesthetixstudio.com', 'admin', 'active', 'Just now', 18],
      ['Ananya Singh', 'ananya@aesthetixstudio.com', 'editor', 'active', '15 min ago', 9],
      ['Vikram Khanna', 'vikram@aesthetixstudio.com', 'designer', 'active', '2 hrs ago', 12],
      ['Dev Patel', 'dev@aesthetixstudio.com', 'developer', 'active', '30 min ago', 7],
      ['Luxoré Jewels', 'admin@luxorejewels.com', 'client', 'active', '1 day ago', 1],
      ['Maya Reddy', 'maya@example.com', 'editor', 'inactive', '3 weeks ago', 2],
    ],
  },
  articles: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, author TEXT DEFAULT '', category TEXT DEFAULT '', status TEXT DEFAULT 'draft', read_time TEXT DEFAULT '', views INTEGER DEFAULT 0, created_at TEXT NOT NULL",
    fields: ['title', 'author', 'category', 'status', 'read_time', 'views'],
    required: ['title'],
    defaults: { status: 'draft', author: '', views: 0 },
    statuses: ['draft', 'published', 'scheduled', 'review'],
    search: ['title', 'category', 'status'],
    seed: [
      ['Designing for clarity in a noisy world.', 'Rohit M.', 'Design', 'published', '8 min', 1400],
      ['What good product strategy actually looks like.', 'Ananya S.', 'Strategy', 'published', '6 min', 1100],
      ['The case for fewer, better features.', 'Rohit M.', 'Process', 'draft', '5 min', 0],
      ['Building AI products people can trust.', 'Ananya S.', 'AI', 'scheduled', '7 min', 0],
      ['How AI is Transforming UX Design', 'Ananya S.', 'AI & Tech', 'published', '6 min', 950],
      ['Brand Identity: A Complete Guide', 'Rohit M.', 'Branding', 'scheduled', '12 min', 0],
      ['Case Study: Luxoré Jewels Website', 'Ananya S.', 'Case Study', 'published', '5 min', 720],
      ['SEO Best Practices for 2025', 'Rohit M.', 'SEO', 'draft', '9 min', 0],
    ],
  },
  proposals: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, client TEXT DEFAULT '', scope TEXT DEFAULT '', investment REAL DEFAULT 0, status TEXT DEFAULT 'draft', created_at TEXT NOT NULL",
    fields: ['title', 'client', 'scope', 'investment', 'status'],
    required: ['title'],
    defaults: { status: 'draft', investment: 0 },
    statuses: ['draft', 'sent', 'accepted', 'rejected'],
    validate(d) {
      if (d.investment !== undefined && Number.isNaN(Number(d.investment))) return 'investment must be a number.';
    },
    seed: [
      ['Luminary Financial — platform v2', 'Luminary Financial', '12 weeks: strategy, design, build', 48000, 'accepted'],
      ['Kora Health — care portal', 'Kora Health', '10 weeks: design and build', 62000, 'sent'],
      ['Vertex — analytics UX', 'Vertex', '8 weeks: UX strategy and design', 54000, 'draft'],
    ],
  },
  feedback: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, source TEXT DEFAULT '', rating INTEGER DEFAULT 5, message TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['source', 'rating', 'message'],
    required: [],
    defaults: { rating: 5 },
    validate(d) {
      const r = Number(d.rating ?? 5);
      if (d.rating !== undefined && (Number.isNaN(r) || r < 1 || r > 5)) return 'rating must be an integer between 1 and 5.';
    },
    seed: [
      ['Discovery call', 5, 'Clear and well-prepared.'],
      ['Proposal review', 4, 'Strong scope, wanted a firmer timeline.'],
      ['Post-launch', 5, 'Smooth delivery and great communication.'],
    ],
  },
  media: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, type TEXT DEFAULT '', size TEXT DEFAULT '', usage TEXT DEFAULT 'unused', created_at TEXT NOT NULL",
    fields: ['name', 'type', 'size', 'usage'],
    required: ['name'],
    defaults: { usage: 'unused' },
    search: ['name', 'type', 'usage'],
    seed: [
      ['work-hero.png', 'image', '2.4 MB', 'used'],
      ['laptop-mockup.png', 'image', '1.8 MB', 'used'],
      ['brand-guidelines.pdf', 'document', '4.1 MB', 'unused'],
      ['demo-recording.mp4', 'video', '86 MB', 'unused'],
      ['luxore-hero.jpg', 'image', '2.4 MB', 'used'],
      ['brand-logo-dark.png', 'image', '128 KB', 'used'],
      ['portfolio-nexa.jpg', 'image', '1.8 MB', 'used'],
      ['proposal-template.pdf', 'document', '542 KB', 'unused'],
      ['studio-showreel.mp4', 'video', '48.2 MB', 'unused'],
      ['horizon-cover.jpg', 'image', '1.1 MB', 'used'],
    ],
  },
  files: {
    // ponytail: status carries the v1 review loop (draft → review → approved/changes_requested).
    // project stays a plain string and thread=file:<id> is the link convention — ceiling:
    // no FKs. Upgrade path: a deliverables table with project_id/file_id once the loop proves out.
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, type TEXT DEFAULT 'file', size TEXT DEFAULT '', project TEXT DEFAULT '', usage TEXT DEFAULT 'unused', uploaded_by TEXT DEFAULT '', status TEXT DEFAULT 'draft', created_at TEXT NOT NULL",
    fields: ['name', 'type', 'size', 'project', 'usage', 'uploaded_by', 'status'],
    required: ['name'],
    defaults: { type: 'file', usage: 'unused', status: 'draft' },
    statuses: ['draft', 'review', 'approved', 'changes_requested'],
    search: ['name', 'type', 'project', 'usage'],
    seed: [
      ['brand-guidelines.pdf', 'document', '4.1 MB', 'Luminary Financial', 'unused', 'Maya Iyer', 'draft'],
      ['design-system.fig', 'design', '18 MB', 'Kora Health', 'used', 'Aarav Shah', 'review'],
      ['case-study-notes.md', 'document', '12 KB', 'Vertex', 'used', 'Sarah Chen', 'draft'],
    ],
  },
  meetings: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, date TEXT DEFAULT '', attendees TEXT DEFAULT '', summary TEXT DEFAULT '', status TEXT DEFAULT 'scheduled', action_items TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['title', 'date', 'attendees', 'summary', 'status', 'action_items'],
    required: ['title'],
    defaults: { status: 'scheduled' },
    statuses: ['scheduled', 'held'],
    search: ['title', 'attendees', 'status'],
    seed: [
      ['Luminary kickoff', '2026-08-10', 'Sarah Mitchell, Aarav Shah', 'Scope confirmed; design sprint booked.', 'held', 'Send discovery summary'],
      ['Kora weekly sync', '2026-08-14', 'Dr. Priya Nair, Maya Iyer', 'Prototype reviewed; approval pending.', 'held', 'Share updated flows'],
      ['Vertex status', '2026-08-20', 'Ravi Menon, Aarav Shah', 'Data pipeline API ready for review.', 'scheduled', 'Prepare demo'],
    ],
  },
  forms: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, form_name TEXT NOT NULL, name TEXT DEFAULT '', email TEXT DEFAULT '', message TEXT DEFAULT '', status TEXT DEFAULT 'new', created_at TEXT NOT NULL",
    fields: ['form_name', 'name', 'email', 'message', 'status'],
    required: ['form_name'],
    defaults: { status: 'new' },
    statuses: ['new', 'qualified', 'converted'],
    search: ['form_name', 'name', 'email', 'status'],
    seed: [
      ['Contact form', 'Amelia Ross', 'amelia@northwind.com', 'Interested in a full website redesign.', 'qualified'],
      ['Newsletter', 'Dev Patel', 'dev@buildlab.io', '', 'new'],
      ['Contact form', 'Lena Kowalski', 'lena@brightloop.co', 'Pricing for the Growth plan?', 'converted'],
      ['Project inquiry', 'James Wilson', 'james@techflow.io', 'Need a dashboard for our SaaS product.', 'new'],
      ['Project inquiry', 'Meera Reddy', 'meera@nexgen.co', 'E-commerce platform build.', 'qualified'],
      ['Newsletter', 'Arjun Nair', 'arjun@designlab.in', '', 'new'],
      ['Contact form', 'Sarah Kim', 'sarah@horizon.com', 'Website redesign for our rebrand.', 'converted'],
      ['Consultation booking', 'Ravi Sharma', 'ravi@buildify.in', 'Need help with our mobile app UX.', 'qualified'],
      ['Consultation booking', 'Priya Menon', 'priya@freshco.io', 'AI chatbot integration inquiry.', 'new'],
      ['Feedback', 'Alex Johnson', 'alex@sample.com', 'Great experience working with the team.', 'converted'],
      ['Partnership', 'Neha Gupta', 'neha@agency.co', 'Interested in a referral partnership.', 'new'],
      ['Careers', 'Rohan Kulkarni', 'rohan@dev.io', 'Applying for the frontend developer role.', 'qualified'],
      ['Newsletter', 'Maya Singh', 'maya@creative.in', '', 'new'],
      ['Contact form', 'Vikram Patel', 'vikram@startup.io', 'Looking for a design partner.', 'converted'],
      ['Resource download', 'Diana Webb', 'diana@horizon.co', '', 'new'],
      ['Resource download', 'Karan Mehta', 'karan@techcorp.in', '', 'new'],
    ],
  },
  tasks: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, project TEXT DEFAULT '', assignee TEXT DEFAULT '', status TEXT DEFAULT 'todo', due_date TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['title', 'project', 'assignee', 'status', 'due_date'],
    required: ['title'],
    defaults: { status: 'todo' },
    statuses: ['todo', 'in progress', 'done'],
    search: ['title', 'project', 'assignee', 'status'],
    seed: [
      ['Send Luminary discovery summary', 'Luminary Financial', 'Sarah Chen', 'done', '2026-08-12'],
      ['Share updated care-portal flows', 'Kora Health', 'Maya Iyer', 'in progress', '2026-08-18'],
      ['Prepare Vertex analytics demo', 'Vertex', 'Aarav Shah', 'todo', '2026-08-22'],
      ['Draft Q3 invoice for Kora', 'Kora Health', 'Rohit Malhotra', 'todo', '2026-08-25'],
    ],
  },
  milestones: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, project_id INTEGER DEFAULT 0, title TEXT NOT NULL, status TEXT DEFAULT 'scheduled', due_date TEXT DEFAULT '', start_date TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['project_id', 'title', 'status', 'due_date', 'start_date'],
    required: ['title'],
    defaults: { project_id: 0, status: 'scheduled' },
    statuses: ['scheduled', 'in progress', 'complete'],
    search: ['title', 'status'],
    seed: [
      [1, 'Discovery & audit', 'complete', '2026-08-01', '2026-07-20'],
      [1, 'Design sprint', 'in progress', '2026-08-15', '2026-08-04'],
      [1, 'Build & QA', 'scheduled', '2026-09-10', '2026-08-18'],
    ],
  },
  messages: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, role TEXT NOT NULL, content TEXT NOT NULL, thread TEXT DEFAULT 'general', created_at TEXT NOT NULL",
    fields: ['role', 'content', 'thread'],
    required: ['role', 'content'],
    defaults: { thread: 'general' },
    search: ['content', 'thread'],
    seed: [
      ['user', 'Summarize our proposal process for a new client.', 'general'],
      ['assistant', 'Here is the standard flow: discovery call, brief review, proposal, then contract.', 'general'],
      ['user', 'When is the Kora invoice due?', 'general'],
      ['assistant', 'The Kora invoice is due 2026-08-15.', 'general'],
    ],
  },
  subscriptions: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, client TEXT NOT NULL, plan TEXT DEFAULT 'Growth', amount REAL DEFAULT 0, interval TEXT DEFAULT 'monthly', status TEXT DEFAULT 'active', started TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['client', 'plan', 'amount', 'interval', 'status', 'started'],
    required: ['client'],
    defaults: { plan: 'Growth', amount: 0, interval: 'monthly', status: 'active' },
    statuses: ['active', 'past due', 'cancelled'],
    search: ['client', 'plan', 'status'],
    seed: [
      ['Luxoré Jewels', 'Growth', 59999, 'monthly', 'active', '2026-06-01'],
      ['TechCorp', 'Enterprise', 120000, 'monthly', 'active', '2026-05-15'],
      ['Brightloop', 'Starter', 29999, 'monthly', 'past due', '2026-07-01'],
    ],
  },
  settings: {
    // key/value store — /api/settings is intercepted below (GET all, PUT upsert)
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, section TEXT DEFAULT 'general', key TEXT NOT NULL, value TEXT DEFAULT '', created_at TEXT NOT NULL, UNIQUE(section, key)",
    fields: ['section', 'key', 'value'],
    required: ['key'],
    defaults: { section: 'general', value: '' },
    seed: [
      ['general', 'site_name', 'Aesthetix Studio'],
      ['general', 'contact_email', 'mohdabraralikhan@gmail.com'],
      ['general', 'tagline', 'Design that drives results.'],
      ['general', 'site_url', 'https://aesthetixstudio.com'],
      ['general', 'site_description', 'A premium design & development studio crafting exceptional digital experiences for ambitious brands.'],
      ['general', 'admin_email', 'rohit@aesthetixstudio.com'],
      ['general', 'contact_phone', '+91 8499908716'],
      ['general', 'language', 'English (India)'],
      ['general', 'timezone', 'Asia/Kolkata (IST)'],
      ['general', 'currency', 'INR (₹)'],
      ['general', 'two_factor_auth', 'on'],
      ['general', 'login_notifications', 'on'],
      ['general', 'session_timeout', 'off'],
      ['general', 'maintenance_mode', 'off'],
      ['general', 'image_optimization', 'on'],
      ['general', 'cdn_enabled', 'on'],
      ['general', 'browser_caching', 'on'],
      ['billing', 'plan', 'Growth'],
      ['notifications', 'weekly_digest', 'on'],
    ],
  },
};

const send = (res, code, obj) => {
  res.writeHead(code, { 'content-type': 'application/json' });
  res.end(JSON.stringify(obj));
};
// like send(), but carries the Set-Cookie the session endpoints return
const sendSession = (res, cookie) => {
  res.writeHead(200, { 'content-type': 'application/json', 'set-cookie': cookie });
  res.end(JSON.stringify({ ok: true }));
};
const readBody = (req, limit) => new Promise((resolve, reject) => {
  const chunks = [];
  let size = 0;
  req.on('data', (c) => {
    size += c.length;
    if (size > limit) return reject(new Error('too large'));
    chunks.push(c);
  });
  req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  req.on('error', reject);
});
const jsonBody = async (req, res) => {
  let raw;
  try {
    raw = await readBody(req, 64_000);
  } catch {
    send(res, 413, { ok: false, error: 'Body too large' });
    return null;
  }
  try {
    return JSON.parse(raw || '{}');
  } catch {
    send(res, 400, { ok: false, error: 'Invalid JSON' });
    return null;
  }
};
const formBody = async (req, res) => {
  let raw;
  try {
    raw = await readBody(req, 64_000);
  } catch {
    send(res, 413, { ok: false, error: 'Body too large' });
    return null;
  }
  return Object.fromEntries(new URLSearchParams(raw));
};
const pick = (e, d) => Object.fromEntries(e.fields.filter((f) => d[f] !== undefined).map((f) => [f, d[f]]));
const values = (e, d) => e.fields.map((f) => (d[f] !== undefined ? String(d[f]) : String(e.defaults?.[f] ?? '')));
/* ── assistant reply ──────────────────────────────────────────────────────────
   The chat screen's backend: POST /api/messages with role=user in the default
   'general' thread stores the message, then asks any OpenAI-compatible chat
   endpoint (OpenAI, Gemini's compat layer, Groq, OpenRouter…) for a reply and
   stores it as an assistant row. serve.mjs builds the config from AI_API_KEY /
   AI_BASE_URL / AI_MODEL; no key = dormant (behaviour and self-check unchanged).
   ponytail: one synchronous reply, last 10 thread messages as context, no
   streaming/queue — a studio assistant at demo volume. Upgrade path: SSE
   streaming + retrieval over the studio's own pages/docs. */
const CHAT_SYSTEM_PROMPT = `You are the Aesthetix Studio assistant on aesthetixstudio.com — a digital product studio in Hyderabad, India offering digital experiences (marketing sites and landing pages), web applications (SaaS, dashboards, internal tools) and AI solutions (integrations, automation, data intelligence). Retainers: Starter ₹29,999/month, Growth ₹59,999/month, Enterprise quoted individually; yearly billing saves 15%. Answer briefly and helpfully. For anything you don't know (custom quotes, availability, client specifics) say so and point to the contact form or mohdabraralikhan@gmail.com. Never invent client names, prices or dates beyond what is written here.`;
const ASSISTANT_FALLBACK = 'The assistant could not reach its AI backend just now — please try again in a moment.';

export function createApi({ file, token = '', ai = null }) {
  if (file !== ':memory:') mkdirSync(dirname(resolve(file)), { recursive: true });
  const db = new DatabaseSync(file);
  // ponytail: keep the schema forward-compatible — existing DBs (created before a column
  // was added to an entity's cols) get the new column via ALTER TABLE. Ceiling: one-shot
  // migrations only; upgrade path: a proper migration runner if the schema keeps growing.
  const ensureCols = (t, cols) => {
    const have = new Set(db.prepare(`PRAGMA table_info(${t})`).all().map((c) => c.name));
    // only plain column defs can be ADD COLUMN'd — skip table constraints like UNIQUE(...)
    for (const c of cols) {
      const name = c.split(' ')[0];
      if (c.includes('(') || have.has(name)) continue;
      db.exec(`ALTER TABLE ${t} ADD COLUMN ${c}`);
    }
  };
  // columns added after a table's first release — backfilled onto existing DBs
  const migrate = {
    leads: ['source TEXT DEFAULT "Contact Form"', 'score INTEGER DEFAULT 50', 'value REAL DEFAULT 0'],
    projects: ['category TEXT DEFAULT ""', 'progress INTEGER DEFAULT 0', 'deadline TEXT DEFAULT ""'],
    invoices: ['project TEXT DEFAULT ""', 'issue_date TEXT DEFAULT ""'],
    users: ['status TEXT DEFAULT "active"', 'last_active TEXT DEFAULT ""', 'projects INTEGER DEFAULT 0'],
    articles: ['author TEXT DEFAULT ""', 'views INTEGER DEFAULT 0'],
    files: ['status TEXT DEFAULT "draft"'],
    milestones: ['start_date TEXT DEFAULT ""'],
  };
  for (const [name, e] of Object.entries(entities)) {
    db.exec(`CREATE TABLE IF NOT EXISTS ${name} (${e.cols})`);
    ensureCols(name, migrate[name] || []);
    ensureCols(name, ['replied_at TEXT DEFAULT ""']); // leads.replied_at for 24h-reply tracking
    try { if (name === 'files') db.exec(`UPDATE files SET status = 'draft' WHERE status IS NULL OR status = ''`); } catch {}
    const { n } = db.prepare(`SELECT COUNT(*) n FROM ${name}`).get();
    if (!n && e.seed?.length) {
      const ins = db.prepare(`INSERT INTO ${name} (${e.fields.join(', ')}, created_at) VALUES (${e.fields.map(() => '?').join(', ')}, ?)`);
      for (const row of e.seed) ins.run(...row, now());
    }
  }

  const create = (res, table, e, d, after) => {
    for (const f of e.required) if (!String(d[f] ?? '').trim()) return send(res, 400, { ok: false, error: `${f} is required.` });
    if (e.statuses && d.status !== undefined && !e.statuses.includes(d.status)) return send(res, 400, { ok: false, error: `status must be one of: ${e.statuses.join(', ')}.` });
    if (e.validate) { const err = e.validate(d); if (err) return send(res, 400, { ok: false, error: err }); }
    const info = db.prepare(`INSERT INTO ${table} (${e.fields.join(', ')}, created_at) VALUES (${e.fields.map(() => '?').join(', ')}, ?)`).run(...values(e, d), now());
    // `after` lets a route do follow-up work (the assistant reply) before the 201
    // goes out, so the client's immediate re-fetch already sees the reply
    return after ? after(Number(info.lastInsertRowid)) : send(res, 201, { ok: true, id: Number(info.lastInsertRowid) });
  };

  // asks the configured provider for a reply; null = dormant (no key). The just-
  // inserted user row is already in the thread, so history ends with the question.
  const assistantReply = async (thread) => {
    if (!ai?.key) return null;
    const history = db.prepare(`SELECT role, content FROM messages WHERE thread = ? ORDER BY id DESC LIMIT 10`).all(thread).reverse();
    try {
      const r = await fetch(`${ai.base}/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${ai.key}` },
        body: JSON.stringify({ model: ai.model, messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...history] }),
        signal: AbortSignal.timeout(30_000),
      });
      if (!r.ok) throw new Error(`upstream ${r.status}`);
      const text = (await r.json())?.choices?.[0]?.message?.content?.trim();
      return text || ASSISTANT_FALLBACK;
    } catch (e) {
      console.warn(`[assistant] reply failed: ${e.message}`);
      return ASSISTANT_FALLBACK; // user message is already stored — say so instead of silence
    }
  };

  // ponytail: the projects board ships with demo rows so a fresh install shows the
  // designed 28-project portfolio (matching the Projects mockup totals). They are
  // response-only — never written to SQLite — so CRUD ids and the self-check stay
  // deterministic. Detail routes (GET/PUT/DELETE /:id) hit the DB only, so demo rows
  // are read-only in the UI. Filtered queries (?q=, ?status=) also hit the DB only;
  // the board fetches the full list once and filters client-side.
  const DEMO_PROJECTS = [
    ['Luxoré Jewels Website', 'Luxoré Jewels', 'Website Redesign', 'active', 75, '6 Weeks', '₹1,50,000', '2025-05-30', 'Flagship jewellery e-commerce experience.', '2025-05-24T10:00:00', '2h ago'],
    ['TechCorp SaaS Platform', 'TechCorp', 'Web Application', 'active', 60, '₹2,00,000', '12 Weeks', '2025-06-15', 'Multi-tenant SaaS dashboard and billing.', '2025-05-24T07:00:00', '5h ago'],
    ['Aroma Élite Branding', 'Aroma Élite', 'Brand Identity', 'review', 90, '₹85,000', '5 Weeks', '2025-05-25', 'Luxury fragrance brand identity system.', '2025-05-23T12:00:00', '1d ago'],
    ['Haven Interiors Website', 'Haven Interiors', 'Website Design', 'on hold', 35, '₹90,000', '8 Weeks', '2025-06-10', 'Portfolio site for an interior studio.', '2025-05-22T09:00:00', '2d ago'],
    ['FitTrack Mobile App', 'FitTrack', 'Mobile Application', 'completed', 100, '₹1,75,000', '10 Weeks', '2025-04-28', 'Fitness tracking app with social leagues.', '2025-05-21T11:00:00', '3d ago'],
    ['TasteBuds Website', 'TasteBuds', 'Website Redesign', 'cancelled', 20, '₹45,000', '6 Weeks', '2025-04-15', 'Restaurant discovery redesign (paused).', '2025-05-19T15:00:00', '5d ago'],
    ['Wanderlust Landing Page', 'Wanderlust', 'Landing Page', 'completed', 100, '₹60,000', '3 Weeks', '2025-04-12', 'High-converting travel landing page.', '2025-05-17T10:00:00', '1w ago'],
    ['TechCorp Admin Dashboard', 'TechCorp', 'Web Application', 'active', 40, '₹80,000', '8 Weeks', '2025-07-01', 'Internal admin and reporting console.', '2025-05-16T09:00:00', '1w ago'],
    ['TechCorp Mobile App', 'TechCorp', 'Mobile Application', 'active', 55, '₹90,000', '10 Weeks', '2025-07-20', 'Companion app for the SaaS platform.', '2025-05-15T14:00:00', '1w ago'],
    ['TechCorp Marketing Site', 'TechCorp', 'Website Redesign', 'active', 30, '₹50,000', '6 Weeks', '2025-08-01', 'Marketing site rebuild with CMS.', '2025-05-12T11:00:00', '2w ago'],
    ['Luxoré Festive Campaign', 'Luxoré Jewels', 'Landing Page', 'completed', 100, '₹70,000', '4 Weeks', '2025-03-15', 'Festive collection campaign pages.', '2025-05-10T10:00:00', '2w ago'],
    ['Luxoré Jewels Branding', 'Luxoré Jewels', 'Brand Identity', 'active', 65, '₹95,000', '6 Weeks', '2025-06-25', 'Brand refresh and packaging system.', '2025-05-09T13:00:00', '2w ago'],
    ['Aroma Élite Packaging', 'Aroma Élite', 'Brand Identity', 'active', 50, '₹1,25,000', '7 Weeks', '2025-07-10', 'Packaging system for three product lines.', '2025-05-08T10:00:00', '2w ago'],
    ['Haven Interiors Branding', 'Haven Interiors', 'Brand Identity', 'completed', 100, '₹90,000', '5 Weeks', '2025-04-22', 'Studio rebrand and guidelines.', '2025-05-05T12:00:00', '3w ago'],
    ['Nexa Interiors Website', 'Nexa Interiors', 'Website Design', 'active', 68, '₹1,10,000', '8 Weeks', '2025-06-30', 'Portfolio and enquiry experience.', '2025-05-04T09:00:00', '3w ago'],
    ['Horizon Labs Platform', 'Horizon Labs', 'Web Application', 'active', 52, '₹88,000', '9 Weeks', '2025-07-05', 'Research collaboration platform.', '2025-05-03T15:00:00', '3w ago'],
    ['Meridian Onboarding Flow', 'Meridian', 'UX Strategy', 'active', 80, '₹38,000', '4 Weeks', '2025-06-20', 'Second-phase onboarding optimisation.', '2025-05-02T11:00:00', '3w ago'],
    ['Vertex Reports Module', 'Vertex', 'Web Application', 'completed', 100, '₹54,000', '5 Weeks', '2025-04-25', 'Scheduled reporting add-on.', '2025-04-28T10:00:00', '1m ago'],
    ['Luminary Landing Page', 'Luminary Financial', 'Landing Page', 'completed', 100, '₹48,000', '3 Weeks', '2025-04-20', 'Campaign pages for the launch.', '2025-04-25T09:00:00', '1m ago'],
    ['Kora Wellness Blog', 'Kora Health', 'Website Design', 'completed', 100, '₹32,000', '3 Weeks', '2025-04-18', 'Editorial blog for patient education.', '2025-04-22T14:00:00', '1m ago'],
    ['Reverie Interiors Site', 'Reverie', 'Website Design', 'on hold', 25, '₹74,000', '8 Weeks', '2025-08-10', 'Boutique interiors showcase (paused).', '2025-04-20T10:00:00', '1m ago'],
    ['Orbit SaaS Website', 'Orbit', 'Website Redesign', 'completed', 100, '₹66,000', '5 Weeks', '2025-04-10', 'Docs and marketing site overhaul.', '2025-04-18T12:00:00', '1m ago'],
    ['Northwind Portal', 'Northwind', 'Web Application', 'completed', 100, '₹92,000', '7 Weeks', '2025-04-08', 'Client portal with invoicing.', '2025-04-15T09:00:00', '1m ago'],
    ['Brightloop Campaign', 'Brightloop', 'Landing Page', 'completed', 100, '₹41,000', '3 Weeks', '2025-04-05', 'Product launch microsite.', '2025-04-12T11:00:00', '1m ago'],
  ].map(([title, client, category, status, progress, budget, timeline, deadline, description, created_at, updated_label], i) => ({
    id: 9001 + i, title, client, category, status, progress, budget, timeline, deadline, description, created_at,
    _demo: true, updated_label,
  }));

  // ponytail: same pattern for the articles board — a fresh install shows the designed
  // 42-article library (28 published, 8 drafts, 6 scheduled). Response-only, read-only
  // in the UI; CRUD ids and the self-check stay deterministic.
  const DEMO_ARTICLES = [
    ['10 Luxury Web Design Trends Defining 2025', 'Rohit Malhotra', 'Design', 'published', '6 min', 2400, '2025-05-23T10:00:00', '2h ago', 'Explore the top luxury web design trends that are shaping digital experiences...'],
    ['How AI is Transforming Digital Experiences', 'Ananya Singh', 'Technology', 'published', '5 min', 1800, '2025-05-22T09:00:00', '1d ago', 'Artificial intelligence is revolutionizing the way we design and interact...'],
    ['A Complete Guide to Minimal Branding', 'Rohit Malhotra', 'Branding', 'draft', '4 min', 0, '2025-05-21T11:00:00', '2d ago', 'Minimalism in branding is more than a trend — it’s a timeless strategy...'],
    ['UX/UI Best Practices for High-Converting Websites', 'Ananya Singh', 'UX/UI', 'published', '7 min', 3200, '2025-05-20T10:00:00', '3d ago', 'Improve user experience and boost conversions with these proven UX/UI...'],
    ['The Future of Web Development: What to Expect', 'Rohit Malhotra', 'Development', 'scheduled', '6 min', 0, '2025-05-19T12:00:00', '4d ago', 'From Web3 to advanced frameworks, here’s what the future holds...', '2025-05-26'],
    ['Typography in Web Design: The Ultimate Guide', 'Ananya Singh', 'Design', 'draft', '8 min', 0, '2025-05-18T09:00:00', '5d ago', 'Master the art of typography and elevate your website design...'],
    ['Luxury Branding Secrets From Top Global Brands', 'Rohit Malhotra', 'Branding', 'published', '5 min', 2900, '2025-05-17T14:00:00', '6d ago', 'Uncover the branding strategies used by the world’s top luxury brands...'],
    ['Design Systems 101: Build Once, Scale Forever', 'Ananya Singh', 'Design', 'published', '6 min', 1250, '2025-05-16T10:00:00', '1w ago', 'A practical guide to design systems that scale with your team...'],
    ['The Psychology of Color in Web Design', 'Rohit Malhotra', 'Design', 'published', '5 min', 980, '2025-05-15T09:00:00', '1w ago', 'How color choices influence user behavior and brand perception...'],
    ['Motion Design That Converts', 'Ananya Singh', 'UX/UI', 'published', '4 min', 1420, '2025-05-14T11:00:00', '1w ago', 'Subtle animations and micro-interactions that lift engagement...'],
    ['Building Trust Through Fintech UX', 'Rohit Malhotra', 'Technology', 'published', '7 min', 870, '2025-05-12T10:00:00', '2w ago', 'What financial products teach us about designing for trust...'],
    ['A Field Guide to Brand Voice', 'Ananya Singh', 'Branding', 'published', '5 min', 1130, '2025-05-11T12:00:00', '2w ago', 'Finding a voice customers recognize in every sentence...'],
    ['Responsive Design in 2025', 'Rohit Malhotra', 'Development', 'published', '6 min', 760, '2025-05-09T09:00:00', '2w ago', 'Modern techniques for flawless multi-device experiences...'],
    ['Designing Onboarding That Sticks', 'Ananya Singh', 'UX/UI', 'published', '5 min', 1340, '2025-05-08T10:00:00', '2w ago', 'Reduce drop-off with onboarding flows users actually finish...'],
    ['The ROI of Good Typography', 'Rohit Malhotra', 'Design', 'published', '4 min', 640, '2025-05-06T11:00:00', '3w ago', 'Why type choices move business metrics more than you think...'],
    ['AI Chatbots: UX Lessons Learned', 'Ananya Singh', 'Technology', 'published', '8 min', 1510, '2025-05-05T14:00:00', '3w ago', 'What a year of conversational interfaces taught us...'],
    ['Rebranding Without Losing Soul', 'Rohit Malhotra', 'Branding', 'published', '6 min', 920, '2025-05-03T10:00:00', '3w ago', 'Evolve a brand while keeping what people love...'],
    ['CSS Grid Layouts We Love', 'Ananya Singh', 'Development', 'published', '5 min', 580, '2025-05-01T09:00:00', '3w ago', 'Production-ready grid patterns for editorial layouts...'],
    ['Accessibility Is a Feature', 'Rohit Malhotra', 'UX/UI', 'published', '7 min', 1270, '2025-04-28T10:00:00', '1m ago', 'Practical accessibility wins that lift every metric...'],
    ['Content Strategy for Startups', 'Ananya Singh', 'Branding', 'published', '5 min', 430, '2025-04-25T12:00:00', '1m ago', 'A lean framework for content that compounds...'],
    ['Headless CMS Compared', 'Rohit Malhotra', 'Technology', 'published', '9 min', 1090, '2025-04-22T09:00:00', '1m ago', 'We tested five headless CMS options so you don’t have to...'],
    ['Designing for Dark Mode', 'Ananya Singh', 'Design', 'published', '4 min', 1360, '2025-04-20T11:00:00', '1m ago', 'Color systems that shine when the lights go out...'],
    ['Landing Pages That Convert', 'Rohit Malhotra', 'Development', 'published', '6 min', 810, '2025-04-18T10:00:00', '1m ago', 'Anatomy of above-average landing pages...'],
    ['The Art of the Case Study', 'Ananya Singh', 'Branding', 'published', '5 min', 520, '2025-04-15T12:00:00', '1m ago', 'Turn client work into a sales asset...'],
    ['Prototyping in the Browser', 'Rohit Malhotra', 'Technology', 'published', '4 min', 690, '2025-04-12T09:00:00', '1m ago', 'Skip static mockups; design where the product lives...'],
    ['Microcopy That Sells', 'Ananya Singh', 'UX/UI', 'published', '3 min', 1180, '2025-04-10T10:00:00', '1m ago', 'Button and form copy dissected for lifts...'],
    ['Design QA Checklist', 'Rohit Malhotra', 'Design', 'published', '5 min', 470, '2025-04-08T11:00:00', '1m ago', 'Catch visual bugs before users do, every release...'],
    ['How to Build a Strong Brand Identity', 'Rohit Malhotra', 'Branding', 'draft', '6 min', 0, '2025-05-16T14:00:00', '3h ago', 'The foundations every memorable identity is built on...'],
    ['The Role of Color in Web Design', 'Ananya Singh', 'Design', 'draft', '5 min', 0, '2025-05-15T11:00:00', '1d ago', 'Color theory essentials for digital designers...'],
    ['Website Redesign Checklist', 'Rohit Malhotra', 'Design', 'draft', '7 min', 0, '2025-05-14T10:00:00', '2d ago', 'Everything to audit before touching a pixel...'],
    ['E-commerce UX Patterns', 'Ananya Singh', 'UX/UI', 'draft', '6 min', 0, '2025-05-10T09:00:00', '4d ago', 'Checkout patterns from top-converting stores...'],
    ['State of Web Design 2026', 'Rohit Malhotra', 'Design', 'scheduled', '8 min', 0, '2025-05-13T10:00:00', '5d ago', 'Early signals on where web design heads next...', '2025-05-28'],
    ['Designing with AI Tools', 'Ananya Singh', 'Technology', 'scheduled', '6 min', 0, '2025-05-11T12:00:00', '1w ago', 'A hands-on look at AI-assisted workflows...', '2025-05-30'],
    ['Brand Guidelines Template', 'Rohit Malhotra', 'Branding', 'scheduled', '4 min', 0, '2025-05-09T09:00:00', '1w ago', 'A free template for documenting brand systems...', '2025-06-02'],
  ].map(([title, author, category, status, read_time, views, created_at, updated_label, excerpt, scheduled_for], i) => ({
    id: 8001 + i, title, author, category, status, read_time, views, created_at,
    _demo: true, updated_label, excerpt, scheduled_for,
  }));

  // ponytail: same response-only demo pattern for the media library — a fresh install
  // shows the designed 1,248-file library (892 images, 156 videos, 98 documents, 64
  // audio, 38 others). Deterministic, no RNG: sizes are scaled to exact bucket totals
  // (Images 17.6 GB, Videos 5.2 GB, Documents 1.8 GB) so the storage donut and the
  // "of 50 GB" bar match the mockup; folder quotas match it too (456/312/78/54/39).
  const sized = (n, totalMB, base, span, step) => {
    const raw = []; let acc = 0;
    for (let i = 0; i < n; i++) { const v = base + ((i * step) % span) / 10; raw.push(v); acc += v; }
    const f = totalMB / acc;
    return raw.map((v) => `${Math.max(0.1, v * f).toFixed(1)} MB`);
  };
  const DEMO_MEDIA = (() => {
    const H = (id, name, type, size, created_at, folder, extra) => ({
      id, name, type, size, usage: 'unused', created_at, folder: folder || '', _demo: true, ...(extra || {}),
    });
    const heroes = [
      H(7001, 'luxore-ring-hero.jpg', 'image', '2.4 MB', '2025-05-24T09:00:00', 'Project Assets', { g: ['#3B2F1A', '#B8860B'] }),
      H(7002, 'interior-living-room.jpg', 'image', '1.8 MB', '2025-05-23T14:00:00', 'Project Assets', { g: ['#4A4440', '#8A7F70'] }),
      H(7003, 'brand-film-intro.mp4', 'video', '24.5 MB', '2025-05-24T07:00:00', '', { g: ['#1E3A5F', '#3B82F6'], duration: '00:45' }),
      H(7004, 'luxury-perfume.png', 'image', '3.1 MB', '2025-05-22T11:00:00', 'Blog Images', { g: ['#4A2E1A', '#C98A3B'] }),
      H(7005, 'app-ui-mockup.jpg', 'image', '2.7 MB', '2025-05-23T16:00:00', 'Blog Images', { g: ['#2A1B4E', '#7C3AED'] }),
      H(7006, 'Brand-Guidelines.pdf', 'document', '4.6 MB', '2025-05-24T06:00:00', '', { doc: 'PDF' }),
      H(7007, 'project-walkthrough.mp4', 'video', '52.1 MB', '2025-05-21T10:00:00', 'Testimonials', { g: ['#2E2A3A', '#6B5B8E'], duration: '01:12' }),
      H(7008, 'hero-bg-pattern.jpg', 'image', '1.2 MB', '2025-05-20T09:00:00', 'Blog Images', { g: ['#1A1033', '#6D28D9'] }),
      H(7009, 'necklace-product.jpg', 'image', '2.1 MB', '2025-05-19T13:00:00', 'Project Assets', { g: ['#1F1F24', '#4B4B58'] }),
      H(7010, 'ambient-music.mp3', 'audio', '5.6 MB', '2025-05-18T10:00:00', '', { g: ['#2A1B4E', '#8B5CF6'], duration: '03:15' }),
      H(7011, 'Pitch-Deck-Design.pptx', 'document', '8.3 MB', '2025-05-17T12:00:00', 'Downloads', { doc: 'PPTX' }),
      H(7012, 'exterior-modern-house.jpg', 'image', '2.9 MB', '2025-05-16T09:00:00', 'Blog Images', { g: ['#1E3A5F', '#60A5FA'] }),
    ];
    let id = 7020;
    const mk = (name, type, size, folder) => H(id++, name, type, size, null, folder);
    const imgSizes = sized(879, 17999, 8, 250, 37);
    const vidSizes = sized(152, 5089, 13, 400, 53);
    const docSizes = sized(94, 1830, 6, 260, 29);
    const audSizes = sized(63, 18.9, 0.2, 4, 17);
    const othSizes = sized(38, 7.6, 0.1, 3, 11);
    const imgs = imgSizes.map((size, i) => {
      const folder = i < 453 ? 'Project Assets' : i < 761 ? 'Blog Images' : i < 839 ? 'Brand Logos' : '';
      const ext = i % 5 === 4 ? 'png' : 'jpg';
      return mk(i % 5 === 4 ? `asset-graphic-${i}.png` : `gallery-photo-${i}.jpg`, 'image', size, folder);
    });
    const vids = vidSizes.map((size, i) => {
      const folder = i < 29 ? 'Testimonials' : i < 49 ? 'Downloads' : '';
      return mk(`clip-${i}.mp4`, 'video', size, folder);
    });
    const docs = docSizes.map((size, i) => {
      const folder = i < 24 ? 'Testimonials' : i < 33 ? 'Downloads' : '';
      return mk(`doc-${i}.pdf`, 'document', size, folder);
    });
    const auds = audSizes.map((size, i) => mk(`track-${i}.mp3`, 'audio', size, i < 9 ? 'Downloads' : ''));
    const oths = othSizes.map((size, i) => mk(`archive-${i}.zip`, 'other', size, ''));
    // round-robin interleave so pages mix types; then stagger created_at by position
    const bulk = [];
    const groups = [imgs, vids, docs, auds, oths];
    const maxLen = Math.max(...groups.map((g) => g.length));
    for (let i = 0; i < maxLen; i++) for (const g of groups) if (g[i]) bulk.push(g[i]);
    const t0 = Date.parse('2025-05-24T08:00:00Z');
    bulk.forEach((r, k) => { r.created_at = new Date(t0 - k * 5 * 36e5).toISOString(); });
    return [...heroes, ...bulk];
  })();

  // ponytail: same response-only demo pattern for the assistant + proposal boards.
  // The chat thread mirrors the Assistant mockup; proposal rows mirror its Recent
  // list. Never in SQLite (POST ids stay deterministic); the boards list demos first.
  const DEMO_MESSAGES = [
    ['user', 'Can you analyze our landing page and suggest 5 ways to improve conversions?', 'Landing page audit', '2025-05-24T10:32:00', '10:32 AM', '10:32 AM'],
    ['assistant', 'Absolutely! I\'ve analyzed your landing page and here are 5 impactful ways to improve conversions:\n\n1 Stronger Headline\nMake the value proposition clearer and benefit-driven. Focus on what users gain, not just what you do.\n\n2 Clear CTA Above the Fold\nYour primary CTA is too low. Add a high-contrast CTA button in the hero section to drive immediate action.\n\n3 Social Proof & Trust Signals\nAdd testimonials, client logos, or trust badges to build credibility and reduce hesitation.\n\n4 Simplify the Message\nReduce text and focus on a single core message. Use visual hierarchy to guide the user\'s attention.\n\n5 Optimize for Speed & Mobile\nImprove load time and mobile experience. Faster sites convert better.\n\nWould you like me to generate a mockup or a detailed audit report? 🚀', 'Landing page audit', '2025-05-24T10:33:00', '10:33 AM', '10:32 AM'],
    ['user', 'Help me create 5 unique brand positioning ideas for a fintech startup.', 'Brand positioning ideas', '2025-05-23T15:00:00', '', 'Yesterday'],
    ['user', 'What are the top SEO priorities for our new website?', 'SEO improvement plan', '2025-05-24T09:00:00', '', 'May 24'],
    ['user', 'Write hero section copy for our SaaS landing page.', 'Website copy for SaaS', '2025-05-22T11:00:00', '', 'May 22'],
    ['user', 'How to maintain consistency across a growing design system?', 'Design system guidance', '2025-05-20T14:00:00', '', 'May 20'],
    ['user', 'Analyze our top 3 competitors and summarize their positioning.', 'Competitor analysis', '2025-05-18T10:00:00', '', 'May 18'],
    ['user', 'Why is our LCP time high and how do we fix it?', 'Performance issues', '2025-05-16T09:00:00', '', 'May 16'],
    ['user', 'Suggest AI tools for content and design workflows.', 'AI tools recommendations', '2025-05-14T12:00:00', '', 'May 14'],
  ].map(([role, content, thread, created_at, time, when], i) => ({
    id: 9201 + i, role, content, thread, created_at, _demo: true, time, when,
  }));
  const DEMO_PROPOSALS = [
    ['Luxoré Jewels — Website Redesign', 'Luxoré Jewels', 'Web Design & Development · 6–8 Weeks', 62500, 'draft', '2025-05-24T10:00:00', 'AES-2505-18', 'May 24, 2025', 'Draft'],
    ['Vertex — Brand Identity', 'Vertex Branding', 'Brand Identity · 5 Weeks', 48000, 'sent', '2025-05-20T11:00:00', 'AES-2505-12', 'May 20, 2025', 'Sent'],
    ['Nexa Interiors — Website Build', 'Nexa Interiors', 'Website Design · 8 Weeks', 54000, 'sent', '2025-05-18T09:00:00', 'AES-2505-09', 'May 18, 2025', 'Viewed'],
    ['Horizon Labs — UI/UX Design', 'Horizon Labs', 'Product Design · 6 Weeks', 40000, 'accepted', '2025-05-15T14:00:00', 'AES-2505-06', 'May 15, 2025', 'Accepted'],
  ].map(([title, client, scope, investment, status, created_at, number, date_label, status_label], i) => ({
    id: 9101 + i, title, client, scope, investment, status, created_at, _demo: true, number, date_label, status_label,
  }));

  const list = (res, table, e, qs) => {
    const p = new URLSearchParams(qs);
    const where = [];
    const args = [];
    if (p.get('q') && e.search) {
      where.push(`(${e.search.map((f) => `${f} LIKE ?`).join(' OR ')})`);
      const like = `%${p.get('q')}%`;
      for (let i = 0; i < e.search.length; i++) args.push(like);
    }
    for (const f of e.fields) if (p.get(f)) { where.push(`${f} = ?`); args.push(p.get(f)); }
    const rows = db.prepare(`SELECT * FROM ${table}${where.length ? ' WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC`).all(...args);
    if ((table === 'projects' || table === 'articles') && !p.get('q') && !e.fields.some((f) => p.get(f)))
      rows.push(...(table === 'projects' ? DEMO_PROJECTS : DEMO_ARTICLES));
    if (table === 'media' && !p.get('q') && !e.fields.some((f) => p.get(f))) rows.push(...DEMO_MEDIA);
    if ((table === 'messages' || table === 'proposals') && !p.get('q') && !e.fields.some((f) => p.get(f)))
      rows.push(...(table === 'messages' ? DEMO_MESSAGES : DEMO_PROPOSALS));
    send(res, 200, { ok: true, data: rows });
  };

  // read-only aggregates for the dashboard / analytics / search screens
  const table = (t) => `SELECT COUNT(*) n FROM ${t}`;
  const count = (t, f, v) => db.prepare(`${table(t)}${f ? ` WHERE ${f} = ?` : ''}`).get(...(v !== undefined ? [v] : [])).n;

  const dashboard = (res) => {
    const recent = (t, n) => db.prepare(`SELECT * FROM ${t} ORDER BY id DESC LIMIT ?`).all(n);
    // sidebar identity, so the admin pages don't have to hardcode a name. ponytail:
    // ADMIN_TOKEN is one shared secret, so there is no real "current user" — this is
    // the seeded admin row. Swap for the session's own user once auth is per-user.
    const u = db.prepare(`SELECT name, role, email FROM users WHERE role = 'admin' ORDER BY id LIMIT 1`).get() || {};
    const words = String(u.name || '').trim().split(/\s+/).filter(Boolean);
    const roleLabel = u.role === 'admin' ? 'Administrator' : (u.role ? u.role[0].toUpperCase() + u.role.slice(1) : '');
    const user = {
      name: u.name || '',
      role: roleLabel,
      email: u.email || '',
      initials: words.map((w) => w[0]).slice(0, 2).join('').toUpperCase(),
      first: words[0] || '',
    };
    // ponytail: chart series are demo numbers — no analytics source is wired yet.
    // Upgrade path: replace kpis/traffic/sources with a real analytics API
    // (Plausible/GA) and keep activity/top_pages/health as computed + static checks.
    const traffic = [8420, 9100, 8750, 10200, 11400, 10980, 12543];
    return send(res, 200, {
      ok: true,
      user,
      stats: {
        projects_active: count('projects', 'status', 'active'),
        projects_in_review: count('projects', 'status', 'review'),
        projects_completed: count('projects', 'status', 'completed'),
        leads_new: count('leads', 'status', 'new'),
        leads_won: count('leads', 'status', 'won'),
        leads_replied_24h: db.prepare(`SELECT COUNT(*) n FROM leads WHERE replied_at != '' AND (julianday('now') - julianday(replied_at)) <= 1`).get().n,
        invoices_outstanding: count('invoices', 'status', 'outstanding'),
        invoices_collected: count('invoices', 'status', 'paid'),
        users_team: count('users', 'role', 'team'),
        users_clients: count('users', 'role', 'client'),
        tasks_open: count('tasks', 'status', 'todo') + count('tasks', 'status', 'in progress'),
      },
      kpis: [
        { label: 'Total Visitors', value: '12,543', delta: '18.6%', spark: [1200, 2100, 1800, 4200, 2900, 5200, 6400, 11000, 4200] },
        { label: 'Leads Captured', value: '842', delta: '24.3%', spark: [300, 500, 380, 620, 540, 700, 660, 880, 840] },
        { label: 'Proposals Generated', value: '156', delta: '31.7%', spark: [200, 340, 420, 320, 480, 560, 420, 620, 700] },
        { label: 'Revenue', value: '₹8,45,230', delta: '21.4%', spark: [300, 420, 520, 640, 580, 760, 840, 900, 880] },
        { label: 'Conversion Rate', value: '3.42%', delta: '8.7%', spark: [400, 360, 480, 420, 560, 500, 620, 720, 680] },
      ],
      traffic: {
        total: '12,543',
        delta: '18.6%',
        labels: ['May 18', 'May 19', 'May 20', 'May 21', 'May 22', 'May 23', 'May 24'],
        series: [
          { name: 'Visitors', points: traffic },
          { name: 'Previous week', points: [7900, 8400, 8600, 9300, 9800, 10200, 10800] },
        ],
      },
      sources: [
        { name: 'Direct', pct: 42.6, value: 5343, color: '#7C5CFF' },
        { name: 'Organic Search', pct: 28.7, value: 3600, color: '#3B82F6' },
        { name: 'Referrals', pct: 14.3, value: 1794, color: '#FBBF24' },
        { name: 'Social Media', pct: 8.4, value: 1054, color: '#FB923C' },
        { name: 'Email', pct: 4.1, value: 514, color: '#EC4899' },
        { name: 'Others', pct: 1.9, value: 238, color: '#60A5FA' },
      ],
      health: [
        { label: 'Server Status', status: 'ok', detail: 'All systems operational' },
        { label: 'Database', status: 'ok', detail: 'Optimized' },
        { label: 'SSL Certificate', status: 'ok', detail: 'Valid (89 days)' },
        { label: 'Backup', status: 'ok', detail: 'Last backup: 2h ago' },
        { label: 'Storage', status: 'ok', detail: '45% used (228 GB / 500 GB)', pct: 45 },
        { label: 'Uptime', status: 'ok', detail: '99.98%' },
      ],
      activity: [
        { type: 'Lead', title: 'New lead captured from Contact Form', meta: 'Name: Sarah Johnson • sarah.j@example.com', time: '2 min ago' },
        { type: 'Proposal', title: 'Proposal generated for Luxe Jewelry', meta: 'Project ID: #P-2025-041', time: '15 min ago' },
        { type: 'Blog', title: 'Blog post published', meta: 'Title: "Top 10 Web Design Trends in 2025"', time: '45 min ago' },
        { type: 'Project', title: 'New project created', meta: 'Project: TechCorp Website Redesign', time: '1 hr ago' },
        { type: 'User', title: 'User role updated', meta: 'User: Ananya Singh • Role: Editor', time: '2 hr ago' },
      ],
      top_pages: [
        { path: '/', views: 3245, visitors: 2341, bounce: 32.4, avg_time: '2m 45s' },
        { path: '/services', views: 2157, visitors: 1742, bounce: 28.1, avg_time: '2m 18s' },
        { path: '/portfolio', views: 1892, visitors: 1356, bounce: 31.8, avg_time: '2m 05s' },
        { path: '/about', views: 1245, visitors: 987, bounce: 25.7, avg_time: '1m 42s' },
        { path: '/contact', views: 1004, visitors: 796, bounce: 22.3, avg_time: '1m 38s' },
      ],
      recent_leads: recent('leads', 4),
      upcoming_tasks: [
        { title: 'Review project proposal', project: 'Website Redesign', due_date: '2025-05-25', status: 'todo' },
        { title: 'Publish case study', project: 'Fintech Landing Page', due_date: '2025-05-26', status: 'todo' },
        { title: 'Client meeting', project: 'TechCorp Project Kickoff', due_date: '2025-05-27', status: 'todo' },
      ],
    });
  };

  const analytics = (res) => {
    // ponytail: static demo numbers — the prototype screens show placeholder metrics.
    // Upgrade path: wire a real analytics source (Plausible/GA) and replace these.
    return send(res, 200, {
      ok: true,
      visitors_30d: 12543,
      page_views: 28721,
      sessions: 16879,
      bounce_rate: 34.2,
      avg_session: '02m 34s',
      conversions: 678,
      conversion: 4.2,
      top_source: 'Organic Search',
      kpis: [
        { label: 'Total Visitors', value: '12,543', delta: '18.6%', dir: 'up' },
        { label: 'Page Views', value: '28,721', delta: '21.4%', dir: 'up' },
        { label: 'Sessions', value: '16,879', delta: '16.2%', dir: 'up' },
        { label: 'Avg. Session Duration', value: '02m 34s', delta: '8.7%', dir: 'up' },
        { label: 'Bounce Rate', value: '34.2%', delta: '5.3%', dir: 'down' },
      ],
      traffic: {
        labels: ['May 18', 'May 19', 'May 20', 'May 21', 'May 22', 'May 23', 'May 24'],
        visitors: [2800, 3500, 4400, 4000, 3450, 3100, 3800, 5923, 4700, 4300, 5200, 5800, 5400, 6100, 7800, 6800, 5900],
        tip_index: 7,
        tip_label: 'May 21, 2025',
        tip_value: '5,923 Visitors',
      },
      sources: [
        { source: 'Organic Search', pct: 42.6, color: '#7C5CFF' },
        { source: 'Direct', pct: 28.7, color: '#3B82F6' },
        { source: 'Referral', pct: 14.3, color: '#FBBF24' },
        { source: 'Social Media', pct: 8.4, color: '#F87171' },
        { source: 'Email', pct: 4.1, color: '#A78BFA' },
        { source: 'Others', pct: 1.9, color: '#60A5FA' },
      ],
      realtime: {
        active: 87,
        per_minute: [14, 22, 18, 26, 20, 30, 24, 34, 28, 22, 32, 26, 38, 30, 24, 36, 28, 42, 34, 26, 40, 32, 44, 36, 28, 46],
        active_pages: [['/', 24], ['/services', 18], ['/portfolio', 14], ['/about', 9], ['/contact', 7]],
      },
      countries: [
        { name: 'India', code: 'IN', visitors: 5215, pct: 41.5, color: '#7C5CFF' },
        { name: 'United States', code: 'US', visitors: 2251, pct: 17.9, color: '#3B82F6' },
        { name: 'United Kingdom', code: 'UK', visitors: 1245, pct: 9.9, color: '#60A5FA' },
        { name: 'Canada', code: 'CA', visitors: 842, pct: 6.7, color: '#FBBF24' },
        { name: 'Australia', code: 'AU', visitors: 621, pct: 4.9, color: '#34D399' },
      ],
      devices: [
        { name: 'Desktop', pct: 58.7, value: 7363, color: '#7C5CFF' },
        { name: 'Mobile', pct: 35.8, value: 4500, color: '#22C55E' },
        { name: 'Tablet', pct: 5.5, value: 681, color: '#3B82F6' },
      ],
      top_pages: [
        { path: '/', views: 3245, pct: 11.3 },
        { path: '/services', views: 2157, pct: 7.5 },
        { path: '/portfolio', views: 1892, pct: 6.6 },
        { path: '/about', views: 1245, pct: 4.3 },
        { path: '/blog/ux-design-trends', views: 1004, pct: 3.5 },
      ],
      traffic_table: [
        { source: 'Google', icon: 'G', color: '#FBBF24', visitors: 5342, share: 42.6, sessions: 6321, bounce: 28.4, conv: 3.2 },
        { source: 'Direct', icon: 'D', color: '#3B82F6', visitors: 3603, share: 28.7, sessions: 4215, bounce: 32.1, conv: 2.8 },
        { source: 'Bing', icon: 'B', color: '#22C55E', visitors: 1256, share: 10.0, sessions: 1642, bounce: 29.7, conv: 2.5 },
        { source: 'Facebook', icon: 'f', color: '#60A5FA', visitors: 842, share: 6.7, sessions: 1123, bounce: 35.4, conv: 1.9 },
        { source: 'LinkedIn', icon: 'in', color: '#0A66C2', visitors: 512, share: 4.1, sessions: 623, bounce: 31.8, conv: 2.1 },
        { source: 'Others', icon: 'O', color: '#F97316', visitors: 988, share: 7.9, sessions: 1955, bounce: 33.6, conv: 2.3 },
      ],
      conversions_overview: [
        { name: 'Form Submissions', value: 243, delta: '15.6%', dir: 'up', color: '#3B82F6', spark: [30, 45, 38, 55, 48, 62, 58, 70, 66, 78] },
        { name: 'Newsletter Signups', value: 187, delta: '12.3%', dir: 'up', color: '#22C55E', spark: [25, 35, 30, 42, 38, 50, 46, 55, 52, 60] },
        { name: 'Project Inquiries', value: 92, delta: '9.6%', dir: 'up', color: '#7C5CFF', spark: [20, 28, 24, 32, 30, 36, 34, 40, 38, 44] },
        { name: 'Downloads', value: 156, delta: '3.2%', dir: 'down', color: '#F87171', spark: [60, 55, 58, 50, 52, 46, 48, 42, 44, 38] },
      ],
      goals: [
        { name: 'Submit Contact Form', completed: 143, rate: 3.2 },
        { name: 'Newsletter Signup', completed: 187, rate: 4.1 },
        { name: 'Download Resources', completed: 156, rate: 2.8 },
        { name: 'Project Inquiry', completed: 92, rate: 1.9 },
      ],
    });
  };

  const searchAll = (res, qs) => {
    const p = new URLSearchParams(qs);
    const q = p.get('q');
    if (!q) return send(res, 400, { ok: false, error: 'q is required.' });
    const like = `%${q}%`;
    // ponytail: snippets are the first non-empty descriptive columns, capped
    // at 140 chars — ceiling is no full-text ranking. Upgrade path: SQLite FTS5.
    const SNIPPET = { projects: ['client', 'category', 'description'], leads: ['company', 'email', 'message'], articles: ['category', 'status'], files: ['project', 'type', 'size'], meetings: ['attendees', 'summary'], forms: ['email', 'message'], tasks: ['project', 'assignee'], milestones: ['status', 'due_date'], messages: ['content'], invoices: ['client', 'project'], proposals: ['client', 'scope'], feedback: ['source', 'message'], users: ['email', 'role'], subscriptions: ['client', 'plan'], media: ['type', 'usage'] };
    const out = [];
    for (const [name, e] of Object.entries(entities)) {
      if (!e.search) continue;
      const rows = db.prepare(`SELECT * FROM ${name} WHERE ${e.search.map((f) => `${f} LIKE ?`).join(' OR ')} LIMIT 3`).all(...e.search.map(() => like));
      for (const r of rows) {
        const snippet = (SNIPPET[name] || []).map((f) => String(r[f] ?? '').trim()).filter(Boolean).join(' · ').slice(0, 140);
        out.push({ type: name, id: r.id, title: r.title || r.name || r.email || r.form_name || snippet || name, label: r.client || r.company || '', snippet });
      }
    }
    return send(res, 200, { ok: true, data: out });
  };

  const settingsAll = (res) => send(res, 200, { ok: true, data: db.prepare(`SELECT section, key, value FROM settings ORDER BY section, key`).all() });
  const settingsUpsert = (res, d) => {
    const entries = Object.entries(d ?? {}).filter(([, v]) => v !== undefined);
    if (!entries.length) return send(res, 400, { ok: false, error: 'Nothing to update' });
    const upsert = db.prepare(`INSERT INTO settings (section, key, value, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(section, key) DO UPDATE SET value = excluded.value`);
    for (const [key, value] of entries) upsert.run('general', key, String(value), now());
    return send(res, 200, { ok: true, updated: entries.length });
  };

  // ponytail: public read-only slice for the marketing pages (/work, /journal fetch
  // these with no session). Filtered + field-whitelisted by design: drafts/scheduled
  // articles and on-hold/cancelled projects never leave the server, and internal
  // columns (budget, deadline) are stripped. DB rows only — no DEMO_* mockup rows.
  // Ceiling: no pagination (fine for a portfolio-scale list). Always open, even when
  // ADMIN_TOKEN gates the rest of /api/*.
  const PUBLIC_PROJECT_COLS = 'id, title, client, category, status, progress, timeline, description, created_at';
  const publicList = (res, sql, args = []) => send(res, 200, { ok: true, data: db.prepare(sql).all(...args) });
  const handlePublic = (req, res, path) => {
    if (req.method !== 'GET') { send(res, 405, { ok: false, error: 'Method not allowed' }); return true; }
    let m = path.match(/^\/api\/public\/projects(?:\/(\d+))?$/);
    if (m) {
      if (m[1]) {
        const row = db.prepare(`SELECT ${PUBLIC_PROJECT_COLS} FROM projects WHERE id = ? AND status IN ('active','completed')`).get(m[1]);
        if (!row) return send(res, 404, { ok: false, error: 'Not found' }), true;
        return send(res, 200, { ok: true, data: row }), true;
      }
      return publicList(res, `SELECT ${PUBLIC_PROJECT_COLS} FROM projects WHERE status IN ('active','completed') ORDER BY id DESC`), true;
    }
    m = path.match(/^\/api\/public\/articles(?:\/(\d+))?$/);
    if (m) {
      if (m[1]) {
        const row = db.prepare(`SELECT * FROM articles WHERE id = ? AND status = 'published'`).get(m[1]);
        if (!row) return send(res, 404, { ok: false, error: 'Not found' }), true;
        return send(res, 200, { ok: true, data: row }), true;
      }
      return publicList(res, `SELECT * FROM articles WHERE status = 'published' ORDER BY id DESC`), true;
    }
    return false;
  };

  return async (req, res) => {
    const [path, qs = ''] = req.url.split('?');
    if (path.startsWith('/api/public/')) {
      if (handlePublic(req, res, path)) return;
      return send(res, 404, { ok: false, error: 'Unknown endpoint' });
    }
    // admin API is gated behind a Bearer token when one is configured (ADMIN_TOKEN).
    // /api/contact stays public — the marketing site contact form posts to it.
    // /api/session is how the cookie gets bootstrapped — the login form has no
    // Bearer header yet, so it validates the token in its body instead.
    // Everything else accepts either the Bearer token (curl/scripts) or the session
    // cookie a signed-in browser holds (serve.mjs uses the same cookie for the pages).
    if (token && path !== '/api/contact' && path !== '/api/session'
      && req.headers.authorization !== `Bearer ${token}`
      && !verifySession(req.headers.cookie, token))
      return send(res, 401, { ok: false, error: 'Unauthorized — ADMIN_TOKEN required' });
    const m = path.match(/^\/api\/([a-z-]+)(?:\/(\d+))?(?:\/([a-z-]+))?$/);
    if (!m) return send(res, 404, { ok: false, error: 'Unknown endpoint' });
    let name = m[1], id = m[2], action = m[3];
    // exchange ADMIN_TOKEN for the session cookie the HTML gate reads; DELETE clears it
    if (name === 'session') {
      if (req.method === 'POST') {
        if (!token) return send(res, 200, { ok: true, open: true }); // no ADMIN_TOKEN configured (local dev)
        const d = await jsonBody(req, res);
        if (!d) return;
        if (!safeEqual(d.token ?? '', token)) return send(res, 401, { ok: false, error: 'Invalid token' });
        const secure = (req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https';
        return sendSession(res, sessionCookie(token, secure));
      }
      if (req.method === 'DELETE') return sendSession(res, clearedSessionCookie());
      return send(res, 405, { ok: false, error: 'Method not allowed' });
    }
    // the contact form posts here; it is just a lead with status 'new'
    if (name === 'contact') {
      const ct = (req.headers['content-type'] || '').split(';')[0];
      const d = ct === 'application/x-www-form-urlencoded' ? await formBody(req, res) : await jsonBody(req, res);
      if (!d) return;
      if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed' });
      return create(res, 'leads', entities.leads, { status: 'new', ...d });
    }
    if (name === 'dashboard' && req.method === 'GET') return dashboard(res);
    if (name === 'analytics' && req.method === 'GET') return analytics(res);
    if (name === 'search' && req.method === 'GET') return searchAll(res, qs);
    if (name === 'settings') {
      if (req.method === 'GET') return settingsAll(res);
      if (req.method === 'PUT') {
        const d = await jsonBody(req, res);
        if (!d) return;
        return settingsUpsert(res, d);
      }
      return send(res, 405, { ok: false, error: 'Method not allowed' });
    }
    const e = entities[name];
    if (!e) return send(res, 404, { ok: false, error: `No such resource: ${name}` });
    // lead → project conversion: marks the lead won and creates a project from it
    if (name === 'leads' && action === 'convert') {
      if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed' });
      const lead = db.prepare(`SELECT * FROM leads WHERE id = ?`).get(id);
      if (!lead) return send(res, 404, { ok: false, error: 'Lead not found' });
      if (lead.status === 'won') return send(res, 409, { ok: false, error: 'Lead already converted' });
      const info = db.prepare(`INSERT INTO projects (title, client, status, description, created_at) VALUES (?, ?, 'active', ?, ?)`)
        .run(`${lead.company || lead.name} — new engagement`, lead.company || lead.name, lead.message, now());
      db.prepare(`UPDATE leads SET status = 'won', replied_at = ? WHERE id = ?`).run(now(), id);
      return send(res, 201, { ok: true, lead_id: Number(id), project_id: Number(info.lastInsertRowid) });
    }
    if (action) return send(res, 404, { ok: false, error: 'Unknown action' });
    if (id) {
      if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return send(res, 405, { ok: false, error: 'Method not allowed' });
      const row = db.prepare(`SELECT * FROM ${name} WHERE id = ?`).get(id);
      if (!row) return send(res, 404, { ok: false, error: 'Not found' });
      if (req.method === 'GET') return send(res, 200, { ok: true, data: row });
      if (req.method === 'DELETE') {
        db.prepare(`DELETE FROM ${name} WHERE id = ?`).run(id);
        return send(res, 200, { ok: true, id: Number(id) });
      }
      const d = await jsonBody(req, res);
      if (!d) return;
      if (e.statuses && d.status !== undefined && !e.statuses.includes(d.status)) return send(res, 400, { ok: false, error: `status must be one of: ${e.statuses.join(', ')}.` });
      const patch = pick(e, d);
      if (!Object.keys(patch).length) return send(res, 400, { ok: false, error: 'Nothing to update' });
      if (e.validate) { const err = e.validate({ ...row, ...d }); if (err) return send(res, 400, { ok: false, error: err }); }
      // leads: stamp replied_at the first time a lead moves past 'new'
      if (name === 'leads' && d.status && d.status !== 'new' && !row.replied_at) patch.replied_at = now();
      db.prepare(`UPDATE ${name} SET ${Object.keys(patch).map((f) => `${f} = ?`).join(', ')} WHERE id = ?`).run(...Object.values(patch), id);
      return send(res, 200, { ok: true, id: Number(id) });
    }
    // chat assistant: a user message in the default thread earns a real reply (see
    // assistantReply above). file:<id> threads are studio inbox notes from the client
    // review page, and manually added assistant rows never trigger a reply.
    if (name === 'messages' && req.method === 'POST') {
      const d = await jsonBody(req, res);
      if (!d) return;
      return create(res, name, e, d, async (id) => {
        if (d.role !== 'user' || (d.thread || 'general') !== 'general') return send(res, 201, { ok: true, id });
        const reply = await assistantReply('general');
        if (reply === null) return send(res, 201, { ok: true, id }); // dormant
        const ins = db.prepare(`INSERT INTO messages (role, content, thread, created_at) VALUES ('assistant', ?, 'general', ?)`).run(reply, now());
        return send(res, 201, { ok: true, id, reply_id: Number(ins.lastInsertRowid) });
      });
    }
    if (req.method === 'GET') return list(res, name, e, qs);
    if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed' });
    const d = await jsonBody(req, res);
    if (!d) return;
    return create(res, name, e, d);
  };
}
