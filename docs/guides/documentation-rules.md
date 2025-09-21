# Documentation Rules & Standards

> **Purpose**: Establish clear, enforceable documentation standards to prevent chaos and maintain project coherence.

## Core Principles

### 1. **Single Source of Truth**
- One authoritative document per topic
- No duplicate information across files
- Clear ownership and update responsibility

### 2. **Living Documentation**
- Documents must be updated when code changes
- Stale docs are worse than no docs
- Automated validation where possible

### 3. **Accessibility First**
- Clear, jargon-free language
- Structured headings and navigation
- Examples and code snippets included

## File Structure & Organization

### Root Level Files (Required)
```
├── README.md                    # Project overview, quick start
├── CLAUDE.md                    # AI agent instructions (NEVER MODIFY)
├── plan.md                      # Strategic planning and roadmap
├── tasks.md                     # Current task tracking (internal use)
├── events.md                    # Chronological project log
├── project-diagrams-descriptions.md  # Architecture overview
└── DOCUMENTATION_RULES.md       # This file
```

### Documentation Hierarchy
```
docs/
├── session_planning_[YYYYMMDD]_[HHMM]_[N]/  # Session artifacts
├── specs/                       # Feature specifications
├── architecture/                # System design documents  
├── user-uploads/               # External reference materials
└── decisions/                  # Architecture decision records
```

### Agent OS Structure (DO NOT MODIFY)
```
.agent-os/
├── instructions/               # Agent workflows
├── product/                    # Product mission and context
├── specs/                      # Detailed specifications
└── standards/                  # Code and process standards
```

## Documentation Types & Standards

### 1. **README.md** (Project Entry Point)
**REQUIRED SECTIONS:**
- Project overview (2-3 sentences)
- Quick start (< 5 steps)
- Tech stack (bulleted list)
- Development setup
- Key commands
- Links to detailed docs

**FORBIDDEN:**
- Implementation details (belongs in specs/)
- Changelog (use git history)
- TODO lists (use tasks.md)

### 2. **plan.md** (Strategic Overview)
**REQUIRED SECTIONS:**
- Objectives & success criteria
- Current phase and progress
- System map/architecture
- Implementation roadmap
- Risk assessment
- Next steps

**UPDATE FREQUENCY:** After major milestones or weekly

### 3. **events.md** (Project Journal)
**FORMAT:**
```markdown
## YYYY-MM-DD

### HH:MM:SS - Action Title
- **Action**: What was done
- **Observation**: What was discovered
- **Decision**: What was decided and why
```

**RULES:**
- Chronological order (newest first)
- Timestamp every entry
- Action-Observation-Decision format
- No editing past entries (append only)

### 4. **tasks.md** (Task Tracking)
**FORMAT:**
```markdown
## Phase N: Phase Name [STATUS]
- [x] Completed task with brief description
- [ ] Pending task with brief description
- [🚧] In-progress task with brief description
```

**RULES:**
- Organized by phases/sprints
- Brief descriptions only (details in specs/)
- Status indicators: ✅ ⏳ ❌ 🚧
- Internal use only (not for user delivery)

### 5. **Specifications** (Feature Details)
**LOCATION:** `docs/specs/[feature-name]/`

**REQUIRED FILES:**
- `spec.md` - Complete specification
- `spec-lite.md` - Executive summary
- `ui-ux-spec.md` - Design requirements
- `technical-spec.md` - Implementation details

**VALIDATION:** Must align with Agent OS standards

## Content Standards

### Language & Tone
- **Be Direct**: No fluff or marketing speak
- **Be Specific**: Concrete details, not vague descriptions  
- **Be Actionable**: Every document should enable action
- **Be Current**: Update dates and status indicators

### Code Documentation
- **Code Comments**: Only for non-obvious business logic
- **README per Module**: For complex components/utilities
- **API Documentation**: Auto-generated from code when possible
- **Database Schema**: Keep ERD and migration docs in sync

### Visual Standards
- **Headings**: Use semantic hierarchy (h1 > h2 > h3)
- **Code Blocks**: Always specify language for syntax highlighting
- **Lists**: Consistent bullet/number formatting
- **Links**: Descriptive link text, not "click here"

## Automation & Validation

### Automated Checks
- [ ] Documentation links are valid
- [ ] Code examples compile/execute
- [ ] Specs align with implemented features  
- [ ] Event stream follows format
- [ ] No duplicate information across files

### Update Triggers
- **Code Changes**: Update relevant specs and README
- **Architecture Changes**: Update diagrams and plan.md
- **Feature Completion**: Update tasks.md and events.md
- **Bug Fixes**: Log in events.md

## Enforcement Rules

### Required Reviews
1. **Documentation must be updated** before code merge
2. **Agent OS compliance** verified for all specs
3. **Link validation** for all cross-references
4. **Format consistency** checked against these rules

### Violation Consequences
- **Stale docs**: Mark as outdated, create update task
- **Missing docs**: Block feature completion
- **Duplicate info**: Consolidate immediately
- **Format violations**: Auto-fix where possible

### Responsibility Matrix
| Document Type | Owner | Reviewer | Update Frequency |
|---------------|-------|----------|------------------|
| README.md | Lead Dev | Team | Per release |
| plan.md | Product | Lead Dev | Weekly |
| events.md | Current Dev | None | Daily |
| tasks.md | Current Dev | None | Daily |
| Specs | Feature Dev | Lead Dev | Per feature |

## Quality Gates

### Documentation Definition of Done
- [ ] Purpose clearly stated
- [ ] Target audience identified
- [ ] Success criteria defined
- [ ] Examples provided where applicable
- [ ] Links validated
- [ ] Format follows standards
- [ ] Information is current and accurate

### Red Flags (Fix Immediately)
- ⚠️ "TODO: Add documentation"
- ⚠️ "See [broken link]"
- ⚠️ Last updated > 30 days ago
- ⚠️ Contradicts other documents
- ⚠️ No clear owner/maintainer

## Emergency Procedures

### When Documentation is Blocking
1. **Create minimal placeholder** with clear TODO
2. **Set deadline** for complete documentation
3. **Assign clear owner** for completion
4. **Block related work** until resolved

### When Documentation is Outdated
1. **Mark as OUTDATED** in header
2. **Create update task** in tasks.md
3. **Identify correct information** source
4. **Schedule update** within 48 hours

---

**Last Updated:** 2025-01-14  
**Owner:** Current Development Team  
**Review Schedule:** Monthly  
**Compliance:** Mandatory for all contributors