# Development Notes

## Known Issues

### Tailwind CSS v4 with Netlify Dev

**Issue**: CSS files return 404 when using `npx netlify dev` (localhost:8888)

**Cause**: Tailwind CSS v4 generates CSS dynamically, and Netlify dev's proxy server doesn't handle this correctly. The CSS files at `/_next/static/css/` are not properly served through the proxy.

**Workaround for Development**:
- Use `npm run dev` directly (localhost:3000) for local development with full CSS support
- Netlify dev (localhost:8888) can be used for testing Netlify-specific features, but CSS may not load

**Production**: 
- This issue does NOT affect production deployment on Netlify
- The production build (`npm run build`) generates static CSS files that work correctly

## Development Commands

```bash
# Recommended for development (CSS works)
npm run dev          # http://localhost:3000

# For testing Netlify features (CSS may not work)
npx netlify dev      # http://localhost:8888

# Production build
npm run build
npm run start        # http://localhost:3000

# Linting and type checking
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run type-check   # TypeScript type checking
```

## Environment Variables

Required environment variables are in `.env.local`:
- Supabase configuration
- Stripe API keys (test mode)
- See `.env.local` for complete list

## Deployment

The app is configured for Netlify deployment with:
- `@netlify/plugin-nextjs` for Next.js optimization
- Edge Functions support for PDF generation
- Security headers configured in `netlify.toml`