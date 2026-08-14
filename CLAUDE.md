# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server at http://localhost:3000
npm run build            # Production build
npm run start            # Run production build
npm run lint             # ESLint (flat config)
```

Sanity Studio is embedded at `/studio` route (no separate server needed).

## Architecture

**Stack**: Next.js 16 (App Router) + Tailwind CSS 4 + Sanity CMS + Resend (email) + Vercel

**Content flow**:
- Sanity CMS → `src/sanity/queries.ts` (GROQ) → `sanityFetch()` → pages
- When Sanity isn't configured (`isSanityConfigured === false`), `src/lib/fallback.ts` provides placeholder content
- ISR with 5-minute revalidation (`sanityFetch` default, configurable per query)
- `sanityFetch()` returns `null` when Sanity unavailable; pages handle graceful degradation

**Key files**:
- `src/lib/site.ts` — Site metadata (name, URL, email, keywords)
- `src/lib/types.ts` — TypeScript interfaces for CMS content (Project, AboutContent, SiteSettings)
- `src/sanity/client.ts` — Sanity client with graceful fallback when unconfigured
- `src/sanity/env.ts` — `isSanityConfigured` flag based on env vars

**Path alias**: `@/*` → `./src/*`

## Sanity Schema

Schemas in `src/sanity/schemaTypes/`:
- `project` — Portfolio items (title, slug, summary, coverImage, body, tags, featured)
- `aboutPage` — Singleton for /about (heading, intro, body, portrait, skills)
- `siteSettings` — Singleton for global config

## Brand & Styling

- **Colors**: `lake-*` CSS variable palette in `src/app/globals.css`
- **Logo**: `src/components/Logo.tsx` (React component), `src/app/icon.svg` (favicon), `public/logo.svg` (full lockup)
- **Site metadata**: `src/lib/site.ts` (name, domain, email, description, keywords)
- **Tailwind**: Version 4 with CSS-first configuration

## SEO/GEO Considerations

This is a public marketing site with extensive SEO setup:

- JSON-LD structured data in layout (ProfessionalService, WebSite) and per-page
- Dynamic sitemap at `/sitemap.xml`
- `robots.ts` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot), blocks training crawlers
- `public/llms.txt` for LLM search visibility
- Dynamic OG images via `opengraph-image.tsx`

## Environment Variables

See `.env.example` for template. Required for full functionality:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID    # From sanity.io/manage
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY                   # From resend.com/api-keys
CONTACT_TO_EMAIL                 # Where contact form sends to
CONTACT_FROM_EMAIL               # Optional, defaults to onboarding@resend.dev
```

Site works with placeholder content when Sanity env vars are missing. Contact form requires Resend vars.
