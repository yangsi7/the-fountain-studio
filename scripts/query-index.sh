#!/bin/bash
# Enhanced Index Query CLI v3.0
# PURPOSE: Query project and visual indexes with agent-specific context
# VERSION: 3.0 - Advanced commands, dependency analysis, doc filtering
# FEATURES: Multi-level detail, reverse dependencies, route awareness

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

# Configuration - LOWERCASE file names
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

PROJECT_INDEX="$PROJECT_ROOT/project-index.json"
VISUAL_INDEX="$PROJECT_ROOT/visual-assets.json"
CACHE_FILE="$PROJECT_ROOT/.query-cache.json"
MAX_TOKEN_BUDGET=5000  # Roughly 20KB of JSON
CACHE_TTL=300  # 5 minutes

# Global flags
SHOW_DOCS=false
ONLY_DOCS=false
FORMAT="table"  # table, json, md

# Check dependencies
check_dependencies() {
  if ! command -v jq &> /dev/null; then
    echo "${RED}Error: jq is not installed${NC}"
    echo "Install with: brew install jq (macOS) or apt-get install jq (Linux)"
    exit 1
  fi
  
  if [ ! -f "$PROJECT_INDEX" ]; then
    echo "${RED}Error: $PROJECT_INDEX not found${NC}"
    echo "Run: ./scripts/generate-indexes.sh to create indexes"
    exit 1
  fi
}

# Initialize cache
init_cache() {
  if [ ! -f "$CACHE_FILE" ]; then
    echo '{"queries": {}, "metadata": {"created": "'$(date -u +"%Y-%m-%dT%H:%M:%SZ")'"}}' > "$CACHE_FILE"
  fi
}

# Check cache
check_cache() {
  local query_key="$1"
  
  if [ -f "$CACHE_FILE" ]; then
    local cached_result=$(jq -r ".queries[\"$query_key\"].result // null" "$CACHE_FILE")
    if [ "$cached_result" != "null" ]; then
      local cache_timestamp=$(jq -r ".queries[\"$query_key\"].timestamp // 0" "$CACHE_FILE")
      local current_timestamp=$(date +%s)
      
      if [ $((current_timestamp - cache_timestamp)) -lt $CACHE_TTL ]; then
        echo "$cached_result"
        return 0
      fi
    fi
  fi
  return 1
}

# Update cache
update_cache() {
  local query_key="$1"
  local result="$2"
  local timestamp=$(date +%s)
  
  if [ -f "$CACHE_FILE" ]; then
    jq --arg key "$query_key" \
       --argjson result "$result" \
       --arg timestamp "$timestamp" \
       '.queries[$key] = {result: $result, timestamp: ($timestamp | tonumber)}' \
       "$CACHE_FILE" > "${CACHE_FILE}.tmp" && mv "${CACHE_FILE}.tmp" "$CACHE_FILE"
  fi
}

# Estimate token count
estimate_tokens() {
  local json_size=$(echo "$1" | wc -c)
  echo $((json_size / 4))  # Rough estimate: 4 characters per token
}

