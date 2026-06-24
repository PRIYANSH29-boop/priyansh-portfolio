"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { site, navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-6">
        <Link
          href="/"
          aria-label={`${site.fullName} — home`}
          className="wordmark group font-display text-sm font-medium tracking-tight text-ink transition-colors hover:text-accent"
        >
          <span aria-hidden="true">
            P<span className="wordmark-rest">riyansh </span>P
            <span className="wordmark-rest">atel</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <div className="flex items-center">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-2.5 py-2 text-sm text-ink-muted transition-colors hover:text-ink sm:px-3"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <span className="mx-1.5 hidden h-4 w-px bg-line sm:block" />

          <div className="flex items-center">
            <IconLink href={site.github} label="GitHub">
              <Github size={17} />
            </IconLink>
            <IconLink href={site.linkedin} label="LinkedIn">
              <Linkedin size={17} />
            </IconLink>
          </div>
        </nav>
      </div>
    </header>
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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-md text-ink-muted transition-colors hover:bg-ink/[0.06] hover:text-ink"
    >
      {children}
    </a>
  );
}
