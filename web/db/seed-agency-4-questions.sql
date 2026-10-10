-- Agency library seed 4/5: area-generic question sets + flagship overrides.
-- Each set: workflow + tools + problems + improve (required) + impact (optional).

-- Business Development
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:bizdev.q1','ag-bizdev','method','How do you currently win clients?','multi','["Referrals","Content and social media","Paid ads","Outreach messages","Networking and events","No steady method","Other"]',true,1,'Pick all that apply.','workflow'),
('agq:bizdev.q2','ag-bizdev','tools','Which tools do you use here?','multi','["WhatsApp","Email","Spreadsheets","CRM","Proposal docs","Calendar","No specific tool","Other"]',true,2,'','tools'),
('agq:bizdev.q3','ag-bizdev','problems','What problems do you experience winning clients?','multi','["Leads go cold","Follow-ups are forgotten","Proposals take too long","Pricing is guesswork","Too much manual work","No major problem","Other"]',true,3,'','problems'),
('agq:bizdev.q4','ag-bizdev','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need'),
('agq:bizdev.q5','ag-bizdev','impact','If this stays as it is, what does it cost you? (optional)','long','[]',false,5,'Delivery time, revenue, workload — whatever hurts most.','context')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Client Management
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:client.q1','ag-client','method','How do you currently run this with clients?','multi','["WhatsApp","Email","Calls","Shared docs","Project tool","No steady method","Other"]',true,1,'Pick all that apply.','workflow'),
('agq:client.q2','ag-client','tools','Which tools do you use here?','multi','["WhatsApp","Email","Spreadsheets","Calendar","Project tool","CRM","No specific tool","Other"]',true,2,'','tools'),
('agq:client.q3','ag-client','problems','What problems do clients feel most?','multi','["Slow responses","Lost information","Missed approvals","Scope keeps growing","Chasing feedback","No major problem","Other"]',true,3,'','problems'),
('agq:client.q4','ag-client','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need'),
('agq:client.q5','ag-client','impact','If this stays as it is, what does it cost you? (optional)','long','[]',false,5,'Delivery time, experience, revenue — whatever hurts most.','context')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Service Delivery
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:delivery.q1','ag-delivery','method','How does this work get done today?','multi','["Planned in advance","Done when due","Shared docs","Chat messages","Project tool","No steady method","Other"]',true,1,'Pick all that apply.','workflow'),
('agq:delivery.q2','ag-delivery','tools','Which tools do you use here?','multi','["WhatsApp","Spreadsheets","Design tools","Schedulers","Project tool","Analytics","No specific tool","Other"]',true,2,'','tools'),
('agq:delivery.q3','ag-delivery','problems','Where does delivery break down?','multi','["Missed deadlines","Rework and revisions","Approvals stall","Quality is uneven","Too much manual work","No major problem","Other"]',true,3,'','problems'),
('agq:delivery.q4','ag-delivery','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need'),
('agq:delivery.q5','ag-delivery','impact','If this stays as it is, what does it cost you? (optional)','long','[]',false,5,'Delivery time, quality, workload — whatever hurts most.','context')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Team & Resource
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:team.q1','ag-team','method','How is work organized today?','multi','["Task list","Chat messages","Weekly plan","Shared calendar","Project tool","In my head","Other"]',true,1,'Pick all that apply.','workflow'),
('agq:team.q2','ag-team','tools','Which tools do you use here?','multi','["WhatsApp","Spreadsheets","Project tool","Shared docs","Time tracker","No specific tool","Other"]',true,2,'','tools'),
('agq:team.q3','ag-team','problems','What problems hit the team most?','multi','["Unclear ownership","Overload","Missed handoffs","Knowledge lives in heads","Too much manual work","No major problem","Other"]',true,3,'','problems'),
('agq:team.q4','ag-team','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need'),
('agq:team.q5','ag-team','impact','If this stays as it is, what does it cost you? (optional)','long','[]',false,5,'Delivery time, quality, burnout — whatever hurts most.','context')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Financial & Commercial
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:finance.q1','ag-finance','method','How do you handle this money task today?','multi','["Notebook","Spreadsheets","Bank app","Accounting software","Memory","No system","Other"]',true,1,'Pick all that apply.','workflow'),
('agq:finance.q2','ag-finance','tools','Which tools do you use here?','multi','["Notebook","Spreadsheets","Bank app","Accounting software","No specific tool","Other"]',true,2,'','tools'),
('agq:finance.q3','ag-finance','problems','What money problems hurt most?','multi','["Late payments","Unclear profit","Mixed personal money","Chasing invoices","Too much manual work","No major problem","Other"]',true,3,'','problems'),
('agq:finance.q4','ag-finance','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need'),
('agq:finance.q5','ag-finance','impact','If this stays as it is, what does it cost you? (optional)','long','[]',false,5,'Cash flow, profit, time — whatever hurts most.','context')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Performance & Growth
insert into mapping_questions(id,area_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:growth.q1','ag-growth','method','How do you measure this today?','multi','["Platform insights","Manual reports","Spreadsheets","Dashboards","Client feedback","We don''t measure this","Other"]',true,1,'Pick all that apply.','workflow'),
('agq:growth.q2','ag-growth','tools','Which tools do you use here?','multi','["Platform insights","Spreadsheets","Dashboards","Report docs","No specific tool","Other"]',true,2,'','tools'),
('agq:growth.q3','ag-growth','problems','What problems hit measurement most?','multi','["Manual report building","Numbers disagree","No time to analyze","Clients don''t read reports","No major problem","Other"]',true,3,'','problems'),
('agq:growth.q4','ag-growth','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need'),
('agq:growth.q5','ag-growth','impact','If this stays as it is, what does it cost you? (optional)','long','[]',false,5,'Decisions, retention, growth — whatever hurts most.','context')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: client onboarding
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:client-onboarding.q1','client-onboarding','steps','What happens when a new client signs?','multi','["Welcome message","Kickoff call","Requirements form","Access collection","First invoice","Nothing formal","Other"]',true,1,'Pick all that apply.','workflow'),
('agq:client-onboarding.q2','client-onboarding','tools','Which tools do you use here?','multi','["WhatsApp","Email","Forms","Shared docs","Project tool","No specific tool","Other"]',true,2,'','tools'),
('agq:client-onboarding.q3','client-onboarding','problems','Where does onboarding break?','multi','["Slow access collection","Unclear requirements","Repeated questions","Delayed kickoff","No major problem","Other"]',true,3,'','problems'),
('agq:client-onboarding.q4','client-onboarding','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: content approval
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:sm-approval.q1','sm-approval','method','How does content reach approval today?','multi','["WhatsApp drops","Shared folder","Project tool","Email threads","No process","Other"]',true,1,'','workflow'),
('agq:sm-approval.q2','sm-approval','tools','Which tools do you use here?','multi','["WhatsApp","Shared docs","Project tool","No specific tool","Other"]',true,2,'','tools'),
('agq:sm-approval.q3','sm-approval','problems','Where do approvals stall?','multi','["Late client replies","Endless revisions","Lost files","Unclear approver","No major problem","Other"]',true,3,'','problems'),
('agq:sm-approval.q4','sm-approval','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: campaign monitoring
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:ad-monitoring.q1','ad-monitoring','method','How do live campaigns get watched?','multi','["Platform dashboards","Manual checks","Spreadsheets","Client screenshots","Not watched regularly","Other"]',true,1,'','workflow'),
('agq:ad-monitoring.q2','ad-monitoring','tools','Which tools do you use here?','multi','["Ad platforms","Spreadsheets","Dashboards","No specific tool","Other"]',true,2,'','tools'),
('agq:ad-monitoring.q3','ad-monitoring','problems','What goes wrong most?','multi','["Overspending unnoticed","Late optimization","Unclear reporting","No major problem","Other"]',true,3,'','problems'),
('agq:ad-monitoring.q4','ad-monitoring','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;

-- Override: client reporting
insert into mapping_questions(id,process_id,qkey,question,type,options,required,qorder,help,purpose) values
('agq:pf-reporting.q1','pf-reporting','method','How do client reports get built today?','multi','["Manual screenshots","Spreadsheets","Platform exports","Report docs","Templates","No regular reports","Other"]',true,1,'','workflow'),
('agq:pf-reporting.q2','pf-reporting','tools','Which tools do you use here?','multi','["Spreadsheets","Report docs","Dashboards","No specific tool","Other"]',true,2,'','tools'),
('agq:pf-reporting.q3','pf-reporting','problems','What hurts most about reporting?','multi','["Takes too long","Numbers disagree","Clients don''t read them","No major problem","Other"]',true,3,'','problems'),
('agq:pf-reporting.q4','pf-reporting','improve','What would you most like to improve?','long','[]',true,4,'One or two sentences is enough.','need')
on conflict (id) do update set question=excluded.question, type=excluded.type, options=excluded.options, required=excluded.required, qorder=excluded.qorder, help=excluded.help, purpose=excluded.purpose;
