# Multi-Page Architecture Specification v1.0

**Project**: The Fountain Studio Website Architecture Refactor
**Version**: 1.0
**Date**: 2025-10-31
**Status**: SPECIFICATION (Pre-Implementation)

---

## Executive Summary

This specification defines the complete multi-page architecture for The Fountain Studio website, synthesizing:
- Tree of Thought analysis of current state and user journeys
- Med spa industry best practices (3 authoritative sources)
- Swiss Medical Spa design principles
- High-conversion website patterns

**Core Strategy**: Homepage as "showcase gallery" with 3-sentence teasers linking to comprehensive detail pages.

**Success Criteria**:
1. ✅ Clear navigation between homepage and 3 detail pages (Services, Learn, About)
2. ✅ Homepage reduced to summaries (3 sentences max per section)
3. ✅ Detail pages contain complete content from website-copy.md
4. ✅ Visual asset requirements documented for all pages
5. ✅ Conversion paths optimized (5 user journeys mapped)

---

## Table of Contents

1. [Research Synthesis](#research-synthesis)
2. [Information Architecture](#information-architecture)
3. [Content Distribution Strategy](#content-distribution-strategy)
4. [Navigation System Specification](#navigation-system-specification)
5. [Visual Asset Requirements](#visual-asset-requirements)
6. [Conversion Optimization](#conversion-optimization)
7. [Implementation Phases](#implementation-phases)

---

## 1. Research Synthesis

### 1.1 Med Spa Website Best Practices (Industry Research)

**Source 1: American Med Spa Association** (January 2025)
- **Key Finding**: "38% of users stop engaging if layout is unattractive"
- **Best Practice**: Prominent CTAs on every page ("Book Now", "Schedule Consultation")
- **Evidence**: Skin Concept & Laser saw "noticeable uptick in inquiries" after redesign
- **Application**: Our Services/Learn/About pages MUST have consistent CTAs every 1-2 scrolls

**Source 2: Illumination Consulting** (July 2025)
- **Key Finding**: "Each service should have a dedicated page"
- **Best Practice**: Service pages must "inform, inspire, and convert" with clear headlines + benefits + FAQs
- **Application**: Our Services page structure validated - each package gets dedicated section

**Source 3: Mila Design Co.** (Photography Specialist)
- **Key Finding**: "Rule of Thirds" composition creates 10x better brand perception
- **Critical Gap Identified**: We have ZERO studio photos following this principle
- **Application**: Visual asset requirements prioritized in Phase 3

### 1.2 Tree of Thought Analysis Findings

**Current State Problems**:
1. ❌ Homepage has TOO MUCH detail (should be showcase, not comprehensive)
2. ❌ Navigation doesn't support multi-page architecture (scroll-only buttons)
3. ❌ Services/Learn/About pages missing visual assets (no studio photos, no Kristen headshot)
4. ❌ About page missing 1 section: "Why She Doesn't Want to Fix You"

**Optimal Architecture**:
```
Homepage (Showcase Layer)
├── 3-sentence teaser per section
├── "Learn More" CTAs to detail pages
└── Testimonials/FAQ/Contact remain (social proof + conversion)

Detail Pages (Comprehensive Layer)
├── /services → Full packages from website-copy.md
├── /learn → Complete methodology explanations
└── /about → Studio story + credentials + location
```

### 1.3 Swiss Medical Spa Principles (From design-system.md)

**Validated Requirements**:
- ✅ Champagne Gold (#D4A234) for CTAs only (3% max usage) - **CRITICAL: Not beige!**
- ✅ Charcoal (#2C2B29) for text - professional, not "woo-woo"
- ✅ Silk (#F8F6F3) background - never pure white
- ✅ 50% minimum white space per viewport
- ✅ 18px body text on desktop (readability for 30-55 age demographic)

**Application**: All new pages must follow these exact color/spacing rules.

---

## 2. Information Architecture

### 2.1 Site Structure

```
the-fountain-studio.netlify.app
│
├── / (Homepage - Showcase Layer)
│   ├── Hero (tagline + primary CTA)
│   ├── Services Summary (4 cards, 3 sentences each → /services)
│   ├── Learn Summary (3 sentences + CTA → /learn)
│   ├── About Summary (3 sentences + CTA → /about)
│   ├── Testimonials (social proof - stays as-is)
│   ├── FAQ (conversion support - stays as-is)
│   └── Contact (final CTA - stays as-is)
│
├── /services (Detail Page - Comprehensive Layer)
│   ├── Hero: "Choose Your Path to Flow"
│   ├── Complete Integration Experience (180 CHF, 90 min)
│   ├── Biofield Tuning Packages (4 tiers: 120-1050 CHF)
│   ├── Gyrotonic/Gyrokinesis Packages (120-1050 CHF)
│   ├── Cardiovascular Breathwork (120 CHF, 45 min)
│   ├── Frequency Massage (75 CHF, 30 min)
│   ├── What to Expect (location, booking, payment, remote)
│   └── CTA: "Book Your Session" + "Free 15-Min Consultation"
│
├── /learn (Detail Page - Educational Layer)
│   ├── Hero: "Frequency is Everything"
│   ├── Introduction: Body as Electrical System
│   ├── Biofield Tuning (what/how/benefits)
│   ├── Gyrotonic System (what/how/benefits)
│   ├── Breathwork Program (what/how/benefits)
│   ├── How to Choose Your Approach (comparison table)
│   └── CTA: "Book Discovery Call" + "View Services"
│
└── /about (Detail Page - Trust Layer)
    ├── Hero: "Your Journey Home to Yourself"
    ├── You Are Your Own Healer
    ├── Mission: "Building coherence in a chaotic world"
    ├── Journey to This Work
    ├── Why She Doesn't Want to "Fix" You (MISSING - TO ADD)
    ├── Approach: The 'Bio-Electrician'
    ├── Credentials/Certifications (4 sections)
    ├── The Studio Space (location, access, environment)
    ├── How I Work With You (trauma-aware, your pace, integration)
    └── CTA: "Schedule Discovery Call" + "Explore Services"
```

### 2.2 Navigation System Requirements

**Primary Navigation** (Desktop Header):
```
[Logo] The Fountain Studio
                                    [Home] [Services] [Learn] [About] [Testimonials] [FAQ] [Contact] [DE|EN]
```

**Active State Logic**:
- Current page highlighted with `text-gold font-semibold`
- All other links: `text-charcoal hover:text-gold`
- Testimonials/FAQ/Contact are scroll-to-section buttons (homepage only)
- If on `/services`, clicking "Testimonials" → navigates to `/#testimonials`

**Mobile Navigation** (Hamburger Menu):
- Sheet overlay with same link structure
- Touch targets ≥ 48px
- Accessible (keyboard navigable, aria-labels)

### 2.3 Footer Navigation

**Must Include**:
- Quick Links: Services, Learn, About, Booking
- Contact Info: Email, Phone, WhatsApp
- Location: "Au, near Zürich" (lakefront positioning)
- Social: Instagram (if available)
- Legal: Privacy Policy, Terms

---

## 3. Content Distribution Strategy

### 3.1 Homepage Content (Showcase Layer)

**Services Section - BEFORE (Current - Too Detailed)**:
```
Current: 8 paragraphs explaining each service in depth
Problem: Users get overwhelmed, don't visit detail pages
```

**Services Section - AFTER (Showcase Strategy)**:
```html
<section id="services-showcase" class="py-24 bg-cream">
  <h2>Your Path to Flow</h2>
  <p class="text-lg">Choose the modality that resonates with where you are right now.</p>

  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
    <!-- Card 1: Sound Healing -->
    <ServiceCard
      icon="tuning-fork"
      title="Biofield Tuning"
      summary="Sound healing using tuning forks to clear energetic blockages. Deep relaxation and nervous system regulation."
      cta="Explore Sound Healing"
      href="/services#biofield-tuning"
    />

    <!-- Card 2: Movement -->
    <ServiceCard
      icon="gyrotonic"
      title="Gyrotonic Movement"
      summary="Flowing, three-dimensional movement that opens energy pathways. Improve posture, balance, and flexibility."
      cta="Explore Movement"
      href="/services#gyrotonic"
    />

    <!-- Card 3: Breathwork -->
    <ServiceCard
      icon="breath"
      title="Cardiovascular Breathwork"
      summary="Progressive breathing sequences that stimulate circulation. Feel lighter, clearer, and more energized."
      cta="Explore Breathwork"
      href="/services#breathwork"
    />

    <!-- Card 4: Integration -->
    <ServiceCard
      icon="integration"
      title="Complete Integration"
      summary="90-minute experience combining movement, breathwork, and sound healing. Comprehensive body-field integration."
      cta="Explore Integration"
      href="/services#integration"
    />
  </div>

  <div class="mt-12 text-center">
    <Button variant="gold" href="/services">View All Services & Pricing</Button>
  </div>
</section>
```

**Learn Section - AFTER (Showcase Strategy)**:
```html
<section id="learn-showcase" class="py-24 bg-silk">
  <h2>How It Works</h2>
  <p class="text-lg max-w-3xl mx-auto">
    Your body operates as both a physical and electrical system.
    Thoughts, emotions, and experiences create static and noise.
    Each modality addresses specific components of your system to restore natural flow.
  </p>

  <div class="mt-12 text-center">
    <Button variant="gold-outline" href="/learn">Understand the Approach</Button>
    <Button variant="ghost" href="/learn#choose">Find Your Modality</Button>
  </div>
</section>
```

**About Section - AFTER (Showcase Strategy)**:
```html
<section id="about-showcase" class="py-24 bg-cream">
  <h2>Meet Kristen</h2>
  <div class="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <img src="/images/kristen-headshot.jpg" alt="Kristen Slabaugh, Certified Practitioner" />
    </div>
    <div>
      <p class="text-lg">
        Certified in Biofield Tuning, Gyrotonic, and breathwork with a background in transpersonal psychology.
        Kristen views herself as a "bio-electrician"—helping you clear static, add voltage, and restore coherence.
        You are the healer; she's the catalyst.
      </p>
      <Button variant="gold-outline" href="/about" class="mt-6">Read Her Story</Button>
    </div>
  </div>
</section>
```

### 3.2 Detail Page Content (Comprehensive Layer)

**Services Page Structure** (COMPLETE - Already Implemented ✅):
- ✅ 211 lines from website-copy.md fully implemented
- ✅ All 5 service offerings with pricing
- ✅ "What to Expect" section included
- ✅ CTAs: "Book Your Session" + "Free 15-Minute Consultation"

**Learn Page Structure** (COMPLETE - Already Implemented ✅):
- ✅ 95 lines from website-copy.md fully implemented
- ✅ All 3 modality deep-dives (Biofield Tuning, Gyrotonic, Breathwork)
- ✅ "How to Choose Your Approach" comparison table
- ✅ CTAs: "Book Discovery Call" + "View Services & Pricing"

**About Page Structure** (95% Complete - Missing 1 Section ⚠️):
- ✅ 71 lines from website-copy.md (EXCEPT one section)
- ❌ **MISSING**: "Why She Doesn't Want to 'Fix' You" section
  - Content from website-copy.md lines 133-136:
    > "The practitioner does not view you as broken. Healing is about listening rather than fixing. Slow, intuitive unfolding and integration is valued over quick fixes. By listening to and supporting the body's natural rhythm, deeper coherence and long-term change are possible."
- ✅ All other sections implemented
- ✅ CTAs: "Schedule Discovery Call" + "Explore Services"

---

## 4. Navigation System Specification

### 4.1 Component Architecture

**NavigationHeader.tsx** (Primary Navigation):
```typescript
// Current State: ✅ Already updated with multi-page support
// Location: components/sections/NavigationHeader.tsx

Features Implemented:
✅ usePathname hook for active state detection
✅ isActive(path) helper for conditional styling
✅ Link components for Services/Learn/About (not buttons)
✅ Scroll-to-section buttons for Testimonials/FAQ/Contact
✅ Cross-page navigation: scrollToSection handles homepage vs other pages
✅ Mobile hamburger menu with same structure

Active State Styling:
- Active page: text-gold font-semibold
- Inactive pages: text-charcoal hover:text-gold
- Language switcher: remains at top-right
```

**Footer.tsx** (Secondary Navigation):
```typescript
// Current State: ✅ Already exists but needs review for new pages
// Location: components/sections/Footer.tsx

Required Updates:
- [ ] Add Services, Learn, About links to Quick Links section
- [ ] Ensure language-aware routing (/${lang}/services)
- [ ] Verify all CTAs consistent with primary navigation
```

### 4.2 User Journey Flows (5 Conversion Paths)

**Journey 1: Direct Service Booking (High Intent)**
```
Entry: Google "Biofield Tuning Zürich"
↓
Land: /services page
↓
Read: Biofield Tuning packages section
↓
Convert: Click "Book Your Session" CTA
↓
Action: Cal.com modal opens → 3-tier package selection → book
```

**Journey 2: Educational Research (Medium Intent)**
```
Entry: Google "what is Gyrotonic"
↓
Land: /learn page
↓
Read: Gyrotonic System deep-dive
↓
Navigate: Click "View Services & Pricing" CTA
↓
Convert: See pricing, click "Book Now"
```

**Journey 3: Trust Building (Low Intent)**
```
Entry: Google "wellness practitioners Zürich"
↓
Land: Homepage
↓
Scroll: Read Services showcase → Click "View All Services"
↓
Navigate: Services page → Read packages
↓
Navigate: Click "About" in nav → Read Kristen's story
↓
Convert: Click "Schedule Discovery Call" (15-min free consultation)
```

**Journey 4: Homepage Explorer (Browsing)**
```
Entry: Direct URL or Instagram link
↓
Land: Homepage
↓
Scroll: Hero → Services showcase → Learn showcase → About showcase
↓
Read: Testimonials (social proof) → FAQ (objection handling)
↓
Convert: Click "Book Session" in Contact section
```

**Journey 5: Mobile Quick Booker (Time-Starved)**
```
Entry: Instagram story link (mobile)
↓
Land: Homepage (mobile)
↓
Action: Click hamburger menu → "Services"
↓
Navigate: Services page (mobile-optimized)
↓
Action: Scroll to desired package
↓
Convert: Click "Book Now" (Cal.com mobile modal)
```

### 4.3 Navigation Technical Requirements

**Accessibility** (WCAG 2.1 AA+):
- ✅ Keyboard navigation: Tab through all links
- ✅ Skip link: "Skip to main content" for screen readers
- ✅ ARIA labels: `aria-current="page"` for active link
- ✅ Focus indicators: 2px gold outline on focus
- ✅ Touch targets: ≥48px on mobile

**Performance**:
- ✅ No layout shift: Navigation sticky with reserved height
- ✅ Instant navigation: Next.js Link prefetching
- ✅ Smooth scroll: `scroll-behavior: smooth` for section links

**SEO**:
- ✅ Semantic HTML: `<nav>`, `<ul>`, `<li>`, `<a>`
- ✅ Descriptive link text: "Services" not "Click here"
- ✅ Internal linking: All pages link to each other (navigation mesh)

---

## 5. Visual Asset Requirements

### 5.1 Critical Missing Assets (P0 - Blocking Quality)

**1. Studio Exterior Photo** (Homepage About showcase + About page hero)
- **Subject**: Fountain Studio building exterior
- **Must Show**: Lake Zürich visible in background (key selling point)
- **Composition**: Rule of Thirds - building on left/right third, lake visible
- **Lighting**: Soft natural light (golden hour preferred)
- **Use Cases**:
  - About page hero background image
  - Homepage About showcase section background (subtle)
- **Dimensions**: 1920x1080px minimum (hero size)
- **Format**: WebP optimized (<200KB)

**2. Studio Interior Photo** (About page "The Studio Space" section)
- **Subject**: Treatment room interior
- **Must Show**: Gyrotonic Pulley Tower, clean minimalist space
- **Composition**: Rule of Thirds - equipment on one side, negative space for text overlay
- **Lighting**: Soft diffused lighting (no harsh shadows)
- **Use Cases**:
  - About page "Studio Space" section
  - Services page Gyrotonic section background (optional)
- **Dimensions**: 1200x800px minimum
- **Format**: WebP optimized (<150KB)

**3. Kristen Professional Headshot** (About page + Homepage About showcase)
- **Subject**: Kristen Slabaugh (close-up or medium shot)
- **Style**: Warm, approachable, professional (not clinical)
- **Composition**: Rule of Thirds - face on left/right third, eye-line on horizontal third
- **Background**: Soft bokeh (blurred) or studio seamless
- **Use Cases**:
  - About page hero image (alongside text)
  - Homepage About showcase section
  - Optional: Services page "Meet Your Practitioner" callout
- **Dimensions**: 600x900px portrait (2:3 ratio)
- **Format**: WebP optimized (<100KB)

### 5.2 High Priority Assets (P1 - Enhances Trust)

**4. Tuning Forks Close-Up** (Services page Biofield Tuning section)
- **Subject**: Weighted tuning forks in practitioner's hands
- **Composition**: Close-up, sharp focus on forks, blurred background
- **Lighting**: Soft side lighting to show metallic texture
- **Use Case**: Services page Biofield Tuning package section
- **Dimensions**: 800x600px
- **Format**: WebP optimized (<80KB)

**5. Gyrotonic Session Photo** (Services page Gyrotonic section)
- **Subject**: Client on Pulley Tower with Kristen guiding
- **Composition**: Rule of Thirds - client's body on movement arc, Kristen visible
- **Lighting**: Natural light from windows (shows studio environment)
- **Use Case**: Services page Gyrotonic/Gyrokinesis section
- **Dimensions**: 1200x800px
- **Format**: WebP optimized (<150KB)

**6. Breathwork Session Photo** (Services page Breathwork section)
- **Subject**: Client seated/lying, peaceful expression, Kristen nearby
- **Composition**: Client centered, calm energy, minimal distractions
- **Lighting**: Soft diffused (conveys relaxation)
- **Use Case**: Services page Cardiovascular Breathwork section
- **Dimensions**: 1200x800px
- **Format**: WebP optimized (<150KB)

### 5.3 Nice-to-Have Assets (P2 - Optional Polish)

**7. Electrical System Diagram** (Learn page Introduction section)
- **Subject**: Simple illustration: body silhouette with energy field
- **Style**: Minimalist line art (charcoal on silk background)
- **Use Case**: Learn page "Body as Electrical System" explainer
- **Dimensions**: 600x400px
- **Format**: SVG (infinitely scalable) or WebP (<50KB)

**8. Modality Comparison Icons** (Learn page "How to Choose" section)
- **Subject**: 3 icons (tuning fork, spiral movement, breath wave)
- **Style**: Line icons matching design system (charcoal)
- **Use Case**: Learn page comparison table
- **Dimensions**: 64x64px each
- **Format**: SVG (optimized)

### 5.4 Visual Asset Integration Plan

**Phase 3: Studio Photo Shoot** (External Dependency - 2-4 weeks timeline)
1. **Week 1**: Coordinate with professional photographer
   - Brief on brand aesthetic (Swiss Medical Spa)
   - Share Rule of Thirds composition guide
   - Schedule golden hour for exterior (late afternoon)

2. **Week 2**: Photo shoot execution
   - Exterior shots (Lake Zürich visible)
   - Interior shots (treatment room, Pulley Tower)
   - Kristen headshots (multiple outfits/poses)
   - Treatment session photos (need model client)

3. **Week 3**: Post-processing and selection
   - Photographer delivers 50-100 edited images
   - Team selects 8 hero images (per priority list)
   - Optimize to WebP format (<200KB each)

4. **Week 4**: Integration into website
   - Upload to `/public/images/studio/` directory
   - Update Image components with new src paths
   - Test on all viewports (mobile, tablet, desktop)
   - Performance audit (Lighthouse scores)

**Interim Strategy** (Until Photos Available):
- Use high-quality stock photos from Unsplash/Pexels
- Strict criteria: Rule of Thirds, soft lighting, wellness aesthetic
- Placeholder text: "Professional photo coming soon"
- Replace immediately when real photos delivered

---

## 6. Conversion Optimization

### 6.1 CTA Hierarchy (Primary → Secondary → Tertiary)

**Primary CTAs** (Gold Button - High Conversion Intent):
- "Book Your Session" (Cal.com direct booking)
- "Book Discovery Call" (Free 15-min consultation)
- "Schedule Consultation" (same as discovery call)

**Usage Rules**:
- ✅ Only ONE primary CTA per viewport (avoid choice paralysis)
- ✅ Placement: Hero sections, bottom of service descriptions, footer
- ✅ Color: Gold background (#D4A234), white text
- ✅ Size: Large (18px text, 48px height minimum)

**Secondary CTAs** (Gold Outline Button - Medium Intent):
- "View All Services & Pricing"
- "Explore [Modality Name]"
- "Learn More"
- "Read Her Story"

**Usage Rules**:
- ✅ Two max per section (primary + secondary)
- ✅ Placement: Next to primary CTA, section transitions
- ✅ Color: Gold border (#D4A234), charcoal text, transparent background
- ✅ Hover: Gold background fill

**Tertiary CTAs** (Ghost Button - Low Intent):
- "Understand the Approach"
- "Find Your Modality"
- "Explore Services"

**Usage Rules**:
- ✅ Optional third option when needed
- ✅ Placement: Within content blocks, lower priority areas
- ✅ Color: No border, charcoal text, transparent background
- ✅ Hover: Subtle charcoal background (10% opacity)

### 6.2 CTA Placement Strategy by Page

**Homepage** (Conversion Funnel):
```
Hero: "Book Your Session" (primary)
Services Showcase: "View All Services & Pricing" (secondary)
Learn Showcase: "Understand the Approach" (secondary)
About Showcase: "Read Her Story" (secondary)
Testimonials: No CTA (social proof section)
FAQ: No CTA (objection handling section)
Contact: "Book Your Session" (primary) + "Get in Touch" (secondary)
```

**Services Page** (Decision Support):
```
Hero: "Book Your Session" (primary)
Each Package: "Book This Package" (primary - inline)
What to Expect: "Free 15-Minute Consultation" (secondary)
Footer: "Book Your Session" (primary)
```

**Learn Page** (Educational Nurture):
```
Hero: "Book Discovery Call" (primary)
After Each Modality: "View [Modality] Services" (secondary - anchor link)
Comparison Table: "Book Discovery Call" (primary)
Footer: "View Services & Pricing" (secondary)
```

**About Page** (Trust Building):
```
Hero: "Schedule Discovery Call" (primary)
After Credentials: "View Services" (secondary)
Studio Space: "Get Directions" (tertiary - Google Maps link)
Footer: "Schedule Discovery Call" (primary)
```

### 6.3 Conversion Tracking (Analytics Setup)

**Google Analytics 4 Events** (To Implement):
```javascript
// Homepage
gtag('event', 'view_services_cta', { section: 'services_showcase' });
gtag('event', 'learn_more_cta', { section: 'learn_showcase' });
gtag('event', 'read_story_cta', { section: 'about_showcase' });

// Services Page
gtag('event', 'book_package', { package: 'biofield_tune_up_120' });
gtag('event', 'book_package', { package: 'integration_180' });

// Learn Page
gtag('event', 'book_discovery_call', { source: 'learn_page' });

// About Page
gtag('event', 'schedule_discovery_call', { source: 'about_page' });

// Cal.com Modal
gtag('event', 'cal_modal_opened', { trigger: 'book_cta' });
gtag('event', 'cal_booking_completed', { service: 'biofield_tuning' });
```

**Conversion Goals**:
1. **Primary Goal**: Cal.com booking completed (any service)
2. **Secondary Goal**: Discovery call booked (free 15-min)
3. **Micro-Conversion 1**: Services page visited from homepage
4. **Micro-Conversion 2**: Learn page visited from homepage
5. **Micro-Conversion 3**: About page visited from homepage

---

## 7. Implementation Phases

### Phase 1: Navigation System (P0 - BLOCKING) ⚠️

**Status**: Partially Complete (NavigationHeader done, needs Footer + Page Integration)

**Tasks**:
- [x] T2.4a: Update NavigationHeader.tsx with multi-page logic ✅
- [ ] T2.4b: Add NavigationHeader + Footer to Services page
- [ ] T2.4c: Add NavigationHeader + Footer to Learn page
- [ ] T2.4d: Add NavigationHeader + Footer to About page
- [ ] T2.4e: Update Footer.tsx with new page links
- [ ] T2.4f: Test navigation flow (all pages → all pages)
- [ ] T2.4g: Test active states (gold highlighting works)
- [ ] T2.4h: Test mobile hamburger menu
- [ ] T2.4i: Playwright E2E navigation tests

**Acceptance Criteria**:
- ✅ User can navigate from any page to any other page
- ✅ Active page highlighted in gold
- ✅ Testimonials/FAQ/Contact links work from all pages (redirect to `/#section`)
- ✅ Mobile hamburger menu functional
- ✅ No broken links (404 errors)
- ✅ Keyboard navigation works (Tab key)

**Estimated Time**: 4-6 hours

---

### Phase 2: Homepage Simplification (P0 - BLOCKING)

**Status**: Not Started (Waiting for Phase 1)

**Tasks**:
- [ ] T2.5a: Reduce Services section to 4 cards (3 sentences each)
- [ ] T2.5b: Reduce Learn section to 3-sentence intro + CTA
- [ ] T2.5c: Reduce About section to 3-sentence intro + CTA
- [ ] T2.5d: Update CTAs to link to detail pages (not scroll)
- [ ] T2.5e: Verify Testimonials/FAQ/Contact sections unchanged
- [ ] T2.5f: Visual regression test (before/after screenshots)
- [ ] T2.5g: Type-check passes
- [ ] T2.5h: Build succeeds

**Acceptance Criteria**:
- ✅ Homepage 50% shorter (measured in scroll height)
- ✅ Each showcase section ≤ 5 lines of text
- ✅ All CTAs link to detail pages (not scroll anchors)
- ✅ Mobile viewport: single-column cards, readable text
- ✅ No content loss (all details on respective pages)

**Estimated Time**: 6-8 hours

---

### Phase 3: Visual Assets Integration (P0 - CRITICAL but External Dependency)

**Status**: Not Started (Photo Shoot Required)

**Tasks**:
- [ ] T3.1: Coordinate professional photo shoot (Week 1)
  - [ ] Brief photographer on brand aesthetic
  - [ ] Share Rule of Thirds composition guide
  - [ ] Schedule golden hour exterior shots
- [ ] T3.2: Execute photo shoot (Week 2)
  - [ ] Exterior with Lake Zürich
  - [ ] Interior treatment room
  - [ ] Kristen headshots (3-5 options)
  - [ ] Treatment session photos (model required)
- [ ] T3.3: Photo selection and optimization (Week 3)
  - [ ] Select 8 hero images
  - [ ] Optimize to WebP (<200KB each)
  - [ ] Upload to `/public/images/studio/`
- [ ] T3.4: Website integration (Week 4)
  - [ ] About page hero: Studio exterior
  - [ ] About page: Kristen headshot
  - [ ] Services page: Treatment photos
  - [ ] Homepage About showcase: Kristen headshot
- [ ] T3.5: Performance audit (Week 4)
  - [ ] Lighthouse Performance >90
  - [ ] No layout shift (proper aspect ratios)
  - [ ] Mobile optimized (responsive images)

**Acceptance Criteria**:
- ✅ All 8 priority images uploaded and integrated
- ✅ Rule of Thirds composition validated
- ✅ Performance: Lighthouse scores maintained (>90)
- ✅ Responsive: Images scale properly 375px-1920px
- ✅ Accessibility: Alt text descriptive (SEO + screen readers)

**Estimated Time**: 2-4 weeks (external dependency)

---

### Phase 4: Content Gap Fill (P1 - HIGH)

**Status**: Not Started (Waiting for Phase 2)

**Tasks**:
- [ ] T4.1: Add "Why She Doesn't Want to Fix You" section to About page
  - [ ] Extract content from website-copy.md lines 133-136
  - [ ] Create new section component: `WhyNotFixYouSection.tsx`
  - [ ] Place after "Journey to This Work" section
  - [ ] Ensure wave divider between sections
- [ ] T4.2: Verify About page content 100% complete
- [ ] T4.3: Cross-check all pages vs website-copy.md (no omissions)
- [ ] T4.4: Update i18n dictionaries for new section (DE/EN)

**Acceptance Criteria**:
- ✅ About page has all 8 sections from website-copy.md
- ✅ No content omissions across all pages
- ✅ German translations reviewed by native speaker
- ✅ Type-check passes

**Estimated Time**: 2-3 hours

---

### Phase 5: SEO & Testing (P1 - FOUNDATION)

**Status**: Not Started (Waiting for Phases 1-4)

**Tasks**:
- [ ] T5.1: SEO meta tags for all pages
  - [ ] Services: Title, description, OG tags, JSON-LD
  - [ ] Learn: Title, description, OG tags, JSON-LD
  - [ ] About: Title, description, OG tags, JSON-LD
- [ ] T5.2: Playwright E2E test suite
  - [ ] Test: Homepage → Services navigation
  - [ ] Test: Homepage → Learn navigation
  - [ ] Test: Homepage → About navigation
  - [ ] Test: Services → Learn → About (full flow)
  - [ ] Test: Mobile hamburger menu
  - [ ] Test: Cal.com modal opens on CTA click
- [ ] T5.3: Performance validation
  - [ ] Lighthouse Performance >90 (all pages)
  - [ ] Lighthouse Accessibility >95 (all pages)
  - [ ] Lighthouse SEO >95 (all pages)
- [ ] T5.4: Visual regression testing
  - [ ] Screenshot all pages at 375px, 768px, 1920px
  - [ ] Compare against design mockups
  - [ ] Fix any layout issues

**Acceptance Criteria**:
- ✅ All E2E tests passing (0 failures)
- ✅ Lighthouse scores: Performance >90, Accessibility >95, SEO >95
- ✅ Visual regression: No unintended layout changes
- ✅ Cross-browser: Chrome, Firefox, Safari tested

**Estimated Time**: 8-10 hours

---

## Appendices

### Appendix A: Content Source Mapping

**Website-Copy.md → Implemented Pages**:
- Lines 1-95 → `/learn` page ✅
- Lines 96-154 → Homepage (sections) ✅
- Lines 155-174 → `/about` page ✅ (except lines 133-136 ⚠️)
- Lines 175-264 → `/services` page ✅

**Missing Content**:
- ❌ website-copy.md lines 133-136 ("Why She Doesn't Want to Fix You") → To add in Phase 4

### Appendix B: Design System Reference

**Color Tokens** (from tailwind.config.ts):
```typescript
colors: {
  gold: '#D4A234',        // Primary CTA (3% max usage)
  charcoal: '#2C2B29',    // Primary text
  silk: '#F8F6F3',        // Background
  cream: '#F5F1EB',       // Alternate background
}
```

**Typography Tokens**:
```typescript
fontSize: {
  base: '1.125rem',      // 18px - Body text (desktop)
  lg: '1.25rem',         // 20px - Section intros
  xl: '1.5rem',          // 24px - Subheadings
  '3xl': '2.25rem',      // 36px - H2 headings
}
```

**Spacing Tokens** (Section Padding):
```typescript
py-24   // 96px vertical (mobile)
py-32   // 128px vertical (desktop)
px-6    // 24px horizontal (mobile)
px-8    // 32px horizontal (desktop)
```

### Appendix C: Browser Support

**Target Browsers**:
- Chrome 120+ (90% of Swiss users)
- Safari 17+ (MacOS/iOS users)
- Firefox 120+ (privacy-conscious users)
- Edge 120+ (Windows enterprise)

**Polyfills Required**:
- None (modern browsers only, Next.js handles transpilation)

**Known Issues**:
- Safari: Cal.com modal may require manual refresh (acceptable)
- Firefox: Wave dividers render correctly (SVG tested)

---

## Document Control

**Version History**:
- v1.0 (2025-10-31): Initial specification based on Tree of Thought analysis + research

**Approval**:
- [ ] Technical Lead: _______________
- [ ] Project Stakeholder: _______________
- [ ] UX Designer: _______________

**Next Steps**:
1. Review specification with team
2. Approve visual asset timeline (photo shoot)
3. Begin Phase 1 implementation (Navigation System)
4. Schedule weekly progress reviews

---

**END OF SPECIFICATION**
