# AUGMENT_AI_ENHANCED_WORKFLOW_GUIDELINES.md
**Version:** 2.0
**Date:** May 8, 2025
**Project:** AI-Powered Social Learning Platform (Vietnam) - Elecosys

**Core Principles for Augment AI:**
1.  **Tool-Centric Execution:** Prioritize using the specified MCP servers for their designated tasks.
2.  **Materio First, Adapt Second:** Maximize reuse of `materio-mui-demo` assets by *copying and adapting*.
3.  **Sequential Task Processing:** Complete tasks one by one via the "TaskManager".
4.  **Persistent Context:** Actively use the "Knowledge Graph Memory Server" to build and recall project knowledge.
5.  **Precision & Consistency:** Adhere strictly to naming conventions, file structures, and i18n practices.
6.  **Clarity through Query:** If a task or instruction is ambiguous, ask for clarification before proceeding.

---

**I. Context Management & Knowledge Persistence**

1.  **"Knowledge Graph Memory Server" (Primary Context Store):**
    * **Usage:** For persistent storage and retrieval of project-specific knowledge across sessions.
    * **Actions:**
        * **On Task Start:** "Query 'Knowledge Graph Memory Server' for context related to task `[Task ID]`, and files/features: `[file/feature list]`."
        * **On Task Completion/Key Decision:** "Update 'Knowledge Graph Memory Server' with:
            * Task ID: `[Task ID]`
            * Summary: `[Brief summary of work done]`
            * New/Modified Files: `[List of paths]`
            * New Components Created: `[Component Name and Path]`
            * Materio Adaptations: `Original: [materio-path], Adapted to: [elecosys-path], Reason: [brief reason]`
            * New i18n Keys: `[key1, key2, ...]`
            * Key Decisions: `[Decision made and rationale]`
            * Theme Considerations: `[Notes on light/dark theme compatibility for new UI]`."
        * **Persistent Rules:** Store overarching rules like "Always ensure new components support light/dark themes using Materio variables" or "All user-facing strings require i18n keys."

2.  **"Context7" (Up-to-Date Documentation):**
    * **Usage:** To fetch current, version-specific documentation for libraries, APIs, or frameworks.
    * **Action:** When needing to understand usage of a specific library/API (e.g., Material UI, Supabase Client, Next.js features): "Fetch documentation for `[specific feature/API of library]` using `use context7`."

3.  **"Gitingest" (Codebase Snippets & Materio Assets):**
    * **Usage:** To retrieve specific file contents or directory structures from the `materio-mui-demo` GitHub repo (`https://github.com/mbpfws/materio-mui-demo`) or the current `elecosys` project.
    * **Action (Materio Reuse):** See Section III.
    * **Action (Project Context):** "Fetch the content of `[project_file_path]` using 'Gitingest' from the current repository to understand its structure/logic."

---

**II. Task Management & Complex Reasoning**

1.  **"TaskManager" MCP Server:**
    * **Usage:** To manage and process development tasks sequentially.
    * **Actions:**
        * **Initial Task Breakdown:** "For feature `[Feature Name]` described in `Detailed Technical Specification (v0.1).md Section X.X`, break it down into granular sub-tasks. Add each sub-task to the 'TaskManager' queue with a descriptive name."
        * **Processing:** "Fetch the next task from the 'TaskManager'. Process one task at a time."
        * **Completion:** "Mark task `[Task ID]` as complete in 'TaskManager' after successful implementation, logging context to 'Knowledge Graph Memory Server', and committing to Git."

2.  **"Clear Thought MCP Server" (Complex Problem Solving):**
    * **Usage:** For tasks requiring in-depth analysis, architectural decisions, or planning complex logic.
    * **Action:** "This task `[Task ID/Description]` involves complex logic/refactoring. Engage 'Clear Thought MCP Server' to:
        1.  Analyze the requirements from `[Source Document/Section]`.
        2.  Consider existing structures/code in `[relevant file paths]`.
        3.  Propose a step-by-step implementation plan.
        4.  Identify potential challenges and solutions."
    * _Self-correction:_ If a planned approach seems to conflict with Materio principles or existing project conventions, re-engage "Clear Thought MCP Server" with the new constraints.

---

**III. Code Development & Materio Integration**

1.  **Strict Materio Reuse Policy (The Golden Rule):**
    * **Step 1 (Search):** "Before creating any new UI component, page, or utility, use 'Gitingest' to search the `materio-mui-demo` repository (`https://github.com/mbpfws/materio-mui-demo`) for a similar existing asset. Keywords: `[relevant keywords]`."
        * Focus search on directories like `src/views/`, `src/components/`, `src/@core/components/`, `src/utils/`, `src/@core/utils/`.
    * **Step 2 (Copy if Found):** "If a suitable asset `[materio_file_path]` is found, instruct: 'Copy the content of `[materio_file_path]` using 'Gitingest'.'"
    * **Step 3 (Create & Paste):** Create a *new file* in the `elecosys` project.
        * **Directory:** Place files in their feature-specific or shared directory, adhering to `DIRECTORY_STRUCTURE.md` (e.g., `src/app/(dashboard)/writing-tools/components/MyAdaptedComponent.tsx`, `src/components/shared/AdaptedUtility.ts`).
        * Paste the copied code.
    * **Step 4 (Adapt):** **Crucially, adapt the copied code** to:
        * Integrate with Supabase Auth/data, NOT NextAuth or mock data.
        * Use Redux Toolkit for state if applicable (`src/redux-store/slices/`).
        * Implement project-specific types (`src/types/` or local feature types).
        * Apply i18n keys for all user-facing text (See Section IV).
        * Ensure adherence to `elecosys` project's ESLint & Prettier rules.
    * **Step 5 (Log):** "Log this adaptation in 'Knowledge Graph Memory Server' (Original: `[materio_file_path]`, Adapted to: `[elecosys_file_path]`, Task: `[Task ID]`)."

