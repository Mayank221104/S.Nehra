import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";

export const Route = createFileRoute("/verify")({
  head: () => ({ meta: [{ title: "Verify email — S.Nehra" }] }),
  component: Verify,
});

function Verify() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [seconds, setSeconds] = useState(45);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("verify_email");
    if (stored) setEmail(stored);
  }, []);

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

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) return setError("Enter complete 6-digit code");
    if (!email) return setError("Email not found. Please sign up again.");

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code: fullCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess(true);
      sessionStorage.removeItem("verify_email");
      setTimeout(() => navigate({ to: "/login" }), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSeconds(45);
    } catch {}
  };

  return (
    <AuthShell
      title="Check your inbox."
      subtitle={`We sent a 6-digit code to ${email || "your email"}. Enter it below to verify your account.`}
    >
      <div className="space-y-6">
        <div className="flex gap-3">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              inputMode="numeric"
              maxLength={1}
              value={c}
              onChange={(e) => set(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus();
              }}
              className="h-14 w-full rounded-[12px] border border-border bg-background text-center font-display text-2xl text-ink focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          ))}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {success && (
          <p className="text-sm text-green-600">Email verified! Redirecting to login...</p>
        )}
        <button
          onClick={handleVerify}
          disabled={loading || success}
          className="block w-full rounded-[14px] bg-ink px-6 py-3.5 text-center text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify & continue"}
        </button>
        <p className="text-sm text-muted-foreground">
          Didn't get it?{" "}
          {seconds > 0 ? (
            <span>
              Resend in <span className="text-ink">{seconds}s</span>
            </span>
          ) : (
            <button onClick={handleResend} className="font-medium text-ink hover:text-gold">
              Resend code
            </button>
          )}
        </p>
      </div>
    </AuthShell>
  );
}
