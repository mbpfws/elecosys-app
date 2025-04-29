---

**Detailed Technical Specification: AI-Powered Social Learning Platform (Vietnam) - MVP**

**Version:** 0.1 (Draft)

**Date:** April 29, 2025

**Based on:** High-Level Plan v1.0 (Dated: April 28, 2025)

---

**Table of Contents**

1. Introduction & Overview
2. Proposed File & Directory Structure
3. Detailed Feature Specifications (MVP)
3.1. User Authentication & Profiles
3.2. AI Mini-App: IELTS Writing Tools (`/app/writing-tools`)
3.3. AI Mini-App: IELTS Adaptive Test (`/app/new-ielts-adaptive`)
3.4. AI Chatbots (Tutor & Contextual Help)
3.5. Basic Admin Dashboard
3.6. Vietnamese UI (i18n)
4. API Endpoint Specifications (Internal & External)
5. Data Models & Database Schema (Supabase PostgreSQL)
6. Non-Functional Requirements (NFRs) - Detailed
7. Error Handling Strategy
8. Deployment & Infrastructure Considerations
9. Implementation Notes & Considerations

---

# **1. Introduction & Overview**

- **Project Goal:** To develop and launch the Minimum Viable Product (MVP) of an AI-Powered Social Learning Platform tailored for the Vietnamese market, initially focusing on IELTS preparation. The platform aims to provide a unified environment for AI-driven learning tools, progress tracking, and basic user management, laying the foundation for future expansion.
- **Reference Document:** This specification elaborates on the **High-Level Plan (Version 1.0, April 28, 2025)**.
- **Purpose of this Document:** To provide a detailed, actionable technical blueprint for the development team. It breaks down MVP features into granular requirements, specifies technical implementation details, defines data structures and APIs, and mandates the reuse and adaptation of components and patterns from the `materio-mui-demo` reference codebase to ensure consistency and accelerate development.
- **Audience:** Software Developers, QA Testers, Project Managers, System Administrators.

# **2. Proposed File & Directory Structure**

The project will adopt the structure established by `materio-mui-demo`, extending it to accommodate the new features. The goal is to maintain consistency with Materio's conventions for components, hooks, styles, types, utils, configuration, and API routes.

```markdown
.
├── public/                 # Static assets (images, fonts, etc.) - Reuse Materio's structure
├── src/
│   ├── @core/              # Core Materio components, theme, styles, utils (TO BE REUSED EXTENSIVELY)
│   │   ├── components/     # Reusable low-level UI components
│   │   ├── theme/          # MUI theme configuration, overrides, color schemes
│   │   ├── styles/         # Core global styles, utility styles
│   │   ├── utils/          # Core utility functions
│   │   └── ...             # Other core elements
│   ├── @layouts/           # Layout components (Vertical, Horizontal, Blank) - Reuse VerticalLayout
│   │   └── ...
│   ├── @menu/              # Menu generation logic & components - Adapt for new navigation items
│   │   └── ...
│   ├── app/                # Next.js App Router directory
│   │   ├── (blank-layout)/ # Layout for unauthenticated pages (Login, Register)
│   │   │   └── pages/
│   │   │       ├── login/
│   │   │       │   └── page.tsx # Adapt Materio UI for Supabase Auth
│   │   │       └── register/
│   │   │           └── page.tsx # Adapt Materio UI for Supabase Auth
│   │   ├── (dashboard)/      # Main authenticated layout (Vertical)
│   │   │   ├── writing-tools/    # IELTS Writing Tools mini-app (Directly under dashboard)
│   │   │   │   ├── page.tsx
│   │   │   │   ├── components/ # Specific components for Writing Tools
│   │   │   │   ├── hooks/      # Specific hooks for Writing Tools
│   │   │   │   └── types/      # Specific types for Writing Tools
│   │   │   ├── new-ielts-adaptive/ # IELTS Adaptive Test mini-app (Directly under dashboard)
│   │   │   │   ├── page.tsx
│   │   │   │   ├── components/ # Test UI, Question renderers, etc.
│   │   │   │   ├── hooks/      # Adaptive logic hooks
│   │   │   │   ├── services/   # AI interaction logic
│   │   │   │   └── types/      # Specific types
│   │   │   ├── chat/             # AI Tutor Chat (Adapting Materio's Chat App - Placed directly under dashboard)
│   │   │   │   ├── page.tsx        # Main chat interface (adapting src/views/apps/chat/Chat.tsx)
│   │   │   │   └── ...             # Reused/adapted chat components
│   │   │   ├── pages/            # Standard pages within the dashboard layout
│   │   │   │   ├── account-settings/ # Reused from Materio for User Profile/API Key
│   │   │   │   │   └── page.tsx
│   │   │   │   └── ...
│   │   │   ├── admin/            # Admin Dashboard Section (Restricted Access)
│   │   │   │   ├── users/          # User Management
│   │   │   │   │   ├── list/         # Adapt src/views/apps/user/list/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── view/[userId]/ # Adapt src/views/apps/user/view/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── stats/          # Usage Statistics View
│   │   │   │   │   └── page.tsx      # Reuse components from src/views/dashboards/crm/
│   │   │   │   ├── content-management/ # AI Tool Content Management
│   │   │   │   │   └── page.tsx      # New UI for prompts, schemas, etc.
│   │   │   │   └── layout.tsx        # Potentially specific admin sub-layout/auth check
│   │   │   └── layout.tsx        # Main dashboard layout wrapper (using @layouts/VerticalLayout)
│   │   ├── api/                  # Next.js API Routes
│   │   │   ├── auth/             # Auth-related endpoints (potentially callbacks if needed by Supabase)
│   │   │   ├── users/            # User profile API (GET, PUT)
│   │   │   ├── mini-apps/        # Endpoints for AI mini-app interactions
│   │   │   │   ├── writing-tools/  # Generate prompt, submit essay, get analysis
│   │   │   │   └── adaptive-test/  # Generate question, submit answer, get result
│   │   │   ├── ai/               # AI service interaction endpoints (Chatbots)
│   │   │   │   ├── tutor/          # Endpoint for general AI Tutor
│   │   │   │   └── contextual-help/ # Endpoint for contextual help
│   │   │   └── admin/            # Admin-specific API endpoints
│   │   │       ├── users/          # CRUD for users (list, view, update status/role/details)
│   │   │       ├── stats/          # Fetch aggregated stats
│   │   │       └── content/        # CRUD for AI content/prompts
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Root page (e.g., redirect or landing if not logged in)
│   │   └── globals.css         # Global styles (Merge with Materio's)
│   ├── assets/                 # Static assets (images, fonts, etc.) - Reuse Materio's structure
│   ├── components/             # Global reusable application components (beyond @core)
│   │   ├── layout/             # Layout sub-components (e.g., UserDropdown, Notifications) - Reuse/Adapt Materio's
│   │   ├── theme/              # Theme provider components - Reuse Materio's
│   │   └── ...                 # Other shared components (e.g., ContextualHelpPopover)
│   ├── configs/                # Application configuration
│   │   ├── themeConfig.ts      # Materio theme config (REUSED)
│   │   ├── i18n.ts             # i18n config (REUSED, add 'vi')
│   │   └── navigation/         # Menu item definitions (Adapt Materio's structure)
│   │       ├── vertical/index.ts
│   │       └── horizontal/index.ts
│   ├── contexts/               # React Context providers
│   │   └── SettingsContext.tsx # Materio settings context (REUSED)
│   │   └── AuthContext.tsx     # NEW: Manage Supabase auth state and user profile data
│   │   └── ...                 # Potentially others (e.g., AIUsageContext)
│   ├── data/                   # Static data, dictionaries
│   │   └── dictionaries/       # i18n JSON files
│   │       ├── en.json         # (REUSED)
│   │       ├── vi.json         # (NEW)
│   │       └── ...
│   ├── hooks/                  # Global custom hooks
│   ├── libs/                   # External libraries configuration/styling wrappers (e.g., MUI, TippTap) - Reuse Materio's structure
│   │   ├── styles/             # Styles for libs (tiptapEditor.css REUSED)
│   │   └── ...
│   ├── redux-store/            # Redux Toolkit store configuration and slices (Adopt Materio's pattern)
│   │   ├── index.ts            # Store setup
│   │   └── slices/             # Feature slices (e.g., userProfileSlice, writingToolSlice, adaptiveTestSlice, adminUserSlice)
│   ├── styles/                 # Global and utility styles
│   ├── types/                  # Global TypeScript types and interfaces
│   └── utils/                  # Global utility functions
├── supabase/                   # Supabase specific files (migrations, functions if any)
│   └── migrations/           # SQL migration files managed by Supabase CLI
├── .env.local                  # Local environment variables (Supabase keys, Gemini keys)
├── .eslintrc.json
├── .gitignore
├── next.config.ts              # (REUSED/ADAPTED from Materio)
├── package.json                # (Based on Materio, add Supabase, Gemini SDK, Tiptap, Redux deps)
├── tailwind.config.ts          # (REUSED/ADAPTED from Materio)
├── tsconfig.json               # (REUSED/ADAPTED from Materio)
└── README.md
```

**Justification:**

- **Materio Reuse:** Maximizes reuse of `@core`, `@layouts`, `@menu`, `src/components`, `src/configs`, `src/libs`, `src/styles`, `src/types`, `src/utils` for UI consistency, theme application, and development speed.
- **App Router:** Utilizes Next.js 15 App Router conventions with distinct layouts for blank (unauthenticated) and dashboard (authenticated) routes.
- **Integrated Mini-Apps:** Places AI mini-apps (`writing-tools`, `new-ielts-adaptive`) and the Chat (`chat`) directly under `/app/(dashboard)/`, integrating them as primary features within the authenticated user experience. Each retains its own components, hooks, services, and types for modularity.
- **Admin Section:** Isolates admin functionalities under `/app/(dashboard)/admin/` for clarity and easier route protection.
- **API Routes:** Organizes API endpoints logically based on features (auth, users, mini-apps, ai, admin).
- **State Management:** Incorporates `src/redux-store/` following Materio's pattern, replacing the HLP's original Zustand plan as per user clarification.
- **i18n:** Integrates Vietnamese (`vi.json`) into Materio's existing i18n structure (`src/data/dictionaries/`).
- **Supabase Integration:** Includes a `supabase/migrations` directory for schema management using Supabase CLI. `AuthContext.tsx` is added for handling Supabase auth state.
- **Configuration:** Leverages Materio's `src/configs/` for theme, navigation, and i18n setup.

# **3. Detailed Feature Specifications (MVP)**

## **3.1. User Authentication & Profiles**

- **Feature Goal:** To provide secure user registration, login, and profile management capabilities, enabling users to access platform features and securely store personal information, including an optional Gemini API key. This system must differentiate between 'Student' and 'Admin' roles.
- **User Stories:**
    - As a new user, I want to register for an account using my email and password so that I can access the platform.
    - As a registered user, I want to log in securely using my email and password so that I can access my profile and learning tools.
    - As a logged-in user, I want to view and update my basic profile information (name, avatar) so that my profile is accurate.
    - As a logged-in user (Student), I want to securely add, view (partially masked), and update my personal Google Gemini API key so that I can utilize AI features beyond the free tier limitations.
    - As a logged-in user, I want my session to persist so that I don't have to log in repeatedly.
    - As a logged-in user, I want to log out securely.
    - As an Administrator, I want the system to recognize my role so that I can access administrative features.
- **Functional Requirements:**
    1. **FR-AUTH-001:** The system shall allow new users to register using an email address and a password.
    2. **FR-AUTH-002:** The system shall validate email format and password complexity during registration (e.g., min 8 characters, combination of letters, numbers, symbols - use Supabase Auth defaults/config).
    3. **FR-AUTH-003:** The system shall use Supabase Authentication for user registration and login processes.
    4. **FR-AUTH-004:** The system shall securely hash and store user passwords (handled by Supabase Auth).
    5. **FR-AUTH-005:** The system shall allow registered users to log in using their email and password.
    6. **FR-AUTH-006:** The system shall handle failed login attempts (e.g., incorrect password, user not found) and provide appropriate user feedback (Leverage Supabase Auth error handling).
    7. **FR-AUTH-007:** The system shall establish and manage user sessions upon successful login (using Supabase Auth session management).
    8. **FR-AUTH-008:** The system shall allow logged-in users to log out, terminating their session.
    9. **FR-AUTH-009:** The system shall automatically create a corresponding record in the `profiles` table upon successful user registration via Supabase Auth (using Supabase Triggers/Functions is recommended).
    10. **FR-AUTH-010:** The system shall fetch and display the logged-in user's profile information (name, email, avatar URL) from the `profiles` table.
    11. **FR-AUTH-011:** The system shall allow logged-in users to update their display name and avatar URL in their profile. Uploading avatars requires storage integration (Supabase Storage recommended).
    12. **FR-AUTH-012:** The system shall provide an input field (type="password") for users to enter their Google Gemini API key within their account settings.
    13. **FR-AUTH-013:** The system shall securely store the user-provided Gemini API key in the `profiles` table. The key MUST be encrypted before saving (See Implementation Notes).
    14. **FR-AUTH-014:** The system shall allow users to update or remove their stored Gemini API key. When displayed (e.g., for confirmation), the key should be masked (e.g., showing only the last 4 characters).
    15. **FR-AUTH-015:** The system shall associate each user with a role (default 'Student' on registration). Admin role assignment is handled via the Admin Dashboard (See Section 3.5).
    16. **FR-AUTH-016:** The system shall manage authentication state globally using a dedicated React Context (`src/contexts/AuthContext.tsx`).
    17. **FR-AUTH-017:** User profile data (excluding sensitive keys) shall be managed via a Redux slice (`src/redux-store/slices/userProfileSlice.ts`).
