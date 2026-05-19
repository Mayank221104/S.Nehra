import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — S.Nehra" },
      {
        name: "description",
        content: "Talk to admissions. We respond to every message within one business day.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
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
                { icon: Mail, t: "Email", v: "admissions@snehra.co" },
                { icon: Phone, t: "Call", v: "+91 80 4567 8900" },
                { icon: MapPin, t: "Studio", v: "Indiranagar, Bengaluru" },
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
            <form className="space-y-5 rounded-[24px] border border-[oklch(0_0_0/0.08)] bg-surface p-8 shadow-soft">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" placeholder="Your Name" />
                <Field label="Email" type="email" placeholder="your@email.com" />
              </div>
              <Field label="Subject" placeholder="I have a question about pricing" />
              <div>
                <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us what's on your mind…"
                  className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
              </div>
              <button className="w-full rounded-[14px] bg-ink px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold">
                Send message
              </button>
            </form>
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
}: {
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
      />
    </div>
  );
}
