// Service content. Timelines and deliverables are starting points — edit freely.
export type Faq = { q: string; a: string };
export type Service = {
  slug: 'logo-design' | 'website-design' | 'ai-automation';
  name: string;
  nameHi: string;
  label: string;
  short: string;
  displayHi: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  serviceType: string;
  highlights: { value: string; label: string }[];
  deliverables: { title: string; text: string }[];
  useCasesTitle: string;
  useCases: { title: string; hi: string; text: string }[];
  process: { hi: string; title: string; text: string }[];
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: 'logo-design',
    name: 'Logo Design',
    nameHi: 'लोगो डिज़ाइन',
    label: 'Logo & Brand Identity',
    short: 'Logos and brand identities that look premium on a signboard, a visiting card and a 40px Instagram DP.',
    displayHi: 'पहचान ऐसी, जो याद रहे।',
    h1: 'Logo design & brand identity that people remember',
    metaTitle: 'Logo Design Services in India | Brand Identity – AI Mazdoor',
    metaDescription:
      'Professional logo design & brand identity for Indian businesses. Original concepts, brand guidelines & all source files. Hindi & English support.',
    intro:
      'Aapka logo aapke business ka chehra hai. We design original, hand-crafted logos and complete brand kits — so your shop board, website, WhatsApp DP and packaging all speak the same language.',
    serviceType: 'Logo Design and Brand Identity Design',
    highlights: [
      { value: '72 hrs', label: 'first concepts' },
      { value: '100%', label: 'original, no templates' },
      { value: 'All', label: 'source files are yours' },
    ],
    deliverables: [
      { title: 'Original logo concepts', text: 'Multiple hand-sketched directions, each with a clear idea behind it — not random clip-art.' },
      { title: 'Logo system', text: 'Primary logo, stacked version, icon and favicon — so it works everywhere from billboards to browser tabs.' },
      { title: 'Colour & typography', text: 'A brand palette and font pairing that fits your audience, in English, Hindi or both.' },
      { title: 'Brand guidelines', text: 'A simple PDF rulebook so every printer, designer and employee uses your logo the right way.' },
      { title: 'Social media kit', text: 'Profile pictures, cover banners and post templates for Instagram, Facebook, LinkedIn and WhatsApp.' },
      { title: 'Every file format', text: 'AI, SVG, PDF, PNG and JPG — print-ready and web-ready. Full copyright transferred to you.' },
    ],
    useCasesTitle: 'Brands we love building',
    useCases: [
      { title: 'Startups', hi: 'स्टार्टअप', text: 'A sharp identity that makes investors and early customers take you seriously.' },
      { title: 'Cafés & restaurants', hi: 'कैफ़े', text: 'Signage, menus, cups and Zomato banners that make people hungry.' },
      { title: 'Clinics & doctors', hi: 'क्लिनिक', text: 'Clean, trustworthy branding that calms patients before they walk in.' },
      { title: 'Retail & local shops', hi: 'दुकान', text: 'A board people notice from across the road — and remember.' },
      { title: 'D2C & e-commerce', hi: 'ब्रांड', text: 'Packaging-ready identities built to stand out in a thumbnail.' },
      { title: 'Personal brands', hi: 'पर्सनल', text: 'Monograms and marks for coaches, creators and consultants.' },
    ],
    process: [
      { hi: 'समझना', title: 'Brief call', text: 'A 20-minute chat about your business, customers, competitors and the feeling you want your brand to give.' },
      { hi: 'रिसर्च', title: 'Moodboard', text: 'We study your market and share a visual direction before a single logo is drawn.' },
      { hi: 'डिज़ाइन', title: 'Concepts', text: 'Original logo concepts within 72 hours, shown on real mockups — signboards, cards, phone screens.' },
      { hi: 'सुधार', title: 'Refine', text: 'You pick a favourite, we polish it through revision rounds until it feels exactly right.' },
      { hi: 'डिलीवरी', title: 'Brand kit', text: 'Final files, guidelines and social kit delivered in one neat folder. Copyright is yours.' },
    ],
    faqs: [
      { q: 'How long does logo design take?', a: 'You get the first logo concepts within 72 hours of the brief call. Most projects are fully finished, with all files, in 5–10 working days, depending on scope and how quickly feedback comes in.' },
      { q: 'Will I own the copyright of my logo?', a: 'Yes. Once the final payment is done, full copyright and every source file (AI, SVG, PDF, PNG) is transferred to you. You can trademark it in your name.' },
      { q: 'Do you use AI to create logos?', a: 'We use AI for research and quick moodboards, but every final logo is designed by hand by our designers and checked for originality. No stock icons, no generated clip-art.' },
      { q: 'Can you redesign my existing logo?', a: 'Absolutely. A refresh keeps the recognition you have built while making the logo cleaner, more modern and easier to use on digital screens.' },
      { q: 'Can I get a Hindi or bilingual logo?', a: 'Yes — Devanagari, English or a bilingual lockup. Hindi lettering is one of our favourite things to design.' },
    ],
  },
  {
    slug: 'website-design',
    name: 'Website Design',
    nameHi: 'वेबसाइट डिज़ाइन',
    label: 'Website Design & Development',
    short: 'Custom websites that load in a blink, rank on Google and turn visitors into WhatsApp enquiries.',
    displayHi: 'वेबसाइट जो बिज़नेस लाए।',
    h1: 'Website design that’s fast, SEO-ready and built to sell',
    metaTitle: 'Website Design Company in India | Fast & SEO-Ready – AI Mazdoor',
    metaDescription:
      'Custom website design & development for Indian businesses — mobile-first, lightning-fast and SEO-ready, with WhatsApp leads built in. Free consultation.',
    intro:
      'Website sirf dikhne ke liye nahi, bechne ke liye hoti hai. We design and build custom, mobile-first websites that load fast, show up on Google and make it effortless for customers to call, WhatsApp or buy.',
    serviceType: 'Website Design and Web Development',
    highlights: [
      { value: '< 2s', label: 'target load time' },
      { value: '90+', label: 'PageSpeed target' },
      { value: '7 days', label: 'to launch a starter site' },
    ],
    deliverables: [
      { title: 'Custom UI/UX design', text: 'Designed for your customers in Figma first — no recycled templates, no generic stock layouts.' },
      { title: 'Mobile-first build', text: 'Most Indian customers will see your site on a phone. We design for that screen first.' },
      { title: 'Speed optimised', text: 'Modern, lightweight code with optimised images and fonts, aiming for 90+ on Google PageSpeed.' },
      { title: 'SEO foundation', text: 'Clean structure, meta tags, schema markup, sitemap and Google Search Console set up from day one.' },
      { title: 'Leads built in', text: 'Click-to-WhatsApp, click-to-call and enquiry forms that land straight in your inbox or CRM.' },
      { title: 'Easy to update', text: 'Change text, prices and photos yourself — plus 30 days of free support after launch.' },
    ],
    useCasesTitle: 'Websites we build',
    useCases: [
      { title: 'Business websites', hi: 'बिज़नेस', text: 'A complete online home for your company, services and team.' },
      { title: 'Landing pages', hi: 'लैंडिंग', text: 'Single-focus pages for ads and campaigns that convert clicks into leads.' },
      { title: 'E-commerce stores', hi: 'ऑनलाइन दुकान', text: 'Shopify or custom stores with UPI, cards and COD payments.' },
      { title: 'Clinics & services', hi: 'अपॉइंटमेंट', text: 'Websites with online booking, reviews and Google Maps built in.' },
      { title: 'Portfolios', hi: 'पोर्टफ़ोलियो', text: 'Showcase sites for architects, photographers, creators and consultants.' },
      { title: 'Web apps', hi: 'वेब ऐप', text: 'Dashboards, portals and booking tools when a simple site is not enough.' },
    ],
    process: [
      { hi: 'खोज', title: 'Discovery', text: 'We learn your business goals, customers and competitors, then plan the pages and content.' },
      { hi: 'ढाँचा', title: 'Wireframe', text: 'A simple blueprint of every page so structure and flow are agreed before design begins.' },
      { hi: 'डिज़ाइन', title: 'Design', text: 'Pixel-perfect designs for mobile and desktop. You review and request changes in Figma.' },
      { hi: 'डेवलप', title: 'Build & test', text: 'We develop, optimise for speed and SEO, and test on real phones and browsers.' },
      { hi: 'लॉन्च', title: 'Launch & grow', text: 'Go live on your domain, connect Google tools, train you on updates and support you for 30 days.' },
    ],
    faqs: [
      { q: 'How long does it take to build a website?', a: 'A 5-page business website usually goes live in 7–10 working days. Larger websites and e-commerce stores take 3–6 weeks. You get a clear timeline before we start.' },
      { q: 'Will my website show up on Google?', a: 'Every site we build is SEO-ready: fast loading, proper headings, meta tags, schema markup, sitemap and Search Console setup. Ranking for competitive keywords takes consistent content and time — our monthly SEO service helps with that.' },
      { q: 'Do I need to buy a domain and hosting?', a: 'We help you buy the domain in your own name. Most of our websites run on fast global hosting (like Vercel, Netlify or Cloudflare) that is free or very low-cost for small businesses.' },
      { q: 'Can I update the website myself?', a: 'Yes. We can set up an easy editor for text, images and blog posts, and record a short training video for your team.' },
      { q: 'Do you offer website maintenance?', a: 'Yes. After the free 30-day support, you can choose a monthly care plan for updates, backups, security and small changes.' },
    ],
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    nameHi: 'AI ऑटोमेशन',
    label: 'AI Automation & WhatsApp Bots',
    short: 'WhatsApp bots, AI assistants and smart workflows that reply, follow up and report — 24×7, in Hindi & English.',
    displayHi: 'मेहनत का काम, AI के नाम।',
    h1: 'AI automation & WhatsApp bots that work 24×7 for your business',
    metaTitle: 'AI Automation Agency in India | WhatsApp Chatbots – AI Mazdoor',
    metaDescription:
      'AI automation for Indian businesses: WhatsApp chatbots, AI assistants, lead capture and auto follow-ups that work 24×7 in Hindi & English. Free automation audit.',
    intro:
      'Roz ke repeat kaam — enquiries ka jawab, leads note karna, follow-up, reminders — ab AI karega. We build AI “digital workers” that plug into WhatsApp, your website and the tools you already use, so your team can focus on closing deals.',
    serviceType: 'AI Automation, Chatbot Development and Workflow Automation',
    highlights: [
      { value: '24×7', label: 'replies, even on Sundays' },
      { value: 'हिंदी + EN', label: 'Hinglish understood' },
      { value: '2–3 wks', label: 'typical go-live' },
    ],
    deliverables: [
      { title: 'WhatsApp AI chatbot', text: 'Official WhatsApp Business API bot that answers questions, shares prices and books appointments.' },
      { title: 'AI website assistant', text: 'A chat assistant trained on your services, FAQs and policies — answers like your best salesperson.' },
      { title: 'Lead capture → CRM', text: 'Every name, number and requirement saved automatically to Google Sheets, Zoho, HubSpot or your CRM.' },
      { title: 'Auto follow-ups', text: 'Reminders, quotes and payment links sent at the right time, so no lead goes cold.' },
      { title: 'Document automation', text: 'Invoices, quotations and reports generated and shared without anyone copy-pasting.' },
      { title: 'Daily WhatsApp reports', text: 'A morning summary of leads, bookings, sales and pending follow-ups, sent to the owner.' },
    ],
    useCasesTitle: 'Where AI saves the most time',
    useCases: [
      { title: 'Clinics & hospitals', hi: 'क्लिनिक', text: 'Appointment booking, reminders and report sharing on WhatsApp.' },
      { title: 'Coaching & schools', hi: 'कोचिंग', text: 'Admission enquiries, fee reminders and demo-class bookings.' },
      { title: 'Real estate', hi: 'प्रॉपर्टी', text: 'Qualify buyers, share brochures and schedule site visits automatically.' },
      { title: 'Restaurants', hi: 'रेस्टोरेंट', text: 'Table bookings, menu sharing and direct WhatsApp orders.' },
      { title: 'E-commerce', hi: 'ई-कॉमर्स', text: 'Order status, COD confirmation and abandoned-cart recovery.' },
      { title: 'Manufacturers & B2B', hi: 'B2B', text: 'Dealer orders, quotations and dispatch updates without phone tag.' },
    ],
    process: [
      { hi: 'ऑडिट', title: 'Find the repeat work', text: 'We sit with your team and list every task that is repetitive, slow or error-prone.' },
      { hi: 'नक़्शा', title: 'Map the flow', text: 'A simple diagram of what the AI will do, when a human steps in, and what gets saved where.' },
      { hi: 'बनाना', title: 'Build & train', text: 'We build the bot or workflow and train it on your real questions, prices and policies.' },
      { hi: 'टेस्ट', title: 'Test with real chats', text: 'Your team tests it with real scenarios in Hindi, English and Hinglish before customers see it.' },
      { hi: 'लाइव', title: 'Go live & improve', text: 'Launch, monitor conversations and keep improving answers every week of the first month.' },
    ],
    faqs: [
      { q: 'Will AI replace my staff?', a: 'No. AI takes over the repetitive part — answering the same questions, data entry, reminders — so your team spends time on customers and sales. Complex or sensitive chats are always handed to a human.' },
      { q: 'Does the bot understand Hindi and Hinglish?', a: 'Yes. Our bots understand Hindi, English and mixed Hinglish messages like “kal 4 baje slot milega?”, and reply in the customer’s language.' },
      { q: 'Do I need the WhatsApp Business API?', a: 'For a full WhatsApp bot, yes — and we handle the complete setup and verification for you. For simple needs, we can start with a website chat assistant.' },
      { q: 'What are the monthly running costs?', a: 'There is a small monthly cost for WhatsApp conversations (charged by Meta) and AI usage, which depends on your message volume. We estimate it upfront so there are no surprises; most small businesses spend less than a part-time helper’s salary.' },
      { q: 'Is my customer data safe?', a: 'Your data stays in your own accounts — your WhatsApp, your Google Sheet, your CRM. We never sell or reuse it, and access is removed whenever you ask.' },
      { q: 'What happens if the bot does not know an answer?', a: 'It politely tells the customer that a team member will reply, and instantly alerts your staff with the full chat — no customer is left hanging.' },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;

// "AI Automation" → "AI automation", "Logo Design" → "logo design" (keeps the acronym)
export const lower = (name: string) => name.replace(/\b(?!AI\b)\w+/g, (w) => w.toLowerCase());

export const homeFaqs: Faq[] = [
  { q: 'What services does AI Mazdoor offer?', a: 'We offer three core services: logo design & brand identity, website design & development, and AI automation (WhatsApp chatbots, AI assistants and workflow automation). Many clients take all three as one package.' },
  { q: 'How much will my project cost?', a: 'Every business needs something different, so we do not use one-size-fits-all price lists. After a free 20-minute call, you get a fixed written quote with scope and timeline — no hidden charges.' },
  { q: 'Do you work with small businesses and startups?', a: 'Yes — most of our clients are small and growing Indian businesses: shops, clinics, coaching institutes, restaurants, D2C brands and startups.' },
  { q: 'Can we talk in Hindi?', a: 'Bilkul! Calls, WhatsApp chats and documentation in Hindi, English or Hinglish — whatever you are comfortable with.' },
  { q: 'Do you work with clients outside my city?', a: 'Yes. We work remotely with businesses across India and abroad over WhatsApp, Google Meet and phone calls.' },
  { q: 'What do you need from me to start?', a: 'Just a 20-minute call. We will ask about your business, customers and goals, then send a written plan, quote and timeline within 24 hours.' },
];
