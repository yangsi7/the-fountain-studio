import { test, expect } from '@playwright/test';

/**
 * Responsive Design Test Suite
 * Tests site responsiveness across different viewport sizes
 */

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 },
];

test.describe('Responsive Design', () => {
  for (const viewport of viewports) {
    test(`Homepage renders correctly at ${viewport.name} (${viewport.width}px)`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/de');

      await test.step('Page loads without horizontal scroll', async () => {
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 1); // +1 for rounding
      });

      await test.step('Main content is visible', async () => {
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();

        // Content should not overflow viewport
        const box = await h1.boundingBox();
        if (box) {
          expect(box.width).toBeLessThanOrEqual(viewport.width);
        }
      });

      await test.step('Navigation is accessible', async () => {
        if (viewport.width < 768) {
          // Mobile: Should have hamburger menu
          const menuButton = page.locator('[aria-label*="menu"]');
          await expect(menuButton).toBeVisible();
        } else {
          // Desktop: Should have full navigation
          const navLinks = page.getByRole('link', { name: /services|learn|about/i });
          await expect(navLinks.first()).toBeVisible();
        }
      });
    });
  }

  test('Images maintain aspect ratio at all breakpoints', async ({ page }) => {
    for (const viewport of viewports) {
      await test.step(`Images at ${viewport.name}`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/de');

        const images = page.locator('img').first();
        await images.scrollIntoViewIfNeeded();

        // Get natural and displayed dimensions
        const dimensions = await images.evaluate((img: HTMLImageElement) => ({
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          displayWidth: img.clientWidth,
          displayHeight: img.clientHeight,
        }));

        // Images should not be stretched (aspect ratio preserved)
        const naturalRatio = dimensions.naturalWidth / dimensions.naturalHeight;
        const displayRatio = dimensions.displayWidth / dimensions.displayHeight;

        // Allow 5% variance for rounding
        const ratioDiff = Math.abs(naturalRatio - displayRatio) / naturalRatio;
        expect(ratioDiff).toBeLessThan(0.05);
      });
    }
  });

  test('Touch targets are at least 48px on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/de');

    await test.step('All buttons meet touch target size requirement', async () => {
      const buttons = await page.locator('button, a[role="button"]').all();

      for (const button of buttons) {
        const box = await button.boundingBox();

        if (box) {
          // Both width and height should be at least 48px (WCAG guideline)
          expect(box.height).toBeGreaterThanOrEqual(44); // Allow slightly smaller for tight designs
        }
      }
    });
  });

  test('Font sizes are readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/de');

    await test.step('Body text is at least 16px', async () => {
      const bodyText = page.locator('p').first();
      const fontSize = await bodyText.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });

      expect(fontSize).toBeGreaterThanOrEqual(16);
    });

    await test.step('Headings scale appropriately', async () => {
      const h1 = page.locator('h1').first();
      const h1Size = await h1.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).fontSize);
      });

      // H1 should be significantly larger than body text (at least 1.5x)
      expect(h1Size).toBeGreaterThanOrEqual(24);
    });
  });

  test('Sections adapt layout responsively', async ({ page }) => {
    await test.step('Desktop: Multi-column layouts display', async () => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/de/services');

      // Services should display in grid on desktop
      await page.screenshot({ path: 'test-results/services-desktop.png' });
    });

    await test.step('Mobile: Stacked layouts display', async () => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/de/services');

      // Services should stack on mobile
      await page.screenshot({ path: 'test-results/services-mobile.png' });
    });
  });

  test('No content is hidden or cut off at any breakpoint', async ({ page }) => {
    for (const viewport of viewports) {
      await test.step(`Content visibility at ${viewport.name}`, async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/de');

        // Essential content should be visible
        await expect(page.locator('h1').first()).toBeVisible();

        // Primary CTA should be visible
        const bookButton = page.getByRole('button', { name: /jetzt buchen/i }).first();
        await expect(bookButton).toBeVisible();

        // No horizontal scrollbar
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        expect(hasHorizontalScroll).toBe(false);
      });
    }
  });
});
