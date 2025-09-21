# The Fountain Studio - Product Specification

## Executive Summary
Modern wellness website for a Swiss sound healing practitioner combining Biofield Tuning, Gyrotonic® movement, and breathwork. The site targets self-aware individuals seeking authentic healing experiences through a "bio-electrician" approach to the body's electrical system.

## Product Vision

### Mission Statement
"Building coherence in a chaotic world, one body, one field at a time."

### Core Philosophy
- Practitioner as catalyst, not healer
- Client owns their healing journey
- Process over promises
- Gentle, trauma-aware approach

## Technical Architecture

### Stack
```
Frontend:     Next.js 15 + TypeScript + React 19
Styling:      Tailwind CSS v4 + shadcn/ui
Database:     Supabase (PostgreSQL + Auth)
Deployment:   Vercel (primary) / Netlify (backup)
Languages:    German (DE) + English (EN) + French (FR) + Italian (IT)
```

### Core Packages
```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "@radix-ui/react-*": "latest",
    "@supabase/ssr": "^0.5.0",
    "tailwindcss": "^3.4.0",
    "next-intl": "^3.0.0",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "react-hook-form": "^7.52.0",
    "zod": "^3.23.0",
    "@stripe/stripe-js": "^4.0.0",
    "date-fns": "^3.0.0"
  }
}
```

### Integrations
- **Booking**: Cal.com (primary) / Custom fallback
- **Contact**: WhatsApp Business API
- **Payments**: Stripe + PostFinance + Twint
- **Email**: Resend (primary) / SendGrid (backup)
- **Analytics**: Plausible (privacy-first)
- **Monitoring**: Sentry + Vercel Analytics
- **CMS**: Local MDX / Future: Contentful

## User Experience

### Target Users
1. **Primary**: Women 35-55, higher education, wellness-curious but skeptical
2. **Secondary**: Men 40-60, stress/burnout recovery
3. **Tertiary**: Healthcare professionals seeking complementary approaches

### User Journey
```
Discovery → Education → Trust Building → Booking → Session → Retention
```

### Key Pages
1. **Home**: Hero + value prop + immediate booking CTA
2. **Learn**: Modality education + choosing guidance
3. **Services**: Clear pricing + packages + benefits
4. **About**: Personal story + credentials + studio
5. **FAQ**: Address skepticism + practical info
6. **Booking**: Multiple paths (form + WhatsApp + call)

## Standards & Conventions

### Code Style Guide

#### TypeScript Conventions
```typescript
// ✅ Use interface for object shapes
interface IUser {
  id: string;
  email: string;
  profile: IProfile;
}

// ✅ Use type for unions and intersections
type Status = 'active' | 'pending' | 'inactive';

// ✅ Explicit return types
function calculatePrice(sessions: number): number {
  return sessions * 120;
}

// ✅ Enum for constants
enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled'
}
```

#### React Patterns
- **Server Components by default** - Use 'use client' only when needed
- **Functional components only** - No class components
- **Custom hooks** for shared logic (useBooking, useTranslation)
- **Composition over inheritance** - Small, composable components
- **Props destructuring** - Clear parameter expectations

#### Naming Conventions
| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `BookingCard.tsx` |
| Hooks | camelCase with 'use' | `useBookingState.ts` |
| Utilities | camelCase | `formatCurrency.ts` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_BOOKING_DAYS` |
| Types/Interfaces | PascalCase with prefix | `IBooking`, `TStatus` |
| Files | kebab-case | `booking-system.tsx` |

#### File Organization
```
/app
  /[locale]
    /(marketing)
      /page.tsx
    /(booking)
      /book/page.tsx
    /api
      /booking/route.ts
/components
  /ui           # shadcn components
  /booking      # booking-specific
  /marketing    # landing page components
/lib
  /hooks        # custom hooks
  /utils        # utility functions
  /types        # TypeScript types
  /validators   # Zod schemas
