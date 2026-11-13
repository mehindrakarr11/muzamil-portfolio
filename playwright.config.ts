import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";

const systemChromium = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ?? (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 30000,
  expect: { timeout: 8000 },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:3002",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    launchOptions: {
      executablePath: systemChromium,
      args: ["--enable-unsafe-swiftshader"],
      env: { ...process.env, XDG_CONFIG_HOME: "/tmp/muzamil-test-config", XDG_CACHE_HOME: "/tmp/muzamil-test-cache" },
    },
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } }, testMatch: /desktop.spec.ts/ },
    { name: "mobile", use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" }, testMatch: /mobile.spec.ts/ },
  ],
  webServer: { command: "npm run start -- --port 3002", url: "http://localhost:3002", reuseExistingServer: !process.env.CI, timeout: 30000 },
});
