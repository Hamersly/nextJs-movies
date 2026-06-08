import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('menu opens and has links', async ({ page }) => {
    await page.getByLabel('menu').click();
    await expect(page.getByRole('link', { name: 'Главная' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Фильмы' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Сериалы' })).toBeVisible();
  });

  test('navigates to movies page via menu', async ({ page }) => {
    await page.getByLabel('menu').click();
    await page.getByRole('link', { name: 'Фильмы' }).click();
    await expect(page).toHaveURL('/movie');
  });

  test('navigates to series page via menu', async ({ page }) => {
    await page.getByLabel('menu').click();
    await page.getByRole('link', { name: 'Сериалы' }).click();
    await expect(page).toHaveURL('/tv');
  });
});
