import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "../reveal";
import { HeroStatsPanel } from "./hero-stats-panel";

export function Hero() {
  return (
    <section className="grain relative overflow-hidden border-b border-[oklch(0_0_0/0.06)]">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 lg:px-12 lg:pb-28 lg:pt-12">
        <div className="flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: Editorial content */}
          <div className="w-full max-w-[640px] flex-1">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-[oklch(0_0_0/0.08)] bg-surface/70 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Cohort 14 · Now Enrolling
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 max-w-[620px] font-display text-[2.9rem] leading-[1.05] font-extrabold tracking-tight text-ink sm:text-[3.3rem] md:text-[3.7rem] lg:text-[4.1rem]">
                Stop Applying.
                <br />
                <span className="block font-sans text-[2.1rem] font-normal not-italic text-muted-foreground tracking-normal sm:text-[2.3rem] md:text-[2.5rem] lg:text-[2.7rem] mt-2">
                  Start Getting Hired.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-[600px] text-lg leading-relaxed text-muted-foreground">
                Unlock your career with a premium 12-week placement experience. We train, certify,
                and place you in roles worth keeping—backed by a written outcome guarantee.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  to="/apply"
                  className="group inline-flex items-center gap-2 rounded-xl bg-ink px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-ink/90 hover:shadow-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  style={{ boxShadow: "0 4px 24px 0 oklch(0.65 0.12 75 / 0.10)" }}
                >
                  Begin Application
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/process"
                  className="inline-flex items-center gap-2 rounded-xl border border-[oklch(0_0_0/0.12)] bg-surface/70 px-7 py-4 text-base font-medium text-ink backdrop-blur transition-colors hover:bg-surface hover:border-gold/40"
                >
                  See how it works
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-ink">1,200+</span> graduates
                </span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/20" />
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-ink">Placed at</span>
                  <span className="opacity-80">Google</span>
                  <span className="opacity-60">Razorpay</span>
                  <span className="opacity-50">Deloitte</span>
                  <span className="opacity-40">Zomato</span>
                </span>
              </div>
            </Reveal>
          </div>
          {/* Right: Premium floating stats panel */}
          <div className="relative flex w-full max-w-md flex-1 items-center justify-center lg:justify-end">
            <HeroStatsPanel />
          </div>
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
