# Gemini MCP Tool Usage Guide

> Critical guide for using mcp__gemini-cli__* tools effectively
> Part of Memory System v1.0

---

## ⚠️ CRITICAL REQUIREMENT

**Gemini CANNOT read files directly from your codebase.** Unlike Claude, gemini has no access to your file system. All context must be explicitly passed using @ notation in prompts.

## The @ Notation Rule

### ✅ CORRECT Usage
Always include files with @ notation:

```javascript
// Basic analysis
mcp__gemini-cli__ask-gemini(
  prompt: "@lib/auth.ts @docs/auth.md analyze the authentication flow"
)

// Multiple files
mcp__gemini-cli__ask-gemini(
  prompt: "@components/form/*.tsx @lib/validation.ts check validation patterns"
)

// With changeMode for structured edits
mcp__gemini-cli__ask-gemini(
  prompt: "@app/page.tsx suggest performance improvements",
  changeMode: true
)

// Brainstorming with context
mcp__gemini-cli__brainstorm(
  prompt: "Using @lib/core/*.ts @docs/specs/spec.md suggest optimization strategies"
)
```

### ❌ WRONG Usage
Without @ references, gemini gets ZERO context:

```javascript
// WRONG - gemini can't see these files
mcp__gemini-cli__ask-gemini(
  prompt: "analyze lib/auth.ts"  // gemini: "I cannot see any files"
)

// WRONG - no file context
mcp__gemini-cli__brainstorm(
  prompt: "improve the data processing"  // gemini has no idea what you mean
)

// WRONG - path without @ notation
mcp__gemini-cli__ask-gemini(
  prompt: "review components/form.tsx"  // gemini cannot access this
)
```

## Available Gemini Tools

### 1. mcp__gemini-cli__ask-gemini
General analysis and code review with optional changeMode.

```javascript
// Standard analysis
mcp__gemini-cli__ask-gemini(
  prompt: "@file.ts analyze for security issues"
)

// ChangeMode for structured edits
mcp__gemini-cli__ask-gemini(
  prompt: "@component.tsx refactor for better performance",
  changeMode: true  // Returns structured suggestions Claude can apply
)

// With model selection
mcp__gemini-cli__ask-gemini(
  prompt: "@large-file.js explain what this does",
  model: "gemini-2.5-flash"  // Use for faster, simpler analysis
)
```

### 2. mcp__gemini-cli__brainstorm
Generate creative solutions with context.

```javascript
// Architecture brainstorming
mcp__gemini-cli__brainstorm(
  prompt: "Using @architecture-core.md @lib/* suggest scalability improvements",
  ideaCount: 10  // Number of ideas to generate
)

// Feature ideation
mcp__gemini-cli__brainstorm(
  prompt: "Based on @components/ui/* @docs/design-patterns.md generate new UI patterns",
  methodology: "design-thinking"  // Use specific framework
)
```

### 3. mcp__gemini-cli__fetch-chunk
Retrieve chunked responses from previous calls.

```javascript
// Initial call returns partial response
const response = mcp__gemini-cli__ask-gemini(
  prompt: "@large-codebase/* comprehensive analysis"
)
// If response indicates chunks available:
// { cacheKey: "abc123", totalChunks: 3 }

// Fetch subsequent chunks
mcp__gemini-cli__fetch-chunk(
  cacheKey: "abc123",
  chunkIndex: 2
)
```

## Best Practices

### 1. File Selection Strategy
Choose relevant files carefully to stay within token limits:

```javascript
// Good - focused context
prompt: "@lib/core/module.ts @lib/core/helpers.ts optimize these"

// Better - include related docs
prompt: "@lib/core/*.ts @docs/core-spec.md @__tests__/core.test.ts full context"

// Too broad - might hit limits
prompt: "@**/*.ts analyze entire codebase"  // Consider breaking into domains
```

### 2. Context Hierarchy
Include files in order of importance:

