// Central business details. Update these once and every page, meta tag and schema picks them up.
export const site = {
  name: 'AI Mazdoor',
  nameHi: 'एआई मज़दूर',
  legalName: 'AI Mazdoor',
  url: 'https://ai-mazdoor-sigma.vercel.app',
  tagline: 'Logo Design, Website Design & AI Automation Agency',
  description:
    'AI Mazdoor is an Indian design & AI automation agency. We create memorable logos, fast SEO-ready websites and WhatsApp/AI bots that work 24×7 — in Hindi & English.',
  locale: 'en_IN',
  // Contact — primary number is also the WhatsApp number
  phone: '+91 8793585480',
  phoneRaw: '+918793585480',
  phone2: '+91 9137321242',
  phone2Raw: '+919137321242',
  whatsapp: '918793585480',
  email: 'hello@aimazdoor.com',
  city: 'India',
  region: 'IN',
  hours: 'Mon–Sat · 10:00 AM – 7:00 PM IST',
  // Optional: paste a Formspree / Web3Forms endpoint to receive form leads by email.
  // Leave empty and the contact form sends the enquiry to WhatsApp instead.
  formEndpoint: '',
  social: {
    instagram: 'https://www.instagram.com/aimazdoor',
    linkedin: 'https://www.linkedin.com/company/aimazdoor',
    youtube: 'https://www.youtube.com/@aimazdoor',
    x: 'https://x.com/aimazdoor',
  },
  ogImage: '/og/default.png',
  // Portfolio is hidden until real client work is ready. Set to true to bring back
  // the Work page, its nav/footer links and the Work section on the home page.
  showWork: false,
  founders: [
    { name: 'Swapnil Bagul', nameHi: 'स्वप्निल बागुल', initials: 'SB', role: 'Co-founder' },
    { name: 'Rushikesh Jadhav', nameHi: 'ऋषिकेश जाधव', initials: 'RJ', role: 'Co-founder' },
    { name: 'Pratik Kambale', nameHi: 'प्रतीक कांबळे', initials: 'PK', role: 'Co-founder' },
  ],
} as const;

export const serviceLinks = [
  { label: 'Logo Design', hi: 'लोगो डिज़ाइन', href: '/services/logo-design', note: 'Brand identity that sticks' },
  { label: 'Website Design', hi: 'वेबसाइट डिज़ाइन', href: '/services/website-design', note: 'Fast, SEO-ready, built to sell' },
  { label: 'AI Automation', hi: 'AI ऑटोमेशन', href: '/services/ai-automation', note: 'WhatsApp & AI bots, 24×7' },
] as const;

const allNav = [
  { label: 'Services', href: '/services', children: serviceLinks },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
] as const;

export const nav = allNav.filter((item) => site.showWork || item.href !== '/work');

export const waLink = (text = 'Namaste AI Mazdoor! Mujhe ek project ke baare mein baat karni hai.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
