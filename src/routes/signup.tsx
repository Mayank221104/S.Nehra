import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, AuthField } from "@/components/auth/auth-shell";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account – Atelier Careers" }] }),
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
  const navigate = useNavigate();

  const [pw, setPw] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const s = strength(pw);
  const label = ["Too short", "Weak", "Fair", "Strong", "Excellent"][s];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: `${firstName} ${lastName}`.trim(),
          email,
          password: pw,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Store email for verification page
      sessionStorage.setItem("verify_email", email);

      // Redirect to verify page
      navigate({ to: "/verify" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Begin your career."
      subtitle="Create your account to start the application and meet your admissions advisor."
      footer={
        <>
          Already a member?{" "}
          <Link to="/login" className="font-medium text-ink transition-colors hover:text-gold">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            label="First name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <AuthField
            label="Last name"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <AuthField
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

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

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="block w-full rounded-[14px] bg-ink px-6 py-3.5 text-center text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-xs text-muted-foreground">
          By creating an account you agree to our terms and privacy policy.
        </p>
      </form>
    </AuthShell>
  );
}
