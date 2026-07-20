import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { JsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/Logo";
import { fallbackProjects } from "@/lib/fallback";
import { site } from "@/lib/site";
import type { Project } from "@/lib/types";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { projectBySlugQuery, projectSlugsQuery } from "@/sanity/queries";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string): Promise<Project | null> {
  const fromSanity = await sanityFetch<Project>(projectBySlugQuery, { slug });
  if (fromSanity) return fromSanity;
  return fallbackProjects.find((p) => p.slug === slug) ?? null;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(projectSlugsQuery);
  const list = slugs && slugs.length > 0 ? slugs : fallbackProjects.map((p) => p.slug);
  return list.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  const imageUrl = urlFor(project.coverImage)?.width(1200).height(630).url();

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      type: "article",
      url: `${site.url}/portfolio/${project.slug}`,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const imageUrl = urlFor(project.coverImage)?.width(1600).height(900).url();

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${site.url}/portfolio/${project.slug}#work`,
    name: project.title,
    description: project.summary,
    url: `${site.url}/portfolio/${project.slug}`,
    creator: { "@id": `${site.url}/#organization` },
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    ...(project.tags ? { keywords: project.tags.join(", ") } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${site.url}/portfolio`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${site.url}/portfolio/${project.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-lake-700">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/portfolio" className="hover:text-lake-700">
                Portfolio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-stone-800">
              {project.title}
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            {project.summary}
          </p>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {project.client && (
              <div>
                <dt className="font-medium text-stone-500">Client</dt>
                <dd className="mt-0.5 text-stone-800">{project.client}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt className="font-medium text-stone-500">Year</dt>
                <dd className="mt-0.5 text-stone-800">{project.year}</dd>
              </div>
            )}
            {project.projectUrl && (
              <div>
                <dt className="font-medium text-stone-500">Live site</dt>
                <dd className="mt-0.5">
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lake-700 hover:text-lake-800"
                  >
                    Visit ↗
                  </a>
                </dd>
              </div>
            )}
          </dl>
          {project.tags && project.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Project tags">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-lake-50 px-2.5 py-1 text-xs font-medium text-lake-800"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.coverImage?.alt ?? project.title}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
                project.gradient ?? "from-lake-300 via-lake-500 to-lake-800"
              }`}
            >
              <LogoMark
                className="h-24 w-24 opacity-40"
                lColor="#ffffff"
                rippleColor="#ffffff"
              />
            </div>
          )}
        </div>

        {project.body ? (
          <div className="mt-12 max-w-2xl space-y-4 leading-relaxed text-stone-700">
            <PortableText value={project.body} />
          </div>
        ) : (
          <div className="mt-12 max-w-2xl space-y-4 leading-relaxed text-stone-700">
            <p>
              A full case study for this project is coming soon. In the
              meantime, the summary above covers the scope — and we&apos;re
              happy to talk through the details.
            </p>
          </div>
        )}

        <div className="mt-14 flex flex-wrap gap-3 border-t border-stone-200/80 pt-10">
          <Link
            href="/contact"
            className="rounded-full bg-lake-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-lake-700"
          >
            Start a project like this
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-lake-500 hover:text-lake-800"
          >
            ← Back to portfolio
          </Link>
        </div>
      </article>
    </>
  );
}
