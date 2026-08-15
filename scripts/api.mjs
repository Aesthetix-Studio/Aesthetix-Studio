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
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, company TEXT DEFAULT '', website TEXT DEFAULT '', project_type TEXT DEFAULT '', message TEXT NOT NULL, status TEXT DEFAULT 'new', created_at TEXT NOT NULL",
    fields: ['name', 'email', 'company', 'website', 'project_type', 'message', 'status'],
    required: ['name', 'email', 'message'],
    defaults: { status: 'new' },
    search: ['name', 'email', 'company'],
    validate(d) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(d.email ?? ''))) return 'A valid email address is required.';
    },
    seed: [
      ['Sam Chen', 'sam@luminary.com', 'Luminary Financial', '', 'Web application', 'Follow-up on the wealth platform proposal.', 'won'],
      ['Priya Nair', 'priya@kora.health', 'Kora Health', '', 'Website', 'Rebuild of the care portal.', 'contacted'],
      ['Ravi Menon', 'ravi@vertex.io', 'Vertex', '', 'AI solution', 'Analytics workflow automation.', 'new'],
    ],
  },
  projects: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, client TEXT NOT NULL, status TEXT DEFAULT 'active', timeline TEXT DEFAULT '', budget TEXT DEFAULT '', description TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['title', 'client', 'status', 'timeline', 'budget', 'description'],
    required: ['title', 'client'],
    defaults: { status: 'active' },
    search: ['title', 'client', 'status'],
    seed: [
      ['Designing trust in financial experiences.', 'Luminary Financial', 'completed', '4 Months', '$48,000', 'Wealth management platform rebuilt around clarity and trust.', ],
      ['Healthcare that feels human.', 'Kora Health', 'active', '6 Months', '$62,000', 'Patient-first care platform.', ],
      ['From data to decisions.', 'Vertex', 'active', '5 Months', '$54,000', 'Analytics platform for operational decisions.', ],
      ['Fintech onboarding redesign.', 'Meridian', 'review', '3 Months', '$38,000', 'Onboarding flow redesign.', ],
    ],
  },
  invoices: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, client TEXT NOT NULL, amount REAL NOT NULL, status TEXT DEFAULT 'draft', due_date TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['client', 'amount', 'status', 'due_date'],
    required: ['client'],
    defaults: { status: 'draft', amount: 0 },
    validate(d) {
      if (d.amount !== undefined && Number.isNaN(Number(d.amount))) return 'amount must be a number.';
    },
    seed: [
      ['Luminary Financial', 48000, 'paid', '2026-07-01'],
      ['Kora Health', 15500, 'outstanding', '2026-08-15'],
      ['Vertex', 12000, 'draft', '2026-09-01'],
    ],
  },
  users: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, role TEXT DEFAULT 'client', created_at TEXT NOT NULL",
    fields: ['name', 'email', 'role'],
    required: ['name', 'email'],
    defaults: { role: 'client' },
    search: ['name', 'email', 'role'],
    validate(d) {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(d.email ?? ''))) return 'A valid email address is required.';
    },
    seed: [
      ['Sarah Mitchell', 'sarah@luminary.com', 'client'],
      ['Dr. Priya Nair', 'priya@kora.health', 'client'],
      ['Aarav Shah', 'aarav@aesthetixstudio.com', 'team'],
      ['Maya Iyer', 'maya@aesthetixstudio.com', 'team'],
    ],
  },
  articles: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, category TEXT DEFAULT '', status TEXT DEFAULT 'draft', read_time TEXT DEFAULT '', created_at TEXT NOT NULL",
    fields: ['title', 'category', 'status', 'read_time'],
    required: ['title'],
    defaults: { status: 'draft' },
    search: ['title', 'category', 'status'],
    seed: [
      ['Designing for clarity in a noisy world.', 'Design', 'published', '8 min'],
      ['What good product strategy actually looks like.', 'Strategy', 'published', '6 min'],
      ['The case for fewer, better features.', 'Process', 'draft', '5 min'],
      ['Building AI products people can trust.', 'AI', 'scheduled', '7 min'],
    ],
  },
  proposals: {
    cols: "id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, client TEXT DEFAULT '', scope TEXT DEFAULT '', investment REAL DEFAULT 0, status TEXT DEFAULT 'draft', created_at TEXT NOT NULL",
    fields: ['title', 'client', 'scope', 'investment', 'status'],
    required: ['title'],
    defaults: { status: 'draft', investment: 0 },
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
export function createApi({ file }) {
  if (file !== ':memory:') mkdirSync(dirname(resolve(file)), { recursive: true });
  const db = new DatabaseSync(file);
  for (const [name, e] of Object.entries(entities)) {
    db.exec(`CREATE TABLE IF NOT EXISTS ${name} (${e.cols})`);
    const { n } = db.prepare(`SELECT COUNT(*) n FROM ${name}`).get();
    if (!n && e.seed?.length) {
      const ins = db.prepare(`INSERT INTO ${name} (${e.fields.join(', ')}, created_at) VALUES (${e.fields.map(() => '?').join(', ')}, ?)`);
      for (const row of e.seed) ins.run(...row, now());
    }
  }

  const create = (res, table, e, d) => {
    for (const f of e.required) if (!String(d[f] ?? '').trim()) return send(res, 400, { ok: false, error: `${f} is required.` });
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

  return async (req, res) => {
    const [path, qs = ''] = req.url.split('?');
    const m = path.match(/^\/api\/([a-z-]+)(?:\/(\d+))?$/);
    if (!m) return send(res, 404, { ok: false, error: 'Unknown endpoint' });
    let name = m[1], id = m[2];
    // the contact form posts here; it is just a lead with status 'new'
    if (name === 'contact') {
      const ct = (req.headers['content-type'] || '').split(';')[0];
      const d = ct === 'application/x-www-form-urlencoded' ? await formBody(req, res) : await jsonBody(req, res);
      if (!d) return;
      if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed' });
      return create(res, 'leads', entities.leads, { status: 'new', ...d });
    }
    const e = entities[name];
    if (!e) return send(res, 404, { ok: false, error: `No such resource: ${name}` });
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
      const patch = pick(e, d);
      if (!Object.keys(patch).length) return send(res, 400, { ok: false, error: 'Nothing to update' });
      if (e.validate) { const err = e.validate({ ...row, ...d }); if (err) return send(res, 400, { ok: false, error: err }); }
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
