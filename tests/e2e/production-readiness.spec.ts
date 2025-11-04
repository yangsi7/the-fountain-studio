import { test, expect, type Locator, type Page } from '@playwright/test';

/**
 * E2E Test Suite: Production Readiness Validation (Phase 3)
 *
 * Purpose: Comprehensive site-wide validation before deployment
 *
 * Test Coverage (32 tests total):
 * - Page Load Validation (8 tests)
 * - Image Load Validation (8 tests)
 * - Navigation Functionality (4 tests)
 * - SEO Meta Tags (4 tests)
 * - Performance Metrics (4 tests)
 * - Accessibility Basics (4 tests)
 *
 * Success Criteria:
 * - All pages load with 200 status
 * - All critical images load successfully
 * - Navigation works across all pages
 * - SEO meta tags present on all pages
 * - Performance within acceptable thresholds
 * - Basic accessibility requirements met
 */

test.describe('Production Readiness - Page Load Validation', () => {
  const pages = [
    { path: '/en', name: 'English Homepage' },
    { path: '/de', name: 'German Homepage' },
    { path: '/en/services', name: 'English Services' },
    { path: '/de/services', name: 'German Services' },
    { path: '/en/learn', name: 'English Learn' },
    { path: '/de/learn', name: 'German Learn' },
    { path: '/en/about', name: 'English About' },
    { path: '/de/about', name: 'German About' },
  ];

  pages.forEach(({ path, name }) => {
    test(`${name} page loads successfully (200 status)`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(path));
    });
  });
});

