-- Phases E-G seed: capabilities, tool library, matching rules.
-- Re-runnable (upserts). Tune matching here, never in component code.
-- Pricing uses categories only — no invented prices.

insert into digital_capabilities(id,name,description,category,maturity) values
('customer-communication','Customer communication','Reaching customers and answering them reliably.','Customer Management','foundational'),
('customer-records','Customer records','Keeping an organized list of who your customers are.','Customer Management','foundational'),
('followup-management','Customer follow-up management','Remembering to check back with customers and leads.','Customer Management','foundational'),
('order-tracking','Order tracking','Seeing every order and its status in one place.','Sales & Orders','foundational'),
('booking-scheduling','Booking & scheduling','Letting customers reserve time without confusion.','Booking','foundational'),
('payment-collection','Payment collection','Receiving money and knowing who paid.','Finance','foundational'),
('expense-tracking','Expense tracking','Recording what the business spends.','Finance','foundational'),
('profit-visibility','Profit visibility','Understanding what the business really earns.','Finance','growing'),
('stock-tracking-cap','Stock tracking','Knowing what you have before it runs out.','Inventory','foundational'),
('reorder-management','Reordering','Deciding when and what to buy again.','Inventory','growing'),
('marketing-management','Marketing management','Promoting steadily and seeing what brings customers.','Marketing','foundational'),
('sales-tracking','Sales tracking','Watching sales over time to spot patterns.','Analytics','growing'),
('team-tasks','Team task management','Making it clear who does what and by when.','Collaboration','growing'),
('file-organization','File & record organization','Keeping business files and records findable.','Collaboration','foundational')
on conflict (id) do update set name=excluded.name, description=excluded.description, category=excluded.category, maturity=excluded.maturity, active=true;

insert into capability_processes(capability_id,process_id) values
('customer-communication','receiving-enquiries'),('customer-communication','customer-communication'),('customer-communication','customer-support'),
('customer-records','customer-records'),('customer-records','managing-leads'),
('followup-management','follow-up'),('followup-management','customer-follow-up'),
('order-tracking','orders'),
('booking-scheduling','bookings'),
('payment-collection','receiving-payments'),
('expense-tracking','tracking-expenses'),
('profit-visibility','understanding-profit'),('profit-visibility','cash-flow'),('profit-visibility','recording-sales'),
('stock-tracking-cap','stock-tracking'),('stock-tracking-cap','receiving-stock'),('stock-tracking-cap','stock-usage'),
('reorder-management','reordering'),('reorder-management','stock-purchasing'),('reorder-management','supplier-management'),
('marketing-management','marketing'),('marketing-management','advertising'),('marketing-management','measuring-marketing'),('marketing-management','referrals'),
('sales-tracking','tracking-sales-growth'),('sales-tracking','recording-sales'),
('team-tasks','business-performance'),('team-tasks','business-improvement'),
('file-organization','customer-records'),('file-organization','invoicing')
on conflict do nothing;

insert into capability_signals(capability_id,keyword) values
('customer-communication','forgotten'),('customer-communication','lost'),('customer-communication','slow to respond'),('customer-communication','unclear'),
('customer-records','lost'),('customer-records','notebook'),('customer-records','memory'),
('followup-management','forgot'),('followup-management','missed'),('followup-management','follow'),
('order-tracking','forgotten'),('order-tracking','unclear'),('order-tracking','lost'),('order-tracking','manual'),
('booking-scheduling','double'),('booking-scheduling','missed'),('booking-scheduling','forget'),('booking-scheduling','track'),
('payment-collection','unclear who paid'),('payment-collection','fake'),('payment-collection','mix'),('payment-collection','confirm'),
('expense-tracking','unclear'),('expense-tracking','mixed'),('expense-tracking','manual'),
('profit-visibility','profit'),('profit-visibility','unclear'),('profit-visibility','guesswork'),
('stock-tracking-cap','runs out'),('stock-tracking-cap','unclear'),('stock-tracking-cap','manual'),('stock-tracking-cap','reality'),
('reorder-management','runs out'),('reorder-management','overbuy'),
('marketing-management','inconsistent'),('marketing-management','works'),('marketing-management','return'),
('sales-tracking','picture'),('sales-tracking','guesswork'),('sales-tracking','manual'),
('team-tasks','unclear'),('team-tasks','missed'),('team-tasks','manual'),
('file-organization','lost'),('file-organization','findable')
on conflict do nothing;

