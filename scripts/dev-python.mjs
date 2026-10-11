import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
// Local overrides take precedence; explicitly supplied environment values win.
for (const file of [".env.local", ".env"]) {
  const path = `${root}apps/web/${file}`;
  if (existsSync(path)) process.loadEnvFile(path);
}
if (!process.env.MATCHER_API_TOKEN) {
  console.error(
    "Set MATCHER_API_TOKEN in apps/web/.env.local before starting the matcher.",
  );
  process.exit(1);
}
const child = spawn("python3", ["dev.py"], {
  cwd: `${root}apps/matcher-api`,
  env: process.env,
  stdio: "inherit",
});
child.on("error", () => {
  console.error("Could not start Python. Ensure python3 is installed.");
  process.exitCode = 1;
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
child.on("exit", (code) => {
  process.exitCode = code ?? 0;
});
