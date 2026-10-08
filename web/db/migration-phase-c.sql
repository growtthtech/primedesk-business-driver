-- Phase C migration: business/process model tables.
-- Additive only. Catalog tables are global (same for all users);
-- per-business rows live in business_traits / business_processes.
create table if not exists business_areas(
  id text primary key,
  name text not null,
  description text not null default '',
  display_order int not null default 0,
  active boolean not null default true
);
create table if not exists catalog_processes(
  id text primary key,
  area_id text not null references business_areas(id),
  name text not null,
  description text not null default '',
  example_activities text not null default '',
  display_order int not null default 0,
  active boolean not null default true
);
create table if not exists relevance_rules(
  id uuid primary key default gen_random_uuid(),
  business_category text not null,
  business_subtype text,
  process_id text not null references catalog_processes(id),
  relevance text not null check (relevance in ('relevant','possible','not_relevant')),
  note text not null default ''
);
create index if not exists idx_relevance_rules_cat on relevance_rules(business_category);
create unique index if not exists uq_relevance_rule on relevance_rules(business_category, coalesce(business_subtype,''), process_id);
create table if not exists business_traits(
  business_id uuid not null references businesses(id) on delete cascade,
  trait text not null check (trait in ('keeps-stock','takes-bookings','takes-orders','sells-physical','does-followup')),
  answer boolean not null,
  updated_at timestamptz not null default now(),
  primary key (business_id, trait)
);
create table if not exists business_processes(
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  process_id text not null references catalog_processes(id),
  status text not null default 'not_started' check (status in ('not_started','in_progress','mapped')),
  relevance text not null default 'possible' check (relevance in ('relevant','possible','not_relevant')),
  updated_at timestamptz not null default now(),
  unique (business_id, process_id)
);
create index if not exists idx_business_processes_biz on business_processes(business_id);
