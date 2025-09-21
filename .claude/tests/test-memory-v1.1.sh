#!/bin/bash
# Test suite for Memory System v1.1 functionality
# Tests hook execution, event format, and session tracking

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
PASSED=0
FAILED=0
SESSION_ID="test-$(date +%s)"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Memory System v1.1 Test Suite"
echo "=========================================="
echo ""

# Function to run a test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="$3"

    echo -n "Testing: $test_name... "

    result=$(eval "$test_command" 2>&1)

    if [[ "$result" == *"$expected_result"* ]]; then
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAIL${NC}"
        echo "  Expected: $expected_result"
        echo "  Got: $result"
        ((FAILED++))
        return 1
    fi
}

# Test 1: Check enhanced-event-logger.sh exists and is executable
run_test "Enhanced logger exists" \
    "test -x $PROJECT_DIR/.claude/hooks/enhanced-event-logger.sh && echo 'exists'" \
    "exists"

# Test 2: Check subagent-tracker.sh exists and is executable
run_test "Subagent tracker exists" \
    "test -x $PROJECT_DIR/.claude/hooks/subagent-tracker.sh && echo 'exists'" \
    "exists"

# Test 3: Test enhanced logger format output
run_test "Enhanced logger format" \
    "echo '{\"tool_name\":\"Edit\",\"session_id\":\"$SESSION_ID\"}' | $PROJECT_DIR/.claude/hooks/enhanced-event-logger.sh 2>/dev/null; tail -1 $PROJECT_DIR/event-stream.md" \
    "SESSION:"

# Test 4: Test session ID extraction
run_test "Session ID in event" \
    "tail -1 $PROJECT_DIR/event-stream.md | grep -o 'SESSION:[^|]*' | head -1" \
    "SESSION:"

# Test 5: Check settings.json has enhanced logger configured
run_test "Settings.json configured" \
    "grep -q 'enhanced-event-logger.sh' $PROJECT_DIR/.claude/settings.json && echo 'configured'" \
    "configured"

# Test 6: Test subagent tracker creates directories
TEST_SESSION_DIR="$PROJECT_DIR/docs/session-$SESSION_ID"
run_test "Subagent creates dirs" \
    "echo '{\"tool_name\":\"Task\",\"session_id\":\"$SESSION_ID\",\"subagent_type\":\"test-runner\"}' | $PROJECT_DIR/.claude/hooks/subagent-tracker.sh >/dev/null 2>&1; test -d '$TEST_SESSION_DIR/subagents' && echo 'created'" \
    "created"

# Test 7: Check for old file references in agents
run_test "No old file refs in agents" \
    "grep -r 'planning\\.md\\|todo\\.md\\|plan\\.md\\|tasks\\.md' $PROJECT_DIR/.claude/agents/*.md 2>/dev/null | wc -l | tr -d ' '" \
    "0"

# Test 8: Check process-tracker.md exists
run_test "process-tracker.md exists" \
    "test -f $PROJECT_DIR/process-tracker.md && echo 'exists'" \
    "exists"

# Test 9: Check product-tracker.md exists
run_test "product-tracker.md exists" \
    "test -f $PROJECT_DIR/product-tracker.md && echo 'exists'" \
    "exists"

# Test 10: Test event format includes AGENT type for Task tool
run_test "Task tool logs as AGENT" \
    "echo '{\"tool_name\":\"Task\",\"session_id\":\"$SESSION_ID\",\"subagent_type\":\"test-runner\"}' | $PROJECT_DIR/.claude/hooks/enhanced-event-logger.sh 2>/dev/null; tail -1 $PROJECT_DIR/event-stream.md" \
    "AGENT:"

# Test 11: Check session-specific log creation
run_test "Session event log created" \
    "test -f '$TEST_SESSION_DIR/events.log' && echo 'exists' || echo 'missing'" \
    "exists"

# Test 12: Check request ID generation for subagents
run_test "Request ID generated" \
    "echo '{\"tool_name\":\"Task\",\"session_id\":\"$SESSION_ID\",\"subagent_type\":\"test-runner\"}' | $PROJECT_DIR/.claude/hooks/subagent-tracker.sh 2>/dev/null | grep -q 'REQ-' && echo 'generated'" \
    "generated"

# Clean up test session directory
rm -rf "$TEST_SESSION_DIR"

echo ""
echo "=========================================="
echo "Test Results:"
echo "  ${GREEN}Passed: $PASSED${NC}"
echo "  ${RED}Failed: $FAILED${NC}"
echo "=========================================="

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please fix the issues and run again.${NC}"
    exit 1
fi