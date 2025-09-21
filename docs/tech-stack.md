# Technology Stack - The Fountain Studio

## Core Technologies

### Frontend Framework
| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Next.js** | 15.0.3 | React framework | App Router, Server Components, ISR support |
| **React** | 19.0.0 | UI library | Latest features, improved performance |
| **TypeScript** | 5.x | Type safety | Reduced bugs, better DX, IDE support |

### Styling & Design System
| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Tailwind CSS** | 3.4.1 | Utility CSS | Mobile-first, rapid development, PurgeCSS built-in |
| **shadcn/ui** | Latest | Component library | Radix UI + Tailwind, copy-paste components |
| **Framer Motion** | 12.23.16 | Animations | Single animation solution, scroll via useInView |
| **tailwindcss-animate** | 1.0.7 | CSS animations | Utility classes for simple animations |

### Internationalization
| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Dictionary-based** | Custom | i18n solution | Simplified DE/EN without middleware complexity |
| **Native Intl API** | Built-in | Date/time formatting | Browser-native, zero dependencies |

### Integrations
| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **Cal.com** | SDK 1.5.3 | Booking system | Professional scheduling, ready-made |
| **WhatsApp Business** | API | Messaging | Direct client communication |
| **Supabase** | Latest | Backend services | Auth, database, real-time |
| **Google Analytics 4** | Latest | Analytics | Conversion tracking, user insights |

### Development Tools
| Technology | Version | Purpose | Justification |
|------------|---------|---------|---------------|
| **pnpm** | 10.4.1 | Package manager | Faster, efficient disk usage |
| **ESLint** | 9.0+ | Linting | Code quality, consistency |
| **TypeScript** | 5.0+ | Type safety | Reduced bugs, better DX |
| **Turbopack** | Built-in | Bundler | Faster development builds |
| **Bundle Analyzer** | 15.0.0 | Analysis | Bundle size optimization |
| **next-pwa** | 5.6.0 | PWA support | Offline capability, app-like experience |

## Architecture Decisions

### Why Single-Page Application?
- **Speed**: Fastest implementation (7 days)
- **Simplicity**: One file to maintain
- **SEO**: Still crawlable with SSG
- **UX**: Natural storytelling flow
- **Mobile**: Intuitive scrolling

### Why Next.js 15?
- **App Router**: Modern React patterns
- **Server Components**: Better performance
- **Built-in i18n**: Routing support
- **Image Optimization**: Automatic
- **Netlify Integration**: Easy deployment with Netlify CLI

### Why Tailwind CSS?
- **Mobile-First**: Default breakpoint system for responsive design
- **Performance**: PurgeCSS removes unused styles
- **Consistency**: Design tokens prevent drift
- **Developer Velocity**: Rapid prototyping with utilities
- **2025 Standard**: Industry-leading CSS framework

### Why shadcn/ui?
- **CRITICAL REQUIREMENT**: ALL components MUST use shadcn MCP tools (mcp__shadcn__*)
- **Quality**: Built on Radix UI primitives
- **Registry-Based**: Components from official shadcn registry ONLY
- **MCP Workflow**: Search → View examples → Add via MCP tool (NO manual creation)
- **Tailwind**: Perfect integration with utility classes
- **Accessibility**: WCAG 2.1 AA+ compliant out of the box
- **Enforcement**: Never manually create or edit components/ui files

### Animation Strategy (Consolidated)
- **Framer Motion Only**: Single library for all animations
- **Scroll Animations**: useInView hook replaces AOS
- **Performance**: 32KB gzipped, optimized runtime
- **Capabilities**: Gestures, layout animations, View Transitions ready
- **Why Not GSAP**: Framer Motion better React integration

### Why Dictionary-based i18n?
- **Simplicity**: No middleware complexity for DE/EN
- **Performance**: Static JSON imports, zero runtime overhead
- **Type Safety**: TypeScript interfaces for dictionaries
- **Maintainability**: Simple JSON files for translators
- **SEO**: Clean /de and /en routes without complexity

