// Showcase projects. These are concept projects that demonstrate our style —
// replace them with real client work (and set `concept: false`) as projects go live.
export type WorkTag = 'Logo' | 'Website' | 'AI';
export type Work = {
  title: string;
  titleHi?: string;
  sector: string;
  tags: WorkTag[];
  summary: string;
  outcome: string;
  mock: 'brand' | 'browser' | 'phone' | 'chat';
  bg: string;
  fg: string;
  accent: string;
  concept: boolean;
};

export const work: Work[] = [
  {
    title: 'Chai Kahani',
    titleHi: 'चाय कहानी',
    sector: 'Café chain · Brand identity',
    tags: ['Logo'],
    summary: 'A warm, bilingual identity for a kulhad-chai café — logo, cups, menu boards and Instagram kit.',
    outcome: 'One identity across 40+ touchpoints',
    mock: 'brand',
    bg: '#3a1d12',
    fg: '#fff3e6',
    accent: '#ff8a3d',
    concept: true,
  },
  {
    title: 'Sharma Dental Care',
    sector: 'Healthcare · Website + WhatsApp bot',
    tags: ['Website', 'AI'],
    summary: 'A calm, fast clinic website with a WhatsApp bot that books, confirms and reminds appointments.',
    outcome: 'Bookings handled 24×7 without a receptionist',
    mock: 'browser',
    bg: '#e3f3ef',
    fg: '#0b3b36',
    accent: '#0f766e',
    concept: true,
  },
  {
    title: 'Kisan Fresh',
    titleHi: 'किसान फ़्रेश',
    sector: 'D2C grocery · E-commerce',
    tags: ['Website', 'Logo'],
    summary: 'Farm-to-home store with UPI checkout, slot-based delivery and a friendly Hindi-English voice.',
    outcome: 'Mobile checkout in under 60 seconds',
    mock: 'phone',
    bg: '#ecf6dc',
    fg: '#1f3a10',
    accent: '#3f7d20',
    concept: true,
  },
  {
    title: 'Gupta Logistics',
    sector: 'B2B transport · AI automation',
    tags: ['AI'],
    summary: 'Dealers ask “mera maal kahan hai?” on WhatsApp — the bot answers with live dispatch status.',
    outcome: 'Status calls replaced by instant replies',
    mock: 'chat',
    bg: '#141210',
    fg: '#fff7f0',
    accent: '#ff5f15',
    concept: true,
  },
  {
    title: 'Vidya Coaching',
    sector: 'Education · Landing page + admissions bot',
    tags: ['Website', 'AI'],
    summary: 'An ad-ready landing page and an admissions assistant that books demo classes and sends fee reminders.',
    outcome: 'Every enquiry followed up automatically',
    mock: 'browser',
    bg: '#eceefe',
    fg: '#1e1b4b',
    accent: '#4338ca',
    concept: true,
  },
  {
    title: 'Noor Textiles',
    titleHi: 'नूर',
    sector: 'Fashion · Bilingual identity',
    tags: ['Logo'],
    summary: 'A graceful Devanagari + Latin wordmark for a handloom label, with tags, packaging and lookbook.',
    outcome: 'Premium shelf presence for a 30-year-old family label',
    mock: 'brand',
    bg: '#f8e8ef',
    fg: '#4a0a26',
    accent: '#9d174d',
    concept: true,
  },
];
