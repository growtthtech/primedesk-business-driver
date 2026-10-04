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
-- Better Auth tables (managed by lib/auth.ts via Kysely; created once below).
create table if not exists "user"(
  id text primary key,
  name text not null,
  email text not null unique,
  "emailVerified" boolean not null default false,
  image text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create table if not exists session(
  id text primary key,
  "expiresAt" timestamptz not null,
  token text not null unique,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text not null references "user"(id) on delete cascade
);
create table if not exists account(
  id text primary key,
  "accountId" text not null,
  "providerId" text not null,
  "userId" text not null references "user"(id) on delete cascade,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  scope text,
  password text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create table if not exists verification(
  id text primary key,
  identifier text not null,
  value text not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
