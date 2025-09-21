#!/bin/bash
# Enhanced Event Logger - Session-aware logging with subagent tracking
# Part of Memory System v1.1

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
EVENT_STREAM="$PROJECT_DIR/event-stream.md"
SESSION_DIR="$PROJECT_DIR/docs"

# Parse input for tool and session information
INPUT=$(cat 2>/dev/null)
TOOL_NAME=$(echo "$INPUT" | grep -o '"tool_name":\s*"[^"]*"' | cut -d'"' -f4)
SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":\s*"[^"]*"' | cut -d'"' -f4)

# Extract subagent info if Task tool
SUBAGENT_TYPE=""
REQUEST_ID=""
if [ "$TOOL_NAME" = "Task" ]; then
    SUBAGENT_TYPE=$(echo "$INPUT" | grep -o '"subagent_type":\s*"[^"]*"' | cut -d'"' -f4)
    REQUEST_ID="REQ-$(date +%s)-${RANDOM:0:4}"

    # Store subagent metadata for tracking
    if [ -n "$SESSION_ID" ] && [ -n "$SUBAGENT_TYPE" ]; then
        SUBAGENT_DIR="$SESSION_DIR/session-$SESSION_ID/subagents"
        mkdir -p "$SUBAGENT_DIR"
        echo "$(date +%H:%M:%S) | $REQUEST_ID | $SUBAGENT_TYPE | STARTED" >> "$SUBAGENT_DIR/tracking.log"
    fi
fi

# Determine action based on tool
case "$TOOL_NAME" in
    Write|Edit|MultiEdit)
        ACTION="FILE_MODIFY"
        ;;
    Bash)
        ACTION="COMMAND"
        ;;
    Task)
        if [ -n "$SUBAGENT_TYPE" ]; then
            ACTION="AGENT:$SUBAGENT_TYPE"
        else
            ACTION="AGENT"
        fi
        ;;
    *)
        # Don't log other tools to reduce noise
        exit 0
        ;;
esac

# Get timestamp
TIMESTAMP=$(date +%H:%M:%S)

# Build log entry with session ID
LOG_ENTRY="$TIMESTAMP"
if [ -n "$SESSION_ID" ]; then
    # Shorten session ID to first 8 chars for readability
    SHORT_SESSION="${SESSION_ID:0:8}"
    LOG_ENTRY="$LOG_ENTRY | SESSION:$SHORT_SESSION"
else
    LOG_ENTRY="$LOG_ENTRY | SESSION:unknown"
fi

if [ -n "$REQUEST_ID" ] && [ "$TOOL_NAME" = "Task" ]; then
    LOG_ENTRY="$LOG_ENTRY | $ACTION | INVOKED | $REQUEST_ID"
else
    LOG_ENTRY="$LOG_ENTRY | $ACTION | SUCCESS | $TOOL_NAME executed"
fi

# Append log entry
echo "$LOG_ENTRY" >> "$EVENT_STREAM"

# Create session-specific log if session exists
if [ -n "$SESSION_ID" ]; then
    SESSION_LOG="$SESSION_DIR/session-$SESSION_ID/events.log"
    if [ -d "$(dirname "$SESSION_LOG")" ]; then
        echo "$LOG_ENTRY" >> "$SESSION_LOG"
    fi
fi

# Keep file size under control
LINES=$(wc -l < "$EVENT_STREAM" 2>/dev/null)
if [ $LINES -gt 1500 ]; then
    # Trigger rotation warning
    echo "⚠️ event-stream.md has $LINES lines - consider running rotate-events.sh"
fi