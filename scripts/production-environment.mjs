import {
  chmodSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const candidates = [
  "apps/web/.env",
  "apps/web/.env.local",
  "apps/web/.env.production.local",
];

export function prepareProductionEnvironment(root) {
  const sources = candidates
    .map((file) => path.join(root, file))
    .filter(existsSync);
  if (!sources.length) {
    throw new Error(
      "Maak apps/web/.env.production.local of een lokale .env aan voordat je de productieomgeving start.",
    );
  }

  const directory = mkdtempSync(path.join(tmpdir(), "portfolio-production-"));
  const file = path.join(directory, "environment");
  const contents = sources
    .map((source) => readFileSync(source, "utf8").trim())
    .filter(Boolean)
    .join("\n");
  writeFileSync(file, `${contents}\n`, { mode: 0o600 });
  chmodSync(file, 0o600);

  return {
    file,
    cleanup() {
      rmSync(directory, { recursive: true, force: true });
    },
  };
}
