# Navigation & Information Architecture Analysis

**Project**: The Fountain Studio Website
**Date**: 2025-10-31
**Status**: Phase 2 Planning - Multi-Page Architecture Design

---

## Executive Summary

**Current State**: Single-page homepage with sections that scroll, plus three standalone detail pages (/services, /learn, /about) lacking navigation integration.

**Problem**: Homepage sections currently contain FULL content (should be showcases). No navigation system exists. Detail pages lack visual assets. Content distribution unclear.

**Solution Needed**: Homepage "showcase" strategy with clear CTAs to detail pages + navigation system + visual asset inventory.

---

## Tree of Thought: Information Architecture

```
THE FOUNTAIN STUDIO WEBSITE
│
├── HOMEPAGE (/) - "Showcase + Conversion Hub"
│   │
│   ├── HERO SECTION
│   │   ├── Content: Tagline ("Frequency is Everything") + 2-sentence description
│   │   ├── Visuals: Hero image (studio exterior with lake view - MISSING)
│   │   ├── CTAs: "Book Your Session" (Cal.com) + "Learn More" (scroll to #services)
│   │   └── Links To: Booking modal, Services section (scroll)
│   │
│   ├── SERVICES SUMMARY SECTION (#services)
│   │   ├── Content Strategy: SHOWCASE (3-4 sentences each)
│   │   │   ├── Current: Full ServicesGrid with all details (TOO MUCH)
│   │   │   └── Should Be: Service card grid (4 cards: Biofield, Gyrotonic, Breathwork, Integration)
│   │   │       ├── Each card: 1 image + title + 3-sentence summary + "Learn More" CTA
│   │   │       └── Visual Needs: 4 service images (tuning fork, Gyrotonic equipment, breathwork, combo)
│   │   ├── Links To: /services (detail page) + booking modal
│   │   └── Conversion Goal: Intrigue → drive to detail page or book
│   │
│   ├── ABOUT SUMMARY SECTION (#about)
│   │   ├── Content Strategy: SHOWCASE (3-4 sentences)
│   │   │   ├── Current: AboutSection with reasonable length (GOOD)
│   │   │   └── Should Be: Brief intro to Kristen + "bio-electrician" concept + CTA
│   │   ├── Visuals: Kristen headshot + studio interior - MISSING
│   │   ├── Links To: /about (detail page)
│   │   └── Conversion Goal: Build trust → drive to full story
│   │
│   ├── LEARN SUMMARY SECTION (#learn)
│   │   ├── Content Strategy: SHOWCASE (3-4 sentences)
│   │   │   ├── Current: LearnAccordion with full methodology (TOO MUCH)
│   │   │   └── Should Be: 3-sentence intro + "How to Choose" teaser + CTA
│   │   ├── Visuals: Conceptual diagram (body as electrical system) - MISSING
│   │   ├── Links To: /learn (detail page)
│   │   └── Conversion Goal: Educate → drive to methodology deep dive
│   │
│   ├── TESTIMONIALS SECTION (#testimonials)
│   │   ├── Content: 3-4 client quotes (EXISTS - GOOD)
│   │   ├── Visuals: Client photos or initials only
│   │   └── Conversion Goal: Social proof → trust building
│   │
│   ├── FAQ SECTION (#faq)
│   │   ├── Content: Common questions (EXISTS - GOOD)
│   │   └── Conversion Goal: Address objections → reduce friction
│   │
│   └── BOOKING SECTION (#contact)
│       ├── Content: Final conversion CTA (EXISTS - GOOD)
│       ├── CTAs: "Book Your Session" (primary) + contact info
│       └── Conversion Goal: Convert → action
│
├── DETAIL PAGE: /services - "Full Service Catalog + Pricing"
│   │
│   ├── Content Source: website-copy.md lines 177-263 (87 lines)
│   │
│   ├── HERO
│   │   ├── Content: "Choose Your Path to Healing" + subtitle
│   │   └── Visual: Services hero image (studio treatment room - MISSING)
│   │
│   ├── COMPLETE INTEGRATION EXPERIENCE
│   │   ├── Content: 180 CHF / 90 min package (EXISTS - GOOD)
│   │   ├── Visual: Integration session in progress - MISSING
│   │   └── CTA: "Book Integration" (Cal.com)
│   │
│   ├── BIOFIELD TUNING PACKAGES
│   │   ├── Content: 4 tiers (Tune Up, Taste It, Tune It, Level It) (EXISTS - GOOD)
│   │   ├── Visual: Tuning forks in action - MISSING
│   │   └── CTA: "Book Sound Healing" (Cal.com)
│   │
│   ├── GYROTONIC MOVEMENT PACKAGES
│   │   ├── Content: 3 options (Private, Group, 10-session) (EXISTS - GOOD)
│   │   ├── Visual: Pulley Tower equipment in use - MISSING
│   │   └── CTA: "Book Movement Session"
│   │
│   ├── BREATHWORK
│   │   ├── Content: 120 CHF / 45 min (EXISTS - GOOD)
│   │   ├── Visual: Breathwork session - MISSING
│   │   └── CTA: "Book Breathwork"
│   │
│   ├── FREQUENCY MASSAGE
│   │   ├── Content: 75 CHF / 30 min (EXISTS - GOOD)
│   │   ├── Visual: Massage session - MISSING
│   │   └── CTA: "Book Massage"
│   │
│   ├── WHAT TO EXPECT
│   │   ├── Content: Location, booking, payment, remote (EXISTS - GOOD)
│   │   └── Visual: Studio map embed (Au, Zurich) - MISSING
│   │
│   └── FINAL CTA
│       ├── Content: "Ready to Begin?" + CTAs (EXISTS - GOOD)
│       └── CTAs: "Book Session" + "Free Consultation"
│
├── DETAIL PAGE: /learn - "Methodology Deep Dive"
│   │
│   ├── Content Source: website-copy.md lines 3-63 (61 lines)
│   │
│   ├── HERO
│   │   ├── Content: "How It Works" + body as electrical system intro
│   │   ├── Visual: Conceptual diagram - MISSING
│   │   └── Quote: "Frequency is Everything"
│   │
│   ├── BIOFIELD TUNING EXPLAINED
│   │   ├── Content: What/How/Benefits (EXISTS - GOOD)
│   │   ├── Visual: Biofield illustration (energy field diagram) - MISSING
│   │   └── Section: Deep explanation of method
│   │
│   ├── GYROTONIC EXPLAINED
│   │   ├── Content: What/How/Benefits (EXISTS - GOOD)
│   │   ├── Visual: Movement sequence photos - MISSING
│   │   └── Section: Deep explanation of method
│   │
│   ├── BREATHWORK EXPLAINED
│   │   ├── Content: What/How/Benefits (EXISTS - GOOD)
│   │   ├── Visual: Breathing technique illustration - MISSING
│   │   └── Section: Deep explanation of method
│   │
│   ├── HOW TO CHOOSE YOUR APPROACH
│   │   ├── Content: Comparison table (3 modalities) (EXISTS - GOOD)
│   │   ├── Visual: Decision tree diagram - MISSING
│   │   └── Comparison: Focus, Role, Effect, When to Choose
│   │
│   └── FINAL CTA
│       ├── Content: "Still Unsure?" + CTAs
│       └── CTAs: "Book Discovery Call" + "View Services"
│
├── DETAIL PAGE: /about - "Kristen's Story + Studio"
│   │
│   ├── Content Source: website-copy.md lines 113-173 (61 lines)
│   │
│   ├── HERO
│   │   ├── Content: "About Kristen" + intro paragraph
│   │   └── Visual: Professional Kristen portrait - MISSING
│   │
│   ├── YOU ARE YOUR OWN HEALER
│   │   ├── Content: Philosophy + quote (EXISTS - GOOD)
│   │   └── Visual: None needed (text-focused)
│   │
│   ├── MISSION
│   │   ├── Content: "Building coherence..." + description (EXISTS - GOOD)
│   │   └── Visual: None needed (text-focused)
│   │
│   ├── JOURNEY TO THIS WORK
│   │   ├── Content: Background story + health journey (EXISTS - GOOD)
│   │   └── Visual: Timeline or journey illustration - OPTIONAL
│   │
│   ├── WHY SHE DOESN'T WANT TO FIX YOU
│   │   ├── Content: "Not broken" philosophy (EXISTS - source has it)
│   │   └── Visual: None needed (text-focused)
│   │   └── NOTE: Content from website-copy.md NOT in current page - NEEDS ADDING
│   │
│   ├── APPROACH: BIO-ELECTRICIAN
│   │   ├── Content: 3 principles (Add voltage, Clear static, Calm nervous system) (EXISTS - GOOD)
│   │   └── Visual: Bio-electrician concept illustration - MISSING
│   │
│   ├── CREDENTIALS
│   │   ├── Content: 4 certifications (Psychology, Biofield, Gyrotonic, Breathwork) (EXISTS - GOOD)
│   │   └── Visual: Certificate badges or logos - OPTIONAL
│   │
│   ├── THE STUDIO SPACE
│   │   ├── Content: Location + access + environment (EXISTS - GOOD)
│   │   ├── Visuals: MISSING
│   │   │   ├── Studio exterior (Au village, Lake Zurich view) - CRITICAL
│   │   │   ├── Studio interior (treatment room, Gyrotonic equipment) - CRITICAL
│   │   │   ├── Map embed (Tiefenweg 5A, 8804 Au ZH) - CRITICAL
│   │   │   └── Transport diagram (tram/bus routes from Zurich) - NICE TO HAVE
│   │   └── Section: Location is key selling point (Lake Zurich proximity)
│   │
│   ├── HOW I WORK WITH YOU
│   │   ├── Content: 3 principles (Trauma-aware, Your pace, Integration) (EXISTS - GOOD)
│   │   ├── Quote: "Standing in my own shoes" testimonial
│   │   └── Visual: None needed (text-focused)
│   │
│   └── FINAL CTA
│       ├── Content: "Ready to Explore?" + CTAs
│       └── CTAs: "Book Discovery Call" + "View Services"
│
└── NAVIGATION SYSTEM (GLOBAL)
    │
    ├── HEADER NAVIGATION (sticky, appears on all pages)
    │   ├── Logo: "The Fountain Studio" (links to /)
    │   ├── Menu Items:
    │   │   ├── Home (/) - active on homepage
    │   │   ├── Services (/services) - active on services page
    │   │   ├── Learn (/learn) - active on learn page
    │   │   ├── About (/about) - active on about page
    │   │   └── Book (Cal.com modal trigger) - gold CTA button
    │   ├── Language Switcher: DE ⇄ EN (current lang highlighted)
    │   ├── Mobile: Hamburger menu → full-screen overlay
    │   └── Active State: Gold underline + text-gold on current page
    │
    ├── FOOTER NAVIGATION (appears on all pages)
    │   ├── Quick Links:
    │   │   ├── Home, Services, Learn, About
    │   │   └── Book Session (Cal.com)
    │   ├── Contact Info:
    │   │   ├── Tiefenweg 5A, 8804 Au ZH
    │   │   ├── WhatsApp: +41 78 795 00 09
    │   │   └── Email: info@thefountainstudio.com
    │   ├── Social Media: (if applicable)
    │   └── Legal: Privacy Policy, Terms
    │
    └── FLOATING CTA (WhatsApp button)
        ├── Fixed bottom-right on all pages
        └── Green WhatsApp icon (exists, good)
```

