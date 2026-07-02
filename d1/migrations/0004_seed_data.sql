-- Seed data for Aesthetix Studio
-- Run after 0003 migration

-- Team members
INSERT INTO team_members (id, name, role, email, avatar, color, status, created_at) VALUES
  ('tm-001', 'Arjun Mehta', 'Creative Director', 'arjun@aesthetix.studio', 'AM', '#6150F6', 'Active', '2024-01-15'),
  ('tm-002', 'Priya Sharma', 'Lead Designer', 'priya@aesthetix.studio', 'PS', '#3B82F6', 'Active', '2024-02-10'),
  ('tm-003', 'Ravi Kumar', 'Full Stack Developer', 'ravi@aesthetix.studio', 'RK', '#10B981', 'Active', '2024-03-05'),
  ('tm-004', 'Neha Gupta', 'Project Manager', 'neha@aesthetix.studio', 'NG', '#F59E0B', 'Active', '2024-04-20'),
  ('tm-005', 'Vikram Patel', 'UI/UX Designer', 'vikram@aesthetix.studio', 'VP', '#EF4444', 'Active', '2024-06-01');

-- Clients
INSERT INTO clients (id, name, contact_name, email, phone, plan, status, joined_at, project_count, total_spend_cents, created_at) VALUES
  ('cl-001', 'PhysioCore', 'Dr. Amitesh Reddy', 'amitesh@physiocore.in', '+91 98765 43210', 'Premium', 'Active', '2025-01-10', 2, 45000000, '2025-01-10'),
  ('cl-002', 'Aurelia', 'Meera Joshi', 'meera@aurelia.co', '+91 98765 43211', 'Enterprise', 'Active', '2025-03-15', 1, 32000000, '2025-03-15'),
  ('cl-003', 'Review Harvest', 'Suresh Nair', 'suresh@reviewharvest.com', '+91 98765 43212', 'Standard', 'Active', '2025-06-20', 1, 18000000, '2025-06-20'),
  ('cl-004', 'LuxeTech', 'Ananya Das', 'ananya@luxetech.io', '+91 98765 43213', 'Premium', 'Active', '2025-09-01', 1, 28000000, '2025-09-01'),
  ('cl-005', 'GreenLeaf Organics', 'Rohit Verma', 'rohit@greenleaf.in', '+91 98765 43214', 'Starter', 'Active', '2026-01-15', 1, 12000000, '2026-01-15');

-- Projects
INSERT INTO projects (id, name, client, status, progress, due_date, type, budget, priority, created_at) VALUES
  ('pj-001', 'PhysioCore Website Redesign', 'PhysioCore', 'In Progress', 75, '2026-07-15', 'Website', '₹4,50,000', 'High', '2026-01-10'),
  ('pj-002', 'PhysioCore Patient Portal', 'PhysioCore', 'Discovery', 20, '2026-08-30', 'Web App', '₹2,50,000', 'Medium', '2026-04-01'),
  ('pj-003', 'Aurelia Brand Identity', 'Aurelia', 'In Review', 90, '2026-06-30', 'Branding', '₹3,20,000', 'High', '2026-02-15'),
  ('pj-004', 'Review Harvest Platform', 'Review Harvest', 'In Progress', 55, '2026-08-15', 'SaaS', '₹1,80,000', 'Medium', '2026-05-20'),
  ('pj-005', 'LuxeTech Dashboard', 'LuxeTech', 'Completed', 100, '2026-05-30', 'Web App', '₹2,80,000', 'High', '2026-01-05'),
  ('pj-006', 'GreenLeaf E-commerce', 'GreenLeaf Organics', 'Discovery', 10, '2026-09-30', 'E-commerce', '₹1,20,000', 'Low', '2026-06-01');

-- Tasks
INSERT INTO tasks (id, title, project, assignee, due_date, priority, status, created_at) VALUES
  ('tk-001', 'Finalize homepage wireframe', 'PhysioCore Website Redesign', 'Priya Sharma', '2026-07-05', 'High', 'In Progress', '2026-06-20'),
  ('tk-002', 'Implement responsive navigation', 'PhysioCore Website Redesign', 'Ravi Kumar', '2026-07-08', 'Medium', 'To Do', '2026-06-20'),
  ('tk-003', 'Create brand moodboard', 'Aurelia Brand Identity', 'Vikram Patel', '2026-06-25', 'High', 'Done', '2026-06-15'),
  ('tk-004', 'Design logo concepts', 'Aurelia Brand Identity', 'Priya Sharma', '2026-06-28', 'High', 'In Progress', '2026-06-15'),
  ('tk-005', 'Set up CI/CD pipeline', 'Review Harvest Platform', 'Ravi Kumar', '2026-07-10', 'Medium', 'To Do', '2026-06-18'),
  ('tk-006', 'Write API documentation', 'Review Harvest Platform', 'Neha Gupta', '2026-07-12', 'Low', 'To Do', '2026-06-18'),
  ('tk-007', 'Client review meeting prep', 'PhysioCore Website Redesign', 'Neha Gupta', '2026-07-03', 'Urgent', 'In Progress', '2026-06-28'),
  ('tk-008', 'Final handoff package', 'LuxeTech Dashboard', 'Arjun Mehta', '2026-06-05', 'High', 'Done', '2026-05-25');

