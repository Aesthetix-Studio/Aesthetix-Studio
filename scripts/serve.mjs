// Static dev server for the generated site — Node stdlib only, zero deps.
import { createServer, request } from 'node:http';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';
import { createApi } from './api.mjs';

const root = process.cwd();
// fail fast if the site hasn't been generated yet (run `npm run generate` first)
if (!existsSync(resolve(root, 'index.html'))) { console.error('Missing generated pages — run `npm run generate` first.'); process.exit(1); }
const port = Number(process.env.PORT) || 4173;
const check = process.argv.includes('--check');
// admin JSON API + contact form → SQLite (node:sqlite, zero deps); in-memory during self-check
const handleApi = createApi({ file: check ? ':memory:' : resolve(root, 'data/app.sqlite') });
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

const server = createServer(async (req, res) => {
  if (req.url.split('?')[0].startsWith('/api/')) return handleApi(req, res);
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
  // aliases: /admin is the admin dashboard (the old React SPA's /admin route)
  if (clean === '/admin') return res.writeHead(301, { location: '/dashboard' }).end();
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
      ['/work', 200, 'text/html', '', ['work-list-hero', 'filter-tab', 'Luminary']], // work listing
      ['/work/luminary-financial', 200, 'text/html', '', ['cs-split', 'process-bar']], // nested clean URL + case-study content
      ['/case-studies', 200, 'text/html', '', ['cs-row', 'Luminary Financial']],
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
      ['/pricing', 200, 'text/html', '', ['₹29,999', 'Growth']], // pricing tiers
      ['/dashboard', 200, 'text/html', '', ['dash-layout', 'Rohit Malhotra']], // dashboard
      ['/admin', 301, '', '/dashboard'], // admin alias
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
    // admin API: contact form, CRUD, validation, unknown routes
    const api = (label, got, wantStatus, wantBody) => {
      if (got.status !== wantStatus || (wantBody && !got.body.includes(wantBody)))
        failures.push(`${label}: want ${wantStatus}${wantBody ? ` + ${wantBody}` : ''}, got ${got.status} ${got.body.slice(0, 80)}`);
    };
    api('POST /api/contact', await req('/api/contact', { method: 'POST', body: { name: 'Test', email: 'test@example.com', message: 'Hello' } }), 201, '"ok":true');
    api('POST /api/contact invalid', await req('/api/contact', { method: 'POST', body: { name: '', email: 'nope', message: '' } }), 400);
    api('GET /api/contact', await req('/api/contact'), 405);
    api('GET /api/leads', await req('/api/leads'), 200, '"name":"Sam Chen"'); // seeded
    api('GET /api/dashboard', await req('/api/dashboard'), 200, '"projects_active"'); // aggregates
    api('GET /api/dashboard charts', await req('/api/dashboard'), 200, '"top_pages"'); // chart datasets
    api('GET /api/dashboard sources', await req('/api/dashboard'), 200, '"Organic Search"');
    api('GET /api/analytics', await req('/api/analytics'), 200, '"visitors_30d"');
    api('GET /api/search?q=luminary', await req('/api/search?q=luminary'), 200, '"type":"projects"'); // cross-entity search
    api('GET /api/search (no q)', await req('/api/search'), 400);
    api('GET /api/settings', await req('/api/settings'), 200, '"site_name"'); // seeded
    api('PUT /api/settings', await req('/api/settings', { method: 'PUT', body: { site_name: 'Aesthetix' } }), 200, '"updated":1');
    api('GET /api/settings updated', await req('/api/settings'), 200, '"Aesthetix"');
    api('GET /api/files', await req('/api/files'), 200, '"design-system.fig"');
    api('GET /api/meetings', await req('/api/meetings'), 200, '"Luminary kickoff"');
    api('GET /api/tasks', await req('/api/tasks'), 200, '"title":"Send Luminary discovery summary"');
    api('GET /api/milestones', await req('/api/milestones'), 200, '"Design sprint"');
    api('POST /api/messages', await req('/api/messages', { method: 'POST', body: { role: 'user', content: 'hi' } }), 201, '"id":5');
    api('GET /api/projects', await req('/api/projects'), 200, '"Luminary Financial"');
    api('GET /api/projects/1', await req('/api/projects/1'), 200, '"client":"Luminary Financial"');
    api('GET /api/projects/999', await req('/api/projects/999'), 404);
    api('POST /api/projects', await req('/api/projects', { method: 'POST', body: { title: 'Test project', client: 'Acme' } }), 201, '"id":5');
    api('PUT /api/projects/5', await req('/api/projects/5', { method: 'PUT', body: { status: 'review' } }), 200, '"id":5');
    api('GET /api/projects/5 updated', await req('/api/projects/5'), 200, '"status":"review"');
    api('DELETE /api/projects/5', await req('/api/projects/5', { method: 'DELETE' }), 200);
    api('GET /api/projects/5 deleted', await req('/api/projects/5'), 404);
    api('POST /api/projects empty', await req('/api/projects', { method: 'POST', body: {} }), 400);
    api('POST /api/invoices bad amount', await req('/api/invoices', { method: 'POST', body: { client: 'X', amount: 'abc' } }), 400);
    api('PUT /api/leads (collection)', await req('/api/leads', { method: 'PUT', body: {} }), 405);
    api('GET /api/nope', await req('/api/nope'), 404);
    const total = cases.length + 16;
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
  // ponytail: bind all interfaces so Render/Railway/VPS proxies can reach us.
  // Self-check mode keeps 127.0.0.1 (loopback-only, above).
  server.listen(port, '0.0.0.0', () => console.log(`Aesthetix Studio: http://localhost:${port}`));
}
