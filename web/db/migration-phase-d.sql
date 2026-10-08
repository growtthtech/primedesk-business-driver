-- Phase D migration: guided mapping questions + per-business mapping payloads.
-- Additive only. business_processes.status remains the progress source of truth.
create table if not exists mapping_questions(
  id text primary key,
  area_id text references business_areas(id),
  process_id text references catalog_processes(id),
  qkey text not null,
  question text not null,
  type text not null check (type in ('single','multi','text','long','yesno')),
  options jsonb not null default '[]',
  required boolean not null default true,
  qorder int not null default 0,
  help text not null default '',
  purpose text not null default 'context' check (purpose in ('workflow','tools','problems','need','context')),
  allow_other boolean not null default true,
  check ((process_id is null) <> (area_id is null))
);
create index if not exists idx_mapping_questions_scope on mapping_questions(coalesce(process_id,''), coalesce(area_id,''));
create table if not exists process_mappings(
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  process_id text not null references catalog_processes(id),
  status text not null default 'in_progress' check (status in ('in_progress','mapped')),
  answers jsonb not null default '{}',
  workflow text[] not null default '{}',
  tools text[] not null default '{}',
  problems text[] not null default '{}',
  need text not null default '',
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (business_id, process_id)
);
create index if not exists idx_process_mappings_biz on process_mappings(business_id);
