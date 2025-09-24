# The Fountain Studio

A modern wellness website for Swiss sound healing and therapeutic services, built with Next.js 15 and Supabase.

## 🌟 Live Site

**Production**: [https://the-fountain-studio.netlify.app](https://the-fountain-studio.netlify.app)

## ✨ Features

- **Multi-language Support**: German (DE) and English (EN) with dictionary-based translations
- **Booking System**: Integrated Cal.com scheduling with direct button triggers
- **Modern Stack**: Next.js 15, TypeScript, React 19, Tailwind CSS
- **Swiss Design**: Clean, minimal aesthetic with careful gold accent usage (3%)
- **Responsive**: Mobile-first design that works beautifully on all devices
- **Performance**: Optimized images, lazy loading, and efficient bundle size

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Supabase Auth (cookie-based sessions)
- **Database**: Supabase (PostgreSQL)
- **Booking**: Cal.com integration
- **Animations**: Framer Motion
- **Deployment**: Netlify with automatic deployments

## 📦 Installation

### Prerequisites
- Node.js 18+
- pnpm 10.4.1+
- Supabase account (for auth features)

### Clone and Install

```bash
# Clone the repository
git clone https://github.com/yangsi7/the-fountain-studio.git
cd the-fountain-studio

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Cal.com
NEXT_PUBLIC_CAL_LINK=your_cal_username/event-type
```

## 🚀 Development

```bash
# Start development server
pnpm dev

# Open browser
open http://localhost:3000
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Unit tests only
pnpm test:unit

# E2E tests
pnpm test:e2e

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 📁 Project Structure

```
the-fountain-studio/
├── app/
│   ├── [lang]/          # Language-based routing
│   ├── auth/            # Authentication pages
│   └── protected/       # Protected routes
├── components/
│   ├── sections/        # Page sections
│   └── ui/              # shadcn/ui components
├── dictionaries/        # Translation files
├── lib/                 # Utilities and configs
├── public/              # Static assets
└── tests/               # Test files
```

## 🌍 Multi-Language Support

The site supports German and English through a simple dictionary system:

- `/de` - German version
- `/en` - English version

Translations are stored in `dictionaries/de.json` and `dictionaries/en.json`.

## 📅 Booking Integration

The booking system uses Cal.com with data attributes on CTA buttons:

```html
<button
  data-cal-namespace="15min"
  data-cal-link="simon-yang-z2fy7e/15min"
  data-cal-config='{"layout":"month_view"}'
>
  Book Now
</button>
```

## 🚢 Deployment

### Automatic Deployment

The site automatically deploys to Netlify on push to `main` branch.

### Manual Deployment

```bash
# Build for production
pnpm build

# Deploy to Netlify
netlify deploy --prod
```

## 📝 Documentation

- [Multi-language Strategy](docs/specs/i18n-strategy.md)
- [Design System](docs/specs/design-system.md)
- [Component Library](docs/specs/component-library.md)
- [Landing Page Spec](docs/specs/landing-page-spec.json)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to The Fountain Studio.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Authentication by [Supabase](https://supabase.com)
- Booking powered by [Cal.com](https://cal.com)
- Deployed on [Netlify](https://netlify.com)

---

**The Fountain Studio** - Building coherence in a chaotic world, one body, one field at a time.