---

## Content Distribution Matrix

### Homepage vs Detail Pages Strategy

| Section | Homepage Content (Showcase) | Detail Page Content (Full) | Current Status |
|---------|----------------------------|---------------------------|----------------|
| **Hero** | 2-sentence intro + tagline | Full hero with subtitle + intro paragraph | ✓ Good on homepage, detail pages need hero sections |
| **Services** | 4 service cards (3 sentences each) + "View All Services" CTA | Full pricing, packages, descriptions, "What to Expect" | ❌ Homepage has full content, should be showcase only |
| **Learn** | 3-sentence methodology intro + "Learn How It Works" CTA | Full explanations (What/How/Benefits per modality) + comparison table | ❌ Homepage has full accordion, should be teaser only |
| **About** | 3-sentence intro to Kristen + "Meet Kristen" CTA | Full story, credentials, studio space, approach | ⚠️ Reasonable length but could be more concise |
| **Testimonials** | 3-4 client quotes (carousel) | N/A (stays on homepage only) | ✓ Good as-is |
| **FAQ** | Top 5-7 questions (accordion) | N/A (stays on homepage only) | ✓ Good as-is |
| **Booking** | Final conversion CTA + contact info | N/A (modal accessible everywhere) | ✓ Good as-is |

### Recommended Content Strategy

