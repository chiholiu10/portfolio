import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const file of [".env.local", ".env"]) {
  const environmentPath = path.join(root, "apps/web", file);
  if (existsSync(environmentPath)) process.loadEnvFile(environmentPath);
}

const python = path.join(root, "apps/matcher-api/.venv/bin/python");
if (!existsSync(python)) {
  console.error("Run yarn setup:python before evaluating the matcher.");
  process.exit(1);
}

const result = spawnSync(
  python,
  [
    "scripts/evaluate-matcher.py",
    "--live",
    "--output",
    ".matcher-evaluation-live.json",
  ],
  { cwd: root, env: process.env, stdio: "inherit" },
);
process.exit(result.status ?? 1);
