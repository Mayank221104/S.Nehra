import { ArrowUpRight, BarChart3, Headphones, Users, Megaphone, Briefcase, Star } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "../reveal";
import { Code2 } from "lucide-react";

const tracks = [
  {
    icon: Star,
    name: "Skill Development",
    tag: "21 days · Cohort-based",
    summary: "Communication, interview preparation and resume building — closing the gap between qualification and getting hired.",
    outcomes: ["Interview-ready fresh graduate", "Confident career switcher", "Certified job-seeker with placement support"],
    originalPrice: 5999,
    discountedPrice: 2999,
    tools: ["STAR Method", "PREP Framework", "LinkedIn", "ATS Resume Builder", "Slack / Teams"],
    weeks: [
      "Days 1–7: Communication foundations — verbal, written, body language & public speaking",
      "Days 8–14: Interpersonal & workplace skills — GDs, assertiveness, video-call etiquette",
      "Days 15–18: Resume polish, LinkedIn building & interview preparation strategy",
      "Day 19: Mock Interview 1 — individual 25-min panel with written feedback",
      "Day 20: Mock Interview 2 — panel style + placement partner matching",
    ],
    isSkillDev: true,
    duration: "21 days",
  },
  {
    icon: BarChart3,
    name: "Sales Excellence",
    tag: "21 days · Cohort-based",
    summary: "B2B & SaaS sales for revenue-side careers. Discovery, qualification, demo, close.",
    outcomes: ["SDR / BDR roles", "Inside Sales Executive", "Account Executive (entry)"],
    originalPrice: 9899,
    discountedPrice: 4949,
    tools: ["HubSpot", "Salesforce", "LinkedIn Sales Navigator", "Apollo"],
    weeks: [
      "Days 1–7: Sales foundations — ICP, market mapping, outbound playbooks (email, calls, LinkedIn)",
      "Days 8–14: Discovery & qualification (BANT, MEDDIC), demos, objection handling & negotiation",
      "Days 15–18: Closing, forecasting, pipeline hygiene + resume & LinkedIn for sales roles",
      "Day 19: Mock Interview 1 — individual sales role-play & HR round with written feedback",
      "Day 20: Mock Interview 2 — panel + live deal simulation + placement matching",
    ],
    isSkillDev: false,
    duration: "21 days",
  },
  {
    icon: Headphones,
    name: "Customer Support Mastery",
    tag: "21 days · Cohort-based",
    summary: "Modern CX for SaaS, fintech & e-commerce. Tone, tooling, escalation, retention.",
    outcomes: ["Support Associate", "Customer Success (entry)", "Tech Support Specialist"],
    originalPrice: 9999,
    discountedPrice: 4999,
    tools: ["Zendesk", "Intercom", "Freshdesk", "Notion"],
    weeks: [
      "Days 1–7: Service fundamentals — customer empathy, written tone, macros & ticket triage",
      "Days 8–14: Voice & chat simulation, escalations, SLAs, CSAT/NPS & retention tactics",
      "Days 15–18: Churn signals, live shadowing, resume & LinkedIn for CX roles",
      "Day 19: Mock Interview 1 — individual CX role-play with written feedback",
      "Day 20: Mock Interview 2 — panel style + placement partner matching",
    ],
    isSkillDev: false,
    duration: "21 days",
  },
  {
    icon: Code2,
    name: "Web Development",
    tag: "21 days · Cohort-based",
    summary: "Learn to build and deploy modern, responsive websites and full-stack web applications.",
    outcomes: ["Frontend Developer", "Backend Developer", "Full-Stack Developer"],
    originalPrice: 29999,
    discountedPrice: 14999,
    tools: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git & GitHub"],
    weeks: [
      "Week 1–4: Web fundamentals — HTML, CSS, responsive design & JavaScript ES6+",
      "Week 4–5: React, components, hooks & modern frontend development",
      "Week 5–9: Node.js, Express, REST APIs, MongoDB, authentication & Git",
      "Week 9–10: Mock Interview 1 — individual technical + HR round with written feedback",
      "Week 10–12: Live full-stack project presentation + portfolio review + placement matching",
    ],
    isSkillDev: false,
    duration: "2 months",
  },
  {
    icon: Users,
    name: "Marketing & Growth",
    tag: "21 days · Cohort-based",
    summary: "Digital Marketing | Performance Marketing | Growth — practical campaign execution skills for high-growth companies.",
    outcomes: ["Growth Marketing Associate", "Digital Marketing Executive", "Social Media / Ads Executive"],
    originalPrice: 9999,
    discountedPrice: 4999,
    tools: ["Google Ads", "Meta Ads Manager", "GA4", "Mailchimp", "HubSpot", "Canva"],
    weeks: [
      "Days 1–7: Marketing foundations — branding, content, SEO, social media & email marketing",
      "Days 8–14: Google Ads, Meta Ads, GA4 analytics, AARRR growth framework & A/B testing",
      "Days 15–18: Performance budgeting, influencer marketing, resume & LinkedIn for marketing roles",
      "Day 19: Mock Interview 1 — individual 25-min 'pitch this campaign' exercise with feedback",
      "Day 20: Panel mock + campaign strategy case study + placement partner matching",
    ],
    isSkillDev: false,
    duration: "21 days",
  },
  {
    icon: Megaphone,
    name: "Data Analytics",
    tag: "3 months · Cohort-based",
    summary: "Excel | SQL | Python | Power BI | Tableau — end-to-end analytics skills to secure a Data or Business Analyst role.",
    outcomes: ["Data Analyst", "Business Analyst", "Reporting / Product Analyst"],
    originalPrice: 29999,
    discountedPrice: 14999,
    tools: ["Excel", "SQL", "Python (pandas)", "Power BI", "Tableau", "GitHub"],
    weeks: [
      "Week 1–2: Excel mastery — formulas, pivot tables, dashboards & data visualisation principles",
      "Week 3–4: SQL fundamentals & advanced — JOINs, CTEs, window functions & query optimisation",
      "Week 5–7: Statistics, Python (pandas, matplotlib, seaborn) & Jupyter Notebook reports",
      "Week 8–9: Power BI (DAX, data modelling) & Tableau (calculated fields, published dashboards)",
      "Week 10–12: Business case studies, capstone project (SQL + Python + BI) & placement prep",
    ],
    isSkillDev: false,
    duration: "3 months",
  },
  {
    icon: Briefcase,
    name: "E-Commerce",
    tag: "21 days · Cohort-based",
    summary: "Store Operations | Marketplace Management | Growth — hands-on skills for India's booming e-commerce sector.",
    outcomes: ["Marketplace Operations Executive", "E-Commerce Executive", "Online Store Manager"],
    originalPrice: 9999,
    discountedPrice: 4999,
    tools: ["Shopify", "Amazon Seller Central", "Flipkart Seller Hub", "Razorpay", "Google Analytics"],
    weeks: [
      "Days 1–7: E-commerce platforms, Shopify store setup, product listing & catalogue management",
      "Days 8–14: Logistics, payments, marketplace SEO, Amazon/Meta Ads, pricing & promotions",
      "Days 15–18: E-commerce analytics, category ops, resume & LinkedIn for e-commerce roles",
      "Day 19: Mock Interview 1 — individual 25-min 'optimise this listing' exercise with feedback",
      "Day 20: Panel mock + operations case study + placement partner matching",
    ],
    isSkillDev: false,
    duration: "21 days",
  },
];

