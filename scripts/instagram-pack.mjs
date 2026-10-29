// Instagram growth pack: profile images, story-highlight covers and a 10-post launch grid.
// Content comes from the website's data files. No website link is printed on any image.
// Usage: node scripts/instagram-pack.mjs   (needs Google Chrome or Microsoft Edge)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { services } from '../src/data/services.ts';
import { site } from '../src/data/site.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'social', 'instagram');
for (const d of ['posts', 'profile', 'highlights']) mkdirSync(join(out, d), { recursive: true });
const build = mkdtempSync(join(tmpdir(), 'aim-insta-'));

const W = 1080;
const H = 1350;
const STAR = 'M20 2c1.6 11.2 6.8 16.4 18 18-11.2 1.6-16.4 6.8-18 18-1.6-11.2-6.8-16.4-18-18 11.2-1.6 16.4-6.8 18-18Z';
const MARK = `<rect width="40" height="40" rx="11" fill="#FF5F15"/><path d="M20 7c1.2 8.4 4.6 11.8 13 13-8.4 1.2-11.8 4.6-13 13-1.2-8.4-4.6-11.8-13-13 8.4-1.2 11.8-4.6 13-13Z" fill="#141210"/><circle cx="30.5" cy="9.5" r="2.6" fill="#fff"/>`;

// ---------------- Profile pictures (Instagram crops to a circle) ----------------
const profiles = {
  'profile-orange.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#FF5F15"/><g transform="translate(20 20) scale(1.5)"><path d="M20 7c1.2 8.4 4.6 11.8 13 13-8.4 1.2-11.8 4.6-13 13-1.2-8.4-4.6-11.8-13-13 8.4-1.2 11.8-4.6 13-13Z" fill="#141210"/><circle cx="30.5" cy="9.5" r="2.6" fill="#fff"/></g></svg>`,
  'profile-dark.png': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#141210"/><g transform="translate(22 22) scale(1.4)">${MARK}</g></svg>`,
};
for (const [file, svg] of Object.entries(profiles)) {
  await sharp(Buffer.from(svg), { density: 1200 }).resize(1080, 1080).png().toFile(join(out, 'profile', file));
}

// ---------------- Story highlight covers ----------------
const ink = 'fill="none" stroke="#141210" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"';
const highlightIcons = {
  services: `<path d="M50 14c3 22 14 33 36 36-22 3-33 14-36 36-3-22-14-33-36-36 22-3 33-14 36-36Z" fill="#141210"/>`,
  logo: `<g ${ink}><path d="M50 14 74 40 58 82H42L26 40Z"/><path d="M50 14v34"/><circle cx="50" cy="54" r="6"/></g>`,
  websites: `<g ${ink}><rect x="14" y="22" width="72" height="56" rx="8"/><path d="M14 38h72"/></g><circle cx="25" cy="30" r="3.5" fill="#141210"/><circle cx="36" cy="30" r="3.5" fill="#141210"/>`,
  'ai-bots': `<g ${ink}><path d="M18 26h64v40H44L28 80V66H18Z"/></g><circle cx="36" cy="46" r="5" fill="#141210"/><circle cx="50" cy="46" r="5" fill="#141210"/><circle cx="64" cy="46" r="5" fill="#141210"/>`,
  process: `<g ${ink}><path d="M16 78h20V58h18V38h18V20h12"/></g>`,
  founders: `<g ${ink}><circle cx="34" cy="38" r="10"/><circle cx="66" cy="38" r="10"/><path d="M16 78c2-14 10-22 18-22s16 8 18 22M48 78c2-14 10-22 18-22s16 8 18 22"/></g>`,
  contact: `<g ${ink}><path d="M28 16h14l6 18-9 6a40 40 0 0 0 21 21l6-9 18 6v14a8 8 0 0 1-8 8C42 80 20 58 20 24a8 8 0 0 1 8-8Z"/></g>`,
};
for (const [name, icon] of Object.entries(highlightIcons)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920"><rect width="1080" height="1920" fill="#FFFAF5"/><circle cx="540" cy="960" r="400" fill="#FF5F15"/><g transform="translate(300 720) scale(4.8)">${icon}</g></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(join(out, 'highlights', `highlight-${name}.png`));
}

