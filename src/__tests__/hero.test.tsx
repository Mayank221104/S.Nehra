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
    expect(screen.getByText(/cohort 14/i)).toBeInTheDocument();
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
    expect(screen.getByText("94%")).toBeInTheDocument();
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