**HOMEPAGE RULE**: "3-sentence rule" - Each showcase section gets max 3 sentences + 1 visual + 1 CTA

#### Services Summary (Homepage)

**Current**: Full ServicesGrid with detailed descriptions
**Should Be**:
```
[SECTION TITLE]: My Tool Kit

[GRID OF 4 CARDS]:
┌─────────────────────────┐  ┌─────────────────────────┐
│ [Tuning Fork Image]     │  │ [Gyrotonic Equipment]   │
│ Biofield Tuning         │  │ Gyrotonic Movement      │
│ ──────────────────────  │  │ ──────────────────────  │
│ Sound healing with      │  │ Flowing 3D movement     │
│ tuning forks to clear   │  │ for posture, strength,  │
│ energy blockages and    │  │ and nervous system      │
│ restore natural flow.   │  │ regulation.             │
│ [Learn More →]          │  │ [Learn More →]          │
└─────────────────────────┘  └─────────────────────────┘

┌─────────────────────────┐  ┌─────────────────────────┐
│ [Breathwork Image]      │  │ [Integration Image]     │
│ Breathwork              │  │ Complete Integration    │
│ ──────────────────────  │  │ ──────────────────────  │
│ Conscious breathing to  │  │ 90-min combination of   │
│ uplift energy, improve  │  │ breathwork, movement,   │
│ circulation, and bring  │  │ and sound healing for   │
│ mental clarity.         │  │ deep transformation.    │
│ [Learn More →]          │  │ [Learn More →]          │
└─────────────────────────┘  └─────────────────────────┘

[CTA BUTTON]: View All Services & Pricing →
```

#### Learn Summary (Homepage)

**Current**: Full LearnAccordion with all methodology details
**Should Be**:
```
[SECTION TITLE]: How It Works

[INTRO TEXT]:
Your body operates as both a physical and electrical system. Thoughts, emotions,
and experiences create "static" and noise. I use sound healing, movement, and
breathwork to help you clear that static and restore your natural flow.

[VISUAL]: Conceptual diagram (body as electrical system)

[TEASER TEXT]:
Each modality addresses a different aspect of your system. Not sure which is
right for you?

[CTA BUTTON]: Learn About the Modalities →
```

#### About Summary (Homepage)

**Current**: AboutSection with reasonable content
**Should Be**:
```
[SECTION TITLE]: Meet Your Bio-Electrician

[IMAGE]: Kristen headshot (left side)

[TEXT (right side)]:
I'm Kristen Slabaugh, and I see myself as a "bio-electrician" — someone who
works with your body's electrical system using sound and frequency. My role
isn't to "fix" you (you're not broken), but to listen and support your body's
natural healing intelligence.

I'm trained in transpersonal psychology, Biofield Tuning, the Gyrotonic®
Method, and breathwork. My approach is gentle, trauma-aware, and focused on
lasting integration rather than quick fixes.

[CTA BUTTON]: Read My Story →
```

---

## Visual Asset Inventory & Gaps

### Current Assets (Existing)

**Homepage Visuals**:
1. ✓ Hero background image (abstract/conceptual)
2. ⚠️ Service icons/images (may need replacement with photos)
3. ✓ About section image (generic wellness image)
4. ❌ Studio photos (NONE)
5. ❌ Kristen portraits (NONE)
6. ❌ Service-specific images (NONE)

### Required Visual Assets (Priority Order)

#### P0 - Critical (Must Have for Launch)

**Studio Photos** (Location selling point):
1. **Exterior shot showing Lake Zurich** - Hero image for About page
   - Must show: Studio entrance + Lake Zurich view in background
   - Purpose: Emphasize lakefront location (key differentiator)
   - Size: 1920x1080px (landscape)
   - Format: WebP optimized

