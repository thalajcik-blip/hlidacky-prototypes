create extension if not exists pgcrypto;

create table if not exists public.prototype_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  prototype_key text not null,
  prototype_name text not null default '',
  prototype_path text not null default '',
  language text not null default '',
  active_tab text not null default '',
  contact_name text not null default '',
  contact_email text not null default '',
  feedback_text text not null check (char_length(btrim(feedback_text)) > 0),
  page_url text not null default '',
  submitted_from text not null default '',
  user_agent text not null default '',
  context jsonb not null default '{}'::jsonb,
  status text not null default 'new'
);

create index if not exists prototype_feedback_created_at_idx
  on public.prototype_feedback (created_at desc);

create index if not exists prototype_feedback_prototype_key_idx
  on public.prototype_feedback (prototype_key);

create index if not exists prototype_feedback_language_idx
  on public.prototype_feedback (language);