```

### Git Conventions
```bash
# Commit format
<type>(<scope>): <description>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting, no code change
refactor: Code restructuring
test:     Adding tests
chore:    Maintenance

# Examples
feat(booking): add Cal.com integration
fix(i18n): correct German translations
docs(api): update booking endpoint docs
```

### Testing Standards
- **Unit tests**: Jest + React Testing Library (80% coverage)
- **Integration tests**: API endpoints with Supertest
- **E2E tests**: Playwright for critical user flows
- **Visual regression**: Percy for UI consistency
- **Performance**: Lighthouse CI with budgets

## Design System

### Design Tokens
```typescript
// Token structure
const tokens = {
  // Primitive tokens (raw values)
  colors: {
    amber: {
      50: '#FFF9E6',
      500: '#D4A234',
      900: '#7A5F1E'
    }
  },

  // Semantic tokens (meaningful names)
  semantic: {
    primary: '$colors.amber.500',
    background: '$colors.cream.50',
    text: '$colors.gray.900',
    error: '$colors.red.500'
  },

  // Component tokens
  components: {
    button: {
      background: '$semantic.primary',
      hover: '$colors.amber.600'
    }
  }
};
```

### Visual Identity
```scss
// Colors with Swiss market considerations
$primary: #D4A234;        // Golden amber - healing energy
$primary-dark: #B8902C;   // Hover state
$neutral: #F5F1EB;        // Warm cream - calming
$accent: #FFFFFF;         // Pure white - clarity
$text: #1A1A1A;          // Softer than pure black
$text-muted: #6B6B6B;    // Secondary text

// Typography - Premium feel
$heading: 'Playfair Display', serif;    // Elegant headers
$body: 'Inter', sans-serif;             // Clean body text
$mono: 'JetBrains Mono', monospace;     // Code/numbers

// Spacing - 8px grid system
$space-unit: 8px;
$spaces: (
  xs: 4px,
  sm: 8px,
  md: 16px,
  lg: 24px,
  xl: 32px,
  2xl: 48px,
  3xl: 64px
);

// Layout
$container-max: 1280px;
$content-max: 720px;
$breakpoints: (
  mobile: 320px,
  tablet: 640px,
  desktop: 1024px,
  wide: 1280px
);

// Motion
$duration-fast: 150ms;
$duration-base: 300ms;
$duration-slow: 500ms;
$easing-default: cubic-bezier(0.4, 0, 0.2, 1);
$easing-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Atomic Design Structure
```
atoms/       Button, Input, Label, Icon, Badge
molecules/   FormField, Card, Toast, Modal
organisms/   BookingForm, ServiceGrid, Navigation
templates/   PageLayout, BookingFlow, DashboardLayout
pages/       Home, Services, Booking, About
```

### Component Library
- Base components from shadcn/ui
- Custom components for:
  - Service cards with pricing
  - Testimonial carousel
  - Booking widget
  - Session package selector
  - FAQ accordion
  - Contact form with validation

### Accessibility Requirements
- WCAG 2.1 AA+ compliance
- 44-48px touch targets minimum
- High contrast mode support
- Screen reader optimization
- Keyboard navigation throughout

## Features Specification

### Phase 1: MVP (Week 1-2)
- [ ] Static site with all content pages
- [ ] Responsive design (mobile-first)
- [ ] Language switcher (DE/EN)
- [ ] Contact form with email notification
- [ ] WhatsApp click-to-chat button
- [ ] Basic SEO optimization

### Phase 2: Booking System (Week 3-4)
- [ ] Calendar integration
- [ ] Service selection workflow
- [ ] Package purchase options
- [ ] Booking confirmation emails
- [ ] Cancellation policy display
- [ ] Admin booking management

### Phase 3: Enhanced Features (Week 5-6)
- [ ] Client testimonials system
- [ ] FAQ search functionality
- [ ] Newsletter subscription
- [ ] Blog/article system
- [ ] Social proof widgets
- [ ] Performance optimization

