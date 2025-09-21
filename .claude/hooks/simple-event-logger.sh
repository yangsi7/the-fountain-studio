#!/bin/bash
# Simple Event Logger - Minimal logging to event-stream.md
# Part of Memory System v1.0

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
EVENT_STREAM="$PROJECT_DIR/event-stream.md"

# Parse input for tool information
INPUT=$(cat 2>/dev/null)
TOOL_NAME=$(echo "$INPUT" | grep -o '"tool_name":\s*"[^"]*"' | cut -d'"' -f4)

# Only log significant tools
case "$TOOL_NAME" in
    Write|Edit|MultiEdit)
        ACTION="FILE_MODIFY"
        ;;
    Bash)
        ACTION="COMMAND"
        ;;
    Task)
        ACTION="AGENT"
        ;;
    *)
        # Don't log other tools to reduce noise
        exit 0
        ;;
esac

# Get timestamp
TIMESTAMP=$(date +%H:%M:%S)

# Append simple log entry
echo "$TIMESTAMP | TOOL | $ACTION | SUCCESS | $TOOL_NAME executed" >> "$EVENT_STREAM"

# Keep file size under control
LINES=$(wc -l < "$EVENT_STREAM" 2>/dev/null)
if [ $LINES -gt 1500 ]; then
    # Trigger rotation warning
    echo "⚠️ event-stream.md has $LINES lines - consider running rotate-events.sh"
fi