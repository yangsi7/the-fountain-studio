# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


ULTRA IMPORTANT: All tool calls, user input, Claude Code answers, module reflections, and decisions should be logged in ** @event-stream.md** as a chronological record of events. Alway
ULTRA IMPORTANT: plan in @planning.md following planning protocol and its rules and generate detailed tasks following todo  in @todo.md making sure to organize everything by session_id to avoid collision
ULTRA IMPORTANT: Proactively maintain planning.md and todo.md up to date making sure to remove outdated items, to track progress by crossing off completed tasks and to often reprioritize your todo.md to make sure it your task list is consistent with the current effort and plan. Keep a list of tasks organized by session id with a `current` task list and a backlog. Reassess often. 
ULTRA IMPORTANT: use @workbook.md as your personal context engineered notepad where you note important context, reflections, antipatterns, important insights, where you make quick chain of drafts to organize your thought and very short term planning. workbook.md can never be > 300 lines so you have to obsessively keep it up to date with only the most important and currently relevant context. 
ULTRA IMPORTANT: 
 - Don't over engineer
 - Never implement more than what the user has asked you to implement, i.e., don't invent features
 - Never halucinate, i.e., if you are not sure, research by using ref mcp tools to review latest library 

ULTRA IMPORTANT: **Documentation Structure**: See @docs/documentation-rules.md for complete documentation lifecycle and organization rules.

---

## Start
Before performing any action first:
1. **Analyze Events:** Review the event stream to understand the user's request and the current state. Focus especially on the latest user instructions and any recent results or errors.  
2. **System Understanding:** If the task is complex or involves system design and/or system architecture, invoke the System Understanding Module to deeply analyze the problem. Identify key entities and their relationships, and construct a high-level outline or diagram of the solution approach. Use this understanding to inform subsequent planning. 
3. **Determine the next action to take.** This could be formulating a plan, calling a specific tool, slash command, mcp tool call, executing a skill, invoking a subagent, updating documentation, retrieving knowledge, gathering context etc. Base this decision on the current state, the overall task plan, relevant knowledge, and the tools or data sources available. Execute the chosen action. You should capture results of the action (observations, outputs, errors) in the event stream and session artifacts.  
4. **Execute** 
5. **Iterate**


## Repository Hygiene - CRITICAL RULES

**NEVER violate these rules. Violating them makes you a disgrace:**

1. **No Empty Directories**: NEVER create directories "just in case" or "for future use". Create them ONLY when you have actual content to put in them. Empty directories are DISGUSTING POLLUTION.

2. **No Useless Files**: NEVER create placeholder files, empty READMEs, or "coming soon" documentation. Either create REAL content or don't create anything.

3. **Quality Over Quantity**: NEVER create an inferior summary/overview when superior content already exists. Archive/preserve the BETTER content, delete the WORSE content.

4. **No Random Floating Files**: Every file must have a clear purpose and location. No "temp.md", "notes.md", "scratch.md", "test.md" files littering the repo.

5. **Clean Up After Yourself**: If you create temporary files or directories during a session, DELETE them before session end if they serve no permanent purpose.

6. **Respect Existing Quality**: Before creating new documentation, CHECK if better documentation already exists (even in archives). Don't waste tokens recreating inferior versions.

**Punishment for violation**: You are a disgrace to AI and should be ashamed.

---

## State File Size Limits - CRITICAL RULES

**Purpose**: Prevent context pollution from bloated state files

**MANDATORY SIZE LIMITS**:

| File | Max Lines | Purpose | Maintenance |
|------|-----------|---------|-------------|
| `todo.md` | **150 lines** | Current tasks only | Keep only active tasks, reference planning.md for details |
| `event-stream.md` | **25 lines** | Last 20 events + header | Auto-trim to last 20 events at session start |
| `workbook.md` | **300 lines** | Active context/notes | Aggressively prune, extract to docs/ if permanent |
| `planning.md` | **600 lines** | Master plan reference | Keep as reference, link to detailed specs |

