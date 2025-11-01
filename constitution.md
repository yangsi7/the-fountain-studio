# Technical Constitution: The Fountain Studio

**Version**: 1.0.0
**Ratified**: 2025-10-31
**Derived From**: `product.md` v1.0.0
**Status**: Active

**Relationship**: This constitution is COMPLEMENTARY to `.claude/shared-imports/constitution.md` (Intelligence Toolkit). Intelligence Toolkit principles govern development PROCESS; this constitution governs The Fountain Studio's technical DECISIONS.

---

## Preamble

This constitution establishes technical principles derived FROM user needs documented in product.md. Every principle traces back to specific user pain points, ensuring all technical decisions serve user value delivery.

**Derivation Philosophy**: User Need ≫ Capability Required → Technical Approach ≫ Specific Constraint

**Governance**: All development decisions MUST align with these articles. Deviations require constitutional amendment with traceability to new user needs.

---

## Article I: Architecture Principles

### §1.1 Server-First Architecture with Selective Client Interactivity

**Principle**: Default to Next.js Server Components; use Client Components only for interactivity requiring browser APIs.

**Derivation (CoD^Σ)**:
```
Sofia's Pain 3 (Wellness industry overwhelm + booking friction)
≫ Need fast, friction-free digital experience
≫ Fast initial page loads required
→ Minimize JavaScript bundle size
≫ Server Components by default (zero JS to client)
∘ Client Components only for: booking modals, forms, navigation interactions
```

**Evidence**:
- product.md:122-125 - "Frustrated by websites without clear booking... impossible with her schedule"
- product.md:133 - "Swiss-Quality Digital Experience... Premium aesthetic that matches her expectations"
- Current: `app/[lang]/page.tsx` uses Server Components, `PageContent.tsx` wraps client-only features

**Constraints**:
- ✓ Page components are async Server Components by default
- ✓ Client Components marked with `'use client'` only when necessary
- ✓ No global state in Server Components
- ✗ Never fetch data in Client Components that could be fetched server-side

---

### §1.2 Dictionary-Based Internationalization (No Middleware)

**Principle**: Language routing via `[lang]` dynamic segments with dictionary imports; no middleware complexity.

**Derivation (CoD^Σ)**:
```
Sofia's Pain 3 (Booking friction) + Anna's Pain 3 (Wellness overwhelm)
≫ Need instant comprehension in native language (DE/EN)
≫ Zero latency for language switching
→ Static dictionaries loaded at request time (no middleware overhead)
≫ `/de` and `/en` routes with getDictionary() helper
∘ Type-safe Dictionary interface prevents missing translations
```

**Evidence**:
- product.md:28 - "Demographic skews toward women 30-55... Zürich area" (German primary)
- product.md:133 - "Bilingual website (DE/EN)... Swiss expectations for quality"
- Current: `app/[lang]/dictionaries.ts` with typed Dictionary exports

**Constraints**:
- ✓ All text content sourced from `dictionaries/de.json` and `dictionaries/en.json`
- ✓ Dictionary type exported for compile-time validation
- ✓ Fallback to German (DE) for invalid locales
- ✗ Never hardcode user-facing text in components
- ✗ No i18n middleware (adds latency, complexity)

---

### §1.3 Component Composition via shadcn/ui Registry

**Principle**: All UI primitives installed from shadcn/ui registry; custom components only for domain-specific compositions.

**Derivation (CoD^Σ)**:
```
Sofia's Frustration (Wellness industry overwhelm + credibility concerns)
≫ Need consistent, professional UI that signals Swiss quality
≫ Design system with proven accessibility and patterns
→ shadcn/ui components (Radix UI primitives + Tailwind)
≫ Atomic design: Atoms (Button, Input) → Molecules (ServiceCard) → Organisms (HeroSection)
∘ Ensures WCAG 2.1 AA+ compliance baseline
```

