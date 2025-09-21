# Design System Specification

## Purpose & Scope

The Fountain Studio design system provides a comprehensive visual language and component architecture for creating a premium wellness website that balances Swiss quality expectations with approachable healing aesthetics.

**Scope**: Design tokens, component patterns, motion principles, accessibility guidelines, and theme variations for a multi-language wellness platform.

## Key Decisions

### 1. Token-Based Architecture
- **Decision**: Three-tier token system (primitive → semantic → component)
- **Rationale**: Enables consistent theming and easy maintenance
- **Impact**: All design values reference tokens, never hardcoded

### 2. Atomic Design Methodology
- **Decision**: 5-level component hierarchy
- **Rationale**: Promotes reusability and systematic thinking
- **Impact**: Clear component organization and composition patterns

### 3. Swiss Medical Spa Principles
- **Decision**: Clinical precision meets conscious wellness aesthetics
- **Rationale**: Positions as technical professional, not mystic
- **Impact**: Champagne gold accents (3% max, CTAs only), charcoal text, 50% minimum white space

### 4. Accessibility First
- **Decision**: WCAG 2.1 AA+ as baseline
- **Rationale**: Swiss accessibility requirements + inclusive design
- **Impact**: All components tested for keyboard, screen reader, and contrast

## Implementation Guidelines

### Design Tokens

