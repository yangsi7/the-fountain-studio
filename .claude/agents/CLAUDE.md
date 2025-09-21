# Agent System Documentation

## Purpose
Agents are comprehensive AI assistants that execute specific tasks within the Memory System v1.0 architecture. Each agent specializes in particular domains while following the 8-Step React Loop execution pattern.

## Memory System v1.0 Integration

### Agent Execution Context
Agents operate within the Memory System's profile-based architecture:
- **Profile Loading**: Agents inherit context from the active load profile
- **React Loop**: Follow the 8-step execution pattern
- **Event Logging**: Report to event-stream.md
- **State Updates**: Maintain process-tracker.md and product-tracker.md

### Core Domain Agents (5 Active)
**Status**: Specialized agents aligned with Memory System profiles

### Analysis & Research
- **tree-of-thought-agent.md** (402 lines) - Advanced entity mapping and relationship analysis
  - Tools: Read, Grep, Glob, mcp__serena__*, mcp__calculator__*, mcp__supabase__search_docs
  - Output: Structured JSON entity map with ≤5 word entities and relationship hierarchy
  - Profile: research (800 tokens)
  - Context: Entity mapping, dependency analysis, structural relationships

### Solution Generation
- **brainstormer.md** (229 lines) - Creative solution generation and competitive analysis
  - Tools: Read, mcp__serena__*, mcp__brave-search__*, mcp__context7__*, mcp__supabase__search_docs
  - Output: 3+ scored solutions with feasibility analysis and risk mitigation
  - Profile: feature (1000 tokens)
  - Context: Solution frameworks, best practices, innovation techniques

### Implementation Specialists
- **ui-ux-spec-agent.md** (1164 lines) - Professional UI/UX specifications
  - Tools: mcp__shadcn__*, mcp__context7__*, Read, Write, Edit, MultiEdit, Glob, Grep, WebSearch
  - Output: Complete UI specifications with accessibility standards, responsive design
  - Profile: ui (700 tokens)
  - Context: Design systems, component libraries, user experience patterns

- **supabase-architect.md** (952 lines) - Database architecture specialist
  - Tools: mcp__supabase__*, mcp__serena__*, mcp__context7__*, Read, Write, Edit, Bash, Glob
  - Output: Complete database specifications with RLS policies, migrations, performance optimization
  - Profile: database (800 tokens)
  - Context: Data modeling, security patterns, scalability considerations

### Review & Validation
- **architecture-maintainer.md** (354 lines) - Truth reconciliation and live state validation
  - Tools: Read, Write, Edit, MultiEdit, Bash, Glob, Grep, mcp__supabase__*, mcp__serena__*
  - Output: Honest documentation with verified metrics and drift detection
  - Profile: default (500 tokens)
  - Context: Documentation precision, state validation, architecture consistency

## Utility Agents (14 Active)
Available for proactive use, support various profiles:

### Implementation Support
- **supabase-specialist.md** - Comprehensive Supabase expert (architect + consultant merged)
- **file-creator.md** (360 lines) - File and directory creation with templates
- **git-workflow.md** (145 lines) - Git operations, branch management, and PR creation

### Documentation Support
- **claude-docs-fetcher.md** (74 lines) - Official Claude Code documentation retrieval
  - Tools: Bash, Glob, Grep, Read, WebFetch, MCP tools (shadcn, serena)
  - Output: Latest Claude Code documentation on hooks, memory, automations
  - Profile: default (500 tokens)
  - Context: Claude Code features, CLAUDE.md files, customization options

### Code Analysis
- **code-searcher.md** - Code location and pattern analysis with CoD mode
  - Tools: Glob, Grep, Read, mcp__serena__*, mcp__supabase__*, mcp__gemini-cli__*
  - Output: Code locations, implementations, security analysis
  - Profile: research (800 tokens)
  - Context: Code patterns, bug detection, vulnerability analysis
- **index-analyzer.md** - PROJECT_INDEX.json analysis and topical extraction
  - Tools: Read, Grep, Glob, mcp__gemini-cli__*, mcp__Ref__*
  - Output: Code intelligence from index analysis
  - Profile: research (800 tokens)
  - Context: Code structure, dependencies, architecture