2. **Treatment room interior** - Services page hero
   - Must show: Treatment table, tuning forks visible, calming setup
   - Purpose: Build trust, show professional environment
   - Size: 1920x1080px (landscape)
   - Format: WebP optimized

3. **Gyrotonic Pulley Tower in use** - Movement section
   - Must show: Equipment + person demonstrating movement
   - Purpose: Demystify equipment, show professionalism
   - Size: 1200x800px (landscape)
   - Format: WebP optimized

**Kristen Photos**:
4. **Professional headshot** - About page hero + homepage about section
   - Style: Warm, approachable, professional (not corporate)
   - Background: Neutral or studio setting
   - Size: 800x800px (square), 1200x800px (landscape crop)
   - Format: WebP optimized

#### P1 - High Priority (Improves Conversions)

**Service-Specific Images**:
5. **Tuning fork session in action** - Biofield Tuning sections
   - Must show: Tuning fork held near client (face obscured for privacy)
   - Purpose: Show what actually happens in a session
   - Size: 1200x800px
   - Format: WebP optimized

6. **Breathwork session** - Breathwork sections
   - Must show: Client in comfortable position, Kristen guiding
   - Purpose: Visualize the practice
   - Size: 1200x800px
   - Format: WebP optimized

**Location Assets**:
7. **Google Maps embed** - Services "What to Expect" + About "Studio Space"
   - Address: Tiefenweg 5A, 8804 Au ZH
   - Style: Light theme, no excessive markers
   - Implementation: iframe embed with proper accessibility

#### P2 - Nice to Have (Polish)

**Conceptual Illustrations**:
8. **Body as electrical system diagram** - Learn page hero
   - Style: Clean, medical spa aesthetic (not too "woo-woo")
   - Content: Body silhouette + energy field visualization
   - Size: 800x600px
   - Format: SVG or optimized PNG

9. **Decision tree diagram** - Learn "How to Choose" section
   - Content: Flowchart helping users choose modality
   - Style: Swiss precision, minimal, gold accents
   - Size: 1000x600px
   - Format: SVG or optimized PNG

**Supporting Photos**:
10. **Studio waiting area** - About page
11. **Au village context** - Emphasize lakeside location
12. **Public transport connections** - Accessibility emphasis

### Asset Specifications

**Photography Style Guide**:
- **Aesthetic**: Swiss medical spa (clinical + warm)
- **Lighting**: Natural light, soft shadows
- **Colors**: Cream/silk tones, gold accents minimal
- **Composition**: 50% negative space (Swiss minimalism)
- **Privacy**: Client faces obscured or with consent

**Technical Requirements**:
- **Format**: WebP (primary), JPEG (fallback)
- **Optimization**: <200KB per image
- **Dimensions**: 1920x1080 (hero), 1200x800 (section), 800x800 (portrait)
- **Alt Text**: Descriptive + keyword-rich (SEO)

---

## Navigation Flow Diagram

### User Journey Paths

```
ENTRY POINT: Homepage (/)
│
├── PATH 1: Information Seeker (Wants to learn first)
│   │
│   ├── Reads Hero → "Frequency is Everything" intrigues
│   ├── Scrolls to Services Summary → "What's Biofield Tuning?"
│   ├── Clicks "Learn More" on Services card → /services
│   ├── Reads full Biofield Tuning description
│   ├── Still unsure → Clicks "Learn How It Works" → /learn
│   ├── Reads methodology deep dive → "Ah, now I get it!"
│   ├── Decides wants Biofield Tuning → Clicks "Book Session" CTA
│   └── Cal.com modal opens → Books session
│
├── PATH 2: Trust Builder (Needs to vet practitioner)
│   │
│   ├── Reads Hero → Skeptical of "frequency" language
│   ├── Scrolls to About Summary → "Who is this person?"
│   ├── Clicks "Meet Kristen" CTA → /about
│   ├── Reads credentials → "Transpersonal psych + certifications = legit"
│   ├── Reads studio space → "Lakefront location, professional setup"
│   ├── Convinced → Clicks "Book Discovery Call" CTA
│   └── Cal.com modal opens → Books call
│
├── PATH 3: Price Shopper (Wants to compare options)
│   │
│   ├── Reads Hero → Interested but cautious
│   ├── Scrolls to Services Summary → "How much does this cost?"
│   ├── Clicks "View All Services & Pricing" → /services
│   ├── Compares packages → "Taste It package is perfect for trying"
│   ├── Checks "What to Expect" section → "Location works for me"
│   ├── Ready to book → Clicks "Book Session" CTA
│   └── Cal.com modal opens → Books session
│
├── PATH 4: Returning Visitor (Already knows, ready to book)
│   │
│   ├── Arrives at homepage → Familiar with brand
│   ├── Clicks "Book Session" CTA in Hero (no scrolling)
│   └── Cal.com modal opens → Books session
│
└── PATH 5: Mobile Quick Booker (Phone in hand, needs fast action)
    │
    ├── Sees WhatsApp floating button (bottom-right)
    ├── Taps WhatsApp → "Hi Kristen, I'm interested..."
    └── Direct conversation → Books via WhatsApp

ALTERNATIVE ENTRY POINTS:
│
├── Direct to /services (from Google Ads, social media)
│   ├── Reads full pricing → Decides on package
│   ├── Clicks "Book Session" → Cal.com modal
│   └── Books session
│
├── Direct to /learn (from blog post, referral)
│   ├── Reads methodology → Convinced by science
│   ├── Clicks "View Services & Pricing" → /services
│   ├── Chooses package → Books
│   └── Conversion
│
└── Direct to /about (from Instagram, word of mouth)
    ├── Reads Kristen's story → Builds trust
    ├── Clicks "View Services" → /services
    ├── Chooses package → Books
    └── Conversion
```

