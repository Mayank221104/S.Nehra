import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "../reveal";

const includes = [
  "Live cohort training",
  "1:1 mentorship & feedback loops",
  "Unlimited mock interviews",
  "ATS-tuned resume & portfolio",
  "Verified completion certificate",
  "Warm intros to trusted partners",
  "Lifetime alumni community",
];

// Must match backend TRACK_PRICES exactly (id + price).
// Keep in sync with backend/src/controllers/payment.controller.ts
// and frontend/src/routes/apply.tsx
const COURSES = [
  {
    id: "skill-development",
    title: "Skill Development",
    desc: "Foundational job-readiness and workplace skills.",
    price: 2999,
    mrp: 5999,
  },
  {
    id: "sales-excellence",
    title: "Sales Excellence",
    desc: "B2B & SaaS sales careers. SDR, BDR, AE.",
    price: 4949,
    mrp: 9999,
    featured: true,
  },
  {
    id: "customer-support",
    title: "Customer Support Mastery",
    desc: "Modern CX for SaaS, fintech, e-commerce.",
    price: 4999,
    mrp: 9999,
  },
  {
    id: "web-development",
    title: "Web Development",
    desc: "Full-stack web development track.",
    price: 14999,
    mrp: 24999,
  },
  {
    id: "marketing-growth",
    title: "Marketing & Growth",
    desc: "Performance marketing and growth playbooks.",
    price: 4999,
    mrp: 9999,
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    desc: "Analytics tooling and BI fundamentals.",
    price: 14999,
    mrp: 24999,
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    desc: "E-commerce operations and growth.",
    price: 4999,
    mrp: 9999,
  },
];

export function Pricing() {
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] py-20 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="eyebrow"> Pricing</div>
          <h2 className="mt-6 font-display text-display-lg text-ink">
            Pick your track. <span className="italic">One outcome.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            No hidden fees. No coupon games. Pay upfront and get placed.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COURSES.map((c) => (
              <div
                key={c.id}
                className={`flex flex-col rounded-[24px] border p-8 shadow-elevated transition-all hover:-translate-y-0.5 ${
                  c.featured
                    ? "border-ink bg-ink text-primary-foreground"
                    : "border-[oklch(0_0_0/0.08)] bg-surface"
                }`}
              >
                {c.featured && (
                  <div className="mb-4 inline-flex w-fit items-center rounded-full bg-gold/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gold">
                    Most popular
                  </div>
                )}
                <h3 className="font-display text-2xl">{c.title}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    c.featured ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {c.desc}
                </p>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-4xl">
                    ₹{c.price.toLocaleString("en-IN")}
                  </span>
                  <span
                    className={`text-sm line-through ${
                      c.featured ? "text-primary-foreground/50" : "text-muted-foreground"
                    }`}
                  >
                    ₹{c.mrp.toLocaleString("en-IN")}
                  </span>
                </div>
                <p
                  className={`mt-1 text-xs uppercase tracking-[0.16em] ${
                    c.featured ? "text-gold" : "text-gold"
                  }`}
                >
                  Special launch price
                </p>
                <Link
                  to="/apply"
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-[14px] px-6 py-3.5 text-sm font-medium transition-all ${
                    c.featured
                      ? "bg-gold text-ink hover:shadow-gold"
                      : "bg-ink text-primary-foreground hover:bg-ink/90 hover:shadow-gold"
                  }`}
                >
                  Apply now
                </Link>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-[28px] border border-[oklch(0_0_0/0.08)] bg-surface p-10 shadow-elevated">
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Included with every track
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {includes.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Book your slot · Limited seats per cohort
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}