# Format output based on format flag
format_output() {
  local data="$1"
  local type="$2"
  
  case "$FORMAT" in
    json)
      echo "$data"
      ;;
    md)
      echo "$data" | jq -r '
        if type == "array" then
          .[] | "- \(.)"
        elif type == "object" then
          to_entries | .[] | "**\(.key)**: \(.value)"
        else
          .
        end
      ' 2>/dev/null || echo "$data"
      ;;
    table|*)
      # Default table format - customize based on type
      case "$type" in
        overview)
          echo "$data" | jq -r '
            "=== PROJECT OVERVIEW ===\n" +
            "Project: \(.project // "unknown")\n" +
            "Version: \(.version // "unknown")\n" +
            "Generated: \(.generated // "unknown")\n\n" +
            "=== TECH STACK ===\n" +
            if .techStack then
              "Dependencies: \(.techStack.dependencies[:5] | join(", "))\n" +
              "Scripts: \(.techStack.scripts | join(", "))\n"
            else "Not available\n" end +
            "\n=== STATISTICS ===\n" +
            "Total Files: \(.stats.totalFiles // 0)\n" +
            "Code Files: \(.stats.codeFiles // 0)\n" +
            "Doc Files: \(.stats.docFiles // 0)\n" +
            "Test Files: \(.stats.testFiles // 0)\n" +
            "\n=== ROUTES ===\n" +
            (.routes | map("[\(.type)] \(.route) → \(.file)") | join("\n"))
          '
          ;;
        files)
          echo "$data" | jq -r '.[] | "\(.path)\t\(.extension)\t\(.kind)\t\(.size) bytes"' | column -t
          ;;
        deps)
          echo "$data" | jq -r '
            if .graph then
              "=== DEPENDENCY GRAPH ===\n" +
              "Nodes: \(.graph.nodes | length)\n" +
              "Edges: \(.graph.edges | length)\n\n" +
              "Top dependencies:\n" +
              (.graph.edges[:10] | map("  \(.from) → \(.to)") | join("\n"))
            else
              "Dependencies: \(. | join(", "))"
            end
          '
          ;;
        *)
          echo "$data" | jq '.' 2>/dev/null || echo "$data"
          ;;
      esac
      ;;
  esac
}

# Apply documentation filter
apply_doc_filter() {
  local data="$1"
  
  if [ "$ONLY_DOCS" = true ]; then
    # Only show documentation files
    echo "$data" | jq 'if type == "array" then 
      map(select(.kind == "doc" or .extension == ".md" or .extension == ".mdx"))
    elif type == "object" and .files then
      .files |= with_entries(select(.value.kind == "doc"))
    else . end'
  elif [ "$SHOW_DOCS" = false ]; then
    # Hide documentation files by default
    echo "$data" | jq 'if type == "array" then 
      map(select(.kind != "doc" and .extension != ".md" and .extension != ".mdx"))
    elif type == "object" and .files then
      .files |= with_entries(select(.value.kind != "doc"))
    else . end'
  else
    echo "$data"
  fi
}

# Command: overview
cmd_overview() {
  local cache_key="overview:$FORMAT:$SHOW_DOCS:$ONLY_DOCS"
  
  if cached=$(check_cache "$cache_key"); then
    echo "${CYAN}[Cache hit]${NC}" >&2
    echo "$cached"
    return
  fi
  
  echo "${YELLOW}Generating project overview...${NC}" >&2
  
  # Extract key information from index
  local result=$(jq '{
    version: .version,
    generated: .generated,
    project: .project,
    techStack: .techStack,
    stats: .stats,
    routes: .routes[:10],
    hotspots: (
      .reverse | 
      if . then 
        to_entries | 
        sort_by(.value | length) | 
        reverse | 
        .[0:5] | 
        map({file: .key, dependents: (.value | length)})
      else [] end
    ),
    architecture: {
      framework: (if .techStack.dependencies | contains(["next"]) then "Next.js" 
                  elif .techStack.dependencies | contains(["react"]) then "React"
                  else "Unknown" end),
      database: (if .techStack.dependencies | contains(["@supabase/supabase-js"]) then "Supabase"
                elif .techStack.dependencies | contains(["prisma"]) then "Prisma"
                else "None detected" end),
      stateManagement: (if .techStack.dependencies | contains(["zustand"]) then "Zustand"
                       elif .techStack.dependencies | contains(["redux"]) then "Redux"
                       elif .techStack.dependencies | contains(["mobx"]) then "MobX"
                       else "None detected" end),
      styling: (if .techStack.dependencies | contains(["tailwindcss"]) then "Tailwind CSS"
               elif .techStack.dependencies | contains(["styled-components"]) then "Styled Components"
               else "CSS" end),
      testing: (if .techStack.devDependencies | contains(["vitest"]) then "Vitest"
               elif .techStack.devDependencies | contains(["jest"]) then "Jest"
               else "None detected" end)
    }
  }' "$PROJECT_INDEX")
  
  result=$(apply_doc_filter "$result")
  update_cache "$cache_key" "$result"
  format_output "$result" "overview"
}

