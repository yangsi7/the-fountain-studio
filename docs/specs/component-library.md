# Component Library Specification

> Atomic design system using shadcn/ui components for The Fountain Studio
> Version: 2.0 | Last Updated: 2025-09-20

## Core Principle

**CRITICAL**: ALL components MUST be installed via shadcn MCP tools. Manual component creation in `/components/ui` is FORBIDDEN.

```bash
# CORRECT: Use shadcn MCP tools
mcp__shadcn__search_items_in_registries
mcp__shadcn__get_item_examples_from_registries
mcp__shadcn__get_add_command_for_items

# INCORRECT: Never manually create components
❌ Creating Button.tsx manually
❌ Copying component code from documentation
❌ Writing custom UI components from scratch
```

## Component Architecture

### Atomic Design Hierarchy

```
Atoms (shadcn/ui primitives)
↓
Molecules (combined atoms)
↓
Organisms (feature components)
↓
Templates (page layouts)
↓
Pages (full implementations)
```

## Required shadcn/ui Components

### Navigation Components

#### NavigationMenu
**Purpose**: Main header navigation
**Installation**: `npx shadcn@latest add navigation-menu`
**Customization**:
- Transparent background initially
- Solid white with shadow on scroll (80px trigger)
- Gold underline for active items
- Backdrop blur effect

#### Sheet
**Purpose**: Mobile navigation drawer
**Installation**: `npx shadcn@latest add sheet`
**Customization**:
- Full-screen overlay on mobile
- Slide from right animation
- Dark overlay (50% opacity)
- Close button in top-right

### Hero Components