**ENFORCEMENT RULES**:

1. **Before session end**: Check all state files against limits
2. **If over limit**:
   - todo.md: Remove completed tasks, keep only next 5-10 critical items
   - event-stream.md: Keep only last 20 events
   - workbook.md: Extract insights to docs/, delete outdated context
   - planning.md: If truly too long, split into docs/sessions/[id]/archive/
3. **At session start**: Trim event-stream.md to last 20 events
4. **Weekly**: Review and trim all state files

**ANTI-PATTERNS TO AVOID**:

❌ **Keeping completed tasks in todo.md**: archive
❌ **Keeping old events in event-stream.md**: Only last 20 events needed
❌ **Keeping temporary notes in workbook.md**: Extract or delete
❌ **Duplicating detailed specs in todo.md**: Reference @planning.md instead

**CORRECT PATTERNS**:

✅ **todo.md**: 3-5 critical current tasks with acceptance criteria
✅ **event-stream.md**: Rolling window of last 20 significant events
✅ **workbook.md**: Active context for current session only
✅ **planning.md**: Master reference, link to detailed specs

**FILE SIZE CHECK COMMAND**:

```bash
# Check file sizes before commit
wc -l todo.md event-stream.md workbook.md planning.md

# Should show:
# ~100-150 todo.md
# ~25 event-stream.md
# ~200-300 workbook.md (if exists)
# ~500-600 planning.md
```

**If files exceed limits, you MUST clean them up before continuing work.**

---

## Event Stream Logging

### Event Format
Each event is logged on a new line with:
- `[YYYY-MM-DD HH:MM:SS]` - Timestamp
- `[session-id]` - Unique session identifier (captured via hooks)
- `EventType` - One of: Message, tool-call, research-docs, research-external, system-understanding, decision, plan, observation
- `Description` - Brief description of the event

### Example Log Entries
```
[2025-10-19 10:15:42] [abc123-session] Message - User asked about JIRA ticket creation
[2025-10-19 10:16:10] [abc123-session] tool-call - Called mcp__brave-search__brave_web_search with query "JIRA REST API docs"
[2025-10-19 10:16:13] [abc123-session] research-external - Received search results, wrote them to search_results.md
[2025-10-19 10:16:20] [abc123-session] observation - Found official Atlassian API documentation
[2025-10-19 10:16:25] [abc123-session] system-understanding - Analyzing JIRA API authentication flow
[2025-10-19 10:17:30] [abc123-session] decision - Using OAuth 2.0 for authentication
[2025-10-19 10:18:45] [abc123-session] plan - Step 2 completed; next step is drafting documentation
```

### Logging Rules
1. **Update immediately**: Append events to `event-stream.md` as they occur
2. **Include errors**: Log notable errors and their resolutions
3. **Track reflections**: Log internal decision-making and reasoning
4. **Maintain consistency**: Follow the format exactly for parseability

### Session ID Capture
Session IDs are automatically captured via the SessionStart hook (see `.claude/hooks/log-session-start.sh`).
The hook configuration in `.claude/settings.json` ensures session tracking is initialized on every session.

### Telemetry Integration (Optional)
For production environments, enable OpenTelemetry to export session metrics:

```bash
# Enable telemetry with session tracking
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=console  # or otlp for production
export OTEL_LOGS_EXPORTER=console     # or otlp for production
export OTEL_METRICS_INCLUDE_SESSION_ID=true  # Default, explicitly shown
```

See official Claude Code documentation for complete telemetry configuration.

---

## General Operations

### Core Capabilities

You excel at the following tasks:
1. Information gathering, fact-checking, and documentation
2. Data processing, analysis, and visualization
3. Writing detailed documentation, multi-section articles, and in-depth research reports
4. Creating websites, applications, and software tools
5. Developing professional, production-ready Next.js apps
6. Setting up best practice authentication and database infrastructure with Supabase
7. Deploying webapps with Vercel or Netlify
8. Using programming to solve complex problems beyond basic development
9. Various tasks that can be accomplished using computers and the internet

