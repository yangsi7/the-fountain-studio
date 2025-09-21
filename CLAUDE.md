# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository:
 - Project Overview --> Overview
 - System Initialization onwards --> Process
 
 ALWAYS LOAD @context.md and reflect: 
    - what do I need to load before starting any action?
    - Am I over-engineering?
    - Do I have enough context to execute or am I just full of shit?
    - Only do what the user asks for nothing more, do not produce any features or content that have not been briefed or for which there is no specification file


## 0. Project Overview

Next.js 15+ application with Supabase authentication, built with TypeScript and React 19. Uses shadcn/ui components, Tailwind CSS for styling, and includes a comprehensive context orchestration system.

## Commands

### Development
```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build production bundle
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Type Checking
```bash
npx tsc --noEmit  # Check TypeScript types
```

## Architecture

### Core Stack
- **Framework**: Next.js 15 (App Router) with Turbopack
- **Authentication**: Supabase Auth with cookie-based sessions via @supabase/ssr
- **Database**: Supabase (PostgreSQL with RLS)
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Styling**: Tailwind CSS with tailwind-merge and class-variance-authority
- **Package Manager**: pnpm 10.4.1

### Directory Structure
- `/app` - Next.js App Router pages and API routes
  - `/auth` - Authentication flow pages (login, sign-up, password reset)
  - `/protected` - Protected routes requiring authentication
- `/components` - React components
  - `/ui` - shadcn/ui Radix-based components
  - `/tutorial` - Tutorial/example components
- `/lib` - Utility functions and configurations
  - `/supabase` - Supabase client configurations (client, server, middleware)

### Key Patterns

#### Authentication Flow
1. Middleware (`middleware.ts`) refreshes sessions on every request
2. Server components use `createServerClient` from `lib/supabase/server.ts`
3. Client components use `createBrowserClient` from `lib/supabase/client.ts`
4. Protected routes check authentication in layout components

#### Supabase Integration
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Session management handled via cookies (supabase-ssr)
- Server-side operations use server client, client-side uses browser client

#### Component Architecture
- UI components from shadcn/ui in `/components/ui`
- Form components use controlled patterns with React 19
- Theme switching via next-themes provider

## MCP Tool Priorities

When working with this codebase, prioritize MCP tools in this order:
1. `mcp__supabase__*` - For all database operations and auth
2. `mcp__shadcn__*` - For UI component discovery and implementation
3. `mcp__browsermcp__*` - For testing user flows and E2E testing
4. `mcp__ref__*` - For documentation lookups

## Multi-Language Implementation (Dictionary-Based)

### Overview
The project uses a simple dictionary-based approach for multi-language support (DE/EN) without complex i18n middleware. This keeps the setup clean and works perfectly with Supabase auth.

📚 **Full Documentation**: See `/docs/specs/i18n-strategy.md` for comprehensive implementation guide, testing strategies, and troubleshooting.

### Structure
```
/app/[lang]/           → Language-based routing (de/en)
  dictionaries.ts      → Type-safe dictionary loader
  page.tsx            → Pages that consume translations
  layout.tsx          → Language-aware layout

/dictionaries/        → Translation JSON files
  de.json            → German translations
  en.json            → English translations
```

### How to Develop New Pages with Translations

#### 1. Add Translations to Dictionary Files
First, add your new content to both dictionary files:

```json
// dictionaries/de.json
{
  "newSection": {
    "title": "Deutscher Titel",
    "description": "Deutsche Beschreibung",
    "cta": "Klick mich"
  }
}

