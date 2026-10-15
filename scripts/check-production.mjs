import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { prepareProductionEnvironment } from "./production-environment.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const preparedEnvironment = prepareProductionEnvironment(root);
const compose = [
  "compose",
  "--env-file",
  preparedEnvironment.file,
  "-f",
  "docker-compose.production.yml",
];
const environment = {
  ...process.env,
  PRODUCTION_ENV_FILE: preparedEnvironment.file,
};

async function check(name, operation) {
  try {
    await operation();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}: ${error.message}`);
    process.exitCode = 1;
  }
}

async function fetchRequired(url, validate) {
  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  await validate(response);
}

try {
  await check("Frontend health", () =>
    fetchRequired("http://127.0.0.1:3100/api/health", async (response) => {
      const payload = await response.json();
      if (payload.ok !== true) throw new Error("ongeldige healthresponse");
    }),
  );

  await check("Homepage en securityheaders", () =>
    fetchRequired("http://127.0.0.1:3100", async (response) => {
      for (const header of [
        "content-security-policy",
        "referrer-policy",
        "x-content-type-options",
        "x-frame-options",
      ]) {
        if (!response.headers.has(header))
          throw new Error(`${header} ontbreekt`);
      }
      const body = await response.text();
      if (!body.includes("<!DOCTYPE html>"))
        throw new Error("homepage bevat geen HTML-document");
    }),
  );

  await check("Matcher readiness via intern netwerk", async () => {
    execFileSync(
      "docker",
      [
        ...compose,
        "exec",
        "-T",
        "web",
        "node",
        "-e",
        "fetch('http://matcher-api:8000/ready').then(async r=>{const p=await r.json();if(!r.ok||p.ok!==true)process.exit(1)}).catch(()=>process.exit(1))",
      ],
      { cwd: root, env: environment, stdio: "pipe" },
    );
  });
} finally {
  preparedEnvironment.cleanup();
}

if (process.exitCode) process.exit(process.exitCode);
console.log("Productie-smoketest geslaagd: http://localhost:3100");