- **UI/UX Flow Details:**
    - **Registration:**
        - User accesses the registration page (`/register`).
        - **UI Reuse:** Adapt the Materio registration page UI (`src/app/(blank-layout)/pages/register/page.tsx`). Reuse form components (`@core/components/mui/TextField`, `@core/components/mui/Button`, etc.) and styling.
        - User enters email, password, and potentially confirms password.
        - User clicks "Register" button.
        - On success: Redirect to login page or dashboard (TBD, login preferred first). Display success message (e.g., using `@core/components/mui/Snackbar`).
        - On failure: Display specific error messages inline or via Snackbar (e.g., "Email already exists", "Password too weak").
    - **Login:**
        - User accesses the login page (`/login`).
        - **UI Reuse:** Adapt the Materio login page UI (`src/app/(blank-layout)/pages/login/page.tsx`). Reuse form components and styling.
        - User enters email and password.
        - User clicks "Login" button.
        - On success: Redirect to the main dashboard (`/`). Session is established.
        - On failure: Display error message ("Invalid credentials").
    - **Profile Management (Account Settings):**
        - User navigates to the Account Settings page (e.g., via user dropdown menu in the header). Target route: `/pages/account-settings`.
        - **UI Reuse:** Reuse the Materio Account Settings page structure (`src/views/pages/account-settings/AccountSettings.tsx`) and its tabbed interface (`src/views/pages/account-settings/AccountTab.tsx`, `SecurityTab.tsx`, etc.).
        - **Account Tab:** Adapt `AccountTab.tsx`. Display user's email (read-only). Allow editing Display Name (`TextField`). Provide an Avatar upload component (potentially reusing/adapting components like `src/views/forms/form-elements/file-uploader/FileUploaderSingle.tsx` configured for Supabase Storage). Display current avatar (`@core/components/mui/Avatar`). Include a "Save Changes" button.
        - **Security Tab:** Adapt `SecurityTab.tsx`. Add a dedicated section for "API Key Management". Include a `TextField` (type="password") for entering/updating the Gemini API Key. Display the *status* (e.g., "Key Set" or "Not Set") and potentially the last 4 characters if set. Include "Save Key" and "Remove Key" buttons. Password change functionality can be deferred post-MVP unless critical (requires Supabase Auth flow).
    - **Logout:**
        - User clicks "Logout" option (e.g., in the user dropdown menu - adapt `src/components/layout/shared/UserDropdown.tsx`).
        - System terminates the Supabase session and redirects the user to the login page (`/login`).
- **Input Validations (Client & Server-side using Zod):**
    - **Registration:**
        - Email: Required, must be a valid email format.
        - Password: Required, meets complexity requirements (e.g., `z.string().min(8)`).
    - **Login:**
        - Email: Required, valid email format.
        - Password: Required, not empty.
    - **Profile Update:**
        - Display Name: Optional, string, max length (e.g., 50 chars).
        - Avatar URL: Optional, string, valid URL (if not using direct upload).
    - **API Key:**
        - Gemini Key: Optional, string, must match typical API key patterns (e.g., alphanumeric, specific length if known - add validation if possible).
- **Acceptance Criteria:**
    - Users can successfully register and log in using email/password via Supabase Auth.
    - Login/Registration UI matches Materio theme and uses adapted components.
    - Logged-in users have persistent sessions managed by Supabase and reflected in `AuthContext`.
    - Users can view and update their display name and avatar via the Account Settings page.
    - Users can securely add, update, and remove their Gemini API key via the Account Settings page. The key is encrypted in the database.
    - User profile data is available in the Redux store after login.
    - Users can successfully log out.
    - Error handling for auth processes provides clear feedback.
    - A `profiles` record is automatically created upon user registration.
- **Implementation Notes:**
    - Use the `supabase-js` client library for all interactions with Supabase Auth (signup, signin, signout, session management, user updates).
    - Implement `src/contexts/AuthContext.tsx` to subscribe to Supabase's `onAuthStateChange` listener. This context will hold the current session, user object, and potentially loading/error states. It should coordinate with Redux actions to populate/clear `userProfileSlice`.
    - Implement `src/redux-store/slices/userProfileSlice.ts` using Redux Toolkit to store non-sensitive profile data (user ID, name, email, avatar URL, role, API key status - *not the key itself*). Fetch this data after `AuthContext` confirms authentication.
    - **API Key Encryption:** Storing user-provided secrets requires careful handling.
        - **Recommended:** Use a Supabase Edge Function (`/api/users/update-api-key`?) triggered from the client. This function receives the raw key, encrypts it using a secret key stored securely in Supabase Vault (accessible only to the function), and then saves the encrypted key to the `profiles` table. Decryption would happen similarly in functions that need to use the key.
        - **Alternative:** Database-level encryption (e.g., using `pgsodium`) if feasible and manageable within Supabase.
        - **Avoid:** Storing raw keys or performing encryption/decryption directly on the client-side.
    - **Profile Creation Trigger:** Use a Supabase Database Function and Trigger (`on auth.users insert`) to automatically create a corresponding row in the public `profiles` table when a new user signs up in the `auth.users` table. Populate default values (e.g., role='Student').
    - **Avatar Upload:** Integrate with Supabase Storage. Create a dedicated bucket with appropriate access policies (e.g., users can upload to their own folder, public read access). Store the avatar URL in the `profiles` table. Reuse/adapt Materio file upload components.

## **3.2 AI Mini-App: IELTS Writing Tools (`/writing-tools`)**

- **Feature Goal:** To provide students with an environment to practice IELTS Writing tasks (Task 1 & 2 for MVP), receive AI-generated prompts, compose responses in a rich-text editor, and obtain AI-powered analysis and scoring based on IELTS criteria, with results saved to their profile.
- **Reference Context:** This feature draws inspiration from the provided `IELTS Writing AI-Powered Application - Detailed Outline` and related markdown files (`01-project-overview-and-architecture.md`, `04-ai-integration.md`, `05-ui-components-part*.md`, `06-implementation-guide-part*.md`), adapting concepts like the Tiptap editor, AI analysis flow, and feedback structure to fit the MVP scope and integrate with the Materio theme and our specified tech stack (Redux, Supabase). Features from the reference like interactive learning tools, advanced outline generation, PDF reports, Task 1 image analysis, and premium features are considered **Post-MVP**.
- **User Stories:**
    - As a Student, I want to select either IELTS Writing Task 1 or Task 2 so that I can practice the specific task type.
    - As a Student, I want to receive an AI-generated writing prompt relevant to the selected task type so that I have a topic to write about.
    - As a Student, I want to use a text editor with basic formatting (bold, italics, lists, strikethrough, highlighters, tables) to write my essay response.
    - As a Student, I want to submit my written essay for analysis so that I can get feedback on my performance.
    - As a Student, I want to receive an AI-generated score and feedback based on IELTS criteria (Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy) so that I understand my strengths and weaknesses.
    - As a Student, I want my essay, the prompt, and the AI feedback/score to be saved to my profile so that I can review my practice history.
- **Functional Requirements:**
    1. **FR-WRT-001:** The system shall allow users to select the desired IELTS Writing Task type (Task 1 or Task 2) via UI controls (e.g., Tabs, Buttons).
        - **UI Reuse:** Use Materio's `Tabs` component (`@mui/material/Tabs`) or `ToggleButtonGroup` (`@mui/material/ToggleButtonGroup`) styled according to the theme.
    2. **FR-WRT-002:** The system shall provide a button to trigger the generation of an AI-powered IELTS writing prompt specific to the selected task type.
        - **UI Reuse:** Use Materio's `Button` component (`@core/components/mui/Button`).
    3. **FR-WRT-003:** The system shall call a dedicated backend API endpoint (`/api/mini-apps/writing-tools/generate-prompt`) to request the prompt from the Google Gemini API.
    4. **FR-WRT-004:** The system shall display the generated prompt clearly to the user.
        - **UI Reuse:** Display within a Materio `Card` (`@mui/material/Card`) or a dedicated styled container.
    5. **FR-WRT-005:** The system shall provide a rich text editor using Tiptap for users to compose their essay response.
        - **Tiptap Integration:** Integrate Tiptap editor (`@tiptap/react`, `@tiptap/starter-kit`).
        - **Styling:** Apply styles defined in `src/libs/styles/tiptapEditor.css` (from Materio demo) and potentially customize further.
        - **Toolbar:** Include toolbar controls for basic formatting: Bold, Italic, Strikethrough, Bullet List, Ordered List, basic Highlighting (if feasible with Tiptap extensions), and Table creation/editing. Reuse Materio icons (`@mui/icons-material`) for toolbar buttons.
    6. **FR-WRT-006:** The system shall display a real-time word count for the user's essay.
    7. **FR-WRT-007:** The system shall provide a button for the user to submit their completed essay for analysis.
        - **UI Reuse:** Use Materio `Button`. Button should be disabled if the essay is empty or during analysis.
    8. **FR-WRT-008:** The system shall call a dedicated backend API endpoint (`/api/mini-apps/writing-tools/analyze-essay`) sending the essay content and the original prompt.
    9. **FR-WRT-009:** The backend API shall interact with the Google Gemini API, using carefully engineered prompts (inspired by reference doc `constants/prompts.ts` if applicable) to evaluate the essay based on the 4 official IELTS writing criteria. The API should request a structured response (JSON).
    10. **FR-WRT-010:** The system shall parse the structured JSON response containing scores (overall and per criterion) and textual feedback (suggestions for improvement). Define a specific JSON schema for this response (see Data Models/API Specs).
    11. **FR-WRT-011:** The system shall display the analysis results to the user, including:
        - Overall band score (or numerical equivalent).
        - Scores for each of the 4 criteria.
        - Textual feedback and suggestions.
        - **UI Reuse:** Use Materio `Card` components to structure the feedback display. Potentially use `LinearProgress` or custom components inspired by reference docs (`ScoreCards`) for visualizing scores, styled according to Materio theme. Display textual feedback in formatted text areas.
    12. **FR-WRT-012:** The system shall save the practice session results (prompt, user essay, AI analysis JSON, scores, timestamps, task type) to the `mini_app_results` table in the Supabase database, linked to the user's profile.
    13. **FR-WRT-013:** The system shall manage the state of the writing tool (selected task, prompt, essay content, loading states for prompt generation/analysis, analysis results) using a dedicated Redux slice (`src/redux-store/slices/writingToolSlice.ts`).
    14. **FR-WRT-014:** All user-facing text shall be localized using the i18n system (Vietnamese for MVP - see Section 3.6).
- **UI/UX Flow Details:**
    1. User navigates to the Writing Tools page (`/writing-tools`) via the main navigation (sidebar).
        - **Layout:** The page uses the standard authenticated layout (`src/app/(dashboard)/layout.tsx` with `@layouts/VerticalLayout.tsx`).
    2. User selects Task Type (Task 1 / Task 2) using `Tabs` or `ToggleButtonGroup` at the top. Default to Task 2.
    3. User clicks the "Generate Prompt" (`Button`). A loading indicator is shown.
    4. The AI-generated prompt is displayed in a dedicated `Card`.
    5. The Tiptap editor is presented below the prompt, with its formatting toolbar.
    6. User types their essay into the Tiptap editor. The word count updates in real-time nearby.
    7. User clicks the "Analyze Essay" (`Button`). A loading indicator (e.g., overlay on the feedback section or disabling the button with a spinner) is shown.
    8. Upon receiving results:
        - The loading indicator stops.
        - A new section appears (e.g., below the editor or in a separate column/tab if using a more complex layout later) displaying the feedback.
        - **Feedback Display:** Use `Card`s to organize:
            - Overall Score (e.g., large font size).
            - Criterion Scores (e.g., using `Typography`, potentially with `LinearProgress` indicators).
            - Detailed Feedback/Suggestions (formatted text).
        - **UI Inspiration:** Adapt layout ideas from reference docs (e.g., multi-column potentially, but keep MVP simple - single column flow is acceptable). Reuse Materio components (`Card`, `CardContent`, `Typography`, `LinearProgress`, `Divider`).
    9. The result is automatically saved in the background to `mini_app_results`. A success notification (`Snackbar`) can be shown briefly.
    10. User can then generate a new prompt or navigate away.
- **Input Validations (Client & Server-side using Zod):**
    - Essay Content: Required for analysis, minimum length check (e.g., > 50 words?) can be added. Sanitize HTML input from Tiptap on the server before sending to AI (using libraries like `dompurify`).
    - API Payloads: Validate structure and types for API requests/responses.
- **Acceptance Criteria:**
    - Users can select Task 1 or Task 2.
    - Users can successfully generate relevant AI prompts for the selected task type.
    - Users can write and format text using the Tiptap editor (with specified controls).
    - Real-time word count is displayed accurately.
    - Users can submit essays and receive AI-generated scores (overall, per criterion) and textual feedback.
    - Feedback is displayed clearly using Materio components.
    - Practice results (prompt, essay, feedback, scores) are successfully saved to the `mini_app_results` table associated with the user.
    - Loading states are handled appropriately during AI interactions.
    - The feature state is managed correctly via the `writingToolSlice` in Redux.
    - All UI elements are styled consistently with the Materio theme and localized in Vietnamese.
- **Implementation Notes:**
    - **Tiptap Setup:** Install `@tiptap/react`, `@tiptap/starter-kit`, and potentially extensions for highlighting/tables. Configure the editor instance with required extensions and toolbar controls. Ensure styles from `src/libs/styles/tiptapEditor.css` are applied.
    - **API Endpoints:** Implement:
        - `POST /api/mini-apps/writing-tools/generate-prompt`: Takes `{ taskType: 'Task 1' | 'Task 2' }`, returns `{ prompt: string }`. Handles Gemini interaction.
        - `POST /api/mini-apps/writing-tools/analyze-essay`: Takes `{ prompt: string, essayHtml: string, taskType: 'Task 1' | 'Task 2' }`, returns structured analysis JSON `{ overallScore: number, criteriaScores: { TR: number, CC: number, LR: number, GRA: number }, feedback: string, /* other fields based on final schema */ }`. Handles HTML sanitization and Gemini interaction for analysis. Uses user's or platform's Gemini key based on logic defined in API handler.
    - **Redux State (`writingToolSlice`):** Manage `taskType`, `currentPrompt`, `essayContent` (HTML string from Tiptap), `wordCount`, `isGeneratingPrompt`, `isAnalyzing`, `analysisResult` (parsed JSON or null), `error` states. Use Redux Toolkit Query (RTK Query) or standard async thunks for API interactions.
    - **Result Saving:** The `analyze-essay` API endpoint should be responsible for saving the result to the `mini_app_results` table after successfully getting analysis from Gemini. Include `user_id`, `app_name` ('IELTS Writing Tools'), `task_type`, `prompt`, `user_answer` (essay HTML), `ai_response` (full analysis JSON), specific score fields (`base_score`=overall, `evaluation_score`=criteria map), `cefr_level` (if derivable), `skill_type` ('Writing'), `created_at`.
    - **Prompt Engineering:** Develop robust prompts for Gemini for both prompt generation and essay analysis, ensuring structured JSON output for analysis. Base prompts on IELTS criteria and potentially adapt ideas from reference docs (`constants/prompts.ts`).
    - **Error Handling:** Implement robust error handling for API calls (Gemini errors, network issues) and display user-friendly messages using Materio `Snackbar` or inline alerts.

