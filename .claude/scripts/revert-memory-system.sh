#!/bin/bash
# Revert Memory System Script
# Restores the original memory system from backup

set -e  # Exit on any error

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
BACKUP_DIR="$PROJECT_DIR/.claude/backups/memory-system-v1"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

echo "🔄 Memory System Revert Script"
echo "================================"
echo "This will restore the original memory system from backup"
echo ""

# Check if backup exists
if [ ! -f "$PROJECT_DIR/CLAUDE.md.backup" ]; then
    echo "❌ Error: CLAUDE.md.backup not found!"
    echo "Cannot proceed with revert."
    exit 1
fi

echo "📋 Pre-revert checklist:"
echo "  ✓ CLAUDE.md.backup exists"
echo "  ✓ Backup directory: $BACKUP_DIR"
echo ""

# Create archive of current state before reverting
echo "📦 Archiving current state..."
mkdir -p "$PROJECT_DIR/docs/archived-sessions/memory-system-$TIMESTAMP"
ARCHIVE_DIR="$PROJECT_DIR/docs/archived-sessions/memory-system-$TIMESTAMP"

# Copy current files to archive
cp -p "$PROJECT_DIR/context.md" "$ARCHIVE_DIR/" 2>/dev/null || true
cp -p "$PROJECT_DIR/event-stream.md" "$ARCHIVE_DIR/" 2>/dev/null || true
cp -p "$PROJECT_DIR/app-structure.md" "$ARCHIVE_DIR/" 2>/dev/null || true
cp -p "$PROJECT_DIR/CLAUDE.md" "$ARCHIVE_DIR/CLAUDE.md.new" 2>/dev/null || true
cp -p "$PROJECT_DIR/.claude/hooks/context-loader.sh" "$ARCHIVE_DIR/" 2>/dev/null || true

echo "  ✓ Current state archived to: $ARCHIVE_DIR"

# Restore original CLAUDE.md
echo ""
echo "🔄 Reverting files..."
cp -p "$PROJECT_DIR/CLAUDE.md.backup" "$PROJECT_DIR/CLAUDE.md"
echo "  ✓ CLAUDE.md restored from backup"

# Remove new memory system files
rm -f "$PROJECT_DIR/context.md"
echo "  ✓ context.md removed"

rm -f "$PROJECT_DIR/event-stream.md"
echo "  ✓ event-stream.md removed"

rm -f "$PROJECT_DIR/app-structure.md"
echo "  ✓ app-structure.md removed"

# Remove context-loader hook
rm -f "$PROJECT_DIR/.claude/hooks/context-loader.sh"
echo "  ✓ context-loader.sh removed"

# Log the revert action
echo ""
echo "📝 Logging revert action..."
cat >> "$PROJECT_DIR/events.md" << EOF

### $TIMESTAMP - Memory System Reverted
- **Type**: System
- **Action**: Reverted to original memory system
- **Result**: Success
- **Details**: Archived new system to $ARCHIVE_DIR
- **Reason**: User requested revert

EOF

echo "  ✓ Revert logged to events.md"

# Create revert report
cat > "$ARCHIVE_DIR/revert-report.md" << EOF
# Memory System Revert Report

**Date**: $(date)
**Timestamp**: $TIMESTAMP

## Actions Taken

1. **Archived Current State**
   - Location: $ARCHIVE_DIR
   - Files preserved: context.md, event-stream.md, app-structure.md, CLAUDE.md.new

2. **Restored Original System**
   - CLAUDE.md restored from CLAUDE.md.backup
   - New memory files removed

3. **Files Removed**
   - context.md (orchestrator)
   - event-stream.md (event log)
   - app-structure.md (tree reference)
   - context-loader.sh (hook)

## To Re-apply New System

If you want to re-apply the new memory system:

\`\`\`bash
# Copy files from archive back to project root
cp $ARCHIVE_DIR/context.md ./
cp $ARCHIVE_DIR/event-stream.md ./
cp $ARCHIVE_DIR/app-structure.md ./
cp $ARCHIVE_DIR/CLAUDE.md.new ./CLAUDE.md
cp $ARCHIVE_DIR/context-loader.sh .claude/hooks/
chmod +x .claude/hooks/context-loader.sh
\`\`\`

## Verification

Run these commands to verify the revert:
- \`wc -l CLAUDE.md\` should show ~1141 lines
- \`ls context.md\` should show "No such file"
- Check that old pipeline system is working

---
*Revert completed successfully*
EOF

echo ""
echo "✅ Memory System Successfully Reverted!"
echo ""
echo "📊 Summary:"
echo "  • Original CLAUDE.md restored (1141 lines)"
echo "  • New memory files removed"
echo "  • Current state archived to: $ARCHIVE_DIR"
echo "  • Revert report created"
echo ""
echo "To re-apply the new system later, see:"
echo "  $ARCHIVE_DIR/revert-report.md"
echo ""