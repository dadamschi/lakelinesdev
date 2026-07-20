import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

/**
 * Fetch from Sanity with graceful fallback.
 * Returns `null` when Sanity is not configured (or a query fails),
 * so pages can fall back to built-in placeholder content.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  revalidate = 300
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate },
    });
  } catch (err) {
    console.error("[sanity] fetch failed:", err);
    return null;
  }
}
