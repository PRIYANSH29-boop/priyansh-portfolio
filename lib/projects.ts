import { resolveMetrics, type Metric } from "@/lib/metrics";

export type ProjectStatus = "in-progress" | "live";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  liveUrl: string | null;
  repoUrl: string | null;
  tags: string[];
  featured: boolean;
  metrics: Metric[];
  // Optional, non-core: static screenshot under /public (no iframe embeds).
  screenshot?: string;
  screenshotAlt?: string;
};

// Quiet, derived badge text — never a fabricated capability.
export const STATUS_LABEL: Record<ProjectStatus, string> = {
  "in-progress": "In progress",
  live: "Live",
};

// SINGLE SOURCE OF TRUTH. Add a project = one object here + one content/<slug>.mdx
// + one content/metrics/<slug>.json. Metric values stay null until validated.
export const projects: Project[] = [
  {
    slug: "rankalpha",
    name: "RankAlpha",
    tagline:
      "A cross-sectional equity ranker: it learns to order S&P 500 stocks, turns the ranking into a risk-managed, self-explaining portfolio, and proves it with a leakage-controlled, cost-aware backtest — honest about a modest, not-yet-significant edge.",
    status: "in-progress",
    liveUrl: "https://financeai-tqrpxdxbsnqcfvrtko5one.streamlit.app/",
    repoUrl: "https://github.com/PRIYANSH29-boop/financeai",
    tags: [
      "Python",
      "LightGBM · LambdaMART",
      "Learning-to-rank",
      "Walk-forward + embargo",
      "SHAP",
      "Streamlit",
    ],
    featured: true,
    metrics: resolveMetrics("rankalpha", [
      { key: "oosSharpe", label: "OOS Sharpe (model vs baseline)" },
      { key: "rankIC", label: "Mean Rank IC" },
      { key: "paperTrack", label: "Forward paper-track" },
    ]),
  },
  {
    slug: "credit-card-fraud-detection",
    name: "FraudLens",
    tagline:
      "Explainable credit-card fraud detection that prices model errors in £, finds where the model breaks, and proves the ceiling is the data — not the algorithm.",
    status: "in-progress",
    liveUrl: "https://fraud-detection-explainable-ai.streamlit.app/",
    repoUrl: "https://github.com/PRIYANSH29-boop/fraud-detection-explainable-ai",
    tags: ["Python", "XGBoost", "SHAP", "Imbalanced data", "Streamlit"],
    featured: true,
    // Insight-led card: the value here is the reasoning, not a headline number.
    metrics: [],
  },
  {
    slug: "stock-ai-terminal",
    name: "StockAI Terminal",
    tagline:
      "An ML + LLM prototype for stock analysis: AdaBoost signals, walk-forward validated, explained by an LLM fed structured model output so it cites rather than hallucinates — and never gives buy/sell advice.",
    status: "in-progress",
    liveUrl: "https://stock-ai-terminal.streamlit.app/",
    repoUrl: null,
    tags: ["AdaBoost", "Walk-forward CV", "Llama 3.3 · Groq", "GitHub Actions", "Streamlit"],
    featured: false,
    metrics: resolveMetrics("stock-ai-terminal", [
      { key: "walkForwardFolds", label: "Walk-forward folds" },
      { key: "directionalAccuracy", label: "Directional accuracy" },
    ]),
  },
];

// Featured first, otherwise declaration order. Components iterate this.
export const orderedProjects = [...projects].sort(
  (a, b) => Number(b.featured) - Number(a.featured),
);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