export function Tracks() {
  return (
    <section id="tracks" className="border-b border-[oklch(0_0_0/0.06)] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <div className="eyebrow">03 — Career Tracks</div>
          <h2 className="mt-6 font-display text-display-lg text-ink">
            Seven tracks. All <span className="italic">in demand.</span> All <span className="italic">backable.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            We don't teach what's trendy. We teach what hires — high-growth careers
            with a real ladder, real compensation, and a placement guarantee.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-8 lg:grid-cols-2">
          {tracks.map((t) => (
            <RevealItem
              key={t.name}
              className={`group flex flex-col rounded-[24px] border p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated lg:p-10 ${
                t.isSkillDev
                  ? "border-[oklch(0.65_0.22_40/0.35)] bg-[oklch(0.65_0.22_40/0.04)]"
                  : "border-[oklch(0_0_0/0.08)] bg-surface"
              }`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground ${
                  t.isSkillDev ? "bg-gold" : "bg-ink"
                }`}>
                  <t.icon className="h-5 w-5" />
                </div>

                {/* Pricing block */}
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Original price struck through */}
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{t.originalPrice.toLocaleString("en-IN")}
                    </span>
                    {/* 50% off badge */}
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                      50% OFF
                    </span>
                  </div>
                  {/* Discounted price */}
                  <div className="mt-0.5 font-display text-2xl font-semibold text-gold">
                    ₹{t.discountedPrice.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.duration} · all-inclusive</div>
                </div>
              </div>

              {/* Featured badge for Skill Development */}
              {t.isSkillDev && (
                <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[oklch(0.65_0.22_40/0.3)] bg-[oklch(0.65_0.22_40/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  ✦ Communication · Interview · Resume
                </div>
              )}

              <h3 className="mt-8 font-display text-3xl text-ink">{t.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{t.tag}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{t.summary}</p>

              {/* Roadmap */}
              <div className="mt-8">
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Program Roadmap
                </div>
                <ol className="mt-4 space-y-3">
                  {t.weeks.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      {/* Step number circle */}
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        t.isSkillDev
                          ? "bg-[oklch(0.65_0.22_40/0.15)] text-gold"
                          : "bg-ink/10 text-ink"
                      }`}>
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Outcomes + Tools */}
              <div className="mt-8 grid gap-6 border-t border-[oklch(0_0_0/0.08)] pt-6 sm:grid-cols-2">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Outcomes</div>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {t.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2">
                        <span className="mt-1 text-gold">›</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Tools & Frameworks
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {t.tools.map((tl) => (
                      <span
                        key={tl}
                        className="rounded-md border border-[oklch(0_0_0/0.1)] px-2 py-1 text-xs text-foreground"
                      >
                        {tl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 90-day guarantee callout for Skill Dev */}
              {t.isSkillDev && (
                <div className="mt-6 rounded-xl border border-[oklch(0.65_0.22_40/0.2)] bg-[oklch(0.65_0.22_40/0.06)] px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-gold">90-Day Placement Guarantee —</span>{" "}
                  If you don't receive a job offer within 90 days of certification, we retrain you at zero additional cost.
                </div>
              )}

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