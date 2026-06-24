import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "../reveal";

const includes = [
  "21 days live cohort training",
  "1:1 mentorship & feedback loops",
  "Unlimited mock interviews",
  "ATS-tuned resume & portfolio",
  "Verified completion certificate",
  "Warm intros to Trusted partners",
  "Lifetime alumni community",
];

export function Pricing() {
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] py-20 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow"> Pricing</div>
          <h2 className="mt-6 font-display text-display-lg text-ink">
            One investment. <span className="italic">One outcome.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            No hidden fees. No coupon games. Pay upfront and get placed.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-[28px] border border-[oklch(0_0_0/0.08)] bg-surface shadow-elevated">
            <div className="grid lg:grid-cols-[1.2fr_1fr]">
              <div className="border-b border-[oklch(0_0_0/0.08)] p-10 lg:border-b-0 lg:border-r">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Full Program
                </div>
                <h3 className="mt-3 font-display text-4xl text-ink">SNehra Solutions Cohort</h3>
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="font-display text-6xl text-ink">₹4,999</span>
                  <span className="text-sm text-muted-foreground line-through">₹10,000</span>
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-gold">
                  50% OFF · Special Launch Price for the first Batch
                </p>
                <Link
                  to="/apply"
                  className="mt-10 inline-flex w-full items-center justify-center rounded-[14px] bg-ink px-6 py-4 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
                >
                  Apply for the next cohort
                </Link>
                <p className="mt-4 text-xs text-muted-foreground">
                  Book your Slot · Limited seats per cohort
                </p>
              </div>
              <div className="p-10">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  What's included
                </div>
                <ul className="mt-5 space-y-3">
                  {includes.map((i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