### Navigation Requirements

**Primary Navigation (Header)**:
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo: The Fountain Studio]  [Home] [Services] [Learn] [About] │
│                                              [Book Session] [DE/EN] │
└─────────────────────────────────────────────────────────────┘
│
├── Desktop (1024px+):
│   ├── Horizontal menu, full width, sticky on scroll
│   ├── Logo left, menu center, Book + Lang right
│   ├── Active page: gold underline + text-gold
│   └── Hover state: smooth gold underline animation
│
├── Tablet (768px-1023px):
│   ├── Same as desktop but tighter spacing
│   └── Book button: full label ("Book Session")
│
└── Mobile (<768px):
    ├── Logo left, hamburger menu right
    ├── Tap hamburger → full-screen overlay
    ├── Menu items: vertical list, large touch targets (48px)
    ├── Active page: gold background on menu item
    └── Close: X icon top-right

```

**Footer Navigation**:
```
┌─────────────────────────────────────────────────────────────┐
│ [Quick Links]          [Contact]            [Follow]        │
│  • Home                Tiefenweg 5A         Instagram       │
│  • Services            8804 Au ZH           Facebook        │
│  • Learn               +41 78 795 00 09                     │
│  • About               info@thefountain...                  │
│  • Book Session                                             │
│                                                              │
│ © 2025 The Fountain Studio | Privacy Policy | Terms        │
└─────────────────────────────────────────────────────────────┘
```

**Active State Logic**:
- Homepage (`/de` or `/en`): "Home" is active (gold underline)
- Services page (`/de/services`): "Services" is active
- Learn page (`/de/learn`): "Learn" is active
- About page (`/de/about`): "About" is active
- Book button: Always gold (CTA), never "active" state

**Language Switcher**:
- Current language: gold text + bold
- Other language: charcoal text + normal weight
- Click behavior: Navigate to same page in other language
  - `/de/services` → `/en/services`
  - `/en/learn` → `/de/learn`

---

## CTA Placement Strategy

### CTA Hierarchy

**Primary CTAs** (Gold button, high prominence):
1. **"Book Your Session"** - Appears on:
   - Homepage hero (top priority)
   - Homepage booking section (final conversion)
   - Services page final CTA
   - Learn page final CTA
   - About page final CTA
   - Header navigation (all pages)
   - Action: Opens Cal.com modal

**Secondary CTAs** (Gold outline button, medium prominence):
2. **"Book Discovery Call"** - Appears on:
   - Learn page final CTA (alternative to booking)
   - About page final CTA (for those needing reassurance)
   - Action: Opens Cal.com modal (15-min call variant)

3. **"View All Services & Pricing"** - Appears on:
   - Homepage services summary (showcase → detail)
   - Learn page final CTA (alternative to booking)
   - Action: Navigate to `/services`

4. **"Learn How It Works"** - Appears on:
   - Homepage learn summary (showcase → detail)
   - Services page (for those needing education)
   - Action: Navigate to `/learn`

5. **"Meet Kristen"** - Appears on:
   - Homepage about summary (showcase → detail)
   - Action: Navigate to `/about`

6. **"View Services"** - Appears on:
   - About page final CTA (alternative to booking)
   - Action: Navigate to `/services`

**Tertiary CTAs** (Text link with arrow, low prominence):
7. **"Learn More" on service cards** - Appears on:
   - Homepage services summary (4 cards)
   - Action: Navigate to `/services#[service-id]` (scroll to specific service)

**Floating CTA** (Always visible):
8. **WhatsApp Button** - Appears on:
   - All pages (fixed bottom-right)
   - Action: Opens WhatsApp chat with pre-filled message

### CTA Button Variants

**Implementation**:
```tsx
// Primary CTA (gold background)
<Button variant="gold" size="lg">
  Book Your Session
</Button>

// Secondary CTA (gold outline)
<Button variant="gold-outline" size="lg">
  Book Discovery Call
</Button>

// Tertiary CTA (text link)
<a href="/services" className="text-gold hover:underline">
  Learn More →
</a>
```

**Max CTA Count Per Page**:
- Homepage: 3 gold buttons (hero, booking section, floating WhatsApp)
- Detail pages: 2 gold buttons (final CTA primary + secondary)
- **Rule**: Never more than 1 gold button visible in viewport at once (except floating WhatsApp)

---

## Content Gaps Analysis

### Comparison: website-copy.md vs Current Implementation

#### Services Page

**Source**: website-copy.md lines 177-263 (87 lines)
**Current**: /services page (383 lines)

| Content Section | Source | Current | Status |
|----------------|--------|---------|--------|
| Complete Integration Experience | ✓ Lines 183-197 | ✓ Lines 60-106 | ✓ COMPLETE |
| Biofield Tuning Packages (4 tiers) | ✓ Lines 199-209 | ✓ Lines 110-143 | ✓ COMPLETE |
| Gyrotonic Movement Packages | ✓ Lines 211-219 | ✓ Lines 147-187 | ✓ COMPLETE |
| Breathwork | ✓ Lines 221-231 | ✓ Lines 191-253 | ✓ COMPLETE |
| Frequency Massage | ✓ Lines 233-247 | ✓ Lines 256-290 | ✓ COMPLETE |
| What to Expect | ✓ Lines 249-259 | ✓ Lines 294-344 | ✓ COMPLETE |
| Final CTA | ✓ Lines 261-263 | ✓ Lines 348-379 | ✓ COMPLETE |

