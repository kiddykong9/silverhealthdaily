# Deploy Silver Health Daily

Domain: **silverhealthdaily.com**

## Option A — Cloudflare Pages (recommended, free)

1. Create a GitHub repo and push this project (see below).
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo `silverhealthdaily`.
4. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. **Environment variables** (Settings → Environment variables):
   - `PUBLIC_GA_MEASUREMENT_ID` = your GA4 ID (e.g. `G-XXXXXXXXXX`)
   - `PUBLIC_ADSENSE_CLIENT_ID` = after AdSense approval
6. Deploy. Cloudflare gives you a `*.pages.dev` URL.
7. **Custom domain:** Pages project → **Custom domains** → add `silverhealthdaily.com` and `www.silverhealthdaily.com`.
8. If the domain is already on Cloudflare, DNS updates automatically. Otherwise add the CNAME Cloudflare shows at your registrar.

## Option B — Vercel (also free)

1. Push to GitHub.
2. [vercel.com/new](https://vercel.com/new) → Import repo.
3. Vercel auto-detects Astro. Confirm output `dist`.
4. Add env vars: `PUBLIC_GA_MEASUREMENT_ID`, `PUBLIC_ADSENSE_CLIENT_ID`.
5. Deploy → **Settings → Domains** → add `silverhealthdaily.com`.

## Push to GitHub (first time)

```powershell
cd C:\Users\Genti\silverhealthdaily
git init
git add .
git commit -m "Initial commit: Silver Health Daily ad-ready site"
```

On GitHub.com: **New repository** → name `silverhealthdaily` → don't add README.

```powershell
git remote add origin https://github.com/YOUR_USERNAME/silverhealthdaily.git
git branch -M main
git push -u origin main
```

## After deploy checklist

- [ ] Visit `https://silverhealthdaily.com` — confirm HTTPS works
- [ ] [Google Search Console](https://search.google.com/search-console) → add property → submit sitemap: `https://silverhealthdaily.com/sitemap-index.xml`
- [ ] [Google Analytics](https://analytics.google.com) → create GA4 property → copy Measurement ID → set env var → redeploy
- [ ] Test cookie banner → Accept → verify GA realtime users
- [ ] Apply for [AdSense](https://www.google.com/adsense) when 20+ articles are live

## Local preview

```powershell
npm run dev
```

Build production locally:

```powershell
npm run build
npm run preview
```
