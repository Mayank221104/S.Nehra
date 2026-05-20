import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { TrendingUp, Award, Building2, Clock, Users2, BadgeCheck } from "lucide-react";

const headline = [
  { v: "94%", l: "Placement rate", s: "across last 6 cohorts" },
  { v: "₹7.2L", l: "Avg. CTC", s: "median package post-program" },
  { v: "47", l: "Days to offer", s: "from program start" },
  { v: "180+", l: "Hiring partners", s: "active recruiter network" },
];

const proofs = [
  { icon: TrendingUp, k: "3.2×", v: "Interview-to-offer rate vs. self-applied candidates." },
  { icon: Award, k: "Top 8%", v: "Of placed candidates received counter-offers within 90 days." },
  { icon: Building2, k: "62", v: "SaaS, fintech & e-commerce brands hire from us each cohort." },
  { icon: Clock, k: "12 wk", v: "Cohort duration. Live, not async. Mentor-paired throughout." },
  { icon: Users2, k: "1:8", v: "Mentor-to-candidate ratio. Real feedback every week." },
  { icon: BadgeCheck, k: "100%", v: "Written outcome guarantee. No coupon games. No fine print." },
];

export function ByTheNumbers() {
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <Reveal>
            <div className="eyebrow">06 — By the Numbers</div>
            <h2 className="mt-6 font-display text-display-lg text-ink">
              The receipts. <span className="italic text-muted-foreground">Audited quarterly.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              Every metric below is reported per cohort, audited by our placement committee, and
              published in our annual outcomes report.
            </p>
          </Reveal>

          <div>
            {/* Headline stat strip */}
            <div className="grid grid-cols-2 divide-x divide-y divide-[oklch(0_0_0/0.08)] overflow-hidden rounded-[24px] border border-[oklch(0_0_0/0.08)] bg-surface sm:grid-cols-4 sm:divide-y-0">
              {headline.map((s) => (
                <div key={s.l} className="p-6">
                  <div className="font-display text-3xl text-ink lg:text-4xl">{s.v}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {s.l}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground/80">{s.s}</div>
                </div>
              ))}
            </div>

            {/* Proof grid — denser */}
            <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {proofs.map((p) => (
                <RevealItem
                  key={p.k}
                  className="flex items-start gap-4 rounded-2xl border border-[oklch(0_0_0/0.06)] bg-surface p-5 transition-colors hover:bg-muted/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-ink">
                    <p.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-display text-2xl text-ink">{p.k}</div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.v}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
