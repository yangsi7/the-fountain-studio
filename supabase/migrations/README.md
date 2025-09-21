# Database Migrations

This directory contains Supabase database migrations for The Fountain Studio.

## Migration Naming Convention

```
YYYYMMDDHHMMSS_description.sql
```

Example: `20250919120000_create_users_table.sql`

## Creating Migrations

### Using Supabase CLI
```bash
supabase migration new create_users_table
```

### Manual Creation
Create a new `.sql` file following the naming convention above.

## Migration Template

```sql
-- Migration: Description
-- Created: YYYY-MM-DD
-- Author: Your Name

BEGIN;

-- Your migration SQL here

COMMIT;
```

## Best Practices

1. **Always use transactions** (BEGIN/COMMIT)
2. **Enable RLS immediately** after table creation
3. **Create policies** before inserting data
4. **Test migrations locally** before production
5. **Never modify existing migrations** - create new ones
6. **Include rollback plans** in comments

## Example Migration

```sql
BEGIN;

-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

COMMIT;
```

## Running Migrations

### Local Development
```bash
supabase db push
```

### Production
```bash
supabase db push --linked
```

## Checking Migration Status
```bash
supabase migration list
```

---
*Part of The Fountain Studio | Memory System v1.0*