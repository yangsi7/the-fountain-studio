#!/bin/bash
# Check if architecture documentation needs review - SIMPLIFIED VERSION
# Now with real validation using query-index.sh

# Use fallback to current directory if CLAUDE_PROJECT_DIR is not set
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"

ARCH_FILE="$PROJECT_DIR/architecture-core.md"
REFS_DIR="$PROJECT_DIR/refs"
CHECKSUM_FILE="$PROJECT_DIR/.claude/temp/last-architecture-checksum"
CHANGES_LOG="$PROJECT_DIR/.claude/temp/structural-changes.log"

# Clear previous session's changes
rm -f "$CHANGES_LOG"
mkdir -p "$(dirname "$CHECKSUM_FILE")"

if [ ! -f "$ARCH_FILE" ]; then
    echo "🏗️ ARCHITECTURE INITIALIZATION NEEDED"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "architecture-core.md not found!"
    echo "Please run: /init-architecture"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 0
fi

# Check if refs directory exists
if [ ! -d "$REFS_DIR" ]; then
    echo "⚠️  REFERENCE DOCUMENTS MISSING"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "/refs/ directory not found!"
    echo "Architecture references need creation"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

# Check Memory System v1.0
if [ -f "$PROJECT_DIR/context.md" ]; then
    echo "✅ Memory System v1.0 detected"
    # Check if context-loader hook exists
    if [ -x "$PROJECT_DIR/.claude/hooks/context-loader.sh" ]; then
        echo "✅ Profile detection hook ready"
    else
        echo "⚠️  context-loader.sh missing or not executable"
    fi
else
    echo "⚠️  MEMORY SYSTEM NOT FOUND"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "context.md orchestrator missing!"
    echo "Memory system needs restoration"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
fi

# Check age of architecture doc
if [ -f "$ARCH_FILE" ]; then
    LAST_MODIFIED=$(stat -f "%m" "$ARCH_FILE" 2>/dev/null || stat -c "%Y" "$ARCH_FILE" 2>/dev/null)
    CURRENT_TIME=$(date +%s)
    DAYS_OLD=$(( ($CURRENT_TIME - $LAST_MODIFIED) / 86400 ))
    
    if [ $DAYS_OLD -gt 3 ]; then
        echo "📊 ARCHITECTURE REVIEW NEEDED"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "architecture-core.md is $DAYS_OLD days old"
        echo "Please review for currency using:"
        echo "1. ./scripts/query-index.sh checksum"
        echo "2. Compare with checksum in architecture-core.md metadata"
        echo "3. Run mcp__supabase__list_tables for DB drift check"
        echo "4. If drift detected, use architecture-maintainer agent"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    fi
fi

# Generate and store current checksum
if [ -x "$PROJECT_DIR/scripts/query-index.sh" ]; then
    CURRENT_CHECKSUM=$("$PROJECT_DIR/scripts/query-index.sh" checksum 2>/dev/null)
    if [ -n "$CURRENT_CHECKSUM" ]; then
        echo "$CURRENT_CHECKSUM" > "$CHECKSUM_FILE"
        echo "✅ Checksum generated: $CURRENT_CHECKSUM"

        # Check if checksum in architecture-core.md matches
        if [ -f "$ARCH_FILE" ]; then
            DOC_CHECKSUM=$(grep "^checksum:" "$ARCH_FILE" | cut -d' ' -f2)
            if [ -z "$DOC_CHECKSUM" ]; then
                echo "📝 CHECKSUM NEEDS ADDING"
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                echo "Add to architecture-core.md metadata:"
                echo "checksum: $CURRENT_CHECKSUM"
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            elif [ "$DOC_CHECKSUM" != "$CURRENT_CHECKSUM" ]; then
                echo "⚠️  CHECKSUM MISMATCH DETECTED"
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
                echo "Current: $CURRENT_CHECKSUM"
                echo "In Docs: $DOC_CHECKSUM"
                echo "Action: Update architecture-core.md"
                echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            else
                echo "✅ Checksum matches documentation"
            fi
        fi
    else
        echo "⚠️  Checksum command failed"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "Verify query-index.sh has checksum command"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    fi
else
    echo "⚠️  query-index.sh not found or not executable"
fi

# Simple prompt for using MCP tools to check database state
echo "💡 TIP: Check database state with:"
echo "   mcp__supabase__list_tables"
echo "   mcp__supabase__list_migrations"