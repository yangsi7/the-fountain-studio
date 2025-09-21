---
name: check-process
description: Comprehensive validation of XML Pipeline System v2.0 - checks all components, configurations, and reports issues
---

# Check Process

Performs comprehensive validation of the XML Pipeline System v2.0, checking all components and reporting issues with severity levels and fix suggestions.

## Quick Command
```
/check-process
```

## What This Command Does
1. Validates directory structure
2. Checks all required files exist
3. Verifies agent completeness
4. Validates hook configuration
5. Checks state file validity
6. Verifies documentation structure
7. Detects architecture drift
8. Reports issues with fixes
9. Provides health score

## Execution Steps

### Step 1: Initialize Check Report
```bash
echo "════════════════════════════════════════════════════════════"
echo "       XML PIPELINE SYSTEM v2.0 - HEALTH CHECK"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Started: $(date)"
echo ""

# Initialize counters
ERRORS=0
WARNINGS=0
PASSES=0
```

### Step 2: Check Directory Structure
```bash
echo "📁 CHECKING DIRECTORY STRUCTURE"
echo "--------------------------------"

# Required directories
REQUIRED_DIRS=(
    ".claude/agents"
    ".claude/hooks"
    ".claude/commands"
    ".claude/temp"
    "docs/process"
    "docs/architecture"
    "docs/guides"
    "scripts"
    "templates"
    "refs"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ $dir"
        ((PASSES++))
    else
        echo "❌ MISSING: $dir"
        echo "   FIX: mkdir -p $dir"
        ((ERRORS++))
    fi
done
echo ""
```

### Step 3: Validate Core Pipeline Agents
```bash
echo "🤖 CHECKING CORE PIPELINE AGENTS"
echo "---------------------------------"

# Core agents required for pipeline
CORE_AGENTS=(
    "tree-of-thought"
    "researcher"
    "brainstormer"
    "implementer"
    "ui-designer"
    "database-architect"
    "git-workflow"
    "tester"
    "quality-reviewer"
    "architecture-maintainer"
)

for agent in "${CORE_AGENTS[@]}"; do
    if [ -f ".claude/agents/$agent.md" ]; then
        # Check if agent has required frontmatter
        if grep -q "^name: $agent" ".claude/agents/$agent.md"; then
            echo "✅ $agent.md (valid)"
            ((PASSES++))
        else
            echo "⚠️  $agent.md (missing frontmatter)"
            echo "   FIX: Add frontmatter with name, description, tools"
            ((WARNINGS++))
        fi
    else
        echo "❌ MISSING: $agent.md"
        echo "   FIX: Run /bootstrap-project-process or create manually"
        ((ERRORS++))
    fi
done
echo ""
```

### Step 4: Validate Hooks
```bash
echo "🪝 CHECKING HOOKS"
echo "-----------------"

# Required hooks for pipeline
REQUIRED_HOOKS=(
    "SessionStart"
    "SessionEnd"
    "gate-validate"
    "check-architecture"
    "maintain-files"
    "rotate-events"
)

for hook in "${REQUIRED_HOOKS[@]}"; do
    HOOK_FILE=".claude/hooks/$hook.sh"
    if [ -f "$HOOK_FILE" ]; then
        if [ -x "$HOOK_FILE" ]; then
            echo "✅ $hook.sh (executable)"
            ((PASSES++))
        else
            echo "⚠️  $hook.sh (not executable)"
            echo "   FIX: chmod +x $HOOK_FILE"
            ((WARNINGS++))
        fi
    else
        echo "❌ MISSING: $hook.sh"
        echo "   FIX: Run /bootstrap-project-process"
        ((ERRORS++))
    fi
done
echo ""
```

### Step 5: Check Settings Configuration
```bash
echo "⚙️  CHECKING SETTINGS CONFIGURATION"
echo "-----------------------------------"

if [ -f ".claude/settings.local.json" ]; then
    echo "✅ settings.local.json exists"
    ((PASSES++))
    
    # Check for orphaned hooks
    echo "   Checking hook references..."
    
    # Extract hook commands from settings
    CONFIGURED_HOOKS=$(grep -o '"command":[[:space:]]*"[^"]*"' .claude/settings.local.json | cut -d'"' -f4)
    
    for hook_path in $CONFIGURED_HOOKS; do
        # Replace $CLAUDE_PROJECT_DIR with actual path
        ACTUAL_PATH=${hook_path/\$CLAUDE_PROJECT_DIR/.}
        if [ ! -f "$ACTUAL_PATH" ]; then
            echo "   ⚠️  Referenced hook missing: $ACTUAL_PATH"
            echo "      FIX: Remove from settings.local.json or create hook"
            ((WARNINGS++))
        fi
    done
else
    echo "⚠️  settings.local.json missing"
    echo "   FIX: Run /bootstrap-project-process"
    ((WARNINGS++))
fi
echo ""
```

