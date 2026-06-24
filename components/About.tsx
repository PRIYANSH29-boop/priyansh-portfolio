import { site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-shell px-6 py-section">
        <p className="font-mono text-overline uppercase text-ink-faint">About</p>

        <div className="mt-6 max-w-prose space-y-4 text-lg leading-relaxed text-ink">
          <p>
            I&apos;m {site.name}, a junior ML engineer based in {site.location}.
            I&apos;m focused on machine learning for finance — fraud, risk, and the
            unglamorous data work that makes a model trustworthy in production.
          </p>
          <p>
            Lately I&apos;ve been building two systems end to end: a credit-card
            fraud detector that prices its errors in pounds, and RankAlpha, a
            cross-sectional equity ranker with a leakage-controlled, cost-aware
            backtest. I care more about honest metrics and clean pipelines than
            leaderboard scores.
          </p>
          <p>
            I&apos;m looking for an ML/AI role where I can learn from senior engineers
            and ship real systems — ideally at a UK fintech or bank.
          </p>
        </div>
      </div>
    </section>
  );
}
