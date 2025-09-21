---
description: Phase 5 - Cleanup & Documentation
allowed-tools: Write, Edit, MultiEdit, Bash
---

## 📍 Phase 5: Cleanup & Documentation

**IMPORTANT**: First update pipeline state:
1. Use Edit tool to update `.claude/state/pipeline.json`
2. Set `"phase": 5`
3. Increment `"loops"."5"` if continuing, or set to 1 if new
4. Log phase change to events.md

Current state: !`python3 -c "import json; d=json.load(open('.claude/state/pipeline.json')); print(f\"Loop {d['loops']['5']} of {d['max_loops']['5']}\")"`

Load context:
@architecture-core.md
@refs/*

**Mission**: Refactor, document, archive.
**Exit**: Single pass completion.

Clean code, update docs, remove dead code.