# i18n Strategy - Dictionary-Based Approach

## Overview

The Fountain Studio uses a **simple dictionary-based approach** for multi-language support (German and English), avoiding complex middleware patterns that can conflict with authentication systems like Supabase.

## Core Philosophy

- **Simplicity First**: No middleware complexity, just language files
- **Type Safety**: Full TypeScript support with centralized type definitions
- **URL-Based Routing**: Clean `/de` and `/en` paths without complex rewrites
- **Server Components**: Translations loaded server-side for optimal performance
- **No External Dependencies**: No next-intl package required

## Implementation Architecture

### File Structure
```
/app
  /[lang]                    # Dynamic language segment
    /layout.tsx             # Language-aware layout
    /page.tsx              # Main page component
    /dictionaries.ts       # Type-safe dictionary loader
  /page.tsx                # Root redirect to default language
/dictionaries
  /de.json                 # German translations
  /en.json                 # English translations
/types
  /dictionary.ts           # Centralized type definitions
```

### Dictionary Loader Pattern

```typescript
// app/[lang]/dictionaries.ts
import type { Dictionary } from '@/types/dictionary'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default as Dictionary),
  de: () => import('@/dictionaries/de.json').then((module) => module.default as Dictionary),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (locale !== 'en' && locale !== 'de') {
    locale = 'de' // default to German for Swiss market
  }
  return dictionaries[locale as keyof typeof dictionaries]()
}
```

### Type Definitions

```typescript
// types/dictionary.ts
export interface Dictionary {
  metadata: {
    language: string
    direction: 'ltr' | 'rtl'
  }
  navigation: {
    services: string
    about: string
    learn: string
    testimonials: string
    faq: string
    contact: string
  }
  hero: {
    title: string
    subtitle: string
    cta: string
    scrollHint: string
  }
  services: {
    title: string
    subtitle: string
    individual: {
      title: string
      description: string
      duration: string
      price: string
      cta: string
    }
    group: {
      title: string
      description: string
      duration: string
      price: string
      cta: string
    }
    corporate: {
      title: string
      description: string
      duration: string
      price: string
      cta: string
    }
  }
  // ... continue for all sections
}
```

## Translation Files

### German Dictionary (Default)
```json
// dictionaries/de.json
{
  "metadata": {
    "language": "de",
    "direction": "ltr"
  },
  "navigation": {
    "services": "Leistungen",
    "about": "Über mich",
    "learn": "Methoden",
    "testimonials": "Erfahrungen",
    "faq": "FAQ",
    "contact": "Kontakt"
  },
  "hero": {
    "title": "Sound Healing trifft Schweizer Präzision",
    "subtitle": "Erleben Sie therapeutische Klangarbeit in Au ZH – Ihre Oase für ganzheitliches Wohlbefinden",
    "cta": "Termin buchen",
    "scrollHint": "Entdecken Sie mehr"
  }
  // ... continue for all sections
}
```

### English Dictionary
```json
// dictionaries/en.json
{
  "metadata": {
    "language": "en",
    "direction": "ltr"
  },
  "navigation": {
    "services": "Services",
    "about": "About",
    "learn": "Modalities",
    "testimonials": "Testimonials",
    "faq": "FAQ",
    "contact": "Contact"
  },
  "hero": {
    "title": "Sound Healing Meets Swiss Precision",
    "subtitle": "Experience therapeutic sound work in Au ZH – Your sanctuary for holistic well-being",
    "cta": "Book Session",
    "scrollHint": "Discover More"
  }
  // ... continue for all sections
}
```

## Component Implementation

### Server Component Pattern
```typescript
// app/[lang]/page.tsx
import { getDictionary } from './dictionaries'

export default async function Page({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <main>
      <Hero dict={dict.hero} />
      <Services dict={dict.services} />
      <About dict={dict.about} />
      {/* ... other sections */}
    </main>
  )
}
```

### Language Switcher
```typescript
// components/LanguageSwitcher.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const currentLang = pathname.split('/')[1] || 'de'

  return (
    <div className="flex gap-2">
      <Link
        href="/de"
        className={currentLang === 'de' ? 'font-bold' : ''}
      >
        DE
      </Link>
      <span>|</span>
      <Link
        href="/en"
        className={currentLang === 'en' ? 'font-bold' : ''}
      >
        EN
      </Link>
    </div>
  )
}
```

## Client Component Translation Pattern

For client components that need translations:

