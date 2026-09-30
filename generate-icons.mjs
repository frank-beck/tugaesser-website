// Erzeugt favicon.svg aus der Bildmarke und rendert daraus die PNG-Größen, die
// manche Plattformen zwingend brauchen (iOS-Homescreen kann kein SVG).
// Aufruf: node generate-icons.mjs — Dev-Server muss laufen, Port über PORT.
//
// QUELLE IST `brand_assets/tugaesser-bildmarke-maske.png`: die Bildmarke als
// weiße Fläche mit Alphakanal, freigestellt aus dem Favicon des Design Systems
// (design-system.tugaesser.de/favicon-512.png). Die Farben setzt dieses Skript.
//
// WEISS AUF BLAU, NICHT ROT AUF BLAU (30.09.2026). Gewünscht war Symbol rot auf
// blau oder umgekehrt. Beide Töne sind fast gleich dunkel: #7A1618 gegen
// #013565 hat einen Kontrast von rund 1,15:1. Im Vergleich bei 16 und 32 px war
// die Marke in beiden Richtungen nicht mehr zu erkennen. Weiß ist Farbe des
// Design Systems (`--tg-color-on-primary`), das Blau der Grund.
import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;

const GRUND = '#013565'; // --tg-color-blue
const ZEICHEN = '#FFFFFF'; // --tg-color-white

const maske = readFileSync(path.join(__dirname, 'brand_assets/tugaesser-bildmarke-maske.png')).toString('base64');

// Zeichen auf 78 % der Kantenlänge: kleiner wird es bei 16 px zu Brei, größer
// stößt es an die gerundeten Ecken.
writeFileSync(
  path.join(__dirname, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Tugässer">
  <!-- Erzeugt von generate-icons.mjs. Nicht von Hand bearbeiten. -->
  <defs>
    <mask id="zeichen" mask-type="alpha">
      <image href="data:image/png;base64,${maske}" x="7" y="7" width="50" height="50" />
    </mask>
  </defs>
  <rect width="64" height="64" rx="12" fill="${GRUND}" />
  <rect width="64" height="64" fill="${ZEICHEN}" mask="url(#zeichen)" />
</svg>
`
);
console.log(`  favicon.svg  ${(statSync(path.join(__dirname, 'favicon.svg')).size / 1024).toFixed(1)} KB`);

const SIZES = [
  // Klassischer Tab-Fallback für Browser ohne SVG-Favicon.
  { size: 32, file: 'favicon-32.png', bg: null },
  // iOS legt das Icon ohne Transparenz auf den Homescreen und rundet selbst ab.
  // Die gerundeten Ecken des SVG würden dort schwarz — deshalb auf vollem Blau.
  { size: 180, file: 'apple-touch-icon.png', bg: GRUND },
];

const browser = await puppeteer.launch({ headless: true });

for (const { size, file, bg } of SIZES) {
  const page = await browser.newPage();
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  // Das SVG in eine Seite einbetten statt direkt zu öffnen: ein SVG-Dokument
  // hat keinen <head>, in den sich Styling einhängen ließe.
  await page.setContent(
    `<body style="margin:0;background:${bg ?? 'transparent'}"><img src="http://localhost:${port}/favicon.svg?${Date.now()}"
       style="display:block;width:100vw;height:100vh"></body>`,
    { waitUntil: 'networkidle0' }
  );
  const out = path.join(__dirname, file);
  await page.screenshot({ path: out, omitBackground: !bg });
  console.log(`  ${file}  ${size}x${size}  ${(statSync(out).size / 1024).toFixed(1)} KB`);
  await page.close();
}

await browser.close();
