import { test, expect } from '@playwright/test';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const server = process.env.SERVER;
const expectedFirstname = process.env.EXPECTED_FIRSTNAME;

const login = async (page) => {
  if (!email || !password) {
    console.warn('No email or password provided, bailing.');
    process.exit(1);
  }
  await page.goto('https://app.wazo.io/?manifestUrl=http://localhost:5173/manifest.json');

  await page.waitForSelector('#usernameTextField');
  await page.fill('#usernameTextField', email);
  await page.fill('#passwordTextField', password);

  try {
    await page.locator('#showSettingsButton').click({ timeout: 225 });
  } catch { }

  // Set domain
  await page.fill('#domainTextField', server);
  await page.locator('#loginButton').click();

  // wait for all network requests to finish
  try {
    await page.waitForSelector('[data-testid="navigation-bar"]');
    await page.waitForLoadState('networkidle', { timeout: 5000 });
  } catch (e) {
    // nothing to do
  }

  // wait for the app to be loaded
  await page.waitForSelector('[data-testid="user-avatar-navigation"]');

  await page.locator('[data-testid="plugin-sidebar-my-wda-ma-plugin"]').click();
}

test('Checking firstname is displayed', async ({ page }) => {
  await login(page);

  expect(await page.frameLocator('iframe').locator('#firstname').textContent()).toEqual(expectedFirstname);
});
