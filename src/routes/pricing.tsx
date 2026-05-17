import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Atelier Careers" },
      { name: "description", content: "One investment. One outcome. Pay upfront or after placement — your choice." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><Pricing /><FAQ /></main>
      <SiteFooter />
    </div>
  ),
});
