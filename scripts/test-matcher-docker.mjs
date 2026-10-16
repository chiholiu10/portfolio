import { execFileSync } from "node:child_process";
import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";

const name = `matcher-test-${randomUUID()}`;
const image = `matcher-test:${randomUUID()}`;
const docker = (...args) =>
  execFileSync("docker", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
async function waitReady() {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const state = JSON.parse(docker("inspect", name))[0];
      const port = state.NetworkSettings.Ports?.["8000/tcp"]?.[0]?.HostPort;
      if (!port) {
        await delay(500);
        continue;
      }
      const url = `http://127.0.0.1:${port}`;
      if (
        (await fetch(`${url}/ready`, { signal: AbortSignal.timeout(1000) })).ok
      )
        return url;
    } catch {
      /* Startup and crash recovery may briefly refuse connections. */
    }
    await delay(500);
  }
  throw new Error("Matcher did not become ready within 30 seconds");
}
async function assertMatch(url) {
  const result = await fetch(`${url}/match`, {
    method: "POST",
    headers: {
      Authorization: "Bearer docker-test-token",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vacancy: "Looking for a React and TypeScript frontend developer.",
      projects: [
        {
          id: "example",
          title: "Example",
          claims: [
            {
              id: "example-react",
              skill: "React",
              statement:
                "Built and delivered the verified React frontend experience.",
              context: "Example",
              ownership: "individual",
              source: "contribution",
            },
            {
              id: "example-typescript",
              skill: "TypeScript",
              statement:
                "Used TypeScript throughout the verified frontend implementation.",
              context: "Example",
              ownership: "individual",
              source: "technology",
            },
          ],
        },
      ],
    }),
    signal: AbortSignal.timeout(3000),
  });
  const body = await result.json();
  if (
    !result.ok ||
    body.mode !== "keywords" ||
    body.matches[0]?.id !== "example"
  )
    throw new Error("Matcher contract failed");
}
try {
  docker("info", "--format", "{{.ServerVersion}}");
  docker("build", "-f", "apps/matcher-api/Dockerfile", "-t", image, ".");
  docker(
    "run",
    "-d",
    "--name",
    name,
    "--restart",
    "unless-stopped",
    "-p",
    "127.0.0.1::8000",
    "-e",
    "MATCHER_API_TOKEN=docker-test-token",
    image,
  );
  let url = await waitReady();
  await assertMatch(url);
  // Terminate PID 1 from inside using its registered signal handler.
  // Linux PID 1 ignores unhandled signals from inside its namespace; docker kill
  // can suppress the restart policy as an operator stop.
  try {
    docker(
      "exec",
      name,
      "python",
      "-c",
      "import os, signal; os.kill(1, signal.SIGTERM)",
    );
  } catch {
    /* The exec session can exit as PID 1 crashes; verify RestartCount below. */
  }
  let restarted = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (JSON.parse(docker("inspect", name))[0].RestartCount > 0) {
      restarted = true;
      break;
    }
    await delay(500);
  }
  if (!restarted)
    throw new Error("Container did not restart after process termination");
  url = await waitReady();
  await assertMatch(url);
  console.log(
    "Docker matcher startup, real request and process recovery passed.",
  );
} finally {
  try {
    docker("rm", "-f", name);
  } catch {
    /* Container may not have been created. */
  }
  try {
    docker("image", "rm", image);
  } catch {
    /* Build may have failed. */
  }
}
