import { Page, expect } from '@playwright/test';

/**
 * Test Helper Utilities
 * Reusable functions for common test patterns
 */

/**
 * Wait for page to be fully ready (DOM loaded, images loaded, network idle)
 */
export async function waitForPageReady(page: Page): Promise<void> {
  // Wait for load state
  await page.waitForLoadState('domcontentloaded');

  // Wait for network to be idle
  await page.waitForLoadState('networkidle');

  // Wait for any pending animations to complete
  await page.waitForTimeout(300);
}

/**
 * Test same functionality in both German and English
 */
export async function testBothLanguages(
  page: Page,
  basePath: string,
  testFn: (page: Page, lang: 'de' | 'en') => Promise<void>
): Promise<void> {
  // Test German version
  await page.goto(`/de${basePath}`);
  await waitForPageReady(page);
  await testFn(page, 'de');

  // Test English version
  await page.goto(`/en${basePath}`);
  await waitForPageReady(page);
  await testFn(page, 'en');
}

/**
 * Take a screenshot with timestamp for debugging
 */
export async function takeDebugScreenshot(
  page: Page,
  name: string
): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({
    path: `test-results/debug-${name}-${timestamp}.png`,
    fullPage: true,
  });
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Scroll to element and wait for it to be stable
 */
export async function scrollToElement(page: Page, selector: string): Promise<void> {
  const element = page.locator(selector);
  await element.scrollIntoViewIfNeeded();
  await element.waitFor({ state: 'visible' });
  await page.waitForTimeout(200); // Wait for scroll animation
}

/**
 * Verify no console errors on page
 */
export async function expectNoConsoleErrors(page: Page): Promise<void> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Give page time to log any errors
  await page.waitForTimeout(1000);

  if (errors.length > 0) {
    throw new Error(`Console errors detected:\n${errors.join('\n')}`);
  }
}

/**
 * Check if Cal.com script is loaded
 */
export async function isCalcomLoaded(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof (window as any).Cal !== 'undefined';
  });
}

/**
 * Wait for Cal.com to be ready
 */
export async function waitForCalcom(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return typeof (window as any).Cal !== 'undefined';
  }, { timeout: 10000 });
}

/**
 * Test keyboard navigation through elements
 */
export async function testKeyboardNavigation(
  page: Page,
  expectedFocusSelectors: string[]
): Promise<void> {
  for (const selector of expectedFocusSelectors) {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toHaveAttribute('data-testid', selector);
  }
}

/**
 * Verify image has loaded successfully
 */
export async function expectImageLoaded(page: Page, selector: string): Promise<void> {
  const image = page.locator(selector);
  await expect(image).toBeVisible();

  const isLoaded = await image.evaluate((img: HTMLImageElement) => {
    return img.complete && img.naturalWidth > 0;
  });

  expect(isLoaded).toBe(true);
}

/**
 * Get computed style property for element
 */
export async function getComputedStyle(
  page: Page,
  selector: string,
  property: string
): Promise<string> {
  return await page.evaluate(
    ({ sel, prop }) => {
      const element = document.querySelector(sel);
      if (!element) return '';
      return window.getComputedStyle(element).getPropertyValue(prop);
    },
    { sel: selector, prop: property }
  );
}

/**
 * Check if element has specific class
 */
export async function hasClass(
  page: Page,
  selector: string,
  className: string
): Promise<boolean> {
  const element = page.locator(selector);
  const classes = await element.getAttribute('class');
  return classes?.includes(className) ?? false;
}

/**
 * Wait for navigation to complete and page to be ready
 */
export async function waitForNavigation(
  page: Page,
  expectedUrl: string
): Promise<void> {
  await page.waitForURL(expectedUrl);
  await waitForPageReady(page);
}

/**
 * Test responsive behavior at different viewports
 */
export async function testAtViewports(
  page: Page,
  viewports: Array<{ width: number; height: number }>,
  testFn: (viewport: { width: number; height: number }) => Promise<void>
): Promise<void> {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await testFn(viewport);
  }
}

/**
 * Verify accessibility of element (basic checks)
 */
export async function expectAccessible(page: Page, selector: string): Promise<void> {
  const element = page.locator(selector);

  // Element should be visible
  await expect(element).toBeVisible();

  // Interactive elements should have labels
  const role = await element.getAttribute('role');
  if (role === 'button' || role === 'link') {
    const ariaLabel = await element.getAttribute('aria-label');
    const text = await element.textContent();
    expect(ariaLabel || text).toBeTruthy();
  }

  // Should be keyboard focusable if interactive
  const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
  if (['button', 'a', 'input', 'select', 'textarea'].includes(tagName)) {
    await element.focus();
    const focused = page.locator(':focus');
    await expect(focused).toHaveCount(1);
  }
}

/**
 * Capture performance metrics
 */
export async function getPerformanceMetrics(page: Page) {
  return await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
    };
  });
}
