#!/bin/bash
# Simple hook to maintain project files up-to-date

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
CHECKSUM_FILE="$PROJECT_DIR/.claude/temp/last-checksum"

# Function to check if update needed
check_drift() {
    if [ -f "$PROJECT_DIR/PROJECT_INDEX.json" ]; then
        # Check PROJECT_INDEX.json age
        LAST_MODIFIED=$(stat -f "%m" "$PROJECT_DIR/PROJECT_INDEX.json" 2>/dev/null || stat -c "%Y" "$PROJECT_DIR/PROJECT_INDEX.json" 2>/dev/null)
        CURRENT_TIME=$(date +%s)
        HOURS_OLD=$(( ($CURRENT_TIME - $LAST_MODIFIED) / 3600 ))

        if [ $HOURS_OLD -gt 24 ]; then
            echo "⚠️  PROJECT_INDEX.json is $HOURS_OLD hours old"
            echo "Run: /index to regenerate"
            return 1
        fi
    else
        echo "⚠️  PROJECT_INDEX.json not found"
        echo "Run: /index to generate"
        return 1
    fi
    return 0
}

# Function to check file age
check_age() {
    local file=$1
    local max_days=$2
    
    if [ -f "$file" ]; then
        LAST_MODIFIED=$(stat -f "%m" "$file" 2>/dev/null || stat -c "%Y" "$file" 2>/dev/null)
        CURRENT_TIME=$(date +%s)
        DAYS_OLD=$(( ($CURRENT_TIME - $LAST_MODIFIED) / 86400 ))
        
        if [ $DAYS_OLD -gt $max_days ]; then
            echo "📅 $file is $DAYS_OLD days old (max: $max_days)"
            return 1
        fi
    else
        echo "❌ $file not found"
        return 1
    fi
    return 0
}

# Main checks
echo "🔍 File Maintenance Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━"

# Check architecture drift
check_drift

# Check critical file ages
check_age "$PROJECT_DIR/architecture-core.md" 3
check_age "$PROJECT_DIR/context.md" 7
check_age "$PROJECT_DIR/process-tracker.md" 3
check_age "$PROJECT_DIR/product-tracker.md" 3

# Check if event-stream.md is getting too large
if [ -f "$PROJECT_DIR/event-stream.md" ]; then
    LINES=$(wc -l < "$PROJECT_DIR/event-stream.md")
    if [ $LINES -gt 1000 ]; then
        echo "📚 event-stream.md has $LINES lines"
        echo "Consider running rotate-events.sh"
    fi
fi

# Remind about common updates
echo ""
echo "💡 Quick Updates:"
echo "• Cross off completed tasks in process-tracker.md or product-tracker.md"
echo "• Add new events to event-stream.md"
echo "• Update objectives in process-tracker.md or product-tracker.md if scope changed"
echo "• Check context.md profiles are working"

echo "━━━━━━━━━━━━━━━━━━━━━━━━"