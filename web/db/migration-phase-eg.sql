-- Phases E-G migration: capabilities, tool library, recommendations, drive.
-- Additive only. Catalog tables are global; per-business rows link ownership.
create table if not exists digital_capabilities(
  id text primary key,
  name text not null,
  description text not null default '',
  category text not null default '',
  maturity text not null default 'foundational' check (maturity in ('foundational','growing','advanced')),
  active boolean not null default true
);
create table if not exists capability_processes(
  capability_id text not null references digital_capabilities(id),
  process_id text not null references catalog_processes(id),
  primary key (capability_id, process_id)
);
create table if not exists capability_signals(
  capability_id text not null references digital_capabilities(id),
  keyword text not null,
  primary key (capability_id, keyword)
);
create table if not exists digital_tools(
  id text primary key,
  name text not null,
  description text not null default '',
  website text not null default '',
  category text not null default '',
  pricing_type text not null default 'Free',
  free_plan boolean not null default false,
  difficulty text not null default 'Easy' check (difficulty in ('Easy','Moderate','Advanced')),
  best_for text not null default '',
  mobile boolean not null default true,
  nigeria text not null default '',
  active boolean not null default true
);
create table if not exists tool_capabilities(
  tool_id text not null references digital_tools(id),
  capability_id text not null references digital_capabilities(id),
  base_stage text not null default 'now' check (base_stage in ('now','later','future')),
  primary key (tool_id, capability_id)
);
create table if not exists tool_equivalents(
  tool_id text not null references digital_tools(id),
  tool_name text not null,
  primary key (tool_id, tool_name)
);
create table if not exists tool_recommendations(
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  process_id text not null references catalog_processes(id),
  mapping_id uuid references process_mappings(id) on delete set null,
  capability_id text not null references digital_capabilities(id),
  tool_id text references digital_tools(id),
  stage text not null check (stage in ('now','later','future')),
  reason text not null default '',
  relevance int not null default 0,
  covered_note text not null default '',
  status text not null default 'active' check (status in ('active','superseded')),
  created_at timestamptz not null default now()
);
create index if not exists idx_tool_recs_biz on tool_recommendations(business_id, status);
create table if not exists my_drive_selections(
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  tool_id text not null references digital_tools(id),
  recommendation_id uuid references tool_recommendations(id) on delete set null,
  status text not null default 'selected' check (status in ('selected')),
  selected_at timestamptz not null default now(),
  unique (business_id, tool_id)
);
create index if not exists idx_drive_biz on my_drive_selections(business_id);
