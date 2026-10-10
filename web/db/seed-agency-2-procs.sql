-- Agency library seed 2/4: Service Delivery processes (65).
insert into catalog_processes(id,area_id,name,description,example_activities,display_order) values
-- Social media (8)
('sm-planning','ag-delivery','Content planning','How content themes get decided.','Monthly themes, pillars',1),
('sm-calendar','ag-delivery','Content calendar management','How posts get scheduled across days.','Calendars, planners',2),
('sm-creation','ag-delivery','Content creation','How posts get written and made.','Captions, creatives',3),
('sm-design','ag-delivery','Design & video production','How visuals and videos get produced.','Graphics, reels',4),
('sm-approval','ag-delivery','Content review & approval','How clients approve before posting.','Approval chats',5),
('sm-scheduling','ag-delivery','Scheduling & publishing','How approved content goes live.','Schedulers, posting',6),
('sm-community','ag-delivery','Community management','How comments and DMs get handled.','Replies, moderation',7),
('sm-monitoring','ag-delivery','Social performance monitoring','How post results get watched.','Insights, reach notes',8),
-- Content marketing (8)
('ct-strategy','ag-delivery','Content strategy','How content direction gets set.','Strategy docs',9),
('ct-research','ag-delivery','Topic research','How topics get chosen.','Keyword and trend notes',10),
('ct-briefs','ag-delivery','Content briefs','How writers learn what to write.','Brief docs',11),
('ct-writing','ag-delivery','Writing & editing','How pieces get drafted and polished.','Drafts, edits',12),
('ct-approval','ag-delivery','Content review & approval','How content gets signed off.','Review cycles',13),
('ct-publishing','ag-delivery','Content publishing','How content goes live.','Blog posts, uploads',14),
('ct-distribution','ag-delivery','Content distribution','How content reaches audiences.','Newsletters, shares',15),
('ct-eval','ag-delivery','Content performance evaluation','How content results get judged.','Traffic, engagement',16),
-- SEO (7)
('seo-audit','ag-delivery','SEO audits','How site problems get found.','Audit reports',17),
('seo-keywords','ag-delivery','Keyword research','How target terms get chosen.','Keyword lists',18),
('seo-optimization','ag-delivery','Content optimization','How pages get tuned to rank.','Meta edits, headings',19),
('seo-tech','ag-delivery','Technical SEO coordination','How technical fixes get arranged.','Dev tickets, speed checks',20),
('seo-links','ag-delivery','Link building','How authority gets earned.','Outreach, listings',21),
('seo-monitoring','ag-delivery','Ranking & traffic monitoring','How positions get watched.','Rank trackers',22),
('seo-reporting','ag-delivery','SEO reporting','How progress gets shown.','Monthly reports',23),
-- Paid advertising (9)
('ad-planning','ag-delivery','Campaign planning','How ad goals and offers get set.','Campaign briefs',24),
('ad-audience','ag-delivery','Audience research','How targeting gets chosen.','Audience notes',25),
('ad-setup','ag-delivery','Campaign setup','How campaigns get built in-platform.','Ad accounts, pixels',26),
('ad-creative','ag-delivery','Creative development','How ad visuals and copy get made.','Ad creatives',27),
('ad-budget','ag-delivery','Budget approval','How spend gets agreed.','Budget sheets',28),
('ad-monitoring','ag-delivery','Campaign monitoring','How live campaigns get watched.','Dashboards, checks',29),
('ad-optimization','ag-delivery','Optimization','How results get improved.','A/B tests, tweaks',30),
('ad-conversion','ag-delivery','Conversion tracking','How results get measured properly.','Pixels, events',31),
('ad-reporting','ag-delivery','Ad performance reporting','How results get reported.','ROAS reports',32),
-- Email marketing (8)
('em-planning','ag-delivery','Email campaign planning','How email goals get set.','Campaign calendars',33),
('em-list','ag-delivery','Subscriber list management','How lists stay clean and legal.','Segments, unsubscribes',34),
('em-creation','ag-delivery','Campaign creation','How emails get built.','Templates, copy',35),
('em-approval','ag-delivery','Email review & approval','How emails get signed off.','Test sends',36),
('em-scheduling','ag-delivery','Campaign scheduling','How sends get timed.','Schedules',37),
('em-automation','ag-delivery','Automation setup','How welcome and drip flows run themselves.','Automations, flows',38),
('em-deliverability','ag-delivery','Deliverability monitoring','How inboxing gets protected.','Bounce and spam checks',39),
('em-reporting','ag-delivery','Email campaign reporting','How results get shown.','Open and click reports',40),
-- Website & conversion (9)
('web-requirements','ag-delivery','Website requirements gathering','How what-to-build gets agreed.','Requirement notes',41),
('web-planning','ag-delivery','Landing page planning','How page structure gets decided.','Wireframes',42),
('web-production','ag-delivery','Website/landing production','How pages get built.','Builders, code',43),
('web-assets','ag-delivery','Content & asset collection','How texts and images get gathered.','Asset folders',44),
('web-qa','ag-delivery','Testing & quality assurance','How breakages get caught.','Checklists, test passes',45),
('web-approval','ag-delivery','Client approval','How launch gets signed off.','Sign-off notes',46),
('web-launch','ag-delivery','Launch & handover','How sites go live and transfer.','DNS, logins handover',47),
('web-conversion','ag-delivery','Conversion tracking','How actions get measured.','Forms, pixels',48),
('web-maintenance','ag-delivery','Ongoing maintenance','How sites stay updated.','Update schedules',49),
-- Branding & creative (6)
('br-briefs','ag-delivery','Creative briefs','How design jobs get defined.','Brief docs',50),
('br-assets','ag-delivery','Brand asset collection','How logos and files get gathered.','Brand folders',51),
('br-production','ag-delivery','Design production','How designs get made.','Design files',52),
('br-review','ag-delivery','Review & revision','How feedback rounds run.','Revision notes',53),
('br-approval','ag-delivery','Design approval','How finals get signed off.','Approvals',54),
('br-handover','ag-delivery','Delivery & asset handover','How files reach the client.','File delivery',55),
-- General delivery (10)
('pm-initiation','ag-delivery','Project initiation','How work officially starts.','Kickoffs',56),
('pm-assignment','ag-delivery','Task assignment','How who-does-what gets decided.','Task lists',57),
('pm-scheduling','ag-delivery','Work scheduling','How deadlines get set.','Timelines',58),
('pm-progress','ag-delivery','Progress monitoring','How status stays visible.','Standups, boards',59),
('pm-qa','ag-delivery','Quality assurance','How quality gets checked.','QA passes',60),
('pm-internal-review','ag-delivery','Internal reviews','How work gets checked before clients see it.','Review notes',61),
('pm-client-review','ag-delivery','Client reviews','How clients react and approve.','Review cycles',62),
('pm-delivery','ag-delivery','Delivery & sign-off','How finished work gets accepted.','Sign-offs',63),
('pm-rework','ag-delivery','Rework management','How fixes get handled.','Rework logs',64),
('pm-closure','ag-delivery','Project closure','How work gets wrapped up.','Retros, archives',65)
on conflict (id) do update set area_id=excluded.area_id, name=excluded.name, description=excluded.description, example_activities=excluded.example_activities, display_order=excluded.display_order, active=true;

