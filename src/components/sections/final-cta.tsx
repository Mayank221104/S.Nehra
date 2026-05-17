import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../reveal";

export function FinalCTA() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-32 text-primary-foreground lg:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
        <Reveal>
          <div className="eyebrow text-primary-foreground/60">09 — Next Cohort</div>
          <h2 className="mt-6 font-display text-display-xl leading-[1.05] text-primary-foreground">
            The next 12 weeks will pass anyway.
            <span className="block italic text-gold-muted">Spend them getting hired.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-primary-foreground/70">
            40 seats. Closes when full. Applications are reviewed in 48 hours.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 rounded-[14px] bg-gold px-8 py-4 text-sm font-medium text-ink transition-all hover:bg-gold-muted hover:shadow-gold"
            >
              Begin Application
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-[14px] border border-white/20 px-8 py-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-white/5"
            >
              Talk to admissions
            </Link>
          </div>
        </Reveal>
      </div>
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" aria-hidden />
    </section>
  );
}