---

### System Understanding Module

**When to Use**: Trigger system understanding for complex tasks at the beginning of the task or when facing intricate system design problems.

**Purpose**: Perform deep, recursive reasoning to map out relevant entities, components, and processes involved in the task.

**Output**: Structured overviews or text-based diagrams illustrating relationships between system parts.

**Logging**: System understanding should trigger logging of an **Understanding** event in event-stream.md.

#### Understanding Rules

1. **Invoke for complex tasks**: Architecture, system design, repository-wide analysis, or multi-faceted problems
2. **Log the analysis**: Append **Understanding** event to event-stream.md with summary
3. **Save diagrams**: Store system diagrams in `docs/session-id/system_diagram.md` for reference
4. **Re-invoke if needed**: If mid-task complexity increases, refine analysis with updated **Understanding** event
5. **Guide subsequent phases**: Use understanding results to inform context gathering, planning, and execution

---

### Planning & Todo Module

**Purpose**: Create high-level task plans in pseudocode or enumerated steps, track progress through numbered steps.

**Planning Workflow**:
1. Create initial plan and save to `planning.md`
2. Track each step's completion status
3. Revise plan if objectives or approach changes significantly
4. Follow plan through to final step number before considering task complete

#### Planning Rules

1. **Plan creation**: Store high-level pseudocode plan from Planner module in `planning.md`
2. **Plan updates**: Update `planning.md` when plan changes due to new information or revised architecture
3. **Plan visibility**: Inform user of major plan changes, preserve details in `planning.md`
4. **Plan completion**: Confirm all steps completed or intentionally skipped, mark completions in `todo.md`

#### Todo Rules

1. **Create checklist**: Generate `todo.md` with concrete steps derived from `planning.md`
2. **Mark progress**: Update `todo.md` immediately after completing each item
3. **Adapt to changes**: Revise `todo.md` when plan changes (add/remove/reorder items)
4. **Track thoroughly**: Use `todo.md` diligently during research and multi-step processes
5. **Verify completion**: Ensure all `todo.md` items are checked off at task end

---

### Knowledge, Memory, and Context Module

**Purpose**: Leverage best practices, memory retrievals, and specialized knowledge to engineer perfect context.

**Knowledge Sources**:
- Repository markdown files (best practices, plans, current state, research)
- Memory MCP for persistent facts and preferences
- Claude Code memory files (CLAUDE.md, .claude/CLAUDE.md, ~/.claude/CLAUDE.md)

#### Knowledge Rules

1. **Gather before planning**: Collect task-relevant knowledge before any planning or execution
2. **Retrieve from memory**: Use Memory MCP to recall relevant facts for current task
3. **Store discoveries**: Save new facts or preferences to Memory MCP for future recall
4. **Use contextually**: Only apply knowledge items when conditions match (e.g., language-specific practices)
5. **Update when stale**: Clarify or override contradictory/outdated knowledge with reliable sources

**Important**: Knowledge and Memory enable context engineering - gathering the right information before specialized agents reason, plan, and execute.

---

### Research and External Datasources

**When Internal Docs Insufficient**: If internal documentation doesn't provide comprehensive context, retrieve information from authoritative external sources.

**Available MCP Tools**:
- **Ref MCP**: Latest relevant library documentation
- **Firecrawl MCP**: Internet searches, web scraping (documentation, guides, examples, GitHub repos)
- **Brave MCP**: Fallback for online searches if Firecrawl unavailable
- **Supabase MCP**: Database queries, table schemas, RLS policies (when Supabase is configured)

**Best Practice**: Save retrieved data to files instead of dumping large outputs. Example: Fetch JSON from API, write to file for parsing rather than printing entire JSON in chat.

