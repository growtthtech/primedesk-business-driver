-- Agency library seed 5/5: capabilities, tools, practices.
insert into digital_capabilities(id,name,description,category,maturity) values
('lead-capture','Lead capture & tracking','Recording prospects and following them up.','Marketing','foundational'),
('client-onboarding-cap','Client onboarding','Welcoming clients and collecting what work needs.','Customer Management','foundational'),
('task-coordination','Task & project coordination','Making ownership and deadlines visible.','Collaboration','foundational'),
('content-approval-cap','Content planning & approval','Moving content from idea to approved post.','Marketing','foundational'),
('asset-management','File & asset management','Keeping designs, logins and files findable.','Collaboration','foundational'),
('team-collab','Team collaboration','Day-to-day talking and handoffs inside the team.','Collaboration','foundational'),
('scheduling-publishing','Scheduling & publishing','Getting approved work out on time.','Marketing','foundational'),
('marketing-analytics','Marketing analytics','Reading campaign numbers to see what works.','Analytics','growing'),
('auto-reporting','Automated reporting','Turning numbers into client reports with less labor.','Analytics','growing'),
('doc-management','Document management','Proposals, contracts and briefs in one findable place.','Collaboration','foundational'),
('time-tracking','Time tracking','Recording hours where billing depends on it.','Collaboration','foundational'),
('billing-tracking','Billing & payment tracking','Invoicing clients and knowing who paid.','Finance','foundational'),
('subscription-mgmt','Subscription management','Tracking tool and retainer subscriptions.','Finance','foundational'),
('knowledge-mgmt','Knowledge management','Playbooks and SOPs so know-how survives staff changes.','Collaboration','growing'),
('system-integration','System integration','Connecting tools so data flows without copying.','Collaboration','advanced'),
('perf-monitoring','Business performance monitoring','Watching agency revenue, retention and workload.','Analytics','growing'),
('client-retention-cap','Client retention','Keeping clients renewing and referring.','Customer Management','growing')
on conflict (id) do update set name=excluded.name, description=excluded.description, category=excluded.category, maturity=excluded.maturity, active=true;

insert into capability_processes(capability_id,process_id) values
('lead-capture','lead-gen'),('lead-capture','lead-capture'),('lead-capture','lead-qual'),('lead-capture','prospect-followup'),('lead-capture','pipeline'),
('client-onboarding-cap','client-onboarding'),('client-onboarding-cap','client-info'),('client-onboarding-cap','requirements'),('client-onboarding-cap','asset-collection'),
('task-coordination','pm-assignment'),('task-coordination','pm-progress'),('task-coordination','tm-assignment'),('task-coordination','tm-workload'),('task-coordination','tm-progress'),
('content-approval-cap','sm-planning'),('content-approval-cap','sm-calendar'),('content-approval-cap','sm-approval'),('content-approval-cap','ct-approval'),('content-approval-cap','em-approval'),('content-approval-cap','br-approval'),
('asset-management','br-assets'),('asset-management','web-assets'),('asset-management','asset-collection'),
('team-collab','tm-communication'),('team-collab','tm-collaboration'),('team-collab','client-comm'),
('scheduling-publishing','sm-scheduling'),('scheduling-publishing','ct-publishing'),('scheduling-publishing','em-scheduling'),
('marketing-analytics','sm-monitoring'),('marketing-analytics','seo-monitoring'),('marketing-analytics','ad-monitoring'),('marketing-analytics','pf-analysis'),('marketing-analytics','em-reporting'),
('auto-reporting','pf-reporting'),('auto-reporting','pf-report-delivery'),('auto-reporting','seo-reporting'),('auto-reporting','ad-reporting'),
('doc-management','proposals'),('doc-management','contracts'),('doc-management','ct-briefs'),('doc-management','br-briefs'),
('time-tracking','tm-time'),('time-tracking','fin-contractor-costs'),
('billing-tracking','fin-invoicing'),('billing-tracking','fin-payments'),('billing-tracking','fin-chasing'),('billing-tracking','fin-retainers'),
('subscription-mgmt','fin-subscriptions'),
('knowledge-mgmt','tm-sops'),('knowledge-mgmt','tm-docs'),('knowledge-mgmt','tm-handover'),
('system-integration','pf-data-collection'),('system-integration','pf-dashboards'),
('perf-monitoring','pf-internal'),('perf-monitoring','pf-revenue'),('perf-monitoring','pf-process-monitoring'),('perf-monitoring','pf-improvement'),
('client-retention-cap','retention'),('client-retention-cap','renewal'),('client-retention-cap','pf-retention-analysis'),('client-retention-cap','relationship')
on conflict do nothing;

