---
name: deploy-pipeline
description: Deploy the XML Pipeline System v2.0 to a new project using the template ZIP
---

# Deploy Pipeline to New Project

Deploy the complete XML Pipeline System v2.0 to a new project using the pre-packaged template ZIP file.

## Quick Command
```
/deploy-pipeline
```

## Prerequisites
The template ZIP file should be available at:
```
docs/process/xml-pipeline-system-v2.0.zip
```

If not present, it can be downloaded from the source project or created using the packaging instructions.

## Deployment Steps

### Step 1: Verify ZIP File Exists
```bash
if [ -f "docs/process/xml-pipeline-system-v2.0.zip" ]; then
    echo "✅ Template ZIP found ($(du -h docs/process/xml-pipeline-system-v2.0.zip | cut -f1))"
else
    echo "❌ Template ZIP not found"
    echo "   Please copy xml-pipeline-system-v2.0.zip to docs/process/"
    exit 1
fi
```

### Step 2: Create Extraction Directory
```bash
# Create temporary extraction directory
TEMP_DIR=".xml-pipeline-temp"
rm -rf $TEMP_DIR 2>/dev/null
mkdir -p $TEMP_DIR

echo "📦 Extracting template files..."
```

### Step 3: Extract ZIP Contents
```bash
# Extract the ZIP
unzip -q docs/process/xml-pipeline-system-v2.0.zip -d $TEMP_DIR

if [ $? -eq 0 ]; then
    echo "✅ Extraction successful"
else
    echo "❌ Extraction failed"
    exit 1
fi
```

### Step 4: Run Automatic Installer
```bash
cd $TEMP_DIR

# Check if install.sh exists
if [ -f "install.sh" ]; then
    echo "🚀 Running automatic installer..."
    bash install.sh
else
    echo "⚠️  No install.sh found, using manual deployment..."
    
    # Manual deployment steps
    echo "📁 Creating directory structure..."
    mkdir -p ../.claude/agents
    mkdir -p ../.claude/hooks
    mkdir -p ../.claude/commands
    mkdir -p ../.claude/temp
    mkdir -p ../docs/process
    mkdir -p ../docs/architecture
    mkdir -p ../docs/guides
    mkdir -p ../scripts
    mkdir -p ../templates
    mkdir -p ../refs
    mkdir -p ../.archive/events
    
    echo "📦 Copying files..."
    cp -r agents/* ../.claude/agents/
    cp -r hooks/* ../.claude/hooks/
    cp -r commands/* ../.claude/commands/
    cp -r templates/* ../templates/
    cp -r scripts/* ../scripts/
    
    echo "🔧 Setting permissions..."
    chmod +x ../.claude/hooks/*.sh
    chmod +x ../scripts/*.sh
    
    echo "📄 Creating state files..."
    cp templates/plan-template.md ../plan.md
    cp templates/tasks-template.md ../tasks.md
    cp templates/events-template.md ../events.md
    
    echo "⚙️  Configuring settings..."
    if [ -f "config/settings.local.json.template" ]; then
        cp config/settings.local.json.template ../.claude/settings.local.json
    fi
fi

cd ..
```

### Step 5: Create Main CLAUDE.md (Optional)
```bash
# Ask if user wants to create main CLAUDE.md
echo ""
echo "Would you like to create the main CLAUDE.md file?"
echo "This contains the XML pipeline definition for your project."
echo ""
echo "Options:"
echo "1. Yes - Create from template (you'll need to customize it)"
echo "2. No - I'll create it manually later"
echo ""
read -p "Choice (1/2): " choice

if [ "$choice" = "1" ]; then
    if [ -f "$TEMP_DIR/config/CLAUDE.md.template" ]; then
        cp $TEMP_DIR/config/CLAUDE.md.template CLAUDE.md
        echo "✅ Created CLAUDE.md from template"
        echo "   ⚠️  Remember to customize it for your project:"
        echo "   - Replace [PROJECT_NAME] with your project name"
        echo "   - Replace [PROJECT_DESCRIPTION] with description"
        echo "   - Update development commands"
    fi
fi
```

### Step 6: Clean Up
```bash
# Remove temporary directory
rm -rf $TEMP_DIR
echo "🧹 Cleaned up temporary files"
```

