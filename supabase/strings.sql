create extension if not exists pgcrypto;

create table if not exists public.prototype_strings (
  id uuid primary key default gen_random_uuid(),
  prototype_key text not null,
  language text not null,
  payload jsonb not null default '{}'::jsonb,
  touched_keys text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (prototype_key, language)
);

create index if not exists prototype_strings_prototype_idx
  on public.prototype_strings (prototype_key);

create index if not exists prototype_strings_updated_at_idx
  on public.prototype_strings (updated_at desc);
