#!/bin/bash
# Enhanced Index Generator v3.0
# PURPOSE: Generate project and visual asset indexes for AI agents
# VERSION: 3.0 - Lowercase outputs, no context/ by default, dependency analysis
# FEATURES: Progressive scanning, dependency graph, route detection

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration - LOWERCASE file names, no context/ by default
PROJECT_INDEX="project-index.json"
VISUAL_INDEX="visual-assets.json"
CACHE_FILE=".index-cache.json"
TEMP_DIR="/tmp/index-gen-$$"

# Flags
WITH_MARKDOWN=false
INCLUDE_CONTEXT=false
WITH_EXIF=false
FORCE_REBUILD=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --with-markdown)
      WITH_MARKDOWN=true
      shift
      ;;
    --include-context)
      INCLUDE_CONTEXT=true
      shift
      ;;
    --with-exif)
      WITH_EXIF=true
      shift
      ;;
    --force)
      FORCE_REBUILD=true
      shift
      ;;
    --help)
      cat << EOF
Enhanced Index Generator v3.0

Usage: ./generate-indexes.sh [OPTIONS]

Options:
  --with-markdown    Generate human-readable markdown overview
  --include-context  Generate legacy context/ directory outputs
  --with-exif       Extract EXIF data from images (requires exiftool)
  --force           Force full rebuild, ignore cache
  --help            Show this help message

Default behavior:
  - Generates project-index.json and visual-assets.json only
  - No context/ directory outputs
  - Uses incremental scanning with cache
EOF
      exit 0
      ;;
    *)
      echo "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

echo "📚 Enhanced Index Generator v3.0"
echo "================================"
echo ""

# Check dependencies
check_dependencies() {
  local missing_deps=0
  
  if ! command -v node &> /dev/null; then
    echo "${RED}❌ Error: Node.js not found${NC}"
    echo "Install with: brew install node (macOS) or apt-get install nodejs (Linux)"
    missing_deps=1
  fi
  
  if ! command -v jq &> /dev/null; then
    echo "${YELLOW}⚠️  Warning: jq not found - some features will be limited${NC}"
    echo "Install with: brew install jq (macOS) or apt-get install jq (Linux)"
  fi
  
  if [ "$WITH_EXIF" = true ] && ! command -v exiftool &> /dev/null; then
    echo "${YELLOW}⚠️  Warning: exiftool not found - EXIF extraction disabled${NC}"
    WITH_EXIF=false
  fi
  
  if [ $missing_deps -eq 1 ]; then
    exit 1
  fi
}

