# AI-Powered Social Learning Platform - Directory Structure

**Version:** 1.0
**Date:** May 2, 2025
**Project:** AI-Powered Social Learning Platform (Vietnam)

## Overview

This document provides a comprehensive overview of the project's directory structure, following the architecture defined in the Detailed Technical Specification (v0.1). It serves as a reference for understanding the organization of code and assets within the project.

## Current Directory Structure

```
.
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── @core/              # Core Materio components, theme, styles, utils
│   │   ├── components/     # Reusable low-level UI components
│   │   │   └── mui/        # MUI component wrappers and extensions
│   │   ├── theme/          # MUI theme configuration
│   │   │   ├── overrides/  # Component style overrides
│   │   │   ├── breakpoints.ts
│   │   │   ├── palette.ts
│   │   │   ├── shadows.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   └── ThemeProvider.tsx
│   │   ├── styles/         # Core global styles
│   │   ├── utils/          # Core utility functions
│   │   └── types/          # Core type definitions
│   ├── @layouts/           # Layout components
│   │   ├── BlankLayout/    # Layout for unauthenticated pages
│   │   │   └── index.tsx
│   │   └── VerticalLayout/ # Main authenticated layout
│   │       └── index.tsx
│   ├── @menu/              # Menu generation logic & components
│   │   └── vertical-menu/  # Vertical menu implementation
│   │       └── index.tsx
│   ├── app/                # Next.js App Router directory
│   │   ├── (blank-layout)/ # Blank layout pages
│   │   │   ├── (guest-only)/ # Guest-only pages
│   │   │   │   ├── login/    # Login page
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register/ # Register page
│   │   │   │   │   └── page.tsx
│   │   │   │   └── forgot-password/ # Forgot password page
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx   # Blank layout component
│   │   ├── (dashboard)/    # Dashboard layout pages
│   │   │   ├── (admin)/    # Admin-only pages
│   │   │   │   ├── users/  # User management
│   │   │   │   ├── stats/  # Statistics
│   │   │   │   └── content-management/ # Content management
│   │   │   ├── (private)/  # Authenticated user pages
│   │   │   │   ├── pages/  # General pages
│   │   │   │   │   └── account-settings/ # Account settings
│   │   │   │   ├── writing-tools/ # IELTS Writing Tools mini-app
│   │   │   │   ├── adaptive-test/ # IELTS Adaptive Test mini-app
│   │   │   │   └── chat/   # AI Tutor Chat
│   │   │   └── layout.tsx  # Dashboard layout component
│   │   ├── api/            # API Routes (Next.js API)
│   │   │   └── README.md   # Placeholder for API routes
│   │   ├── landing/        # Landing page
│   │   │   ├── page.tsx    # Landing page component
│   │   │   └── components/ # Landing page components
│   │   │       ├── Header.tsx           # Header component
│   │   │       ├── HeroSection.tsx      # Hero section
│   │   │       ├── FeaturesSection.tsx  # Features section
│   │   │       ├── HowItWorks.tsx       # How it works section
│   │   │       ├── TestimonialsSection.tsx # Testimonials section
│   │   │       ├── StatisticsSection.tsx # Statistics section
│   │   │       ├── PricingSection.tsx   # Pricing section
│   │   │       ├── CTASection.tsx       # CTA section
│   │   │       └── Footer.tsx           # Footer component
│   │   ├── layout.tsx      # Root layout
│   │   ├── metadata.ts     # App metadata
│   │   ├── page.tsx        # Root page
│   │   └── globals.css     # Global styles
│   ├── assets/             # Static assets (images, fonts, etc.)
│   ├── components/         # Global reusable application components
│   │   ├── ui/             # UI components (buttons, cards, etc.)
│   │   ├── forms/          # Form components
│   │   ├── layout/         # Layout components
│   │   └── features/       # Feature-specific components
│   │       └── LanguageSwitcher.tsx # Language switcher component
│   ├── configs/            # Application configuration
│   │   ├── i18n.ts         # i18n configuration
│   │   ├── themeConfig.ts  # Theme configuration
│   │   └── navigation/     # Navigation configuration
│   │       └── vertical/   # Vertical navigation items
│   │           └── index.ts
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.tsx # Authentication context provider
│   ├── data/               # Static data, dictionaries
│   │   └── dictionaries/   # i18n JSON files
│   │       ├── en.json     # English translations
│   │       └── vi.json     # Vietnamese translations
│   ├── hooks/              # Global custom hooks
│   │   ├── useRole.ts      # Role-based access control hook
│   │   └── useSettings.ts  # Settings hook
│   ├── libs/               # External libraries configuration (to be implemented)
│   ├── redux-store/        # Redux Toolkit store and slices
│   │   ├── slices/         # Redux slices
│   │   │   └── authSlice.ts # Authentication slice
│   │   └── index.ts        # Redux store configuration
│   ├── styles/             # Global and utility styles (to be implemented)
│   ├── types/              # Global TypeScript types (to be implemented)
│   └── utils/              # Global utility functions
│       ├── gemini.ts       # Google Gemini API utility
│       ├── i18n.ts         # i18n utility functions
│       └── supabase.ts     # Supabase client utility
├── supabase/               # Supabase specific files
│   └── migrations/         # Database migrations
│       ├── 20250507_create_profiles_table.sql # Profiles table migration
│       └── 20250507_create_roles_tables.sql   # Roles tables migration
├── .env.local              # Environment variables (not in repository)
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── CODE_MODIFICATION_LOG.md # Log of code modifications
├── CONTEXT_DIARY.md        # Development context diary
├── DEVELOPMENT_WORKFLOW.md # Development workflow documentation
├── DIRECTORY_STRUCTURE.md  # This file
├── next.config.js          # Next.js configuration
├── NEXT_TASKS.md           # Next tasks to implement
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── PROJECT_STATUS.md       # Current project status
├── README.md               # Project README
├── TASK_TRACKING.md        # Task tracking document
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Key Directories and Their Purpose

### 1. Core Framework and Configuration

- **`src/app/`**: Next.js App Router directory containing pages, layouts, and API routes
- **`src/configs/`**: Application configuration files for theme, navigation, and i18n
- **`src/redux-store/`**: Redux Toolkit store configuration and slices
- **`src/utils/`**: Utility functions for Supabase, Gemini API, and i18n

### 2. UI Components and Layouts

- **`src/@core/`**: Core Materio components, theme, styles, and utilities
- **`src/@layouts/`**: Layout components for different page types
- **`src/@menu/`**: Menu generation logic and components
- **`src/components/`**: Global reusable application components

### 3. Data and Assets

- **`src/data/`**: Static data and dictionaries for i18n
- **`src/assets/`**: Static assets like images and fonts
- **`public/`**: Publicly accessible static assets

### 4. API and Backend Integration

- **`src/app/api/`**: Next.js API routes for backend functionality
- **`src/utils/supabase.ts`**: Supabase client utility for database access
- **`src/utils/gemini.ts`**: Google Gemini API utility for AI features

## Planned Directories (To Be Implemented)

- **`src/contexts/`**: React Context providers (e.g., AuthContext)
- **`src/hooks/`**: Custom React hooks
- **`src/libs/`**: External libraries configuration
- **`src/styles/`**: Global and utility styles
- **`src/types/`**: Global TypeScript types
- **`supabase/`**: Supabase specific files (migrations, functions)

## File Naming Conventions

- **React Components**: PascalCase (e.g., `LanguageSwitcher.tsx`)
- **Utility Functions**: camelCase (e.g., `i18n.ts`)
- **Configuration Files**: camelCase (e.g., `themeConfig.ts`)
- **Constants**: UPPER_SNAKE_CASE (within files)
- **Types and Interfaces**: PascalCase (e.g., `UserProfile`)

## Import Path Aliases

The following path aliases are configured in `tsconfig.json`:

- **`@/`**: Points to the `src/` directory
- **`@core/`**: Points to the `src/@core/` directory
- **`@layouts/`**: Points to the `src/@layouts/` directory
- **`@menu/`**: Points to the `src/@menu/` directory

## Reference Documents

- **Detailed Technical Specification:** v0.1 (April 29, 2025)
- **High-Level Plan:** v1.0 (April 28, 2025)
