"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Github,
  Linkedin,
  Twitter,
  type LucideIcon,
} from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="relative px-6 md:px-10 pb-12 pt-24 md:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* Massive contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-10 md:p-16"
        >
          <div
            aria-hidden
            className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18] mask-fade-b pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-300 mb-6">
              <span className="text-accent-soft">[06]</span> &nbsp;Contact / Collaborate
            </p>

            {/* terminal prompt */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6 font-mono text-sm text-ink-200 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.06] bg-ink-900/60 backdrop-blur"
            >
              <span className="text-signal-green">priyansh@core</span>
              <span className="text-ink-400">:~$</span>
              <span className="text-white">connect</span>
              <span className="text-accent-soft">--research</span>
              <span className="inline-block w-1.5 h-3.5 bg-accent animate-pulse align-[-2px]" />
            </motion.div>

            <h2 className="font-display font-light text-display-lg text-gradient leading-[0.98] text-balance max-w-4xl">
              Let&apos;s build the{" "}
              <span className="italic text-gradient-accent">
                next intelligent system
              </span>{" "}
              together.
            </h2>
            <p className="mt-6 text-ink-200 text-base md:text-lg max-w-xl">
              Open to research collaborations, founding AI roles, and consulting
              for teams shipping production ML.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="mailto:priyansh2005p@gmail.com"
                className="btn-primary group"
              >
                <Mail size={15} />
                priyansh2005p@gmail.com
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a href="#" className="btn-ghost">
                Download CV
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <Info label="Status" value="Open to roles" highlight />
              <Info label="Based in" value="Remote / Global" />
              <Info label="Response" value="< 24h" />
              <Info label="Timezone" value="UTC +05:30" />
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-ink-300 tracking-wide">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-md bg-gradient-to-br from-accent to-accent-deep grid place-items-center">
              <span className="font-display font-bold text-white text-sm">P</span>
            </span>
            <span>© {new Date().getFullYear()} Priyansh · All systems operational</span>
          </div>

          <div className="flex items-center gap-2">
            <SocialLink href="#" Icon={Github} label="GitHub" />
            <SocialLink href="#" Icon={Linkedin} label="LinkedIn" />
            <SocialLink href="#" Icon={Twitter} label="X / Twitter" />
            <SocialLink href="mailto:priyansh2005p@gmail.com" Icon={Mail} label="Email" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function Info({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-ink-300">
        {label}
      </div>
      <div
        className={`mt-1.5 font-display text-base md:text-lg ${
          highlight ? "text-signal-green" : "text-white"
        } flex items-center gap-2`}
      >
        {highlight ? (
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
        ) : null}
        {value}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  Icon,
  label,
}: {
  href: string;
  Icon: LucideIcon;
  label: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full border border-white/[0.08] grid place-items-center text-ink-200 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all"
    >
      <Icon size={14} />
    </a>
  );
}