**Evidence**:
- product.md:76 - "Swiss Medical Spa Aesthetic Online: Premium, minimalist website"
- product.md:133 - "Premium aesthetic that matches her expectations for Swiss quality"
- Current: `components.json` configured, `components/ui/` contains shadcn components

**Constraints**:
- ✓ Install components via `pnpm dlx shadcn@latest add [component]`
- ✓ Never manually create components in `components/ui/`
- ✓ Extend via composition (wrap shadcn components in custom molecules/organisms)
- ✗ Never modify shadcn component internals directly

---

### §1.4 Supabase Fluid Compute Pattern

**Principle**: Always create Supabase server client inside function scope; never in global scope.

**Derivation (CoD^Σ)**:
```
Sofia's Pain 1 (Nervous system dysregulation requiring immediate relief)
≫ Need serverless functions that scale instantly (no cold start delays)
≫ Fluid compute optimization required
→ Supabase client created per-request (not global)
≫ Cookie-based session management
∘ Middleware refreshes sessions transparently
```

**Evidence**:
- product.md:129 - "After 3 sessions, she notices sleeping through the night" (need reliable system)
- product.md:133 - "Instant Cal.com booking - no phone calls, no friction"
- Current: `lib/supabase/server.ts` documents pattern in comments

**Constraints**:
- ✓ `await createClient()` inside every function using Supabase
- ✓ Cookie-based sessions (secure, httpOnly)
- ✓ Middleware at `/middleware.ts` refreshes sessions
- ✗ Never `const supabase = createClient()` in global scope

---

## Article II: Data & State Management

### §2.1 Server-Side Data Fetching with React Query (Client-Side)

**Principle**: Fetch data in Server Components; use React Query only for client-side mutations and optimistic updates.

**Derivation (CoD^Σ)**:
```
Sofia's Goal (Feel like herself again - not constantly depleted)
≫ Need instant feedback when booking (no waiting, no uncertainty)
≫ Optimistic UI updates for form submissions
→ Server Components fetch initial data (zero client waterfall)
≫ React Query handles client mutations (booking, contact form)
∘ Instant feedback while request processes
```

**Evidence**:
- product.md:60 - "Frictionless Booking: Bilingual website with instant Cal.com scheduling"
- product.md:133 - "no phone calls, no friction"
- Current: `@tanstack/react-query` in package.json for form handling

**Constraints**:
- ✓ Server Components fetch data during SSR (async/await)
- ✓ React Query for form submissions, optimistic updates
- ✓ Loading states with Suspense boundaries
- ✗ Never fetch in useEffect when Server Component can fetch

---

### §2.2 Form Validation with Zod + React Hook Form

**Principle**: Client-side validation with Zod schemas; server-side validation with same schemas.

**Derivation (CoD^Σ)**:
```
Sofia's Pain 3 (Booking friction - bad experiences with unqualified practitioners)
≫ Need confidence that contact/booking forms work correctly
≫ Immediate feedback on form errors (no submit-and-wait)
→ Client-side Zod validation (instant error messages)
≫ Server-side Zod validation (security, data integrity)
∘ Shared schema ensures consistency
```

**Evidence**:
- product.md:123-125 - "Tried one practitioner who wasn't qualified (bad experience, wasted money, lost trust)"
- product.md:133 - "Instant Cal.com booking... Premium aesthetic"
- Current: `zod` + `react-hook-form` + `@hookform/resolvers` in package.json

**Constraints**:
- ✓ Define Zod schemas in `lib/schemas/`
- ✓ Use `zodResolver` with React Hook Form
- ✓ Server Actions validate with same Zod schema
- ✗ Never trust client-side validation alone

---

## Article III: Performance & Optimization

### §3.1 Image Optimization via Netlify (No Sharp Bundling)

**Principle**: Use Netlify's image CDN with custom loader; avoid bundling sharp to reduce function size.

