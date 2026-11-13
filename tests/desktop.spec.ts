import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("hero hydrates, renders 3D, and navigation reaches the project", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Mohammad Muzamil A", level: 1 })).toBeVisible();
  await expect(page.locator(".title-line > span").first()).toHaveCSS("transform", "none");
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("link", { name: "Explore my work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("heading", { name: "Ideas, made real.", exact: true })).toBeInViewport();
  expect(errors).toEqual([]);
});

test("forecast categories change the illustration without implying real results", async ({ page }) => {
  await page.goto("/#work");
  const original = await page.locator(".chart-history").getAttribute("d");
  await page.getByRole("button", { name: "Essentials", exact: true }).click();
  await expect(page.getByRole("button", { name: "Essentials", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("img", { name: /Illustrative essentials demand chart/ })).toBeVisible();
  expect(await page.locator(".chart-history").getAttribute("d")).not.toBe(original);
  await expect(page.getByText("ILLUSTRATIVE INTERFACE · NOT PROJECT OUTPUT")).toBeVisible();
});

test("project dialog traps focus, preserves placeholders, and restores focus on Escape", async ({ page }) => {
  await page.goto("/#work");
  const button = page.getByRole("button", { name: "Explore the project" });
  await button.click();
  const dialog = page.getByRole("dialog", { name: "Supply Chain Intelligence" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Repository link to be added")).toBeVisible();
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("dialog")))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(button).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("skill tabs support arrows and expose the matching panel", async ({ page }) => {
  await page.goto("/#expertise");
  const first = page.getByRole("tab", { name: "01 Full stack" });
  await first.focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("tab", { name: "02 Data & intelligence" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Scikit-learn");
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("Data structures & algorithms");
  await page.keyboard.press("Home");
  await expect(first).toHaveAttribute("aria-selected", "true");
});

test("original résumé downloads and contact links match the source", async ({ page, request, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email address", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied to clipboard.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("mohammadmuzamila403@gmail.com");
  await expect(page.getByRole("link", { name: "+91 8310774178" })).toHaveAttribute("href", "tel:+918310774178");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("link", { name: "Download résumé" }).last().click()]);
  expect(download.suggestedFilename()).toBe("Mohammad-Muzamil-A-Resume.pdf");
  const pdf = await request.get("/Mohammad-Muzamil-A-Resume.pdf");
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await expect(page.locator('a[href*="linkedin.com"]')).toHaveCount(0);
});

test("reduced motion hydrates cleanly and can be toggled explicitly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".title-line > span").first()).toHaveCSS("transform", "none");
  await page.getByRole("button", { name: "Enable animations" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.getByRole("button", { name: "Pause animations" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  expect(errors).toEqual([]);
});

test("certificates expand without presenting virtual experience as employment", async ({ page }) => {
  await page.goto("/#journey");
  const detail = page.locator("details").filter({ hasText: "Data Analysis & Forensic Technology" });
  await detail.locator("summary").click();
  await expect(detail).toHaveAttribute("open", "");
  await expect(detail.getByText("Virtual internship · learning experience")).toBeVisible();
});

test("visible page and project dialog pass WCAG A/AA automated checks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 600) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await page.waitForTimeout(80);
  }
  await page.waitForTimeout(500);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("button", { name: "Explore the project" }).click();
  const modal = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(modal.violations).toEqual([]);
});

test("core content and contact links remain readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://localhost:3002");
  await expect(page.getByRole("heading", { name: "Mohammad Muzamil A", level: 1 })).toBeVisible();
  await expect(page.locator(".title-line > span").first()).toHaveCSS("transform", "none");
  await expect(page.locator(".project-info")).toHaveCSS("opacity", "1");
  await expect(page.getByRole("link", { name: "mohammadmuzamila403@gmail.com" })).toBeVisible();
  await context.close();
});

test("unavailable WebGL gracefully falls back while the page stays usable", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).includes("webgl")) return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.locator(".sculpture-canvas .sculpture-fallback")).toBeVisible();
  await page.getByRole("link", { name: "Explore my work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole("button", { name: "Explore the project" })).toBeVisible();
});
