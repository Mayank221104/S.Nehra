import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthField } from "@/components/auth/auth-shell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Atelier Careers" }] }),
  component: Signup,
});

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function Signup() {
  const [pw, setPw] = useState("");
  const s = strength(pw);
  const label = ["Too short", "Weak", "Fair", "Strong", "Excellent"][s];
  return (
    <AuthShell
      title="Begin your career."
      subtitle="Create your account to start the application and meet your admissions advisor."
      footer={
        <>
          Already a member?{" "}
          <Link to="/login" className="font-medium text-ink hover:text-gold">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField label="First name" placeholder="First name" />
          <AuthField label="Last name" placeholder="Last name" />
        </div>
        <AuthField label="Email" type="email" placeholder="your@email.com" />
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Password
          </label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="At least 8 characters"
            className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
          />
          <div className="mt-3 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i < s
                    ? s >= 3
                      ? "bg-success"
                      : s === 2
                        ? "bg-warning"
                        : "bg-destructive"
                    : "bg-border"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {pw ? label : "Use 8+ chars, a number and a symbol."}
          </p>
        </div>
        <Link
          to="/verify"
          className="block w-full rounded-[14px] bg-ink px-6 py-3.5 text-center text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
        >
          Create account
        </Link>
        <p className="text-xs text-muted-foreground">
          By creating an account you agree to our terms and privacy policy.
        </p>
      </form>
    </AuthShell>
  );
}
