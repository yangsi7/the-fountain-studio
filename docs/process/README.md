# Process Documentation

## Primary Documentation

### 📖 **MEMORY-SYSTEM-GUIDE.md** - Complete Memory System v1.0 Guide
**This is the single source of truth for the Memory System v1.0 Architecture**

The comprehensive guide covers:
- **Part 1**: System Architecture (3-file core)
- **Part 2**: Load Profiles System (6 specialized profiles)
- **Part 3**: Eight-Step React Loop
- **Part 4**: State Management
- **Part 5**: Hook System Integration
- **Part 6**: MCP Tool Integration
- **Part 7**: Session Management
- **Part 8**: Migration Guide
- **Part 9**: Best Practices
- **Part 10**: Troubleshooting

## Quick Start
1. **Read MEMORY-SYSTEM-GUIDE.md** - Complete understanding of the system
2. **Check CLAUDE.md** - Step-by-step execution instructions
3. **Review context.md** - Master orchestrator and load profiles

## Files in This Directory
- **MEMORY-SYSTEM-GUIDE.md** - Comprehensive Memory System v1.0 documentation (main reference)
- **process-backlog.md** - Next steps and strategic improvements roadmap (NEW)
- **serena-integration-status.md** - Current status of Serena MCP integration (NEW)
- **README.md** - This index file

## Key Concepts
- **8-Step React Loop**: UNDERSTAND → LOAD_CONTEXT → PLAN → TASKIFY → EXECUTE → VERIFY → DOCUMENT → LOG_LOOP
- **Memory System v1.0**: 77% token reduction through intelligent profile-based loading
- **6 Load Profiles**: research (800), feature (1000), bugfix (600), ui (700), database (800), default (500)
- **State Management**: event-stream.md as primary state tracker (react-loop.json removed as unnecessary)
- **Serena Integration**: Practical approach with actionable reminders > theoretical documentation

## Serena Integration (Practical Approach)

### What We Learned
- **Infrastructure ≠ Usage**: Having tools configured doesn't mean they'll be used
- **Behavioral Adoption Required**: Clear reminders at the right moments are crucial
- **Simple > Complex**: Removed react-loop.json, simplified to event-stream.md

### Practical Integration Pattern
1. **Profile Actions**: Each profile in context.md has specific `<serena-actions>` with real tool calls
2. **React Loop Checkpoints**: Added Serena validation at steps 1, 4, and 7
3. **Reality Checks**: `grep "mcp__serena" event-stream.md` to verify actual usage

### Key Memory
- **serena_practical_usage** - Guidelines for practical Serena adoption

## Archive
Previous XML Pipeline System documentation has been archived to `.claude/archive/old-process-docs/` for reference.

---
*Memory System v1.0 - Efficiency Through Intelligence*
*Serena Integration - Practical Usage Over Theory*