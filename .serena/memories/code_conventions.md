# Code Style and Conventions

## TypeScript Conventions
- **Strict Mode**: Always enabled in tsconfig.json
- **Type Inference**: Prefer inference over explicit types where possible
- **Interfaces vs Types**: Use interfaces for object shapes, types for unions/aliases
- **Naming**: 
  - Components: PascalCase (e.g., `HeroSection`)
  - Functions: camelCase (e.g., `getDictionary`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
  - Files: kebab-case for non-components (e.g., `supabase-client.ts`)

## React Patterns
- **Server Components by Default**: Use 'use client' only when necessary
- **Component Size**: Keep components under 50 lines
- **Props**: Destructure in function parameters
- **Async Components**: Use async/await in Server Components
- **Dictionary Pattern**: Pass translations as props to Client Components

## File Organization
```
/app              # Next.js App Router pages
  /[lang]         # Language-based routing
/components       # React components
  /ui             # shadcn/ui components (NEVER edit directly)
/lib              # Utility functions
  /supabase       # Database client configs
/dictionaries     # Translation JSON files
/docs             # Documentation
  /specs          # Product specifications
  /session        # Session artifacts
```

## Import Order
1. React/Next.js imports
2. Third-party libraries
3. Local components
4. Local utilities
5. Types/interfaces
6. Styles

## Authentication Patterns
```typescript
// CORRECT: Server-side redirect
await AuthService.verifyOTP(email, token)
redirect('/eligibility')  // Atomic with cookies

// INCORRECT: Client navigation after auth
return { success: true }
router.push('/eligibility')  // Race condition!
```

## Tailwind CSS Usage
- Use `cn()` utility for conditional classes
- Prefer semantic color names from design system
- Mobile-first responsive design
- Minimum touch targets: 44-48px

## Git Commit Conventions
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## Anti-Patterns to Avoid
- ✗ Client-side navigation after auth
- ✗ Individual cookie methods (use getAll/setAll)
- ✗ window.location for navigation
- ✗ JSON responses from auth actions
- ✗ Manual component creation in components/ui
- ✗ Reading entire files when symbols suffice