```typescript
// Token structure in lib/design-tokens.ts
export const tokens = {
  // Primitive tokens - raw values
  primitives: {
    colors: {
      // Refined champagne gold - used sparingly (3% max of page, CTAs only)
      gold: {
        50: '#FAF8F5',
        100: '#F5F0E8',
        200: '#E8DCC8',
        300: '#D4C2A8',
        400: '#C4AB8A',
        500: '#B8956A', // Primary accent - Champagne Gold
        600: '#A0825C',
        700: '#886F4E',
        800: '#705C40',
        900: '#584932'
      },
      // Premium charcoal for text and dark elements
      charcoal: {
        50: '#F8F8F7',
        100: '#E8E8E6',
        200: '#D1D1CD',
        300: '#A8A8A2',
        400: '#7F7F77',
        500: '#56564C',
        600: '#3A3A35',
        700: '#2C2B29', // Primary text - Charcoal
        800: '#1E1E1C',
        900: '#141413'
      },
      // Silk background - warm off-white, never pure white
      silk: {
        50: '#FFFFFF',
        100: '#FDFCFB',
        200: '#FAF9F7',
        300: '#F8F6F3', // Primary background - Silk
        400: '#F5F2ED',
        500: '#F2EEE7'
      },
      // Supporting stone neutrals for depth
      stone: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717'
      }
    },

    spacing: {
      px: '1px',
      0: '0',
      0.5: '0.125rem', // 2px
      1: '0.25rem',    // 4px
      2: '0.5rem',     // 8px
      3: '0.75rem',    // 12px
      4: '1rem',       // 16px
      5: '1.25rem',    // 20px
      6: '1.5rem',     // 24px
      8: '2rem',       // 32px
      10: '2.5rem',    // 40px
      12: '3rem',      // 48px
      16: '4rem',      // 64px
      20: '5rem',      // 80px
      24: '6rem',      // 96px
      32: '8rem',      // 128px
      40: '10rem',     // 160px
      48: '12rem',     // 192px
      56: '14rem',     // 224px
      64: '16rem'      // 256px
    },

    typography: {
      fonts: {
        heading: "'Libre Baskerville', Georgia, serif", // Medical credibility
        body: "'Source Sans 3', -apple-system, sans-serif", // Technical precision
        mono: "'JetBrains Mono', 'Courier New', monospace"
      },

      sizes: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem', // 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
        '6xl': '3.75rem', // 60px
        '7xl': '4.5rem'   // 72px
      },

      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },

      lineHeights: {
        none: 1,
        tight: 1.2,     // Headlines for impact
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.7,    // Body text for readability
        loose: 2
      },

      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.02em',  // For elegant headlines
        wider: '0.05em',
        widest: '0.1em'
      }
    },

    borders: {
      radius: {
        none: '0',
        sm: '0.125rem',  // 2px - Swiss precision
        base: '0.25rem', // 4px - Default, subtle
        md: '0.375rem',  // 6px - Cards
        lg: '0.5rem',    // 8px - Modals
        xl: '0.75rem',   // 12px - Rarely used
        '2xl': '1rem',   // 16px - Never for buttons
        '3xl': '1.5rem', // 24px - Decorative only
        full: '9999px'   // Pills - avoid
      },

      width: {
        0: '0',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px'
      }
    },

    shadows: {
      // Swiss minimal shadows - barely there
      xs: '0 1px 2px 0 rgba(44, 43, 41, 0.04)',
      sm: '0 2px 4px 0 rgba(44, 43, 41, 0.04)',
      base: '0 4px 8px -1px rgba(44, 43, 41, 0.04)',
      md: '0 8px 16px -4px rgba(44, 43, 41, 0.06)',
      lg: '0 16px 24px -8px rgba(44, 43, 41, 0.08)',
      xl: '0 24px 48px -12px rgba(44, 43, 41, 0.12)',
      inner: 'inset 0 1px 2px 0 rgba(44, 43, 41, 0.04)',
      // Special frosted glass effect for nav
      glass: '0 8px 32px rgba(44, 43, 41, 0.08)'
    },

    motion: {
      duration: {
        instant: '0ms',
        fast: '150ms',    // Hovers, micro-interactions
        base: '200ms',    // Default transitions (faster)
        slow: '300ms',    // Card animations
        slower: '500ms',  // Section reveals
        slowest: '700ms'  // Page transitions only
      },

      easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }
    }
  },

  // Semantic tokens - Swiss Medical Spa positioning
  semantic: {
    colors: {
      // Brand - Champagne gold used sparingly
      primary: tokens.primitives.colors.gold[500],      // #B8956A
      primaryHover: tokens.primitives.colors.gold[600], // #A0825C
      primaryActive: tokens.primitives.colors.gold[700],// #886F4E

      // Backgrounds - Silk, never pure white
      bgPrimary: tokens.primitives.colors.silk[300],    // #F8F6F3
      bgSecondary: tokens.primitives.colors.silk[200],  // #FAF9F7
      bgTertiary: tokens.primitives.colors.stone[50],   // #FAFAF9

      // Text - Charcoal for premium feel
      textPrimary: tokens.primitives.colors.charcoal[700],  // #2C2B29
      textSecondary: tokens.primitives.colors.charcoal[500],// #56564C
      textTertiary: tokens.primitives.colors.stone[500],    // #94948D
      textInverse: tokens.primitives.colors.silk[300],      // #F8F6F3

      // Borders
      border: tokens.primitives.colors.gray[200],
      borderHover: tokens.primitives.colors.gray[300],

      // States
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',

      // Overlays
      overlay: 'rgba(0, 0, 0, 0.5)',
      overlayLight: 'rgba(255, 255, 255, 0.9)'
    }
  },

  // Component-specific tokens - Swiss Medical Spa approach
  components: {
    button: {
      // Primary CTA - Charcoal button, gold on hover only
      primary: {
        bg: tokens.primitives.colors.charcoal[700],       // Dark button
        bgHover: tokens.primitives.colors.charcoal[800],  // Darker on hover
        text: tokens.primitives.colors.silk[300],         // Silk text
        border: 'transparent',
        accent: tokens.primitives.colors.gold[500]        // Gold hover accent
      },
      // Secondary - Outline with subtle gold
      secondary: {
        bg: 'transparent',
        bgHover: tokens.primitives.colors.gold[50],       // Faint gold tint
        text: tokens.primitives.colors.charcoal[700],
        border: tokens.primitives.colors.stone[300]
      },
      // Ghost - Minimal presence
      ghost: {
        bg: 'transparent',
        bgHover: tokens.primitives.colors.stone[100],
        text: tokens.primitives.colors.charcoal[700],
        border: 'transparent'
      }
    },

    card: {
      bg: tokens.semantic.colors.bgSecondary,
      border: tokens.primitives.colors.stone[200],        // Barely visible
      shadow: tokens.primitives.shadows.sm,               // Micro shadow
      radius: tokens.primitives.borders.radius.base,      // 4px max
      hoverShadow: tokens.primitives.shadows.md           // Subtle lift
    },

    input: {
      bg: tokens.primitives.colors.silk[200],             // Slightly different from page
      border: tokens.primitives.colors.stone[300],
      borderFocus: tokens.primitives.colors.gold[500],    // Gold focus ring
      text: tokens.semantic.colors.textPrimary,
      placeholder: tokens.semantic.colors.textTertiary,
      radius: tokens.primitives.borders.radius.sm,        // 2px - precise
      focusRing: '0 0 0 2px rgba(184, 149, 106, 0.1)'   // Subtle gold glow
    },

    navigation: {
      bg: 'rgba(248, 246, 243, 0.95)',                   // Frosted silk
      backdrop: 'blur(12px)',                            // Glass effect
      border: tokens.primitives.colors.stone[200],
      shadow: tokens.primitives.shadows.glass
    }
  }
};
```

