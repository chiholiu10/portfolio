import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const formatViolations = (violations) =>
  violations.map(({ help, helpUrl, id, impact, nodes }) => ({
    help,
    helpUrl,
    id,
    impact,
    targets: nodes.map(({ target }) => target),
  }));

const expectAccessible = async (page, selector) => {
  const results = await new AxeBuilder({ page })
    .include(selector)
    .withTags(wcagTags)
    .analyze();

  expect(
    formatViolations(results.violations),
    `Accessibility violations found in ${selector}`,
  ).toEqual([]);
};

test.describe("critical component accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
  });

  test("contact form meets WCAG A and AA rules", async ({ page }) => {
    const contact = page.locator("#contact");
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeVisible();
    await expect(page.getByLabel("Name *")).toBeVisible();
    await expect(page.getByLabel("Email *")).toBeVisible();
    await expect(page.getByLabel("Subject *")).toBeVisible();
    await expect(page.getByLabel("Message *")).toBeVisible();

    await expectAccessible(page, "#contact");
  });

  test("vacancy matcher meets WCAG A and AA rules", async ({ page }) => {
    const matcher = page.locator("#vacancy-match");
    await matcher.scrollIntoViewIfNeeded();
    await expect(matcher).toBeVisible();

    const revealButton = matcher.locator(
      'button[aria-controls="matcher-form"]',
    );
    if (await revealButton.isVisible()) {
      await revealButton.click();
    }

    await expect(page.locator("#matcher-vacancy")).toBeVisible();
    await expectAccessible(page, "#vacancy-match");
  });
});
