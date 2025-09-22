# Booking System Specification

## Purpose & Scope

Define the booking and scheduling system for The Fountain Studio, integrating Cal.com for calendar management while maintaining a premium Swiss wellness experience with no backend complexity.

**Scope**: Calendar integration, service selection, booking flow, confirmation system, and cancellation policies for a static site architecture.

## Key Decisions

### 1. Cal.com as Primary Booking Engine
- **Decision**: Embed Cal.com for all scheduling
- **Rationale**: No backend needed, proven reliability, Swiss-compliant
- **Impact**: Zero maintenance, automatic availability management

### 2. Static Site Integration
- **Decision**: Embed widget, not API integration
- **Rationale**: Simplicity, no server-side code required
- **Impact**: Faster implementation, lower complexity

### 3. Service-Specific Booking Links
- **Decision**: Separate Cal.com event types per service
- **Rationale**: Clear pricing, duration, and descriptions
- **Impact**: Better conversion through specific CTAs

### 4. WhatsApp as Fallback
- **Decision**: WhatsApp Business for manual bookings
- **Rationale**: Swiss preference for personal contact
- **Impact**: Higher trust, accessibility for non-tech users

## Implementation Guidelines

### Cal.com Configuration

```typescript
// Actual Implementation: components/booking/CalBookingModal.tsx
export const bookingConfig = {
  // Cal.com username and namespace
  username: 'simon-yang-z2fy7e',
  namespace: 'secret',
  calLink: 'simon-yang-z2fy7e/secret',

  // Service-specific event types
  eventTypes: {
    biofield: {
      slug: 'biofield-tuning-60min',
      duration: 60,
      price: 120,
      color: '#B8956A' // Champagne gold
    },
    gyrotonic: {
      slug: 'gyrotonic-session-60min',
      duration: 60,
      price: 120,
      color: '#B8956A'
    },
    breathwork: {
      slug: 'breathwork-45min',
      duration: 45,
      price: 120,
      color: '#B8956A'
    },
    integration: {
      slug: 'integration-experience-90min',
      duration: 90,
      price: 180,
      color: '#B8956A'
    },
    discovery: {
      slug: 'discovery-call-15min',
      duration: 15,
      price: 0,
      color: '#2C2B29' // Charcoal for free
    }
  },

  // Availability settings
  availability: {
    timezone: 'Europe/Zurich',
    workingHours: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '16:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: null // Closed
    },
    bufferTime: 15, // Minutes between appointments
    minimumNotice: 24, // Hours advance booking
    maximumAdvance: 60 // Days future booking
  },

  // Swiss-specific settings
  locale: 'de-CH',
  currency: 'CHF',
  dateFormat: 'DD.MM.YYYY',
  timeFormat: '24h'
}
```

### Actual Implementation (September 2025)

```typescript
// components/booking/CalBookingModal.tsx
'use client';

import { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function CalBookingModal({ open, onOpenChange }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'secret' });
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] p-0">
        <button
          data-cal-namespace="secret"
          data-cal-link="simon-yang-z2fy7e/secret"
          data-cal-config='{"layout":"month_view"}'
          className="hidden"
        >
          Trigger
        </button>
            highlightColor: '#B8956A',
            medianColor: '#56564C' // Charcoal medium
          }
        },
        hideEventTypeDetails: false,
        layout: 'month_view'
      })
    })()
  }, [])

  return (
    <Cal
      calLink={`${bookingConfig.username}/${event.slug}`}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      config={{
        name: 'The Fountain Studio',
        email: 'info@fountainstudio.ch',
        notes: 'Bitte teilen Sie uns besondere Bedürfnisse mit.',
        guests: [],
        theme: 'light'
      }}
    />
  )
}
```

### Inline Booking Widget

```typescript
// components/booking/BookingWidget.tsx
import { CalEmbed } from './CalEmbed'

interface BookingWidgetProps {
  service: 'biofield' | 'gyrotonic' | 'breathwork' | 'integration'
  className?: string
}

export function BookingWidget({ service, className }: BookingWidgetProps) {
  return (
    <div className={`booking-widget ${className}`}>
      {/* Service Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-heading text-charcoal-700">
          {bookingConfig.eventTypes[service].duration} Minuten Session
        </h3>
        <p className="text-lg text-charcoal-500">
          CHF {bookingConfig.eventTypes[service].price}
        </p>
      </div>

      {/* Cal.com Embed */}
      <div className="rounded-base border border-stone-200 bg-silk-200 p-1">
        <CalEmbed eventType={service} />
      </div>

      {/* Alternative Booking */}
      <div className="mt-4 text-center">
        <p className="text-sm text-stone-500 mb-2">
          Bevorzugen Sie persönlichen Kontakt?
        </p>
        <a
          href="https://wa.me/41XXXXXXXXX"
          className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>Via WhatsApp buchen</span>
        </a>
      </div>
    </div>
  )
}
```

### Booking Flow UI