2.  **New Component Generation (If No Materio Asset):**
    * **Action:** "No suitable component found in `materio-mui-demo`. Generate a base React functional component using Material UI for `[description of component functionality and appearance]` with `@magicuidesign/mcp`."
    * Then, style and integrate this new component meticulously according to `materio-mui-demo` conventions (theme, styling, responsiveness).

3.  **File Naming & Structure:**
    * Strictly adhere to conventions in `DIRECTORY_STRUCTURE.md`.
    * New feature-specific components, pages, and logic go into their respective feature directories (e.g., `src/app/(dashboard)/[feature-name]/`).

---

**IV. Internationalization (i18n) - `next-international`**

* **Mandate:** ALL user-facing text strings MUST be internationalized.
* **Workflow for each new/modified string:**
    1.  **Key Creation:** Define a unique, descriptive key (e.g., `landing.hero.title`, `profile.settings.updateButton`).
    2.  **English Dictionary:** Add the English translation to `src/data/dictionaries/en.json`: `{ "key": "English text" }`.
    3.  **Vietnamese Dictionary:** Add/Update the Vietnamese translation (or placeholder) in `src/data/dictionaries/vi.json`: `{ "key": "Vietnamese text OR TODO_TRANSLATE English text" }`.
    4.  **Implementation:** Use the `t()` function from `useI18n` or `useScopedI18n` hooks with the key: `t('my.new.key')`.
    5.  **Log Keys:** "Add new/updated i18n keys `[list of keys]` to 'Knowledge Graph Memory Server' for task `[Task ID]`."

---

**V. Theming (Light/Dark Mode)**

* **Mandate:** All new/modified UI components MUST support both light and dark modes correctly.
* **Implementation:**
    * Use theme variables from Materio's theme setup (`src/@core/theme/palette.ts`, `themeConfig.ts`).
    * Test components in both modes.
    * "Ensure component `[Component Name]` is responsive to theme changes (light/dark) by using theme tokens for color, background, etc. Log this check in 'Knowledge Graph Memory Server'."

---

**VI. Testing**

1.  **"Playwright" MCP Server (UI Testing):**
    * **Usage:** For generating basic E2E or component interaction tests.
    * **Action (Post UI Implementation):** "For the newly implemented/modified UI for `[feature/component name]` in `[file_path]`, generate a Playwright test script using 'Playwright' server to verify:
        1.  `[Acceptance Criterion 1, e.g., Element X is visible]`
        2.  `[Acceptance Criterion 2, e.g., Clicking button Y triggers event Z]`
        Store the test in `tests/e2e/[feature_name].spec.ts` or `tests/component/[component_name].spec.ts`."
    * Adhere to testing requirements in `Detailed Technical Specification (v0.1) - Section VIII`.

---

**VII. Asset Generation**

1.  **"Gemini Image Gen 3.0":**
    * **Usage:** For creating placeholder images, illustrations for UI mockups, or conceptual visuals.
    * **Action:** "Generate an image for `[purpose, e.g., landing page hero section about AI learning]` using 'Gemini Image Gen 3.0'. Optimize and store it in `public/images/[relevant_subfolder]/image_name.png`."

---

**VIII. Version Control & Database Operations**

1.  **Augment AI GitHub Integration:**
    * **Usage:** For committing and pushing code changes.
    * **Action:** "After completing a task (or a logical set of sub-tasks) and logging to 'Knowledge Graph Memory Server':
        1.  Use the integrated GitHub tool to stage all relevant changes.
        2.  Generate a commit message based on `COMMIT_MESSAGE.md` template or a summary of the completed task from 'TaskManager'.
        3.  Commit and push the changes."
    * Commit frequently.

2.  **Augment AI Supabase Integration:**
    * **Usage:** For applying database migrations.
    * **Action (Schema Changes):**
        1.  "Ensure the SQL migration script `[migration_file_name.sql]` is correctly placed in `supabase/migrations/` as per `Detailed Technical Specification (v0.1) - Section VII.4`."
        2.  "Apply the latest Supabase migration using the integrated Supabase tool."
    * **Data Interaction:** All direct database interactions in code MUST use the Supabase client (`src/utils/supabase.ts`) and respect RLS policies.

---

**IX. General Workflow & Error Handling**

1.  **Adherence to Specifications:** The `Detailed Technical Specification (v0.1).md` and `High-Level Plan (v1.0).md` remain the primary sources of truth for *what* to build. These guidelines dictate *how* Augment AI builds it.
2.  **Error Handling Strategy:** Implement error handling as defined in `Detailed Technical Specification (v0.1) - Section 7`.
3.  **Landing Page Improvement:** When working on `src/app/landing/page.tsx` and its components:
    * Systematically apply the Materio reuse policy (Section III) for each section (Hero, Features, CTA, etc.).
    * Ensure all text is internationalized (Section IV).
    * Ensure responsiveness and correct theme application (Section V).
    * Refer to `LANDING_PAGE_REDESIGN_PLAN.md` for design goals, but prioritize component reuse and consistency from Materio.

---
This revised workflow should provide Augment AI with a much clearer, more efficient, and tool-driven approach to development, directly addressing the pain points you've experienced. Remember to instruct Augment AI to use this new document as its primary workflow guide.