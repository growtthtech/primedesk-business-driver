-- Agency library seed 7/7: expanded tool database (20 tools) + practices.
-- Re-runnable upserts. Run in Neon SQL editor; My Plan picks new tools up
-- automatically on next open (recommendations regenerate every visit).
insert into digital_tools(id,name,description,website,category,pricing_type,free_plan,difficulty,best_for,mobile,nigeria,limitations,alternatives,last_verified) values
('trello','Trello','Card boards for tasks and content pipelines.','https://trello.com','Project management','Free plan available',true,'Easy','Simple task tracking','true','Free plan suits small teams; works well on mobile.','Board limits on free plan.','{"Asana","ClickUp"}',null),
('google-drive','Google Drive','Shared folders for files, designs and client assets.','https://drive.google.com','File storage','Free',true,'Easy','File sharing','true','Free 15GB shared with Gmail; familiar to most clients.','Storage fills up across Gmail and Photos too.','{"Dropbox","OneDrive"}',null),
('google-sheets','Google Sheets','Free spreadsheets for trackers, budgets and simple reports.','https://sheets.google.com','Spreadsheets','Free',true,'Easy','Simple trackers','true','Free; works offline on mobile.','Manual entry does not scale forever.','{"Excel","Airtable"}',null),
('wave-accounting','Wave','Free invoicing and accounting for small businesses.','https://www.waveapps.com','Finance','Free',true,'Moderate','Free invoicing','true','Free invoicing and receipts; mobile app included.','Support can be slow; some gateways limited in Nigeria.','{"Zoho Invoice","QuickBooks"}',null),
('canva','Canva','Design social posts, decks and one-pagers fast.','https://www.canva.com','Design','Free plan available',true,'Easy','Quick creative','true','Generous free plan; huge template library.','Brand controls need the paid tier.','{"Adobe Express","Figma"}',null),
('meta-business-suite','Meta Business Suite','Manage Facebook and Instagram posts, messages and insights free.','https://business.facebook.com','Marketing','Free',true,'Easy','Agencies running Meta clients','true','Free; inbox and scheduling built in.','Meta-only: no TikTok, X or LinkedIn.','{"Buffer","Hootsuite"}',null),
('brevo','Brevo','Email campaigns and automation with a generous free tier.','https://www.brevo.com','Email marketing','Free plan available',true,'Moderate','Low-cost email sending','true','Free tier counts emails, not contacts.','Daily send caps on free plan.','{"Mailchimp","MailerLite"}',null),
('clickup','ClickUp','Docs, tasks and goals in one workspace.','https://clickup.com','Project management','Free plan available',true,'Moderate','Teams outgrowing boards','true','Rich free plan for small teams.','Can feel complex at first.','{"Asana","Notion"}',null),
('notion','Notion','Wikis, SOPs and lightweight project pages.','https://www.notion.so','Documentation','Free plan available',true,'Easy','Playbooks and SOPs','true','Free for small teams; great mobile app.','Offline mode is limited.','{"Google Docs","Confluence"}',null),
('paystack','Paystack','Payment links and invoices with Nigerian bank and card support.','https://paystack.com','Finance','Pay per transaction',false,'Easy','Getting paid in Nigeria','true','Built for Nigeria: transfers, cards, USSD.','Transaction fees apply per payment.','{"Flutterwave","Bank transfer"}',null),
('zoho-invoice','Zoho Invoice','Free invoicing with reminders and client tracking.','https://www.zoho.com/invoice','Finance','Free',true,'Moderate','Free invoicing','true','Completely free invoicing tool.','Advanced reporting lives in paid Zoho apps.','{"Wave","QuickBooks"}',null),
('calendly','Calendly','Booking links so clients pick meeting times themselves.','https://calendly.com','Scheduling','Free plan available',true,'Easy','Discovery calls','true','Free plan covers one event type.','Multiple event types need paid tiers.','{"Cal.com","Google Calendar"}',null),
('whatsapp-business','WhatsApp Business','Business profile, labels and quick replies on WhatsApp.','https://business.whatsapp.com','Messaging','Free',true,'Easy','Client communication','true','Free; clients already use it daily.','Not a CRM: chats get messy at scale.','{"Telegram","Slack"}',null),
('looker-studio','Looker Studio','Free dashboards blending ad, web and social data.','https://lookerstudio.google.com','Analytics','Free',true,'Moderate','Client dashboards','true','Free; connects Google sources easily.','Blended sources take learning.','{"DashThis","AgencyAnalytics"}',null)
on conflict (id) do update set name=excluded.name, description=excluded.description, website=excluded.website, category=excluded.category, pricing_type=excluded.pricing_type, free_plan=excluded.free_plan, difficulty=excluded.difficulty, best_for=excluded.best_for, mobile=excluded.mobile, nigeria=excluded.nigeria, limitations=excluded.limitations, alternatives=excluded.alternatives, active=true;

insert into tool_capabilities(tool_id,capability_id,base_stage) values
('google-drive','doc-management','now'),('google-drive','asset-management','now'),
('google-sheets','perf-monitoring','later'),
('canva','content-approval-cap','later'),('canva','asset-management','later'),
('meta-business-suite','scheduling-publishing','now'),('meta-business-suite','marketing-analytics','later'),
('brevo','lead-capture','now'),('brevo','scheduling-publishing','later'),
('clickup','task-coordination','later'),('clickup','team-collab','later'),
('notion','knowledge-mgmt','now'),('notion','doc-management','later'),
('paystack','billing-tracking','now'),
('zoho-invoice','billing-tracking','later'),
('calendly','client-onboarding-cap','later'),
('whatsapp-business','team-collab','now'),('whatsapp-business','client-retention-cap','later'),
('looker-studio','auto-reporting','later'),('looker-studio','perf-monitoring','later')
on conflict do nothing;

insert into tool_equivalents(tool_id,tool_name) values
('trello','Trello'),('google-drive','Drive'),('google-drive','Google Drive'),
('google-sheets','Sheets'),('google-sheets','Google Sheets'),('google-sheets','Excel'),
('wave-accounting','Wave'),('canva','Canva'),
('meta-business-suite','Meta'),('meta-business-suite','Business Suite'),
('brevo','Brevo'),('clickup','ClickUp'),('notion','Notion'),
('paystack','Paystack'),('zoho-invoice','Zoho'),
('calendly','Calendly'),('whatsapp-business','WhatsApp'),
('looker-studio','Looker'),('looker-studio','Data Studio'),
('buffer','Hootsuite'),('mailchimp','MailerLite'),('asana','ClickUp'),('slack','Telegram')
on conflict do nothing;

insert into improvement_practices(capability_id,title,guidance) values
('team-collab','One channel per client','Give every client one chat thread and one shared folder. Nothing agreed anywhere else counts.'),
('client-retention-cap','Monthly value check-in','Once a month, send each client one short note: what improved and what is next.'),
('subscription-mgmt','Quarterly subscription audit','Every three months list every paid tool and cancel what nobody opened in 30 days.')
on conflict do nothing;