-- Messages
INSERT INTO messages (id, from_name, from_avatar, from_color, project, preview, sent_at, unread) VALUES
  ('msg-001', 'Dr. Amitesh Reddy', 'A', '#6150F6', 'PhysioCore Website Redesign', 'The homepage wireframe looks great. Can we add a patient testimonials section?', '2026-06-30 10:30:00', 1),
  ('msg-002', 'Arjun Mehta', 'AM', '#3B82F6', 'PhysioCore Website Redesign', 'Absolutely! We will add a carousel with 5 testimonials. Should we include video too?', '2026-06-30 11:15:00', 0),
  ('msg-003', 'Meera Joshi', 'M', '#10B981', 'Aurelia Brand Identity', 'The final logo variations are ready for your review. Sending the link now.', '2026-06-29 14:00:00', 1),
  ('msg-004', 'Suresh Nair', 'S', '#F59E0B', 'Review Harvest Platform', 'Can we schedule a demo for next week? The team is excited to see progress.', '2026-06-28 09:45:00', 0);

-- Blog posts
INSERT INTO blog_posts (id, slug, title, excerpt, content, category, author, read_time, gradient, created_at) VALUES
  ('bp-001', 'systematic-design', 'The Art of Systematic Design', 'How systematic approaches create consistent, scalable design systems.', 'Design systems are the backbone of modern digital products. They ensure consistency, reduce decision fatigue, and enable teams to ship faster without sacrificing quality. A well-built system is more than a component library — it is a shared language.', 'Design', 'Arjun Mehta', '8 min', 'from-violet-400 to-purple-600', '2026-05-10'),
  ('bp-002', 'motion-enterprise', 'Motion Design for Enterprise', 'Why enterprise products need motion and how to implement it thoughtfully.', 'Enterprise software does not have to be boring. Thoughtful motion design can improve usability, provide feedback, and create a more pleasant experience. The key is intentionality — every animation should serve a purpose.', 'Technology', 'Priya Sharma', '6 min', 'from-blue-400 to-cyan-600', '2026-04-15'),
  ('bp-003', 'typography-products', 'Typography That Sells Products', 'How font choices directly impact conversion rates and brand perception.', 'Typography is one of the most powerful tools in a designer arsenal. The right typeface can convey trust, luxury, or innovation before a single word is read. Studies show that typography alone can influence up to 90% of snap judgments about a product.', 'Design', 'Vikram Patel', '7 min', 'from-amber-400 to-orange-600', '2026-03-20'),
  ('bp-004', 'seo-agencies', 'SEO for Design Agencies', 'Practical SEO strategies that design agencies can implement today.', 'SEO for design agencies is unique. You need to showcase visual work while maintaining technical excellence. This guide covers image optimization, structured data for portfolios, and local SEO strategies that actually work.', 'Business', 'Neha Gupta', '10 min', 'from-green-400 to-emerald-600', '2026-02-28'),
  ('bp-005', 'dark-mode', 'Dark Mode Done Right', 'A comprehensive guide to implementing dark mode that users actually want.', 'Dark mode is not just inverting colors. A proper implementation considers contrast ratios, image treatment, shadow adjustments, and user preferences. This guide walks through the technical and design considerations.', 'Design', 'Ravi Kumar', '9 min', 'from-gray-400 to-slate-700', '2026-01-15'),
  ('bp-006', 'pricing-design', 'Designing Pricing Pages That Convert', 'Psychology-backed strategies for pricing page design.', 'Your pricing page is likely the most visited page on your site. Yet most teams treat it as an afterthought. This article breaks down the psychological principles and design patterns that turn browsers into buyers.', 'Business', 'Arjun Mehta', '7 min', 'from-rose-400 to-pink-600', '2026-01-01');

-- Studio settings
INSERT INTO studio_settings (key, value, updated_at) VALUES
  ('studioName', 'Aesthetix Studio', datetime('now')),
  ('studioEmail', 'hello@aesthetix.studio', datetime('now')),
  ('studioWebsite', 'https://aesthetixstudio.dev', datetime('now')),
  ('studioTimezone', 'Asia/Kolkata', datetime('now')),
  ('featureFlags', '{"portal":true,"invoicing":true,"messages":true,"calendar":true}', datetime('now'));