## **3.3 AI Mini-App: IELTS Adaptive Test (`/new-ielts-adaptive`)**

- **Feature Goal:** To provide students with an adaptive testing experience for core IELTS skills (Reading, Vocabulary, Grammar for MVP). The system should present AI-generated questions, adjust difficulty based on user performance in real-time, provide immediate feedback on answers (correct/incorrect for MVP), and save a summary report of the session to the user's profile.
- **Reference Context:** This feature specification draws inspiration from the provided `IELTS Adaptive Test - Comprehensive UI Design and Flow Documentation` and associated markdown files (`01-project-overview-and-architecture.md` to `08-getting-started-guide.md`). However, the MVP implementation will be significantly simplified. **MVP Scope:** Focus on the core adaptive loop (Get Question -> Answer -> Evaluate -> Adjust Difficulty -> Get Next Question) for Reading, Vocabulary, and Grammar skills only. Complex configuration options, the full range of question types (14+ reading, 9+ grammar, 11+ vocab), detailed multi-part speaking/writing integration, sophisticated scoring reports, and advanced anti-cheating mechanisms described in the reference docs are **Post-MVP**. We will use Redux Toolkit for state management, not the Context hierarchy described in the reference.
- **User Stories:**
    - As a Student, I want to start an adaptive test session focusing on core English skills (Reading, Vocabulary, Grammar) so that I can practice under test-like conditions that adjust to my level.
    - As a Student, I want to be presented with one question at a time, generated by AI based on my current estimated skill level.
    - As a Student, I want to answer various interactive question types (e.g., multiple-choice, fill-in-the-blank) relevant to the skill being tested.
    - As a Student, I want to submit my answer and receive immediate feedback (correct/incorrect for MVP) so I know how I performed on that question.
    - As a Student, I want the difficulty of the next question to adjust based on my performance on previous questions.
    - As a Student, I want to complete the test session (e.g., after a set number of questions or time) and view a summary report of my performance (e.g., overall score estimate, number correct/incorrect).
    - As a Student, I want the summary report of my adaptive test session to be saved to my profile for later review.
