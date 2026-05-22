"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Radar } from "lucide-react";

const pipeline = [
  { name: "YOLO", sub: "v8 · detection" },
  { name: "Validation CNN", sub: "filter · false-positives" },
  { name: "CBAM", sub: "attention module" },
  { name: "Tracking", sub: "ByteTrack · re-ID" },
  { name: "Threat Engine", sub: "rules · scoring" },
];

export function DroneSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="threat"
      ref={ref}
      className="relative"
      style={{ height: "260vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-10 max-w-7xl mx-auto items-center pt-24 pb-12">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-300 mb-6 flex items-center gap-3"
            >
              <span className="text-accent-soft">[02]</span>
              <span>Case Study · Computer Vision</span>
              <span className="h-px flex-1 max-w-[40px] bg-gradient-to-r from-accent/40 to-transparent" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light text-[clamp(2.4rem,5vw,4.5rem)] leading-[1.0] text-balance tracking-[-0.03em]"
            >
              <span className="text-gradient">Autonomous</span>
              <br />
              <span className="text-gradient">Threat </span>
              <span className="italic text-gradient-accent">Intelligence</span>
              <br />
              <span className="text-gradient">System.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-ink-200 text-base md:text-lg leading-relaxed max-w-lg"
            >
              A multi-stage perception stack for autonomous drones — real-time
              detection, attention-refined validation, persistent tracking, and
              a rules-aware threat engine for restricted airspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-1.5"
            >
              {[
                "YOLOv8",
                "PyTorch",
                "CBAM Attention",
                "ByteTrack",
                "OpenCV",
                "TensorRT",
                "ROS",
              ].map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono tracking-[0.16em] uppercase text-ink-200 px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Radar + Pipeline */}
          <div className="lg:col-span-7 relative">
            <RadarVisual progress={scrollYProgress} />
            <Pipeline progress={scrollYProgress} />
          </div>
        </div>

        {/* progress strip */}
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-accent via-accent-soft to-accent origin-left"
        />
      </div>
    </section>
  );
}

function RadarVisual({ progress }: { progress: MotionValue<number> }) {
  // Three detected "targets" that fade in as you scroll
  const t1Op = useTransform(progress, [0.1, 0.25], [0, 1]);
  const t2Op = useTransform(progress, [0.3, 0.45], [0, 1]);
  const t3Op = useTransform(progress, [0.5, 0.65], [0, 1]);

  return (
    <div className="relative w-full aspect-[5/4] max-w-[640px] mx-auto rounded-3xl border border-white/[0.06] overflow-hidden bg-gradient-to-br from-ink-900/80 via-ink-900/50 to-ink-800/70">
      {/* grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91,140,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(91,140,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* concentric radar */}
      <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="radarG" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="rgba(91,140,255,0.18)" />
            <stop offset="100%" stopColor="rgba(91,140,255,0)" />
          </radialGradient>
          <linearGradient id="sweepG" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(91,140,255,0)" />
            <stop offset="100%" stopColor="rgba(91,140,255,0.45)" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="180" r="160" fill="url(#radarG)" />
        {[140, 110, 80, 50, 20].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="180"
            r={r}
            fill="none"
            stroke="rgba(91,140,255,0.18)"
            strokeWidth="0.6"
          />
        ))}
        <line
          x1="40"
          y1="180"
          x2="360"
          y2="180"
          stroke="rgba(91,140,255,0.12)"
          strokeWidth="0.6"
        />
        <line
          x1="200"
          y1="20"
          x2="200"
          y2="340"
          stroke="rgba(91,140,255,0.12)"
          strokeWidth="0.6"
        />
        {/* sweep */}
        <g style={{ transformOrigin: "200px 180px" }}>
          <g>
            <path d="M200,180 L360,180 A160,160 0 0,0 312,68 Z" fill="url(#sweepG)" opacity="0.6">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 200 180"
                to="360 200 180"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>

      {/* detection boxes */}
      <Target style={{ left: "22%", top: "35%", opacity: t1Op as any }} label="DRONE · 0.97" hostile />
      <Target style={{ left: "62%", top: "55%", opacity: t2Op as any }} label="DRONE · 0.91" hostile />
      <Target style={{ left: "78%", top: "28%", opacity: t3Op as any }} label="BIRD · 0.82" />

      {/* HUD overlay */}
      <div className="absolute top-3 left-3 right-3 flex justify-between text-[10px] font-mono tracking-widest text-ink-200">
        <span className="text-accent-soft flex items-center gap-1.5">
          <Radar size={11} /> THREAT · TRACK
        </span>
        <span className="text-signal-green flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
          ENGINE ARMED
        </span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex justify-between text-[10px] font-mono tracking-widest text-ink-300">
        <span>LAT 28.5° N · LON 77.1° E</span>
        <span>Δ live · streaming</span>
      </div>

      {/* corner brackets */}
      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent/40" />
      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent/40" />
      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent/40" />
      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent/40" />
    </div>
  );
}

function Target({
  style,
  label,
  hostile,
}: {
  style: React.CSSProperties;
  label: string;
  hostile?: boolean;
}) {
  const color = hostile ? "#ff4d6d" : "#7ba6ff";
  return (
    <motion.div
      style={style}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="relative w-12 h-12 rounded-[3px]"
        style={{
          border: `1px solid ${color}`,
          boxShadow: `0 0 16px ${color}55, inset 0 0 8px ${color}22`,
        }}
      >
        <span
          className="absolute -top-1 -left-1 w-2 h-2 border-t border-l"
          style={{ borderColor: color }}
        />
        <span
          className="absolute -top-1 -right-1 w-2 h-2 border-t border-r"
          style={{ borderColor: color }}
        />
        <span
          className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l"
          style={{ borderColor: color }}
        />
        <span
          className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r"
          style={{ borderColor: color }}
        />
        <span
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
      <div
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.18em] uppercase"
        style={{ color }}
      >
        {label}
      </div>
    </motion.div>
  );
}

function Pipeline({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="mt-6 relative">
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-300 mb-3 flex items-center gap-3">
        <span className="text-accent-soft">Pipeline</span>
        <span className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
        <span>5 stages</span>
      </div>
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {pipeline.map((stage, i) => (
          <PipelineStage
            key={stage.name}
            stage={stage}
            index={i}
            total={pipeline.length}
            progress={progress}
          />
        ))}
      </div>
    </div>
  );
}

function PipelineStage({
  stage,
  index,
  total,
  progress,
}: {
  stage: { name: string; sub: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const op = useTransform(progress, [start, end - 0.05], [0.25, 1]);
  const glow = useTransform(progress, [start, end - 0.05], [0, 1]);

  return (
    <motion.div
      style={{ opacity: op }}
      className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-2.5 md:px-3 md:py-3 group overflow-hidden"
    >
      <motion.span
        aria-hidden
        style={{
          opacity: glow,
          background:
            "linear-gradient(135deg, rgba(91,140,255,0.18), rgba(91,140,255,0))",
        }}
        className="absolute inset-0 rounded-xl pointer-events-none"
      />
      <span className="relative font-mono text-[9px] tracking-[0.22em] uppercase text-accent-soft">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative mt-1.5 font-display text-[13px] md:text-sm text-white tracking-tight">
        {stage.name}
      </div>
      <div className="relative text-[9px] font-mono text-ink-300 mt-0.5 tracking-wide">
        {stage.sub}
      </div>
      {index < total - 1 ? (
        <span className="hidden md:block absolute top-1/2 -right-2.5 -translate-y-1/2 w-2 h-px bg-accent/40" />
      ) : null}
    </motion.div>
  );
}
