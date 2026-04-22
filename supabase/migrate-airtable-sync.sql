alter table tasks add column if not exists external_id text;
alter table tasks add column if not exists assigned_to text;
alter table tasks add column if not exists start_date date;
alter table tasks add column if not exists team_function text;
alter table tasks add column if not exists task_link text;
alter table tasks add column if not exists account_slug text;
alter table tasks add column if not exists sync_source text;

alter table launches add column if not exists external_id text;
alter table launches add column if not exists kickoff_date date;
alter table launches add column if not exists due_date date;
alter table launches add column if not exists progress_percent integer;
alter table launches add column if not exists account_slug text;
alter table launches add column if not exists sync_source text;

create unique index if not exists tasks_external_id_key on tasks (external_id) where external_id is not null;
create unique index if not exists launches_external_id_key on launches (external_id) where external_id is not null;
