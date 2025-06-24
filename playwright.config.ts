import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig({
  testDir: './src/scenarios',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.TEST_URL || 'https://duckduckgo.com',
    trace: 'on-first-retry',
    screenshot: 'on',
    headless: false,
    launchOptions: {
      slowMo: 1000,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});