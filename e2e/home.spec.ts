import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('shows the app title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('ВидеоПоиск')).toBeVisible();
  });

  test('has a search field', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByPlaceholder('Поиск…')).toBeVisible();
  });

  test('has navigation menu', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('menu')).toBeVisible();
  });

  test('has theme toggle button', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByLabel('переключить тему')).toBeVisible();
  });
});
