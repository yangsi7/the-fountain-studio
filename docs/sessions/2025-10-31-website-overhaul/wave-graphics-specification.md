# Wave Graphics & Organic Elements Specification

**Project**: The Fountain Studio Website Overhaul v2.0
**Created**: 2025-10-31
**Status**: Draft for Review
**Research Sources**: ReactHustle, LogRocket Next.js Guide, Web Performance Best Practices

---

## Executive Summary

This specification defines organic wave graphics and subtle textures to add warmth to The Fountain Studio's website while maintaining Swiss Medical Spa precision. The solution balances clinical professionalism with approachable wellness aesthetics through carefully constrained visual elements.

**Key Principle**: Organic elements that feel *intentional*, not *decorative*—every curve serves the user's journey through content.

---

## Design Philosophy: Swiss Medical Spa Warmth

### The Challenge
Current stakeholder feedback: "Everything feels quite boxy and linear. Some graphic elements or BG textures might help here."

### The Approach
- **NOT**: Playful, whimsical, new-age mysticism
- **YES**: Precise curves that feel organic, breathing space, subtle depth
- **Analogy**: Like quality Swiss chocolate—smooth, refined, with subtle complexity

### Design Constraints (from @constitution.md)
- Gold (#D4A234) usage: ≤3% of viewport (CTAs only)
- 50% minimum white space per viewport
- Accessibility: WCAG 2.1 AA+, `aria-hidden` for decorative
- Performance: SVG preferred, lazy load textures
- Motion: Respect `prefers-reduced-motion`

---

## Approach 1: Subtle Sine Wave Dividers (RECOMMENDED)

### Visual Description
Gentle, mathematical sine waves that divide sections with barely-there presence. Think of water ripples frozen mid-motion—organic but predictable.

**Characteristics:**
- **Amplitude**: Low (20-40px peak-to-trough at desktop, 10-20px mobile)
- **Frequency**: 1-2 complete waves across viewport width
- **Stroke**: None (filled shapes only)
- **Color Strategy**:
  - Primary: Silk (#F8F6F3) on Cream (#F5F1EB) backgrounds
  - Secondary: Cream on Silk backgrounds
  - Accent: Very subtle gold gradient at hero section only

### Technical Implementation

#### SVG Component Structure (React + TypeScript)
```typescript
// components/ui/wave-divider.tsx
import { HTMLAttributes } from 'react';

interface WaveDividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'subtle' | 'medium' | 'bold';
  color?: 'silk' | 'cream' | 'gold-accent';
  flip?: boolean;
  className?: string;
}

export function WaveDivider({
  variant = 'subtle',
  color = 'silk',
  flip = false,
  className = '',
  ...props
}: WaveDividerProps) {
  // Wave path calculation based on variant
  const waveAmplitudes = {
    subtle: 20,  // 20px peak-to-trough
    medium: 35,  // 35px peak-to-trough
    bold: 50     // 50px peak-to-trough (rarely used)
  };

  const amplitude = waveAmplitudes[variant];

  // SVG viewBox: 1440 width (standard desktop), 100 height
  // Path: Smooth sine curve using Bézier curves
  const wavePath = `M 0 50 Q 360 ${50 - amplitude} 720 50 T 1440 50 L 1440 100 L 0 100 Z`;

  // Color mapping to HSL tokens
  const colors = {
    'silk': 'hsl(var(--color-silk))',
    'cream': 'hsl(var(--color-cream))',
    'gold-accent': 'linear-gradient(90deg, hsl(var(--color-cream)), hsl(var(--color-gold-muted)))'
  };

  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      aria-hidden="true"
      {...props}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`w-full h-auto ${flip ? 'rotate-180' : ''}`}
        style={{
          display: 'block', // Remove inline spacing
          fill: colors[color],
        }}
      >
        <path d={wavePath} />
      </svg>
    </div>
  );
}
```

#### Usage Example
```tsx
// Between sections in PageContent.tsx
<HeroSection dict={dict} />
<WaveDivider variant="subtle" color="cream" />

<ServicesSection dict={dict} />
<WaveDivider variant="subtle" color="silk" flip />

<AboutSection dict={dict} />
<WaveDivider variant="medium" color="gold-accent" /> {/* Hero only */}
```

### Pros
✅ **Swiss Precision**: Mathematical curves feel intentional
✅ **Performance**: Inline SVG, zero requests, ~200 bytes gzipped
✅ **Scalability**: `preserveAspectRatio="none"` works on any viewport
✅ **Maintainability**: Single component, prop-driven variants
✅ **Accessibility**: `aria-hidden="true"`, no motion by default

### Cons
❌ **Limited Organic Feel**: Pure sine waves can feel "too perfect"
❌ **Repetition Risk**: Same curve across all sections may feel monotonous

### Mitigations
- Use 3 variants (subtle, medium, bold) strategically
- Alternate `flip` prop to create visual variety
- Reserve gold-accent for hero section only

---

## Approach 2: Hand-Drawn Organic Curves

### Visual Description
Asymmetric, hand-drawn-feeling curves with subtle imperfections. Like brushstrokes in watercolor—organic, expressive, warm.

**Characteristics:**
- **Shape**: Irregular Bézier curves with varied control points
- **Texture**: SVG `<filter>` with subtle turbulence
- **Uniqueness**: 3-5 distinct wave shapes, randomly selected per section

### Technical Implementation

#### SVG with Turbulence Filter
```typescript
export function OrganicWaveDivider({ section = 1, color = 'silk' }: { section?: number, color?: string }) {
  // Pre-defined organic paths (3 variants)
  const organicPaths = [
    'M 0 30 C 240 10, 480 50, 720 30 C 960 10, 1200 50, 1440 30 L 1440 100 L 0 100 Z',
    'M 0 40 C 300 20, 600 60, 900 35 C 1200 15, 1350 55, 1440 40 L 1440 100 L 0 100 Z',
    'M 0 35 C 180 55, 540 15, 720 40 C 900 55, 1260 20, 1440 35 L 1440 100 L 0 100 Z'
  ];

  const path = organicPaths[section % organicPaths.length];

  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-auto">
        <defs>
          {/* Subtle turbulence for organic feel */}
          <filter id={`organic-${section}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path
          d={path}
          fill={`hsl(var(--color-${color}))`}
          filter={`url(#organic-${section})`}
        />
      </svg>
    </div>
  );
}
```

### Pros
✅ **Warmth**: Feels more human, less robotic
✅ **Visual Interest**: Each section has unique character
✅ **Differentiation**: Stands out from corporate sites

### Cons
❌ **Swiss Precision**: May feel "too loose" for medical spa brand
❌ **Performance**: SVG filters add rendering overhead
❌ **Complexity**: Multiple paths harder to maintain

### Recommendation
**Secondary Option** — Use for specific sections (e.g., Testimonials) where warmth outweighs precision. Not site-wide.

---

## Approach 3: Layered Gradient Waves (Animation Capable)

### Visual Description
Multiple overlapping waves with transparency, creating depth. Similar to Calm.com but more restrained—no constant animation, only optional scroll-triggered fade-in.

**Characteristics:**
- **Layers**: 2-3 overlapping waves per divider
- **Opacity**: 30%, 50%, 70% (front to back)
- **Motion**: Static by default, optional subtle parallax on scroll

### Technical Implementation

#### Multi-Layer Component
```typescript
export function LayeredWaveDivider({ animate = false }: { animate?: boolean }) {
  const layers = [
    { opacity: 0.3, translateY: 0, duration: '0s' },
    { opacity: 0.5, translateY: -5, duration: animate ? '20s' : '0s' },
    { opacity: 0.7, translateY: -10, duration: animate ? '15s' : '0s' }
  ];

  return (
    <div className="relative w-full h-[100px] overflow-hidden" aria-hidden="true">
      {layers.map((layer, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: layer.opacity,
            transform: `translateY(${layer.translateY}px)`,
            animation: animate ? `wave-float ${layer.duration} ease-in-out infinite` : 'none'
          }}
        >
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M 0 50 Q 360 30 720 50 T 1440 50 L 1440 100 L 0 100 Z"
              fill="hsl(var(--color-silk))"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
```

#### CSS Animation (Optional)
```css
@keyframes wave-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

### Pros
✅ **Depth**: Layering creates visual richness
✅ **Flexibility**: Can be static or animated
✅ **Engagement**: Subtle motion draws eye without distraction

### Cons
❌ **Performance**: Multiple SVG elements increase DOM complexity
❌ **Swiss Aesthetic Risk**: Animation may feel "too playful"
❌ **Accessibility**: Motion must respect `prefers-reduced-motion`

### Recommendation
**Hero Section Only** — Use static layers for depth, reserve animation for hero (if at all). Not for every section.

---

## Texture Implementation: Subtle Background Warmth

### Purpose
Combat "cold" feeling without visual clutter. Barely-visible textures (3-5% opacity) add depth to backgrounds.

### Texture Options

#### Option A: Paper Grain (RECOMMENDED)
**Style**: High-quality paper texture (like watercolor paper)
**Format**: Optimized PNG (1920x1080, ~50KB after compression)
**Usage**: Silk and Cream backgrounds only

**Implementation:**
```css
/* In globals.css */
.bg-silk {
  background-color: hsl(var(--color-silk));
  background-image: url('/images/textures/paper-grain.png');
  background-repeat: repeat;
  background-size: 400px 400px;
  opacity: 0.03; /* Barely visible */
}

.bg-cream {
  background-color: hsl(var(--color-cream));
  background-image: url('/images/textures/paper-grain.png');
  background-repeat: repeat;
  background-size: 400px 400px;
  opacity: 0.05; /* Slightly more visible */
}
```

#### Option B: Geometric Noise
**Style**: Subtle Perlin noise pattern (CSS-generated)
**Format**: CSS `background-image` with SVG data URI
**Usage**: Completely performant (no image files)

**Implementation:**
```typescript
// lib/noise-pattern.ts
export function generateNoisePattern(opacity = 0.03): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
        <feColorMatrix type="saturate" values="0"/>
      </filter>
      <rect width="200" height="200" filter="url(#noise)" opacity="${opacity}"/>
    </svg>
  `;

  const encoded = btoa(svg);
  return `data:image/svg+xml;base64,${encoded}`;
}
```

#### Option C: Water Ripple Texture
**Style**: Concentric circles (like water droplet impact)
**Format**: SVG pattern, tiled
**Usage**: Hero section background only

**Recommendation**: **Too literal** for Swiss aesthetic—avoid unless specifically requested.

---

## Recommended Implementation Plan

### Phase 1: Subtle Sine Wave Dividers (Priority 1)
**Rationale**: Fastest to implement, best balance of warmth + precision
**Effort**: 2-3 hours (component + integration)
**Files**:
- `components/ui/wave-divider.tsx` (new)
- `app/[lang]/PageContent.tsx` (integrate between sections)
- `tailwind.config.ts` (no changes needed)

**Acceptance Criteria**:
1. WaveDivider component accepts `variant`, `color`, `flip` props
2. 3 wave variants implemented (subtle, medium, bold)
3. Colors use HSL tokens (`--color-silk`, `--color-cream`, `--color-gold-muted`)
4. `aria-hidden="true"` for accessibility
5. No layout shift (proper spacing around dividers)
6. Works responsively (375px → 1920px+)

### Phase 2: Paper Grain Texture (Priority 2)
**Rationale**: Adds warmth without code complexity
**Effort**: 1-2 hours (texture creation + CSS)
**Files**:
- `public/images/textures/paper-grain.png` (new, optimized <50KB)
- `app/globals.css` (add texture to `.bg-silk` and `.bg-cream`)

**Acceptance Criteria**:
1. Texture barely visible (3-5% opacity)
2. Repeats seamlessly without obvious seams
3. Optimized (<50KB file size)
4. No performance impact (Lighthouse score maintained)

### Phase 3: Optional Hero Layered Wave (Priority 3)
**Rationale**: Creates "wow" moment at top of page
**Effort**: 2-3 hours (multi-layer component + testing)
**Files**:
- `components/sections/hero-wave.tsx` (new, specific to hero)
- `components/sections/HeroSection.tsx` (integrate)

**Acceptance Criteria**:
1. Static layers only (no animation initially)
2. Respects `prefers-reduced-motion`
3. Gold accent used sparingly (≤3% viewport)

---

## Performance Considerations

### SVG Optimization
- **Inline SVGs**: Faster than external files (zero network requests)
- **ViewBox Optimization**: Use standard 1440x100 for consistency
- **Path Simplification**: Keep Bézier curves minimal (max 4 control points)

### Image Textures
- **Format**: PNG-8 (not PNG-24) for grain textures
- **Compression**: TinyPNG or similar (<50KB target)
- **Loading**: CSS `background-image` lazy-loads automatically
- **Caching**: Set `max-age=31536000` in netlify.toml for textures

### Rendering Performance
- **No JavaScript**: Pure CSS + SVG (zero runtime cost)
- **No Layout Shift**: Reserve space with explicit `height` props
- **GPU Acceleration**: Use `transform` for any animations (not `top`/`left`)

---

## Accessibility Compliance

### WCAG 2.1 AA+ Requirements
✅ **Decorative Elements**: All waves have `aria-hidden="true"`
✅ **No Information Loss**: Removing waves doesn't affect content
✅ **Motion Respect**: `prefers-reduced-motion` disables any animation
✅ **Contrast**: Waves use background colors (no contrast issues)

### Screen Reader Behavior
- Waves completely ignored by assistive tech
- Section headings provide navigation structure
- No `alt` text needed (not `<img>` elements)

---

## Color & Opacity Guidelines

### Wave Divider Colors (HSL Tokens)
```typescript
// Primary usage (90% of dividers)
<WaveDivider color="silk" />   // On Cream backgrounds
<WaveDivider color="cream" />  // On Silk backgrounds

// Accent usage (hero section only, <3% of page)
<WaveDivider color="gold-accent" variant="medium" />
```

### Texture Opacity Levels
- **Silk background**: 3% opacity (most subtle)
- **Cream background**: 5% opacity (slightly more visible)
- **Gold accents**: Never textured (keep clean)

### Gradient Rules
- **Maximum 2 colors per gradient** (avoid complexity)
- **Always start/end with background colors** (seamless blend)
- **Gold gradients**: Cream → Gold-Muted (never full gold)

---

## Testing Checklist

### Visual Regression
- [ ] Screenshot comparison at 375px, 768px, 1024px, 1920px
- [ ] Waves render without distortion on all viewports
- [ ] Colors match HSL tokens exactly
- [ ] No layout shift during page load

### Performance
- [ ] Lighthouse Performance score ≥90 (maintained)
- [ ] First Contentful Paint <1.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] Total blocking time <200ms

### Accessibility
- [ ] VoiceOver (macOS) ignores decorative waves
- [ ] NVDA (Windows) ignores decorative waves
- [ ] Keyboard navigation unaffected
- [ ] `prefers-reduced-motion` respected

### Cross-Browser
- [ ] Chrome/Edge (Blink engine)
- [ ] Firefox (Gecko engine)
- [ ] Safari (WebKit engine)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Android

---

## Alternative Approaches (Not Recommended)

### Canvas API Waves
**Why Not**: Overkill for static dividers, requires JavaScript, accessibility complexity

### CSS `clip-path` Waves
**Why Not**: Limited browser support for complex paths, harder to maintain

### Animated Particle Systems
**Why Not**: Too playful for Swiss Medical Spa aesthetic, performance overhead

### Lottie Animations
**Why Not**: Large file sizes, overkill for simple dividers, requires runtime library

---

## Design Rationale Summary

**Why Subtle Sine Waves?**
- Mathematical precision = Swiss quality
- Organic curves = Wellness warmth
- Minimal footprint = Performance excellence
- Prop-driven = Maintainability

**Why Paper Grain Texture?**
- Adds warmth without distraction
- Premium feel (high-quality paper association)
- Zero runtime cost (CSS background)
- Scales infinitely (repeating pattern)

**Why NOT Animated Waves?**
- Swiss aesthetic prioritizes calm over excitement
- Motion can trigger anxiety (opposite of healing)
- Performance cost doesn't justify minimal benefit
- `prefers-reduced-motion` would disable anyway

---

## Next Steps

1. **Review this specification** with stakeholder (Ales)
2. **Create WaveDivider component** following Approach 1
3. **Source or generate paper grain texture** (<50KB PNG)
4. **Integrate waves between sections** in PageContent.tsx
5. **Test performance and accessibility** with Playwright
6. **Gather feedback** on visual warmth vs. precision balance

---

**Specification Version**: 1.0
**Author**: Claude Code (Research-Informed)
**Research Sources**: ReactHustle (SVG waves), LogRocket (Next.js SVG), Web Performance Best Practices
**Next Review**: After stakeholder feedback
