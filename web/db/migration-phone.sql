-- Agency contact phone (additive, safe to run on live DB).
alter table businesses add column if not exists contact_phone text;
