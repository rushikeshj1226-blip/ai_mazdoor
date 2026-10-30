// Central business details. Update these once and every page, meta tag and schema picks them up.
export const site = {
  name: 'AI Mazdoor',
  nameHi: 'एआई मज़दूर',
  // Other ways people type the brand — used as alternate names in Google's structured data
  altNames: ['एआई मज़दूर', 'AIMazdoor', 'AI-Mazdoor', 'AI Majdoor', 'AI Mazdur'],
  legalName: 'AI Mazdoor',
  url: 'https://www.ai-mazdoor.com',
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
  email: 'hello@ai-mazdoor.com',
  city: 'India',
  region: 'IN',
  hours: 'Mon–Sat · 10:00 AM – 7:00 PM IST',
  // Optional: paste a Formspree / Web3Forms endpoint to receive form leads by email.
  // Leave empty and the contact form sends the enquiry to WhatsApp instead.
  formEndpoint: '',
  // Real profiles only — every link here also goes into Google's structured data (sameAs)
  social: {
    instagram: 'https://www.instagram.com/ai.mazdoor/',
    facebook: 'https://www.facebook.com/people/AI-%E0%A4%AE%E0%A4%9C%E0%A4%A6%E0%A5%82%E0%A4%B0/61595941745346/',
  },
  ogImage: '/og/default.png',
  // Portfolio is hidden until real client work is ready. Set to true to bring back
  // the Work page, its nav/footer links and the Work section on the home page.
  showWork: false,
  // Founders section is hidden for now. Set to true to show it on the Home and About
  // pages again (and add the founders back to the About description and Google data).
  showFounders: false,
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

// Social profiles shown in the footer and contact section (icon paths use a 24×24 viewBox)
export const socialLinks = [
  {
    label: 'Instagram',
    handle: '@ai.mazdoor',
    href: site.social.instagram,
    bg: 'linear-gradient(45deg, #f9a825, #e1306c 55%, #833ab4)',
    icon: 'M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 1 0 12 7.4Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 8.3c-.1-1.5-.4-2.8-1.5-3.8S17.2 3.1 15.7 3c-1.5-.1-6-.1-7.5 0-1.5.1-2.8.4-3.8 1.5S3.1 6.8 3 8.3c-.1 1.5-.1 6 0 7.5.1 1.5.4 2.8 1.5 3.8s2.3 1.4 3.8 1.5c1.5.1 6 .1 7.5 0 1.5-.1 2.8-.4 3.8-1.5s1.4-2.3 1.5-3.8c.1-1.5.1-6 0-7.5Zm-2 9.1a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3a3 3 0 0 1 1.7-1.7c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4a3 3 0 0 1 1.7 1.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3Z',
  },
  {
    label: 'Facebook',
    handle: 'AI Mazdoor',
    href: site.social.facebook,
    bg: '#1877f2',
    icon: 'M14 21v-8h2.7l.4-3.2H14V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.8V13h2.8v8H14Z',
  },
] as const;

export const waLink = (text = 'Namaste AI Mazdoor! Mujhe ek project ke baare mein baat karni hai.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
