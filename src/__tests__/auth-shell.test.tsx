import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthShell, AuthField } from "../components/auth/auth-shell";

describe("AuthShell", () => {
  it("renders title and subtitle", () => {
    render(
      <AuthShell title="Welcome Back" subtitle="Sign in to continue">
        <div>form content</div>
      </AuthShell>,
    );
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByText("Sign in to continue")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <AuthShell title="T" subtitle="S">
        <button>Submit</button>
      </AuthShell>,
    );
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("renders optional footer when provided", () => {
    render(
      <AuthShell title="T" subtitle="S" footer={<span>Already have an account?</span>}>
        child
      </AuthShell>,
    );
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it("does not render footer section when omitted", () => {
    const { queryByText } = render(
      <AuthShell title="T" subtitle="S">
        child
      </AuthShell>,
    );
    expect(queryByText(/already have an account/i)).not.toBeInTheDocument();
  });

  it("has a link back to home", () => {
    render(
      <AuthShell title="T" subtitle="S">
        child
      </AuthShell>,
    );
    // Link text is the brand name — just verify href="/" exists
    const homeLink = screen.getByRole("link", { name: /s\.nehra|atelier/i });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("displays current year in copyright", () => {
    render(
      <AuthShell title="T" subtitle="S">
        child
      </AuthShell>,
    );
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });
});

describe("AuthField", () => {
  it("renders label and input", () => {
    render(<AuthField label="Email" placeholder="you@example.com" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("renders hint text when provided", () => {
    render(<AuthField label="Password" hint="Minimum 8 characters" />);
    expect(screen.getByText("Minimum 8 characters")).toBeInTheDocument();
  });

  it("does not render hint when omitted", () => {
    const { queryByText } = render(<AuthField label="Email" />);
    expect(queryByText(/minimum/i)).not.toBeInTheDocument();
  });

  it("renders rightSlot content", () => {
    render(<AuthField label="Password" rightSlot={<a href="/forgot-password">Forgot?</a>} />);
    expect(screen.getByRole("link", { name: /forgot/i })).toBeInTheDocument();
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<AuthField label="Email" value="" onChange={handleChange} />);
    await user.type(screen.getByRole("textbox"), "a");
    expect(handleChange).toHaveBeenCalled();
  });

  it("uses password input type", () => {
    render(<AuthField label="Password" type="password" />);
    const input = document.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();
  });
});
