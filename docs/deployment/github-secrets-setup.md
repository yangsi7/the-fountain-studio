# GitHub Secrets Configuration for Netlify CI/CD

## Required Secrets

Your GitHub Actions workflows require two secrets to be configured in your repository settings:

### 1. NETLIFY_AUTH_TOKEN

**Purpose**: Authenticates GitHub Actions to deploy to your Netlify account.

**How to get it**:
1. Go to https://app.netlify.com/user/applications
2. Click "New access token"
3. Give it a descriptive name (e.g., "GitHub Actions Deployment")
4. Copy the generated token
5. Go to your GitHub repository → Settings → Secrets and variables → Actions
6. Click "New repository secret"
7. Name: `NETLIFY_AUTH_TOKEN`
8. Value: Paste the token from Netlify
9. Click "Add secret"

### 2. NETLIFY_SITE_ID

**Purpose**: Identifies which Netlify site to deploy to.

**How to get it**:
1. Go to https://app.netlify.com
2. Select your site (the-fountain-studio)
3. Go to Site settings → General
4. Under "Site information", you'll find "Site ID" (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)
5. Copy the Site ID
6. Go to your GitHub repository → Settings → Secrets and variables → Actions
7. Click "New repository secret"
8. Name: `NETLIFY_SITE_ID`
9. Value: Paste the Site ID from Netlify
10. Click "Add secret"

## Verification Steps

After adding the secrets:

1. **Check Secrets are Added**:
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - You should see both `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` listed

2. **Trigger a Deployment**:
   - Push a commit to the `master` branch (done ✅)
   - Go to GitHub repository → Actions tab
   - You should see two workflows running:
     - "CI" workflow (runs tests and type checking)
     - "Deploy to Netlify" workflow (deploys to production)

3. **Check Workflow Status**:
   - Click on the "Deploy to Netlify" workflow run
   - Monitor the deployment steps
   - Once complete, you should see a deployment URL in the logs

4. **Verify Netlify Deployment**:
   - Go to https://app.netlify.com
   - Check your site's "Deploys" tab
   - You should see a new deploy from "GitHub" trigger
   - Status should be "Published"

## Troubleshooting

### Workflow Fails with Authentication Error
- **Symptom**: "Error: Netlify authentication failed"
- **Solution**: Regenerate `NETLIFY_AUTH_TOKEN` and update the GitHub secret

### Workflow Fails with Site Not Found
- **Symptom**: "Error: Could not find site"
- **Solution**: Verify `NETLIFY_SITE_ID` matches your Netlify site's ID exactly

### Workflow Doesn't Trigger
- **Symptom**: No workflow runs appear after pushing to master
- **Solution**:
  - Verify `.github/workflows/` files are committed
  - Check repository Actions settings (Settings → Actions → General)
  - Ensure "Allow all actions and reusable workflows" is selected

## Current Workflow Configuration

### CI Workflow
- **Triggers**: Push to `master` branch, Pull requests
- **Actions**: Lint, Type check, Unit tests
- **File**: `.github/workflows/ci.yml`

### Netlify Deploy Workflow
- **Triggers**:
  - Push to `master` or `main` branches → Production deployment
  - Pull requests → Preview deployment
- **Actions**:
  - Build Next.js app
  - Deploy to Netlify
  - Comment PR with preview URL (for PRs)
  - Create GitHub deployment (for production)
- **File**: `.github/workflows/netlify-deploy.yml`

## Best Practices

1. **Never commit secrets to git** - Always use GitHub Secrets
2. **Rotate tokens regularly** - Update every 6-12 months
3. **Use preview deployments** - Test changes in PRs before merging
4. **Monitor deployment status** - Check GitHub Actions tab after pushes
5. **Review Netlify logs** - Use deployment URLs in workflow outputs for debugging

---

**Last Updated**: 2025-11-04
**Status**: Workflows configured and pushed to GitHub
**Next Step**: Add secrets to GitHub repository settings
