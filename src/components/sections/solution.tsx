import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "../reveal";

const benefits = [
  "100+ hours of live, cohort-based training",
  "1:1 mentorship from senior operators",
  "Mock interviews until you pass",
  "ATS-tuned resume + portfolio",
  "Warm intros to 180+ hiring partners",
  "Job guarantee — in writing",
];

export function Solution() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-primary-foreground lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-24 lg:px-12">
        <Reveal>
          <div className="eyebrow text-primary-foreground/60">02 — The Solution</div>
          <h2 className="mt-6 font-display text-display-lg text-primary-foreground">
            One program.
            <span className="block italic text-gold-muted">One investment.</span>
            One job offer you actually want.
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-primary-foreground/70">
            We stopped selling courses. We sell outcomes. Every cohort is small,
            curated, and supported until the offer letter lands in your inbox.
          </p>
          <Link
            to="/pricing"
            className="mt-10 inline-flex items-center gap-2 rounded-[14px] bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-muted"
          >
            See pricing & guarantee
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-4 bg-ink/40 px-6 py-5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-sm leading-relaxed text-primary-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
