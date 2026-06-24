import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, getProject, STATUS_LABEL } from "@/lib/projects";
import { Metrics } from "@/components/Metrics";
import { site } from "@/lib/site";

// Fully static: only known slugs are built; anything else 404s.
export const dynamicParams = false;

// Case-study body resolved by slug from content/<slug>.mdx — no per-project
// wiring here. A missing MDX degrades to the fallback rather than crashing.
async function loadBody(slug: string): Promise<React.ComponentType | null> {
  try {
    const mod = await import(`../../../content/${slug}.mdx`);
    return mod.default as React.ComponentType;
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — ${site.name}`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Body = await loadBody(slug);

  return (
    <article className="mx-auto max-w-shell px-6 py-section">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} />
        Selected work
      </Link>

      <header className="mt-8 border-b border-line pb-10">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            project.status === "live"
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-line text-ink-muted"
          }`}
        >
          {STATUS_LABEL[project.status]}
        </span>
        <h1 className="mt-4 font-display text-display-lg font-medium text-ink">
          {project.name}
        </h1>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink">
          {project.tagline}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-ink-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-espresso px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-espresso/90"
            >
              Live demo
              <ArrowUpRight size={15} />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink-faint/50 hover:bg-ink/[0.04]"
            >
              Source code
              <ArrowUpRight size={15} className="text-ink-muted" />
            </a>
          ) : (
            <span className="inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm text-ink-faint">
              Repo — coming soon
            </span>
          )}
        </div>

        <Metrics metrics={project.metrics} status={project.status} />
      </header>

      <div className="mt-12 space-y-14 md:mt-16 md:space-y-16">
        {Body ? <Body /> : <p className="text-ink-muted">Writeup coming soon.</p>}
      </div>
    </article>
  );
}
