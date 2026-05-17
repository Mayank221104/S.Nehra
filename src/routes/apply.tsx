import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Upload, BarChart3, Headphones } from "lucide-react";

export const Route = createFileRoute("/apply")({
  head: () => ({ meta: [{ title: "Apply — Atelier Careers" }] }),
  component: Apply,
});

const steps = ["Basics", "Track", "Education", "Experience", "Goals", "Resume", "Done"];

function Apply() {
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState<"sales" | "support" | null>(null);
  const [exp, setExp] = useState<string | null>(null);
  const last = steps.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-[oklch(0_0_0/0.06)] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-10">
          <Link to="/" className="font-display text-xl font-semibold text-ink">
            Atelier<span className="text-gold">·</span>Careers
          </Link>
          <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Step {Math.min(step + 1, last)} of {last}
          </div>
        </div>
      </header>

      {/* Stepper */}
      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.slice(0, -1).map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2 min-w-[120px]">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  i < step
                    ? "bg-gold text-ink"
                    : i === step
                      ? "bg-ink text-primary-foreground"
                      : "border border-border bg-background text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </div>
              <div className={`text-xs ${i === step ? "text-ink" : "text-muted-foreground"}`}>
                {s}
              </div>
              {i < steps.length - 2 && <div className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <main className="mx-auto max-w-3xl px-6 py-12 lg:px-10 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && (
              <Step
                title="Let's start with the basics."
                subtitle="This helps your admissions advisor get in touch."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Full name" placeholder="Your Name" />
                  <Input label="Email" type="email" placeholder="your@email.com" />
                  <Input label="Phone" placeholder="+91 98XXXXXXXX" />
                  <Input label="City" placeholder="Bengaluru" />
                </div>
              </Step>
            )}

            {step === 1 && (
              <Step
                title="Choose your track."
                subtitle="You can change this later with your advisor."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <TrackCard
                    active={track === "sales"}
                    onClick={() => setTrack("sales")}
                    icon={BarChart3}
                    title="Sales Excellence"
                    desc="B2B & SaaS sales careers. SDR, BDR, AE."
                  />
                  <TrackCard
                    active={track === "support"}
                    onClick={() => setTrack("support")}
                    icon={Headphones}
                    title="Customer Support"
                    desc="Modern CX for SaaS, fintech, e-commerce."
                  />
                </div>
              </Step>
            )}

            {step === 2 && (
              <Step
                title="Tell us about your education."
                subtitle="The highest qualification you've completed."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Degree" placeholder="B.Com" />
                  <Input label="Graduation year" placeholder="2024" />
                  <div className="sm:col-span-2">
                    <Input label="College / University" placeholder="St. Joseph's College" />
                  </div>
                </div>
              </Step>
            )}

            {step === 3 && (
              <Step
                title="What's your experience?"
                subtitle="Don't worry — most of our candidates are fresh out of college."
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { id: "fresher", t: "Fresher", d: "No prior experience" },
                    { id: "intern", t: "Internships", d: "1–2 internships" },
                    { id: "exp", t: "Experienced", d: "1–3 yrs full-time" },
                  ].map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setExp(o.id)}
                      className={`rounded-[24px] border p-6 text-left transition-all ${
                        exp === o.id
                          ? "border-ink bg-ink text-primary-foreground"
                          : "border-border bg-surface hover:border-ink/30"
                      }`}
                    >
                      <div className="font-display text-2xl">{o.t}</div>
                      <div
                        className={`mt-2 text-xs ${exp === o.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {o.d}
                      </div>
                    </button>
                  ))}
                </div>
              </Step>
            )}

            {step === 4 && (
              <Step
                title="What's the goal?"
                subtitle="We use this to match you with the right roles and recruiters."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input label="Target salary (₹ LPA)" placeholder="7" />
                  <Input label="Preferred industry" placeholder="SaaS / Fintech" />
                </div>
              </Step>
            )}

            {step === 5 && (
              <Step
                title="Upload your resume."
                subtitle="PDF preferred. Don't have one? You can skip — we'll build one for you."
              >
                <label className="flex cursor-pointer flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-border bg-surface px-8 py-16 text-center transition-colors hover:border-gold hover:bg-surface">
                  <Upload className="h-7 w-7 text-muted-foreground" />
                  <div className="font-display text-xl text-ink">Drop your resume here</div>
                  <div className="text-xs text-muted-foreground">PDF, DOCX · max 10 MB</div>
                  <input type="file" className="hidden" />
                </label>
              </Step>
            )}

            {step === 6 && (
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-8 w-8" strokeWidth={2.5} />
                </div>
                <h2 className="mt-8 font-display text-display-md text-ink">
                  Application received.
                </h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  Your admissions advisor will reach out within 48 hours. Meanwhile, get a head
                  start by exploring your dashboard.
                </p>
                <Link
                  to="/dashboard"
                  className="mt-10 inline-flex items-center gap-2 rounded-[14px] bg-ink px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
                >
                  Go to dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {step < last && (
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(last, s + 1))}
              className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold"
            >
              {step === last - 1 ? "Submit application" : "Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-display text-display-md text-ink">{title}</h2>
      <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>
      <div className="mt-10">{children}</div>
    </div>
  );
}

function Input({
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

function TrackCard({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-start rounded-[24px] border p-6 text-left transition-all ${
        active
          ? "border-ink bg-ink text-primary-foreground"
          : "border-border bg-surface hover:-translate-y-0.5 hover:shadow-soft"
      }`}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? "bg-gold text-ink" : "bg-muted text-ink"}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-6 font-display text-2xl">{title}</div>
      <div
        className={`mt-2 text-sm ${active ? "text-primary-foreground/70" : "text-muted-foreground"}`}
      >
        {desc}
      </div>
    </button>
  );
}
