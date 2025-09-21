# Architecture Core v4.0

<metadata>
  <version>4.0.0</version>
  <updated>2025-09-19</updated>
  <checksum>pending</checksum>
  <files>30</files>
  <topical_extracts>6</topical_extracts>
</metadata>

## System Architecture

### Project Overview
**Name**: The Fountain Studio
**Type**: Next.js 15+ application with Supabase
**Stack**: Next.js, TypeScript, React 19, Supabase, Tailwind CSS, shadcn/ui, next-intl
**Purpose**: Swiss sound healing & wellness studio website
**Status**: i18n Foundation Setup

### Core Components

#### Frontend Architecture
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with shadcn/ui components
- **Styling**: Tailwind CSS with tailwind-merge
- **State**: React Context + Hooks
- **Theme**: next-themes for dark/light mode

#### Backend Architecture
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth with cookie-based sessions
- **API**: Next.js API routes in /app/api
- **Session**: Server-side with @supabase/ssr

#### Directory Structure (Current Implementation)
```
/app                    → Next.js App Router pages
  /[lang]              → Simple language routing (de/en)
    /page.tsx          → Home (single-page narrative)
    /dictionaries.ts   → Dictionary loader function
    /layout.tsx        → Language-aware layout
  /auth                → Authentication (non-localized)
  /api                 → API endpoints
    /booking/*         → Booking operations (planned)
    /contact/*         → Contact form handler (planned)
  /protected           → Protected routes with auth
/components            → React components
  /ui                  → shadcn/ui components
  /layout              → Navigation, footer, language switcher
  /sections            → Page sections for single-page
  /booking             → Booking-specific components
/lib                   → Business logic
  /supabase            → Database clients
  /hooks               → Custom React hooks
  /utils               → Utility functions
  /services            → Service layer
/dictionaries          → Translation files (de.json, en.json)
/public                → Static assets
/.claude               → Automation and memory system
```

### Routing Conventions
- **Language-based routing**: Simple `/[lang]/` structure for DE/EN
- **No complex i18n middleware**: Direct dictionary loading in server components
- **Default language**: German (`/de`) with option for English (`/en`)
- **API routes**: Keep under `/api/` for backend endpoints
- **Auth pages**: Non-localized at `/auth/` for simplicity

### Authentication Flow
1. Middleware refreshes sessions on every request
2. Server components use `createServerClient`
3. Client components use `createBrowserClient`
4. Protected routes check auth in layouts

### Data Flow Patterns
- Server Actions for mutations
- Server Components by default
- Client Components only for interactivity
- Cookie-based session management

### Security Layers
- Row Level Security (RLS) on all tables
- Server-side validation with Zod
- Environment variables for secrets
- Middleware-based auth checks

### Development Workflow
1. TDD with Browser MCP testing
2. Conventional commits
3. PR-based workflow
4. Session-based documentation

### Testing Strategy
- Unit tests with Jest
- E2E with Browser MCP
- Visual regression with screenshots
- Type checking with TypeScript

### Performance Optimizations
- Turbopack for development
- Server Components for initial load
- Dynamic imports for code splitting
- Image optimization with Next.js Image

### Deployment
- Vercel deployment ready
- Supabase integration configured
- Environment variables managed

## Topical Domains

### UI Components → /components/
See `refs/design-patterns.md` for component patterns

### Database Schema → /supabase/
See `refs/security-layers.md` for RLS policies

### API Endpoints → /app/api/
[To be documented as endpoints are created]

### State Management → /lib/
Context-based with potential for Zustand

### Authentication → /lib/supabase/
Cookie-based with @supabase/ssr

### Testing → /tests/
Browser MCP for E2E testing

---
*Architecture Core v4.0 | Truth Source | Last verified: 2025-09-19*