-- Team & Resource (15)
insert into catalog_processes(id,area_id,name,description,example_activities,display_order) values
('tm-roles','ag-team','Role & responsibility definition','How everyone knows their job.','Role notes, RACI',1),
('tm-onboarding','ag-team','Employee & contractor onboarding','How new people get productive.','Onboarding checklists',2),
('tm-assignment','ag-team','Task assignment','How daily tasks get handed out.','Task boards',3),
('tm-workload','ag-team','Workload planning','How capacity meets demand.','Workload sheets',4),
('tm-allocation','ag-team','Resource allocation','How people get assigned across clients.','Allocation notes',5),
('tm-communication','ag-team','Team communication','How the team talks daily.','Group chats, standups',6),
('tm-collaboration','ag-team','Internal collaboration','How people work together on tasks.','Shared docs, handoffs',7),
('tm-progress','ag-team','Work progress monitoring','How managers see status.','Status updates',8),
('tm-time','ag-team','Time tracking','How hours get recorded where relevant.','Timesheets',9),
('tm-capacity','ag-team','Capacity planning','How future workload gets forecasted.','Capacity sheets',10),
('tm-skills','ag-team','Skills & training management','How gaps get closed.','Training plans',11),
('tm-sops','ag-team','Standard operating procedures','How repeatable work gets documented.','SOP docs',12),
('tm-docs','ag-team','Knowledge documentation','How know-how gets stored.','Wikis, playbooks',13),
('tm-handover','ag-team','Staff handovers','How work transfers between people.','Handover notes',14),
('tm-contractors','ag-team','External contractor management','How freelancers get managed.','Contracts, briefs',15)
on conflict (id) do update set area_id=excluded.area_id, name=excluded.name, description=excluded.description, example_activities=excluded.example_activities, display_order=excluded.display_order, active=true;