// ---------------- Post templates ----------------
const font = (p) => pathToFileURL(resolve(root, 'node_modules/@fontsource-variable', p)).href;
const css = `
@font-face { font-family: "Bricolage"; src: url("${font('bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2')}") format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Baloo"; src: url("${font('baloo-2/files/baloo-2-devanagari-wght-normal.woff2')}") format("woff2"); font-weight: 400 800; unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF; }
:root { --o:#ff5f15; --od:#c24100; --ink:#141210; --ink2:#211e1b; --paper:#fffaf5; --muted:#5f5a55; --mdark:#b3aca5; --tint:#fff2e8; --mono: Consolas, "Cascadia Mono", ui-monospace, monospace; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
body { font-family: "Bricolage", "Baloo", sans-serif; color: var(--ink); -webkit-font-smoothing: antialiased; position: relative; }
.bg-paper { background: var(--paper); }
.bg-ink { background: var(--ink); color: #fff; }
.bg-orange { background: var(--o); }
.page { position: absolute; inset: 0; padding: 76px 80px 70px; display: flex; flex-direction: column; }
.top { display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 16px; }
.logo svg { width: 70px; height: 70px; }
.logo b { display: block; font-size: 42px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; }
.logo b span { color: var(--o); }
.bg-orange .logo b span { color: #fff; }
.logo small { display: block; margin-top: 10px; font: 700 14px/1 var(--mono); letter-spacing: .26em; text-transform: uppercase; opacity: .7; }
.chip { display: inline-flex; align-items: center; gap: 10px; border: 3px solid currentColor; border-radius: 999px; padding: 12px 22px; font: 700 19px/1 var(--mono); letter-spacing: .14em; text-transform: uppercase; }
.chip .hi { font-family: "Bricolage", "Baloo"; letter-spacing: 0; text-transform: none; font-size: 22px; }
.kicker { margin-top: 70px; font: 700 22px/1 var(--mono); letter-spacing: .16em; text-transform: uppercase; opacity: .75; display: flex; align-items: center; gap: 16px; }
.kicker i { display: inline-block; width: 46px; height: 3px; background: currentColor; }
.hi-d { font-weight: 800; line-height: 1.12; letter-spacing: -0.015em; }
.hl { background: linear-gradient(var(--o), var(--o)) 0 86% / 100% 0.34em no-repeat; }
.bg-orange .hl { background-image: linear-gradient(#fff, #fff); }
.en { font-weight: 800; letter-spacing: -0.02em; line-height: 1.12; }
.lead { font-size: 32px; line-height: 1.4; font-weight: 500; opacity: .8; }
.foot { margin-top: auto; display: flex; align-items: center; justify-content: space-between; font: 700 20px/1 var(--mono); letter-spacing: .1em; text-transform: uppercase; opacity: .85; }
.pill { display: inline-flex; align-items: center; gap: 12px; border-radius: 999px; padding: 16px 26px; font: 800 26px/1 "Bricolage"; letter-spacing: -0.01em; text-transform: none; }
.bg-paper .pill, .bg-orange .pill { background: var(--ink); color: #fff; }
.bg-ink .pill { background: var(--o); color: var(--ink); }
.card { border: 3px solid var(--ink); border-radius: 30px; background: #fff; color: var(--ink); box-shadow: 8px 8px 0 var(--ink); }
.bg-ink .card { box-shadow: 8px 8px 0 var(--o); }
.card.dark { background: var(--ink); color: #fff; box-shadow: 8px 8px 0 var(--o); }
.items { display: grid; gap: 22px; }
.item { display: grid; grid-template-columns: 112px 1fr; gap: 28px; align-items: center; padding: 34px 34px; }
.item .n { display: grid; place-items: center; width: 112px; height: 112px; border-radius: 28px; background: var(--o); border: 3px solid var(--ink); font-size: 54px; font-weight: 800; color: var(--ink); }
.item h3 { font-size: 46px; font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
.items.compact .item { grid-template-columns: 84px 1fr; gap: 22px; padding: 22px 26px; }
.items.compact .n { width: 84px; height: 84px; border-radius: 22px; font-size: 40px; }
.items.compact h3 { font-size: 38px; }
.items.compact p { font-size: 27px; }
.item p { margin-top: 10px; font-size: 31px; line-height: 1.38; color: var(--muted); }
.card.dark .item p { color: var(--mdark); }
.name-chip { display: inline-block; background: var(--o); border: 7px solid var(--ink); border-radius: 36px; padding: 0.02em 0.2em 0.24em; transform: rotate(-2.5deg); box-shadow: 14px 14px 0 var(--ink); font-weight: 800; line-height: 1.12; letter-spacing: -0.02em; }
.star { position: absolute; fill: var(--o); }
.bg-orange .star { fill: var(--ink); opacity: .12; }
.big-num { font-size: 210px; font-weight: 800; letter-spacing: -0.05em; line-height: .9; }
`;

