// Renders the "Welcome AI Mazdoor" launch posts (Instagram carousel + WhatsApp) as PNGs.
// Usage: node scripts/social-posts.mjs   (needs Microsoft Edge or Google Chrome installed)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'social', 'launch');
const build = mkdtempSync(join(tmpdir(), 'aim-social-'));
mkdirSync(out, { recursive: true });

const SITE = 'ai-mazdoor-sigma.vercel.app';
const font = (p) => pathToFileURL(resolve(root, 'node_modules/@fontsource-variable', p)).href;

const STAR = 'M20 2c1.6 11.2 6.8 16.4 18 18-11.2 1.6-16.4 6.8-18 18-1.6-11.2-6.8-16.4-18-18 11.2-1.6 16.4-6.8 18-18Z';
const icon = `<svg viewBox="0 0 40 40" class="icon"><rect width="40" height="40" rx="11" fill="#FF5F15"/><path d="M20 7c1.2 8.4 4.6 11.8 13 13-8.4 1.2-11.8 4.6-13 13-1.2-8.4-4.6-11.8-13-13 8.4-1.2 11.8-4.6 13-13Z" fill="#141210"/><circle cx="30.5" cy="9.5" r="2.6" fill="#fff"/></svg>`;
const logo = (dark = false) => `<div class="logo${dark ? ' dark' : ''}">${icon}<div><b>मज़दूर<span>.</span></b><small>AI Mazdoor</small></div></div>`;
const star = (cls = '') => `<svg viewBox="0 0 40 40" class="star ${cls}"><path d="${STAR}"/></svg>`;

const css = (w, h) => `
@font-face { font-family: "Bricolage"; src: url("${font('bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2')}") format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Bricolage"; src: url("${font('bricolage-grotesque/files/bricolage-grotesque-latin-ext-wght-normal.woff2')}") format("woff2"); font-weight: 200 800; unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
@font-face { font-family: "Baloo"; src: url("${font('baloo-2/files/baloo-2-devanagari-wght-normal.woff2')}") format("woff2"); font-weight: 400 800; unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF; }
:root { --o:#ff5f15; --od:#c24100; --ink:#141210; --ink2:#211e1b; --paper:#fffaf5; --muted:#5f5a55; --mdark:#b3aca5; --tint:#fff2e8; --soft:#ffe6d5; --mono: Consolas, "Cascadia Mono", ui-monospace, monospace; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${w}px; height: ${h}px; overflow: hidden; }
body { font-family: "Bricolage", "Baloo", sans-serif; background: var(--paper); color: var(--ink); position: relative; -webkit-font-smoothing: antialiased; }
.page { position: absolute; inset: 0; padding: 80px; display: flex; flex-direction: column; }
.dark { color: #fff; }
.logo { display: flex; align-items: center; gap: 18px; }
.logo .icon { width: 78px; height: 78px; }
.logo b { display: block; font-size: 46px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; }
.logo b span { color: var(--o); }
.logo small { display: block; margin-top: 12px; font: 700 15px/1 var(--mono); letter-spacing: .26em; text-transform: uppercase; color: var(--muted); }
.logo.dark small { color: var(--mdark); }
.top { display: flex; align-items: center; justify-content: space-between; }
.chip { display: inline-flex; align-items: center; gap: 12px; border: 3px solid var(--ink); border-radius: 999px; padding: 13px 24px; background: #fff; font: 700 21px/1 var(--mono); letter-spacing: .14em; text-transform: uppercase; }
.chip .hi { font-family: "Bricolage", "Baloo"; letter-spacing: 0; font-size: 24px; text-transform: none; }
.chip.on-dark { background: transparent; border-color: #ffffff55; color: #fff; }
.dot { width: 14px; height: 14px; border-radius: 50%; background: var(--o); }
.welcome { font-weight: 800; letter-spacing: -0.045em; line-height: .92; }
.name-chip { display: inline-block; background: var(--o); border: 7px solid var(--ink); border-radius: 36px; padding: 0.02em 0.2em 0.24em; transform: rotate(-2.5deg); box-shadow: 14px 14px 0 var(--ink); font-weight: 800; line-height: 1.12; letter-spacing: -0.02em; }
.hi-display { font-weight: 800; line-height: 1.12; letter-spacing: -0.015em; }
.hl { background: linear-gradient(var(--o), var(--o)) 0 86% / 100% 0.36em no-repeat; }
.lead { font-size: 34px; line-height: 1.35; color: var(--muted); font-weight: 500; }
.dark .lead { color: var(--mdark); }
.star { position: absolute; fill: var(--o); }
.svc { display: grid; gap: 22px; }
.svc-card { background: #fff; border: 3px solid var(--ink); border-radius: 30px; padding: 26px 26px 24px; box-shadow: 7px 7px 0 var(--ink); }
.svc-card .n { font: 700 20px/1 var(--mono); color: var(--od); }
.svc-card h3 { margin-top: 14px; font-size: 34px; font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; }
.svc-card p { margin-top: 6px; font-size: 25px; font-weight: 700; color: var(--muted); }
.svc-card.hot { background: var(--ink); color: #fff; box-shadow: 7px 7px 0 var(--o); }
.svc-card.hot .n { color: var(--o); }
.svc-card.hot p { color: var(--mdark); }
.foot { display: flex; align-items: center; justify-content: space-between; font: 700 22px/1 var(--mono); letter-spacing: .08em; color: var(--muted); }
.dark .foot { color: var(--mdark); }
.url { color: var(--ink); font-family: "Bricolage"; font-weight: 800; letter-spacing: -0.01em; font-size: 30px; }
.dark .url { color: #fff; }
.swipe { display: inline-flex; align-items: center; gap: 12px; background: var(--ink); color: #fff; border-radius: 999px; padding: 16px 26px; font: 800 26px/1 "Bricolage"; letter-spacing: -0.01em; }
.ticks { display: grid; gap: 22px; }
.ticks li { list-style: none; display: flex; align-items: center; gap: 20px; font-size: 34px; font-weight: 700; letter-spacing: -0.01em; }
.ticks li i { flex: none; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 12px; background: var(--ink); color: var(--o); font-style: normal; font-size: 26px; font-weight: 900; }
.visual { position: relative; background: var(--tint); border: 3px solid var(--ink); border-radius: 36px; overflow: hidden; }
.btn { display: inline-flex; align-items: center; gap: 16px; background: var(--o); color: var(--ink); border: 4px solid var(--ink); border-radius: 999px; padding: 26px 44px; font-size: 40px; font-weight: 800; letter-spacing: -0.01em; box-shadow: 8px 8px 0 #fff; }
`;

