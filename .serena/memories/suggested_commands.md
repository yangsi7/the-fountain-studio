# Suggested Commands for The Fountain Studio

## Development
```bash
pnpm dev          # Start development server with Turbopack (http://localhost:3000)
pnpm build        # Build production bundle
pnpm start        # Start production server
pnpm lint         # Run ESLint for code quality
```

## Type Checking
```bash
npx tsc --noEmit  # Check TypeScript types without emitting files
```

## Testing
```bash
# Manual browser testing using Browser MCP
mcp__browsermcp__browser_navigate  # Navigate to test URLs
mcp__browsermcp__browser_snapshot  # Get element references
mcp__browsermcp__browser_screenshot # Visual verification
```

## Git Commands
```bash
git status        # Check current changes
git add .         # Stage all changes
git commit -m "type: description"  # Conventional commit
git push          # Push to remote
gh pr create      # Create pull request with GitHub CLI
```

## Utility Commands (Darwin/macOS)
```bash
ls -la            # List all files with details
find . -name "*.tsx"  # Find TypeScript React files
grep -r "pattern" .   # Search for pattern (use ripgrep 'rg' instead)
rg "pattern"      # Better: Use ripgrep for fast searching
tree -I 'node_modules'  # Show directory structure
open http://localhost:3000  # Open browser on macOS
```

## shadcn/ui Component Management
```bash
# Always use MCP tools for component management:
mcp__shadcn__search_items_in_registries  # Find components
mcp__shadcn__get_add_command_for_items  # Get installation command
# NEVER manually create components in components/ui
```

## Supabase Operations
```bash
# Use MCP tools for database operations:
mcp__supabase__list_tables     # View tables
mcp__supabase__list_migrations # Check migrations
mcp__supabase__execute_sql     # Run queries
```

## Project Index
```bash
python .claude-code-project-index-temp/scripts/project_index.py  # Regenerate PROJECT_INDEX.json
```