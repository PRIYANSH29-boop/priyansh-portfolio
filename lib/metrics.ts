// Build-safe loader for content/metrics/<slug>.json.
// A missing file or a null/absent field both resolve to null, which the UI
// renders as "[pending]". Real numbers are committed to the JSON by hand, so
// the site never ships a fabricated metric and never fails the build.

export type MetricValue = number | string | null;
export type Metric = { label: string; value: MetricValue };
export type MetricDef = { key: string; label: string };

type MetricsFile = Record<string, MetricValue>;

// webpack built-in — declared here because TS doesn't ship its type.
declare const require: {
  context(dir: string, recursive: boolean, re: RegExp): {
    keys(): string[];
    (id: string): unknown;
  };
};

// Eagerly read every JSON in the folder. A lookup for a slug with no file
// just returns undefined (never throws), so a forgotten JSON can't break SSG.
const ctx = require.context("../content/metrics", false, /\.json$/);
const registry: Record<string, MetricsFile> = {};
for (const file of ctx.keys()) {
  const slug = file.replace(/^\.\//, "").replace(/\.json$/, "");
  registry[slug] = (ctx(file) as MetricsFile) ?? {};
}

export function resolveMetrics(slug: string, defs: MetricDef[]): Metric[] {
  const data = registry[slug] ?? {};
  return defs.map(({ key, label }) => ({ label, value: data[key] ?? null }));
}
