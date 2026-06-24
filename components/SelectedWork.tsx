"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Metrics } from "./Metrics";
import { orderedProjects, STATUS_LABEL, type Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function SelectedWork() {
  return (
    <section id="work" className="mx-auto max-w-shell scroll-mt-20 px-6 py-section">
      <SectionHeader
        eyebrow="Selected work"
        title="What I'm building"
        description="Machine-learning systems for finance, documented end to end — the problem, the approach, the tradeoffs, and honest results, including where they fall short."
      />

      <div className="mt-10 grid gap-6">
        {orderedProjects.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      <article
        className={cn(
          "card-lift group relative overflow-hidden rounded-xl border border-line bg-surface shadow-card hover:border-ink-faint/40",
          project.featured && "border-l-0", // left edge is the accent bar below
        )}
      >
        {project.featured ? (
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 z-10 w-1 bg-accent"
          />
        ) : null}

        {/* Static screenshot slot — never an iframe (Streamlit apps sleep + block framing). */}
        <div className="relative aspect-[16/9] w-full border-b border-line bg-wash">
          {project.screenshot ? (
            <Image
              src={project.screenshot}
              alt={project.screenshotAlt ?? `${project.name} screenshot`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1100px"
            />
          ) : (
            <div className="grid h-full place-items-center text-xs text-ink-faint">
              Screenshot — to be added
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-xl font-medium text-ink md:text-2xl">
                  {/* Stretched link — the ::after overlays the whole card. */}
                  <Link
                    href={`/work/${project.slug}`}
                    className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
                  >
                    {project.name}
                  </Link>
                </h3>
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                    project.status === "live"
                      ? "border-accent/30 bg-accent/10 text-accent"
                      : "border-line text-ink-muted",
                  )}
                >
                  {STATUS_LABEL[project.status]}
                </span>
              </div>

              <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
                {project.tagline}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-ink-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <Metrics metrics={project.metrics} status={project.status} />
            </div>

            <ArrowUpRight
              size={22}
              className="shrink-0 text-ink-faint transition-colors group-hover:text-accent"
            />
          </div>

          {/* Live demo pill — sits above the stretched link (z-10), so it opens
              the Streamlit app instead of the case study. */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 mt-6 inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Live demo
              <ArrowUpRight size={13} />
            </a>
          ) : null}
        </div>
      </article>
    </motion.div>
  );
}