```typescript
// components/booking/BookingSection.tsx
'use client'

import { useState } from 'react'
import { BookingWidget } from './BookingWidget'
import { ServiceSelector } from './ServiceSelector'

export function BookingSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  return (
    <section id="booking" className="py-24 bg-silk-300">
      <div className="container max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading text-charcoal-700 mb-4">
            Termin buchen
          </h2>
          <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
            Wählen Sie Ihre gewünschte Behandlung und buchen Sie
            direkt online oder kontaktieren Sie uns persönlich.
          </p>
        </div>

        {/* Service Selection */}
        {!selectedService ? (
          <ServiceSelector onSelect={setSelectedService} />
        ) : (
          <div>
            <button
              onClick={() => setSelectedService(null)}
              className="mb-6 text-sm text-stone-500 hover:text-charcoal-700"
            >
              ← Andere Behandlung wählen
            </button>
            <BookingWidget service={selectedService} />
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-3 gap-8 text-center">
          <div>
            <CheckIcon className="w-8 h-8 text-gold-500 mx-auto mb-2" />
            <p className="text-sm text-stone-600">
              Sichere Buchung
            </p>
          </div>
          <div>
            <ClockIcon className="w-8 h-8 text-gold-500 mx-auto mb-2" />
            <p className="text-sm text-stone-600">
              24h Stornierung
            </p>
          </div>
          <div>
            <ShieldIcon className="w-8 h-8 text-gold-500 mx-auto mb-2" />
            <p className="text-sm text-stone-600">
              Datenschutz garantiert
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

### Service Package Handling

```typescript
// Since Cal.com doesn't natively support packages,
// we handle them with discount codes

export const packageConfig = {
  packages: {
    'taste-it': {
      sessions: 3,
      price: 345,
      savings: 15,
      validityDays: 90,
      code: 'TASTE3' // Applied in Cal.com
    },
    'tune-it': {
      sessions: 6,
      price: 660,
      savings: 60,
      validityDays: 180,
      code: 'TUNE6'
    },
    'level-it': {
      sessions: 10,
      price: 1050,
      savings: 150,
      validityDays: 365,
      code: 'LEVEL10'
    }
  },

  // Package purchase flow (via Stripe Payment Link)
  purchaseLinks: {
    'taste-it': 'https://buy.stripe.com/xxx',
    'tune-it': 'https://buy.stripe.com/yyy',
    'level-it': 'https://buy.stripe.com/zzz'
  }
}
```

### Confirmation & Reminders

```yaml
# Handled automatically by Cal.com
confirmations:
  immediate:
    - Email confirmation to client
    - Calendar invite (.ics)
    - Booking details

  reminders:
    - 24 hours before: Email reminder
    - 2 hours before: SMS (if provided)

  rescheduling:
    - Link in confirmation email
    - 24-hour minimum notice

  cancellation:
    - Link in confirmation email
    - Automatic calendar update
    - Slot released immediately
```

### WhatsApp Integration

```typescript
// components/booking/WhatsAppButton.tsx
export function WhatsAppButton() {
  const message = encodeURIComponent(
    'Guten Tag, ich möchte gerne einen Termin vereinbaren.'
  )

  return (
    <a
      href={`https://wa.me/41791234567?text=${message}`}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Kontakt via WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />
    </a>
  )
}
```

### Multi-language Booking

```typescript
// Booking page with language support
export function BookingPage({ locale }: { locale: string }) {
  // Cal.com supports these locales
  const calLocale = {
    'de': 'de',
    'fr': 'fr',
    'it': 'it',
    'en': 'en'
  }[locale] || 'de'

  return (
    <div>
      <Cal
        calLink="fountainstudio/consultation"
        config={{
          locale: calLocale,
          // Translations handled by Cal.com
        }}
      />
    </div>
  )
}
```

### Analytics & Tracking

```typescript
// Track booking events (privacy-compliant)
export function trackBookingEvent(event: string, data?: any) {
  // Plausible custom events (GDPR-compliant)
  if (window.plausible) {
    window.plausible(event, { props: data })
  }

  // Cal.com has built-in analytics
  // No additional tracking needed
}

// Events to track
const bookingEvents = {
  'Booking Started': { service: 'biofield' },
  'Booking Completed': { service: 'biofield', value: 120 },
  'Booking Cancelled': { reason: 'user_cancelled' }
}
```

## Fallback Solutions

### Manual Booking Form (if Cal.com is down)

```typescript
// Use Netlify Forms as fallback
export function ManualBookingForm() {
  return (
    <form
      name="booking"
      method="POST"
      data-netlify="true"
      className="max-w-md mx-auto"
    >
      <input type="hidden" name="form-name" value="booking" />

      {/* Form fields */}
      <input name="name" type="text" required />
      <input name="email" type="email" required />
      <input name="phone" type="tel" />
      <select name="service" required>
        <option value="biofield">Biofield Tuning</option>
        {/* ... */}
      </select>
      <textarea name="preferred-dates" />

      <button type="submit">Anfrage senden</button>
    </form>
  )
}
```

## Success Metrics

### Booking Performance
- [ ] Booking completion rate > 60%
- [ ] Average time to book < 2 minutes
- [ ] Mobile booking rate > 40%
- [ ] Zero double bookings

### User Experience
- [ ] Cal.com loads < 1 second
- [ ] Smooth mobile experience
- [ ] Clear pricing display
- [ ] Multiple booking paths work

### Business Metrics
- [ ] Online booking adoption > 70%
- [ ] Package sales > 30% of bookings
- [ ] No-show rate < 5%
- [ ] Rescheduling rate < 20%

### Technical Reliability
- [ ] 99.9% uptime (via Cal.com SLA)
- [ ] Fallback booking method tested
- [ ] WhatsApp integration working
- [ ] Multi-language support verified

## Dependencies

### External Services
```yaml
services:
  primary:
    - Cal.com account (Pro plan)
    - Google Calendar sync
    - Email service (via Cal.com)

  fallback:
    - WhatsApp Business
    - Netlify Forms
    - Email notifications

  future:
    - Stripe for packages
    - SMS reminders (Twilio)
```

### Configuration Required
- Cal.com account setup
- Event types created
- Availability configured
- Embed styling customized
- WhatsApp Business number

---
*Booking System Specification v1.0*
*The Fountain Studio - Swiss Wellness Booking*
*Last Updated: 2025-09-19*