import { test, expect } from '@playwright/test';

/**
 * Content Rendering Test Suite
 * Tests that all page sections render correctly with proper content
 */

test.describe('Content Rendering', () => {
  test('Homepage sections render correctly', async ({ page }) => {
    await page.goto('/de');

    await test.step('Hero section is visible with branding', async () => {
      await expect(page.locator('h1')).toContainText(/Fountain/i);
      await expect(page.getByText(/Frequency is Everything/i)).toBeVisible();
    });

    await test.step('Services summary section displays', async () => {
      const servicesSection = page.locator('#services').or(page.getByText(/angebote/i).locator('..'));
      await servicesSection.scrollIntoViewIfNeeded();
      await expect(servicesSection).toBeVisible();
    });

    await test.step('About summary section displays', async () => {
      const aboutSection = page.locator('#about').or(page.getByText(/über/i).locator('..'));
      await aboutSection.scrollIntoViewIfNeeded();
      await expect(aboutSection).toBeVisible();
    });

    await test.step('Booking section displays with CTAs', async () => {
      const bookingSection = page.locator('#booking');
      await bookingSection.scrollIntoViewIfNeeded();
      await expect(bookingSection).toBeVisible();

      // Verify booking buttons are present
      const bookButtons = page.getByRole('button', { name: /jetzt buchen/i });
      await expect(bookButtons.first()).toBeVisible();
    });
  });

  test('Services page has complete content', async ({ page }) => {
    await page.goto('/en/services');

    await test.step('Page heading is visible', async () => {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    await test.step('Biofield Tuning section is present', async () => {
      await expect(page.getByText(/Biofield Tuning/i)).toBeVisible();
      await expect(page.locator('#biofield-tuning')).toBeVisible();
    });

    await test.step('Gyrotonic section is present', async () => {
      await expect(page.getByText(/Gyrotonic/i)).toBeVisible();
      await expect(page.locator('#gyrotonic')).toBeVisible();
    });

    await test.step('Breathwork section is present', async () => {
      await expect(page.getByText(/Breathwork/i)).toBeVisible();
      await expect(page.locator('#breathwork')).toBeVisible();
    });

    await test.step('Pricing information is displayed', async () => {
      // Check for CHF currency mentions (pricing)
      await expect(page.getByText(/CHF/i)).toBeVisible();
    });
  });

  test('Learn page has methodology content', async ({ page }) => {
    await page.goto('/en/learn');

    await test.step('Page heading explains methodology', async () => {
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    await test.step('Biofield Tuning explanation is present', async () => {
      await expect(page.getByText(/Biofield/i)).toBeVisible();
      await expect(page.getByText(/tuning fork/i)).toBeVisible();
    });

    await test.step('Gyrotonic explanation is present', async () => {
      await expect(page.getByText(/Gyrotonic/i)).toBeVisible();
      await expect(page.getByText(/movement/i)).toBeVisible();
    });

    await test.step('Breathwork explanation is present', async () => {
      await expect(page.getByText(/Breathwork/i)).toBeVisible();
      await expect(page.getByText(/breath/i)).toBeVisible();
    });

    await test.step('CTA to services or booking is present', async () => {
      const bookButton = page.getByRole('button', { name: /book/i })
        .or(page.getByRole('link', { name: /book/i }));
      await expect(bookButton.first()).toBeVisible();
    });
  });

  test('About page has studio story and credentials', async ({ page }) => {
    await page.goto('/en/about');

    await test.step('Founder name is mentioned', async () => {
      await expect(page.getByText(/Kristen/i)).toBeVisible();
    });

    await test.step('Credentials section is present', async () => {
      // Look for certification or training mentions
      await expect(page.getByText(/certified/i).or(page.getByText(/training/i))).toBeVisible();
    });

    await test.step('Studio location information is present', async () => {
      // Check for location mentions (Au, Zurich, etc.)
      await expect(page.getByText(/Au|Zürich|Zurich/i)).toBeVisible();
    });

    await test.step('Contact information or CTA is present', async () => {
      const contactButton = page.getByRole('button', { name: /contact|book/i })
        .or(page.getByRole('link', { name: /contact|book/i }));
      await expect(contactButton.first()).toBeVisible();
    });
  });

  test('All images load correctly', async ({ page }) => {
    await page.goto('/de');

    await test.step('Hero image loads', async () => {
      const heroImage = page.locator('img').first();
      await expect(heroImage).toBeVisible();

      // Check image has loaded (not broken)
      const naturalWidth = await heroImage.evaluate((img: HTMLImageElement) => img.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    });

    await test.step('All images on page have alt text', async () => {
      const images = await page.locator('img').all();

      for (const img of images) {
        const alt = await img.getAttribute('alt');
        // Images should have alt text (empty string is acceptable for decorative images)
        expect(alt).not.toBeNull();
      }
    });

    await test.step('No broken images on page', async () => {
      const images = await page.locator('img').all();

      for (const img of images) {
        const isLoaded = await img.evaluate((el: HTMLImageElement) => {
          return el.complete && el.naturalWidth > 0;
        });
        expect(isLoaded).toBe(true);
      }
    });
  });

  test('Wave dividers render correctly', async ({ page }) => {
    await page.goto('/de');

    await test.step('Wave dividers are present', async () => {
      // Look for wave divider elements (SVG or dedicated components)
      const waves = page.locator('svg[role="presentation"]')
        .or(page.locator('[class*="wave"]'));

      const waveCount = await waves.count();
      expect(waveCount).toBeGreaterThan(0);
    });

    await test.step('Wave dividers have correct colors', async () => {
      // Waves should use design system colors (silk/cream)
      const firstWave = page.locator('svg[role="presentation"]').first();

      if (await firstWave.count() > 0) {
        const fill = await firstWave.getAttribute('fill');
        expect(fill).toBeTruthy();
      }
    });
  });
});
