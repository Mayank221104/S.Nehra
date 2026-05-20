import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";

describe("DashboardLayout — Navigation", () => {
  it("renders all nav items", () => {
    render(<DashboardLayout />);
    expect(screen.getAllByText(/overview/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/training/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/mock interviews/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/job applications/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/resume/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/certificates/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/profile/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/settings/i).length).toBeGreaterThan(0);
  });

  it("Overview nav item is visually active when path is /dashboard", () => {
    render(<DashboardLayout />);
    // active link has bg-ink class — check aria-current or data-active,
    // or just verify the Overview link exists and has correct href
    const overviewLinks = screen.getAllByRole("link", { name: /overview/i });
    // At least one overview link should point to /dashboard
    expect(overviewLinks.some((el) => el.getAttribute("href") === "/dashboard")).toBe(true);
    // Active styling check — class contains bg-ink on the link with href=/dashboard
    const activeLink = overviewLinks.find((el) => el.getAttribute("href") === "/dashboard");
    expect(activeLink?.className).toMatch(/bg-ink/);
  });

  it("nav links have correct hrefs", () => {
    render(<DashboardLayout />);
    const trainingLinks = screen.getAllByRole("link", { name: /training/i });
    expect(trainingLinks[0]).toHaveAttribute("href", "/dashboard/training");
  });

  it("non-active nav link does not have bg-ink class", () => {
    render(<DashboardLayout />);
    const settingsLinks = screen.getAllByRole("link", { name: /settings/i });
    const settingsLink = settingsLinks.find(
      (el) => el.getAttribute("href") === "/dashboard/settings",
    );
    expect(settingsLink?.className).not.toMatch(/bg-ink/);
  });
});

describe("DashboardLayout — Header", () => {
  it("renders search input", () => {
    render(<DashboardLayout />);
    expect(screen.getByPlaceholderText(/search modules/i)).toBeInTheDocument();
  });

  it("renders notifications button", () => {
    render(<DashboardLayout />);
    expect(screen.getByRole("button", { name: /notifications/i })).toBeInTheDocument();
  });

  it("renders breadcrumb with Dashboard link", () => {
    render(<DashboardLayout />);
    const dashLinks = screen.getAllByRole("link", { name: /^dashboard$/i });
    expect(dashLinks.length).toBeGreaterThan(0);
  });
});

describe("DashboardLayout — Mobile drawer", () => {
  it("mobile menu button is present", () => {
    render(<DashboardLayout />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("drawer opens on menu button click", () => {
    render(<DashboardLayout />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    // After open, backdrop overlay renders
    const overlay = document.querySelector(".bg-ink\\/50");
    expect(overlay).toBeInTheDocument();
  });

  it("drawer closes when overlay is clicked", () => {
    render(<DashboardLayout />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const overlay = document.querySelector(".bg-ink\\/50") as HTMLElement;
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);
    expect(document.querySelector(".bg-ink\\/50")).not.toBeInTheDocument();
  });

  it("renders outlet for page content", () => {
    render(<DashboardLayout />);
    expect(screen.getByTestId("router-outlet")).toBeInTheDocument();
  });
});

describe("DashboardLayout — Accessibility", () => {
  it("main tag wraps page content", () => {
    render(<DashboardLayout />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("sidebar has navigation landmark", () => {
    render(<DashboardLayout />);
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThan(0);
  });

  it("menu button has accessible label", () => {
    render(<DashboardLayout />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });
});
