// Smallest check that the audit logic itself works: build a throwaway fixture site
// with seeded defects, run qa/audit.mjs against it (QA_ROOT), assert each defect is
// found and nothing else is reported broken. No frameworks — plain node:assert.
// Run: node qa/audit.test.mjs
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = mkdtempSync(join(tmpdir(), 'qa-fixture-'));
try {
  // minimal partials the audit reads unconditionally
  mkdirSync(join(root, 'site'), { recursive: true });
  mkdirSync(join(root, 'images'), { recursive: true });
  for (const p of ['_footer.html', '_nav.html', '_head.html']) writeFileSync(join(root, 'site', p), '');
  writeFileSync(join(root, 'images', 'pad.svg'), '<svg xmlns="http://www.w3.org/2000/svg"></svg>');
  // 48 boring pages: enough anchors/images to pass the audit's vacuity guards
  const pad = (i) => `<!doctype html><html lang="en"><head><title>Pad ${i} — Aesthetix Studio</title><link rel="canonical" href="https://aesthetixstudio.com/pad-${i}"></head><body><h1>Pad ${i}</h1>${Array.from({ length: 5 }, (_, k) => `<a href="/pad-${(i + 1 + k) % 48}">pad link ${k}</a>`).join('')}<img src="/images/pad.svg" alt="Pad decoration" width="10" height="10"></body></html>`;
  for (let i = 0; i < 48; i++) writeFileSync(join(root, `pad-${i}.html`), pad(i));
  // seeded defects
  writeFileSync(join(root, 'index.html'),
    '<!doctype html><html lang="en"><head><title>Home — Aesthetix Studio</title><link rel="canonical" href="https://aesthetixstudio.com/"></head><body><h1>Home</h1>' +
    '<a class="cs-row-link" href="/missing">View case study</a>' + // broken internal link (CRITICAL)
    '<a class="cs-row-link" href="/pad-0">Alpha</a>' +              // duplicate destination, distinct texts (HIGH)
    '<a class="cs-row-link" href="/pad-0">Beta</a>' +
    '<img src="/images/nope.png" alt="Missing">' +                  // missing asset (CRITICAL)
    '<img src="relative.png" alt="Relative">' +                     // relative image path (MEDIUM)
    '<button></button></body></html>');                             // unnamed button (HIGH)
  writeFileSync(join(root, 'notitle.html'),
    '<!doctype html><html lang="en"><head></head><body><h1>No title</h1><img src="/images/pad.svg" width="10" height="10"></body></html>'); // missing <title> + missing alt

  const run = spawnSync(process.execPath, [join(REPO, 'qa', 'audit.mjs')], { env: { ...process.env, QA_ROOT: root, QA_NO_HTTP: '1' }, encoding: 'utf8' });
  let report;
  try {
    report = JSON.parse(readFileSync(join(root, 'qa', 'reports', 'qa-report.json'), 'utf8'));
  } catch {
    throw new Error(`audit produced no report (exit ${run.status})\nstdout: ${run.stdout}\nstderr: ${run.stderr}`);
  }
  const f = report.findings;

  assert.strictEqual(report.meta.pagesAudited, 50, `pages: ${report.meta.pagesAudited}`);
  assert.ok(f.some((x) => x.severity === 'CRITICAL' && x.category === 'links' && x.url === '/missing'), 'broken internal link not detected');
  assert.ok(f.some((x) => x.severity === 'HIGH' && x.category === 'cta' && x.url === '/pad-0' && /share/.test(x.issue)), 'duplicate card destinations not detected');
  assert.ok(f.some((x) => x.severity === 'CRITICAL' && x.category === 'assets' && x.url === '/images/nope.png'), 'missing asset not detected');
  assert.ok(f.some((x) => x.category === 'a11y' && /Button with no accessible name/.test(x.issue)), 'unnamed button not detected');
  assert.ok(f.some((x) => x.category === 'a11y' && /without alt/.test(x.issue)), 'missing alt not detected');
  assert.ok(f.some((x) => x.category === 'seo' && /Missing <title>/.test(x.issue)), 'missing title not detected');
  assert.ok(f.some((x) => x.category === 'assets' && /Relative image path/.test(x.issue)), 'relative image path not detected');
  // no phantom broken links beyond the seeded one
  assert.ok(f.filter((x) => x.category === 'links' && x.issue.startsWith('Broken')).every((x) => x.url === '/missing'), 'unexpected broken-link findings');
  // seeded CRITICALs must gate the exit code (CI contract)
  assert.strictEqual(run.status, 1, `audit exit code: ${run.status} ${run.stderr}`);
  console.log('✓ audit self-test passed (7 defect classes detected, no phantom findings)');
} finally {
  rmSync(root, { recursive: true, force: true });
}