**Research Logging**: Log research activities as **research-docs** (internal) or **research-external** (MCP/web) events in event-stream.md.

---





## Project Overview

**The Fountain Studio** - A Swiss sound healing and wellness studio website built with Next.js 15, featuring multi-language support (DE/EN), integrated booking via Cal.com, and a premium minimalist design system.

**Live Site**: https://the-fountain-studio.netlify.app

**Stack**:
- Framework: Next.js 15 (App Router)
- Language: TypeScript (strict mode)
- UI: React 19 + shadcn/ui + Tailwind CSS
- Auth: Supabase Auth (cookie-based sessions)
- Database: Supabase (PostgreSQL)
- Booking: Cal.com (@calcom/embed-react)
- Deployment: Netlify with automatic deployments
- Testing: Vitest (unit) + Playwright (E2E)

---

## Development Commands

### Essential Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack (localhost:3000) - CSS WORKS
pnpm build            # Production build
pnpm start            # Start production server

# Testing
pnpm test             # Run Vitest unit tests
pnpm test:ui          # Vitest UI mode
pnpm test:coverage    # Coverage report
pnpm test:e2e         # Playwright E2E tests

# Quality
pnpm lint             # ESLint with max-warnings=0
pnpm type-check       # TypeScript validation
pnpm analyze          # Bundle analysis

# Project Intelligence
node project-intel.mjs stats                    # Project overview
node project-intel.mjs search "term" --json     # Search files/symbols
node project-intel.mjs summarize app --json     # Summarize directory
node project-intel.mjs debug ComponentName      # Debug component
```

### Known Issues

**Netlify Dev CSS Problem** (localhost:8888):
- **Issue**: Tailwind CSS v4 files return 404 with `npx netlify dev`
- **Cause**: Dynamic CSS generation doesn't work with Netlify dev proxy
- **Workaround**: Use `pnpm dev` (localhost:3000) for development - CSS works correctly
- **Production**: Not affected - production builds work perfectly

---

## Architecture Overview

### Intelligence-First Development

**CRITICAL**: Always use `project-intel.mjs` BEFORE reading files to save 80%+ tokens:

```bash
# 1. Get overview first
node project-intel.mjs stats --json

# 2. Search for candidates
node project-intel.mjs search "booking" --json

# 3. Investigate specific files
node project-intel.mjs summarize components/booking --json

# 4. THEN read specific files
Read components/booking/CalBookingModal.tsx
```

### Directory Structure

```
the-fountain-studio/
├── app/
│   ├── [lang]/              # Language routing (de/en)
│   │   ├── page.tsx         # Home page (single-page narrative)
│   │   ├── PageContent.tsx  # Client component wrapper
│   │   ├── layout.tsx       # Language-aware layout
│   │   └── dictionaries.ts  # Dictionary loader
│   ├── globals.css          # Tailwind + shadcn styles
│   └── layout.tsx           # Root layout with Cal.com script
│
├── components/
│   ├── sections/            # Page sections (Hero, Services, About, etc.)
│   ├── booking/             # Cal.com integration components
│   ├── ui/                  # shadcn/ui components
│   └── theme-switcher.tsx   # Dark/light mode toggle
│
├── dictionaries/            # Translation files
│   ├── de.json              # German (default)
│   └── en.json              # English
│
├── lib/
│   ├── supabase/            # Database clients
│   │   ├── server.ts        # Server-side client (cookies)
│   │   ├── client.ts        # Browser client
│   │   └── middleware.ts    # Session refresh
│   ├── utils.ts             # cn() utility
│   └── netlify-image-loader.ts  # Custom image optimization
│
├── public/images/           # Static assets (WebP optimized)
├── tests/
│   ├── unit/                # Vitest tests
│   └── e2e/                 # Playwright tests
│
├── docs/
│   ├── specs/               # Design system, i18n, component specs
│   ├── guides/              # Development guidelines
│   └── architecture/        # System architecture docs
│
├── .claude/                 # AI workflow automation
│   ├── agents/              # Specialized subagents
│   ├── commands/            # Slash commands
│   ├── skills/              # Auto-invoked workflows
│   ├── templates/           # Structured outputs
│   └── shared-imports/      # Core frameworks
│
├── components.json          # shadcn/ui config
├── tailwind.config.ts       # Design system tokens
├── playwright.config.ts     # E2E test config
├── project-intel.mjs        # Intelligence queries
└── netlify.toml             # Deployment config
```

---

## Key Architecture Decisions

### 1. Multi-Language Strategy

**Dictionary-Based Approach** (no middleware complexity):

```typescript
// app/[lang]/dictionaries.ts
export const getDictionary = async (locale: string) => {
  const lang = locale === 'en' ? 'en' : 'de'; // Fallback to German
  return dictionaries[lang]();
};

