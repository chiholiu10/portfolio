import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

export const services = [
  {
    name: "Frontend",
    args: ["dev:web"],
    port: 3100,
    url: "http://localhost:3100",
    healthUrl: "http://127.0.0.1:3100/api/health",
  },
  {
    name: "Matcher-backend",
    args: ["dev:python"],
    port: 8000,
    url: "http://127.0.0.1:8000",
    healthUrl: "http://127.0.0.1:8000/ready",
  },
];

export const compose = ["compose", "--env-file", "apps/web/.env"];
