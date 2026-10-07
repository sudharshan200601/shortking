-- ============================================================
-- SHORTKING DATABASE SCHEMA
-- Supabase PostgreSQL
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";


-- ============================================================
-- PROFILES
-- ============================================================

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text,
    name text,
    avatar_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- ============================================================
-- URLS
-- ============================================================

create table if not exists public.urls (
    id uuid primary key default gen_random_uuid(),

    user_id uuid references public.profiles(id) on delete cascade,

    short_code varchar(16) not null unique,

    custom_alias varchar(64) unique,

    original_url text not null,

    click_count bigint not null default 0,

    is_active boolean not null default true,

    expires_at timestamptz,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint urls_short_code_length
        check (char_length(short_code) >= 4),

    constraint urls_original_url_length
        check (char_length(original_url) <= 8192)
);


-- ============================================================
-- CLICK EVENTS
-- ============================================================

create table if not exists public.click_events (
    id uuid primary key default gen_random_uuid(),

    url_id uuid not null
        references public.urls(id)
        on delete cascade,

    ip_hash text,

    country text,

    city text,

    device text,

    browser text,

    operating_system text,

    referrer text,

    created_at timestamptz not null default now()
);


-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_urls_user_id
    on public.urls(user_id);

create index if not exists idx_urls_short_code
    on public.urls(short_code);

create index if not exists idx_urls_custom_alias
    on public.urls(custom_alias);

create index if not exists idx_urls_created_at
    on public.urls(created_at desc);

create index if not exists idx_click_events_url_id
    on public.click_events(url_id);

create index if not exists idx_click_events_created_at
    on public.click_events(created_at desc);


-- ============================================================
-- UPDATED_AT FUNCTION
-- ============================================================

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;


-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

drop trigger if exists profiles_updated_at
on public.profiles;

create trigger profiles_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at();


drop trigger if exists urls_updated_at
on public.urls;

create trigger urls_updated_at
before update on public.urls
for each row
execute function public.update_updated_at();


-- ============================================================
-- CREATE PROFILE AFTER SIGNUP
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin

    insert into public.profiles (
        id,
        email,
        name,
        avatar_url
    )
    values (
        new.id,
        new.email,
        coalesce(
            new.raw_user_meta_data ->> 'name',
            new.raw_user_meta_data ->> 'full_name'
        ),
        new.raw_user_meta_data ->> 'avatar_url'
    );

    return new;

end;
$$;


drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.urls enable row level security;
alter table public.click_events enable row level security;


-- ============================================================
-- PROFILE POLICIES
-- ============================================================

drop policy if exists "Users can view own profile"
on public.profiles;

create policy "Users can view own profile"
on public.profiles
for select
using (auth.uid() = id);


drop policy if exists "Users can update own profile"
on public.profiles;

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);


-- ============================================================
-- URL POLICIES
-- ============================================================

drop policy if exists "Users can view own URLs"
on public.urls;

create policy "Users can view own URLs"
on public.urls
for select
using (auth.uid() = user_id);


drop policy if exists "Users can create own URLs"
on public.urls;

create policy "Users can create own URLs"
on public.urls
for insert
with check (auth.uid() = user_id);


drop policy if exists "Users can update own URLs"
on public.urls;

create policy "Users can update own URLs"
on public.urls
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);


drop policy if exists "Users can delete own URLs"
on public.urls;

create policy "Users can delete own URLs"
on public.urls
for delete
using (auth.uid() = user_id);


-- ============================================================
-- ANALYTICS POLICIES
-- ============================================================

drop policy if exists "Users can view analytics for own URLs"
on public.click_events;

create policy "Users can view analytics for own URLs"
on public.click_events
for select
using (
    exists (
        select 1
        from public.urls
        where public.urls.id = click_events.url_id
        and public.urls.user_id = auth.uid()
    )
);


-- ============================================================
-- RESERVED ALIASES
-- ============================================================

create table if not exists public.reserved_aliases (
    alias varchar(64) primary key
);

insert into public.reserved_aliases (alias)
values
    ('admin'),
    ('api'),
    ('auth'),
    ('dashboard'),
    ('login'),
    ('logout'),
    ('register'),
    ('signup'),
    ('settings'),
    ('profile'),
    ('account'),
    ('help'),
    ('about'),
    ('contact'),
    ('pricing'),
    ('docs'),
    ('health'),
    ('status'),
    ('favicon.ico')
on conflict (alias) do nothing;


alter table public.reserved_aliases enable row level security;
