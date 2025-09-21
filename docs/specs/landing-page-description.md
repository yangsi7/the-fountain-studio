# The Fountain Studio - Landing Page Description

## Overview
A single-page narrative website for The Fountain Studio, a Swiss sound healing practice that positions itself as a Medical Spa rather than new-age mysticism. The site features fullscreen imagery, smooth scrolling, and a refined aesthetic using champagne gold accents.

## Visual Design System

### Color Palette
- **Primary**: Champagne Gold (#B8956A) - Used sparingly (10% max) for accents and hover states
- **Text**: Charcoal (#2C2B29) - Main text color for readability
- **Background**: Silk (#F8F6F3) - Warm off-white background
- **White**: Pure White (#FFFFFF) - For overlays and cards
- **Gray**: Medium Gray (#6B7280) - For secondary text

### Typography
- **Headings**: Libre Baskerville (serif) - Elegant and readable
- **Body**: Source Sans 3 (sans-serif) - Clean and modern
- **Sizes**:
  - H1: 48px (mobile: 32px)
  - H2: 36px (mobile: 28px)
  - H3: 24px (mobile: 20px)
  - Body: 16px
  - Small: 14px

## Section-by-Section Breakdown

### 1. Navigation (Sticky Header)
**Position**: Fixed top, z-index: 1000
**Height**: 80px (scrolled: 60px)
**Background**: Transparent → White with shadow on scroll

**Components**:
- Logo (left): "The Fountain Studio" text logo
- Navigation Menu (center):
  - Home (Startseite)
  - Services (Leistungen)
  - About (Über uns)
  - Learn (Lernen)
  - Testimonials (Referenzen)
  - Contact (Kontakt)
- Language Switcher (right): DE | EN toggle
- Book Button (right): "Termin buchen" with gold background

**Interactions**:
- Smooth transition from transparent to solid white on scroll
- Active section highlighting with gold underline
- Mobile: Hamburger menu with slide-in drawer

### 2. Hero Section
**Visual Asset**: IMG_4520.jpeg (fullscreen background)
**Height**: 100vh
**Overlay**: Linear gradient (rgba(44,43,41,0.4) to transparent)

**Content** (centered):
```
Tagline: "Frequency is Everything"

Description (EN): "A boutique healing studio helping you clear the static
and reconnect with your natural flow through gentle, embodied practices:
Biofield Tuning, Gyrotonic and Breathwork."

Description (DE): "Ein Boutique-Heilstudio, das Ihnen hilft, die Störungen
zu klären und sich durch sanfte, verkörperte Praktiken wieder mit Ihrem
natürlichen Fluss zu verbinden: Biofield Tuning, Gyrotonic und Atemarbeit."

CTA Buttons: "Book Your Session" / "Learn More"
             "Sitzung buchen" / "Mehr erfahren"
(Gold background, white text, hover: darker gold)
```

**Scroll Indicator**: Animated chevron bouncing at bottom

### 3. Services Section
**Background**: Silk (#F8F6F3)
**Padding**: 120px top/bottom

**Section Header**:
```
Title: "Unsere Leistungen" / "Our Services"
Subtitle: "Massgeschneiderte Klangtherapie-Erfahrungen für Ihre Bedürfnisse"
         "Tailored sound therapy experiences for your needs"
```

**Three Service Cards** (Grid layout):

**Card 1 - Individual Sessions**
- Image: IMG_4461.jpeg (overlay)
- Title: "Einzelsitzungen" / "Individual Sessions"
- Description: "Personalisierte Klangreise für tiefe Entspannung und Heilung"
- Duration: "60-90 Minuten"
- Price: "CHF 180"
- CTA: "Mehr erfahren" (ghost button with gold border)

**Card 2 - Group Sound Baths**
- Image: IMG_4589.jpeg (overlay)
- Title: "Gruppen-Klangbäder" / "Group Sound Baths"
- Description: "Gemeinsame Heilungserfahrung in kleinen Gruppen"
- Duration: "75 Minuten"
- Price: "CHF 45 pro Person"
- CTA: "Termine ansehen" (ghost button with gold border)

**Card 3 - Corporate Wellness**
- Image: IMG_4696.jpeg (overlay)
- Title: "Firmen-Wellness" / "Corporate Wellness"
- Description: "Stressreduktion und Teambuilding für Unternehmen"
- Duration: "Nach Vereinbarung"
- Price: "Auf Anfrage"
- CTA: "Kontakt aufnehmen" (ghost button with gold border)

### 4. About Section
**Background**: White
**Layout**: 50/50 split (image left, text right)

**Image Side**:
- IMG_4574.jpeg (Kristen's portrait)
- Subtle parallax effect on scroll

**Text Content**:
```
Title: "Über Kristen" / "About Kristen"

Bio (DE):
"Mit über 10 Jahren Erfahrung in der Klangtherapie verbinde ich
traditionelle Heilmethoden mit modernen wissenschaftlichen Erkenntnissen.
Als zertifizierte Klangtherapeutin und ehemalige Krankenschwester
bringe ich medizinisches Fachwissen in jeden Aspekt meiner Praxis ein."

Bio (EN):
"With over 10 years of experience in sound therapy, I combine
traditional healing methods with modern scientific insights.
As a certified sound therapist and former nurse,
I bring medical expertise to every aspect of my practice."

Credentials:
• Zertifizierte Klangtherapeutin (SKT)
• Diplom-Krankenschwester
• Ausbildung in Tibetischer Klangmassage
• Fortbildung in Neurowissenschaften und Klang
```

**Trust Badges**: Professional certification logos

### 5. Learn Section (Modalities)
**Background**: Silk (#F8F6F3)
**Component**: Accordion with expandable items

**Section Header**:
```
Title: "Die Kraft des Klangs" / "The Power of Sound"
Subtitle: "Entdecken Sie unsere therapeutischen Modalitäten"
         "Discover our therapeutic modalities"
```

**Accordion Items**:

**1. Tibetische Klangschalen** (IMG_4468.jpeg thumbnail)
```
Beschreibung: "Jahrhundertealte Tradition trifft moderne Therapie..."
Benefits: Stressreduktion, Tiefenentspannung, Energieausgleich
```

**2. Kristallschalen** (IMG_4576.jpeg thumbnail)
```
Beschreibung: "Reine Quarzkristall-Schwingungen für zelluläre Heilung..."
Benefits: Chakra-Ausgleich, Mentale Klarheit, Emotionale Freisetzung
```

**3. Gongs & Klangspiele** (IMG_4580.jpeg thumbnail)
```
Beschreibung: "Kraftvolle Vibrationen für transformative Erfahrungen..."
Benefits: Lösung von Blockaden, Bewusstseinserweiterung, Regeneration
```

**4. Stimme & Mantras** (IMG_4598.jpeg thumbnail)
```
Beschreibung: "Die heilende Kraft der menschlichen Stimme..."
Benefits: Selbstausdruck, Emotionale Heilung, Spirituelle Verbindung
```

### 6. Testimonials Section
**Background**: White with subtle pattern (IMG_4662.jpeg at 5% opacity)
**Component**: Carousel with auto-play

**Section Header**:
```
Title: "Kundenstimmen" / "Client Testimonials"
Subtitle: "Was unsere Klienten sagen"
         "What our clients say"
```

**Testimonial Cards** (5 total):
```
1. "Die Klangtherapie bei Kristen hat mein Leben verändert..."
   - Maria S., Zürich ★★★★★

2. "Nach Jahren von Schlafproblemen finde ich endlich Ruhe..."
   - Thomas K., Basel ★★★★★

3. "Die professionelle und einfühlsame Art macht den Unterschied..."
   - Sandra M., Bern ★★★★★

4. "Unser Team-Workshop war eine unglaubliche Erfahrung..."
   - Marc L., CEO ★★★★★

5. "Wissenschaftlich fundiert und trotzdem spirituell..."
   - Dr. Anna B., Ärztin ★★★★★
```

### 7. FAQ Section
**Background**: Silk (#F8F6F3)
**Component**: Accordion

**Section Header**:
```
Title: "Häufige Fragen" / "Frequently Asked Questions"
```

**Questions**:
1. "Was ist Klangtherapie?" / "What is sound therapy?"
2. "Was erwartet mich in einer Sitzung?" / "What can I expect in a session?"
3. "Ist Klangtherapie sicher?" / "Is sound therapy safe?"
4. "Wie viele Sitzungen brauche ich?" / "How many sessions do I need?"
5. "Was soll ich mitbringen?" / "What should I bring?"
6. "Übernehmen Krankenkassen die Kosten?" / "Is it covered by insurance?"

### 8. Contact & Booking Section
**Background**: White
**Layout**: Two columns (booking left, contact right)

**Left Column - Booking**:
```
Title: "Bereit für Ihre Klangreise?" / "Ready for Your Sound Journey?"
Subtitle: "Buchen Sie Ihr Entdeckungsgespräch"
         "Book your discovery call"
```
- Cal.com embedded widget (styled to match brand)

**Right Column - Contact**:
```
Title: "Kontakt" / "Contact"

The Fountain Studio
Klangtherapie-Praxis
Bahnhofstrasse 123
8001 Zürich

Tel: +41 44 123 45 67
Email: info@thefountainstudio.ch

Öffnungszeiten / Opening Hours:
Mo-Fr: 9:00 - 19:00
Sa: 10:00 - 16:00
So: Geschlossen / Closed
```

**WhatsApp Floating Button**:
- Fixed position bottom-right
- Green with white icon
- Pre-filled message: "Hallo, ich interessiere mich für eine Klangtherapie-Sitzung"

### 9. Footer
**Background**: Charcoal (#2C2B29)
**Text Color**: White

**Content**:
```
Left:
© 2025 The Fountain Studio. Alle Rechte vorbehalten.

Center:
Impressum | Datenschutz | AGB

Right:
Instagram | Facebook | LinkedIn
```

## Interactive Elements

### Animations (AOS Library)
- **Fade Up**: All section headings (delay: 100ms)
- **Fade In**: Service cards (stagger: 200ms each)
- **Zoom In**: About image (delay: 300ms)
- **Slide Right**: Testimonial cards
- **Fade**: FAQ items

### Micro-interactions
- **Buttons**: Scale 1.05 on hover with transition
- **Cards**: Shadow elevation on hover
- **Links**: Underline animation on hover
- **Form fields**: Gold border on focus
- **Navigation**: Smooth color transition on scroll

### Loading States
- Skeleton loaders for images
- Shimmer effect for text content
- Progressive image loading (blur-up technique)

## Mobile Adaptations

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-Specific Changes
- Hamburger menu for navigation
- Stack service cards vertically
- Reduce font sizes by 20%
- Full-width buttons
- Simplified animations
- Touch-friendly tap targets (48px minimum)

## Technical Implementation Notes

### shadcn/ui Components Used
- NavigationMenu
- Button (variants: default, outline, ghost)
- Card
- Accordion
- Carousel
- Form
- Input
- Textarea
- Badge
- Avatar
- Separator
- Sheet (for mobile menu)

### Custom Components Needed
- LanguageSwitcher
- ScrollIndicator
- ParallaxImage
- WhatsAppButton
- CalendarEmbed

### Third-party Integrations
- Cal.com (booking widget)
- WhatsApp Business API
- Google Analytics 4
- AOS (Animate on Scroll)
- next-intl (translations)

## SEO & Meta Information

### Meta Tags
```html
<title>The Fountain Studio - Klangtherapie in Zürich | Sound Healing</title>
<meta name="description" content="Erleben Sie transformative Klangtherapie in unserer medizinisch-orientierten Praxis in Zürich. Einzelsitzungen, Gruppen-Klangbäder und Firmen-Wellness.">
<meta name="keywords" content="Klangtherapie, Sound Healing, Zürich, Wellness, Meditation, Entspannung">
```

### Open Graph
```html
<meta property="og:title" content="The Fountain Studio - Klangtherapie">
<meta property="og:description" content="Transformative Klangtherapie in Zürich">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://thefountainstudio.ch">
```

### Structured Data
- LocalBusiness schema
- Service schema
- FAQPage schema
- Person schema (for Kristen)

---
*This document serves as the complete blueprint for The Fountain Studio landing page implementation*