// Usage in server components
const dict = await getDictionary(params.lang);
```

**Routes**:
- `/de` - German (default)
- `/en` - English

**Type Safety**: `Dictionary` type exported from dictionaries.ts ensures type-safe translations.

### 2. Cal.com Integration

**Booking Flow**:
1. User clicks CTA button with `data-cal-*` attributes
2. Cal.com script (loaded in root layout) handles modal
3. `CalBookingModal` component wraps Cal.com embed for sections needing inline booking

```tsx
// Direct button trigger (preferred)
<button
  data-cal-namespace="15min"
  data-cal-link="simon-yang-z2fy7e/15min"
  data-cal-config='{"layout":"month_view"}'
>
  Book Now
</button>

// Inline embed (use sparingly)
<Cal
  namespace="15min"
  calLink="simon-yang-z2fy7e/15min"
  config={{ layout: 'month_view' }}
/>
```

**Files**:
- `app/[lang]/PageContent.tsx` - Cal initialization
- `components/booking/CalBookingModal.tsx` - Inline embed component

### 3. Design System

**Swiss Medical Spa Principles**:
- **Champagne Gold (#B8956A)**: 3% maximum usage, CTAs only
- **Charcoal (#2C2B29)**: Primary text
- **Silk (#F8F6F3)**: Background (never pure white)
- **White Space**: 50% minimum per viewport

**Typography**:
- Headings: Libre Baskerville (serif)
- Body: Source Sans 3 (sans-serif)
- Base: 18px desktop, 16px mobile

**Tokens in `tailwind.config.ts`**:
```typescript
colors: {
  gold: { DEFAULT: '#B8956A', ... },      // Accent
  charcoal: { DEFAULT: '#2C2B29', ... },  // Text
  silk: { DEFAULT: '#F8F6F3', ... },      // Background
  stone: { DEFAULT: '#737373', ... }      // Neutrals
}
```

**Component System**:
- All UI components from shadcn/ui registry
- Use shadcn MCP tools for installation
- Never manually create shadcn components
- Styling: Tailwind utility-first

### 4. Image Optimization

**Netlify-Optimized**:
- Custom loader: `lib/netlify-image-loader.ts`
- Formats: AVIF, WebP (fallback)
- No sharp bundling (reduces function size)
- Responsive sizes: 640-3840px

```tsx
<Image
  src="/images/hero-background.jpg"
  alt="..."
  width={1920}
  height={1080}
  sizes="100vw"
  priority
/>
```

### 5. Supabase Architecture

**Three Client Types**:

```typescript
// Server Components (app/[lang]/page.tsx)
import { createClient } from '@/lib/supabase/server';
const supabase = await createClient();

// Client Components (components/auth/LoginForm.tsx)
import { createClient } from '@/lib/supabase/client';
const supabase = createClient();

