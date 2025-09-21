# Documentation Updates - Stripe Removal & Shopify Redirect

## Overview
This document tracks all documentation updates needed after removing Stripe integration and implementing Shopify redirect for payments.

## Update Status
- **Date**: September 20, 2025
- **PR**: #4 - Remove Stripe integration and simplify questionnaire flow
- **Branch**: questionnaire-no-stripe

## Standard Replacements Applied

### 1. Technology Stack
**OLD**:
```
STACK: Next.js 14, TypeScript, Zustand, Supabase, Stripe
```
**NEW**:
```
STACK: Next.js 14, TypeScript, Zustand, Supabase, Shopify (external)
```

### 2. Payment Features
**OLD**:
```
- Processes self-pay payments via Stripe
- Stripe payment processing for CHF 149/249/349
- In-app payment collection
```
**NEW**:
```
- Redirects self-pay users to Shopify checkout
- External payment processing via Shopify (CHF 149/249/349)
- Payment handled externally
```

### 3. API Endpoints
**OLD**:
```
API: 6 endpoints (including payment processing)
- /api/create-payment-intent (REMOVED)
- /api/confirm-payment (REMOVED)
- /api/generate-referral
- /api/submit-questionnaire
- /api/doctor-upload
- /api/questionnaire/submit
```
**NEW**:
```
API: 4 endpoints (payment handled externally)
- /api/generate-referral
- /api/questionnaire/submit (primary submission endpoint)
- /api/doctor-upload
- /api/auth-test (testing endpoint)
<!-- Note: /api/submit-questionnaire is legacy, use /api/questionnaire/submit -->
<!-- Payment processing moved to Shopify (external) -->
```

### 4. Database Tables
**OLD**:
```
Tables:
- payments (active)
- stripe_webhook_events (production data)
```
**NEW**:
```
Tables:
- payments (DEPRECATED - legacy data only)
- stripe_webhook_events (REMOVED)
<!-- Note: Payment tracking now handled externally via Shopify -->
```

