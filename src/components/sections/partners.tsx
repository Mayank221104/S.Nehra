import { Reveal } from "../reveal";

const partners = [
  "Razorpay", "Zoho", "Freshworks", "Postman", "CRED", "Groww",
  "Khatabook", "Meesho", "BrowserStack", "Chargebee", "Hasura", "Atlan",
];

export function Partners() {
  return (
    <section className="border-b border-[oklch(0_0_0/0.06)] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="eyebrow">05 — Hiring Partners</div>
              <h3 className="mt-4 max-w-xl font-display text-display-md text-ink">
                Where our candidates land.
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">180+ active hiring partners across SaaS, fintech & e-commerce.</p>
          </div>
        </Reveal>

        <div className="mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-[marquee_40s_linear_infinite] gap-12 whitespace-nowrap">
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="font-display text-3xl text-muted-foreground/70 transition-colors hover:text-ink lg:text-4xl">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
