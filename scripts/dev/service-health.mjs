import { setTimeout as delay } from "node:timers/promises";

export async function isHealthy(service) {
  try {
    const response = await fetch(service.healthUrl, {
      cache: "no-store",
      signal: AbortSignal.timeout(1_500),
    });
    if (!response.ok) return false;
    const payload = await response.json();
    return payload?.ok === true;
  } catch {
    return false;
  }
}

export async function waitUntilHealthy(service, attempts = 60) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (await isHealthy(service)) return;
    await delay(500);
  }
  throw new Error(
    `${service.name} werd niet op tijd bereikbaar via ${service.healthUrl}.`,
  );
}