insert into capability_signals(capability_id,keyword) values
('lead-capture','forgot'),('lead-capture','cold'),('lead-capture','lost'),
('client-onboarding-cap','slow'),('client-onboarding-cap','repeated'),('client-onboarding-cap','unclear'),
('task-coordination','ownership'),('task-coordination','missed'),('task-coordination','unclear'),
('content-approval-cap','stall'),('content-approval-cap','revision'),('content-approval-cap','late'),
('asset-management','lost'),('asset-management','find'),
('team-collab','missed'),('team-collab','unclear'),
('scheduling-publishing','missed'),('scheduling-publishing','late'),('scheduling-publishing','manual'),
('marketing-analytics','guesswork'),('marketing-analytics','unclear'),('marketing-analytics','manual'),
('auto-reporting','long'),('auto-reporting','manual'),('auto-reporting','disagree'),
('doc-management','lost'),('doc-management','find'),
('time-tracking','unclear'),('time-tracking','manual'),
('billing-tracking','late'),('billing-tracking','chasing'),('billing-tracking','unclear'),
('subscription-mgmt','unclear'),('subscription-mgmt','forgot'),
('knowledge-mgmt','heads'),('knowledge-mgmt','handover'),
('system-integration','copying'),('system-integration','manual'),
('perf-monitoring','guesswork'),('perf-monitoring','unclear'),
('client-retention-cap','leaving'),('client-retention-cap','churn'),('client-retention-cap','renew')
on conflict do nothing;

-- Agency tools (honest fields; pricing categories only).
insert into digital_tools(id,name,description,website,category,pricing_type,free_plan,difficulty,best_for,mobile,nigeria,limitations,alternatives,last_verified) values
('buffer','Buffer','Schedule social posts and track basic results.','https://buffer.com','Marketing','Free plan available',true,'Easy','Social scheduling','true','Free plan covers a few channels; works on mobile.','Free plan limits channels and history.','{"Hootsuite","Meta Business Suite"}','2026-10-08'),
('mailchimp','Mailchimp','Email lists, campaigns and basic automation.','https://mailchimp.com','Email marketing','Free plan available',true,'Moderate','Starting email marketing','true','Free plan covers small lists; card needed for paid tiers.','Free plan caps contacts and sends.','{"Brevo","MailerLite"}','2026-10-08'),
('asana','Asana','Task boards, assignments and deadlines for teams.','https://asana.com','Project management','Free plan available',true,'Easy','Team task tracking','true','Free plan suits small teams.','Advanced workflows need paid tiers.','{"Trello","ClickUp"}','2026-10-08'),
('slack','Slack','Team chat with channels, threads and file sharing.','https://slack.com','Team collaboration','Free plan available',true,'Easy','Team communication','true','Free plan keeps limited history.','History limits on free plan.','{"WhatsApp","Telegram"}','2026-10-08'),
('google-analytics','Google Analytics','See where website visitors come from and what they do.','https://analytics.google.com','Analytics','Free',true,'Moderate','Website measurement','true','Free; needs correct setup to trust numbers.','Setup mistakes silently skew data.','{"Plausible","Matomo"}','2026-10-08'),
('hubspot-marketing','HubSpot Marketing','Forms, email and ad tracking tied to contacts.','https://www.hubspot.com/products/marketing','Marketing','Free plan available',true,'Moderate','Growing inbound marketing','true','Free tools are real; advanced tiers are costly.','Paid tiers jump in price.','{"Mailchimp","Brevo"}','2026-10-08')
on conflict (id) do update set name=excluded.name, description=excluded.description, website=excluded.website, category=excluded.category, pricing_type=excluded.pricing_type, free_plan=excluded.free_plan, difficulty=excluded.difficulty, best_for=excluded.best_for, mobile=excluded.mobile, nigeria=excluded.nigeria, limitations=excluded.limitations, alternatives=excluded.alternatives, last_verified=excluded.last_verified, active=true;

insert into tool_capabilities(tool_id,capability_id,base_stage) values
('buffer','scheduling-publishing','now'),('buffer','marketing-analytics','later'),
('mailchimp','lead-capture','later'),('mailchimp','scheduling-publishing','later'),
('asana','task-coordination','later'),('asana','team-collab','later'),
('slack','team-collab','now'),
('google-analytics','marketing-analytics','later'),('google-analytics','perf-monitoring','later'),
('hubspot-marketing','lead-capture','future'),('hubspot-marketing','marketing-analytics','future'),
('asana','content-approval-cap','later'),('trello','content-approval-cap','later'),('trello','task-coordination','later'),
('wave-accounting','billing-tracking','later'),('google-sheets','auto-reporting','now'),('google-drive','doc-management','now')
on conflict do nothing;

insert into tool_equivalents(tool_id,tool_name) values
('buffer','Buffer'),('mailchimp','Mailchimp'),('asana','Asana'),('slack','Slack'),
('google-analytics','Analytics'),('google-analytics','Google Analytics'),('hubspot-marketing','HubSpot')
on conflict do nothing;

-- Non-software improvements: doable without buying anything.
insert into improvement_practices(capability_id,title,guidance) values
('lead-capture','Same-day follow-up rule','Reply every new enquiry the same day and log it in one list before sunset.'),
('client-onboarding-cap','One intake checklist','Use a single checklist for every new client: details, goals, access, first invoice.'),
('task-coordination','Name an owner per task','Every task gets one named owner and one date. No owner, no task.'),
('content-approval-cap','Approval window','Agree fixed approval days with clients so content never waits silently.'),
('asset-management','One shared folder per client','Keep every logo, login note and file in one folder both sides can find.'),
('billing-tracking','Weekly money hour','Same hour weekly: send invoices, chase late payers, record expenses.'),
('knowledge-mgmt','Write the SOP after the third repeat','The third time you do a task, write the steps down once.'),
('auto-reporting','Template your monthly report','Build one report template and reuse it before buying reporting software.')
on conflict do nothing;
