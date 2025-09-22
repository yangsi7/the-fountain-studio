import { test, expect } from '@playwright/test';

test.describe('Booking Section Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display booking section with benefits', async ({ page }) => {
    // Scroll to contact/booking section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Verify section title exists
    await expect(page.getByRole('heading', { name: /Schedule Your Session|Termin vereinbaren/i })).toBeVisible();

    // Verify benefits are displayed
    await expect(page.getByText(/Select your preferred time|Wählen Sie Ihre bevorzugte Zeit/i)).toBeVisible();
    await expect(page.getByText(/Instant confirmation|Sofortige Bestätigung/i)).toBeVisible();
    await expect(page.getByText(/Secure online booking|Sichere Online-Buchung/i)).toBeVisible();

    // Verify CTA button exists
    const ctaButton = page.getByRole('button', { name: /View Available Times|Verfügbare Zeiten anzeigen/i });
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toBeEnabled();
  });

  test('should open booking modal when CTA is clicked', async ({ page }) => {
    // Scroll to booking section
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Click the booking CTA
    await page.getByRole('button', { name: /View Available Times|Verfügbare Zeiten anzeigen/i }).click();

    // Verify modal opens
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Verify modal has correct title
    await expect(modal.getByRole('heading', { name: /Book Your Session/i })).toBeVisible();
  });

  test('should display booking details information', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Check for session details
    await expect(page.getByText(/60-90 minute sessions/i)).toBeVisible();
    await expect(page.getByText(/In-person at our Au ZH studio/i)).toBeVisible();
    await expect(page.getByText(/Cancellation available up to 24 hours/i)).toBeVisible();
  });

  test('should have WhatsApp button visible and not conflicting', async ({ page }) => {
    // WhatsApp button should be visible
    const whatsappButton = page.locator('[aria-label*="WhatsApp"]');
    await expect(whatsappButton).toBeVisible();

    // Should be positioned fixed (floating)
    const position = await whatsappButton.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.position;
    });
    expect(position).toBe('fixed');

    // Cal.com floating button should NOT exist
    const calFloatingButton = page.locator('[data-cal-namespace="secret"][data-cal-config*="floatingButton"]');
    await expect(calFloatingButton).not.toBeVisible();
  });

  test('should handle language switching in booking section', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Start in English
    await expect(page.getByText('Schedule Your Session')).toBeVisible();

    // Switch to German
    await page.getByRole('button', { name: 'DE' }).click();

    // Wait for language change
    await page.waitForTimeout(500);

    // Verify German text
    await expect(page.getByText('Termin vereinbaren')).toBeVisible();
    await expect(page.getByText('Wählen Sie Ihre bevorzugte Zeit')).toBeVisible();

    // Switch back to English
    await page.getByRole('button', { name: 'EN' }).click();

    // Wait for language change
    await page.waitForTimeout(500);

    // Verify English text is back
    await expect(page.getByText('Schedule Your Session')).toBeVisible();
  });

  test('should not show contact form anymore', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Old contact form elements should not exist
    const nameInput = page.locator('input[name="name"]');
    const emailInput = page.locator('input[name="email"]');
    const messageTextarea = page.locator('textarea[name="message"]');
    const submitButton = page.getByRole('button', { name: /Send Message|Nachricht senden/i });

    await expect(nameInput).not.toBeVisible();
    await expect(emailInput).not.toBeVisible();
    await expect(messageTextarea).not.toBeVisible();
    await expect(submitButton).not.toBeVisible();
  });

  test('should maintain responsive design', async ({ page, viewport }) => {
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Booking section should still be visible and functional
    await expect(page.getByRole('heading', { name: /Schedule Your Session|Termin vereinbaren/i })).toBeVisible();

    const ctaButton = page.getByRole('button', { name: /View Available Times|Verfügbare Zeiten anzeigen/i });
    await expect(ctaButton).toBeVisible();

    // Button should be full width on mobile
    const buttonWidth = await ctaButton.evaluate(el => (el as HTMLElement).offsetWidth);
    const containerWidth = await page.locator('#contact').evaluate(el => (el as HTMLElement).offsetWidth);
    expect(buttonWidth / containerWidth).toBeGreaterThan(0.8); // Button takes most of the width

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Should show in two-column layout on desktop
    const columns = await page.locator('#contact .grid > div').count();
    expect(columns).toBeGreaterThanOrEqual(2);
  });
});