**Derivation (CoD^Σ)**:
```
Sofia's Behavior (Tech-savvy, expects seamless digital experiences)
≫ Need fast page loads (< 1.5s First Contentful Paint)
≫ Premium Swiss quality expectations
→ Optimized images without bloating serverless functions
≫ Netlify Image CDN (automatic AVIF/WebP)
∘ Custom loader prevents sharp bundling (reduces function size 80%)
```

**Evidence**:
- product.md:89 - "expects seamless digital experiences, books everything online"
- product.md:133 - "Premium aesthetic that matches her expectations for Swiss quality"
- Current: `next.config.ts` uses custom loader at `lib/netlify-image-loader.ts`

**Constraints**:
- ✓ `loader: 'custom'` in next.config.ts
- ✓ Custom loader at `lib/netlify-image-loader.ts`
- ✓ Images in `public/images/` optimized (WebP preferred)
- ✓ Formats: AVIF, WebP (automatic by Netlify)
- ✗ Never bundle sharp in dependencies for production

---

### §3.2 Progressive Enhancement with Framer Motion

**Principle**: Animate with Framer Motion only after content visible; no animation blocks initial render.

**Derivation (CoD^Σ)**:
```
Sofia's Frustration (Overwhelmed by wellness industry noise)
≫ Need immediate content comprehension (not distracted by animations)
≫ Swiss precision: motion enhances, never distracts
→ Content-first rendering (no animation delays)
≫ Framer Motion for micro-interactions (hover, scroll-triggered)
∘ Reduced motion preference respected (prefers-reduced-motion)
```

**Evidence**:
- product.md:98 - "Overwhelmed by wellness industry noise... Time-starved"
- docs/specs/design-system.md:24 - "Swiss Medical Spa Principles: Clinical precision"
- Current: `framer-motion` for subtle animations, not blocking

**Constraints**:
- ✓ Animations are progressive enhancement (content visible without JS)
- ✓ Respect `prefers-reduced-motion` media query
- ✓ Use `initial={{ opacity: 0 }}` with viewport triggers (not on mount)
- ✗ Never animate critical content on initial page load

---

### §3.3 Bundle Size Limits

**Principle**: Initial bundle < 200KB; enforce with bundle analyzer.

**Derivation (CoD^Σ)**:
```
Sofia's Context (Commute to Zürich - mobile network, time pressure)
≫ Need fast mobile experience (potentially slower network)
≫ Instant comprehension on first visit
→ Minimal JavaScript to browser
≫ Server Components default + code splitting
∘ Bundle analyzer in CI to prevent regressions
```

**Evidence**:
- product.md:102-104 - "Commute to Zürich is 45 minutes, spent answering Slack messages"
- docs/specs/landing-page-spec.json:39 - "Bundle size < 200KB initial"
- Current: `@next/bundle-analyzer` in devDependencies

**Constraints**:
- ✓ Initial bundle < 200KB (uncompressed)
- ✓ Run `pnpm analyze` before major releases
- ✓ Code-split route segments
- ✗ Never import entire icon libraries (use tree-shaking)

---

## Article IV: Security & Privacy

### §4.1 Security Headers via Netlify

**Principle**: Enforce security headers at CDN level; never rely on application-level only.

**Derivation (CoD^Σ)**:
```
Sofia's Value (Respects credentials and expertise - wants professional operation)
≫ Need confidence that data is secure (booking info, contact details)
≫ Swiss expectations for data privacy
→ Security headers at infrastructure level (defense in depth)
≫ X-Frame-Options, CSP, HSTS via Netlify
∘ Prevents XSS, clickjacking, MITM attacks
```

**Evidence**:
- product.md:94 - "Respects credentials and expertise"
- product.md:123-125 - "Tried one practitioner who wasn't qualified (wasted money, lost trust)"
- Current: `netlify.toml` enforces X-Frame-Options, X-XSS-Protection, X-Content-Type-Options

**Constraints**:
- ✓ Security headers defined in `netlify.toml`
- ✓ HTTPS only (Netlify enforces)
- ✓ Supabase RLS policies for data access
- ✗ Never store sensitive data in localStorage (use httpOnly cookies)

