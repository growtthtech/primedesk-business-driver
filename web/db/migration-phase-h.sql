-- Phase H migration: phone-number auth columns (Better Auth phoneNumber plugin).
alter table "user" add column if not exists "phoneNumber" text unique;
alter table "user" add column if not exists "phoneNumberVerified" boolean not null default false;
