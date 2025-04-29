# App Directory

This directory contains the Next.js App Router structure for the AI-Powered Social Learning Platform.

## Directory Structure

- `(blank-layout)/` - Layout for unauthenticated pages (Login, Register)
- `(dashboard)/` - Main authenticated layout (Vertical)
  - `writing-tools/` - IELTS Writing Tools mini-app
  - `new-ielts-adaptive/` - IELTS Adaptive Test mini-app
  - `chat/` - AI Tutor Chat
  - `pages/` - Standard pages within the dashboard layout
  - `admin/` - Admin Dashboard Section (Restricted Access)
- `api/` - Next.js API Routes
  - `auth/` - Auth-related endpoints
  - `users/` - User profile API
  - `mini-apps/` - Endpoints for AI mini-app interactions
  - `ai/` - AI service interaction endpoints
  - `admin/` - Admin-specific API endpoints
- `layout.tsx` - Root layout
- `page.tsx` - Root page (redirect or landing if not logged in)
- `globals.css` - Global styles

## References

- [Detailed Technical Specification (v0.1)](../../Detailed%20Technical%20Specification%20(v0.1).md) - Section 2: Proposed File & Directory Structure
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
