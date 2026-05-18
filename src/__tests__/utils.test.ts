import { describe, it, expect } from "vitest";
import { cn } from "../lib/utils";

describe("cn — class name utility", () => {
  // Basic merging
  it("merges two class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("filters out falsy values", () => {
    expect(cn("a", false && "b", undefined, null as any, "c")).toBe("a c");
  });

  it("handles empty call", () => {
    expect(cn()).toBe("");
  });

  it("handles single class", () => {
    expect(cn("only")).toBe("only");
  });

  it("handles conditional class with ternary", () => {
    const active = true;
    expect(cn("base", active ? "active" : "inactive")).toBe("base active");
  });

  // Tailwind conflict resolution (clsx + tailwind-merge)
  it("resolves conflicting Tailwind padding classes — last wins", () => {
    expect(cn("p-4", "p-6")).toBe("p-6");
  });

  it("resolves conflicting text color — last wins", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("does not remove non-conflicting Tailwind classes", () => {
    const result = cn("flex", "items-center", "gap-4");
    expect(result).toContain("flex");
    expect(result).toContain("items-center");
    expect(result).toContain("gap-4");
  });

  it("handles array-style conditional classes", () => {
    const isError = false;
    const result = cn("input-base", isError && "border-red-500", "rounded-md");
    expect(result).not.toContain("border-red-500");
    expect(result).toContain("rounded-md");
  });

  it("handles object-style clsx input", () => {
    const result = cn({ "font-bold": true, italic: false });
    expect(result).toContain("font-bold");
    expect(result).not.toContain("italic");
  });
});
