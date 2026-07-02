import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:5199/showcase/creative-studio', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: 'public/screenshots/creative-studio.png', fullPage: true });
await browser.close();
console.log('Done');
