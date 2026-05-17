import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../components/sections/hero";

describe("Hero Section", () => {
  it("renders editorial headline", () => {
    render(<Hero />);
    expect(screen.getByText(/career/i)).toBeInTheDocument();
  });
  it("has accessible CTAs", () => {
    render(<Hero />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((btn) => {
      expect(btn).toHaveAccessibleName();
    });
  });
});