## Package Dependencies

### Production Dependencies (Optimized)
```json
{
  "@radix-ui/react-*": "latest",
  "@supabase/ssr": "latest",
  "@supabase/supabase-js": "latest",
  "@tanstack/react-query": "^5.78.0",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "embla-carousel-react": "^8.5.0",
  "framer-motion": "^12.23.16",
  "lucide-react": "^0.511.0",
  "next": "latest",
  "next-themes": "^0.4.6",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hook-form": "^7.54.2",
  "react-intersection-observer": "^9.16.0",
  "react-wrap-balancer": "^1.1.1",
  "sharp": "^0.33.5",
  "tailwind-merge": "^3.3.0",
  "zod": "^3.24.1"
}
```

### Development Dependencies
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "eslint": "^9",
  "eslint-config-next": "15.0.3",
  "postcss": "^8",
  "tailwindcss": "^3.4.17",
  "typescript": "^5"
}
```

## Environment Variables

### Required Variables
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Integrations
NEXT_PUBLIC_CAL_COM_LINK=your_cal_link
NEXT_PUBLIC_WHATSAPP_NUMBER=+41xxxxxxxxx
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email (Server-side)
SENDGRID_API_KEY=your_sendgrid_key
CONTACT_EMAIL=info@fountainstudio.ch

# Optional
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

## Browser Support

### Target Browsers
- Chrome 90+ (75% users)
- Safari 14+ (15% users)
- Firefox 88+ (5% users)
- Edge 90+ (5% users)

### Mobile Support
- iOS Safari 14+
- Chrome Mobile 90+
- Samsung Internet 14+

### Progressive Enhancement
- Core functionality without JS
- Enhanced features with JS
- Graceful degradation
- Polyfills for older browsers

## Performance Budget

### Target Metrics (2025 Standards)
| Metric | Target | Tools |
|--------|--------|-------|
| First Contentful Paint | < 1.2s | Netlify Analytics |
| Largest Contentful Paint | < 2.0s | Lighthouse |
| Time to Interactive | < 3.0s | WebPageTest |
| Cumulative Layout Shift | < 0.05 | Core Web Vitals |
| First Input Delay | < 50ms | Netlify Analytics |
| Total Bundle Size | < 150KB | Bundle Analyzer |
| Image Sizes | < 100KB WebP | Sharp optimization |

## Security Measures

### Headers
```typescript
// next.config.ts security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com *.googletagmanager.com;
style-src 'self' 'unsafe-inline' fonts.googleapis.com;
font-src 'self' fonts.gstatic.com;
img-src 'self' data: https:;
connect-src 'self' *.supabase.co *.google-analytics.com;
```

---

## Key Optimizations (v2.0)

### What We Removed
- **AOS (2.3.4)**: Redundant with Framer Motion's useInView (~20KB saved)
- **next-intl (4.3.9)**: Overkill for simple DE/EN switching
- **date-fns-tz**: Using native Intl API instead
- **@fontsource packages**: Using next/font for optimization

### What We Added
- **@tanstack/react-query**: Server state management for Cal.com
- **sharp**: Image optimization with WebP generation
- **react-wrap-balancer**: Better typography on hero sections
- **embla-carousel-react**: Lightweight carousel for testimonials
- **next-pwa**: Progressive Web App support
- **Netlify Analytics**: Privacy-focused, server-side analytics

### Performance Improvements
- **Bundle Size**: ~20KB reduction from animation consolidation
- **Image Loading**: WebP format with Sharp (60% smaller)
- **Font Loading**: next/font with preloading
- **Code Splitting**: Automatic with Next.js App Router
- **Caching Strategy**: PWA service worker for assets

### Modern Features Leveraged
- **React 19**: View Transitions API ready
- **Container Queries**: Component-level responsiveness
- **CSS clamp()**: Fluid typography without JS
- **Suspense Boundaries**: Progressive enhancement
- **Server Components**: Improved initial load

---

*Last Updated: January 20, 2025*
*Version: 2.0.0 - Optimized Tech Stack*