# API Routes

This directory contains the Next.js API routes for the AI-Powered Social Learning Platform.

## Directory Structure

- `auth/` - Authentication-related endpoints
- `users/` - User profile API
- `mini-apps/` - Endpoints for AI mini-app interactions
  - `writing-tools/` - IELTS Writing Tools API endpoints
  - `adaptive-test/` - IELTS Adaptive Test API endpoints
- `ai/` - AI service interaction endpoints
  - `tutor/` - AI Tutor Chat API
  - `contextual-help/` - Contextual help API
- `admin/` - Admin-specific API endpoints
  - `users/` - User management API
  - `stats/` - Usage statistics API
  - `content/` - Content management API

## Implementation Notes

- API routes use the Next.js App Router API Routes
- Authentication is handled via Supabase Auth
- AI functionality uses the Google Gemini API
- Database interactions use Supabase
- All API routes implement proper error handling and validation

## References

- [Detailed Technical Specification (v0.1)](../../../Detailed%20Technical%20Specification%20(v0.1).md) - Section 4: API Specifications
- [Next.js API Routes Documentation](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Google Gemini API Documentation](https://googleapis.github.io/js-genai/main/index.html)
- [Supabase JS Documentation](https://supabase.com/docs/reference/javascript/)
