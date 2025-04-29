# Utilities

This directory contains utility functions for the AI-Powered Social Learning Platform.

## Files

- `supabase.ts` - Supabase client utility
- `gemini.ts` - Google Gemini client utility
- `getDictionary.ts` - Internationalization utility
- `formatters.ts` - Data formatting utilities
- `validators.ts` - Data validation utilities

## Implementation Notes

- Supabase client is initialized with environment variables
- Gemini client is initialized with API key from environment variables or user settings
- Internationalization uses next-international
- Validation uses Zod schemas

## References

- [Detailed Technical Specification (v0.1)](../../Detailed%20Technical%20Specification%20(v0.1).md) - Section 2: Proposed File & Directory Structure
- [Supabase JS Documentation](https://supabase.com/docs/reference/javascript/)
- [Google Gemini API Documentation](https://googleapis.github.io/js-genai/main/index.html)
- [next-international Documentation](https://github.com/QuiiBz/next-international)
