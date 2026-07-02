import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const projects = [
  { slug: 'physiocore', url: 'https://aesthetix-studio.github.io/PhysioCore/' },
  { slug: 'aurelia', url: 'https://aesthetix-studio.github.io/Aurelia/' },
  { slug: 'review-harvest', url: 'https://review-harvest-2.vercel.app/' },
  { slug: 'luxe-tech', url: 'https://luxe-tech-taupe.vercel.app/' },
];

async function main() {
  await mkdir('public/projects', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  for (const project of projects) {
    console.log(`Capturing ${project.slug}...`);
    const page = await context.newPage();

    try {
      await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Hero screenshot (viewport only)
      await page.screenshot({
        path: `public/projects/${project.slug}-hero.png`,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      console.log(`  Hero: public/projects/${project.slug}-hero.png`);

      // Full page screenshot
      await page.screenshot({
        path: `public/projects/${project.slug}.png`,
        fullPage: true,
      });
      console.log(`  Full:  public/projects/${project.slug}.png`);
    } catch (err) {
      console.error(`  Error capturing ${project.slug}:`, err.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Done!');
}

main();
