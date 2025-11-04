# E2E Test Suite - Quick Start Guide

Production-quality end-to-end tests for The Fountain Studio with excellent debugging and review experience.

---

## Quick Start

### Run Tests Interactively (Recommended)

```bash
pnpm test:e2e:ui
```

**What you get**:
- ✅ Interactive dashboard with timeline
- ✅ Click any test to see execution
- ✅ DOM inspector with snapshots
- ✅ Network tab and console logs
- ✅ Pick locator tool for debugging

### Run All Tests

```bash
# Headless (fastest)
pnpm test:e2e

# Headed (watch in browser)
pnpm test:e2e:headed

# Debug mode (step through)
pnpm test:e2e:debug
```

### View Results

```bash
# Open HTML report
pnpm test:e2e:report
```

---

## Test Organization

```
tests/e2e/
├── journeys/              # User journey tests
│   ├── booking.spec.ts    # Booking flow (Homepage → Services → Cal.com)
│   ├── navigation.spec.ts # Multi-page navigation + language switching
│   ├── content.spec.ts    # Content rendering + images
│   ├── forms.spec.ts      # Form validation + booking buttons
│   └── responsive.spec.ts # Mobile/Tablet/Desktop responsiveness
└── utils/
    └── helpers.ts         # Reusable test utilities
```

---

## Common Commands

| Command | Use Case |
|---------|----------|
| `pnpm test:e2e:ui` | Interactive development and debugging |
| `pnpm test:e2e` | Run full suite (CI mode) |
| `pnpm test:e2e:headed` | Watch tests execute in browser |
| `pnpm test:e2e:debug` | Step through with debugger |
| `pnpm test:e2e:report` | View last test results |

---

## Debugging Workflow

### When a test fails:

1. **Run in UI Mode**
   ```bash
   pnpm test:e2e:ui
   ```

2. **Click the failed test** in the sidebar

3. **View the trace** (opens automatically)
   - See every action step-by-step
   - Inspect DOM at each moment
   - Check network requests
   - Read console logs

4. **Watch the video** (if available)
   - Videos are generated on failure
   - Located in `test-results/` directory

5. **Fix and re-run** (UI mode auto-reruns on save)

---

## Test Patterns

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test('User can do something', async ({ page }) => {
    await test.step('Navigate to page', async () => {
      await page.goto('/de');
      await expect(page).toHaveURL('/de');
    });

    await test.step('Verify content', async () => {
      await expect(page.getByRole('heading')).toBeVisible();
    });
  });
});
```

### Using Helper Utilities

```typescript
import { test, expect } from '@playwright/test';
import { waitForPageReady, testBothLanguages } from './utils/helpers';

test('Works in both languages', async ({ page }) => {
  await testBothLanguages(page, '/services', async (page, lang) => {
    await waitForPageReady(page);
    await expect(page.getByRole('heading')).toBeVisible();
  });
});
```

---

## Available Helper Functions

### Page State
- `waitForPageReady(page)` - Wait for full page load
- `scrollToElement(page, selector)` - Scroll and wait
- `isInViewport(page, selector)` - Check if visible

### Testing Utilities
- `testBothLanguages(page, path, testFn)` - Run test in DE/EN
- `takeDebugScreenshot(page, name)` - Screenshot with timestamp
- `expectNoConsoleErrors(page)` - Verify no JS errors

### Cal.com Integration
- `isCalcomLoaded(page)` - Check if Cal.com ready
- `waitForCalcom(page)` - Wait for Cal.com script

### Accessibility
- `expectAccessible(page, selector)` - Basic a11y checks
- `testKeyboardNavigation(page, selectors)` - Tab order

### Images & Media
- `expectImageLoaded(page, selector)` - Verify image loaded
- `getComputedStyle(page, selector, property)` - Get CSS value

### Performance
- `getPerformanceMetrics(page)` - FCP, LCP, etc.

**Full reference**: See `utils/helpers.ts`

---

## Running Specific Tests

### By File
```bash
pnpm test:e2e tests/e2e/journeys/booking.spec.ts
```

### By Test Name
```bash
pnpm test:e2e -g "booking"
```

### By Browser
```bash
pnpm test:e2e --project=chromium
pnpm test:e2e --project=webkit
pnpm test:e2e --project="Mobile Chrome"
```

---

## Adding New Tests

### 1. Create Test File

```typescript
// tests/e2e/journeys/new-feature.spec.ts
import { test, expect } from '@playwright/test';
import { waitForPageReady } from '../utils/helpers';

