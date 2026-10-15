import { execFileSync, spawn } from "node:child_process";

import { compose, root } from "./config.mjs";
import { freePort } from "./process-manager.mjs";

function docker(args) {
  return execFileSync("docker", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

export function isDockerAvailable() {
  try {
    docker(["info", "--format", "{{json .ServerVersion}}"]);
    return true;
  } catch {
    return false;
  }
}

export async function startDockerDevelopment(webPort) {
  const ids = docker(["ps", "-q"]).split(/\s+/).filter(Boolean);
  if (ids.length) {
    const containers = JSON.parse(docker(["inspect", ...ids]));
    const occupied = containers
      .filter((container) =>
        Object.values(container.NetworkSettings.Ports || {}).some((bindings) =>
          bindings?.some((binding) => binding.HostPort === String(webPort)),
        ),
      )
      .map((container) => container.Id);
    if (occupied.length) {
      console.log(`Docker-containers op poort ${webPort} stoppen.`);
      docker(["stop", ...occupied]);
    }
  }

  await freePort(webPort);
  const child = spawn(
    "docker",
    [...compose, "up", "--build", "web", "matcher-api"],
    { cwd: root, stdio: "inherit" },
  );
  const interrupt = (signal) => child.kill(signal);
  process.once("SIGINT", () => interrupt("SIGINT"));
  process.once("SIGTERM", () => interrupt("SIGTERM"));
  child.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
  child.on("exit", (code) => {
    process.exitCode = code ?? 1;
  });
}
