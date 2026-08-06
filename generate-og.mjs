// Rendert og-template.html zu images/og-image.jpg (1200x630).
// Aufruf: node generate-og.mjs   (Dev-Server muss laufen)
// Port über PORT anpassbar, falls 3000 belegt ist.
import puppeteer from 'puppeteer';
import { statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;
const url = `http://localhost:${port}/og-template.html`;
const outPath = path.join(__dirname, 'images', 'og-image.jpg');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle0' });

// Ohne das Warten auf die Schriften rendert der Screenshot gelegentlich noch
// mit der Fallback-Schrift – im fertigen JPG fällt das erst später auf.
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

// Qualität 84 statt 90: WhatsApp lädt große Vorschaubilder teils gar nicht
// erst, unter ~300 KB ist man sicher.
await page.screenshot({ path: outPath, type: 'jpeg', quality: 84 });
await browser.close();

const kb = Math.round(statSync(outPath).size / 1024);
console.log(`OG-Bild: images/og-image.jpg (${kb} KB)`);
if (kb > 300) console.warn('⚠️  über 300 KB – Qualität senken.');