const page = (w, h, body, bg = '') => `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><style>${css(w, h)}</style></head><body${bg ? ` style="background:${bg}"` : ''}>${body}</body></html>`;

const services = [
  { n: '01', en: 'Logo Design', hi: 'लोगो डिज़ाइन' },
  { n: '02', en: 'Website Design', hi: 'वेबसाइट डिज़ाइन' },
  { n: '03', en: 'AI Automation', hi: 'AI ऑटोमेशन' },
];

// ---------- Instagram 1080×1350: welcome ----------
const igWelcome = page(1080, 1350, `
${star().replace('class="star "', 'class="star" style="width:210px;height:210px;right:90px;top:520px"')}
<div class="page">
  <div class="top">${logo()}<span class="chip"><span class="dot"></span>Now live · <span class="hi">अब लाइव</span></span></div>
  <div style="margin-top:118px">
    <div class="welcome" style="font-size:204px">Welcome</div>
    <div style="margin-top:42px"><span class="name-chip" style="font-size:150px">AI मज़दूर</span></div>
  </div>
  <p class="hi-display" style="margin-top:66px;font-size:66px">काम हम करेंगे, <span class="hl">नाम आपका।</span></p>
  <p class="lead" style="margin-top:14px;max-width:860px">Logo design, website design &amp; AI automation for Indian businesses.</p>
  <div class="svc" style="margin-top:auto;grid-template-columns:repeat(3,1fr)">
    ${services.map((s, i) => `<div class="svc-card${i === 2 ? ' hot' : ''}"><span class="n">${s.n}</span><h3>${s.en.replace(' ', '<br>')}</h3><p>${s.hi}</p></div>`).join('')}
  </div>
  <div class="foot" style="margin-top:44px"><span class="url">${SITE}</span><span>MADE IN INDIA</span></div>
</div>`);

