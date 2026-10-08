-- Phase C seed: areas, process catalog, initial relevance rules.
-- Re-runnable (upserts by id). Modify data here to tune relevance, not code.

insert into business_areas(id,name,description,display_order) values
('getting-customers','Getting Customers','How people find you and first contact you.',1),
('managing-customers','Managing Customers','How you serve, track and talk to customers.',2),
('managing-stock','Managing Stock','How you handle products, materials and suppliers.',3),
('managing-money','Managing Money','How money comes in, goes out and is understood.',4),
('growing-business','Growing the Business','How you measure and improve over time.',5)
on conflict (id) do update set name=excluded.name, description=excluded.description, display_order=excluded.display_order, active=true;

insert into catalog_processes(id,area_id,name,description,example_activities,display_order) values
-- Getting Customers
('marketing','getting-customers','Marketing','How you make the business known.','Social posts, flyers, WhatsApp broadcast',1),
('advertising','getting-customers','Advertising','Paid ways you attract attention.','Instagram ads, sponsored posts',2),
('receiving-enquiries','getting-customers','Receiving enquiries','How new customer messages reach you.','WhatsApp DMs, calls, walk-ins',3),
('managing-leads','getting-customers','Managing leads','How you track people who showed interest.','Name lists, follow-up notes',4),
('follow-up','getting-customers','Following up','How you re-contact interested people.','Reminders, check-in messages',5),
('referrals','getting-customers','Referrals','How happy customers bring others.','Word of mouth, referral offers',6),
-- Managing Customers
('customer-records','managing-customers','Customer records','How you store who your customers are.','Name and phone lists, notebooks',1),
('bookings','managing-customers','Bookings','How customers reserve a date or time.','Appointment lists, calendars',2),
('orders','managing-customers','Orders / service requests','How customers ask for what they want.','Order chats, job requests',3),
('customer-communication','managing-customers','Customer communication','How you talk to customers day to day.','WhatsApp, calls, updates',4),
('customer-support','managing-customers','Customer support','How you handle complaints and questions.','Issue handling, apologies, fixes',5),
('customer-follow-up','managing-customers','Customer follow-up','How you check in after service.','Thank-you messages, review asks',6),
-- Managing Stock
('stock-purchasing','managing-stock','Purchasing','How you buy products or materials.','Market runs, supplier orders',1),
('receiving-stock','managing-stock','Receiving stock / materials','How arrivals are checked in.','Counting, quality checks',2),
('stock-tracking','managing-stock','Stock tracking','How you know what you have.','Stock counts, lists',3),
('stock-usage','managing-stock','Stock usage','How materials get used up in work.','Ingredient or material use',4),
('reordering','managing-stock','Reordering','How you decide when to buy again.','Low-stock alerts, reorder lists',5),
('supplier-management','managing-stock','Supplier management','How you manage who supplies you.','Supplier contacts, prices',6),
-- Managing Money
('recording-sales','managing-money','Recording sales','How you record what you sold.','Daily sales notes, receipts',1),
('invoicing','managing-money','Invoicing','How you bill customers formally.','Invoices, quotes',2),
('receiving-payments','managing-money','Receiving payments','How money reaches you.','Transfers, POS, cash',3),
('tracking-expenses','managing-money','Tracking expenses','How you record what you spend.','Expense notes, receipts',4),
('tracking-owed','managing-money','Tracking money owed','How you track debts for or against you.','Credit lists, IOUs',5),
('understanding-profit','managing-money','Understanding profit','How you know what you really earned.','Profit math, margins',6),
('cash-flow','managing-money','Cash flow','How you make sure cash is there when needed.','Cash planning, reserves',7),
-- Growing the Business
('tracking-sales-growth','growing-business','Tracking sales','How you watch sales over time.','Weekly totals, comparisons',1),
('understanding-customers','growing-business','Understanding customers','How you learn who buys and why.','Repeat-customer notes',2),
('measuring-marketing','growing-business','Measuring marketing','How you know what promotion works.','Asking how they found you',3),
('customer-retention','growing-business','Customer retention','How you keep customers coming back.','Loyalty, return offers',4),
('business-performance','growing-business','Business performance','How you judge overall progress.','Monthly reviews',5),
('business-improvement','growing-business','Business improvement','How you fix what is not working.','Small weekly fixes',6)
on conflict (id) do update set area_id=excluded.area_id, name=excluded.name, description=excluded.description, example_activities=excluded.example_activities, display_order=excluded.display_order, active=true;