# Command: techstack
cmd_techstack() {
  echo "${YELLOW}Analyzing tech stack...${NC}" >&2
  
  jq '{
    framework: .techStack,
    architecture: {
      routes: (.routes | length),
      components: (.files | with_entries(select(.value.path | test("components/"))) | length),
      hooks: (.files | with_entries(select(.value.path | test("hooks/"))) | length),
      apis: (.routes | map(select(.type == "api")) | length),
      tests: .stats.testFiles
    },
    dependencies: {
      production: .techStack.dependencies,
      development: .techStack.devDependencies
    }
  }' "$PROJECT_INDEX" | format_output - "techstack"
}

# Command: dir
cmd_dir() {
  local path="${1:-.}"
  local deep="${2:-false}"
  local show_files="${3:-false}"
  local with_deps="${4:-false}"
  
  echo "${YELLOW}Querying directory: $path${NC}" >&2
  
  local query=".directories"
  if [ "$path" != "." ]; then
    query="$query | with_entries(select(.key | startswith(\"$path\")))"
  fi
  
  if [ "$show_files" = true ]; then
    query="$query | to_entries | map({
      dir: .key,
      fileCount: .value.fileCount,
      subdirs: .value.subdirs,
      files: (\$files | with_entries(select(.key | startswith(.key + \"/\"))) | keys)
    })"
  fi
  
  local result=$(jq --argjson files '.files' "$query" "$PROJECT_INDEX")
  result=$(apply_doc_filter "$result")
  format_output "$result" "dir"
}

# Command: file
cmd_file() {
  local path="$1"
  local show_deps="${2:-false}"
  local show_rdeps="${3:-false}"
  
  if [ -z "$path" ]; then
    echo "${RED}Error: File path required${NC}"
    exit 1
  fi
  
  echo "${YELLOW}Querying file: $path${NC}" >&2
  
  # Get file info
  local file_info=$(jq --arg path "$path" '.files[$path] // null' "$PROJECT_INDEX")
  
  if [ "$file_info" = "null" ]; then
    echo "${RED}File not found: $path${NC}"
    exit 1
  fi
  
  # Build result object
  local result=$(jq --arg path "$path" '{
    file: $path,
    info: .files[$path],
    imports: (.graph.edges | map(select(.from == $path)) | map(.to)),
    importedBy: (.reverse[$path] // []),
    route: ((.routes | map(select(.file == $path)) | .[0]) // null)
  }' "$PROJECT_INDEX")
  
  format_output "$result" "file"
}

# Command: deps
cmd_deps() {
  local target="${1:-}"
  local show_graph="${2:-false}"
  
  echo "${YELLOW}Analyzing dependencies...${NC}" >&2
  
  if [ -n "$target" ]; then
    # Dependencies for specific file/directory
    jq --arg target "$target" '{
      target: $target,
      dependencies: (.graph.edges | map(select(.from | startswith($target))) | map(.to) | unique),
      dependents: (.reverse | to_entries | map(select(.key | startswith($target))) | map(.value) | flatten | unique)
    }' "$PROJECT_INDEX"
  else
    # Overall dependency analysis
    jq '{
      graph: .graph,
      topDependencies: (
        .reverse | to_entries |
        sort_by(-.value | length) |
        .[0:10] |
        map({file: .key, dependentCount: (.value | length)})
      ),
      orphans: (
        .files | keys - (.graph.edges | map(.from, .to) | unique) |
        map(select(. | test("\\.tsx?$")))
      )
    }' "$PROJECT_INDEX" | format_output - "deps"
  fi
}

# Command: search
cmd_search() {
  local pattern="$1"
  local in_type="${2:-all}"  # code, docs, all
  
  if [ -z "$pattern" ]; then
    echo "${RED}Error: Search pattern required${NC}"
    exit 1
  fi
  
  echo "${YELLOW}Searching for: $pattern${NC}" >&2
  
  # Build search filter based on type
  local filter=""
  case "$in_type" in
    code)
      filter='select(.value.kind == "code" or .value.kind == "test")'
      ;;
    docs)
      filter='select(.value.kind == "doc")'
      ;;
    *)
      filter='select(true)'
      ;;
  esac
  
  # Search in file paths and return matches
  jq --arg pattern "$pattern" "
    .files | with_entries($filter) |
    with_entries(select(.key | test(\$pattern; \"i\"))) |
    to_entries | map({
      path: .key,
      kind: .value.kind,
      extension: .value.extension,
      size: .value.size
    })
  " "$PROJECT_INDEX" | format_output - "search"
}

# Command: docs
cmd_docs() {
  local check_type="${1:-all}"  # all, stale, orphans
  
  echo "${YELLOW}Analyzing documentation...${NC}" >&2
  
  case "$check_type" in
    stale)
      # Find potentially stale docs (not modified recently)
      local cutoff=$(date -d "30 days ago" +%s 2>/dev/null || date -v-30d +%s)
      jq --arg cutoff "$cutoff" '
        .files | with_entries(select(.value.kind == "doc")) |
        with_entries(select((.value.modified | fromdateiso8601) < ($cutoff | tonumber))) |
        to_entries | map({
          path: .key,
          lastModified: .value.modified,
          daysOld: ((now - (.value.modified | fromdateiso8601)) / 86400 | floor)
        })
      ' "$PROJECT_INDEX"
      ;;
    orphans)
      # Find docs not referenced anywhere
      jq '
        .files | with_entries(select(.value.kind == "doc")) | keys as $docs |
        .graph.edges | map(.to) | unique as $referenced |
        $docs - $referenced
      ' "$PROJECT_INDEX"
      ;;
    *)
      # All documentation files
      jq '
        .files | with_entries(select(.value.kind == "doc")) |
        to_entries | map({
          path: .key,
          size: .value.size,
          modified: .value.modified
        }) | sort_by(.modified) | reverse
      ' "$PROJECT_INDEX"
      ;;
  esac | format_output - "docs"
}

