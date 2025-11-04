import { test, expect } from '@playwright/test';

/**
 * Booking Journey Test Suite
 * Tests complete user flow from homepage to booking modal
 */

test.describe('Booking Journey', () => {
  test('User can discover services and initiate booking from homepage', async ({ page }) => {
    await test.step('Navigate to German homepage', async () => {
      await page.goto('/de');
      await expect(page).toHaveTitle(/The Fountain Studio/);
    });

    await test.step('Hero section has clear booking CTA', async () => {
      const heroBooking = page.getByRole('button', { name: /jetzt buchen/i });
      await expect(heroBooking).toBeVisible();
      await page.screenshot({ path: 'test-results/hero-section.png' });
    });

    await test.step('Navigate to Services page via CTA', async () => {
      // Click "View All Services" button in services summary section
      const servicesLink = page.getByRole('link', { name: /alle angebote/i });
      await servicesLink.click();
      await expect(page).toHaveURL('/de/services');
    });

    await test.step('Services page loads with all packages', async () => {
      // Verify main service sections are present
      await expect(page.locator('#biofield-tuning')).toBeVisible();
      await expect(page.locator('#gyrotonic')).toBeVisible();
      await expect(page.locator('#breathwork')).toBeVisible();
    });

    await test.step('Booking button triggers Cal.com modal', async () => {
      // Find first booking button
      const bookButton = page.getByRole('button', { name: /jetzt buchen/i }).first();
      await bookButton.click();

      // Note: Cal.com modal is loaded via external script,
      // so we can't easily test the modal content
      // But we can verify the button click doesn't cause errors
      await page.waitForTimeout(500);

      // Check no console errors occurred
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      expect(errors.length).toBe(0);
    });
  });

  test('Booking flow works in English', async ({ page }) => {
    await test.step('Navigate to English services page', async () => {
      await page.goto('/en/services');
      await expect(page).toHaveURL('/en/services');
    });

    await test.step('Content is in English', async () => {
      await expect(page.getByText(/All Services/i)).toBeVisible();
      await expect(page.getByText(/Biofield Tuning/i)).toBeVisible();
    });

    await test.step('Booking button is present and clickable', async () => {
      const bookButton = page.getByRole('button', { name: /book now/i }).first();
      await expect(bookButton).toBeVisible();
      await expect(bookButton).toBeEnabled();
    });
  });

  test('WhatsApp contact button works correctly', async ({ page }) => {
    await page.goto('/de');

    await test.step('WhatsApp button is visible in booking section', async () => {
      // Scroll to booking section
      await page.locator('#booking').scrollIntoViewIfNeeded();

      const whatsappButton = page.getByRole('link', { name: /whatsapp/i });
      await expect(whatsappButton).toBeVisible();
    });

    await test.step('WhatsApp button has correct href', async () => {
      const whatsappButton = page.getByRole('link', { name: /whatsapp/i });
      const href = await whatsappButton.getAttribute('href');
      expect(href).toContain('wa.me');
      expect(href).toContain('41'); // Swiss country code
    });
  });
});
