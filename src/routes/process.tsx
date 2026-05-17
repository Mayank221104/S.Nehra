import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Process } from "@/components/sections/process";
import { Solution } from "@/components/sections/solution";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Atelier Careers" },
      { name: "description", content: "Train. Get certified. Get hired. Three steps, no detours, 12 weeks." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Process />
        <Solution />
      </main>
      <SiteFooter />
    </div>
  ),
});