### Phase 4: Client Portal (Future)
- [ ] User authentication
- [ ] Session history
- [ ] Package balance tracking
- [ ] Rebooking shortcuts
- [ ] Personal notes/journal
- [ ] Progress tracking

## Service Catalog

### Individual Services
| Service | Duration | Price | Description |
|---------|----------|-------|-------------|
| Biofield Tuning | 60 min | CHF 120 | Sound healing with tuning forks |
| Gyrotonic® | 60 min | CHF 120 | Movement therapy with equipment |
| Breathwork | 45 min | CHF 120 | Cardiovascular breathing program |
| Integration | 90 min | CHF 180 | Combined movement + sound |
| Frequency Massage | 30 min | CHF 75 | Targeted tension relief |

### Packages
| Package | Sessions | Price | Savings |
|---------|----------|-------|---------|
| Taste It | 3 | CHF 345 | CHF 15 |
| Tune It | 6 | CHF 660 | CHF 60 |
| Level It | 10 | CHF 1,050 | CHF 150 |

## Conversion Optimization

### CTAs Strategy
- Primary: "Book Your Session"
- Secondary: "Schedule Discovery Call"
- Tertiary: "Learn More"

### Trust Signals
- Professional certifications display
- Client testimonials (min 6)
- Money-back guarantee mention
- Professional studio photos
- Years of experience counter

### Objection Handling
- FAQ addressing skepticism
- Scientific backing section
- "No spiritual jargon" promise
- Clear pricing transparency
- Cancellation policy upfront

## Content Requirements

### Copy Tone
- Warm but professional
- Educational without condescension
- Clear without jargon
- Authentic without overpromising

### SEO Keywords
- Primary: "sound healing zurich", "biofield tuning switzerland"
- Secondary: "gyrotonic au", "breathwork near zurich"
- Long-tail: "trauma aware healing zurich", "nervous system regulation switzerland"

### Multi-language Considerations
- Professional DE/EN translations
- Cultural adaptation (Swiss German nuances)
- Local SEO for both languages
- Separate sitemap per language

## Performance Targets

### Technical Metrics
- Page load: < 3 seconds
- Time to Interactive: < 5 seconds
- Lighthouse score: > 90
- Core Web Vitals: All green

### Business Metrics
- Booking conversion: > 5%
- Discovery call conversion: > 30%
- Package upsell rate: > 40%
- Client retention: > 60%

## Legal & Compliance

### Requirements
- Swiss healthcare regulations
- GDPR/Swiss data protection
- Cookie consent management
- Terms of service
- Privacy policy
- Health disclaimer

### Policies
- 24-hour cancellation policy
- Refund policy for packages
- Informed consent process
- Data retention guidelines

## Development Workflow

### Git Strategy
```
main
├── develop
├── feature/[feature-name]
├── bugfix/[issue-number]
└── release/[version]
```

### Testing Requirements
- Unit tests for booking logic
- E2E tests for critical paths
- Accessibility testing
- Multi-language testing
- Performance testing
- Cross-browser testing

### Deployment Pipeline
1. Local development
2. Preview on Netlify
3. UAT with client
4. Production deployment
5. Post-launch monitoring

## Success Criteria

### Launch Readiness
- [ ] All pages responsive
- [ ] Booking system functional
- [ ] Multi-language working
- [ ] SEO basics in place
- [ ] Legal pages present
- [ ] Contact forms tested
- [ ] Performance targets met

### Post-Launch Goals (Month 1)
- 50+ unique visitors/day
- 10+ bookings/week
- 5+ discovery calls/week
- < 40% bounce rate
- > 3 min average session

## Swiss Market Considerations

### Regulatory Compliance
- **FADP**: Swiss Federal Act on Data Protection compliance
- **GDPR**: For EU customers visiting Switzerland
- **Healthcare**: Swiss regulations for wellness practitioners
- **Consumer Protection**: Clear terms and cancellation rights
- **Accessibility**: eCH-0059 accessibility guidelines

