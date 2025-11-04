---
type: shared-import
version: 1.0
description: Complete guide for project-intel.mjs CLI usage
repository: https://github.com/anthropics/project-intel
---

# project-intel.mjs Usage Guide

## Overview

`project-intel.mjs` is a CLI tool that provides targeted codebase intelligence without reading entire files. It creates and queries a JSON index (PROJECT_INDEX.json) containing symbols, dependencies, and structure.

**Key Benefit:** Retrieve specific context in <1% of tokens compared to reading full files.

---

## CLI Commands & Flags

### 1. Overview: Get High-Level Project Structure
```bash
project-intel.mjs --overview [--json]
```
**Output:** Project statistics, file counts, main directories, entry points
**Use Case:** Initial project understanding, context allocation

**Example:**
```bash
$ project-intel.mjs --overview --json
{
  "total_files": 342,
  "languages": {"typescript": 245, "javascript": 89, "json": 8},
  "entry_points": ["src/index.ts", "src/server.ts"],
  "main_directories": ["src/", "tests/", "config/"]
}
```

### 2. Search: Find Files or Content
```bash
project-intel.mjs --search <pattern> [--type <filetype>] [--json]
```
**Output:** List of files/symbols matching pattern
**Use Case:** Locate relevant code before detailed analysis

**Examples:**
```bash
# Find all authentication-related files
project-intel.mjs --search "auth" --json

# Find React components
project-intel.mjs --search "component" --type tsx --json

# Find specific function
project-intel.mjs --search "validateToken"
```

### 3. Symbols: List Functions/Classes in File
```bash
project-intel.mjs --symbols <filepath> [--json]
```
**Output:** All exported symbols (functions, classes, types) with line numbers
**Use Case:** Understand file contents without reading entire file

**Example:**
```bash
$ project-intel.mjs --symbols src/auth/login.ts --json
{
  "file": "src/auth/login.ts",
  "symbols": [
    {"name": "login", "type": "function", "line": 23, "exported": true},
    {"name": "logout", "type": "function", "line": 45, "exported": true},
    {"name": "validateSession", "type": "function", "line": 67, "exported": false}
  ]
}
```

### 4. Dependencies: Trace Imports/Exports
```bash
project-intel.mjs --dependencies <filepath> [--direction upstream|downstream] [--json]
```
**Output:** Dependency graph showing what file imports (upstream) or what imports it (downstream)
**Use Case:** Impact analysis, refactoring planning, circular dependency detection

**Examples:**
```bash
# What does login.ts import?
project-intel.mjs --dependencies src/auth/login.ts --direction upstream --json

# What files import login.ts?
project-intel.mjs --dependencies src/auth/login.ts --direction downstream --json

# Full dependency graph
project-intel.mjs --dependencies src/auth/login.ts --json
```

### 5. Map Imports: Analyze Markdown Document Dependencies
```bash
project-intel.mjs map-imports <type> [--json]
```
**Types:** `memory`, `skills`, `commands`, `agents`
**Output:** Recursive import tree showing markdown @import references
**Use Case:** Understanding documentation structure, detecting circular imports, validating import paths

**Examples:**
```bash
# Map CLAUDE.md and all its imports
project-intel.mjs map-imports memory

# Map all skills and their SKILL.md imports
project-intel.mjs map-imports skills --json

# Map all command files and their imports
project-intel.mjs map-imports commands

# Map all agent files and their imports
project-intel.mjs map-imports agents --json
```

**Output Format (Human-Readable):**
```
📋 Memory Import Map
├─ Root: CLAUDE.md (12,450 bytes, depth 0)
├─ Imports: 3 direct, 115 total files, max depth 5
├─ Circular references: 18
├─ Missing files: 43
│
└─ CLAUDE.md (12,450 bytes)
   ├─ @docs/architecture/system-overview.md (45,230 bytes)
   │  ├─ @.claude/templates/README.md (8,450 bytes)
   │  └─ @docs/guides/developing-agent-skills.md (32,100 bytes)
   │     └─ @.claude/shared-imports/CoD_Σ.md (5,600 bytes) [CIRCULAR]
   ├─ @planning.md (25,340 bytes)
   └─ @todo.md (12,890 bytes)
```

**Output Format (JSON):**
```json
{
  "type": "memory",
  "root": "CLAUDE.md",
  "totalFiles": 115,
  "maxDepth": 5,
  "circularRefs": 18,
  "missingFiles": 43,
  "tree": {
    "file": "CLAUDE.md",
    "path": "/absolute/path/to/CLAUDE.md",
    "size": 12450,
    "depth": 0,
    "imports": [
      {
        "file": "docs/architecture/system-overview.md",
        "path": "/absolute/path/to/docs/architecture/system-overview.md",
        "size": 45230,
        "depth": 1,
        "imports": [...]
      }
    ]
  }
}
```

**Special Markers:**
- `[CIRCULAR]` - Import creates circular reference (file already in chain)
- `[File not found]` - Import path doesn't exist
- `[EXTERNAL]` - Import references external file (e.g., `~/` user-level)