const logo = `<div class="logo"><svg viewBox="0 0 40 40">${MARK}</svg><div><b>मज़दूर<span>.</span></b><small>AI Mazdoor</small></div></div>`;
const top = (label) => `<div class="top">${logo}<span class="chip">${label}</span></div>`;
const foot = (right) => `<div class="foot"><span>Logo · Website · AI Automation</span>${right}</div>`;
const swipe = (i, n) => `<span class="pill">${i}/${n} · Swipe →</span>`;
const dm = `<span class="pill">DM “HI” →</span>`;
const star = (style) => `<svg viewBox="0 0 40 40" class="star" style="${style}"><path d="${STAR}"/></svg>`;
const doc = (bg, body) => `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><style>${css}</style></head><body class="bg-${bg}">${body}</body></html>`;

// Carousel cover
const cover = ({ bg, label, kicker, hi, en, lead, i, n }) => doc(bg, `
${star('width:190px;height:190px;right:84px;bottom:190px')}
<div class="page">
  ${top(label)}
  <p class="kicker"><i></i>${kicker}</p>
  <p class="hi-d" style="margin-top:34px;font-size:112px;max-width:820px">${hi}</p>
  <p class="en" style="margin-top:28px;font-size:52px;max-width:860px">${en}</p>
  ${lead ? `<p class="lead" style="margin-top:24px;max-width:840px">${lead}</p>` : ''}
  ${foot(n ? swipe(i, n) : dm)}
</div>`);

// Numbered tips slide
const tips = ({ bg, label, title, list, start, i, n }) => doc(bg, `
<div class="page">
  ${top(label)}
  <p class="en" style="margin-top:64px;font-size:50px">${title}</p>
  <div class="items" style="margin:auto 0;gap:30px">
    ${list.map(([h, p], k) => `<div class="card item"><span class="n">${start + k}</span><div><h3>${h}</h3><p>${p}</p></div></div>`).join('')}
  </div>
  ${foot(swipe(i, n))}
</div>`);

// Closing call-to-action slide
const ctaSlide = ({ i, n, line }) => doc('ink', `
${star('width:520px;height:520px;right:-170px;bottom:-170px;opacity:.16')}
<div class="page">
  ${top('<span class="hi">आइए, बात करें</span>')}
  <p class="hi-d" style="margin-top:120px;font-size:140px"><span class="hl">आइए,</span><br>बात करते हैं।</p>
  <p class="en" style="margin-top:30px;font-size:46px">${line}</p>
  <p class="lead" style="margin-top:22px;color:var(--mdark)">Free 20-minute consultation — Hindi or English.<br>WhatsApp: ${site.phone}</p>
  ${foot(n ? `<span class="pill">${i}/${n} · DM “HI”</span>` : dm)}
</div>`);

const posts = [];
const add = (file, html) => posts.push({ file, html });
const svc = (slug) => services.find((s) => s.slug === slug);

