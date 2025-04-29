# Blank Layout

This directory contains the layout and pages for unauthenticated users (Login, Register).

## Directory Structure

- `layout.tsx` - Blank layout component for unauthenticated pages
- `pages/` - Pages within the blank layout
  - `login/` - Login page
  - `register/` - Registration page

## Implementation Notes

- The blank layout is adapted from Materio's `BlankLayout.tsx`
- Authentication is implemented using Supabase Auth
- Form validation is implemented using Zod

## References

- [Detailed Technical Specification (v0.1)](../../../Detailed%20Technical%20Specification%20(v0.1).md) - Section 3.1: User Authentication & Profiles
- [Materio UI Demo](../../../materio-mui-demo/src/@layouts/BlankLayout.tsx) - Original blank layout component
