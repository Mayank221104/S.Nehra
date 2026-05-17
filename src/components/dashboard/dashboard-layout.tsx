import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutGrid, GraduationCap, MessagesSquare, Briefcase, FileText,
  Award, User, Settings, Bell, Search, Menu, X, ChevronRight, LogOut,
} from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutGrid },
  { to: "/dashboard/training", label: "Training", icon: GraduationCap },
  { to: "/dashboard/interviews", label: "Mock Interviews", icon: MessagesSquare },
  { to: "/dashboard/jobs", label: "Job Applications", icon: Briefcase },
  { to: "/dashboard/resume", label: "Resume Builder", icon: FileText },
  { to: "/dashboard/certificates", label: "Certificates", icon: Award },
  { to: "/dashboard/profile", label: "Profile", icon: User },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[oklch(0_0_0/0.06)] bg-sidebar lg:flex lg:flex-col">
        <div className="px-6 py-6">
          <Link to="/" className="font-display text-xl font-semibold text-ink">
            Atelier<span className="text-gold">·</span>Careers
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`group flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-ink text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <n.icon className={`h-4 w-4 ${active ? "text-gold" : "text-muted-foreground group-hover:text-ink"}`} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[oklch(0_0_0/0.06)] p-4">
          <div className="flex items-center gap-3 rounded-[12px] p-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm text-primary-foreground">JD</div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-ink">Jane Doe</div>
              <div className="truncate text-xs text-muted-foreground">Cohort 14 · Sales</div>
            </div>
            <Link to="/login" aria-label="Sign out" className="text-muted-foreground hover:text-ink">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-sidebar p-4 shadow-elevated lg:hidden">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="font-display text-lg font-semibold">Atelier<span className="text-gold">·</span>Careers</span>
              <button onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
            </div>
            <nav className="space-y-1">
              {nav.map((n) => {
                const active = path === n.to;
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm ${
                      active ? "bg-ink text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <n.icon className="h-4 w-4" /> {n.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-[oklch(0_0_0/0.06)] bg-background/80 px-4 py-3 backdrop-blur-xl lg:px-8">
          <button className="rounded-md p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <Link to="/dashboard">Dashboard</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-ink">Overview</span>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <div className="relative hidden sm:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search modules, jobs, mentors…"
                className="w-64 rounded-[12px] border border-border bg-surface py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
              />
            </div>
            <button aria-label="Notifications" className="relative rounded-[12px] border border-border bg-surface p-2.5 transition-colors hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm text-primary-foreground">JD</div>
          </div>
        </header>
        <main className="px-4 py-8 lg:px-10 lg:py-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
