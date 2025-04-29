# Database Migrations

This directory contains SQL migration files for the AI-Powered Social Learning Platform.

## Migration Files

- `001_create_mini_app_tables.sql` - Creates tables for mini-apps (Writing Tools, Adaptive Test, Chat)

## How to Apply Migrations

Migrations can be applied using the Supabase CLI or directly in the Supabase Dashboard SQL Editor.

### Using Supabase CLI

```bash
supabase db push
```

### Using Supabase Dashboard

1. Go to the [Supabase Dashboard](https://app.supabase.io)
2. Select your project
3. Go to the SQL Editor
4. Copy and paste the migration file content
5. Run the SQL query

## Database Schema

The database schema is defined in the [Detailed Technical Specification (v0.1)](../Detailed%20Technical%20Specification%20(v0.1).md) - Section 5: Database Schema.

## Tables

- `mini_app_results` - Stores results from mini-apps (Writing Tools, Adaptive Test)
- `adaptive_test_sessions` - Stores adaptive test sessions
- `adaptive_test_questions` - Stores questions for adaptive tests
- `adaptive_test_answers` - Stores user answers for adaptive tests
- `editable_prompts` - Stores editable prompts for AI interactions

## Row Level Security (RLS)

All tables have Row Level Security (RLS) policies to ensure users can only access their own data. Admins have additional permissions to manage content.
