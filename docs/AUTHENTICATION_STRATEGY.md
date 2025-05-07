# Authentication Strategy

**Version:** 1.0
**Date:** May 7, 2025
**Project:** AI-Powered Social Learning Platform (Vietnam)

## Overview

This document outlines the authentication strategy for the AI-Powered Social Learning Platform, focusing on the decision to use Supabase Auth instead of NextAuth.js, and providing implementation details for user roles and capabilities.

## 1. Authentication Provider: Supabase Auth

### Decision Rationale

After analyzing the current codebase and the requirements in the technical specification, we recommend continuing with **Supabase Auth** for the following reasons:

1. **Integration with Database**: Supabase provides a seamless integration between authentication and database, allowing for efficient implementation of Row Level Security (RLS) policies.

2. **Existing Implementation**: The project already has a well-implemented Supabase Auth setup with `AuthContext.tsx` and Redux integration.

3. **Simplicity**: Supabase Auth offers a simpler implementation compared to NextAuth.js, especially for projects that don't require multiple authentication providers.

4. **Performance**: Supabase Auth is optimized for performance and works well with the Supabase database.

5. **Consistency**: Using Supabase for both authentication and database provides a more consistent development experience.

### Implementation Details

The current implementation in `src/contexts/AuthContext.tsx` provides:

- User authentication state management
- Session handling
- Sign-up, sign-in, and sign-out functionality
- Password reset functionality
- Integration with Redux for global state management

## 2. User Roles and Capabilities

### Database Schema

To implement user roles and capabilities, we recommend the following database schema:

1. **profiles Table**:
   ```sql
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     full_name TEXT,
     avatar_url TEXT,
     role TEXT NOT NULL DEFAULT 'user',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **roles Table** (for more complex role-based permissions):
   ```sql
   CREATE TABLE roles (
     id SERIAL PRIMARY KEY,
     name TEXT UNIQUE NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **role_capabilities Table** (for granular permissions):
   ```sql
   CREATE TABLE role_capabilities (
     id SERIAL PRIMARY KEY,
     role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
     capability TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(role_id, capability)
   );
   ```

### Row Level Security (RLS) Policies

Implement RLS policies to control access to data based on user roles:

1. **Basic Profile Access**:
   ```sql
   -- Users can read their own profile
   CREATE POLICY "Users can read own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);
   
   -- Users can update their own profile
   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);
   ```

2. **Admin Access**:
   ```sql
   -- Admins can read all profiles
   CREATE POLICY "Admins can read all profiles" ON profiles
     FOR SELECT USING (
       auth.uid() IN (
         SELECT id FROM profiles WHERE role = 'admin'
       )
     );
   
   -- Admins can update all profiles
   CREATE POLICY "Admins can update all profiles" ON profiles
     FOR UPDATE USING (
       auth.uid() IN (
         SELECT id FROM profiles WHERE role = 'admin'
       )
     );
   ```

3. **Content Access**:
   ```sql
   -- Users can read public content
   CREATE POLICY "Users can read public content" ON content
     FOR SELECT USING (is_public = true);
   
   -- Users can read their own content
   CREATE POLICY "Users can read own content" ON content
     FOR SELECT USING (auth.uid() = user_id);
   
   -- Admins can read all content
   CREATE POLICY "Admins can read all content" ON content
     FOR SELECT USING (
       auth.uid() IN (
         SELECT id FROM profiles WHERE role = 'admin'
       )
     );
   ```

## 3. Frontend Implementation

### Extended AuthContext

Extend the current `AuthContext` to include role information:

```typescript
// src/contexts/AuthContext.tsx
interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  userRole: string | null
  isAdmin: boolean
  signUp: (email: string, password: string, metadata?: { [key: string]: any }) => Promise<{
    error: Error | null
    data: any | null
  }>
  signIn: (email: string, password: string) => Promise<{
    error: Error | null
    data: any | null
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: Error | null
    data: any | null
  }>
}
```

### Role-Based Hooks

Create custom hooks for role-based access control:

```typescript
// src/hooks/useRole.ts
import { useAuth } from '@/contexts/AuthContext'

export function useRole() {
  const { userRole } = useAuth()
  
  return {
    role: userRole,
    isAdmin: userRole === 'admin',
    isTeacher: userRole === 'teacher',
    isUser: userRole === 'user',
    hasRole: (role: string) => userRole === role,
    hasAnyRole: (roles: string[]) => roles.includes(userRole || '')
  }
}
```

### Route Protection

Implement role-based route protection in the middleware:

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase-middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Create a Supabase client
  const supabase = createClient(request)
  
  // Get the user from the session
  const { data: { session } } = await supabase.auth.getSession()
  
  // Check if the user is authenticated
  const isAuthenticated = !!session?.user
  
  // Public routes that don't require authentication
  const publicRoutes = ['/landing', '/pages/login', '/pages/register']
  
  // Admin-only routes
  const adminRoutes = ['/admin']
  
  // Redirect unauthenticated users to login
  if (!isAuthenticated && !publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/pages/login', request.url))
  }
  
  // Check admin access for admin routes
  if (isAuthenticated && adminRoutes.some(route => pathname.startsWith(route))) {
    // Get the user's profile to check role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    
    // Redirect non-admin users to dashboard
    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
}
```

## 4. UI Components from Materio

While we're using Supabase Auth for authentication, we can still leverage Materio's UI components for the login and registration pages:

1. **Copy and Adapt Login Page**:
   - Copy from `materio-mui-demo/src/app/[lang]/(blank-layout-pages)/(guest-only)/login/page.tsx`
   - Modify to use our Supabase Auth functions from `AuthContext`

2. **Copy and Adapt Register Page**:
   - Copy from `materio-mui-demo/src/app/[lang]/(blank-layout-pages)/(guest-only)/register/page.tsx`
   - Modify to use our Supabase Auth functions from `AuthContext`

3. **Copy and Adapt Forgot Password Page**:
   - Copy from `materio-mui-demo/src/app/[lang]/(blank-layout-pages)/(guest-only)/forgot-password/page.tsx`
   - Modify to use our Supabase Auth functions from `AuthContext`

## 5. Implementation Plan

1. **Database Setup**:
   - Create the necessary tables and RLS policies in Supabase

2. **Backend Implementation**:
   - Extend the `AuthContext` to include role information
   - Create API endpoints for role-based operations

3. **Frontend Implementation**:
   - Create role-based hooks and components
   - Implement route protection in the middleware
   - Adapt Materio UI components for authentication pages

4. **Testing**:
   - Test authentication flows with different user roles
   - Verify RLS policies are working correctly
   - Test route protection for different user roles

## Conclusion

By implementing this authentication strategy, we can provide a secure, scalable, and user-friendly authentication system for the AI-Powered Social Learning Platform. The use of Supabase Auth with proper role-based access control will ensure that users can only access the features and data they are authorized to use.
