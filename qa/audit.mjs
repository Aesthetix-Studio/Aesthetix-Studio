// Aesthetix Studio — automated QA audit (Phase A: audit only, fixes nothing).
// Zero-dependency, Node stdlib only. Audits the GENERATED site in the repo root
// (root *.html + work/*.html) — run `npm run generate` first for the freshest build.
//
//   npm run qa            → writes qa/reports/qa-report.json + qa-report.md
//
// This tool is intentionally read-only toward the site tree: it never edits pages,
// CSS, assets or components (those belong to the visual workstream). Exit code is 1
// when CRITICAL findings exist, so CI can gate on it.
//
// Ownership note: this file lives in the QA lane (qa/). See qa/README.md.
import { spawn, execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

// QA_ROOT overrides the audited tree (used by qa/audit.test.mjs to run against a fixture).
const ROOT = process.env.QA_ROOT ? resolve(process.env.QA_ROOT) : resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_HOST = 'aesthetixstudio.com'; // canonical host used in canonical/og/sitemap tags
const OUT_DIR = join(ROOT, 'qa', 'reports');

// Keep in sync with the GATED set in scripts/serve.mjs (pages behind the session gate).
const GATED = new Set(['dashboard', 'admin-analytics', 'admin-articles', 'admin-invoices', 'admin-leads', 'admin-media', 'admin-projects', 'admin-settings', 'admin-users', 'ai-chat-assistant', 'brand-audit-tool', 'feedback', 'files-deliverables', 'forms', 'leads', 'meeting-notes', 'project-timeline', 'proposal-generator', 'search', 'tasks', 'messages', 'calendar', 'design-brief-analyzer', 'subscriptions', 'admin-testimonials', 'admin-categories', 'admin-tags', 'admin-comments', 'admin-pages', 'admin-lead-sources', 'admin-activity', 'admin-system-health', 'admin-ai-writer', 'admin-integrations', 'admin-roles', 'knowledge-base', 'design-system']);
const CARD_LINK_CLASS = /(?:cs-row-link|jcard-link|work-row-link|case-card)/;
const STOPWORDS = new Set(['view', 'case', 'study', 'read', 'article', 'more', 'the', 'and', 'a', 'an', 'of', 'our', 'work', 'for', 'to', 'in', 'on', 'that', 'with']);

// ---------- tiny helpers ----------
const findings = [];
const F = (severity, category, { page = '—', url = '', issue, evidence = '', source = '', fix }) =>
  findings.push({ id: 0, severity, category, page, url, issue, evidence, source, fix });
const lineAt = (html, idx) => html.slice(0, idx).split('\n').length;
const cleanRoute = (relFile) => {
  const p = relFile.split(sep).join('/');
  if (p === 'index.html') return '/';
  return '/' + p.replace(/\.html$/, '');
};
const routeToFile = (route) => (route === '/' ? 'index.html' : route.replace(/^\//, '') + '.html');
const fileOfRoute = (route) => (existsSync(join(ROOT, routeToFile(route))) ? routeToFile(route) : null);
const stripFrag = (u) => u.split('#')[0].split('?')[0];
const tokens = (s) => (s.toLowerCase().match(/[a-z]{3,}/g) || []).filter((t) => !STOPWORDS.has(t));
const pageIsGated = (route) => GATED.has(route.replace(/^\//, ''));
// Source attribution: proto pages are copied verbatim; everything else is built by generate.js.
const sourceOf = (route) => {
  const f = routeToFile(route);
  if (existsSync(join(ROOT, 'site', 'proto', f))) return 'site/proto/' + f;
  if (f.startsWith('work/')) return 'scripts/generate.js (case-study template)';
  return 'scripts/generate.js';
};
// Attribute an evidence snippet to the shared partials when it comes from them.
const partialTexts = new Map(['site/_footer.html', 'site/_nav.html', 'site/_head.html'].map((p) => [p, readFileSync(join(ROOT, p), 'utf8')]));
const partialOf = (snippet) => [...partialTexts.entries()].find(([, t]) => t.includes(snippet))?.[0] ?? '';

// ---------- 1. walk pages ----------
const SKIP_DIRS = new Set(['.git', '.github', '.freebuff', '.vercel', '.vscode', '.code-review-graph', '.qa-out', 'node_modules', 'site', 'scripts', 'css', 'js', 'data', 'fonts', 'images', 'work']); // work/ walked separately below
const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(p); continue; }
    if (e.name.endsWith('.html')) {
      const rel = relative(ROOT, p);
      pages.push({ route: cleanRoute(rel), file: rel.split(sep).join('/'), html: readFileSync(p, 'utf8') });
    }
  }
})(ROOT);
if (existsSync(join(ROOT, 'work')))
  for (const f of readdirSync(join(ROOT, 'work'))) {
    if (f.endsWith('.html')) {
      const rel = 'work/' + f;
      pages.push({ route: cleanRoute(rel), file: rel, html: readFileSync(join(ROOT, 'work', f), 'utf8') });
    }
  }
pages.sort((a, b) => a.route.localeCompare(b.route));
const pageByRoute = new Map(pages.map((p) => [p.route, p]));

if (pages.length < 50) { console.error(`✗ vacuous audit: only ${pages.length} pages walked — run \`npm run generate\` first`); process.exit(1); }

// ---------- 2. per-page parse + static checks ----------
const allAnchors = [];       // {page, href, cls, text, idx, len}
const allAssets = new Map(); // '/path' -> {referencedBy:Set, kind}
const apiFormEndpoints = new Map(); // '/api/x' -> Set of page routes whose <form action> points there
const fetchEndpoints = new Map();   // route -> Set of /api/... endpoints referenced in inline JS
let anchorTotal = 0, imgTotal = 0;
const titleSeen = new Map(), descSeen = new Map();
const noindexPages = [];
const genericAlt = /^(image|photo|picture|img|logo|icon|graphic|\.?)$/i;

function registerAsset(path, where, kind = 'asset') {
  const key = stripFrag(path);
  if (!key || !key.startsWith('/')) return;
  if (key.startsWith('/api/')) {
    if (kind === 'form action') {
      if (!apiFormEndpoints.has(key)) apiFormEndpoints.set(key, new Set());
      apiFormEndpoints.get(key).add(where);
    }
    return; // API endpoints are probed over HTTP, not checked as files
  }
  const rec = allAssets.get(key) ?? { referencedBy: new Set(), kind };
  rec.referencedBy.add(where);
  allAssets.set(key, rec);
}

for (const page of pages) {
  const { html, route } = page;
  const gated = pageIsGated(route);
  const line = (idx) => `${page.file}:${lineAt(html, idx)}`;

  // --- SEO head ---
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]?.trim() ?? '';
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1] ?? '';
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [])[1] ?? '';
  if (!title) F('HIGH', 'seo', { page: route, issue: 'Missing <title>', source: line(0), fix: 'Add a unique 50–60 char title.' });
  if (!desc) F('MEDIUM', 'seo', { page: route, issue: 'Missing meta description', source: line(0), fix: 'Add a 120–160 char description.' });
  if (!canonical) F('MEDIUM', 'seo', { page: route, issue: 'Missing canonical link', source: line(0), fix: `Add <link rel="canonical" href="https://${SITE_HOST}${route}">.` });
  else if (canonical.includes(SITE_HOST)) {
    let path; try { path = new URL(canonical).pathname; } catch { path = canonical; }
    if (path !== route) F('MEDIUM', 'seo', { page: route, url: canonical, issue: 'Canonical points at a different URL than the page route', evidence: `canonical=${canonical} vs route=${route}`, source: line(html.indexOf(canonical)), fix: 'Canonical must equal the clean route (a canonical that 301s wastes crawl equity).' });
  }
  for (const prop of ['og:title', 'og:description', 'og:image', 'twitter:card'])
    if (!html.includes(`property="${prop}"`) && !html.includes(`name="${prop}"`))
      F('LOW', 'seo', { page: route, issue: `Missing ${prop} (social card incomplete)`, source: line(0), fix: 'The build derives social tags — regenerate the page.' });
  if (/name="robots"\s+content="noindex"/.test(html)) noindexPages.push(route);

  if (title) titleSeen.set(title, (titleSeen.get(title) ?? []).concat(route));
  if (desc) descSeen.set(desc, (descSeen.get(desc) ?? []).concat(route));

  // --- JSON-LD parses ---
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))
    try { JSON.parse(m[1]); } catch { F('HIGH', 'seo', { page: route, issue: 'Structured data is not valid JSON', source: line(m.index), fix: 'Fix the JSON-LD block — parsers drop it entirely when invalid.' }); }

  // --- headings / ids / tabindex (script templates excluded — runtime ids are generated per row) ---
  const staticHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  const hs = [...staticHtml.matchAll(/<h([1-6])\b[^>]*>/gi)].map((m) => ({ level: +m[1], idx: m.index }));
  const h1s = hs.filter((h) => h.level === 1);
  if (!gated && h1s.length !== 1) F('MEDIUM', 'a11y', { page: route, issue: `Expected exactly one <h1>, found ${h1s.length}`, source: hs.length ? line(hs[0].idx) : page.file, fix: 'Give the page a single top-level heading.' });
  for (let i = 1; i < hs.length; i++)
    if (hs[i].level - hs[i - 1].level > 1)
      F('LOW', 'a11y', { page: route, issue: `Heading level skips h${hs[i - 1].level} → h${hs[i].level}`, source: line(hs[i].idx), fix: 'Use consecutive heading levels for a coherent outline.' });

  // --- duplicate ids (breaks label/aria/anchor targets) ---
  const idSeen = new Map();
  for (const m of staticHtml.matchAll(/\bid="([^"]+)"/g)) idSeen.set(m[1], (idSeen.get(m[1]) ?? []).concat(line(m.index)));
  for (const [id, at] of idSeen) if (at.length > 1) F('MEDIUM', 'a11y', { page: route, url: '#' + id, issue: `Duplicate id "${id}" (${at.length}×)`, evidence: at.join(', '), source: at[0], fix: 'Ids must be unique per document (labels, aria-labelledby and fragment links all silently misbind).' });

  // --- tabindex misuse ---
  for (const m of staticHtml.matchAll(/tabindex="(\d+)"/g))
    if (+m[1] > 0) F('MEDIUM', 'a11y', { page: route, issue: `Positive tabindex="${m[1]}" breaks natural tab order`, source: line(m.index), fix: 'Use 0 or -1 only.' });

  // --- images ---
  for (const m of html.matchAll(/<img\b[^>]*>/gi)) {
    imgTotal++;
    const tag = m[0], src = (tag.match(/src="([^"]+)"/) || [])[1] ?? '';
    const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
    if (alt === undefined) F('HIGH', 'a11y', { page: route, url: src, issue: 'Image without alt attribute', source: line(m.index), fix: 'Add alt="" (decorative) or a descriptive alt.' });
    else if (alt && genericAlt.test(alt.trim())) F('LOW', 'a11y', { page: route, url: src, issue: `Generic alt text "${alt}"`, source: line(m.index), fix: 'Describe the image content or use alt="" if decorative.' });
    if (src && !src.startsWith('/') && !/^(https?:|data:|\/\/)/i.test(src) && !/\$\{/.test(src))
      F('MEDIUM', 'assets', { page: route, url: src, issue: 'Relative image path — breaks on nested clean URLs', source: line(m.index), fix: 'Use a root-absolute path (/images/…).' });
    if (src.startsWith('/')) registerAsset(src, line(m.index));
  }

  // --- links ---
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    anchorTotal++;
    const attrs = m[1], inner = m[2], idx = m.index;
    const href = (attrs.match(/href="([^"]*)"/) || [])[1] ?? '';
    if (/[${}]/.test(href)) continue; // inline-JS template code (href="${…}"), not a real URL
    const cls = (attrs.match(/class="([^"]*)"/) || [])[1] ?? '';
    const aria = (attrs.match(/aria-label="([^"]*)"/) || [])[1] ?? '';
    const text = inner.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    allAnchors.push({ page, href, cls, text: aria || text, idx, len: m[0].length });
    if (!href || href === '#') continue; // placeholders aggregated in §3
    if (/^javascript:/i.test(href)) F('HIGH', 'links', { page: route, url: href, issue: 'javascript: URL', source: line(idx), fix: 'Use a real route or a <button>.' });
    else if (/^(mailto|tel):/i.test(href)) {
      if (/^mailto:/i.test(href) && !/mailto:[^\s@]+@[^\s@]+\.[^\s@]+/.test(href))
        F('MEDIUM', 'links', { page: route, url: href, issue: 'Malformed mailto address', source: line(idx), fix: 'Fix the email address.' });
    }
    let host = '';
    if (/^https?:\/\//i.test(href)) { try { host = new URL(href).host; } catch { host = ''; } if (!host) F('MEDIUM', 'links', { page: route, url: href, issue: 'Malformed absolute URL', source: line(idx), fix: 'Fix the URL syntax.' }); }
    if (!/^https?:\/\//i.test(href) && !/^(mailto|tel|javascript|#)/i.test(href) && !href.startsWith('/'))
      F(route.split('/').length > 2 ? 'HIGH' : 'LOW', 'links', { page: route, url: href, issue: route.split('/').length > 2 ? 'Relative link from a nested page resolves to the wrong directory' : 'Relative link (inconsistent with root-absolute convention)', source: line(idx), fix: 'Use root-absolute paths (/route).' });
    // empty accessible name
    const innerImgAlt = (inner.match(/<img[^>]*alt="([^"]*)"/) || [])[1];
    if (!text && !aria && innerImgAlt === '') F('HIGH', 'a11y', { page: route, url: href, issue: 'Link has no accessible name (icon/image-only with empty alt)', source: line(idx), fix: 'Add aria-label or meaningful alt/text.' });
  }

  // --- buttons ---
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const aria = (m[1].match(/aria-label="([^"]*)"/) || [])[1] ?? '';
    const text = m[2].replace(/<[^>]+>/g, ' ').trim();
    if (!aria && !text) F('HIGH', 'a11y', { page: route, issue: 'Button with no accessible name', source: line(m.index), fix: 'Add aria-label.' });
  }

  // --- form controls: label association ---
  const labelIds = new Set([...html.matchAll(/<label[^>]*\bfor="([^"]+)"/g)].map((m) => m[1]));
  const labelBlocks = [...html.matchAll(/<label\b[^>]*>[\s\S]*?<\/label>/g)].map((m) => ({ start: m.index, end: m.index + m[0].length, body: m[0] }));
  for (const m of html.matchAll(/<(input|select|textarea)\b[^>]*>/gi)) {
    const tag = m[0];
    if (/type="(hidden|submit|button)"/.test(tag)) continue;
    const id = (tag.match(/\bid="([^"]+)"/) || [])[1] ?? '';
    // ponytail: label association is regex-approximate (no full DOM) — a control inside
    // <label>…</label> is detected by searching the label bodies for its id; unusual
    // nesting may slip through. Upgrade path: real DOM walker.
    const wrapped = labelBlocks.some((b) => m.index > b.start && m.index < b.end) || (id && labelBlocks.some((b) => b.body.includes(`id="${id}"`)));
    if (!(tag.includes('aria-label=') || tag.includes('aria-labelledby=') || (id && labelIds.has(id)) || wrapped))
      F('MEDIUM', 'a11y', { page: route, issue: 'Form control missing an associated label', evidence: tag.slice(0, 120), source: line(m.index), fix: 'Add <label for> + id, aria-label, or wrap the control in <label>.' });
  }

  // --- forms / endpoints ---
  const forms = [...html.matchAll(/<form\b([^>]*)>/gi)].map((m) => ({ attrs: m[1], idx: m.index }));
  const jsEndpoints = new Set([...html.matchAll(/fetch\((['"`])([^'"`]+?)\1/g)].map((m) => m[2]).filter((u) => u.startsWith('/api/')));
  jsEndpoints.forEach((e) => { if (!fetchEndpoints.has(route)) fetchEndpoints.set(route, new Set()); fetchEndpoints.get(route).add(e); });
  for (const f of forms) {
    const action = (f.attrs.match(/action="([^"]*)"/) || [])[1] ?? '';
    const inert = /onsubmit="return false"/.test(f.attrs);
    if (action) registerAsset(action, route, 'form action');
    else if (jsEndpoints.size) { /* wired via inline JS — endpoints probed over HTTP below */ }
    else if (inert) F('LOW', 'forms', { page: route, issue: 'Form is intentionally inert (onsubmit="return false", no endpoint)', source: line(f.idx), fix: 'Prototype only — wire an endpoint before shipping as functional.' });
    else F('HIGH', 'forms', { page: route, issue: 'Form has no action and no client wiring found', source: line(f.idx), fix: 'Point it at an API endpoint (see /api/*).' });
  }

  // --- <link>/<script>/<source> asset refs ---
  for (const m of html.matchAll(/(?:<link\b[^>]*?href|<script\b[^>]*?src|<source\b[^>]*?src|<video\b[^>]*?poster)="([^"]+)"/gi))
    if (m[1].startsWith('/')) registerAsset(m[1], line(m.index));
}

// ---------- 3. cross-page link resolution ----------
const internalDocRefs = new Map(); // target route -> Set of refs
const htmlLinkedRoutes = new Set(); // routes referenced via .html URLs (for 301 spot-probe)
const externalLinks = new Map(); // url -> Set of page routes
const placeholderCluster = new Map(); // key -> {pages:Set, texts:Set, sample, page0}

for (const a of allAnchors) {
  const { page, href, text, cls, idx, len } = a;
  const line = `${page.file}:${lineAt(page.html, idx)}`;
  if (!href || href === '#') {
    const key = /^(LinkedIn|GitHub|Dribbble|X \(Twitter\))$/.test(text || '') ? '#social' : text || '(empty)';
    const c = placeholderCluster.get(key) ?? { pages: new Set(), texts: new Set(), sample: line };
    c.pages.add(page.route); c.texts.add(text || '(empty)');
    placeholderCluster.set(key, c);
    continue;
  }
  let url = href;
  if (/^https?:\/\//i.test(href)) {
    let u; try { u = new URL(href); } catch { continue; }
    if (u.host === SITE_HOST) url = u.pathname + u.search + u.hash;
    else { if (!externalLinks.has(href)) externalLinks.set(href, new Set()); externalLinks.get(href).add(page.route); continue; }
  }
  if (/^(mailto|tel|javascript):/i.test(url)) continue; // scheme links handled in §2
  const [pathPart, frag] = url.split('#');
  if (!pathPart) {
    if (frag && !page.html.includes(`id="${frag}"`))
      F('MEDIUM', 'links', { page: page.route, url: '#' + frag, issue: 'In-page fragment target missing', source: line, fix: `Add id="${frag}".` });
    continue;
  }
  let target = pathPart;
  if (!pathPart.startsWith('/')) {
    const baseDir = page.route.split('/').slice(0, -1).join('/');
    target = (baseDir === '/' ? '' : baseDir) + '/' + pathPart.replace(/^\.\//, '');
  }
  target = stripFrag(target);
  if (target.endsWith('.html')) { htmlLinkedRoutes.add(target.replace(/\.html$/, '') || '/'); target = target.replace(/\.html$/, '') || '/'; }
  const targetFile = fileOfRoute(target);
  if (!targetFile && !extname(target)) {
    F('CRITICAL', 'links', { page: page.route, url: target, issue: 'Broken internal link — destination page does not exist', evidence: `link text "${text || href}"`, source: line, fix: `Create ${routeToFile(target)} or repoint the link.` });
  } else if (!targetFile) {
    registerAsset(target, line, 'link'); // non-page target (xml etc.) — asset existence check
  } else {
    if (!internalDocRefs.has(target)) internalDocRefs.set(target, new Set());
    internalDocRefs.get(target).add({ from: page.route, url: target, text, cls, idx, len, line, page });
    if (frag) {
      const destHtml = pageByRoute.get(target)?.html ?? '';
      if (destHtml && !destHtml.includes(`id="${frag}"`))
        F('MEDIUM', 'links', { page: page.route, url: `${target}#${frag}`, issue: 'Fragment target missing on destination page', source: line, fix: `Add id="${frag}" or drop the fragment.` });
    }
  }
}

// .html links → non-canonical (the server 301s every one of them). Aggregated: shared partials drive most of it.
{
  const byTarget = new Map();
  for (const a of allAnchors) {
    if (!a.href.startsWith('/') || !a.href.split('#')[0].split('?')[0].endsWith('.html')) continue;
    const t = stripFrag(a.href);
    const c = byTarget.get(t) ?? { pages: new Set(), sample: `${a.page.file}:${lineAt(a.page.html, a.idx)}` };
    c.pages.add(a.page.route); byTarget.set(t, c);
  }
  if (byTarget.size) {
    const partial = [...byTarget.keys()].map((t) => partialOf(`href="${t}"`)).find(Boolean) ?? '';
    const pageSet = new Set([...byTarget.values()].flatMap((c) => [...c.pages]));
    F('MEDIUM', 'links', {
      page: `${byTarget.size} distinct targets across ${pageSet.size} pages`,
      issue: 'Internal links use non-canonical .html URLs (the server 301s every one of them)',
      evidence: [...byTarget.keys()].slice(0, 12).join(', ') + (byTarget.size > 12 ? ' …' : ''),
      source: partial || 'site/_nav.html, site/_footer.html + proto pages',
      fix: `Point links at clean routes (e.g. ${[...byTarget.keys()].slice(0, 3).map((t) => t.replace(/\.html$/, '')).join(', ')}). The shared partials fix most pages in one edit.`,
    });
  }
}

// dead placeholder `#` links, aggregated per identical cluster
for (const [, c] of placeholderCluster) {
  const texts = [...c.texts];
  const socials = texts.length > 1 && /^(LinkedIn|GitHub|Dribbble|X \(Twitter\))(,|(, )|$)/.test(texts.join(', '));
  F(socials ? 'HIGH' : 'MEDIUM', 'cta', {
    page: [...c.pages].slice(0, 6).join(', ') + (c.pages.size > 6 ? ` +${c.pages.size - 6} more` : ''),
    url: '#',
    issue: `Dead placeholder link${c.pages.size > 1 ? ` on ${c.pages.size} pages` : ''}: "${texts.join('", "')}"`,
    evidence: `href="#" (sample: ${c.sample})`,
    source: c.pages.size > 10 ? (partialOf(`href="#">${texts[0]}`) || c.sample) : c.sample,
    fix: socials ? 'Set the real social profile URLs in site/_footer.html — one edit fixes every page.' : 'Point at a real destination or remove the affordance.',
  });
}

// duplicate destinations where unique destinations are expected (copy-paste card signature)
{
  const byPage = new Map();
  for (const refs of internalDocRefs.values())
    for (const ref of refs)
      if (CARD_LINK_CLASS.test(ref.cls)) {
        if (!byPage.has(ref.from)) byPage.set(ref.from, new Map());
        const m = byPage.get(ref.from);
        if (!m.has(ref.url)) m.set(ref.url, []);
        m.get(ref.url).push(ref);
      }
  for (const [pageRoute, dests] of byPage)
    for (const [url, refs] of dests)
      if (refs.length > 1 && new Set(refs.map((r) => r.text)).size > 1)
        F('HIGH', 'cta', {
          page: pageRoute, url,
          issue: `Card links expect unique destinations but ${refs.length} cards share "${url}"`,
          evidence: refs.map((r) => `"${r.text}" (${r.line})`).join(' · '),
          source: refs[0].line,
          fix: 'Each card gets its own destination — this is the copy-paste signature.',
        });
}

// card name vs destination mismatch (case-study / work / journal cards)
for (const [target, refs] of internalDocRefs) {
  const dest = pageByRoute.get(target);
  if (!dest) continue;
  const destTitle = (dest.html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] ?? '';
  const destTokens = new Set([...tokens(target), ...tokens(destTitle)]);
  for (const ref of refs) {
    if (!CARD_LINK_CLASS.test(ref.cls)) continue;
    // ponytail: card-name extraction is a text-window heuristic, not DOM parsing — it can
    // miss unusual markup. Scoped to card links only, nearest heading first, so false
    // positives stay rare; upgrade path: a real DOM walker.
    const winStart = Math.max(0, ref.idx - 1600);
    const win = ref.page.html.slice(winStart, ref.idx + ref.len + 800);
    const GENERIC_NAME = /^(more|send|the|a\b|an\b|tell|want|ready|let|start|join|have|we|it's|its|view|read|our|meet|get|see|explore|all|every|why|how|what|build)\b/i; // section headers & CTA/tagline phrases, not card names
    const names = [...win.matchAll(/<(?:h2|h3|div class="eyebrow")[^>]*>([^<]{2,90})</g)]
      .map((m) => ({ name: m[1].trim(), d: ref.idx - (winStart + m.index) })) // d>0: heading precedes the link
      .filter((c) => c.d >= -250 && c.d <= 500 && !GENERIC_NAME.test(c.name)) // the card's own heading, not a neighbor section's
      .sort((x, y) => Math.abs(x.d) - Math.abs(y.d))
      .map((c) => c.name);
    // nearest heading IS the card name; flag only when it shares zero tokens with the destination
    const name = names[0] ?? '';
    const nameTokens = tokens(name);
    if (!nameTokens.length || nameTokens.some((t) => destTokens.has(t))) continue;
    F('MEDIUM', 'cta', {
      page: ref.page.route, url: target,
      issue: `Possible wrong destination: card "${name}" links to ${target} ("${destTitle.split('—')[0].trim()}")`,
      evidence: ref.line,
      source: ref.line,
      fix: 'Verify the card↔destination mapping — the card name shares no tokens with the destination page.',
    });
  }
}

// asset existence + unused assets
{
  for (const [path, rec] of allAssets) {
    const file = resolve(ROOT, '.' + path);
    rec.exists = existsSync(file) && !relative(ROOT, file).startsWith('..');
    if (!rec.exists)
      F('CRITICAL', 'assets', { url: path, issue: 'Referenced file does not exist', evidence: [...rec.referencedBy].slice(0, 4).join(', '), source: [...rec.referencedBy][0], fix: `Restore or repoint ${path}.` });
  }
  const referenced = new Set([...allAssets.keys()]);
  const cssText = existsSync(join(ROOT, 'css', 'aesthetix.css')) ? readFileSync(join(ROOT, 'css', 'aesthetix.css'), 'utf8') : '';
  for (const m of cssText.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) { try { referenced.add(new URL(m[2], 'https://x/').pathname); } catch { /* skip */ } }
  const unused = [];
  (function w(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) w(p);
      else {
        const rel = '/' + relative(ROOT, p).split(sep).join('/');
        if (!referenced.has(rel)) unused.push(rel);
      }
    }
  })(join(ROOT, 'images'));
  for (const f of ['favicon.svg', 'og-image.png'])
    if (!referenced.has('/' + f) && !cssText.includes(f)) unused.push('/' + f);
  let tracked = new Set();
  try { tracked = new Set(execFileSync('git', ['ls-files'], { cwd: ROOT }).toString().split('\n')); } catch { /* git unavailable — skip WIP annotation */ }
  for (const u of unused.slice(0, 40)) {
    const wip = !tracked.has(u.slice(1));
    F('LOW', 'assets', {
      url: u,
      issue: wip ? 'Asset is not referenced by any page (untracked in git — likely work-in-progress by the visual workstream)' : 'Asset is not referenced by any page',
      evidence: wip ? 'untracked file — do not delete, likely mid-task' : 'no references found in HTML/CSS',
      source: '—',
      fix: wip ? 'Leave for the visual agent; re-run the audit after their task lands.' : 'Delete if truly abandoned, or wire it up.',
    });
  }
}

// ---------- 4. sitemap / robots ----------
const sitemapLocs = existsSync(join(ROOT, 'sitemap.xml'))
  ? [...readFileSync(join(ROOT, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => { try { return new URL(m[1]).pathname; } catch { return m[1]; } })
  : [];
const robotsText = existsSync(join(ROOT, 'robots.txt')) ? readFileSync(join(ROOT, 'robots.txt'), 'utf8') : '';
const disallow = [...robotsText.matchAll(/^Disallow:\s*(\S+)/gm)].map((m) => m[1]);
const isPrivate = (route) => disallow.some((d) => d !== '/' && route.startsWith(d));

for (const loc of sitemapLocs) {
  if (loc.endsWith('.html')) F('MEDIUM', 'seo', { page: loc, issue: 'Sitemap entry uses non-canonical .html URL', source: 'sitemap.xml', fix: 'List the clean route.' });
  else if (!pageByRoute.has(loc)) F('CRITICAL', 'seo', { page: loc, issue: 'Sitemap advertises a URL with no page (404 for crawlers)', source: 'sitemap.xml', fix: `Remove the entry or restore ${routeToFile(loc)}.` });
}
for (const p of pages) {
  if (['/404', '/500'].includes(p.route) || pageIsGated(p.route) || isPrivate(p.route)) continue;
  if (!sitemapLocs.includes(p.route))
    F('MEDIUM', 'seo', { page: p.route, issue: 'Public page is missing from sitemap.xml (not disallowed by robots either)', source: sourceOf(p.route), fix: `Add https://${SITE_HOST}${p.route} to sitemap.xml, or Disallow it in robots.txt if it should stay private.` });
}
for (const p of pages)
  if (pageIsGated(p.route) && !isPrivate(p.route))
    F('MEDIUM', 'seo', { page: p.route, issue: 'Gated page is neither in robots.txt Disallow nor noindex — crawlers get a 302 to /login', source: p.file, fix: `Add "Disallow: ${p.route}" to robots.txt.` });
for (const d of disallow) {
  if (d === '/' || d === '/site' || d === '/scripts' || d.startsWith('/admin')) continue;
  const route = '/' + d.replace(/^\//, '').replace(/\/$/, '');
  if (!pageByRoute.has(route))
    F('LOW', 'seo', { page: route, issue: 'robots.txt disallows a route that has no page', source: 'robots.txt', fix: 'Drop the stale rule.' });
}
{
  const wrong = noindexPages.filter((r) => !['/404', '/500'].includes(r));
  if (wrong.length) F('LOW', 'seo', { page: wrong.join(', '), issue: 'Unexpected noindex directive', source: '—', fix: 'Only 404/500 should be noindex.' });
  for (const r of ['/404', '/500'])
    if (pageByRoute.has(r) && !noindexPages.includes(r))
      F('MEDIUM', 'seo', { page: r, issue: 'Error page missing noindex (soft-404 risk)', source: pageByRoute.get(r).file, fix: 'Add <meta name="robots" content="noindex">.' });
}

// duplicate titles/descriptions across pages
for (const [t, rs] of titleSeen) if (rs.length > 1) F('HIGH', 'seo', { page: rs.join(', '), issue: `Duplicate <title> on ${rs.length} pages`, evidence: t, source: sourceOf(rs[0]), fix: 'Every page needs a unique title.' });
for (const [d, rs] of descSeen) if (rs.length > 1) F('MEDIUM', 'seo', { page: rs.join(', '), issue: `Duplicate meta description on ${rs.length} pages`, evidence: d.slice(0, 80) + '…', source: sourceOf(rs[0]), fix: 'Differentiate the descriptions.' });

// ---------- 5. HTTP probe (spawn the real server on an ephemeral port) ----------
const http = { mode: 'skipped', checks: 0, results: [] };
if (process.env.QA_NO_HTTP !== '1') {
  const port = 20000 + Math.floor(Math.random() * 20000);
  const tmp = mkdtempSync(join(tmpdir(), 'qa-'));
  let child;
  const { request } = await import('node:http');
  const probe = (path, { method = 'GET', body } = {}) =>
    new Promise((ok) => {
      const r = request({ host: '127.0.0.1', port, path, method, headers: body ? { 'content-type': 'application/json' } : {} }, (res) => {
        let b = ''; res.on('data', (c) => (b += c)); res.on('end', () => ok({ status: res.statusCode, location: res.headers.location ?? '', body: b }));
      });
      r.on('error', () => ok({ status: 0 }));
      r.setTimeout(4000, () => { r.destroy(); ok({ status: 0 }); });
      if (body) r.write(JSON.stringify(body));
      r.end();
    });
  try {
    child = spawn(process.execPath, ['scripts/serve.mjs'], { cwd: ROOT, env: { ...process.env, PORT: String(port), DB_PATH: join(tmp, 'qa.sqlite') }, stdio: 'ignore' });
    const deadline = Date.now() + 6000;
    let up = false;
    while (Date.now() < deadline) {
      if ((await probe('/')).status) { up = true; break; }
      await new Promise((ok) => setTimeout(ok, 150));
    }
    if (!up) throw new Error('server did not come up');
    http.mode = 'live';

    const expect = async (path, want, note) => {
      http.checks++;
      const got = await probe(path);
      const pass = want(got);
      http.results.push({ path, status: got.status, location: got.location, pass, note });
      return got;
    };

    // every page route (gated pages may 302 when ADMIN_TOKEN is set locally)
    for (const p of pages) {
      const gated = pageIsGated(p.route);
      const wantStatus = p.route === '/404' ? 404 : p.route === '/500' ? 500 : 200;
      await expect(p.route, (g) => (gated ? [200, 302].includes(g.status) : g.status === wantStatus), gated ? 'gated page (200 open / 302 with ADMIN_TOKEN)' : 'page');
    }
    // .html variants must 301 to the clean route
    for (const r of [...htmlLinkedRoutes].slice(0, 40)) {
      const got = await expect(r + '.html', (g) => g.status === 301, '301 to clean URL');
      if (got.status === 301 && got.location !== r)
        F('MEDIUM', 'links', { page: r + '.html', issue: `301 location is "${got.location}", expected "${r}"`, source: 'scripts/serve.mjs', fix: 'Check the redirect mapping.' });
    }
    // every referenced asset must serve
    for (const [path, rec] of allAssets)
      if (rec.exists) await expect(path, (g) => g.status === 200, 'asset');
    // favicon.ico convention
    await expect('/favicon.ico', (g) => g.status === 200, 'browser auto-request');
    // admin chrome exposure through /site/ (robots-blocked but still served raw)
    {
      const got = await expect('/site/proto/dashboard', () => true, 'admin template reachability check');
      if (got.status === 200) F('MEDIUM', 'security', { page: '/site/proto/*', url: '/site/proto/dashboard.html', issue: 'Raw admin-screen templates (placeholder chrome) are served under /site/, bypassing the session gate', evidence: 'GET /site/proto/dashboard.html → 200 (the HTML gate matches clean routes only)', source: 'site/proto/', fix: 'Exclude /site from deploys or make the server 404 /site/* in production.' });
    }
    // API endpoints referenced by page JS / form actions must exist (anything but 404 counts as present)
    for (const [route, eps] of fetchEndpoints)
      for (const ep of eps) {
        const got = await expect(ep, (g) => g.status !== 404, `endpoint used by ${route}`);
        if (got.status === 404) F('CRITICAL', 'forms', { page: route, url: ep, issue: 'Client calls an API endpoint that does not exist', source: pageByRoute.get(route)?.file ?? route, fix: 'Implement or repoint the endpoint.' });
      }
    for (const [ep, routes] of apiFormEndpoints) {
      const got = await expect(ep, (g) => g.status !== 404, `form action from ${[...routes].join(', ')}`);
      if (got.status === 404) F('CRITICAL', 'forms', { page: [...routes].join(', '), url: ep, issue: 'Form action points at a missing endpoint', source: '—', fix: 'Implement or repoint the endpoint.' });
    }
    // contact endpoint alive + validating (invalid body → 400; never writes a lead)
    {
      const got = await probe('/api/contact', { method: 'POST', body: {} });
      http.checks++;
      http.results.push({ path: 'POST /api/contact {}', status: got.status, pass: got.status === 400, note: 'validation' });
      if (got.status !== 400) F('HIGH', 'forms', { page: '/contact', url: '/api/contact', issue: `POST /api/contact with empty body returned ${got.status} (expected 400)`, source: 'scripts/api.mjs', fix: 'Validation must reject empty submissions.' });
    }
    // external links — best-effort HEAD, tolerant of offline sandboxes
    for (const [url, from] of externalLinks) {
      let status = 0, note = 'unverified (no network)';
      try {
        const ac = new AbortController();
        const t = setTimeout(() => ac.abort(), 5000);
        const res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ac.signal });
        clearTimeout(t); status = res.status; note = 'HEAD';
      } catch { /* offline / blocked — report as unverified, not broken */ }
      F(status >= 400 ? 'HIGH' : 'LOW', 'links', { page: [...from].join(', '), url, issue: status ? `External link returns HTTP ${status}` : 'External link could not be verified from this environment', evidence: note, source: '—', fix: status ? 'Update or remove the link.' : 'Verify manually or from a networked CI run.' });
    }
  } catch (e) {
    http.mode = 'failed';
    F('LOW', 'meta', { issue: `HTTP probe skipped: ${e.message}`, fix: 'Run `npm run qa` from the repo root; QA_NO_HTTP=1 disables this layer.' });
  } finally {
    child?.kill();
    try { rmSync(tmp, { recursive: true, force: true }); } catch { /* temp best-effort */ }
  }
}
for (const r of http.results.filter((x) => !x.pass))
  F('CRITICAL', 'http', { page: r.path, url: r.path, issue: `HTTP ${r.status} where ${r.note} was expected`, evidence: r.location ? `→ ${r.location}` : '', source: '—', fix: 'Inspect the route in scripts/serve.mjs or the referenced file.' });

// ---------- 6. reports ----------
const sevRank = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
findings.sort((a, b) => sevRank[a.severity] - sevRank[b.severity] || a.category.localeCompare(b.category) || 0);
findings.forEach((f, i) => (f.id = i + 1));
const counts = findings.reduce((m, f) => ((m[f.severity] = (m[f.severity] ?? 0) + 1), m), {});
const byCategory = findings.reduce((m, f) => ((m[f.category] = (m[f.category] ?? 0) + 1), m), {});

// vacuity guards — an audit that silently checks nothing is worse than no audit
if (anchorTotal < 200) { console.error(`✗ vacuous audit: only ${anchorTotal} anchors parsed`); process.exit(1); }
if (imgTotal < 30) { console.error(`✗ vacuous audit: only ${imgTotal} images parsed`); process.exit(1); }

mkdirSync(OUT_DIR, { recursive: true });
const meta = {
  generatedAt: new Date().toISOString(),
  tool: 'qa/audit.mjs',
  mode: `static + http:${http.mode}`,
  pagesAudited: pages.length,
  anchorsParsed: anchorTotal,
  imagesParsed: imgTotal,
  httpChecks: http.checks,
  externalLinks: externalLinks.size,
  noindexPages,
  counts,
  byCategory,
};
writeFileSync(join(OUT_DIR, 'qa-report.json'), JSON.stringify({ meta, inventory: { routes: pages.map((p) => ({ route: p.route, file: p.file, source: sourceOf(p.route), gated: pageIsGated(p.route) })) }, http, findings }, null, 2));

const md = [`# Aesthetix Studio — QA Report`];
md.push(`\n_Generated by \`qa/audit.mjs\` on ${meta.generatedAt} · ${pages.length} pages · ${anchorTotal} links · ${imgTotal} images · ${http.checks} HTTP checks (${http.mode})_\n`);
md.push(`\n## Summary\n`);
md.push(`| Severity | Count |\n|---|---|`);
for (const s of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) md.push(`| ${s} | ${counts[s] ?? 0} |`);
md.push(`\n| Category | Findings |\n|---|---|`);
for (const [c, n] of Object.entries(byCategory)) md.push(`| ${c} | ${n} |`);
for (const sev of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) {
  const rows = findings.filter((f) => f.severity === sev);
  if (!rows.length) continue;
  md.push(`\n## ${sev} (${rows.length})\n`);
  for (const f of rows) {
    md.push(`### ${f.id}. [${f.category}] ${f.issue}`);
    if (f.page && f.page !== '—') md.push(`- **Page(s):** ${f.page}`);
    if (f.url) md.push(`- **URL:** ${f.url}`);
    if (f.evidence) md.push(`- **Evidence:** ${f.evidence}`);
    if (f.source && f.source !== '—') md.push(`- **Source:** \`${f.source}\``);
    md.push(`- **Recommended fix:** ${f.fix}\n`);
  }
}
md.push(`\n## Scope & limitations\n`);
md.push(`- Static audit of the generated tree (root + \`work/\`), plus live HTTP probes against a spawned dev server on an ephemeral port.`);
md.push(`- Visual/contrast, focus order and runtime behaviour need a browser pass — out of scope for a static audit by design.`);
md.push(`- External-link verification is best-effort; offline environments list them as unverified rather than broken.`);
md.push(`- This audit fixes nothing. Per the workstream split, fixes to pages/CSS/assets belong to the visual lane; routing/metadata/robots fixes belong to the QA lane (Phases B–D).`);
writeFileSync(join(OUT_DIR, 'qa-report.md'), md.join('\n'));

console.log(`✓ QA audit complete → qa/reports/qa-report.{json,md}`);
console.log(`  ${pages.length} pages · ${anchorTotal} links · ${imgTotal} images · ${http.checks} http checks (${http.mode})`);
for (const s of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) console.log(`  ${s.padEnd(8)} ${String(counts[s] ?? 0).padStart(3)}`);
process.exit((counts.CRITICAL ?? 0) > 0 ? 1 : 0);
