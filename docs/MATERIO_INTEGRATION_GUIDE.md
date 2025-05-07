# Materio Integration Guide

**Version:** 1.0
**Date:** May 7, 2025
**Project:** AI-Powered Social Learning Platform (Vietnam)

## Overview

This guide provides detailed instructions for effectively integrating and utilizing the Materio UI components and templates in the AI-Powered Social Learning Platform. The Materio template provides a rich set of components, layouts, and pages that can significantly accelerate development while maintaining a consistent and professional UI.

## 1. Understanding the Materio Structure

The Materio template is organized into several key directories:

1. **@core**: Core UI components, theme configuration, and utilities
2. **@layouts**: Layout components for different page layouts
3. **@menu**: Navigation menu components and utilities
4. **components**: Reusable UI components
5. **views**: Page-specific components and layouts
6. **configs**: Configuration files for theme, navigation, etc.
7. **libs**: Utility libraries and integrations
8. **public/images**: Image assets for the template

## 2. Integration Process

When integrating Materio components into our project, follow this process:

1. **Identify**: Identify the component or page you need from the Materio template
2. **Copy**: Copy the component and its dependencies to the appropriate location in our project
3. **Adapt**: Modify the component to work with our project's state management, authentication, and data fetching
4. **Document**: Document the source and any modifications made to the component

### Example: Integrating a Card Component

```typescript
// Original location: materio-mui-demo/src/components/card-statistics/Horizontal.tsx
// Our location: src/components/ui/cards/StatCard.tsx

// 1. Copy the component
import { Box, Card, Typography, useTheme } from '@mui/material'

// 2. Adapt the component to our needs
interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

const StatCard = ({ title, value, icon, color = 'primary' }: StatCardProps) => {
  const theme = useTheme()
  
  return (
    <Card sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            mr: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: theme.palette[color].light,
            color: theme.palette[color].main
          }}
        >
          {icon}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6">{value}</Typography>
        </Box>
      </Box>
    </Card>
  )
}

export default StatCard
```

## 3. Key Components to Integrate

### 3.1 Layout Components

1. **Vertical Layout**:
   - Source: `materio-mui-demo/src/@layouts/VerticalLayout.tsx`
   - Dependencies: 
     - `materio-mui-demo/src/@layouts/components/vertical/*`
     - `materio-mui-demo/src/@menu/vertical-menu/*`
   - Target: `src/@layouts/VerticalLayout/index.tsx`

2. **Blank Layout**:
   - Source: `materio-mui-demo/src/@layouts/BlankLayout.tsx`
   - Target: `src/@layouts/BlankLayout/index.tsx`

### 3.2 Authentication Pages

1. **Login Page**:
   - Source: `materio-mui-demo/src/app/[lang]/(blank-layout-pages)/(guest-only)/login/page.tsx`
   - Target: `src/app/(blank-layout)/pages/login/page.tsx`
   - Adaptation: Replace NextAuth with Supabase Auth

2. **Register Page**:
   - Source: `materio-mui-demo/src/app/[lang]/(blank-layout-pages)/(guest-only)/register/page.tsx`
   - Target: `src/app/(blank-layout)/pages/register/page.tsx`
   - Adaptation: Replace NextAuth with Supabase Auth

3. **Forgot Password Page**:
   - Source: `materio-mui-demo/src/app/[lang]/(blank-layout-pages)/(guest-only)/forgot-password/page.tsx`
   - Target: `src/app/(blank-layout)/pages/forgot-password/page.tsx`
   - Adaptation: Replace NextAuth with Supabase Auth

### 3.3 Dashboard Components

1. **User Profile**:
   - Source: `materio-mui-demo/src/views/pages/user-profile/*`
   - Target: `src/app/(dashboard)/pages/user-profile/*`
   - Adaptation: Connect to Supabase for user data

2. **Account Settings**:
   - Source: `materio-mui-demo/src/views/pages/account-settings/*`
   - Target: `src/app/(dashboard)/pages/account-settings/*`
   - Adaptation: Connect to Supabase for user data

3. **Dashboard Cards**:
   - Source: `materio-mui-demo/src/components/card-statistics/*`
   - Target: `src/components/ui/cards/*`

### 3.4 Form Components