# Agent-specific queries
cmd_agent() {
  local agent_type="$1"
  
  if [ -z "$agent_type" ]; then
    echo "${RED}Error: Agent type required${NC}"
    echo "Available: backend, ui-ux, architecture, supabase, docs, testing"
    exit 1
  fi
  
  echo "${YELLOW}Generating context for $agent_type agent...${NC}" >&2
  
  case "$agent_type" in
    backend)
      jq '{
        overview: "Backend-focused context",
        apiRoutes: (.routes | map(select(.type == "api"))),
        serverComponents: (.files | with_entries(select(.key | test("app/.*/.*\\.tsx?$"))) | keys[:20]),
        migrations: (.files | with_entries(select(.key | test("migrations/"))) | keys),
        edgeFunctions: (.files | with_entries(select(.key | test("functions/"))) | keys),
        services: (.files | with_entries(select(.key | test("(services|lib)/"))) | keys[:20]),
        config: (.files | with_entries(select(.value.extension | test("^\\.(env|json|ya?ml)$"))) | keys[:10])
      }' "$PROJECT_INDEX"
      ;;
      
    ui-ux|uiux)
      jq '{
        overview: "UI/UX-focused context",
        components: (.files | with_entries(select(.key | test("components/"))) | 
          with_entries(select(.value.extension == ".tsx")) | keys[:30]),
        elderlyComponents: (.files | with_entries(select(.key | test("elderly"))) | keys),
        styles: (.files | with_entries(select(.value.kind == "style")) | keys),
        publicAssets: (.files | with_entries(select(.key | test("^public/"))) | keys[:20]),
        hooks: (.files | with_entries(select(.key | test("hooks/"))) | keys),
        themes: (.files | with_entries(select(.key | test("(theme|design)"))) | keys)
      }' "$PROJECT_INDEX"
      ;;
      
    architecture)
      jq '{
        overview: "Architecture overview",
        structure: {
          totalFiles: .stats.totalFiles,
          codeFiles: .stats.codeFiles,
          testCoverage: ((.stats.testFiles / .stats.codeFiles * 100) | floor),
          routes: (.routes | length)
        },
        techStack: .techStack,
        hotspots: (.reverse | to_entries | sort_by(-.value | length) | .[0:10] | 
          map({file: .key, dependents: (.value | length)})),
        patterns: {
          hasStorePattern: (.files | keys | map(test("store")) | any),
          hasHooksPattern: (.files | keys | map(test("hooks/")) | any),
          hasServicesPattern: (.files | keys | map(test("services/")) | any)
        }
      }' "$PROJECT_INDEX"
      ;;
      
    supabase)
      jq '{
        overview: "Supabase-focused context",
        clients: (.files | with_entries(select(.key | test("supabase/(client|server|middleware)"))) | keys),
        migrations: (.files | with_entries(select(.key | test("migrations/.*\\.sql$"))) | keys),
        functions: (.files | with_entries(select(.key | test("functions/"))) | keys),
        types: (.files | with_entries(select(.key | test("types/database"))) | keys),
        config: (.files | with_entries(select(.key | test("supabase.*\\.(json|toml)$"))) | keys)
      }' "$PROJECT_INDEX"
      ;;
      
    docs)
      jq '{
        overview: "Documentation context",
        allDocs: (.files | with_entries(select(.value.kind == "doc")) | keys),
        recentDocs: (.files | with_entries(select(.value.kind == "doc")) | 
          to_entries | sort_by(-.value.modified) | .[0:10] | map(.key)),
        docsByDirectory: (.files | with_entries(select(.value.kind == "doc")) | 
          keys | map(split("/")[0]) | unique)
      }' "$PROJECT_INDEX"
      ;;
      
    testing)
      jq '{
        overview: "Testing context",
        testFiles: (.files | with_entries(select(.value.kind == "test")) | keys),
        testCoverage: {
          total: .stats.testFiles,
          percentage: ((.stats.testFiles / .stats.codeFiles * 100) | floor)
        },
        e2eTests: (.files | with_entries(select(.key | test("e2e|playwright"))) | keys),
        unitTests: (.files | with_entries(select(.key | test("\\.test\\."))) | keys[:20]),
        testConfig: (.files | with_entries(select(.key | test("(vitest|jest|playwright)\\.config"))) | keys)
      }' "$PROJECT_INDEX"
      ;;
      
    *)
      echo "${RED}Unknown agent type: $agent_type${NC}"
      echo "Available: backend, ui-ux, architecture, supabase, docs, testing"
      exit 1
      ;;
  esac
}

