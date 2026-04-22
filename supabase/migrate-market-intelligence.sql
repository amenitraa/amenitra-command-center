create table if not exists market_watch_items (
  id uuid primary key default gen_random_uuid(),
  external_id text unique,
  scope_type text not null,
  scope_slug text not null,
  item_type text not null check (item_type in ('signal', 'pain')),
  title text not null,
  summary text,
  why_it_matters text,
  response text,
  source_label text,
  source_url text,
  published_at timestamptz,
  refreshed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists market_watch_items_scope_idx
  on market_watch_items (scope_type, scope_slug, item_type, published_at desc);

insert into integration_settings (integration_name, status, config_summary, last_synced_at)
values ('Market Intelligence', 'Ready for setup', 'Sync live news and market signals into account and industry war rooms.', null)
on conflict (integration_name) do update set
  status = excluded.status,
  config_summary = excluded.config_summary;
