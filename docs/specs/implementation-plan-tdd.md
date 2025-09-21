# The Fountain Studio - TDD Implementation Plan

## Overview
Test-Driven Development approach for implementing The Fountain Studio website, using actual copy from Kristen's draft content. Each section will be developed following the TDD cycle: Write Tests → Implement → Test with Playwright → Iterate → Perfect → Move to Next.

## Key Content Updates from Draft Copy

### Brand Positioning
- **Tagline**: "Frequency is Everything"
- **Description**: A boutique healing studio helping you clear the static and reconnect with your natural flow
- **Modalities**: Biofield Tuning, Gyrotonic®, Breathwork
- **Location**: Tiefenweg 5A, 8804 Au ZH (updated from generic Zurich)

### Core Messaging
- "You are your own healer" - Kristen as catalyst
- "Building coherence in a chaotic world, one body, one field at a time"
- Bio-electrician approach to healing
- Trauma-aware, gentle practices

## TDD Implementation Phases

### Phase 1: Navigation & Hero Section (Day 1)

#### 1.1 Write Tests for Navigation
```typescript
// __tests__/navigation.test.tsx
describe('Navigation Component', () => {
  it('should render sticky navigation with all menu items');
  it('should transition from transparent to solid on scroll');
  it('should highlight active section on scroll');
  it('should toggle language between DE and EN');
  it('should display mobile menu on small screens');
  it('should navigate to sections with smooth scroll');
});
```

#### 1.2 Implement Navigation
- Sticky header with transparent → white transition
- Menu items: Home | Learn | Services | About | Contact
- Language switcher (DE/EN)
- "Book Your Session" CTA button

#### 1.3 Write Tests for Hero
```typescript
// __tests__/hero.test.tsx
describe('Hero Section', () => {
  it('should display fullscreen background image');
  it('should render tagline "Frequency is Everything"');
  it('should show description text');
  it('should have two CTA buttons');
  it('should display scroll indicator');
  it('should be responsive on mobile');
});
```

#### 1.4 Implement Hero Section
```
Tagline: "Frequency is Everything"
Description: "A boutique healing studio helping you clear the static
and reconnect with your natural flow through gentle, embodied practices:
Biofield Tuning, Gyrotonic and Breathwork."
CTAs: "Book Your Session" | "Learn More"
```

#### 1.5 Playwright E2E Testing
```typescript
// tests/e2e/hero.spec.ts
test('Hero section displays correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Frequency is Everything');
  await page.screenshot({ path: 'hero-desktop.png' });
  // Test mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'hero-mobile.png' });
});
```

### Phase 2: "Find Your Flow" & "Stay Grounded" Sections (Day 2)

#### 2.1 Write Tests
```typescript
// __tests__/find-your-flow.test.tsx
describe('Find Your Flow Section', () => {
  it('should render section with correct copy');
  it('should display with proper spacing and typography');
  it('should animate on scroll with AOS');
});
```

#### 2.2 Implement Content
**Find Your Flow:**
"Most people live with invisible tension in their physical and energy bodies. We are often more active than receptive and carry stress and patterns from our ancestors."

**Stay Grounded:**
"Biofield tuning activates a calm energy so you can respond rather than react. By working with the physical, energetic and electrical body using sound healing, movement and breathwork, you create space for your natural healing intelligence."

#### 2.3 Playwright Testing
- Verify text content matches copy
- Check responsive layouts
- Test AOS animations trigger
- Validate accessibility

### Phase 3: "My Tool Kit" Section (Day 2-3)

#### 3.1 Write Tests
```typescript
// __tests__/toolkit.test.tsx
describe('Tool Kit Section', () => {
  it('should display 4 service cards');
  it('should show correct pricing and duration');
  it('should link to booking for each service');
  it('should display hover effects');
});
```

#### 3.2 Implement Service Cards

**1. Biofield Tuning**
- Works with energy field using tuning forks
- Benefits: Nervous system regulation, emotional release, deep relaxation
- Price: 120 CHF (60 min)

**2. Gyrotonic® Expansion System**
- Flowing 3D movement with specialized equipment
- Benefits: Improved posture, nervous system regulation, mind-body connection
- Price: 120 CHF (60 min)

