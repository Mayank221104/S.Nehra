import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Tracks } from "@/components/sections/tracks";

export const Route = createFileRoute("/tracks")({
  head: () => ({
    meta: [
      { title: "Career Tracks — Atelier Careers" },
      { name: "description", content: "Sales Excellence and Customer Support Mastery. In-demand, backable careers with a real ladder." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main><Tracks /></main>
      <SiteFooter />
    </div>
  ),
});
