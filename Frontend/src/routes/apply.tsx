import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, BarChart3, Headphones, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/apply")({
  head: () => ({ meta: [{ title: "Apply — S.Nehra" }] }),
  component: Apply,
});

const steps = ["Basics", "Track", "Education", "Experience", "Goals", "Payment", "Done"];

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
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};
    if (currentStep === 0) {
      if (!formData.fullName.trim()) errors.fullName = "Full name required";
      if (!formData.email.trim()) errors.email = "Email required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Valid email required";
      if (!formData.phone.trim()) errors.phone = "Phone required";
      if (!formData.city.trim()) errors.city = "City required";
      if (!formData.password) errors.password = "Password required";
      else if (formData.password.length < 8) errors.password = "Min 8 characters";
      if (formData.password !== confirmPassword) errors.confirmPassword = "Passwords don't match";
    }
    if (currentStep === 1 && !track) errors.track = "Please select a track";
    if (currentStep === 2) {
      if (!formData.degree.trim()) errors.degree = "Degree required";
      if (!formData.college.trim()) errors.college = "College required";
    }
    if (currentStep === 3 && !exp) errors.exp = "Please select experience level";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
      console.log("Signup:", signupRes.status, signupData);

      if (!signupRes.ok && signupData.message !== "Email already registered") {
        throw new Error(signupData.message);
      }

      // 2. Login if already registered
      if (!signupRes.ok) {
        const loginRes = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const loginData = await loginRes.json();
        console.log("Login:", loginRes.status, loginData);
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
      const appData = await appRes.json();
      console.log("Application:", appRes.status, appData);
      if (!appRes.ok) throw new Error(appData.message);

      sessionStorage.setItem("verify_email", formData.email);
      setStep(last - 1);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: 9999, description: "S.Nehra — Application Fee" }),
      });
      const order = await orderRes.json();
      console.log("Order:", orderRes.status, order);
      if (!orderRes.ok) throw new Error(order.message);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "S.Nehra",
        description: "Application Fee — Cohort 14",
        order_id: order.id,
        handler: async (response: any) => {
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
          if (verifyRes.ok) setStep(last);
          else setError("Payment verification failed. Contact support.");
        },
        prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
        theme: { color: "#0a0a0a" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment error:", err);
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
            S<span className="text-gold">.</span>Nehra
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
                  <div>
                    <Input
                      label="Full name *"
                      placeholder="Your Name"
                      value={formData.fullName}
                      onChange={(v) => update("fullName", v)}
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Email *"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(v) => update("email", v)}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      label="Phone *"
                      placeholder="+91 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(v) => update("phone", v)}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      label="City *"
                      placeholder="Bengaluru"
                      value={formData.city}
                      onChange={(v) => update("city", v)}
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.city}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Password *
                    </label>
                    <div className="relative mt-2">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Min 8 characters"
                        value={formData.password}
                        onChange={(e) => update("password", e.target.value)}
                        className="w-full rounded-[12px] border border-border bg-background px-4 py-3 pr-10 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {formErrors.password && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.password}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Confirm Password *
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                    {formErrors.confirmPassword && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.confirmPassword}</p>
                    )}
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
                {formErrors.track && (
                  <p className="mt-4 text-sm text-destructive">{formErrors.track}</p>
                )}
              </Step>
            )}

            {step === 2 && (
              <Step
                title="Tell us about your education."
                subtitle="The highest qualification you've completed."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Input
                      label="Degree *"
                      placeholder="B.Com"
                      value={formData.degree}
                      onChange={(v) => update("degree", v)}
                    />
                    {formErrors.degree && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.degree}</p>
                    )}
                  </div>
                  <Input
                    label="Graduation year"
                    placeholder="2024"
                    value={formData.graduationYear}
                    onChange={(v) => update("graduationYear", v)}
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="College / University *"
                      placeholder="St. Joseph's College"
                      value={formData.college}
                      onChange={(v) => update("college", v)}
                    />
                    {formErrors.college && (
                      <p className="mt-1 text-xs text-destructive">{formErrors.college}</p>
                    )}
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
                {formErrors.exp && (
                  <p className="mt-4 text-sm text-destructive">{formErrors.exp}</p>
                )}
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
                        <Check className="h-4 w-4 text-gold" /> {item}
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

        {step < last && step !== 5 && (
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-ink disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              onClick={() => {
                if (!validateStep(step)) return;
                step === 4 ? handleApplicationSubmit() : setStep((s) => s + 1);
              }}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-[14px] bg-ink px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-gold disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : step === 4
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
