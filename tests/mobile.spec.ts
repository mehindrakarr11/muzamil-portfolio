import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: "reduce" }); });

test("mobile navigation stays focused and closes on selection and Escape", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(page.getByRole("navigation").getByRole("link", { name: "01 About" })).toBeFocused();
  for (let i = 0; i < 7; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("nav, .menu-toggle")))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation").getByRole("link", { name: "02 Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("navigation")).not.toBeVisible();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
});

test("mobile project controls and details are usable", async ({ page }) => {
  await page.goto("/#work");
  await page.getByRole("button", { name: "Lifestyle", exact: true }).click();
  await expect(page.getByRole("img", { name: /Illustrative lifestyle/ })).toBeVisible();
  await page.getByRole("button", { name: "Explore the project" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close project details" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("no horizontal overflow on small phones, phones, or tablets", async ({ page }) => {
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.getByRole("button", { name: "Explore the project" }).click();
    expect(await page.locator("dialog").evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true);
    await page.getByRole("button", { name: "Close project details" }).click();
  }
});

test("clipboard denial leaves contact details available and reports a useful fallback", async ({ page }) => {
  await page.addInitScript(() => { Object.defineProperty(navigator, "clipboard", { value: { writeText: () => Promise.reject(new Error("Permission denied")) } }); });
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email address", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Select the email above");
  await expect(page.getByRole("link", { name: "mohammadmuzamila403@gmail.com" })).toHaveAttribute("href", "mailto:mohammadmuzamila403@gmail.com");
});
