import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LogoMark } from "@/components/Logo";
import { ProjectCard } from "@/components/ProjectCard";
import { fallbackProjects } from "@/lib/fallback";
import { site } from "@/lib/site";
import type { Project } from "@/lib/types";
import { sanityFetch } from "@/sanity/client";
import { featuredProjectsQuery } from "@/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const services = [
  {
    title: "Realtor & builder websites",
    description:
      "Custom websites for real estate agents, home builders, and contractors — listings, project galleries, and lead capture built in from day one.",
  },
  {
    title: "HubSpot automation & consulting",
    description:
      "CRM setup, lead routing, follow-up sequences, and pipeline reporting — so every inquiry gets a fast response and nothing falls through the cracks.",
  },
  {
    title: "SEO consultancy",
    description:
      "Technical audits, local SEO, structured data, and content strategy so search engines and AI assistants find and recommend your business.",
  },
];

const faqs = [
  {
    question: "What does Lakelines Dev do?",
    answer:
      "Lakelines Dev builds custom websites for realtors, home builders, and construction companies, and provides HubSpot automation, HubSpot consulting, and SEO consultancy. One studio for the website, the CRM behind it, and the search strategy that drives traffic to it.",
  },
  {
    question: "Who are your websites for?",
    answer:
      "Primarily the housing industry: real estate agents and teams, custom home builders, remodelers, and construction companies. The same approach — fast pages, clear calls to action, strong local SEO — works for any service business that lives on leads.",
  },
  {
    question: "What does HubSpot consulting include?",
    answer:
      "CRM setup and cleanup, lead capture and routing, automated follow-up sequences, quote and pipeline workflows, and reporting dashboards. We can build your HubSpot from scratch or untangle an existing portal.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "Most realtor and builder websites take 2–6 weeks from kickoff to launch, depending on scope. HubSpot automation projects typically run 1–3 weeks. SEO consulting is ongoing or delivered as a one-time audit.",
  },
  {
    question: "Can I update the website myself after launch?",
    answer:
      "Yes. Every site we build includes a content management system (Sanity), so you can edit text, swap photos, and add listings or projects without touching code.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Use the <a href='/contact'>contact form</a> to tell us about your project. We reply within one business day with questions or a ballpark estimate.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default async function HomePage() {
  const projects =
    (await sanityFetch<Project[]>(featuredProjectsQuery)) ?? fallbackProjects;
  const featured = projects.length > 0 ? projects.slice(0, 3) : fallbackProjects;

  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-gradient-to-b from-lake-50 to-transparent"
        />
        <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-20 sm:pb-28 sm:pt-28">
          <LogoMark className="h-14 w-14" />
          <h1 className="mt-8 max-w-2xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Websites and marketing systems that win you clients.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">
            {site.name} builds fast, search-friendly websites for realtors and
            home construction companies — backed by HubSpot automation and SEO
            consulting that turn traffic into leads.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-lake-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-lake-700"
            >
              Start a project
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-lake-500 hover:text-lake-800"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        aria-labelledby="services-heading"
        className="mx-auto max-w-5xl px-5 py-16"
      >
        <h2
          id="services-heading"
          className="text-2xl font-semibold tracking-tight text-stone-900"
        >
          What we do
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-stone-200/80 bg-white p-6"
            >
              <h3 className="font-semibold text-lake-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section
        aria-labelledby="work-heading"
        className="mx-auto max-w-5xl px-5 py-16"
      >
        <div className="flex items-end justify-between">
          <h2
            id="work-heading"
            className="text-2xl font-semibold tracking-tight text-stone-900"
          >
            Selected work
          </h2>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-lake-700 hover:text-lake-800"
          >
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      {/* FAQ (AEO) */}
      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-5xl px-5 py-16"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight text-stone-900"
        >
          Frequently asked questions
        </h2>
        <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="font-medium text-stone-900">{f.question}</dt>
              <dd
                className="mt-2 text-sm leading-relaxed text-stone-600 [&_a]:text-lake-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-lake-800"
                dangerouslySetInnerHTML={{ __html: f.answer }}
              />
            </div>
          ))}
        </dl>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-24 pt-8">
        <div className="rounded-3xl bg-lake-950 px-8 py-12 text-center sm:px-12 sm:py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-lake-200">
            Tell us what you&apos;re building. We&apos;ll reply within one
            business day.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-medium text-lake-950 transition-colors hover:bg-lake-100"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