### Cultural Adaptations
- **Quality Focus**: Premium design and flawless execution
- **Privacy First**: Minimal data collection, maximum transparency
- **Multilingual**: DE/FR/IT/EN with proper Swiss German variations
- **Conservative Design**: Professional, not flashy
- **Trust Signals**: Swiss quality badges, certifications

### Payment Methods
```typescript
// Swiss-specific payment integrations
const paymentMethods = {
  stripe: ['card', 'sepa', 'google_pay', 'apple_pay'],
  local: ['postfinance', 'twint'],
  traditional: ['bank_transfer', 'invoice']
};
```

### Local Integrations
- **Swiss Post**: Address validation API
- **SBB**: Public transport integration for directions
- **Local SMS**: Swiss gateway for appointment reminders
- **Swiss Hosting**: Data residency compliance

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- Design token system implementation
- Component library setup with Storybook
- i18n infrastructure for 4 languages
- Development environment configuration
- Testing framework setup

### Phase 2: Core Features (Week 3-4)
- Homepage and service pages
- Multi-language content management
- Navigation and layout components
- SEO optimization per locale
- Responsive design implementation

### Phase 3: Booking System (Week 5-7)
- Cal.com integration
- Payment processing (Stripe + Swiss methods)
- Email confirmation system
- Admin dashboard for bookings
- Cancellation and rescheduling flow

### Phase 4: Polish & Launch (Week 8-9)
- Performance optimization
- Security hardening
- Accessibility audit
- Analytics integration
- Production deployment

## Quality Assurance

### Pre-Launch Checklist
- [ ] All content translated and reviewed
- [ ] Booking flow tested end-to-end
- [ ] Payment processing verified
- [ ] Mobile responsiveness confirmed
- [ ] Accessibility WCAG 2.1 AA compliant
- [ ] Security scan passed
- [ ] Performance targets met
- [ ] Legal pages reviewed
- [ ] Analytics tracking verified
- [ ] Backup and recovery tested

### Monitoring & Maintenance
- **Uptime**: 99.9% SLA with Vercel
- **Performance**: Real User Monitoring (RUM)
- **Errors**: Sentry with alert thresholds
- **Analytics**: Privacy-first tracking
- **Backups**: Daily automated backups
- **Updates**: Security patches within 24h

## Risk Mitigation

### Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Booking conflicts | Medium | High | Real-time availability checks |
| Language bugs | Low | Medium | Comprehensive i18n testing |
| Performance issues | Low | High | CDN + edge caching |
| Security breach | Low | Critical | Supabase RLS + audits |

### Business Risks
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Low conversion | Medium | High | A/B testing + analytics |
| High cancellations | Low | Medium | Clear policies + reminders |
| Swiss competition | Medium | Medium | Unique positioning |
| Regulatory changes | Low | High | Legal review quarterly |

### Contingency Plans
- **Booking system failure**: Manual booking fallback
- **Payment issues**: Alternative payment methods
- **High traffic**: Auto-scaling with Vercel
- **Data loss**: Point-in-time recovery

## Specification Structure

### Documentation Architecture
```
/docs
  /specs
    ├── design-system.md       # Token system, components
    ├── component-library.md   # UI component catalog
    ├── i18n-strategy.md      # Multi-language approach
    ├── booking-system.md     # Scheduling architecture
    ├── api-architecture.md   # Backend design
    ├── data-models.md        # Database schema
    ├── security-compliance.md # FADP/GDPR compliance
    ├── testing-strategy.md   # Test approach
    ├── deployment-guide.md   # Infrastructure
    └── monitoring-analytics.md # Observability
```

Each specification follows this structure:
1. **Purpose & Scope** - What and why
2. **Key Decisions** - Architectural choices
3. **Implementation Guidelines** - How to build
4. **Success Metrics** - Measurable goals
5. **Dependencies** - Required components

---
*Product Specification v2.0 - The Fountain Studio*
*Last Updated: 2025-09-19*
*Next Review: 2025-01-26 (Post-Launch)*