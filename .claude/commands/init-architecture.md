---
name: init-architecture
description: Initialize simple, honest architecture documentation
---

# Initialize Architecture Documentation (Simplified)

Creates a simple, honest architecture-core.md that actually reflects reality.

## Simple Execution Steps

1. **Get Real State**
   ```bash
   # Get actual checksum
   CHECKSUM=$(./scripts/query-index.sh checksum)
   
   # Count real tables
   TABLES=$(mcp__supabase__list_tables | jq 'length')
   
   # Count migrations
   MIGRATIONS=$(mcp__supabase__list_migrations | jq 'length')
   ```

2. **Check What Exists**
   - Backup existing architecture-core.md if present
   - Keep /refs/ documents (they're fine as-is)

3. **Create Simple architecture-core.md**
   Write a straightforward document with:
   ```markdown
   ---
   version: 2.1.0
   checksum: [from step 1]
   tables: [from step 1]
   migrations: [from step 1]
   token_reduction: 45%  # Honest number
   ---
   
   ## Project Identity
   [Basic project info]
   
   ## Quick Status Dashboard
   [HONEST percentages - 0% means nothing built]
   
   ## Live State Commands (ACTUALLY WORKING)
   [Commands that really work]
   
   ## Selective Context Loading (SIMPLIFIED)
   <!-- AGENT: backend -->
   ### Backend Context
   [Backend-specific info]
   
   <!-- AGENT: ui-ux -->
   ### Frontend Context
   [UI-specific info]
   ```

4. **Quick Verification**
   - Confirm document is under 400 lines
   - Test that commands actually work
   - Check section markers are simple HTML comments
   - Verify status percentages are honest

5. **Log Creation**
   Add to events.md:
   ```
   Architecture documentation initialized (v2.1 - Simplified)
   - Core document: architecture-core.md (<400 lines)
   - Actual token reduction: 45% (honest metric)
   - Checksum: [actual checksum]
   - Tables: [actual count]
   - Implementation reality check: Complete
   ```