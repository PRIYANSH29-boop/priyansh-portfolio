"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "Autonomous AI Infrastructure",
  "Real-Time Vision Systems",
  "Quant Intelligence Pipelines",
  "LLM Research Architectures",
  "Machine Intelligence Research",
];

export function RotatingSubheading({
  intervalMs = 2800,
  className = "",
}: {
  intervalMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setI((v) => (v + 1) % phrases.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div
      className={`relative flex items-center gap-3 h-9 md:h-11 ${className}`}
      aria-live="polite"
    >
      {/* leading marker */}
      <span className="relative flex items-center justify-center w-5 h-5">
        <span className="absolute w-1.5 h-1.5 rounded-full bg-accent" />
        <span className="absolute w-5 h-5 rounded-full border border-accent/30 animate-ping-slow" />
      </span>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="block font-display text-xl md:text-2xl font-light text-white/85 tracking-tight"
          >
            {phrases[i]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
