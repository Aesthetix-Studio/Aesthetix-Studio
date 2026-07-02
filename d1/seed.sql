INSERT INTO lead_submissions (id, source, first_name, last_name, email, company, service, budget, message, created_at)
VALUES
  ('seed_contact_1', 'CONTACT', 'Sarah', 'Chen', 'sarah@luminary.io', 'Luminary Financial', 'Brand + Web', '₹5-10L', 'Looking for a premium rebrand and launch support.', '2026-06-18 10:00:00'),
  ('seed_contact_2', 'CONTACT', 'David', 'Park', 'david@verdant.com', 'Verdant Foods Co.', 'Web Design', '₹3-5L', 'Need a conversion-focused redesign for Q3 launch.', '2026-06-17 11:30:00');

INSERT INTO lead_submissions (id, source, first_name, last_name, email, day, time, created_at)
VALUES
  ('seed_call_1', 'DISCOVERY_CALL', 'Maya', 'Okonkwo', 'maya@zenithstudios.io', 'Tue Jun 24', '10:00 AM', '2026-06-19 09:00:00');

INSERT INTO invoices (id, client, project, amount_cents, status, issued_at, due_at)
VALUES
  ('INV-2026-041', 'Luminary Financial', 'Rebrand Phase 1', 625000, 'Paid', '2026-06-01', '2026-06-15'),
  ('INV-2026-040', 'Verdant Foods Co.', 'Website Design', 340000, 'Pending', '2026-06-10', '2026-06-24'),
  ('INV-2026-039', 'Nexus Protocol', 'Dashboard Design', 900000, 'Overdue', '2026-05-15', '2026-05-29'),
  ('INV-2026-038', 'Helix Medical', 'Brand Identity', 375000, 'Paid', '2026-05-28', '2026-06-11'),
  ('INV-2026-037', 'Solari Energy', 'SEO Strategy', 460000, 'Paid', '2026-05-01', '2026-05-15');
