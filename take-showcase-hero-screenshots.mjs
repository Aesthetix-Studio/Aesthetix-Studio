import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const showcasePages = [
  { slug: 'minimal', name: 'Mono Studio' },
  { slug: 'editorial', name: 'The Chronicle' },
  { slug: 'premium-saas', name: 'ClimateBridge' },
  { slug: 'creative-studio', name: 'Saffron Kitchen' },
  { slug: 'enterprise', name: 'Meridian Systems' },
  { slug: 'luxury', name: 'Maison Aurélien' },
  { slug: 'startup', name: 'Launchpad' },
  { slug: 'modern-tech', name: 'Resonance Records' },
  { slug: 'brutalist', name: 'Pulse Fitness' },
  { slug: 'high-end-portfolio', name: 'Atelier Studio' },
];

const BASE_URL = 'http://localhost:5173';

async function main() {
  await mkdir('public/screenshots', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  for (const page of showcasePages) {
    console.log(`Capturing ${page.name} (${page.slug})...`);
    const tab = await context.newPage();

    try {
      await tab.goto(`${BASE_URL}/showcase/${page.slug}`, { waitUntil: 'networkidle', timeout: 30000 });
      await tab.waitForTimeout(2000);

      // Hero screenshot (viewport only - above the fold)
      await tab.screenshot({
        path: `public/screenshots/${page.slug}-hero.png`,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      console.log(`  Hero saved: public/screenshots/${page.slug}-hero.png`);
    } catch (err) {
      console.error(`  Error capturing ${page.slug}:`, err.message);
    } finally {
      await tab.close();
    }
  }

  await browser.close();
  console.log('\nAll showcase hero screenshots captured!');
}

main();