-- Financial & Commercial (14)
insert into catalog_processes(id,area_id,name,description,example_activities,display_order) values
('fin-pricing','ag-finance','Service pricing','How services get priced.','Rate cards',1),
('fin-costing','ag-finance','Proposal costing','How proposals get costed.','Cost sheets',2),
('fin-budgeting','ag-finance','Project budgeting','How project spend gets planned.','Budgets',3),
('fin-invoicing','ag-finance','Client billing & invoicing','How clients get billed.','Invoices',4),
('fin-payments','ag-finance','Payment tracking','How received money gets tracked.','Payment logs',5),
('fin-chasing','ag-finance','Outstanding payment follow-up','How late payers get chased.','Reminders',6),
('fin-retainers','ag-finance','Recurring service billing','How retainers get billed.','Retainer schedules',7),
('fin-costs','ag-finance','Project cost tracking','How job costs get recorded.','Cost logs',8),
('fin-contractor-costs','ag-finance','Contractor & supplier costs','How external costs get tracked.','Payout records',9),
('fin-subscriptions','ag-finance','Subscription & software expenses','How tool spend gets tracked.','Subscription lists',10),
('fin-revenue','ag-finance','Revenue tracking','How income gets watched.','Revenue sheets',11),
('fin-profitability','ag-finance','Project profitability','How margins per job get known.','Margin math',12),
('fin-records','ag-finance','Financial record organization','How money records stay findable.','Folders, archives',13),
('fin-contracts','ag-finance','Contract & renewal tracking','How agreements and renewals get tracked.','Contract lists',14)
on conflict (id) do update set area_id=excluded.area_id, name=excluded.name, description=excluded.description, example_activities=excluded.example_activities, display_order=excluded.display_order, active=true;

-- Performance & Growth (15)
insert into catalog_processes(id,area_id,name,description,example_activities,display_order) values
('pf-client-measurement','ag-growth','Client marketing performance','How client results get measured.','KPIs, metrics',1),
('pf-reporting','ag-growth','Client reporting','How reports get built for clients.','Report decks',2),
('pf-report-delivery','ag-growth','Report preparation & delivery','How reports reach clients.','Emails, calls',3),
('pf-data-collection','ag-growth','Data collection from platforms','How numbers get gathered.','Exports, connectors',4),
('pf-dashboards','ag-growth','Performance dashboards','How live views get maintained.','Dashboards',5),
('pf-analysis','ag-growth','Campaign & channel analysis','How what-works gets found.','Comparisons',6),
('pf-goal-tracking','ag-growth','Client goal tracking','How goals get followed.','Goal sheets',7),
('pf-internal','ag-growth','Internal business performance','How the agency measures itself.','Revenue reviews',8),
('pf-quality','ag-growth','Service quality evaluation','How quality gets judged.','QA scores',9),
('pf-satisfaction','ag-growth','Customer satisfaction','How happiness gets measured.','Surveys, NPS',10),
('pf-retention-analysis','ag-growth','Client retention analysis','How churn gets understood.','Churn notes',11),
('pf-revenue','ag-growth','Agency revenue & growth tracking','How agency growth gets watched.','Revenue trends',12),
('pf-process-monitoring','ag-growth','Process performance monitoring','How operations get watched.','Cycle times',13),
('pf-improvement','ag-growth','Continuous improvement','How fixes get made.','Retros, experiments',14),
('pf-planning','ag-growth','Business planning','How direction gets set.','Annual plans',15)
on conflict (id) do update set area_id=excluded.area_id, name=excluded.name, description=excluded.description, example_activities=excluded.example_activities, display_order=excluded.display_order, active=true;
