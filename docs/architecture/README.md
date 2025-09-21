# The Fountain Studio - Architecture Documentation

## Project Overview

**Project**: The Fountain Studio
**Type**: Single-Page Application (SPA) with multi-language support
**Stack**: Next.js 15, TypeScript, React 19, Tailwind CSS, shadcn/ui
**Deployment**: Vercel
**Timeline**: 7-day MVP (Jan 20-26, 2025)

## System Architecture

### Technology Stack

#### Frontend Framework
- **Next.js 15**: App Router with Server Components
- **React 19**: Latest React features
- **TypeScript**: Type safety throughout

#### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Radix-based component library
- **Custom Design System**: Golden amber color palette (#D4A234)
- **Typography**: Playfair Display (serif) + Inter (sans-serif)

#### Internationalization
- **next-intl**: Full i18n support for German/English
- **Locale Routing**: URL-based language switching
- **Default**: German (de) with English (en) option

#### Integrations
- **Cal.com**: Booking system integration
- **WhatsApp Business**: Direct messaging
- **Supabase**: Authentication and data storage
- **Google Analytics 4**: Conversion tracking
- **AOS**: Animate on scroll library

### Directory Structure

```
the-fountain-studio/
├── app/
│   ├── [locale]/           # Localized pages
│   │   ├── layout.tsx      # Root layout with i18n provider
│   │   └── page.tsx        # Single-page application
│   ├── api/                # API endpoints
│   │   ├── contact/        # Contact form handler
│   │   └── webhook/        # Cal.com webhooks
│   └── globals.css         # Global styles
├── components/
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── About.tsx
│   │   ├── Learn.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   └── Contact.tsx
│   ├── layout/             # Layout components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitch.tsx
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── supabase/          # Supabase clients
│   └── utils.ts           # Utility functions
├── messages/              # Translation files
│   ├── de.json            # German translations
│   └── en.json            # English translations
├── public/
│   └── images/            # Optimized images
├── i18n.ts               # i18n configuration
├── middleware.ts         # Combined i18n + Supabase middleware
└── tailwind.config.ts    # Tailwind configuration
```

## Design Patterns

### Component Architecture

#### 1. Single-Page Narrative Pattern
- All content on one scrollable page
- Section-based navigation with smooth scrolling
- Progressive disclosure of information
- Mobile-first responsive design

#### 2. Server Component Strategy
- Default to Server Components
- Client Components only for interactivity
- Optimized bundle size
- Better SEO performance

#### 3. Internationalization Pattern
```typescript
// Using next-intl for translations
const t = useTranslations('section');
return <h1>{t('title')}</h1>;
```

#### 4. Styling Patterns
- Utility-first with Tailwind CSS
- Component variants with cn() utility
- Custom CSS variables for theming
- Consistent spacing with 8px grid

### Data Flow

```
User Request
    ↓
Middleware (i18n + Auth)
    ↓
Server Component Rendering
    ↓
Client Hydration
    ↓
Interactive Features
```

## Color System

### Primary Palette
- **Golden Amber**: `#D4A234` - Primary brand color
- **Amber Light**: `#E8B954` - Hover states
- **Amber Dark**: `#B8891C` - Active states

### Neutral Palette
- **Cream**: `#F5F1EB` - Background
- **Cream Dark**: `#E8E0D5` - Secondary
- **Black**: `#1A1A1A` - Text
- **White**: `#FFFFFF` - Cards

### CSS Variables
```css
:root {
  --primary: 43 72% 52%; /* Golden amber */
  --background: 36 31% 95%; /* Cream */
  --foreground: 0 0% 10%; /* Black */
}
```

## Performance Optimizations

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Page Speed Score**: > 95

### Optimization Strategies
1. **Static Generation**: Pre-render all content
2. **Image Optimization**: Next.js Image component
3. **Font Optimization**: Google Fonts with display swap
4. **Code Splitting**: Dynamic imports for heavy components
5. **Lazy Loading**: Intersection observer for sections

## Security Considerations

### Authentication
- Supabase Auth with cookie-based sessions
- Server-side session validation
- Protected API routes

### Data Protection
- GDPR/DSGVO compliance
- Cookie consent implementation
- SSL/TLS encryption
- Secure form submissions

## Deployment Architecture

### Hosting
- **Platform**: Vercel
- **Region**: Europe (Frankfurt)
- **CDN**: Global edge network

### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CAL_COM_LINK=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_GA_ID=
```

### CI/CD Pipeline
1. Push to main branch
2. Vercel automatic deployment
3. Preview deployments for PRs
4. Production deployment on merge

## Development Workflow

### Git Strategy
- Main branch protection
- Feature branches for development
- Conventional commits
- PR-based workflow

### Testing Strategy
- Unit tests with Jest
- E2E tests with Playwright
- Visual regression testing
- Accessibility audits

### Code Quality
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Pre-commit hooks

## Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics
- Core Web Vitals tracking
- Error tracking with Sentry

### User Analytics
- Google Analytics 4
- Conversion funnel tracking
- User behavior analysis
- A/B testing capability

## Scalability Considerations

### Current Capacity
- Single-page application
- Static content delivery
- Minimal server-side processing

### Future Scaling
- Database for dynamic content
- CMS integration possibility
- Multi-practitioner support
- Online booking management

---

*Last Updated: January 19, 2025*
*Version: 1.0.0*