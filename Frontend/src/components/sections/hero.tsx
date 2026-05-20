import { ArrowUpRight, Sparkles, TrendingUp, Users, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "../reveal";

const trustBadges = [
  { icon: Shield, label: "Written Job Guarantee" },
  { icon: TrendingUp, label: "94% Placement Rate" },
  { icon: Users, label: "180+ Hiring Partners" },
];

export function Hero() {
  return (
    <section className="grain relative overflow-hidden border-b border-[oklch(0_0_0/0.06)]">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center justify-center px-6 py-20 lg:px-12">
        {/* CENTERED CONTENT */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0_0_0/0.08)] bg-surface/70 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Cohort 14 · Enrolling · 19 seats left
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-7 font-display text-display-xl font-medium text-ink">
              Stop Applying.
              <span className="block italic text-muted-foreground">Start Getting Hired.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              A 12-week placement consultancy for ambitious graduates. We train you, certify you,
              and place you in roles worth keeping — backed by a trusted network.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/apply"
                className="group inline-flex items-center gap-2 rounded-[14px] bg-ink px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
              >
                Begin Application
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/process"
                className="inline-flex items-center gap-2 rounded-[14px] border border-[oklch(0_0_0/0.12)] bg-surface/70 px-6 py-3.5 text-sm font-medium text-ink backdrop-blur transition-colors hover:bg-surface"
              >
                How the program works
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              {trustBadges.map((b) => (
                <li key={b.label} className="flex items-center gap-2">
                  <b.icon className="h-3.5 w-3.5 text-gold" />
                  <span className="uppercase tracking-[0.14em]">{b.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      {/* Decorative editorial accent */}
      <div
        className="pointer-events-none absolute -right-32 top-32 h-[480px] w-[480px] rounded-full bg-gold-muted/30 blur-3xl"
        aria-hidden
      />
    </section>
  );
}