1. **Form Layouts**:
   - Source: `materio-mui-demo/src/views/forms/form-layouts/*`
   - Target: `src/components/forms/layouts/*`

2. **Form Validation**:
   - Source: `materio-mui-demo/src/views/forms/form-validation/*`
   - Target: `src/components/forms/validation/*`

### 3.5 Theme Configuration

1. **Theme Provider**:
   - Source: `materio-mui-demo/src/@core/theme/*`
   - Target: `src/@core/theme/*`
   - Adaptation: Customize colors and typography to match our brand

2. **Component Overrides**:
   - Source: `materio-mui-demo/src/@core/theme/overrides/*`
   - Target: `src/@core/theme/overrides/*`
   - Adaptation: Customize as needed for our application

## 4. E-Learning Specific Components

Materio includes several components that are particularly relevant for our e-learning platform:

### 4.1 Academy App Components

1. **Course Cards**:
   - Source: `materio-mui-demo/src/views/apps/academy/my-courses/Courses.tsx`
   - Target: `src/components/features/courses/CourseCard.tsx`

2. **Course Details**:
   - Source: `materio-mui-demo/src/views/apps/academy/course-details/*`
   - Target: `src/app/(dashboard)/courses/[courseId]/*`

3. **Dashboard**:
   - Source: `materio-mui-demo/src/views/apps/academy/dashboard/*`
   - Target: `src/app/(dashboard)/page.tsx`

### 4.2 Chat Components

1. **Chat Interface**:
   - Source: `materio-mui-demo/src/views/apps/chat/*`
   - Target: `src/app/(dashboard)/chat/*`
   - Adaptation: Connect to our AI chat backend

## 5. Implementation Strategy

### 5.1 Phased Approach

Implement the Materio integration in phases:

1. **Phase 1: Core UI**
   - Theme configuration
   - Layout components
   - Basic UI components

2. **Phase 2: Authentication UI**
   - Login page
   - Register page
   - Forgot password page

3. **Phase 3: Dashboard UI**
   - User profile
   - Account settings
   - Dashboard components

4. **Phase 4: Feature-Specific UI**
   - Course components
   - Chat interface
   - Writing tools interface
   - Adaptive test interface

### 5.2 Component Documentation

For each integrated component, document:

1. **Source**: Original location in Materio
2. **Target**: Location in our project
3. **Dependencies**: Other components or utilities required
4. **Modifications**: Changes made to adapt to our project
5. **Usage Examples**: How to use the component in our project

## 6. Best Practices

1. **Maintain Consistency**:
   - Follow Materio's design patterns and component structure
   - Use consistent naming conventions
   - Maintain consistent spacing, typography, and color usage

2. **Avoid Direct Imports**:
   - Never import directly from the Materio directory
   - Always copy and adapt components to our project structure

3. **Leverage Theme Configuration**:
   - Use theme variables for colors, spacing, and typography
   - Avoid hardcoding values that could be defined in the theme

4. **Component Composition**:
   - Break down complex components into smaller, reusable parts
   - Use composition over inheritance

5. **Responsive Design**:
   - Ensure all components work well on all screen sizes
   - Use Materio's responsive utilities and breakpoints

## 7. Common Adaptation Patterns

### 7.1 Authentication Adaptation

```typescript
// Original Materio component (using NextAuth)
const handleLogin = async () => {
  await signIn('credentials', {
    email,
    password,
    redirect: false
  })
}

// Adapted component (using Supabase Auth)
const { signIn } = useAuth()
const handleLogin = async () => {
  const { error } = await signIn(email, password)
  if (!error) {
    router.push('/')
  }
}
```

### 7.2 Data Fetching Adaptation

```typescript
// Original Materio component (using fake data)
import { db } from '@/fake-db/apps/academy'
const courses = db.courses

// Adapted component (using Supabase)
import { supabase } from '@/utils/supabase'
const [courses, setCourses] = useState([])

useEffect(() => {
  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
    
    if (!error && data) {
      setCourses(data)
    }
  }
  
  fetchCourses()
}, [])
```

## Conclusion

By following this guide, we can effectively leverage the Materio UI components and templates to accelerate development while maintaining a consistent and professional UI. The phased approach ensures that we can integrate the components in a structured manner, focusing on the most critical components first.
