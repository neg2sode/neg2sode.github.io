import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    // The site's primary audience is Chinese; run tests in zh so content
    // assertions hit the Chinese strings. See the localisation test for en.
    locale: 'zh-CN',
    trace: 'on-first-retry',
  },
  // Boot the Vite dev server for the test run (reuses one if already running).
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
