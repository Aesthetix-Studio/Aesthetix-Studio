// JSON admin API for the tool screens — Node stdlib only (node:sqlite), zero deps.
// Mounted by scripts/serve.mjs at /api/*. Deliberately NOT wired to the frontend yet.
// ponytail: generic CRUD over one SQLite file. Ceiling: single process/file, no auth,
// no pagination. Upgrade path: hosted DB + serverless functions + token auth when deployed.
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const now = () => new Date().toISOString();

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
      ['Designing for clarity in a noisy world.', 'Rohit M.', 'Design', 'published', '8 min', 8432],
      ['What good product strategy actually looks like.', 'Ananya S.', 'Strategy', 'published', '6 min', 6218],
      ['The case for fewer, better features.', 'Rohit M.', 'Process', 'draft', '5 min', 0],
      ['Building AI products people can trust.', 'Ananya S.', 'AI', 'scheduled', '7 min', 0],
      ['How AI is Transforming UX Design', 'Ananya S.', 'AI & Tech', 'published', '6 min', 6218],
      ['Brand Identity: A Complete Guide', 'Rohit M.', 'Branding', 'review', '12 min', 0],
      ['Case Study: Luxoré Jewels Website', 'Ananya S.', 'Case Study', 'published', '5 min', 4102],
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
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, type TEXT DEFAULT 'file', size TEXT DEFAULT '', project TEXT DEFAULT '', usage TEXT DEFAULT 'unused', uploaded_by TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['name', 'type', 'size', 'project', 'usage', 'uploaded_by'],
    required: ['name'],
    defaults: { type: 'file', usage: 'unused' },
    search: ['name', 'type', 'project', 'usage'],
    seed: [
      ['brand-guidelines.pdf', 'document', '4.1 MB', 'Luminary Financial', 'unused', 'Maya Iyer'],
      ['design-system.fig', 'design', '18 MB', 'Kora Health', 'used', 'Aarav Shah'],
      ['case-study-notes.md', 'document', '12 KB', 'Vertex', 'used', 'Sarah Chen'],
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
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, project_id INTEGER DEFAULT 0, title TEXT NOT NULL, status TEXT DEFAULT 'scheduled', due_date TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['project_id', 'title', 'status', 'due_date'],
    required: ['title'],
    defaults: { project_id: 0, status: 'scheduled' },
    statuses: ['scheduled', 'in progress', 'complete'],
    search: ['title', 'status'],
    seed: [
      [1, 'Discovery & audit', 'complete', '2026-08-01'],
      [1, 'Design sprint', 'in progress', '2026-08-15'],
      [1, 'Build & QA', 'scheduled', '2026-09-10'],
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
  settings: {
    // key/value store — /api/settings is intercepted below (GET all, PUT upsert)
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, section TEXT DEFAULT 'general', key TEXT NOT NULL, value TEXT DEFAULT '', created_at TEXT NOT NULL, UNIQUE(section, key)",
    fields: ['section', 'key', 'value'],
    required: ['key'],
    defaults: { section: 'general', value: '' },
    seed: [
      ['general', 'site_name', 'Aesthetix Studio'],
      ['general', 'contact_email', 'hello@aesthetixstudio.com'],
      ['general', 'tagline', 'Design that drives results.'],
      ['general', 'site_url', 'https://aesthetixstudio.com'],
      ['general', 'site_description', 'A premium design & development studio crafting exceptional digital experiences for ambitious brands.'],
      ['general', 'admin_email', 'rohit@aesthetixstudio.com'],
      ['general', 'contact_phone', '+91 98765 43210'],
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
export function createApi({ file, token = '' }) {
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
  };
  for (const [name, e] of Object.entries(entities)) {
    db.exec(`CREATE TABLE IF NOT EXISTS ${name} (${e.cols})`);
    ensureCols(name, migrate[name] || []);
    ensureCols(name, ['replied_at TEXT DEFAULT ""']); // leads.replied_at for 24h-reply tracking
    const { n } = db.prepare(`SELECT COUNT(*) n FROM ${name}`).get();
    if (!n && e.seed?.length) {
      const ins = db.prepare(`INSERT INTO ${name} (${e.fields.join(', ')}, created_at) VALUES (${e.fields.map(() => '?').join(', ')}, ?)`);
      for (const row of e.seed) ins.run(...row, now());
    }
  }

  const create = (res, table, e, d) => {
    for (const f of e.required) if (!String(d[f] ?? '').trim()) return send(res, 400, { ok: false, error: `${f} is required.` });
    if (e.statuses && d.status !== undefined && !e.statuses.includes(d.status)) return send(res, 400, { ok: false, error: `status must be one of: ${e.statuses.join(', ')}.` });
    if (e.validate) { const err = e.validate(d); if (err) return send(res, 400, { ok: false, error: err }); }
    const info = db.prepare(`INSERT INTO ${table} (${e.fields.join(', ')}, created_at) VALUES (${e.fields.map(() => '?').join(', ')}, ?)`).run(...values(e, d), now());
    return send(res, 201, { ok: true, id: Number(info.lastInsertRowid) });
  };

  const list = (res, table, e, qs) => {
    const p = new URLSearchParams(qs);
    const where = [];
    const args = [];
    if (p.get('q')) {
      where.push(`(${e.search.map((f) => `${f} LIKE ?`).join(' OR ')})`);
      const like = `%${p.get('q')}%`;
      for (let i = 0; i < e.search.length; i++) args.push(like);
    }
    for (const f of e.fields) if (p.get(f)) { where.push(`${f} = ?`); args.push(p.get(f)); }
    const rows = db.prepare(`SELECT * FROM ${table}${where.length ? ' WHERE ' + where.join(' AND ') : ''} ORDER BY id DESC`).all(...args);
    send(res, 200, { ok: true, data: rows });
  };

  // read-only aggregates for the dashboard / analytics / search screens
  const table = (t) => `SELECT COUNT(*) n FROM ${t}`;
  const count = (t, f, v) => db.prepare(`${table(t)}${f ? ` WHERE ${f} = ?` : ''}`).get(...(v !== undefined ? [v] : [])).n;

  const dashboard = (res) => {
    const recent = (t, n) => db.prepare(`SELECT * FROM ${t} ORDER BY id DESC LIMIT ?`).all(n);
    // ponytail: chart series are demo numbers — no analytics source is wired yet.
    // Upgrade path: replace kpis/traffic/sources with a real analytics API
    // (Plausible/GA) and keep activity/top_pages/health as computed + static checks.
    const traffic = [8420, 9100, 8750, 10200, 11400, 10980, 12543];
    return send(res, 200, {
      ok: true,
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
        { label: 'Total Visitors', value: '12,543', delta: '+16.2%', spark: [620, 780, 640, 890, 1020, 940, 1250] },
        { label: 'Leads Captured', value: '842', delta: '+8.4%', spark: [40, 55, 48, 72, 66, 88, 92] },
        { label: 'Proposals Generated', value: '156', delta: '+5.1%', spark: [12, 15, 10, 18, 16, 21, 24] },
        { label: 'Revenue', value: '₹8,45,230', delta: '+12.7%', spark: [55, 70, 64, 82, 96, 88, 120] },
        { label: 'Conversion Rate', value: '3.42%', delta: '+0.4%', spark: [2.8, 3.0, 2.9, 3.2, 3.1, 3.3, 3.4] },
      ],
      traffic: {
        total: '12,543',
        delta: '+16.2%',
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [
          { name: 'Visitors', points: traffic },
          { name: 'Previous week', points: [7900, 8400, 8600, 9300, 9800, 10200, 10800] },
        ],
      },
      sources: [
        { name: 'Organic Search', pct: 28.7, value: 3600, color: '#6C5CE7' },
        { name: 'Direct', pct: 24.3, value: 3048, color: '#f59e0b' },
        { name: 'Referral', pct: 18.6, value: 2333, color: '#22c55e' },
        { name: 'Social Media', pct: 8.4, value: 1054, color: '#3b82f6' },
        { name: 'Email', pct: 12.0, value: 1505, color: '#ec4899' },
        { name: 'Other', pct: 8.0, value: 1003, color: '#8b5cf6' },
      ],
      health: [
        { label: 'Server Status', status: 'ok', detail: 'All systems operational' },
        { label: 'Database', status: 'ok', detail: 'Optimized' },
        { label: 'SSL Certificate', status: 'ok', detail: 'Valid (89 days)' },
        { label: 'Backup', status: 'ok', detail: 'Last backup: 2h ago' },
        { label: 'Storage', status: 'ok', detail: '42% of 50 GB used' },
        { label: 'Uptime', status: 'ok', detail: '99.96%' },
      ],
      activity: [
        { type: 'Lead', title: 'New lead captured from Contact Form', meta: '', time: '2 min ago' },
        { type: 'Proposal', title: 'Proposal generated for Luxe Jewelry', meta: 'Project ID: #P-2025-041', time: '15 min ago' },
        { type: 'Blog', title: 'Blog post published', meta: '', time: '45 min ago' },
        { type: 'Invoice', title: 'Invoice #INV-2026-014 paid', meta: 'Luminary Financial', time: '1h ago' },
        { type: 'Task', title: 'Task completed: Send discovery summary', meta: '', time: '3h ago' },
      ],
      top_pages: [
        { path: '/', views: 3245, visitors: 2341, bounce: 32.4, avg_time: '2m 45s' },
        { path: '/services', views: 2157, visitors: 1742, bounce: 28.1, avg_time: '2m 18s' },
        { path: '/portfolio', views: 1892, visitors: 1356, bounce: 31.8, avg_time: '2m 05s' },
        { path: '/about', views: 1543, visitors: 1210, bounce: 26.4, avg_time: '2m 52s' },
        { path: '/journal', views: 1276, visitors: 998, bounce: 34.2, avg_time: '1m 58s' },
      ],
      recent_leads: recent('leads', 4),
      upcoming_tasks: db.prepare(`SELECT * FROM tasks WHERE status != 'done' ORDER BY due_date ASC LIMIT 5`).all(),
    });
  };

  const analytics = (res) => {
    // ponytail: static demo numbers — the prototype screens show placeholder metrics.
    // Upgrade path: wire a real analytics source (Plausible/GA) and replace these.
    return send(res, 200, {
      ok: true,
      visitors_30d: 48294,
      page_views: 124568,
      bounce_rate: 38.7,
      avg_session: '3m 42s',
      conversions: 1842,
      conversion: 4.2,
      top_source: 'Organic',
      realtime: { active: 247, pages_min: 842, top_page: '/services', top_country: 'India 68%', top_device: 'Mobile 54%', new_return: '62% / 38%' },
      countries: [
        { name: 'India', pct: 68, color: '#6C5CE7' },
        { name: 'United States', pct: 14, color: '#3b82f6' },
        { name: 'United Kingdom', pct: 8, color: '#22c55e' },
        { name: 'UAE', pct: 6, color: '#f59e0b' },
      ],
      devices: [
        { name: 'Mobile', pct: 54.2, color: '#6C5CE7' },
        { name: 'Desktop', pct: 36.8, color: '#3b82f6' },
        { name: 'Tablet', pct: 9.0, color: '#22c55e' },
      ],
      conversions_by_source: [
        { name: 'Contact Form', value: 642 },
        { name: 'Discovery Call', value: 318 },
        { name: 'Project Inquiry', value: 254 },
        { name: 'Newsletter', value: 628 },
      ],
      traffic: {
        labels: ['Apr 24', 'May 1', 'May 8', 'May 15', 'May 22', 'May 24'],
        visitors: [4200, 5100, 4800, 6200, 7400, 8600, 9400],
        page_views: [9800, 11500, 12400, 14200, 16800, 18900, 20500],
      },
      sources: [
        { source: 'Organic', sessions: 18524, users: 15243, conv: 4.2, bounce: 34.1, pct: 38.4, color: '#6C5CE7' },
        { source: 'Direct', sessions: 11876, users: 10124, conv: 5.8, bounce: 29.7, pct: 24.6, color: '#3b82f6' },
        { source: 'Social', sessions: 8792, users: 7456, conv: 3.1, bounce: 42.3, pct: 18.2, color: '#22c55e' },
        { source: 'Referral', sessions: 5504, users: 4892, conv: 6.4, bounce: 31.5, pct: 11.4, color: '#f59e0b' },
        { source: 'Email', sessions: 3598, users: 3102, conv: 7.9, bounce: 24.8, pct: 7.4, color: '#ec4899' },
      ],
      pages: [
        { path: '/work', views: 12400 },
        { path: '/capabilities', views: 9800 },
        { path: '/journal', views: 6400 },
      ],
    });
  };

  const searchAll = (res, qs) => {
    const p = new URLSearchParams(qs);
    const q = p.get('q');
    if (!q) return send(res, 400, { ok: false, error: 'q is required.' });
    const like = `%${q}%`;
    const out = [];
    for (const [name, e] of Object.entries(entities)) {
      if (!e.search) continue;
      const rows = db.prepare(`SELECT * FROM ${name} WHERE ${e.search.map((f) => `${f} LIKE ?`).join(' OR ')} LIMIT 3`).all(...e.search.map(() => like));
      for (const r of rows) out.push({ type: name, id: r.id, title: r.title || r.name || r.email || r.form_name, label: r.client || r.company || '' });
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

  return async (req, res) => {
    const [path, qs = ''] = req.url.split('?');
    // admin API is gated behind a Bearer token when one is configured (ADMIN_TOKEN).
    // /api/contact stays public — the marketing site contact form posts to it.
    if (token && path !== '/api/contact' && req.headers.authorization !== `Bearer ${token}`)
      return send(res, 401, { ok: false, error: 'Unauthorized — ADMIN_TOKEN required' });
    const m = path.match(/^\/api\/([a-z-]+)(?:\/(\d+))?(?:\/([a-z-]+))?$/);
    if (!m) return send(res, 404, { ok: false, error: 'Unknown endpoint' });
    let name = m[1], id = m[2], action = m[3];
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
    if (req.method === 'GET') return list(res, name, e, qs);
    if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed' });
    const d = await jsonBody(req, res);
    if (!d) return;
    return create(res, name, e, d);
  };
}
