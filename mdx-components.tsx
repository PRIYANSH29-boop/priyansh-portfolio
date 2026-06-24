import type { MDXComponents } from "mdx/types";

const linkClass =
  "text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent";

/**
 * Two-column editorial section: mono label on the left, prose on the right.
 * Authored in MDX as <Section label="Problem"> … </Section>.
 */
function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 md:grid-cols-[170px_1fr] md:gap-10">
      <h2 className="font-mono text-overline uppercase text-ink-faint md:pt-1">
        {label}
      </h2>
      <div className="max-w-prose">{children}</div>
    </section>
  );
}

/** Honest-limitation callout. */
function Caveat({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-6 rounded-lg border border-line bg-wash/60 p-4">
      <p className="font-mono text-overline uppercase text-ink-faint">Honest caveat</p>
      <div className="mt-2 text-sm leading-relaxed text-ink-muted [&_strong]:text-ink">
        {children}
      </div>
    </aside>
  );
}

/** Screenshot / chart slot (static — never an iframe). */
function Figure({
  src,
  alt,
  caption,
}: {
  src?: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <figure className="mt-6">
      {src ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-line bg-wash">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? caption ?? ""}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="grid aspect-[16/9] place-items-center rounded-lg border border-line bg-wash text-xs text-ink-faint">
          {caption ?? "Figure — to be added"}
        </div>
      )}
      {caption ? (
        <figcaption className="mt-2 text-xs text-ink-faint">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="font-display text-display-md font-medium text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-8 font-display text-lg font-medium text-ink">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="leading-relaxed text-ink [&:not(:first-child)]:mt-4">{children}</p>
    ),
    ul: ({ children }) => <ul className="mt-4 space-y-2">{children}</ul>,
    li: ({ children }) => (
      <li className="flex gap-3 leading-relaxed text-ink-muted">
        <span className="select-none text-ink-faint">—</span>
        <span>{children}</span>
      </li>
    ),
    a: ({ href, children }) => {
      const external = typeof href === "string" && href.startsWith("http");
      return (
        <a
          href={href}
          className={linkClass}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-wash px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-wash p-4 font-mono text-sm leading-relaxed text-ink">
        {children}
      </pre>
    ),
    hr: () => <hr className="my-10 border-line" />,
    Section,
    Caveat,
    Figure,
    ...components,
  };
}
