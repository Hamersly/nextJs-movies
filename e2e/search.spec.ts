import { test, expect } from '@playwright/test';

test.describe('Search', () => {
  test('search input exists on home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder('Поиск…')).toBeVisible();
  });

  test('navigates to search results URL on Enter', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.getByPlaceholder('Поиск…');
    await searchInput.fill('matrix');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/\/search\/matrix/);
  });
});