// ---------- Instagram 1080×1350: service slides ----------
const visuals = {
  logo: `
    <svg viewBox="0 0 400 260" style="position:absolute;inset:0;width:100%;height:100%">
      <g stroke="#14121022" stroke-width="2" fill="none"><line x1="200" y1="10" x2="200" y2="250"/><line x1="60" y1="130" x2="340" y2="130"/><circle cx="200" cy="130" r="112"/></g>
      <circle cx="200" cy="130" r="84" fill="#fff" stroke="#141210" stroke-width="7"/>
      <path d="M200 66c5 40 22 57 64 64-42 7-59 24-64 64-5-40-22-57-64-64 42-7 59-24 64-64Z" fill="none" stroke="#FF5F15" stroke-width="8" stroke-linejoin="round"/>
    </svg>
    <span class="chip" style="position:absolute;left:28px;top:28px;font-size:22px;letter-spacing:0;text-transform:none;font-family:Bricolage,Baloo;font-weight:800">Aa · अ</span>
    <span style="position:absolute;right:30px;bottom:30px;display:flex;gap:10px">
      ${['#FF5F15', '#141210', '#FFE6D5', '#FFFFFF'].map((c) => `<i style="width:46px;height:46px;border-radius:50%;border:4px solid #141210;background:${c}"></i>`).join('')}
    </span>`,
  web: `
    <div style="position:absolute;left:40px;right:40px;top:34px;bottom:-6px;background:#fff;border:3px solid #141210;border-radius:26px 26px 0 0;overflow:hidden">
      <div style="display:flex;align-items:center;gap:10px;padding:16px 20px;border-bottom:3px solid #141210">
        <i style="width:16px;height:16px;border-radius:50%;background:#FF5F15"></i><i style="width:16px;height:16px;border-radius:50%;background:#14121033"></i><i style="width:16px;height:16px;border-radius:50%;background:#14121033"></i>
        <span style="margin-left:12px;flex:1;background:#fff2e8;border-radius:99px;padding:6px 16px;font:600 18px var(--mono);color:#5f5a55">yourbusiness.in</span>
      </div>
      <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:24px;padding:26px">
        <div><i style="display:block;height:24px;width:85%;border-radius:8px;background:#ffe6d5"></i><i style="display:block;margin-top:14px;height:24px;width:62%;border-radius:8px;background:#ffe6d5"></i><i style="display:block;margin-top:22px;height:14px;width:95%;border-radius:6px;background:#f1e8df"></i><i style="display:block;margin-top:10px;height:14px;width:80%;border-radius:6px;background:#f1e8df"></i><i style="display:inline-block;margin-top:24px;height:42px;width:170px;border-radius:99px;border:3px solid #141210;background:#FF5F15"></i></div>
        <div style="border-radius:20px;background:#fff2e8"></div>
      </div>
    </div>
    <div style="position:absolute;right:26px;bottom:24px;width:132px;height:132px;border-radius:50%;background:#fff;border:4px solid #141210;box-shadow:6px 6px 0 #141210;display:grid;place-items:center;text-align:center">
      <svg viewBox="0 0 60 60" style="position:absolute;inset:10px;transform:rotate(-90deg)"><circle cx="30" cy="30" r="26" fill="none" stroke="#14121014" stroke-width="5"/><circle cx="30" cy="30" r="26" fill="none" stroke="#0f9d58" stroke-width="5" stroke-linecap="round" stroke-dasharray="163" stroke-dashoffset="4"/></svg>
      <span style="line-height:1"><b style="display:block;font-size:40px;font-weight:800">98</b><small style="font:700 13px var(--mono);letter-spacing:.1em">SPEED</small></span>
    </div>`,
  ai: `
    <div style="position:absolute;inset:30px 34px;display:flex;flex-direction:column;gap:18px;font-size:27px;line-height:1.35">
      <div style="align-self:flex-start;max-width:78%;background:#fff;border:3px solid #141210;border-radius:24px 24px 24px 8px;padding:16px 22px">नमस्ते! कल 5 बजे appointment मिलेगा?</div>
      <div style="align-self:flex-end;max-width:82%;background:#FF5F15;border:3px solid #141210;border-radius:24px 24px 8px 24px;padding:16px 22px;font-weight:600">जी हाँ! कल 5:00 PM booked ✓ एक घंटा पहले reminder भेज दूँगा।</div>
      <div style="align-self:flex-start;display:inline-flex;align-items:center;gap:12px;background:#fff;border:3px solid #141210;border-radius:18px;padding:10px 18px 10px 10px;font-size:22px;font-weight:800;box-shadow:4px 4px 0 #141210"><i style="display:grid;place-items:center;width:36px;height:36px;border-radius:10px;background:#0f9d58;color:#fff;font-style:normal">✓</i>Lead saved → Google Sheet</div>
    </div>`,
};

