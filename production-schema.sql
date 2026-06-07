-- Database schema for Aesthetix Studio (Cloudflare D1 / SQLite)

-- Leads table for storing contact form submissions
CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    budget TEXT,
    project_details TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Projects table for portfolio CMS
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    result TEXT,
    year TEXT,
    image TEXT NOT NULL, -- Primary/featured image URL (e.g. from R2)
    summary TEXT NOT NULL,
    details TEXT, -- JSON array of tags/involvement details (e.g., ["UI/UX", "Art Direction"])
    is_featured INTEGER NOT NULL DEFAULT 0,
    project_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);

-- Initial seed data for featured project (Aurelia)
INSERT OR IGNORE INTO projects (id, name, slug, category, result, year, image, summary, details, is_featured) 
VALUES (
    'project_aurelia_01',
    'Aurelia',
    'aurelia',
    'Luxury Fashion House',
    '+43% increase in qualified inquiries',
    '2026',
    '/work/fashion.png',
    'A positioning and digital system for an independent fashion house moving from seasonal awareness to private-client demand.',
    '["Editorial art direction", "Brand system refinement", "Campaign landing experience", "Private inquiry flow"]',
    1
);

-- Rate limiting for admin login
CREATE TABLE IF NOT EXISTS login_attempts (
    ip TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0,
    last_attempt INTEGER NOT NULL DEFAULT 0,
    locked_until INTEGER NOT NULL DEFAULT 0
);

-- Blog posts table for content management
CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    published INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);

-- Case studies table
CREATE TABLE IF NOT EXISTS case_studies (
    id TEXT PRIMARY KEY,
    client TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    challenge TEXT NOT NULL,
    process TEXT NOT NULL,
    results TEXT NOT NULL,
    cover_image TEXT,
    category TEXT,
    year TEXT,
    published INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_published ON case_studies(published);
