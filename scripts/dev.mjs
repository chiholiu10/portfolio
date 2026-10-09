import { execFileSync, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 3100;
const compose = ["compose", "--env-file", "apps/web/.env"];

function docker(args) {
  return execFileSync("docker", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

export function listeners(targetPort) {
  try {
    return [
      ...new Set(
        execFileSync(
          "lsof",
          ["-nP", `-iTCP:${targetPort}`, "-sTCP:LISTEN", "-t"],
          { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
        )
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map(Number),
      ),
    ];
  } catch (error) {
    if (error.status === 1) return [];
    throw new Error(
      "Poortcontrole vereist lsof. Installeer lsof en probeer opnieuw.",
    );
  }
}

export async function freePort(targetPort) {
  const pids = listeners(targetPort);
  for (const pid of pids) {
    let command;
    try {
      command = execFileSync("ps", ["-p", String(pid), "-o", "comm="], {
        encoding: "utf8",
      });
    } catch {
      continue;
    }
    if (/docker|vpnkit/i.test(command))
      throw new Error(
        `Docker houdt poort ${targetPort} nog vast. Probeer het opnieuw zodra de container gestopt is.`,
      );
    console.log(`Poort ${targetPort} vrijmaken: proces ${pid} stoppen.`);
    try {
      process.kill(pid, "SIGTERM");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }
  for (
    let attempt = 0;
    attempt < 30 && listeners(targetPort).some((pid) => pids.includes(pid));
    attempt++
  )
    await delay(100);
  for (const pid of listeners(targetPort).filter((pid) => pids.includes(pid))) {
    try {
      process.kill(pid, "SIGKILL");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }
  for (let attempt = 0; attempt < 10 && listeners(targetPort).length; attempt++)
    await delay(100);
  if (listeners(targetPort).length)
    throw new Error(`Poort ${targetPort} kon niet worden vrijgemaakt.`);
}

async function main() {
  if (!existsSync(path.join(root, "apps/web/.env")))
    throw new Error(
      "Maak eerst apps/web/.env aan vanuit apps/web/.env.example.",
    );
  try {
    docker(["info", "--format", "{{json .ServerVersion}}"]);
  } catch {
    throw new Error(
      "Open eerst Docker Desktop. De Docker-daemon is niet bereikbaar.",
    );
  }

  // Stop containers by their exact host port; never kill Docker's shared proxy.
  const ids = docker(["ps", "-q"]).split(/\s+/).filter(Boolean);
  if (ids.length) {
    const containers = JSON.parse(docker(["inspect", ...ids]));
    const occupied = containers
      .filter((container) =>
        Object.values(container.NetworkSettings.Ports || {}).some((bindings) =>
          bindings?.some((binding) => binding.HostPort === String(port)),
        ),
      )
      .map((container) => container.Id);
    if (occupied.length) {
      console.log(`Docker-containers op poort ${port} stoppen.`);
      docker(["stop", ...occupied]);
    }
  }
  await freePort(port);
  const child = spawn(
    "docker",
    [...compose, "up", "--build", "web", "matcher-api"],
    { cwd: root, stdio: "inherit" },
  );
  const interrupt = () => child.kill("SIGINT");
  process.once("SIGINT", interrupt);
  process.once("SIGTERM", interrupt);
  child.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
  child.on("exit", (code) => {
    process.exitCode = code ?? 1;
  });
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
