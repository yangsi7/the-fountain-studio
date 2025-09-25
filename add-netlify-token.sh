#!/bin/bash

echo "📌 Netlify Auth Token Setup"
echo "=========================="
echo ""
echo "Please follow these steps to get your Netlify auth token:"
echo ""
echo "1. Open: https://app.netlify.com/user/applications#personal-access-tokens"
echo "2. Click 'New access token'"
echo "3. Name it: 'GitHub Actions Deploy'"
echo "4. Set expiration (recommend 1 year)"
echo "5. Click 'Generate token'"
echo "6. Copy the token"
echo ""
echo "Once you have the token, paste it below:"
echo ""
read -s -p "Enter your Netlify Auth Token: " NETLIFY_TOKEN
echo ""

if [ -z "$NETLIFY_TOKEN" ]; then
    echo "❌ No token provided. Exiting."
    exit 1
fi

echo "Adding token to GitHub secrets..."
echo "$NETLIFY_TOKEN" | gh secret set NETLIFY_AUTH_TOKEN

if [ $? -eq 0 ]; then
    echo "✅ Successfully added NETLIFY_AUTH_TOKEN to GitHub secrets!"
    echo ""
    echo "Your secrets are now configured:"
    gh secret list | grep NETLIFY
    echo ""
    echo "You can now trigger the GitHub Actions workflow!"
else
    echo "❌ Failed to add secret. Please check your GitHub CLI authentication."
fi

# Clean up
unset NETLIFY_TOKEN