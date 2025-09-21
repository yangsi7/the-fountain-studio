# Development Guidelines

## Code Conventions

### TypeScript Standards
- **Strict Mode**: Always enabled
- **Type Safety**: No `any` types without justification
- **Interfaces**: Prefer interfaces over types for objects
- **Naming**: PascalCase for components, camelCase for functions

### React Patterns

#### Component Structure
```typescript
// 1. Imports
import { useState } from 'react';
import { useTranslations } from 'next-intl';

// 2. Types/Interfaces
interface ComponentProps {
  title: string;
  isActive?: boolean;
}

// 3. Component
export function ComponentName({ title, isActive = false }: ComponentProps) {
  // 4. Hooks
  const t = useTranslations();
  const [state, setState] = useState(false);

  // 5. Handlers
  const handleClick = () => {
    setState(!state);
  };

  // 6. Render
  return (
    <div onClick={handleClick}>
      {title}
    </div>
  );
}
```

#### Server vs Client Components
- **Default**: Server Components
- **Client**: Only when needed for:
  - Event handlers
  - Browser APIs
  - State management
  - Third-party client libraries

### Styling Conventions

#### Tailwind CSS Usage
```typescript
// ✅ Good - Using utility classes
<div className="flex items-center gap-4 p-6 bg-fountain-cream">

// ✅ Good - Using cn() for conditional classes
<button className={cn(
  "px-4 py-2 rounded-lg",
  isActive ? "bg-fountain-amber" : "bg-gray-200"
)}>

// ❌ Bad - Inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

#### Custom Classes
- Use semantic names: `hero-section`, `service-card`
- Prefix with component: `navigation-link`
- Group related utilities: `btn btn-primary`

### File Organization

#### Component Files
```
components/
├── sections/           # Page sections
│   ├── Hero.tsx       # Component
│   └── Hero.test.tsx  # Tests
├── layout/            # Layout components
└── ui/                # Base UI components
```

#### Naming Conventions
- **Components**: PascalCase (`ServiceCard.tsx`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Constants**: UPPER_SNAKE (`MAX_ITEMS`)
- **CSS**: kebab-case (`button-primary`)

## Git Workflow

### Branch Strategy
```bash
main                    # Production
├── develop            # Development
    ├── feature/xxx    # New features
    ├── fix/xxx        # Bug fixes
    └── chore/xxx      # Maintenance
```

### Commit Messages
Follow conventional commits:
```
feat: Add booking integration with Cal.com
fix: Correct mobile navigation z-index
docs: Update development guidelines
style: Format code with Prettier
refactor: Simplify service card component
test: Add unit tests for booking flow
chore: Update dependencies
```

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Mobile tested
- [ ] Cross-browser tested

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
```

## Testing Standards

### Unit Testing
```typescript
// Component.test.tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders title correctly', () => {
    render(<ComponentName title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### E2E Testing
```typescript
// booking.spec.ts
import { test, expect } from '@playwright/test';

test('booking flow completes successfully', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Book Session');
  // ... test steps
});
```

## Performance Guidelines

### Image Optimization
```typescript
// ✅ Good - Using Next.js Image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Studio space"
  width={1920}
  height={1080}
  priority
  placeholder="blur"
/>

// ❌ Bad - Regular img tag
<img src="/hero.jpg" alt="Studio space" />
```

### Code Splitting
```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { ssr: false }
);
```

### Bundle Size
- Monitor with `@next/bundle-analyzer`
- Lazy load non-critical components
- Tree-shake unused code
- Minimize dependencies

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio
- **Touch Targets**: Minimum 44x44px
- **Keyboard Navigation**: All interactive elements
- **Screen Readers**: Semantic HTML and ARIA labels

### Accessibility Checklist
```typescript
// ✅ Good - Accessible button
<button
  aria-label="Open navigation menu"
  onClick={handleClick}
  className="p-3 min-w-[44px] min-h-[44px]"
>
  <Menu />
</button>

// ✅ Good - Form with labels
<label htmlFor="email" className="sr-only">
  Email address
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={!!errors.email}
/>
```

## Security Best Practices

### Data Handling
- Never expose sensitive data in client components
- Validate all user inputs
- Sanitize data before display
- Use environment variables for secrets

### API Security
```typescript
// API route with validation
export async function POST(request: Request) {
  // Validate request
  const body = await request.json();
  const validated = schema.safeParse(body);

  if (!validated.success) {
    return Response.json(
      { error: 'Invalid data' },
      { status: 400 }
    );
  }

  // Process request...
}
```

## Documentation Standards

### Component Documentation
```typescript
/**
 * ServiceCard displays a service offering with pricing
 * @param {string} title - Service name
 * @param {string} description - Service description
 * @param {number} price - Price in CHF
 * @param {boolean} featured - Highlight as featured
 * @example
 * <ServiceCard
 *   title="Biofield Tuning"
 *   description="Energy healing with tuning forks"
 *   price={120}
 *   featured
 * />
 */
```

### README Updates
- Keep README current with setup instructions
- Document environment variables
- Include deployment instructions
- Add troubleshooting section

## Monitoring & Debugging

### Development Tools
- React Developer Tools
- Redux DevTools (if using Redux)
- Network tab for API calls
- Lighthouse for performance

### Error Handling
```typescript
// Global error boundary
export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Logging
- Use structured logging
- Include context information
- Avoid logging sensitive data
- Use appropriate log levels

---

*Last Updated: January 19, 2025*