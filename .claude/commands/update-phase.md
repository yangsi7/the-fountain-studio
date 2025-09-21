---
description: Update Pipeline Phase State
allowed-tools: Edit, Write, Bash
---

## 🔄 Update Phase State

**Purpose**: Quick helper command to update pipeline state tracking.

### Quick Commands
```
/update-phase 1        # Switch to Phase 1, loop 1
/update-phase 2 --loop # Continue in Phase 2, increment loop
/update-phase 3 --new  # Start Phase 3, reset loop to 1
```

### What This Command Does
1. Updates `.claude/state/pipeline.json` with new phase and loop
2. Logs the phase change to `events.md`
3. Validates phase number (1-5) and loop limits
4. Shows current state after update

### Usage Patterns

#### Starting a New Phase
```bash
# When entering a phase for the first time
/update-phase <phase_number>
# Sets phase to specified number, loop to 1
```

#### Continuing in Same Phase
```bash
# When continuing work in current phase
/update-phase <phase_number> --loop
# Keeps phase, increments loop counter
```

#### Resetting to Phase Start
```bash
# When restarting a phase from beginning
/update-phase <phase_number> --new
# Sets phase to specified number, resets loop to 1
```

### Implementation Steps

1. **Validate Phase Number**
   - Must be between 1 and 5
   - Check against valid phase definitions

2. **Check Loop Limits**
   - Phase 1: max 3 loops
   - Phase 2: max 5 loops
   - Phase 3: max 2 loops
   - Phase 4: max 10 loops
   - Phase 5: max 1 loop

3. **Update State File**
   ```json
   {
     "phase": <number>,
     "loops": {
       "1": <count>,
       "2": <count>,
       "3": <count>,
       "4": <count>,
       "5": <count>
     },
     "max_loops": {
       "1": 3,
       "2": 5,
       "3": 2,
       "4": 10,
       "5": 1
     }
   }
   ```

4. **Log to Events**
   ```markdown
   ### HH:MM:SS - Phase State Updated
   - **Type**: Phase
   - **Action**: Updated to Phase <number>, Loop <count>
   - **Result**: State file updated successfully
   ```

5. **Display New State**
   Show current phase and loop after update

### Error Handling

- **Invalid phase number**: Show error, valid range is 1-5
- **Loop limit exceeded**: Warning when max loops reached
- **File not found**: Create pipeline.json if missing
- **Invalid JSON**: Reset to default state structure

### Examples

```bash
# Start Phase 1 for requirements gathering
/update-phase 1

# Continue in Phase 2 for another iteration
/update-phase 2 --loop

# Jump to Phase 4 for testing
/update-phase 4

# Reset Phase 3 planning from beginning
/update-phase 3 --new
```

### Integration

This command integrates with:
- **Statusline**: Updates display immediately
- **Phase Commands**: Use before /phase1-5 commands
- **Event Logging**: Automatic audit trail
- **Phase Detection**: Manual override of automatic detection

---
*Helper command for XML Pipeline System v3.0 state management*