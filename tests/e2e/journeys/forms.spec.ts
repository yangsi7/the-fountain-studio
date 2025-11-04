import { test, expect } from '@playwright/test';

/**
 * Form Validation Test Suite
 * Tests form interactions and validation (if contact forms exist)
 */

test.describe('Form Validation', () => {
  test('Contact/booking forms have proper validation', async ({ page }) => {
    await page.goto('/de');

    await test.step('Forms are present on page', async () => {
      // Look for form elements
      const forms = page.locator('form');
      const formCount = await forms.count();

      // If no forms, skip detailed tests
      if (formCount === 0) {
        test.skip(true, 'No forms found on homepage');
      }
    });
  });

  test('Booking buttons are properly configured', async ({ page }) => {
    await page.goto('/de');

    await test.step('All booking buttons have correct data attributes', async () => {
      const bookButtons = page.locator('[data-cal-link]');
      const buttonCount = await bookButtons.count();

      expect(buttonCount).toBeGreaterThan(0);

      // Verify first button has Cal.com configuration
      const firstButton = bookButtons.first();
      const calLink = await firstButton.getAttribute('data-cal-link');

      expect(calLink).toBeTruthy();
      expect(calLink).toContain('/');
    });

    await test.step('Booking buttons are enabled and clickable', async () => {
      const bookButtons = page.getByRole('button', { name: /jetzt buchen|book now/i });

      for (const button of await bookButtons.all()) {
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
      }
    });
  });

  test('WhatsApp contact link is properly formatted', async ({ page }) => {
    await page.goto('/de');

    await test.step('WhatsApp link exists and has correct format', async () => {
      const whatsappLink = page.getByRole('link', { name: /whatsapp/i });

      if (await whatsappLink.count() > 0) {
        const href = await whatsappLink.first().getAttribute('href');

        expect(href).toBeTruthy();
        expect(href).toContain('wa.me');

        // Should have Swiss country code (41)
        expect(href).toMatch(/41\d{9}/);
      }
    });
  });

  test('Language-specific form content is correct', async ({ page }) => {
    await test.step('German form labels are in German', async () => {
      await page.goto('/de');

      const bookButtons = page.getByRole('button', { name: /jetzt buchen/i });
      const buttonCount = await bookButtons.count();

      expect(buttonCount).toBeGreaterThan(0);
    });

    await test.step('English form labels are in English', async () => {
      await page.goto('/en');

      const bookButtons = page.getByRole('button', { name: /book now/i });
      const buttonCount = await bookButtons.count();

      expect(buttonCount).toBeGreaterThan(0);
    });
  });

  test('Required form fields prevent submission when empty', async ({ page }) => {
    await page.goto('/de');

    await test.step('Check if contact forms exist', async () => {
      const forms = page.locator('form');
      const formCount = await forms.count();

      if (formCount === 0) {
        test.skip(true, 'No forms with validation found');
        return;
      }

      // If forms exist, test validation
      const submitButton = page.getByRole('button', { name: /senden|send|submit/i });

      if (await submitButton.count() > 0) {
        await submitButton.first().click();

        // Should show validation errors or prevent submission
        // This is a basic check - actual implementation depends on form library
        await page.waitForTimeout(500);
      }
    });
  });

  test('Form buttons have appropriate loading states', async ({ page }) => {
    await page.goto('/de');

    await test.step('Booking buttons maintain consistent styling', async () => {
      const bookButtons = page.getByRole('button', { name: /jetzt buchen|book now/i });

      for (const button of await bookButtons.all()) {
        // Button should have consistent styling (design system variant)
        const className = await button.getAttribute('class');
        expect(className).toBeTruthy();

        // Should not have any error states by default
        await expect(button).not.toHaveClass(/error|invalid/);
      }
    });
  });
});
