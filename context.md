# Context Orchestrator

<orchestrator version="1.0">
  <description>
    Centralized orchestrator for Claude Code context management. This is the single source of truth
    for context loading, execution patterns, and state management, replacing the legacy 7+ file system.
    Intelligent profile-based context loading for maximum relevance.

    Works in conjunction with:
    - CLAUDE.md: Execution workflows, standards, and guidelines
    - @agents/CLAUDE.md: Agent system configuration and capabilities
    - See CLAUDE.md#system-initialization for how this file is used
  </description>

  <!-- Core principles that ALWAYS apply -->
  <core-directives>
    <directive id="D01">**Prime Directive**: Execute user requests precisely. No scope creep.</directive>
    <directive id="D02">**State Management**: Always update event-stream.md, process-tracker.md, and product-tracker.md systematically.</directive>
    <directive id="D03">**Test-Driven**: Use TDD approach with browser MCP for all features and fixes.</directive>
    <directive id="D04">**Documentation**: Generate artifacts in docs/session/[session-id]/</directive>
    <directive id="D05">**MCP Priority**: Always use MCP tools (Shadcn, Supabase, Ref) before manual implementation.</directive>
  </core-directives>

  <!-- Conditional loading based on task type -->
  <load-profiles>
    <profile id="research">
      <description>Understanding existing code, analyzing systems, exploring concepts</description>
      <triggers>understand, analyze, investigate, explore, how does, explain</triggers>
      <files>
        <file priority="1">architecture-core.md</file>
        <file priority="2" optional="true">refs/data-flows.md</file>
        <file priority="3" optional="true">refs/state-management.md</file>
      </files>
      <serena-memories>
        <memory>project_overview</memory>
        <memory>project_structure</memory>
        <memory>code_conventions</memory>
      </serena-memories>
      <serena-actions>
        <!-- Practical reminders for actual usage -->
        <action>1. Load memory: mcp__serena__read_memory project_overview</action>
        <action>2. For code exploration: mcp__serena__get_symbols_overview (NOT full Read)</action>
        <action>3. Find implementations: mcp__serena__find_symbol [name]</action>
      </serena-actions>
      <serena-mode>planning</serena-mode>
      <serena-settings>depth: 0, include_body: false</serena-settings>
    </profile>

    <profile id="feature">
      <description>Implementing new functionality, adding capabilities</description>
      <triggers>implement, add, create, build, develop, feature</triggers>
      <files>
        <file priority="1">architecture-core.md</file>
        <file priority="2">refs/testing-strategy.md</file>
        <file priority="3">package.json</file>
        <file priority="4" optional="true">refs/design-patterns.md</file>
      </files>
      <serena-memories>
        <memory>project_overview</memory>
        <memory>code_conventions</memory>
        <memory>task_completion</memory>
      </serena-memories>
      <serena-actions>
        <action>1. Load memories: mcp__serena__read_memory code_conventions</action>
        <action>2. Before implementing: mcp__serena__find_symbol [existing_component]</action>
        <action>3. Check impact: mcp__serena__find_referencing_symbols [symbol]</action>
        <action>4. After completion: mcp__serena__write_memory [feature_pattern] "implementation"</action>
      </serena-actions>
      <serena-mode>editing</serena-mode>
      <serena-settings>depth: 1, include_body: true</serena-settings>
    </profile>

    <profile id="bugfix">
      <description>Fixing errors, debugging issues, resolving problems</description>
      <triggers>fix, error, bug, failing, broken, timeout, crash</triggers>
      <files>
        <file priority="1">architecture-core.md</file>
        <file priority="2">package.json</file>
        <file priority="3" optional="true">refs/testing-strategy.md</file>
      </files>
      <serena-memories>
        <memory>project_overview</memory>
        <memory>suggested_commands</memory>
        <memory>code_conventions</memory>
      </serena-memories>
      <serena-actions>
        <action>1. Find error source: mcp__serena__search_for_pattern [error_message]</action>
        <action>2. Understand context: mcp__serena__find_symbol [problematic_function]</action>
        <action>3. Check references: mcp__serena__find_referencing_symbols</action>
      </serena-actions>
      <serena-mode>interactive</serena-mode>
      <serena-settings>depth: 2, include_body: true</serena-settings>
    </profile>

    <profile id="ui">
      <description>UI/UX work, component creation, styling</description>
      <triggers>component, ui, ux, design, style, layout, responsive</triggers>
      <files>
        <file priority="1">refs/design-patterns.md</file>
        <file priority="2">components/ui/CLAUDE.md</file>
        <file priority="3">tailwind.config.ts</file>
      </files>
      <mcp-tools>mcp__shadcn__*</mcp-tools>
      <serena-memories>
        <memory>project_overview</memory>
        <memory>code_conventions</memory>
      </serena-memories>
      <serena-actions>
        <action>1. Find existing components: mcp__serena__search_for_pattern "export.*Component"</action>
        <action>2. Understand structure: mcp__serena__get_symbols_overview components/</action>
        <action>3. Check usage: mcp__serena__find_referencing_symbols [ComponentName]</action>
      </serena-actions>
      <serena-mode>editing</serena-mode>
      <serena-settings>depth: 1, include_body: false</serena-settings>
    </profile>

    <profile id="database">
      <description>Database operations, migrations, Supabase work</description>
      <triggers>database, table, migration, rls, supabase, sql</triggers>
      <files>
        <file priority="1">refs/security-layers.md</file>
        <file priority="2">supabase/migrations/</file>
      </files>
      <mcp-tools>mcp__supabase__*</mcp-tools>
      <serena-memories>
        <memory>project_overview</memory>
        <memory>suggested_commands</memory>
      </serena-memories>
      <serena-actions>
        <action>1. Find schema references: mcp__serena__search_for_pattern "supabase.*from"</action>
        <action>2. Check API usage: mcp__serena__find_symbol [table_name]</action>
        <action>3. Document changes: mcp__serena__write_memory database_schema "changes"</action>
      </serena-actions>
      <serena-mode>editing</serena-mode>
      <serena-settings>depth: 1, include_body: true</serena-settings>
    </profile>

    <profile id="default">
      <description>Fallback for general tasks or unclear requests</description>
      <files>
        <file priority="1">architecture-core.md</file>
        <file priority="2">README.md</file>
      </files>
      <serena-memories>
        <memory>project_overview</memory>
        <memory>suggested_commands</memory>
      </serena-memories>
      <serena-actions>
        <action>1. Start with: mcp__serena__read_memory project_overview</action>
        <action>2. Explore structure: mcp__serena__list_dir .</action>
      </serena-actions>
      <serena-mode>planning</serena-mode>
      <serena-settings>depth: 0, include_body: false</serena-settings>
    </profile>
  </load-profiles>

  <!-- React Loop: 8-step execution pattern -->
  <react-loop>
    <description>Systematic 8-step loop for all task execution</description>

    <step id="0" name="Understand">
      <action>Analyze user request to determine task type and profile</action>
      <output>Task classification (research/feature/bugfix/ui/database)</output>
    </step>

    <step id="1" name="Load_Context">
      <action>Load files based on identified profile from load-profiles</action>
      <serena-checkpoint>After loading: mcp__serena__think_about_collected_information</serena-checkpoint>
      <output>Minimal, relevant context loaded and validated</output>
    </step>

    <step id="2" name="Plan">
      <action>Update process-tracker.md or product-tracker.md with high-level objectives and phases</action>
      <output>Structured plan with clear phases and goals</output>
    </step>

    <step id="3" name="Taskify">
      <action>Break plan into atomic tasks in process-tracker.md or product-tracker.md</action>
      <output>Checkbox list with (Phase.Task) numbering</output>
    </step>

    <step id="4" name="Execute">
      <action>Implement solution following red-green-refactor TDD cycle</action>
      <serena-checkpoint>Mid-execution: mcp__serena__think_about_task_adherence</serena-checkpoint>
      <output>Working code with tests</output>
    </step>

    <step id="5" name="Verify">
      <action>Run tests (unit, integration, e2e) and linting</action>
      <output>All tests passing, no lint errors</output>
    </step>

    <step id="6" name="Document">
      <action>Generate session artifacts and update documentation</action>
      <output>Artifacts in docs/session/[session-id]/</output>
    </step>

    <step id="7" name="Log_Loop">
      <action>Log outcome to event-stream.md, loop to step 4 if incomplete</action>
      <serena-checkpoint>Before looping: mcp__serena__think_about_whether_you_are_done</serena-checkpoint>
      <output>Event logged, task status updated</output>
    </step>
  </react-loop>

  <!-- Workflow Automaton for chain invocation decisions -->
  <workflow-automaton>
    <description>State-based workflow selection with phase transitions</description>

    <states>
      <state id="INIT" phase="0-1">
        <agents>context-fetcher</agents>
        <transitions>
          <transition condition="profile_loaded">PLANNING</transition>
          <transition condition="unknown_pattern">CUSTOM_BUILD</transition>
        </transitions>
      </state>

      <state id="PLANNING" phase="2-3">
        <agents>brainstormer, tree-of-thought</agents>
        <parallel-topical enabled="true" trigger="file_count > 10">
          <domains>AUTO_DETECT from PROJECT_INDEX.json</domains>
        </parallel-topical>
        <transitions>
          <transition condition="plan_complete">EXECUTION</transition>
          <transition condition="needs_research">RESEARCH</transition>
          <transition condition="needs_multiple_solutions">PARALLEL_BRAINSTORM</transition>
        </transitions>
      </state>

      <state id="CUSTOM_BUILD" phase="dynamic">
        <process>
          <step>MAP task to capability requirements</step>
          <step>QUERY available agents for capabilities</step>
          <step>CONSTRUCT minimal spanning chain</step>
          <step>INJECT checkpoints for validation</step>
        </process>
        <transitions>
          <transition condition="workflow_created">EXECUTION</transition>
          <transition condition="fallback">MANUAL_INTERVENTION</transition>
        </transitions>
      </state>

      <state id="PARALLEL_BRAINSTORM" phase="2-3">
        <agents parallel="true">brainstormer(3x)</agents>
        <process>
          <step>Generate 3+ solutions in parallel</step>
          <step>Score each solution</step>
          <step>Vote on best approach</step>
        </process>
        <transitions>
          <transition condition="consensus_reached">EXECUTION</transition>
          <transition condition="no_consensus">PLANNING</transition>
        </transitions>
      </state>

      <state id="EXECUTION" phase="4-5">
        <agent-selector>
          <condition type="ui">ui-ux-spec, mcp__shadcn__*</condition>
          <condition type="database">supabase-architect, supabase-implementation</condition>
          <condition type="mixed">PARALLEL(ui-ux-spec, database-agent)</condition>
          <condition type="custom">COMPOSE from capability_matrix</condition>
        </agent-selector>
        <index-update trigger="code_changes > threshold" parallel="true">
          <agents>index-analyzer per domain</agents>
        </index-update>
        <transitions>
          <transition condition="tests_passing">VERIFICATION</transition>
          <transition condition="tests_failing">TDD_LOOP</transition>
        </transitions>
      </state>

      <state id="TDD_LOOP" phase="4-5">
        <process>
          <step>Run failing tests with test-runner</step>
          <step>Implement minimal fix</step>
          <step>Verify tests pass</step>
          <step>Refactor if needed</step>
        </process>
        <browser-mcp-testing>
          <step>browser_navigate to test URL</step>
          <step>browser_snapshot for references</step>
          <step>browser_interact for user flows</step>
          <step>browser_screenshot for validation</step>
        </browser-mcp-testing>
        <transitions>
          <transition condition="all_tests_pass">VERIFICATION</transition>
          <transition condition="max_iterations">MANUAL_INTERVENTION</transition>
        </transitions>
      </state>

      <state id="VERIFICATION" phase="6">
        <agents>postflight-validator</agents>
        <checklist>
          <check>All tests passing</check>
          <check>Documentation updated</check>
          <check>No architectural drift</check>
          <check>Process compliance met</check>
        </checklist>
        <transitions>
          <transition condition="all_checks_pass">COMPLETION</transition>
          <transition condition="checks_failing">EXECUTION</transition>
        </transitions>
      </state>

      <state id="COMPLETION" phase="7">
        <agents>architecture-maintainer</agents>
        <actions>
          <action>Update event-stream.md</action>
          <action>Mark tasks complete in process-tracker.md or product-tracker.md</action>
          <action>Generate session artifacts</action>
          <action>Parallel topical updates if needed</action>
        </actions>
      </state>
    </states>

    <transition-rules>
      <rule id="complexity_threshold">5</rule>
      <rule id="parallel_trigger">domains > 3</rule>
      <rule id="custom_trigger">no_matching_pattern OR novel_requirement</rule>
      <rule id="max_tdd_iterations">10</rule>
    </transition-rules>

    <capability-matrix>
      <agent name="brainstormer">solution_generation, architecture_design</agent>
      <agent name="ui-ux-spec">interface_design, accessibility, component_specs</agent>
      <agent name="tree-of-thought">entity_mapping, dependency_analysis</agent>
      <agent name="supabase-architect">database_design, migration_planning</agent>
      <agent name="test-runner">test_execution, failure_analysis</agent>
      <agent name="postflight-validator">completion_verification, quality_gates</agent>
      <agent name="index-analyzer">code_structure, topical_extraction</agent>
      <agent name="architecture-maintainer">truth_validation, drift_detection</agent>
    </capability-matrix>
  </workflow-automaton>

  <!-- Session artifact generation rules -->
  <artifact-rules>
    <rule id="A1">Session ID format: YYYYMMDD-HHMMSS-[short-uuid]</rule>
    <rule id="A2">Directory: docs/session/[session-id]/</rule>
    <rule id="A3">Required files: session-info.md, plan.md, outcomes.md</rule>
    <rule id="A4">Optional files: specs/, diagrams/, test-results/</rule>
  </artifact-rules>

  <!-- Event logging format -->
  <event-format>
    <template>HH:MM:SS | SESSION:[id] | TYPE | ACTION | OUTCOME | DETAILS</template>
    <types>CONTEXT, PLAN, TASK, EXECUTE, VERIFY, DOC, ERROR, AGENT</types>
    <example>14:30:00 | SESSION:a1b2c3d4 | CONTEXT | LOAD | SUCCESS | Loaded 'research' profile (3 files)</example>
    <subagent-format>HH:MM:SS | SESSION:[id] | AGENT:[type] | ACTION | REQUEST:[id] | DETAILS</subagent-format>
  </event-format>

  <!-- MCP tool priorities -->
  <mcp-priority>
    <priority level="1">index-analyzer agent - Code structure analysis via PROJECT_INDEX.json</priority>
    <priority level="2">mcp__serena__* - Code navigation and search</priority>
    <priority level="3">mcp__supabase__* - Database operations</priority>
    <priority level="4">mcp__shadcn__* - UI component discovery</priority>
    <priority level="5">mcp__ref__* - Documentation lookup</priority>
    <priority level="6">mcp__browser__* - E2E testing</priority>
  </mcp-priority>

  <!-- Project structure reference -->
  <app-structure>
    <folder path="/app" purpose="Next.js pages and API routes">
      <subfolder path="api/" count="6" purpose="Backend endpoints"/>
      <subfolder path="[pages]/" count="12" purpose="Questionnaire flow"/>
      <subfolder path="pdf-templates/" purpose="HTML for PDF generation"/>
    </folder>
    <folder path="/components" purpose="React components" count="24">
      <subfolder path="ui/" count="20" purpose="Radix-based UI components"/>
      <subfolder path="questionnaire/" count="4" purpose="Form components"/>
    </folder>
    <folder path="/lib" purpose="Business logic">
      <subfolder path="medical/" purpose="Decision engine, ICD-10/TARMED"/>
      <subfolder path="pdf/" purpose="PDF generation with Puppeteer"/>
      <subfolder path="stores/" purpose="Zustand state management"/>
    </folder>
    <folder path="/supabase" purpose="Backend services">
      <subfolder path="functions/" count="2" purpose="Edge Functions"/>
      <subfolder path="migrations/" count="3" purpose="Database schema"/>
    </folder>
    <folder path="/.claude" purpose="Automation and memory">
      <subfolder path="hooks/" count="12" purpose="Automation scripts"/>
      <subfolder path="state/" purpose="Pipeline state tracking"/>
    </folder>
  </app-structure>
</orchestrator>

<!-- Import project-specific instructions -->
@CLAUDE.md

<!-- Import current session state -->
@event-stream.md
@process-tracker.md
@product-tracker.md