### 5. Environment Variables
**OLD**:
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```
**NEW**:
```env
# Payment handled externally via Shopify
# SHOPIFY_STORE_URL=https://your-store.myshopify.com (optional)
<!-- Stripe environment variables removed -->
```

## Implementation Details

### Payment Page Changes
- **File**: `/app/payment/page.tsx`
- **Change**: Replaced Stripe checkout with redirect to Shopify
- **Implementation**: Simple redirect button that sends users to external Shopify store
- **User Flow**: User clicks "Continue to Shopify" → Redirected to Shopify → Completes payment externally

### Store Schema Updates
- **File**: `/lib/stores/questionnaire-store.ts`
- **Removed Fields**:
  - `selectedDuration` (no longer selecting payment duration)
  - `selectedPrice` (no price selection in-app)
- **Added/Retained Fields**:
  - `details` (user details)
  - `consents` (user consents)
  - `decision` (eligibility decision)
  - `lastSaved` (timestamp)

### Database Changes
- **Table**: `payments` - Marked as DEPRECATED, contains legacy Stripe payment data
- **Table**: `stripe_webhook_events` - REMOVED from active use
- **Migration**: No destructive migrations run, tables preserved for historical data

### Environment Variable Changes
**Development (.env.local)**:
- Remove: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- Optional Add: `SHOPIFY_STORE_URL` (if dynamic redirect needed)

**Production Cleanup Steps**:
1. Remove Stripe environment variables from hosting platform (Vercel/Netlify)
2. Revoke Stripe API keys in Stripe Dashboard
3. Disable Stripe webhooks
4. Archive Stripe test/live data

## Files Updated

### Phase 1: Critical Updates ✅

#### README.md
- ✅ Removed "Payments by Stripe" badge
- ✅ Updated features to show "Redirects to Shopify for payment"
- ✅ Removed Stripe test card instructions
- ✅ Added Shopify redirect explanation

#### CLAUDE.md
- ✅ Updated tech stack (removed Stripe, added Shopify external)
- ✅ Fixed API endpoint count (6 → 4)
- ✅ Updated project context section

#### architecture-core.md
- ✅ Updated payment integration section
- ✅ Removed Stripe from components list
- ✅ Updated migration history

#### docs/DEPLOYMENT.md
- ✅ Removed Stripe environment variables section
- ✅ Added Shopify store URL configuration
- ✅ Updated deployment checklist

#### refs/overview.md
- ✅ Updated payment provider from Stripe to Shopify
- ✅ Fixed technology stack diagram
- ✅ Updated API endpoints table

### Phase 2: Technical Documentation

#### refs/database-schema.md
- ✅ Added DEPRECATED banner to payments table
- ✅ Removed stripe_webhook_events table
- ✅ Updated indexes and constraints documentation

#### refs/security-layers.md
- ✅ Removed PCI compliance requirements
- ✅ Updated security boundaries
- ✅ Removed payment token handling sections

#### refs/data-flows.md
- ✅ Replaced "Stripe Payment Pipeline" section with Shopify redirect flow
- ✅ Removed payment confirmation logic
- ✅ Updated flow diagrams

#### refs/testing-strategy.md
- ✅ Removed Stripe payment test scenarios
- ✅ Updated E2E test flows
- ✅ Removed webhook testing

### Phase 3: Archives & Historical Context

#### Created Archive
- ✅ Created `/docs/archive/stripe-integration/` directory
- ✅ Moved STRIPE_PAYMENT_FIX_SUMMARY.md to archive
- ✅ Created migration-notes.md with historical context

#### Questionnaire Specs Updated
- ✅ docs/specs/questionnaire/spec.md
- ✅ docs/specs/questionnaire/description.md
- ✅ docs/specs/questionnaire/technical-specification.md
- ✅ docs/specs/questionnaire/ui-ux-specification.md
- ✅ docs/specs/questionnaire/test-strategy.md
- ✅ docs/specs/questionnaire/quick-reference.md

## Verification Checklist

### Automated Checks ✅
- [x] No "stripe" mentions in critical docs (case-insensitive)
- [x] No "payment-intent" or "PaymentIntent" references
- [x] No "confirm-payment" API references
- [x] No Stripe environment variables in documentation
- [x] No Stripe test card references

### Manual Reviews ✅
- [x] README clearly explains Shopify redirect
- [x] Architecture diagram shows external payment
- [x] Database schema shows deprecated tables
- [x] Deployment guide has Shopify setup (if needed)
- [x] No broken internal links to payment docs

### Consistency Validation ✅
- [x] Tech stack mentions consistent (no Stripe)
- [x] API endpoint counts accurate (4 not 6)
- [x] Table counts updated (payments deprecated)
- [x] All payment flows show redirect pattern
- [x] Historical context preserved in archive

## Migration Notes

### Why This Change?
1. **Simplification**: Removed complex payment processing logic
2. **Compliance**: No PCI compliance burden
3. **Flexibility**: Shopify handles all payment methods
4. **Maintenance**: Less code to maintain

### What Changed?
- **Before**: In-app Stripe integration with webhooks
- **After**: Simple redirect to Shopify for payment

### Impact on Users
- Users complete payment on trusted Shopify platform
- No credit card data handled by our application
- Simplified checkout experience

### For Developers
- No Stripe SDK or dependencies needed
- No webhook handling required
- Simpler testing (no payment mocking)
- Focus on core questionnaire functionality

## Remaining References

### Acceptable Historical References
These files contain historical context and are acceptable to keep:
- `/docs/archive/stripe-integration/*` - Historical documentation
- `CHANGELOG.md` - Documents the migration
- Git commit history - Preserves development context

### Files Not Updated (Out of Scope)
- Test result files from old test runs
- Archive directories from previous iterations
- Git history and commit messages

## Summary

All documentation has been updated to accurately reflect:
1. ✅ Stripe has been completely removed
2. ✅ Payments redirect to Shopify
3. ✅ No in-app payment processing
4. ✅ Database tables are deprecated
5. ✅ Historical context preserved in archive

The documentation now provides clear guidance for:
- New developers understanding the system
- Existing developers adapting to changes
- Users understanding the payment flow
- DevOps managing deployments

## Next Steps

1. Merge PR #4 to main branch
2. Update production environment variables
3. Remove Stripe dashboard access (if applicable)
4. Monitor Shopify integration
5. Update any external documentation or wikis

---
*Documentation update completed: September 20, 2025*