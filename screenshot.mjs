import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// Find the next screenshot number
const existing = fs.readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'));
let nextNum = 1;
for (const f of existing) {
  const match = f.match(/^screenshot-(\d+)/);
  if (match) nextNum = Math.max(nextNum, parseInt(match[1]) + 1);
}

const suffix = label ? `-${label}` : '';
const filename = `screenshot-${nextNum}${suffix}.png`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
// Viewport überschreibbar, um mobile-first gegenzuprüfen: WIDTH=390 node screenshot.mjs …
const width = Number(process.env.WIDTH) || 1440;
const height = Number(process.env.HEIGHT) || 900;
await page.setViewport({ width, height, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: path.join(screenshotDir, filename), fullPage: true });
await browser.close();

console.log(`Screenshot saved: temporary screenshots/${filename}`);
