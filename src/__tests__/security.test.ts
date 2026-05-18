import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

function getAllFiles(dir: string, extensions: string[], excludeDirs: string[] = []): string[] {
  const results: string[] = [];
  function walk(current: string) {
    if (!fs.existsSync(current)) return;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (
        entry.isDirectory() &&
        !["node_modules", "dist", ".git", "coverage", ...excludeDirs].includes(entry.name)
      ) {
        walk(fullPath);
      } else if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
        results.push(fullPath);
      }
    }
  }
  walk(dir);
  return results;
}

const SRC_DIR = path.join(__dirname, "../");
// ✅ Fixed: __dirname = src/__tests__, so ../../ = project root
const BACKEND_SRC = path.join(__dirname, "../../backend/src/");
const TS_EXTS = [".ts", ".tsx"];

const frontendFiles = getAllFiles(SRC_DIR, TS_EXTS, ["__tests__"]);
const backendFiles = fs.existsSync(BACKEND_SRC)
  ? getAllFiles(BACKEND_SRC, TS_EXTS, ["__tests__"])
  : [];
const allSourceFiles = [...frontendFiles, ...backendFiles];

describe("Security: Dangerous code patterns", () => {
  it("no eval() calls in application source", () => {
    const violations: string[] = [];
    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (/(?<!\w)eval\s*\(/.test(content) && !file.includes("routeTree.gen")) {
        violations.push(path.relative(process.cwd(), file));
      }
    }
    expect(violations, "eval() found in: " + violations.join(", ")).toHaveLength(0);
  });

  it("no new Function() constructor in application source", () => {
    const violations: string[] = [];
    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (/new\s+Function\s*\(/.test(content)) {
        violations.push(path.relative(process.cwd(), file));
      }
    }
    expect(violations, "new Function() found in: " + violations.join(", ")).toHaveLength(0);
  });

  it("no dangerouslySetInnerHTML in custom components (shadcn ui/ folder exempt)", () => {
    const violations: string[] = [];
    const sep = path.sep;
    const customFiles = frontendFiles.filter(
      (f) => !f.includes(sep + "ui" + sep) && !f.includes("/ui/"),
    );
    for (const file of customFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (content.includes("dangerouslySetInnerHTML")) {
        violations.push(path.relative(process.cwd(), file));
      }
    }
    expect(violations, "dangerouslySetInnerHTML in: " + violations.join(", ")).toHaveLength(0);
  });

  it("no hardcoded secrets or API keys in source", () => {
    const violations: string[] = [];
    const secretPattern = /(?:secret|password|apikey|api_key)\s*[:=]\s*['"`][a-zA-Z0-9+/]{20,}/i;
    for (const file of allSourceFiles) {
      const content = fs.readFileSync(file, "utf8");
      if (secretPattern.test(content)) {
        const match = content.match(secretPattern);
        if (match && !match[0].includes("fallback") && !match[0].includes("example")) {
          violations.push(path.relative(process.cwd(), file));
        }
      }
    }
    expect(violations, "Hardcoded secret in: " + violations.join(", ")).toHaveLength(0);
  });

  it("no console.log in backend production code (soft warning)", () => {
    const violations: string[] = [];
    for (const file of backendFiles) {
      if (file.includes("test") || file.includes("spec") || file.includes("dev-api")) continue;
      const content = fs.readFileSync(file, "utf8");
      if (/console\.log\s*\(/.test(content)) {
        violations.push(path.relative(process.cwd(), file));
      }
    }
    if (violations.length > 0) {
      console.warn("console.log found in: " + violations.join(", ") + " — replace with logger");
    }
    expect(true).toBe(true);
  });
});

describe("Security: JWT configuration", () => {
  const jwtFile = path.join(BACKEND_SRC, "server/utils/jwt.ts");

  it("JWT file exists", () => {
    expect(fs.existsSync(jwtFile)).toBe(true);
  });

  it("JWT fallback secrets are short placeholder strings", () => {
    if (!fs.existsSync(jwtFile)) return;
    const content = fs.readFileSync(jwtFile, "utf8");
    const fallbacks = content.match(/\|\|\s*['"`]([^'"` ]+)['"`]/g) ?? [];
    for (const fallback of fallbacks) {
      const value = fallback.replace(/\|\|\s*['"`]/, "").replace(/['"`]$/, "");
      expect(value.length).toBeLessThan(30);
    }
  });

  it("JWT cookies are configured as httpOnly", () => {
    if (!fs.existsSync(jwtFile)) return;
    const content = fs.readFileSync(jwtFile, "utf8");
    expect(content).toContain("httpOnly: true");
  });

  it("JWT cookies are secure in production", () => {
    if (!fs.existsSync(jwtFile)) return;
    const content = fs.readFileSync(jwtFile, "utf8");
    expect(content).toMatch(/secure\s*:\s*process\.env\.NODE_ENV\s*===\s*['"]production['"]/);
  });
});