```javascript
prompt: `
  Primary: @lib/module.ts           // Main file to analyze
  Related: @lib/module.helpers.ts   // Supporting code
  Tests: @__tests__/module.test.ts  // Test context
  Docs: @docs/module.md              // Documentation
  Config: @tsconfig.json             // Configuration context

  Analyze the module implementation for issues
`
```

### 3. Combining with Other MCP Tools

```javascript
// First, find files with serena
const files = mcp__serena__find_file("*.ts", "lib")

// Then pass to gemini with @ notation
mcp__gemini-cli__ask-gemini(
  prompt: `@lib/module.ts @lib/helpers.ts
           suggest improvements for these modules`
)
```

## Common Pitfalls

### Pitfall 1: Forgetting @ Notation
```javascript
// User thinks gemini can see files like Claude
❌ prompt: "review the auth implementation"
✅ prompt: "@lib/auth/*.ts @middleware/auth.ts review implementation"
```

### Pitfall 2: Using Paths Instead of @ References
```javascript
// Providing paths without @ doesn't work
❌ prompt: "analyze src/components/form.tsx"
✅ prompt: "@src/components/form.tsx analyze this"
```

### Pitfall 3: Not Including Dependencies
```javascript
// Missing imported files limits understanding
❌ prompt: "@component.tsx review"
✅ prompt: "@component.tsx @lib/helpers.ts @types/component.d.ts full review"
```

### Pitfall 4: Assuming Gemini Knows Your Context
```javascript
// Gemini doesn't know your project structure
❌ prompt: "improve the user authentication"
✅ prompt: "@lib/auth.ts @app/api/auth/*.ts @docs/auth.md improve authentication"
```

## Error Handling

### No Context Error
```
Error: "I cannot see any files or code"
Solution: Add @ file references to your prompt
```

### Token Limit Exceeded
```
Error: "Response too large"
Solution:
1. Reduce number of files passed
2. Use more specific file paths
3. Break into multiple focused calls
```

### File Not Found
```
Error: "File @invalid/path.ts not found"
Solution: Verify file exists and path is correct from project root
```

## Example Workflows

### Code Review Workflow
```javascript
// 1. Read the file first (Claude)
const content = Read("/lib/critical-module.ts")

// 2. Pass to gemini for alternative perspective
mcp__gemini-cli__ask-gemini(
  prompt: "@lib/critical-module.ts identify potential issues and suggest improvements",
  changeMode: true  // Get structured suggestions
)

// 3. Apply suggestions (Claude)
Edit(suggestions)
```

### Brainstorming Workflow
```javascript
// 1. Gather context files
const context = [
  "@architecture-core.md",
  "@lib/current-implementation/*.ts",
  "@docs/requirements.md"
]

// 2. Brainstorm solutions
mcp__gemini-cli__brainstorm(
  prompt: `${context.join(' ')} suggest innovative approaches`,
  ideaCount: 5,
  methodology: "design-thinking"
)

// 3. Evaluate and implement best ideas
```

### Refactoring Workflow
```javascript
// 1. Identify target files
const targets = "@lib/legacy/*.ts @lib/legacy/helpers/*.ts"

// 2. Get refactoring suggestions
mcp__gemini-cli__ask-gemini(
  prompt: `${targets} suggest refactoring to modern patterns`,
  changeMode: true
)

// 3. Apply changes systematically
```

## Quick Reference

| Task | Example Prompt with @ Notation |
|------|--------------------------------|
| Code Review | `@file.ts review for best practices` |
| Bug Analysis | `@buggy-file.ts @test.ts identify issues` |
| Refactoring | `@old-code.ts modernize this code` |
| Architecture | `@src/* @docs/* suggest improvements` |
| Performance | `@slow-module.ts optimize performance` |
| Security | `@api/*.ts @auth/*.ts security audit` |
| Documentation | `@code.ts @existing-docs.md update docs` |

## Remember

**Every gemini prompt needs @ notation for file context.** Without it, gemini is blind to your codebase.

---
*Gemini MCP Tool Usage Guide - Memory System v1.0*
*Critical: Always use @ notation when invoking gemini tools*