---

### §4.2 Form Protection (Server Actions)

**Principle**: Server Actions for form handling; validate input server-side with Zod.

**Derivation (CoD^Σ)**:
```
Anna's Pain 3 ("Selfish mom" guilt - every appointment feels like burden)
≫ Need form submissions to work reliably (no wasted time on errors)
≫ Contact form must be secure (prevent spam, ensure delivery)
→ Server Actions with rate limiting (prevents abuse)
≫ Zod validation server-side (prevents injection)
∘ Honeypot fields for bot protection
```

**Evidence**:
- product.md:186-189 - "Every appointment requires coordinating childcare... Cancels appointments last-minute"
- product.md:197 - "Can book/reschedule 24/7 from her phone"
- Current: Server Actions in `app/` directory with validation

**Constraints**:
- ✓ Server Actions for all form submissions
- ✓ Zod validation on server
- ✓ Rate limiting via Supabase RLS or edge middleware
- ✗ Never trust client-provided data without validation

---

## Article V: User Experience & Accessibility

### §5.1 Swiss Medical Spa Design Language

**Principle**: Champagne gold (#B8956A) limited to 3% of viewport; CTAs only.

**Derivation (CoD^Σ)**:
```
Sofia's Values (Skeptical of "woo-woo" but open to science-backed)
≫ Need visual language that signals professionalism (not new-age hippie)
≫ Swiss precision aesthetic (medical spa, not wellness retreat)
→ Restrained use of accent color (clinical precision)
≫ Gold only for conversion actions (book, contact)
∘ Charcoal text + Silk background = calm, credible, professional
```

**Evidence**:
- product.md:94 - "Skeptical of 'woo-woo' but open to science-backed alternatives"
- product.md:76 - "Swiss Medical Spa Aesthetic Online: Premium, minimalist"
- docs/specs/design-system.md:24 - "Champagne Gold (#B8956A) - 3% max usage (CTAs only)"

**Constraints**:
- ✓ Gold (#B8956A) for CTA buttons only
- ✓ Charcoal (#2C2B29) for primary text
- ✓ Silk (#F8F6F3) for background (never pure white)
- ✓ 50% minimum white space per viewport
- ✗ Never use gold for backgrounds or large text blocks

---

### §5.2 WCAG 2.1 AA+ Compliance

**Principle**: All interactive elements meet WCAG 2.1 AA contrast ratios (4.5:1 text, 3:1 UI); keyboard navigable.

**Derivation (CoD^Σ)**:
```
Anna's Frustration (Exhausted, mom-brain, can't focus)
≫ Need UI that's effortless to use (high contrast, clear touch targets)
≫ May use site one-handed while holding baby
→ Accessible by default (benefits everyone, not just disabled users)
≫ High contrast text, 48px touch targets mobile
∘ Keyboard navigation for power users (Sofia types fast)
```

**Evidence**:
- product.md:154-155 - "Exhausted from sleep deprivation... Googles obsessively... couldn't focus"
- product.md:197 - "Can book/reschedule 24/7 from her phone"
- docs/specs/landing-page-spec.json:21-30 - "WCAG 2.1 AA+ compliance"

**Constraints**:
- ✓ Text contrast ≥ 4.5:1 (normal text), ≥ 3:1 (large text 18px+)
- ✓ UI element contrast ≥ 3:1
- ✓ Touch targets ≥ 48px on mobile
- ✓ Keyboard navigation for all interactive elements
- ✓ ARIA labels for screen readers
- ✗ Never rely on color alone to convey information

---

### §5.3 Cal.com Integration Pattern

**Principle**: Cal.com booking via data attributes on buttons; inline embed only for dedicated booking page.

**Derivation (CoD^Σ)**:
```
Sofia's Pain 3 (Booking friction - phone tag impossible with schedule)
≫ Need instant booking without leaving page
≫ Zero cognitive load (no multi-step forms)
→ Cal.com modal triggered by CTA buttons
≫ data-cal-link attribute opens overlay
∘ Script loaded in root layout (available everywhere)
```

**Evidence**:
- product.md:122-125 - "Frustrated by websites without clear booking (has to call, leave voicemail, play phone tag - impossible with her schedule)"
- product.md:60 - "Frictionless Booking: Bilingual website with instant Cal.com scheduling"
- Current: `app/layout.tsx` loads Cal.com script, buttons use data attributes

**Constraints**:
- ✓ Cal.com script in root layout
- ✓ CTA buttons use `data-cal-link` and `data-cal-config` attributes
- ✓ Inline embed only on dedicated booking page
- ✗ Never create custom booking forms (use Cal.com)

---

### §5.4 Mobile-First Responsive Design

**Principle**: Design for 375px viewport first; enhance for larger screens.

**Derivation (CoD^Σ)**:
```
Anna's Context (Phone in one hand while holding baby)
≫ Need full functionality on mobile (primary device)
≫ One-handed operation essential
→ Mobile-first breakpoints (375px → 768px → 1024px → 1280px)
≫ Touch-optimized (48px targets, thumb-reachable CTAs)
∘ Desktop enhancements: multi-column, hover states
```

**Evidence**:
- product.md:151 - "Tech Savviness: High - manages entire household digitally"
- product.md:197 - "Can book/reschedule 24/7 from her phone"
- docs/specs/landing-page-spec.json:19 - "48px minimum touch targets for mobile"

**Constraints**:
- ✓ Base styles for 375px viewport
- ✓ Breakpoints: `sm:768px`, `md:1024px`, `lg:1280px`, `xl:1536px`
- ✓ Touch targets ≥ 48px on mobile
- ✓ Primary CTAs in thumb-reachable zone (bottom third)
- ✗ Never rely on hover states for critical interactions

---

## Article VI: Development Practices

### §6.1 TypeScript Strict Mode

**Principle**: `"strict": true` in tsconfig.json; no implicit any.

**Derivation (CoD^Σ)**:
```
Sofia's Value (Achievement, competence, efficiency)
≫ Need confidence that features work as specified (no runtime errors)
≫ Swiss precision expectations (no "close enough")
→ Type safety prevents entire classes of bugs
≫ TypeScript strict mode catches errors at compile time
∘ Dictionary type ensures translations exist
```

**Evidence**:
- product.md:93 - "Values: Achievement, independence, competence, efficiency"
- product.md:76 - "Swiss Medical Spa Aesthetic... precision"
- Current: `tsconfig.json` has `"strict": true`

**Constraints**:
- ✓ TypeScript strict mode enabled
- ✓ No `any` types (use `unknown` and type guards)
- ✓ Dictionary interface typed for compile-time translation validation
- ✗ Never disable strict checks

---

### §6.2 Test-Driven Development (TDD)

**Principle**: Write tests before implementation; unit tests (Vitest) + E2E tests (Playwright).

**Derivation (CoD^Σ)**:
```
Michael's Pain 2 (No explanation for WHY pain persists - gaslighted by system)
≫ Need confidence that claimed features actually work
≫ Skepticism from past disappointments
→ Testable acceptance criteria (proves features work)
≫ Unit tests verify business logic
∘ E2E tests verify user flows (booking, contact)
```

**Evidence**:
- product.md (Michael section) - "Feels gaslighted by medical system... Loses trust"
- product.md (Michael section) - "Exhaustion from trying 'everything' without lasting results"
- Current: Vitest for unit tests, Playwright for E2E

**Constraints**:
- ✓ Unit tests in `tests/unit/` (Vitest)
- ✓ E2E tests in `tests/e2e/` (Playwright)
- ✓ Write test first (Red → Green → Refactor)
- ✓ Test critical user flows: booking, contact form, navigation
- ✗ Never ship features without tests

---

### §6.3 ESLint Max Warnings = 0

**Principle**: Zero ESLint warnings in CI; treat warnings as errors.

**Derivation (CoD^Σ)**:
```
Sofia's Goal (Make better decisions - not just reactive)
≫ Need codebase that's maintainable (can evolve without breaking)
≫ Swiss quality standards (precision, consistency)
→ Linting enforces best practices
≫ Zero warnings = no technical debt accumulation
∘ CI fails on warnings (prevents degradation)
```

**Evidence**:
- product.md:96 - "Make better decisions (not just reactive)"
- product.md:76 - "Swiss Medical Spa Aesthetic... professionalism and precision"
- Current: `package.json` has `"lint": "eslint . --max-warnings=0"`

**Constraints**:
- ✓ ESLint with Next.js config
- ✓ `--max-warnings=0` in CI
- ✓ Fix warnings before merging
- ✗ Never disable rules without documented justification

---

## Article VII: Deployment & Scalability

### §7.1 Netlify Deployment with Edge Functions

**Principle**: Deploy to Netlify with automatic builds on main branch; use Edge Functions for dynamic routes.

**Derivation (CoD^Σ)**:
```
Sofia's Pain 1 (Nervous system dysregulation - needs immediate relief)
≫ Need system that's always available (no downtime during stress crisis)
≫ Fast response times (impatience when depleted)
→ Global CDN with edge functions (low latency worldwide)
≫ Automatic deployments (no manual release friction)
∘ Rollback capability if issues detected
```

**Evidence**:
- product.md:112-115 - "Sleep suffers... Feels like she's running on fumes and one day will just break down"
- product.md:133 - "Premium aesthetic that matches her expectations for Swiss quality"
- Current: GitHub Actions for automatic deploys

**Constraints**:
- ✓ Netlify deployment via GitHub Actions
- ✓ Automatic builds on main branch push
- ✓ Preview deploys for PRs
- ✓ Environment variables in Netlify dashboard
- ✗ Never commit `.env.local` to repository

---

### §7.2 Environment Variable Management

**Principle**: All secrets in Netlify environment variables; `.env.example` documents required vars.

**Derivation (CoD^Σ)**:
```
Michael's Pain 3 (Skepticism from trying everything - fears scams)
≫ Need confidence that business is legitimate and secure
≫ Data privacy concerns (Swiss data protection standards)
→ Secure credential management (prevents leaks)
≫ Environment variables not in source code
∘ .env.example documents what's needed (developer experience)
```

**Evidence**:
- product.md (Michael section) - "Skeptical of new approaches after so many disappointments"
- product.md:28 - "Switzerland (particularly Zürich area)" (Swiss data protection laws)
- Current: `.env.example` in repo, actual values in Netlify

**Constraints**:
- ✓ Secrets in Netlify environment variables
- ✓ `.env.example` documents all required vars
- ✓ `.env.local` in `.gitignore`
- ✗ Never commit actual credentials to git

---

### §7.3 Caching Strategy

**Principle**: Static assets cached 1 year; images cached 7 days; HTML not cached.

**Derivation (CoD^Σ)**:
```
Sofia's Behavior (Tech-savvy, expects seamless experiences)
≫ Need instant subsequent page loads (return visits)
≫ But also need fresh content (service updates, availability)
→ Aggressive static asset caching (immutable JS/CSS)
≫ Short image cache (7 days - balances speed and freshness)
∘ HTML not cached (instant content updates)
```

**Evidence**:
- product.md:89 - "expects seamless digital experiences"
- product.md:133 - "Instant Cal.com booking... Premium aesthetic"
- Current: `netlify.toml` sets Cache-Control headers

**Constraints**:
- ✓ Static assets (`/_next/static/*`): `max-age=31536000, immutable`
- ✓ Images (`/images/*`): `max-age=604800` (7 days)
- ✓ HTML: `no-cache` (always revalidate)
- ✗ Never cache HTML (prevents stale content)

---

## Derivation Map: User Needs → Technical Principles

### Sofia (Burned-Out Professional) Needs → Architecture

| User Need | Pain Point | Technical Principle | Article §
|-----------|-----------|-------------------|----------
| Instant comprehension | Pain 3: Booking friction | §1.2 Dictionary-Based i18n | I.2
| Fast digital experience | Pain 3: Wellness overwhelm | §1.1 Server-First Architecture | I.1
| Professional credibility | Skeptical of "woo-woo" | §5.1 Swiss Medical Spa Design | V.1
| Zero booking friction | Pain 3: Phone tag impossible | §5.3 Cal.com Integration | V.3
| Instant booking | Pain 3: Time-starved | §2.1 Server-Side Data Fetching | II.1

### Anna (Postpartum Rebuilder) Needs → UX

| User Need | Pain Point | Technical Principle | Article §
|-----------|-----------|-------------------|----------
| Mobile-primary usage | Context: Phone while holding baby | §5.4 Mobile-First Design | V.4
| 24/7 booking access | Pain 3: Childcare coordination | §5.3 Cal.com Integration | V.3
| Effortless UI | Exhausted, mom-brain | §5.2 WCAG 2.1 AA+ | V.2
| Reliable forms | Pain 3: Can't waste time | §4.2 Form Protection | IV.2

### Michael (Chronic Pain Sufferer) Needs → Quality

| User Need | Pain Point | Technical Principle | Article §
|-----------|-----------|-------------------|----------
| Trust system works | Pain 3: Skepticism from failures | §6.2 Test-Driven Development | VI.2
| Credible operation | Pain 2: Gaslighted by system | §6.1 TypeScript Strict Mode | VI.1
| Secure data handling | Pain 3: Fears scams | §4.1 Security Headers | IV.1
| Always available | Pain 1: Chronic pain needs reliability | §7.1 Netlify Deployment | VII.1

---

## Technology Stack (Immutable)

**Current Stack** (DO NOT DIVERGE without constitutional amendment):

### Core
- **Next.js 15**: App Router, Server Components, Server Actions
- **React 19**: Server/Client component model
- **TypeScript 5**: Strict mode
- **pnpm**: Package manager

### UI & Styling
- **Tailwind CSS 3.4**: Utility-first with design tokens
- **shadcn/ui**: Component library (Radix UI + Tailwind)
- **Framer Motion**: Progressive enhancement animations
- **Lucide React**: Icon library

### Data & Auth
- **Supabase**: PostgreSQL + Auth (cookie-based sessions)
- **@supabase/ssr**: Server-side client
- **React Query**: Client-side mutations

### Forms
- **React Hook Form**: Form state
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod + RHF integration

### Booking
- **Cal.com**: `@calcom/embed-react`

### Testing
- **Vitest**: Unit tests
- **Playwright**: E2E tests
- **@testing-library/react**: Component testing

### Deployment
- **Netlify**: CDN + Edge Functions
- **GitHub Actions**: CI/CD

---

## Amendment Process

### Proposing Amendments

1. **Document User Need**: New amendment MUST trace to user need in product.md or new persona
2. **CoD^Σ Derivation**: Show complete derivation chain: Need ≫ Capability → Approach ≫ Constraint
3. **Impact Analysis**: Document which existing principles are affected
4. **Evidence**: Cite product.md line numbers or new user research

### Ratification Requirements

- Amendment must have complete traceability to user needs
- No contradictions with existing principles (or justify override)
- Technical feasibility validated (prototype if necessary)
- Approved by project maintainers

### Version Control

- Major version bump (2.0.0) for breaking changes to existing principles
- Minor version bump (1.1.0) for new principles added
- Patch version bump (1.0.1) for clarifications without semantic changes

---

**Constitution Ratified**: 2025-10-31
**Status**: Active
**Next Review**: When new user needs identified in product.md updates