### Testing & Analysis
- **test-runner.md** (61 lines) - Test execution and failure analysis
- **date-checker.md** (95 lines) - Current date and time determination
- **get-current-datetime.md** - Execute date command with timezone support
- **context-fetcher.md** (68 lines) - Relevant information extraction
- **project-manager.md** (43 lines) - Task completeness checking

### Validation Agents (4 Active)
- **karen.md** - Reality checking and completion validation
- **jenny.md** - Specification compliance verification
- **task-completion-validator.md** - Task completion verification
- **postflight-validator.md** - Comprehensive task completion verification

## Agent Integration with Memory System

### Profile Alignment
Each agent aligns with one or more Memory System profiles:

| Agent Type | Primary Profile | Token Budget | React Loop Steps |
|------------|----------------|--------------|------------------|
| Research/Analysis | research | 800 | Steps 0-2 (Understand, Load, Plan) |
| Solution Design | feature | 1000 | Steps 2-3 (Plan, Taskify) |
| UI Implementation | ui | 700 | Steps 4-5 (Execute, Verify) |
| Database Work | database | 800 | Steps 4-5 (Execute, Verify) |
| Documentation | default | 500 | Steps 6-7 (Document, Log) |

### Agent Invocation Patterns

#### Within Memory System Context
```bash
# Agent inherits active profile
Task: tree-of-thought-agent
Context: Inherited from research profile (800 tokens)
```

#### Direct Invocation
```bash
# Agent loads its own context
Task: supabase-architect
Context: Database profile loaded (800 tokens)
```

### Event Logging Protocol
All agents must log to event-stream.md:
```
HH:MM:SS | AGENT | [agent-name] | [status] | [details]

Example:
14:35:00 | AGENT | tree-of-thought | SUCCESS | Generated entity map (45 entities, 78 relationships)
```

## Agent Capabilities

### Embedded Knowledge
All comprehensive agents contain:
- **Memory System v1.0** integration patterns and profile awareness
- **8-Step React Loop** execution methodology
- **Domain Context** relevant to their specialization
- **MCP Tool Integration** with prioritized tool hierarchy
- **Event Logging** to event-stream.md with structured format

### General Purpose Specialization
- **Adaptable Precision**: Professional accuracy for any domain
- **User Optimization**: Accessibility and usability best practices
- **Compliance Support**: Data protection and regulatory awareness
- **Multi-Language Support**: Internationalization capabilities
- **Brand Integration**: Design system support

### Output Standards
- **Structured JSON**: Comprehensive specifications with metadata
- **HTML Reports**: Interactive documentation with diagrams
- **Production Code**: TypeScript/JavaScript components, SQL migrations
- **Event Logging**: Detailed execution logs with timestamps

## Agent Format (Comprehensive)
All agents follow this structure:
```yaml
---
name: agent-name
description: Purpose aligned with Memory System profile
tools: [MCP tools matching profile]
model: sonnet
profile: [research|feature|bugfix|ui|database|default]
---

# Agent Name - Domain Specialist

## Identity
Role description with Memory System integration

## Memory System Integration
### Profile: [profile-name] ([token-budget] tokens)
### React Loop Steps: [relevant steps]

## Core Responsibilities
1. Primary domain expertise
2. General purpose capabilities
3. Profile-specific execution
4. Event logging to event-stream.md

## Workflow Process
Aligned with 8-Step React Loop

## Success Metrics
Quantifiable standards aligned with profile

## Event Logging Format
HH:MM:SS | AGENT | [name] | [status] | [details]
```

## Best Practices

### Agent Design Principles
1. **Profile Alignment**: Each agent optimized for specific profiles
2. **Token Efficiency**: Respect profile token budgets
3. **React Loop Compliance**: Follow 8-step execution pattern
4. **Event Traceability**: Comprehensive logging to event-stream.md
5. **General Purpose Focus**: Work on any project type

### Quality Standards
- **Professional Precision**: High accuracy required
- **Accessibility Excellence**: WCAG 2.1 AA+ compliance
- **Data Compliance**: Privacy and security awareness
- **Documentation Truth**: Live state validation
- **Production Readiness**: No placeholders or fiction

### Maintenance Guidelines
- Agents versioned with Memory System v1.0
- Profile alignment must be maintained
- Token budgets must be respected
- Event logging format consistency required
- General purpose capability preservation mandatory

## Agent Capability Matrix

