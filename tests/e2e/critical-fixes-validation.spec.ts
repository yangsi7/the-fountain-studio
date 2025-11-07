import { test, expect } from '@playwright/test';

/**
 * Critical Fixes Validation Suite
 * Tests all Phase 1 and Phase 2.1 implementations
 */

test.describe('Phase 1: i18n Fixes', () => {
  test.describe('Phase 1.1 & 1.2: Dictionary CTAs', () => {
    test('ServicesGrid displays correct German CTA', async ({ page }) => {
      await page.goto('/de');

      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Find the "View All Services" CTA button
      const viewAllButton = page.getByRole('link', { name: /alle angebote/i });
      await expect(viewAllButton).toBeVisible();
      await expect(viewAllButton).toHaveText('Alle Angebote & Preise Ansehen');

      // Verify it links to /de/services#pricing
      await expect(viewAllButton).toHaveAttribute('href', '/de/services#pricing');
    });

    test('ServicesGrid displays correct English CTA', async ({ page }) => {
      await page.goto('/en');

      await page.waitForLoadState('networkidle');

      const viewAllButton = page.getByRole('link', { name: /view all services/i });
      await expect(viewAllButton).toBeVisible();
      await expect(viewAllButton).toHaveText('View All Services & Pricing');
      await expect(viewAllButton).toHaveAttribute('href', '/en/services#pricing');
    });

    test('LearnAccordion displays correct German CTA', async ({ page }) => {
      await page.goto('/de');

      await page.waitForLoadState('networkidle');

      const exploreButton = page.getByRole('link', { name: /alle modalitäten/i });
      await expect(exploreButton).toBeVisible();
      await expect(exploreButton).toHaveText('Alle Modalitäten Erkunden');
      await expect(exploreButton).toHaveAttribute('href', '/de/learn');
    });

    test('LearnAccordion displays correct English CTA', async ({ page }) => {
      await page.goto('/en');

      await page.waitForLoadState('networkidle');

      const exploreButton = page.getByRole('link', { name: /explore all modalities/i });
      await expect(exploreButton).toBeVisible();
      await expect(exploreButton).toHaveText('Explore All Modalities');
      await expect(exploreButton).toHaveAttribute('href', '/en/learn');
    });
  });

  test.describe('Phase 1.3: Language Switcher Route Preservation', () => {
    test('Preserves route when switching from German to English on homepage', async ({ page }) => {
      await page.goto('/de');
      await page.waitForLoadState('networkidle');

      const enButton = page.getByTestId('lang-switcher-en');
      await enButton.click();

      await page.waitForURL('/en', { timeout: 60000 });
      expect(page.url()).toContain('/en');
      expect(page.url()).not.toContain('/de');
    });

    test('Preserves /services route when switching languages', async ({ page }) => {
      await page.goto('/de/services');
      await page.waitForLoadState('networkidle');

      const enButton = page.getByTestId('lang-switcher-en');
      await enButton.click();

      await page.waitForURL('/en/services', { timeout: 60000 });
      expect(page.url()).toContain('/en/services');
    });

    test('Preserves /learn route when switching languages', async ({ page }) => {
      await page.goto('/de/learn');
      await page.waitForLoadState('networkidle');

      const enButton = page.getByTestId('lang-switcher-en');
      await enButton.click();

      await page.waitForURL('/en/learn', { timeout: 60000 });
      expect(page.url()).toContain('/en/learn');
    });

    test('Preserves /about route when switching languages', async ({ page }) => {
      await page.goto('/de/about');
      await page.waitForLoadState('networkidle');

      const enButton = page.getByTestId('lang-switcher-en');
      await enButton.click();

      await page.waitForURL('/en/about', { timeout: 60000 });
      expect(page.url()).toContain('/en/about');
    });

    test('Preserves route when switching from English to German', async ({ page }) => {
      await page.goto('/en/services');
      await page.waitForLoadState('networkidle');

      const deButton = page.getByTestId('lang-switcher-de');
      await deButton.click();

      await page.waitForURL('/de/services', { timeout: 60000 });
      expect(page.url()).toContain('/de/services');
    });
  });
});

test.describe('Phase 2.1: Section IDs', () => {
  test.describe('Services Page Section IDs', () => {
    test('All section IDs exist on Services page', async ({ page }) => {
      await page.goto('/en/services');
      await page.waitForLoadState('networkidle');

      // Check for all section IDs
      const integrationSection = page.locator('#integration');
      const biofieldSection = page.locator('#biofield');
      const gyrotonicSection = page.locator('#gyrotonic');
      const breathworkSection = page.locator('#breathwork');

      await expect(integrationSection).toBeVisible();
      await expect(biofieldSection).toBeVisible();
      await expect(gyrotonicSection).toBeVisible();
      await expect(breathworkSection).toBeVisible();
    });

    test('Hash navigation works for #biofield', async ({ page }) => {
      await page.goto('/en/services#biofield');
      await page.waitForLoadState('networkidle');

      // Wait a moment for scroll
      await page.waitForTimeout(500);

      const biofieldSection = page.locator('#biofield');
      await expect(biofieldSection).toBeInViewport();
    });

    test('Hash navigation works for #gyrotonic', async ({ page }) => {
      await page.goto('/en/services#gyrotonic');
      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(500);

      const gyrotonicSection = page.locator('#gyrotonic');
      await expect(gyrotonicSection).toBeInViewport();
    });
  });

  test.describe('Learn Page Section IDs', () => {
    test('All section IDs exist on Learn page', async ({ page }) => {
      await page.goto('/en/learn');
      await page.waitForLoadState('networkidle');

      const biofieldSection = page.locator('#biofield');
      const gyrotonicSection = page.locator('#gyrotonic');
      const breathworkSection = page.locator('#breathwork');

      await expect(biofieldSection).toBeVisible();
      await expect(gyrotonicSection).toBeVisible();
      await expect(breathworkSection).toBeVisible();
    });

    test('Hash navigation works on Learn page', async ({ page }) => {
      await page.goto('/en/learn#gyrotonic');
      await page.waitForLoadState('networkidle');

      await page.waitForTimeout(500);

      const gyrotonicSection = page.locator('#gyrotonic');
      await expect(gyrotonicSection).toBeInViewport();
    });
  });

  test.describe('About Page Section IDs', () => {
    test('All section IDs exist on About page', async ({ page }) => {
      await page.goto('/en/about');
      await page.waitForLoadState('networkidle');

      const philosophySection = page.locator('#philosophy');
      const approachSection = page.locator('#approach');
      const credentialsSection = page.locator('#credentials');
      const studioSection = page.locator('#studio');

      await expect(philosophySection).toBeVisible();
      await expect(approachSection).toBeVisible();
      await expect(credentialsSection).toBeVisible();
      await expect(studioSection).toBeVisible();
    });
  });
});