### Step 6: Validate State Files
```bash
echo "📄 CHECKING STATE FILES"
echo "-----------------------"

STATE_FILES=(
    "plan.md"
    "tasks.md"
    "events.md"
)

for file in "${STATE_FILES[@]}"; do
    if [ -f "$file" ]; then
        # Check if file has content
        if [ -s "$file" ]; then
            # Check if file is recent (modified in last 30 days)
            if find "$file" -mtime -30 | grep -q .; then
                echo "✅ $file (current)"
                ((PASSES++))
            else
                echo "⚠️  $file (stale - >30 days old)"
                echo "   FIX: Update or regenerate from template"
                ((WARNINGS++))
            fi
        else
            echo "⚠️  $file (empty)"
            echo "   FIX: Copy from templates/${file%.md}-template.md"
            ((WARNINGS++))
        fi
    else
        echo "❌ MISSING: $file"
        echo "   FIX: Copy from templates/${file%.md}-template.md"
        ((ERRORS++))
    fi
done
echo ""
```

### Step 7: Check Documentation
```bash
echo "📚 CHECKING DOCUMENTATION"
echo "-------------------------"

# Check for CLAUDE.md files
CLAUDE_LOCATIONS=(
    "CLAUDE.md"
    "docs/CLAUDE.md"
    "scripts/CLAUDE.md"
    ".claude/agents/CLAUDE.md"
    ".claude/hooks/CLAUDE.md"
)

for file in "${CLAUDE_LOCATIONS[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
        ((PASSES++))
    else
        echo "⚠️  MISSING: $file"
        echo "   FIX: Create documentation file"
        ((WARNINGS++))
    fi
done

# Check key process documentation
if [ -f "docs/process/PROCESS-MAP.md" ]; then
    echo "✅ docs/process/PROCESS-MAP.md"
    ((PASSES++))
else
    echo "❌ MISSING: docs/process/PROCESS-MAP.md"
    echo "   FIX: Critical - defines 9-stage pipeline"
    ((ERRORS++))
fi
echo ""
```

### Step 8: Check Architecture Drift
```bash
echo "🏗️  CHECKING ARCHITECTURE"
echo "------------------------"

if [ -f "architecture-core.md" ]; then
    echo "✅ architecture-core.md exists"
    ((PASSES++))
    
    # Check for drift if query-index.sh exists
    if [ -x "./scripts/query-index.sh" ]; then
        CURRENT_CHECKSUM=$(./scripts/query-index.sh checksum 2>/dev/null)
        if [ -n "$CURRENT_CHECKSUM" ]; then
            STORED_CHECKSUM=$(grep "^checksum:" architecture-core.md | cut -d' ' -f2)
            if [ "$CURRENT_CHECKSUM" = "$STORED_CHECKSUM" ]; then
                echo "✅ No architecture drift detected"
                ((PASSES++))
            else
                echo "⚠️  Architecture drift detected"
                echo "   Current: $CURRENT_CHECKSUM"
                echo "   Stored:  $STORED_CHECKSUM"
                echo "   FIX: Run architecture-maintainer agent"
                ((WARNINGS++))
            fi
        fi
    else
        echo "⚠️  Cannot check drift (query-index.sh missing)"
        ((WARNINGS++))
    fi
else
    echo "⚠️  architecture-core.md missing"
    echo "   FIX: Run /init-architecture"
    ((WARNINGS++))
fi
echo ""
```

### Step 9: Check Templates
```bash
echo "📋 CHECKING TEMPLATES"
echo "--------------------"

TEMPLATES=(
    "plan-template.md"
    "tasks-template.md"
    "events-template.md"
    "architecture-core-template.md"
    "feature-spec-template.md"
    "product-template.md"
    "refs-overview-template.md"
)

for template in "${TEMPLATES[@]}"; do
    if [ -f "templates/$template" ]; then
        echo "✅ $template"
        ((PASSES++))
    else
        echo "⚠️  MISSING: $template"
        echo "   FIX: Run /bootstrap-project-process"
        ((WARNINGS++))
    fi
done
echo ""
```

### Step 10: Check Scripts
```bash
echo "📜 CHECKING SCRIPTS"
echo "-------------------"

# Essential scripts
if [ -f "scripts/query-index.sh" ]; then
    if [ -x "scripts/query-index.sh" ]; then
        echo "✅ query-index.sh (executable)"
        ((PASSES++))
    else
        echo "⚠️  query-index.sh (not executable)"
        echo "   FIX: chmod +x scripts/query-index.sh"
        ((WARNINGS++))
    fi
else
    echo "❌ MISSING: query-index.sh"
    echo "   FIX: Critical script for pipeline - restore from backup"
    ((ERRORS++))
fi

if [ -f "scripts/generate-indexes.sh" ]; then
    echo "✅ generate-indexes.sh"
    ((PASSES++))
else
    echo "⚠️  MISSING: generate-indexes.sh"
    ((WARNINGS++))
fi
echo ""
```

