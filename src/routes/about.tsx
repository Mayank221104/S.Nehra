import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Atelier Careers" },
      { name: "description", content: "We're a small team of operators-turned-mentors building the placement consultancy we wish existed when we graduated." },
    ],
  }),
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
              Atelier Careers was founded by a group of operators who'd spent a decade
              hiring, training, and managing early-career talent at SaaS and fintech
              companies. We kept seeing the same pattern: brilliant graduates with no
              roadmap, applying to hundreds of jobs, hearing back from none.
            </p>
            <p>
              We started Atelier to fix that — not with another course library, but with
              a structured, mentor-led consultancy that ends with a written job
              guarantee. We're small on purpose. Every cohort is curated. Every candidate
              is known by name.
            </p>
            <p className="font-display text-2xl italic text-ink">
              "If you don't get hired, we haven't done our job."
            </p>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </div>
  );
}
