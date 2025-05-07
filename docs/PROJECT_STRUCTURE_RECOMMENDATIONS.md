# Project Structure and Authentication Recommendations

**Version:** 1.0
**Date:** May 7, 2025
**Project:** AI-Powered Social Learning Platform (Vietnam)

## Overview

This document provides recommendations for improving the project structure and authentication approach based on the analysis of the current codebase and the requirements specified in the High-Level Plan and Detailed Technical Specification.

## 1. Authentication Approach

### Current Implementation

The project currently uses **Supabase Auth** with a custom `AuthContext` provider and Redux integration. This approach is working well and aligns with the technical specification.

### Recommendation

**Continue with Supabase Auth** rather than switching to NextAuth.js for the following reasons:

1. **Already Implemented**: The Supabase Auth integration is already well-implemented with `AuthContext.tsx` and Redux integration.
2. **Consistency with Database**: Using Supabase for both authentication and database provides a more consistent development experience.
3. **Row Level Security**: Supabase's Row Level Security (RLS) policies provide a powerful way to control access to data based on user roles.
4. **Simplicity**: Supabase Auth is simpler to implement and maintain compared to NextAuth.js, especially for a project that doesn't require multiple authentication providers.

### Implementation Details for User Roles and Capabilities

1. **User Roles in Database**:
   - Add a `role` field to the `profiles` table in Supabase (e.g., 'user', 'admin', 'teacher')
   - Store role-specific capabilities in a separate `roles` table if needed

2. **Row Level Security (RLS) Policies**:
   - Implement RLS policies in Supabase to control access to data based on user roles
   - Example policy for admin-only access:
     ```sql
     CREATE POLICY "Admin access" ON "public"."admin_resources"
     FOR ALL USING (
       auth.uid() IN (
         SELECT id FROM profiles WHERE role = 'admin'
       )
     );
     ```

3. **Role-Based UI**:
   - Extend the `AuthContext` to include role information
   - Implement a `useRole` hook or similar to check user roles in the UI
   - Create role-based route protection in the middleware

## 2. Project Structure Improvements

### Current Issues

1. **Inconsistent Directory Structure**: The project structure is somewhat inconsistent and doesn't fully align with the technical specification.
2. **Underutilization of Materio**: The Materio UI components and templates are not being fully utilized.
3. **Duplicate Components**: Some components have duplicate implementations.

### Recommended Structure

```
src/
├── @core/                      # Core UI components and utilities (from Materio)
├── app/                        # Next.js App Router pages
│   ├── (blank-layout)/         # Unauthenticated pages (Login, Register)
│   ├── (dashboard)/            # Authenticated pages
│   │   ├── admin/              # Admin-only pages
│   │   ├── writing-tools/      # IELTS Writing Tools mini-app
│   │   ├── adaptive-test/      # IELTS Adaptive Test mini-app
│   │   ├── chat/               # AI Tutor Chat
│   │   └── account/            # User account pages
│   ├── api/                    # API routes
│   └── landing/                # Landing page components
├── components/                 # Shared components
│   ├── ui/                     # UI components (buttons, cards, etc.)
│   ├── forms/                  # Form components
│   ├── layout/                 # Layout components
│   └── features/               # Feature-specific components
├── hooks/                      # Custom hooks
├── lib/                        # Library code and utilities
│   ├── api/                    # API client functions
│   ├── auth/                   # Authentication utilities
│   └── utils/                  # General utilities
├── redux-store/                # Redux store configuration
│   └── slices/                 # Redux slices
├── styles/                     # Global styles
└── types/                      # TypeScript type definitions
```

### Implementation Strategy

1. **Organize by Feature**:
   - Group related components, hooks, and utilities by feature
   - Keep feature-specific code together for better maintainability

2. **Consistent Naming**:
   - Use consistent naming conventions for all files and components
   - Follow a pattern like `[FeatureName][ComponentType].tsx`

3. **Proper Utilization of Materio**:
   - Copy and adapt Materio components to our project structure
   - Follow the process:
     1. Identify needed components in Materio
     2. Copy to appropriate location in our project
     3. Adapt to our project's needs (authentication, state management, etc.)
     4. Document the source and modifications

## 3. Specific Recommendations for Materio Integration

### UI Components

1. **Authentication Pages**:
   - Copy and adapt Materio's login/register pages from `materio-mui-demo/src/app/[lang]/(blank-layout-pages)/(guest-only)/`
   - Modify to use Supabase Auth instead of NextAuth

2. **Dashboard Layout**:
   - Use Materio's vertical layout components from `materio-mui-demo/src/@layouts/components/vertical/`
   - Adapt the navigation to match our application's structure

3. **User Profile and Settings**:
   - Leverage Materio's account settings pages from `materio-mui-demo/src/app/[lang]/(dashboard)/(private)/pages/account-settings/`
   - Adapt to use our Supabase data structure

### Theme and Styling

1. **Theme Configuration**:
   - Copy Materio's theme configuration from `materio-mui-demo/src/@core/theme/`
   - Adapt colors and typography to match our brand

2. **Component Overrides**:
   - Use Materio's MUI component overrides from `materio-mui-demo/src/@core/theme/overrides/`
   - Customize as needed for our application

## 4. Implementation Plan

### Phase 1: Structure Cleanup

1. Remove duplicate components (completed)
2. Organize existing components according to the recommended structure
3. Document the new structure in `DIRECTORY_STRUCTURE.md`

### Phase 2: Materio Integration

1. Copy and adapt essential Materio components
2. Implement theme configuration
3. Update authentication UI while maintaining Supabase backend

### Phase 3: Feature Development

1. Continue implementing features according to the technical specification
2. Follow the new structure and guidelines for all new code

## Conclusion

By implementing these recommendations, we can improve the project's structure, maintainability, and development efficiency while leveraging the Materio UI components effectively. The continued use of Supabase Auth with proper role-based access control will provide a secure and scalable authentication solution.
