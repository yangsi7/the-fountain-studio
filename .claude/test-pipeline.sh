#!/bin/bash
# Test script for XML Pipeline System v3.0

echo "Testing XML Pipeline System v3.0"
echo "================================"

# Test 1: Check state file exists
echo -n "1. State file exists: "
if [ -f ".claude/state/pipeline.json" ]; then
    echo "✅ PASS"
else
    echo "❌ FAIL"
    exit 1
fi

# Test 2: Phase tracker check command works
echo -n "2. Phase tracker check command: "
if python .claude/phase-tracker.py check > /dev/null 2>&1; then
    echo "✅ PASS"
else
    echo "❌ FAIL"
    exit 1
fi

# Test 3: Phase detection with input
echo -n "3. Phase detection (research): "
echo '{"prompt": "research the requirements"}' | python .claude/phase-tracker.py
if [ $? -eq 0 ]; then
    echo "✅ PASS"
else
    echo "❌ FAIL"
fi

# Test 4: Slash commands exist
echo -n "4. Slash commands exist: "
if [ -f ".claude/commands/phase1.md" ] && [ -f ".claude/commands/status.md" ]; then
    echo "✅ PASS"
else
    echo "❌ FAIL"
fi

# Test 5: Session hooks exist
echo -n "5. Session hooks exist: "
if [ -f ".claude/hooks/SessionStart.sh" ] && [ -f ".claude/hooks/SessionEnd.sh" ]; then
    echo "✅ PASS"
else
    echo "❌ FAIL"
fi

echo ""
echo "Current Pipeline State:"
python .claude/phase-tracker.py check

echo ""
echo "All tests completed!"