### Component Architecture

```
atoms/
├── Button        - Primary, secondary, ghost variants
├── Input         - Text, email, tel, textarea
├── Label         - Form labels with required indicator
├── Icon          - SVG icon wrapper with size variants
├── Badge         - Status and category indicators
├── Spinner       - Loading indicator
└── Typography    - Heading and text components

molecules/
├── FormField     - Label + Input + Error combination
├── Card          - Container with optional image
├── Navigation    - Menu items with active states
├── Toast         - Notification messages
├── Modal         - Dialog overlay
├── Dropdown      - Select menu
└── Tooltip       - Contextual help

organisms/
├── BookingForm   - Multi-step booking flow
├── ServiceGrid   - Service card layout
├── Navigation    - Full header navigation
├── Footer        - Site footer with links
├── Testimonial   - Client feedback display
├── FAQ           - Accordion Q&A
└── ContactForm   - Email contact interface

templates/
├── PageLayout    - Standard page wrapper
├── BookingFlow   - Booking process template
├── DashboardLayout - Admin interface
└── ErrorLayout   - Error page template

pages/
├── Home          - Landing page composition
├── Services      - Service listing page
├── Booking       - Booking interface
├── About         - About page
└── Contact       - Contact page
```

### Typography Scale

```scss
// Fluid typography with clamp() - refined for wellness aesthetic
.text-xs    { font-size: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem); }
.text-sm    { font-size: clamp(0.875rem, 0.825rem + 0.25vw, 1rem); }
.text-base  { font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem); }  // 16px base
.text-lg    { font-size: clamp(1.125rem, 1.05rem + 0.375vw, 1.25rem); } // 18px body
.text-xl    { font-size: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem); }
.text-2xl   { font-size: clamp(1.5rem, 1.35rem + 0.75vw, 1.875rem); }
.text-3xl   { font-size: clamp(1.75rem, 1.5rem + 1vw, 2.25rem); }    // 28px mobile, 36px desktop
.text-4xl   { font-size: clamp(2rem, 1.75rem + 1.5vw, 2.625rem); }   // 32px mobile, 42px desktop
.text-5xl   { font-size: clamp(2.25rem, 2rem + 2vw, 3.5rem); }       // 36px mobile, 56px desktop
.text-6xl   { font-size: clamp(2.5rem, 2.25rem + 2.5vw, 4.5rem); }   // 40px mobile, 72px desktop

// Line length optimization
.prose {
  max-width: 65ch;  // Optimal reading length
}
```

### Spacing System

8px grid system with consistent spacing tokens:

```scss
// Component spacing patterns
.spacing-tight  { gap: 8px; }    // Within components
.spacing-base   { gap: 16px; }   // Between related items
.spacing-loose  { gap: 24px; }   // Between sections
.spacing-extra  { gap: 48px; }   // Major sections

// Section padding - generous breathing room
.section-padding {
  padding: clamp(80px, 15vw, 140px) clamp(16px, 5vw, 32px);
}

// Mobile section padding
@media (max-width: 768px) {
  .section-padding {
    padding: 80px 16px;
  }
}
```

