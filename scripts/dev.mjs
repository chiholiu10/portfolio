import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { root, services } from "./dev/config.mjs";
import { isDockerAvailable, startDockerDevelopment } from "./dev/docker.mjs";
import { freePort, listeners, startServices } from "./dev/process-manager.mjs";

export { freePort, listeners };

function requestedMode(args) {
  if (args.includes("--local")) return "local";
  if (args.includes("--docker")) return "docker";
  return "auto";
}

async function main() {
  const localEnvironmentPath = path.join(root, "apps/web/.env.local");
  const dockerEnvironmentPath = path.join(root, "apps/web/.env");
  const hasEnvironmentFile =
    existsSync(localEnvironmentPath) || existsSync(dockerEnvironmentPath);
  if (!hasEnvironmentFile) {
    throw new Error(
      "Maak eerst apps/web/.env.local of apps/web/.env aan vanuit apps/web/.env.example.",
    );
  }

  const mode = requestedMode(process.argv.slice(2));
  const dockerAvailable = isDockerAvailable();
  if (mode === "docker" && !dockerAvailable) {
    throw new Error(
      "Docker-modus is gekozen, maar de Docker-daemon is niet bereikbaar.",
    );
  }
  if (mode === "docker" && !existsSync(dockerEnvironmentPath)) {
    throw new Error(
      "Docker-modus vereist apps/web/.env; Docker Compose leest .env.local niet.",
    );
  }
  const useDocker =
    mode === "docker" ||
    (mode === "auto" && dockerAvailable && existsSync(dockerEnvironmentPath));
  if (useDocker) {
    await startDockerDevelopment(services[0].port);
    return;
  }

  if (mode === "auto") {
    console.log(
      "Docker is niet bereikbaar; frontend en matcher-backend lokaal starten.",
    );
  }
  await startServices(services, root);
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
