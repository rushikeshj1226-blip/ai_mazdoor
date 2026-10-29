// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Change this to your live domain before deploying — canonical URLs, sitemap and OG tags use it.
const SITE_URL = 'https://www.ai-mazdoor.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        if (url === SITE_URL) item.priority = 1.0;
        else if (url.includes('/services')) item.priority = 0.9;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
