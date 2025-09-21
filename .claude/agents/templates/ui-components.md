# UI Components Template Library

## Design Tokens

### Color System
```javascript
const designTokens = {
  colors: {
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3', // Main brand color
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1'
    },
    neutral: {
      0: '#FFFFFF',
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      1000: '#000000'
    },
    semantic: {
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336',
      info: '#2196F3'
    }
  },
  typography: {
    fontFamilies: {
      heading: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"Fira Code", "Courier New", monospace'
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem'     // 48px
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem',     // 32px
    '2xl': '3rem',  // 48px
    '3xl': '4rem'   // 64px
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
};
```

## Component Patterns

### Button Component Template
```typescript
// Modern Button Component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const buttonStyles = {
  base: `
    inline-flex items-center justify-center
    font-medium rounded-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  variants: {
    primary: `
      bg-primary-500 text-white
      hover:bg-primary-600
      focus:ring-primary-500
    `,
    secondary: `
      bg-neutral-100 text-neutral-800
      hover:bg-neutral-200
      focus:ring-neutral-500
    `,
    ghost: `
      bg-transparent text-neutral-800
      hover:bg-neutral-100
      focus:ring-neutral-500
    `,
    danger: `
      bg-error text-white
      hover:bg-red-600
      focus:ring-error
    `
  },
  sizes: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
};
```

## Accessibility Checklist (WCAG 2.1 AA+)

### Contrast Requirements
```javascript
const accessibilityChecklist = {
  colorContrast: {
    normalText: 4.5, // Minimum ratio for normal text
    largeText: 3.0,  // Minimum ratio for large text (18pt+)
    nonText: 3.0,    // Minimum ratio for UI components
    preferredRatio: 7.0 // AAA level for enhanced accessibility
  },
  keyboard: {
    focusIndicator: 'Visible focus ring on all interactive elements',
    tabOrder: 'Logical tab order following visual flow',
    skipLinks: 'Skip to main content link for screen readers',
    noTrapFocus: 'Allow easy escape from all focus traps'
  },
  screenReader: {
    altText: 'Descriptive alt text for all images',
    ariaLabels: 'Proper ARIA labels for interactive elements',
    semanticHTML: 'Use semantic HTML elements appropriately',
    announcements: 'Live region announcements for dynamic content'
  },
  motion: {
    reducedMotion: 'Respect prefers-reduced-motion preference',
    pauseControl: 'Ability to pause auto-playing content',
    noFlashing: 'No content flashes more than 3 times per second'
  },
  touch: {
    minTouchTargets: 'Minimum 44px touch targets',
    spacing: 'Adequate spacing between interactive elements',
    gestures: 'Alternative methods for complex gestures'
  }
};
```

## Design Principles

### Core UI/UX Guidelines
1. **High Contrast**: 4.5:1 minimum, 7:1 preferred for enhanced accessibility
2. **Touch Targets**: 44px minimum for mobile compatibility
3. **Clear Typography**: Readable font sizes and line heights
4. **Simple Navigation**: Clear hierarchy and intuitive flow
5. **Generous Spacing**: Prevent accidental touches, improve readability
6. **Reduced Motion**: Respect prefers-reduced-motion preference
7. **Error Prevention**: Clear labels, immediate validation feedback
8. **Progressive Enhancement**: Base functionality works without JavaScript

### Performance Guidelines
1. **Bundle Splitting**: Lazy load components with React.lazy()
2. **Image Optimization**: Use next/image with responsive sizing
3. **Font Loading**: Preload critical fonts, use font-display: swap
4. **Core Web Vitals**: Target LCP < 2.5s, FID < 100ms, CLS < 0.1
5. **Tree Shaking**: Export only used components and utilities

## shadcn Component Discovery Examples

### Search for Components
```bash
# Search for accessible components
mcp__shadcn__search_items_in_registries ["@shadcn"] "button accessible"
mcp__shadcn__search_items_in_registries ["@shadcn"] "form input validation"

# Get usage examples
mcp__shadcn__get_item_examples_from_registries ["@shadcn"] "button-demo"

# View component details
mcp__shadcn__view_items_in_registries ["@shadcn/button", "@shadcn/form"]

# Get installation commands
mcp__shadcn__get_add_command_for_items ["@shadcn/button", "@shadcn/form"]
```

---
*This template library contains reusable UI components, design tokens, and accessibility patterns*
*Referenced by: ui-ux-spec-agent.md and other UI-focused agents*