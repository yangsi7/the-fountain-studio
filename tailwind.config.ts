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
        // Swiss Medical Spa Color Palette
        gold: {
          DEFAULT: '#B8956A', // Primary accent - Champagne Gold
          hover: '#A0825C',
          active: '#886F4E',
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#E8DCC8',
          300: '#D4C2A8',
          400: '#C4AB8A',
          500: '#B8956A',
          600: '#A0825C',
          700: '#886F4E',
          800: '#705C40',
          900: '#584932'
        },
        charcoal: {
          DEFAULT: '#2C2B29', // Primary text - Charcoal
          light: '#56564C',
          lighter: '#A8A8A2',
          50: '#F8F8F7',
          100: '#E8E8E6',
          200: '#D1D1CD',
          300: '#A8A8A2',
          400: '#7F7F77',
          500: '#56564C',
          600: '#3A3A35',
          700: '#2C2B29',
          800: '#1E1E1C',
          900: '#141413'
        },
        silk: {
          DEFAULT: '#F8F6F3', // Primary background - Silk
          dark: '#F5F2ED',
          50: '#FFFFFF',
          100: '#FDFCFB',
          200: '#FAF9F7',
          300: '#F8F6F3',
          400: '#F5F2ED',
          500: '#F2EEE7'
        },
        stone: {
          DEFAULT: '#737373',
          light: '#D4D4D4',
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
        },
        // Keep existing shadcn colors
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
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        sans: ['Source Sans 3', '-apple-system', 'sans-serif'],
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