-- Relevance rules (explicit; engine adds trait-conditionals + possible-by-default).
-- Restaurant
insert into relevance_rules(business_category,business_subtype,process_id,relevance) values
('Food','Restaurant','marketing','relevant'),('Food','Restaurant','advertising','relevant'),
('Food','Restaurant','receiving-enquiries','relevant'),('Food','Restaurant','customer-communication','relevant'),
('Food','Restaurant','orders','relevant'),('Food','Restaurant','stock-purchasing','relevant'),
('Food','Restaurant','stock-tracking','relevant'),('Food','Restaurant','reordering','relevant'),
('Food','Restaurant','recording-sales','relevant'),('Food','Restaurant','receiving-payments','relevant'),
('Food','Restaurant','tracking-expenses','relevant'),('Food','Restaurant','customer-retention','relevant'),
('Food','Restaurant','business-performance','relevant')
on conflict do nothing;
-- Hair Salon
insert into relevance_rules(business_category,business_subtype,process_id,relevance) values
('Beauty & Grooming','Hair Salon','marketing','relevant'),('Beauty & Grooming','Hair Salon','receiving-enquiries','relevant'),
('Beauty & Grooming','Hair Salon','managing-leads','relevant'),('Beauty & Grooming','Hair Salon','follow-up','relevant'),
('Beauty & Grooming','Hair Salon','customer-records','relevant'),('Beauty & Grooming','Hair Salon','bookings','relevant'),
('Beauty & Grooming','Hair Salon','customer-communication','relevant'),('Beauty & Grooming','Hair Salon','receiving-payments','relevant'),
('Beauty & Grooming','Hair Salon','recording-sales','relevant'),('Beauty & Grooming','Hair Salon','customer-retention','relevant'),
('Beauty & Grooming','Hair Salon','stock-tracking','possible'),('Beauty & Grooming','Hair Salon','supplier-management','possible')
on conflict do nothing;
-- Fashion Designer
insert into relevance_rules(business_category,business_subtype,process_id,relevance) values
('Fashion','Fashion Designer','marketing','relevant'),('Fashion','Fashion Designer','receiving-enquiries','relevant'),
('Fashion','Fashion Designer','customer-records','relevant'),('Fashion','Fashion Designer','orders','relevant'),
('Fashion','Fashion Designer','customer-communication','relevant'),('Fashion','Fashion Designer','stock-purchasing','relevant'),
('Fashion','Fashion Designer','stock-tracking','relevant'),('Fashion','Fashion Designer','recording-sales','relevant'),
('Fashion','Fashion Designer','receiving-payments','relevant'),('Fashion','Fashion Designer','tracking-expenses','relevant'),
('Fashion','Fashion Designer','customer-retention','relevant')
on conflict do nothing;
-- Photographer
insert into relevance_rules(business_category,business_subtype,process_id,relevance) values
('Service Business','Photography','marketing','relevant'),('Service Business','Photography','receiving-enquiries','relevant'),
('Service Business','Photography','managing-leads','relevant'),('Service Business','Photography','follow-up','relevant'),
('Service Business','Photography','customer-records','relevant'),('Service Business','Photography','bookings','relevant'),
('Service Business','Photography','orders','relevant'),('Service Business','Photography','customer-communication','relevant'),
('Service Business','Photography','receiving-payments','relevant'),('Service Business','Photography','recording-sales','relevant'),
('Service Business','Photography','customer-retention','relevant'),
('Service Business','Photography','stock-purchasing','not_relevant'),('Service Business','Photography','receiving-stock','not_relevant'),
('Service Business','Photography','stock-tracking','not_relevant'),('Service Business','Photography','stock-usage','not_relevant'),
('Service Business','Photography','reordering','not_relevant'),('Service Business','Photography','supplier-management','not_relevant')
on conflict do nothing;
-- Consultant
insert into relevance_rules(business_category,business_subtype,process_id,relevance) values
('Service Business','Consulting','marketing','relevant'),('Service Business','Consulting','receiving-enquiries','relevant'),
('Service Business','Consulting','managing-leads','relevant'),('Service Business','Consulting','follow-up','relevant'),
('Service Business','Consulting','customer-records','relevant'),('Service Business','Consulting','customer-communication','relevant'),
('Service Business','Consulting','orders','relevant'),('Service Business','Consulting','invoicing','relevant'),
('Service Business','Consulting','receiving-payments','relevant'),('Service Business','Consulting','tracking-expenses','relevant'),
('Service Business','Consulting','business-performance','relevant'),
('Service Business','Consulting','stock-purchasing','not_relevant'),('Service Business','Consulting','receiving-stock','not_relevant'),
('Service Business','Consulting','stock-tracking','not_relevant'),('Service Business','Consulting','stock-usage','not_relevant'),
('Service Business','Consulting','reordering','not_relevant'),('Service Business','Consulting','supplier-management','not_relevant')
on conflict do nothing;
