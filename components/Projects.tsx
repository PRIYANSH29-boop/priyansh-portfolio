"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  ArrowUpRight,
  ShieldAlert,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

// Deterministic pseudo-random number generator (mulberry32). Same input → same
// output on both server and client, so visuals using this never trigger React
// hydration mismatches.
function pseudoRand(seed: number): number {
  let t = (seed | 0) + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function Projects() {
  return (
    <section
      id="work"
      className="relative py-28 md:py-40 px-6 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="03"
          eyebrow="Quant Research Terminal / Case Studies"
          title={
            <>
              A{" "}
              <span className="italic text-gradient-accent">
                Bloomberg-grade
              </span>{" "}
              terminal, rebuilt with foundation-model reasoning.
            </>
          }
          description="Live market intelligence and transaction anomaly engines — LLM-driven analysis, automated retraining, real-time inference."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <FraudCard />
          <StockCard />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase text-ink-300"
        >
          <span>02 / 02 case studies</span>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-ink-100 hover:text-accent-soft transition-colors"
          >
            Request full dossier <ArrowUpRight size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================ Project Card Shell ============================ */

function ProjectCard({
  index,
  title,
  tagline,
  description,
  tags,
  metrics,
  Icon,
  accent = "blue",
  children,
}: {
  index: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string; trend?: string }[];
  Icon: LucideIcon;
  accent?: "blue" | "amber";
  children: React.ReactNode;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const glow = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(91,140,255,0.13), transparent 70%)`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-7 md:p-9 hover:border-white/[0.12] transition-colors duration-500"
    >
      {/* Mouse glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow }}
      />
      {/* Animated border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl border-gradient" />
      {/* Inner grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mask-fade-b"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            accent === "amber"
              ? "rgba(255,184,77,0.18)"
              : "rgba(91,140,255,0.22)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] grid place-items-center">
              <Icon
                size={18}
                className={
                  accent === "amber" ? "text-signal-amber" : "text-accent-soft"
                }
              />
            </span>
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-ink-300">
                Case study · {index}
              </p>
              <h3 className="font-display text-2xl md:text-[26px] font-medium text-white mt-0.5 tracking-tight">
                {title}
              </h3>
            </div>
          </div>
          <ArrowUpRight
            size={20}
            className="text-ink-300 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300"
          />
        </div>

        <p className="mt-5 text-ink-100 text-base md:text-lg leading-snug">
          {tagline}
        </p>
        <p className="mt-3 text-ink-300 text-sm md:text-[15px] leading-relaxed max-w-md">
          {description}
        </p>

        {/* Visual panel */}
        <div className="mt-7 relative h-[230px] md:h-[260px] rounded-2xl border border-white/[0.06] bg-ink-900/40 overflow-hidden">
          {children}
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.05), inset 0 0 60px rgba(0,0,0,0.4)",
            }}
          />
        </div>

        {/* Metrics — rendered only when validated numbers exist */}
        {metrics.length > 0 ? (
          <div className="mt-6 grid grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
              >
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-xl md:text-2xl font-light text-white">
                    {m.value}
                  </span>
                  {m.trend ? (
                    <span className="text-[10px] font-mono text-signal-green">
                      {m.trend}
                    </span>
                  ) : null}
                </div>
                <div className="text-[10px] tracking-[0.18em] uppercase text-ink-300 mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono tracking-[0.16em] uppercase text-ink-200 px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ============================ Fraud Detector ============================ */

function FraudCard() {
  return (
    <ProjectCard
      index="01"
      title="EDA Fraud Detector"
      tagline="Real-time anomaly detection on streaming transaction graphs."
      description="A hybrid graph + temporal model designed to flag suspicious activity in real time, with interactive heatmaps and rule-based overrides for analysts."
      tags={[
        "XGBoost",
        "Graph NN",
        "Kafka",
        "FastAPI",
        "Postgres",
        "Streamlit",
      ]}
      metrics={[]}
      Icon={ShieldAlert}
    >
      <FraudHeatmapVisual />
    </ProjectCard>
  );
}

function FraudHeatmapVisual() {
  return (
    <div className="absolute inset-0 p-5">
      <div className="flex items-center justify-between text-[10px] font-mono text-ink-200 tracking-widest mb-3">
        <span className="text-accent-soft">FRAUD · HEATMAP / 24H</span>
        <span className="text-signal-red flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-red animate-pulse" />
          7 anomalies
        </span>
      </div>
      <div className="grid grid-cols-24 grid-rows-7 gap-[3px] h-[150px]" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
        {Array.from({ length: 24 * 7 }).map((_, i) => {
          const v = ((Math.sin(i * 0.7) + Math.cos(i * 0.3)) + 2) / 4;
          // deterministic pseudo-random per-cell — identical server & client
          const r1 = pseudoRand(i + 1);
          const r2 = pseudoRand(i + 7919);
          const hot = v > 0.78 && r1 > 0.4;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 50) * 0.006, duration: 0.4 }}
              className="rounded-[2px]"
              style={{
                background: hot
                  ? `rgba(255,77,109,${0.55 + r2 * 0.4})`
                  : `rgba(91,140,255,${0.08 + v * 0.35})`,
                boxShadow: hot ? "0 0 8px rgba(255,77,109,0.5)" : undefined,
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-ink-300">
        <div className="flex items-center gap-3">
          <Legend color="rgba(91,140,255,0.35)" label="normal" />
          <Legend color="rgba(255,77,109,0.85)" label="anomaly" />
        </div>
        <span>txn 12,840/s · model v4.2.1</span>
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 uppercase tracking-widest">
      <span
        className="w-2 h-2 rounded-sm"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

/* ============================ Stock Analyzer ============================ */

function StockCard() {
  return (
    <ProjectCard
      index="02"
      title="AI Quant Terminal"
      tagline="LLM-grounded market intelligence with transformer forecasting."
      description="Transformer-based candlestick forecasting fused with news sentiment and fundamentals, surfaced through a live operator terminal with probability streams."
      tags={[
        "PyTorch",
        "Transformer",
        "LLM Sentiment",
        "RAG",
        "FastAPI",
        "Plotly",
      ]}
      metrics={[]}
      Icon={LineChart}
    >
      <StockChartVisual />
    </ProjectCard>
  );
}

function StockChartVisual() {
  // generate candlesticks deterministically — identical server & client
  const candles = Array.from({ length: 32 }).map((_, i) => {
    const base = 50 + Math.sin(i * 0.5) * 14 + i * 0.6;
    const open = base + (pseudoRand(i * 4 + 1) - 0.5) * 4;
    const close = base + (pseudoRand(i * 4 + 2) - 0.5) * 4;
    const high = Math.max(open, close) + pseudoRand(i * 4 + 3) * 3;
    const low = Math.min(open, close) - pseudoRand(i * 4 + 4) * 3;
    return { open, close, high, low };
  });

  const maxV = Math.max(...candles.map((c) => c.high));
  const minV = Math.min(...candles.map((c) => c.low));
  const range = maxV - minV;
  const W = 600;
  const H = 180;
  const cw = W / candles.length;

  function y(v: number) {
    return ((maxV - v) / range) * H;
  }

  // forecast line (last 10 points extrapolated)
  const forecastPts = candles.slice(-12).map((c, i) => ({
    x: (candles.length - 12 + i) * cw + cw / 2,
    y: y(c.close + (i - 6) * 1.2),
  }));
  const forecastPath = forecastPts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="absolute inset-0 p-5">
      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest mb-3">
        <div className="flex items-center gap-2 text-accent-soft">
          NVDA · 1D
          <span className="text-ink-300">·</span>
          <span className="text-white">$142.84</span>
          <span className="text-signal-green">+4.82%</span>
        </div>
        <span className="text-ink-300 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
          LIVE
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[150px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="forecastFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#5b8cff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gridLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
          </linearGradient>
        </defs>

        {/* horizontal grid */}
        {[0.25, 0.5, 0.75].map((g, i) => (
          <line
            key={i}
            x1="0"
            x2={W}
            y1={H * g}
            y2={H * g}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="2 4"
          />
        ))}

        {/* candles */}
        {candles.map((c, i) => {
          const cx = i * cw + cw / 2;
          const bullish = c.close >= c.open;
          const color = bullish ? "#3effc4" : "#ff4d6d";
          return (
            <g key={i}>
              <line
                x1={cx}
                x2={cx}
                y1={y(c.high)}
                y2={y(c.low)}
                stroke={color}
                strokeOpacity="0.7"
                strokeWidth="1"
              />
              <rect
                x={cx - cw * 0.3}
                y={Math.min(y(c.open), y(c.close))}
                width={cw * 0.6}
                height={Math.max(2, Math.abs(y(c.open) - y(c.close)))}
                fill={color}
                fillOpacity="0.85"
              />
            </g>
          );
        })}

        {/* forecast line */}
        <path
          d={forecastPath}
          fill="none"
          stroke="#7ba6ff"
          strokeWidth="1.6"
          strokeDasharray="4 3"
          opacity="0.9"
        />
        {/* forecast endpoint */}
        {forecastPts.length > 0 ? (
          <circle
            cx={forecastPts[forecastPts.length - 1].x}
            cy={forecastPts[forecastPts.length - 1].y}
            r="3.5"
            fill="#7ba6ff"
          >
            <animate attributeName="r" values="3.5;6;3.5" dur="2s" repeatCount="indefinite" />
          </circle>
        ) : null}
      </svg>

      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-ink-300">
        <div className="flex items-center gap-3">
          <Legend color="#3effc4" label="bullish" />
          <Legend color="#ff4d6d" label="bearish" />
          <Legend color="#7ba6ff" label="forecast" />
        </div>
        <span className="text-accent-soft">sentiment +0.72</span>
      </div>
    </div>
  );
}
