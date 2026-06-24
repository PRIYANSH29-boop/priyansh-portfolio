import { Mail, Github, Linkedin, FileText, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-shell px-6 py-section">
        <p className="font-mono text-overline uppercase text-ink-faint">Contact</p>
        <h2 className="mt-4 font-display text-display-md font-medium text-ink">
          Get in touch
        </h2>
        <p className="mt-4 max-w-prose leading-relaxed text-ink-muted">
          I&apos;m open to ML/AI roles and happy to talk about the work. The
          fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-espresso px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-espresso/90"
          >
            <Mail size={16} />
            {site.email}
          </a>

          <GhostLink href={site.github} icon={<Github size={16} />}>
            GitHub
          </GhostLink>
          <GhostLink href={site.linkedin} icon={<Linkedin size={16} />}>
            LinkedIn
          </GhostLink>
          <GhostLink href={site.resumeUrl} icon={<FileText size={16} />}>
            Résumé
          </GhostLink>
        </div>
      </div>
    </section>
  );
}

function GhostLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-ink-faint/50 hover:bg-ink/[0.04]"
    >
      {icon}
      {children}
      <ArrowUpRight size={14} className="text-ink-muted" />
    </a>
  );
}
