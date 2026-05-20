import { Reveal, RevealGroup, RevealItem } from "../reveal";

// TODO: Replace with real testimonials from S.Nehra users or partners.
const items = [];

const initials = (n: string) =>
  n
    .split(" ")
    .map((p) => p[0])
    .join("");

export function Testimonials() {
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] bg-surface/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <div className="eyebrow">06 — Outcomes</div>
          <h2 className="mt-6 font-display text-display-lg text-ink">
            Real offers. Real people. <span className="italic">No screenshots.</span>
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <RevealItem
              key={it.name}
              className="flex flex-col rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <p className="font-display text-xl leading-relaxed text-ink">"{it.quote}"</p>
              <div className="mt-auto flex items-center gap-4 border-t border-[oklch(0_0_0/0.08)] pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-base text-primary-foreground">
                  {initials(it.name)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-ink">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{it.role}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg text-gold">{it.salary}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    CTC
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
