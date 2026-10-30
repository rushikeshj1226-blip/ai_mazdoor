// Generates favicons, app icons and the default Open Graph image.
// Usage: npm run og   (needs Microsoft Edge or Google Chrome installed for the OG screenshot)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (p) => resolve(root, 'public', p);
mkdirSync(pub('icons'), { recursive: true });
mkdirSync(pub('og'), { recursive: true });

const svg = readFileSync(pub('favicon.svg'));

// Square app icons (Google Search needs a favicon that is a multiple of 48px, hence the 96px PNG)
for (const [file, size] of [['favicon-96x96.png', 96], ['icons/icon-192.png', 192], ['icons/icon-512.png', 512], ['icons/apple-touch-icon.png', 180]]) {
  await sharp(svg, { density: 1200 }).resize(size, size).png().toFile(pub(file));
}

// Maskable icon: mark on a full-bleed orange square with safe-zone padding
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#FF5F15"/><g transform="translate(25 25) scale(1.25)"><path d="M20 7c1.2 8.4 4.6 11.8 13 13-8.4 1.2-11.8 4.6-13 13-1.2-8.4-4.6-11.8-13-13 8.4-1.2 11.8-4.6 13-13Z" fill="#141210"/><circle cx="30.5" cy="9.5" r="2.6" fill="#fff"/></g></svg>`;
await sharp(Buffer.from(maskable), { density: 1200 }).resize(512, 512).png().toFile(pub('icons/maskable-512.png'));

// favicon.ico — 16, 32 and 48px PNGs wrapped in one ICO container
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((s) => sharp(svg, { density: 1200 }).resize(s, s).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * icoSizes.length);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(icoSizes.length, 4); // image count
let offset = header.length;
icoSizes.forEach((size, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(size, entry); // width
  header.writeUInt8(size, entry + 1); // height
  header.writeUInt8(0, entry + 2); // palette
  header.writeUInt8(0, entry + 3); // reserved
  header.writeUInt16LE(1, entry + 4); // colour planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(pngs[i].length, entry + 8); // image size
  header.writeUInt32LE(offset, entry + 12); // image offset
  offset += pngs[i].length;
});
writeFileSync(pub('favicon.ico'), Buffer.concat([header, ...pngs]));

// Open Graph image via headless browser so Devanagari shapes correctly
const browsers = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const browser = browsers.find(existsSync);
if (browser) {
  const raw = resolve(root, 'scripts', 'og-raw.png');
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1200,630',
    '--virtual-time-budget=3000',
    `--screenshot=${raw}`,
    pathToFileURL(resolve(root, 'scripts', 'og.html')).href,
  ], { stdio: 'ignore' });
  await sharp(raw).resize(1200, 630, { fit: 'cover', position: 'top' }).png({ compressionLevel: 9 }).toFile(pub('og/default.png'));
  console.log('OG image written to public/og/default.png');
} else {
  console.warn('No Chrome/Edge found — skipped OG image.');
}
console.log('Icons written to public/icons and public/favicon.ico');
