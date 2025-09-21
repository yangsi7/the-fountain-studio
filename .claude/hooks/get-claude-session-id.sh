#!/bin/bash
# Extract Claude Code session ID from JSON input or environment

# If stdin has data, extract session_id from JSON
if [ ! -t 0 ]; then
    INPUT=$(cat)
    SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":\s*"[^"]*"' | cut -d'"' -f4)
    if [ -n "$SESSION_ID" ]; then
        echo "$SESSION_ID"
        exit 0
    fi
fi

# Check environment variable as fallback
if [ -n "$CLAUDE_SESSION_ID" ]; then
    echo "$CLAUDE_SESSION_ID"
    exit 0
fi

# Final fallback to timestamp
echo "$(date +%Y%m%d-%H%M%S)"