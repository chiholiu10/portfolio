import { defineConfig } from "@playwright/test";

const baseURL = process.env.DEPLOYMENT_URL || "http://127.0.0.1:3100";

export default defineConfig({
  testDir: "./tests/security",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    browserName: "chromium",
    trace: "retain-on-failure",
  },
});
