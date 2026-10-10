-- MVP profile gaps (PRD §5.1): operating model, priorities, tech usage. Additive only.
alter table businesses add column if not exists operating_model text;
alter table businesses add column if not exists priorities text[] not null default '{}';
alter table businesses add column if not exists tech_usage text not null default '';
-- User-dismissed relevance overrides (PRD §5.4 trust): never recomputed away.
alter table business_processes add column if not exists user_hidden boolean not null default false;
-- Drive decision statuses (PRD §5.11): beyond selected/removed.
alter table my_drive_selections drop constraint if exists my_drive_selections_status_check;
alter table my_drive_selections add constraint my_drive_selections_status_check check (status in ('considering','selected','using','implementing','implemented'));
update my_drive_selections set status='selected' where status not in ('considering','selected','using','implementing','implemented');
