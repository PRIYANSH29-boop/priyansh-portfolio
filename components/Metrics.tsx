import type { Metric } from "@/lib/metrics";
import type { ProjectStatus } from "@/lib/projects";

/**
 * Renders a project's validated metrics.
 * - in-progress: only non-null metrics show; empty slots are hidden, and if
 *   nothing is validated yet the block disappears entirely.
 * - live: all declared metrics show; a null value renders "[pending]" rather
 *   than a fabricated number.
 */
export function Metrics({
  metrics,
  status,
}: {
  metrics: Metric[];
  status: ProjectStatus;
}) {
  const visible =
    status === "live" ? metrics : metrics.filter((m) => m.value !== null);

  if (visible.length === 0) return null;

  return (
    <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
      {visible.map((m) => (
        <div key={m.label}>
          <dt className="font-mono text-overline uppercase text-ink-faint">
            {m.label}
          </dt>
          <dd
            className={
              m.value === null
                ? "mt-1 font-display text-lg text-ink-faint"
                : "mt-1 font-display text-lg font-medium text-ink"
            }
          >
            {m.value === null ? "[pending]" : m.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
