import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Swiss Medical Spa Color Palette - HSL-based via CSS vars
        // All colors now use semantic tokens from globals.css
        gold: {
          DEFAULT: "hsl(var(--color-gold))",
          hover: "hsl(var(--color-gold-hover))",
          active: "hsl(var(--color-gold-active))",
          muted: "hsl(var(--color-gold-muted))",
        },
        charcoal: {
          DEFAULT: "hsl(var(--color-charcoal))",
          light: "hsl(var(--color-charcoal-light))",
          lighter: "hsl(var(--color-charcoal-lighter))",
        },
        silk: {
          DEFAULT: "hsl(var(--color-silk))",
          dark: "hsl(var(--color-silk-dark))",
        },
        cream: {
          DEFAULT: "hsl(var(--color-cream))",
        },
        stone: {
          DEFAULT: "hsl(var(--color-stone))",
          light: "hsl(var(--color-stone-light))",
        },
        // Shadcn semantic colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        // Next.js font variables already include optimized font stacks
        // Do not add additional fallbacks - next/font handles this
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
      fontSize: {
        base: ['1.125rem', { lineHeight: '1.7' }], // 18px with relaxed line height
        lg: ['1.25rem', { lineHeight: '1.7' }],    // 20px
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionDuration: {
        'swiss-fast': '150ms',
        'swiss-base': '200ms',
        'swiss-slow': '300ms',
        'swiss-slower': '500ms',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
