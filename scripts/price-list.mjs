// Renders the AI Mazdoor price list (A4 PDF) in the website's brand style.
// Usage: node scripts/price-list.mjs   (needs Google Chrome or Microsoft Edge)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'print');
mkdirSync(outDir, { recursive: true });
const pdf = join(outDir, 'AI-Mazdoor-Price-List-2026-27.pdf');

// Contact details come from the website config so they stay in sync
const siteTs = readFileSync(resolve(root, 'src/data/site.ts'), 'utf8');
const pick = (k) => (siteTs.match(new RegExp(`${k}: '([^']*)'`)) || [])[1] || '';
const SITE = pick('url').replace(/^https?:\/\//, '');
const EMAIL = pick('email');
const PHONE = pick('phone');
const PHONE2 = pick('phone2');

const VALID = '31 March 2027';
const inr = (n) => '₹' + n.toLocaleString('en-IN');

// ---------- Prices (INR, market rates anchored on a ₹19,999 landing page; GST extra if applicable) — edit here ----------
const logo = [
  { name: 'Starter', price: 7999, time: '5 working days', note: 'A professional mark for new businesses.', f: ['2 original logo concepts', '2 revision rounds', 'Primary logo + icon', 'PNG, JPG, SVG & PDF files'] },
  { name: 'Brand Kit', price: 19999, time: '10 working days', note: 'Look like an established brand everywhere.', popular: true, f: ['3 original logo concepts', '4 revision rounds', 'Full logo system', 'Colour palette & typography', 'Brand guidelines PDF', 'Social media kit', 'Visiting card & letterhead'] },
  { name: 'Identity Pro', price: 39999, time: '3 weeks', note: 'Complete identity for brands launching big.', f: ['Everything in Brand Kit', 'Brand strategy workshop', 'Bilingual Hindi + English logo', 'Packaging or signage design (1)', '15 social post templates', 'Priority support'] },
];
const web = [
  { name: 'Landing Page', price: 19999, time: '5 working days', incl: 'Hosting + SSL free for 1 year', note: 'One high-converting page for ads & campaigns.', f: ['1 long-scroll page', 'Custom mobile-first design', 'WhatsApp & call buttons', 'Lead form', 'Basic SEO'] },
  { name: 'Launch', price: 34999, time: '7–10 working days', incl: 'Hosting + SSL free for 1 year', note: 'A complete business website.', f: ['Up to 5 pages', 'Custom mobile-first design', 'Contact form + WhatsApp', 'On-page SEO + sitemap', 'Google Analytics'] },
  { name: 'Growth', price: 59999, time: '3–4 weeks', incl: 'Hosting + domain + SSL free for 1 year', note: 'Built to win Google leads every month.', popular: true, f: ['Up to 12 pages', 'Blog / news section', 'Advanced SEO + schema', 'Speed optimisation (90+)', 'Lead form → Sheet / CRM', '30 days free support'] },
  { name: 'E-commerce Store', price: 99999, time: '4–6 weeks', incl: 'Hosting + domain free for 1 year*', note: 'Sell online with UPI, cards & COD.', f: ['Shopify or custom store', 'Up to 50 products setup', 'Payment & shipping setup', 'Order WhatsApp alerts', 'Training session'] },
];
const ai = [
  { name: 'Starter Bot', price: 14999, monthly: 1999, time: '~7 days', note: 'Instant replies on WhatsApp or website.', f: ['FAQ & price bot', 'Hindi + English replies', 'Lead capture to Google Sheet', 'Human handover'] },
  { name: 'Business Automation', price: 39999, monthly: 4999, time: '2–3 weeks', note: 'An AI worker that replies, books & follows up.', popular: true, f: ['WhatsApp Business API bot', 'AI trained on your business', 'Appointment / order booking', 'CRM integration', 'Auto follow-ups & daily report'] },
  { name: 'Custom AI Agent', price: 99999, monthly: 9999, from: true, time: '4–6 weeks', note: 'Multi-step agents across your tools.', f: ['Custom workflows', 'Invoices, quotes & documents', 'Internal team assistant', 'Dashboards & analytics', 'Dedicated support'] },
];
const addons = [
  ['Monthly SEO (min. 3 months)', '₹14,999 / month'],
  ['Website care plan — updates, backups, security', '₹2,999 / month'],
  ['Google Business Profile setup & optimisation', '₹4,999'],
  ['Social media kit — 10 post templates', '₹6,999'],
  ['Content writing (English)', '₹1,499 / page'],
  ['Bilingual content (Hindi + English)', '₹1,999 / page'],
  ['Extra revision round', '₹1,500'],
  ['Rush delivery (half the timeline)', '+25%'],
];
const logoExtras = [
  ['Logo refresh / redesign of an existing logo', '₹4,999'],
  ['Extra logo concept', '₹2,499'],
  ['Bilingual Hindi + English lockup', '₹3,999'],
  ['Stationery set — card, letterhead, envelope', '₹2,999'],
  ['Brand guidelines (standalone)', '₹7,999'],
  ['Packaging / label design', '₹7,999 / design'],
];
const aiExtras = [
  ['Extra WhatsApp flow or FAQ set', '₹4,999'],
  ['CRM / tool integration (Zoho, HubSpot, Razorpay…)', '₹7,999 / tool'],
  ['Additional language (Marathi, Gujarati, Tamil…)', '₹4,999 / language'],
  ['Team training session (online)', '₹2,999'],
];
const hosting = [
  { name: 'Starter Hosting', price: 3999, yearly: true, time: 'free in year 1', note: 'For landing pages & small business sites.', f: ['1 website on fast cloud + CDN', 'Free SSL (https)', 'Weekly backups', 'Uptime monitoring', 'WhatsApp support'] },
  { name: 'Business Hosting', price: 6999, yearly: true, time: 'free in year 1', note: 'For growing business websites & blogs.', popular: true, f: ['Everything in Starter', 'Daily backups', 'Security firewall', 'Business email setup (5 IDs)', 'Priority support', 'Monthly uptime report'] },
  { name: 'E-commerce Hosting', price: 12999, yearly: true, time: 'free in year 1', note: 'For custom online stores.', f: ['High-performance server', 'Daily backups + 30-day restore', 'Firewall & malware scan', 'Secure checkout SSL', 'Priority support'] },
];
const domains = [
  ['.in domain registration / renewal', '₹799 / year'],
  ['.com domain registration / renewal', '₹1,199 / year'],
  ['Business email setup (Google Workspace / Zoho)', '₹1,999 + provider fees'],
  ['Move an existing website to our hosting', '₹2,999'],
  ['Deploy on your own hosting account instead', 'Free'],
];
// Combo "was" prices are the sum of the packages inside, so the savings always add up
const combos = [
  { name: 'Starter Combo', items: 'Logo Starter + Website Launch', parts: [logo[0], web[1]], price: 37999 },
  { name: 'Growth Combo', items: 'Brand Kit + Website Growth + Starter Bot', parts: [logo[1], web[2], ai[0]], price: 84999, popular: true },
  { name: 'Full Digital Mazdoor', items: 'Identity Pro + Website Growth + Business Automation', parts: [logo[2], web[2], ai[1]], price: 124999 },
].map((c) => ({ ...c, was: c.parts.reduce((sum, p) => sum + p.price, 0) }));

// ---------- Layout ----------
const font = (p) => pathToFileURL(resolve(root, 'node_modules/@fontsource-variable', p)).href;
const ICON = `<svg viewBox="0 0 40 40" class="icon"><rect width="40" height="40" rx="11" fill="#FF5F15"/><path d="M20 7c1.2 8.4 4.6 11.8 13 13-8.4 1.2-11.8 4.6-13 13-1.2-8.4-4.6-11.8-13-13 8.4-1.2 11.8-4.6 13-13Z" fill="#141210"/><circle cx="30.5" cy="9.5" r="2.6" fill="#fff"/></svg>`;
const logoMark = `<div class="logo">${ICON}<div><b>मज़दूर<span>.</span></b><small>AI Mazdoor</small></div></div>`;
const foot = (n) => `<div class="foot"><span>${SITE}</span><span>Prices in INR · GST extra if applicable · valid till ${VALID}</span><span>${String(n).padStart(2, '0')}</span></div>`;
const head = (label) => `<div class="top">${logoMark}<span class="chip">${label}</span></div>`;

const extras = (title, hi, rows) => `<h4 class="sm">${title} <span class="hi" lang="hi">· ${hi}</span></h4><div class="tbl compact" style="margin-top:3mm"><table>${rows.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table></div>`;

const card = (p, extra = '') => `
<div class="card${p.popular ? ' hot' : ''}${p.incl ? ' has-incl' : ''}">
  ${p.popular ? '<span class="badge"><span lang="hi">सबसे पॉपुलर</span> · Most popular</span>' : ''}
  <h3>${p.name}</h3>
  <p class="note">${p.note}</p>
  <p class="price">${p.from ? '<small>from</small> ' : ''}${inr(p.price)}</p>
  <p class="unit">${p.monthly ? `one-time setup + ${inr(p.monthly)}/month` : p.yearly ? 'per year' : 'one-time'} · ${p.time}</p>
  ${p.incl ? `<p class="incl">${p.incl}</p>` : ''}
  <ul>${p.f.map((x) => `<li><i>✓</i>${x}</li>`).join('')}</ul>${extra}
</div>`;

const section = (n, label, hi, title, intro, cards, cols, after = '') => `
<section class="page">
  ${head(label)}
  <p class="eyebrow"><span>${n}</span><i class="rule"></i>${label}</p>
  <h2><span class="hi-d"><span class="hl">${hi}</span></span><span class="en">${title}</span></h2>
  <p class="intro">${intro}</p>
  <div class="grid" style="grid-template-columns:repeat(${cols},1fr)">${cards}</div>
  ${after}
  ${foot(n)}
</section>`;

const css = `
@font-face { font-family: "Bricolage"; src: url("${font('bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2')}") format("woff2"); font-weight: 200 800; }
@font-face { font-family: "Baloo"; src: url("${font('baloo-2/files/baloo-2-devanagari-wght-normal.woff2')}") format("woff2"); font-weight: 400 800; unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF; }
@page { size: A4; margin: 0; }
:root { --o:#ff5f15; --od:#c24100; --ink:#141210; --paper:#fffaf5; --muted:#5f5a55; --mdark:#b3aca5; --tint:#fff2e8; --line:#ebe2d8; --mono: Consolas, "Cascadia Mono", ui-monospace, monospace; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { font-family: "Bricolage", "Baloo", sans-serif; color: var(--ink); background: var(--paper); }
.page { position: relative; width: 210mm; height: 297mm; padding: 14mm 14mm 18mm; background: var(--paper); page-break-after: always; overflow: hidden; display: flex; flex-direction: column; }
.page:last-child { page-break-after: auto; }
.logo { display: flex; align-items: center; gap: 3mm; }
.logo .icon { width: 11mm; height: 11mm; }
.logo b { display: block; font-size: 6.4mm; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; }
.logo b span { color: var(--o); }
.logo small { display: block; margin-top: 1.4mm; font: 700 2.1mm/1 var(--mono); letter-spacing: .26em; text-transform: uppercase; color: var(--muted); }
.top { display: flex; align-items: center; justify-content: space-between; }
.chip { border: 0.5mm solid var(--ink); border-radius: 99px; padding: 1.8mm 4mm; font: 700 2.6mm/1 var(--mono); letter-spacing: .14em; text-transform: uppercase; background: #fff; }
.eyebrow { margin-top: 12mm; font: 700 2.6mm/1 var(--mono); letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.eyebrow span { color: var(--o); }
.eyebrow { display: flex; align-items: center; }
.eyebrow .rule { display: inline-block; width: 8mm; height: 0.3mm; background: currentColor; opacity: .6; margin: 0 3mm; }
h2 { margin-top: 4mm; }
.hi-d { display: block; font-size: 12mm; font-weight: 800; line-height: 1.12; }
.hl { background: linear-gradient(var(--o), var(--o)) 0 86% / 100% 0.36em no-repeat; }
.en { display: block; margin-top: 2mm; font-size: 6.2mm; font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; }
.intro { margin-top: 3mm; max-width: 150mm; font-size: 3.5mm; line-height: 1.5; color: var(--muted); }
.grid { margin-top: 8mm; display: grid; gap: 4.5mm; align-items: stretch; }
.card { position: relative; background: #fff; border: 0.5mm solid var(--ink); border-radius: 5mm; padding: 6mm 5mm 5mm; box-shadow: 1.4mm 1.4mm 0 var(--ink); display: flex; flex-direction: column; }
.card.hot { background: var(--ink); color: #fff; box-shadow: 1.6mm 1.6mm 0 var(--o); }
.badge { position: absolute; top: -3mm; left: 5mm; background: var(--o); color: var(--ink); border: 0.5mm solid var(--ink); border-radius: 99px; padding: 1mm 2.6mm; font: 700 2.1mm/1 var(--mono); letter-spacing: .1em; text-transform: uppercase; }
.badge [lang=hi] { font-family: "Bricolage", "Baloo"; letter-spacing: 0; font-size: 2.5mm; }
.card h3 { font-size: 5mm; font-weight: 800; letter-spacing: -0.01em; }
.note { margin-top: 1mm; font-size: 3mm; line-height: 1.4; color: var(--muted); min-height: 8.4mm; }
.hot .note, .hot .unit { color: var(--mdark); }
.price { margin-top: 4mm; font-size: 8.6mm; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
.price small { font-size: 3mm; font-weight: 600; color: var(--muted); letter-spacing: 0; }
.hot .price small { color: var(--mdark); }
.unit { margin-top: 1.6mm; font-size: 2.7mm; color: var(--muted); }
.incl { margin-top: 2.6mm; align-self: flex-start; display: inline-flex; align-items: center; gap: 1.6mm; background: var(--tint); border: 0.4mm solid var(--ink); border-radius: 99px; padding: 1mm 2.8mm; font-size: 2.7mm; font-weight: 800; color: var(--ink); }
.incl::before { content: "✦"; color: var(--o); }
.hot .incl { background: var(--o); }
.hot .incl::before { color: var(--ink); }
.card.has-incl .note { min-height: 0; }
.card ul { margin-top: 4mm; list-style: none; display: grid; gap: 2mm; }
.card li { display: flex; gap: 2mm; font-size: 3.05mm; line-height: 1.35; }
.card li i { flex: none; display: grid; place-items: center; width: 4mm; height: 4mm; border-radius: 1mm; background: var(--ink); color: var(--o); font-style: normal; font-size: 2.4mm; font-weight: 900; }
.hot li i { background: var(--o); color: var(--ink); }
.box { margin-top: 7mm; border: 0.5mm solid var(--ink); border-radius: 5mm; background: var(--tint); padding: 5mm 6mm; font-size: 3.1mm; line-height: 1.5; }
.box b { font-weight: 800; }
.foot { position: absolute; left: 14mm; right: 14mm; bottom: 8mm; display: flex; justify-content: space-between; border-top: 0.3mm solid var(--line); padding-top: 3mm; font: 700 2.3mm/1 var(--mono); letter-spacing: .06em; color: var(--muted); }
table { width: 100%; border-collapse: collapse; margin-top: 6mm; font-size: 3.3mm; }
td { padding: 3.2mm 4mm; border-bottom: 0.3mm solid var(--line); }
td:last-child { text-align: right; font-weight: 800; white-space: nowrap; }
tr:nth-child(odd) td { background: #fff; }
.tbl { border: 0.5mm solid var(--ink); border-radius: 5mm; overflow: hidden; box-shadow: 1.4mm 1.4mm 0 var(--ink); }
.tbl table { margin: 0; }
h4 { margin-top: 9mm; font-size: 5.4mm; font-weight: 800; }
h4 .hi { color: var(--od); }
h4.sm { margin-top: 6mm; font-size: 4.6mm; }
.tbl.compact td { padding: 1.9mm 4mm; font-size: 3mm; }
.box { margin-top: 6mm; }
.combo { display: flex; flex-direction: column; align-items: flex-start; gap: 1mm; margin-top: 3mm; }
.combo .price { margin-top: 0; }
.combo .was { font-size: 3mm; color: var(--muted); text-decoration: line-through; }
.hot .combo .was { color: var(--mdark); }
.save { align-self: flex-start; display: inline-block; margin-top: 2mm; background: var(--o); color: var(--ink); border-radius: 99px; padding: 0.8mm 2.4mm; font-size: 2.6mm; font-weight: 800; }
/* cover */
.cover { background: var(--paper); }
.cover .big { margin-top: 30mm; font-size: 24mm; font-weight: 800; letter-spacing: -0.04em; line-height: .95; }
.cover .name-chip { display: inline-block; margin-top: 7mm; background: var(--o); border: 1mm solid var(--ink); border-radius: 6mm; padding: 0 0.18em 0.2em; transform: rotate(-2.5deg); box-shadow: 2.2mm 2.2mm 0 var(--ink); font-size: 18mm; font-weight: 800; line-height: 1.12; }
.cover .tag { margin-top: 12mm; font-size: 9mm; font-weight: 800; line-height: 1.2; }
.cover .sub { margin-top: 3mm; max-width: 150mm; font-size: 4.6mm; line-height: 1.45; font-weight: 600; color: var(--muted); }
.toc { margin-top: auto; margin-bottom: 8mm; border-top: 0.5mm solid var(--ink); }
.toc div { display: flex; justify-content: space-between; padding: 3.6mm 0; border-bottom: 0.3mm solid var(--line); font-size: 4mm; font-weight: 700; }
.toc div span:last-child { font-family: var(--mono); color: var(--od); }
.star { position: absolute; right: 16mm; top: 64mm; width: 38mm; height: 38mm; fill: var(--o); }
.steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4mm; margin-top: 6mm; }
.steps div { border-top: 0.6mm solid var(--ink); padding-top: 3mm; font-size: 2.9mm; line-height: 1.45; color: var(--muted); }
.steps b { display: block; font-size: 9mm; color: var(--o); line-height: 1; -webkit-text-stroke: 0.3mm var(--ink); }
.steps strong { display: block; margin-top: 2mm; color: var(--ink); font-size: 3.4mm; }
ul.terms { margin-top: 5mm; list-style: none; display: grid; gap: 2.6mm; font-size: 3.2mm; line-height: 1.45; }
ul.terms li { padding-left: 5mm; position: relative; }
ul.terms li::before { content: ""; position: absolute; left: 0; top: 1.4mm; width: 2.2mm; height: 2.2mm; border-radius: 0.6mm; background: var(--o); }
.contact { margin-top: auto; margin-bottom: 8mm; background: var(--ink); color: #fff; border-radius: 6mm; padding: 7mm; display: grid; grid-template-columns: 1.2fr 1fr; gap: 6mm; align-items: center; }
.contact .hi-d { font-size: 11mm; }
.contact p { font-size: 3.4mm; line-height: 1.7; color: var(--mdark); }
.contact p b { color: #fff; }
`;

const cover = `
<section class="page cover">
  ${head('Price list 2026–27')}
  <svg viewBox="0 0 40 40" class="star"><path d="M20 2c1.6 11.2 6.8 16.4 18 18-11.2 1.6-16.4 6.8-18 18-1.6-11.2-6.8-16.4-18-18 11.2-1.6 16.4-6.8 18-18Z"/></svg>
  <div class="big">Price<br>List</div>
  <div><span class="name-chip" lang="hi">रेट कार्ड</span></div>
  <p class="tag">साफ़ दाम, <span class="hl">साफ़ काम।</span></p>
  <p class="sub">Logo Design · Website Design · Hosting · AI Automation — fixed, transparent packages for Indian businesses.</p>
  <div class="toc">
    <div><span>Logo &amp; Brand Identity</span><span>02</span></div>
    <div><span>Website Design &amp; Development</span><span>03</span></div>
    <div><span>Hosting, Domain &amp; Email</span><span>04</span></div>
    <div><span>AI Automation &amp; WhatsApp Bots</span><span>05</span></div>
    <div><span>Add-ons &amp; Combo Packages</span><span>06</span></div>
    <div><span>Terms &amp; How We Work</span><span>07</span></div>
  </div>
  ${foot(1)}
</section>`;

const comboCards = combos.map((c) => `
<div class="card${c.popular ? ' hot' : ''}">
  ${c.popular ? '<span class="badge"><span lang="hi">सबसे पॉपुलर</span> · Best value</span>' : ''}
  <h3>${c.name}</h3><p class="note">${c.items}</p>
  <div class="combo"><span class="was">${inr(c.was)}</span><p class="price">${inr(c.price)}</p></div>
  <span class="save">Save ${inr(c.was - c.price)}</span>
</div>`).join('');

const addonsPage = `
<section class="page">
  ${head('Add-ons & combos')}
  <p class="eyebrow"><span>06</span><i class="rule"></i>Add-ons · <span lang="hi" style="color:var(--muted);letter-spacing:0">और भी</span></p>
  <h2><span class="hi-d"><span class="hl">छोटे काम, बड़ा असर।</span></span><span class="en">Add-ons &amp; monthly services</span></h2>
  <div class="tbl" style="margin-top:7mm"><table>${addons.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table></div>
  <h4>Combo packages <span class="hi" lang="hi">· साथ में लें, बचत करें</span></h4>
  <div class="grid" style="grid-template-columns:repeat(3,1fr);margin-top:6mm">${comboCards}</div>
  ${foot(6)}
</section>`;

const founders = (siteTs.match(/name: '([^']+)', nameHi/g) || []).map((m) => m.replace(/name: '|', nameHi/g, ''));
const termsPage = `
<section class="page">
  ${head('Terms')}
  <p class="eyebrow"><span>07</span><i class="rule"></i>How we work · <span lang="hi" style="color:var(--muted);letter-spacing:0">हमारा तरीका</span></p>
  <h2><span class="hi-d"><span class="hl">बात से लॉन्च तक।</span></span><span class="en">Simple process, written terms</span></h2>
  <div class="steps">
    <div><b>1</b><strong>Free call</strong>20 minutes to understand your business and goals.</div>
    <div><b>2</b><strong>Fixed quote</strong>Written scope, price and timeline within 24 hours.</div>
    <div><b>3</b><strong>Design &amp; build</strong>WhatsApp updates; you review every stage.</div>
    <div><b>4</b><strong>Launch &amp; support</strong>Go live, hand over everything, 30 days support.</div>
  </div>
  <h4>Terms &amp; conditions</h4>
  <ul class="terms">
    <li>All prices are in Indian Rupees (INR). GST (18%) is added only where applicable, and a proper invoice is provided for every payment.</li>
    <li>Payment: 50% advance to start, 50% before final delivery or go-live. Projects above ₹1,00,000 are billed 40% / 30% / 30% by milestone.</li>
    <li>Hosting is free for the first year with every website (domain too with Growth &amp; E-commerce Store); from year 2 it renews yearly as per page 04, with a reminder 30 days before.</li>
    <li>Other third-party costs — Shopify or plugin subscriptions, business email provider fees, WhatsApp (Meta) conversation charges and AI usage — are billed at actuals or paid directly by the client.</li>
    <li>Timelines start once the advance and required content (text, photos, logins) are received.</li>
    <li>Revision rounds are as listed per package; extra rounds are charged separately. Scope changes are quoted and agreed in writing first.</li>
    <li>Full ownership of files, code, domain and accounts transfers to the client on final payment.</li>
    <li>AI monthly plans cover hosting, monitoring and improvements; they can be paused or cancelled with 30 days’ notice.</li>
    <li>This price list is valid till ${VALID}. Final pricing is confirmed in a written quote.</li>
  </ul>
  <div class="contact">
    <div><span class="hi-d"><span class="hl">आइए, बात करें।</span></span><p style="margin-top:2mm">Free 20-minute consultation — Hindi or English.</p></div>
    <p><b>Web</b> ${SITE}<br><b>Email</b> ${EMAIL}<br><b>WhatsApp</b> ${PHONE}<br><b>Call</b> ${PHONE} / ${PHONE2}<br><b>Founders</b> ${founders.join(', ')}</p>
  </div>
  ${foot(7)}
</section>`;

const html = `<!doctype html><html lang="en-IN"><head><meta charset="utf-8"><title>AI Mazdoor — Price List ${'2026–27'}</title><style>${css}</style></head><body>
${cover}
${section('02', 'Logo & brand identity', 'पहचान ऐसी, जो याद रहे।', 'Logo & brand identity packages', 'Original, hand-crafted logos and brand kits — with every source file and full copyright.', logo.map((p) => card(p)).join(''), 3, `<div class="box"><b>Always included:</b> original work (no templates or clip-art), mockups on real signboards &amp; screens, and full copyright transfer on final payment.</div>${extras('Logo add-ons', 'अलग से', logoExtras)}`)}
${section('03', 'Website design', 'वेबसाइट जो बिज़नेस लाए।', 'Website design & development packages', 'Custom, mobile-first websites that load fast, rank on Google and bring WhatsApp enquiries.', web.map((p) => card(p)).join(''), 2, `<div class="box" style="margin-top:5mm;padding:3.6mm 6mm"><b>Every website includes 1 year of hosting + SSL</b> (renewals: page 04). *Shopify uses its own plan. <b>Custom web apps</b> from <b>₹1,49,999</b>.</div>`)}
${section('04', 'Hosting & domain', 'वेबसाइट हमेशा ऑनलाइन।', 'Hosting, domain & email plans', 'Fast, secure cloud hosting managed by us — no servers, SSL or backups for you to worry about. Free for the first year with every website.', hosting.map((p) => card(p)).join(''), 3, `<div class="box"><b>Year 1 free:</b> every website package includes 1 year of hosting with SSL. Growth &amp; E-commerce Store also include a free .in or .com domain for year 1. From year 2, renew yearly — we remind you 30 days before renewal.</div>${extras('Domain &amp; email', 'डोमेन', domains)}`)}
${section('05', 'AI automation', 'मेहनत का काम, AI के नाम।', 'AI automation & WhatsApp bot packages', 'AI workers that reply, capture leads, follow up and report — 24×7, in Hindi, English and Hinglish.', ai.map((p) => card(p)).join(''), 3, `<div class="box"><b>Note:</b> WhatsApp Business API conversation charges (set by Meta) and AI usage are billed at actuals, based on your message volume. We estimate them upfront — no surprises. <b>Monthly plans cover</b> hosting &amp; uptime monitoring, answer improvements, a monthly report and up to 2 hours of changes.</div>${extras('AI add-ons', 'अलग से', aiExtras)}`)}
${addonsPage}
${termsPage}
</body></html>`;

const build = mkdtempSync(join(tmpdir(), 'aim-price-'));
const src = join(build, 'price-list.html');
writeFileSync(src, html);
const browser = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find(existsSync);
if (!browser) throw new Error('Install Google Chrome or Microsoft Edge to render the PDF.');
execFileSync(browser, [
  '--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${join(build, 'profile')}`,
  '--no-pdf-header-footer', '--virtual-time-budget=5000', `--print-to-pdf=${pdf}`, pathToFileURL(src).href,
], { stdio: 'ignore' });
if (!existsSync(pdf)) throw new Error('PDF was not created');
console.log(pdf);
