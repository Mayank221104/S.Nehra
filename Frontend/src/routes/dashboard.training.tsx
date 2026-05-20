import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import type { LucideIcon } from "lucide-react";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/dashboard/training")({
  component: () => (
    <Stub
      title="Training Modules"
      icon={GraduationCap}
      desc="Course cards, progress, locked/unlocked modules, lesson completion. Connect your backend to wire real data."
    />
  ),
});

export function Stub({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <Reveal>
        <div className="eyebrow">Module</div>
        <h1 className="mt-3 font-display text-display-md text-ink">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{desc}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-border bg-surface px-8 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-ink">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl text-ink">Nothing here yet</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            This screen is ready for content. Wire it up to your backend or pass me data and I'll
            bring it to life.
          </p>
          <button className="mt-2 rounded-[14px] bg-ink px-6 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-ink/90">
            Get started
          </button>
        </div>
      </Reveal>
    </div>
  );
}
