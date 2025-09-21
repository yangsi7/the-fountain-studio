# Specs Folder Navigation Guide

> Quick reference for all specification documents in /docs/specs/
> Last Updated: 2025-09-20

## 📂 Specification Files Overview

### Core Specifications
- **`landing-page-spec.json`** - Main UI/UX specification with 9 sections
- **`landing-page-description.md`** - Detailed textual blueprint for implementation
- **`design-system.md`** - Token-based design system with Swiss Medical Spa principles
- **`component-library.md`** - shadcn/ui component specifications and usage patterns

### Strategy Documents
- **`i18n-strategy.md`** - Dictionary-based multi-language approach (DE/EN)
- **`visual-asset-mapping.md`** - Maps images to specific sections and use cases
- **`competitor-website-analysis.md`** - Analysis of 6 wellness websites and patterns

### Content Specifications
- **`../starter-material/draft-content/website-copy.md`** - Actual copy from Kristen
- **`../starter-material/visual-assets.json`** - Inventory of all images (17 files, 37MB)

## 🎯 Quick Access by Need

### "I need to implement a section"
→ Start with `landing-page-spec.json` for structure
→ Check `landing-page-description.md` for details
→ Reference `design-system.md` for tokens
→ Use `component-library.md` for components

### "I need design tokens"
→ Go to `design-system.md`
→ Section: Token Architecture
→ Use semantic tokens, not primitives

### "I need component specs"
→ Check `component-library.md`
→ Use shadcn MCP tools for installation
→ Follow atomic design principles

### "I need the actual copy"
→ Read `../starter-material/draft-content/website-copy.md`
→ All copy is Kristen-approved
→ Both DE and EN versions included

### "I need images for a section"
→ Check `visual-asset-mapping.md`
→ Reference `../starter-material/visual-assets.json`
→ Images in `public/images/`

### "I need translation approach"
→ Read `i18n-strategy.md`
→ Dictionary-based (no middleware)
→ Files in `/dictionaries/`

### "I need competitor insights"
→ Review `competitor-website-analysis.md`
→ 6 wellness sites analyzed
→ Best practices extracted

## 🔄 Update Protocol

When updating specifications:
1. **Check alignment** across all spec files
2. **Update version** in document headers
3. **Test changes** with browser MCP
4. **Document in** event-stream.md
5. **Use only** shadcn MCP tools for components

## 📋 Key Design Decisions

### Color Usage
- **Champagne Gold (#B8956A)**: 3% max, CTAs only
- **Charcoal (#2C2B29)**: Primary text
- **Silk (#F8F6F3)**: Background
- **White (#FFFFFF)**: Cards and overlays

### Typography
- **Headings**: Libre Baskerville (serif)
- **Body**: Source Sans 3 (sans-serif)
- **Base size**: 18px desktop, 16px mobile
- **Line height**: 1.7 for optimal readability

### Component Approach
- **Atomic design**: Atoms → Molecules → Organisms
- **shadcn/ui**: All components from registry
- **Custom**: Minimal, only for unique needs
- **Styling**: Tailwind utility-first

### Visual Hierarchy
- **Hero**: 100vh, fullscreen immersive
- **Sections**: 140px padding (desktop)
- **White space**: 50% minimum per viewport
- **Cards**: Subtle shadows, hover lifts

## 🚀 Implementation Checklist

### Pre-Development
- [ ] Read `competitor-website-analysis.md` for patterns
- [ ] Review `design-system.md` for tokens
- [ ] Check `component-library.md` for components
- [ ] Verify copy in `website-copy.md`

### During Development
- [ ] Follow `landing-page-spec.json` structure
- [ ] Use tokens from `design-system.md`
- [ ] Install components via shadcn MCP
- [ ] Test with browser MCP tools

### Post-Development
- [ ] Verify against `landing-page-description.md`
- [ ] Check visual assets match mapping
- [ ] Test both DE and EN versions
- [ ] Run accessibility audit

## 🔗 Related Documentation

### Parent Docs
- `/CLAUDE.md` - Main project instructions
- `/context.md` - Context orchestrator
- `/architecture-core.md` - System architecture

### Tracking
- `/product-tracker.md` - Product development tasks
- `/process-tracker.md` - Technical tasks
- `/event-stream.md` - Activity log

### Implementation
- `/app/[locale]/` - Actual page implementation
- `/components/` - React components
- `/dictionaries/` - Translation files

## ⚡ Quick Commands

```bash
# View all specs
ls docs/specs/

# Search for a token
grep -r "champagne" docs/specs/

# Find component usage
grep -r "Button" docs/specs/

# Check image references
grep -r "IMG_" docs/specs/
```

## 📝 Notes

- All specifications aligned as of 2025-09-20
- Based on competitor analysis of 6 wellness sites
- Following Swiss Medical Spa positioning
- Single-page narrative approach
- 7-day MVP timeline (launch Jan 26, 2025)

---
*Specs Navigation v1.0 | The Fountain Studio*