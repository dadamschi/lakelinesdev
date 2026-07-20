import type { PortableTextBlock } from "@portabletext/types";

export interface SanityImage {
  asset?: { _ref?: string; _id?: string; url?: string };
  alt?: string;
  [key: string]: unknown;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  client?: string;
  year?: number;
  tags?: string[];
  projectUrl?: string;
  coverImage?: SanityImage | null;
  body?: PortableTextBlock[] | null;
  featured?: boolean;
  /** CSS gradient classes used for placeholder art when no image exists */
  gradient?: string;
}

export interface AboutContent {
  heading: string;
  intro: string;
  body?: PortableTextBlock[] | null;
  portrait?: SanityImage | null;
  skills?: string[];
}

export interface SiteSettings {
  siteTitle?: string;
  description?: string;
  email?: string;
  socialLinks?: { label: string; url: string }[];
}