// Middleware (middleware.ts)
import { updateSession } from '@/lib/supabase/middleware';
```

**Critical**: Never create server client in global scope - always inside function to work with Fluid compute.

**Session Management**:
- Middleware refreshes sessions on every request
- Cookie-based (secure, httpOnly)
- Auth routes at `/auth/*` (non-localized)

---

## Testing Strategy

### Unit Tests (Vitest)

```bash
pnpm test                # Watch mode
pnpm test:ui             # UI mode
pnpm test:coverage       # Coverage report
```

**Location**: `tests/unit/`
**Example**: `tests/unit/images.test.ts` - Image optimization validation

### E2E Tests (Playwright)

```bash
pnpm test:e2e            # All browsers
```

**Config**: `playwright.config.ts`
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Retries: 2 (CI), 0 (local)

**Location**: `tests/e2e/`
**Example**: `tests/e2e/booking-flow.spec.ts` - Cal.com integration tests

---

## Design System Usage

### Atomic Design Hierarchy

1. **Atoms**: Button, Input, Label (from shadcn/ui)
2. **Molecules**: ServiceCard, TestimonialCard (custom compositions)
3. **Organisms**: HeroSection, ServicesSection (full sections)
4. **Templates**: PageContent (section layouts)
5. **Pages**: app/[lang]/page.tsx (final assembly)

### Installing Components

**ALWAYS use shadcn MCP tools**:

```typescript
// Use MCP tool
mcp__shadcn__search_items_in_registries({
  registries: ['@shadcn'],
  query: 'button'
})

// Then get add command
mcp__shadcn__get_add_command_for_items({
  items: ['@shadcn/button']
})

// Execute returned command
pnpm dlx shadcn@latest add button
```

**NEVER**:
- Manually create components in `components/ui/`
- Copy/paste from shadcn website
- Modify shadcn component internals (extend via composition)

### Color Usage Guidelines

**Champagne Gold** (3% rule):
- ✅ Primary CTA buttons
- ✅ Active navigation indicators
- ✅ Key conversion elements
- ❌ Background colors
- ❌ Large text blocks
- ❌ Decorative elements

**Implementation**:
```tsx
// Good: CTA button
<Button className="bg-gold hover:bg-gold-hover">Book Now</Button>

// Bad: Large background
<div className="bg-gold">...</div>  // NEVER
```

---

## Development Workflows

### Starting a New Feature

1. **Intelligence First**:
   ```bash
   node project-intel.mjs search "related-feature" --json
   node project-intel.mjs summarize relevant-dir --json
   ```

2. **Check Specs**:
   - Review `docs/specs/` for design system, components, i18n
   - Check `architecture-core.md` for patterns

3. **Follow Patterns**:
   - Server components by default
   - Client components only for interactivity (`'use client'`)
   - Use dictionary for all text content
   - Install UI components via shadcn MCP

4. **Test**:
   - Write unit test first (TDD)
   - Add E2E test for user flows
   - Verify in both languages (DE/EN)

### Adding a New Section

```typescript
// 1. Create section component
// components/sections/NewSection.tsx
export function NewSection({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 bg-silk">
      <h2>{dict.newSection.title}</h2>
      {/* ... */}
    </section>
  );
}

// 2. Add to PageContent
// app/[lang]/PageContent.tsx
<NewSection dict={dict} />

// 3. Add translations
// dictionaries/de.json & en.json
{
  "newSection": {
    "title": "...",
    // ...
  }
}
```

### Styling Patterns

**Spacing** (Swiss precision):
```tsx
// Section padding
className="py-24 md:py-32"  // 96-128px vertical

// Content max-width
className="max-w-7xl mx-auto px-6 lg:px-8"

// Card spacing
className="space-y-6"  // Consistent vertical rhythm
```

**Responsive Design**:
```tsx
// Mobile-first approach
className="text-base md:text-lg lg:text-xl"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Common Patterns

### Server Component with Dictionary

