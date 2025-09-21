# Hooks System Documentation - Memory System v1.0

> Updated: 2025-01-13
> Configuration: `.claude/settings.json`

## Active Hooks (7 Essential)

### 1. SessionStart.sh
- **Trigger**: Session initialization
- **Purpose**: Create session folders, run maintenance checks
- **Output**: Session folder path, project status

### 2. context-loader.sh ⭐ NEW
- **Trigger**: UserPromptSubmit (every user message)
- **Purpose**: Detect task type and show profile loading
- **Profiles**: research, feature, bugfix, ui, database, default
- **Output**: Task type detection and token budget

### 3. maintain-files.sh
- **Trigger**: Manual or via SessionStart
- **Purpose**: Check file ages and architecture drift
- **Files Checked**: context.md, architecture-core.md, process-tracker.md, product-tracker.md

### 4. check-architecture.sh
- **Trigger**: Manual
- **Purpose**: Verify architecture documentation current
- **Validates**: Memory System v1.0, checksums, file ages

### 5. rotate-events.sh
- **Trigger**: Manual when event-stream.md > 1000 lines
- **Purpose**: Archive old events, keep recent 500 lines
- **Archive**: `.archive/events/event-stream-TIMESTAMP.md`

### 6. simple-event-logger.sh ⭐ NEW
- **Trigger**: PostToolUse for Write|Edit|MultiEdit
- **Purpose**: Minimal event logging
- **Format**: `HH:MM:SS | TYPE | ACTION | OUTCOME | DETAILS`

### 7. SessionEnd.sh
- **Trigger**: Session end
- **Purpose**: Save checksums, checkpoint state
- **Output**: Session summary, uncommitted changes warning

## Configuration

All hooks are configured in `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": ["SessionStart.sh"],
    "UserPromptSubmit": ["context-loader.sh"],
    "PostToolUse": ["simple-event-logger.sh"],
    "SessionEnd": ["SessionEnd.sh"]
  }
}
```

## Archived Hooks

The following hooks have been archived to `.claude/hooks/archived/`:
- smart-context-loader.sh (replaced by context-loader.sh)
- auto-event-logger.sh (replaced by simple-event-logger.sh)
- session-tracker.sh (functionality merged)
- system-health.sh (not needed)
- cleanup-sessions.sh (manual process)
- gate-validate.sh (not integrated)

## Troubleshooting

### Hook Not Executing
```bash
# Check if hook is executable
ls -la .claude/hooks/hook-name.sh

# Make executable if needed
chmod +x .claude/hooks/hook-name.sh

# Check configuration
cat .claude/settings.json | grep hook-name
```

### Profile Detection Issues
```bash
# Test context-loader manually
echo "Your task description" | .claude/hooks/context-loader.sh

# Check event log for detection
tail -5 event-stream.md
```

### Event Logging Issues
```bash
# Check event-stream.md exists
touch event-stream.md

# Check permissions
ls -la event-stream.md

# Manually rotate if too large
.claude/hooks/rotate-events.sh
```

### Architecture Drift
```bash
# Run check manually
.claude/hooks/check-architecture.sh

# Update checksum if legitimate changes
./scripts/query-index.sh checksum
# Then update in architecture-core.md metadata
```

## Key Files

- **context.md** - Master orchestrator with profiles
- **event-stream.md** - Simple event log
- **architecture-core.md** - Core architecture truth
- **.claude/settings.json** - Unified configuration

## Memory System Integration

The hooks are fully integrated with Memory System v1.0:
- Context profiles load automatically based on task type
- Event logging uses simple format for efficiency
- All hooks reference the correct files (context.md, event-stream.md)
- Token budget aware (target <1500 per session)

---
*Part of Memory System v1.0 - 64% token reduction achieved*