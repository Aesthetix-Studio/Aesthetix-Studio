CREATE TABLE IF NOT EXISTS lead_submissions (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT,
  budget TEXT,
  message TEXT,
  day TEXT,
  time TEXT,
  project_summary TEXT,
  inspiration TEXT,
  start_date TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_lead_submissions_source_created_at
  ON lead_submissions(source, created_at);

CREATE INDEX IF NOT EXISTS idx_lead_submissions_email
  ON lead_submissions(email);

CREATE TABLE IF NOT EXISTS invoices (
  id TEXT PRIMARY KEY,
  client TEXT NOT NULL,
  project TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL,
  issued_at TEXT NOT NULL,
  due_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_invoices_status_due_at
  ON invoices(status, due_at);
