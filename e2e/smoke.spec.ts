import { test, expect } from "@playwright/test";

test.describe("Smoke Test Suite", () => {
  test("loads the home page and verifies title and key heading", async ({ page }) => {
    await page.goto("/");

    // Verify page title
    await expect(page).toHaveTitle(/Next\.js/i);

    // Verify main heading
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/Production-Ready/i);

    // Verify navbar is visible
    const navbar = page.locator("header");
    await expect(navbar).toBeVisible();
  });
});