### Capability Definitions

#### Solution Generation & Planning
- **solution_generation**: Creating multiple approaches to solve problems
- **creative_ideation**: Using frameworks like SCAMPER, Design Thinking
- **approach_evaluation**: Scoring solutions on feasibility, impact, risk
- **architecture_design**: System-level design decisions
- **task_breakdown**: Converting plans into atomic, executable tasks

#### Code Intelligence
- **entity_mapping**: Identifying code entities and their relationships
- **dependency_analysis**: Understanding code dependencies and impacts
- **code_structure**: Analyzing file and symbol organization
- **topical_extraction**: Categorizing code by domain/topic
- **pattern_detection**: Finding recurring patterns and anti-patterns

#### UI/UX & Design
- **interface_design**: Creating user interface specifications
- **component_architecture**: Designing reusable component systems
- **accessibility**: Ensuring WCAG 2.1 AA+ compliance
- **responsive_design**: Multi-device layout adaptation
- **design_systems**: Creating/maintaining design tokens and patterns

#### Database & Backend
- **database_design**: Schema design, normalization, relationships
- **migration_planning**: Safe database migration strategies
- **rls_policies**: Row-level security implementation
- **data_modeling**: Entity relationships, constraints, indexes
- **api_design**: RESTful/GraphQL endpoint design

#### Testing & Quality
- **test_execution**: Running unit/integration/E2E tests
- **failure_analysis**: Identifying root causes of test failures
- **coverage_reporting**: Code coverage metrics and gaps
- **browser_testing**: Real browser E2E testing via MCP
- **quality_gates**: Enforcing minimum quality standards

#### Validation & Compliance
- **completion_verification**: Ensuring all requirements met
- **spec_compliance**: Validating against specifications
- **reality_checking**: Verifying actual vs claimed functionality
- **drift_detection**: Finding deviations from documentation
- **compliance_checking**: Process and standard adherence

### Agent Selection by Task Type

#### Feature Development
```
Primary: brainstormer → ui-ux-spec/supabase-architect → test-runner
Support: tree-of-thought, postflight-validator
Parallel: ui-ux-spec + supabase-architect for full-stack
```

#### Bug Fixing
```
Primary: tree-of-thought → test-runner → [fix] → test-runner
Support: karen (reality check), jenny (compliance)
Validation: postflight-validator
```

#### Refactoring
```
Primary: tree-of-thought → index-analyzer → [refactor] → test-runner
Support: architecture-maintainer
Parallel: Multiple index-analyzers for different domains
```

#### Documentation
```
Primary: architecture-maintainer
Support: tree-of-thought, index-analyzer
Validation: karen (truth checking)
```

#### Database Work
```
Primary: supabase-architect → supabase-implementation-consultant
Support: test-runner (migration testing)
Validation: postflight-validator
```

### Parallel Execution Capabilities

#### Agents Supporting Parallel Execution
- **brainstormer**: Run 3x for voting on solutions
- **index-analyzer**: Run per topical domain
- **ui-ux-spec**: Multiple components simultaneously
- **test-runner**: Different test suites in parallel
- **tree-of-thought**: Different analysis aspects

#### Coordination Patterns
```
PARALLEL_THEN_MERGE:
  brainstormer(3x) → vote → single solution

PARALLEL_THEN_CONVERGE:
  ui-ux-spec + supabase-architect → integration point

PARALLEL_CONTINUOUS:
  index-analyzer(per domain) → continuous updates
```

## Shared Configuration Reference

### Tool Profiles
Instead of duplicating tool lists in each agent, reference these profiles:

#### tools-base (Common Tools)
```yaml
tools: Read, Write, Edit, MultiEdit, Glob, Grep, Bash, BashOutput, KillShell
```

#### tools-research
```yaml
tools: @tools-base, mcp__serena__search_for_pattern, mcp__serena__find_file,
       mcp__serena__get_symbols_overview, mcp__serena__find_symbol,
       mcp__calculator__calculate, WebSearch, WebFetch
```

#### tools-ui
```yaml
tools: @tools-base, mcp__shadcn__*, mcp__browsermcp__*,
       mcp__context7__*, mcp__21st-dev__*, NotebookEdit
```

#### tools-database
```yaml
tools: @tools-base, mcp__supabase__*, mcp__serena__*,
       mcp__calculator__calculate, mcp__context7__*
```

