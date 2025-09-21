#!/bin/bash
# Session End Hook - Save state and checkpoint files

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

# Get current session ID
SESSION_ID=$("$PROJECT_DIR/.claude/hooks/get-claude-session-id.sh")
SESSION_DIR="$PROJECT_DIR/docs/session-$SESSION_ID"

echo "🔚 Ending session..."
echo "📅 Date: $(date)"
echo "📁 Session: $SESSION_ID"

# Verify session folder exists and has documentation
if [ -d "$SESSION_DIR" ]; then
    FILE_COUNT=$(ls -1 "$SESSION_DIR" 2>/dev/null | wc -l)
    echo "✅ Session folder contains $FILE_COUNT files"
    
    # Create session end marker
    echo -e "\n## Session Ended\n**Time**: $(date)" >> "$SESSION_DIR/session-info.md"
else
    echo "⚠️  Session folder not found: $SESSION_DIR"
fi

# Save current checksums
if [ -x "$PROJECT_DIR/scripts/query-index.sh" ]; then
    CHECKSUM=$("$PROJECT_DIR/scripts/query-index.sh" checksum 2>/dev/null)
    if [ -n "$CHECKSUM" ]; then
        mkdir -p "$PROJECT_DIR/.claude/temp"
        echo "$CHECKSUM" > "$PROJECT_DIR/.claude/temp/last-session-checksum"
        echo "✅ Saved checksum: $CHECKSUM"
    else
        echo "⚠️  Could not generate checksum"
    fi
fi

# Check for uncommitted changes
if command -v git >/dev/null 2>&1; then
    CHANGES=$(git status --porcelain | wc -l)
    if [ $CHANGES -gt 0 ]; then
        echo "⚠️  Uncommitted changes: $CHANGES files"
        echo "   Consider committing before ending session"
    fi
fi

# Checkpoint state files
echo "📝 Checkpointing state files..."
for file in process-tracker.md product-tracker.md event-stream.md context.md architecture-core.md; do
    if [ -f "$PROJECT_DIR/$file" ]; then
        echo "   ✓ $file"
    else
        echo "   ⚠️ $file (not found)"
    fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Session ended successfully"
echo "💡 Next session: Run SessionStart.sh"