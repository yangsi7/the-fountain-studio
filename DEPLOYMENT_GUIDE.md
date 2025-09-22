# Netlify Deployment Guide for The Fountain Studio

## Current Status
✅ **Local Development**: Working perfectly at http://localhost:3000
✅ **Build Process**: Production build successful
✅ **Visual Assets**: All 17 images integrated and optimized
❌ **Netlify CLI Deployment**: Function exceeds 250MB limit (common Next.js issue)
⏳ **Solution**: Deploy via GitHub integration (automatic builds)

## Problem Resolved
The site at https://the-fountain-studio.netlify.app shows a 404 error because:
- Manual CLI deployment with Next.js SSR exceeds Netlify's 250MB function limit
- Sharp image processing libraries bundle all platform binaries (~200MB)
- Solution: Deploy via GitHub for automatic Netlify builds (optimized function bundling)

## Solution: Deploy via GitHub Integration

### Step 1: Create GitHub Repository
```bash
# 1. Go to https://github.com/new
# 2. Create a new repository named "the-fountain-studio"
# 3. Keep it public or private as you prefer
# 4. DON'T initialize with README (we already have files)
```

### Step 2: Connect Local Repository to GitHub
```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/the-fountain-studio.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Netlify
1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub
5. Select the **the-fountain-studio** repository
6. Netlify will auto-detect these settings:
   - **Build command**: `pnpm build`
   - **Publish directory**: `.next`
   - **Functions directory**: `netlify/functions`
7. Click **"Deploy site"**

### Step 4: Wait for Deployment
- First deployment takes 2-5 minutes
- Netlify will show build logs in real-time
- Once complete, your site will be live!

## Alternative: Quick Test with Netlify Drop

For immediate testing without GitHub:

1. Build the project locally:
   ```bash
   pnpm build
   ```

2. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```

3. Deploy directly:
   ```bash
   netlify deploy --prod --dir=.next
   ```

   Or use the web interface:
   - Go to https://app.netlify.com/drop
   - Drag the entire project folder (not just .next)

## Configuration Files Already Set Up

### netlify.toml ✅
```toml
[build]
  command = "pnpm build"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

### next.config.ts ✅
- Configured for server-side rendering
- Images optimization enabled
- No static export (incompatible with App Router)

### package.json ✅
- All dependencies installed
- Build scripts configured
- Next.js 15.5.3 with App Router

## Environment Variables (If Needed)

Add these in Netlify Dashboard → Site Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Troubleshooting

### If 404 persists after deployment:
1. Check Netlify build logs for errors
2. Ensure `.next` folder is not in `.gitignore`
3. Verify `@netlify/plugin-nextjs` is working
4. Clear cache and redeploy:
   ```bash
   netlify deploy --prod --clear
   ```

### Build fails on Netlify:
1. Check Node version matches (20.x)
2. Ensure `pnpm-lock.yaml` is committed
3. Review build logs for missing dependencies

## Expected Result

Once deployed successfully, you'll see:
- Landing page with "Frequency is Everything" hero
- All 17 optimized images loading correctly
- Smooth scrolling navigation
- All 9 sections rendering properly:
  1. Navigation with language switcher
  2. Hero with Swiss Alps background
  3. Services (4 modalities)
  4. About Kristen
  5. Learn (accordion sections)
  6. Testimonials carousel
  7. FAQ accordion
  8. Contact form
  9. Footer

## Next Steps After Deployment

1. Set up custom domain (if available)
2. Configure SSL certificate (automatic with Netlify)
3. Enable Netlify Analytics
4. Set up form notifications for contact form
5. Connect Cal.com for booking system

## Support

- Netlify Docs: https://docs.netlify.com/integrations/frameworks/next-js/
- Next.js on Netlify: https://www.netlify.com/with/nextjs/
- Community Forum: https://answers.netlify.com/

---

**Current Local Dev Server**: http://localhost:3000 ✅
**Target Deployment URL**: https://the-fountain-studio.netlify.app 🚀