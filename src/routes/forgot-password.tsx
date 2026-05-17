import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthField } from "@/components/auth/auth-shell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Atelier Careers" }] }),
  component: () => (
    <AuthShell
      title="Reset your password."
      subtitle="Enter your email and we'll send a secure recovery link."
      footer={<>Remembered it? <Link to="/login" className="font-medium text-ink hover:text-gold">Back to sign in</Link></>}
    >
      <form className="space-y-5">
        <AuthField label="Email" type="email" placeholder="you@example.com" />
        <button className="w-full rounded-[14px] bg-ink px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold">
          Send recovery link
        </button>
      </form>
    </AuthShell>
  ),
});
