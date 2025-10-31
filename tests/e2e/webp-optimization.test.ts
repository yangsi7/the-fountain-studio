import { test, expect } from '@playwright/test';

test.describe('WebP Image Optimization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/en');
  });

  test('should serve WebP images for modern browsers', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Get all image elements
    const images = await page.locator('img').all();

    // Check that we have images on the page
    expect(images.length).toBeGreaterThan(0);

    // Track WebP requests
    const webpRequests: string[] = [];

    page.on('response', (response) => {
      const url = response.url();
      const contentType = response.headers()['content-type'];

      if (contentType?.includes('image/webp')) {
        webpRequests.push(url);
      }
    });

    // Reload page to capture network requests
    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify WebP format is requested in URLs (Netlify CDN handles conversion)
    const imgSources = await page.locator('img').evaluateAll(
      imgs => imgs.map(img => (img as HTMLImageElement).src)
    );
    const webpImages = imgSources.filter(src => src.includes('fm=webp'));
    expect(webpImages.length).toBeGreaterThan(0);
  });

  test('should have appropriate srcset for responsive images', async ({ page }) => {
    const heroImage = page.locator('[data-testid="hero-image"]').first();

    // Check for srcset attribute
    const srcset = await heroImage.getAttribute('srcset');

    if (srcset) {
      // Should have multiple sizes
      expect(srcset).toContain('640w');
      expect(srcset).toContain('1080w'); // Updated from 1024w
      expect(srcset).toContain('1920w');
    }
  });

  test('should use Next.js Image component for optimization', async ({ page }) => {
    // Check for Next.js optimized images
    const images = await page.locator('img[loading="lazy"]').all();

    // Most images should be lazy loaded
    expect(images.length).toBeGreaterThan(0);

    // Check for blur placeholder
    const heroImage = page.locator('[data-testid="hero-image"]').first();
    const style = await heroImage.getAttribute('style');

    // Next.js Image adds SVG blur placeholder in style
    if (style) {
      // Check for the blur SVG data URL
      expect(style).toMatch(/data:image\/svg\+xml.*blur/i);
    }
  });

  test('images should have appropriate sizes attribute', async ({ page }) => {
    const images = await page.locator('img').all();

    for (const img of images) {
      const sizes = await img.getAttribute('sizes');
      const src = await img.getAttribute('src');

      // Skip icons and small images
      if (src && !src.includes('icon') && !src.includes('logo')) {
        expect(sizes).toBeTruthy();
      }
    }
  });

  test('performance: images should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('http://localhost:3000/en');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Page should load within 3 seconds on local
    expect(loadTime).toBeLessThan(3000);

    // Check Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });

    // LCP should be under 2.5s for good performance
    expect(lcp).toBeLessThan(2500);
  });
});