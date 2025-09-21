# Deployment Guide Specification

## Purpose & Scope

Define the deployment strategy, infrastructure configuration, and CI/CD pipeline for The Fountain Studio website using Netlify as the primary platform.

**Scope**: Build configuration, deployment pipeline, environment management, monitoring, and maintenance procedures for a static Next.js site.

## Key Decisions

### 1. Netlify as Primary Platform
- **Decision**: Netlify for hosting and deployment
- **Rationale**: Built-in forms, excellent Next.js support, Swiss CDN nodes
- **Impact**: Simple deployment, automatic HTTPS, branch previews

### 2. Git-based Deployment
- **Decision**: Auto-deploy from main branch
- **Rationale**: GitOps workflow, version control integration
- **Impact**: Every commit triggers deployment, rollback capability

### 3. Environment Strategy
- **Decision**: Production + branch previews only
- **Rationale**: Simple static site, no staging complexity needed
- **Impact**: Faster iteration, immediate preview URLs

### 4. Edge Functions for Dynamic Features
- **Decision**: Netlify Functions for form handling only
- **Rationale**: Minimal server-side needs
- **Impact**: No backend infrastructure to manage

## Implementation Guidelines

### Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  # Next.js optimization
  NEXT_TELEMETRY_DISABLED = "1"
  NODE_VERSION = "20.11.0"

# Next.js plugin for optimal configuration
[[plugins]]
  package = "@netlify/plugin-nextjs"

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    # Security
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

    # Performance
    Cache-Control = "public, max-age=31536000, immutable"

    # Permissions Policy (Swiss privacy focus)
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), interest-cohort=()"