// dictionaries/en.json
{
  "newSection": {
    "title": "English Title",
    "description": "English Description",
    "cta": "Click me"
  }
}
```

#### 2. Update Type Definitions
Add the new section to the Dictionary type in `app/[lang]/dictionaries.ts`:

```typescript
type Dictionary = {
  // ... existing sections
  newSection: {
    title: string
    description: string
    cta: string
  }
}
```

#### 3. Use in Server Components
In any page or component within `/app/[lang]/`:

```typescript
import { getDictionary } from './dictionaries';

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1>{dict.newSection.title}</h1>
      <p>{dict.newSection.description}</p>
      <button>{dict.newSection.cta}</button>
    </div>
  );
}
```

#### 4. Client Components Pattern
For client components, pass translations as props:

```typescript
// Server Component (page.tsx)
const dict = await getDictionary(lang);
return <ClientComponent translations={dict.newSection} />;

// Client Component
'use client';
export function ClientComponent({ translations }) {
  return <button>{translations.cta}</button>;
}
```

### Language Switcher
The language switcher is implemented with simple links:

```typescript
<Link href="/de">Deutsch</Link>
<Link href="/en">English</Link>
```

### Best Practices
1. **Always use server components** when possible to load translations
2. **Type safety**: Update Dictionary type when adding new sections
3. **Consistent keys**: Use same structure in both language files
4. **Nested organization**: Group related translations (e.g., `services.individual.title`)
5. **No dynamic keys**: Avoid computed property names for better type safety

### Testing Multi-Language Pages
```bash
# Test German version
open http://localhost:3000/de

# Test English version
open http://localhost:3000/en

