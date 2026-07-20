import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about a realtor or builder website, HubSpot automation, or SEO consulting. We reply within one business day.`,
  alternates: { canonical: "/contact" },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${site.url}/contact#webpage`,
  url: `${site.url}/contact`,
  name: `Contact — ${site.name}`,
  isPartOf: { "@id": `${site.url}/#website` },
  about: { "@id": `${site.url}/#organization` },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactJsonLd} />
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-lake-600">
          Contact
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Tell us about your project
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-stone-600">
          Whether you need a new website for your real estate or construction
          business, help with HubSpot, or an SEO strategy that actually moves
          the needle — we&apos;d love to hear from you. Fill out the form and
          we&apos;ll reply within one business day.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[3fr_2fr]">
          <ContactForm />

          <aside className="space-y-8">
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                Prefer email?
              </h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block font-medium text-lake-700 hover:text-lake-800"
              >
                {site.email}
              </a>
            </div>
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
                What happens next?
              </h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">
                <li className="flex gap-3">
                  <span className="font-semibold text-lake-600">1.</span>
                  We reply within one business day with any questions.
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-lake-600">2.</span>
                  We hop on a short call to talk scope, timeline, and budget.
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-lake-600">3.</span>
                  You get a clear proposal — no surprises, no jargon.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
