import Link from "next/link";
import { site } from "@/lib/site";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-stone-200/70 bg-stone-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <LogoMark className="h-9 w-9" />
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {`${site.name} — websites for realtors & home builders, plus HubSpot automation and SEO consulting that turn traffic into leads.`}
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="text-stone-700 hover:text-lake-700" href="/">Home</Link></li>
            <li><Link className="text-stone-700 hover:text-lake-700" href="/about">About</Link></li>
            <li><Link className="text-stone-700 hover:text-lake-700" href="/portfolio">Portfolio</Link></li>
            <li><Link className="text-stone-700 hover:text-lake-700" href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Get in touch
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-stone-700 hover:text-lake-700" href="/contact">
                Contact form →
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200/70">
        <p className="mx-auto max-w-5xl px-5 py-5 text-xs text-stone-500">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
