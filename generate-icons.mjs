// Rendert favicon.svg in die PNG-Größen, die manche Plattformen zwingend
// brauchen (iOS-Homescreen kann kein SVG). Aufruf: node generate-icons.mjs
// Dev-Server muss laufen; Port über PORT anpassbar.
import puppeteer from 'puppeteer';
import { statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;

const SIZES = [
  // Klassischer Tab-Fallback für Browser ohne SVG-Favicon.
  { size: 32, file: 'favicon-32.png', bg: null },
  // iOS legt das Icon ohne Transparenz auf den Homescreen – der Deckel füllt
  // die Fläche ohnehin, deshalb reicht er als eigener Hintergrund.
  { size: 180, file: 'apple-touch-icon.png', bg: null },
];

const browser = await puppeteer.launch({ headless: true });

for (const { size, file } of SIZES) {
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  // Das SVG in eine Seite einbetten statt direkt zu öffnen: ein SVG-Dokument
  // hat keinen <head>, in den sich Styling einhängen ließe.
  await page.setContent(
    `<body style="margin:0"><img src="http://localhost:${port}/favicon.svg"
       style="display:block;width:100vw;height:100vh"></body>`,
    { waitUntil: 'networkidle0' }
  );
  const out = path.join(__dirname, file);
  await page.screenshot({ path: out, omitBackground: true });
  console.log(`  ${file}  ${size}x${size}  ${(statSync(out).size / 1024).toFixed(1)} KB`);
  await page.close();
}

await browser.close();
