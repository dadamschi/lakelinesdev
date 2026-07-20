import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Robots policy. Explicitly welcomes both traditional search crawlers and
 * AI/answer-engine crawlers (GEO/AEO) while keeping the CMS studio and API
 * routes out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/studio", "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // AI & answer-engine crawlers — explicitly allowed for GEO/AEO
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "Bytespider", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
