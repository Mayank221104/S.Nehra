import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — SNehra Solutions" },
      { name: "description", content: "SNEHRA SOLUTIONS LLP refund and cancellation policy for products and services." },
    ],
  }),
  component: Refund,
});

function Refund() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <div className="eyebrow">Legal</div>
          <h1 className="mt-6 font-display text-display-lg text-ink">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            This Refund and Cancellation Policy outlines how you can cancel or seek a
            refund for a product / service that you have purchased through the Platform.
          </p>

          {/* Policy points */}
          <div className="mt-10 space-y-6">

            {/* Card 1 */}
            <div className="rounded-xl border border-[oklch(0_0_0/0.08)] bg-[oklch(0_0_0/0.02)] px-6 py-5">
              <h2 className="font-display text-xl font-medium text-ink">Cancellation Window</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Cancellations will only be considered if the request is made within{" "}
                <strong className="text-ink">1 day of placing the order</strong>.
                However, cancellation requests may not be entertained if the orders have
                been communicated to such sellers / merchant(s) listed on the Platform
                and they have initiated the process of shipping them, or the product is
                out for delivery. In such an event, you may choose to reject the product
                at the doorstep.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-[oklch(0_0_0/0.08)] bg-[oklch(0_0_0/0.02)] px-6 py-5">
              <h2 className="font-display text-xl font-medium text-ink">Perishable Items</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                SNEHRA SOLUTIONS LLP does not accept cancellation requests for
                perishable items like flowers, eatables, etc. However, a refund /
                replacement can be made if the user establishes that the quality of the
                product delivered is not good.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-[oklch(0_0_0/0.08)] bg-[oklch(0_0_0/0.02)] px-6 py-5">
              <h2 className="font-display text-xl font-medium text-ink">Damaged or Defective Items</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                In case of receipt of damaged or defective items, please report to our
                customer service team. The request would be entertained once the seller /
                merchant listed on the Platform has checked and determined the same at
                its own end. This should be reported within{" "}
                <strong className="text-ink">1 day of receipt of products</strong>.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl border border-[oklch(0_0_0/0.08)] bg-[oklch(0_0_0/0.02)] px-6 py-5">
              <h2 className="font-display text-xl font-medium text-ink">Product Not as Expected</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                In case you feel that the product received is not as shown on the site
                or as per your expectations, you must bring it to the notice of our
                customer service within{" "}
                <strong className="text-ink">1 day of receiving the product</strong>.
                The customer service team after looking into your complaint will take an
                appropriate decision.
              </p>
            </div>

            {/* Card 5 */}
            <div className="rounded-xl border border-[oklch(0_0_0/0.08)] bg-[oklch(0_0_0/0.02)] px-6 py-5">
              <h2 className="font-display text-xl font-medium text-ink">Warranty Claims</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                In case of complaints regarding products that come with a warranty from
                the manufacturers, please refer the issue to them directly.
              </p>
            </div>

            {/* Card 6 — Refund timeline, highlighted */}
            <div className="rounded-xl border border-[oklch(0.66_0.105_75/0.3)] bg-[oklch(0.66_0.105_75/0.04)] px-6 py-5">
              <h2 className="font-display text-xl font-medium text-ink">Refund Timeline</h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                In case of any refunds approved by SNEHRA SOLUTIONS LLP, it will take{" "}
                <strong className="text-ink">7 days</strong> for the refund to be
                processed to you.
              </p>
            </div>

          </div>

          {/* Contact */}
          <div className="mt-12">
            <h2 className="font-display text-2xl font-medium text-ink">Contact Us</h2>
            <div className="mt-4 rounded-xl border border-[oklch(0_0_0/0.08)] bg-[oklch(0_0_0/0.02)] px-6 py-5 space-y-2 text-base text-muted-foreground">
              <p><strong className="text-ink">Company:</strong> SNEHRA SOLUTIONS LLP</p>
              <p><strong className="text-ink">Address:</strong> Deolawas, Buhana, Jhunjhunu, Rajasthan 333515</p>
              <p>
                <strong className="text-ink">Contact:</strong>{" "}
                <a href="/contact" className="text-ink underline underline-offset-4 hover:text-gold transition-colors">
                  Contact Us
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}