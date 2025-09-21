#!/bin/bash
# Minimal Process Statusline for Claude Code
# Shows: Model | Directory | Pipeline Phase | Task Progress

# Read JSON input from stdin
INPUT=$(cat)

# Extract values from JSON
MODEL=$(echo "$INPUT" | grep -o '"display_name":\s*"[^"]*"' | cut -d'"' -f4)
SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":\s*"[^"]*"' | cut -d'"' -f4)  # Full UUID
CURRENT_DIR=$(echo "$INPUT" | grep -o '"current_dir":\s*"[^"]*"' | cut -d'"' -f4)
DIR_NAME=$(basename "$CURRENT_DIR")

# Get pipeline phase from state file
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
PHASE_INFO=""
if [ -f "$PROJECT_DIR/.claude/state/pipeline.json" ]; then
    # Try to extract phase info
    PHASE=$(grep -o '"phase":\s*[0-9]' "$PROJECT_DIR/.claude/state/pipeline.json" 2>/dev/null | cut -d':' -f2 | tr -d ' ')
    
    if [ -n "$PHASE" ] && [ "$PHASE" != "0" ]; then
        # Get loop info for current phase
        LOOP=$(grep -o "\"$PHASE\":\s*[0-9]" "$PROJECT_DIR/.claude/state/pipeline.json" 2>/dev/null | head -1 | cut -d':' -f2 | tr -d ' ')
        MAX_LOOP=$(grep -o "\"$PHASE\":\s*[0-9]" "$PROJECT_DIR/.claude/state/pipeline.json" 2>/dev/null | tail -1 | cut -d':' -f2 | tr -d ' ')
        
        # Phase icons and names
        case "$PHASE" in
            "1") ICON="🔍"; NAME="Research" ;;
            "2") ICON="📝"; NAME="Spec" ;;
            "3") ICON="📋"; NAME="Plan" ;;
            "4") ICON="🔨"; NAME="Build" ;;
            "5") ICON="🧹"; NAME="Clean" ;;
            *) ICON="⚡"; NAME="Phase$PHASE" ;;
        esac
        
        PHASE_INFO=" | $ICON $NAME"
        if [ -n "$LOOP" ] && [ -n "$MAX_LOOP" ]; then
            PHASE_INFO="$PHASE_INFO ($LOOP/$MAX_LOOP)"
        fi
    fi
fi

# Count tasks from tracker files
TASK_INFO=""
TOTAL=0
COMPLETED=0
if [ -f "$PROJECT_DIR/product-tracker.md" ]; then
    # Count completed vs total tasks (lines with checkboxes)
    TOTAL=$(grep -c "^- \[.\]" "$PROJECT_DIR/product-tracker.md" 2>/dev/null || echo 0)
    COMPLETED=$(grep -c "^- \[x\]" "$PROJECT_DIR/product-tracker.md" 2>/dev/null || echo 0)
elif [ -f "$PROJECT_DIR/process-tracker.md" ]; then
    # Count completed vs total tasks (lines with checkboxes)
    TOTAL=$(grep -c "^- \[.\]" "$PROJECT_DIR/process-tracker.md" 2>/dev/null || echo 0)
    COMPLETED=$(grep -c "^- \[x\]" "$PROJECT_DIR/process-tracker.md" 2>/dev/null || echo 0)
fi

if [ "$TOTAL" -gt 0 ]; then
    TASK_INFO=" | ✅ $COMPLETED/$TOTAL"
fi

# Git branch if in repo
GIT_INFO=""
if [ -d "$PROJECT_DIR/.git" ]; then
    BRANCH=$(cd "$PROJECT_DIR" && git branch --show-current 2>/dev/null)
    if [ -n "$BRANCH" ]; then
        GIT_INFO=" | 🌿 $BRANCH"
    fi
fi

# Construct statusline
echo "[$MODEL] 📁 $DIR_NAME$PHASE_INFO$TASK_INFO$GIT_INFO | 🔑 $SESSION_ID"