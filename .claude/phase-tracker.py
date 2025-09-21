#!/usr/bin/env python3
"""Minimal phase tracker - updates state based on keywords"""
import json
import sys
import os
import re

STATE_FILE = os.path.join(os.environ.get('CLAUDE_PROJECT_DIR', '.'), '.claude/state/pipeline.json')

# Handle command line arguments
if len(sys.argv) > 1 and sys.argv[1] == 'check':
    # Check command - just display current state
    try:
        with open(STATE_FILE, 'r') as f:
            state = json.load(f)
        print(f"Current phase: {state['phase']}")
        print(f"Loop counts: {state['loops']}")
        sys.exit(0)
    except Exception as e:
        print(f"Error reading state: {e}")
        sys.exit(1)

# Load prompt from stdin for phase detection
try:
    if not sys.stdin.isatty():
        input_data = json.load(sys.stdin)
        prompt = input_data.get("prompt", "").lower()
    else:
        # No stdin input, exit gracefully
        sys.exit(0)
except:
    sys.exit(0)

# Detect phase keywords
phases = {
    1: r'\b(research|analyze|investigate|requirements)\b',
    2: r'\b(spec|specify|design|iterate)\b',
    3: r'\b(plan|breakdown|tasks)\b',
    4: r'\b(implement|test|execute|build)\b',
    5: r'\b(clean|document|refactor)\b'
}

detected = None
for phase, pattern in phases.items():
    if re.search(pattern, prompt):
        detected = phase
        break

if detected:
    # Update state
    try:
        with open(STATE_FILE, 'r') as f:
            state = json.load(f)
        
        if state['phase'] != detected:
            # New phase
            state['phase'] = detected
            state['loops'][str(detected)] = 1
        else:
            # Continue phase
            state['loops'][str(detected)] += 1
        
        with open(STATE_FILE, 'w') as f:
            json.dump(state, f, indent=2)
        
        # Provide context
        loops = state['loops'][str(detected)]
        max_loops = state['max_loops'][str(detected)]
        
        if loops > max_loops:
            print(f"⚠️ Phase {detected}: Exceeded max loops ({max_loops})")
        else:
            print(f"Phase {detected}: Loop {loops}/{max_loops}")
    except:
        pass

sys.exit(0)