#!/bin/bash
# Subagent Tracker - Track parent-child relationships and outputs
# Part of Memory System v1.1

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
SESSION_DIR="$PROJECT_DIR/docs"

# Parse input
INPUT=$(cat 2>/dev/null)
TOOL_NAME=$(echo "$INPUT" | grep -o '"tool_name":\s*"[^"]*"' | cut -d'"' -f4)
SESSION_ID=$(echo "$INPUT" | grep -o '"session_id":\s*"[^"]*"' | cut -d'"' -f4)

# Only track Task tool (subagent invocations)
if [ "$TOOL_NAME" != "Task" ]; then
    exit 0
fi

# Extract subagent details
SUBAGENT_TYPE=$(echo "$INPUT" | grep -o '"subagent_type":\s*"[^"]*"' | cut -d'"' -f4)
DESCRIPTION=$(echo "$INPUT" | grep -o '"description":\s*"[^"]*"' | cut -d'"' -f4)
PROMPT_LENGTH=$(echo "$INPUT" | grep -o '"prompt":\s*"[^"]*"' | cut -d'"' -f4 | wc -c)

# Generate request ID
REQUEST_ID="REQ-$(date +%Y%m%d-%H%M%S)-${RANDOM:0:4}"
TIMESTAMP=$(date +%H:%M:%S)

# Create tracking directory structure
if [ -n "$SESSION_ID" ]; then
    TRACKING_DIR="$SESSION_DIR/session-$SESSION_ID/subagents"
    OUTPUT_DIR="$TRACKING_DIR/outputs"
    mkdir -p "$OUTPUT_DIR"

    # Create metadata file for this invocation
    META_FILE="$OUTPUT_DIR/${REQUEST_ID}-meta.json"
    cat > "$META_FILE" << EOF
{
  "request_id": "$REQUEST_ID",
  "timestamp": "$TIMESTAMP",
  "subagent_type": "$SUBAGENT_TYPE",
  "description": "$DESCRIPTION",
  "prompt_length": $PROMPT_LENGTH,
  "session_id": "$SESSION_ID",
  "status": "invoked",
  "parent_chain": []
}
EOF

    # Update master tracking log
    TRACKING_LOG="$TRACKING_DIR/tracking.log"
    echo "$TIMESTAMP | $REQUEST_ID | $SUBAGENT_TYPE | INVOKED | prompt_size:$PROMPT_LENGTH" >> "$TRACKING_LOG"

    # Create chain visualization if multiple agents
    CHAIN_FILE="$TRACKING_DIR/agent-chain.md"
    if [ ! -f "$CHAIN_FILE" ]; then
        cat > "$CHAIN_FILE" << 'EOF'
# Agent Chain Visualization

## Active Chains
EOF
    fi

    echo "- [$TIMESTAMP] $SUBAGENT_TYPE ($REQUEST_ID) - $DESCRIPTION" >> "$CHAIN_FILE"

    # Output tracking info for display
    echo "📊 Subagent Tracking:"
    echo "   Request ID: $REQUEST_ID"
    echo "   Type: $SUBAGENT_TYPE"
    echo "   Session: ${SESSION_ID:0:8}..."
    echo "   Output: $OUTPUT_DIR/"
fi