insert into digital_tools(id,name,description,website,category,pricing_type,free_plan,difficulty,best_for,mobile,nigeria) values
('whatsapp-business','WhatsApp Business','Business profile, labels, quick replies and catalogs on the chat app customers already use.','https://www.whatsapp.com/business','Communication','Free',true,'Easy','Customer communication','true','Used by almost every Nigerian SME; works on any smartphone.'),
('google-sheets','Google Sheets','Simple online spreadsheet for lists, orders and records that syncs to your phone.','https://www.google.com/sheets/about/','Productivity','Free',true,'Easy','Simple lists and tracking','true','Free with any Google account; light on data.'),
('google-calendar','Google Calendar','Shared calendars and reminders for bookings and follow-ups.','https://calendar.google.com','Booking','Free',true,'Easy','Appointments and reminders','true','Free; reminders work over basic data.'),
('google-forms','Google Forms','Simple forms that collect orders, enquiries and feedback into a sheet.','https://www.google.com/forms/about/','Forms','Free',true,'Easy','Collecting structured requests','true','Free and very light on data.'),
('google-drive','Google Drive','Online folders for receipts, photos and business files.','https://www.google.com/drive/','File storage','Free',true,'Easy','Keeping files findable','true','Free starter storage included.'),
('trello','Trello','Boards that show who does what and what stage each job is at.','https://trello.com','Project management','Free plan available',true,'Easy','Team task tracking','true','Free plan covers small teams.'),
('canva','Canva','Easy designs for promotions, price lists and social posts.','https://www.canva.com','Marketing','Free plan available',true,'Easy','Promotion designs','true','Free plan is generous; mobile app works well.'),
('meta-suite','Meta Business Suite','Manage Instagram/Facebook posts, messages and basic insights in one place.','https://www.facebook.com/business/tools/meta-business-suite','Marketing','Free',true,'Easy','Social promotion','true','Free; built for the apps vendors already use.'),
('paystack','Paystack','Payment links and transfers log so you can see who paid.','https://paystack.com','Payments','Free to start',true,'Easy','Collecting payments','true','Built for Nigeria; bank transfers and cards.'),
('flutterwave','Flutterwave','Online payments including cards and bank, with records.','https://flutterwave.com','Payments','Free to start',true,'Moderate','Growing payment volume','true','Nigerian company; wider method coverage as you grow.'),
('wave-accounting','Wave Accounting','Simple income, expense and invoice records for small businesses.','https://www.waveapps.com','Accounting','Free',true,'Moderate','Basic money records','true','Free tier; needs consistent internet for sync.'),
('zoho-inventory','Zoho Inventory','Simple stock counts, reorder levels and supplier records.','https://www.zoho.com/inventory/','Inventory','Free plan available',true,'Moderate','Small stock tracking','true','Free plan suits small catalogs.'),
('hubspot-crm','HubSpot CRM','Free customer database with deal and follow-up tracking.','https://www.hubspot.com/products/crm','CRM','Free plan available',true,'Moderate','Growing customer lists','true','Free plan is real; needs training time.'),
('notion','Notion','Flexible pages and simple databases for records, plans and wikis.','https://www.notion.com','Productivity','Free plan available',true,'Moderate','Organized records','true','Free plan covers individuals and tiny teams.')
on conflict (id) do update set name=excluded.name, description=excluded.description, website=excluded.website, category=excluded.category, pricing_type=excluded.pricing_type, free_plan=excluded.free_plan, difficulty=excluded.difficulty, best_for=excluded.best_for, mobile=excluded.mobile, nigeria=excluded.nigeria, active=true;

insert into tool_capabilities(tool_id,capability_id,base_stage) values
('whatsapp-business','customer-communication','now'),
('google-sheets','customer-records','now'),('google-sheets','order-tracking','now'),('google-sheets','sales-tracking','later'),('google-sheets','expense-tracking','now'),
('notion','customer-records','later'),('notion','file-organization','later'),
('hubspot-crm','customer-records','later'),('hubspot-crm','followup-management','later'),
('google-calendar','booking-scheduling','now'),('google-calendar','followup-management','now'),
('google-forms','order-tracking','now'),('google-forms','customer-records','now'),
('trello','team-tasks','later'),('trello','order-tracking','later'),
('paystack','payment-collection','now'),
('flutterwave','payment-collection','later'),
('wave-accounting','expense-tracking','later'),('wave-accounting','profit-visibility','later'),
('zoho-inventory','stock-tracking-cap','later'),('zoho-inventory','reorder-management','future'),
('canva','marketing-management','now'),
('meta-suite','marketing-management','now'),
('google-drive','file-organization','now')
on conflict do nothing;

-- Current tools that already satisfy a capability (substring match, case-insensitive).
insert into tool_equivalents(tool_id,tool_name) values
('google-sheets','Google Sheets'),('google-sheets','Sheets'),('google-sheets','Excel'),
('whatsapp-business','WhatsApp'),('google-calendar','Calendar'),('google-calendar','Google Calendar'),
('google-forms','Google Forms'),('google-drive','Google Drive'),('google-drive','Drive'),
('trello','Trello'),('paystack','Paystack'),('flutterwave','Flutterwave'),
('canva','Canva'),('notion','Notion'),('hubspot-crm','HubSpot'),('hubspot-crm','CRM'),
('zoho-inventory','Zoho'),('wave-accounting','Wave')
on conflict do nothing;

-- Advanced tool so maturity stage-bump rules have real coverage.
insert into digital_tools(id,name,description,website,category,pricing_type,free_plan,difficulty,best_for,mobile,nigeria) values
('zoho-crm','Zoho CRM','Full customer database with pipelines and follow-up automation for larger teams.','https://www.zoho.com/crm/','CRM','Free plan available',true,'Advanced','Structured teams handling volume','true','Free plan exists; needs training time and consistent data habits.')
on conflict (id) do update set name=excluded.name, description=excluded.description, website=excluded.website, category=excluded.category, pricing_type=excluded.pricing_type, free_plan=excluded.free_plan, difficulty=excluded.difficulty, best_for=excluded.best_for, mobile=excluded.mobile, nigeria=excluded.nigeria, active=true;
insert into tool_capabilities(tool_id,capability_id,base_stage) values
('zoho-crm','customer-records','later'),('zoho-crm','followup-management','later')
on conflict do nothing;
insert into tool_equivalents(tool_id,tool_name) values ('zoho-crm','Zoho CRM')
on conflict do nothing;
