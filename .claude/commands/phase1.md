---
description: Phase 1 - Requirements & Research
allowed-tools: Read, Grep, Glob, mcp__serena__*, mcp__context7__*, Write, Edit
---

## 📍 Phase 1: Requirements & Research

**IMPORTANT**: First update pipeline state:
1. Use Edit tool to update `.claude/state/pipeline.json`
2. Set `"phase": 1`
3. Increment `"loops"."1"` if continuing, or set to 1 if new
4. Log phase change to events.md

Current state: !`python3 -c "import json; d=json.load(open('.claude/state/pipeline.json')); print(f\"Loop {d['loops']['1']} of {d['max_loops']['1']}\")"`

Load context:
@architecture-core.md
@refs/*

**Mission**: Understand the problem space thoroughly.
**Exit**: Requirements complete OR 3 loops reached.

Begin internal code analysis with Serena MCP tools.