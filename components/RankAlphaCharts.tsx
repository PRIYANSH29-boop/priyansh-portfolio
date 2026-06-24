"use client";

// Lightweight, dependency-free result charts for the RankAlpha case study.
// Real numbers from the project's honest evaluation — no decorative data.
// Editorial palette only: terracotta accent for the lead bar, muted ink otherwise.

import { motion } from "framer-motion";

const EASE = [0.22, 0.61, 0.36, 1] as const;

function ChartFrame({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mt-6 rounded-lg border border-line bg-surface p-5">
      <figcaption className="font-mono text-overline uppercase text-ink-faint">
        {title}
      </figcaption>
      <div className="mt-4">{children}</div>
      {note ? (
        <p className="mt-4 text-xs leading-relaxed text-ink-faint">{note}</p>
      ) : null}
    </figure>
  );
}

const FEATURES = [
  { label: "6-month volatility", value: 59.7, lead: true },
  { label: "Size (log price)", value: 14.0 },
  { label: "12–1 momentum", value: 10.3 },
  { label: "6-month momentum", value: 6.7 },
  { label: "3-month momentum", value: 5.8 },
  { label: "1-month reversal", value: 2.9 },
  { label: "Liquidity", value: 0.4 },
];

export function FeatureImportanceChart() {
  return (
    <ChartFrame
      title="What the model leans on — LightGBM gain %"
      note="Volatility dominates by importance — but SHAP direction shows the long book tilts toward higher-volatility names paired with momentum, not the low-volatility anomaly. Importance tells you which feature matters, never which direction."
    >
      <div className="space-y-2.5">
        {FEATURES.map((f, i) => (
          <div
            key={f.label}
            className="grid grid-cols-[120px_1fr_42px] items-center gap-3 sm:grid-cols-[150px_1fr_42px]"
          >
            <span className={f.lead ? "text-xs font-medium text-ink" : "text-xs text-ink-muted"}>
              {f.label}
            </span>
            <div className="h-2.5 overflow-hidden rounded-full bg-wash">
              <motion.div
                className={f.lead ? "h-full rounded-full bg-accent" : "h-full rounded-full bg-ink/30"}
                initial={{ width: 0 }}
                whileInView={{ width: `${f.value}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.05 }}
              />
            </div>
            <span className="text-right font-mono text-xs text-ink-muted">{f.value}%</span>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

const DECILES = [1.12, 0.67, 1.19, 0.97, 1.07, 1.3, 1.48, 1.55, 2.39, 4.04];
const DECILE_MAX = 4.04;

export function DecileChart() {
  return (
    <ChartFrame
      title="Mean next-month return by model-score decile"
      note="Sorted by the model's score (known in advance), then measured against realised forward returns. The clean rise from decile 5 → 9 is the real signal; the short leg (decile 0) still sits slightly high, so the edge is concentrated on the long side."
    >
      <div className="flex h-44 items-end gap-1.5">
        {DECILES.map((v, i) => (
          <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className="font-mono text-[10px] text-ink-faint opacity-0 transition-opacity group-hover:opacity-100">
              {v.toFixed(2)}%
            </span>
            <motion.div
              className={i === 9 ? "w-full rounded-t bg-accent" : "w-full rounded-t bg-ink/25"}
              initial={{ height: 0 }}
              whileInView={{ height: `${(v / DECILE_MAX) * 100}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.04 }}
            />
            <span className="font-mono text-[10px] text-ink-faint">{i}</span>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

const SHARPE = [
  { label: "Learned ranker", value: 1.14, lead: true },
  { label: "Momentum baseline", value: 0.82 },
];

export function ModelVsBaseline() {
  return (
    <ChartFrame
      title="After-cost Sharpe — same out-of-sample window"
      note="A modest, honestly-measured edge of +0.32 Sharpe over a plain-momentum baseline, after 10 bps/side costs. Not yet statistically significant (Rank IC t = 1.64) and untested through a momentum crash — the believability is the point, not the headline."
    >
      <div className="space-y-3">
        {SHARPE.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[120px_1fr_36px] items-center gap-3 sm:grid-cols-[150px_1fr_36px]">
            <span className={r.lead ? "text-xs font-medium text-ink" : "text-xs text-ink-muted"}>
              {r.label}
            </span>
            <div className="h-3 overflow-hidden rounded-full bg-wash">
              <motion.div
                className={r.lead ? "h-full rounded-full bg-accent" : "h-full rounded-full bg-ink/30"}
                initial={{ width: 0 }}
                whileInView={{ width: `${(r.value / 1.14) * 100}%` }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              />
            </div>
            <span className="text-right font-mono text-xs text-ink-muted">{r.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}
