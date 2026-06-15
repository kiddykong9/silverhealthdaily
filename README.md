# Silver Health Daily

SEO-first health content site for adults 50+, built for ad monetization (Google AdSense and beyond).

**Live domain:** [silverhealthdaily.com](https://silverhealthdaily.com)

## Stack

- [Astro](https://astro.build) — static site, fast Core Web Vitals
- Tailwind CSS v4
- MDX content collections
- Sitemap + RSS feed

## Quick start

```bash
cd silverhealthdaily
npm install
npm run dev
```

Open `http://localhost:4321`.

## Deploy (recommended: Cloudflare Pages or Vercel)

1. Push this folder to GitHub.
2. Connect the repo to [Cloudflare Pages](https://pages.cloudflare.com) or [Vercel](https://vercel.com).
3. Build command: `npm run build`
4. Output directory: `dist`
5. Point `silverhealthdaily.com` DNS to the host (A/CNAME records).

## Enable ads (Google AdSense)

1. Apply at [google.com/adsense](https://www.google.com/adsense) once you have 15–20 articles and legal pages live.
2. After approval, copy your publisher ID (`ca-pub-XXXXXXXX`).
3. Set env var `PUBLIC_ADSENSE_CLIENT_ID` in your host dashboard (or `.env` locally).
4. Create ad units in AdSense and replace placeholder slot IDs in page `AdSlot` components.
5. Redeploy.

## Google Analytics 4

1. Create a property at [analytics.google.com](https://analytics.google.com).
2. Copy the Measurement ID (`G-XXXXXXXXXX`).
3. Set `PUBLIC_GA_MEASUREMENT_ID` in Vercel/Cloudflare env vars.
4. Redeploy. Analytics loads only after users accept cookies.

See **DEPLOY.md** for full hosting instructions.

## Add articles

Create a new `.mdx` file in `src/content/articles/` with frontmatter:

```yaml
---
title: "Your Title"
description: "Meta description for SEO"
category: nutrition  # nutrition | fitness | sleep | heart-health | brain-memory | wellness
publishDate: 2026-06-20
readTime: 6
featured: false
keywords: ["keyword one", "keyword two"]
---
```

## Growth checklist (serious project)

- [ ] Publish 30+ articles (aim for 1,500+ words on pillar topics)
- [ ] Submit sitemap in Google Search Console
- [ ] Apply for Google AdSense
- [ ] Add Google Analytics 4
- [ ] Build Pinterest pins for each article (huge traffic source for 50+ health)
- [ ] At 50k sessions/month, apply to Mediavine or AdThrive for higher RPM

## Medical disclaimer

Content is educational only. See `/disclaimer` on the live site.