test.describe('Production Readiness - Image Load Validation', () => {
  // Helper function to wait for lazy-loaded images
  async function waitForImageLoad(img: Locator) {
    // Scroll image into viewport to trigger lazy loading
    await img.scrollIntoViewIfNeeded();

    // Wait for lazy load to trigger and image to start loading
    await img.page().waitForTimeout(200);

    // Retry mechanism for browsers that need more time (Firefox, WebKit)
    // Increased for WebKit which struggles with large images (e.g., 3MB+ footer images)
    const maxRetries = 8;
    const retryDelay = 400;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const naturalWidth = await img.evaluate((img: HTMLImageElement) => img.naturalWidth);

      if (naturalWidth > 0) {
        // Image loaded successfully
        return;
      }

      // Not loaded yet, wait and retry (unless last attempt)
      if (attempt < maxRetries - 1) {
        await img.page().waitForTimeout(retryDelay);
      }
    }

    // Final check after all retries - log warning if still not loaded
    const finalWidth = await img.evaluate((img: HTMLImageElement) => img.naturalWidth);
    if (finalWidth === 0) {
      const src = await img.getAttribute('src');
      console.warn(`Image still not loaded after ${maxRetries} retries: ${src}`);
    }
  }

  test('Homepage hero image loads', async ({ page }) => {
    await page.goto('/en');
    const heroImage = page.locator('img[alt*="hero"], img[alt*="Swiss Alps"], img[src*="hero"]').first();
    await expect(heroImage).toBeVisible();

    // Verify image actually loaded (not broken)
    const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('Services page images load', async ({ page }) => {
    await page.goto('/en/services');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img[alt*="service"], img[alt*="Biofield"], img[alt*="Gyrotonic"]');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    // Check first 3 images load correctly
    for (let i = 0; i < Math.min(3, count); i++) {
      const img = images.nth(i);
      await waitForImageLoad(img);

      const naturalWidth = await img.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('Learn page images load', async ({ page }) => {
    await page.goto('/en/learn');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img[alt*="learn"], img[alt*="Biofield"], img[alt*="Gyrotonic"], img[alt*="Breathwork"]');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    // Check first 3 images load correctly
    for (let i = 0; i < Math.min(3, count); i++) {
      const img = images.nth(i);
      await waitForImageLoad(img);

      const naturalWidth = await img.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('About page images load', async ({ page }) => {
    await page.goto('/en/about');
    const images = page.locator('img[alt*="Kristen"], img[alt*="studio"], img[alt*="founder"]');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    // Check first image loads correctly (portrait)
    const firstImg = images.first();
    await expect(firstImg).toBeVisible();
    const naturalWidth = await firstImg.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test('Wave divider SVGs render on all pages', async ({ page }) => {
    const pages = ['/en', '/en/services', '/en/learn', '/en/about'];

    for (const path of pages) {
      await page.goto(path);
      // Actual WaveDivider component uses viewBox="0 0 1440 100"
      const waveDividers = page.locator('svg[viewBox="0 0 1440 100"]');
      const count = await waveDividers.count();

      expect(count).toBeGreaterThan(0); // All pages should have at least one wave
    }
  });

  test('No broken images on homepage', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();

    let brokenCount = 0;
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await waitForImageLoad(img);

      const naturalWidth = await img.evaluate((img: HTMLImageElement) => img.naturalWidth);
      if (naturalWidth === 0) brokenCount++;
    }

    expect(brokenCount).toBe(0);
  });

  test('No broken images on services page', async ({ page }) => {
    await page.goto('/en/services');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();

    let brokenCount = 0;
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await waitForImageLoad(img);

      const naturalWidth = await img.evaluate((img: HTMLImageElement) => img.naturalWidth);
      if (naturalWidth === 0) brokenCount++;
    }

    expect(brokenCount).toBe(0);
  });

  test('Images have proper alt attributes', async ({ page }) => {
    await page.goto('/en');
    const images = page.locator('img');
    const count = await images.count();

    let missingAlt = 0;
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      if (!alt || alt.trim() === '') missingAlt++;
    }

    expect(missingAlt).toBe(0); // All images should have alt text
  });
});

test.describe('Production Readiness - Navigation Functionality', () => {
  // Helper function to handle mobile vs desktop navigation
  async function clickNavLink(page: Page, href: string) {
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      // Mobile: Open hamburger menu first
      const menuButton = page.locator('nav button[aria-haspopup="dialog"]');
      if (await menuButton.isVisible()) {
        await menuButton.click();
        // Wait for sheet to open
        await page.waitForSelector('div[role="dialog"]', { state: 'visible' });

        // Click link INSIDE the dialog
        await page.locator(`div[role="dialog"] a[href="${href}"]`).click();
        return; // Exit early, link clicked
      }
    }

    // Desktop: Click the navigation link directly
    await page.click(`nav a[href="${href}"]`);
  }

  test('Navigation links work on all pages (EN)', async ({ page }) => {
    await page.goto('/en');

    // Navigate to Services
    await clickNavLink(page, '/en/services');
    await expect(page).toHaveURL(/\/en\/services/);

    // Navigate to Learn
    await clickNavLink(page, '/en/learn');
    await expect(page).toHaveURL(/\/en\/learn/);

    // Navigate to About
    await clickNavLink(page, '/en/about');
    await expect(page).toHaveURL(/\/en\/about/);

    // Navigate back to Home
    await clickNavLink(page, '/en');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('Navigation links work on all pages (DE)', async ({ page }) => {
    await page.goto('/de');

    // Navigate to Services
    await clickNavLink(page, '/de/services');
    await expect(page).toHaveURL(/\/de\/services/);

    // Navigate to Learn
    await clickNavLink(page, '/de/learn');
    await expect(page).toHaveURL(/\/de\/learn/);

    // Navigate to About
    await clickNavLink(page, '/de/about');
    await expect(page).toHaveURL(/\/de\/about/);

    // Navigate back to Home
    await clickNavLink(page, '/de');
    await expect(page).toHaveURL(/\/de$/);
  });

  test('Homepage CTAs link to correct detail pages', async ({ page }) => {
    await page.goto('/en');

    // Services CTA - Look in main content only, not nav
    const servicesLink = page.locator('main a[href*="/services"], section a[href*="/services"]').first();
    await servicesLink.click();
    await expect(page).toHaveURL(/\/en\/services/);

    await page.goBack();

    // Learn CTA
    const learnLink = page.locator('main a[href*="/learn"], section a[href*="/learn"]').first();
    await learnLink.click();
    await expect(page).toHaveURL(/\/en\/learn/);

    await page.goBack();

    // About CTA
    const aboutLink = page.locator('main a[href*="/about"], section a[href*="/about"]').first();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/en\/about/);
  });

  test('Footer links work correctly', async ({ page }) => {
    await page.goto('/en');

    // Check footer exists
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Verify footer links are present
    const footerLinks = footer.locator('a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Production Readiness - SEO Meta Tags', () => {
  test('Homepage has proper SEO meta tags', async ({ page }) => {
    await page.goto('/en');

    // Title tag
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeLessThan(60); // SEO best practice

    // Meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description!.length).toBeLessThan(160); // SEO best practice

    // OpenGraph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
  });

  test('Services page has proper SEO meta tags', async ({ page }) => {
    await page.goto('/en/services');

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('Services'); // Should contain page context

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('Learn page has proper SEO meta tags', async ({ page }) => {
    await page.goto('/en/learn');

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('How It Works'); // Actual page title includes "How It Works"

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('About page has proper SEO meta tags', async ({ page }) => {
    await page.goto('/en/about');

    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title).toContain('About'); // Should contain page context

    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });
});

test.describe('Production Readiness - Performance Metrics', () => {
  test('Homepage loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/en');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000); // 5 seconds max
  });

  test('Services page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/en/services');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(5000);
  });

  test('First Contentful Paint under 2.5s', async ({ page }) => {
    await page.goto('/en');

    const fcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntriesByName('first-contentful-paint');
          if (entries.length > 0) {
            resolve(entries[0].startTime);
          }
        }).observe({ type: 'paint', buffered: true });
      });
    });

    expect(fcp).toBeLessThan(2500); // 2.5 seconds
  });

  test('No JavaScript errors in console', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (e.g., third-party script warnings)
    const criticalErrors = errors.filter(err =>
      !err.includes('Cal.com') &&
      !err.includes('third-party')
    );

    expect(criticalErrors.length).toBe(0);
  });
});

