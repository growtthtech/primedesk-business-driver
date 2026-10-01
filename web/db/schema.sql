-- PrimeDesk MVP schema (PostgreSQL 16, local db: primedesk)
create table if not exists businesses(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  how_they_work text,
  team_size text,
  level text,
  owner_email text,
  created_at timestamptz default now()
);
create table if not exists processes(
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  template text,
  raw_text text,
  created_at timestamptz default now()
);
create table if not exists stages(
  id uuid primary key default gen_random_uuid(),
  process_id uuid references processes(id) on delete cascade,
  name text not null,
  position int not null,
  status text default 'Waiting'
);
create table if not exists business_tools(
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  stage_id uuid references stages(id) on delete set null,
  tool_name text not null,
  in_use text default 'yes'
);
create table if not exists plans(
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  start_json jsonb,
  next_json jsonb,
  later_json jsonb,
  created_at timestamptz default now()
);
-- Better Auth tables are created by the library (user, session, account, verification).