**3. Breathwork (Cardiovascular Program)**
- Structured breathing program by Juliu Horvath
- Benefits: Stress relief, nervous system regulation, mental clarity
- Price: 120 CHF (45 min)

**4. Complete Integration Experience**
- 90-minute combo: 15min breathwork + 30min Gyrotonic + 45min Biofield Tuning
- Price: 180 CHF

#### 3.3 Playwright Testing
```typescript
test('Service cards display correct information', async ({ page }) => {
  await page.goto('/#toolkit');
  const cards = page.locator('[data-testid="service-card"]');
  await expect(cards).toHaveCount(4);
  await expect(cards.first()).toContainText('Biofield Tuning');
  await expect(cards.first()).toContainText('120 CHF');
});
```

### Phase 4: About Kristen Section (Day 3)

#### 4.1 Write Tests
```typescript
// __tests__/about.test.tsx
describe('About Section', () => {
  it('should display Kristen\'s bio and credentials');
  it('should show "You Are Your Own Healer" philosophy');
  it('should list all certifications');
  it('should include portrait image');
});
```

#### 4.2 Implement Content

**Philosophy:**
"You are the healer, I am the catalyst in your process"

**Mission:**
"Building coherence in a chaotic world, one body, one field at a time"

**Credentials:**
- Transpersonal Psychology
- Certified Biofield Tuning Practitioner (Eileen McKusick method)
- Certified Gyrotonic® Practitioner
- Breathwork Facilitator (Kolakoski Method)

**Bio-Electrician Approach:**
- Add voltage to help you feel lighter
- Clear static that blocks clarity
- Calm and support nervous system regulation

#### 4.3 Playwright Testing
- Verify all credentials display
- Check image loading and alt text
- Test responsive layout
- Validate section navigation

### Phase 5: Learn Page Content (Day 4)

#### 5.1 Write Tests
```typescript
// __tests__/learn.test.tsx
describe('Learn Section', () => {
  it('should display accordion with 3 modalities');
  it('should expand/collapse on click');
  it('should show comparison table');
  it('should have "How to Choose" guide');
});
```

#### 5.2 Implement Modalities

**Biofield Tuning:**
- What: Works with body's electrical system
- How: Tuning forks locate and dissolve distortion
- Benefits: Deep relaxation, emotional release, improved energy flow
- Choose when: Dealing with stress, trauma patterns, feeling stuck

**Gyrotonic®:**
- What: Movement addressing whole system
- How: Flowing circular movements from torso
- Benefits: Improved posture, strength, flexibility
- Choose when: Need better posture, mobility, coordination

**Breathwork:**
- What: Cardiovascular breathing program
- How: Progressive sequences, rhythmic tapping, movement
- Benefits: Uplifted mood, mental clarity, better circulation
- Choose when: Want more energy, focus, circulation

#### 5.3 Playwright Testing
```typescript
test('Learn section accordion functionality', async ({ page }) => {
  await page.goto('/#learn');
  const accordion = page.locator('[data-testid="modalities-accordion"]');

  // Test expansion
  await accordion.locator('button').first().click();
  await expect(accordion.locator('[role="region"]').first()).toBeVisible();

  // Test content
  await expect(page.locator('text=Biofield Tuning')).toBeVisible();
});
```

### Phase 6: Testimonials Section (Day 4)

#### 6.1 Write Tests
```typescript
// __tests__/testimonials.test.tsx
describe('Testimonials', () => {
  it('should display carousel with client feedback');
  it('should auto-play and pause on hover');
  it('should show navigation controls');
});
```

#### 6.2 Implement Testimonials
Based on actual client feedback from copy:
- "It finally feels like I'm standing in my own shoes"
- Client who sang after thyroid surgery
- Experiences of feeling lighter, sleeping deeply, thinking clearly

#### 6.3 Playwright Testing
- Test carousel navigation
- Verify auto-play functionality
- Check pause on hover
- Validate responsive behavior

### Phase 7: Services & Pricing (Day 5)

#### 7.1 Write Tests
```typescript
// __tests__/pricing.test.tsx
describe('Pricing Section', () => {
  it('should display all package options');
  it('should show savings on packages');
  it('should have booking CTAs for each');
  it('should display payment methods');
});
```