#### tools-feature
```yaml
tools: @tools-base, @tools-research, mcp__brave-search__*,
       mcp__context7__*, TodoWrite, NotebookEdit
```

#### tools-testing
```yaml
tools: @tools-base, mcp__browsermcp__*, mcp__puppeteer__*,
       mcp__supabase__get_logs, BashOutput
```

### Memory System v1.0 Standard Integration
```yaml
# Reference this in agents instead of repeating:
memory_integration: @.claude/agents/CLAUDE.md#memory-system-integration
profile: [research|feature|bugfix|ui|database|default]
budget: [tokens allocated by profile]
chain_position: [Steps in React Loop]
```

### Event Logging Format
```yaml
# Standard format for all agents:
event_format: "HH:MM:SS | TYPE | ACTION | OUTCOME | DETAILS"
types: [CONTEXT, PLAN, TASK, EXECUTE, VERIFY, DOC, ERROR]
```

### MCP Tool Priority
```yaml
priority_1: index-analyzer agent (PROJECT_INDEX.json analysis)
priority_2: mcp__serena__* (code navigation)
priority_3: mcp__supabase__* (database operations)
priority_4: mcp__shadcn__* (UI components)
priority_5: mcp__browsermcp__* (E2E testing)
```

### Token Budget Allocation
| Profile  | Budget | Typical Context Files |
|----------|--------|----------------------|
| research | 800    | architecture-core.md + refs |
| feature  | 1000   | architecture-core.md + testing |
| bugfix   | 600    | architecture-core.md + package.json |
| ui       | 700    | design-patterns.md + components |
| database | 800    | security-layers.md + migrations |
| default  | 500    | architecture-core.md + README |

## Migration Status

### Alignment Progress (Completed)
- ✅ All 17 agents aligned with Memory System v1.0
- ✅ YAML headers standardized with comprehensive examples
- ✅ Tool profiles created for deduplication
- ✅ Chain position documentation added
- ✅ Non-standard fields removed (color, model: inherit, self_prime)
- ✅ Event logging format consistent across all agents

### System Status
- ✅ Memory System v1.0 fully integrated
- ✅ 8-Step React Loop terminology consistent
- ✅ All agents are general purpose (not project-specific)
- ✅ Profile token budgets respected
- ✅ Capability matrix integrated for agent selection

---

## Configuration Reference (Single Source of Truth)

### Token Budget Allocation
All agents must respect these token budgets based on their profile:

| Profile | Token Budget | Primary Files | Use Case |
|---------|--------------|---------------|----------|
| research | 800 | architecture-core.md, refs/data-flows.md, refs/state-management.md | Understanding existing code, analyzing systems |
| feature | 1000 | architecture-core.md, refs/testing-strategy.md, package.json | Implementing new functionality |
| bugfix | 600 | architecture-core.md, package.json | Fixing errors, debugging issues |
| ui | 700 | refs/design-patterns.md, components/ui/CLAUDE.md, tailwind.config.ts | UI/UX work, component creation |
| database | 800 | refs/security-layers.md, supabase/migrations/ | Database operations, migrations |
| default | 500 | architecture-core.md, README.md | General tasks, documentation |

### MCP Tool Priority Hierarchy
Canonical tool priority order for all agents:

1. **mcp__serena__*** - Code navigation and search (ALWAYS first for code analysis)
2. **mcp__supabase__*** - Database operations (when working with Supabase)
3. **mcp__shadcn__*** - UI component discovery (for UI work)
4. **mcp__ref__*** - Documentation lookup
5. **mcp__brave-search__*** - Web search for external info
6. **mcp__browsermcp__*** - E2E browser testing
7. **mcp__calculator__*** - Calculations
8. **mcp__context7__*** - Library context
9. **mcp__gemini-cli__*** - Alternative analysis

### Common Memory System v1.0 Integration Pattern
All agents should reference this pattern instead of duplicating:

```markdown
## Memory System v1.0 Integration
### Profile: [profile-name] ([token-budget] tokens)
- See @.claude/agents/CLAUDE.md#token-budget-allocation for budget
### React Loop Steps: [relevant steps from 0-7]
### Event Logging: HH:MM:SS | AGENT | [name] | STATUS | DETAILS
### MCP Priority: See @.claude/agents/CLAUDE.md#mcp-tool-priority-hierarchy
```

