alter table accounts
add column if not exists sub_industry text;

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