// 01 · Welcome
add('01-welcome', doc('paper', `
${star('width:210px;height:210px;right:90px;top:520px')}
<div class="page">
  <div class="top">${logo}<span class="chip">Now live · <span class="hi">अब लाइव</span></span></div>
  <div style="margin-top:110px">
    <div class="en" style="font-size:204px;letter-spacing:-0.045em;line-height:.92">Welcome</div>
    <div style="margin-top:42px"><span class="name-chip" style="font-size:150px">AI मज़दूर</span></div>
  </div>
  <p class="hi-d" style="margin-top:70px;font-size:66px">काम हम करेंगे, <span class="hl">नाम आपका।</span></p>
  <div style="margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
    ${services.map((s, k) => `<div class="card${k === 2 ? ' dark' : ''}" style="padding:24px 24px 22px"><span style="font:700 20px var(--mono);color:${k === 2 ? 'var(--o)' : 'var(--od)'}">0${k + 1}</span><p style="margin-top:12px;font-size:34px;font-weight:800;line-height:1.05">${s.name.replace(' ', '<br>')}</p><p style="margin-top:6px;font-size:25px;font-weight:700;opacity:.7">${s.nameHi}</p></div>`).join('')}
  </div>
  <div class="foot" style="margin-top:40px"><span>Made in India</span>${dm}</div>
</div>`));

// 02 · Problem vs solution
const problems = [
  ['Logo 10 minute mein bana — har jagah alag dikhta hai.', 'A logo & brand kit that looks premium everywhere.'],
  ['Website mobile pe slow, Google pe dikhti nahi.', 'A fast website built to rank on Google.'],
  ['WhatsApp pe 200 enquiries, jawab dene wala sirf ek.', 'An AI assistant that replies in seconds, 24×7.'],
  ['Leads diary mein, follow-up bhagwan bharose.', 'Every lead saved & followed up automatically.'],
];
add('02-problem-vs-solution', doc('ink', `
<div class="page">
  ${top('Real talk')}
  <p class="hi-d" style="margin-top:60px;font-size:84px"><span class="hl">आज का हाल</span> vs AI मज़दूर</p>
  <div style="margin-top:44px;display:grid;gap:18px">
    ${problems.map(([bad, good]) => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div style="border:2px solid #ffffff33;border-radius:24px;padding:26px 26px;font-size:30px;line-height:1.35;color:var(--mdark)"><b style="color:#fff;font-size:28px">✕</b> ${bad}</div>
      <div style="background:var(--o);color:var(--ink);border-radius:24px;padding:26px 26px;font-size:30px;line-height:1.35;font-weight:700"><b style="font-size:28px">✓</b> ${good}</div>
    </div>`).join('')}
  </div>
  ${foot(dm)}
