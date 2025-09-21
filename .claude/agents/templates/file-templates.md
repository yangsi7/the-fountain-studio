# File Template Library

## Specification Templates

### spec.md Template
```markdown
# Spec Requirements Document

> Spec: [SPEC_NAME]
> Created: [CURRENT_DATE]
> Status: Planning

## Overview

[OVERVIEW_CONTENT]

## User Stories

[USER_STORIES_CONTENT]

## Spec Scope

[SCOPE_CONTENT]

## Out of Scope

[OUT_OF_SCOPE_CONTENT]

## Expected Deliverable

[DELIVERABLE_CONTENT]

## Spec Documentation

- Tasks: @.agent-os/specs/[FOLDER]/product-tracker.md
- Technical Specification: @.agent-os/specs/[FOLDER]/sub-specs/technical-spec.md
[ADDITIONAL_DOCS]
```

### spec-lite.md Template
```markdown
# [SPEC_NAME] - Lite Summary

[ELEVATOR_PITCH]

## Key Points
- [POINT_1]
- [POINT_2]
- [POINT_3]
```

### technical-spec.md Template
```markdown
# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/[FOLDER]/spec.md

> Created: [CURRENT_DATE]
> Version: 1.0.0

## Technical Requirements

[REQUIREMENTS_CONTENT]

## Approach

[APPROACH_CONTENT]

## External Dependencies

[DEPENDENCIES_CONTENT]
```

## Database Templates

### database-schema.md Template
```markdown
# Database Schema

This is the database schema implementation for the spec detailed in @.agent-os/specs/[FOLDER]/spec.md

> Created: [CURRENT_DATE]
> Version: 1.0.0

## Schema Changes

[SCHEMA_CONTENT]

## Migrations

[MIGRATIONS_CONTENT]
```

## API Templates

### api-spec.md Template
```markdown
# API Specification

This is the API specification for the spec detailed in @.agent-os/specs/[FOLDER]/spec.md

> Created: [CURRENT_DATE]
> Version: 1.0.0

## Endpoints

[ENDPOINTS_CONTENT]

## Controllers

[CONTROLLERS_CONTENT]
```

## Testing Templates

### tests.md Template
```markdown
# Tests Specification

This is the tests coverage details for the spec detailed in @.agent-os/specs/[FOLDER]/spec.md

> Created: [CURRENT_DATE]
> Version: 1.0.0

## Test Coverage

[TEST_COVERAGE_CONTENT]

## Mocking Requirements

[MOCKING_CONTENT]
```

## Task Management Templates

### product-tracker.md Template
```markdown
# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/[FOLDER]/spec.md

> Created: [CURRENT_DATE]
> Status: Ready for Implementation

## Tasks

[TASKS_CONTENT]
```

## Product Documentation Templates

### mission.md Template
```markdown
# Product Mission

> Last Updated: [CURRENT_DATE]
> Version: 1.0.0

## Pitch

[PITCH_CONTENT]

## Users

[USERS_CONTENT]

## The Problem

[PROBLEM_CONTENT]

## Differentiators

[DIFFERENTIATORS_CONTENT]

## Key Features

[FEATURES_CONTENT]
```

### mission-lite.md Template
```markdown
# [PRODUCT_NAME] Mission (Lite)

[ELEVATOR_PITCH]

[VALUE_AND_DIFFERENTIATOR]
```

### tech-stack.md Template
```markdown
# Technical Stack

> Last Updated: [CURRENT_DATE]
> Version: 1.0.0

## Application Framework

- **Framework:** [FRAMEWORK]
- **Version:** [VERSION]

## Database

- **Primary Database:** [DATABASE]

## JavaScript

- **Framework:** [JS_FRAMEWORK]

## CSS Framework

- **Framework:** [CSS_FRAMEWORK]

[ADDITIONAL_STACK_ITEMS]
```

### roadmap.md Template
```markdown
# Product Roadmap

> Last Updated: [CURRENT_DATE]
> Version: 1.0.0
> Status: Planning

## Phase 1: [PHASE_NAME] ([DURATION])

**Goal:** [PHASE_GOAL]
**Success Criteria:** [CRITERIA]

### Must-Have Features

[FEATURES_CONTENT]

[ADDITIONAL_PHASES]
```

### decisions.md Template
```markdown
# Product Decisions Log

> Last Updated: [CURRENT_DATE]
> Version: 1.0.0
> Override Priority: Highest

**Instructions in this file override conflicting directives in project context.**

## [CURRENT_DATE]: Initial Product Planning

**ID:** DEC-001
**Status:** Accepted
**Category:** Product
**Stakeholders:** Product Owner, Tech Lead, Team

### Decision

[DECISION_CONTENT]

### Context

[CONTEXT_CONTENT]

### Rationale

[RATIONALE_CONTENT]

### Consequences

[CONSEQUENCES_CONTENT]
```

## React Component Templates

### React Component Template
```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface [COMPONENT_NAME]Props {
  className?: string;
  children?: React.ReactNode;
}

export function [COMPONENT_NAME]({
  className,
  children,
  ...props
}: [COMPONENT_NAME]Props) {
  return (
    <div className={cn('[BASE_STYLES]', className)} {...props}>
      {children}
    </div>
  );
}
```

### React Hook Template
```typescript
import { useState, useEffect } from 'react';

export function use[HOOK_NAME]() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  return {
    state,
    // Methods
  };
}
```

## Test File Templates

### Unit Test Template
```typescript
import { render, screen } from '@testing-library/react';
import { [COMPONENT_NAME] } from './[COMPONENT_NAME]';

describe('[COMPONENT_NAME]', () => {
  it('renders correctly', () => {
    render(<[COMPONENT_NAME] />);
    expect(screen.getByRole('[ROLE]')).toBeInTheDocument();
  });

  it('[TEST_DESCRIPTION]', () => {
    // Test implementation
  });
});
```

### Integration Test Template
```typescript
import { renderWithProviders } from '@/test-utils';
import { [FEATURE_NAME] } from './[FEATURE_NAME]';

describe('[FEATURE_NAME] Integration', () => {
  it('works end-to-end', async () => {
    const { user } = renderWithProviders(<[FEATURE_NAME] />);

    // User interactions
    await user.click(screen.getByRole('button'));

    // Assertions
    expect(screen.getByText('[EXPECTED_TEXT]')).toBeInTheDocument();
  });
});
```

---
*This template library contains boilerplate files for various project needs*
*Referenced by: file-creator.md and other agents creating files*