# JSON Specification Templates

## UI/UX Specification Format

### Full UI Component Specification
```json
{
  "metadata": {
    "request_id": "REQ-[YYYYMMDD]-UI-[###]",
    "agent": "ui-ux-spec-agent",
    "timestamp": "ISO-8601 timestamp",
    "session_id": "current-session-id",
    "memory_system": "v1.0",
    "version": "1.0.0"
  },
  "feature": "Component Name",
  "requirements": {
    "functional": [
      "44px minimum touch targets",
      "High contrast variants",
      "Responsive breakpoints"
    ],
    "accessibility": [
      "WCAG 2.1 AA+ compliance",
      "Screen reader support",
      "Keyboard navigation"
    ],
    "performance": [
      "Bundle size under 2KB",
      "Tree-shakeable exports",
      "Lazy loading support"
    ]
  },
  "testing_requirements": {
    "unit_tests": [
      "Touch target size",
      "Color contrast ratios",
      "Component API"
    ],
    "accessibility_tests": [
      "Screen reader navigation",
      "Keyboard interaction",
      "Focus management"
    ],
    "browser_tests": [
      "Chrome, Firefox, Safari compatibility",
      "Mobile responsiveness",
      "Touch interactions"
    ]
  }
}
```

## Solution Specification Format (Brainstormer)

### Multiple Solution Analysis
```json
{
  "metadata": {
    "agent": "brainstormer",
    "timestamp": "ISO-8601",
    "session_id": "current-session-id",
    "profile": "feature",
    "token_budget": 1000
  },
  "solutions": [
    {
      "id": "SOL-001",
      "name": "Solution Name",
      "description": "Brief description",
      "pros": ["Advantage 1", "Advantage 2"],
      "cons": ["Disadvantage 1", "Disadvantage 2"],
      "score": {
        "feasibility": 8,
        "impact": 9,
        "complexity": 5,
        "risk": 3,
        "total": 25
      },
      "implementation": {
        "effort": "2-3 days",
        "dependencies": ["dep1", "dep2"],
        "risks": ["risk1", "risk2"]
      }
    }
  ],
  "recommendation": {
    "selected": "SOL-001",
    "reasoning": "Why this solution was chosen",
    "alternatives": ["SOL-002", "SOL-003"]
  }
}
```

## Database Specification Format

### Table Design Specification
```json
{
  "metadata": {
    "agent": "supabase-architect",
    "timestamp": "ISO-8601",
    "profile": "database",
    "token_budget": 800
  },
  "tables": [
    {
      "name": "table_name",
      "columns": [
        {
          "name": "id",
          "type": "uuid",
          "constraints": ["PRIMARY KEY", "DEFAULT gen_random_uuid()"]
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "constraints": ["NOT NULL", "DEFAULT now()"]
        }
      ],
      "indexes": [
        {
          "name": "idx_table_created_at",
          "columns": ["created_at"],
          "type": "btree"
        }
      ],
      "rls_policies": [
        {
          "name": "users_own_records",
          "operation": "SELECT",
          "check": "auth.uid() = user_id"
        }
      ]
    }
  ],
  "migrations": [
    {
      "version": "001",
      "description": "Initial schema",
      "sql": "CREATE TABLE ..."
    }
  ]
}
```

## Test Runner Specification

### Test Execution Report
```json
{
  "metadata": {
    "agent": "test-runner",
    "timestamp": "ISO-8601",
    "test_suite": "unit|integration|e2e"
  },
  "summary": {
    "total": 45,
    "passed": 42,
    "failed": 3,
    "skipped": 0,
    "duration": "12.5s"
  },
  "failures": [
    {
      "test": "Component renders correctly",
      "file": "Button.test.tsx:45",
      "error": "Expected color to be #2196F3",
      "stack": "Stack trace...",
      "suggested_fix": "Update color token reference"
    }
  ],
  "coverage": {
    "statements": 85.2,
    "branches": 78.5,
    "functions": 90.1,
    "lines": 86.3
  }
}
```

## Entity Mapping Format (Tree of Thought)

### Code Structure Analysis
```json
{
  "metadata": {
    "agent": "tree-of-thought-agent",
    "timestamp": "ISO-8601",
    "profile": "research",
    "token_budget": 800
  },
  "entities": [
    {
      "id": "ENT-001",
      "name": "UserAuth",
      "type": "class|function|component",
      "location": "src/auth/UserAuth.tsx",
      "description": "Handles user authentication"
    }
  ],
  "relationships": [
    {
      "from": "ENT-001",
      "to": "ENT-002",
      "type": "imports|extends|uses|calls",
      "description": "Relationship description"
    }
  ],
  "hierarchy": {
    "root": "ENT-001",
    "children": [
      {
        "id": "ENT-002",
        "children": []
      }
    ]
  }
}
```

## Handoff Protocol Format

### Task Completion Summary
```json
{
  "summary": {
    "task": "Task description",
    "status": "complete|partial|blocked",
    "duration": "45 minutes",
    "react_loop": "Steps 4-5"
  },
  "deliverables": {
    "created": [
      "specification.json",
      "report.html"
    ],
    "updated": [
      "process-tracker.md",
      "product-tracker.md",
      "event-stream.md"
    ],
    "dependencies": [
      "@shadcn/ui",
      "testing-library"
    ]
  },
  "handoff": {
    "next_action": "Review and implement",
    "validation": "Check compliance and metrics",
    "mcp_tools": ["mcp__shadcn__*", "mcp__browsermcp__*"],
    "risks": ["Browser compatibility", "Bundle size"]
  }
}
```

## Architecture Documentation Format

### System State Snapshot
```json
{
  "metadata": {
    "agent": "architecture-maintainer",
    "timestamp": "ISO-8601",
    "version": "4.0.0"
  },
  "metrics": {
    "total_files": 139,
    "total_lines": 25000,
    "test_coverage": 78.5,
    "documentation_coverage": 85.2
  },
  "drift_detection": {
    "documented_vs_actual": {
      "tables": {"documented": 10, "actual": 10, "drift": 0},
      "api_endpoints": {"documented": 6, "actual": 7, "drift": 1},
      "components": {"documented": 24, "actual": 24, "drift": 0}
    }
  },
  "health_status": {
    "overall": "healthy",
    "issues": [
      {
        "severity": "warning",
        "component": "api/submit",
        "issue": "Undocumented endpoint"
      }
    ]
  }
}
```

---
*This template library contains standardized JSON formats for agent outputs*
*Referenced by: All agents generating structured output*