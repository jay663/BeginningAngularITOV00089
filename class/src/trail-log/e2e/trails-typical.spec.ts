import { test, expect } from '@playwright/test';
import { FAKE_TRAILS } from '../src/app/trails/fake-data';
test.describe('The Typical List of Trails', () => {
  test.beforeEach(async ({ page }) => {
    // create a test double that provides five good trails.
    await page.route('*/**/api/trails', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(FAKE_TRAILS),
      });
    });
    await page.goto('/');
  });
  test('The List should be visible', async ({ page }) => {
    const list = page.getByTestId('trail-list'); // the element with data-testid="trails-list"
    await expect(list).toBeVisible();
    const cards = list.locator('> *');
    const count = await cards.count();
    expect(count).toBe(5);

    const btn = page.getByRole('button', { name: 'Only Favorites' });
    await btn.click();

    const newCount = await cards.count();
    expect(newCount).toBe(1); // I thought should be zero
    const url = page.url();
    const urlObj = new URL(url);

    const filterParam = urlObj.searchParams.get('filter');
    expect(filterParam).toBe('favorites');
  });
  test('The first one', async ({ page }) => {
    const first = page.getByTestId('item-0');
    await expect(first).toBeVisible();
    const firstHeading = first.getByRole('heading', { name: 'Bear Creek Trail' });
    await expect(firstHeading).toBeVisible();
    const second = page.getByTestId('item-1');
    await expect(second).toBeVisible();

    const toggle = first.getByRole('checkbox', { name: 'Mark as Favorite' });
    await toggle.click();
  });
});
