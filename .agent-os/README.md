# Agent OS - The Fountain Studio

## Product Analysis

### Business Overview
**Name**: The Fountain Studio
**Type**: Boutique sound healing and movement studio
**Location**: Au, near Zurich, Switzerland
**Owner**: Kristen Slabaugh

### Core Services
1. **Biofield Tuning** (Sound Healing) - CHF 120-1050
2. **Gyrotonic® Movement** - CHF 120/session
3. **Breathwork** (Cardiovascular Program) - CHF 120/session
4. **Complete Integration Experience** - CHF 180 (90 min combo)
5. **Frequency Massage** - CHF 75 (30 min targeted)

### Target Audience
- Self-aware individuals in personal growth journey
- Skeptics of commercialized wellness seeking authentic healing
- People dealing with stress, trauma patterns, or feeling "stuck"
- Those seeking gentle, non-invasive therapeutic approaches
- Age range: 30-60, primarily female, higher education/income

### Unique Value Proposition
"The bio-electrician approach" - Working with the body's electrical system through frequency to clear static and restore natural flow, positioning practitioner as catalyst rather than healer.

### Brand Philosophy
- "You are your own healer, I'm a catalyst in your process"
- "Frequency is Everything"
- Trauma-aware, gentle approach
- Process-focused rather than outcome-promised

### Technical Stack
- **Framework**: Next.js 15 with TypeScript
- **UI**: shadcn/ui components + custom Tailwind CSS
- **Database**: Supabase (Auth + PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Languages**: German (DE) and English (EN) with i18n
- **Deployment**: Netlify CLI
- **Integrations Needed**:
  - Calendar booking system (Calendly/Cal.com)
  - WhatsApp Business API
  - Stripe Payment (future capability)
  - Google Maps for studio location
  - Email service (SendGrid/Resend)

### Visual Identity
- **Primary**: Rich golden amber (#D4A234)
- **Neutral**: Warm cream/beige (#F5F1EB)
- **Accent**: Pure white
- **Text**: Black for high contrast
- **Style**: Modern minimalism with subtle esoteric touches
- **Typography**: Clean serif headers, sans-serif body

### Website Structure
1. **Home** - Hero with clear value prop and booking CTA
2. **Learn More** - Educational content about modalities
3. **Services & Prices** - Transparent pricing and packages
4. **About** - Kristen's story and credentials
5. **FAQ** - Address skepticism and concerns
6. **Contact/Booking** - Multiple conversion paths

### Key Features Required
- Multi-language support (DE/EN)
- Service booking system with availability
- Package management (3, 6, 10 session bundles)
- WhatsApp integration for immediate contact
- Testimonial showcase
- Location/directions with public transport info
- Mobile-first responsive design
- WCAG 2.1 AA+ accessibility compliance
- SEO optimization for local search

### Conversion Strategy
- Multiple booking touchpoints throughout site
- Trust signals (credentials, testimonials)
- Clear, jargon-free service explanations
- Discovery call option for uncertain visitors
- Package discounts to encourage commitment
- 24-hour cancellation policy display

### Competition & Differentiation
- **Differentiators**:
  - Anti-spiritual commercialism stance
  - Transpersonal psychology background
  - Combination sessions as signature offering
  - "Bio-electrician" unique positioning
  - Small, intimate practice vs "one of gazillions"

### Business Metrics
- **Primary KPI**: Session bookings per month
- **Secondary KPIs**:
  - Discovery call conversions
  - Package vs single session ratio
  - Client retention rate
  - Average client lifetime value

### Content Requirements
- Service descriptions (provided)
- Practitioner bio and credentials
- FAQ addressing skepticism
- Educational content about modalities
- Testimonials/success stories
- Blog/articles about frequency healing (future)

### Legal & Compliance
- Swiss healthcare regulations compliance
- GDPR/Swiss data protection
- Clear cancellation/refund policies
- Health disclaimer/informed consent
- Professional liability coverage mention

## Development Priorities

### Phase 1: Foundation (Current)
1. Set up Next.js with TypeScript and Tailwind
2. Implement shadcn/ui components
3. Create responsive layout structure
4. Set up i18n for DE/EN support

### Phase 2: Core Features
1. Service pages with pricing
2. Booking system integration
3. WhatsApp contact integration
4. About and credential showcase

### Phase 3: Conversion Optimization
1. Multiple CTAs and booking paths
2. Testimonial system
3. FAQ implementation
4. Discovery call scheduling

### Phase 4: Enhancement
1. Payment integration (Stripe)
2. Client portal for package management
3. Email automation for bookings
4. SEO and performance optimization

### Phase 5: Growth
1. Blog/content system
2. Online session booking capability
3. Workshop/event management
4. Newsletter integration

## Agent OS Configuration

### Specialized Agents
- **ui-ux-spec**: Design system and component architecture
- **brainstormer**: Marketing copy and conversion optimization
- **supabase-specialist**: Database and auth setup
- **postflight-validator**: Accessibility and compliance checks

### Workflow Patterns
- TDD for booking system features
- Browser MCP for E2E testing of conversion flows
- Parallel UI and backend development
- Iterative design refinement with user feedback

### Success Metrics
- Site loads under 3 seconds
- Mobile-first responsive design
- WCAG 2.1 AA+ compliance
- 80%+ Lighthouse scores
- Clear conversion paths with < 3 clicks to booking

---
*Agent OS installed for The Fountain Studio - Swiss wellness practitioner website*