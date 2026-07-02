import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';
const OUTPUT_DIR = 'public/screenshots/design-audit';

// Ensure output directory exists
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const pages_to_audit = [
  { name: 'home', url: '/' },
  { name: 'services', url: '/services' },
  { name: 'portfolio', url: '/portfolio' },
  { name: 'about', url: '/about' },
  { name: 'contact', url: '/contact' },
  { name: 'pricing', url: '/pricing' },
  { name: 'blog', url: '/blog' },
  { name: 'faq', url: '/faq' },
];

const results = {};

for (const p of pages_to_audit) {
  const page = await context.newPage();
  console.log(`Auditing: ${p.name} (${p.url})`);
  
  try {
    await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // Full page screenshot
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, `${p.name}-full.png`), 
      fullPage: true 
    });
    
    // Above-the-fold screenshot
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, `${p.name}-fold.png`), 
      fullPage: false 
    });
    
    // Extract design system info
    const designInfo = await page.evaluate(() => {
      const body = document.body;
      const computedStyle = getComputedStyle(body);
      
      // Get fonts in use
      const fonts = new Set();
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, button, span, div').forEach(el => {
        const ff = getComputedStyle(el).fontFamily;
        if (ff) fonts.add(ff.split(',')[0].trim().replace(/['"]/g, ''));
      });
      
      // Get colors in use
      const colors = new Set();
      document.querySelectorAll('*').forEach(el => {
        const cs = getComputedStyle(el);
        if (cs.color && cs.color !== 'rgba(0, 0, 0, 0)') colors.add(cs.color);
        if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(cs.backgroundColor);
      });
      
      // Get heading hierarchy
      const headings = [];
      document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        const cs = getComputedStyle(h);
        headings.push({
          tag: h.tagName,
          text: h.textContent.trim().slice(0, 60),
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
        });
      });
      
      // Get touch targets (interactive elements)
      const touchTargets = [];
      document.querySelectorAll('a, button, input, [role="button"]').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          touchTargets.push({
            tag: el.tagName,
            text: (el.textContent || '').trim().slice(0, 30),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            undersized: rect.width < 44 || rect.height < 44,
          });
        }
      });
      
      // Get all text content for happy talk detection
      const textBlocks = [];
      document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li').forEach(el => {
        const text = el.textContent.trim();
        if (text.length > 20) {
          textBlocks.push(text.slice(0, 200));
        }
      });
      
      // Count total words
      const totalWords = textBlocks.join(' ').split(/\s+/).length;
      
      return {
        fonts: [...fonts],
        colors: [...colors].slice(0, 30),
        headings,
        touchTargets: touchTargets.filter(t => t.undersized).slice(0, 20),
        totalWords,
        textBlockCount: textBlocks.length,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        colorScheme: getComputedStyle(document.documentElement).colorScheme,
      };
    });
    
    results[p.name] = designInfo;
    console.log(`  ✓ Fonts: ${designInfo.fonts.length}, Colors: ${designInfo.colors.length}, Headings: ${designInfo.headings.length}`);
    console.log(`  ✓ Undersized touch targets: ${designInfo.touchTargets.length}`);
    console.log(`  ✓ Has horizontal scroll: ${designInfo.hasHorizontalScroll}`);
    
  } catch (err) {
    console.error(`  ✗ Error auditing ${p.name}: ${err.message}`);
    results[p.name] = { error: err.message };
  }
  
  await page.close();
}

// Mobile screenshots
console.log('\n--- Mobile Audit ---');
const mobileContext = await browser.newContext({ 
  viewport: { width: 375, height: 812 },
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
});

for (const p of [pages_to_audit[0], pages_to_audit[1], pages_to_audit[2]]) {
  const page = await mobileContext.newPage();
  console.log(`Mobile audit: ${p.name}`);
  
  try {
    await page.goto(`${BASE_URL}${p.url}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: path.join(OUTPUT_DIR, `${p.name}-mobile.png`), 
      fullPage: true 
    });
    
    const mobileInfo = await page.evaluate(() => {
      return {
        hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        bodyWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
      };
    });
    
    if (results[p.name] && !results[p.name].error) {
      results[p.name].mobile = mobileInfo;
    }
    console.log(`  ✓ Horizontal scroll: ${mobileInfo.hasHorizontalScroll}`);
  } catch (err) {
    console.error(`  ✗ Error: ${err.message}`);
  }
  
  await page.close();
}

await browser.close();

// Write results
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'audit-results.json'), 
  JSON.stringify(results, null, 2)
);

console.log(`\nAudit complete. Results saved to ${OUTPUT_DIR}/audit-results.json`);
console.log(`Screenshots saved to ${OUTPUT_DIR}/`);
