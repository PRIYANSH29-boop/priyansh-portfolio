import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { site } from "@/lib/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-ink-muted">
          © {year} {site.name} — {site.location}
        </p>

        <div className="flex items-center gap-1">
          <IconLink href={site.github} label="GitHub">
            <Github size={16} />
          </IconLink>
          <IconLink href={site.linkedin} label="LinkedIn">
            <Linkedin size={16} />
          </IconLink>
          <IconLink href={`mailto:${site.email}`} label="Email">
            <Mail size={16} />
          </IconLink>
          <IconLink href={site.resumeUrl} label="Résumé">
            <FileText size={16} />
          </IconLink>
        </div>
      </div>
    </footer>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="grid h-9 w-9 place-items-center rounded-md text-ink-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
    >
      {children}
    </a>
  );
}
