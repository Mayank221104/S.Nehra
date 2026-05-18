import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Upload, BarChart3, Headphones } from "lucide-react";

export const Route = createFileRoute("/apply")({
  head: () => ({ meta: [{ title: "Apply — Atelier Careers" }] }),
  component: Apply,
});

const steps = ["Basics", "Track", "Education", "Experience", "Goals", "Resume", "Payment", "Done"];

declare global {
  interface Window {
    Razorpay: any;
  }
}

function Apply() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [track, setTrack] = useState<"sales" | "support" | null>(null);
  const [exp, setExp] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    degree: "",
    graduationYear: "",
    college: "",
    targetSalary: "",
    preferredIndustry: "",
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const last = steps.length - 1;

  // Step 5 (Resume) ke baad — signup + application create
  const handleApplicationSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      // 1. Signup
      const signupRes = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      const signupData = await signupRes.json();
      if (!signupRes.ok && signupData.message !== "Email already registered") {
        throw new Error(signupData.message);
      }

      // 2. Login (agar already registered)
      if (!signupRes.ok) {
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        if (!loginRes.ok) throw new Error("Login failed. Check your password.");
      }

      // 3. Application create
      const appRes = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          trackId: track ?? "sales",
          data: { ...formData, experience: exp },
        }),
      });
      if (!appRes.ok) {
        const d = await appRes.json();
        throw new Error(d.message);
      }

      // 4. Payment step pe jao
      setStep(last - 1);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Razorpay payment
  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      // Order create karo
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: 9999,
          description: "Atelier Careers — Application Fee",
        }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.message);

      // Razorpay checkout open karo
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Atelier Careers",
        description: "Application Fee — Cohort 14",
        order_id: order.id,
        handler: async (response: any) => {
          // Verify payment
          const verifyRes = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          if (verifyRes.ok) {
            setStep(last);
          } else {
            setError("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#0a0a0a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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

      <div className="mx-auto max-w-6xl px-6 pt-10 lg:px-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.slice(0, -1).map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2 min-w-[100px]">
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
              <Step title="Let's start with the basics." subtitle="Create your account to begin.">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Full name"
                    placeholder="Your Name"
                    value={formData.fullName}
                    onChange={(v) => update("fullName", v)}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(v) => update("email", v)}
                  />
                  <Input
                    label="Phone"
                    placeholder="+91 98XXXXXXXX"
                    value={formData.phone}
                    onChange={(v) => update("phone", v)}
                  />
                  <Input
                    label="City"
                    placeholder="Bengaluru"
                    value={formData.city}
                    onChange={(v) => update("city", v)}
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(v) => update("password", v)}
                    />
                  </div>
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
                  <Input
                    label="Degree"
                    placeholder="B.Com"
                    value={formData.degree}
                    onChange={(v) => update("degree", v)}
                  />
                  <Input
                    label="Graduation year"
                    placeholder="2024"
                    value={formData.graduationYear}
                    onChange={(v) => update("graduationYear", v)}
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="College / University"
                      placeholder="St. Joseph's College"
                      value={formData.college}
                      onChange={(v) => update("college", v)}
                    />
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
                      className={`rounded-[24px] border p-6 text-left transition-all ${exp === o.id ? "border-ink bg-ink text-primary-foreground" : "border-border bg-surface hover:border-ink/30"}`}
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
                  <Input
                    label="Target salary (₹ LPA)"
                    placeholder="7"
                    value={formData.targetSalary}
                    onChange={(v) => update("targetSalary", v)}
                  />
                  <Input
                    label="Preferred industry"
                    placeholder="SaaS / Fintech"
                    value={formData.preferredIndustry}
                    onChange={(v) => update("preferredIndustry", v)}
                  />
                </div>
              </Step>
            )}

            {step === 5 && (
              <Step
                title="Upload your resume."
                subtitle="PDF preferred. Don't have one? You can skip — we'll build one for you."
              >
                <label className="flex cursor-pointer flex-col items-center gap-3 rounded-[24px] border-2 border-dashed border-border bg-surface px-8 py-16 text-center transition-colors hover:border-gold">
                  <Upload className="h-7 w-7 text-muted-foreground" />
                  <div className="font-display text-xl text-ink">Drop your resume here</div>
                  <div className="text-xs text-muted-foreground">PDF, DOCX · max 10 MB</div>
                  <input type="file" className="hidden" />
                </label>
              </Step>
            )}

            {step === 6 && (
              <Step
                title="Complete your payment."
                subtitle="Secure your seat with the application fee."
              >
                <div className="rounded-[24px] border border-border bg-surface p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-display text-2xl text-ink">Application Fee</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        Refundable if not selected
                      </div>
                    </div>
                    <div className="font-display text-4xl text-ink">₹9,999</div>
                  </div>
                  <div className="mt-6 space-y-2">
                    {[
                      "Seat reserved in Cohort 14",
                      "Application reviewed in 48 hrs",
                      "Full refund if not selected",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-gold" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="mt-8 w-full rounded-[14px] bg-ink px-6 py-4 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Pay ₹9,999 — Secure My Seat"}
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Powered by Razorpay · 256-bit SSL
                  </p>
                </div>
              </Step>
            )}

            {step === last && (
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-8 w-8" strokeWidth={2.5} />
                </div>
                <h2 className="mt-8 font-display text-display-md text-ink">You're in.</h2>
                <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                  Payment confirmed. Your admissions advisor will reach out within 48 hours.
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

        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

        {step < last && step !== 6 && (
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={() => (step === 5 ? handleApplicationSubmit() : setStep((s) => s + 1))}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : step === 5
                  ? "Submit & Continue to Payment"
                  : "Continue"}{" "}
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
      className={`group flex flex-col items-start rounded-[24px] border p-6 text-left transition-all ${active ? "border-ink bg-ink text-primary-foreground" : "border-border bg-surface hover:-translate-y-0.5 hover:shadow-soft"}`}
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
