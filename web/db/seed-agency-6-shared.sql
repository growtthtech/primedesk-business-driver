-- Agency seed 6/6: shared SME processes agencies legitimately use.
-- Explicit relevant wins over the segment firewall (engine checks rules first).
insert into relevance_rules(business_category,business_subtype,process_id,relevance) values
('Digital Marketing Agency',null,'receiving-enquiries','relevant'),
('Digital Marketing Agency',null,'managing-leads','relevant'),
('Digital Marketing Agency',null,'follow-up','relevant'),
('Digital Marketing Agency',null,'customer-records','relevant'),
('Digital Marketing Agency',null,'bookings','relevant'),
('Digital Marketing Agency',null,'orders','relevant'),
('Digital Marketing Agency',null,'customer-communication','relevant'),
('Digital Marketing Agency',null,'customer-support','relevant'),
('Digital Marketing Agency',null,'customer-follow-up','relevant'),
('Digital Marketing Agency',null,'recording-sales','relevant'),
('Digital Marketing Agency',null,'invoicing','relevant'),
('Digital Marketing Agency',null,'receiving-payments','relevant'),
('Digital Marketing Agency',null,'tracking-expenses','relevant')
on conflict do nothing;
