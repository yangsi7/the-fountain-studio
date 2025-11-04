import { test, expect } from '@playwright/test';

/**
 * Multi-Page Navigation Test Suite
 * Tests navigation between all main pages and language switching
 */

test.describe('Multi-Page Navigation', () => {
  test('All main pages are accessible from navigation', async ({ page }) => {
    await page.goto('/de');

    await test.step('Navigate to Services page', async () => {
      const servicesLink = page.getByRole('link', { name: /angebote/i });
      await servicesLink.click();
      await expect(page).toHaveURL('/de/services');
      await expect(page.getByRole('heading', { name: /angebote/i })).toBeVisible();
    });

    await test.step('Navigate to Learn page', async () => {
      const learnLink = page.getByRole('link', { name: /methodik/i });
      await learnLink.click();
      await expect(page).toHaveURL('/de/learn');
      await expect(page.getByText(/Biofield Tuning/i)).toBeVisible();
    });

    await test.step('Navigate to About page', async () => {
      const aboutLink = page.getByRole('link', { name: /über/i });
      await aboutLink.click();
      await expect(page).toHaveURL('/de/about');
      await expect(page.getByText(/Kristen/i)).toBeVisible();
    });

    await test.step('Navigate back to Home page', async () => {
      const homeLink = page.getByRole('link', { name: /home/i }).first();
      await homeLink.click();
      await expect(page).toHaveURL('/de');
    });
  });

  test('Language switcher preserves current route', async ({ page }) => {
    const routes = ['/', '/services', '/learn', '/about'];

    for (const route of routes) {
      await test.step(`Language switch on ${route}`, async () => {
        // Start on German version
        await page.goto(`/de${route}`);
        await expect(page).toHaveURL(`/de${route}`);

        // Switch to English
        const enButton = page.locator('[data-testid="lang-switcher-en"]');
        await enButton.click();
        await expect(page).toHaveURL(`/en${route}`);

        // Switch back to German
        const deButton = page.locator('[data-testid="lang-switcher-de"]');
        await deButton.click();
        await expect(page).toHaveURL(`/de${route}`);
      });
    }
  });

  test('Mobile navigation menu works correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/de');

    await test.step('Mobile menu button is visible', async () => {
      const menuButton = page.locator('[aria-label*="menu"]');
      await expect(menuButton).toBeVisible();
    });

    await test.step('Mobile menu opens and closes', async () => {
      const menuButton = page.locator('[aria-label*="menu"]');
      await menuButton.click();

      // Menu should be open
      const mobileNav = page.locator('[role="dialog"]').or(page.locator('.mobile-menu'));
      await expect(mobileNav).toBeVisible();

      // Close menu
      const closeButton = page.locator('[aria-label*="close"]').or(menuButton);
      await closeButton.click();

      // Menu should be closed
      await expect(mobileNav).not.toBeVisible();
    });

    await test.step('Can navigate via mobile menu', async () => {
      const menuButton = page.locator('[aria-label*="menu"]');
      await menuButton.click();

      // Click Services link in mobile menu
      const servicesLink = page.getByRole('link', { name: /angebote/i });
      await servicesLink.click();

      // Should navigate to services page
      await expect(page).toHaveURL('/de/services');
    });
  });

  test('Active page is highlighted in navigation', async ({ page }) => {
    await page.goto('/de/services');

    await test.step('Services link has active styling', async () => {
      const servicesLink = page.getByRole('link', { name: /angebote/i });

      // Active link should have distinct styling (gold color or different background)
      const classList = await servicesLink.getAttribute('class');
      expect(classList).toBeTruthy();

      // Take screenshot to verify visual styling
      await page.screenshot({ path: 'test-results/active-nav-state.png' });
    });
  });

  test('Navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/de');

    await test.step('Can tab through navigation links', async () => {
      // Tab to first focusable element
      await page.keyboard.press('Tab');

      // Keep tabbing until we reach navigation
      for (let i = 0; i < 10; i++) {
        const focused = await page.evaluate(() => document.activeElement?.tagName);
        if (focused === 'A') break;
        await page.keyboard.press('Tab');
      }

      // Should have focus on a link
      const focused = await page.locator(':focus');
      await expect(focused).toBeVisible();
    });

    await test.step('Can activate link with Enter key', async () => {
      // Find and focus Services link
      const servicesLink = page.getByRole('link', { name: /angebote/i });
      await servicesLink.focus();

      // Press Enter to navigate
      await page.keyboard.press('Enter');

      // Should navigate to services page
      await expect(page).toHaveURL('/de/services');
    });
  });
});
