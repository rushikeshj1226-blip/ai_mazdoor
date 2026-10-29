import type { APIRoute } from 'astro';

// Search Console suggests /sitemap.xml by default; serve a sitemap index there that points
// to the sitemap @astrojs/sitemap generates, so either URL works.
export const GET: APIRoute = ({ site }) => {
  const loc = new URL('/sitemap-0.xml', site).href;
  const xml = `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${loc}</loc></sitemap></sitemapindex>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
