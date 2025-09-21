---
description: Phase 4 - Test-Driven Execution
allowed-tools: Write, Edit, MultiEdit, Bash, mcp__playwright__*, mcp__browser__*
---

## 📍 Phase 4: Test-Driven Execution

**IMPORTANT**: First update pipeline state:
1. Use Edit tool to update `.claude/state/pipeline.json`
2. Set `"phase": 4`
3. Increment `"loops"."4"` if continuing, or set to 1 if new
4. Log phase change to events.md

Current state: !`python3 -c "import json; d=json.load(open('.claude/state/pipeline.json')); print(f\"Loop {d['loops']['4']} of {d['max_loops']['4']}\")"`

Load context:
@refs/testing-strategy.md
@refs/architecture-patterns.md

**Mission**: Red-Green-Refactor cycles.
**Exit**: All tests pass OR 10 loops reached.

Write test → Implement → Refactor.