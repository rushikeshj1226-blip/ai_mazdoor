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

// Square app icons
for (const [file, size] of [['icons/icon-192.png', 192], ['icons/icon-512.png', 512], ['icons/apple-touch-icon.png', 180]]) {
  await sharp(svg, { density: 1200 }).resize(size, size).png().toFile(pub(file));
}

// Maskable icon: mark on a full-bleed orange square with safe-zone padding
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#FF5F15"/><g transform="translate(25 25) scale(1.25)"><path d="M20 7c1.2 8.4 4.6 11.8 13 13-8.4 1.2-11.8 4.6-13 13-1.2-8.4-4.6-11.8-13-13 8.4-1.2 11.8-4.6 13-13Z" fill="#141210"/><circle cx="30.5" cy="9.5" r="2.6" fill="#fff"/></g></svg>`;
await sharp(Buffer.from(maskable), { density: 1200 }).resize(512, 512).png().toFile(pub('icons/maskable-512.png'));

// favicon.ico — a single 32px PNG wrapped in an ICO container
const png32 = await sharp(svg, { density: 1200 }).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png32.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
writeFileSync(pub('favicon.ico'), Buffer.concat([header, png32]));

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
