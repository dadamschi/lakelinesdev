import type { AboutContent, Project } from "./types";

/**
 * Fallback content shown until Sanity is connected and populated.
 * Once NEXT_PUBLIC_SANITY_PROJECT_ID is set and documents are published,
 * this content is automatically replaced by CMS content.
 */

export const fallbackProjects: Project[] = [
  {
    _id: "fallback-1",
    title: "Shorewood Realty Group",
    slug: "shorewood-realty",
    summary:
      "A listings-forward website for a boutique real estate team — IDX-ready property pages, agent bios, and local SEO that put them at the top of neighborhood searches.",
    client: "Shorewood Realty Group",
    year: 2026,
    tags: ["Realtor Website", "Local SEO", "Lead Capture"],
    coverImage: null,
    gradient: "from-lake-300 via-lake-500 to-lake-800",
    featured: true,
  },
  {
    _id: "fallback-2",
    title: "Granite Ridge Custom Homes",
    slug: "granite-ridge-homes",
    summary:
      "A portfolio-driven site for a custom home builder — project galleries, process pages, and financing FAQs that pre-qualify leads before the first phone call.",
    client: "Granite Ridge Custom Homes",
    year: 2025,
    tags: ["Home Builder", "Portfolio Site", "SEO"],
    coverImage: null,
    gradient: "from-stone-300 via-lake-400 to-lake-700",
    featured: true,
  },
  {
    _id: "fallback-3",
    title: "Lakeside Remodeling — HubSpot Buildout",
    slug: "lakeside-remodeling-hubspot",
    summary:
      "End-to-end HubSpot automation for a remodeling contractor — lead routing, quote follow-up sequences, and pipeline reporting that cut response time from days to minutes.",
    client: "Lakeside Remodeling",
    year: 2025,
    tags: ["HubSpot", "Automation", "CRM Consulting"],
    coverImage: null,
    gradient: "from-lake-200 via-lake-600 to-lake-950",
    featured: true,
  },
];

export const fallbackAbout: AboutContent = {
  heading: "A small studio with a simple promise: websites and systems that pull their weight.",
  intro:
    "Lakelines Dev is an independent studio focused on the housing industry. We build fast, search-friendly websites for realtors and home construction companies, and we set up the HubSpot automation and SEO strategy that turn those websites into a steady source of leads.",
  skills: [
    "Realtor & real estate websites",
    "Home builder & contractor websites",
    "HubSpot automation & consulting",
    "SEO consultancy",
    "Next.js & React development",
    "CMS integration (Sanity)",
  ],
  body: null,
  portrait: null,
};
