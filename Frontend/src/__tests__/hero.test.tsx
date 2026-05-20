import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "../components/sections/hero"; // ✅ named import

describe("Hero Section — Content", () => {
  it("renders main heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("heading contains 'Stop Applying'", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/stop applying/i);
  });

  it("renders cohort badge", () => {
    render(<Hero />);
    // "Cohort 14" appears in both the badge and the info card — getAllByText handles this
    const elements = screen.getAllByText(/cohort 14/i);
    expect(elements.length).toBeGreaterThanOrEqual(1);
    // Badge specifically has the enrollment text
    expect(screen.getByText(/cohort 14.*enrolling/i)).toBeInTheDocument();
  });

  it("renders primary CTA link to /apply", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /begin application/i })).toHaveAttribute(
      "href",
      "/apply",
    );
  });

  it("renders secondary CTA link to /process", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /how the program works/i })).toHaveAttribute(
      "href",
      "/process",
    );
  });

  it("renders placement stats", () => {
    render(<Hero />);
    // 94% is in the trust badge "94% Placement Rate"
    expect(screen.getByText(/94%/i)).toBeInTheDocument();
  });
});

describe("Hero Section — Accessibility", () => {
  it("all links have accessible names", () => {
    render(<Hero />);
    screen.getAllByRole("link").forEach((link) => {
      expect(link).toHaveAccessibleName();
    });
  });

  it("section element is present", () => {
    render(<Hero />);
    expect(document.querySelector("section")).toBeInTheDocument();
  });

  it("trust badges are rendered", () => {
    render(<Hero />);
    expect(screen.getByText(/placement rate/i)).toBeInTheDocument();
    expect(screen.getByText(/job guarantee/i)).toBeInTheDocument();
  });
});