**Import Path Resolution:**
- Relative paths (`./`, `../`) - Resolved from current file directory
- User-level paths (`~/`) - Resolved from home directory (marked EXTERNAL)
- Absolute paths (`.claude/`, `docs/`) - Resolved from project root

**Use Cases:**
1. **Documentation Maintenance:** Find broken import links
2. **Circular Reference Detection:** Identify import loops that may cause issues
3. **Token Efficiency Analysis:** Calculate total documentation size
4. **Progressive Disclosure Validation:** Verify depth limits (≤5 hops recommended)
5. **Dependency Impact:** Understand what changes affect which documentation

**Example Workflow - Detect Broken Documentation Links:**
```bash
# Map all imports and check for missing files
result=$(project-intel.mjs map-imports memory --json)
missing=$(echo "$result" | jq '.missingFiles')

if [ "$missing" -gt 0 ]; then
  echo "⚠️  Found $missing broken import links"
  echo "$result" | jq -r '.tree | .. | select(.error? == "File not found") | .file'
fi
```

**Example Workflow - Calculate Documentation Token Budget:**
```bash
# Sum total file sizes to estimate token usage
project-intel.mjs map-imports skills --json | jq '.totalFiles, .skills[].tree.size' | awk '{sum+=$1} END {print "Total: " sum " bytes (~" int(sum/4) " tokens)"}'
```

### 6. JSON Flag: Machine-Readable Output
```bash
[any command] --json
```
**Output:** Structured JSON instead of human-readable text
**Use Case:** Parsing in skills, automation, downstream processing

---

## Integration Patterns for Agents

### Pattern 1: Intel-First Analysis
```bash
#!/usr/bin/env bash
# Instead of reading files directly, query intel first

# Bad (token-heavy):
cat src/**/*.ts | wc -l  # Reads 50,000 lines

# Good (token-efficient):
project-intel.mjs --search "authentication" --json  # Returns 5 relevant files
# Then read only those 5 files
```

### Pattern 2: Bash → Parse → Use
```markdown
## Agent Workflow

1. **Execute Intel Query**
   ```bash
   intel_output=$(project-intel.mjs --symbols src/auth/login.ts --json)
   ```

2. **Parse in Agent Prompt**
   ```
   The intel query returned: {{ intel_output }}
   Now I can see login.ts exports login() at line 23 without reading the full file.
   ```

3. **Targeted Read** (only if needed)
   ```bash
   # Read only the specific function (lines 23-40)
   sed -n '23,40p' src/auth/login.ts
   ```
```

### Pattern 3: Pre-Execution in Commands
```bash
#!/usr/bin/env bash
# .claude/commands/analyze.md pre-execution

# Generate project overview before agent starts
project-intel.mjs --overview --json > /tmp/project_overview.json

# Agent can now import overview without expensive scans
```

---

## Output Parsing Strategies

### Parsing JSON in Bash
```bash
# Using jq (recommended)
symbols=$(project-intel.mjs --symbols src/auth/login.ts --json)
function_count=$(echo "$symbols" | jq '.symbols | length')
exported=$(echo "$symbols" | jq '.symbols[] | select(.exported == true) | .name')
```

### Parsing JSON in Agent/Skill
```markdown
## Example: intel-query.md Skill

**Input:** `{"type": "symbols", "path": "src/auth/login.ts"}`

**Execute:**
```bash
output=$(project-intel.mjs --symbols src/auth/login.ts --json)
```

**Parse:**
```javascript
const data = JSON.parse(output);
const exports = data.symbols.filter(s => s.exported);
return {
  status: "success",
  file: data.file,
  exports: exports,
  line_numbers: exports.map(s => s.line)
};
```
```

---

## 10+ Practical Examples

### Example 1: Find Entry Points
```bash
project-intel.mjs --overview --json | jq '.entry_points[]'
# Output: "src/index.ts", "src/server.ts"
```

### Example 2: Locate Bug from Error Log
```bash
# Error log says: "TypeError in validateToken"
project-intel.mjs --search "validateToken" --json
# Returns: src/auth/token.ts, src/utils/jwt.ts
# Then check symbols in each
project-intel.mjs --symbols src/auth/token.ts --json
# validateToken is at line 12
```

### Example 3: Analyze Circular Dependencies
```bash
# Check if moduleA and moduleB import each other
project-intel.mjs --dependencies src/moduleA.ts --direction downstream --json | jq '.imports[] | select(.file == "src/moduleB.ts")'
project-intel.mjs --dependencies src/moduleB.ts --direction downstream --json | jq '.imports[] | select(.file == "src/moduleA.ts")'
# If both return results: circular dependency detected
```

### Example 4: Plan Refactoring
```bash
# Want to refactor utils.ts - what will break?
project-intel.mjs --dependencies src/utils.ts --direction downstream --json
# Returns all 47 files that import utils.ts
# Now you know the refactoring impact
```

### Example 5: Find All React Components
```bash
project-intel.mjs --search "component" --type tsx --json | jq '.files[]'
```

