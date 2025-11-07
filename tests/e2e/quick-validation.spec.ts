import { test, expect } from '@playwright/test';

/**
 * Quick Validation - Fast functional tests without screenshots
 */

test.describe('Quick Validation: Dictionary CTAs', () => {
  test('German homepage has correct CTAs', async ({ page }) => {
    await page.goto('/de');
    await page.waitForLoadState('networkidle');

    // Check Services CTA - wait for Framer Motion animation
    const servicesLink = page.getByRole('link', { name: /alle angebote.*preise/i });
    await servicesLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(servicesLink).toBeVisible();
    const servicesHref = await servicesLink.getAttribute('href');
    expect(servicesHref).toBe('/de/services#pricing');

    // Check Learn CTA - wait for Framer Motion animation
    const learnLink = page.getByRole('link', { name: /alle modalitäten/i });
    await learnLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(learnLink).toBeVisible();
    const learnHref = await learnLink.getAttribute('href');
    expect(learnHref).toBe('/de/learn');
  });

  test('English homepage has correct CTAs', async ({ page }) => {
    await page.goto('/en');
    await page.waitForLoadState('networkidle');

    // Check Services CTA - wait for Framer Motion animation
    const servicesLink = page.getByRole('link', { name: /view all services.*pricing/i });
    await servicesLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(servicesLink).toBeVisible();
    const servicesHref = await servicesLink.getAttribute('href');
    expect(servicesHref).toBe('/en/services#pricing');

    // Check Learn CTA - wait for Framer Motion animation
    const learnLink = page.getByRole('link', { name: /explore all modalities/i });
    await learnLink.waitFor({ state: 'visible', timeout: 10000 });
    await expect(learnLink).toBeVisible();
    const learnHref = await learnLink.getAttribute('href');
    expect(learnHref).toBe('/en/learn');
  });
});

test.describe('Quick Validation: Language Switcher', () => {
  // Helper to open mobile menu if on mobile viewport
  const openMobileMenuIfNeeded = async (page: import('@playwright/test').Page) => {
    // Find the mobile menu button (hamburger icon) - visible only on mobile viewports
    const mobileMenuButton = page.locator('nav button').filter({ has: page.locator('svg') }).first();
    const isVisible = await mobileMenuButton.isVisible().catch(() => false);
    if (isVisible) {
      await mobileMenuButton.click();
      await page.waitForTimeout(500); // Wait for sheet animation
    }
  };

  // Helper to get the visible language switcher (desktop or mobile)
  const getVisibleLanguageSwitcher = async (page: import('@playwright/test').Page, lang: 'de' | 'en') => {
    const desktopTestId = `lang-switcher-${lang}`;
    const mobileTestId = `lang-switcher-${lang}-mobile`;

    const mobile = page.getByTestId(mobileTestId);
    const desktop = page.getByTestId(desktopTestId);

    // Check mobile first (after menu opens, mobile takes priority)
    if (await mobile.isVisible().catch(() => false)) {
      return mobile;
    }
    if (await desktop.isVisible().catch(() => false)) {
      return desktop;
    }

    // If neither is visible, wait for either to appear (with longer timeout for reliability)
    void await Promise.race([
      mobile.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null),
      desktop.waitFor({ state: 'visible', timeout: 10000 }).catch(() => null)
    ]);

    // Check again after waiting
    if (await mobile.isVisible().catch(() => false)) {
      return mobile;
    }
    if (await desktop.isVisible().catch(() => false)) {
      return desktop;
    }

    // If still not found, try fallback: look for link with matching text content
    console.log(`Warning: Could not find language switcher with test IDs for ${lang}`);
    const fallback = page.locator(`nav a:has-text("${lang.toUpperCase()}")`).first();
    if (await fallback.isVisible().catch(() => false)) {
      console.log(`Using fallback selector for ${lang}`);
      return fallback;
    }

    // Last resort: return desktop element (will throw error if not found when clicked)
    return desktop;
  };

  test('Preserves /services route when switching DE→EN', async ({ page }) => {
    await page.goto('/de/services');
    await page.waitForLoadState('networkidle');

    // Open mobile menu if on mobile viewport
    await openMobileMenuIfNeeded(page);

    // Get the visible EN language switcher (desktop or mobile)
    const enButton = await getVisibleLanguageSwitcher(page, 'en');

    // Debug: Log current URL and page state before clicking
    console.log('Before clicking EN button:');
    console.log('  URL:', page.url());
    console.log('  Title:', await page.title());
    const h1 = await page.locator('h1').first().textContent();
    console.log('  H1:', h1);
    const enHref = await enButton.getAttribute('href');
    console.log('  EN button href:', enHref);

    await enButton.click();
    await page.waitForURL('/en/services');

    expect(page.url()).toContain('/en/services');
  });

  test('Preserves /learn route when switching EN→DE', async ({ page }) => {
    await page.goto('/en/learn');
    await page.waitForLoadState('networkidle');

    // Open mobile menu if on mobile viewport
    await openMobileMenuIfNeeded(page);

    // Get the visible DE language switcher (desktop or mobile)
    const deButton = await getVisibleLanguageSwitcher(page, 'de');
    await deButton.click();
    await page.waitForURL('/de/learn');

    expect(page.url()).toContain('/de/learn');
  });
});

test.describe('Quick Validation: Section IDs', () => {
  test('Services page has all section IDs', async ({ page }) => {
    await page.goto('/en/services');
    await page.waitForLoadState('networkidle');

    // Wait for sections to be attached in DOM
    await page.locator('#integration').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#biofield').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#gyrotonic').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#breathwork').waitFor({ state: 'attached', timeout: 10000 });

    // Verify all sections exist
    await expect(page.locator('#integration')).toBeAttached();
    await expect(page.locator('#biofield')).toBeAttached();
    await expect(page.locator('#gyrotonic')).toBeAttached();
    await expect(page.locator('#breathwork')).toBeAttached();
  });

  test('Learn page has all section IDs', async ({ page }) => {
    await page.goto('/en/learn');
    await page.waitForLoadState('networkidle');

    // Wait for sections to be attached in DOM
    await page.locator('#biofield').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#gyrotonic').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#breathwork').waitFor({ state: 'attached', timeout: 10000 });

    await expect(page.locator('#biofield')).toBeAttached();
    await expect(page.locator('#gyrotonic')).toBeAttached();
    await expect(page.locator('#breathwork')).toBeAttached();
  });

  test('About page has all section IDs', async ({ page }) => {
    await page.goto('/en/about');
    await page.waitForLoadState('networkidle');

    // Wait for sections to be attached in DOM
    await page.locator('#philosophy').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#approach').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#credentials').waitFor({ state: 'attached', timeout: 10000 });
    await page.locator('#studio').waitFor({ state: 'attached', timeout: 10000 });

    await expect(page.locator('#philosophy')).toBeAttached();
    await expect(page.locator('#approach')).toBeAttached();
    await expect(page.locator('#credentials')).toBeAttached();
    await expect(page.locator('#studio')).toBeAttached();
  });
});
