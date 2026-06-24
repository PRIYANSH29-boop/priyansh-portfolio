import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Stagger, StaggerItem } from "./Reveal";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <Stagger className="mx-auto max-w-shell px-6 pt-20 pb-12 md:pt-28 md:pb-16">
      <StaggerItem>
        <p className="font-mono text-overline uppercase text-ink-faint">
          {site.role} · {site.location}
        </p>
      </StaggerItem>

      <StaggerItem>
        <h1 className="mt-5 font-display text-display-xl font-medium text-ink">
          {site.name}
        </h1>
      </StaggerItem>

      <StaggerItem>
        <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-ink md:text-xl">
          {site.tagline}
        </p>
      </StaggerItem>

      <StaggerItem>
        <p className="mt-3 max-w-xl text-balance leading-relaxed text-ink-muted">
          Junior ML engineer building finance ML end to end — a credit-card
          fraud detector and a leakage-controlled equity ranker. Open to ML/AI
          roles in finance.
        </p>
      </StaggerItem>

      <StaggerItem>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#work"
            className="inline-flex items-center gap-2 rounded-md bg-espresso px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-espresso/90"
          >
            See selected work
            <ArrowRight size={16} />
          </Link>
          <Link
            href="#about"
            className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink-faint/50 hover:bg-ink/[0.04]"
          >
            About
          </Link>
        </div>
      </StaggerItem>
    </Stagger>
  );
}