**Verdict**: Services page is **COMPLETE** ✓

---

#### Learn Page

**Source**: website-copy.md lines 3-63 (61 lines)
**Current**: /learn page (266 lines)

| Content Section | Source | Current | Status |
|----------------|--------|---------|--------|
| Introduction & Quote | ✓ Lines 10-21 | ✓ Lines 42-66 | ✓ COMPLETE |
| Biofield Tuning (What/How/Benefits) | ✓ Lines 23-29 | ✓ Lines 70-102 | ✓ COMPLETE |
| Gyrotonic (What/How/Benefits) | ✓ Lines 31-37 | ✓ Lines 106-138 | ✓ COMPLETE |
| Breathwork (What/How/Benefits) | ✓ Lines 39-53 | ✓ Lines 142-181 | ✓ COMPLETE |
| How to Choose Your Approach | ✓ Lines 55-57 | ✓ Lines 185-231 | ✓ COMPLETE |
| Final CTA | ✓ Lines 59-61 | ✓ Lines 235-262 | ✓ COMPLETE |

**Verdict**: Learn page is **COMPLETE** ✓

---

#### About Page

**Source**: website-copy.md lines 113-173 (61 lines)
**Current**: /about page (270 lines)

| Content Section | Source | Current | Status |
|----------------|--------|---------|--------|
| Introduction | ✓ Lines 115-117 | ✓ Lines 42-57 | ✓ COMPLETE |
| You Are Your Own Healer | ✓ Lines 119-123 | ✓ Lines 61-76 | ✓ COMPLETE |
| Mission | ✓ Lines 125-127 | ✓ Lines 80-102 | ✓ COMPLETE |
| Journey to This Work | ✓ Lines 129-131 | ✓ Lines 94-99 | ✓ COMPLETE |
| **Why She Doesn't Want to Fix You** | ✓ Lines 133-135 | ❌ MISSING | ❌ GAP |
| Approach: Bio-Electrician | ✓ Lines 137-139 | ✓ Lines 106-134 | ✓ COMPLETE |
| Credentials | ✓ Lines 141-149 | ✓ Lines 138-163 | ✓ COMPLETE |
| Studio Space | ✓ Lines 151-161 | ✓ Lines 167-205 | ✓ COMPLETE |
| How I Work With You | ✓ Lines 163-169 | ✓ Lines 209-235 | ✓ COMPLETE |
| Final CTA | ✓ Lines 171-173 | ✓ Lines 239-266 | ✓ COMPLETE |

**Verdict**: About page is **95% COMPLETE** - Missing "Why She Doesn't Want to Fix You" section

**Content to Add** (website-copy.md lines 133-135):
```
### Why She Doesn't Want to "Fix" You

The practitioner does not view you as broken. Healing is about listening rather
than fixing. Slow, intuitive unfolding and integration is valued over quick fixes.
By listening to and supporting the body's natural rhythm, deeper coherence and
long-term change are possible.
```

**Placement**: Should go between "Journey to This Work" and "Approach: Bio-Electrician"

---

#### Homepage

**Current**: PageContent.tsx (89 lines) + section components

| Homepage Section | Should Have (Showcase) | Currently Has | Status |
|-----------------|----------------------|---------------|--------|
| Hero | 2-sentence intro + tagline | ✓ Concise hero | ✓ GOOD |
| Services Summary | 4 service cards (3 sentences each) | ServicesGrid (full details) | ❌ TOO DETAILED |
| About Summary | 3-sentence intro + image | AboutSection (reasonable) | ⚠️ OK (could be shorter) |
| Learn Summary | 3-sentence intro + teaser | LearnAccordion (full content) | ❌ TOO DETAILED |
| Testimonials | 3-4 quotes | ✓ Carousel | ✓ GOOD |
| FAQ | 5-7 questions | ✓ Accordion | ✓ GOOD |
| Booking | Final CTA | ✓ BookingSection | ✓ GOOD |

**Verdict**: Homepage needs **SIMPLIFICATION** - Services and Learn sections too detailed

---

### Summary of Gaps

**Content Gaps**:
1. ✓ Services page: COMPLETE
2. ✓ Learn page: COMPLETE
3. ⚠️ About page: 95% complete (missing "Why She Doesn't Want to Fix You" section)
4. ❌ Homepage: Services and Learn sections need simplification (showcase strategy)

**Visual Asset Gaps**:
1. ❌ P0 Critical: Studio photos (exterior + interior + Gyrotonic equipment) - MISSING
2. ❌ P0 Critical: Kristen professional headshot - MISSING
3. ❌ P1 High: Service-specific images (tuning forks, breathwork) - MISSING
4. ❌ P1 High: Google Maps embed - MISSING
5. ⚠️ P2 Nice-to-have: Conceptual diagrams (body as electrical system) - OPTIONAL

**Navigation Gaps**:
1. ❌ Navigation component does NOT exist yet
2. ❌ Active page highlighting not implemented
3. ❌ Mobile hamburger menu not implemented
4. ⚠️ Footer exists but may need updating for multi-page structure

---

## Specification: Navigation Architecture

### Requirements

**FR1 - Multi-Page Navigation**:
- Header navigation component appears on all pages
- Menu items: Home, Services, Learn, About, Book Session
- Active page highlighted with gold underline + text-gold
- Language switcher (DE/EN) with current language highlighted

