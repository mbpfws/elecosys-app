# Code Modification Log

This document tracks all code file creations and modifications, including installation of external dependencies, libraries, or SDKs.

## April 30, 2025

### Package.json Updates

Updated dependencies to latest compatible versions:

#### Dependencies
- @google/genai: ^0.2.0 → ^0.2.1
- @mui/icons-material: ^5.15.12 → ^7.0.2
- @mui/material: ^5.15.12 → ^7.0.2
- @reduxjs/toolkit: ^2.2.1 → ^2.7.0
- @supabase/supabase-js: ^2.39.7 → ^2.49.4
- @tiptap/react: ^2.2.4 → ^2.11.7
- @tiptap/starter-kit: ^2.2.4 → ^2.11.7
- next-international: ^1.2.4 → ^1.3.1
- react-redux: ^9.1.0 → ^9.2.0
- zod: ^3.22.4 → ^3.24.3

#### DevDependencies
- @playwright/test: ^1.42.1 → ^1.52.0
- @testing-library/jest-dom: ^6.4.2 → ^6.6.3
- @testing-library/react: ^14.0.0 → ^16.3.0
- tailwindcss: ^4 → ^4.0.0
- typescript: ^5 → ^5.4.5

### Core Utility Files Created

- src/utils/supabase.ts - Supabase client utility
- src/utils/gemini.ts - Google Genai client utility
- src/configs/i18n.ts - i18n configuration
- src/redux-store/index.ts - Redux store configuration
- src/data/dictionaries/en.json - English translations
- src/data/dictionaries/vi.json - Vietnamese translations

### Research Notes

- Searched for the latest versions of all dependencies to ensure compatibility
- Verified that @google/genai 0.2.1 is the latest version of the Google Genai SDK
- Confirmed that MUI has released version 7.0.2 which is a major update from 5.15.12
- Maintained React at version 18.2.0 for compatibility with other dependencies
- Updated testing libraries to their latest versions
- Specified exact version for tailwindcss to avoid potential compatibility issues

### References

- Google Genai SDK: https://www.npmjs.com/package/@google/genai
- MUI: https://www.npmjs.com/package/@mui/material
- Redux Toolkit: https://www.npmjs.com/package/@reduxjs/toolkit
- Supabase JS: https://www.npmjs.com/package/@supabase/supabase-js
- TipTap: https://www.npmjs.com/package/@tiptap/react
- Next-international: https://www.npmjs.com/package/next-international
- Zod: https://www.npmjs.com/package/zod
- Playwright: https://www.npmjs.com/package/@playwright/test
- React Testing Library: https://www.npmjs.com/package/@testing-library/react

## May 2, 2025

### Internationalization (i18n) Implementation

#### Files Created/Modified
- src/utils/i18n.ts - Custom hook for using i18n in components
- src/configs/i18n.ts - Updated i18n configuration with client-side translation
- src/components/LanguageSwitcher.tsx - Language switcher component
- src/@layouts/VerticalLayout/index.tsx - Updated to use i18n
- src/@menu/vertical-menu/index.tsx - Updated to use i18n
- src/app/pages/login/page.tsx - Updated to use i18n
- src/app/pages/login/layout.tsx - Simplified login page layout
- src/app/layout.tsx - Updated root layout
- src/app/page.tsx - Updated root page
- src/middleware.ts - Added placeholder middleware

#### Implementation Details
- Created a client-side i18n implementation using dictionary files
- Added a language switcher component to toggle between English and Vietnamese
- Updated all components to use the i18n translation function
- Implemented proper loading of dictionary files based on selected language
- Ensured all user-facing text is localized according to the technical specification

#### Research Notes
- Explored different approaches to i18n in Next.js 15 with App Router
- Decided on a client-side approach for simplicity and compatibility
- Ensured the implementation follows the requirements in the technical specification
- Verified that both English and Vietnamese languages are supported

#### References
- Next.js Internationalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization
- Next-international: https://github.com/QuiiBz/next-international

## May 3, 2025

### Supabase Authentication Implementation

#### Files Created/Modified
- src/contexts/AuthContext.tsx - Created authentication context provider
- src/redux-store/slices/authSlice.ts - Created Redux slice for auth state
- src/redux-store/index.ts - Updated to include auth reducer
- src/redux-store/ReduxProvider.tsx - Created Redux provider component
- src/app/pages/login/page.tsx - Updated with Supabase authentication
- src/app/(blank-layout)/pages/register/page.tsx - Updated with Supabase authentication
- src/components/layout/shared/UserDropdown.tsx - Created user dropdown with logout functionality
- src/middleware.ts - Updated for route protection
- src/app/layout.tsx - Updated to include AuthProvider and ReduxProvider
- src/data/dictionaries/en.json - Updated with new auth translations
- src/data/dictionaries/vi.json - Updated with new auth translations

#### Implementation Details
- Created AuthContext to manage authentication state using Supabase Auth
- Implemented Redux slice for storing user authentication data
- Updated login and registration pages with form validation using Zod
- Added error handling and loading states for authentication processes
- Implemented route protection using middleware
- Created user dropdown component with logout functionality
- Updated i18n dictionaries with authentication-related translations
- Connected AuthContext with Redux for global state management

#### Research Notes
- Researched Supabase Auth API for authentication implementation
- Explored best practices for form validation with Zod
- Investigated route protection strategies in Next.js App Router
- Studied the integration of Supabase Auth with React Context API
- Examined the connection between React Context and Redux for state management

#### References
- Supabase Auth Documentation: https://supabase.com/docs/reference/javascript/auth-signin
- Zod Documentation: https://zod.dev/
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Redux Toolkit: https://redux-toolkit.js.org/
- React Context API: https://react.dev/reference/react/createContext
