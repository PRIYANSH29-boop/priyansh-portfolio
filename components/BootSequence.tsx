"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  "INITIALIZING INTELLIGENT SYSTEMS",
  "LOADING NEURAL CORE      ▸ ok",
  "MOUNTING RAG INDEX       ▸ ok",
  "STREAMING MARKET FEED    ▸ ok",
  "ARMING THREAT ENGINE     ▸ ok",
  "SYSTEMS ONLINE",
];

export function BootSequence() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip if user already saw it this session
    const seen = sessionStorage.getItem("boot_done");
    if (seen) {
      setShow(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const interval = setInterval(() => {
      setStep((s) => {
        if (s < lines.length - 1) return s + 1;
        return s;
      });
    }, 280);

    const finishTimer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("boot_done", "1");
      document.body.style.overflow = "";
      clearInterval(interval);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] bg-ink-950 grid place-items-center"
        >
          {/* subtle scanlines / vignette */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(91,140,255,0.07), transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-30 mask-fade-b"
            style={{
              backgroundImage:
                "linear-gradient(rgba(91,140,255,0.06) 1px, transparent 1px)",
              backgroundSize: "100% 3px",
            }}
          />

          {/* center content */}
          <div className="relative w-full max-w-xl px-8 font-mono text-[12px] tracking-[0.22em] uppercase">
            {/* logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="relative w-8 h-8 rounded-md bg-gradient-to-br from-accent to-accent-deep grid place-items-center">
                <span className="font-display font-bold text-white text-sm">
                  P
                </span>
                <span className="absolute -inset-1 rounded-md bg-accent/40 blur-md animate-pulse" />
              </span>
              <span className="text-ink-300 text-[10px]">priyansh.ai · core v4.7</span>
            </motion.div>

            <div className="space-y-2 text-ink-200">
              {lines.slice(0, step + 1).map((line, i) => {
                const isLast = i === step;
                const [label, status] = line.includes("▸")
                  ? line.split("▸").map((s) => s.trim())
                  : [line, ""];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between gap-4"
                  >
                    <span
                      className={
                        i === lines.length - 1
                          ? "text-white"
                          : "text-ink-200"
                      }
                    >
                      <span className="text-accent-soft">›</span> {label}
                      {isLast ? (
                        <span className="inline-block w-1.5 h-3 ml-1 bg-accent animate-pulse align-[-2px]" />
                      ) : null}
                    </span>
                    {status ? (
                      <span className="text-signal-green">{status}</span>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>

            {/* progress bar */}
            <div className="mt-8 h-px w-full bg-white/[0.08] overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-accent to-accent-soft"
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