```typescript
// Server Component passes translations
const dict = await getDictionary(lang)
return <InteractiveForm translations={dict.contact} />

// Client Component receives translations
'use client'
interface Props {
  translations: {
    name: string
    email: string
    message: string
    submit: string
  }
}

export default function InteractiveForm({ translations }: Props) {
  return (
    <form>
      <input placeholder={translations.name} />
      <input placeholder={translations.email} />
      <textarea placeholder={translations.message} />
      <button>{translations.submit}</button>
    </form>
  )
}
```

## SEO Implementation

```typescript
// app/[lang]/layout.tsx
import type { Metadata } from 'next'
import { getDictionary } from './dictionaries'

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return {
    title: dict.seo.title,
    description: dict.seo.description,
    openGraph: {
      title: dict.seo.ogTitle,
      description: dict.seo.ogDescription,
      locale: lang === 'de' ? 'de_CH' : 'en_CH',
    },
    alternates: {
      canonical: `https://thefountainstudio.ch/${lang}`,
      languages: {
        'de': 'https://thefountainstudio.ch/de',
        'en': 'https://thefountainstudio.ch/en',
      }
    }
  }
}
```

## Adding New Content

### Step-by-Step Process

1. **Add to Both Dictionary Files**
   ```json
   // dictionaries/de.json
   "newSection": {
     "title": "Neuer Abschnitt",
     "content": "Inhalt hier"
   }

   // dictionaries/en.json
   "newSection": {
     "title": "New Section",
     "content": "Content here"
   }
   ```

2. **Update Type Definitions**
   ```typescript
   // types/dictionary.ts
   export interface Dictionary {
     // ... existing types
     newSection: {
       title: string
       content: string
     }
   }
   ```

3. **Use in Components**
   ```typescript
   const dict = await getDictionary(lang)
   return <NewSection dict={dict.newSection} />
   ```

## Testing Strategy

### Manual Testing Checklist
- [ ] Navigate to `/de` - verify German content displays
- [ ] Navigate to `/en` - verify English content displays
- [ ] Test language switcher functionality
- [ ] Verify all text is translated (no hardcoded strings)
- [ ] Check that auth pages work with both languages
- [ ] Test that Supabase middleware doesn't interfere

### Automated Testing
```typescript
// __tests__/i18n.test.ts
import { getDictionary } from '@/app/[lang]/dictionaries'

describe('Dictionary System', () => {
  test('loads German dictionary', async () => {
    const dict = await getDictionary('de')
    expect(dict.metadata.language).toBe('de')
    expect(dict.navigation.services).toBe('Leistungen')
  })

  test('loads English dictionary', async () => {
    const dict = await getDictionary('en')
    expect(dict.metadata.language).toBe('en')
    expect(dict.navigation.services).toBe('Services')
  })

  test('defaults to German for invalid language', async () => {
    const dict = await getDictionary('fr')
    expect(dict.metadata.language).toBe('de')
  })
})
```

## Best Practices

### DO's ✅
- Keep dictionary structure flat and organized
- Use semantic, descriptive keys
- Always update TypeScript types when adding translations
- Load translations in server components
- Pass only needed translations to client components
- Default to German for Swiss market

### DON'Ts ❌
- Don't use complex i18n middleware
- Don't load entire dictionaries on client
- Don't hardcode text in components
- Don't forget to update both language files
- Don't mix translation approaches

## Migration from next-intl

If you previously used next-intl, here's how to migrate:

1. **Remove Dependencies**
   ```bash
   pnpm remove next-intl @formatjs/intl-localematcher negotiator
   ```

2. **Remove Middleware Configuration**
   - Delete i18n middleware setup
   - Keep only Supabase auth middleware

3. **Update Components**
   - Replace `useTranslations` hook with dictionary props
   - Convert client components to server components where possible

4. **Simplify Routing**
   - Remove complex locale detection
   - Use simple `/[lang]` structure

## Advantages of This Approach

- ✅ **No Middleware Conflicts**: Works seamlessly with Supabase auth
- ✅ **Simplicity**: Just JSON files and a loader function
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Server-side rendering, no client hydration issues
- ✅ **Maintainability**: Clear, predictable structure
- ✅ **No Dependencies**: No external i18n packages needed

## Troubleshooting

### Common Issues and Solutions

**404 on language routes**
- Ensure `[lang]` folder exists in `/app`
- Check that middleware isn't blocking routes
- Verify root page redirects properly

**TypeScript errors**
- Update `types/dictionary.ts` when adding new keys
- Ensure JSON structure matches type definitions

**Translations not updating**
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check JSON syntax is valid

---
*i18n Strategy v2.0 - Dictionary-Based Approach*
*The Fountain Studio - Simplified Multi-language Support*
*Last Updated: 2025-09-20*