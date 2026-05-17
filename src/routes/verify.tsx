import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";

export const Route = createFileRoute("/verify")({
  head: () => ({ meta: [{ title: "Verify email — Atelier Careers" }] }),
  component: Verify,
});

function Verify() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(45);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const set = (i: number, v: string) => {
    const c = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = c;
    setCode(next);
    if (c && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <AuthShell
      title="Check your inbox."
      subtitle="We sent a 6-digit code to your email. Enter it below to verify your account."
    >
      <div className="space-y-6">
        <div className="flex gap-3">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              inputMode="numeric"
              maxLength={1}
              value={c}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus(); }}
              className="h-14 w-full rounded-[12px] border border-border bg-background text-center font-display text-2xl text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          ))}
        </div>
        <Link
          to="/dashboard"
          className="block w-full rounded-[14px] bg-ink px-6 py-3.5 text-center text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
        >
          Verify & continue
        </Link>
        <p className="text-sm text-muted-foreground">
          Didn't get it? {seconds > 0
            ? <span>Resend in <span className="text-ink">{seconds}s</span></span>
            : <button onClick={() => setSeconds(45)} className="font-medium text-ink hover:text-gold">Resend code</button>}
        </p>
      </div>
    </AuthShell>
  );
}
