import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AuthShell } from "../components/auth/auth-shell";

describe("AuthShell", () => {
  it("renders title and subtitle", () => {
    render(
      <AuthShell title="Test Title" subtitle="Test Subtitle">
        Test Children
      </AuthShell>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test Children")).toBeInTheDocument();
  });
});
