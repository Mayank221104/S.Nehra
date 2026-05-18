import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// ── TanStack Router ───────────────────────────────────────────────────────────
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, className, activeProps: _a, ...props }: any) =>
    React.createElement("a", { href: to, className, ...props }, children),
  Outlet: () => React.createElement("div", { "data-testid": "router-outlet" }),
  useRouterState: (opts?: { select?: (s: any) => any }) => {
    const state = { location: { pathname: "/dashboard" } };
    return opts?.select ? opts.select(state) : state;
  },
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
  createFileRoute: () => () => null,
}));

// ── Reveal animations ─────────────────────────────────────────────────────────
vi.mock("@/components/reveal", () => ({
  Reveal: ({ children, className }: any) => React.createElement("div", { className }, children),
  RevealGroup: ({ children, className }: any) =>
    React.createElement("div", { className }, children),
  RevealItem: ({ children, className }: any) => React.createElement("div", { className }, children),
}));

// ── Framer Motion ─────────────────────────────────────────────────────────────
// Hero uses motion.div — mock all motion.* as plain divs
vi.mock("framer-motion", () => {
  const createElement = React.createElement;
  const motionProxy = new Proxy(
    {},
    {
      get:
        (_target, prop: string) =>
        // motion.div, motion.span, motion.section, etc.
        ({ children, className, style, ...rest }: any) =>
          createElement(prop, { className, style }, children),
    },
  );
  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: any) => children,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useInView: () => true,
  };
});
