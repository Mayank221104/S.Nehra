import { describe, it, expect } from "vitest";

// Example security test: ensure no dangerous eval usage
import fs from "fs";
import path from "path";

describe("Security: No dangerous patterns", () => {
  it("should not use eval or Function constructor in src/", () => {
    const files = fs.readdirSync(path.join(__dirname, "../"));
    for (const file of files) {
      if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        const content = fs.readFileSync(path.join(__dirname, "../", file), "utf8");
        expect(content.includes("eval(")).toBe(false);
        expect(content.includes("Function(")).toBe(false);
      }
    }
  });
});