# Verify with Playwright
mcp__playwright__playwright_navigate to test both languages
```

## Testing Approach

Use browser-based MCP testing for all features:
1. Navigate to test URLs using `mcp__browsermcp__browser_navigate`
2. Take snapshots with `mcp__browsermcp__browser_snapshot`
3. Interact with elements using click/type operations
4. Validate with screenshots

## Context Management System

The project includes a sophisticated context orchestration system defined in `context.md` that manages:
- Profile-based context loading (research, feature, bugfix, ui, database)
- 8-step React Loop execution pattern
- Workflow automation with state transitions
- Event logging to `event-stream.md`
- Task tracking in `process-tracker.md` and `product-tracker.md`

Always follow the React Loop when implementing features:
0. Understand → 1. Load Context → 2. Plan → 3. Taskify → 4. Execute → 5. Verify → 6. Document → 7. Log Loop


## 1. SYSTEM INITIALIZATION

### 1.1 On Session Start
```
WHEN: New session or user message received
THEN: Execute initialization sequence:
  1. Check current session ID from environment
  2. Read last 30 events from @event-stream.md
  3. Determine workflow type (product vs process)
  4. Load @context.md which defines:
    - Profile definitions and loading patterns (see context.md#load-profiles)
    - Workflow automaton state machine (see context.md#workflow-automaton)
    - The 8-Step React Loop specification (see context.md#react-loop)
  5. PROJECT_INDEX.json available (MUST use index-analyzer agent for analysis, never load directly)
```

### Separation of Concerns
- **CLAUDE.md**: Execution workflows, standards, guidelines, agent usage
- **context.md**: Profile definitions, state machine, loading logic
- **See Also**: @context.md for profile-based context loading patterns

### 1.2 Context Validation
```
VERIFY:
  ✓ Session ID exists
  ✓ Context.md is accessible
  ✓ Required MCP tools are available
  ✓ Event-stream.md is writable
```

## 2. TASK CLASSIFICATION

### 2.1 Input Analysis
```
FOR each user message:
  1. Extract keywords from input
  2. Match against profile triggers
  3. Select appropriate profile
  4. Load profile-specific context
```

### 2.2 Profile Selection Logic
```
IF contains("understand", "analyze", "investigate"):
  → LOAD research profile
  → FILES: architecture-core.md, refs/data-flows.md

ELIF contains("claude code", "hook", "CLAUDE.md", "memory system docs", "automation"):
  → INVOKE claude-docs-fetcher agent
  → Then load appropriate profile for implementation

ELIF contains("database", "table", "migration", "sql"):
  → LOAD database profile
  → FILES: refs/security-layers.md, migrations/
  → TOOLS: mcp__supabase__*

ELIF contains("implement", "add", "create", "build"):
  → LOAD feature profile
  → FILES: architecture-core.md, refs/testing-strategy.md

ELIF contains("fix", "error", "bug", "crash"):
  → LOAD bugfix profile
  → FILES: architecture-core.md, package.json

ELIF contains("component", "ui", "design", "layout"):
  → LOAD ui profile
  → FILES: refs/design-patterns.md, components/ui/
  → TOOLS: mcp__shadcn__*

ELSE:
  → LOAD default profile
  → FILES: architecture-core.md, README.md
```

## 3. EXECUTION WORKFLOWS

### 3.1 Eight-Step React Loop
```
EXECUTE in sequence:

Step 0: UNDERSTAND
  INPUT: User request
  ACTION: Classify task type
  OUTPUT: Profile selection

Step 1: LOAD_CONTEXT
  INPUT: Selected profile
  ACTION: Load files per profile spec
  SERENA: mcp__serena__read_memory [profile_memory] (Actually do this!)
  VALIDATE: mcp__serena__think_about_collected_information
  OUTPUT: Context loaded and validated

Step 2: PLAN
  INPUT: Task requirements
  ACTION: Update process-tracker.md or product-tracker.md
  OUTPUT: Structured plan with phases

Step 3: TASKIFY
  INPUT: Plan objectives
  ACTION: Break into atomic tasks
  OUTPUT: Checkbox list in tracker files

Step 4: EXECUTE
  INPUT: Task list
  ACTION: Implement with TDD approach
  VALIDATE: mcp__serena__think_about_task_adherence (mid-execution)
  OUTPUT: Working code with tests

Step 5: VERIFY
  INPUT: Implementation
  ACTION: Run tests and validation
  OUTPUT: All tests passing

Step 6: DOCUMENT
  INPUT: Completed work
  ACTION: Generate session artifacts + write Serena memories
  OUTPUT: docs/session/[id]/ populated + memories persisted

Step 7: LOG_LOOP
  INPUT: Execution results
  ACTION: Update event-stream.md
  VALIDATE: mcp__serena__think_about_whether_you_are_done
  OUTPUT: IF incomplete THEN GOTO Step 4
```

### 3.2 Workflow Routing
```
DETERMINE workflow type:
  IF user-facing OR feature-development:
    USE: product-tracker.md
    SET: workflow = "product"

  IF technical-debt OR process-improvement:
    USE: process-tracker.md
    SET: workflow = "process"
```

### 3.3 Workflow Selection Matrix
```
CHAIN INVOCATION DECISIONS by phase and conditions:

Phase 0-1 (UNDERSTAND → LOAD_CONTEXT):
  IF task_complexity == "undefined" OR no_matching_pattern:
    → INVOKE custom_workflow_builder
    → ANALYZE task dimensions
    → COMPOSE optimal agent chain
    → RETURN to standard flow
  ELSE:
    → STANDARD: context-fetcher

Phase 2-3 (PLAN → TASKIFY):
  IF solution_count < 3 AND feature_type == "complex":
    → PARALLEL: brainstormer (3x instances)
    → AGGREGATE solutions
    → VOTE on best approach
  ELIF architecture_impact == true:
    → CHAIN: tree-of-thought → brainstormer
    → PARALLEL: index-analyzer for topical updates
  ELSE:
    → SINGLE: brainstormer

Phase 4-5 (EXECUTE → VERIFY):
  IF implementation_type == "ui":
    → CHAIN: ui-ux-spec → browser-mcp-testing
    → PARALLEL: shadcn component discovery
  ELIF implementation_type == "database":
    → CHAIN: supabase-architect → supabase-implementation
    → VERIFY: RLS policies + migrations
  ELIF implementation_type == "mixed":
    → PARALLEL: ui-ux-spec + database agents
    → CONVERGE: integration testing
  ELSE:
    → ADAPTIVE: Select by capability matrix

Phase 6-7 (DOCUMENT → LOG_LOOP):
  → ALWAYS: architecture-maintainer (truth validation)
  → IF changes > threshold:
    → PARALLEL: index-analyzer topical updates
  → FINALLY: postflight-validator
```

### 3.4 Custom Workflow Builder
```
WHEN no standard pattern matches:

PROCESS custom_workflow_construction:
  1. EXTRACT task characteristics:
     - Domain areas affected
     - Complexity score (1-10)
     - Risk assessment
     - Dependencies identified

  2. QUERY agent capabilities:
     - Map requirements to agent skills
     - Identify minimal spanning set
     - Determine parallelization opportunities

  3. CONSTRUCT workflow:
     - Build directed acyclic graph
     - Insert validation checkpoints
     - Add rollback points

  4. VALIDATE workflow:
     - Check resource constraints
     - Verify no circular dependencies
     - Confirm coverage of requirements

  5. EXECUTE with monitoring:
     - Track phase transitions
     - Log to event-stream.md
     - Adaptive replanning if needed

EXAMPLE custom chains:
  - "Refactor entire auth system":
    tree-of-thought → karen (reality check) →
    PARALLEL(database-agent, ui-ux-spec) →
    test-runner → jenny (compliance) →
    postflight-validator

  - "Performance optimization across stack":
    PARALLEL(index-analyzer per domain) →
    architecture-maintainer → brainstormer →
    Iterative(implement → test → measure)
```

### 3.5 Parallel Topical Updates
```
TOPICAL DOMAIN maintenance via index-analyzer:

TRIGGER conditions:
  - Architecture changes detected
  - New patterns introduced
  - File count > 10 in change set
  - Cross-domain refactoring

PARALLEL execution pattern:
  1. SPAWN index-analyzer instances:
     - ui-components: /components/**
     - database-schema: /supabase/**
     - api-endpoints: /app/api/**
     - medical-engine: /lib/medical/**
     - state-management: /lib/stores/**
     - pdf-generation: /lib/pdf/**

  2. EXTRACT from PROJECT_INDEX.json:
     - Use jq for topical filtering
     - Update architecture-core.md sections
     - Maintain 150-line limit

  3. COORDINATE results:
     - Merge topical updates
     - Resolve conflicts
     - Update version and checksum

EVENT logging for parallel execution:
  HH:MM:SS | PARALLEL | START | 6 domains | index-analyzer
  HH:MM:SS | PARALLEL | UPDATE | ui-components | 3 files
  HH:MM:SS | PARALLEL | UPDATE | database-schema | 5 files
  HH:MM:SS | PARALLEL | COMPLETE | SUCCESS | Updates merged
```

## 4. TECH STACK & CONVENTIONS

### 4.1 Technology Stack
```
FRAMEWORK:
  - Next.js 14.2.16 (App Router)
  - TypeScript (strict mode)
  - React 18

AUTHENTICATION:
  - @supabase/ssr (NOT auth-helpers)
  - Server-side redirects only
  - Cookie-based sessions
  - See /refs/supabase-auth.md

STATE MANAGEMENT:
  - Zustand with localStorage
  - Partial updates pattern
  - Type-safe stores

STYLING:
  - Tailwind CSS v4
  - Radix UI primitives
  - Shadcn components
  - cn() utility for classes

BACKEND:
  - Supabase (PostgreSQL + Auth)
  - Edge Functions (Deno)
  - RLS policies on all tables

VALIDATION:
  - Zod schemas
  - Server-side validation
  - Type inference to forms

TESTING:
  - TDD approach
  - Browser MCP for E2E
  - Jest for unit tests
```

### 4.2 Code Conventions
```
PATTERNS:
  ✓ Server Actions for mutations
  ✓ Server Components by default
  ✓ Client Components only when needed
  ✓ Atomic commits with conventional messages
  ✓ Component files < 50 lines

ANTI-PATTERNS:
  ✗ Client-side navigation after auth
  ✗ Individual cookie methods (get/set/remove)
  ✗ window.location for navigation
  ✗ JSON responses from auth actions
  ✗ router.refresh() for cookie sync

FILE STRUCTURE:
  /app - Pages and API routes
  /components/ui - Shadcn components
  /lib - Business logic
  /refs - Documentation
  /supabase - DB migrations & functions
```

### 4.3 Authentication Patterns
```
CORRECT (Server-side redirect):
  // Server action
  await AuthService.verifyOTP(email, token)
  redirect('/eligibility')  // Atomic with cookies

INCORRECT (Cookie race condition):
  // Server action
  return { success: true }
  // Client
  router.push('/eligibility')  // Race condition!

ALWAYS:
  - Use @supabase/ssr package
  - getAll()/setAll() for cookies
  - Server-side redirects
  - Middleware validation

NEVER:
  - @supabase/auth-helpers-nextjs
  - Individual cookie methods
  - Client navigation after auth
  - Cookie Bridge Pattern
```

## 5. EXECUTION STANDARDS

### 5.1 Core Directives
```
ALWAYS:
  ✓ Do EXACTLY what user asks - nothing more
  ✓ Never expand scope without permission
  ✓ Use MCP tools before manual implementation
  ✓ Maintain all state files systematically
```

### 5.2 MCP Tool Priority & Usage Guidelines
```
WHEN to use each MCP server:

mcp__serena__* (PRIORITY 1 - Semantic Code Intelligence):
  **REMINDER: Actually USE these tools, don't just read about them!**

  PRACTICAL EXAMPLES of when to use Serena:

  WHEN analyzing code:
    ✓ FIRST: mcp__serena__get_symbols_overview /path/to/file.ts
    ✓ THEN: mcp__serena__find_symbol ComponentName
    ✓ NOT: Read entire file (wastes tokens)

  WHEN starting any task:
    ✓ DO: mcp__serena__read_memory project_overview
    ✓ CHECK: mcp__serena__think_about_collected_information
    ✓ NOT: Skip memory loading

  WHEN implementing features:
    ✓ BEFORE: mcp__serena__find_referencing_symbols ExistingComponent
    ✓ DURING: mcp__serena__think_about_task_adherence
    ✓ AFTER: mcp__serena__write_memory feature_patterns "what I learned"

  WHEN debugging:
    ✓ SEARCH: mcp__serena__search_for_pattern "error message"
    ✓ TRACE: mcp__serena__find_referencing_symbols problematic_function
    ✓ NOT: Grep through entire codebase

  WHEN completing tasks:
    ✓ VALIDATE: mcp__serena__think_about_whether_you_are_done
    ✓ SAVE: mcp__serena__write_memory task_insights "solution pattern"
    ✓ CHECK: Event stream should show Serena usage

  REALITY CHECK: grep "mcp__serena" event-stream.md - Should see actual usage!

mcp__supabase__* (Database Operations):
  USE WHEN: Database work, migrations, RLS policies
  - search_docs → Supabase patterns and best practices
  - list_tables, list_migrations → Current state
  - apply_migration → DDL operations
  - execute_sql → Data queries (untrusted data warning)
  - get_advisors → Security and performance checks
  FALLBACK: Direct SQL files if MCP unavailable

mcp__shadcn__* (UI Components):
  **CRITICAL DIRECTIVE**: ONLY use shadcn MCP tools for ALL component setup
  **FORBIDDEN**: Manual component creation or editing in components/ui
  USE WHEN: Building UI, finding component examples
  - search_items_in_registries → Component discovery (ALWAYS START HERE)
  - get_item_examples_from_registries → Usage patterns
  - view_items_in_registries → Component details
  - get_add_command_for_items → Installation (USE THIS TO ADD COMPONENTS)
  PATTERN: Search → View examples → Add via MCP tool ONLY
  **ENFORCEMENT**: Any manual component creation = violation. Use shadcn registry ONLY.

mcp__browsermcp__* (E2E Testing - NOT Playwright):
  USE WHEN: Browser testing, visual validation, user flows
  - browser_navigate → Go to test URL
  - browser_snapshot → Get element references
  - browser_click, browser_type → Interact with UI
  - browser_screenshot → Visual verification
  - browser_get_console_logs → Debug errors
  AUTH FLOW: Prompt user for manual auth if needed
  ADVANTAGE: Real browser feedback vs headless testing

mcp__Ref__* (Documentation):
  USE WHEN: Library reference, API documentation
  - ref_search_documentation → Find relevant docs
  - ref_read_url → Read documentation content
  SCOPE: Public docs + user's private resources

claude-docs-fetcher Agent:
  USE WHEN: Questions about Claude Code features, hooks, memory system
  - Retrieves official documentation via claude-docs-helper.sh
  - PRIORITY: Use before implementing Claude Code customizations
  - EXAMPLES: Hook configuration, status line setup, CLAUDE.md patterns

mcp__brave-search__* (Web Search):
  USE WHEN: External research, package discovery
  - brave_web_search → General queries, recent events
  - brave_local_search → Location-based searches
  MAX: 20 results per request, use offset for pagination

mcp__gemini-cli__* (Analysis & Change Mode):
  USE WHEN: Complex analysis, structured edits
  - ask-gemini --changeMode → Get structured edit suggestions
  - brainstorm → Generate novel solutions
  BENEFIT: Alternative perspective, chunked responses

ERROR HANDLING patterns:
  IF mcp_timeout:
    → Retry once with increased timeout
    → Fallback to manual implementation
  IF mcp_not_available:
    → Use alternative tool from same category
    → Document in event-stream.md
  IF mcp_error:
    → Log detailed error
    → Attempt recovery or graceful degradation
```

### 5.3 Code Standards
```
ENFORCE:
  - Components ≤ 50 lines
  - Single responsibility principle
  - Enable RLS immediately on tables
  - WCAG 2.1 AA+ compliance
  - 44-48px touch targets minimum
```

### 5.4 Parallel Agent Workflows for Topical Files
```
WHEN maintaining/creating topical documentation:
  USE parallel agents for efficiency:
    1. Launch multiple Task agents simultaneously
    2. Each agent handles one topical domain
    3. Coordinate results in architecture-core.md

EXAMPLE workflow:
  # Launch in parallel (single message, multiple Task tools):
  - index-analyzer → Update architecture-core.md v4.0
  - architecture-maintainer → Validate drift & truth
  - tree-of-thought-agent → Create logical hierarchies

TOPICAL DOMAINS to maintain:
  - ui-components → /components/ analysis
  - database-schema → /supabase/ structure
  - api-endpoints → /app/api/ documentation
  - medical-engine → /lib/medical/ logic
  - state-management → /lib/stores/ patterns
  - pdf-generation → /lib/pdf/ workflows

COORDINATION pattern:
  1. Extract from PROJECT_INDEX.json using jq
  2. Each agent updates their section
  3. index-analyzer consolidates into architecture-core.md
  4. Maintain 150-line limit via topical pointers
```

### 5.5 Test-Driven Development with Browser MCP
```
TDD WORKFLOW with manageable commits:

COMMIT-BOUNDED TESTING pattern:
  1. BEFORE implementation:
     → Write failing test (Red phase)
     → Commit test with message: "test: add failing test for [feature]"

  2. DURING implementation:
     → Write minimal code to pass (Green phase)
     → Run: npm test -- --testNamePattern="[feature]"
     → Commit when passing: "feat: implement [feature] to pass test"

  3. AFTER implementation:
     → Refactor for quality (Refactor phase)
     → Ensure tests still pass
     → Commit: "refactor: improve [feature] implementation"

BROWSER MCP for E2E Testing:
  SETUP phase:
    → mcp__browsermcp__browser_navigate to localhost:3000
    → IF auth_required:
      → PROMPT: "Please authenticate in browser, then confirm"
      → WAIT for user confirmation
      → mcp__browsermcp__browser_snapshot to verify logged in

  TEST execution:
    → browser_navigate to test page
    → browser_snapshot for element references
    → browser_click/type for interactions
    → browser_screenshot for visual verification
    → browser_get_console_logs for error detection

  VALIDATION:
    → Compare screenshots against baseline
    → Check console for errors
    → Verify expected elements present
    → Log results to test-results/

GITHUB INTEGRATION workflow:
  PRE-COMMIT hooks:
    → Run affected unit tests
    → Check type safety (npm run type-check)
    → Lint changed files (npm run lint)
    → BLOCK commit if failing

  COMMIT strategy:
    → Atomic commits (one feature/fix per commit)
    → Conventional commit messages
    → Link to issue/task in process-tracker.md or product-tracker.md

  PR CREATION with gh CLI:
    → After 3-5 related commits
    → Run full test suite
    → Generate PR with test results:
      gh pr create --title "[Type]: Description" \
        --body "## Tests\n$(npm test 2>&1)"

  PR VALIDATION:
    → Browser MCP E2E suite
    → Coverage report generation
    → Performance metrics
    → Accessibility audit

TEST ORGANIZATION:
  Unit tests:
    → Location: __tests__/[component].test.tsx
    → Coverage target: 80%+
    → Run: npm test

  Integration tests:
    → Location: tests/integration/
    → API endpoints, database operations
    → Run: npm run test:integration

  E2E tests (Browser MCP):
    → Location: tests/e2e/
    → User flows, visual regression
    → Run: Via browser MCP orchestration

FEEDBACK LOOP optimization:
  → Fail fast: Run fastest tests first
  → Parallel execution where possible
  → Cache test results between runs
  → Only run affected tests on file change
  → Full suite only on PR/merge
```

### 5.6 Postflight Verification System
```
POSTFLIGHT CHECKS before task completion:

INVOCATION:
  → ALWAYS run before marking tasks complete
  → Chain: test-runner → postflight-validator
  → Block task completion if failing

VERIFICATION CHECKLIST:
  Code Quality:
    □ All tests passing (unit, integration, E2E)
    □ Type checking clean (npm run type-check)
    □ Linting passed (npm run lint)
    □ Coverage maintained/improved

  Documentation:
    □ Code comments for complex logic
    □ README updated if API changed
    □ Session artifacts generated
    □ Event-stream.md updated

  Architecture:
    □ No architectural drift detected
    □ Dependencies properly declared
    □ Security best practices followed
    □ Performance benchmarks met

  Process Compliance:
    □ Workflow pattern followed
    □ Proper agent chains used
    □ MCP tools utilized appropriately
    □ Git commits follow convention

FAILURE HANDLING:
  IF verification_fails:
    → Generate failure report
    → Suggest remediation steps
    → BLOCK task completion
    → Loop back to Step 4 (Execute)

  IF all_checks_pass:
    → Mark task complete in process-tracker.md or product-tracker.md
    → Update progress metrics
    → Log success to event-stream.md
```

## 6. OUTPUT SPECIFICATIONS

### 6.1 Event Logging Format
```
AFTER each significant action:
  LOG to event-stream.md:
    Format: HH:MM:SS | TYPE | ACTION | OUTCOME | DETAILS
    Types: CONTEXT, PLAN, TASK, EXECUTE, VERIFY, DOC, ERROR
```

### 6.2 Session Artifacts
```
CREATE in docs/session/[session-id]/:
  - session-info.md (metadata)
  - plan.md (objectives and approach)
  - outcomes.md (results and metrics)
  - specs/ (if specifications created)
  - test-results/ (if tests run)
```

### 6.3 State Updates
```
MAINTAIN continuously:
  - architecture-core.md (version, checksum)
  - event-stream.md (all activities)
  - process-tracker.md (process tasks & objectives)
  - product-tracker.md (product tasks & objectives)
```

### 6.4 Documentation Iteration
```
UPDATE existing documents:
  ALWAYS:
    ✓ Edit existing files in-place
    ✓ Use MultiEdit for batch updates
    ✓ Archive obsolete files to .claude/archive/
    ✓ Track changes with git diff

  NEVER:
    ✗ Create "new-version.md" files
    ✗ Generate "update-complete.md" reports
    ✗ Duplicate information across files
    ✗ Leave obsolete files in main directories

  WORKFLOW:
    1. Check existing docs first
    2. Update relevant sections
    3. Log changes to event-stream.md
    4. Archive if replacing entirely
```

## 7. QUALITY GATES

### 7.1 Phase Validation
```
BEFORE phase transition:
  CHECK:
    ✓ Current phase objectives met
    ✓ Required deliverables present
    ✓ Tests passing (if applicable)
    ✓ Documentation updated
```

### 7.2 Loop Control
```
MONITOR loop iterations:
  Phase 1 (Research): Max 3 loops
  Phase 2 (Specification): Max 5 loops
  Phase 3 (Planning): Max 2 loops
  Phase 4 (Execution): Max 10 loops
  Phase 5 (Cleanup): Max 1 loop

  IF max_loops exceeded:
    WARN user
    REQUEST guidance
```

## 8. CODE NAVIGATION WITH INDEX

### 8.1 Using PROJECT_INDEX.json
```
WHEN: Need to understand code structure
THEN: Use index-analyzer agent

EXAMPLES:
  - "Use index-analyzer to find auth implementation"
  - "Use index-analyzer to trace payment flow"
  - "Use index-analyzer to find where X is called"

NEVER:
  ✗ Load PROJECT_INDEX.json directly (@PROJECT_INDEX.json)
  ✗ Try to read the entire index file

ALWAYS:
  ✓ Use index-analyzer agent for code intelligence
  ✓ Reference specific sections from its analysis
  ✓ Run /index to regenerate if > 24 hours old
```

## 9. PROJECT CONTEXT

### 9.1 System Overview
```
PROJECT: The Fountain Studio Website
STACK: Next.js 15, TypeScript, React 19, Supabase, Tailwind CSS
PURPOSE: Swiss sound healing & wellness studio website
TYPE: Multi-language (DE/EN) single-page narrative
```

### 9.2 Key Components
```
UI: shadcn/ui components with Swiss design palette
I18N: Dictionary-based translation system
AUTH: Supabase Auth with cookie-based sessions
BOOKING: Cal.com integration (planned)
CONTACT: WhatsApp integration
```

### 9.3 Test Credentials
```
EMAIL: quiquequoidontou@proton.me
PASSWORD: maisouestdoncornicar?
ACCESS: Password login for @proton.me domains only
```

## 10. COMMAND REFERENCE

### 10.1 Slash Commands
```
/status         → Show current phase and loop
/prime-research → Load research context
/prime-spec     → Load specification context
/prime-planning → Load planning context
/prime-execution → Load execution context
/prime-cleanup  → Load cleanup context
/switch-workflow → Toggle product/process mode
/validate-phase → Run completion validation
```

### 10.2 Session Hooks
```
AUTOMATIC execution:
  SessionStart.sh → Initialize session
  context-loader.sh → Detect task type
  simple-event-logger.sh → Log events
  maintain-files.sh → Sync state files
  SessionEnd.sh → Checkpoint state
```

---
*Memory System v1.0 | Streamlined for efficiency | Delegates details to @context.md*

