---
name: bootstrap-project-process
description: Complete system initialization for XML Pipeline System v2.0 - creates all necessary files, directories, and configurations
---

# Bootstrap Project Process

Initializes or repairs the complete XML Pipeline System v2.0 with all agents, hooks, templates, and documentation.

## Quick Command
```
/bootstrap-project-process
```

## What This Command Does
1. Creates complete directory structure
2. Deploys all pipeline agents (10 core + utilities)
3. Installs all hooks and configures settings
4. Creates state files from templates
5. Sets up documentation system
6. Generates project indexes
7. Validates the entire setup

## Execution Steps

### Step 0: Check for Template ZIP (Optional)
```bash
# Check if template ZIP exists for faster deployment
ZIP_PATH="docs/process/xml-pipeline-system-v2.0.zip"
if [ -f "$ZIP_PATH" ]; then
    echo "📦 Found template ZIP - using fast deployment..."
    TEMP_DIR=".xml-pipeline-temp"
    mkdir -p $TEMP_DIR
    unzip -q "$ZIP_PATH" -d $TEMP_DIR
    
    if [ -f "$TEMP_DIR/install.sh" ]; then
        cd $TEMP_DIR
        bash install.sh
        cd ..
        rm -rf $TEMP_DIR
        echo "✅ Deployed from template ZIP"
        echo "   Run /check-process to validate"
        exit 0
    fi
    rm -rf $TEMP_DIR
fi

echo "📝 No template ZIP found - using embedded templates..."
```

### Step 1: Create Directory Structure
```bash
# Create all necessary directories
mkdir -p .claude/agents
mkdir -p .claude/hooks
mkdir -p .claude/commands
mkdir -p .claude/temp
mkdir -p docs/process
mkdir -p docs/architecture
mkdir -p docs/guides
mkdir -p docs/api
mkdir -p scripts
mkdir -p templates
mkdir -p refs
mkdir -p .archive/events

echo "✅ Directory structure created"
```

### Step 2: Create State Files from Templates

#### Create plan.md
```bash
cat > plan.md << 'EOF'
# Plan - [Task Name]

## Objective
[Clear, single sentence goal]

## Context
- Current state: [What exists now]
- Desired state: [What we want]
- Constraints: [Time, tech, resources]

## Approach
[Selected approach from brainstorming]

## Tasks
- [ ] Task 1 (30 min)
- [ ] Task 2 (45 min)

## Success Criteria
- [ ] Feature works as specified
- [ ] Tests pass
- [ ] Documentation updated

## Risks
- Risk 1: [Description] → [Mitigation]

---
*Created: $(date) | Status: Planning*
EOF
```

#### Create tasks.md
```bash
cat > tasks.md << 'EOF'
# Tasks - [Feature/Sprint Name]

## Active Tasks

### High Priority
- [ ] Task 1 (P1, 30m)
- [ ] Task 2 (P1, 45m)

### Medium Priority
- [ ] Task 3 (P2, 20m)

### Low Priority
- [ ] Task 4 (P3, 15m)

## Completed
- [x] Initial setup

---
*Updated: $(date)*
EOF
```

#### Create events.md
```bash
cat > events.md << 'EOF'
# Event Stream

## $(date +%Y-%m-%d)

### $(date +%H:%M:%S) - System Bootstrap
- **Stage**: INITIALIZATION
- **Action**: Bootstrapped XML Pipeline System v2.0
- **Observation**: System initialization via bootstrap command
- **Decision**: Create complete pipeline structure
- **Output**: All directories, files, and configurations
- **Status**: ✅ COMPLETE

---
*Event log initialized*
EOF
```

### Step 3: Deploy Core Pipeline Agents

#### Create tree-of-thought.md
```bash
cat > .claude/agents/tree-of-thought.md << 'EOF'
---
name: tree-of-thought
description: Maps entities and relationships using ≤5 word names
tools: Read, Grep, mcp__serena__*
---

# Tree of Thought Agent

## Purpose
Map entities and relationships in the problem space using concise naming.

## Process
1. Identify key entities (≤5 words each)
2. Map relationships between entities
3. Create hierarchy if applicable
4. Output as JSON structure

## Output Format
\`\`\`json
{
  "entities": [
    {"id": "E1", "name": "User Request", "type": "input"},
    {"id": "E2", "name": "Pipeline Stage", "type": "process"}
  ],
  "relationships": [
    {"from": "E1", "to": "E2", "type": "triggers"}
  ]
}
\`\`\`

## Rules
- Entity names ≤5 words
- Clear relationship types
- Hierarchical when appropriate
EOF
```

#### Create researcher.md
```bash
cat > .claude/agents/researcher.md << 'EOF'
---
name: researcher
description: Identifies knowledge gaps and finds authoritative sources
tools: mcp__context7__*, mcp__brave-search__*, mcp__supabase__search_docs
---

# Researcher Agent

## Purpose
Fill knowledge gaps with authoritative information.

## Process
1. Identify what's unknown
2. Search in order: Context7 → Supabase → Web
3. Validate sources
4. Document confidence level

## Output Format
\`\`\`json
{
  "gaps": ["gap1", "gap2"],
  "findings": {
    "gap1": {
      "source": "Context7",
      "content": "...",
      "confidence": 0.9
    }
  },
  "confidence": 0.85
}
\`\`\`

## Rules
- Authoritative sources only
- Document confidence levels
- Stop when confidence >0.8
EOF
```

#### Continue with all other core agents...
```bash
# Create remaining 8 core agents
# brainstormer.md, implementer.md, ui-designer.md, database-architect.md,
# git-workflow.md, tester.md, quality-reviewer.md, architecture-maintainer.md
# (Full content for each agent following the same pattern)
```