### Step 7: Validation
```bash
echo ""
echo "🔍 Running validation check..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Quick validation
ERRORS=0
SUCCESS=0

# Check agents
if [ -d ".claude/agents" ] && [ "$(ls .claude/agents/*.md 2>/dev/null | wc -l)" -gt 0 ]; then
    echo "✅ Agents installed ($(ls .claude/agents/*.md | wc -l) files)"
    ((SUCCESS++))
else
    echo "❌ Agents not found"
    ((ERRORS++))
fi

# Check hooks
if [ -d ".claude/hooks" ] && [ "$(ls .claude/hooks/*.sh 2>/dev/null | wc -l)" -gt 0 ]; then
    echo "✅ Hooks installed ($(ls .claude/hooks/*.sh | wc -l) files)"
    ((SUCCESS++))
else
    echo "❌ Hooks not found"
    ((ERRORS++))
fi

# Check commands
if [ -d ".claude/commands" ] && [ "$(ls .claude/commands/*.md 2>/dev/null | wc -l)" -gt 0 ]; then
    echo "✅ Commands installed ($(ls .claude/commands/*.md | wc -l) files)"
    ((SUCCESS++))
else
    echo "❌ Commands not found"
    ((ERRORS++))
fi

# Check scripts
if [ -d "scripts" ] && [ -f "scripts/query-index.sh" ]; then
    echo "✅ Scripts installed"
    ((SUCCESS++))
else
    echo "❌ Scripts not found"
    ((ERRORS++))
fi

# Check templates
if [ -d "templates" ] && [ "$(ls templates/*.md 2>/dev/null | wc -l)" -gt 0 ]; then
    echo "✅ Templates installed ($(ls templates/*.md | wc -l) files)"
    ((SUCCESS++))
else
    echo "❌ Templates not found"
    ((ERRORS++))
fi

# Check state files
for file in plan.md tasks.md events.md; do
    if [ -f "$file" ]; then
        echo "✅ $file created"
        ((SUCCESS++))
    else
        echo "❌ $file missing"
        ((ERRORS++))
    fi
done

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

### Step 8: Final Report
```bash
echo ""
if [ $ERRORS -eq 0 ]; then
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo ""
    echo "The XML Pipeline System v2.0 has been deployed to your project."
    echo ""
    echo "Next steps:"
    echo "1. Customize CLAUDE.md for your project (if created)"
    echo "2. Run: /check-process to validate the complete setup"
    echo "3. Run: /init-architecture to initialize architecture docs"
    echo "4. Review agents in .claude/agents/"
    echo "5. Start using the 9-stage pipeline!"
else
    echo "⚠️  DEPLOYMENT COMPLETED WITH ISSUES"
    echo ""
    echo "Found $ERRORS errors. Some components may be missing."
    echo ""
    echo "To fix:"
    echo "1. Run: /bootstrap-project-process"
    echo "2. Or manually extract the ZIP contents"
fi

echo ""
echo "For detailed validation, run: /check-process"
```

## Usage Examples

### Basic Deployment
```
/deploy-pipeline
```
Deploys the system using the ZIP file in docs/process/.

### Manual Deployment
If automatic deployment fails:
```bash
# Extract manually
unzip docs/process/xml-pipeline-system-v2.0.zip -d temp
cd temp
bash install.sh
```

### Deployment to Different Location
```bash
# Copy ZIP to target project
cp docs/process/xml-pipeline-system-v2.0.zip ~/new-project/
cd ~/new-project
unzip xml-pipeline-system-v2.0.zip -d temp
cd temp
bash install.sh
```

## What Gets Deployed

### Complete System Components
- **20 Agents**: All pipeline and utility agents
- **6 Hooks**: Automated pipeline hooks
- **9 Commands**: System operation commands  
- **7 Templates**: Document templates
- **3+ Scripts**: Indexing and utilities
- **State Files**: plan.md, tasks.md, events.md
- **Configuration**: settings.local.json

### Directory Structure Created
```
.claude/
├── agents/       # Pipeline agents
├── hooks/        # Automation hooks
├── commands/     # Slash commands
└── temp/         # Temporary files

docs/
├── process/      # Process documentation
├── architecture/ # Architecture docs
└── guides/       # User guides

templates/        # Document templates
scripts/          # Shell scripts
refs/            # Reference docs
.archive/        # Archive storage
```

## Troubleshooting

### ZIP Not Found
```bash
# Download from source project or create new:
cd source-project
zip -r xml-pipeline-system-v2.0.zip .claude/agents .claude/hooks .claude/commands templates scripts
```

### Permission Issues
```bash
# Fix all permissions
chmod +x .claude/hooks/*.sh
chmod +x scripts/*.sh
```

### Incomplete Deployment
```bash
# Use bootstrap command to fix
/bootstrap-project-process
```

### Validation Failures
```bash
# Run comprehensive check
/check-process
```

## Customization After Deployment

### 1. Update CLAUDE.md
Edit the main CLAUDE.md file:
- Set project name and description
- Add project-specific commands
- Configure development environment

### 2. Configure Hooks
Edit `.claude/settings.local.json`:
- Add project-specific hooks
- Adjust trigger conditions
- Set custom paths

### 3. Customize Templates
Modify templates in `templates/`:
- Adjust planning format
- Update task structure
- Customize event logging

### 4. Add Project Agents
Create additional agents in `.claude/agents/`:
- Project-specific agents
- Domain-specific helpers
- Custom workflows

## Integration with Existing Projects

### Preserving Existing Files
The deployment:
- Skips existing state files (plan.md, tasks.md, events.md)
- Preserves existing settings.local.json
- Doesn't overwrite CLAUDE.md if present

### Merging with Existing Structure
For projects with existing structure:
1. Back up existing files
2. Deploy the system
3. Merge configurations manually
4. Run /check-process to validate

## Benefits of ZIP Deployment

### Advantages
- **Portable**: Single file contains entire system
- **Versioned**: Track template versions
- **Fast**: Quick deployment to new projects
- **Consistent**: Same structure across projects
- **Shareable**: Easy to distribute to teams

### Use Cases
1. **New Projects**: Bootstrap from scratch
2. **Broken Systems**: Repair corrupted installations
3. **Team Distribution**: Share standard setup
4. **Template Updates**: Deploy new versions
5. **Backup Recovery**: Restore from known good state

---

*Deploy the complete XML Pipeline System v2.0 with a single command*