#### 7.2 Implement Pricing Structure

**Biofield Tuning Packages:**
- Tune Up: 120 CHF (single session)
- Taste It: 345 CHF (3 sessions, save 15 CHF)
- Tune It: 660 CHF (6 sessions, save 60 CHF)
- Level It: 1,050 CHF (10 sessions, save 150 CHF)

**Movement Packages:**
- Private Gyrotonic: 120 CHF
- Gyrokinesis Session: 120 CHF
- 10-Session Package: 1,050 CHF (save 120 CHF)

**Specialty:**
- Frequency Massage: 75 CHF (30 min)
- Complete Integration: 180 CHF (90 min)

#### 7.3 Playwright Testing
```typescript
test('Pricing displays correctly', async ({ page }) => {
  await page.goto('/#pricing');
  await expect(page.locator('text=Tune Up')).toBeVisible();
  await expect(page.locator('text=120 CHF')).toBeVisible();
  await expect(page.locator('text=save 60 CHF')).toBeVisible();
});
```

### Phase 8: Contact & Booking (Day 5)

#### 8.1 Write Tests
```typescript
// __tests__/contact.test.tsx
describe('Contact Section', () => {
  it('should display studio location and details');
  it('should show booking options');
  it('should have WhatsApp button');
  it('should display contact form');
});
```

#### 8.2 Implement Contact Info

**Studio Location:**
Tiefenweg 5A
8804 Au ZH
Switzerland

**Access:**
- Parking available
- Bus stops nearby
- Easy public transport from Zurich

**Contact:**
Kristen Slabaugh
Owner & Certified Practitioner

**Options:**
- In-person sessions
- Remote Biofield Tuning
- Online movement classes

#### 8.3 Playwright Testing
- Test Cal.com integration
- Verify WhatsApp link
- Test form submission
- Check map display

### Phase 9: Final Integration Testing (Day 6)

#### 9.1 Full User Journey Tests
```typescript
// tests/e2e/user-journey.spec.ts
test('Complete booking journey', async ({ page }) => {
  // Navigate through site
  await page.goto('/');

  // Test navigation
  await page.click('text=Learn');
  await expect(page).toHaveURL('/#learn');

  // Test language switch
  await page.click('text=EN');
  await expect(page.locator('h1')).toContainText('Frequency is Everything');

  // Test booking flow
  await page.click('text=Book Your Session');
  // Verify Cal.com widget loads
});
```

#### 9.2 Performance Testing
```typescript
test('Lighthouse metrics', async ({ page }) => {
  await page.goto('/');
  // Run Lighthouse audit
  // Verify scores > 95
});
```

#### 9.3 Accessibility Testing
```typescript
test('WCAG compliance', async ({ page }) => {
  await page.goto('/');
  // Test keyboard navigation
  // Test screen reader
  // Verify color contrast
});
```

### Phase 10: Deployment (Day 7)

#### 10.1 Pre-deployment Checklist
- [ ] All tests passing
- [ ] Lighthouse score > 95
- [ ] WCAG AA compliance verified
- [ ] Cross-browser testing complete
- [ ] Mobile responsiveness verified
- [ ] Cal.com integration tested
- [ ] WhatsApp link functional
- [ ] Analytics configured
- [ ] SEO meta tags in place
- [ ] Sitemap generated

#### 10.2 Netlify Deployment
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

## Testing Strategy

### Unit Tests (Jest)
- Component rendering
- Props validation
- State management
- Translation switching

### Integration Tests
- API endpoints
- Form submissions
- Booking flow
- Language switching

### E2E Tests (Playwright)
- Complete user journeys
- Visual regression
- Cross-browser compatibility
- Mobile responsiveness

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus management

## Success Criteria

Each section must meet:
1. ✅ All unit tests passing
2. ✅ Playwright E2E tests passing
3. ✅ Visual design matches specifications
4. ✅ Responsive on all devices
5. ✅ Accessible (WCAG AA)
6. ✅ Performance optimized
7. ✅ Copy matches draft content exactly

Only proceed to next section when all criteria are met.

---
*TDD Implementation Plan - The Fountain Studio*