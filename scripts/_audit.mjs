// ponytail: one-off CSS coverage audit. For each HTML page, every class used
// must appear in css/aesthetix.css — a missing class renders unstyled.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const css = fs.readFileSync(path.join(root, 'css', 'aesthetix.css'), 'utf8');

// selectors present in CSS (class names only, strips pseudo/elements)
const cssClasses = new Set();
for (const m of css.matchAll(/\.([a-zA-Z][\w-]*)/g)) cssClasses.add(m[1]);

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
let totalMissing = 0;
for (const f of htmlFiles) {
  const html = fs.readFileSync(path.join(root, f), 'utf8');
  const used = new Set();
  for (const m of html.matchAll(/class="([^"]*)"/g)) {
    for (const c of m[1].split(/\s+/)) if (c) used.add(c);
  }
  const missing = [...used].filter(c => !cssClasses.has(c)).sort();
  if (missing.length) {
    totalMissing += missing.length;
    console.log(`\n${f}: ${missing.length} unstyled class(es)`);
    console.log('  ' + missing.join(', '));
  }
}
console.log(`\n${htmlFiles.length} pages scanned, ${totalMissing} unstyled class occurrences`);
