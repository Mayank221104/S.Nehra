import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { useRef } from "react";

export function HeroStatsPanel() {
  // Subtle floating animation
  const ref = useRef<HTMLDivElement>(null);
  const y = useSpring(useMotionValue(0), { stiffness: 40, damping: 18 });
  const shadow = useTransform(
    y,
    [0, 12],
    [
      "0 8px 32px -8px oklch(0.65 0.12 75 / 0.18), 0 1.5px 8px oklch(0 0 0 / 0.06)",
      "0 16px 48px -8px oklch(0.65 0.12 75 / 0.22), 0 2px 16px oklch(0 0 0 / 0.08)",
    ],
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: [0, 6, 0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      className="relative z-10 mx-auto w-full max-w-sm rounded-2xl border border-[oklch(0_0_0/0.13)] bg-white/70 bg-clip-padding p-7 shadow-xl backdrop-blur-2xl ring-1 ring-gold/10 lg:mx-0 lg:max-w-md"
      style={{ boxShadow: shadow.get() }}
      tabIndex={0}
      aria-label="Placement dashboard stats panel"
    >
      <div className="mb-7 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-gold" aria-hidden />
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Placement Dashboard
        </span>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Success Rate</span>
          <span className="font-display text-2xl font-bold text-ink">94%</span>
        </div>
        <Progress value={94} className="h-2 bg-gold/20" />
        <div className="my-2 h-px w-full bg-gradient-to-r from-gold/10 via-muted/40 to-gold/10" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Avg. Package</span>
          <span className="font-display text-xl font-semibold text-ink">₹7.2L</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Mock Interviews</span>
          <span className="font-display text-xl font-semibold text-ink">9.2/10</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Growth</span>
          <span className="flex items-center gap-1 font-display text-xl font-semibold text-gold">
            <TrendingUp className="h-4 w-4" aria-hidden /> 18%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Interview Progress</span>
          <span className="flex items-center gap-1 font-display text-xl font-semibold text-ink">
            <Clock className="h-4 w-4 text-muted-foreground" aria-hidden /> 7/10
          </span>
        </div>
        <Progress value={70} className="h-2 bg-gold/20" />
      </div>
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl border border-white/30"
        style={{ boxShadow: "0 2px 24px 0 oklch(0 0 0 / 0.04)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-white/50 backdrop-blur-2xl"
        style={{ maskImage: "radial-gradient(ellipse at 60% 40%, white 60%, transparent 100%)" }}
      />
    </motion.div>
  );
}
