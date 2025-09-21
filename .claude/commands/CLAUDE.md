# Command System Documentation

## Purpose
Slash commands provide quick access to complex operations in the Memory System v1.0 architecture. Each command encapsulates a specific workflow aligned with the 8-Step React Loop execution pattern.

## Memory System v1.0 Integration

Commands now operate within the profile-based context loading system:
- **Profile Detection**: Commands trigger appropriate load profiles
- **Token Efficiency**: Respect profile token budgets
- **React Loop**: Follow 8-step execution pattern
- **Event Logging**: Report to event-stream.md

## Command Categories

### System Commands
Commands for Memory System maintenance and validation:

- **check-memory-system** - Validate Memory System v1.0 health (40+ tests)
- **memory-status** - Display current memory system status and metrics
- **check-drift** - Verify architecture checksum and detect drift
- **rotate-events** - Archive old events when event-stream.md exceeds 1000 lines

### Profile Commands
Commands to manually trigger specific profiles:

- **/prime-research** - Load research profile (800 tokens)
- **/prime-feature** - Load feature profile (1000 tokens)
- **/prime-bugfix** - Load bugfix profile (600 tokens)
- **/prime-ui** - Load ui profile (700 tokens)
- **/prime-database** - Load database profile (800 tokens)

### Development Commands
Commands for development workflows:

- **analyze-code** - Analyze codebase structure (research profile)
- **create-feature** - Plan new feature (feature profile)
- **fix-bug** - Debug and fix issues (bugfix profile)
- **create-component** - Create UI component (ui profile)
- **create-migration** - Create database migration (database profile)

## Command Structure

Each command follows the Memory System pattern:
```yaml
---
name: command-name
profile: [research|feature|bugfix|ui|database|default]
token_budget: [500-1000]
---

# Command Name

Purpose aligned with Memory System profile.

## Profile Activation
```
Profile: [profile-name]
Token Budget: [budget]
Files Loaded: [list]
```

## React Loop Steps
1. UNDERSTAND - Parse command intent
2. LOAD_CONTEXT - Load profile files
3. PLAN - Create execution plan
4. TASKIFY - Break into atomic tasks
5. EXECUTE - Implement solution
6. VERIFY - Run validation
7. DOCUMENT - Generate artifacts
8. LOG_LOOP - Update event-stream.md

## Usage Examples
Practical examples with expected outcomes.
```

## Available Commands

### System Maintenance

#### /check-memory-system
**Profile**: default (500 tokens)
**Purpose**: Run comprehensive Memory System health check
**Validates**: Core files, profiles, hooks, event logging, token budgets
**Output**: Health report with 40+ test results

#### /memory-status
**Profile**: default (500 tokens)
**Purpose**: Display Memory System v1.0 status
**Shows**: Core files, profiles, hooks, alignment, metrics
**Output**: Formatted status report

#### /check-drift
**Profile**: default (500 tokens)
**Purpose**: Detect architecture drift
**Checks**: Checksum comparison, file modifications
**Output**: Drift detection report with recommendations

### Profile Loading

#### /prime-research
**Profile**: research (800 tokens)
**Loads**: architecture-core.md, refs/data-flows.md, refs/state-management.md
**Use When**: Analyzing code, exploring systems, understanding architecture

#### /prime-feature
**Profile**: feature (1000 tokens)
**Loads**: architecture-core.md, refs/testing-strategy.md, package.json
**Use When**: Implementing new functionality, adding features

#### /prime-bugfix
**Profile**: bugfix (600 tokens)
**Loads**: architecture-core.md, package.json, refs/testing-strategy.md
**Use When**: Fixing errors, debugging, resolving issues

#### /prime-ui
**Profile**: ui (700 tokens)
**Loads**: refs/design-patterns.md, components/ui/CLAUDE.md, tailwind.config.ts
**Tools**: mcp__shadcn__*
**Use When**: Creating components, styling, UI work

#### /prime-database
**Profile**: database (800 tokens)
**Loads**: refs/security-layers.md, supabase/migrations/
**Tools**: mcp__supabase__*
**Use When**: Database operations, migrations, RLS policies

### Development Workflows

#### /analyze-code
**Profile**: research (800 tokens)
**Purpose**: Deep analysis of codebase structure
**Uses**: mcp__serena__* for symbol search
**Output**: Entity map, dependencies, architecture insights

#### /create-feature
**Profile**: feature (1000 tokens)
**Purpose**: Plan and implement new feature
**Creates**: product-tracker.md, implementation code
**Output**: Working feature with tests

#### /fix-bug
**Profile**: bugfix (600 tokens)
**Purpose**: Diagnose and fix bugs
**Process**: Reproduce → Diagnose → Fix → Test
**Output**: Fixed code with regression tests

#### /create-component
**Profile**: ui (700 tokens)
**Purpose**: Create new UI component
**Uses**: mcp__shadcn__* for patterns
**Output**: React component with styling

#### /create-migration
**Profile**: database (800 tokens)
**Purpose**: Create database migration
**Uses**: mcp__supabase__* for execution
**Output**: SQL migration with RLS policies

## Command Integration

### With React Loop
Commands map to specific React Loop steps:
- `analyze-code` → Steps 0-2 (Understand, Load, Plan)
- `create-feature` → Steps 2-5 (Plan through Verify)
- `fix-bug` → Steps 4-5 (Execute, Verify)
- `create-component` → Steps 4-6 (Execute through Document)
- `create-migration` → Steps 4-7 (Execute through Log)

### With State Files
Commands update state automatically:
- **event-stream.md** - All commands log events
- **process-tracker.md** - Updated for process/technical work
- **product-tracker.md** - Updated for product features
- **architecture-core.md** - Updated when structure changes

### With MCP Tools
Commands leverage appropriate tools:
- Research commands → mcp__serena__*
- UI commands → mcp__shadcn__*
- Database commands → mcp__supabase__*
- Documentation → mcp__ref__*, mcp__context7__*

## Best Practices

### Command Usage
1. **Let profiles load naturally** - Don't force profile selection
2. **Respect token budgets** - Stay within profile limits
3. **Follow React Loop** - Complete all 8 steps
4. **Log events consistently** - Use standard format

### Performance Tips
- Commands are profile-aware - automatic optimization
- Chain related commands for efficiency
- Use memory-status to monitor health
- Run check-drift after major changes

### Error Recovery
- If profile wrong → Check keyword conflicts
- If token exceeded → Optimize loaded files
- If drift detected → Update checksum
- If events missing → Check logging hooks

## Command Development

### Creating New Commands
1. Create markdown file in `.claude/commands/`
2. Specify profile and token budget
3. Map to React Loop steps
4. Document MCP tool usage
5. Add event logging format

### Command Requirements
- Clear profile alignment
- Token budget awareness
- React Loop compliance
- Event logging to event-stream.md
- Integration with state files

## Troubleshooting

### Common Issues

**Wrong profile loaded**
```bash
# Check profile detection
echo "command description" | .claude/hooks/context-loader.sh
```

**Token budget exceeded**
```bash
# Check PROJECT_INDEX.json exists
ls -lh PROJECT_INDEX.json
# Regenerate if needed
/index
```

**Events not logging**
```bash
# Check event-stream.md
tail -20 event-stream.md
```

**Architecture drift**
```bash
# Update PROJECT_INDEX.json
/index
# Use index-analyzer agent to analyze structure
```

---

*Command System for Memory System v1.0*
*Intelligent profile loading for optimal performance*