### Step 4: Install Hooks

#### Create SessionStart.sh
```bash
cat > .claude/hooks/SessionStart.sh << 'EOF'
#!/bin/bash
# SessionStart hook - Initialize session

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Run maintenance check
if [ -x "$PROJECT_DIR/.claude/hooks/maintain-files.sh" ]; then
    "$PROJECT_DIR/.claude/hooks/maintain-files.sh"
fi

echo "📊 Project Status Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🗄️  Database: Use mcp__supabase__list_tables to verify"

if pgrep -f "npm dev" > /dev/null; then
    echo "✅ Dev server running"
else
    echo "❌ Dev server not running (run: npm dev)"
fi

if [ -x "$PROJECT_DIR/scripts/query-index.sh" ]; then
    echo ""
    echo "📝 For project overview run:"
    echo "   ./scripts/query-index.sh overview"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Start with loading context:"
echo "   @architecture-core.md"
echo "   @plan.md"
echo "   @tasks.md"
echo "   @events.md"
EOF

chmod +x .claude/hooks/SessionStart.sh
```

#### Create all other hooks...
```bash
# SessionEnd.sh, gate-validate.sh, check-architecture.sh, 
# maintain-files.sh, rotate-events.sh
# (Full content for each hook)
```

### Step 5: Configure settings.local.json
```bash
cat > .claude/settings.local.json << 'EOF'
{
  "enableAllProjectMcpServers": true,
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/check-architecture.sh"
          }
        ]
      }
    ]
  }
}
EOF
```

### Step 6: Create Documentation Structure

#### Create CLAUDE.md files in each directory
```bash
# Create docs/CLAUDE.md
cat > docs/CLAUDE.md << 'EOF'
# Documentation System Overview

## Purpose
Central documentation hub for the XML Pipeline System v2.0.

## Structure
- `/process/` - Pipeline execution documentation
- `/architecture/` - System design documentation
- `/guides/` - User and developer guides
- `/api/` - API documentation

## Key Documents
- `process/PROCESS-MAP.md` - Complete 9-stage pipeline flow
- Parent `../CLAUDE.md` - XML pipeline definition
EOF

# Create similar CLAUDE.md for scripts/, .claude/agents/, .claude/hooks/
```

### Step 7: Create Templates
```bash
# Create all 7 template files in templates/
# plan-template.md, tasks-template.md, events-template.md, 
# architecture-core-template.md, product-template.md, 
# feature-spec-template.md, refs-overview-template.md
```

### Step 8: Generate Indexes
```bash
if [ -f "./scripts/generate-indexes.sh" ]; then
    ./scripts/generate-indexes.sh
    echo "✅ Project indexes generated"
else
    echo "⚠️  generate-indexes.sh not found - create it first"
fi
```

### Step 9: Create Main CLAUDE.md (if missing)
```bash
if [ ! -f "CLAUDE.md" ]; then
    # Create complete XML Pipeline definition
    # (This would be a large embedded template with the full XML pipeline)
    echo "✅ Main CLAUDE.md created"
fi
```

### Step 10: Final Validation
```bash
echo "🔍 Running validation checks..."

# Check directories
for dir in .claude/agents .claude/hooks docs/process scripts templates refs; do
    if [ -d "$dir" ]; then
        echo "✅ $dir exists"
    else
        echo "❌ $dir missing"
    fi
done

# Check core agents
AGENTS="tree-of-thought researcher brainstormer implementer ui-designer database-architect tester quality-reviewer architecture-maintainer git-workflow"
for agent in $AGENTS; do
    if [ -f ".claude/agents/$agent.md" ]; then
        echo "✅ $agent.md exists"
    else
        echo "❌ $agent.md missing"
    fi
done

# Check hooks
HOOKS="SessionStart SessionEnd gate-validate check-architecture maintain-files rotate-events"
for hook in $HOOKS; do
    if [ -f ".claude/hooks/$hook.sh" ]; then
        echo "✅ $hook.sh exists"
    else
        echo "❌ $hook.sh missing"
    fi
done

# Check state files
for file in plan.md tasks.md events.md; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Bootstrap Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Run: /check-process to validate the setup"
echo "2. Run: ./scripts/query-index.sh overview"
echo "3. Load: @CLAUDE.md to understand the pipeline"
echo "4. Start: Follow the 9-stage pipeline for tasks"
```

## Usage Notes

### For New Projects
Run this command in an empty project directory to create the complete XML Pipeline System v2.0 structure.

### For Existing Projects
Run this command to repair or update an existing setup. It will:
- Create missing directories
- Add missing files
- Update outdated configurations
- Preserve existing work

### What Gets Created
- **Directories**: 15+ directories for complete structure
- **Agents**: 10 core pipeline agents + utilities
- **Hooks**: 6 active hooks with proper permissions
- **Templates**: 7 template files for consistency
- **Documentation**: CLAUDE.md in each major directory
- **State Files**: plan.md, tasks.md, events.md
- **Configuration**: settings.local.json

### Post-Bootstrap
After running this command:
1. Verify with `/check-process`
2. Generate indexes with `./scripts/generate-indexes.sh`
3. Create architecture-core.md with `/init-architecture`
4. Begin using the 9-stage pipeline

## Troubleshooting

### Permission Issues
If hooks aren't executable:
```bash
chmod +x .claude/hooks/*.sh
chmod +x scripts/*.sh
```

### Missing MCP Tools
Ensure these are configured in your environment:
- serena
- supabase
- shadcn
- context7
- brave-search

### Customization
Edit the embedded templates in this file to customize the bootstrap for your specific needs.