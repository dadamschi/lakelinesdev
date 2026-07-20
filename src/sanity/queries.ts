import { groq } from "next-sanity";

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  summary,
  client,
  year,
  tags,
  projectUrl,
  coverImage{ ..., "alt": coalesce(alt, ^.title) },
  featured
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(coalesce(order, 999) asc, year desc) {
    ${projectFields}
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(coalesce(order, 999) asc, year desc) [0...3] {
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields},
    body
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const aboutQuery = groq`
  *[_type == "aboutPage"][0] {
    heading,
    intro,
    body,
    portrait{ ..., "alt": coalesce(alt, "Portrait") },
    skills
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    description,
    email,
    socialLinks
  }
`;
