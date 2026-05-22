"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const lines = [
  "LOADING NEURAL CORE      ▸ ok",
  "MOUNTING RAG INDEX       ▸ ok",
  "STREAMING MARKET FEED    ▸ ok",
  "ARMING THREAT ENGINE     ▸ ok",
  "SYSTEMS ONLINE",
];

const TOTAL_MS = 3000;
const PHASE2_AT = 700;   // neural lines + particles begin
const PHASE3_AT = 1500;  // logs begin streaming
const LINE_INTERVAL = 240;

export function BootSequence() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [step, setStep] = useState(-1);
  // Generated client-side after mount to avoid SSR hydration mismatch
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 48 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 0.7,
      }))
    );
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("boot_done")) {
      setShow(false);
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    setPhase(1);

    const t1 = setTimeout(() => setPhase(2), PHASE2_AT);
    const t2 = setTimeout(() => setPhase(3), PHASE3_AT);

    // Stream log lines once phase 3 begins
    const logTimer = setTimeout(() => {
      let i = 0;
      setStep(0);
      const id = setInterval(() => {
        i += 1;
        if (i < lines.length) setStep(i);
        else clearInterval(id);
      }, LINE_INTERVAL);
      // store on window for cleanup
      (window as any).__bootInterval = id;
    }, PHASE3_AT);

    const finish = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("boot_done", "1");
      document.body.style.overflow = "";
    }, TOTAL_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(logTimer);
      clearTimeout(finish);
      if ((window as any).__bootInterval) {
        clearInterval((window as any).__bootInterval);
      }
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[100] bg-ink-950 overflow-hidden"
        >
          {/* radial bloom behind everything */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 2 ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at center, rgba(91,140,255,0.12), transparent 65%)",
            }}
          />

          {/* particles — only show in phase >= 2 */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={
                  phase >= 2
                    ? { opacity: 0.55, scale: 1 }
                    : { opacity: 0, scale: 0.4 }
                }
                transition={{
                  duration: 0.9,
                  delay: p.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute rounded-full bg-accent-soft"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  boxShadow: "0 0 8px rgba(123,166,255,0.7)",
                }}
              />
            ))}
          </div>

          {/* neural connection layer — draws in during phase 2 */}
          <NeuralLines active={phase >= 2} />

          {/* faint scanlines & grid texture */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(91,140,255,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 4px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            }}
          />

          {/* CENTER STAGE */}
          <div className="relative h-full w-full grid place-items-center px-6">
            <div className="relative w-full max-w-xl flex flex-col items-center">
              {/* logo mark — fades in early */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: phase >= 1 ? 1 : 0,
                  scale: phase >= 1 ? 1 : 0.9,
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-7 flex items-center gap-3"
              >
                <span className="relative w-9 h-9 rounded-md bg-gradient-to-br from-accent to-accent-deep grid place-items-center">
                  <span className="font-display font-bold text-white text-base">
                    P
                  </span>
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 2 ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute -inset-1.5 rounded-md bg-accent/40 blur-md"
                  />
                </span>
                <span className="text-ink-300 text-[10px] font-mono tracking-[0.24em] uppercase">
                  priyansh.ai · core v4.7
                </span>
              </motion.div>

              {/* Headline — INITIALIZING INTELLIGENT SYSTEMS */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.6em" }}
                animate={{
                  opacity: phase >= 1 ? 1 : 0,
                  letterSpacing: phase >= 2 ? "0.32em" : "0.6em",
                }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[11px] md:text-[12px] uppercase text-white text-center"
              >
                Initializing Intelligent Systems
              </motion.div>

              {/* subtle subtitle line */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 6 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mt-3 text-[10px] font-mono tracking-[0.32em] uppercase text-ink-300"
              >
                cold-start · cognition layer
              </motion.div>

              {/* boot log — phase 3 */}
              <div className="mt-10 w-full font-mono text-[11px] tracking-[0.2em] uppercase text-ink-200 space-y-1.5 min-h-[110px]">
                {lines.map((line, i) => {
                  const visible = step >= i;
                  const isCurrent = step === i;
                  const [label, status] = line.includes("▸")
                    ? line.split("▸").map((s) => s.trim())
                    : [line, ""];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={
                        visible
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -8 }
                      }
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex items-center justify-between gap-4"
                    >
                      <span
                        className={
                          i === lines.length - 1 && visible
                            ? "text-white"
                            : "text-ink-200"
                        }
                      >
                        <span className="text-accent-soft">›</span> {label}
                        {isCurrent ? (
                          <span className="inline-block w-1.5 h-3 ml-1.5 bg-accent animate-pulse align-[-2px]" />
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
              <div className="mt-8 h-px w-full bg-white/[0.07] overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: phase >= 1 ? "100%" : "0%" }}
                  transition={{ duration: TOTAL_MS / 1000, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-accent via-accent-soft to-accent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* ============================================================ */

function NeuralLines({ active }: { active: boolean }) {
  // Six nodes forming a small graph behind the headline.
  const nodes = useMemo(
    () => [
      { x: 18, y: 28 },
      { x: 36, y: 14 },
      { x: 50, y: 36 },
      { x: 64, y: 18 },
      { x: 82, y: 32 },
      { x: 30, y: 64 },
      { x: 58, y: 72 },
      { x: 78, y: 60 },
    ],
    []
  );

  // Hand-picked edges so it reads as a network, not a tangle
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4],
    [3, 4], [2, 5], [5, 6], [4, 7], [6, 7], [4, 6],
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 35%, transparent 75%)",
      }}
    >
      {edges.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        return (
          <motion.line
            key={i}
            x1={n1.x}
            y1={n1.y}
            x2={n2.x}
            y2={n2.y}
            stroke="rgba(123,166,255,0.45)"
            strokeWidth="0.12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              active
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 1.1,
              delay: 0.05 * i,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="0.45"
          fill="#7ba6ff"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            active
              ? { opacity: 0.85, scale: 1 }
              : { opacity: 0, scale: 0 }
          }
          transition={{ duration: 0.5, delay: 0.4 + i * 0.04 }}
        />
      ))}
    </svg>
  );
}
