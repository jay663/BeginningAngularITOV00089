import { test, expect } from '@playwright/test';

test.describe('Empty', () => {
  test.beforeEach(async ({ page }) => {
    // create a test double that provides five good trails.
    await page.route('*/**/api/trails', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });
    // page.route('*/**/alerts;)
    await page.goto('/');
  });
  test('The  message is shown', async ({ page }) => {
    const alert = page.getByText('No trails match your filters!');
    await expect(alert).toBeVisible();
    // could also check that a POST to a splunk endpoint was sent, etc.
    //
  });
});