### Motion Principles

```typescript
// Animation patterns
const animations = {
  // Micro-interactions - subtle and refined
  hover: {
    scale: 1.02,      // Buttons
    translateY: -4,   // Cards
    duration: 150,
    ease: 'easeOut'
  },

  // Page transitions - fade up pattern
  fadeIn: {
    opacity: [0, 1],
    y: [30, 0],       // Increased for more dramatic effect
    duration: 500,
    ease: 'easeOut',
    stagger: 200      // 200ms between elements
  },

  // Loading states
  skeleton: {
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  },

  // Scroll reveal
  scrollReveal: {
    opacity: [0, 1],
    y: [50, 0],
    duration: 700,
    ease: 'easeOut',
    delay: (index: number) => index * 100
  }
};

// Respect user preferences
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Responsive Breakpoints

```scss
// Mobile-first breakpoints
$breakpoints: (
  'sm': 640px,   // Small tablets
  'md': 768px,   // Tablets
  'lg': 1024px,  // Desktop
  'xl': 1280px,  // Wide desktop
  '2xl': 1536px  // Ultra-wide
);

// Usage with Tailwind
// sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```

### Accessibility Patterns

```typescript
// Focus management
const focusStyles = {
  outline: '2px solid',
  outlineColor: tokens.semantic.colors.primary,
  outlineOffset: '2px',
  borderRadius: tokens.primitives.borders.radius.md
};

// Skip links
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// ARIA patterns
const buttonProps = {
  'aria-label': 'Book a session',
  'aria-pressed': isActive,
  'aria-busy': isLoading,
  'aria-describedby': 'booking-help'
};

// Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  switch(e.key) {
    case 'Enter':
    case ' ':
      handleAction();
      break;
    case 'Escape':
      handleClose();
      break;
  }
};
```

### Theme Modes

```typescript
// Theme configuration
export const themes = {
  light: {
    ...tokens.semantic.colors
  },

  dark: {
    // Inverted color scheme
    bgPrimary: '#1A1A1A',
    bgSecondary: '#2A2A2A',
    textPrimary: '#F5F5F5',
    textSecondary: '#A0A0A0',
    primary: '#E5B245' // Slightly brighter for dark mode
  },

  highContrast: {
    // Maximum contrast for accessibility
    bgPrimary: '#FFFFFF',
    bgSecondary: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#000000',
    border: '#000000',
    primary: '#0000FF' // Blue for links
  }
};
```

## Success Metrics

### Design Consistency
- [ ] 100% token usage (no hardcoded values)
- [ ] All components in Storybook
- [ ] Design review approval
- [ ] Brand guideline compliance

### Performance
- [ ] Component render < 16ms
- [ ] Animation at 60fps
- [ ] Theme switch < 100ms
- [ ] First paint < 1s

### Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation complete
- [ ] Screen reader tested
- [ ] Color contrast passing

### Developer Experience
- [ ] Component documentation complete
- [ ] TypeScript types for all props
- [ ] Visual regression tests
- [ ] Design token IntelliSense

## Dependencies

### Required Packages
```json
{
  "@radix-ui/react-*": "latest",
  "tailwindcss": "^3.4.0",
  "tailwind-merge": "^2.0.0",
  "class-variance-authority": "^0.7.0",
  "framer-motion": "^11.0.0",
  "@storybook/react": "^8.0.0"
}
```

### External Resources
- Google Fonts (Playfair Display, Inter)
- Heroicons or Lucide for icons
- Unsplash/Pexels for imagery

### Tools
- Figma for design files
- Storybook for component development
- Chromatic for visual testing
- Percy for visual regression

---
*Design System Specification v2.0*
*The Fountain Studio - Premium Wellness Platform*
*Last Updated: 2025-09-20*
*Refined based on competitor analysis of 6 wellness websites*