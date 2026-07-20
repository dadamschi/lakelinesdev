import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/ProjectCard";
import { fallbackProjects } from "@/lib/fallback";
import { site } from "@/lib/site";
import type { Project } from "@/lib/types";
import { sanityFetch } from "@/sanity/client";
import { allProjectsQuery } from "@/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Selected work by ${site.name} — realtor and home builder websites, HubSpot automation projects, and SEO engagements.`,
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects =
    (await sanityFetch<Project[]>(allProjectsQuery)) ?? fallbackProjects;
  const list = projects.length > 0 ? projects : fallbackProjects;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}/portfolio#webpage`,
    url: `${site.url}/portfolio`,
    name: `Portfolio — ${site.name}`,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: list.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/portfolio/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-lake-600">
          Portfolio
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Selected work
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-stone-600">
          Recent websites for realtors and builders, HubSpot automation
          buildouts, and SEO engagements — each with performance and search
          visibility baked in from day one.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </>
  );
}
