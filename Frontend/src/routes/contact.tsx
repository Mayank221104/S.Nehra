import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SNehra Solutions" },
      {
        name: "description",
        content: "Talk to admissions. We respond to every message within one business day.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <div className="eyebrow">Contact</div>
          <h1 className="mt-6 font-display text-display-lg text-ink">
            Tell us about <span className="italic">your career.</span>
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <Reveal delay={0.1}>
            <div className="space-y-8">
              {[
                { icon: Mail, t: "Email", v: "info@snehrasolutions.com" },
                { icon: Phone, t: "Call", v: "+91 87 6429 1078" },
                { icon: MapPin, t: "Studio", v: "Currently we are operating remotely" },
              ].map((i) => (
                <div key={i.t} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-primary-foreground">
                    <i.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {i.t}
                    </div>
                    <div className="mt-1 text-base text-ink">{i.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {success ? (
              <div className="flex h-full items-center justify-center rounded-[24px] border border-[oklch(0_0_0/0.08)] bg-surface p-8 shadow-soft text-center">
                <div>
                  <div className="text-3xl">✅</div>
                  <h2 className="mt-4 font-display text-2xl text-ink">Message sent!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-sm text-ink underline hover:text-gold"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-[24px] border border-[oklch(0_0_0/0.08)] bg-surface p-8 shadow-soft"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                  />
                  <Field
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                  />
                </div>
                <Field
                  label="Subject"
                  placeholder="I have a question about pricing"
                  value={form.subject}
                  onChange={(v) => setForm((p) => ({ ...p, subject: v }))}
                />
                <div>
                  <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tell us what's on your mind…"
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-[14px] bg-ink px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}