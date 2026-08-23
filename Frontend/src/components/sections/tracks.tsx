import { ArrowUpRight, BarChart3, Headphones, TrendingUp, Users, Megaphone, Briefcase } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../reveal";

const tracks = [
  {
    icon: BarChart3,
    name: "Sales Excellence",
    tag: "21 days · Cohort-based",
    summary: "B2B & SaaS sales for revenue-side careers. Discovery, qualification, demo, close.",
    outcomes: ["SDR / BDR roles", "Inside Sales Executive", "Account Executive (entry)"],
    salary: "Upto ₹5.5 L",
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
    tag: "21 days · Cohort-based",
    summary: "Modern CX for SaaS, fintech & e-commerce. Tone, tooling, escalation, retention.",
    outcomes: ["Support Associate", "Customer Success (entry)", "Tech Support Specialist"],
    salary: "Upto ₹4.5 L",
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
  {
    icon: TrendingUp,
    name: "Business Development",
    tag: "21 days · Cohort-based",
    summary: "Strategic partnerships, market expansion and revenue growth for high-growth startups.",
    outcomes: ["BD Executive", "Partnerships Associate", "Growth Associate"],
    salary: "Upto ₹6 L",
    tools: ["LinkedIn", "Apollo", "Notion", "Google Sheets"],
    weeks: [
      "BD fundamentals, TAM/SAM/SOM analysis",
      "Prospecting, cold outreach & warm intros",
      "Partnership frameworks & deal structuring",
      "Negotiation tactics & term sheets basics",
      "Pipeline management & CRM workflows",
      "Live BD simulation + interview prep",
    ],
  },
  {
    icon: Users,
    name: "Marketing & Growth",
    tag: "21 days · Cohort-based",
    summary: "End-to-end marketing strategies for driving growth and customer acquisition.",
    outcomes: ["Marketing Executive", "Growth Marketing Specialist", "Content Marketing Manager"],
    salary: "Upto ₹5 L",
    tools: ["HubSpot", "Salesforce", "LinkedIn Sales Navigator", "Apollo"],
    weeks: [
      "Marketing fundamentals, consumer psychology & positioning",
      "SEO, content strategy & copywriting",
      "Paid media: Meta & Google Ads",
      "Email marketing, automation & funnels",
      "Analytics: GA4, dashboards & reporting",
      "Live campaign + portfolio review",
    ],
  },
  {
    icon: Megaphone,
    name: "Data Analytics",
    tag: "21 days · Cohort-based",
    summary: "Data-driven insights for informed decision-making in business and marketing.",
    outcomes: ["Data Analyst", "Business Intelligence Specialist", "Marketing Analyst"],
    salary: "Upto ₹5 L",
    tools: ["Tableau", "Power BI", "Python", "SQL"],
    weeks: [
      "Analytics fundamentals & data visualization",
      "Statistical analysis & hypothesis testing",
      "Database querying & data cleaning",
      "Predictive modeling & forecasting",

      "Analytics: GA4, dashboards & reporting",
      "Live campaign + portfolio review",
    ],
  },
  {
    icon: Briefcase,
    name: "Operations & Project Management",
    tag: "21 days · Cohort-based",
    summary: "Process design, cross-functional coordination and delivery management for ops roles.",
    outcomes: ["Operations Executive", "Project Coordinator", "Business Analyst (entry)"],
    salary: "Upto ₹5.2 L",
    tools: ["Notion", "Jira", "Asana", "Google Workspace"],
    weeks: [
      "Ops fundamentals, process mapping & SOPs",
      "Project planning: scope, timeline & risk",
      "Agile & Scrum for non-tech teams",
      "Data-driven decisions: sheets & dashboards",
      "Vendor management & stakeholder comms",
      "Live ops case study + interview prep",
    ],
  },
];

const dayRanges = ["D1–D2", "D2–D5", "D5–D10", "D10–D17", "D17–D21"];

export function Tracks() {
  return (
    <section id="tracks" className="border-b border-[oklch(0_0_0/0.06)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <div className="eyebrow">03 — Career Tracks</div>
          <h2 className="mt-6 font-display text-display-lg text-ink">
            Six tracks. All <span className="italic">in demand.</span> All <span className="italic">backable.</span>
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
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Daily Roadmap</div>
                <ol className="mt-4 space-y-2.5">
                  {t.weeks.map((D, i) => (
                    <li key={D} className="flex gap-4 text-sm text-foreground">
                      <span className="w-16 shrink-0 font-display text-base text-gold whitespace-nowrap">
                        {dayRanges[i]}
                      </span>
                      <span className="text-muted-foreground">{D}</span>
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

              <a
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-gold"
                href="/apply"
              >
                Apply to this track <ArrowUpRight className="h-4 w-4" />
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}