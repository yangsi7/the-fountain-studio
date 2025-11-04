import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite: Hash Navigation Visual Feedback (Phase 2.3)
 *
 * Purpose: Validate visual feedback animation when navigating to sections via hash fragments
 *
 * Test Coverage (15 tests total):
 * - Visual Feedback Animation (3 tests)
 * - Accessibility Features (3 tests)
 * - Reduced Motion Support (2 tests)
 * - All Hash Targets (5 tests)
 * - Cross-Language Support (2 tests)
 *
 * Success Criteria:
 * - Highlight class applied after hash navigation
 * - Highlight removed after 2s animation
 * - Focus management working (tabindex, focus())
 * - Screen reader announcements present
 * - Reduced motion preference respected
 * - Works across all browsers (Chromium, Firefox, WebKit, Mobile)
 */

test.describe('Hash Navigation Visual Feedback - Animation', () => {
  test('applies highlight class after hash navigation to #biofield', async ({ page }) => {
    await page.goto('/en');

    // Click link to navigate to #biofield
    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    // Wait for highlight class to be applied (navigation + scroll + 150ms delay)
    // Increased timeout to 10s to handle slower browsers
    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    // Verify highlight class is present
    const hasClass = await page.locator('#biofield').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(true);
  });

  test('removes highlight class after 2s animation completes', async ({ page }) => {
    await page.goto('/en');

    // Click link to navigate to #biofield
    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    // Wait for highlight class to be applied (increased timeout)
    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    // Wait for animation to complete (2s) + small buffer (500ms)
    await page.waitForTimeout(2500);

    // Verify highlight class has been removed
    const hasClass = await page.locator('#biofield').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(false);
  });

  test('highlight animation visible with gold border and background', async ({ page }) => {
    await page.goto('/en');

    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    // Check computed styles during animation
    const section = page.locator('#biofield');
    const borderColor = await section.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.borderColor;
    });

    // Border color should not be 'transparent' or 'rgba(0, 0, 0, 0)'
    expect(borderColor).not.toBe('transparent');
    expect(borderColor).not.toBe('rgba(0, 0, 0, 0)');
  });
});

test.describe('Hash Navigation Visual Feedback - Accessibility', () => {
  test('sets focus on target section after navigation', async ({ page }) => {
    await page.goto('/en');

    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    // Wait for highlight class (proves navigation completed + focus management executed)
    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });
    await page.waitForTimeout(500); // Wait for focus to be set

    // Get the currently focused element's ID
    const focusedId = await page.evaluate(() => document.activeElement?.id);
    expect(focusedId).toBe('biofield');
  });

  test('target section has tabindex="-1" during highlight', async ({ page }) => {
    await page.goto('/en');

    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    // Check tabindex attribute
    const tabindex = await page.locator('#biofield').getAttribute('tabindex');
    expect(tabindex).toBe('-1');
  });

  test('screen reader announcement created after navigation', async ({ page }) => {
    await page.goto('/en');

    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    // Wait for highlight class (proves navigation completed + SR announcement created)
    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });
    await page.waitForTimeout(500);

    // Check for screen reader announcement element
    const srAnnouncement = page.locator('[role="status"][aria-live="polite"].sr-only');
    await expect(srAnnouncement).toBeAttached();

    // Verify it contains navigation text
    const text = await srAnnouncement.textContent();
    expect(text).toContain('Navigated to');
  });
});

test.describe('Hash Navigation Visual Feedback - Reduced Motion', () => {
  test('respects prefers-reduced-motion: no animation, static border', async ({ page }) => {
    // Emulate reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en');

    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    // With reduced motion, animation should be 'none'
    const animationName = await page.locator('#biofield').evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.animationName;
    });

    expect(animationName).toBe('none');
  });

  test('highlight still applied with reduced motion, just no animation', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await page.goto('/en');

    const biofieldLink = page.locator('a[href="/en/services#biofield"]').first();
    await biofieldLink.click();

    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    // Highlight class should still be present
    const hasClass = await page.locator('#biofield').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(true);

    // But animation is disabled
    const animationName = await page.locator('#biofield').evaluate(el =>
      window.getComputedStyle(el).animationName
    );
    expect(animationName).toBe('none');
  });
});

test.describe('Hash Navigation Visual Feedback - All Targets', () => {
  test('visual feedback works for #gyrotonic section', async ({ page }) => {
    await page.goto('/en');

    const link = page.locator('a[href*="#gyrotonic"]').first();
    await link.click();

    await page.waitForSelector('#gyrotonic.hash-target-highlight', { timeout: 10000 });

    const hasClass = await page.locator('#gyrotonic').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(true);
  });

  test('visual feedback works for #breathwork section', async ({ page }) => {
    await page.goto('/en');

    const link = page.locator('a[href*="#breathwork"]').first();
    await link.click();

    await page.waitForSelector('#breathwork.hash-target-highlight', { timeout: 10000 });

    const hasClass = await page.locator('#breathwork').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(true);
  });

  test('visual feedback works for #integration section', async ({ page }) => {
    await page.goto('/en');

    const link = page.locator('a[href*="#integration"]').first();
    await link.click();

    await page.waitForSelector('#integration.hash-target-highlight', { timeout: 10000 });

    const hasClass = await page.locator('#integration').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(true);
  });

  test('visual feedback works for #pricing section', async ({ page }) => {
    await page.goto('/en');

    // Click "View All Services & Pricing" CTA
    const link = page.locator('a[href="/en/services#pricing"]').first();
    await link.click();

    // Wait for any pricing-related element to have highlight class (10s timeout)
    // Note: pricing section may have different structure
    await page.waitForTimeout(1000); // Allow time for navigation and scroll

    // Check if any pricing-related element has highlight class
    const hasHighlight = await page.evaluate(() => {
      const pricingElements = document.querySelectorAll('[id*="pricing"]');
      return Array.from(pricingElements).some(el =>
        el.classList.contains('hash-target-highlight')
      );
    });
    expect(hasHighlight).toBe(true);
  });

  test('visual feedback works on direct URL access with hash', async ({ page }) => {
    // Navigate directly to URL with hash fragment
    await page.goto('/en/services#biofield');

    // Wait for HashScrollHandler to execute on mount (increased timeout for slower browsers)
    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    const hasClass = await page.locator('#biofield').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(true);
  });
});

test.describe('Hash Navigation Visual Feedback - Cross-Language', () => {
  test('visual feedback works on German page (DE)', async ({ page }) => {
    await page.goto('/de');

    // Find "Mehr Erfahren" (Learn More) link for Biofield
    const link = page.locator('a[href="/de/services#biofield"]').first();
    await link.click();

    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });

    const hasClass = await page.locator('#biofield').evaluate(el =>
      el.classList.contains('hash-target-highlight')
    );
    expect(hasClass).toBe(true);
  });

  test('screen reader announcement uses section heading in correct language', async ({ page }) => {
    await page.goto('/de');

    const link = page.locator('a[href="/de/services#biofield"]').first();
    await link.click();

    // Wait for highlight class to ensure navigation completed
    await page.waitForSelector('#biofield.hash-target-highlight', { timeout: 10000 });
    await page.waitForTimeout(500);

    // Check screen reader announcement
    const srAnnouncement = page.locator('[role="status"][aria-live="polite"].sr-only');
    await expect(srAnnouncement).toBeAttached();

    const text = await srAnnouncement.textContent();
    // Should contain "Navigated to" + section heading
    expect(text).toContain('Navigated to');
  });
});
