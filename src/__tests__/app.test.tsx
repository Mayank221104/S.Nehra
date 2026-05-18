import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

// TanStack Router is mocked globally in setupTests.ts
// No MemoryRouter needed

describe("App Shell", () => {
  it("renders header landmark", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders footer landmark", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("header contains site name", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("banner")).toHaveTextContent(/atelier/i);
  });

  it("footer contains copyright", () => {
    render(<SiteFooter />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByRole("contentinfo")).toHaveTextContent(year);
  });
});