# Show help
show_help() {
  cat << EOF
${BLUE}Enhanced Index Query CLI v3.0${NC}

${GREEN}Usage:${NC}
  query-index.sh <command> [arguments] [options]

${GREEN}Global Options:${NC}
  --format <table|json|md>  Output format (default: table)
  --show-docs               Include documentation files (hidden by default)
  --only-docs               Show only documentation files

${GREEN}Commands:${NC}

  ${CYAN}overview${NC} [--format <format>] [--show-docs]
    Show project overview with tech stack and architecture
    
  ${CYAN}techstack${NC} [--format <format>]
    Display detailed technology stack analysis
    
  ${CYAN}dir${NC} <path> [--deep] [--files] [--with-deps] [--show-docs|--only-docs]
    Query directory structure with optional file listing
    
  ${CYAN}file${NC} <path> [--deps] [--rdeps] [--tests] [--owners]
    Get file information with dependencies and references
    
  ${CYAN}deps${NC} [--target <path>] [--graph] [--format <format>]
    Analyze dependencies and reverse dependencies
    
  ${CYAN}search${NC} "<pattern>" [--in <code|docs|all>]
    Search for files matching regex pattern
    
  ${CYAN}docs${NC} [--stale] [--orphans]
    Analyze documentation files
    
  ${CYAN}agent${NC} <type>
    Get agent-specific context
    Types: backend, ui-ux, architecture, supabase, docs, testing

${GREEN}Examples:${NC}

  # Get project overview
  ./query-index.sh overview

  # Show tech stack in JSON format
  ./query-index.sh techstack --format json

  # List components directory with files
  ./query-index.sh dir components --files

  # Get file info with dependencies
  ./query-index.sh file app/page.tsx --deps

  # Search for test files
  ./query-index.sh search "\.test\." --in code

  # Get Supabase-specific context
  ./query-index.sh agent supabase

  # Find stale documentation
  ./query-index.sh docs --stale

  # Show only documentation files
  ./query-index.sh overview --only-docs

${GREEN}Token Budget:${NC}
  Maximum result size: ~$MAX_TOKEN_BUDGET tokens
  Results are cached for $((CACHE_TTL/60)) minutes

${GREEN}Agent Use Cases:${NC}
  
  ${MAGENTA}backend:${NC} API routes, migrations, edge functions
  ${MAGENTA}ui-ux:${NC} Components, styles, accessibility
  ${MAGENTA}architecture:${NC} System overview, patterns, hotspots
  ${MAGENTA}supabase:${NC} Database, RLS, functions
  ${MAGENTA}docs:${NC} Documentation structure and freshness
  ${MAGENTA}testing:${NC} Test coverage and configuration

${YELLOW}Documentation is hidden by default. Use --show-docs to include.${NC}
EOF
}

