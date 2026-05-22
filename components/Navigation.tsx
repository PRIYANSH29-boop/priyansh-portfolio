"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Research", href: "#research" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-5"
    >
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between rounded-full px-5 md:px-7 py-3 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-2xl bg-ink-900/60 border border-white/[0.06]"
            : "bg-transparent border border-transparent"
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 group"
          aria-label="Home"
        >
          <span className="relative w-7 h-7 rounded-md bg-gradient-to-br from-accent to-accent-deep grid place-items-center overflow-hidden">
            <span className="absolute inset-0 bg-white/10 mix-blend-overlay" />
            <span className="font-display font-bold text-white text-sm tracking-tight">
              P
            </span>
            <span className="absolute -inset-2 rounded-full bg-accent/40 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-display font-medium text-ink-100 tracking-tight text-sm">
            priyansh<span className="text-ink-300">.ai</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="relative px-3.5 py-1.5 text-sm text-ink-200 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative z-10">{l.label}</span>
              <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-ink-100 px-4 py-2 rounded-full border border-white/10 hover:border-accent/60 hover:bg-accent/10 transition-all duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
          Available
        </a>

        <button
          aria-label="Menu"
          className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-white/10"
        >
          <span className="block w-4 h-px bg-ink-100 relative before:content-[''] before:absolute before:-top-1.5 before:w-4 before:h-px before:bg-ink-100 after:content-[''] after:absolute after:top-1.5 after:w-4 after:h-px after:bg-ink-100" />
        </button>
      </div>
    </motion.header>
  );
}
