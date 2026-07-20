import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { Project } from "@/lib/types";
import { LogoMark } from "./Logo";

export function ProjectCard({ project }: { project: Project }) {
  const imageUrl = urlFor(project.coverImage)?.width(900).height(600).url();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white transition-shadow hover:shadow-lg hover:shadow-stone-200/60">
      <div className="relative aspect-[3/2] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.coverImage?.alt ?? project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
              project.gradient ?? "from-lake-300 via-lake-500 to-lake-800"
            }`}
          >
            <LogoMark
              className="h-16 w-16 opacity-40"
              lColor="#ffffff"
              rippleColor="#ffffff"
            />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-stone-900">
            <Link
              href={`/portfolio/${project.slug}`}
              className="after:absolute after:inset-0"
            >
              {project.title}
            </Link>
          </h3>
          {project.year && (
            <span className="shrink-0 text-xs text-stone-400">
              {project.year}
            </span>
          )}
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-stone-600">
          {project.summary}
        </p>
        {project.tags && project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Project tags">
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
      </div>
    </article>
  );
}
