// Static dev server for the generated site — Node stdlib only, zero deps.
import { createServer, request } from 'node:http';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { createApi, verifySession } from './api.mjs';

const root = process.cwd();
// fail fast if the site hasn't been generated yet (run `npm run generate` first)
if (!existsSync(resolve(root, 'index.html'))) { console.error('Missing generated pages — run `npm run generate` first.'); process.exit(1); }
// tiny .env.local loader (gitignored) — real env vars win; zero deps
for (const line of existsSync(resolve(root, '.env.local')) ? readFileSync(resolve(root, '.env.local'), 'utf8').split(/\r?\n/) : []) {
  const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const port = Number(process.env.PORT) || 4173;
const check = process.argv.includes('--check');
// DB_PATH (e.g. a mounted volume on Render/Railway) overrides the default SQLite location.
// Parent dir is created so a fresh mount path works on first boot.
const dbFile = resolve(root, process.env.DB_PATH || 'data/app.sqlite');
if (!check && !existsSync(dirname(dbFile))) mkdirSync(dirname(dbFile), { recursive: true });
// admin JSON API + contact form → SQLite (node:sqlite, zero deps); in-memory during self-check
// auth: all /api/* routes except POST /api/contact require `Authorization: Bearer $ADMIN_TOKEN`
// when ADMIN_TOKEN is set. Unset = open (local dev). Token lives in .env.local or the env.
// check mode keeps the mounted API open (deterministic); the auth gate is tested below
// against a dedicated token-gated in-memory API.
// `let` so the self-check can flip the token on and off around the HTML-gate assertions
let activeToken = check ? '' : process.env.ADMIN_TOKEN || '';
// chat assistant: any OpenAI-compatible chat endpoint (OpenAI, Gemini's compat layer,
// Groq, OpenRouter…) — AI_API_KEY enables it, AI_BASE_URL/AI_MODEL point it elsewhere.
// Check mode aims it at a canned in-process mock so the wiring is asserted with no
// network and no cost; without a key the assistant is simply dormant.
let mockLlm = null;
if (check) {
  mockLlm = createServer((req, res) => {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      const { messages = [] } = JSON.parse(body || '{}');
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ choices: [{ message: { role: 'assistant', content: `Mock assistant reply to: ${messages[messages.length - 1]?.content ?? ''}` } }] }));
    });
  });
  await new Promise((ok) => mockLlm.listen(0, '127.0.0.1', ok));
}
const ai = check
  ? { key: 'test-key', base: `http://127.0.0.1:${mockLlm.address().port}/v1`, model: 'mock-model' }
  : process.env.AI_API_KEY
    ? { key: process.env.AI_API_KEY, base: process.env.AI_BASE_URL || 'https://api.openai.com/v1', model: process.env.AI_MODEL || 'gpt-4o-mini' }
    : null;
