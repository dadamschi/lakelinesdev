# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
npm run lint     # ESLint (flat config)
```

Sanity Studio is embedded at `/studio` (no separate server needed).

## Architecture

**Stack**: Next.js 16 (App Router) + Tailwind CSS 4 + Sanity CMS + Resend (email) + Vercel

**Content flow**:
- Sanity CMS → `src/sanity/queries.ts` (GROQ) → `sanityFetch()` → pages
- When Sanity isn't configured, `src/lib/fallback.ts` provides placeholder content
- ISR with 5-minute revalidation (`sanityFetch` default)

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

## SEO/GEO Considerations

This is a public marketing site with extensive SEO setup:
- JSON-LD structured data in layout (ProfessionalService, WebSite) and per-page
- Dynamic sitemap at `/sitemap.xml`
- `robots.ts` allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot), blocks training crawlers
- `public/llms.txt` for LLM search visibility
- Dynamic OG images via `opengraph-image.tsx`

## Environment Variables

Required for full functionality:
```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL  # optional, defaults to onboarding@resend.dev
```

Site works with placeholders when Sanity env vars are missing.
