import { Link } from "@tanstack/react-router";

const cols = [
  {
    title: "Programs",
    links: [
      { label: "Sales Excellence", to: "/tracks" },
      { label: "Customer Support", to: "/tracks" },
      { label: "Pricing", to: "/pricing" },
      { label: "Apply", to: "/apply" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Process", to: "/process" },
      { label: "Testimonials", to: "/" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", to: "/" },
      { label: "Career Guide", to: "/" },
      { label: "Hiring Partners", to: "/" },
      { label: "Blog", to: "/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/" },
      { label: "Terms", to: "/" },
      { label: "Refunds", to: "/" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[oklch(0_0_0/0.06)] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="font-display text-3xl font-semibold tracking-tight text-ink">
              S.Nehra
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A premium placement consultancy. We train, certify, and place talent into careers
              worth keeping.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Bengaluru</span>
              <span className="h-px w-6 bg-border" />
              <span>Mumbai</span>
              <span className="h-px w-6 bg-border" />
              <span>Remote</span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {c.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-[oklch(0_0_0/0.06)] pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} S.Nehra. All rights reserved.</p>
          <p className="font-display italic">Stop applying. Start getting hired.</p>
        </div>
      </div>
    </footer>
  );
}