const handleApi = createApi({ file: check ? ':memory:' : dbFile, token: check ? '' : process.env.ADMIN_TOKEN || '', ai });
// The admin screens are static files, so they need the session cookie (see api.mjs).
// Keep in sync with the pages that load js/admin.js + the PRIVATE set in generate.js.
const GATED = new Set(['dashboard', 'admin-analytics', 'admin-articles', 'admin-invoices', 'admin-leads', 'admin-media', 'admin-projects', 'admin-settings', 'admin-users', 'ai-chat-assistant', 'brand-audit-tool', 'feedback', 'files-deliverables', 'forms', 'leads', 'meeting-notes', 'project-timeline', 'proposal-generator', 'search', 'tasks', 'messages', 'calendar', 'design-brief-analyzer', 'subscriptions', 'admin-testimonials', 'admin-categories', 'admin-tags', 'admin-comments', 'admin-pages', 'admin-lead-sources', 'admin-activity', 'admin-system-health', 'admin-ai-writer', 'admin-integrations', 'admin-roles', 'knowledge-base', 'design-system']);
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
  '.woff2': 'font/woff2',
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
  // templates/partials are source, not site content — never serve them. The HTML session
  // gate matches clean routes only, so /site/proto/*.html would leak raw admin chrome.
  // Runs before the .html→clean 301 so the redirect can't sneak it through either.
  if (clean === '/site' || clean.startsWith('/site/')) return res.writeHead(404, { 'content-type': 'text/plain' }).end('Not found');
  // 301 to the clean URL so /work.html → /work (canonical wins for SEO)
  if (url !== '/' && clean.endsWith('.html')) {
    const target = clean === '/index.html' ? '/' : clean.slice(0, -5);
    const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    return res.writeHead(301, { location: target + qs }).end();
  }
  // admin surface: gate the static admin pages on the session cookie. No ADMIN_TOKEN
  // configured = open, matching the API. Runs after the .html 301 so a gated page
  // can't be reached by appending .html.
  if (activeToken && GATED.has(clean.replace(/^\//, '').replace(/\.html$/, '')) && !verifySession(req.headers.cookie, activeToken))
    return res.writeHead(302, { location: '/login?next=' + encodeURIComponent(req.url) }).end();
  // aliases: /admin is the admin dashboard (the old React SPA's /admin route)
  if (clean === '/admin') return res.writeHead(301, { location: '/dashboard' }).end();
  // browsers auto-request /favicon.ico even though every page links /favicon.svg —
  // serve the SVG there instead of 404ing on every page load.
  if (clean === '/favicon.ico') {
    try {
      const icon = await readFile(resolve(root, './favicon.svg'));
      res.writeHead(200, { 'content-type': 'image/svg+xml' });
      return res.end(icon);
    } catch {}
  }
  const file = resolve(root, '.' + clean);
  // serve only files inside the project root
  if (relative(root, file).split(/[\\/]/)[0] === '..') return res.writeHead(403, { 'content-type': 'text/plain' }).end('Forbidden');  // clean URLs like Vercel: /work serves /work.html (also /work/ → /work.html)
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
  /* /404 and /500 are real generated pages, so they used to answer 200 — a soft 404 that
     crawlers index as a thin page. They carry their own status now (and a noindex meta in
     the build). Matches what a static host does with 404.html natively. */
  const status = clean === '/404' ? 404 : clean === '/500' ? 500 : 200;
  res.writeHead(status, { 'content-type': mime });
  res.end(body);
});

if (check) {
  // self-check: boot on an ephemeral port, assert the routes that regress most easily
  server.listen(0, '127.0.0.1', async () => {
    const { port: p } = server.address();
    const cases = [
      ['/', 200, 'text/html', '', ['href="/fonts/manrope.woff2"', 'href="/fonts/dm-serif-display.woff2"', 'application/ld+json', 'og-image.png', 'href="/privacy-policy"']], // self-hosted fonts + SEO head + anchored legal links
      ['/fonts/manrope.woff2', 200, 'font/woff2'], // self-hosted, no fonts.gstatic round trip
      ['/fonts/dm-serif-display.woff2', 200, 'font/woff2'],
      ['/work', 200, 'text/html', '', ['work-list-hero', 'filter-tab', 'Luminary', 'href="/pricing', '/api/public/projects', 'id="live-work"']], // work listing + the Services footer column (proto page) + live projects seam
      ['/llms.txt', 200, 'text/plain', '', ['Aesthetix Studio', 'case-studies']], // GEO: guide for answer engines
      ['/work/luminary-financial', 200, 'text/html', '', ['cs-split', 'process-bar']], // nested clean URL + case-study content
      ['/case-studies', 200, 'text/html', '', ['cs-row', 'Luminary Financial']],
      ['/capabilities', 200, 'text/html', '', ['cap-split', 'Capabilities-hero.png', 'capabilities_04_ai_abstract', 'What we do']], // golden page: real hero + panel art
      ['/journal', 200, 'text/html', '', ['journal-grid', 'journal_02_featured_article']], // static article grid with real thumbnails
      ['/pricing', 200, 'text/html', '', ['faq-item', 'FAQPage', 'Questions about pricing', '₹29,999']], // GEO: Q&A + FAQPage schema
      ['/ai-solutions', 200, 'text/html', '', ['ai-hero', 'AI-Solutions-Hero.png', 'AI-Solutions-Card-01.png', 'Intelligent solutions']], // golden page: real hero + case art
      ['/seo-service', 200, 'text/html', '', ['seo-hero', 'SEO-Service-Hero.png', 'SEO-Service-02.png', 'Rank higher']], // golden page: real dashboard + chart art
      ['/website-redesign', 200, 'text/html', '', ['rd-hero', 'Website-Redesign-Hero.png', 'Website-Redesign-02.png', 'rebuilt to']], // golden page: real before/after art
      ['/work/', 200, 'text/html'], // trailing slash
      ['/css/aesthetix.css', 200, 'text/css', '', ['work-hero', 'process-bar', 'tablet-side', 'adm-modal', '@font-face']], // stylesheet tail intact (a parse break silently drops it)
      ['/js/admin.js', 200, 'text/javascript', '', ['fillStat', 'modal', 'toast', 'thread=file:']], // shared admin wiring + files change-note join
      ['/robots.txt', 200, 'text/plain', '', ['Disallow: /admin', 'Disallow: /dashboard']], // admin surface kept out of crawlers
      ['/favicon.ico', 200, 'image/svg+xml'], // browser auto-request must not 404
      ['/sitemap.xml', 200, 'application/xml', '', ['aesthetixstudio.com']],
      ['/work.html', 301, '', '/work'], // .html → clean URL
      ['/index.html', 301, '', '/'],
      ['/nope', 404, 'text/plain'],
      // removed: thin orphan placeholders that duplicated their admin-* twins and were
      // linked from nowhere (see the PRIVATE note in generate.js)
      ['/projects', 404, 'text/plain'],
      ['/analytics', 404, 'text/plain'],
      ['/articles', 404, 'text/plain'],
      ['/invoices', 404, 'text/plain'],
      ['/users', 404, 'text/plain'],
      ['/settings', 404, 'text/plain'],
      ['/media-library', 404, 'text/plain'],
      ['/../etc/passwd', 403, 'text/plain'], // path traversal blocked
      ['/site/proto/dashboard.html', 404, 'text/plain'], // template source never served (gate bypass)
      ['/contact', 200, 'text/html', '', ['id="contact-form"', '/api/contact']], // form + submit endpoint present
      ['/start-a-project', 200, 'text/html', '', ['id="start-project-form"', '/api/contact', 'name="timeline"', 'name="budget"']], // brief form posts to the leads API with timeline/budget intact
      ['/login', 200, 'text/html', '', ['auth-card', 'Sign in']], // auth screen
      ['/pricing', 200, 'text/html', '', ['₹29,999', 'Growth', 'application/ld+json']], // pricing tiers + JSON-LD on a proto page
      ['/dashboard', 200, 'text/html', '', ['dash-layout', 'data-adm="name"', 'recent_leads', 'New enquiry from']], // dashboard (identity filled from the API, activity seeded with live leads)
      ['/admin', 301, '', '/dashboard'], // admin alias
      ['/admin-analytics', 200, 'text/html', '', ['Analytics — Studio Performance Data — Aesthetix Studio', 'dash-layout', 'js/admin.js']], // admin screens wired to the API
      ['/admin-articles', 200, 'text/html', '', ['adm-table', 'Articles — Journal Drafts and Live Posts — Aesthetix Studio', 'js/admin.js']],
      ['/admin-leads', 200, 'text/html', '', ['adm-table', 'Leads — Pipeline, Sources and Value — Aesthetix Studio', 'js/admin.js', 'adm-tbody']],
      ['/leads', 200, 'text/html', '', ['dash-layout', 'Leads — Enquiries From the Contact Form — Aesthetix Studio', 'adm-tbody', 'ftab']],
      ['/admin-media', 200, 'text/html', '', ['Media — Images, Files and Storage Use — Aesthetix Studio', 'js/admin.js', 'adm-grid']],
      ['/admin-projects', 200, 'text/html', '', ['adm-table', 'Projects — Status, Progress and Dates — Aesthetix Studio', 'js/admin.js']],
      ['/admin-invoices', 200, 'text/html', '', ['adm-table', 'Invoices — Billing, Status and Payments — Aesthetix Studio', 'js/admin.js']],
      ['/admin-users', 200, 'text/html', '', ['adm-table', 'Users — Team Access and Permissions — Aesthetix Studio', 'js/admin.js', 'Proposal Generator', 'System Health', 'href="/forms.html"']], // sidebar matches the suite + no wrong Forms link
      ['/admin-settings', 200, 'text/html', '', ['Settings — Studio and Site Configuration — Aesthetix Studio', 'js/admin.js', 'save-btn', 'Proposal Generator', 'System Health', 'href="/forms.html"']], // sidebar matches the suite
      ['/forms', 200, 'text/html', '', ['Forms — Every Submission in One Place — Aesthetix Studio', 'dash-layout', 'adm-tbody']], // dashboard with live table
      ['/feedback', 200, 'text/html', '', ['Feedback — Surveys, Ratings and Comments — Aesthetix Studio', 'wireToolPage', 'dash-sidebar', 'ftab', 'tool-export', 'rail-pie', 'rail-legend']],
      ['/meeting-notes', 200, 'text/html', '', ['Meeting Notes — Summaries and Next Steps — Aesthetix Studio', 'wireToolPage', 'dash-sidebar', 'ftab', 'tool-search', 'rail-recent']],
      ['/proposal-generator', 200, 'text/html', '', ['Proposal Generator — Build Proposals Fast — Aesthetix Studio', 'wireToolPage', 'dash-sidebar']],
      ['/tasks', 200, 'text/html', '', ['Tasks — Follow-ups and Delivery To-dos — Aesthetix Studio', 'wireToolPage', 'dash-sidebar', 'ftab', 'tool-export', 'rail-pie']],
      ['/messages', 200, 'text/html', '', ['Messages — Threads and Chat Logs — Aesthetix Studio', 'wireToolPage', 'dash-sidebar', 'ftab', 'tool-search', 'rail-legend']],
      ['/calendar', 200, 'text/html', '', ['Calendar — Meetings and Schedule — Aesthetix Studio', 'id="cal-grid"', '/api/meetings']],
      ['/design-brief-analyzer', 200, 'text/html', '', ['Design Brief Analyzer — Scoping Help — Aesthetix Studio', 'AesthetixAgent', '/api/contact']],
      ['/subscriptions', 200, 'text/html', '', ['Subscriptions — Retainers and Plans — Aesthetix Studio', 'wireToolPage', 'dash-sidebar', 'ftab', 'tool-export', 'rail-pie']],
      ['/files-deliverables', 200, 'text/html', '', ['Files & Deliverables — Assets per Project — Aesthetix Studio', 'wireToolPage', 'dash-sidebar', 'ftab', 'tool-search', 'rail-legend']],
      // ponytail: v1 client-review slice is public (no CLIENT auth yet) but kept out of
      // the sitemap/robots — NOT in GATED. If it ever needs a session, gate it + assert 302 here.
      ['/client-review', 200, 'text/html', '', ['Client Review — Approve Deliverables Fast — Aesthetix Studio', 'needs-attention', 'client-project', '/api/files', '/api/projects', '/api/milestones', 'data-approve', '<details', 'will review your feedback']],
      ['/project-timeline', 200, 'text/html', '', ['Project Timeline — Milestones and Dates — Aesthetix Studio', 'wireTimeline', 'dash-sidebar', 'tl-gantt', 'tl-calgrid', 'tl-project']],
      ['/ai-chat-assistant', 200, 'text/html', '', ['AI Chat Assistant — Answers, Instantly — Aesthetix Studio', 'wireChat', 'AesthetixAgent']], // agent seam present, demo fallback intact
      ['/brand-audit-tool', 200, 'text/html', '', ['Brand Audit Tool — Consistency, Measured — Aesthetix Studio', 'dash-layout', 'score-gauge', 'AesthetixAgent']], // agent seam present, sample scoring disclosed
      ['/admin-ai-writer', 200, 'text/html', '', ['AI Writer — Drafts, Tone and Readability — Aesthetix Studio', 'aw-generate', 'AesthetixAgent']], // agent seam present, template fallback intact
      ['/seo-analyzer', 200, 'text/html', '', ['Request an audit', 'href="/start-a-project.html"']], // orphan analyzer pages funnel to the brief form (shared screen() band)
      ['/discovery-call', 200, 'text/html', '', ['id="disc-grid"', 'id="disc-form"', '/api/contact', 'Request received']], // 3-step slot request posts to the leads API
      ['/search', 200, 'text/html', '', ['Search — Projects, Leads, Files and Notes — Aesthetix Studio', 'wireSearch', 'search-card', 'search-filters', 'dash-sidebar']],
      ['/500', 500, 'text/html', '', ['Server error', 'name="robots" content="noindex"']], // error screen: real 500, not indexed
      ['/404', 404, 'text/html', '', ['Page not', 'name="robots" content="noindex"']], // real 404, not indexed
    ];
    const req = (path, { method = 'GET', body, cookie } = {}) => new Promise((ok, fail) => {
      const headers = { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}) };
      const r = request({ host: '127.0.0.1', port: p, path, method, headers }, (res) => {
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
    // sitemap must not advertise the gated admin surface or the auth screens
    let checks = 0;
    const sitemap = await req('/sitemap.xml');
    const leaked = ['dashboard', 'leads', 'forms', 'search', 'login', 'signup', 'client-review'].filter((p) => sitemap.body.includes(`<loc>https://aesthetixstudio.com/${p}</loc>`));
    checks++;
    if (leaked.length) failures.push(`sitemap still advertises private pages: ${leaked.join(', ')}`);
    // the admin pages ship placeholders and load identity/stats from the API, so the
    // static markup must not carry the seeded rows (see wireAdminChrome in js/admin.js)
    for (const [path, seed] of [
      ['/dashboard', 'Rohit Malhotra'], ['/dashboard', '12,543'], ['/dashboard', 'vs May 11'],
      ['/leads', 'Administrator'], ['/leads', 'vs last month'],
      ['/admin-analytics', '48,294'], ['/admin-analytics', 'vs last month'],
      ['/admin-articles', 'this quarter'], ['/admin-invoices', 'overdue invoices'],
      ['/admin-media', '228 GB'], ['/admin-projects', 'vs last quarter'], ['/admin-users', 'Admin to Viewer'],
      ['/forms', 'vs last month'], ['/admin-leads', '12.6%'], ['/admin-leads', '24.3%'],
      ['/admin-articles', '>84<'], ['/admin-projects', '>48<'], ['/admin-users', '>24<'],
      ['/admin-analytics', '>247<'], ['/admin-media', '148 GB'],
    ]) {
      checks++;
      if ((await req(path)).body.includes(seed)) failures.push(`${path} still ships seeded data in its markup: ${seed}`);
    }
    // admin API: contact form, CRUD, validation, unknown routes
    const api = (label, got, wantStatus, wantBody) => {
      checks++;
      if (got.status !== wantStatus || (wantBody && !got.body.includes(wantBody)))
        failures.push(`${label}: want ${wantStatus}${wantBody ? ` + ${wantBody}` : ''}, got ${got.status} ${got.body.slice(0, 80)}`);
    };
    api('POST /api/contact', await req('/api/contact', { method: 'POST', body: { name: 'Test', email: 'test@example.com', message: 'Hello' } }), 201, '"ok":true');
    api('POST /api/contact invalid', await req('/api/contact', { method: 'POST', body: { name: '', email: 'nope', message: '' } }), 400);
    api('GET /api/contact', await req('/api/contact'), 405);
    api('GET /api/leads', await req('/api/leads'), 200, '"name":"Sam Chen"'); // seeded
    api('GET /api/leads?q=sam', await req('/api/leads?q=sam'), 200, '"name":"Sam Chen"'); // LIKE filter across search cols
    api('POST /api/leads bad status', await req('/api/leads', { method: 'POST', body: { name: 'X', email: 'x@x.com', message: 'hi', status: 'wonky' } }), 400); // enum enforced
    api('PUT /api/leads/3 reply', await req('/api/leads/3', { method: 'PUT', body: { status: 'contacted' } }), 200, '"id":3'); // replied_at stamped
    api('GET /api/leads/3 replied', await req('/api/leads/3'), 200, '"replied_at"');
    api('POST /api/leads/3/convert', await req('/api/leads/3/convert', { method: 'POST' }), 201, '"project_id"'); // won + project created
    api('POST /api/leads/3/convert twice', await req('/api/leads/3/convert', { method: 'POST' }), 409); // already won
    api('POST /api/leads/999/convert', await req('/api/leads/999/convert', { method: 'POST' }), 404);
    api('GET /api/projects converted', await req('/api/projects'), 200, '"Vertex — new engagement"'); // project from lead
    api('GET /api/dashboard', await req('/api/dashboard'), 200, '"projects_active"'); // aggregates
    api('GET /api/dashboard charts', await req('/api/dashboard'), 200, '"top_pages"'); // chart datasets
    api('GET /api/dashboard sources', await req('/api/dashboard'), 200, '"Organic Search"');
    api('GET /api/analytics', await req('/api/analytics'), 200, '"visitors_30d"');
    api('GET /api/analytics full', await req('/api/analytics'), 200, '"page_views"'); // prototype-matching analytics payload
    api('GET /api/leads fields', await req('/api/leads'), 200, '"source"'); // prototype lead columns
    api('GET /api/projects fields', await req('/api/projects'), 200, '"progress"'); // prototype project columns
    api('GET /api/users fields', await req('/api/users'), 200, '"status"');
    api('GET /api/articles fields', await req('/api/articles'), 200, '"views"');
    api('GET /api/search?q=luminary', await req('/api/search?q=luminary'), 200, '"type":"projects"'); // cross-entity search
    api('GET /api/search (no q)', await req('/api/search'), 400);
    api('GET /api/settings', await req('/api/settings'), 200, '"site_name"'); // seeded
    // public slice: marketing pages read these with no session — filtered + whitelisted
    api('PUBLIC projects', await req('/api/public/projects'), 200, '"Luminary Financial"');
    api('PUBLIC projects/1', await req('/api/public/projects/1'), 200, '"client":"Luminary Financial"');
    api('PUBLIC projects/4 hidden', await req('/api/public/projects/4'), 404); // review status stays internal
    api('PUBLIC projects/999', await req('/api/public/projects/999'), 404);
    api('PUBLIC articles', await req('/api/public/articles'), 200, '"Designing for clarity in a noisy world."');
    api('PUBLIC articles/3 hidden', await req('/api/public/articles/3'), 404); // draft stays internal
    api('POST /api/public/projects', await req('/api/public/projects', { method: 'POST', body: {} }), 405);
    checks++; // public slice must not leak internal columns or non-public statuses
    const pubP = await req('/api/public/projects');
    if (pubP.body.includes('budget') || pubP.body.includes('"status":"review"') || pubP.body.includes('_demo'))
      failures.push(`public projects leak internal data: ${pubP.body.slice(0, 120)}`);
    checks++;
    const pubA = await req('/api/public/articles');
    if (pubA.body.includes('"status":"draft"') || pubA.body.includes('"status":"scheduled"'))
      failures.push(`public articles leak non-published rows: ${pubA.body.slice(0, 120)}`);
    api('PUT /api/settings', await req('/api/settings', { method: 'PUT', body: { site_name: 'Aesthetix' } }), 200, '"updated":1');
    api('GET /api/settings updated', await req('/api/settings'), 200, '"Aesthetix"');
    api('GET /api/files', await req('/api/files'), 200, '"design-system.fig"');
    api('GET /api/meetings', await req('/api/meetings'), 200, '"Luminary kickoff"');
    api('GET /api/tasks', await req('/api/tasks'), 200, '"title":"Send Luminary discovery summary"');
    api('GET /api/milestones', await req('/api/milestones'), 200, '"Design sprint"');
    api('POST /api/messages + assistant reply', await req('/api/messages', { method: 'POST', body: { role: 'user', content: 'hi' } }), 201, '"reply_id"'); // mock LLM reply generated + stored
    api('GET /api/proposals', await req('/api/proposals'), 200, '"Luminary Financial — platform v2"'); // tool-screen entities seeded
    api('GET /api/feedback', await req('/api/feedback'), 200, '"rating":5');
    api('GET /api/meetings', await req('/api/meetings'), 200, '"Luminary kickoff"');
    api('GET /api/files', await req('/api/files'), 200, '"design-system.fig"');
    api('GET /api/files status', await req('/api/files'), 200, '"status"'); // v1 review-loop column
    api('POST /api/files bad status', await req('/api/files', { method: 'POST', body: { name: 'x.pdf', status: 'wonky' } }), 400); // enum enforced
    api('PUT /api/files/1 review', await req('/api/files/1', { method: 'PUT', body: { status: 'review' } }), 200, '"id":1'); // studio sends for review
    api('GET /api/files/1 review', await req('/api/files/1'), 200, '"status":"review"');
    api('POST /api/messages file thread', await req('/api/messages', { method: 'POST', body: { role: 'user', content: 'Please bump the headline.', thread: 'file:1' } }), 201, '"id"'); // request-changes link convention
    api('GET /api/messages thread filter', await req('/api/messages?thread=file:1'), 200, '"thread":"file:1"'); // studio note lookup reads this
    api('GET /api/messages reply stored', await req('/api/messages?thread=general'), 200, 'Mock assistant reply to: hi'); // assistant row landed
    checks++;
    if ((await req('/api/messages?thread=file:1')).body.includes('Mock assistant reply')) failures.push('file:<id> threads must not trigger an assistant reply');
    api('POST /api/feedback review', await req('/api/feedback', { method: 'POST', body: { source: 'Client review', rating: 3, message: 'Please bump the headline.' } }), 201, '"id"');
    api('PUT /api/files/1 changes', await req('/api/files/1', { method: 'PUT', body: { status: 'changes_requested' } }), 200, '"id":1');
    api('PUT /api/files/1 approved', await req('/api/files/1', { method: 'PUT', body: { status: 'approved' } }), 200, '"id":1'); // client approves
    api('GET /api/forms', await req('/api/forms'), 200, '"Contact form"');
    api('GET /api/milestones', await req('/api/milestones'), 200, '"Design sprint"');
    api('GET /api/projects', await req('/api/projects'), 200, '"Luminary Financial"');
    api('GET /api/projects/1', await req('/api/projects/1'), 200, '"client":"Luminary Financial"');
    api('GET /api/projects/999', await req('/api/projects/999'), 404);
    api('POST /api/projects', await req('/api/projects', { method: 'POST', body: { title: 'Test project', client: 'Acme' } }), 201, '"id":6'); // id 5 is the converted lead's project
    api('PUT /api/projects/6', await req('/api/projects/6', { method: 'PUT', body: { status: 'review' } }), 200, '"id":6');
    api('GET /api/projects/6 updated', await req('/api/projects/6'), 200, '"status":"review"');
    api('DELETE /api/projects/6', await req('/api/projects/6', { method: 'DELETE' }), 200);
    api('GET /api/projects/6 deleted', await req('/api/projects/6'), 404);
    api('POST /api/projects empty', await req('/api/projects', { method: 'POST', body: {} }), 400);
    api('POST /api/invoices bad amount', await req('/api/invoices', { method: 'POST', body: { client: 'X', amount: 'abc' } }), 400);
    api('PUT /api/leads (collection)', await req('/api/leads', { method: 'PUT', body: {} }), 405);
    api('GET /api/nope', await req('/api/nope'), 404);
    // auth gate: dedicated token-gated in-memory API — admin routes 401 without the
    // Bearer token, /api/contact stays public. (The mounted API above stays open in
    // check mode so the CRUD checks are deterministic regardless of the dev's .env.)
    const authApi = createApi({ file: ':memory:', token: 'test-admin-token' });
    const authServer = createServer((req, res) => authApi(req, res));
    await new Promise((ok) => authServer.listen(0, '127.0.0.1', ok));
    const { port: ap } = authServer.address();
    const areq = (path, { method = 'GET', body, token, cookie } = {}) => new Promise((ok, fail) => {
      const headers = { ...(body ? { 'content-type': 'application/json' } : {}), ...(token ? { authorization: `Bearer ${token}` } : {}), ...(cookie ? { cookie } : {}) };
      const r = request({ host: '127.0.0.1', port: ap, path, method, headers }, (res) => {
        let text = '';
        res.on('data', (c) => (text += c));
        res.on('end', () => ok({ status: res.statusCode, body: text, setCookie: res.headers['set-cookie']?.[0] ?? '' }));
      }).on('error', fail);
      if (body) r.write(JSON.stringify(body));
      r.end();
    });
    api('AUTH leads no token', await areq('/api/leads'), 401);
    api('AUTH leads wrong token', await areq('/api/leads', { token: 'nope' }), 401);
    api('AUTH leads with token', await areq('/api/leads', { token: 'test-admin-token' }), 200, '"name":"Sam Chen"');
    api('AUTH contact public POST', await areq('/api/contact', { method: 'POST', body: { name: 'T', email: 't@t.com', message: 'hi' } }), 201, '"ok":true');
    api('AUTH contact public GET', await areq('/api/contact'), 405);
    api('AUTH public projects open', await areq('/api/public/projects'), 200, '"Luminary Financial"'); // marketing slice stays open under token auth
    api('AUTH public articles open', await areq('/api/public/articles'), 200, '"ok":true');
    // session cookie: POST /api/session exchanges the token for a signed cookie,
    // which is what the HTML gate below reads. See the session block in api.mjs.
    api('SESSION bad token', await areq('/api/session', { method: 'POST', body: { token: 'nope' } }), 401);
    const sess = await areq('/api/session', { method: 'POST', body: { token: 'test-admin-token' } });
    api('SESSION good token', sess, 200, '"ok":true');
    const cookie = (sess.setCookie || '').split(';')[0];
    checks++;
    if (!/^adm_session=\d+\.[\w-]+$/.test(cookie)) failures.push(`session cookie malformed: ${cookie}`);
    api('AUTH leads with session cookie', await areq('/api/leads', { cookie }), 200, '"name":"Sam Chen"'); // cookie OR bearer
    const cleared = await areq('/api/session', { method: 'DELETE' });
    checks++;
    if (cleared.status !== 200 || !/^adm_session=;/.test(cleared.setCookie || '')) failures.push(`DELETE /api/session must clear the cookie, got ${cleared.status} ${cleared.setCookie}`);
    authServer.close();
    // HTML gate: with ADMIN_TOKEN set the admin PAGES need that cookie — they are
    // static files, so this is the only thing standing between an anonymous visitor
    // and the admin chrome. Flipped on here, then restored so the cases above stay open.
    activeToken = 'test-admin-token';
    checks++;
    const blocked = await req('/dashboard');
    if (blocked.status !== 302 || blocked.location !== '/login?next=%2Fdashboard')
      failures.push(`/dashboard without a session: want 302 → /login?next=%2Fdashboard, got ${blocked.status} ${blocked.location}`);
    checks++;
    if ((await req('/admin-leads')).status !== 302) failures.push('/admin-leads without a session: want 302');
    checks++;
    if ((await req('/dashboard?tab=x')).location !== '/login?next=%2Fdashboard%3Ftab%3Dx') failures.push('/dashboard?tab=x must keep its query in ?next=');
    checks++;
    if ((await req('/dashboard', { cookie: 'adm_session=999999999999999.forged' })).status !== 302) failures.push('/dashboard must reject a forged session cookie');
    checks++;
    if ((await req('/dashboard', { cookie })).status !== 200) failures.push('/dashboard with a valid session: want 200');
    checks++;
    if ((await req('/work')).status !== 200 || (await req('/')).status !== 200) failures.push('the public site must stay reachable');
    activeToken = '';
    checks++;
    if ((await req('/dashboard')).status !== 200) failures.push('/dashboard must be open when ADMIN_TOKEN is unset (local dev)');
    /* SEO metadata invariants, asserted across every generated page rather than a sample.
       The og:/twitter: title+description are duplicated inside the 26 hand-crafted proto
       heads, so editing a <title> used to leave the social card advertising the old string.
       11 heads also shipped with no social card and no canonical at all. Both are now
       derived at build time — this fails the build if that ever stops holding. */
    const htmlFiles = [];
    (function walk(dir) {
      let entries;
      // ponytail: skip anything unreadable (Windows ACLs on a stray dir, a mount) — a
      // metadata assertion must never be the reason the whole self-check crashes
      try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        if (e.name.startsWith('.') || ['node_modules', 'site', 'scripts', 'css', 'js', 'data'].includes(e.name)) continue;
        const p = resolve(dir, e.name);
        try { if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) htmlFiles.push(p); } catch { /* skip */ }
      }
    })(root);
    const titles = new Map(), descriptions = new Map();
    const vTitle = [], vDesc = [], vSync = [], vCard = [];
    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf8');
      const name = relative(root, f).replace(/\\/g, '/');
      const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
      const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
      if (title.length < 50 || title.length > 60) vTitle.push(`${name} (${title.length})`);
      if (desc.length < 120 || desc.length > 160) vDesc.push(`${name} (${desc.length})`);
      const ogT = (html.match(/<meta property="og:title" content="([^"]*)"/) || [])[1];
      const twT = (html.match(/<meta name="twitter:title" content="([^"]*)"/) || [])[1];
      const ogD = (html.match(/<meta property="og:description" content="([^"]*)"/) || [])[1];
      if (ogT !== title || twT !== title || ogD !== desc) vSync.push(name);
      if (!html.includes('/og-image.png') || !html.includes('application/ld+json') || !html.includes('rel="canonical"')) vCard.push(name);
      titles.set(title, (titles.get(title) || 0) + 1);
      descriptions.set(desc, (descriptions.get(desc) || 0) + 1);
    }
    checks++;
    if (htmlFiles.length < 50) failures.push(`only ${htmlFiles.length} HTML files walked — the metadata assertions below would be vacuous`);
    checks++;
    if (vTitle.length) failures.push(`${vTitle.length} <title> outside 50-60 chars: ${vTitle.join(', ')}`);
    checks++;
    if (vDesc.length) failures.push(`${vDesc.length} meta description(s) outside 120-160 chars: ${vDesc.join(', ')}`);
    checks++;
    if (vSync.length) failures.push(`og:/twitter: tags drifted from <title>/description on: ${vSync.join(', ')}`);
    checks++;
    if (vCard.length) failures.push(`missing social card, JSON-LD or canonical on: ${vCard.join(', ')}`);
    checks++;
    if ([...titles].some(([, n]) => n > 1)) failures.push(`duplicate <title> across pages: ${[...titles].filter(([, n]) => n > 1).map(([t, n]) => `${t} x${n}`).join(' | ')}`);
    checks++;
    if ([...descriptions].some(([, n]) => n > 1)) failures.push(`duplicate meta description across pages: ${[...descriptions].filter(([, n]) => n > 1).length} pair(s)`);
    /* FAQ blocks: the visible questions and the FAQPage JSON-LD must stay in step. A
       mismatch between the two is invisible in the browser and is exactly the kind of
       thing a search engine treats as misleading markup. */
    const FAQ_PAGES = ['pricing'];
    const vFaq = [];
    for (const f of FAQ_PAGES) {
      const html = readFileSync(resolve(root, `${f}.html`), 'utf8');
      const visible = (html.match(/<details class="faq-item">/g) || []).length;
      const block = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
        .map((m) => { try { return JSON.parse(m[1]); } catch { return null; } })
        .find((j) => j && j['@type'] === 'FAQPage');
      const schema = block ? block.mainEntity.length : 0;
      if (!visible || visible !== schema) vFaq.push(`${f} (visible ${visible}, schema ${schema})`);
    }
    checks++;
    if (vFaq.length) failures.push(`FAQ blocks out of step with FAQPage schema: ${vFaq.join(', ')}`);
    /* Perf: fonts must stay self-hosted (any fonts.googleapis/gstatic reference is a
       render-blocking third-party request), and every local image should carry real
       dimensions — read from the file, so they are layout-neutral. The first image on a
       page must stay eager: it is usually the LCP element. */
    const vFont = [], vImg = [], vFirst = [];
    let imgTotal = 0, imgSized = 0;
    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf8');
      const name = relative(root, f).replace(/\\/g, '/');
      if (/fonts\.googleapis|fonts\.gstatic/.test(html)) vFont.push(name);
      const tags = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
      tags.forEach((t, i) => {
        const src = (t.match(/src="([^"]+)"/) || [])[1] || '';
        if (!src.startsWith('/')) return; // remote image: dimensions are not ours to assert
        imgTotal++;
        if (/\bwidth="\d+"/.test(t) && /\bheight="\d+"/.test(t)) imgSized++; else vImg.push(`${name} ${src}`);
        if (i === 0 && /loading="lazy"/.test(t)) vFirst.push(name);
      });
    }
    checks++;
    if (vFont.length) failures.push(`third-party font request on: ${vFont.join(', ')}`);
    checks++;
    if (vImg.length) failures.push(`${vImg.length} local image(s) without width/height: ${vImg.join(', ')}`);
    checks++;
    if (vFirst.length) failures.push(`first image lazy-loaded (hurts LCP) on: ${vFirst.join(', ')}`);
    checks++;
    if (imgTotal < 40) failures.push(`only ${imgTotal} local images walked — the image assertions would be vacuous`);
    const total = cases.length + checks;
    mockLlm.close();
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
