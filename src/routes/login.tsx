import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthField } from "@/components/auth/auth-shell";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Atelier Careers" }] }),
  component: Login,
});

function Login() {
  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to your dashboard, track placements, and pick up where you left off."
      footer={<>New here? <Link to="/signup" className="font-medium text-ink hover:text-gold">Create an account</Link></>}
    >
      <form className="space-y-5">
        <AuthField label="Email" type="email" placeholder="you@example.com" />
        <AuthField
          label="Password"
          type="password"
          placeholder="••••••••"
          rightSlot={<Link to="/forgot-password" className="text-xs text-muted-foreground hover:text-gold">Forgot?</Link>}
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="h-4 w-4 rounded border-border accent-[oklch(0.14_0_0)]" />
          Remember me on this device
        </label>
        <Link
          to="/dashboard"
          className="block w-full rounded-[14px] bg-ink px-6 py-3.5 text-center text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
        >
          Sign in
        </Link>
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 top-1/2 h-px bg-border" />
          <span className="relative bg-background px-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">or</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className="rounded-[14px] border border-border bg-surface px-4 py-3 text-sm transition-colors hover:bg-muted">Google</button>
          <button type="button" className="rounded-[14px] border border-border bg-surface px-4 py-3 text-sm transition-colors hover:bg-muted">LinkedIn</button>
        </div>
      </form>
    </AuthShell>
  );
}
