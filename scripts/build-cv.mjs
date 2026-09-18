import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';
import { mkdir } from 'node:fs/promises';

// NODE_PATH also permits using an already-installed local Playwright runtime.
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'assets/Park_So_Yeong_CV.pdf');
const browser = await chromium.launch({ headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });

try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1300 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
  await page.goto(pathToFileURL(resolve(root, 'cv/index.html')).href);
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(async () => {
    await Promise.all([400, 500, 600, 650, 700, 750].map(weight =>
      document.fonts.load(`${weight} 14px "CV Noto Sans KR"`)));
    await document.fonts.ready;
  });
  const layout = await page.evaluate(() => {
    if (!document.fonts.check('400 14px "CV Noto Sans KR"') ||
        !document.fonts.check('700 14px "CV Noto Sans KR"')) {
      throw new Error('CV font failed to load');
    }
    return [...document.querySelectorAll('.sheet')].map((sheet, index) => {
      const content = sheet.querySelector('.sheet-content').getBoundingClientRect();
      const footer = sheet.querySelector('.page-footer').getBoundingClientRect();
      const bounds = sheet.getBoundingClientRect();
      const horizontalOverflow = [...sheet.querySelectorAll('*')].filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1);
      }).length;
      return { page: index + 1, footerGap: Math.round(footer.top - content.bottom), horizontalOverflow };
    });
  });
  if (errors.length || layout.length !== 2 || layout.some(p => p.footerGap < 12 || p.horizontalOverflow)) {
    throw new Error(`CV layout validation failed: ${JSON.stringify({ errors, layout })}`);
  }
  await page.pdf({ path: output, preferCSSPageSize: true, printBackground: true,
    displayHeaderFooter: false, tagged: true, outline: true });
  await page.emulateMedia({ media: 'screen' });
  await page.setViewportSize({ width: 390, height: 844 });
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (mobileOverflow) throw new Error('CV overflows horizontally on mobile');
  if (process.env.CV_QA_DIR) {
    const qaDir = resolve(process.env.CV_QA_DIR);
    await mkdir(qaDir, { recursive: true });
    await page.screenshot({ path: resolve(qaDir, 'cv-mobile.png'), fullPage: true });
    await page.setViewportSize({ width: 1000, height: 1300 });
    await page.screenshot({ path: resolve(qaDir, 'cv-desktop.png'), fullPage: false });
  }
  console.log(JSON.stringify({ output, layout, mobileOverflow }, null, 2));
} finally {
  await browser.close();
}
