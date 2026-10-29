# AI Mazdoor — Agency Website

Marketing website for **AI Mazdoor** (एआई मज़दूर): logo design, website design and AI automation for Indian businesses. Bilingual Hindi + English copy, orange brand, minimalist "hard-shadow" design with lightweight animation.

Built with **Astro 7** (static HTML, near-zero JS), **Tailwind CSS 4**, self-hosted variable fonts (Bricolage Grotesque + Baloo 2 for Devanagari).

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
npm run preview    # serve the production build
npm run og         # regenerate favicons, app icons and the OG share image
node scripts/price-list.mjs   # rebuild the client price-list PDF → print/ (prices live at the top of the script)
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — hero with live AI-bot demo, problem, services bento, process, AI section with time-saved calculator, work, promises, FAQ, contact |
| `/services` | All services + add-ons |
| `/services/logo-design` · `/website-design` · `/ai-automation` | Service pages (deliverables, use cases, process, FAQ) — generated from `src/data/services.ts` |
| `/work` | Portfolio with filters — **currently hidden** (see `showWork` below) |
| `/about` · `/contact` · `/privacy` · `/blog` · `/blog/*` · `/404` | — |

The site intentionally shows **no prices** — every enquiry gets a quote after a free call.

## Before going live — replace placeholders

1. **Domain** — `SITE_URL` in `astro.config.mjs`, `url` in `src/data/site.ts`, and the `Sitemap:` line in `public/robots.txt`.
2. **Contact details** — phone, WhatsApp number, email, hours and social links in `src/data/site.ts`.
3. **Timelines, deliverables and FAQs** — `src/data/services.ts` (these are sensible starting points, not commitments).
4. **Portfolio** — hidden for now via `showWork: false` in `src/data/site.ts` (removes the Work page, its menu/footer links and the home Work section). `src/data/work.ts` still holds *concept* projects: replace them with real client work, set `concept: false`, then set `showWork: true`.
5. **Contact form** — by default it opens WhatsApp with the enquiry pre-filled. To receive leads by email instead, paste a Formspree / Web3Forms endpoint into `formEndpoint` in `src/data/site.ts`.
6. Re-run `npm run og` if you change the domain or tagline shown on the share image.

## SEO built in

- Unique `<title>` + meta description per page, canonical URLs, Open Graph + Twitter cards, 1200×630 OG image
- JSON-LD: `ProfessionalService` (every page), `WebSite`, `Service` with deliverables catalog, `FAQPage`, `BreadcrumbList`, `Blog` / `BlogPosting`, `AboutPage`, `ContactPage`
- `sitemap-index.xml`, `robots.txt`, RSS feed (`/rss.xml`), web manifest, favicons
- One `<h1>` per page, semantic sections, `lang="hi"` on Devanagari text, accessible labels, skip link
- Hinglish keyword-friendly blog posts in `src/content/blog/` — add more Markdown files there to grow organic traffic

## Performance

- Static HTML, CSS inlined (no render-blocking requests), ~2.5 KB shared JS
- Variable fonts self-hosted and preloaded; Devanagari only downloads when needed
- No images on the critical path — illustrations are SVG/CSS
- Animations respect `prefers-reduced-motion`; content stays visible without JavaScript

## Modern platform features used

- Cross-document **View Transitions** for smooth page changes
- **Popover API** for the mobile menu (no JS framework)
- **Scroll-driven animations** for the reading-progress bar
- `::details-content` + `interpolate-size` for smooth FAQ accordions

## Deploy

Works on any static host. `vercel.json` (Vercel) and `public/_headers` (Netlify / Cloudflare Pages) include caching and security headers. Build command `npm run build`, output directory `dist`.
