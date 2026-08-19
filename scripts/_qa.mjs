// Zero-dep QA driver: launches headless Chrome, clicks through pages via CDP.
// Usage: node scripts/_qa.mjs <baseUrl> <outDir> [--screenshots]
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = process.argv[2] || 'http://localhost:4173';
const outDir = resolve(process.argv[3] || '.qa-out');
const shots = process.argv.includes('--screenshots');
mkdirSync(outDir, { recursive: true });

// ── tiny CDP client over the built-in WebSocket ──
const cdp = (ws, method, params = {}) => new Promise((resolve2, reject) => {
  const id = ++cdp._id;
  cdp._pending.set(id, { resolve2, reject });
  ws.send(JSON.stringify({ id, method, params }));
});
cdp._id = 0; cdp._pending = new Map();

async function main() {
  const port = 9229 + Math.floor(Math.random() * 1000);
  const profile = `${outDir}/chrome-profile`;
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
    `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1440,900',
    'about:blank',
  ], { stdio: 'ignore', detached: false });

  // wait for the debugging endpoint
  let targets;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      targets = await res.json();
      if (targets.length) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  if (!targets?.length) { console.error('✗ Chrome CDP did not come up'); chrome.kill(); process.exit(1); }

  const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail; });
  const consoleErrors = [];
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && cdp._pending.has(msg.id)) {
      const { resolve2, reject } = cdp._pending.get(msg.id);
      cdp._pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve2(msg.result);
      return;
    }
    if (msg.method === 'Runtime.exceptionThrown') consoleErrors.push('exception: ' + (msg.params.exceptionDetails?.text || ''));
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push('console.error: ' + msg.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
    }
  };
  const send = (m, p) => cdp(ws, m, p);

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  const pages = [
    ['/dashboard', 'dashboard'],
    ['/admin-leads', 'leads'],
    ['/admin-projects', 'projects'],
    ['/admin-invoices', 'invoices'],
    ['/admin-users', 'users'],
    ['/admin-articles', 'articles'],
    ['/admin-media', 'media'],
    ['/admin-settings', 'settings'],
    ['/admin-analytics', 'analytics'],
    ['/forms', 'forms'],
    ['/feedback', 'feedback'],
    ['/meeting-notes', 'meeting-notes'],
    ['/proposal-generator', 'proposals'],
    ['/files-deliverables', 'files'],
    ['/project-timeline', 'timeline'],
    ['/ai-chat-assistant', 'chat'],
    ['/search', 'search'],
  ];

  const report = [];
  for (const [path, name] of pages) {
    const url = base + path;
    process.stderr.write(`→ ${name} ... `);
    await send('Page.navigate', { url });
    await new Promise((r) => setTimeout(r, 1200)); // let the fetch + render settle
    const evalResult = await send('Runtime.evaluate', {
      expression: `(() => {
        const tbody = document.querySelector('#adm-tbody, #chat-box, #search-results');
        return JSON.stringify({
          title: document.title,
          h1: document.querySelector('h1')?.textContent?.trim() || '',
          rows: tbody ? tbody.children.length : null,
          statCards: [...document.querySelectorAll('.dash-stat-card, .scard')].map(c => c.textContent.trim().replace(/\\s+/g, ' ').slice(0, 80)),
          overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          scrollW: document.documentElement.scrollWidth,
          clientW: document.documentElement.clientWidth,
          tableCells: document.querySelectorAll('#adm-tbody tr').length,
        });
      })()`,
      returnByValue: true,
    });
    const data = JSON.parse(evalResult.result.value);
    process.stderr.write(`${data.rows ?? data.tableCells} rows\n`);
    const flags = [];
    if (data.overflowX) flags.push('OVERFLOW-X');
    if (data.title.includes('404')) flags.push('404');
    if (!data.rows && data.tableCells === 0 && ['leads', 'projects', 'invoices', 'users', 'articles', 'forms', 'feedback', 'meeting-notes', 'proposals', 'files', 'timeline'].includes(name) && name !== 'chat' && name !== 'search') flags.push('EMPTY-ROWS?');
    report.push({ path, name, ...data, flags });

    if (shots) {
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      writeFileSync(`${outDir}/${name}.png`, Buffer.from(shot.data, 'base64'));
    }
  }

  // summary
  for (const r of report) {
    console.log(`${r.name.padEnd(12)} ${r.flags.length ? '⚠ ' + r.flags.join(',') : 'ok'}  rows=${r.rows ?? r.tableCells}  h1="${r.h1}"`);
  }
  if (consoleErrors.length) {
    console.log('\n— console errors —');
    [...new Set(consoleErrors)].forEach((e) => console.log('  ' + e.slice(0, 160)));
  }
  ws.close();
  chrome.kill();
  process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });
