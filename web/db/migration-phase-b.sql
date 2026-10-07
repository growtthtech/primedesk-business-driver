-- Phase B migration: business ownership + profile fields.
-- Additive only. Existing rows keep user_id NULL (preserved, never exposed to users).
-- Safe to run multiple times and on both local + Neon databases.
alter table businesses add column if not exists user_id text references "user"(id) on delete cascade;
alter table businesses add column if not exists business_subtype text;
alter table businesses add column if not exists years_operating text;
alter table businesses add column if not exists updated_at timestamptz default now();
create index if not exists idx_businesses_user_id on businesses(user_id);
