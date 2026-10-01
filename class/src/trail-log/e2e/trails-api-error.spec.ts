import { test, expect } from '@playwright/test';

test.describe('When there is an API error', () => {
  test.beforeEach(async ({ page }) => {
    // create a test double that provides five good trails.
    await page.route('*/**/api/trails', async (route) => {
      await route.fulfill({
        status: 400,
      });
    });
    // page.route('*/**/alerts;)
    await page.goto('/');
  });
  test('The error message is shown', async ({ page }) => {
    const alert = page.locator('div').filter({ hasText: 'There was an API error!' });
    await expect(alert).toBeVisible();
    // could also check that a POST to a splunk endpoint was sent, etc.
    //
  });
});
