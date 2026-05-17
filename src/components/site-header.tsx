import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/about", label: "About" },
  { to: "/process", label: "Process" },
  { to: "/tracks", label: "Tracks" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-[oklch(0_0_0/0.06)] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">Atelier<span className="text-gold">·</span>Careers</span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-ink">
            Sign in
          </Link>
          <Link
            to="/apply"
            className="inline-flex items-center rounded-[14px] bg-ink px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-ink/90 hover:shadow-soft"
          >
            Apply now
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-[oklch(0_0_0/0.06)] bg-background lg:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-[14px] border border-border px-4 py-2.5 text-center text-sm"
              >
                Sign in
              </Link>
              <Link
                to="/apply"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-[14px] bg-ink px-4 py-2.5 text-center text-sm text-primary-foreground"
              >
                Apply
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