# Font files caching
[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Image caching
[[headers]]
  for = "/images/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

# Redirects for i18n
[[redirects]]
  from = "/"
  to = "/de"
  status = 302
  conditions = {Language = ["de", "de-CH", "de-DE", "de-AT"]}
  force = false

[[redirects]]
  from = "/"
  to = "/fr"
  status = 302
  conditions = {Language = ["fr", "fr-CH", "fr-FR"]}
  force = false

[[redirects]]
  from = "/"
  to = "/it"
  status = 302
  conditions = {Language = ["it", "it-CH", "it-IT"]}
  force = false

[[redirects]]
  from = "/"
  to = "/en"
  status = 302
  force = false

# 404 handling per locale
[[redirects]]
  from = "/de/*"
  to = "/de/404"
  status = 404

[[redirects]]
  from = "/fr/*"
  to = "/fr/404"
  status = 404

[[redirects]]
  from = "/it/*"
  to = "/it/404"
  status = 404

[[redirects]]
  from = "/en/*"
  to = "/en/404"
  status = 404

# Forms endpoint
[[redirects]]
  from = "/api/contact"
  to = "/.netlify/functions/contact"
  status = 200

# Sitemap
[[redirects]]
  from = "/sitemap.xml"
  to = "/api/sitemap"
  status = 200
```

### Build Configuration

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",

    // Netlify-specific
    "prebuild": "npm run lint && npm run type-check",
    "postbuild": "next-sitemap",

    // Local Netlify testing
    "netlify:dev": "netlify dev",
    "netlify:build": "netlify build",
    "netlify:deploy": "netlify deploy --prod"
  }
}
```

### Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CAL_LINK=fountainstudio
NEXT_PUBLIC_WHATSAPP_NUMBER=41791234567
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=fountainstudio.ch

# Netlify Dashboard Environment Variables
# Production secrets (set in Netlify UI)
CONTACT_EMAIL_TO=info@fountainstudio.ch
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxx
WEBHOOK_SECRET=xxxxx
```

### Netlify Forms Configuration

```html
<!-- Contact Form with Netlify Forms -->
<form
  name="contact"
  method="POST"
  data-netlify="true"
  data-netlify-honeypot="bot-field"
  action="/success"
>
  <!-- Honeypot for spam protection -->
  <input type="hidden" name="form-name" value="contact" />
  <div hidden>
    <label>
      Don't fill this out:
      <input name="bot-field" />
    </label>
  </div>

  <!-- Form fields -->
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone" />
  <select name="service">
    <option value="biofield">Biofield Tuning</option>
    <option value="gyrotonic">Gyrotonic</option>
    <option value="breathwork">Breathwork</option>
  </select>
  <textarea name="message"></textarea>

  <button type="submit">Senden</button>
</form>
```

### Netlify Functions

```typescript
// netlify/functions/contact.ts
import { Handler } from '@netlify/functions'
import nodemailer from 'nodemailer'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  const data = JSON.parse(event.body || '{}')

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  // Send email
  try {
    await transporter.sendMail({
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `Neue Anfrage: ${data.service}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone || 'Nicht angegeben'}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Nachricht:</strong><br>${data.message}</p>
      `
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Email sending failed' })
    }
  }
}
```

### Branch Deploy Configuration

```yaml
# Branch deploys for testing
branches:
  production:
    - main
    - url: fountainstudio.ch
    - auto-deploy: true

  preview:
    - develop
    - feature/*
    - fix/*
    - url: [branch]--fountainstudio.netlify.app
    - auto-deploy: true

  pull-requests:
    - deploy-preview: true
    - url: deploy-preview-[pr-number]--fountainstudio.netlify.app
```

### Performance Optimization

```javascript
// next.config.js
module.exports = {
  // Image optimization
  images: {
    domains: ['fountainstudio.ch'],
    formats: ['image/avif', 'image/webp'],
  },

  // Netlify-specific optimizations
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },

  // i18n configuration
  i18n: {
    locales: ['de', 'fr', 'it', 'en'],
    defaultLocale: 'de',
  },

  // Compression
  compress: true,

  // Security headers (backup, primarily in netlify.toml)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' *.netlify.app plausible.io; style-src 'self' 'unsafe-inline';"
          }
        ]
      }
    ]
  }
}
```

### Monitoring & Alerts

```yaml
# Netlify monitoring setup
monitoring:
  analytics:
    - Netlify Analytics (built-in)
    - Plausible (privacy-focused)

  alerts:
    build-failures:
      - Email to: dev@fountainstudio.ch
      - Webhook to: Slack

    form-submissions:
      - Email notification
      - Webhook to CRM

    traffic-spikes:
      - Auto-scale enabled
      - Alert at: 10x baseline

  logs:
    - Build logs: 30 days retention
    - Function logs: 7 days retention
    - Access logs: Available in Analytics
```

### Deployment Workflow

```bash
# Development workflow
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Creates deploy preview automatically

# Production deployment
git checkout main
git merge feature/new-feature
git push origin main
# Triggers automatic production deploy

# Manual deployment (emergency)
netlify deploy --prod --dir=.next

# Rollback (if needed)
netlify rollback
# Or use Netlify UI to select previous deploy
```

### Domain Configuration

```yaml
# DNS settings in Netlify
domains:
  primary: fountainstudio.ch
  aliases:
    - www.fountainstudio.ch
    - fountainstudio.netlify.app

dns:
  - Type: A
    Name: @
    Value: 75.2.60.5 (Netlify load balancer)

  - Type: CNAME
    Name: www
    Value: fountainstudio.netlify.app

  - Type: MX
    Name: @
    Value: mail.fountainstudio.ch (Email provider)

ssl:
  - Provider: Let's Encrypt (automatic)
  - Auto-renew: Enabled
  - Force HTTPS: Yes
```

### Backup & Recovery

```yaml
backup:
  code:
    - Git repository (GitHub)
    - Local clones on dev machines

  content:
    - Form submissions: Netlify dashboard
    - Export available via API

  configuration:
    - netlify.toml in repo
    - Environment vars: Document separately

recovery:
  rollback:
    - Via Netlify UI: Select previous deploy
    - Via CLI: netlify rollback
    - Time to rollback: < 30 seconds

  disaster:
    - Clone repo
    - Deploy to new Netlify site
    - Update DNS
    - Recovery time: < 15 minutes
```

## Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Type checking clean
- [ ] Linting passed
- [ ] Images optimized
- [ ] Environment variables set
- [ ] Forms tested locally

### Deployment
- [ ] Push to main branch
- [ ] Monitor build logs
- [ ] Verify deploy preview
- [ ] Check all locales

### Post-deployment
- [ ] Test all forms
- [ ] Verify booking widget
- [ ] Check all CTAs
- [ ] Test on mobile
- [ ] Monitor analytics
- [ ] Check Core Web Vitals

## Success Metrics

### Performance
- [ ] Build time < 2 minutes
- [ ] Deploy time < 30 seconds
- [ ] TTFB < 200ms globally
- [ ] Lighthouse score > 95

### Reliability
- [ ] Uptime > 99.95%
- [ ] Zero failed deploys
- [ ] Successful rollback tested
- [ ] CDN cache hit > 90%

### Developer Experience
- [ ] PR previews working
- [ ] Local dev matches production
- [ ] Clear error messages
- [ ] Fast feedback loop

## Dependencies

### Required Services
- GitHub repository
- Netlify account (Pro plan)
- Domain registrar
- Email service (SendGrid/Resend)
- Analytics (Plausible)

### Local Development
```json
{
  "netlify-cli": "^17.0.0",
  "@netlify/functions": "^2.0.0",
  "@netlify/plugin-nextjs": "^5.0.0"
}
```

---
*Deployment Guide Specification v1.0*
*The Fountain Studio - Netlify Infrastructure*
*Last Updated: 2025-09-19*