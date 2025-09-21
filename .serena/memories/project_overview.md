# The Fountain Studio - Project Overview

## Purpose
The Fountain Studio is a modern wellness website for a Swiss sound healing practitioner. It combines Biofield Tuning, Gyrotonic® movement, and breathwork services. The site targets self-aware individuals seeking authentic healing experiences.

## Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript (strict mode)
- **UI Framework**: React 19
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **State Management**: Zustand with localStorage persistence
- **Database**: Supabase (PostgreSQL with Auth)
- **Authentication**: @supabase/ssr with cookie-based sessions
- **Deployment**: Vercel (primary) / Netlify (backup)
- **Package Manager**: pnpm 10.4.1
- **Internationalization**: Dictionary-based multi-language (DE/EN)

## Key Features
- Multi-language support (German/English) via dictionary pattern
- Sound healing and wellness service booking
- Cal.com integration for appointments
- WhatsApp Business integration for contact
- Single-page narrative design with smooth scrolling
- Swiss Medical Spa aesthetic with premium feel

## Development Philosophy
- Memory System v1.0 for context management
- Profile-based context loading for efficiency
- Test-Driven Development approach
- Component files < 50 lines
- Server Components by default, Client Components only when needed
- Atomic commits with conventional messages