### Step 11: Check XML Pipeline
```bash
echo "🔄 CHECKING XML PIPELINE"
echo "------------------------"

if [ -f "CLAUDE.md" ]; then
    # Check for key XML elements
    if grep -q "<pipeline" CLAUDE.md && grep -q "<agents>" CLAUDE.md; then
        echo "✅ CLAUDE.md has valid XML pipeline structure"
        ((PASSES++))
        
        # Check for 9 stages
        STAGES=("ANALYSIS" "RESEARCH" "BRAINSTORM" "PLANNING" "PLAN-GATE" "EXECUTION" "TESTING" "REVIEW" "DELIVERY")
        for stage in "${STAGES[@]}"; do
            if grep -q "$stage" CLAUDE.md; then
                echo "   ✅ Stage: $stage"
                ((PASSES++))
            else
                echo "   ❌ Missing stage: $stage"
                ((ERRORS++))
            fi
        done
    else
        echo "⚠️  CLAUDE.md missing XML pipeline structure"
        echo "   FIX: Restore from backup or run /bootstrap-project-process"
        ((WARNINGS++))
    fi
else
    echo "❌ MISSING: CLAUDE.md (main pipeline definition)"
    echo "   FIX: Critical - run /bootstrap-project-process"
    ((ERRORS++))
fi
echo ""
```

### Step 12: Generate Report
```bash
echo "════════════════════════════════════════════════════════════"
echo "                      HEALTH CHECK REPORT"
echo "════════════════════════════════════════════════════════════"
echo ""

# Calculate health score
TOTAL=$((PASSES + WARNINGS + ERRORS))
if [ $TOTAL -gt 0 ]; then
    HEALTH_SCORE=$((PASSES * 100 / TOTAL))
else
    HEALTH_SCORE=0
fi

# Determine status
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    STATUS="🟢 HEALTHY"
elif [ $ERRORS -eq 0 ]; then
    STATUS="🟡 NEEDS ATTENTION"
else
    STATUS="🔴 CRITICAL ISSUES"
fi

echo "Status: $STATUS"
echo "Health Score: $HEALTH_SCORE%"
echo ""
echo "Summary:"
echo "  ✅ Passed:   $PASSES"
echo "  ⚠️  Warnings: $WARNINGS"
echo "  ❌ Errors:   $ERRORS"
echo ""

# Provide recommendations
if [ $ERRORS -gt 0 ]; then
    echo "🔧 IMMEDIATE ACTIONS REQUIRED:"
    echo "1. Run: /bootstrap-project-process to fix missing components"
    echo "2. Check error messages above for specific fixes"
    echo ""
fi

if [ $WARNINGS -gt 0 ]; then
    echo "📋 RECOMMENDED ACTIONS:"
    echo "1. Review warnings above for optimization opportunities"
    echo "2. Update stale files and documentation"
    echo "3. Fix executable permissions on scripts and hooks"
    echo ""
fi

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "🎉 SYSTEM FULLY OPERATIONAL!"
    echo "All components of the XML Pipeline System v2.0 are functioning correctly."
    echo ""
    echo "You can now:"
    echo "1. Start working with the 9-stage pipeline"
    echo "2. Load @CLAUDE.md to review the pipeline"
    echo "3. Check @architecture-core.md for system state"
fi

echo ""
echo "Completed: $(date)"
echo "════════════════════════════════════════════════════════════"
```

## Usage Examples

### Basic Health Check
```
/check-process
```
Runs complete validation and provides detailed report.

### After Bootstrap
```
/bootstrap-project-process
/check-process
```
Verify that bootstrap completed successfully.

### Regular Maintenance
Run weekly or after major changes:
```
/check-process
```
Then address any warnings or errors.

## Issue Severity Levels

### 🔴 ERRORS (Critical)
- Missing core directories
- Missing pipeline agents
- Missing CLAUDE.md
- Missing critical scripts
These prevent the pipeline from functioning.

### 🟡 WARNINGS (Important)
- Missing documentation
- Stale files (>30 days)
- Non-executable scripts
- Architecture drift
These impact efficiency but don't block operation.

### 🟢 PASSES (Good)
- All required components present
- Files up to date
- Proper permissions
- No configuration issues

## Common Issues and Fixes

### Missing Agents
**Issue**: Core pipeline agents not found
**Fix**: Run `/bootstrap-project-process` or copy from backup

### Hook Errors
**Issue**: Hooks referenced in settings but don't exist
**Fix**: Edit `.claude/settings.local.json` to remove references

### Architecture Drift
**Issue**: Checksum mismatch in architecture-core.md
**Fix**: Run architecture-maintainer agent

### Stale Files
**Issue**: State files older than 30 days
**Fix**: Update content or regenerate from templates

### Permission Issues
**Issue**: Scripts/hooks not executable
**Fix**: `chmod +x .claude/hooks/*.sh scripts/*.sh`

## Integration with Pipeline

This check should be run:
1. After initial setup
2. Before starting major work
3. After system updates
4. When experiencing issues
5. As part of regular maintenance

The health score helps track system integrity over time.