### Example 6: Understand Unknown Codebase
```bash
# Step 1: Overview
project-intel.mjs --overview

# Step 2: Entry points
project-intel.mjs --symbols src/index.ts --json

# Step 3: Trace from entry
project-intel.mjs --dependencies src/index.ts --direction upstream --json
```

### Example 7: Find All Database Queries
```bash
project-intel.mjs --search "query" --type ts --json | jq '.files[] | select(. | contains("db"))'
```

### Example 8: Locate API Routes
```bash
project-intel.mjs --search "route" --json
project-intel.mjs --search "api" --type ts --json
```

### Example 9: Find Tests for Module
```bash
# Find test file for auth.ts
project-intel.mjs --search "auth" --type test.ts --json
```

### Example 10: Symbol Inventory
```bash
# Count all exported functions
for file in $(project-intel.mjs --search "*.ts" --json | jq -r '.files[]'); do
  project-intel.mjs --symbols "$file" --json | jq '.symbols[] | select(.exported == true)'
done | jq -s 'length'
```

### Example 11: Dependency Depth
```bash
# How many levels deep are dependencies from index.ts?
project-intel.mjs --dependencies src/index.ts --direction upstream --json | jq '.imports | length'
```

### Example 12: Dead Code Detection
```bash
# Find files with no downstream dependencies (nothing imports them)
for file in $(project-intel.mjs --overview --json | jq -r '.files[]'); do
  imports=$(project-intel.mjs --dependencies "$file" --direction downstream --json | jq '.imports | length')
  if [ "$imports" -eq 0 ]; then echo "$file"; fi
done
```

---

## Performance Tips

### 1. Bounded Searches
```bash
# Bad (slow): Search entire codebase
project-intel.mjs --search "function"

# Good (fast): Bound by directory or type
project-intel.mjs --search "function" --type ts
project-intel.mjs --search "function" src/auth/
```

### 2. Cache Results
```bash
# In bash scripts, cache expensive queries
if [ ! -f /tmp/project_overview.json ]; then
  project-intel.mjs --overview --json > /tmp/project_overview.json
fi
overview=$(cat /tmp/project_overview.json)
```

### 3. Targeted Queries
```bash
# Bad: Get all symbols then filter
project-intel.mjs --symbols src/large-file.ts --json | jq '.symbols[] | select(.name == "login")'

# Good: Search for specific symbol first
project-intel.mjs --search "login" --json
```

### 4. Batch Processing
```bash
# Process multiple files in one jq command instead of loops
project-intel.mjs --overview --json | jq '.files[]' | xargs -I {} project-intel.mjs --symbols {} --json | jq -s '.'
```

---

## Troubleshooting

### Issue: "PROJECT_INDEX.json not found"
**Solution:** Run `/index` command to generate the index:
```bash
# In Claude Code
/index

# Or directly via node
node project-intel.mjs --generate-index
```

### Issue: "No results for search"
**Solution:** Check spelling, try broader pattern:
```bash
# Instead of exact match
project-intel.mjs --search "authenticateUser"

# Try partial match
project-intel.mjs --search "auth"
```

### Issue: "Index is stale"
**Solution:** Regenerate after file changes:
```bash
# In Claude Code
/index

# Or directly via node
node project-intel.mjs --generate-index --force
```

### Issue: "JSON parse error"
**Solution:** Ensure --json flag is used and output is valid:
```bash
project-intel.mjs --overview --json | jq '.'
# If this fails, regenerate index
```

---

## Best Practices

1. **Always Use --json for Automation:** Human-readable output format may change
2. **Query Before Reading:** Use intel to find targets, then read specific files
3. **Combine with MCP:** Verify intel findings with authoritative sources (Ref MCP for library docs, Supabase MCP for DB schema)
4. **Cache Session Results:** Avoid redundant queries within same session
5. **Update Index Regularly:** Hook into file write operations to keep index fresh

---

## Example: Complete Bug Diagnosis Workflow

```bash
#!/usr/bin/env bash
# Diagnose bug from error log

ERROR_MSG="TypeError: Cannot read property 'id' of undefined at validateToken"

# Step 1: Locate function
LOCATION=$(project-intel.mjs --search "validateToken" --json | jq -r '.files[0]')
echo "Found in: $LOCATION"

# Step 2: Get function details
SYMBOL=$(project-intel.mjs --symbols "$LOCATION" --json | jq '.symbols[] | select(.name == "validateToken")')
LINE=$(echo "$SYMBOL" | jq -r '.line')
echo "Function at line: $LINE"

# Step 3: Check dependencies
DEPS=$(project-intel.mjs --dependencies "$LOCATION" --direction upstream --json)
echo "Dependencies: $DEPS"

# Step 4: Read specific function (targeted read)
sed -n "${LINE},$((LINE+20))p" "$LOCATION"

# Step 5: Verify with MCP (if token validation)
# Use Ref MCP to check JWT library docs for proper usage
```

---

**Usage:** Import in agents/skills with:
```
@.claude/shared-imports/project-intel-mjs-guide.md
```

**Official Docs:** https://github.com/anthropics/project-intel