**FR2 - Mobile Responsive Navigation**:
- Desktop: horizontal menu, sticky on scroll
- Tablet: same as desktop, tighter spacing
- Mobile: hamburger menu → full-screen overlay
- Touch targets ≥ 48px on mobile

**FR3 - Homepage Showcase Strategy**:
- Services section: 4 service cards (max 3 sentences each) + "View All Services" CTA
- Learn section: 3-sentence intro + "Learn How It Works" CTA
- About section: 3-sentence intro + "Meet Kristen" CTA + Kristen headshot
- Each showcase section links to respective detail page

**FR4 - CTA Consistency**:
- Primary CTA: "Book Your Session" (gold button)
- Secondary CTAs: "Book Discovery Call", "View Services & Pricing" (gold-outline)
- Tertiary CTAs: "Learn More" (text link with arrow)
- Max 1 gold button visible per viewport (except floating WhatsApp)

**FR5 - Visual Asset Integration**:
- P0 Critical: Studio photos (4 images), Kristen headshot (1 image)
- P1 High: Service-specific images (3 images), Google Maps embed
- P2 Optional: Conceptual diagrams (2 illustrations)
- All images optimized to WebP, <200KB each

**NFR1 - Performance**:
- Navigation component <5KB gzipped
- Smooth scroll behavior for homepage anchor links
- Lazy load detail page images (below the fold)

**NFR2 - Accessibility**:
- WCAG 2.1 AA compliant navigation
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader friendly (aria-labels, semantic HTML)
- Active page announced to screen readers

**NFR3 - SEO**:
- Semantic HTML (`<nav>`, `<header>`, `<main>`, `<footer>`)
- Proper heading hierarchy (H1 once per page)
- Alt text on all images (descriptive + keywords)
- Canonical tags on all pages

---

## Implementation Priority

### Phase 1: Navigation System (P0 - Blocking)

**Tasks**:
1. Create `components/navigation/MainNav.tsx` (Client Component)
   - Desktop horizontal menu
   - Mobile hamburger menu with overlay
   - Active page detection and highlighting
   - Language switcher integration

2. Update `components/sections/NavigationHeader.tsx`
   - Integrate MainNav component
   - Ensure works on all pages (not just homepage)

3. Update `components/sections/Footer.tsx`
   - Add quick links section (Home, Services, Learn, About, Book)
   - Ensure contact info matches source of truth

4. Test navigation on all pages
   - Homepage: scroll behavior + external links
   - Detail pages: page navigation + booking CTAs
   - Mobile: hamburger menu + touch targets

**Acceptance Criteria**:
- ✓ Navigation appears on all pages
- ✓ Active page highlighted with gold
- ✓ Mobile menu works (hamburger → overlay → close)
- ✓ Language switcher maintains page context (/de/services ⇄ /en/services)
- ✓ Keyboard navigable (Tab, Enter, Escape)
- ✓ Accessibility audit passes (WCAG 2.1 AA)

---

### Phase 2: Homepage Simplification (P0 - Blocking)

**Tasks**:
1. Simplify `components/sections/ServicesGrid.tsx`
   - Reduce to 4 service cards (Biofield, Gyrotonic, Breathwork, Integration)
   - Each card: 3-sentence summary (not full description)
   - Add "Learn More" CTA on each card → `/services#[service-id]`
   - Add "View All Services & Pricing" CTA below grid → `/services`

2. Simplify `components/sections/LearnAccordion.tsx`
   - Replace accordion with simple 3-paragraph intro
   - Remove full methodology details (save for /learn page)
   - Add "Learn How It Works" CTA → `/learn`

3. Simplify `components/sections/AboutSection.tsx` (optional)
   - Reduce to 3-paragraph intro (current is OK but could be shorter)
   - Add "Meet Kristen" CTA → `/about`

**Acceptance Criteria**:
- ✓ Services section ≤ 200 words (currently ~500 words)
- ✓ Learn section ≤ 150 words (currently ~400 words)
- ✓ About section ≤ 150 words (current is OK)
- ✓ Each showcase section has clear "Learn More" CTA
- ✓ Homepage scrollable length reduced by 30%+

---

### Phase 3: Visual Assets (P0 - Critical but External)

**Tasks** (requires photo shoot):
1. **Studio Photography**:
   - Exterior shot (Lake Zurich view)
   - Treatment room interior
   - Gyrotonic Pulley Tower in use
   - Kristen professional headshot

2. **Service Photography**:
   - Tuning fork session in action
   - Breathwork session
   - Integration session (optional)

3. **Location Assets**:
   - Google Maps embed (code-only, no external dependency)
   - Public transport diagram (optional)

**Acceptance Criteria**:
- ✓ All images optimized to WebP, <200KB each
- ✓ Images follow style guide (Swiss medical spa aesthetic)
- ✓ Alt text written for all images (descriptive + SEO)
- ✓ Images integrated into homepage + detail pages

**Timeline**: External dependency (photo shoot) - estimate 2-4 weeks

---

### Phase 4: Content Gap Fill (P1 - High)

**Tasks**:
1. Add missing section to About page:
   - "Why She Doesn't Want to Fix You" (website-copy.md lines 133-135)
   - Placement: between "Journey to This Work" and "Approach: Bio-Electrician"
   - Ensure German translation exists in dictionaries

**Acceptance Criteria**:
- ✓ About page 100% complete vs source content
- ✓ Section flows naturally in narrative
- ✓ German translation accurate

