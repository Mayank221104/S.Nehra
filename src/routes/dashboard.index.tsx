import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/reveal";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

const stats = [
  { l: "Program Progress", v: "62%", d: "Week 7 of 12", icon: TrendingUp },
  { l: "Modules Completed", v: "14 / 22", d: "On track", icon: CheckCircle2 },
  { l: "Mock Interviews", v: "9", d: "Avg score 8.2/10", icon: Clock },
  { l: "Applications Sent", v: "23", d: "5 in pipeline", icon: ArrowUpRight },
];

const activity = [
  { t: "Mock interview", d: "Razorpay SDR · 8.4/10", time: "2h ago", tag: "interview" },
  { t: "Module completed", d: "Outbound Email Playbook", time: "Yesterday", tag: "training" },
  { t: "Application update", d: "Freshworks — moved to round 2", time: "Yesterday", tag: "pipeline" },
  { t: "Mentor 1:1", d: "Session with Priya · Notes available", time: "2 days ago", tag: "mentor" },
];

const tasks = [
  { t: "Submit capstone outline", due: "Tomorrow, 6pm", urgent: true },
  { t: "Prep for Postman screen", due: "Thu, 11am" },
  { t: "Complete: Objection handling drill", due: "Fri" },
];

function Overview() {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Cohort 14 · Week 7</div>
            <h1 className="mt-3 font-display text-display-md text-ink">
              Good morning, <span className="italic">Jane.</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">You're on track. Three deliverables this week.</p>
          </div>
          <Link
            to="/dashboard/jobs"
            className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
          >
            View placement pipeline <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      {/* Stats */}
      <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <RevealItem
            key={s.l}
            className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-start justify-between">
              <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.l}</div>
              <s.icon className="h-4 w-4 text-gold" />
            </div>
            <div className="mt-6 font-display text-4xl text-ink">{s.v}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.d}</div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Progress + Next interview */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl text-ink">Placement Readiness</h2>
                <p className="mt-1 text-sm text-muted-foreground">A live composite of your training, mocks, and pipeline.</p>
              </div>
              <div className="text-right">
                <div className="font-display text-5xl text-gold">82</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Out of 100</div>
              </div>
            </div>
            <div className="mt-8 space-y-5">
              {[
                { l: "Training completion", v: 64 },
                { l: "Interview performance", v: 82 },
                { l: "Resume & portfolio", v: 90 },
                { l: "Application activity", v: 75 },
              ].map((b) => (
                <div key={b.l}>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground">{b.l}</span>
                    <span className="text-muted-foreground">{b.v}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-ink transition-all" style={{ width: `${b.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-ink p-8 text-primary-foreground shadow-soft">
            <div className="eyebrow text-primary-foreground/60">Next Interview</div>
            <div className="mt-6 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gold" />
              <div className="text-sm">Thu, 14 Aug · 11:00 AM</div>
            </div>
            <h3 className="mt-4 font-display text-3xl text-primary-foreground">Postman</h3>
            <div className="mt-1 text-sm text-primary-foreground/60">Account Executive (entry) · Round 2</div>
            <div className="mt-auto pt-8">
              <button className="w-full rounded-[14px] bg-gold px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold-muted">
                Prepare with mentor
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Activity + Tasks */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
            <h2 className="font-display text-2xl text-ink">Recent Activity</h2>
            <ul className="mt-6 divide-y divide-[oklch(0_0_0/0.06)]">
              {activity.map((a) => (
                <li key={a.t + a.d} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs uppercase tracking-wider text-ink">
                    {a.tag[0]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-ink">{a.t}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.d}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[24px] border border-[oklch(0_0_0/0.06)] bg-surface p-8 shadow-soft">
            <h2 className="font-display text-2xl text-ink">This week</h2>
            <ul className="mt-6 space-y-4">
              {tasks.map((t) => (
                <li key={t.t} className="flex items-start gap-3">
                  <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${t.urgent ? "bg-destructive" : "bg-gold"}`} />
                  <div>
                    <div className="text-sm text-ink">{t.t}</div>
                    <div className="text-xs text-muted-foreground">{t.due}</div>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full rounded-[14px] border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted">
              View all tasks
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
