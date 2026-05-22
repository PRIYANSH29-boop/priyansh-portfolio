"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FadeIn, RevealText } from "./RevealText";
import { RotatingSubheading } from "./RotatingSubheading";
import { MagneticButton } from "./MagneticButton";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden pt-32 pb-20 md:pt-36 md:pb-28"
    >
      {/* Top-left status chip */}
      <div className="absolute inset-x-0 top-24 md:top-28 z-10 flex justify-center md:justify-start md:pl-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl px-3.5 py-1.5 text-[10px] font-mono tracking-[0.18em] uppercase text-ink-200 pointer-events-auto"
        >
          <span className="relative w-1.5 h-1.5 rounded-full bg-accent">
            <span className="absolute inset-0 rounded-full bg-accent animate-ping" />
          </span>
          Research Lab · v2026
          <span className="text-ink-300">/</span>
          <Sparkles size={11} className="text-accent-soft" />
          <span className="text-ink-100">Operational</span>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
        {/* LEFT */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <FadeIn delay={0.1}>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-300 mb-6 md:mb-8">
              <span className="text-accent-soft">[01]</span> &nbsp;Priyansh —
              AI / ML Engineer
            </p>
          </FadeIn>

          <RevealText
            as="h1"
            text="Engineering"
            className="font-display font-light text-display-xl text-gradient leading-[0.95]"
          />
          <RevealText
            as="h1"
            text="Intelligent"
            className="font-display font-light text-display-xl text-gradient leading-[0.95]"
            delay={0.1}
          />
          <RevealText
            as="h1"
            text="Systems."
            className="font-display font-light text-display-xl text-gradient-accent italic leading-[0.95]"
            delay={0.2}
          />

          <FadeIn delay={0.85} className="mt-7 md:mt-8 max-w-xl">
            <RotatingSubheading />
          </FadeIn>

          <FadeIn delay={1.0} className="mt-6 md:mt-7 max-w-xl">
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-[13px] font-mono text-ink-200 tracking-wide">
              <Pill>ML Systems</Pill>
              <Pill>LLM Architectures</Pill>
              <Pill>Computer Vision</Pill>
              <Pill>Quant Intelligence</Pill>
              <Pill>Research Pipelines</Pill>
            </div>
          </FadeIn>

          <FadeIn delay={1.15} className="mt-7 max-w-lg">
            <p className="text-ink-200 text-base md:text-lg leading-relaxed text-balance">
              Production-grade ML — from{" "}
              <span className="text-white">
                autonomous threat-intelligence vision
              </span>{" "}
              to{" "}
              <span className="text-white">
                quant research terminals
              </span>{" "}
              and retrieval-grounded research infrastructure.
            </p>
          </FadeIn>

          <FadeIn delay={1.3} className="mt-10 flex flex-wrap items-center gap-3">
            <MagneticButton href="#work" variant="primary">
              Explore Systems
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </MagneticButton>
            <MagneticButton href="#lab" variant="ghost" strength={0.22}>
              Research Lab
              <span className="w-1.5 h-1.5 rounded-full bg-accent-soft group-hover:scale-125 transition-transform" />
            </MagneticButton>
          </FadeIn>

          <FadeIn delay={1.55} className="mt-14 md:mt-20 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono tracking-[0.18em] uppercase text-ink-300 max-w-md">
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-signal-green" />
              automated retraining
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent" />
              real-time threat tracking
            </span>
          </FadeIn>
        </div>

        {/* RIGHT — 3D Scene */}
        <div className="lg:col-span-6 order-1 lg:order-2 relative">
          <div className="relative w-full aspect-square max-w-[640px] mx-auto">
            {/* Ambient glow behind canvas */}
            <div
              aria-hidden
              className="absolute inset-8 rounded-full bg-accent/20 blur-3xl animate-pulse-glow"
            />
            <div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(91,140,255,0.15), transparent 60%)",
              }}
            />

            <div className="absolute inset-0">
              <HeroScene />
            </div>

            {/* Corner brackets */}
            <CornerBrackets />

            {/* Floating label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2 font-mono text-[10px] tracking-widest text-ink-200"
            >
              <span className="text-accent-soft">CORE_</span>v4.7
              <span className="mx-2 text-ink-400">·</span>
              <span className="text-signal-green">ONLINE</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="absolute top-4 right-4 glass rounded-xl px-3 py-2 font-mono text-[10px] tracking-widest text-ink-200"
            >
              <span className="text-ink-300">LAT</span> 42ms
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.3em] text-ink-300 uppercase"
      >
        <span>Scroll</span>
        <span className="relative w-px h-10 bg-white/10 overflow-hidden">
          <span className="absolute top-0 left-0 w-px h-3 bg-accent animate-scan" />
        </span>
      </motion.div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-ink-200 text-[10px] tracking-[0.18em] uppercase">
      {children}
    </span>
  );
}

function CornerBrackets() {
  const cls =
    "absolute w-4 h-4 border-accent/40 pointer-events-none";
  return (
    <>
      <span className={`${cls} top-0 left-0 border-t border-l`} />
      <span className={`${cls} top-0 right-0 border-t border-r`} />
      <span className={`${cls} bottom-0 left-0 border-b border-l`} />
      <span className={`${cls} bottom-0 right-0 border-b border-r`} />
    </>
  );
}
