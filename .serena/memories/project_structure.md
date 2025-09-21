# Project Structure

## Directory Organization

```
the-fountain-studio/
├── app/                      # Next.js App Router
│   ├── [lang]/              # Multi-language pages (de/en)
│   │   ├── layout.tsx       # Language-aware layout
│   │   ├── page.tsx         # Main landing page
│   │   └── dictionaries.ts  # Translation loader
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Root redirect to /en
│
├── components/              # React Components
│   ├── ui/                  # shadcn/ui (NEVER edit directly)
│   └── sections/            # Page sections (Hero, Services, etc.)
│
├── lib/                     # Business Logic
│   └── supabase/           # Database clients
│       ├── client.ts       # Browser client
│       ├── server.ts       # Server client
│       └── middleware.ts   # Middleware client
│
├── dictionaries/           # Translations
│   ├── de.json            # German translations
│   └── en.json            # English translations
│
├── docs/                   # Documentation
│   ├── specs/             # Product specifications
│   │   ├── landing-page-spec.json
│   │   ├── design-system.md
│   │   └── component-library.md
│   └── session/           # Session artifacts
│
├── .claude/               # Claude Code Automation
│   ├── agents/           # Agent configurations
│   ├── hooks/            # Automation scripts
│   └── state/            # Pipeline state
│
├── .serena/              # Serena MCP Configuration
│   ├── memories/         # Project knowledge
│   └── project.yml      # Serena settings
│
├── supabase/             # Backend Services
│   ├── functions/        # Edge Functions
│   └── migrations/       # Database schema
│
└── scripts/              # Utility Scripts
    └── project_index.py  # Generate PROJECT_INDEX.json
```

## Key Files

### Configuration
- `CLAUDE.md` - Execution workflows and guidelines
- `context.md` - Context orchestrator and profiles
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS settings
- `components.json` - shadcn/ui configuration

### State Management
- `event-stream.md` - Activity log
- `process-tracker.md` - Technical tasks
- `product-tracker.md` - Product features
- `PROJECT_INDEX.json` - Code intelligence index

### Architecture
- `architecture-core.md` - System overview
- `product-spec.md` - Product specification
- `visual-assets.json` - Image mappings

## Import Aliases
```typescript
@/components/*  // Components directory
@/lib/*        // Library functions
@/app/*        // App directory
```

## File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)
- Types: `types.ts` or `[name].types.ts`
- Tests: `[name].test.ts` or `[name].spec.ts`
- Docs: `kebab-case.md`

## Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL      # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY # Supabase anon key
```