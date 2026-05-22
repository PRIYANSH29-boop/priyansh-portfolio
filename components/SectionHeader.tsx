"use client";

import { motion } from "framer-motion";

export function SectionHeader({
  eyebrow,
  index,
  title,
  description,
}: {
  eyebrow: string;
  index: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-4 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-300 mb-7"
      >
        <span className="text-accent-soft">{index}</span>
        <span className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-accent/40 to-transparent" />
        <span>{eyebrow}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className="font-display font-light text-display-lg text-gradient leading-[1.02] text-balance"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-6 text-ink-200 text-base md:text-lg max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
