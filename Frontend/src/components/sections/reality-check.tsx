import { AlertCircle, Frown, ScanLine, Briefcase } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../reveal";

const pains = [
  { icon: ScanLine, t: "ATS Black Holes", d: "Your resume never reaches a human. Keywords miss, formats break, you never hear back." },
  { icon: Frown, t: "Interview Freeze", d: "You know the answers in your head. The moment they ask, your mind goes blank." },
  { icon: Briefcase, t: "Corporate Gap", d: "Your degree taught theory. Companies want polish, structure, communication, ownership." },
  { icon: AlertCircle, t: "Career Drift", d: "Switching fields feels impossible. You're stuck in the wrong role with no clear exit." },
];

export function RealityCheck() {
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <Reveal>
            <div className="eyebrow">01 — Reality Check</div>
            <h2 className="mt-6 font-display text-display-lg text-ink">
              The job market doesn't reward
              <span className="italic"> effort. </span>
              It rewards <span className="italic">readiness.</span>
            </h2>
          </Reveal>

          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {pains.map((p) => (
              <RevealItem
                key={p.t}
                className="group rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-7 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-ink transition-colors group-hover:bg-ink group-hover:text-primary-foreground">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
