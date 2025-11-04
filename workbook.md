# Workbook - Current Context

**Session**: 2025-11-04
**Phase**: Phase 2.2 Complete → Ready for Phase 2.3
**Status**: 19/24 tasks complete (79% progress)

---

## Current Project State

### ✅ Completed Phases (18/24 tasks)

**Phase 1: Design System Foundation** (5 tasks + 1 test validation)
- Pure HSL color system (#D4A234 gold, silk backgrounds)
- Typography system (18px body text, proper font loading)
- Button variants (gold, gold-outline, gold-ghost, charcoal, whatsapp)
- Wave dividers (3 variants, 25 total across all pages)
- **Language switcher E2E tests**: 35/35 passing (100% success rate)

**Phase 2: Multi-Page Architecture** (6 tasks)
- Services page with full content
- Learn page with methodology content
- About page with studio story
- Navigation component with active states
- Homepage simplified with CTAs to detail pages
- i18n dictionaries updated (DE/EN)

**Phase 3: Design System Compliance** (4 tasks)
- CTA standardization (5 semantic button variants)
- 100% design token compliance (no hardcoded colors)
- Background colors migrated (cream/silk alternating)
- Wave dividers integrated (25 across all pages)

**Phase 4: Visual Polish** (1/3 tasks)
- ✅ Image aspect ratios fixed (responsive across all viewports)
- ⏳ Texture system 50% complete (tokens added, implementation pending)
- ⏳ Wave graphic polish pending

---

## Next Priority: Phase 2.3 - Scroll-to-Section Visual Feedback

**Goal**: Add visual feedback when user navigates to section via hash

**Implementation**:
1. **Visual Effect**: Subtle gold border (2px) + light background tint (5% opacity)
2. **Duration**: 2s animation (500ms fade-in → 1s hold → 500ms fade-out)
3. **Accessibility**: Focus management, screen reader announcements, reduced motion support
4. **Testing**: 15+ E2E tests across all browsers

**Acceptance Criteria**:
1. Target section shows subtle visual highlight after hash navigation
2. WCAG 2.1 AA+ compliance maintained
3. 15+ E2E tests passing (all scenarios covered)
4. No performance regressions (Lighthouse >90)
5. Design system compliant (gold usage ≤3%, HSL tokens only)

**Estimated Time**: 2-3 hours

---

## Key Architecture Patterns

### 1. Intelligence-First Workflow
```bash
# Query before reading
project-intel.mjs --search "keyword" --json
project-intel.mjs --symbols path/to/file.tsx --json
# THEN read specific files
Read path/to/file.tsx
```

### 2. Language Switcher Pattern (Proven Solution)
**Problem**: Viewport-specific elements (desktop vs mobile) require visibility checking
**Solution**: `getVisibleLanguageSwitcher` helper with fallback text selector
```typescript
const getVisibleLanguageSwitcher = async (page, lang) => {
  // Check mobile first
  if (await mobile.isVisible().catch(() => false)) return mobile;
  // Check desktop
  if (await desktop.isVisible().catch(() => false)) return desktop;
  // Fallback: text-based selector
  return page.locator(`nav a:has-text("${lang.toUpperCase()}")`).first();
};
```

### 3. Design Token System
**Three-tier architecture**: Primitive → Semantic → Component
- All colors use HSL: `hsl(var(--color-gold))`
- Never hardcode colors (text-white, bg-black)
- Button variants via CVA for all states

---

## Anti-Patterns to Avoid

1. **Font Loading**: Never add manual fallbacks to tailwind.config fontFamily (Next.js handles it)
2. **Playwright Selectors**: `.or().first()` returns DOM order, not visibility order (use `.isVisible()`)
3. **Hardcoded Colors**: Always use semantic tokens (never text-white, bg-black in className)
4. **External SVG**: Inline SVG is optimal (zero network requests, ~200 bytes per component)
5. **Test ID Hydration**: Have fallback text selectors when test IDs unreliable during navigation

---

## Performance Metrics

- **Test Success**: 35/35 E2E tests passing (100%)
- **Build Time**: 4.3s production build
- **Bundle Overhead**: ~1.2KB for all wave dividers
- **Type Check**: Clean (0 errors)
- **Dev Server**: Stable, no errors

---

## Pending Tasks (6 remaining)

**Phase 2.2**: Homepage CTA hash fragments (NEXT)
**Phase 2.3**: Scroll-to-section effect on detail pages
**Phase 3.1**: Accordion border styling bug
**Phase 3.2**: Wave divider audit/standardization
**Phase 4**: Complete texture system, wave polish
**Phase 5**: Trust elements (map, transport, studio photos)
**Phase 6**: SEO, testing, validation

---

## Documentation Maintenance

**Last Audit**: 2025-11-03
**Files Checked**:
- ✅ planning.md - Updated "Current Focus" section
- ✅ event-stream.md - Phase 1.3 completion documented
- ✅ todo.md - Progress updated to 18/24 (75%)
- ✅ workbook.md - Cleaned outdated language switcher debugging context

**Next Maintenance**: After Phase 2.2 completion