# Parse global options
parse_global_options() {
  while [[ $# -gt 0 ]]; do
    case $1 in
      --format)
        FORMAT="$2"
        shift 2
        ;;
      --show-docs)
        SHOW_DOCS=true
        ONLY_DOCS=false
        shift
        ;;
      --only-docs)
        ONLY_DOCS=true
        SHOW_DOCS=true
        shift
        ;;
      *)
        # Not a global option, return remaining args
        echo "$@"
        return
        ;;
    esac
  done
}

# Main command dispatcher
main() {
  check_dependencies
  init_cache
  
  # Parse global options first
  remaining_args=$(parse_global_options "$@")
  set -- $remaining_args
  
  # Get command
  local command="${1:-help}"
  shift
  
  case "$command" in
    overview)
      cmd_overview "$@"
      ;;
    techstack)
      cmd_techstack "$@"
      ;;
    dir)
      # Parse dir-specific options
      local path="${1:-.}"
      shift
      local deep=false
      local files=false
      local deps=false
      
      while [[ $# -gt 0 ]]; do
        case $1 in
          --deep) deep=true; shift ;;
          --files) files=true; shift ;;
          --with-deps) deps=true; shift ;;
          *) shift ;;
        esac
      done
      
      cmd_dir "$path" "$deep" "$files" "$deps"
      ;;
    file)
      local path="$1"
      shift
      local deps=false
      local rdeps=false
      
      while [[ $# -gt 0 ]]; do
        case $1 in
          --deps) deps=true; shift ;;
          --rdeps) rdeps=true; shift ;;
          *) shift ;;
        esac
      done
      
      cmd_file "$path" "$deps" "$rdeps"
      ;;
    deps)
      local target=""
      local graph=false
      
      while [[ $# -gt 0 ]]; do
        case $1 in
          --target) target="$2"; shift 2 ;;
          --graph) graph=true; shift ;;
          *) shift ;;
        esac
      done
      
      cmd_deps "$target" "$graph"
      ;;
    search)
      local pattern="$1"
      shift
      local in_type="all"
      
      while [[ $# -gt 0 ]]; do
        case $1 in
          --in) in_type="$2"; shift 2 ;;
          *) shift ;;
        esac
      done
      
      cmd_search "$pattern" "$in_type"
      ;;
    docs)
      local check_type="all"
      
      while [[ $# -gt 0 ]]; do
        case $1 in
          --stale) check_type="stale"; shift ;;
          --orphans) check_type="orphans"; shift ;;
          *) shift ;;
        esac
      done
      
      cmd_docs "$check_type"
      ;;
    agent)
      cmd_agent "$1"
      ;;
    help|--help|-h)
      show_help
      ;;
    *)
      echo "${RED}Unknown command: $command${NC}"
      echo "Run: ./query-index.sh help"
      exit 1
      ;;
  esac
}

# Run main function
main "$@"
