import { freePort } from "./dev.mjs";

// Docker's host port is freed by the root launcher; containers have their own network.
if (process.env.PORT_MANAGED_BY_DOCKER !== "true") {
  await freePort(3100);
}
