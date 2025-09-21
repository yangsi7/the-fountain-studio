# Agent Chain Patterns

> Common workflow patterns for agent invocation chains
> Part of Memory System v1.0 Workflow Automaton

---

## Chain Pattern Categories

### 1. Simple Linear Chains
Sequential execution where each agent depends on the previous output.

#### Research → Document
```
Pattern: tree-of-thought → architecture-maintainer
Use Case: Understanding existing code and documenting findings

Example:
  tree-of-thought: "Map authentication system entities"
  → architecture-maintainer: "Update architecture-core.md with findings"
```

#### Plan → Execute → Verify
```
Pattern: brainstormer → [implementation-agent] → test-runner
Use Case: Standard feature development

Example:
  brainstormer: "Generate payment integration approaches"
  → supabase-architect: "Design payment tables and RLS"
  → test-runner: "Validate migration and policies"
```

#### Documentation Retrieval
```
Pattern: claude-docs-fetcher → implementation
Use Case: Getting official docs before implementing Claude Code features

Example:
  claude-docs-fetcher: "Retrieve hook configuration docs"
  → implement: "Create custom hook based on docs"
```

### 2. Parallel Execution Patterns
Multiple agents working simultaneously on different aspects.

#### UI + Database Parallel
```
Pattern: PARALLEL(ui-ux-spec, supabase-architect) → integration-test
Use Case: Full-stack feature requiring both frontend and backend

Example:
  PARALLEL:
    ui-ux-spec: "Design payment form component"
    supabase-architect: "Create payment tables"
  → CONVERGE:
    test-runner: "Integration test payment flow"
```

#### Multi-Domain Analysis
```
Pattern: PARALLEL(index-analyzer × N domains) → architecture-maintainer
Use Case: Large refactoring affecting multiple areas

Example:
  PARALLEL:
    index-analyzer[ui]: "Analyze /components/**"
    index-analyzer[api]: "Analyze /app/api/**"
    index-analyzer[db]: "Analyze /supabase/**"
  → MERGE:
    architecture-maintainer: "Consolidate findings"
```

#### Research + Documentation Parallel
```
Pattern: PARALLEL(claude-docs-fetcher, tree-of-thought) → implementation
Use Case: Understanding both Claude Code features and existing code

Example:
  PARALLEL:
    claude-docs-fetcher: "Get memory system docs"
    tree-of-thought: "Map current memory implementation"
  → CONVERGE:
    implement: "Align implementation with docs"
```

### 3. Iterative Patterns
Loops with exit conditions for incremental improvement.

#### TDD Red-Green-Refactor
```
Pattern: test-runner → [fix] → test-runner → [refactor] → test-runner
Use Case: Test-driven development cycle

Example:
  test-runner: "Run failing test" (RED)
  → implement: "Minimal code to pass"
  → test-runner: "Verify passing" (GREEN)
  → refactor: "Improve code quality"
  → test-runner: "Ensure still passing" (REFACTOR)

Exit: All tests passing + coverage met
```

#### Progressive Enhancement
```
Pattern: basic → test → enhance → test → optimize → test
Use Case: Incremental feature building

Example:
  implement: "Basic functionality"
  → test-runner: "Verify core works"
  → enhance: "Add error handling"
  → test-runner: "Verify robustness"
  → optimize: "Improve performance"
  → test-runner: "Verify optimization"
```

### 4. Validation Chains
Chains focused on verification and quality assurance.

#### Complete Validation
```
Pattern: test-runner → karen → jenny → postflight-validator
Use Case: Critical feature requiring thorough validation

Example:
  test-runner: "Execute all test suites"
  → karen: "Reality check actual vs claimed"
  → jenny: "Verify spec compliance"
  → postflight-validator: "Final quality gates"
```

#### Browser E2E Flow
```
Pattern: browser-setup → browser-test → visual-validation
Use Case: End-to-end user flow testing

Example:
  browser_navigate: "Go to app"
  → browser_auth: "Handle authentication"
  → browser_flow: "Execute user journey"
  → browser_screenshot: "Capture for regression"
  → browser_console: "Check for errors"
```

### 5. Custom Workflow Patterns
Dynamic chains constructed based on task analysis.

#### Adaptive Chain Construction
```
Pattern: ANALYZE → BUILD → EXECUTE
Use Case: Novel or complex tasks without standard pattern

Process:
  1. ANALYZE task characteristics:
     - Domains affected: [ui, database, api]
     - Complexity: 8/10
     - Risk: High

  2. BUILD optimal chain:
     - karen: "Reality check requirements"
     - PARALLEL(brainstormer × 3): "Multiple solutions"
     - tree-of-thought: "Map dependencies"
     - PARALLEL(ui-ux-spec, supabase-architect)
     - test-runner: "Validate each component"
     - jenny: "Compliance check"
     - postflight-validator: "Final validation"

  3. EXECUTE with checkpoints
```

