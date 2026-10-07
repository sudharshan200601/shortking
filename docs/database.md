# ShortKing Database Schema

ShortKing uses Supabase PostgreSQL with Row Level Security (RLS).

## Tables

### 1. `profiles`

Maps 1:1 with Supabase Auth `auth.users`.

- `id` (UUID, Primary Key, references `auth.users.id`)
- `email` (TEXT, Not Null)
- `name` (TEXT)
- `avatar_url` (TEXT)
- `created_at` (TIMESTAMPTZ, Default `now()`)
- `updated_at` (TIMESTAMPTZ, Default `now()`)

### 2. `urls`

Stores shortened URLs.

- `id` (UUID, Primary Key, Default `gen_random_uuid()`)
- `user_id` (UUID, Nullable, References `profiles.id`)
- `short_code` (VARCHAR(16), Unique, Not Null)
- `custom_alias` (VARCHAR(50), Unique, Nullable)
- `original_url` (TEXT, Not Null)
- `click_count` (BIGINT, Default 0)
- `is_active` (BOOLEAN, Default true)
- `expires_at` (TIMESTAMPTZ, Nullable)
- `created_at` (TIMESTAMPTZ, Default `now()`)
- `updated_at` (TIMESTAMPTZ, Default `now()`)

**Indexes:**

- `idx_urls_short_code` on `short_code`
- `idx_urls_custom_alias` on `custom_alias`
- `idx_urls_user_id` on `user_id`

### 3. `click_events`

Stores individual redirect events for privacy-conscious analytics.

- `id` (UUID, Primary Key, Default `gen_random_uuid()`)
- `url_id` (UUID, References `urls.id` on delete cascade)
- `ip_hash` (VARCHAR(64), Nullable - SHA256 hashed, raw IP discarded)
- `country` (VARCHAR(100), Nullable)
- `city` (VARCHAR(100), Nullable)
- `device` (VARCHAR(50), Nullable)
- `browser` (VARCHAR(50), Nullable)
- `operating_system` (VARCHAR(50), Nullable)
- `referrer` (TEXT, Nullable)
- `created_at` (TIMESTAMPTZ, Default `now()`)

**Indexes:**

- `idx_click_events_url_id` on `url_id`
- `idx_click_events_created_at` on `created_at`
