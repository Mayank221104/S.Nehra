import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — S.Nehra" }] }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-24 lg:px-12 lg:py-32">
        <Reveal>
          <div className="eyebrow">About</div>
          <h1 className="mt-6 font-display text-display-lg text-ink">
            We sell outcomes. <span className="italic">Not courses.</span>
          </h1>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              S.Nehra was founded by a group of operators who spent a decade hiring, training, and
              managing early-career talent at SaaS and fintech companies.
            </p>
            <p>
              We built this to fix that — not with another course library, but with a structured,
              mentor-led consultancy that ends with a written job guarantee.
            </p>
            <p className="font-display text-2xl italic text-ink">
              If you do not get hired, we have not done our job.
            </p>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
