// Lädt die benötigten Schriftschnitte von Google Fonts herunter und legt sie
// samt fonts/fonts.css lokal ab. Danach lädt die Seite nichts mehr von Google —
// sonst ginge die IP jedes Besuchers dorthin (DSGVO).
//
// Aufruf: node fetch-fonts.mjs
//
// Nur die Schnitte aufnehmen, die wirklich verwendet werden. Wer später eine
// neue Gewichtung einsetzt (etwa font-semibold), muss sie hier ergänzen —
// sonst rechnet der Browser sie sich selbst zurecht und es sieht schlecht aus.
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'fonts');

// family -> benötigte Gewichte
const FAMILIES = [
  ['Inter Tight', [700]], // font-display, nur die Überschrift
  ['Inter', [400]], // font-body
  ['JetBrains Mono', [400, 500]], // font-mono, Labels und Werte
];

// Ein aktueller Browser-UA ist nötig, sonst liefert Google ttf statt woff2.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const query = FAMILIES.map(
  ([name, weights]) =>
    `family=${name.replace(/ /g, '+')}:wght@${weights.join(';')}`
).join('&');
const cssUrl = `https://fonts.googleapis.com/css2?${query}&display=swap`;

const css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text();

await mkdir(outDir, { recursive: true });

// Google liefert je Familie mehrere Blöcke mit unterschiedlichen unicode-ranges
// (latin, latin-ext, cyrillic, greek …). Für Deutsch genügt latin – Umlaute und
// ß sind dort enthalten. Der Rest wäre nur Ballast.
// Kommentar und Block zusammen greifen – der Subset-Name steht davor, nicht darin.
const re = /\/\*\s*([a-z-]+)\s*\*\/\s*@font-face\s*\{([^}]+)\}/g;
const kept = [];

for (const [, subset, block] of css.matchAll(re)) {
  if (subset !== 'latin') continue;

  const family = block.match(/font-family:\s*'([^']+)'/)?.[1];
  const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
  const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
  if (!family || !weight || !url) continue;

  const file = `${family.replace(/ /g, '-').toLowerCase()}-${weight}.woff2`;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(path.join(outDir, file), buf);

  kept.push({ family, weight, file, range, size: buf.length });
}

const header = `/* Lokal ausgelieferte Schriften – erzeugt von fetch-fonts.mjs.
   Nicht von Hand bearbeiten. Neue Schnitte dort eintragen und Skript erneut laufen lassen. */\n\n`;

const body = kept
  .map(
    (f) => `@font-face {
  font-family: '${f.family}';
  font-style: normal;
  font-weight: ${f.weight};
  font-display: swap;
  src: url('${f.file}') format('woff2');${f.range ? `\n  unicode-range: ${f.range};` : ''}
}`
  )
  .join('\n\n');

await writeFile(path.join(outDir, 'fonts.css'), header + body + '\n');

const total = kept.reduce((n, f) => n + f.size, 0);
for (const f of kept) {
  console.log(`  ${f.family} ${f.weight}  ${(f.size / 1024).toFixed(1)} KB  ${f.file}`);
}
console.log(`\n${kept.length} Schnitte, zusammen ${(total / 1024).toFixed(1)} KB → fonts/fonts.css`);
