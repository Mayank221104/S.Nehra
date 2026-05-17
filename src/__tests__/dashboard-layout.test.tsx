import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DashboardLayout } from "../components/dashboard/dashboard-layout";

describe("DashboardLayout", () => {
  it("renders sidebar navigation", () => {
    render(<DashboardLayout />);
    expect(screen.getByText(/overview/i)).toBeInTheDocument();
    expect(screen.getByText(/training/i)).toBeInTheDocument();
  });
});
