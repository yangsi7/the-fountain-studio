# Task Completion Guidelines

## When a Task is Complete

### 1. Code Quality Checks
```bash
# Run these before marking any task complete:
npx tsc --noEmit        # TypeScript type checking
pnpm lint              # ESLint validation
```

### 2. Testing Requirements
- Manual browser testing via mcp__browsermcp__* tools
- Verify both /de and /en language routes
- Check responsive design on mobile/tablet/desktop
- Test all interactive elements
- Verify console has no errors

### 3. Documentation Updates
Required updates when code changes:
- Update relevant spec files in /docs/specs/
- Update event-stream.md with completion log
- Mark tasks complete in product-tracker.md or process-tracker.md
- Generate session artifacts in docs/session/[session-id]/

### 4. Git Workflow
```bash
# Atomic commits with conventional messages
git add .
git commit -m "type: description

Generated with Claude Code
via Happy

Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>"
```

### 5. Postflight Validation
Before marking complete, verify:
- [ ] All tests passing
- [ ] Type checking clean
- [ ] Linting passed
- [ ] Documentation updated
- [ ] No architectural drift
- [ ] MCP tools utilized appropriately
- [ ] Git commits follow convention

### 6. Memory System Updates
- Update architecture-core.md if patterns changed
- Create/update Serena memories for new patterns
- Log to event-stream.md with format:
  `HH:MM:SS | TYPE | ACTION | OUTCOME | DETAILS`

### 7. React Loop Completion
Ensure all 8 steps completed:
0. UNDERSTAND - Task classified
1. LOAD_CONTEXT - Relevant files loaded
2. PLAN - Tracker updated
3. TASKIFY - Atomic tasks created
4. EXECUTE - Implementation complete
5. VERIFY - Tests passing
6. DOCUMENT - Artifacts generated
7. LOG_LOOP - Event logged

### Block Task Completion If:
- Tests failing
- Type errors present
- Lint errors unresolved
- Documentation outdated
- Architectural drift detected