</div>`));

// 03 · Carousel: 6 logo rules
const logoRules = [
  ['Simple beats clever', 'One strong idea you can sketch from memory.'],
  ['Works tiny & huge', 'From a 40px DP to a 10-foot hoarding.'],
  ['Black & white first', 'A strong shape works in a single colour.'],
  ['Colours with meaning', 'Orange = energy, blue = trust, green = fresh.'],
  ['Bilingual if needed', 'Hindi + English lettering that feels like one family.'],
  ['100% original', 'No copied icons — original logos can be trademarked.'],
];
add('03-logo-rules-1', cover({ bg: 'orange', label: 'Logo tips', kicker: 'Save this post', hi: 'अच्छा लोगो कैसे बनता है?', en: '6 rules every designer follows', lead: 'Planning a new logo? Check these before you hire anyone.', i: 1, n: 5 }));
add('03-logo-rules-2', tips({ bg: 'paper', label: 'Logo tips', title: 'Rules 1–2', list: logoRules.slice(0, 2), start: 1, i: 2, n: 5 }));
add('03-logo-rules-3', tips({ bg: 'paper', label: 'Logo tips', title: 'Rules 3–4', list: logoRules.slice(2, 4), start: 3, i: 3, n: 5 }));
add('03-logo-rules-4', tips({ bg: 'paper', label: 'Logo tips', title: 'Rules 5–6', list: logoRules.slice(4, 6), start: 5, i: 4, n: 5 }));
add('03-logo-rules-5', ctaSlide({ i: 5, n: 5, line: 'Want a logo people remember?' }));

// 04 · Website Design service
const webSvc = svc('website-design');
add('04-website-design', doc('paper', `
<div class="page">
  ${top(webSvc.name)}
  <p class="hi-d" style="margin-top:60px;font-size:84px;white-space:nowrap"><span class="hl">${webSvc.displayHi}</span></p>
  <p class="en" style="margin-top:18px;font-size:46px">${webSvc.h1}</p>
  <div style="margin-top:44px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
    ${webSvc.deliverables.map((d, k) => `<div class="card${k === 2 ? ' dark' : ''}" style="padding:24px 26px"><span style="font:700 20px var(--mono);color:${k === 2 ? 'var(--o)' : 'var(--od)'}">0${k + 1}</span><p style="margin-top:10px;font-size:32px;font-weight:800;line-height:1.1">${d.title}</p><p style="margin-top:8px;font-size:23px;line-height:1.35;opacity:.75">${d.text}</p></div>`).join('')}
  </div>
  ${foot(dm)}
</div>`));

// 05 · Carousel: 7 tasks AI can automate
const aiTasks = [
  ['Same WhatsApp questions', '“Rate kya hai?” answered in seconds — even at midnight.'],
  ['Saving every lead', 'Name, number & need go straight to a Google Sheet or CRM.'],
  ['Follow-ups that never forget', 'Quotes, reminders and payment links — on time.'],
  ['Bookings & reminders', 'Slots, confirmations and reminders — fewer no-shows.'],
  ['Order updates & COD', '“Mera order kahan hai?” answered automatically.'],
  ['Invoices & quotations', 'Branded PDFs made and shared — no copy-paste.'],
  ['Daily WhatsApp report', 'Leads, bookings and pending follow-ups every morning.'],
];
add('05-ai-tasks-1', cover({ bg: 'ink', label: 'AI automation', kicker: 'Save this post', hi: 'रोज़ के 7 काम, जो AI संभाल सकता है।', en: 'Automate these this month — no staff replaced.', i: 1, n: 5 }));
add('05-ai-tasks-2', tips({ bg: 'paper', label: 'AI automation', title: 'Tasks 1–3', list: aiTasks.slice(0, 3), start: 1, i: 2, n: 5 }));
add('05-ai-tasks-3', tips({ bg: 'paper', label: 'AI automation', title: 'Tasks 4–5', list: aiTasks.slice(3, 5), start: 4, i: 3, n: 5 }));
add('05-ai-tasks-4', tips({ bg: 'paper', label: 'AI automation', title: 'Tasks 6–7', list: aiTasks.slice(5, 7), start: 6, i: 4, n: 5 }));
add('05-ai-tasks-5', ctaSlide({ i: 5, n: 5, line: 'Which task should your AI take first?' }));

// 06 · Process
const steps = [
  ['बात', 'Free call', '20 minutes to understand your business — Hindi or English.'],
  ['प्लान', 'Fixed quote', 'Written scope, price and timeline within 24 hours.'],
  ['काम', 'Design & build', 'Regular WhatsApp updates; you review every stage.'],
  ['लॉन्च', 'Launch & support', 'We go live, hand over everything, 30 days support.'],
];
add('06-process', doc('orange', `
${star('width:420px;height:420px;right:-150px;bottom:-150px')}
<div class="page">
  ${top('How it works')}
  <p class="hi-d" style="margin-top:60px;font-size:96px">बात से लॉन्च तक,<br><span class="hl">बस 4 कदम।</span></p>
  <div class="items compact" style="margin-top:40px;gap:18px">
    ${steps.map(([hi, t, d], k) => `<div class="card item" style="padding:22px 26px"><span class="n" style="background:var(--ink);color:var(--o)">${k + 1}</span><div><h3>${hi} · ${t}</h3><p>${d}</p></div></div>`).join('')}
  </div>
  ${foot(dm)}
