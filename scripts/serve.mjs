// Static dev server for the generated site — Node stdlib only, zero deps.
import { createServer, request } from 'node:http';
import { existsSync, mkdirSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const root = process.cwd();
// fail fast if the site hasn't been generated yet (run `npm run generate` first)
if (!existsSync(resolve(root, 'index.html'))) { console.error('Missing generated pages — run `npm run generate` first.'); process.exit(1); }
const port = Number(process.env.PORT) || 4173;
const check = process.argv.includes('--check');
// contact submissions stored in SQLite (node:sqlite, zero deps); in-memory during self-check
mkdirSync(dirname(resolve(root, 'data/contact.sqlite')), { recursive: true });
const db = new DatabaseSync(check ? ':memory:' : resolve(root, 'data/contact.sqlite'));
db.exec(`CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT DEFAULT '',
  website TEXT DEFAULT '',
  project_type TEXT DEFAULT '',
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
)`);
const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
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

async function handleContact(req, res) {
  const bad = (code, error) => res.writeHead(code, { 'content-type': 'application/json' }).end(JSON.stringify({ ok: false, error }));
  let raw;
  try {
    raw = await readBody(req, 64_000);
  } catch {
    return bad(413, 'Body too large');
  }
  const ct = (req.headers['content-type'] || '').split(';')[0];
  let data;
  if (ct === 'application/json') {
    try { data = JSON.parse(raw || '{}'); } catch { return bad(400, 'Invalid JSON'); }
  } else if (ct === 'application/x-www-form-urlencoded') {
    data = Object.fromEntries(new URLSearchParams(raw));
  } else {
    return bad(415, 'Send application/json or application/x-www-form-urlencoded');
  }
  const name = String(data.name ?? '').trim().slice(0, 200);
  const email = String(data.email ?? '').trim().slice(0, 200);
  const message = String(data.message ?? '').trim().slice(0, 10_000);
  if (!name || !message) return bad(400, 'Name and message are required.');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return bad(400, 'A valid email address is required.');
  const info = db.prepare('INSERT INTO submissions (name, email, company, website, project_type, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
    .run(name, email, String(data.company ?? '').slice(0, 200), String(data.website ?? '').slice(0, 200), String(data.project_type ?? '').slice(0, 100), message, new Date().toISOString());
  res.writeHead(201, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: true, id: Number(info.lastInsertRowid) }));
}

const server = createServer(async (req, res) => {
  if (req.url.split('?')[0] === '/api/contact') {
    if (req.method !== 'POST') return res.writeHead(405, { 'content-type': 'text/plain' }).end('Method not allowed');
    return handleContact(req, res);
  }
  let url;
  try {
    url = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    return res.writeHead(400, { 'content-type': 'text/plain' }).end('Bad request');
  }
  const clean = url === '/' ? '/index.html' : url.replace(/\/+$/, '');
  // 301 to the clean URL so /work.html → /work (canonical wins for SEO)
  if (url !== '/' && clean.endsWith('.html')) {
    const target = clean === '/index.html' ? '/' : clean.slice(0, -5);
    const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    return res.writeHead(301, { location: target + qs }).end();
  }
  const file = resolve(root, '.' + clean);
  // serve only files inside the project root
  if (relative(root, file).split(/[\\/]/)[0] === '..') return res.writeHead(403, { 'content-type': 'text/plain' }).end('Forbidden');
  // clean URLs like Vercel: /work serves /work.html (also /work/ → /work.html)
  const candidates = extname(clean) ? [file] : [file, `${file}.html`];
  let body, mime;
  for (const f of candidates) {
    try {
      body = await readFile(f);
      mime = types[extname(f).toLowerCase()] ?? 'application/octet-stream';
      break;
    } catch {}
  }
  if (!body) return res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
  res.writeHead(200, { 'content-type': mime });
  res.end(body);
});

