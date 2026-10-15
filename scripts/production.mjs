import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { prepareProductionEnvironment } from "./production-environment.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
let preparedEnvironment;
try {
  preparedEnvironment = prepareProductionEnvironment(root);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

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

function docker(args) {
  const result = spawnSync("docker", [...compose, ...args], {
    cwd: root,
    env: environment,
    stdio: "inherit",
  });
  if (result.error) {
    throw new Error(
      "Docker kon niet worden gestart. Controleer of Docker Desktop actief is.",
    );
  }
  if (result.status !== 0) {
    throw new Error(`Docker Compose stopte met exitcode ${result.status}.`);
  }
}

const command = process.argv[2];
try {
  switch (command) {
    case "build":
      docker(["build"]);
      break;
    case "up":
      docker(["up"]);
      break;
    case "up-detached":
      docker(["up", "-d"]);
      break;
    case "down":
      docker(["down", "--remove-orphans"]);
      break;
    case "logs":
      docker(["logs", "-f"]);
      break;
    default:
      throw new Error(
        "Gebruik: node scripts/production.mjs build|up|up-detached|down|logs",
      );
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  preparedEnvironment.cleanup();
}
