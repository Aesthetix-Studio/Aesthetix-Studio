const { chromium } = require('playwright');

const slugs = [
  'minimal', 'editorial', 'premium-saas', 'creative-studio',
  'enterprise', 'luxury', 'startup', 'modern-tech',
  'brutalist', 'high-end-portfolio'
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  for (const slug of slugs) {
    const page = await context.newPage();
    const url = `http://localhost:5173/showcase/${slug}`;
    console.log(`Capturing ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: `public/screenshots/${slug}.png`,
        fullPage: true
      });
      console.log(`  ✓ ${slug}.png`);
    } catch (e) {
      console.log(`  ✗ ${slug}: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('Done!');
})();