</div>`));

// 07 · Carousel: website checklist
const checklist = [
  ['What should it DO?', 'Calls, bookings, sales or trust — pick one main goal.'],
  ['Which pages?', 'Home, Services, About, Contact — add a blog to grow.'],
  ['Who writes the content?', 'Simple Hindi or English beats corporate jargon.'],
  ['Template or custom?', 'Custom design builds more trust and converts better.'],
  ['Fast on a phone?', 'Mobile-first, optimised images, 90+ PageSpeed.'],
  ['Ready for Google?', 'Meta tags, schema, sitemap & Business Profile.'],
  ['Who owns what?', 'Domain, files and logins must be in YOUR name.'],
];
add('07-website-checklist-1', cover({ bg: 'paper', label: 'Website tips', kicker: 'Save this post', hi: 'वेबसाइट बनवाने से पहले ये 7 बातें।', en: 'Decide these before you hire a designer.', i: 1, n: 5 }));
add('07-website-checklist-2', tips({ bg: 'ink', label: 'Website tips', title: 'Points 1–3', list: checklist.slice(0, 3), start: 1, i: 2, n: 5 }));
add('07-website-checklist-3', tips({ bg: 'ink', label: 'Website tips', title: 'Points 4–5', list: checklist.slice(3, 5), start: 4, i: 3, n: 5 }));
add('07-website-checklist-4', tips({ bg: 'ink', label: 'Website tips', title: 'Points 6–7', list: checklist.slice(5, 7), start: 6, i: 4, n: 5 }));
add('07-website-checklist-5', ctaSlide({ i: 5, n: 5, line: 'Planning a website? Let’s plan it together.' }));

// 08 · Promises
const promises = [
  ['Fixed price, written upfront', 'No “extra charges” surprise at the end.'],
  ['You own everything', 'Logo files, code, domain and bot — all in your name.'],
  ['Your data stays yours', 'We never sell or reuse your customer data.'],
  ['Real humans on WhatsApp', 'Talk to the people building your project.'],
];
add('08-promises', doc('ink', `
<div class="page">
  ${top('Our promise')}
  <p class="hi-d" style="margin-top:60px;font-size:96px"><span class="hl">वादे, जो हम</span><br>नहीं तोड़ते।</p>
  <div style="margin-top:44px;border-top:3px solid #ffffff33">
    ${promises.map(([t, d], k) => `<div style="display:grid;grid-template-columns:90px 1fr;gap:16px;padding:26px 0;border-bottom:2px solid #ffffff22"><span style="font:700 28px var(--mono);color:var(--o)">0${k + 1}</span><div><p style="font-size:40px;font-weight:800;letter-spacing:-0.02em">${t}</p><p style="margin-top:6px;font-size:27px;color:var(--mdark)">${d}</p></div></div>`).join('')}
  </div>
  ${foot(dm)}
</div>`));

// 09 · Founders
add('09-founders', doc('paper', `
${star('width:220px;height:220px;right:90px;top:250px')}
<div class="page">
  ${top('Founders · <span class="hi">संस्थापक</span>')}
  <p class="hi-d" style="margin-top:70px;font-size:100px">काम के पीछे<br><span class="hl">के चेहरे।</span></p>
  <p class="en" style="margin-top:20px;font-size:46px">Meet the founders of AI Mazdoor.</p>
  <div style="margin-top:auto;display:grid;gap:20px">
    ${site.founders.map((f, k) => `<div class="card${k === 1 ? ' dark' : ''}" style="display:flex;align-items:center;gap:26px;padding:22px 26px">
      <span style="flex:none;display:grid;place-items:center;width:96px;height:96px;border-radius:24px;background:var(--o);border:3px solid var(--ink);font-size:40px;font-weight:800;color:var(--ink);transform:rotate(${k % 2 ? 3 : -3}deg)">${f.initials}</span>
      <div><p style="font-size:42px;font-weight:800;letter-spacing:-0.02em">${f.name}</p><p style="margin-top:2px;font-size:28px;font-weight:700;color:${k === 1 ? 'var(--o)' : 'var(--od)'}">${f.nameHi} · ${f.role}</p></div>
    </div>`).join('')}
  </div>
  <div class="foot" style="margin-top:40px"><span>Made in India</span>${dm}</div>
