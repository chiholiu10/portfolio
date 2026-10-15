import { execFileSync, spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

import { isHealthy, waitUntilHealthy } from "./service-health.mjs";

export function listeners(port) {
  try {
    return [
      ...new Set(
        execFileSync("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN", "-t"], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        })
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

export async function freePort(port) {
  const pids = listeners(port);
  for (const pid of pids) {
    let command;
    try {
      command = execFileSync("ps", ["-p", String(pid), "-o", "comm="], {
        encoding: "utf8",
      });
    } catch {
      continue;
    }
    if (/docker|vpnkit/i.test(command)) {
      throw new Error(
        `Docker houdt poort ${port} nog vast. Probeer het opnieuw zodra de container gestopt is.`,
      );
    }
    console.log(`Poort ${port} vrijmaken: proces ${pid} stoppen.`);
    try {
      process.kill(pid, "SIGTERM");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }
  for (
    let attempt = 0;
    attempt < 30 && listeners(port).some((pid) => pids.includes(pid));
    attempt += 1
  ) {
    await delay(100);
  }
  for (const pid of listeners(port).filter((pid) => pids.includes(pid))) {
    try {
      process.kill(pid, "SIGKILL");
    } catch (error) {
      if (error.code !== "ESRCH") throw error;
    }
  }
  for (let attempt = 0; attempt < 10 && listeners(port).length; attempt += 1) {
    await delay(100);
  }
  if (listeners(port).length) {
    throw new Error(`Poort ${port} kon niet worden vrijgemaakt.`);
  }
}

function attachLifecycle(children) {
  let stopping = false;
  const stop = (signal = "SIGTERM") => {
    if (stopping) return;
    stopping = true;
    for (const child of children) {
      if (!child.killed) child.kill(signal);
    }
  };

  process.once("SIGINT", () => stop("SIGINT"));
  process.once("SIGTERM", () => stop("SIGTERM"));
  for (const child of children) {
    child.on("error", (error) => {
      console.error(error.message);
      process.exitCode = 1;
      stop();
    });
    child.on("exit", (code) => {
      if (!stopping) {
        process.exitCode = code ?? 1;
        stop();
      }
    });
  }
  return stop;
}

export async function startServices(services, root) {
  const executable = process.platform === "win32" ? "yarn.cmd" : "yarn";
  const pending = [];

  for (const service of services) {
    if (!listeners(service.port).length) {
      pending.push(service);
      continue;
    }
    if (!(await isHealthy(service))) {
      throw new Error(
        `Poort ${service.port} is bezet, maar ${service.name} reageert niet correct op ${service.healthUrl}.`,
      );
    }
    console.log(`${service.name} draait al op ${service.url}.`);
  }

  if (!pending.length) return;

  const children = pending.map((service) =>
    spawn(executable, service.args, { cwd: root, stdio: "inherit" }),
  );
  const stop = attachLifecycle(children);
  try {
    await Promise.all(pending.map((service) => waitUntilHealthy(service)));
    for (const service of pending) {
      console.log(`${service.name} is gereed op ${service.url}.`);
    }
  } catch (error) {
    process.exitCode = 1;
    stop();
    throw error;
  }
}
