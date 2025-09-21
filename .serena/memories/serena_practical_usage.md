# Serena Practical Usage Guidelines

## Key Learning: Documentation ≠ Usage

We discovered that extensive Serena documentation existed but the tools were never actually used. The problem wasn't lack of features but lack of practical reminders.

## Practical Integration Pattern

### 1. Add Concrete Examples to Profiles
Each profile in context.md should have `<serena-actions>` with specific tool calls:
- Research: Start with `read_memory project_overview`
- Feature: Use `find_symbol` before implementing
- Bugfix: Use `search_for_pattern` for error messages

### 2. Add Checkpoints to React Loop
- Step 1: `think_about_collected_information`
- Step 4: `think_about_task_adherence`
- Step 7: `think_about_whether_you_are_done`

### 3. Simplify State Management
- Removed react-loop.json (was orphaned)
- Rely on event-stream.md for state tracking
- Keep hooks simple (detection/logging only)

## Reality Checks

Always verify Serena usage with:
```bash
grep "mcp__serena" event-stream.md
```

Should see actual tool calls, not just documentation updates.

## Anti-Patterns to Avoid
- Complex token tracking systems
- Automatic tool calls from hooks
- Theoretical documentation about future features
- Over-engineered state management

## Success Pattern
Clear, actionable reminders at the right moments > Complex automated systems