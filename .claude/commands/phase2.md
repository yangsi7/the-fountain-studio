---
description: Phase 2 - Specification Iteration
allowed-tools: Write, Edit, mcp__shadcn__*, mcp__supabase__search_docs
---

## 📝 Phase 2: Specification Iteration

**IMPORTANT**: First update pipeline state:
1. Use Edit tool to update `.claude/state/pipeline.json`
2. Set `"phase": 2`
3. Increment `"loops"."2"` if continuing, or set to 1 if new
4. Log phase change to events.md

Current state: !`python3 -c "import json; d=json.load(open('.claude/state/pipeline.json')); print(f\"Loop {d['loops']['2']} of {d['max_loops']['2']}\")"`

Load context:
@.agent-os/product/product.md
@docs/specs/*

**Mission**: Iterate on specifications with user feedback.
**Exit**: User approval OR 5 loops reached.

Generate solution specifications and await feedback.