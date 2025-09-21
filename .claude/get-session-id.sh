#!/bin/bash
# Script to get or generate Claude session ID

# Try to get from environment first
if [ -n "$CLAUDE_SESSION_ID" ]; then
    echo "$CLAUDE_SESSION_ID"
    exit 0
fi

# Try to get from /status command output if available
# For now, generate a unique session ID based on date and random
SESSION_ID="$(date +%Y%m%d)-$(openssl rand -hex 4 2>/dev/null || echo $RANDOM)"
echo "$SESSION_ID"