if (check) {
  // self-check: boot on an ephemeral port, assert the routes that regress most easily
  server.listen(0, '127.0.0.1', async () => {
    const { port: p } = server.address();
    const cases = [
      ['/', 200, 'text/html', '', ['fonts.googleapis.com', 'DM+Serif+Display']], // design tokens loaded
      ['/work', 200, 'text/html', '', ['cs-split', 'Luminary Financial', 'More case studies']], // flagship case study
      ['/work/luminary-financial', 200, 'text/html', '', ['cs-split', 'process-bar']], // nested clean URL + case-study content
      ['/case-studies', 200, 'text/html', '', ['case-card', 'Vertex']],
      ['/work/', 200, 'text/html'], // trailing slash
      ['/css/aesthetix.css', 200, 'text/css', '', ['work-hero', 'process-bar', 'tablet-side']], // stylesheet tail intact (a parse break silently drops it)
      ['/robots.txt', 200, 'text/plain'],
      ['/sitemap.xml', 200, 'application/xml', '', ['aesthetixstudio.com']],
      ['/work.html', 301, '', '/work'], // .html → clean URL
      ['/index.html', 301, '', '/'],
      ['/nope', 404, 'text/plain'],
      ['/../etc/passwd', 403, 'text/plain'], // path traversal blocked
      ['/contact', 200, 'text/html', '', ['id="contact-form"', '/api/contact']], // form + submit endpoint present
      ['/login', 200, 'text/html', '', ['auth-card', 'Sign in']], // auth screen
      ['/pricing', 200, 'text/html', '', ['$499', 'Scale']], // pricing tiers
      ['/dashboard', 200, 'text/html', '', ['placeholder.svg', 'screen-grid']], // tool screen + placeholder image
      ['/500', 200, 'text/html', '', ['Server error']], // error screen
    ];
    const req = (path, { method = 'GET', body } = {}) => new Promise((ok, fail) => {
      const r = request({ host: '127.0.0.1', port: p, path, method, headers: body ? { 'content-type': 'application/json' } : {} }, (res) => {
        let text = '';
        res.on('data', (c) => (text += c));
        res.on('end', () => ok({ status: res.statusCode, type: (res.headers['content-type'] ?? '').split(';')[0], location: res.headers.location ?? '', body: text }));
      }).on('error', fail);
      if (body) r.write(JSON.stringify(body));
      r.end();
    });
    const failures = [];
    for (const [path, status, type, location, content] of cases) {
      const got = await req(path);
      const missing = content ? content.filter((s) => !got.body.includes(s)) : [];
      if (got.status !== status || got.type !== type || (location && got.location !== location) || missing.length)
        failures.push(`${path}: want ${status} ${type}${location ? ` → ${location}` : ''}${content ? ` + ${content.join(' & ')}` : ''}, got ${got.status} ${got.type}${got.location ? ` → ${got.location}` : ''}${missing.length ? ` (missing: ${missing.join(', ')})` : ''}`);
    }
    // contact form: valid POST → 201 + stored, invalid → 400, wrong method → 405
    const good = await req('/api/contact', { method: 'POST', body: { name: 'Test', email: 'test@example.com', message: 'Hello' } });
    if (good.status !== 201 || !good.body.includes('"ok":true')) failures.push(`POST /api/contact: want 201 ok:true, got ${good.status} ${good.body}`);
    const bad = await req('/api/contact', { method: 'POST', body: { name: '', email: 'nope', message: '' } });
    if (bad.status !== 400) failures.push(`POST /api/contact invalid: want 400, got ${bad.status} ${bad.body}`);
    const wrong = await req('/api/contact');
    if (wrong.status !== 405) failures.push(`GET /api/contact: want 405, got ${wrong.status}`);
    const total = cases.length + 3;
    server.close();
    if (failures.length) {
      failures.forEach((f) => console.error('  - ' + f));
      console.error(`✗ self-check FAILED (${failures.length}/${total})`);
      process.exit(1);
    }
    console.log(`✓ self-check passed (${total} checks)`);
    process.exit(0);
  });
} else {
  server.listen(port, '127.0.0.1', () => console.log(`Aesthetix Studio: http://localhost:${port}`));
}
