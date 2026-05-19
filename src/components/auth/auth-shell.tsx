import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-10 sm:px-12 lg:px-16 lg:py-12">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
          S.Nehra
        </Link>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="font-display text-4xl text-ink lg:text-5xl">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          <div className="mt-10">{children}</div>
          {footer && <div className="mt-8 text-sm text-muted-foreground">{footer}</div>}
        </div>
        <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} S.Nehra</div>
      </div>
      <div className="relative hidden overflow-hidden bg-ink text-primary-foreground lg:flex">
        <div className="grain relative z-10 flex h-full w-full flex-col justify-between p-16">
          <div className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
            Cohort 14 · Now Enrolling
          </div>
          <div>
            <p className="font-display text-5xl leading-tight text-primary-foreground">
              "I'd applied to 200+ jobs without a callback. Six weeks in, I had three offers."
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-lg text-ink">
                AM
              </div>
              <div>
                <div className="text-sm font-medium">Aarav Mehta</div>
                <div className="text-xs text-primary-foreground/60">SDR · Razorpay · ₹8.4 L</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              ["94%", "Placed"],
              ["₹7.2L", "Avg CTC"],
              ["12 wk", "To offer"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-gold-muted">{v}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-primary-foreground/50">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gold/15 blur-3xl" />
      </div>
    </div>
  );
}

export function AuthField({
  label,
  type = "text",
  placeholder,
  hint,
  rightSlot,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  rightSlot?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </label>
        {rightSlot}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-[12px] border border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
      />
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