- **Functional Requirements:**
    1. **FR-ADT-001:** The system shall allow users to initiate a new adaptive test session via a "Start Test" button.
        - **UI Reuse:** Use Materio `Button`.
    2. **FR-ADT-002:** The system shall call a backend API endpoint (`/api/mini-apps/adaptive-test/start-session`) to initialize the test session, setting default parameters (e.g., starting difficulty, initial skills - Reading, Grammar, Vocabulary rotation for MVP). This endpoint returns a unique `sessionId`.
    3. **FR-ADT-003:** The system shall request the first question by calling a backend API endpoint (`/api/mini-apps/adaptive-test/get-next-question`) with the `sessionId` and current state (e.g., initial difficulty, skill).
    4. **FR-ADT-004:** The backend shall interact with the Google Gemini API to generate a question based on the current skill, difficulty level, and potentially session history. The AI MUST return a structured JSON payload representing the question (type, content, options, correct answer identifier). Define a standardized Question Schema (see Data Models/API Specs).
    5. **FR-ADT-005:** The system shall parse the question JSON and dynamically render the question content and appropriate interactive input components based on the question type specified in the schema.
        - **MVP Question Types:** Support at least:
            - Multiple Choice (Single Answer) - `RadioGroup`
            - Multiple Choice (Multiple Answers) - `CheckboxGroup`
            - Fill-in-the-Blank (Single blank) - `TextField`
        - **UI Reuse:** Utilize Materio form components (`@mui/material/RadioGroup`, `@mui/material/FormControlLabel`, `@mui/material/Checkbox`, `@core/components/mui/TextField`, `Card` for question display).
    6. **FR-ADT-006:** The system shall allow the user to select/enter their answer and submit it via a "Submit Answer" button.
        - **UI Reuse:** Use Materio `Button`. Button should be disabled until an answer is provided.
    7. **FR-ADT-007:** The system shall call a backend API endpoint (`/api/mini-apps/adaptive-test/submit-answer`) sending the `sessionId`, `questionId`, and the user's `answer`.
    8. **FR-ADT-008:** The backend shall evaluate the user's answer against the correct answer (stored from the question generation step or requested again from AI if necessary). It calculates if the answer was correct/incorrect and determines the next difficulty level based on a simplified MVP adaptation logic (e.g., correct -> increase difficulty slightly, incorrect -> decrease difficulty slightly).
    9. **FR-ADT-009:** The `submit-answer` API shall return the evaluation result (e.g., `{ isCorrect: boolean, explanation?: string (Post-MVP), nextDifficulty: number, endSession: boolean }`).
    10. **FR-ADT-010:** The system shall display immediate feedback to the user (e.g., "Correct" / "Incorrect" indicator).
        - **UI Reuse:** Use simple text, icons (`@mui/icons-material/CheckCircleOutline`, `HighlightOff`), or subtle background color changes on the answer choices/input field.
    11. **FR-ADT-011:** After feedback is shown (and potentially a short delay), the system shall automatically request the next question using the updated difficulty level (`get-next-question` API call), unless the `endSession` flag is true.
    12. **FR-ADT-012:** The test session shall end after a predefined number of questions (e.g., 15-20 total for MVP) or a set time limit (Post-MVP). The `submit-answer` response will indicate session end.
    13. **FR-ADT-013:** Upon session completion, the system shall display a summary report page/section showing:
        - Total questions answered.
        - Number of correct/incorrect answers.
        - Estimated final difficulty level or score band (simple mapping for MVP).
        - **UI Reuse:** Use Materio `Card`, `Typography`, potentially `LinearProgress` or simple stats display components.
    14. **FR-ADT-014:** The system shall automatically save the session summary (sessionId, userId, final score/level estimate, number correct/incorrect, skills tested, timestamps) to the `mini_app_results` table in the Supabase database upon session completion.
    15. **FR-ADT-015:** The system shall manage the state of the adaptive test (sessionId, current question data, user's current answer, score/difficulty tracking, loading states) using a dedicated Redux slice (`src/redux-store/slices/adaptiveTestSlice.ts`).
    16. **FR-ADT-016:** All user-facing text shall be localized using the i18n system (Vietnamese for MVP - see Section 3.6).
- **UI/UX Flow Details:**
    1. User navigates to the Adaptive Test page (`/new-ielts-adaptive`) via the main navigation.
        - **Layout:** The page uses the standard authenticated layout (`@layouts/VerticalLayout.tsx`).
    2. User clicks "Start Test" (`Button`). A loading indicator is shown while the session initializes and the first question is fetched.
    3. The main test interface appears, likely within a `Card` or dedicated section:
        - Displays the current question number (e.g., "Question 1 / 20").
        - Displays the question content (text, instructions).
        - Displays the interactive answer component (RadioGroup, Checkboxes, TextField) based on the question type schema.
        - Displays the "Submit Answer" `Button`.
    4. User interacts with the answer component (selects radio/checkbox, types in text field).
    5. User clicks "Submit Answer". The button may show a loading state briefly.
    6. The answer component provides feedback (e.g., highlighting correct/incorrect choice, showing a checkmark/cross icon).
    7. After a brief moment (e.g., 1-2 seconds), the UI transitions:
        - Clears the feedback highlights.
        - Shows a loading state for the next question.
        - Fetches and renders the next question, updating the question number.
    8. Steps 4-7 repeat until the session end condition is met (e.g., 20 questions answered).
    9. Upon receiving the `endSession: true` flag from the `submit-answer` response, the UI navigates or transitions to display the Summary Report section.
        - **Summary Display:** Use Materio components (`Card`, `CardContent`, `Typography`, `List`, `ListItem`) to show key statistics (Score/Level, Correct/Incorrect, Total Questions).
    10. The session result is saved in the background. A "Test Complete" message or similar confirmation is shown. User can navigate away or potentially start a new test (button might be provided on summary).
- **Input Validations (Client & Server-side using Zod):**
    - User Answers: Ensure answer format matches question type expectation (e.g., string for fill-in-the-blank, selected value for multiple choice). Validate on the server before evaluation.
    - API Payloads: Validate structure and types for all API requests/responses related to the adaptive test.
- **Acceptance Criteria:**
    - Users can successfully start an adaptive test session covering Reading, Grammar, and Vocabulary (MVP).
    - AI-generated questions are presented one at a time, rendered correctly based on their type schema (MCQ, Fill-in-blank for MVP).
    - Users can submit answers and receive immediate correct/incorrect feedback.
    - The system fetches subsequent questions based on adaptive logic (difficulty adjusts based on correctness for MVP).
    - The test session concludes after a predefined number of questions.
    - A summary report showing basic performance metrics is displayed at the end.
    - The session summary is successfully saved to the `mini_app_results` table associated with the user.
    - Loading states are handled during API interactions (starting session, getting questions, submitting answers).
    - Feature state is managed correctly via the `adaptiveTestSlice` in Redux.
    - All UI elements are styled consistently with the Materio theme and localized in Vietnamese.
- **Implementation Notes:**
    - **API Endpoints:** Implement:
        - `POST /api/mini-apps/adaptive-test/start-session`: Body `{ userId }` (from session), returns `{ sessionId: string }`. Initializes session state on the backend (e.g., in Redis cache or DB table).
        - `POST /api/mini-apps/adaptive-test/get-next-question`: Body `{ sessionId: string, currentDifficulty?: number, currentSkill?: string, history?: any[] (optional for more complex adaptation later) }`, returns `{ question: QuestionSchemaJSON, questionId: string, skill: string }`. Interacts with Gemini, selects skill (simple rotation for MVP), adapts difficulty.
        - `POST /api/mini-apps/adaptive-test/submit-answer`: Body `{ sessionId: string, questionId: string, answer: any }`, returns `{ isCorrect: boolean, nextDifficulty: number, endSession: boolean }`. Evaluates answer, updates session state (score, difficulty), checks for end condition. Triggers saving results if `endSession` is true.
    - **Redux State (`adaptiveTestSlice`):** Manage `sessionId`, `currentQuestion` (parsed JSON), `currentAnswer` (user input state), `currentSkill`, `currentDifficulty`, `questionsAnsweredCount`, `correctAnswersCount`, `isLoading`, `isSubmitting`, `sessionEnded`, `finalSummary` (report data). Use RTK Query or async thunks for API calls.
    - **Question Rendering:** Implement a component (e.g., `QuestionRenderer.tsx`) that takes the question JSON and dynamically renders the appropriate Materio input component based on `question.type`.
    - **Adaptive Logic (MVP):** Keep simple on the backend. Start at a default difficulty (e.g., level 3/5). If `isCorrect`, `nextDifficulty = currentDifficulty + 0.5` (capped at 5). If `!isCorrect`, `nextDifficulty = currentDifficulty - 0.5` (capped at 1). The `get-next-question` API uses this `nextDifficulty` to inform the Gemini prompt.
    - **Skill Rotation (MVP):** Simple backend rotation: Reading -> Grammar -> Vocabulary -> Reading -> ...
    - **Result Saving:** When `endSession` is true, the `submit-answer` API should trigger saving to `mini_app_results`. Include `user_id`, `app_name` ('IELTS Adaptive Test'), `final_score` (e.g., estimated band based on final difficulty), `evaluation_score` (JSON `{ correct: number, incorrect: number, total: number }`), `skill_type` ('Mixed' or comma-separated 'Reading,Grammar,Vocabulary'), `level` (final difficulty), `created_at`.
    - **Prompt Engineering:** Develop prompts for Gemini to generate questions of specific types (MCQ, Fill-in-blank) for specific skills (Reading, Grammar, Vocab) at varying difficulty levels, ensuring structured JSON output. Adapt ideas from reference docs (`skills/.../prompts`).
    - **Error Handling:** Handle API errors gracefully, potentially allowing the user to retry submitting an answer or notifying them if the test cannot continue. Use `Snackbar` for feedback.

## **3.4 AI Chatbots (Tutor & Contextual Help)**

- **Feature Goal:** To provide users with AI-powered assistance for their learning journey. This includes a general AI Tutor for IELTS/English queries and contextual help integrated within mini-apps to explain specific concepts or results.
- **Reference Context:** Leverages the UI patterns from Materio's Chat App demo (`src/views/apps/chat/`) and adapts concepts potentially found in reference files like `app/language-tools/hooks/useChat.ts`, `app/api/ai/tutor/route.ts`, `app/api/ai/contextual-help/route.ts`, `app/student/reading-practice/components/AITutor/index.ts`, `app/student/reading-practice/components/ContextualHelp/index.ts`.
- **User Stories:**
    - **Tutor:** As a Student, I want to ask general questions about English grammar, vocabulary, or IELTS strategies in a chat interface so that I can get quick explanations and guidance.
    - **Tutor:** As a Student, I want the AI Tutor to remember the context of our current conversation so that the interaction feels natural.
    - **Contextual Help:** As a Student using a mini-app (e.g., Writing Tools, Adaptive Test), I want to ask the AI for clarification about a specific score, feedback point, or question I encountered so that I can better understand the results or concept.
    - **Contextual Help:** As a Student, I want to access contextual help easily via an icon near the relevant information.
    - **Contextual Help:** As a Student using contextual help, I want the option to continue the discussion in the main AI Tutor interface if needed.
- **Functional Requirements:**
    
    **Templated AI Tutor (`/chat`):**
    
    1. **FR-CHT-001:** The system shall provide a dedicated chat interface accessible via a primary navigation link (e.g., `/chat`).
    2. **FR-CHT-002:** The system shall adapt the user interface from Materio's Chat App (`src/views/apps/chat/Chat.tsx`, `ChatContent.tsx`, `SendMsgForm.tsx`).
    3. **FR-CHT-003:** Users shall be able to type messages into an input field and submit them.
        - **UI Reuse:** Adapt Materio's `SendMsgForm.tsx` using `@core/components/mui/TextField` and `Button` or `IconButton`.
    4. **FR-CHT-004:** Submitted user messages and subsequent AI responses shall be displayed sequentially in a chat history view.
        - **UI Reuse:** Adapt Materio's `ChatContent.tsx`, potentially using `Box`, `Avatar`, `Typography` styled according to the theme.
    5. **FR-CHT-005:** The system shall call a backend API endpoint (`/api/ai/tutor`) sending the user's message and potentially recent chat history for context.
    6. **FR-CHT-006:** The backend API shall interact with the Google Gemini API using a predefined system prompt establishing the AI's persona as an IELTS/English tutor. For MVP, the AI response will be based solely on this persona and the provided conversation history. No external document retrieval.
    7. **FR-CHT-007:** The system shall display the AI's response in the chat history. Loading indicators should be shown while waiting for the AI response.
    8. **FR-CHT-008:** The chat state (messages, loading status) shall be managed using a dedicated Redux slice (`src/redux-store/slices/chatSlice.ts`). Chat history persistence beyond the current session is Post-MVP.
    
    Contextual Help (Integrated):
    
    9.  FR-CHT-009: The system shall display a help icon (IconButton with e.g., @mui/icons-material/HelpOutline or QuestionMark) near relevant UI elements within mini-apps (e.g., next to a score in Writing Tools feedback, near a question in Adaptive Test).
    
    10. FR-CHT-010: Clicking the help icon shall open a pop-up chat interface.
    
    - UI Reuse: Use Materio's Popover (@mui/material/Popover) or a small Dialog (@mui/material/Dialog). The pop-up contains a simplified chat view (message display area, text input field, send button).
    
    11. FR-CHT-011: When the pop-up opens, the initiating component shall pass relevant context data (e.g., { feature: 'Writing Tools', context: { score: 7.5, criteria: 'Lexical Resource', userTextSnippet: '...' } } or { feature: 'Adaptive Test', context: { questionId: '...', questionText: '...', userAnswer: '...' } }).
    
    12. FR-CHT-012: Users shall be able to type a question related to the context into the pop-up's input field and submit it.
    
    13. FR-CHT-013: The system shall call a dedicated backend API endpoint (/api/ai/contextual-help) sending the user's question, the context data payload (FR-CHT-011), and potentially limited recent chat history from the pop-up session.
    
    14. FR-CHT-014: The backend API shall interact with the Google Gemini API, providing the AI with the specific context data and the user's question to generate a targeted explanation.
    
    15. FR-CHT-015: The AI's response shall be displayed in the pop-up chat history. Loading indicators are required.
    
    16. FR-CHT-016: The pop-up chat interface shall include an option (e.g., a button or link "Discuss further with Tutor") to navigate the user to the main AI Tutor page (/chat), potentially pre-filling the Tutor chat with the context and the recent pop-up conversation history.
    
    17. FR-CHT-017: State for the active contextual help pop-up (messages, loading) can be managed locally within the pop-up component or potentially integrated into the chatSlice if complex state sharing is needed.
    
    General:
    
    18. FR-CHT-018: All user-facing text in both chatbot interfaces shall be localized using the i18n system (Vietnamese for MVP - see Section 3.6).
    
- **UI/UX Flow Details:**
    
    **AI Tutor:**
    
    1. User clicks "Chat" (or similar) in the main navigation (sidebar).
    2. The `/chat` page loads, adapting Materio's `Chat.tsx` layout. It might show a welcome message or previous session messages (Post-MVP persistence).
    3. User types a question (e.g., "Explain the present perfect tense") into the input field (`SendMsgForm.tsx`).
    4. User clicks the "Send" button.
    5. The user's message appears in the chat history (`ChatContent.tsx`). A loading indicator appears for the AI response.
    6. The backend processes the request via `/api/ai/tutor`.
    7. The AI's response appears in the chat history below the user's message. The loading indicator disappears.
    8. Conversation continues following steps 3-7.
    
    **Contextual Help:**
    
    1. User is interacting with a mini-app (e.g., viewing Writing Tools feedback).
    2. User sees a help icon (`IconButton`) next to a specific piece of information (e.g., the Coherence & Cohesion score).
    3. User clicks the help icon.
    4. A `Popover` or small `Dialog` opens near the icon, displaying a minimal chat interface (title indicating context, message area, input, send button).
    5. The initiating component passes context data (e.g., `{ feature: 'Writing Tools', context: { score: 6.0, criteria: 'Coherence and Cohesion' } }`) to the pop-up component.
    6. User types a question related to the context (e.g., "Why did I get 6.0 here?").
    7. User clicks "Send".
    8. The question appears in the pop-up chat history. A loading indicator appears.
    9. The backend processes the request via `/api/ai/contextual-help`, using the provided context data.
    10. The AI's targeted explanation appears in the pop-up chat history.
    11. User can ask follow-up questions within the pop-up or click "Discuss further with Tutor".
    12. Clicking "Discuss further" navigates the user to `/chat`, potentially passing the pop-up history and context to pre-fill the main chat interface.
    13. User closes the pop-up (clicking outside the `Popover` or via a close button on a `Dialog`).
- **Input Validations (Client & Server-side using Zod):**
    - User Message: Required, non-empty string, potentially max length limit. Sanitize input.
    - Context Payload (Contextual Help): Validate the structure and types of the context data sent to the API.
- **Acceptance Criteria:**
    - Users can access and interact with the main AI Tutor via the `/chat` route using an adapted Materio chat interface.
    - AI Tutor responds appropriately to general English/IELTS questions based on its persona and conversation history (MVP level).
    - Contextual help icons are present in relevant locations within mini-apps (Writing Tools feedback, Adaptive Test questions/summary).
    - Clicking help icons opens a functional pop-up chat interface.
    - Contextual help AI responds with explanations relevant to the specific context passed from the mini-app.
    - Users can navigate from the contextual help pop-up to the main AI Tutor.
    - Loading states are displayed correctly during AI interactions in both interfaces.
    - Chat state (at least for the current session) is managed via Redux (`chatSlice`).
    - All UI elements are styled consistently with the Materio theme and localized in Vietnamese.
- **Implementation Notes:**
    - **UI Adaptation:** Adapt `src/views/apps/chat/` components for the `/chat` route. Create a new reusable component for the contextual help pop-up (`ContextualHelpPopover.tsx`?) using MUI `Popover` or `Dialog`, containing a simplified version of the chat input and display elements.
    - **API Endpoints:** Implement:
        - `POST /api/ai/tutor`: Accepts `{ message: string, history?: ChatMessage[] }`. Uses a fixed system prompt defining the tutor persona. Interacts with Gemini. Returns `{ response: string }`.
        - `POST /api/ai/contextual-help`: Accepts `{ message: string, contextData: any, history?: ChatMessage[] }`. Constructs a prompt for Gemini including the `contextData` and user `message`. Returns `{ response: string }`.
    - **Redux State (`chatSlice`):** Manage `tutorMessages: ChatMessage[]`, `isTutorLoading: boolean`, potentially state for the active contextual help session if needed globally (`contextualHelpMessages`, `isContextualHelpLoading`), though local state for the pop-up might suffice for MVP. Define `ChatMessage` type (e.g., `{ id: string, sender: 'user' | 'ai', text: string, timestamp: number }`). Adapt Materio's `chat` slice structure if suitable.
    - **Context Passing:** The component containing the help icon (`IconButton`) will be responsible for gathering the relevant context data from its own state or props and passing it to the `ContextualHelpPopover` component when it's opened. This can be done via props.
    - **Navigation to Tutor:** The "Discuss further" button in the pop-up can use Next.js `router.push('/chat')` and potentially pass state via Redux or query parameters (though passing large histories/contexts this way is not ideal; Redux state update before navigation is better).
    - **Prompt Engineering:** Define clear system prompts for both the general Tutor and the Contextual Help backend logic. The contextual help prompt needs to instruct the AI to focus specifically on the provided `contextData`.
    - **Error Handling:** Implement robust error handling for Gemini API calls in both backend endpoints. Display user-friendly errors in the chat interfaces (`Snackbar` or inline message).

## **3.5 Basic Admin Dashboard (`/admin/*`)**

- **Feature Goal:** To provide administrators with tools to manage users, view basic platform statistics, and perform essential content management tasks necessary for the MVP. Access must be restricted to users with the 'Admin' role.
- **Reference Context:** Leverages UI components and patterns from Materio's User Management app (`src/views/apps/user/`) and CRM Dashboard (`src/views/dashboards/crm/`). Draws conceptual structure for potential content management from reference files like `app/api/admin/ielts-reading-practices/` and `app/admin/ielts-reading-practices/components/` but strictly limits MVP functionality to editing default prompts as per clarifications.
- **User Stories:**
    - As an Administrator, I want to view a list of all registered users with key details so that I can monitor the user base.
    - As an Administrator, I want to view the detailed profile of a specific user, including their role, status, and capabilities, so that I can manage individual accounts.
    - As an Administrator, I want to edit a user's profile data (e.g., name, bio) so that I can correct information if needed.
    - As an Administrator, I want to assign roles ('Student', 'Admin') to users so that I can manage access privileges.
    - As an Administrator, I want to disable or re-enable a user's account so that I can control access.
    - As an Administrator, I want to manage account type capabilities (e.g., toggle features on/off for specific account types - *Note: Requires defining 'account types' beyond roles, deferred detail to Data Model section*) so that I can control feature access.
    - As an Administrator, I want to manage access to specific mini-apps (e.g., toggle access for account types) so that I can control module availability.
    - As an Administrator, I want to set AI usage limits (e.g., # of writing analyses per day/week) for different account types so that I can manage resource consumption.
    - As an Administrator, I want to view key platform usage statistics (e.g., total users, active users, mini-app usage) so that I can understand platform activity.
    - As an Administrator, I want to edit default prompts used by AI mini-apps (e.g., base prompt for Writing Task 2 generation) so that I can refine AI interactions.
    - As an Administrator, I want to post simple notices on a user's profile view (for admin eyes only) so that I can leave important notes about a user.
- **Functional Requirements:**
    
    **General:**
    
    1. **FR-ADM-001:** Access to all routes under `/admin/*` shall be restricted to users with the 'Admin' role. Unauthorized users attempting access shall be redirected (e.g., to the dashboard home or a dedicated 'Unauthorized' page). Middleware or layout-level checks are required.
    2. **FR-ADM-002:** The admin dashboard shall use the standard authenticated layout (`@layouts/VerticalLayout.tsx`), with admin-specific items added to the navigation menu (`src/configs/navigation/vertical/index.ts`), visible only to Admins.
    
    User Management (/admin/users/*):
    
    3.  FR-ADM-003: The system shall display a paginated, sortable, and filterable list of all registered users.
    
    - UI Reuse: Adapt Materio's User List page (src/app/(dashboard)/admin/users/list/page.tsx) using UserListTable.tsx and MUI DataGrid (@mui/x-data-grid).
    
    4.  FR-ADM-004: The user list shall display columns for: User ID, Name, Email, Role, Status (Active/Disabled), Registration Date.
    
    5.  FR-ADM-005: The system shall allow filtering users by Role and Status.
    
    - UI Reuse: Adapt filter controls from Materio's UserListTableHeader.tsx (using TextField, Select).
    
    6.  FR-ADM-006: The system shall provide actions per user in the list: View Details, Edit, Disable/Enable.
    
    - UI Reuse: Use IconButtons with appropriate icons within the DataGrid actions column. Adapt Materio's UserSuspendDialog for disabling/enabling confirmation.
    
    7.  FR-ADM-007: Clicking 'View Details' shall navigate to a user detail page (/admin/users/view/[userId]).
    
    8.  FR-ADM-008: The user detail page shall display comprehensive user information.
    
    - UI Reuse: Adapt Materio's User View page (src/app/(dashboard)/admin/users/view/[userId]/page.tsx) using UserViewLeft.tsx and UserViewRight.tsx structures with Card components.
    - Displayed Fields: User ID, Email, Name, Role, Status, Registration Date, Last Login (if available), Avatar, Bio, Personal Page link (if provided by user), Online Status indicator (requires presence tracking - Post-MVP or simplify to Last Login check), Assigned Capabilities (List), Mini-App Access (List), Usage Limits, Admin Notice Board.
    
    9.  FR-ADM-009: The system shall allow Admins to edit specific user profile fields (Name, Bio, Role) directly from the detail page or via an 'Edit' modal/drawer.
    
    - UI Reuse: Adapt Materio's UserInfoDrawer or use inline editing with TextField, Select. Role change requires confirmation.
    
    10. FR-ADM-010: The system shall allow Admins to Disable/Enable the user account from the detail page (triggering FR-ADM-006 confirmation flow). The implementation must update both the Supabase Auth user status (if possible via Admin SDK) and a status flag in the profiles table.
    
    11. FR-ADM-011: The system shall provide a mechanism on the user detail page for Admins to manage assigned 'Capabilities', 'Mini-App Access', and 'Usage Limits' based on the user's 'Account Type' (Detailed interaction TBD based on Data Model for these concepts - likely involves toggles (Switch) or dropdowns (Select)).
    
    12. FR-ADM-012: The system shall provide a simple text area on the user detail page for Admins to add/view short text notes ("Notice Board" - admin view only). These notes are stored linked to the user profile.
    
    - UI Reuse: Use TextField (multiline) and display notes in a Card section.
    
    13. FR-ADM-013: All user management actions (Edit, Role Change, Status Change, Capability/Access/Limit changes, Notice add) shall call dedicated backend API endpoints under /api/admin/users/.
    
    Stats Dashboard (/admin/stats):
    
    14. FR-ADM-014: The system shall display a dashboard with key platform statistics.
    
    - UI Reuse: Structure the page (src/app/(dashboard)/admin/stats/page.tsx) using a grid layout (Grid) containing Materio Card components adapted from src/views/dashboards/crm/.
    
    15. FR-ADM-015: MVP Stats to display:
    
    - Total Registered Users (Simple count). Reuse CrmSessions card style.
    - Daily Active Users (DAU) / Monthly Active Users (MAU) (Simple counts based on recent activity/login). Reuse CrmSessions card style.
    - Mini-App Usage Counts (Total sessions today/week for Writing Tools & Adaptive Test). Reuse CrmRevenueGrowth or similar card style.
    
    16. FR-ADM-016: The statistics shall be fetched from a dedicated backend API endpoint (/api/admin/stats).
    
    Content Management (/admin/content-management):
    
    17. FR-ADM-017: The system shall provide an interface for Admins to view and edit default AI prompts.
    
    18. FR-ADM-018: MVP Interface (src/app/(dashboard)/admin/content-management/page.tsx): Display a simple table (Table from @mui/material) listing editable prompts (e.g., "IELTS Writing Task 2 - Prompt Generation Base").
    
    19. FR-ADM-019: Each row in the table shall have an 'Edit' button (IconButton).
    
    20. FR-ADM-020: Clicking 'Edit' shall open a dialog (Dialog) containing a TextField (multiline) pre-filled with the current prompt text.
    
    21. FR-ADM-021: Admins can modify the prompt text in the dialog and click 'Save'.
    
    22. FR-ADM-022: Saving shall call a backend API endpoint (/api/admin/content/prompts) to update the prompt in the database or configuration store.
    
    23. FR-ADM-023: Generating/caching ready-to-use AI content and adjusting AI schema display fields are explicitly Post-MVP.
    
    General Admin:
    
    24. FR-ADM-024: Admin-related data and state (e.g., user list, stats, prompts) shall be managed via a dedicated Redux slice (src/redux-store/slices/adminSlice.ts).
    
- **UI/UX Flow Details:**
    - **Accessing Admin:** Admin users see "Admin" section in the navigation sidebar. Clicking navigates to `/admin/users/list` (default) or other admin sub-pages. Non-admins clicking or navigating directly are redirected.
    - **User List:** Admins see the `DataGrid` of users. They can sort columns, filter by role/status using dropdowns/text fields in the header (`UserListTableHeader.tsx`), and trigger actions (View, Edit, Suspend) via icons in each row.
    - **User Details:** Admins navigate to the `/admin/users/view/[userId]` page. They see user info organized in `Card`s (`UserViewLeft`, `UserViewRight`). Editing name/bio might be inline or via a drawer/dialog (`UserInfoDrawer`). Role changes via a dropdown, triggering confirmation. Status change via button/switch, triggering confirmation (`UserSuspendDialog`). Capability/Access/Limits managed via dedicated controls (TBD design - likely `Switch`es or multi-`Select`s within a `Card`). Notice board is a simple text area and display list.
    - **Stats:** Admins navigate to `/admin/stats`. They see several `Card` components displaying numbers and potentially simple charts (adapted from `Crm...` components), summarizing platform usage.
    - **Content Management:** Admins navigate to `/admin/content-management`. They see a simple `Table`. Clicking 'Edit' on a prompt row opens a `Dialog`. Admin edits text in the `TextField` and clicks 'Save'. Success/error shown via `Snackbar`.
- **Input Validations (Client & Server-side using Zod):**
    - User Edits: Validate Name (string, non-empty), Bio (string, max length), Role (must be 'Student' or 'Admin').
    - Capability/Access/Limit Edits: Validate inputs based on defined types (booleans for toggles, numbers for limits).
    - Notice Board: Validate text (string, max length).
    - Prompt Edits: Validate text (string, non-empty, potential max length).
- **Acceptance Criteria:**
    - Only users with the 'Admin' role can access `/admin/*` routes.
    - Admins can view, sort, and filter the user list.
    - Admins can view detailed user profiles with all specified fields.
    - Admins can successfully edit user Name, Bio, and Role.
    - Admins can successfully disable/enable user accounts (updating Supabase Auth + DB flag).
    - Admins can manage (MVP level UI present, backend TBD based on data model) Capabilities, Mini-App Access, and Usage Limits per account type.
    - Admins can add/view notes on the admin-only Notice Board for a user.
    - Admins can view the stats dashboard displaying MVP metrics (User counts, Mini-app usage).
    - Admins can view and successfully edit default AI prompts via the Content Management interface.
    - All admin actions are reflected correctly in the database via API calls.
    - Admin UI components are adapted from Materio and styled consistently.
    - State is managed via `adminSlice` in Redux.
- **Implementation Notes:**
    - **Route Protection:** Use Next.js Middleware (`middleware.ts`) or checks within the `src/app/(dashboard)/admin/layout.tsx` to verify user role (fetched via `AuthContext` or server-side session) before rendering admin pages.
    - **API Endpoints:** Implement backend APIs under `/api/admin/` requiring admin privileges:
        - `/users`: GET (list with filters), PUT `/[userId]` (update profile/role/status), POST `/[userId]/notes` (add notice), GET `/[userId]/notes`. Need endpoints for Capability/Access/Limit management once models are defined.
        - `/stats`: GET (fetch MVP stats).
        - `/content/prompts`: GET (list prompts), PUT `/[promptId]` (update prompt).
    - **Supabase Admin SDK:** Backend API routes performing admin actions (changing roles, disabling users in Auth) will likely need to use the Supabase Admin SDK (`@supabase/supabase-js` initialized with the service role key) to bypass RLS policies. **Secure this service key properly.**
    - **Data Models:** Define database tables to support Roles, Permissions, Account Types, Capabilities, App Access toggles, Usage Limits, and Admin Notices. Link these appropriately to the `profiles` table.
    - **Redux State (`adminSlice`):** Manage `usersList`, `selectedUserDetail`, `statsData`, `editablePrompts`, loading/error states for each section. Use RTK Query or async thunks.
    - **Materio Adaptation:** Heavily reuse `src/views/apps/user/` components, adapting data sources and adding new fields/actions. Reuse `src/views/dashboards/crm/` card components for stats. Use standard MUI `Table`, `Dialog`, `TextField` for basic content management.

## **3.6 Vietnamese UI (i18n)**

- **Feature Goal:** To ensure the entire user-facing interface of the platform, including labels, buttons, messages, and content text where applicable, is displayed in Vietnamese by default and allows users to switch languages if needed (though Vietnamese is the primary target for MVP).
- **User Stories:**
    - As a Vietnamese Student, I want to see all platform text (menus, buttons, instructions, feedback) in Vietnamese so that I can easily understand and use the platform.
    - As a User (Student or Admin), I want to be able to select my preferred language (Vietnamese or English for future expansion) from a language switcher so that the UI text updates accordingly.
- **Functional Requirements:**
    1. **FR-I18N-001:** The system shall utilize the internationalization library and structure provided by the Materio demo, identified as `next-international`.
    2. **FR-I18N-002:** A Vietnamese dictionary file (`vi.json`) shall be created within the `src/data/dictionaries/` directory, mirroring the structure and keys of the existing `en.json`.
    3. **FR-I18N-003:** All user-facing text strings within the application's UI components (React components, layout files, etc.) MUST be extracted and replaced with calls to the translation function provided by `next-international` (e.g., `t('translationKey')`).
    4. **FR-I18N-004:** The `vi.json` file must contain accurate Vietnamese translations for all keys used in the application interface, including feature names, labels, button texts, validation messages, error messages, and static content sections.
    5. **FR-I18N-005:** The i18n configuration (`src/configs/i18n.ts`) shall be updated to include Vietnamese ('vi') as a supported locale and set it as the default locale.
    6. **FR-I18N-006:** A language switcher component shall be included in the application's main layout header.
        - **UI Reuse:** Adapt and reuse Materio's language switcher component (likely `src/components/layout/shared/LanguageDropdown.tsx` or similar), ensuring it functions correctly with `next-international`'s locale changing mechanism.
    7. **FR-I18N-007:** Selecting a language from the switcher shall update the application's locale and re-render the UI with text from the corresponding dictionary file (`vi.json` or `en.json`). The selected language should persist across sessions (e.g., using cookies or localStorage, managed by `next-international` or the `SettingsContext`).
    8. **FR-I18N-008:** The application layout and components must support UTF-8 encoding and render Vietnamese characters correctly across different browsers and devices.
    9. **FR-I18N-009:** CSS styles (including Tailwind classes and custom CSS) must accommodate potentially longer text lengths in Vietnamese compared to English without breaking the layout (e.g., using flexible containers, appropriate text wrapping).
- **UI/UX Flow Details:**
    - **Default Language:** Users accessing the platform for the first time see the entire UI in Vietnamese.
    - **Language Switching:**
        1. User locates the language switcher dropdown in the header navbar (e.g., showing a flag or language code like 'VI').
        2. User clicks the dropdown.
        3. User selects a different available language (e.g., 'English').
        4. The UI instantly re-renders, displaying all text defined in the corresponding dictionary (`en.json`).
        5. The selected language preference is saved, so subsequent visits retain the choice.
- **Acceptance Criteria:**
    - The application defaults to the Vietnamese language ('vi') upon initial load.
    - All user-facing text elements are sourced from `vi.json` by default.
    - A functional language switcher is present, allowing users to change the UI language.
    - Selecting a language correctly updates the UI text based on the corresponding dictionary file (`vi.json`, `en.json`).
    - Vietnamese characters render correctly across supported browsers.
    - Layouts remain intact and usable when displaying Vietnamese text.
    - All newly developed features (Authentication, Profile, Mini-Apps, Admin, Chatbots) correctly implement i18n for their UI text.
- **Implementation Notes:**
    - **Library:** Use `next-international` as provided by the Materio setup. Follow its documentation for setup, usage (`useI18n`, `useScopedI18n` hooks), and locale detection/persistence.
    - **Dictionary File (`vi.json`):** Maintain a structured JSON format. Keys should be semantic (e.g., `button.save`, `page.login.title`). Ensure comprehensive coverage of all UI strings.
    - **Text Wrapping:** In components, replace static strings like `"Save Changes"` with `t('button.saveChanges')`. Ensure the `t` function (or equivalent from `useI18n`) is available in the component scope.
    - **Configuration:** Update `src/configs/i18n.ts` to define `locales = ['vi', 'en']` (or similar) and `defaultLocale = 'vi'`.
    - **Language Switcher:** Adapt the existing Materio component (`LanguageDropdown.tsx`?). Ensure its `onChange` handler correctly calls the locale change function provided by `next-international`.
    - **Font:** Verify that the default font configured in the Materio theme (`src/@core/theme/typography.ts`) includes full support for Vietnamese glyphs. If not, select and configure a suitable font (e.g., Google Fonts like 'Be Vietnam Pro', 'Inter') ensuring proper licensing.
    - **Testing:** Thoroughly test the application in Vietnamese across different browsers and screen sizes to catch layout issues or character rendering problems. Test the language switching functionality.

---

---

# **4. API Endpoint Specifications (Internal & External)**

This section defines the internal API endpoints exposed by the Next.js backend and notes the primary external API dependency. These internal endpoints facilitate communication between the frontend and backend logic, including interactions with the database and external AI services.

## **4.1. Standard Practices**

- **Authentication:** Unless otherwise specified, all endpoints require a valid user session obtained via Supabase Auth. Backend routes must verify the session using Supabase helper functions (e.g., interacting with the `AuthContext` state derived from server-side session checks or using Supabase middleware/helpers). Endpoints under `/api/admin/` additionally require the authenticated user to have the 'Admin' role.
- **Request/Response Format:** APIs expect and return JSON payloads.
- **Validation:** Request bodies and parameters MUST be validated on the server-side using Zod schemas.
- **Error Handling:** Errors should return appropriate HTTP status codes (400, 401, 403, 404, 500) and a consistent JSON body, e.g., `{ "error": "Descriptive error message" }`.
- **Localization:** API responses containing user-facing text (e.g., error messages) should ideally return translation keys or codes, allowing the frontend i18n layer to handle display. However, for MVP, returning English error messages is acceptable, to be translated by the frontend if feasible or using generic keys.

## **4.2. Internal API Endpoints**

**4.2.1. User Profile (`/api/users`)**

- **Endpoint:** `GET /api/users/profile`
    - **Purpose:** Fetch the profile data for the currently authenticated user.
    - **Method:** GET
    - **Auth:** Required (Authenticated User)
    - **Request:** None
    - **Success (200):** `{ profile: UserProfile }` (where `UserProfile` contains non-sensitive fields like `id`, `name`, `email`, `avatar_url`, `role`, `api_key_set` (boolean), etc. - matches `userProfileSlice` state)
    - **Errors:** 401, 404, 500
- **Endpoint:** `PUT /api/users/profile`
    - **Purpose:** Update the profile data (name, avatar) for the currently authenticated user.
    - **Method:** PUT
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ name?: string, avatarUrl?: string }` (Validated with Zod)
    - **Success (200):** `{ profile: UpdatedUserProfile }`
    - **Errors:** 400, 401, 500
- **Endpoint:** `POST /api/users/update-api-key`
    - **Purpose:** Securely save or update the user's encrypted Gemini API key. **(Implementation via Supabase Edge Function recommended)**.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ apiKey: string }` (Raw key)
    - **Success (200):** `{ success: true, apiKeyStatus: boolean }` (Indicates if key is now set)
    - **Errors:** 400, 401, 500 (Especially if encryption fails)
- **Endpoint:** `DELETE /api/users/delete-api-key`
    - **Purpose:** Remove the user's encrypted Gemini API key. **(Implementation via Supabase Edge Function recommended)**.
    - **Method:** DELETE
    - **Auth:** Required (Authenticated User)
    - **Request:** None
    - **Success (200):** `{ success: true, apiKeyStatus: false }`
    - **Errors:** 401, 500

**4.2.2. AI Mini-Apps (`/api/mini-apps`)**

- **Endpoint:** `POST /api/mini-apps/writing-tools/generate-prompt`
    - **Purpose:** Generate an IELTS writing prompt using Gemini.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ taskType: 'Task 1' | 'Task 2' }`
    - **Success (200):** `{ prompt: string }`
    - **Errors:** 400, 401, 500 (Gemini error)
- **Endpoint:** `POST /api/mini-apps/writing-tools/analyze-essay`
    - **Purpose:** Analyze a user's essay using Gemini and save the results.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ prompt: string, essayHtml: string, taskType: 'Task 1' | 'Task 2' }` (Validate `essayHtml` for structure, sanitize)
    - **Success (200):** `{ analysisResult: WritingAnalysisResult }` (Structure as defined in 3.2, e.g., `{ overallScore: number, criteriaScores: {...}, feedback: string }`)
    - **Errors:** 400, 401, 500 (Gemini error, DB save error)
- **Endpoint:** `POST /api/mini-apps/adaptive-test/start-session`
    - **Purpose:** Initialize a new adaptive test session state on the backend.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{}` (User identified via session)
    - **Success (200):** `{ sessionId: string }`
    - **Errors:** 401, 500
- **Endpoint:** `POST /api/mini-apps/adaptive-test/get-next-question`
    - **Purpose:** Fetch the next question based on session state and difficulty.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ sessionId: string, currentDifficulty?: number, currentSkill?: string }`
    - **Success (200):** `{ question: QuestionSchemaJSON, questionId: string, skill: string }` (Question schema needs definition, e.g., `{ type: 'mcq' | 'fill_blank', content: string, options?: string[], answerKey?: string|number }`)
    - **Errors:** 400, 401, 404 (Session not found), 500 (Gemini error)
- **Endpoint:** `POST /api/mini-apps/adaptive-test/submit-answer`
    - **Purpose:** Submit an answer, evaluate it, update session state (difficulty), check end condition, and save results if ended.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ sessionId: string, questionId: string, answer: any }`
    - **Success (200):** `{ isCorrect: boolean, nextDifficulty: number, endSession: boolean }`
    - **Errors:** 400, 401, 404 (Session/Question not found), 500 (Evaluation error, DB save error)

**4.2.3. AI Chatbots (`/api/ai`)**

- **Endpoint:** `POST /api/ai/tutor`
    - **Purpose:** Get a response from the general AI Tutor.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ message: string, history?: ChatMessage[] }`
    - **Success (200):** `{ response: string }`
    - **Errors:** 400, 401, 500 (Gemini error)
- **Endpoint:** `POST /api/ai/contextual-help`
    - **Purpose:** Get a response from the AI based on specific context from a mini-app.
    - **Method:** POST
    - **Auth:** Required (Authenticated User)
    - **Request Body:** `{ message: string, contextData: any, history?: ChatMessage[] }` (Validate `contextData` structure)
    - **Success (200):** `{ response: string }`
    - **Errors:** 400, 401, 500 (Gemini error)

**4.2.4. Admin (`/api/admin`)**

- **Endpoint:** `GET /api/admin/users`
    - **Purpose:** List users with filtering and pagination.
    - **Method:** GET
    - **Auth:** Required (Admin Role)
    - **Request Query Params:** `?page=1&limit=10&sortBy=createdAt&sortOrder=desc&role=Student&status=Active&search=query` (Optional query params for filtering/sorting/pagination)
    - **Success (200):** `{ users: AdminUserListEntry[], total: number, page: number, limit: number }` (Define `AdminUserListEntry` type with fields from FR-ADM-004)
    - **Errors:** 401, 403, 500
- **Endpoint:** `GET /api/admin/users/[userId]`
    - **Purpose:** Get detailed information for a specific user.
    - **Method:** GET
    - **Auth:** Required (Admin Role)
    - **Request Params:** `userId` (URL path parameter)
    - **Success (200):** `{ user: AdminUserDetail }` (Define `AdminUserDetail` with fields from FR-ADM-008)
    - **Errors:** 401, 403, 404, 500
- **Endpoint:** `PUT /api/admin/users/[userId]`
    - **Purpose:** Update a user's profile details, role, or status. Also manages capabilities, access, limits.
    - **Method:** PUT
    - **Auth:** Required (Admin Role)
    - **Request Params:** `userId`
    - **Request Body:** `{ name?: string, bio?: string, role?: 'Student' | 'Admin', status?: 'Active' | 'Disabled', capabilities?: string[], appAccess?: string[], usageLimits?: any }` (Validate with Zod; structure for capabilities/access/limits depends on data model)
    - **Success (200):** `{ user: UpdatedAdminUserDetail }`
    - **Errors:** 400, 401, 403, 404, 500
- **Endpoint:** `POST /api/admin/users/[userId]/notes`
    - **Purpose:** Add an admin-only note to a user's profile.
    - **Method:** POST
    - **Auth:** Required (Admin Role)
    - **Request Params:** `userId`
    - **Request Body:** `{ noteText: string }`
    - **Success (201):** `{ note: AdminNote }`
    - **Errors:** 400, 401, 403, 404, 500
- **Endpoint:** `GET /api/admin/users/[userId]/notes`
    - **Purpose:** Retrieve admin-only notes for a user.
    - **Method:** GET
    - **Auth:** Required (Admin Role)
    - **Request Params:** `userId`
    - **Success (200):** `{ notes: AdminNote[] }`
    - **Errors:** 401, 403, 404, 500
- **Endpoint:** `GET /api/admin/stats`
    - **Purpose:** Fetch aggregated platform statistics for the admin dashboard.
    - **Method:** GET
    - **Auth:** Required (Admin Role)
    - **Request:** None
    - **Success (200):** `{ totalUsers: number, dau: number, mau: number, writingSessionsToday: number, adaptiveSessionsToday: number, /* Add other stats as needed */ }`
    - **Errors:** 401, 403, 500
- **Endpoint:** `GET /api/admin/content/prompts`
    - **Purpose:** List editable default AI prompts.
    - **Method:** GET
    - **Auth:** Required (Admin Role)
    - **Request:** None
    - **Success (200):** `{ prompts: EditablePrompt[] }` (Define `EditablePrompt` e.g., `{ id: string, name: string, description: string, currentText: string }`)
    - **Errors:** 401, 403, 500
- **Endpoint:** `PUT /api/admin/content/prompts/[promptId]`
    - **Purpose:** Update the text of a specific default AI prompt.
    - **Method:** PUT
    - **Auth:** Required (Admin Role)
    - **Request Params:** `promptId`
    - **Request Body:** `{ promptText: string }`
    - **Success (200):** `{ prompt: UpdatedEditablePrompt }`
    - **Errors:** 400, 401, 403, 404, 500

## **4.3. External APIs**

- **Google Gemini API:**
    - **Provider:** Google (via `@google/generative-ai` SDK).
    - **Purpose:** Used by various backend endpoints for AI content generation (prompts, questions), analysis (writing evaluation), and chat responses.
    - **Authentication:** Requires API Key (either platform key managed via environment variables/Supabase Vault, or user-provided key fetched securely from `profiles` table). Backend logic determines which key to use based on platform tier/settings.
    - **Interaction:** Specific prompts, model selection (`gemini-2.0-flash`, `gemini-2.5-flash-preview`), temperature settings, and response parsing logic are handled within the respective backend API route implementations (e.g., `/api/mini-apps/*`, `/api/ai/*`).

# **5. Data Models & Database Schema (Supabase PostgreSQL)**

This section outlines the database schema required to support the MVP features. The schema will be implemented and managed using Supabase's native SQL migration tooling via the Supabase CLI. Row Level Security (RLS) policies MUST be implemented to enforce data access rules.

## **5.1. Schema Design Principles**

- **Relationships:** Use foreign keys to establish clear relationships between tables.
- **Naming Conventions:** Use `snake_case` for table and column names.
- **Primary Keys:** Use `uuid` type for primary keys where appropriate, especially for publicly exposed identifiers. Auto-incrementing integers (`bigint GENERATED BY DEFAULT AS IDENTITY`) can be used for internal linking tables if preferred.
- **Timestamps:** Use `timestamp with time zone` (timestamptz) for time tracking, defaulting to `now()`. Use `created_at` and `updated_at` conventions.
- **Data Types:** Choose appropriate PostgreSQL types (`text`, `varchar`, `boolean`, `integer`, `numeric`, `jsonb`, `uuid`, `timestamptz`). Use `jsonb` for storing flexible structured data like AI responses or configuration objects.
- **Indexing:** Create indexes on foreign keys and frequently queried columns to optimize performance.
- **RLS:** Assume default deny, explicitly grant access via policies (users manage own data, admins manage relevant data).

## **5.2. Core Tables**

- **`auth.users` (Managed by Supabase Auth)**
    - **Purpose:** Stores core authentication information. Referenced by other tables via its `id` (UUID).
    - **Key Columns:** `id` (uuid, PK), `email`, `encrypted_password`, `created_at`, `updated_at`, etc.
    - **Note:** We do not directly modify this table's schema but link to it.
- **`public.roles`**
    - **Purpose:** Defines the available user roles within the application.
    - **Columns:**
        - `role_id` : `smallint` PRIMARY KEY
        - `role_name` : `varchar(50)` UNIQUE NOT NULL -- e.g., 'Student', 'Admin'
    - **Seed Data:** Populate with (1, 'Student'), (2, 'Admin').
    - **RLS:** Allow read access for authenticated users. Admin access for modification.
- **`public.account_types`**
    - **Purpose:** Defines different account tiers or types (e.g., Free, Premium - preparing for future monetization and controls). MVP might only have one or two types initially (e.g., 'DefaultStudent', 'DefaultAdmin').
    - **Columns:**
        - `account_type_id` : `bigint` GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY
        - `type_name` : `varchar(100)` UNIQUE NOT NULL -- e.g., 'DefaultStudent', 'DefaultAdmin', 'PremiumStudent'
        - `description` : `text`
        - `is_default_student` : `boolean` DEFAULT false -- Flag to assign on new student registration
        - `is_default_admin` : `boolean` DEFAULT false -- Flag to assign on new admin registration
        - `capabilities` : `jsonb` DEFAULT '{}' -- Stores key-value pairs for specific feature flags, e.g., {"can_use_advanced_feedback": true}
        - `app_access` : `jsonb` DEFAULT '{}' -- Stores key-value pairs for mini-app access, e.g., {"writing_tools": true, "adaptive_test": true}
        - `usage_limits` : `jsonb` DEFAULT '{}' -- Stores usage limits, e.g., {"writing_analyses_per_day": 5, "adaptive_tests_per_week": 10}
        - `created_at` : `timestamptz` DEFAULT `now()` NOT NULL
        - `updated_at` : `timestamptz` DEFAULT `now()` NOT NULL
    - **Indexes:** `idx_account_types_type_name`
    - **RLS:** Allow read access for authenticated users. Admin access for modification.
- **`public.profiles`**
    - **Purpose:** Stores user-specific profile information, extending the `auth.users` table.
    - **Columns:**
        - `user_id` : `uuid` PRIMARY KEY REFERENCES `auth.users`(`id`) ON DELETE CASCADE
        - `role_id` : `smallint` NOT NULL REFERENCES `public.roles`(`role_id`) DEFAULT 1 -- Default to 'Student'
        - `account_type_id` : `bigint` REFERENCES `public.account_types`(`account_type_id`) -- Can be NULL initially, set by trigger/admin
        - `display_name` : `varchar(100)`
        - `avatar_url` : `text` -- URL to image in Supabase Storage
        - `bio` : `text`
        - `personal_page_url` : `text` -- Optional link provided by user or admin
        - `encrypted_gemini_api_key` : `bytea` -- Stores the encrypted API key (use bytea for binary data)
        - `status` : `varchar(20)` DEFAULT 'Active' NOT NULL -- e.g., 'Active', 'Disabled'
        - `created_at` : `timestamptz` DEFAULT `now()` NOT NULL
        - `updated_at` : `timestamptz` DEFAULT `now()` NOT NULL
    - **Indexes:** `idx_profiles_role_id`, `idx_profiles_account_type_id`, `idx_profiles_status`
    - **RLS:** Users can read/update their own profile. Admins can read/update all profiles. Ensure API key field has restricted read access even via RLS if possible, primarily accessed via secure functions.
    - **Trigger:** Need a trigger `on auth.users insert` to create a corresponding profile, assign default role (Student), and potentially assign default `account_type_id`.
- **`public.admin_notes`**
    - **Purpose:** Stores notes added by administrators regarding specific users.
    - **Columns:**
        - `note_id` : `bigint` GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY
        - `user_id` : `uuid` NOT NULL REFERENCES `public.profiles`(`user_id`) ON DELETE CASCADE
        - `admin_user_id` : `uuid` NOT NULL REFERENCES `auth.users`(`id`) -- The admin who wrote the note
        - `note_text` : `text` NOT NULL
        - `created_at` : `timestamptz` DEFAULT `now()` NOT NULL
    - **Indexes:** `idx_admin_notes_user_id`, `idx_admin_notes_admin_user_id`
    - **RLS:** Only Admins can create/read notes.
- **`public.editable_prompts`**
    - **Purpose:** Stores default prompts that administrators can modify.
    - **Columns:**
        - `prompt_id` : `varchar(100)` PRIMARY KEY -- A unique key/slug, e.g., 'writing_task2_generation'
        - `name` : `varchar(255)` NOT NULL -- User-friendly name
        - `description` : `text`
        - `prompt_text` : `text` NOT NULL
        - `created_at` : `timestamptz` DEFAULT `now()` NOT NULL
        - `updated_at` : `timestamptz` DEFAULT `now()` NOT NULL
        - `updated_by` : `uuid` REFERENCES `auth.users`(`id`) -- Last admin who updated
    - **Seed Data:** Populate with initial default prompts required by mini-apps.
    - **RLS:** Read access for authenticated users (backend service might need this). Write access only for Admins.

## **5.3. Mini-App Data Table**

- **`public.mini_app_results`**
    - **Purpose:** Stores the results and artifacts from user interactions with AI mini-apps.
    - **Columns:**
        - `result_id` : `bigint` GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY
        - `user_id` : `uuid` NOT NULL REFERENCES `public.profiles`(`user_id`) ON DELETE CASCADE
        - `app_name` : `varchar(100)` NOT NULL -- e.g., 'IELTS Writing Tools', 'IELTS Adaptive Test'
        - `session_id` : `uuid` -- Optional, useful for grouping related results (e.g., adaptive test session)
        - `task_type` : `varchar(100)` -- e.g., 'Task 1', 'Task 2' (for Writing), 'Reading', 'Grammar', 'Vocabulary' (for Adaptive Test question)
        - `skill_type` : `varchar(100)` -- e.g., 'Writing', 'Reading', 'Grammar', 'Vocabulary', 'Mixed'
        - `prompt` : `text` -- The prompt given to the user (Writing) or used to generate a question (Adaptive)
        - `user_answer` : `text` -- User's essay (HTML for Writing), user's answer selection/text (Adaptive)
        - `ai_response` : `jsonb` -- The full structured response from the AI analysis/evaluation
        - `base_score` : `numeric(4, 2)` -- Primary score (e.g., overall writing band, final adaptive score)
        - `converted_score` : `varchar(50)` -- e.g., IELTS Band (text like '7.5'), or other representation
        - `cefr_level` : `varchar(10)` -- Estimated CEFR level (e.g., 'B2', 'C1') if applicable
        - `evaluation_score` : `jsonb` -- Detailed scores (e.g., `{ "TR": 7.0, "CC": 6.5, ... }` for Writing, `{ "correct": 15, "incorrect": 5, "total": 20 }` for Adaptive)
        - `level` : `numeric(3, 1)` -- Difficulty level reached or associated with the result
        - `duration_spent` : `integer` -- Time spent in seconds, if tracked
        - `human_instructor_feedback` : `text` -- Placeholder for future feature
        - `created_at` : `timestamptz` DEFAULT `now()` NOT NULL
    - **Indexes:** `idx_mini_app_results_user_id`, `idx_mini_app_results_app_name`, `idx_mini_app_results_session_id`, `idx_mini_app_results_created_at`
    - **RLS:** Users can read their own results. Admins can read all results (for support/aggregation).

## **5.4. Question Schema (Conceptual - for AI Interaction)**

This is not a database table but defines the expected JSON structure for questions generated by the Adaptive Test AI and handled by the API/frontend.

**TypeScript**

```jsx
// Example TypeScript interface (implement corresponding Zod schema for validation)
interface QuestionSchema {
  questionId: string; // Unique ID generated by backend or AI call wrapper
  skill: 'Reading' | 'Grammar' | 'Vocabulary';
  questionType: 'mcq_single' | 'mcq_multi' | 'fill_blank'; // MVP types
  difficultyLevel: number; // e.g., 1-5
  content: {
    instruction: string;
    text?: string; // e.g., Reading passage snippet, sentence for grammar/vocab
    prompt?: string; // e.g., Fill-in-the-blank prompt "Complete the sentence: The cat ___ on the mat."
  };
  options?: { key: string; value: string }[]; // For MCQ types [{key: 'A', value: 'sat'}, {key: 'B', value: 'sit'}]
  answerKey: string | string[]; // Correct option key(s) for MCQ, or the correct word(s) for fill_blank
  explanation?: string; // Post-MVP: AI-generated explanation of the correct answer
}
```

## **5.5. Relationships Summary**

- `profiles` has a 1-to-1 relationship with `auth.users`.
- `profiles` has a many-to-1 relationship with `roles`.
- `profiles` has a many-to-1 relationship with `account_types`.
- `admin_notes` has a many-to-1 relationship with `profiles` (the user being noted) and `auth.users` (the admin writing).
- `mini_app_results` has a many-to-1 relationship with `profiles`.

## **5.6. Schema Management**

- Use Supabase CLI (`supabase migrations new <migration_name>`, `supabase db push`, etc.) to create and manage SQL migration files stored in `supabase/migrations/`.
- Initial migration should create all tables, indexes, and set up the trigger for profile creation.
- RLS policies should be defined in separate SQL files or managed via Supabase Studio initially, then scripted for migrations.

# **6. Non-Functional Requirements (NFRs) - Detailed**

This section outlines the critical quality attributes and constraints for the platform, expanding on the high-level considerations mentioned in the HLP. Adherence to these NFRs is crucial for delivering a stable, usable, and secure MVP.

## **6.1. Performance**

- **NFR-PERF-001 (Page Load):** Key user-facing pages (Login, Dashboard, Mini-App main views) should target a Largest Contentful Paint (LCP) of under 2.5 seconds under typical network conditions (e.g., simulated Fast 3G) for Vietnamese users. Leverage Next.js static/server rendering and code splitting capabilities.
- **NFR-PERF-002 (API Response Time):** Core internal API endpoints (e.g., profile fetch, prompt generation, answer submission) should have a P95 (95th percentile) response time under 500ms, excluding external AI API latency. Endpoints involving AI calls should aim for a P95 response time under 5 seconds (dependent on Gemini API performance). Monitor API performance via Vercel Analytics or similar.
- **NFR-PERF-003 (AI API Latency):** Acknowledge dependency on Google Gemini API latency. Implement user feedback mechanisms (loading spinners, progress indicators - reusing Materio `LinearProgress`, `CircularProgress`) for all AI-dependent operations to manage perceived performance. Backend should implement reasonable timeouts for AI calls.
- **NFR-PERF-004 (Frontend Optimization):**
    - Leverage Next.js App Router features for optimal code splitting and lazy loading (default behavior).
    - Optimize bundle sizes by analyzing with `@next/bundle-analyzer` periodically.
    - Minimize re-renders in React components using `React.memo`, `useCallback`, `useMemo` where appropriate, especially in complex views like the Adaptive Test renderer or Admin DataGrid.
    - Optimize images using `next/image`.
- **NFR-PERF-005 (Database Queries):** Ensure database queries are optimized. Use appropriate indexes (as defined in Section 5). Avoid N+1 query problems in API routes when fetching related data. Use tools like `pg_stat_statements` (if available via Supabase) or analyze query plans for slow endpoints.

## **6.2. Scalability**

- **NFR-SCAL-001 (Stateless Backend):** Design Next.js API routes to be as stateless as possible, relying on the database or cache (if Redis introduced later) for session/state data, facilitating horizontal scaling via Vercel's serverless infrastructure.
- **NFR-SCAL-002 (Database):** Rely on Supabase's managed PostgreSQL scaling capabilities for the initial MVP load. Schema design (Section 5) prioritizes efficient querying. Monitor database resource utilization via Supabase dashboard.
- **NFR-SCAL-003 (AI API Limits):** Be mindful of Google Gemini API rate limits and quotas. Implement strategies (e.g., caching non-user-specific AI content via Admin feature, potential retries with backoff) to handle potential rate limiting. Monitor API usage costs.
- **NFR-SCAL-004 (MVP Load):** The MVP infrastructure (Vercel standard tier, Supabase free/pro tier) should comfortably handle an initial target load (e.g., ~50-100 concurrent users, ~10-20 requests/second) without significant performance degradation.

## **6.3. Security**

- **NFR-SEC-001 (Authentication & Authorization):** Secure user authentication is handled by Supabase Auth. Authorization for accessing specific data or performing actions MUST be enforced via:
    - **Supabase Row Level Security (RLS):** Implement strict RLS policies on all tables (as noted in Section 5) ensuring users can only access their own data, and admins have appropriate elevated privileges. Default deny policy.
    - **API Route Checks:** All backend API routes MUST verify user authentication status and role (especially for `/api/admin/*` routes) before proceeding.
- **NFR-SEC-002 (Input Validation):** All external input (API request bodies, query parameters, form submissions) MUST be rigorously validated on the server-side using Zod schemas (as specified in API definitions, Section 4) to prevent injection attacks (SQLi, XSS) and ensure data integrity. Sanitize HTML input from rich text editors (Tiptap) using libraries like `dompurify` before storage or processing.
- **NFR-SEC-003 (API Key Security):**
    - **Platform Keys:** Google Gemini API key used by the platform MUST be stored securely (e.g., Vercel Environment Variables marked as 'Sensitive', Supabase Vault) and NEVER exposed client-side.
    - **User Keys:** User-provided Gemini keys MUST be encrypted server-side (via Supabase Edge Function using a key from Vault) before storage in the `profiles.encrypted_gemini_api_key` (bytea) column and only decrypted in secure backend environments when needed. Never store or transmit raw user keys unnecessarily.
- **NFR-SEC-004 (Dependency Management):** Regularly scan dependencies for vulnerabilities using tools like `npm audit` or integrated services (e.g., GitHub Dependabot). Update dependencies promptly, especially for security patches, testing thoroughly after updates.
- **NFR-SEC-005 (HTTPS):** All traffic must be served over HTTPS (handled by Vercel).
- **NFR-SEC-006 (Rate Limiting):** Consider implementing basic rate limiting on sensitive API endpoints (e.g., login, AI analysis) post-MVP or if abuse is detected, to prevent denial-of-service or resource exhaustion. (Leverage Vercel/Supabase features if available).
- **NFR-SEC-007 (Admin SDK):** Backend API routes using the Supabase Admin SDK (service role key) must be carefully secured and only perform necessary privileged actions.

## **6.4. Reliability**

- **NFR-REL-001 (Platform Uptime):** Rely on the uptime SLAs provided by Vercel and Supabase for infrastructure availability.
- **NFR-REL-002 (Error Handling):** Implement a robust and consistent error handling strategy (see Section 7) across both frontend and backend to gracefully handle expected and unexpected errors, providing clear feedback to users and preventing crashes.
- **NFR-REL-003 (Logging):** Implement basic structured logging on the backend (API routes, critical functions):
    - Log all critical errors with stack traces.
    - Log key application events (e.g., user registration, session start/end for mini-apps).
    - Log summaries of API requests/responses (excluding sensitive data).
    - Utilize Vercel's built-in logging or integrate a third-party logging service (post-MVP).
- **NFR-REL-004 (Database Backups):** Rely on Supabase's automated database backup mechanisms. Understand the backup frequency and retention policy provided by the chosen Supabase plan.
- **NFR-REL-005 (AI Service Resilience):** Backend services interacting with the Gemini API should handle potential API unavailability or errors gracefully (e.g., retries with backoff for transient errors, clear error messages to the user for persistent failures).

## **6.5. Maintainability**

- **NFR-MAIN-001 (Code Structure & Consistency):** Strictly adhere to the project structure defined in Section 2, leveraging Materio's conventions. Maintain consistency in coding style enforced by ESLint and Prettier (using configurations adapted from Materio).
- **NFR-MAIN-002 (TypeScript):** Utilize TypeScript effectively across the entire codebase (frontend, backend API routes) for improved type safety and developer understanding. Use `strict` mode in `tsconfig.json`.
- **NFR-MAIN-003 (Modularity):** Develop features with modularity in mind. Reuse components from Materio (`@core`, `src/components`) where possible. Create new reusable components for application-specific needs. Mini-apps should be self-contained where feasible within their directories.
- **NFR-MAIN-004 (Automated Testing - CRITICAL):** Implement a comprehensive automated testing strategy as highlighted in the HLP Risk Mitigation:
    - **Unit Tests:** Use Jest or Vitest to test individual functions, utilities, and potentially Redux reducers/actions. Aim for high coverage (>70%) on critical business logic.
    - **Integration Tests:** Use Jest/Vitest with React Testing Library (`@testing-library/react`) to test component interactions, Redux integration, and API slice/thunk behavior within the frontend.
    - **End-to-End (E2E) Tests:** Use Playwright or Cypress to test key user flows (Login, Profile Update, Start/Complete Writing Task, Start/Complete Adaptive Test segment, Admin User List/View).
    - **CI/CD Integration:** Integrate test execution into the CI/CD pipeline (Vercel deployments) to ensure tests pass before deploying to production. **Mandatory.**
- **NFR-MAIN-005 (Code Reviews):** Implement a mandatory code review process for all changes merged into the main branch, focusing on correctness, adherence to standards, security, performance, and maintainability.
- **NFR-MAIN-006 (Documentation):** Document complex logic, API endpoints (Swagger/OpenAPI docs generated via tools like `tsoa` or similar could be considered post-MVP), and non-obvious component behaviors within the codebase using JSDoc or TSDoc comments. Maintain the README.md with setup and development instructions.

# **7. Error Handling Strategy**

**7.1. Goal**

To implement a consistent, robust, and user-friendly error handling strategy across the entire application (frontend and backend) that gracefully manages unexpected situations, provides clear feedback to users, and facilitates effective debugging through logging.

**7.2. Potential Error Sources**

- **Client-Side (Frontend):**
    - Invalid user input (Form validation failures).
    - Component rendering errors (React errors).
    - Network errors during API calls (Failed fetches).
    - State management errors (Redux state inconsistencies).
    - Errors returned from backend API calls.
- **Server-Side (Backend API Routes):**
    - Invalid request data (Zod validation failures).
    - Authentication/Authorization errors (Missing/invalid session, insufficient permissions).
    - Database interaction errors (Supabase query failures, constraint violations).
    - External API errors (Google Gemini API failures, timeouts, rate limits).
    - Unexpected server exceptions (Code bugs).
- **External Services:**
    - Supabase Auth service errors (during login/registration).
    - Supabase Database unavailability (rare).
    - Google Gemini API service degradation or errors.

**7.3. Backend Error Handling (API Routes)**

- **EH-BE-001 (Centralized Handling):** Implement a standard way to catch errors within API routes, potentially using a utility wrapper or middleware pattern if applicable in Next.js API routes.
- **EH-BE-002 (Validation Errors):** Zod validation errors on request bodies/params should automatically return a 400 Bad Request status code with a structured error message indicating the specific validation failures (Zod libraries often provide utilities for this).
- **EH-BE-003 (Authentication/Authorization Errors):** Middleware or route handlers must check authentication and roles. Failed checks should return appropriate status codes (401 Unauthorized or 403 Forbidden) with a clear error message (e.g., `{ "error": "Authentication required" }` or `{ "error": "Admin privileges required" }`).
- **EH-BE-004 (Database/Service Errors):** Catch errors from Supabase client calls or other internal services. Log the detailed error (including stack trace) for debugging (NFR-REL-003). Return a generic 500 Internal Server Error status code to the client with a non-specific message like `{ "error": "An internal server error occurred" }` to avoid exposing internal details. Specific, safe-to-expose errors (e.g., "User not found" returning 404) can be handled explicitly.
- **EH-BE-005 (External API Errors):** Catch errors from the Google Gemini API. Log the specific error. If the error is actionable by the user (e.g., invalid user API key), return a relevant 4xx error. For general Gemini failures or timeouts, return a 503 Service Unavailable or 500 Internal Server Error with a generic message (e.g., `{ "error": "AI service interaction failed" }`). Implement retries with backoff for transient Gemini errors where appropriate (NFR-REL-005).
- **EH-BE-006 (Consistent Error Response):** All API errors returned to the client MUST follow the consistent JSON format: `{ "error": "string" }` (as defined in Section 4.1).

**7.4. Frontend Error Handling**

- **EH-FE-001 (API Call Errors):** All API calls made from the frontend (e.g., using RTK Query, async thunks, or direct fetch) MUST include `.catch()` blocks or `try...catch` statements to handle promise rejections or exceptions.
- **EH-FE-002 (State Updates):** Upon catching an API error, update the relevant Redux slice state to indicate the error condition (e.g., setting `error: errorMessage`, `isLoading: false`). UI components should subscribe to this error state to display appropriate feedback. RTK Query provides built-in error handling states.
- **EH-FE-003 (User Input Validation):** Implement client-side validation using libraries like React Hook Form integrated with Zod for immediate feedback on forms. Display validation errors inline near the respective form fields.
    - **UI Reuse:** Utilize Materio's form patterns, displaying errors as helper text below `TextField`s, `Select`s, etc., often styled with the theme's error color.
- **EH-FE-004 (Component Rendering Errors):** Implement React Error Boundaries at strategic points in the component tree (e.g., around major layout sections or complex mini-apps) to catch JavaScript errors during rendering, log them, and display a fallback UI instead of crashing the entire application.
    - **UI Reuse:** The fallback UI can be a simple message component styled with Materio elements, potentially offering a page reload option.
- **EH-FE-005 (Interpreting API Errors):** Frontend error handlers should inspect the error received from the backend (both the status code and the `{ "error": "message" }` body) to determine how to present it to the user (e.g., display the message directly in a Snackbar, show a generic message for 5xx errors).

**7.5. User-Facing Error Messages**

- **EH-UF-001 (Clarity and Guidance):** Error messages shown to the user should be clear, concise, and translated into Vietnamese (using the i18n system). Avoid technical jargon. Where possible, provide guidance on how the user might resolve the issue (e.g., "Invalid email format, please check.", "Failed to load data, please try again later.").
- **EH-UF-002 (Feedback Components):**
    - **Inline Errors:** Use form helper text for input validation errors.
    - **Notifications:** Use Materio's `Snackbar` component (`@mui/material/Snackbar` with `@mui/material/Alert`) for non-blocking operational errors (e.g., "Failed to save profile", "Could not generate prompt") or success messages. Position consistently (e.g., top-right).
        - **UI Reuse:** Leverage the styling and severity levels (`error`, `warning`, `info`, `success`) provided by MUI `Alert` within the `Snackbar`.
    - **Blocking Errors / Fallbacks:** Use dedicated error message components or adapt Materio's error pages (e.g., `src/app/(blank-layout)/pages/error/`) displayed via Error Boundaries for critical rendering errors or when a core feature cannot load.

**7.6. Logging Strategy**

- **EH-LOG-001 (Backend Logging):** As defined in NFR-REL-003, backend API routes MUST log:
    - Critical errors with full stack traces.
    - Key application events.
    - Request/response summaries (optional, exclude sensitive data).
    - Utilize Vercel's Log Drains or standard console logging viewable in Vercel dashboard.
- **EH-LOG-002 (Frontend Logging):**
    - Log errors caught by Error Boundaries.
    - Log significant errors caught during API calls or state updates to the browser console during development. Consider integrating a frontend logging service (e.g., Sentry, LogRocket - post-MVP) for production monitoring.

# **8. Deployment & Infrastructure Considerations**

This section outlines the infrastructure choices and deployment strategy for the MVP.

**8.1. Hosting Platform: Vercel**

- **DI-HOST-001:** The Next.js application (frontend and API routes) will be deployed and hosted on Vercel.
- **DI-HOST-002:** Leverage Vercel's serverless functions for hosting Next.js API routes, enabling automatic scaling.
- **DI-HOST-003:** Utilize Vercel's Git integration (e.g., with GitHub) for CI/CD.
- **DI-HOST-004:** Static assets (images, fonts) will be served efficiently via Vercel's CDN.

**8.2. Database & Backend Services: Supabase**

- **DI-DB-001:** Supabase Platform will be used for:
    - **Database:** Managed PostgreSQL instance.
    - **Authentication:** Supabase Auth for user sign-up, login, and session management.
    - **Storage:** Supabase Storage for user avatar uploads.
    - **Edge Functions:** (Recommended) For secure server-side operations like user API key encryption/decryption.
    - **Vault:** (Recommended) For securely storing secrets accessed by Edge Functions (e.g., encryption key).
- **DI-DB-002:** Rely on Supabase's managed infrastructure for database scaling, backups (NFR-REL-004), and maintenance.
- **DI-DB-003:** Database schema changes will be managed using Supabase native SQL migrations via the Supabase CLI (see Section 5.6).

**8.3. Environment Variables**

- **DI-ENV-001:** Environment variables are required to configure the application for different environments (development, staging, production).
- **DI-ENV-002:** Use Vercel's Environment Variables settings to manage production and preview/staging variables. Use `.env.local` for local development.
- **DI-ENV-003:** Essential Variables:
    - `NEXT_PUBLIC_SUPABASE_URL`: Public URL for the Supabase project (Client-side access).
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public anonymous key for the Supabase project (Client-side access).
    - `SUPABASE_SERVICE_ROLE_KEY`: **(Highly Sensitive)** Secret service role key for backend use ONLY (e.g., Admin API routes, database triggers) granting full database access. Store securely in Vercel Sensitive Environment Variables / Supabase Vault. **NEVER expose client-side.**
    - `GEMINI_API_KEY`: **(Highly Sensitive)** Platform's Google Gemini API key for backend use. Store securely in Vercel Sensitive Environment Variables / Supabase Vault. **NEVER expose client-side.**
    - `API_KEY_ENCRYPTION_SECRET`: **(Highly Sensitive)** Secret key used by the Edge Function to encrypt/decrypt user API keys. Store securely in Supabase Vault or Vercel Sensitive Environment Variables accessible ONLY by the Edge Function.
    - `NEXTAUTH_URL` / `NEXTAUTH_SECRET`: (If NextAuth were used - **REMOVE** as we are using Supabase Auth directly).
    - Potentially others depending on library configurations.
- **DI-ENV-004:** Client-side variables required in the browser MUST be prefixed with `NEXT_PUBLIC_`.

**8.4. Build & Deployment Process (CI/CD)**

- **DI-CD-001:** Use a Git repository (e.g., GitHub) for version control.
- **DI-CD-002:** Connect the Vercel project to the Git repository.
- **DI-CD-003 (Branching Strategy - Example):**
    - `main` branch: Represents production code. Merges trigger production deployments on Vercel.
    - `develop` branch: Represents the latest development state. Merges/pushes trigger preview/staging deployments on Vercel.
    - Feature branches: Created from `develop` for new features/fixes, merged back into `develop` via Pull Requests.
- **DI-CD-004 (Automated Deployments):** Configure Vercel to automatically build and deploy the application upon pushes/merges to designated branches (`main`, `develop`).
- **DI-CD-005 (Build Step):** Vercel automatically runs `next build` during the build process. Ensure any required build-time environment variables are configured in Vercel.
- **DI-CD-006 (Automated Testing - MANDATORY):** The CI/CD pipeline configured on Vercel (or via GitHub Actions triggering Vercel deployment checks) MUST execute the automated test suite (Unit, Integration, E2E - see NFR-MAIN-004). A deployment to production (`main` branch) MUST be blocked if any tests fail.
- **DI-CD-007 (Database Migrations):** Supabase schema migrations (SQL files in `supabase/migrations/`) are managed via the Supabase CLI and are **NOT** automatically applied by Vercel deployments. Migrations MUST be applied manually or via a separate controlled script/process against the target Supabase environment (staging, production) *before* deploying application code that relies on the schema changes to prevent runtime errors.

**8.5. Monitoring & Logging**

- **DI-MON-001:** Utilize Vercel Analytics for basic web vitals and traffic monitoring.
- **DI-MON-002:** Use Vercel's real-time Log viewer for monitoring API route logs and build logs. Configure Log Drains for persistent logging storage if needed post-MVP (NFR-REL-003).
- **DI-MON-003:** Use the Supabase Dashboard to monitor database performance, resource utilization, API usage, and Auth user activity.
- **DI-MON-004:** Consider integrating dedicated monitoring/logging/error tracking services (e.g., Sentry, Datadog, LogRocket) post-MVP for more in-depth analysis.

# **9. Implementation Notes & Considerations**

This section provides additional guidance and highlights key areas requiring special attention during development to ensure successful implementation according to the specification and leveraging the `materio-mui-demo` codebase effectively.

- **IMP-NOTE-001 (Materio Codebase Leverage):**
    - **Maximize Reuse:** Prioritize reusing components, hooks, utilities, theme configurations, and styling patterns from the `materio-mui-demo` codebase (`src/@core/`, `src/components/`, `src/views/`, `src/configs/`, `src/libs/`, `src/utils/`) wherever feasible to maintain UI/UX consistency and accelerate development.
    - **Adaptation Required:** Be mindful that direct reuse might not always be possible. Adapt components as needed, especially regarding:
        - **Authentication:** Replace any NextAuth logic with Supabase Auth integration using `supabase-js`. Adapt login/register UI pages (`src/app/(blank-layout)/pages/`) accordingly (Section 3.1).
        - **State Management:** Implement all new state logic using **Redux Toolkit** (including RTK Query for data fetching is recommended), aligning with Materio's `src/redux-store/` pattern. If reusing Materio components tightly coupled to a different pattern, refactor them to use the project's Redux store.
        - **Data Fetching:** Use RTK Query or standard Redux async thunks for interacting with the internal API endpoints defined in Section 4. Replace any mock data fetching found in Materio examples (`src/fake-db/`) with real API calls.
    - **Utilities & Theme:** Make active use of Materio's core utilities (`src/@core/utils/`, `src/utils/`) and theme variables (`src/@core/theme/` - colors, spacing, typography) for consistency.
- **IMP-NOTE-002 (AI Integration - Gemini):**
    - **Prompt Engineering:** Invest significant effort in crafting clear, specific, and robust prompts for the Gemini API, especially for generating structured JSON output (e.g., Writing Analysis, Adaptive Test Questions). Iterate on prompts based on testing. Reference Section 3.2, 3.3, 3.4 implementation notes.
    - **Structured Output:** Strictly validate the JSON structure received from Gemini using Zod schemas defined for expected outputs (e.g., `QuestionSchema`, `WritingAnalysisResult`) to prevent errors downstream. Implement robust parsing and error handling for unexpected AI responses.
    - **API Key Handling:** Carefully implement the dual API key strategy (platform key vs. encrypted user key). Ensure the backend logic correctly identifies which key to use based on user/account type/settings and that keys are handled securely (NFR-SEC-003). Use the recommended Edge Function approach for user key encryption.
    - **Error Handling:** Implement specific error handling for Gemini API calls (timeouts, rate limits, content filtering errors, malformed responses) as outlined in Section 7.3 (EH-BE-005).
- **IMP-NOTE-003 (Database & Migrations):**
    - **RLS Policies:** Implementing correct Row Level Security policies in Supabase is critical for security (NFR-SEC-001). Define these policies early and test them thoroughly.
    - **Migrations:** Strictly follow the process for creating and applying Supabase schema migrations using the Supabase CLI (Section 5.6, DI-CD-007). Ensure migrations are applied to environments *before* deploying dependent application code.
    - **Triggers:** Implement the required database trigger for automatic profile creation upon user signup (Section 3.1 Implementation Notes).
- **IMP-NOTE-004 (Automated Testing):**
    - Adherence to the automated testing strategy (Unit, Integration, E2E) outlined in NFR-MAIN-004 is **mandatory** for mitigating risks identified in the HLP.
    - Write tests *alongside* feature development, not as an afterthought.
    - Ensure CI/CD pipelines enforce passing tests before deployment (DI-CD-006).
- **IMP-NOTE-005 (State Management - Redux Toolkit):**
    - Organize Redux state logically using slices (`src/redux-store/slices/`) per feature (e.g., `userProfileSlice`, `writingToolSlice`, `adaptiveTestSlice`, `chatSlice`, `adminSlice`).
    - Utilize RTK Query for managing API interactions, caching, and loading/error states where appropriate, as it integrates well with Redux Toolkit and simplifies data fetching logic.
- **IMP-NOTE-006 (Admin Complexity):**
    - The Admin dashboard features, particularly managing `account_types`, `capabilities`, `app_access`, and `usage_limits` (Section 3.5, FR-ADM-011), require careful data modeling (Section 5.2) and backend API implementation (`/api/admin/users/[userId]`). Ensure the UI controls clearly reflect the relationships defined in the data model. Start with basic display and gradually implement CRUD operations for these settings.
- **IMP-NOTE-007 (Component Reusability):**
    - Beyond leveraging Materio, build new application-specific components (e.g., `QuestionRenderer.tsx`, `ContextualHelpPopover.tsx`) with reusability in mind.
- **IMP-NOTE-008 (i18n):**
    - Ensure all new UI components containing text implement the `next-international` translation mechanism (`t()` function) from the start (Section 3.6). Populate `vi.json` diligently.

---

This concludes the Detailed Technical Specification document (Version 0.1 - Draft). It provides a comprehensive blueprint based on the High-Level Plan and subsequent clarifications, emphasizing reuse of the `materio-mui-demo` codebase. This document should now be reviewed by the relevant stakeholders.