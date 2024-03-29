import { test, expect } from '@playwright/test';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const reseller = process.env.RESELLER;
const expectHost = process.env.EXPECTED_HOST;

const login = async (page) => {
  if (!email || !password) {
    console.warn('No email or password provided, bailing.');
    process.exit(1);
  }
  await page.goto('https://portal.wazo.io/?manifestUrl=http://localhost:5173/manifest.json');

  await page.waitForSelector('#username');
  await page.fill('#username', email);
  await page.fill('input[name="password"]', password);

  await Promise.all([page.waitForLoadState('networkidle'), page.locator('button[type="submit"]').click()]);

  if (reseller) {
    const tenantSelector = page.locator('#tenant-switcher');
    await expect(tenantSelector).toBeVisible();
    await tenantSelector.click();
    await page.locator(`#tenant-switcher div[tabindex="-1"]:has-text("${reseller}")`).click();
  }
  await page.locator('a.item[href="#/instances"]').click();
  await page.locator(`tr:has(span:has-text("${expectHost}")) button[data-cy="connect-to-instance-button"]`).click();

  await page.locator('button:has-text("My plugin")').click();
};

test('Checking hostname is displayed', async ({ page }) => {
  await login(page);

  expect(await page.frameLocator('iframe').locator('#host').textContent()).toEqual(expectHost);
});
