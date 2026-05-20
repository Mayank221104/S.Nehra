import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "../reveal";

const faqs = [
  {
    q: "Who is this program for?",
    a: "Graduates and early-career professionals (0–3 yrs) targeting high-growth, non-technical careers in SaaS, fintech and e-commerce. You don't need a tech background.",
  },
  {
    q: "What if I don't get placed?",
    a: "Our written guarantee covers either a full refund or continued support until you sign an offer — your choice, no fine print.",
  },
  {
    q: "Is this online or in-person?",
    a: "Live online cohorts with optional in-person meetups in Bengaluru and Mumbai. All sessions are recorded for catch-up.",
  },
  {
    q: "How much time per week?",
    a: "Plan for 12–15 hours per week: 6 hours live, the rest in mentor 1:1s, simulations and assignments.",
  },
  {
    q: "Can I pay after placement?",
    a: "Yes. An Income Share Agreement is available for shortlisted candidates — ₹0 upfront, pay after you start earning.",
  },
  {
    q: "When is the next cohort?",
    a: "We run cohorts every 6 weeks. Applications close 10 days before each start date. Limited to 40 seats per cohort.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <div className="eyebrow">08 — Questions</div>
            <h2 className="mt-6 font-display text-display-lg text-ink">
              Things people <span className="italic">actually</span> ask.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="divide-y divide-[oklch(0_0_0/0.08)] border-t border-b border-[oklch(0_0_0/0.08)]">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-xl text-ink sm:text-2xl">{f.q}</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[oklch(0_0_0/0.12)] text-ink">
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 pr-14 text-base leading-relaxed text-muted-foreground">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
