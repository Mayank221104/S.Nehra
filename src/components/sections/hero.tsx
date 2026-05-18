import { ArrowUpRight, Sparkles, CheckCircle2, TrendingUp, Users, Shield } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Reveal } from "../reveal";

const liveActivity = [
  { name: "Aanya R.", role: "SDR @ Razorpay", time: "2h ago" },
  { name: "Karthik M.", role: "CS Lead @ Freshworks", time: "5h ago" },
  { name: "Priya S.", role: "AE @ Postman", time: "1d ago" },
];

const trustBadges = [
  { icon: Shield, label: "Written Job Guarantee" },
  { icon: TrendingUp, label: "94% Placement Rate" },
  { icon: Users, label: "180+ Hiring Partners" },
];

export function Hero() {
  return (
    <section className="grain relative overflow-hidden border-b border-[oklch(0_0_0/0.06)]">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          {/* LEFT — editorial copy */}
          <div>
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
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                A 12-week placement consultancy for ambitious graduates. We train you, certify you,
                and place you in roles worth keeping — backed by a written outcome guarantee.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
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
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
                {trustBadges.map((b) => (
                  <li key={b.label} className="flex items-center gap-2">
                    <b.icon className="h-3.5 w-3.5 text-gold" />
                    <span className="uppercase tracking-[0.14em]">{b.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* RIGHT — dense info card */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="rounded-[24px] border border-[oklch(0_0_0/0.08)] bg-surface p-6 shadow-elevated lg:p-7">
                <div className="flex items-center justify-between border-b border-[oklch(0_0_0/0.06)] pb-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Cohort 14
                    </div>
                    <div className="mt-1 font-display text-xl text-ink">Starts 03 Feb · 12 wks</div>
                  </div>
                  <div className="flex h-2 w-2 animate-pulse rounded-full bg-success" />
                </div>

                {/* Stats mini-grid */}
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {[
                    { v: "94%", l: "Placed" },
                    { v: "₹7.2L", l: "Avg CTC" },
                    { v: "47d", l: "To offer" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-xl bg-muted/60 p-3">
                      <div className="font-display text-2xl text-ink">{s.v}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Live placements */}
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Recent placements
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-gold">Live</div>
                  </div>
                  <ul className="mt-3 divide-y divide-[oklch(0_0_0/0.06)]">
                    {liveActivity.map((a) => (
                      <li key={a.name} className="flex items-center justify-between py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-primary-foreground">
                            {a.name
                              .split(" ")
                              .map((p) => p[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-ink">{a.name}</div>
                            <div className="text-[11px] text-muted-foreground">{a.role}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-success" />
                          {a.time}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer fee strip */}
                <div className="mt-5 flex items-center justify-between rounded-xl border border-dashed border-[oklch(0_0_0/0.12)] bg-background px-4 py-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      Fee · Pay after placement
                    </div>
                    <div className="mt-0.5 font-display text-lg text-ink">
                      ₹89,000{" "}
                      <span className="text-xs text-muted-foreground line-through">₹1,20,000</span>
                    </div>
                  </div>
                  <Link
                    to="/pricing"
                    className="text-xs font-medium text-ink underline-offset-4 hover:underline"
                  >
                    View ISA →
                  </Link>
                </div>
              </div>

              {/* Decorative ticker stack */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 hidden rounded-xl border border-[oklch(0_0_0/0.08)] bg-ink px-4 py-3 text-primary-foreground shadow-elevated lg:block"
              >
                <div className="text-[10px] uppercase tracking-[0.16em] opacity-70">
                  Refundable application
                </div>
                <div className="mt-1 font-display text-base">No coupon games.</div>
              </motion.div>
            </div>
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