const serviceSlides = [
  { file: 'instagram-2-logo-design', i: 0, hi: 'पहचान ऐसी, <span class="hl">जो याद रहे।</span>', en: 'Logos &amp; brand identities that people remember.', v: visuals.logo, ticks: ['Original, hand-crafted concepts', 'Bilingual Hindi + English logos', 'All source files — copyright yours'] },
  { file: 'instagram-3-website-design', i: 1, hi: 'वेबसाइट जो <span class="hl">बिज़नेस लाए।</span>', en: 'Fast, SEO-ready websites built to sell.', v: visuals.web, ticks: ['Custom, mobile-first design', 'Ready for Google from day one', 'WhatsApp &amp; call buttons built in'] },
  { file: 'instagram-4-ai-automation', i: 2, hi: 'मेहनत का काम, <span class="hl">AI के नाम।</span>', en: 'WhatsApp &amp; AI bots that work 24×7.', v: visuals.ai, ticks: ['Replies in Hindi, English &amp; Hinglish', 'Every lead saved to Sheet / CRM', 'Auto follow-ups &amp; daily reports'] },
];

const serviceSlide = (s) => page(1080, 1350, `
<div class="page">
  <div class="top">${logo()}<span class="chip">${services[s.i].n} · ${services[s.i].en}</span></div>
  <p class="hi-display" style="margin-top:76px;font-size:82px;white-space:nowrap">${s.hi}</p>
  <p class="lead" style="margin-top:14px;color:var(--ink);font-weight:800;font-size:40px;letter-spacing:-0.015em">${s.en}</p>
  <div class="visual" style="margin-top:48px;height:430px">${s.v}</div>
  <ul class="ticks" style="margin-top:46px">${s.ticks.map((t) => `<li><i>✓</i>${t}</li>`).join('')}</ul>
  <div class="foot" style="margin-top:auto"><span class="url">${SITE}</span><span class="swipe">Swipe →</span></div>
</div>`);

// ---------- Instagram 1080×1350: call to action ----------
const igCta = page(1080, 1350, `
${star().replace('class="star "', 'class="star" style="width:520px;height:520px;right:-150px;bottom:-150px;opacity:.18"')}
<div class="page dark">
  <div class="top">${logo(true)}<span class="chip on-dark"><span class="dot"></span>Free consultation</span></div>
  <p class="hi-display" style="margin-top:120px;font-size:132px">आइए, <span class="hl">बात</span><br>करते हैं।</p>
  <p class="lead" style="margin-top:28px;font-size:40px;color:#fff;font-weight:700">Free 20-minute call — in Hindi or English.</p>
  <ul class="ticks" style="margin-top:50px">${['Fixed, written quote', 'You own everything', 'Real humans on WhatsApp'].map((t) => `<li style="color:#fff"><i style="background:var(--o);color:var(--ink)">✓</i>${t}</li>`).join('')}</ul>
  <div style="margin-top:auto"><span class="btn">DM us “HI” →</span></div>
  <div class="foot" style="margin-top:48px"><span class="url">${SITE}</span><span>LINK IN BIO</span></div>
</div>`, '#141210');