### Standard Event Logging Formats
All agents must use these consistent formats:

```
Agent Events:
HH:MM:SS | AGENT | [agent-name] | [STATUS] | [details]

Task Events:
HH:MM:SS | TASK | [action] | [OUTCOME] | [details]

Error Events:
HH:MM:SS | ERROR | [agent-name] | [FAILURE] | [error-message]

Example:
14:35:00 | AGENT | brainstormer | SUCCESS | Generated 3 solutions, selected hybrid approach
```

### Standard Tool Lists by Agent Type

#### Research & Analysis Agents
```yaml
tools: Read, Grep, Glob, mcp__serena__list_dir, mcp__serena__find_file,
       mcp__serena__search_for_pattern, mcp__serena__get_symbols_overview,
       mcp__serena__find_symbol, mcp__serena__find_referencing_symbols,
       mcp__calculator__calculate, mcp__Ref__ref_search_documentation
```

#### Solution & Design Agents
```yaml
tools: Read, Write, Edit, MultiEdit, Bash, Glob, Grep,
       mcp__serena__write_memory, mcp__serena__read_memory,
       mcp__brave-search__brave_web_search, mcp__brave-search__brave_local_search,
       mcp__supabase__search_docs, mcp__Ref__ref_search_documentation,
       mcp__calculator__calculate, mcp__gemini-cli__brainstorm
```

#### UI/UX Implementation Agents
```yaml
tools: Read, Write, Edit, MultiEdit, Glob, Grep, WebSearch,
       mcp__shadcn__get_project_registries, mcp__shadcn__list_items_in_registries,
       mcp__shadcn__search_items_in_registries, mcp__shadcn__view_items_in_registries,
       mcp__shadcn__get_item_examples_from_registries, mcp__shadcn__get_add_command_for_items,
       mcp__shadcn__get_audit_checklist, mcp__browsermcp__browser_navigate,
       mcp__browsermcp__browser_snapshot, mcp__browsermcp__browser_click,
       mcp__browsermcp__browser_screenshot
```

#### Database Implementation Agents
```yaml
tools: Bash, Read, Write, Edit, MultiEdit, Glob, Grep,
       mcp__supabase__search_docs, mcp__supabase__list_tables,
       mcp__supabase__list_extensions, mcp__supabase__list_migrations,
       mcp__supabase__apply_migration, mcp__supabase__execute_sql,
       mcp__supabase__get_logs, mcp__supabase__get_advisors,
       mcp__supabase__get_project_url, mcp__supabase__get_anon_key,
       mcp__supabase__generate_typescript_types, mcp__supabase__list_edge_functions,
       mcp__supabase__deploy_edge_function, mcp__serena__find_symbol
```

#### Testing & Validation Agents
```yaml
tools: Bash, Read, Grep, Glob, BashOutput, KillShell,
       mcp__browsermcp__browser_navigate, mcp__browsermcp__browser_snapshot,
       mcp__browsermcp__browser_click, mcp__browsermcp__browser_screenshot,
       mcp__browsermcp__browser_get_console_logs
```

#### Utility Agents (Minimal)
```yaml
tools: Read, Grep, Glob, Bash
```

### Chain Position Reference
Where agents fit in the workflow automaton:

| Agent | Chain Position | Typical Flow |
|-------|----------------|--------------|
| tree-of-thought | INIT → PLANNING | Analysis before planning |
| brainstormer | PLANNING | Solution generation |
| ui-ux-spec | EXECUTION | UI implementation |
| supabase-architect | PLANNING → EXECUTION | DB design then implementation |
| test-runner | TDD_LOOP | Test-driven development |
| code-searcher | INIT → PLANNING | Code location and analysis |
| index-analyzer | INIT → PLANNING | Code structure analysis |
| claude-docs-fetcher | Any | Claude Code documentation retrieval |
| postflight-validator | VERIFICATION | Final validation |
| architecture-maintainer | COMPLETION | Documentation updates |
| karen/jenny | VERIFICATION | Reality/compliance checking |

---
*Memory System v1.0 with General Purpose Agent Architecture*
*Status: Fully Aligned - All agents operational*
*Configuration: Centralized reference for consistency*