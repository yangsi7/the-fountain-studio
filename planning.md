# Master Plan - The Fountain Studio Website Overhaul

**Status**: ACTIVE
**Version**: 2.0 (Website Redesign)
**Last Updated**: 2025-10-31

---

## Project Overview

**Project Name**: The Fountain Studio Website Overhaul v2.0

**Problem Statement**:
The current website has critical design and architecture issues identified in stakeholder review:
- Cold visual identity (beige gold instead of warm amber, gray gradients)
- Single-page structure limiting SEO and content depth
- Inconsistent button variants and CTA messaging
- Content oversimplified vs. original copy
- Missing organic visual elements (waves, textures)
- Images stretching on tablet viewports
- Button fonts rendering incorrectly (Times New Roman fallback)

**Users**: Wellness seekers in Zurich looking for sound healing, Gyrotonic, and breathwork services

**Core Innovation**:
Pure HSL-based design system migration enabling:
- True amber gold color (#D4A234) vs current beige
- Warm cream/silk alternating backgrounds
- Systematic component variants using semantic tokens
- Multi-page architecture for better SEO and content organization

**Success Criteria**:
1. Design system: 100% HSL token usage, gold color #D4A234, 3% max gold usage
2. Architecture: 4 functional pages (Home, Services, Learn, About) with complete content
3. Performance: Lighthouse scores >90 (Performance, Accessibility, SEO)
4. Visual quality: Wave dividers, cream/silk backgrounds, 18px body text, no image stretching

---

## Architecture (CoD^Σ)

### System Model

```
Website := DesignSystem ⊕ MultiPageArchitecture ⊕ ComponentLibrary ⊕ ContentManagement
DesignFlow := HSL_Tokens ≫ TailwindConfig ≫ Components ≫ Pages
ContentFlow := website-copy.md ≫ i18n_Dictionaries ≫ PageComponents ≫ Rendered_Pages
Integration := NextJS15 ⇄ Shadcn/UI ⇄ TailwindCSS_v4
```

### Key Components

**Component 1**: HSL Design Token System
- **Purpose**: Pure HSL-based semantic color system
- **Dependencies**: globals.css, tailwind.config.ts
- **Interfaces**: CSS variables consumed by Tailwind utilities
- **Evidence**: Tailwind v4 best practices, shadcn/ui HSL pattern

**Component 2**: Multi-Page Route Architecture
- **Purpose**: SEO-optimized separate pages for Services, Learn, About
- **Dependencies**: Next.js App Router, i18n dictionaries
- **Interfaces**: app/[lang]/{page}/page.tsx structure
- **Evidence**: Next.js 15 routing patterns

**Component 3**: Systematic Component Variants
- **Purpose**: Gold-specific button variants, consistent CTAs
- **Dependencies**: Shadcn button component, CVA
- **Interfaces**: buttonVariants exported from components/ui/button.tsx
- **Evidence**: CVA documentation, shadcn customization guide

**Component 4**: Organic Visual System
- **Purpose**: Wave dividers, textures for warmth
- **Dependencies**: SVG components, optimized PNGs
- **Interfaces**: WaveDivider React component
- **Evidence**: Modern wellness website patterns

### Data Flow

```
User Request → Next.js Router → [lang] Detection → getDictionary(lang)
                                      ↓
                               Page Component (SSR)
                                      ↓
                           Section Components + Design Tokens
                                      ↓
                        Rendered HTML with HSL Colors
```

---

## Components (Must-Have for v2.0)

### Phase 1: Design System Foundation [BLOCKING]

1. ✓ **HSL Color System** - COMPLETE
   - **Purpose**: Pure HSL semantic tokens for all colors
   - **Key Features**: Gold #D4A234, cream #F5F1EB, semantic naming
   - **Dependencies**: None
   - **Status**: COMPLETE
   - **Evidence**: app/globals.css:6-87, tailwind.config.ts:15-38

2. ✓ **Tailwind Config Cleanup** - COMPLETE
   - **Purpose**: Remove HEX colors, use only HSL references
   - **Key Features**: 18px base font size, CSS var references only
   - **Dependencies**: HSL Color System
   - **Status**: COMPLETE
   - **Evidence**: tailwind.config.ts:15-88

3. ✓ **Typography System Fix** - COMPLETE
   - **Purpose**: 18px body text, proper font loading
   - **Key Features**: Serif headings, sans-serif body, size hierarchy
   - **Dependencies**: Next.js font optimization
   - **Status**: COMPLETE
   - **Evidence**: app/globals.css:122-134, app/layout.tsx:6-18

4. ✓ **Button Gold Variants** - COMPLETE
   - **Purpose**: Systematic gold button system
   - **Key Features**: gold, gold-outline, gold-ghost variants
   - **Dependencies**: HSL Color System, CVA
   - **Status**: COMPLETE
   - **Evidence**: components/ui/button.tsx:23-25

5. ✓ **Wave Graphics & Textures** - COMPLETE (Specification)
   - **Purpose**: Organic visual elements
   - **Key Features**: SVG wave dividers (3 variants), paper grain texture
   - **Dependencies**: None
   - **Status**: SPECIFICATION COMPLETE
   - **Evidence**: docs/sessions/2025-10-31-website-overhaul/wave-graphics-specification.md

### Phase 2: Site Architecture Migration [COMPLETE ✅]

**Completed**: 2025-10-31
**Status**: All 6 tasks complete - Multi-page architecture fully implemented

6. [x] **Services Page** - COMPLETE ✅
   - **Purpose**: Full services content on dedicated page
   - **Key Features**: Complete website-copy.md content, SEO optimized
   - **Evidence**: app/[lang]/services/page.tsx, 8 sections with full content
   - **Status**: COMPLETE (2025-10-31)

7. [x] **Learn Page** - COMPLETE ✅
   - **Purpose**: Approach and methodology content
   - **Key Features**: Educational content, booking CTAs
   - **Evidence**: app/[lang]/learn/page.tsx, modality comparison, wave dividers
   - **Status**: COMPLETE (2025-10-31)

8. [x] **About Page** - COMPLETE ✅
   - **Purpose**: Studio story, founder bio, location
   - **Key Features**: Trust elements, studio visuals
   - **Evidence**: app/[lang]/about/page.tsx, credentials, studio space section
   - **Status**: COMPLETE (2025-10-31)

9. [x] **Navigation Component** - COMPLETE ✅
   - **Purpose**: Multi-page navigation with active states
   - **Key Features**: Mobile responsive, i18n labels, gold highlighting
   - **Evidence**: components/sections/NavigationHeader.tsx, active page detection
   - **Status**: COMPLETE (2025-10-31)

10. [x] **Homepage Simplification** - COMPLETE ✅
    - **Purpose**: Summary sections with CTAs to detail pages
    - **Key Features**: Conversion-focused, clear navigation
    - **Evidence**: app/[lang]/page.tsx, CTAs linking to /services, /learn, /about
    - **Status**: COMPLETE (2025-10-31)

11. [x] **i18n Dictionaries Update** - COMPLETE ✅
    - **Purpose**: Add translations for all new pages
    - **Key Features**: DE/EN support for Services, Learn, About, Navigation
    - **Evidence**: dictionaries/de.json, dictionaries/en.json (updated with all page content)
    - **Status**: COMPLETE (2025-10-31)

### Phase 3: Component System Updates [COMPLETE ✅]

**Completed**: 2025-10-31
**Status**: All 4 tasks complete - 100% design system compliance achieved

12. [x] **CTA Standardization** - COMPLETE ✅
    - **Purpose**: Consistent button usage across site
    - **Key Features**: 5 semantic variants (gold, gold-outline, gold-ghost, charcoal, whatsapp)
    - **Evidence**: components/ui/button.tsx:26-27, all sections using variants
    - **Status**: COMPLETE (2025-10-31)

13. [x] **Design Token Compliance** - COMPLETE ✅
    - **Purpose**: Eliminate all hardcoded colors
    - **Key Features**: No text-white/bg-white/bg-black classes, all semantic tokens
    - **Evidence**:
      - HeroSection.tsx:63-78 (variant="gold")
      - BookingSection.tsx:53-112 (variant="gold", variant="whatsapp")
      - AboutSection.tsx:62-68 (variant="charcoal")
      - ServicesGrid.tsx:92-98 (variant logic simplified)
      - TestimonialsCarousel.tsx:40 (bg-card/90)
    - **Status**: COMPLETE (2025-10-31)

14. [x] **Background Color Migration** - COMPLETE ✅
    - **Purpose**: Warm cream/silk alternating
    - **Key Features**: No gradients, systematic bg-background-white/bg-silk usage
    - **Evidence**:
      - Services page: 8 sections alternating cream/silk
      - Learn page: 6 sections alternating cream/silk
      - About page: 8 sections alternating cream/silk
      - Homepage: white/silk alternating
    - **Status**: COMPLETE (2025-10-31)

15. [x] **Wave Divider Integration** - COMPLETE ✅
    - **Purpose**: Organic visual elements between sections
    - **Key Features**: Alternating colors (silk/cream), flip states for variety
    - **Evidence**:
      - Homepage: 6 wave dividers (completed Phase 1)
      - Services page: 7 wave dividers
      - Learn page: 5 wave dividers
      - About page: 7 wave dividers
    - **Status**: COMPLETE (2025-10-31)

### Phase 4-6: Polish, Trust, Verification [MEDIUM-HIGH]

13-20: Visual polish, responsive fixes, trust elements, SEO, testing (see detailed tasks in todo.md)

---

## Technology Stack

### Frontend
- **Framework**: Next.js 15.1.5 (App Router, React 19)
- **Styling**: Tailwind CSS v4 + pure HSL design tokens
- **UI Components**: shadcn/ui (New York style) + custom variants
- **Fonts**: next/font/google (Libre Baskerville + Source Sans 3)

### Development
- **Language**: TypeScript 5+ (strict mode)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint with max-warnings=0
- **Type Checking**: tsc --noEmit

### Infrastructure
- **Hosting**: Netlify (auto-deploy from main branch)
- **CI/CD**: GitHub Actions + Netlify build
- **CDN**: Netlify Edge Network
- **Image Optimization**: Custom Netlify loader (AVIF/WebP)

---

## File Structure

```
the-fountain-studio/
├── app/
│   ├── [lang]/                    # Language routing (de/en)
│   │   ├── page.tsx              # Homepage (summary + CTAs)
│   │   ├── services/page.tsx     # NEW - Full services content
│   │   ├── learn/page.tsx        # NEW - Methodology content
│   │   ├── about/page.tsx        # NEW - Studio story + location
│   │   ├── layout.tsx            # Language-aware layout
│   │   └── dictionaries.ts       # Dictionary loader
│   ├── globals.css               # MODIFIED - Pure HSL tokens
│   └── layout.tsx                # Root layout + fonts
│
├── components/
│   ├── sections/                  # Page sections (modified)
│   ├── navigation/                # NEW - MainNav component
│   ├── ui/                        # shadcn components (modified)
│   │   ├── button.tsx            # MODIFIED - Gold variants added
│   │   └── wave-divider.tsx      # NEW - Organic dividers
│   └── theme-switcher.tsx
│
├── dictionaries/
│   ├── de.json                    # MODIFIED - New pages content
│   └── en.json                    # MODIFIED - New pages content
│
├── public/images/
│   ├── studio/                    # NEW - Studio photos
│   └── textures/                  # NEW - Organic textures
│
├── tailwind.config.ts             # MODIFIED - HSL-only colors
│
├── docs/
│   ├── sessions/2025-10-31-website-overhaul/  # NEW - Research artifacts
│   ├── specs/                     # Design system, components
│   └── guides/                    # Development guidelines
│
├── planning.md                    # THIS FILE
├── todo.md                        # Task tracking
├── event-stream.md                # Session log
└── workbook.md                    # Current context
```

---

## Phases and Milestones

### Phase 1: Design System Foundation (Days 1-2) [BLOCKING]

**Goal**: Establish pure HSL design token system

**Milestones**:
- [x] M1.1: HSL color system migrated (globals.css)
- [x] M1.2: Tailwind config cleaned up (HEX removed, 18px base)
- [x] M1.3: Typography system fixed (font loading, sizes)
- [x] M1.4: Button gold variants added
- [ ] M1.5: Wave graphics and textures created

**Deliverables**:
- Pure HSL token system in globals.css
- Gold color #D4A234 implemented
- Button variants: gold, gold-outline, gold-ghost
- 18px body text on desktop
- SVG wave dividers + texture assets

**Status**: 100% complete (5/5 tasks done) ✅ Phase 1 COMPLETE

### Phase 2: Multi-Page Architecture (Days 3-5) [CRITICAL]

**Goal**: Create separate pages for Services, Learn, About with full content

**Key Learnings from Phase 1 Applied**:
- HSL tokens established - use consistent color system across all pages
- Wave dividers available - integrate between sections on each page
- Font system working correctly - maintain 18px body text on all pages
- Component patterns validated - extend same atomic design approach

**Milestones**:
- [ ] M2.1: Services page created with full content from website-copy.md (45 lines)
  - Complete Integration Experience (90 min)
  - Biofield Tuning packages (4 tiers: Tune Up, Taste It, Tune It, Level It)
  - Gyrotonic/Gyrokinesis packages (Private, Group, 10-session)
  - Cardiovascular Breathwork
  - Frequency Massage
  - What to Expect section (location, booking, payment, remote options)
  - Wave dividers between service categories

- [ ] M2.2: Learn page created with methodology content from website-copy.md (95 lines)
  - Introduction: Body as electrical system
  - Biofield Tuning detailed explanation (what/how/benefits)
  - Gyrotonic System detailed explanation
  - Breathwork detailed explanation
  - "How to Choose Your Approach" comparison table
  - CTAs: Book discovery call + View services
  - Wave dividers between modality sections

- [ ] M2.3: About page created with studio story from website-copy.md (71 lines)
  - Introduction: You Are Your Own Healer
  - Mission statement
  - Journey to This Work
  - Why She Doesn't Want to "Fix" You
  - Approach: The 'Bio-Electrician'
  - Credentials/Certifications (4 sections)
  - The Studio Space (location, access, environment, options)
  - How I Work With You (trauma-aware, your pace, integration)
  - Wave dividers between major sections

- [ ] M2.4: Navigation component implemented with active states
  - Desktop: Horizontal nav with gold highlight on active page
  - Mobile: Hamburger menu with full-screen overlay
  - Language switcher (DE/EN) integrated
  - Logo/brand linking to homepage
  - Use HSL tokens for all colors (--color-gold for active)

- [ ] M2.5: Homepage simplified to summaries + CTAs
  - Hero: Keep as-is (strong conversion focus)
  - Services: 3-sentence summary + "View All Services" CTA
  - About: 3-sentence summary + "Learn About Kristen" CTA
  - Learn: 3-sentence summary + "Explore Modalities" CTA
  - Testimonials: Keep as-is (social proof)
  - FAQ: Keep as-is (conversion support)
  - Booking: Keep as-is (primary CTA)
  - Maintain wave dividers between sections

- [ ] M2.6: i18n dictionaries updated for all pages
  - dictionaries/de.json: Add services, learn, about, navigation keys
  - dictionaries/en.json: Add parallel translations
  - Update Dictionary type in dictionaries.ts
  - Ensure no hardcoded text in new pages
  - Professional German translations (native speaker review recommended)

**Deliverables**:
- 4 functional pages (/, /services, /learn, /about)
- Complete content from website-copy.md (211 lines total)
- Navigation with active page highlighting using gold tokens
- SEO meta tags for all pages (title, description, OG tags, JSON-LD)
- i18n support for DE/EN with type-safe dictionaries
- Wave dividers integrated throughout for organic flow
- Consistent HSL token usage across all pages

**Technical Approach**:
- Create `app/[lang]/services/page.tsx` as async Server Component
- Create `app/[lang]/learn/page.tsx` as async Server Component
- Create `app/[lang]/about/page.tsx` as async Server Component
- Create `components/navigation/MainNav.tsx` as Client Component (needs active state)
- Use same section component pattern from homepage (atomic design)
- All new components use design tokens (no hardcoded colors)
- SEO meta via Next.js Metadata API in each page.tsx

**Status**: ✅ COMPLETE (2025-10-31) - All 6 components delivered

### Phase 3: Component Updates (Days 6-7) [HIGH]

**Goal**: Systematic component conformance and visual polish

**Key Learnings from Phase 1 Applied**:
- ✅ Wave dividers already implemented and integrated (6 instances on homepage)
- HSL tokens working correctly - ensure all sections use them
- Button variants exist (gold, gold-outline, gold-ghost) - audit actual usage

**Milestones**:
- [ ] M3.1: CTA standardization complete
  - Audit all CTA buttons across all pages (homepage + 3 new pages)
  - Limit to 3 variants max: primary (gold), secondary (gold-outline), tertiary (gold-ghost)
  - Limit to 3 CTA text variations: "Book Now", "Learn More", "Contact Us"
  - Remove any inconsistent button colors (ensure no hardcoded values)
  - Document button usage guidelines in design system

- [ ] M3.2: Background colors migrated (cream/silk alternating)
  - Audit all section backgrounds across all pages
  - Replace gradient backgrounds with solid cream (#F5F1EB) or silk (#F8F6F3)
  - Establish alternating pattern: silk → cream → silk → cream
  - Update all section components to use bg-silk or bg-cream classes
  - Verify no gradient CSS remains (grep check)

- [ ] M3.3: Image aspect ratios fixed (iPad viewport issue)
  - Audit all images for stretching on tablet (768px-1024px)
  - Fix Next.js Image component aspect ratio handling
  - Add explicit width/height props or aspect-ratio CSS
  - Test on iPad viewport (768px, 820px, 1024px)
  - Verify no distortion at any breakpoint (375px-1920px)
  - Screenshot verification at 5 key breakpoints

- [ ] M3.4: Design token compliance audit
  - Grep for hardcoded colors: `text-white`, `bg-white`, `text-black`, `bg-black`
  - Replace with semantic tokens: `text-foreground`, `bg-background`, etc.
  - Verify all buttons use `buttonVariants` from CVA
  - Check all sections use HSL tokens from globals.css
  - Document any intentional exceptions

**Deliverables**:
- Max 3 button variants used consistently (gold, gold-outline, gold-ghost)
- Max 3 CTA text variations ("Book Now", "Learn More", "Contact Us")
- Cream/silk alternating backgrounds (no gradients)
- No image stretching on any viewport (375px-1920px verified)
- 100% design token compliance (no hardcoded colors)
- ✅ Wave dividers already integrated (Phase 1 bonus - no work needed)

**Technical Approach**:
- Use `grep -r "text-white\|bg-white\|text-black\|bg-black" components/` for audit
- Use Playwright to capture screenshots at 375px, 768px, 1024px, 1440px, 1920px
- Create component variant audit spreadsheet (button usage across pages)
- Update section backgrounds via Edit tool (batch update)

**Status**: ✅ COMPLETE (2025-10-31) - 100% design system compliance achieved

### Phase 4: Trust Elements (Day 8) [MEDIUM]

**Goal**: Add location, transport, studio visuals

**Key Learnings from Phase 1 Applied**:
- Wave dividers pattern established - use between map and transport sections
- HSL tokens for consistent styling of location components
- Accessibility patterns validated (aria-hidden for decorative) - apply to map iframe

**Milestones**:
- [ ] M4.1: Map embed component created
  - Google Maps iframe embed (Studio location: Tiefenweg 5A, 8804 Au ZH)
  - Styled with HSL tokens (border-color, shadow)
  - Accessible iframe attributes (title, aria-label)
  - Responsive sizing (full width mobile, constrained desktop)
  - Optional: Interactive map with custom styling

- [ ] M4.2: Transport info added to About page
  - Public transport section (train/tram/bus from Zürich)
  - Walking directions from nearest stops
  - Parking information (if available)
  - Lake Zurich proximity emphasized ("lakefront studio")
  - Icons or illustrations for transport modes (optional)

- [ ] M4.3: Studio photos integrated (requires photo shoot)
  - Placeholder images with correct aspect ratios
  - Photo requirements documented:
    - Exterior showing Lake Zurich view
    - Interior treatment room
    - Gyrotonic equipment
    - Waiting area
  - All images optimized to WebP (<200KB each)
  - Alt text emphasizing location + modality
  - Integration points: About page, Services page hero

**Deliverables**:
- Google Maps embed on About page (Studio location visible)
- Public transport directions (clear, actionable)
- Studio photo placeholders with documented requirements
- ✅ Lake Zurich positioning emphasized in copy
- ✅ Accessible map component (keyboard navigable)

**Technical Approach**:
- Create `components/sections/LocationSection.tsx` (Server Component)
- Embed Google Maps via iframe with proper attributes
- Use Next.js Image for studio photos (optimized loading)
- Apply wave divider pattern between location sections
- HSL tokens for all styling (no hardcoded colors)

**Status**: Not started (awaiting Phase 3 completion)
**Note**: Studio photos may be external dependency - plan for phased delivery

### Phase 5: SEO & Testing (Days 9-10) [FOUNDATION]

**Goal**: Production-ready validation

**Milestones**:
- [ ] M5.1: SEO checklist complete
- [ ] M5.2: Performance optimized (Lighthouse >90)
- [ ] M5.3: Accessibility validated (WCAG AA)
- [ ] M5.4: Postflight verification passed

**Deliverables**:
- Lighthouse scores: Performance >90, Accessibility >95, SEO >95
- All acceptance criteria met
- Cross-browser tested
- Production deployed

**Status**: Not started

---

## Success Metrics

### Technical Metrics

| Metric | Target | Current | Measurement |
|--------|--------|---------|-------------|
| HSL Token Usage | 100% | 100% | No HEX in TSX files |
| Gold Color | #D4A234 | #D4A234 | Visual verification |
| Button Font Size | ≥18px | 18px | Base size in variants |
| Body Font Size | 18px desktop | 18px | Tailwind config |
| Page Count | 4 pages | 2 pages | Route structure |
| Lighthouse Performance | >90 | TBD | Lighthouse CI |
| Lighthouse Accessibility | >95 | TBD | Lighthouse CI |
| Lighthouse SEO | >95 | TBD | Lighthouse CI |

### Design Metrics

| Metric | Target | Current | Measurement |
|--------|--------|---------|-------------|
| Gold Usage | ≤3% page area | TBD | Visual audit |
| Background Scheme | Cream/Silk alternating | Gradients | Visual audit |
| Wave Dividers | Present | None | Component exists |
| Image Stretching | None | Tablet issues | Viewport testing |
| CTA Variants | Max 3 | 4+ | Component audit |

---

## Risk Management

### Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Breaking changes in existing components | H | M | Comprehensive testing before migration |
| HSL color rendering inconsistencies | M | L | Cross-browser testing |
| Font loading failures | M | L | Proper next/font configuration verified |
| Image optimization issues | L | L | Netlify loader already working |

### Business Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Content not matching stakeholder expectations | H | M | Reference website-copy.md exactly |
| Timeline overrun | M | M | Phased delivery, MVP first |
| SEO regression during migration | M | L | Proper redirects, sitemap updates |

---

## Dependencies

### External Dependencies

- **Next.js 15**: App Router, font optimization, image optimization
- **Tailwind CSS v4**: CSS variables, HSL color functions
- **shadcn/ui**: Base component library with CVA
- **Google Fonts API**: Libre Baskerville + Source Sans 3
- **Netlify**: Hosting, CDN, image optimization

### Internal Dependencies

- **Phase 2** depends on **Phase 1** (design system must be complete)
- **Phase 3** depends on **Phase 2** (pages must exist to update components)
- **Navigation** depends on **all pages** being created
- **Homepage simplification** depends on **detail pages** existing

---

## Decision Log

### Major Architectural Decisions

**Decision**: Pure HSL Color System Migration
- **Date**: 2025-10-31
- **Rationale**: Tailwind v4 best practices, better theming, consistent with shadcn/ui
- **Alternatives**: Keep HEX + HSL mix (rejected - inconsistent)
- **Evidence**: Tailwind CSS docs, shadcn/ui source code
- **Impact**: All components need color token updates, better maintainability

**Decision**: Multi-Page Architecture (Services/Learn/About)
- **Date**: 2025-10-31
- **Rationale**: SEO requirements, content depth, stakeholder feedback
- **Alternatives**: Keep single-page (rejected - doesn't meet requirements)
- **Evidence**: Stakeholder review docs/review-website-from-ales.md
- **Impact**: Routing complexity, more files, better SEO

**Decision**: Gold Color Change (#B8956A → #D4A234)
- **Date**: 2025-10-31
- **Rationale**: Warmer amber vs beige, stakeholder requirement
- **Alternatives**: Keep current gold (rejected - too cold)
- **Evidence**: Stakeholder review: "gold colour feels more like beige/light brown"
- **Impact**: All gold usages need visual verification

**Decision**: 18px Base Font Size
- **Date**: 2025-10-31
- **Rationale**: Better readability, wellness brand standard
- **Alternatives**: Keep 16px (rejected - too small)
- **Evidence**: Accessibility guidelines, wellness website research
- **Impact**: All text sizing reviewed, responsive breakpoints adjusted

**Decision**: Next.js Font Loading Pattern (No Manual Fallbacks)
- **Date**: 2025-10-31
- **Rationale**: Next.js next/font creates complete optimized font stacks automatically; adding manual fallbacks interferes with browser's font selection algorithm
- **Problem Solved**: Source Sans 3 not loading (showing Times fallback) despite correct CSS variables
- **Root Cause**: Redundant fallbacks in tailwind.config.ts (`['var(--font-sans)', 'Source Sans 3', '-apple-system', 'sans-serif']`) conflicting with Next.js optimization
- **Solution**: Reference CSS variable only (`['var(--font-sans)']`) and use `@apply font-sans` in globals.css
- **Evidence**: Phase 1 testing - font loading fixed, 3 Source Sans 3 weights loaded correctly
- **Impact**: All font configuration must follow Next.js pattern (no manual fallback stacks)

**Decision**: Inline SVG Wave Dividers (Not External Assets)
- **Date**: 2025-10-31
- **Rationale**: Zero network requests, perfect responsive scaling, negligible bundle size (~200 bytes per wave)
- **Alternatives Rejected**:
  - External SVG files (rejected - adds network requests)
  - CSS background gradients (rejected - less organic, harder to control)
  - Complex SVG paths (rejected - Bézier curves more efficient)
- **Technical Approach**: React component with Bézier curves, preserveAspectRatio="none", props for variant/color/flip
- **Evidence**: Phase 1 implementation - 6 waves rendering correctly, ~1.2KB total overhead, instant rendering
- **Impact**: All future organic graphics should follow inline SVG pattern for performance

---

## Version History

### Version 2.0 (2025-10-31)
- Website overhaul plan created
- Design system migration to pure HSL
- Multi-page architecture specified
- 6 phases defined with milestones
- Stakeholder review feedback integrated

### Version 1.0 (2025-09-20)
- Initial single-page website launched
- Basic design system established
- Cal.com booking integration
- DE/EN i18n support

---

## Related Documents

- **Todo List**: @todo.md (detailed task breakdown)
- **Review Feedback**: @docs/review-website-from-ales.md (stakeholder critique)
- **Design System Spec**: @docs/specs/design-system.md (current design tokens)
- **Original Content**: @docs/starter-material/draft-content/website-copy.md
- **Session Research**: @docs/sessions/2025-10-31-website-overhaul/ (artifacts)
- **Constitution**: @constitution.md (project principles)

---

## Notes

**Current Focus**: Phase 4 In Progress 🔄 (71% Complete)
- **Phases 1-3**: ✅ COMPLETE (17/24 tasks)
  - Phase 1: Design system foundation (HSL colors, fonts, buttons, waves)
  - Phase 2: Multi-page architecture (Services, Learn, About pages + navigation)
  - Phase 3: Design system compliance (100% semantic tokens, no hardcoded colors)
- **Phase 4**: 🔄 IN PROGRESS (1/3 tasks)
  - T4.1 ✅ Complete: Image aspect ratios fixed
  - T4.2 🔄 In Progress: Texture system 50% (tokens added, utility class pending)
  - T4.3 ⏳ Pending: Wave divider polish
- **Next**: Complete T4.2 (textures), then T4.3 (wave polish)
- **Performance**: Type check passes, dev server runs cleanly, no errors

**Visual Assets Strategy** (User Confirmation):
✅ **Confirmed**: Images are strategically distributed between homepage and detail pages:
- **Homepage**: Uses images for conversion (ServicesGrid, LearnAccordion, AboutSection)
  - Service images: `/images/Kristen-giving-treatment.jpeg`, `/images/service-gyrotonic-movement.jpg`, `/images/service-breathwork.jpg`, `/images/service-integration.jpg`
  - Learn modality images: `/images/learn-biofield.jpg`, `/images/learn-gyrotonic.jpg`, `/images/learn-breathwork.jpg`
  - About: `/images/Kristen-faceshot.jpeg`
  - Hero: `/images/hero-swiss-alps.jpg`
- **Detail Pages (Services/Learn/About)**: Text-focused with full content from website-copy.md
  - Prioritize SEO-rich content and detailed information
  - Images remain on homepage for visual impact and conversion optimization
  - Future Phase 5 will add studio location photos to About page

**Critical Learnings from Phases 1-3** (Apply to Phase 4+):
1. **Font Loading**: Next.js `next/font` handles fallbacks automatically - never add manual fallback stacks in tailwind.config. Reference CSS variables only.
2. **HSL Token System**: Three-tier architecture (primitive → semantic → component) enables consistency. All colors MUST use `hsl(var(--token))` pattern.
3. **Lovable Design Pattern**: NEVER use hardcoded colors in className. Always create variants in shadcn components using semantic tokens.
4. **SVG Performance**: Inline SVG with Bézier curves is optimal - zero network requests, perfect scaling, negligible size (~200 bytes/wave).
5. **Component Patterns**: Atomic design validated - Server Components by default, Client Components only for interactivity. Props-driven variants via CVA.
6. **Accessibility First**: `aria-hidden="true"` for decorative elements. No layout shift via explicit height reservations. WCAG 2.1 AA+ maintained.
7. **Wave Dividers**: Alternating colors (silk/cream) + alternating flip states creates visual variety. Subtle amplitude (20px) maintains Swiss precision.
8. **Gold Usage Discipline**: Gold reserved for CTAs only (buttons). Waves use background colors. 5 button variants cover all use cases.
9. **Testing Workflow**: TypeScript strict mode + Playwright verification + screenshot capture at multiple viewports (375px, 768px, 1920px) catches issues early.
10. **Multi-Page SEO**: Detail pages have full content + SEO meta tags. Homepage summarizes with CTAs. 25 wave dividers integrated across all pages.

---

**Last Review**: 2025-10-31
**Next Review**: Before Phase 2 implementation
**Status**: Phase 1 Complete ✅ (5/5 tasks done) - Ready for Phase 2