</div>`));

// 10 · Time-saved calculator (engagement post)
const hours = Math.round((40 * 4 * 26 * 0.7) / 60);
add('10-time-saved', doc('orange', `
${star('width:460px;height:460px;right:-140px;bottom:-120px')}
<div class="page">
  ${top('AI maths')}
  <p class="hi-d" style="margin-top:70px;font-size:92px">कितना समय <span class="hl">बचेगा?</span></p>
  <div class="card" style="margin-top:44px;padding:36px 40px">
    <p style="font-size:34px;font-weight:700;line-height:1.4">40 enquiries a day × 4 minutes each</p>
    <p class="big-num" style="margin-top:18px">${hours}<span style="font-size:70px;letter-spacing:-0.02em"> hours</span></p>
    <p style="margin-top:14px;font-size:30px;line-height:1.4;color:var(--muted)">of repeat work every month that an AI assistant can handle — बिना छुट्टी, बिना थकान।</p>
  </div>
  <p class="en" style="margin-top:40px;font-size:44px">Comment your daily enquiries — we’ll calculate yours.</p>
  ${foot('<span class="pill">Comment 👇</span>')}
</div>`));

// ---------------- Render ----------------
const browser = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find(existsSync);
if (!browser) throw new Error('Install Google Chrome or Microsoft Edge to render the posts.');

// Profile pictures that spell out the name (square, centred for Instagram's circle crop)
const nameProfile = (bg, fg, accent, sub) =>
  doc('paper', `
<div style="position:absolute;inset:0;background:${bg};color:${fg};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center">
  <svg viewBox="0 0 40 40" style="width:150px;height:150px"><path d="${STAR}" fill="${accent}"/><circle cx="33" cy="7" r="3.2" fill="${fg}"/></svg>
  <b style="display:block;margin-top:4px;font-size:290px;font-weight:800;line-height:1.12;letter-spacing:-0.02em">मज़दूर<span style="color:${accent}">.</span></b>
  <small style="display:block;margin-top:70px;padding-left:.3em;font:700 50px/1 var(--mono);letter-spacing:.3em;text-transform:uppercase;color:${sub}">AI Mazdoor</small>
</div>`).replace(`height: ${H}px`, 'height: 1080px');
const squares = [
  { file: 'profile-name-orange', html: nameProfile('#FF5F15', '#141210', '#FFFFFF', '#141210') },
  { file: 'profile-name-dark', html: nameProfile('#141210', '#FFFFFF', '#FF5F15', '#B3ACA5') },
];

const shot = ({ file, html }, dir, w, h) => {
  const src = join(build, `${file}.html`);
  const png = join(out, dir, `${file}.png`);
  writeFileSync(src, html);
  rmSync(png, { force: true });
  // Headless screenshots occasionally come back empty — retry a couple of times
  for (let attempt = 1; attempt <= 3 && !existsSync(png); attempt++) {
    execFileSync(browser, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      `--user-data-dir=${join(build, `profile-${file}-${attempt}`)}`,
      '--force-device-scale-factor=1', `--window-size=${w},${h}`, '--virtual-time-budget=4000',
      `--screenshot=${png}`, pathToFileURL(src).href,
    ], { stdio: 'ignore' });
  }
  if (!existsSync(png)) throw new Error(`Failed to render ${file}.png`);
};
for (const p of posts) shot(p, 'posts', W, H);
for (const p of squares) shot(p, 'profile', 1080, 1080);
console.log(`${posts.length} post images, ${2 + squares.length} profile images, ${Object.keys(highlightIcons).length} highlight covers → ${out}`);
