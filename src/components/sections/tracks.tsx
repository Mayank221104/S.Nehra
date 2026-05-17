import { ArrowUpRight, BarChart3, Headphones } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../reveal";

const tracks = [
  {
    icon: BarChart3,
    name: "Sales Excellence",
    tag: "12 weeks · Cohort-based",
    summary: "B2B & SaaS sales for revenue-side careers. Discovery, qualification, demo, close.",
    outcomes: ["SDR / BDR roles", "Inside Sales Executive", "Account Executive (entry)"],
    salary: "₹5.5 – ₹9 L",
    tools: ["HubSpot", "Salesforce", "LinkedIn Sales Navigator", "Apollo"],
    weeks: [
      "Foundations of revenue, ICP, market mapping",
      "Outbound playbooks: email, calls, LinkedIn",
      "Discovery & qualification (BANT, MEDDIC)",
      "Demos, objections, negotiation",
      "Closing, forecasting, pipeline hygiene",
      "Live deals + interview simulations",
    ],
  },
  {
    icon: Headphones,
    name: "Customer Support Mastery",
    tag: "12 weeks · Cohort-based",
    summary: "Modern CX for SaaS, fintech & e-commerce. Tone, tooling, escalation, retention.",
    outcomes: ["Support Associate", "Customer Success (entry)", "Tech Support Specialist"],
    salary: "₹4.5 – ₹7 L",
    tools: ["Zendesk", "Intercom", "Freshdesk", "Notion"],
    weeks: [
      "Service fundamentals & customer empathy",
      "Written tone, macros, ticket triage",
      "Voice & chat — live simulation",
      "Escalations, SLAs, CSAT/NPS",
      "Retention, expansion, churn signals",
      "Live shadowing + interview prep",
    ],
  },
];

export function Tracks() {
  return (
    <section id="tracks" className="border-b border-[oklch(0_0_0/0.06)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <div className="eyebrow">03 — Career Tracks</div>
          <h2 className="mt-6 font-display text-display-lg text-ink">
            Two tracks. Both <span className="italic">in demand.</span> Both <span className="italic">backable.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            We don't teach what's trendy. We teach what hires — high-growth, non-technical
            careers with a real ladder and real compensation.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-8 lg:grid-cols-2">
          {tracks.map((t) => (
            <RevealItem
              key={t.name}
              className="group flex flex-col rounded-[24px] border border-[oklch(0_0_0/0.08)] bg-surface p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated lg:p-10"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-primary-foreground">
                  <t.icon className="h-5 w-5" />
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Expected CTC</div>
                  <div className="mt-1 font-display text-2xl text-gold">{t.salary}</div>
                </div>
              </div>

              <h3 className="mt-8 font-display text-3xl text-ink">{t.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{t.tag}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.summary}</p>

              <div className="mt-8">
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Weekly Roadmap</div>
                <ol className="mt-4 space-y-2.5">
                  {t.weeks.map((w, i) => (
                    <li key={w} className="flex gap-4 text-sm text-foreground">
                      <span className="w-10 shrink-0 font-display text-base text-gold">W{(i + 1) * 2 - 1}–{(i + 1) * 2}</span>
                      <span className="text-muted-foreground">{w}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 grid gap-6 border-t border-[oklch(0_0_0/0.08)] pt-6 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Outcomes</div>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {t.outcomes.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Tools You'll Master</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.tools.map((tl) => (
                      <span key={tl} className="rounded-md border border-[oklch(0_0_0/0.1)] px-2 py-1 text-xs text-foreground">{tl}</span>
                    ))}
                  </div>
                </div>
              </div>

              <a className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold" href="/apply">
                Apply to this track <ArrowUpRight className="h-4 w-4" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
