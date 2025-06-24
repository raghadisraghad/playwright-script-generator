// import { test as base } from '@playwright/test';
// import { aiFixture, type AiFixture } from '@zerostep/playwright';
// import dotenv from 'dotenv';

// dotenv.config();

// export const test = base.extend<AiFixture>({
//   ...aiFixture(base),
// });















import { test as base } from '@playwright/test';
import { aiFixture } from '@zerostep/playwright';
import dotenv from 'dotenv';

dotenv.config();

export const test = base.extend({
  ...aiFixture(base, { token: process.env.ZEROSTEP_TOKEN }),
});








// import { chromium } from '@playwright/test';
// import { aiFixture } from '@zerostep/playwright';
// import dotenv from 'dotenv';

// dotenv.config();

// const userDataDir = 'C:\\playwright-profiles\\my-user'; // cloned Chrome profile

// export const test = aiFixture.extend({
//   context: async ({}, use) => {
//     const context = await chromium.launchPersistentContext(userDataDir, {
//       headless: false,
//     });
//     await use(context);
//     await context.close();
//   },

//   page: async ({ context }, use) => {
//     const page = await context.newPage();
//     await use(page);
//     await page.close();
//   }
// });