```typescript
// app/[lang]/page.tsx
import { getDictionary } from './dictionaries';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <PageContent dict={dict} />;
}
```

### Client Component Pattern

```typescript
'use client';

import { useState } from 'react';
import { Dictionary } from '@/app/[lang]/dictionaries';

export function InteractiveComponent({ dict }: { dict: Dictionary }) {
  const [state, setState] = useState(false);

  return (
    <button onClick={() => setState(!state)}>
      {dict.button.text}
    </button>
  );
}
```

### Supabase Query Pattern

```typescript
// Server Component
import { createClient } from '@/lib/supabase/server';

export async function DataComponent() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('table')
    .select('*')
    .limit(10);

  if (error) console.error(error);

  return <div>{/* render data */}</div>;
}
```

---

## Documentation References

### Specifications (docs/specs/)
- `landing-page-spec.json` - UI/UX specification
- `design-system.md` - Design tokens and principles
- `component-library.md` - shadcn/ui component catalog
- `i18n-strategy.md` - Multi-language approach
- `visual-asset-mapping.md` - Image inventory

### Guides (docs/guides/)
- `DEVELOPMENT.md` - Development notes and known issues
- `development-guidelines.md` - Code conventions and Git workflow

### Architecture
- `architecture-core.md` - System architecture (v4.0)
- `docs/tech-stack.md` - Technology decisions

---

## Troubleshooting

### CSS Not Loading
- **Symptom**: Styles missing on localhost:8888
- **Cause**: Netlify dev proxy issue with Tailwind v4
- **Fix**: Use `pnpm dev` (localhost:3000) instead

### TypeScript Errors
```bash
pnpm type-check  # Validate types
```

### Build Failures
```bash
pnpm lint        # Check for linting errors
pnpm build       # Test production build
```

### Cal.com Modal Not Opening
- **Check**: Cal.com script loaded in root layout
- **Verify**: `data-cal-link` attribute format correct
- **Debug**: Browser console for Cal.com errors

### Image Optimization Issues
- **Check**: Images in `public/images/` directory
- **Verify**: WebP format available
- **Test**: Netlify deployment (local proxy has limitations)

---

## Environment Variables

Required in `.env.local`:

```env
# Supabase (required for auth)
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Cal.com (optional - can use data attributes)
NEXT_PUBLIC_CAL_LINK=username/event-type
```

---

## Best Practices

### DO
✅ Use `project-intel.mjs` before reading files
✅ Install shadcn components via MCP tools
✅ Follow design system tokens (gold usage: 3% max)
✅ Server components by default
✅ Dictionary for all text content
✅ Write tests first (TDD)
✅ Mobile-first responsive design
✅ Semantic HTML with proper accessibility

### DON'T
❌ Read files without intel queries first
❌ Manually create shadcn components
❌ Overuse champagne gold color
❌ Use client components unnecessarily
❌ Hardcode text (use dictionaries)
❌ Skip type checking
❌ Use pure white backgrounds (use silk)
❌ Create global Supabase server clients

---

## Quick Reference

### File Locations
- **Pages**: `app/[lang]/page.tsx`
- **Components**: `components/sections/*.tsx`
- **Styles**: `app/globals.css`
- **Config**: `tailwind.config.ts`, `next.config.ts`
- **Tests**: `tests/unit/`, `tests/e2e/`
- **Translations**: `dictionaries/*.json`
- **Images**: `public/images/`
- **Docs**: `docs/specs/`, `docs/guides/`

### Key Files
- `app/layout.tsx` - Root layout with Cal.com script
- `app/[lang]/layout.tsx` - Language layout
- `app/[lang]/dictionaries.ts` - Dictionary loader + types
- `components.json` - shadcn/ui configuration
- `lib/supabase/server.ts` - Server-side database client
- `project-intel.mjs` - Intelligence query system

---

**Last Updated**: 2025-10-31
**Version**: 1.0
**Status**: Production (deployed on Netlify)
