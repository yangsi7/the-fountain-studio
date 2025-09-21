#!/bin/bash
# Context Loader Hook - Automatically loads appropriate context based on task type
# Part of the Hybrid Orchestrator Pattern v4.0

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
CONTEXT_FILE="$PROJECT_DIR/context.md"
EVENT_STREAM="$PROJECT_DIR/event-stream.md"
PROJECT_INDEX="$PROJECT_DIR/PROJECT_INDEX.json"
ARCHITECTURE_CORE="$PROJECT_DIR/architecture-core.md"

# Read user input from stdin
INPUT=$(cat)

# Function to detect task type from user input
detect_task_type() {
    local input="$1"

    # Convert to lowercase for matching
    input_lower=$(echo "$input" | tr '[:upper:]' '[:lower:]')

    # Check for task type triggers (defined in context.md)
    # Order matters - more specific patterns first
    if echo "$input_lower" | grep -qE "understand|analyze|investigate|explore|how does|explain"; then
        echo "research"
    elif echo "$input_lower" | grep -qE "database|table|migration|rls|supabase|sql"; then
        echo "database"
    elif echo "$input_lower" | grep -qE "fix|error|bug|failing|broken|timeout|crash"; then
        echo "bugfix"
    elif echo "$input_lower" | grep -qE "component|ui|ux|design|style|layout|responsive"; then
        echo "ui"
    elif echo "$input_lower" | grep -qE "implement|add|create|build|develop|feature"; then
        echo "feature"
    else
        echo "default"
    fi
}

# Function to extract topical sections from PROJECT_INDEX.json
extract_topical_info() {
    local task_type="$1"
    local info=""

    if [ -f "$PROJECT_INDEX" ]; then
        case $task_type in
            ui)
                # Count UI components
                local ui_count=$(jq '.f | to_entries | map(select(.key | contains("/components/"))) | length' "$PROJECT_INDEX" 2>/dev/null || echo "0")
                info="UI Components: $ui_count files indexed"
                ;;
            database)
                # Count database files
                local db_count=$(jq '.f | to_entries | map(select(.key | contains("/supabase/") or contains("/api/"))) | length' "$PROJECT_INDEX" 2>/dev/null || echo "0")
                info="Database/API: $db_count files indexed"
                ;;
            feature)
                # Get total indexed files
                local total=$(jq '.stats.total_files' "$PROJECT_INDEX" 2>/dev/null || echo "0")
                info="Full codebase: $total files indexed"
                ;;
            bugfix)
                # Get recently modified (if staleness is available)
                local staleness=$(jq '.staleness' "$PROJECT_INDEX" 2>/dev/null || echo "unknown")
                info="Index freshness: check staleness for recent changes"
                ;;
            research)
                # Count documentation files
                local docs=$(jq '.stats.markdown_files' "$PROJECT_INDEX" 2>/dev/null || echo "0")
                info="Documentation: $docs markdown files indexed"
                ;;
            default)
                info="Core architecture only"
                ;;
        esac
    else
        info="PROJECT_INDEX.json not found - run: python .claude-code-project-index-temp/scripts/project_index.py"
    fi

    echo "$info"
}

# Detect task type
TASK_TYPE=$(detect_task_type "$INPUT")

# Extract topical information
TOPICAL_INFO=$(extract_topical_info "$TASK_TYPE")

# Log to event stream
TIMESTAMP=$(date +%H:%M:%S)
echo "$TIMESTAMP | CONTEXT | DETECT | SUCCESS | Task type identified as '$TASK_TYPE'" >> "$EVENT_STREAM"

# Build display message
DISPLAY_TEXT="🎯 Task type detected: $TASK_TYPE
📚 Loading appropriate context profile from context.md
⚡ Token budget optimized for $TASK_TYPE tasks
📊 $TOPICAL_INFO
"

# Add profile-specific info
case $TASK_TYPE in
    research)
        DISPLAY_TEXT+="   Files: architecture-core.md + UI/state sections from PROJECT_INDEX.json
   Token budget: ~800
   Focus: Understanding and analysis"
        ;;
    feature)
        DISPLAY_TEXT+="   Files: architecture-core.md + all relevant topical sections
   Token budget: ~1000
   Focus: Full implementation capability"
        ;;
    bugfix)
        DISPLAY_TEXT+="   Files: architecture-core.md minimal + error patterns
   Token budget: ~600
   Focus: Problem solving"
        ;;
    ui)
        DISPLAY_TEXT+="   Files: components + design system from PROJECT_INDEX.json
   Token budget: ~700
   MCP Tools: shadcn components"
        ;;
    database)
        DISPLAY_TEXT+="   Files: schema + migrations + edge functions from PROJECT_INDEX.json
   Token budget: ~800
   MCP Tools: supabase operations"
        ;;
    default)
        DISPLAY_TEXT+="   Files: architecture-core.md only
   Token budget: ~500
   Focus: Basic understanding"
        ;;
esac

DISPLAY_TEXT+="

📝 See architecture-core.md for topical extraction patterns"

# Get current system time
SYSTEM_TIME=$(date '+%Y-%m-%d %H:%M:%S %Z')

# Escape display text for JSON
DISPLAY_TEXT_ESCAPED=$(echo "$DISPLAY_TEXT" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

# Output pure JSON
echo "{
  \"hookSpecificOutput\": {
    \"hookEventName\": \"UserPromptSubmit\",
    \"additionalContext\": \"📅 Current System Time: $SYSTEM_TIME\",
    \"displayText\": \"$DISPLAY_TEXT_ESCAPED\"
  }
}"