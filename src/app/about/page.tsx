import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { JsonLd } from "@/components/JsonLd";
import { fallbackAbout } from "@/lib/fallback";
import { site } from "@/lib/site";
import type { AboutContent } from "@/lib/types";
import { sanityFetch } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { aboutQuery } from "@/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — an independent studio building websites for realtors and home construction companies, with HubSpot automation and SEO consulting.`,
  alternates: { canonical: "/about" },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${site.url}/about#webpage`,
  url: `${site.url}/about`,
  name: `About — ${site.name}`,
  isPartOf: { "@id": `${site.url}/#website` },
  about: { "@id": `${site.url}/#organization` },
};

export default async function AboutPage() {
  const about =
    (await sanityFetch<AboutContent>(aboutQuery)) ?? fallbackAbout;
  const portraitUrl = urlFor(about.portrait)?.width(800).height(1000).url();

  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-lake-600">
          About
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          {about.heading}
        </h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-stone-700">
              {about.intro}
            </p>

            {about.body ? (
              <div className="prose-headings:font-semibold prose-headings:tracking-tight mt-8 space-y-4 leading-relaxed text-stone-700">
                <PortableText value={about.body} />
              </div>
            ) : (
              <div className="mt-8 space-y-4 leading-relaxed text-stone-700">
                <p>
                  Every project starts with the same questions: who is this
                  site for, what should it help them do, and how will people
                  find it? For a realtor that might mean neighborhood pages
                  that rank locally; for a builder, a project gallery that
                  pre-qualifies leads before the first call. The answers shape
                  everything — the design, the words, the structure, and the
                  code.
                </p>
                <p>
                  A website is only half the system, though. We also work
                  inside HubSpot — setting up CRMs, lead routing, automated
                  follow-up, and reporting — so the inquiries your site
                  generates actually get answered, tracked, and closed. And as
                  SEO consultants, we make sure both the site and the content
                  strategy behind it keep earning traffic month after month.
                </p>
                <p>
                  We keep things intentionally small. You work directly with
                  the person doing the work, decisions get made quickly, and
                  because we build on modern foundations — Next.js, Sanity,
                  and Vercel — the sites we ship are fast, secure, and easy
                  for you to update yourself.
                </p>
              </div>
            )}

            <Link
              href="/contact"
              className="mt-10 inline-block rounded-full bg-lake-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-lake-700"
            >
              Work with us
            </Link>
          </div>

          <aside>
            {portraitUrl && (
              <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={portraitUrl}
                  alt={about.portrait?.alt ?? "Lakelines Dev studio"}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            {about.skills && about.skills.length > 0 && (
              <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                  What we&apos;re good at
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {about.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm text-stone-700"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-lake-500"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
