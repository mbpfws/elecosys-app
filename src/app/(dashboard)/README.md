# Dashboard Layout

This directory contains the layout and pages for authenticated users.

## Directory Structure

- `layout.tsx` - Dashboard layout component with vertical navigation
- `page.tsx` - Dashboard home page
- `writing-tools/` - IELTS Writing Tools mini-app
- `new-ielts-adaptive/` - IELTS Adaptive Test mini-app
- `chat/` - AI Tutor Chat
- `pages/` - Standard pages within the dashboard layout
  - `account-settings/` - User account settings
- `admin/` - Admin Dashboard Section (Restricted Access)
  - `users/` - User management
  - `stats/` - Usage statistics
  - `content-management/` - Content management

## Implementation Notes

- The dashboard layout is adapted from Materio's `VerticalLayout.tsx`
- Navigation is configured in `src/configs/navigation/vertical/index.ts`
- Admin section is protected with role-based access control
- Mini-apps use the Google Gemini API for AI functionality

## References

- [Detailed Technical Specification (v0.1)](../../../Detailed%20Technical%20Specification%20(v0.1).md) - Sections 3.2-3.5: Mini-Apps and Admin Features
- [Materio UI Demo](../../../materio-mui-demo/src/@layouts/VerticalLayout.tsx) - Original vertical layout component
