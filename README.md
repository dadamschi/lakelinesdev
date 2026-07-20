# Lakelines Dev — lakelinesdev.com

Portfolio site for Lakelines Dev: websites for realtors & home builders, HubSpot
automation & consulting, and SEO consultancy.

Built with **Next.js (App Router) + Tailwind CSS**, content managed in
**Sanity**, contact form delivered via **Resend**, deployed on **Vercel**.

## Quick start (local)

```bash
npm install
cp .env.example .env.local   # fill in the values (see below)
npm run dev                  # http://localhost:3000
```

The site works immediately with built-in placeholder content — Sanity and
Resend are optional until you're ready to connect them.

## 1. Connect Sanity (content & images)

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new
   project (free plan is fine). Use dataset name `production`.
2. Copy the **Project ID** into `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. In [manage → API → CORS origins](https://www.sanity.io/manage), add
   `http://localhost:3000` and `https://lakelinesdev.com` (allow credentials).
4. Restart `npm run dev` and open **http://localhost:3000/studio** — the
   embedded Sanity Studio. Log in and create:
   - **Site Settings** (title, description, email)
   - **About Page** (heading, intro, body, portrait, skills)
   - **Projects** (title, slug, summary, cover image, case study, tags…)

As soon as documents are published, they replace the placeholder content
site-wide (pages revalidate every 5 minutes in production). Mark up to three
projects as **Featured** to control the homepage grid.

## 2. Connect Resend (contact form)

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
2. Set in `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=dadams.chi@gmail.com
   ```
3. Optional but recommended: verify `lakelinesdev.com` in
   [resend.com/domains](https://resend.com/domains) (add the DNS records they
   give you), then set:
   ```
   CONTACT_FROM_EMAIL="Lakelines Dev <hello@lakelinesdev.com>"
   ```
   Until then the form sends from `onboarding@resend.dev`, which works for
   testing.

## 3. Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket).
2. Import the repo at [vercel.com/new](https://vercel.com/new) — Next.js is
   auto-detected, no build settings needed.
3. Add the same environment variables from `.env.local` in
   **Project → Settings → Environment Variables**.
4. Add `lakelinesdev.com` in **Project → Settings → Domains** and point your
   registrar's DNS at Vercel (they show the exact records).

## SEO / AEO / GEO — what's included

- **Metadata**: canonical URLs, per-page titles/descriptions via the Metadata
  API, `metadataBase` set to `https://lakelinesdev.com`.
- **Structured data (JSON-LD)**: `ProfessionalService` (with service offers),
  `WebSite`, `AboutPage`, `ContactPage`, `CollectionPage` + `ItemList`,
  `CreativeWork` + `BreadcrumbList` per project, and `FAQPage` on the homepage.
- **AEO**: homepage FAQ section written in question/answer form and marked up
  with `FAQPage` schema for featured snippets and voice/answer engines.
- **GEO**: `robots.txt` explicitly allows AI crawlers (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, etc.), plus `/llms.txt` summarizing the
  business for LLM-based search.
- **Sitemap**: `/sitemap.xml` auto-generated, includes CMS project slugs.
- **Open Graph / Twitter**: dynamic OG image at `/opengraph-image`, per-project
  OG images from Sanity covers.
- **Semantic HTML & a11y**: landmarks, single `h1` per page, breadcrumb nav,
  labeled forms, alt text driven from the CMS.
- **Performance**: static generation with 5-minute ISR, `next/image` with
  Sanity CDN, minimal client-side JS.

## Project structure

```
src/
  app/                 # pages (App Router)
    api/contact/       # Resend contact endpoint
    studio/            # embedded Sanity Studio (/studio)
    sitemap.ts         # sitemap.xml
    robots.ts          # robots.txt (AI crawlers welcomed)
    opengraph-image.tsx
  components/          # Header, Footer, Logo, ProjectCard, ContactForm…
  lib/                 # site config, types, placeholder content
  sanity/              # client, image builder, GROQ queries, schemas
sanity.config.ts       # Studio config
public/logo.svg        # full logo lockup
public/llms.txt        # GEO summary for AI search
```

## Editing the brand

- Colors: `lake-*` palette in `src/app/globals.css`
- Logo: `src/components/Logo.tsx` (React), `src/app/icon.svg` (favicon),
  `public/logo.svg` (lockup)
- Site name / email / description: `src/lib/site.ts`