# Check if rebuild is needed based on file changes
should_rebuild() {
  if [ "$FORCE_REBUILD" = true ]; then
    return 0
  fi
  
  if [ ! -f "$PROJECT_INDEX" ] || [ ! -f "$VISUAL_INDEX" ]; then
    return 0
  fi
  
  if [ ! -f "$CACHE_FILE" ]; then
    return 0
  fi
  
  # Check if any source files have been modified since last build
  local last_build=$(jq -r '.lastBuild // 0' "$CACHE_FILE" 2>/dev/null || echo "0")
  local newest_file=$(find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) \
    -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/dist/*" \
    -newer "$PROJECT_INDEX" 2>/dev/null | head -1)
  
  if [ -n "$newest_file" ]; then
    return 0
  fi
  
  return 1
}

# Generate tree views (optional with --include-context)
generate_trees() {
  if [ "$INCLUDE_CONTEXT" = true ]; then
    echo "🌳 Generating tree views..."
    mkdir -p context
    
    # Full tree without images (including archive folders)
    tree -I "node_modules|.git|.cache|dist|build|coverage|.next|.nuxt|archive" \
         --dirsfirst \
         -F \
         --charset=utf-8 \
         > "context/project-tree.txt"
    
    echo "  ${GREEN}✓${NC} Generated context/project-tree.txt"
  fi
}

# Main execution
main() {
  check_dependencies
  
  # Check if rebuild is needed
  if ! should_rebuild; then
    echo "${GREEN}✅ Indexes are up to date. Use --force to rebuild.${NC}"
    exit 0
  fi
  
  # Create temp directory
  mkdir -p "$TEMP_DIR"
  
  echo "🔧 Generating indexes..."
  
  # Change to project root
  cd "$(dirname "$0")/.." || exit 1
  
  # Run the Node.js index builder
  if [ -f "scripts/index-builder.mjs" ]; then
    echo "  Running advanced dependency analysis..."
    node scripts/index-builder.mjs \
      --project-index "$PROJECT_INDEX" \
      --visual-index "$VISUAL_INDEX" \
      --cache-file "$CACHE_FILE" \
      ${WITH_EXIF:+--with-exif} \
      ${WITH_MARKDOWN:+--with-markdown} \
      ${INCLUDE_CONTEXT:+--include-context}
  else
    echo "  Creating index-builder.mjs..."
    # Create the index builder script if it doesn't exist
    cat > scripts/index-builder.mjs << 'INDEXBUILDER'
#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  projectIndex: 'project-index.json',
  visualIndex: 'visual-assets.json',
  cacheFile: '.index-cache.json',
  withExif: args.includes('--with-exif'),
  withMarkdown: args.includes('--with-markdown'),
  includeContext: args.includes('--include-context'),
};

// Override file names from args
args.forEach((arg, i) => {
  if (arg === '--project-index' && args[i + 1]) {
    options.projectIndex = args[i + 1];
  }
  if (arg === '--visual-index' && args[i + 1]) {
    options.visualIndex = args[i + 1];
  }
  if (arg === '--cache-file' && args[i + 1]) {
    options.cacheFile = args[i + 1];
  }
});

// File extensions by category
const extensions = {
  code: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'],
  style: ['.css', '.scss', '.sass', '.less'],
  markup: ['.html', '.xml'],
  config: ['.json', '.yaml', '.yml', '.toml', '.env'],
  doc: ['.md', '.mdx', '.txt', '.rst'],
  image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp', '.tiff'],
  video: ['.mp4', '.webm', '.avi', '.mov', '.mkv', '.flv'],
  test: ['.test.ts', '.test.tsx', '.test.js', '.spec.ts', '.spec.tsx', '.spec.js'],
};

// Detect file kind
function getFileKind(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath);
  
  // Check if it's a test file
  if (extensions.test.some(testExt => basename.includes(testExt))) {
    return 'test';
  }
  
  for (const [kind, exts] of Object.entries(extensions)) {
    if (exts.includes(ext)) {
      return kind;
    }
  }
  
  return 'other';
}

// Format bytes to human-readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Scan directory recursively
function scanDirectory(dir, basePath = '') {
  const results = {
    directories: {},
    files: {},
    stats: {
      totalFiles: 0,
      totalDirs: 0,
      codeFiles: 0,
      docFiles: 0,
      testFiles: 0,
      byExtension: {},
      byKind: {}
    }
  };

  // Directories to skip (including all archive folders)
  const skipDirs = ['node_modules', '.git', 'dist', 'build', '.next', '.cache', 'coverage', 'archive'];
  
  function scan(currentPath, relativePath = '') {
    try {
      const items = fs.readdirSync(currentPath);
      
      items.forEach(item => {
        const fullPath = path.join(currentPath, item);
        const relPath = path.join(relativePath, item);
        
        // Skip certain directories
        if (skipDirs.includes(item)) {
          return;
        }
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            results.directories[relPath] = {
              path: relPath,
              fileCount: 0,
              subdirs: []
            };
            results.stats.totalDirs++;
            
            // Track subdirs in parent
            const parentDir = path.dirname(relPath);
            if (parentDir !== '.' && results.directories[parentDir]) {
              results.directories[parentDir].subdirs.push(item);
            }
            
            scan(fullPath, relPath);
          } else if (stat.isFile()) {
            const ext = path.extname(item);
            const kind = getFileKind(item);
            
            results.files[relPath] = {
              path: relPath,
              size: stat.size,
              extension: ext,
              modified: stat.mtime.toISOString(),
              kind: kind
            };
            
            results.stats.totalFiles++;
            
            // Count by kind
            if (kind === 'code') results.stats.codeFiles++;
            if (kind === 'doc') results.stats.docFiles++;
            if (kind === 'test') results.stats.testFiles++;
            
            // Count by extension
            results.stats.byExtension[ext] = (results.stats.byExtension[ext] || 0) + 1;
            results.stats.byKind[kind] = (results.stats.byKind[kind] || 0) + 1;
            
            // Update parent directory file count
            const parentDir = path.dirname(relPath);
            if (parentDir !== '.' && results.directories[parentDir]) {
              results.directories[parentDir].fileCount++;
            }
          }
        } catch (err) {
          // Skip files we can't access
        }
      });
    } catch (err) {
      console.error(`Error scanning ${currentPath}:`, err.message);
    }
  }

  scan(dir);
  return results;
}

// Extract imports from TypeScript/JavaScript files
async function extractImports(filePath) {
  const imports = [];
  const exports = [];
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Match import statements
    const importRegex = /import\s+(?:[\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g;
    const dynamicImportRegex = /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    while ((match = dynamicImportRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }
    
    // Match export statements
    const exportRegex = /export\s+(?:default\s+)?(?:function|class|const|let|var)\s+(\w+)/g;
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }
  } catch (err) {
    // Ignore read errors
  }
  
  return { imports, exports };
}

// Build dependency graph
async function buildDependencyGraph(files) {
  const graph = {
    nodes: [],
    edges: []
  };
  const reverseMap = {};
  
  // Process only code files
  const codeFiles = Object.entries(files)
    .filter(([_, info]) => info.kind === 'code' || info.kind === 'test')
    .map(([path]) => path);
  
  for (const filePath of codeFiles) {
    const fullPath = path.join(projectRoot, filePath);
    const { imports } = await extractImports(fullPath);
    
    // Add node
    graph.nodes.push({
      id: filePath,
      type: 'file',
      lang: path.extname(filePath).slice(1)
    });
    
    // Process imports to create edges
    for (const importPath of imports) {
      let resolvedPath = importPath;
      
      // Resolve relative imports
      if (importPath.startsWith('.')) {
        const dir = path.dirname(filePath);
        resolvedPath = path.join(dir, importPath);
        
        // Try to resolve with extensions
        const possiblePaths = [
          resolvedPath,
          resolvedPath + '.ts',
          resolvedPath + '.tsx',
          resolvedPath + '.js',
          resolvedPath + '.jsx',
          path.join(resolvedPath, 'index.ts'),
          path.join(resolvedPath, 'index.tsx'),
          path.join(resolvedPath, 'index.js'),
        ];
        
        for (const possible of possiblePaths) {
          if (files[possible]) {
            resolvedPath = possible;
            break;
          }
        }
      }
      
      // Add edge if target exists
      if (files[resolvedPath]) {
        graph.edges.push({
          from: filePath,
          to: resolvedPath,
          kind: 'import'
        });
        
        // Build reverse dependency map
        if (!reverseMap[resolvedPath]) {
          reverseMap[resolvedPath] = [];
        }
        reverseMap[resolvedPath].push(filePath);
      }
    }
  }
  
  return { graph, reverse: reverseMap };
}

// Detect Next.js routes
function detectRoutes(directories, files) {
  const routes = [];
  
  // Look for page.tsx/js files in app directory
  Object.keys(files).forEach(filePath => {
    if (filePath.startsWith('app/') && path.basename(filePath).match(/^(page|route|layout)\.(tsx?|jsx?)$/)) {
      const routePath = path.dirname(filePath)
        .replace(/^app/, '')
        .replace(/\[([^\]]+)\]/g, ':$1') // Convert [param] to :param
        .replace(/\(.*?\)/g, ''); // Remove route groups
      
      const type = path.basename(filePath).includes('route') ? 'api' :
                   path.basename(filePath).includes('layout') ? 'layout' : 'page';
      
      routes.push({
        route: routePath || '/',
        file: filePath,
        type: type
      });
    }
  });
  
  return routes;
}

// Scan visual assets
function scanVisualAssets() {
  const results = {
    version: '2.0',
    generated: new Date().toISOString(),
    summary: {
      totalAssets: 0,
      totalSize: 0,
      byType: {
        images: { count: 0, size: 0 },
        icons: { count: 0, size: 0 },
        videos: { count: 0, size: 0 }
      },
      byDirectory: {}
    },
    assets: {},
    usage: {}
  };
  
  function getAssetType(ext) {
    if (['.svg', '.ico'].includes(ext)) return 'icon';
    if (extensions.video.includes(ext)) return 'video';
    return 'image';
  }
  
  function scan(dir, relativePath = '') {
    try {
      const items = fs.readdirSync(dir);
      
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const relPath = path.join(relativePath, item);
        
        if (['node_modules', '.git', 'dist', 'build', '.next'].includes(item)) {
          return;
        }
        
        try {
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath, relPath);
          } else if (stat.isFile()) {
            const ext = path.extname(item).toLowerCase();
            
            if ([...extensions.image, ...extensions.video].includes(ext)) {
              const dirPath = path.dirname(relPath);
              const assetType = getAssetType(ext);
              
              if (!results.assets[dirPath]) {
                results.assets[dirPath] = [];
                results.summary.byDirectory[dirPath] = { count: 0, size: 0 };
              }
              
              const assetInfo = {
                file: path.basename(item),
                size: stat.size,
                sizeFormatted: formatBytes(stat.size),
                format: ext.substring(1),
                type: assetType,
                modified: stat.mtime.toISOString()
              };
              
              results.assets[dirPath].push(assetInfo);
              
              // Update summary
              results.summary.totalAssets++;
              results.summary.totalSize += stat.size;
              results.summary.byDirectory[dirPath].count++;
              results.summary.byDirectory[dirPath].size += stat.size;
              
              const typeKey = assetType === 'icon' ? 'icons' : assetType + 's';
              results.summary.byType[typeKey].count++;
              results.summary.byType[typeKey].size += stat.size;
            }
          }
        } catch (err) {
          // Skip inaccessible files
        }
      });
    } catch (err) {
      console.error(`Error scanning ${dir}:`, err.message);
    }
  }
  
  scan(projectRoot);
  
  // Format sizes
  results.summary.totalSizeFormatted = formatBytes(results.summary.totalSize);
  Object.keys(results.summary.byType).forEach(type => {
    results.summary.byType[type].sizeFormatted = formatBytes(results.summary.byType[type].size);
  });
  Object.keys(results.summary.byDirectory).forEach(dir => {
    results.summary.byDirectory[dir].sizeFormatted = formatBytes(results.summary.byDirectory[dir].size);
  });
  
  return results;
}

// Read package.json for tech stack info
function getTechStack() {
  try {
    const packagePath = path.join(projectRoot, 'package.json');
    const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    return {
      dependencies: Object.keys(packageData.dependencies || {}),
      devDependencies: Object.keys(packageData.devDependencies || {}),
      scripts: Object.keys(packageData.scripts || {}),
    };
  } catch (err) {
    return null;
  }
}

// Main execution
async function main() {
  console.log('📊 Building project index...');
  
  // Scan file system
  const scanResult = scanDirectory(projectRoot);
  
  // Build dependency graph
  console.log('🔗 Analyzing dependencies...');
  const { graph, reverse } = await buildDependencyGraph(scanResult.files);
  
  // Detect routes
  console.log('🛣️  Detecting routes...');
  const routes = detectRoutes(scanResult.directories, scanResult.files);
  
  // Get tech stack
  const techStack = getTechStack();
  
  // Build main index
  const projectIndex = {
    version: '3.0',
    generated: new Date().toISOString(),
    project: path.basename(projectRoot),
    techStack,
    stats: scanResult.stats,
    directories: scanResult.directories,
    files: scanResult.files,
    graph,
    reverse,
    routes,
    ownership: {} // TODO: Could parse CODEOWNERS if exists
  };
  
  // Write project index
  fs.writeFileSync(
    path.join(projectRoot, options.projectIndex),
    JSON.stringify(projectIndex, null, 2)
  );
  console.log(`  ✓ Generated ${options.projectIndex} (${formatBytes(JSON.stringify(projectIndex).length)})`);
  
  // Scan visual assets
  console.log('🎨 Scanning visual assets...');
  const visualIndex = scanVisualAssets();
  
  // Write visual index
  fs.writeFileSync(
    path.join(projectRoot, options.visualIndex),
    JSON.stringify(visualIndex, null, 2)
  );
  console.log(`  ✓ Generated ${options.visualIndex} (${formatBytes(JSON.stringify(visualIndex).length)})`);
  
  // Update cache
  const cache = {
    lastBuild: Date.now(),
    version: '3.0',
    files: {
      [options.projectIndex]: new Date().toISOString(),
      [options.visualIndex]: new Date().toISOString()
    }
  };
  fs.writeFileSync(
    path.join(projectRoot, options.cacheFile),
    JSON.stringify(cache, null, 2)
  );
  
  // Generate markdown if requested
  if (options.withMarkdown) {
    console.log('📝 Generating markdown overview...');
    generateMarkdown(projectIndex, visualIndex);
  }
  
  // Generate context files if requested
  if (options.includeContext) {
    console.log('📁 Generating context directory files...');
    generateContextFiles(projectIndex);
  }
  
  console.log('✅ Index generation complete!');
}

// Generate markdown overview
function generateMarkdown(projectIndex, visualIndex) {
  const md = `# Project Overview
  
Generated: ${new Date().toISOString()}

## Statistics
- Total Files: ${projectIndex.stats.totalFiles}
- Total Directories: ${projectIndex.stats.totalDirs}
- Code Files: ${projectIndex.stats.codeFiles}
- Documentation Files: ${projectIndex.stats.docFiles}
- Test Files: ${projectIndex.stats.testFiles}

## Tech Stack
${projectIndex.techStack ? `
### Dependencies
${projectIndex.techStack.dependencies.slice(0, 10).join(', ')}

### Scripts
${projectIndex.techStack.scripts.join(', ')}
` : 'Package.json not found'}

## Routes
${projectIndex.routes.map(r => `- ${r.type}: ${r.route} → ${r.file}`).join('\n')}

## Visual Assets
- Total: ${visualIndex.summary.totalAssets} (${visualIndex.summary.totalSizeFormatted})
- Images: ${visualIndex.summary.byType.images.count}
- Icons: ${visualIndex.summary.byType.icons.count}  
- Videos: ${visualIndex.summary.byType.videos.count}
`;

  fs.writeFileSync(path.join(projectRoot, 'project-overview.md'), md);
  console.log('  ✓ Generated project-overview.md');
}

// Generate context directory files
function generateContextFiles(projectIndex) {
  const contextDir = path.join(projectRoot, 'context');
  if (!fs.existsSync(contextDir)) {
    fs.mkdirSync(contextDir);
  }
  
  // Write simplified index for context
  const contextIndex = {
    generated: projectIndex.generated,
    stats: projectIndex.stats,
    routes: projectIndex.routes,
    hotspots: Object.entries(projectIndex.reverse || {})
      .sort((a, b) => (b[1].length - a[1].length))
      .slice(0, 10)
      .map(([file, deps]) => ({ file, dependencyCount: deps.length }))
  };
  
  fs.writeFileSync(
    path.join(contextDir, 'project-index.md'),
    JSON.stringify(contextIndex, null, 2)
  );
  console.log('  ✓ Generated context/project-index.md');
}

// Run
main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
INDEXBUILDER
    chmod +x scripts/index-builder.mjs
    
    echo "  ${GREEN}✓${NC} Created index-builder.mjs"
    echo "  Running dependency analysis..."
    node scripts/index-builder.mjs \
      --project-index "$PROJECT_INDEX" \
      --visual-index "$VISUAL_INDEX" \
      --cache-file "$CACHE_FILE" \
      ${WITH_EXIF:+--with-exif} \
      ${WITH_MARKDOWN:+--with-markdown} \
      ${INCLUDE_CONTEXT:+--include-context}
  fi
  
  # Generate optional tree views
  generate_trees
  
  # Clean up temp directory
  rm -rf "$TEMP_DIR"
  
  # Summary
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "${GREEN}✅ Index generation complete!${NC}"
  echo ""
  echo "Generated files:"
  echo "  ${CYAN}1.${NC} $PROJECT_INDEX - Project structure and dependencies"
  echo "  ${CYAN}2.${NC} $VISUAL_INDEX - Visual assets catalog"
  
  if [ "$WITH_MARKDOWN" = true ]; then
    echo "  ${CYAN}3.${NC} project-overview.md - Human-readable overview"
  fi
  
  if [ "$INCLUDE_CONTEXT" = true ]; then
    echo "  ${CYAN}4.${NC} context/ - Legacy context directory outputs"
  fi
  
  echo ""
  echo "Key features:"
  echo "  • Dependency graph with imports/exports"
  echo "  • Reverse dependency mapping"
  echo "  • Next.js route detection"
  echo "  • File categorization (code/doc/test/config)"
  echo "  • Incremental scanning with cache"
  echo ""
  echo "${YELLOW}💡 Use query-index.sh to explore the generated indexes${NC}"
}

# Run main function
main

exit 0