-- Agency library seed 3/4: services, service→process links, relevance rules.
insert into agency_services(id,name,description) values
('social-media','Social media management','Planning, creating and publishing social content for clients.'),
('content-marketing','Content marketing','Strategy, writing and distribution of content.'),
('seo','Search engine optimization','Audits, keywords, optimization and reporting.'),
('paid-ads','Paid advertising','Campaign planning, setup, monitoring and reporting.'),
('email-marketing','Email marketing','Lists, campaigns, automation and reporting.'),
('web-design','Website & conversion services','Sites, landing pages, QA, launch and tracking.'),
('branding','Branding & creative services','Briefs, design, review and handover.'),
('strategy','Marketing strategy & consulting','Research, positioning and advisory.'),
('cro','Conversion rate optimization','Testing and improving conversion performance.')
on conflict (id) do update set name=excluded.name, description=excluded.description;

-- Service → processes (an offered service makes these relevant).
insert into relevance_rules(business_category,business_subtype,process_id,relevance,service) values
-- social
('Digital Marketing Agency',null,'sm-planning','relevant','social-media'),('Digital Marketing Agency',null,'sm-calendar','relevant','social-media'),
('Digital Marketing Agency',null,'sm-creation','relevant','social-media'),('Digital Marketing Agency',null,'sm-design','relevant','social-media'),
('Digital Marketing Agency',null,'sm-approval','relevant','social-media'),('Digital Marketing Agency',null,'sm-scheduling','relevant','social-media'),
('Digital Marketing Agency',null,'sm-community','relevant','social-media'),('Digital Marketing Agency',null,'sm-monitoring','relevant','social-media'),
-- content
('Digital Marketing Agency',null,'ct-strategy','relevant','content-marketing'),('Digital Marketing Agency',null,'ct-research','relevant','content-marketing'),
('Digital Marketing Agency',null,'ct-briefs','relevant','content-marketing'),('Digital Marketing Agency',null,'ct-writing','relevant','content-marketing'),
('Digital Marketing Agency',null,'ct-approval','relevant','content-marketing'),('Digital Marketing Agency',null,'ct-publishing','relevant','content-marketing'),
('Digital Marketing Agency',null,'ct-distribution','relevant','content-marketing'),('Digital Marketing Agency',null,'ct-eval','relevant','content-marketing'),
-- seo
('Digital Marketing Agency',null,'seo-audit','relevant','seo'),('Digital Marketing Agency',null,'seo-keywords','relevant','seo'),
('Digital Marketing Agency',null,'seo-optimization','relevant','seo'),('Digital Marketing Agency',null,'seo-tech','relevant','seo'),
('Digital Marketing Agency',null,'seo-links','relevant','seo'),('Digital Marketing Agency',null,'seo-monitoring','relevant','seo'),
('Digital Marketing Agency',null,'seo-reporting','relevant','seo'),
-- paid
('Digital Marketing Agency',null,'ad-planning','relevant','paid-ads'),('Digital Marketing Agency',null,'ad-audience','relevant','paid-ads'),
('Digital Marketing Agency',null,'ad-setup','relevant','paid-ads'),('Digital Marketing Agency',null,'ad-creative','relevant','paid-ads'),
('Digital Marketing Agency',null,'ad-budget','relevant','paid-ads'),('Digital Marketing Agency',null,'ad-monitoring','relevant','paid-ads'),
('Digital Marketing Agency',null,'ad-optimization','relevant','paid-ads'),('Digital Marketing Agency',null,'ad-conversion','relevant','paid-ads'),
('Digital Marketing Agency',null,'ad-reporting','relevant','paid-ads'),
-- email
('Digital Marketing Agency',null,'em-planning','relevant','email-marketing'),('Digital Marketing Agency',null,'em-list','relevant','email-marketing'),
('Digital Marketing Agency',null,'em-creation','relevant','email-marketing'),('Digital Marketing Agency',null,'em-approval','relevant','email-marketing'),
('Digital Marketing Agency',null,'em-scheduling','relevant','email-marketing'),('Digital Marketing Agency',null,'em-automation','relevant','email-marketing'),
('Digital Marketing Agency',null,'em-deliverability','relevant','email-marketing'),('Digital Marketing Agency',null,'em-reporting','relevant','email-marketing'),
-- web
('Digital Marketing Agency',null,'web-requirements','relevant','web-design'),('Digital Marketing Agency',null,'web-planning','relevant','web-design'),
('Digital Marketing Agency',null,'web-production','relevant','web-design'),('Digital Marketing Agency',null,'web-assets','relevant','web-design'),
('Digital Marketing Agency',null,'web-qa','relevant','web-design'),('Digital Marketing Agency',null,'web-approval','relevant','web-design'),
('Digital Marketing Agency',null,'web-launch','relevant','web-design'),('Digital Marketing Agency',null,'web-conversion','relevant','web-design'),
('Digital Marketing Agency',null,'web-maintenance','relevant','web-design'),
-- branding
('Digital Marketing Agency',null,'br-briefs','relevant','branding'),('Digital Marketing Agency',null,'br-assets','relevant','branding'),
('Digital Marketing Agency',null,'br-production','relevant','branding'),('Digital Marketing Agency',null,'br-review','relevant','branding'),
('Digital Marketing Agency',null,'br-approval','relevant','branding'),('Digital Marketing Agency',null,'br-handover','relevant','branding'),
-- strategy + cro overlaps
('Digital Marketing Agency',null,'ct-strategy','relevant','strategy'),('Digital Marketing Agency',null,'pf-planning','relevant','strategy'),
('Digital Marketing Agency',null,'web-conversion','relevant','cro'),('Digital Marketing Agency',null,'ad-conversion','relevant','cro'),
('Digital Marketing Agency',null,'pf-analysis','relevant','cro')
on conflict do nothing;

-- Core agency processes relevant to every agency subtype.
insert into relevance_rules(business_category,business_subtype,process_id,relevance) values
('Digital Marketing Agency',null,'lead-gen','relevant'),('Digital Marketing Agency',null,'prospect-followup','relevant'),
('Digital Marketing Agency',null,'proposals','relevant'),('Digital Marketing Agency',null,'pricing','relevant'),
('Digital Marketing Agency',null,'client-onboarding','relevant'),('Digital Marketing Agency',null,'client-comm','relevant'),
('Digital Marketing Agency',null,'approvals','relevant'),('Digital Marketing Agency',null,'fin-invoicing','relevant'),
('Digital Marketing Agency',null,'fin-payments','relevant'),('Digital Marketing Agency',null,'pf-reporting','relevant'),
('Digital Marketing Agency',null,'pm-assignment','relevant'),('Digital Marketing Agency',null,'pm-progress','relevant'),
('Digital Marketing Agency',null,'tm-assignment','relevant'),('Digital Marketing Agency',null,'tm-communication','relevant'),
-- Team structure processes exist for all, but solo operators see them as possible.
('Digital Marketing Agency',null,'tm-onboarding','relevant'),('Digital Marketing Agency',null,'tm-capacity','relevant'),
('Digital Marketing Agency',null,'tm-allocation','relevant'),('Digital Marketing Agency',null,'tm-roles','relevant'),
-- Solo consultants: no employee machinery.
('Digital Marketing Agency','Solo Consultant','tm-onboarding','not_relevant'),
('Digital Marketing Agency','Solo Consultant','tm-capacity','not_relevant'),
('Digital Marketing Agency','Solo Consultant','tm-allocation','not_relevant')
on conflict do nothing;
