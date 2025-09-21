---
description: Phase 3 - Planning
allowed-tools: Write, Edit, TodoWrite
---

## 📋 Phase 3: Planning

**IMPORTANT**: First update pipeline state:
1. Use Edit tool to update `.claude/state/pipeline.json`
2. Set `"phase": 3`
3. Increment `"loops"."3"` if continuing, or set to 1 if new
4. Log phase change to events.md

Current state: !`python3 -c "import json; d=json.load(open('.claude/state/pipeline.json')); print(f\"Loop {d['loops']['3']} of {d['max_loops']['3']}\")"`

Load context:
@plan.md
@tasks.md

**Mission**: Break down into atomic, testable tasks.
**Exit**: Tasks defined OR 2 loops reached.

Create task breakdown with test criteria.