// ---------- WhatsApp status 1080×1920 (content kept inside the safe zone) ----------
const waStatus = page(1080, 1920, `
${star().replace('class="star "', 'class="star" style="width:210px;height:210px;right:90px;top:690px"')}
<div class="page" style="padding:220px 80px 240px">
  <div class="top">${logo()}<span class="chip"><span class="dot"></span>Now live</span></div>
  <div style="margin-top:96px">
    <div class="welcome" style="font-size:200px">Welcome</div>
    <div style="margin-top:40px"><span class="name-chip" style="font-size:146px">AI मज़दूर</span></div>
  </div>
  <p class="hi-display" style="margin-top:60px;font-size:68px">काम हम करेंगे, <span class="hl">नाम आपका।</span></p>
  <div class="svc" style="margin-top:52px;gap:18px">
    ${[
      ['Logo Design', 'लोगो डिज़ाइन', 'पहचान जो याद रहे'],
      ['Website Design', 'वेबसाइट डिज़ाइन', 'Fast & Google-ready'],
      ['AI Automation', 'AI ऑटोमेशन', 'WhatsApp bots, 24×7'],
    ].map(([en, hi, d], i) => `<div class="svc-card${i === 2 ? ' hot' : ''}" style="display:flex;align-items:center;justify-content:space-between;padding:22px 32px"><div><span class="n">0${i + 1}</span><h3 style="margin-top:8px;font-size:44px">${en}</h3></div><p style="margin:0;text-align:right;font-size:28px">${hi}<br><span style="font-size:24px;font-weight:600">${d}</span></p></div>`).join('')}
  </div>
  <div style="margin-top:auto;display:flex;align-items:center;justify-content:space-between;background:var(--o);color:var(--ink);border:3px solid var(--ink);border-radius:28px;padding:26px 34px">
    <span style="font-size:30px;font-weight:700">Free consultation</span><span style="font-size:34px;font-weight:800">${SITE}</span>
  </div>
</div>`);

// ---------- WhatsApp share 1080×1080 ----------
const waSquare = page(1080, 1080, `
${star().replace('class="star "', 'class="star" style="width:180px;height:180px;right:90px;top:440px"')}
<div class="page">
  <div class="top">${logo()}<span class="chip"><span class="dot"></span>Now live</span></div>
  <div style="margin-top:84px">
    <div class="welcome" style="font-size:176px">Welcome</div>
    <div style="margin-top:34px"><span class="name-chip" style="font-size:128px">AI मज़दूर</span></div>
  </div>
  <p class="hi-display" style="margin-top:52px;font-size:58px">काम हम करेंगे, <span class="hl">नाम आपका।</span></p>
  <div style="margin-top:auto;display:flex;gap:16px">
    ${services.map((s, i) => `<span style="flex:1;text-align:center;border:3px solid var(--ink);border-radius:999px;padding:18px 0;font-size:28px;font-weight:800;background:${i === 2 ? 'var(--ink)' : '#fff'};color:${i === 2 ? '#fff' : 'var(--ink)'};box-shadow:5px 5px 0 ${i === 2 ? 'var(--o)' : 'var(--ink)'}">${s.en}</span>`).join('')}
  </div>
  <div class="foot" style="margin-top:36px"><span class="url">${SITE}</span><span>MADE IN INDIA</span></div>
</div>`);

const posts = [
  ['instagram-1-welcome', 1080, 1350, igWelcome],
  ...serviceSlides.map((s) => [s.file, 1080, 1350, serviceSlide(s)]),
  ['instagram-5-lets-talk', 1080, 1350, igCta],
  ['whatsapp-status', 1080, 1920, waStatus],
  ['whatsapp-square', 1080, 1080, waSquare],
];

const browser = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find(existsSync);
if (!browser) throw new Error('Install Microsoft Edge or Google Chrome to render the posts.');

for (const [name, w, h, html] of posts) {
  const src = join(build, `${name}.html`);
  const png = join(out, `${name}.png`);
  writeFileSync(src, html);
  rmSync(png, { force: true });
  // Headless screenshots occasionally come back empty — retry a couple of times
  for (let attempt = 1; attempt <= 3 && !existsSync(png); attempt++) {
    execFileSync(browser, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      `--user-data-dir=${join(build, `profile-${name}-${attempt}`)}`,
      '--force-device-scale-factor=1', `--window-size=${w},${h}`, '--virtual-time-budget=4000',
      `--screenshot=${png}`, pathToFileURL(src).href,
    ], { stdio: 'ignore' });
  }
  if (!existsSync(png)) throw new Error(`Failed to render ${name}.png`);
  console.log(`${name}.png  ${w}×${h}`);
}
console.log(`\nSaved to ${out}`);
