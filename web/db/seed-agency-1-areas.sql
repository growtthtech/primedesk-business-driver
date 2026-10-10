-- Agency library seed 1/4: areas + processes. Re-runnable upserts.
insert into business_areas(id,name,description,display_order) values
('ag-bizdev','Business Development','How the agency attracts prospects, wins clients and grows revenue.',6),
('ag-client','Client Management','How the agency starts, serves, communicates with and keeps clients.',7),
('ag-delivery','Service Delivery','How the agency plans, produces, reviews and delivers its services.',8),
('ag-team','Team & Resource Management','How the agency organizes people, workload and knowledge.',9),
('ag-finance','Financial & Commercial Management','How the agency handles pricing, billing, costs and profit.',10),
('ag-growth','Performance & Growth','How the agency measures results and improves over time.',11)
on conflict (id) do update set name=excluded.name, description=excluded.description, display_order=excluded.display_order, active=true;

-- Business Development (15)
insert into catalog_processes(id,area_id,name,description,example_activities,display_order) values
('niche-id','ag-bizdev','Market & niche identification','How you decide who the agency serves.','Niche research, ideal-client notes',1),
('positioning','ag-bizdev','Service positioning & packaging','How services are shaped into clear offers.','Packages, service pages, pricing tiers',2),
('lead-gen','ag-bizdev','Lead generation','How new prospects find or hear about you.','Content, outreach, ads, referrals',3),
('agency-marketing','ag-bizdev','Agency marketing & promotion','How you promote the agency itself.','Social posts, portfolio, case studies',4),
('lead-capture','ag-bizdev','Lead capture','How prospect details get recorded.','Contact forms, DMs, call logs',5),
('lead-qual','ag-bizdev','Lead qualification','How you judge fit before investing time.','Qualifying questions, scoring',6),
('prospect-followup','ag-bizdev','Prospect communication & follow-up','How you stay in touch until they decide.','Follow-up messages, reminders',7),
('pipeline','ag-bizdev','Sales pipeline management','How open opportunities are tracked.','Pipeline list, stages, notes',8),
('discovery','ag-bizdev','Discovery meetings & consultations','How first serious conversations happen.','Calls, notes, needs summary',9),
('proposals','ag-bizdev','Proposal preparation','How offers are written and sent.','Proposal docs, scopes, timelines',10),
('pricing','ag-bizdev','Quotation & pricing','How prices are set and quoted.','Quotes, rate cards',11),
('contracts','ag-bizdev','Contract preparation & approval','How agreements get signed.','Contracts, signatures',12),
('conversion','ag-bizdev','Sales conversion','How prospects become paying clients.','Closing, onboarding handoff',13),
('handover-sales','ag-bizdev','Sales handover to delivery','How closed deals move into work.','Briefs, kickoff notes',14),
('referrals-partners','ag-bizdev','Referral & partnership management','How partners and referrals are nurtured.','Partner list, thank-yous',15)
on conflict (id) do update set area_id=excluded.area_id, name=excluded.name, description=excluded.description, example_activities=excluded.example_activities, display_order=excluded.display_order, active=true;

-- Client Management (15)
insert into catalog_processes(id,area_id,name,description,example_activities,display_order) values
('client-info','ag-client','Client information collection','How client basics get gathered at the start.','Forms, intake chats',1),
('client-onboarding','ag-client','Client onboarding','How new clients are welcomed into work.','Welcome pack, kickoff',2),
('requirements','ag-client','Client requirements gathering','How what-the-client-wants gets pinned down.','Briefs, requirement docs',3),
('goals','ag-client','Marketing goals & expectations','How success is defined together.','Goal notes, KPIs agreed',4),
('asset-collection','ag-client','Account access & asset collection','How logins, pages and files are collected.','Access checklist',5),
('client-comm','ag-client','Client communication','How day-to-day contact happens.','WhatsApp, calls, updates',6),
('meetings','ag-client','Meeting scheduling & documentation','How meetings get booked and recorded.','Calendars, meeting notes',7),
('approvals','ag-client','Client approvals','How work gets signed off.','Approval chats, sign-offs',8),
('feedback','ag-client','Client feedback management','How opinions and requests are captured.','Feedback notes, revisions',9),
('change-requests','ag-client','Change requests & scope changes','How extra or changed work is handled.','Scope notes, extra quotes',10),
('complaints','ag-client','Issue & complaint handling','How problems get fixed and trust kept.','Issue log, apologies',11),
('relationship','ag-client','Client relationship management','How the relationship stays warm.','Check-ins, history notes',12),
('retention','ag-client','Client retention','How clients are kept from leaving.','Reviews, loyalty touches',13),
('renewal','ag-client','Contract renewal','How continuing work gets agreed.','Renewal offers, contracts',14),
('offboarding','ag-client','Offboarding & account handover','How endings and handovers are handled.','Handover docs, access return',15)
on conflict (id) do update set area_id=excluded.area_id, name=excluded.name, description=excluded.description, example_activities=excluded.example_activities, display_order=excluded.display_order, active=true;
