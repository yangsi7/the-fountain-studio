import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * WaveDivider - Organic section dividers with Swiss precision
 *
 * Creates subtle, mathematical sine waves that divide content sections
 * while adding organic warmth without sacrificing the Swiss Medical Spa
 * aesthetic of clinical precision.
 *
 * @component
 * @example
 * ```tsx
 * // Between sections
 * <HeroSection />
 * <WaveDivider variant="subtle" color="cream" />
 * <ServicesSection />
 * <WaveDivider variant="subtle" color="silk" flip />
 * ```
 */

interface WaveDividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Wave amplitude variant
   * - subtle: 20px peak-to-trough (90% of usage)
   * - medium: 35px peak-to-trough (occasional emphasis)
   * - bold: 50px peak-to-trough (hero section only)
   */
  variant?: 'subtle' | 'medium' | 'bold';

  /**
   * Wave fill color using HSL design tokens
   * - silk: Use on Cream backgrounds
   * - cream: Use on Silk backgrounds
   * - gold-accent: Hero section only (<3% of page)
   */
  color?: 'silk' | 'cream' | 'gold-accent';

  /**
   * Flip wave vertically (creates visual variety)
   */
  flip?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export function WaveDivider({
  variant = 'subtle',
  color = 'silk',
  flip = false,
  className = '',
  ...props
}: WaveDividerProps) {
  // Wave amplitude mapping (peak-to-trough height in px)
  const waveAmplitudes = {
    subtle: 20,  // Swiss precision - barely there
    medium: 35,  // Moderate emphasis
    bold: 50     // Strong statement (hero only)
  };

  const amplitude = waveAmplitudes[variant];

  // Generate smooth sine wave path using Bézier curves
  // Math: Single sine wave with smooth Bézier approximation
  // Control points positioned at 1/4 wavelength for natural curve
  const generateWavePath = (amp: number): string => {
    // ViewBox: 1440 width (standard desktop), 100 height
    // Baseline at y=50 (center), oscillates ±amplitude
    const baseline = 50;
    const quarterWave = 360; // 1/4 of 1440px viewport

    // Single complete sine wave using quadratic Bézier curves
    // Q = Quadratic Bézier (1 control point)
    // T = Smooth continuation (mirrors previous control point)
    return `
      M 0 ${baseline}
      Q ${quarterWave} ${baseline - amp} ${quarterWave * 2} ${baseline}
      T ${quarterWave * 4} ${baseline}
      L ${quarterWave * 4} 100
      L 0 100
      Z
    `.trim().replace(/\s+/g, ' ');
  };

  const wavePath = generateWavePath(amplitude);

  // Color mapping to HSL design tokens
  const colorStyles: Record<string, string> = {
    silk: 'hsl(var(--color-silk))',
    cream: 'hsl(var(--color-cream))',
    'gold-accent': 'url(#wave-gold-gradient)', // Special gradient for hero
  };

  const fillColor = colorStyles[color];

  return (
    <div
      className={cn(
        'w-full overflow-hidden',
        // Ensure no layout shift - reserve vertical space
        variant === 'subtle' && 'h-[20px]',
        variant === 'medium' && 'h-[35px]',
        variant === 'bold' && 'h-[50px]',
        className
      )}
      aria-hidden="true" // Decorative element, hidden from assistive tech
      {...props}
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={cn(
          'w-full h-full',
          flip && 'rotate-180'
        )}
        style={{
          display: 'block', // Remove inline spacing
        }}
      >
        {/* Gradient definition for gold-accent variant (hero only) */}
        {color === 'gold-accent' && (
          <defs>
            <linearGradient id="wave-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--color-cream))" />
              <stop offset="50%" stopColor="hsl(var(--color-gold-muted))" />
              <stop offset="100%" stopColor="hsl(var(--color-cream))" />
            </linearGradient>
          </defs>
        )}

        <path
          d={wavePath}
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

/**
 * Preset wave divider configurations for common use cases
 */
export const WavePresets = {
  /**
   * Default: Subtle wave from Silk to Cream
   */
  default: () => <WaveDivider variant="subtle" color="cream" />,

  /**
   * Flipped: Subtle wave from Cream to Silk
   */
  flipped: () => <WaveDivider variant="subtle" color="silk" flip />,

  /**
   * Hero: Gold-accented wave for hero section only
   */
  hero: () => <WaveDivider variant="medium" color="gold-accent" />,

  /**
   * Emphasis: Medium wave for section transitions
   */
  emphasis: () => <WaveDivider variant="medium" color="cream" />,
} as const;
