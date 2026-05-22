"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function PhilosophyBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      id="research"
      ref={ref}
      className="relative py-24 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-300 mb-8 flex items-center gap-3"
        >
          <span className="text-accent-soft">[04 — Manifesto]</span>
          <span className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-accent/40 to-transparent" />
        </motion.div>

        <motion.h2
          style={{ x }}
          className="font-display font-light text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] text-balance tracking-[-0.03em]"
        >
          <span className="text-gradient">Calm interfaces.</span>{" "}
          <span className="text-ink-400">Powerful models.</span>{" "}
          <span className="text-gradient italic">Honest data.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 max-w-5xl"
        >
          <Principle
            n="01"
            title="Research-first"
            body="Every product starts as a notebook. Every model is benchmarked, ablated, and documented before it ships."
          />
          <Principle
            n="02"
            title="Production-grade"
            body="Latency budgets, drift monitors, evaluation harnesses. Models that hold up under real traffic — not just demos."
          />
          <Principle
            n="03"
            title="Operator-aware"
            body="Tools designed for the humans behind them — analysts, traders, scientists. Intelligence that disappears into the workflow."
          />
        </motion.div>
      </div>
    </section>
  );
}

function Principle({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div className="relative">
      <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-accent-soft mb-3">
        {n}
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight mb-3">
        {title}
      </h3>
      <p className="text-ink-200 text-[15px] leading-relaxed">
        {body}
      </p>
    </div>
  );
}
