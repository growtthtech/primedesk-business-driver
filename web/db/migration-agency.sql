-- Agency library migration. Additive only; SME catalog untouched.
alter table business_areas add column if not exists segment text not null default 'sme';
update business_areas set segment='agency' where id like 'ag-%';
-- Business services offered (multi-select on profile for agencies).
create table if not exists agency_services(
  id text primary key,
  name text not null,
  description text not null default ''
);
create table if not exists business_services(
  business_id uuid not null references businesses(id) on delete cascade,
  service_id text not null references agency_services(id),
  primary key (business_id, service_id)
);
-- Service-conditional relevance rules (null = applies to all services).
alter table relevance_rules add column if not exists service text;
drop index if exists uq_relevance_rule;
drop index if exists uq_relevance_rule_svc;
create unique index if not exists uq_relevance_rule2 on relevance_rules(business_category, coalesce(business_subtype,''), coalesce(service,''), process_id);
-- Agency discovery trait (team presence).
alter table business_traits drop constraint if exists business_traits_trait_check;
alter table business_traits add constraint business_traits_trait_check check (trait in ('keeps-stock','takes-bookings','takes-orders','sells-physical','does-followup','has-team'));
-- Non-software improvement practices per capability.
create table if not exists improvement_practices(
  capability_id text not null references digital_capabilities(id),
  title text not null,
  guidance text not null default '',
  primary key (capability_id, title)
);
-- Practice vs tool vs covered recommendation kinds.
alter table tool_recommendations add column if not exists rec_kind text not null default 'tool' check (rec_kind in ('tool','practice','covered'));
alter table tool_recommendations add column if not exists practice_title text not null default '';
update tool_recommendations set rec_kind='covered' where tool_id is null and covered_note <> '' and rec_kind='tool';
-- Tool record enrichment (verification honesty).
alter table digital_tools add column if not exists limitations text not null default '';
alter table digital_tools add column if not exists alternatives text[] not null default '{}';
alter table digital_tools add column if not exists last_verified date;
