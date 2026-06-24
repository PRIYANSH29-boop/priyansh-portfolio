# Portfolio

My personal portfolio — an ML / AI engineer based in London. A small, deliberately
restrained Next.js site that documents the engineering behind a couple of real
projects rather than dressing them up.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**, strict
- **Tailwind CSS 3** — custom design tokens, no component library
- **Framer Motion** — light, on-scroll motion only
- **MDX** (`@next/mdx`) — long-form case studies authored as content, not hard-coded
- **lucide-react** — icons

No 3D, no scroll hijacking, no analytics. An earlier version leaned on React Three
Fiber and Lenis smooth-scroll; both were removed in favour of something quieter and
faster.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

A `Dockerfile` and `compose.yaml` are included for containerised builds.

## How project content works

Projects are data-driven from a single source of truth, so adding or finishing one
is a small, local edit.

- **`lib/projects.ts`** — one typed object per project (name, tagline, status, links,
  tags, metrics).
- **`content/<slug>.mdx`** — the long-form case study, authored in MDX with
  `Section` / `Caveat` / `Figure` components.
- **`content/metrics/<slug>.json`** — the project's real numbers, committed by hand
  once they're validated.

The home grid, the `/work/[slug]` case-study page, tags, status badge, live/repo
links, and featured ordering all derive from that data. **Adding a project = one
object + one MDX + one metrics JSON. Nothing else.**

### Honest metrics by construction

Metric values live in the JSON and default to `null`. A `null` — or a missing
file/field — renders as `[pending]`, never a placeholder number. Real figures show
only once they've been measured and committed. The site can't accidentally ship a
fabricated metric, and a missing JSON never breaks the build.

## Structure

```
app/
  page.tsx              # Hero · Selected work · About · Contact
  work/[slug]/          # case-study pages, MDX resolved by slug
components/             # Hero, SelectedWork, About, Contact, Metrics, …
content/
  <slug>.mdx            # case studies
  metrics/<slug>.json   # validated numbers
lib/
  projects.ts           # single source of truth
  metrics.ts            # build-safe metric loader
```
