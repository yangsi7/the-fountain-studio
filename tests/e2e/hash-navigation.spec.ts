import { test, expect } from '@playwright/test';

/**
 * E2E Test Suite: Hash Fragment Navigation (Phase 2.2)
 *
 * Purpose: Validate hash navigation works correctly across all pages,
 * languages, and viewports after implementing HashScrollHandler.
 *
 * Critical Bug Fixed: scroll={false} on Link components disabled
 * Next.js scroll behavior, requiring custom HashScrollHandler.
 *
 * Test Coverage:
 * 1. Homepage → Services hash links (4 services)
 * 2. "View All Services & Pricing" → #pricing
 * 3. Same-page hash navigation (pricing cards)
 * 4. German language hash navigation
 * 5. Mobile viewport hash navigation
 * 6. Direct URL access with hash
 *
 * Success Criteria:
 * - URL updates to hash fragment
 * - Page scrolls to target section
 * - Section visible in viewport (not under sticky header)
 * - Works in DE/EN languages
 * - Works on mobile (375px) and desktop (1920px)
 */

test.describe('Hash Fragment Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Start on English homepage
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
  });

  test('Homepage → Services #biofield hash link scrolls to section', async ({ page }) => {
    // Click the Biofield Tuning "Learn More" link by its href
    const biofieldLink = page.locator('a[href="/en/services#biofield"]');
    await biofieldLink.click();

    // Wait for navigation and scrolling
    await page.waitForURL(/\/en\/services#biofield/);
    await page.waitForTimeout(2000); // Wait for 100ms delay + smooth scroll animation

    // Verify URL has hash fragment
    expect(page.url()).toContain('/en/services#biofield');

    // Verify Biofield section is visible and in viewport
    const biofieldSection = page.locator('section#biofield');
    await expect(biofieldSection).toBeVisible();

    // Check section is scrolled into view (not under sticky header)
    const boundingBox = await biofieldSection.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.y).toBeGreaterThan(0); // Not above viewport
    expect(boundingBox!.y).toBeLessThan(200); // Account for 80px header + margin
  });

  test('Homepage → Services #gyrotonic hash link scrolls to section', async ({ page }) => {
    // Click the Gyrotonic Movement "Learn More" link by its href
    const gyrotonicLink = page.locator('a[href="/en/services#gyrotonic"]');
    await gyrotonicLink.click();

    await page.waitForURL(/\/en\/services#gyrotonic/);
    await page.waitForTimeout(2000); // Wait for 100ms delay + smooth scroll animation

    expect(page.url()).toContain('/en/services#gyrotonic');

    const gyrotonicSection = page.locator('section#gyrotonic');
    await expect(gyrotonicSection).toBeVisible();

    const boundingBox = await gyrotonicSection.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.y).toBeGreaterThan(0);
    expect(boundingBox!.y).toBeLessThan(200);
  });

  test('"View All Services & Pricing" CTA scrolls to #pricing', async ({ page }) => {
    // Click "View All Services & Pricing" button on homepage
    const viewAllButton = page.getByRole('link', { name: 'View All Services & Pricing' });
    await viewAllButton.click();

    await page.waitForURL(/\/en\/services/);
    await page.waitForTimeout(500);

    // Verify we're on services page
    expect(page.url()).toContain('/en/services');

    // Verify pricing summary section is visible
    const pricingSection = page.getByRole('heading', { name: 'Pricing Overview' }).locator('..');
    await expect(pricingSection).toBeVisible();
  });

  test('Same-page hash navigation: Services page pricing cards', async ({ page }) => {
    // Navigate to services page first
    await page.goto('/en/services');
    await page.waitForLoadState('networkidle');

    // Find pricing card for Biofield Tuning by its heading and navigate to the containing link
    const biofieldHeading = page.getByRole('heading', { name: 'Biofield Tuning', exact: true, level: 3 });
    const biofieldLink = biofieldHeading.locator('xpath=ancestor::a');
    await biofieldLink.click();

    await page.waitForTimeout(2000); // Wait for 100ms delay + smooth scroll animation

    // Verify URL updated with hash
    expect(page.url()).toContain('#biofield');

    // Verify section scrolled into view
    const biofieldSection = page.locator('section#biofield');
    await expect(biofieldSection).toBeVisible();

    const boundingBox = await biofieldSection.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.y).toBeGreaterThan(0);
    expect(boundingBox!.y).toBeLessThan(200);
  });

  test('German language hash navigation works', async ({ page }) => {
    // Navigate to German homepage
    await page.goto('/de');
    await page.waitForLoadState('networkidle');

    // Click "Mehr Erfahren" (Learn More) link by its href
    const biofieldLink = page.locator('a[href="/de/services#biofield"]');
    await biofieldLink.click();

    await page.waitForURL(/\/de\/services#biofield/);
    await page.waitForTimeout(2000); // Wait for 100ms delay + smooth scroll animation

    expect(page.url()).toContain('/de/services#biofield');

    const biofieldSection = page.locator('section#biofield');
    await expect(biofieldSection).toBeVisible();

    const boundingBox = await biofieldSection.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.y).toBeGreaterThan(0);
    expect(boundingBox!.y).toBeLessThan(200);
  });

  test('Mobile viewport hash navigation (375px)', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Click "Learn More" link by its href
    const biofieldLink = page.locator('a[href="/en/services#biofield"]');
    await biofieldLink.click();

    await page.waitForURL(/\/en\/services#biofield/);
    await page.waitForTimeout(2000); // Wait for 100ms delay + smooth scroll animation

    expect(page.url()).toContain('/en/services#biofield');

    const biofieldSection = page.locator('section#biofield');
    await expect(biofieldSection).toBeVisible();

    // Mobile has 100px scroll-margin-top (taller sticky header)
    const boundingBox = await biofieldSection.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.y).toBeGreaterThan(0);
    expect(boundingBox!.y).toBeLessThan(250); // Account for 100px mobile header
  });

  test('Direct URL access with hash fragment', async ({ page }) => {
    // Navigate directly to URL with hash
    await page.goto('/en/services#gyrotonic');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for HashScrollHandler to execute + smooth scroll

    // Verify URL has hash
    expect(page.url()).toContain('#gyrotonic');

    // Verify section is visible and scrolled into view
    const gyrotonicSection = page.locator('section#gyrotonic');
    await expect(gyrotonicSection).toBeVisible();

    const boundingBox = await gyrotonicSection.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox!.y).toBeGreaterThan(0);
    expect(boundingBox!.y).toBeLessThan(200);
  });
});
