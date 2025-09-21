#!/bin/bash
# SessionStart hook - Run maintenance checks at session start

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Read JSON input from stdin and extract session_id
INPUT=$(cat)
SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":\s*"[^"]*"' | cut -d'"' -f4)

# Fallback to timestamp if no session_id found
if [ -z "$SESSION_ID" ]; then
    SESSION_ID=$(date +%Y%m%d-%H%M%S)
fi

SESSION_DIR="$PROJECT_DIR/docs/session-$SESSION_ID"
mkdir -p "$SESSION_DIR"

# No symlink - there can be multiple simultaneous sessions

# Create initial session info file
cat > "$SESSION_DIR/session-info.md" << EOF
# Session Information

**Started**: $(date)
**Session ID**: $SESSION_ID
**Directory**: $SESSION_DIR
**Working Directory**: $(pwd)

## Notes
- Claude Code Session ID: $SESSION_ID
- To find this session's docs: \`ls -la $SESSION_DIR/\`

## Session Activity
Session started and documentation folder created.
EOF

# Build display output text
DISPLAY_TEXT="📁 Session folder: $SESSION_DIR
   Session ID: $SESSION_ID
"

# Run maintenance check
if [ -x "$PROJECT_DIR/.claude/hooks/maintain-files.sh" ]; then
    MAINTAIN_OUTPUT=$("$PROJECT_DIR/.claude/hooks/maintain-files.sh" 2>&1)
    DISPLAY_TEXT+="$MAINTAIN_OUTPUT
"
fi

# Quick project status
DISPLAY_TEXT+="
📊 Project Status Check
━━━━━━━━━━━━━━━━━━━━━━━━
🗄️  Database: Use mcp__supabase__list_tables to verify
"

# Check dev server
if pgrep -f "pnpm dev" > /dev/null; then
    DISPLAY_TEXT+="✅ Dev server running
"
else
    DISPLAY_TEXT+="❌ Dev server not running (run: pnpm dev)
"
fi

DISPLAY_TEXT+="━━━━━━━━━━━━━━━━━━━━━━━━

💡 Start with loading context:
   @context.md (master orchestrator)
   @architecture-core.md
   @event-stream.md (last 30 lines)
   @process-tracker.md (process objectives and tasks)
   @product-tracker.md (product objectives and tasks)"

# Build system information
CURRENT_DATE=$(date '+%A, %B %d, %Y')
CURRENT_TIME=$(date '+%H:%M:%S %Z')
DATE_ISO=$(date '+%Y-%m-%d')
WORKING_DIR=$(pwd)

# Escape the display text for JSON
DISPLAY_TEXT_ESCAPED=$(echo "$DISPLAY_TEXT" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

# Build additional context
ADDITIONAL_CONTEXT="📅 System Information:
Current Date: $CURRENT_DATE
Current Time: $CURRENT_TIME
Date (ISO): $DATE_ISO
Working Directory: $WORKING_DIR"

# Escape additional context for JSON
ADDITIONAL_CONTEXT_ESCAPED=$(echo "$ADDITIONAL_CONTEXT" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

# Output pure JSON
echo "{
  \"hookSpecificOutput\": {
    \"hookEventName\": \"SessionStart\",
    \"additionalContext\": \"$ADDITIONAL_CONTEXT_ESCAPED\",
    \"displayText\": \"$DISPLAY_TEXT_ESCAPED\"
  }
}"