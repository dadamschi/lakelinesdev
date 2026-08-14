import type { AboutContent, Project } from "./types";

/**
 * Fallback content shown until Sanity is connected and populated.
 * Once NEXT_PUBLIC_SANITY_PROJECT_ID is set and documents are published,
 * this content is automatically replaced by CMS content.
 */

export const fallbackProjects: Project[] = [
  {
    _id: "fallback-1",
    title: "PorterGoldberg Residential",
    slug: "portergoldberg-residential",
    summary:
      "A listings-forward website for a boutique real estate team, agent bios, and local SEO that put them at the top of neighborhood searches.",
    client: "PorterGoldberg Residential",
    year: 2026,
    tags: ["Realtor Website", "Local SEO", "Lead Capture", "Hubspot Automation", "Hubspot Email"],
    coverImage: null,
    gradient: "from-lake-300 via-lake-500 to-lake-800",
    featured: true,
  },
  {
    _id: "fallback-2",
    title: "Homescape Construction",
    slug: "homescape-construction",
    summary:
      "A portfolio-driven site for a custom home builder — project galleries, process pages, and FAQs that pre-qualify leads before the first phone call.",
    client: "Granite Ridge Custom Homes",
    year: 2025,
    tags: ["Home Builder", "Portfolio Site", "SEO"],
    coverImage: null,
    gradient: "from-stone-300 via-lake-400 to-lake-700",
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
    "CMS integration",
  ],
  body: null,
  portrait: null,
};
