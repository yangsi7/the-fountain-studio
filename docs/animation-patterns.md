# Animation Patterns with Framer Motion

> Comprehensive guide for animations using Framer Motion only
> Version: 1.0 | Last Updated: 2025-01-20

## Core Principle

**Single Animation Library**: All animations use Framer Motion. No AOS, no other libraries.

## Setup

```tsx
// app/[locale]/layout.tsx
import { AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
}
```

## Scroll-Triggered Animations (Replacing AOS)

### Basic Fade Up on Scroll

```tsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
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

// Usage (replaces data-aos="fade-up")
<FadeUpOnScroll delay={0.2}>
  <ServiceCard />
</FadeUpOnScroll>
```

### Stagger Children Animation

```tsx
export function StaggerContainer({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2  // 200ms between each child
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut"
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

// Usage for service cards
<StaggerContainer>
  {services.map(service => (
    <StaggerItem key={service.id}>
      <ServiceCard {...service} />
    </StaggerItem>
  ))}
</StaggerContainer>
```

## Hero Section Animations

### Ken Burns Effect

```tsx
export function HeroBackground({ image }) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ scale: 1 }}
      animate={{ scale: 1.05 }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear"
      }}
    >
      <img
        src={image}
        alt="Hero background"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
```

### Hero Text Animation

```tsx
export function HeroContent({ title, subtitle, cta }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="relative z-10 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-5xl md:text-6xl font-heading"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-4 text-xl"
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <Button>{cta}</Button>
      </motion.div>
    </motion.div>
  );
}
```

### Scroll Indicator

```tsx
export function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <ChevronDown className="w-6 h-6 text-white/70" />
    </motion.div>
  );
}
```

## Navigation Animations

### Sticky Navigation with Background Transition

```tsx
export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={false}
      animate={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        boxShadow: scrolled
          ? "0 1px 3px rgba(0,0,0,0.1)"
          : "0 0 0 rgba(0,0,0,0)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Navigation content */}
    </motion.nav>
  );
}
```

## Interaction Animations

### Card Hover Lift

```tsx
export function ServiceCard({ service }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="bg-white rounded-lg shadow-sm"
    >
      {/* Card content */}
    </motion.div>
  );
}
```

### Button Scale on Hover

```tsx
export function AnimatedButton({ children, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className="px-6 py-3 bg-gold text-white rounded"
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

## Accordion Animations

```tsx
export function AccordionItem({ title, content, isOpen, toggle }) {
  return (
    <div>
      <button onClick={toggle} className="w-full text-left">
        {title}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## Parallax Effects

### Subtle Parallax for About Section

```tsx
export function ParallaxImage({ src, alt }) {
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
}
```

## Performance Optimizations

### Lazy Motion for Code Splitting

```tsx
import { LazyMotion, domAnimation } from "framer-motion";

export function App({ children }) {
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
```

### Reduced Motion Support

```tsx
export function AccessibleAnimation({ children }) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.5
      }}
    >
      {children}
    </motion.div>
  );
}
```

## Custom Hooks

### useScrollAnimation Hook

```tsx
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: options.margin || "-100px",
    ...options
  });

  return {
    ref,
    animation: {
      initial: { opacity: 0, y: 30 },
      animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
      transition: {
        duration: 0.5,
        ease: "easeOut",
        ...options.transition
      }
    }
  };
}

// Usage
function Component() {
  const { ref, animation } = useScrollAnimation();

  return (
    <motion.div ref={ref} {...animation}>
      Content
    </motion.div>
  );
}
```

## Migration from AOS

### AOS to Framer Motion Mapping

| AOS Effect | Framer Motion Implementation |
|------------|----------------------------|
| `data-aos="fade-up"` | `<FadeUpOnScroll>` component |
| `data-aos="fade-in"` | `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` |
| `data-aos="zoom-in"` | `initial={{ scale: 0.8 }} animate={{ scale: 1 }}` |
| `data-aos="slide-right"` | `initial={{ x: -100 }} animate={{ x: 0 }}` |
| `data-aos-delay="200"` | `transition={{ delay: 0.2 }}` |
| `data-aos-duration="1000"` | `transition={{ duration: 1 }}` |
| `data-aos-once="true"` | `useInView(ref, { once: true })` |

## Best Practices

1. **Use `once: true`** for scroll animations to prevent re-animation
2. **Stagger children** for lists and grids (200ms default)
3. **Keep durations short**: 300-500ms for UI, 500-700ms for content
4. **Use `whileInView`** sparingly - prefer `useInView` hook
5. **Lazy load motion features** with `LazyMotion` for better performance
6. **Test with reduced motion** preference enabled
7. **Use CSS for simple hovers** when possible
8. **Batch animations** with variants for better performance

## Component Library Integration

All shadcn/ui components can be wrapped with Framer Motion:

```tsx
import { Card as ShadcnCard } from "@/components/ui/card";
import { motion } from "framer-motion";

// Create motion version
const MotionCard = motion(ShadcnCard);

// Use with animation props
<MotionCard
  whileHover={{ y: -4 }}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</MotionCard>
```

---
*Animation Patterns v1.0 | Framer Motion Only*
*The Fountain Studio | Swiss Medical Spa*