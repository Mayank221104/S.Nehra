import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { RealityCheck } from "@/components/sections/reality-check";
import { Solution } from "@/components/sections/solution";
import { Tracks } from "@/components/sections/tracks";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SNehra Solutions — Stop Applying. Start Getting Hired." },
      {
        name: "description",
        content:
          "A placement consultancy. We train, certify, and place talent into careers worth keeping.",
      },
      { property: "og:title", content: "SNehra Solutions — Stop Applying. Start Getting Hired." },
      {
        property: "og:description",
        content:
          "A placement consultancy with extensive experience. 94% placement rate. Trusting hiring partners.",
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
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
