import type { APIRoute } from 'astro';
import { getPosts } from '@/utils/blog';
import { site } from '@/data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const items = posts
    .map(
      (p) => `
    <item>
      <title>${esc(p.data.title)}</title>
      <link>${site.url}/blog/${p.id}</link>
      <guid isPermaLink="true">${site.url}/blog/${p.id}</guid>
      <description>${esc(p.data.description)}</description>
      <category>${esc(p.data.category)}</category>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} Blog</title>
    <link>${site.url}/blog</link>
    <description>${esc('Practical guides on logo design, website design and AI automation for Indian businesses.')}</description>
    <language>en-in</language>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