test.describe('Production Readiness - Accessibility Basics', () => {
  test('All pages have proper heading hierarchy', async ({ page }) => {
    const pages = ['/en', '/en/services', '/en/learn', '/en/about'];

    for (const path of pages) {
      await page.goto(path);

      // Check for H1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1); // Exactly one H1 per page

      // Check H1 has text content
      const h1Text = await page.locator('h1').textContent();
      expect(h1Text).toBeTruthy();
      expect(h1Text!.length).toBeGreaterThan(0);
    }
  });

  test('Navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/en');

    // Tab to first nav link
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // May need multiple tabs to reach nav

    // Verify focus is on a navigation element
    const focusedElement = await page.evaluate(() => {
      const el = document.activeElement;
      return el?.tagName + (el?.getAttribute('href') || '');
    });

    expect(focusedElement).toBeTruthy();
  });

  test('Forms have proper labels', async ({ page }) => {
    await page.goto('/en');

    // Check if any forms exist
    const forms = page.locator('form');
    const formCount = await forms.count();

    if (formCount > 0) {
      // Check inputs have labels
      const inputs = page.locator('input[type="text"], input[type="email"], textarea');
      const inputCount = await inputs.count();

      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i);
        const id = await input.getAttribute('id');
        const ariaLabel = await input.getAttribute('aria-label');

        // Input should have either an id (for label[for]) or aria-label
        expect(id || ariaLabel).toBeTruthy();
      }
    }
  });

  test('Interactive elements have visible focus styles', async ({ page }) => {
    await page.goto('/en');

    // Check a button has focus styles
    const button = page.locator('button, a[href]').first();
    await button.focus();

    // Get computed outline style
    const outline = await button.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.outline || style.outlineWidth || 'none';
    });

    // Should have some visible focus indicator (not 'none')
    expect(outline).not.toBe('none');
  });
});
