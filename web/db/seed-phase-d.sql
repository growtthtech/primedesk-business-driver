-- Phase D seed: mapping question sets. Area-generic rows apply unless a
-- process-specific row exists. Re-runnable via id upserts; tune data here.
-- purposes: workflow | tools | problems | need | context

-- Generic: Getting Customers
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('area:getting-customers.q1','getting-customers','channel','How do customers first reach you?','multi','["WhatsApp","Instagram","Phone call","Walk-in","Website","Other"]',true,1,'Pick all that apply.','workflow'),
('area:getting-customers.q2','getting-customers','tracking','How do you keep track of these enquiries?','single','["Notebook","WhatsApp chats","Google Sheets","Excel","Business software","We don''t track them systematically","Other"]',true,2,'','tools'),
('area:getting-customers.q3','getting-customers','problems','What problems do you experience here?','multi','["Enquiries get forgotten","Too much manual work","Customer information gets lost","Slow to respond","No major problem","Other"]',true,3,'','problems'),
('area:getting-customers.q4','getting-customers','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Generic: Managing Customers
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('area:managing-customers.q1','managing-customers','handling','How do you currently handle this for customers?','multi','["WhatsApp","Phone call","Notebook","Google Sheets","Calendar","Business software","Other"]',true,1,'Pick all that apply.','workflow'),
('area:managing-customers.q2','managing-customers','tools','Which tools do you use here?','multi','["WhatsApp","Instagram","Phone","Notebook","Google Sheets","Excel","Google Calendar","Business software","No specific tool","Other"]',true,2,'','tools'),
('area:managing-customers.q3','managing-customers','problems','What problems do you experience here?','multi','["Information gets lost","Difficult to track","Customers are missed","Follow-ups are forgotten","Too much manual work","No major problem","Other"]',true,3,'','problems'),
('area:managing-customers.q4','managing-customers','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Generic: Managing Stock
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('area:managing-stock.q1','managing-stock','method','How do you currently do this?','multi','["Notebook","WhatsApp","Google Sheets","Excel","Business software","Memory","We don''t do this systematically","Other"]',true,1,'Pick all that apply.','workflow'),
('area:managing-stock.q2','managing-stock','tools','Which tools do you use here?','multi','["Notebook","WhatsApp","Google Sheets","Excel","Business software","No specific tool","Other"]',true,2,'','tools'),
('area:managing-stock.q3','managing-stock','problems','What problems do you experience here?','multi','["Stock runs out unexpectedly","Too much manual work","Records are unclear","Money tied up in stock","No major problem","Other"]',true,3,'','problems'),
('area:managing-stock.q4','managing-stock','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Generic: Managing Money
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('area:managing-money.q1','managing-money','method','How do you currently do this?','multi','["Notebook","WhatsApp","Google Sheets","Excel","Bank app","Business software","Memory","We don''t do this systematically","Other"]',true,1,'Pick all that apply.','workflow'),
('area:managing-money.q2','managing-money','tools','Which tools do you use here?','multi','["Notebook","Google Sheets","Excel","Bank app","Business software","No specific tool","Other"]',true,2,'','tools'),
('area:managing-money.q3','managing-money','problems','What problems do you experience here?','multi','["Records are unclear","Money gets mixed up","Too much manual work","Difficult to know real profit","No major problem","Other"]',true,3,'','problems'),
('area:managing-money.q4','managing-money','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Generic: Growing the Business
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('area:growing-business.q1','growing-business','method','How do you currently do this?','multi','["Notebook","WhatsApp","Google Sheets","Excel","Social media insights","Business software","We don''t do this systematically","Other"]',true,1,'Pick all that apply.','workflow'),
('area:growing-business.q2','growing-business','tools','Which tools do you use here?','multi','["Notebook","Google Sheets","Excel","Social media insights","Business software","No specific tool","Other"]',true,2,'','tools'),
('area:growing-business.q3','growing-business','problems','What problems do you experience here?','multi','["No clear picture","Too much manual work","Decisions are guesswork","No major problem","Other"]',true,3,'','problems'),
('area:growing-business.q4','growing-business','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: bookings (spec §9)
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('proc:bookings.q1','bookings','channel','How do customers usually book?','multi','["WhatsApp","Instagram","Phone call","Website","In person","Other"]',true,1,'Pick all that apply.','workflow'),
('proc:bookings.q2','bookings','after','What usually happens after a customer books?','multi','["Booking is confirmed","Customer details are recorded","Payment/deposit is collected","Customer receives a reminder","Staff prepares for the appointment","Other"]',true,2,'','workflow'),
('proc:bookings.q3','bookings','tracking','How do you currently keep track of bookings?','single','["Notebook","WhatsApp","Google Sheets","Excel","Calendar","Business software","We don''t track them systematically","Other"]',true,3,'','tools'),
('proc:bookings.q4','bookings','problems','What problems do you experience with bookings?','multi','["Double bookings","Missed appointments","Lost customer information","Unclear payment status","Too much manual work","Customers forget appointments","Difficulty keeping track of bookings","No major problem","Other"]',true,4,'','problems'),
('proc:bookings.q5','bookings','improve','What would you most like to improve about bookings?','long','[]',true,5,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: orders
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('proc:orders.q1','orders','channel','How do customers place orders?','multi','["WhatsApp","Instagram","Phone","Website","Physical location","Other"]',true,1,'Pick all that apply.','workflow'),
('proc:orders.q2','orders','after','What happens after an order?','multi','["Confirm order","Confirm price","Receive payment","Prepare order","Arrange delivery","Update customer","Other"]',true,2,'','workflow'),
('proc:orders.q3','orders','tracking','How do you track orders?','single','["Notebook","WhatsApp","Excel","Google Sheets","Business software","I don''t track them systematically","Other"]',true,3,'','tools'),
('proc:orders.q4','orders','problems','What problems do you experience with orders?','multi','["Orders are forgotten","Pending orders are unclear","Customer information gets lost","Payment tracking is difficult","Customers ask for updates","Order status is unclear","Too much manual work","No major problem","Other"]',true,4,'','problems'),
('proc:orders.q5','orders','improve','What would you most like to improve about orders?','long','[]',true,5,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: stock-tracking
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('proc:stock-tracking.q1','stock-tracking','purchasing','How do you buy products or materials?','multi','["Market run","Supplier order","Phone/WhatsApp order","Other"]',true,1,'','workflow'),
('proc:stock-tracking.q2','stock-tracking','receiving','How do arrivals get checked in?','multi','["Counted on arrival","Quality checked","Written into a book","Not checked systematically","Other"]',true,2,'','workflow'),
('proc:stock-tracking.q3','stock-tracking','records','How do you know what you currently have?','single','["Notebook","WhatsApp","Google Sheets","Excel","Business software","Memory","We don''t track systematically","Other"]',true,3,'','tools'),
('proc:stock-tracking.q4','stock-tracking','reorder','How do you decide when to buy again?','single','["When shelves look empty","Fixed market days","Supplier reminds me","Low-stock list","No system","Other"]',true,4,'','workflow'),
('proc:stock-tracking.q5','stock-tracking','problems','What problems do you experience with stock?','multi','["Stock runs out unexpectedly","Overbuying","Records don''t match reality","Too much manual work","No major problem","Other"]',true,5,'','problems'),
('proc:stock-tracking.q6','stock-tracking','improve','What would you most like to improve about stock?','long','[]',true,6,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: marketing
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('proc:marketing.q1','marketing','channels','How do you make the business known?','multi','["WhatsApp broadcast","Instagram","Flyers","Word of mouth","Paid ads","No active marketing","Other"]',true,1,'Pick all that apply.','workflow'),
('proc:marketing.q2','marketing','activity','What do you actually do to attract customers?','multi','["Post content","Run promotions","Ask for referrals","Attend events","Nothing regular","Other"]',true,2,'','workflow'),
('proc:marketing.q3','marketing','tracking','How do you know what brings customers?','single','["Ask each customer","Social media insights","Notebook","No tracking","Other"]',true,3,'','tools'),
('proc:marketing.q4','marketing','problems','What problems do you experience with marketing?','multi','["Inconsistent effort","Don''t know what works","Costs money with unclear return","No major problem","Other"]',true,4,'','problems'),
('proc:marketing.q5','marketing','improve','What would you most like to improve about marketing?','long','[]',true,5,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: receiving-payments
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('proc:receiving-payments.q1','receiving-payments','channels','How does money reach you?','multi','["Bank transfer","POS","Cash","Payment link","Other"]',true,1,'Pick all that apply.','workflow'),
('proc:receiving-payments.q2','receiving-payments','confirm','How do you confirm a payment happened?','multi','["Check bank app","Receipt screenshot","Written receipt","POS printout","No confirmation system","Other"]',true,2,'','workflow'),
('proc:receiving-payments.q3','receiving-payments','records','Where do payment records live?','single','["Notebook","Google Sheets","Excel","Bank app history","Business software","No records","Other"]',true,3,'','tools'),
('proc:receiving-payments.q4','receiving-payments','problems','What problems do you experience with payments?','multi','["Fake transfer alerts","Unclear who paid","Mixing business and personal money","Slow confirmation","No major problem","Other"]',true,4,'','problems'),
('proc:receiving-payments.q5','receiving-payments','improve','What would you most like to improve about payments?','long','[]',true,5,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: customer-follow-up
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('proc:customer-follow-up.q1','customer-follow-up','method','How do you follow up today?','multi','["WhatsApp message","Phone call","No follow-up yet","Other"]',true,1,'Pick all that apply.','workflow'),
('proc:customer-follow-up.q2','customer-follow-up','tracking','How do you remember who to follow up?','single','["Notebook","WhatsApp chats","Google Sheets","Memory","Calendar reminder","No system","Other"]',true,2,'','tools'),
('proc:customer-follow-up.q3','customer-follow-up','problems','What problems do you experience with follow-up?','multi','["Follow-ups are forgotten","No time","Don''t know what to say","Customers don''t respond","No major problem","Other"]',true,3,'','problems'),
('proc:customer-follow-up.q4','customer-follow-up','improve','What would you most like to improve about follow-up?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;
