import { expect, test } from "@playwright/test";

test("the deployed homepage runs without CSP violations", async ({ page }) => {
  await page.addInitScript(() => {
    window.__securityPolicyViolations = [];
    document.addEventListener("securitypolicyviolation", (event) => {
      window.__securityPolicyViolations.push({
        blockedURI: event.blockedURI,
        directive: event.effectiveDirective,
        lineNumber: event.lineNumber,
        sourceFile: event.sourceFile,
      });
    });
  });

  const response = await page.goto("/", { waitUntil: "networkidle" });

  expect(response?.ok()).toBe(true);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Senior Frontend Developer/i,
    }),
  ).toBeVisible();

  const violations = await page.evaluate(
    () => window.__securityPolicyViolations || [],
  );
  expect(violations).toEqual([]);
});
