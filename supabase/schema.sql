create extension if not exists pgcrypto;

create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  industry_id uuid references industries(id) on delete set null,
  name text not null,
  sub_industry text,
  revenue_target text,
  status text,
  focus text,
  market_position text,
  consultant_positioning text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists account_stakeholders (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists account_signals (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  title text not null,
  detail text,
  source_label text,
  source_url text,
  refreshed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists account_pain_points (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  rank integer not null,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists account_reminders (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists channels (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  strategy text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists channel_plays (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references channels(id) on delete cascade,
  play text not null,
  created_at timestamptz not null default now()
);

create table if not exists channel_developments (
  id uuid primary key default gen_random_uuid(),
  channel_id uuid not null references channels(id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists content_assets (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  industry text,
  link text,
  status text,
  activation_score text,
  gap_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_asset_channels (
  id uuid primary key default gen_random_uuid(),
  content_asset_id uuid not null references content_assets(id) on delete cascade,
  channel_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  due_label text,
  priority text,
  source text,
  status text default 'Open',
  created_at timestamptz not null default now()
);

create table if not exists launches (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  phase text,
  owner text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress text,
  detail text,
  created_at timestamptz not null default now()
);

create table if not exists leadership_prompts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text,
  created_at timestamptz not null default now()
);

create table if not exists automation_sources (
  id uuid primary key default gen_random_uuid(),
  source_name text not null unique,
  status text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists integration_settings (
  id uuid primary key default gen_random_uuid(),
  integration_name text not null unique,
  status text,
  config_summary text,
  last_synced_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists strategy_overview_cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null,
  display_order integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists strategy_account_moves (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  strategic_shift text not null,
  next_move text not null,
  created_at timestamptz not null default now()
);

create table if not exists strategy_channel_moves (
  id uuid primary key default gen_random_uuid(),
  channel_name text not null,
  recommendation text not null,
  created_at timestamptz not null default now()
);

create table if not exists strategy_knowledge_gaps (
  id uuid primary key default gen_random_uuid(),
  note text not null,
  display_order integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists refresh_runs (
  id uuid primary key default gen_random_uuid(),
  run_type text not null,
  status text not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);
