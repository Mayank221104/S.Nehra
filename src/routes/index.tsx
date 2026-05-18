import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { RealityCheck } from "@/components/sections/reality-check";
import { Solution } from "@/components/sections/solution";
import { Tracks } from "@/components/sections/tracks";
import { Process } from "@/components/sections/process";
import { Partners } from "@/components/sections/partners";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "S.Nehra — Stop Applying. Start Getting Hired." },
      {
        name: "description",
        content:
          "A 12-week premium placement consultancy. We train, certify, and place talent into careers worth keeping. Sales Excellence & Customer Support tracks.",
      },
      { property: "og:title", content: "S.Nehra — Stop Applying. Start Getting Hired." },
      {
        property: "og:description",
        content:
          "Premium placement consultancy with a written job guarantee. 94% placement rate. 180+ hiring partners.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <RealityCheck />
        <Solution />
        <Tracks />
        <Process />
        <Partners />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
