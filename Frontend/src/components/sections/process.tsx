import { Reveal } from "../reveal";

const steps = [
  { n: "01", t: "Train", d: "21 days of live cohort training. Frameworks, simulations, mentors who've shipped." },
  { n: "02", t: "Get Certified", d: "Capstone assessment + employer-recognized certificate. Verified, ATS-friendly." },
  { n: "03", t: "Get Hired", d: "Warm intros, interview prep, and ongoing support until you sign the offer." },
];

export function Process() {
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <div className="eyebrow">04 — The Process</div>
          <h2 className="mt-6 font-display text-display-lg text-ink">
            Three steps. <span className="italic">No detours.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-12 lg:grid-cols-3 lg:gap-0">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative h-full lg:px-8">
                {i < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-px w-full -translate-x-0 bg-gradient-to-r from-[oklch(0_0_0/0.15)] to-transparent lg:block" aria-hidden />
                )}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-[oklch(0_0_0/0.12)] bg-background font-display text-2xl text-gold">
                  {s.n}
                </div>
                <h3 className="mt-8 font-display text-3xl text-ink">{s.t}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