test.describe('New Feature', () => {
  test('Feature works correctly', async ({ page }) => {
    await page.goto('/de/page');
    await waitForPageReady(page);

    await test.step('Do something', async () => {
      // Your test code
    });
  });
});
```

### 2. Run in UI Mode

```bash
pnpm test:e2e:ui
```

### 3. Debug with Pick Locator
- Click "Pick Locator" in UI mode
- Click element in browser
- Get reliable selector

---

## Viewport Testing

### Test at specific viewport:

```typescript
test('Mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/de');
  // Test mobile-specific behavior
});
```

### Test multiple viewports:

```typescript
import { testAtViewports } from './utils/helpers';

const viewports = [
  { width: 375, height: 667 },   // Mobile
  { width: 768, height: 1024 },  // Tablet
  { width: 1920, height: 1080 }, // Desktop
];

test('Responsive design', async ({ page }) => {
  await testAtViewports(page, viewports, async (viewport) => {
    await page.goto('/de');
    // Test at each viewport
  });
});
```

---

## Configuration

**File**: `playwright.config.ts`

Key settings:
- **Trace**: `retain-on-failure` - Only save when test fails
- **Video**: `retain-on-failure` - Only record on failure
- **Screenshot**: `only-on-failure` - Only capture on failure
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

---

## Test Coverage

| User Journey | Tests | Status |
|--------------|-------|--------|
| Booking Flow | ✅ 3 scenarios | Complete |
| Navigation | ✅ 5 scenarios | Complete |
| Content Rendering | ✅ 6 scenarios | Complete |
| Forms | ✅ 4 scenarios | Complete |
| Responsive Design | ✅ 7 scenarios | Complete |

**Total**: 25+ test scenarios

---

## Tips & Best Practices

### ✅ DO

- Use `test.step()` for better trace organization
- Use helper functions from `utils/helpers.ts`
- Write descriptive test names ("User can book a session")
- Test critical paths first (booking, navigation)
- Run in UI mode during development
- Use `waitForPageReady()` to avoid flaky tests

### ❌ DON'T

- Hard-code selectors (use `getByRole`, `getByText`)
- Skip waiting for page ready (causes flakes)
- Test implementation details
- Make tests dependent on each other
- Forget to test both languages

---

## Troubleshooting

### Tests are flaky
```typescript
// Add proper waits
await waitForPageReady(page);
await element.waitFor({ state: 'visible' });
```

### Can't find element
```typescript
// Use UI mode "Pick Locator" to get reliable selector
// Or use multiple selector strategies
const button = page.getByRole('button', { name: /book/i })
  .or(page.locator('[data-testid="book-button"]'));
```

### Cal.com not detected
```typescript
import { waitForCalcom } from './utils/helpers';
await waitForCalcom(page);
```

### Image not loading
```typescript
import { expectImageLoaded } from './utils/helpers';
await expectImageLoaded(page, 'img[alt="Hero"]');
```

---

## Resources

- **Playwright Docs**: https://playwright.dev
- **Trace Viewer**: https://playwright.dev/docs/trace-viewer
- **UI Mode**: https://playwright.dev/docs/test-ui-mode
- **Best Practices**: https://playwright.dev/docs/best-practices

---

## Questions?

Check the comprehensive session documentation:
`docs/sessions/2025-11-04-e2e-test-suite/README.md`

Or run tests in UI mode and explore:
```bash
pnpm test:e2e:ui
```

**Happy Testing!** 🎭