---

### Phase 5: Polish & Optimization (P2 - Nice to Have)

**Tasks**:
1. Create conceptual diagrams:
   - Body as electrical system (Learn page hero)
   - Decision tree (Learn "How to Choose" section)

2. Add optional visual enhancements:
   - Studio waiting area photo
   - Au village context photo
   - Public transport diagram

3. Performance optimization:
   - Image lazy loading (below the fold)
   - Navigation component code splitting
   - Lighthouse audit (Performance, Accessibility, SEO >90)

**Acceptance Criteria**:
- ✓ Lighthouse scores: Performance >90, Accessibility >95, SEO >95
- ✓ All images lazy loaded except above-the-fold
- ✓ Navigation component <5KB gzipped

---

## Decision Log

### Decision 1: Homepage Showcase Strategy

**Decision**: Homepage sections should be "showcases" (3-sentence summaries + CTA), not full content
**Rationale**:
- Current homepage is too long (10+ sections with full content)
- Users overwhelmed with information before conversion opportunity
- SEO benefit: separate pages for each topic (Services, Learn, About) rank better
- Swiss aesthetic: restraint, precision, white space (current violates 50% white space rule)

**Evidence**:
- docs/review-website-from-ales.md: "the site reads more like a long landing page... ideally the homepage would link out to proper standalone landing pages"
- website-copy.md structure assumes separate pages (211 lines of content too much for one page)

**Alternatives Rejected**:
- Keep full content on homepage: Violates Swiss design principles, poor SEO
- Hybrid approach (some full, some showcase): Inconsistent, confusing user experience

---

### Decision 2: Navigation Active State Uses Gold

**Decision**: Active page highlighted with gold underline + text-gold
**Rationale**:
- Consistent with design system (gold = primary action/focus)
- 3% gold usage rule: small underline + text color = minimal gold area
- Clear visual feedback for user orientation

**Evidence**:
- docs/specs/design-system.md: "Champagne Gold (#B8956A) - 3% max usage (CTAs only)"
- Gold used for CTAs (buttons), so navigation active state fits pattern

**Alternatives Rejected**:
- Charcoal bold: Not distinct enough, lacks visual punch
- Background highlight: Uses too much gold (violates 3% rule)

---

### Decision 3: Mobile Navigation Uses Full-Screen Overlay

**Decision**: Hamburger menu opens full-screen overlay (not slide-out drawer)
**Rationale**:
- Swiss precision: full attention on navigation, no distractions
- Better accessibility: larger touch targets, clearer focus
- Modern pattern: used by Apple, luxury brands

**Evidence**:
- Mobile users need 48px touch targets (accessibility requirement)
- Full-screen allows generous spacing between menu items

**Alternatives Rejected**:
- Slide-out drawer: cramped, harder to make accessible
- Bottom sheet: requires swipe gesture, less discoverable

---

### Decision 4: No Navigation Component on Footer (Simplified)

**Decision**: Footer has quick links but not full navigation duplication
**Rationale**:
- Footer is secondary navigation (utility links + contact info)
- Full navigation duplication unnecessary (header is sticky)
- Swiss minimalism: avoid redundancy

**Evidence**:
- Sticky header makes navigation always accessible
- Footer real estate better used for contact info + trust signals

---

## Next Steps

### Immediate Actions (This Session)

1. ✓ Create this navigation architecture analysis document
2. → Present to user for approval
3. → Create detailed task breakdown for Phase 1 (Navigation System)
4. → Update planning.md with Phase 2 specifics (Homepage Simplification)
5. → Update todo.md with granular implementation tasks

### User Decisions Required

**Q1: Visual Assets Timeline**
- Can we proceed with Phase 1-2 (navigation + content) before photos available?
- Estimated photo shoot timeline: 2-4 weeks?
- Should we use placeholder images in interim?

**Q2: Homepage Simplification Aggressiveness**
- "3-sentence rule" strict (max 3 sentences per showcase section)?
- Or more flexible (3-4 paragraphs if needed)?

**Q3: Navigation Component Placement**
- Separate MainNav component? Or integrate into NavigationHeader?
- Technical preference: abstraction vs simplicity?

**Q4: About Page Missing Section Priority**
- Add "Why She Doesn't Want to Fix You" now (Phase 1)?
- Or defer to Phase 4 (content gap fill)?

---

## Appendix: Token Efficiency Notes

**Intelligence-First Approach Applied**:
1. Read 5 files (homepage + 3 detail pages + source content) = ~15K tokens
2. Direct reading (no project-intel.mjs queries) because:
   - Files already known from CLAUDE.md context
   - Recent work documented in planning.md/todo.md
   - No need for discovery phase (architecture defined)

**CoD^Σ Trace**:
```
User Request (navigation analysis)
≫ Read current pages (PageContent + services + learn + about + source)
≫ Identify gaps (content vs implementation)
≫ Map user journeys (5 conversion paths)
≫ Specify requirements (FR1-5, NFR1-3)
≫ Prioritize phases (P0-P2, blocking vs nice-to-have)
→ Deliverable: Comprehensive navigation architecture spec
```

**Evidence**:
- PageContent.tsx:40-74 → Homepage structure
- services/page.tsx:1-383 → Services implementation
- learn/page.tsx:1-266 → Learn implementation
- about/page.tsx:1-270 → About implementation
- website-copy.md:1-267 → Source of truth content

---

**Document Status**: COMPLETE ✓
**Next Action**: User review + approval to proceed with Phase 1
**Dependencies**: None (analysis phase complete)