### 6. Recovery Patterns
Chains for handling failures and rollbacks.

#### Failure Recovery
```
Pattern: detect-failure → analyze → remediate → verify
Use Case: Handling validation failures

Example:
  postflight-validator: "Validation failed"
  → analyze: "Identify root causes"
  → fix: "Apply targeted fixes"
  → test-runner: "Verify fixes"
  → postflight-validator: "Re-validate"
```

## Chain Selection Matrix

| Task Type | Complexity | Recommended Chain |
|-----------|------------|-------------------|
| Bug Fix | Low | test-runner → implement → test-runner |
| Bug Fix | High | tree-of-thought → karen → implement → test-runner → jenny |
| Feature | Low | brainstormer → implement → test-runner |
| Feature | High | PARALLEL(brainstormer×3) → vote → implement → test-runner → postflight |
| Refactor | Any | tree-of-thought → PARALLEL(index-analyzer) → implement → test-runner |
| Research | Any | tree-of-thought → architecture-maintainer |
| UI Work | Low | ui-ux-spec → implement → browser-mcp-test |
| UI Work | High | ui-ux-spec → PARALLEL(implement, a11y) → browser-mcp-test |
| Database | Low | supabase-architect → implement → test-runner |
| Database | High | supabase-architect → supabase-consultant → implement → test-runner |
| Full Stack | Any | PARALLEL(ui-ux-spec, supabase-architect) → implement → integration-test |

## Parallel Execution Guidelines

### When to Use Parallel Agents
- Multiple independent domains affected
- Time-critical tasks
- Brainstorming/solution generation
- Cross-functional validation

### Parallel Execution Syntax
```bash
# Launch multiple agents in single message
Task: agent1 with prompt1
Task: agent2 with prompt2
Task: agent3 with prompt3

# All execute simultaneously
```

### Coordination Patterns
```
PARALLEL → MERGE:
  Multiple agents → Single consolidation agent

PARALLEL → CONVERGE:
  Multiple agents → Integration point

PARALLEL → VOTE:
  Multiple solutions → Selection mechanism
```

## Chain Optimization Tips

1. **Minimize Chain Length**: Use fewest agents needed
2. **Parallelize When Possible**: Reduce total execution time
3. **Early Validation**: Fail fast with karen/jenny early
4. **Checkpoint Frequently**: Allow rollback points
5. **Cache Results**: Reuse outputs when iterating

## Event Logging for Chains

```
HH:MM:SS | CHAIN | START | pattern-name | agent-count
HH:MM:SS | CHAIN | EXECUTE | agent-name | status
HH:MM:SS | CHAIN | PARALLEL | 3 agents | started
HH:MM:SS | CHAIN | CONVERGE | results | merged
HH:MM:SS | CHAIN | COMPLETE | pattern-name | success/failure
```

## Custom Chain Builder Process

When no standard pattern matches:

1. **Extract Requirements**
   ```
   domains: [ui, api, database]
   complexity: high
   risk: medium
   constraints: performance, security
   ```

2. **Map to Capabilities**
   ```
   Required: solution_generation, ui_design, database_design, testing
   Optional: performance_optimization, security_audit
   ```

3. **Select Agents**
   ```
   Core: brainstormer, ui-ux-spec, supabase-architect, test-runner
   Support: karen, jenny, postflight-validator
   ```

4. **Determine Order**
   ```
   1. karen (reality check)
   2. PARALLEL(brainstormer × 3)
   3. Vote on approach
   4. PARALLEL(ui-ux-spec, supabase-architect)
   5. Implement
   6. test-runner
   7. postflight-validator
   ```

5. **Add Checkpoints**
   ```
   After step 2: Can we proceed?
   After step 4: Designs compatible?
   After step 6: Tests passing?
   ```

## Integration with Workflow Automaton

These patterns map to the workflow automaton states:

- **INIT**: Simple context-fetcher chain
- **PLANNING**: Brainstormer patterns
- **EXECUTION**: Implementation chains
- **TDD_LOOP**: Iterative test patterns
- **VERIFICATION**: Validation chains
- **COMPLETION**: Architecture update patterns

The automaton automatically selects appropriate patterns based on:
- Current phase
- Task characteristics
- Previous state outcomes
- Available resources

---
*Chain patterns for efficient agent orchestration in Memory System v1.0*