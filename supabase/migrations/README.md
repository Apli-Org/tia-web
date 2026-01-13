# Newsletter Subscribers Table Migration

## How to apply this migration

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard: https://app.supabase.com/project/ibxifmqovisdyrzpemyv
2. Navigate to **SQL Editor** in the left sidebar
3. Copy the content of `create_newsletter_subscribers.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the migration

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Make sure you're logged in
supabase login

# Link your project
supabase link --project-ref ibxifmqovisdyrzpemyv

# Apply the migration
supabase db push
```

## What this migration creates

- **Table**: `newsletter_subscribers`
  - `id` (UUID, primary key)
  - `email` (TEXT, unique)
  - `subscribed_at` (TIMESTAMP)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)

- **Indexes**:
  - `idx_newsletter_subscribers_email` - for fast email lookups
  - `idx_newsletter_subscribers_subscribed_at` - for sorting by subscription date

- **Row Level Security (RLS)**:
  - Anonymous users can INSERT (subscribe)
  - Only authenticated users can SELECT, UPDATE, DELETE (for admin dashboard)

- **Triggers**:
  - Auto-updates `updated_at` timestamp on row updates

## Verification

After applying the migration, verify it worked:

```sql
-- Check if table exists
SELECT * FROM information_schema.tables
WHERE table_name = 'newsletter_subscribers';

-- Check policies
SELECT * FROM pg_policies
WHERE tablename = 'newsletter_subscribers';
```

## Rollback

If you need to rollback this migration:

```sql
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
```
