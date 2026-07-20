import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? imageUrlBuilder({ projectId, dataset })
  : null;

/** Build a Sanity image URL. Returns null if Sanity isn't configured or the image is empty. */
export function urlFor(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  try {
    return builder.image(source).auto("format").fit("max");
  } catch {
    return null;
  }
}