#### Button
**Purpose**: CTAs throughout site
**Installation**: `npx shadcn@latest add button`
**Variants Required**:
- **Primary**: Gold background (#B8956A), white text
- **Secondary**: Ghost with gold border
- **Ghost**: Transparent with hover state
**Sizes**: default, sm, lg
**States**: hover (scale 1.02), active, disabled

#### Custom: ScrollIndicator
**Purpose**: Animated chevron at hero bottom
**Implementation**:
```tsx
// Custom component (not from shadcn)
const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <ChevronDown className="w-6 h-6 text-white/70" />
  </div>
)
```

### Content Components

#### Card
**Purpose**: Service cards, testimonials
**Installation**: `npx shadcn@latest add card`
**Customization**:
- Subtle shadow (barely visible)
- Hover lift effect (-4px translateY)
- 30% dark overlay on images
- White background
- 4px border radius maximum

#### Accordion
**Purpose**: FAQ and Learn sections
**Installation**: `npx shadcn@latest add accordion`
**Customization**:
- Smooth expand/collapse (200ms)
- Plus/minus icons
- Gold accent on hover
- 1px separator lines

#### Carousel
**Purpose**: Testimonials section
**Installation**: `npx shadcn@latest add carousel`
**Configuration**:
- Auto-play enabled (5s interval)
- Pause on hover
- Dot navigation
- Fade transition preferred

### Form Components

#### Form
**Purpose**: Contact and booking forms
**Installation**: `npx shadcn@latest add form`
**Dependencies**: react-hook-form, zod
**Features**:
- Field validation
- Error messages
- Loading states
- Success feedback

#### Input
**Purpose**: Text fields
**Installation**: `npx shadcn@latest add input`
**Customization**:
- 2px border radius
- Gold focus ring (2px)
- Silk background (#F8F6F3)
- 48px min height on mobile

#### Textarea
**Purpose**: Message fields
**Installation**: `npx shadcn@latest add textarea`
**Customization**:
- Same as Input styling
- Min 4 rows
- Auto-resize optional

#### Select
**Purpose**: Dropdown selections
**Installation**: `npx shadcn@latest add select`
**Usage**: Language preference, service selection

### Utility Components

#### Badge
**Purpose**: Status indicators, tags
**Installation**: `npx shadcn@latest add badge`
**Variants**:
- Default: Silk background
- Secondary: Gold accent
- Outline: Border only

#### Separator
**Purpose**: Visual dividers
**Installation**: `npx shadcn@latest add separator`
**Usage**: Between footer sections, FAQ items

#### Avatar
**Purpose**: Testimonial photos
**Installation**: `npx shadcn@latest add avatar`
**Sizes**: sm (32px), md (48px), lg (64px)

#### Sonner (Toast replacement)
**Purpose**: Notifications
**Installation**: `npx shadcn@latest add sonner`
**Types**: success, error, info, warning
**Note**: Toast is deprecated, use Sonner for notifications

### Dialog Components

#### Dialog
**Purpose**: Booking confirmation, forms
**Installation**: `npx shadcn@latest add dialog`
**Features**:
- Backdrop blur
- Centered positioning
- Smooth fade-in

#### AlertDialog
**Purpose**: Confirmations
**Installation**: `npx shadcn@latest add alert-dialog`
**Usage**: Cancel booking, form submission

## Custom Components (Non-shadcn)

These components are project-specific and not available in shadcn:

### LanguageSwitcher
```tsx
interface LanguageSwitcherProps {
  currentLang: 'de' | 'en'
}

// Simple links, no complex state
<div className="flex gap-2 text-sm">
  <Link href="/de" className={currentLang === 'de' ? 'font-bold' : ''}>
    DE
  </Link>
  <span>|</span>
  <Link href="/en" className={currentLang === 'en' ? 'font-bold' : ''}>
    EN
  </Link>
</div>
```

### WhatsAppButton
```tsx
// Floating action button
const WhatsAppButton = () => {
  const message = encodeURIComponent("Hallo, ich interessiere mich für eine Sitzung");
  const number = "41791234567";

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      className="fixed bottom-6 right-6 z-50 bg-green-500 p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
      aria-label="WhatsApp Chat"
    >
      <WhatsApp className="w-6 h-6 text-white" />
    </a>
  );
};
```

### ParallaxImage
```tsx
// Subtle parallax for About section only using Framer Motion
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxImage = ({ src, alt }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <motion.div
      style={{ y }}
      className="relative h-full w-full"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};
```

### CalendarEmbed
```tsx
// Cal.com integration
const CalendarEmbed = () => (
  <div className="cal-embed">
    {/* Cal.com embed script */}
  </div>
);
```

## Component Usage Patterns

### Service Card Example
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ServiceCard = ({ service }) => (
  <Card className="group hover:-translate-y-1 transition-transform duration-200">
    <div className="relative h-48 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
    <CardHeader>
      <CardTitle>{service.title}</CardTitle>
      <CardDescription>{service.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Badge variant="secondary">CHF {service.price}</Badge>
      <p className="mt-2 text-sm text-gray-600">{service.duration}</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" className="w-full">
        Learn More
      </Button>
    </CardFooter>
  </Card>
)
```

### Navigation Example
```tsx
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled
        ? "bg-white shadow-sm"
        : "bg-transparent backdrop-blur-sm"
    )}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#services">
              Services
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* More items */}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
```

## Animation Patterns (Framer Motion)

### Scroll-Triggered Animations
```typescript
// Using Framer Motion's useInView hook (replaces AOS)
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function FadeUpOnScroll({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,  // Only animate once like AOS
    margin: "-100px"  // Start animation 100px before entering viewport
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Usage in components
<FadeUpOnScroll delay={0.2}>
  <ServiceCard />
</FadeUpOnScroll>
```

### Hover Interactions
```css
/* Card hover lift */
.card-hover {
  transition: transform 200ms ease-out;
}
.card-hover:hover {
  transform: translateY(-4px);
}

/* Button scale */
.button-hover {
  transition: transform 150ms ease-out;
}
.button-hover:hover {
  transform: scale(1.02);
}

/* Link underline animation */
.link-underline {
  position: relative;
}
.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #B8956A;
  transition: width 200ms ease-out;
}
.link-underline:hover::after {
  width: 100%;
}
```

## Installation Workflow

### Step 1: Search for Components
```typescript
// Use MCP tool to search
mcp__shadcn__search_items_in_registries({
  registries: ['@shadcn'],
  query: 'button'
})
```

### Step 2: View Examples
```typescript
// Get usage examples
mcp__shadcn__get_item_examples_from_registries({
  registries: ['@shadcn'],
  query: 'button-demo'
})
```

### Step 3: Get Installation Command
```typescript
// Get the add command
mcp__shadcn__get_add_command_for_items({
  items: ['@shadcn/button', '@shadcn/card']
})
```

### Step 4: Execute Installation
```bash
npx shadcn@latest add button card
```

## Component Testing Checklist

### Visual Testing
- [ ] Responsive at all breakpoints
- [ ] Hover states working
- [ ] Focus states visible
- [ ] Loading states smooth
- [ ] Error states clear

### Accessibility Testing
- [ ] Keyboard navigable
- [ ] Screen reader compatible
- [ ] ARIA labels present
- [ ] Color contrast passing
- [ ] Focus trap in modals

### Performance Testing
- [ ] Component loads < 100ms
- [ ] Animations at 60fps
- [ ] No layout shift
- [ ] Images optimized
- [ ] Bundle size acceptable

## Theming Configuration

### Tailwind Config Extensions
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#B8956A',
          hover: '#A0825C',
          active: '#886F4E'
        },
        charcoal: {
          DEFAULT: '#2C2B29',
          light: '#3A3A35',
          dark: '#1E1E1C'
        },
        silk: {
          DEFAULT: '#F8F6F3',
          light: '#FAF9F7',
          dark: '#F5F2ED'
        }
      },
      fontFamily: {
        heading: ['Libre Baskerville', 'serif'],
        body: ['Source Sans 3', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce': 'bounce 1s infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  }
}
```

## Component Priority List

### Phase 1: Core Components (Days 1-2)
1. **Navigation**: NavigationMenu, Sheet
2. **Hero**: Button, custom ScrollIndicator
3. **Layout**: Card, Separator

### Phase 2: Content Components (Days 3-4)
1. **Services**: Enhanced Card with hover effects
2. **About**: ParallaxImage wrapper
3. **Learn**: Accordion with custom styling
4. **Testimonials**: Carousel with auto-play

### Phase 3: Interactive Components (Day 5)
1. **Forms**: Form, Input, Textarea, Select
2. **Booking**: Dialog for Cal.com
3. **Contact**: Sonner notifications
4. **WhatsApp**: Floating action button

### Phase 4: Polish (Day 6)
1. **Animations**: Framer Motion scroll animations
2. **Transitions**: Page transitions with AnimatePresence
3. **Loading**: Skeleton components
4. **Error**: Alert dialogs

## Component Documentation

Each component should have:
1. **Purpose**: Clear description of use case
2. **Props**: TypeScript interface
3. **Examples**: Usage patterns
4. **Variants**: Different states/styles
5. **Accessibility**: ARIA requirements
6. **Testing**: Test cases

## Migration from Manual Components

If any manual components exist in `/components/ui`:
1. **Identify** which shadcn component replaces it
2. **Search** for the component in registry
3. **Install** via MCP tool command
4. **Migrate** custom styles to the new component
5. **Delete** the manual component
6. **Test** all usages

## Maintenance Guidelines

### Weekly Tasks
- Check for shadcn updates
- Review component usage analytics
- Test accessibility compliance
- Update documentation

### Monthly Tasks
- Performance audit
- Bundle size analysis
- Visual regression testing
- Component library review

## Success Metrics

### Component Quality
- [x] 100% shadcn/ui components via MCP (18 components installed)
- [ ] All components responsive
- [ ] TypeScript interfaces complete
- [x] No manual UI components (all removed and replaced)

### Accessibility
- [ ] WCAG 2.1 AA+ compliant
- [ ] Keyboard navigation complete
- [ ] Screen reader tested
- [ ] 48px touch targets on mobile

### Performance
- [ ] Component bundle < 200KB total
- [ ] Animations at 60fps (Framer Motion)
- [ ] No layout shift
- [x] Images moved to /public/images/

### Visual Consistency
- [ ] Gold usage < 3% of page
- [ ] White space 50% minimum
- [ ] Consistent hover states
- [ ] Unified shadow system

---
*Component Library Specification v2.1*
*The Fountain Studio - shadcn/ui Implementation*
*Updated: 2025-09-21 - All components via MCP, Framer Motion for animations*