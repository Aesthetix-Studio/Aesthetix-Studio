import { chromium } from 'playwright';
const browser = await chromium.launch();
const pages = [
  { url: 'http://localhost:5199/showcase/creative-studio', name: 'creative-studio' },
  { url: 'http://localhost:5199/showcase/premium-saas', name: 'premium-saas' },
];
for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(p.url, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `public/screenshots/${p.name}.png`, fullPage: true });
  await page.close();
  console.log(`Done: ${p.name}`);
}
await browser.close();
