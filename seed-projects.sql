-- Seed projects table with sample portfolio data from the design
-- Uses INSERT OR IGNORE to avoid duplicates

INSERT OR IGNORE INTO projects (id, name, slug, category, result, year, image, summary, details, is_featured) 
VALUES (
    'proj_meridian_01',
    'Meridian',
    'meridian',
    'Financial Intelligence Platform',
    '47% increase in enterprise conversions within 6 months of launch.',
    '2025',
    '/work/meridian.png',
    'Reshaping perception in the $3T wealth management sector. Full identity, motion system, and 140-screen platform.',
    '["Brand Identity", "Digital Platform", "Motion"]',
    1
);

INSERT OR IGNORE INTO projects (id, name, slug, category, result, year, image, summary, details, is_featured) 
VALUES (
    'proj_kyoto_02',
    'Kyoto Co.',
    'kyoto-co',
    'Luxury Retail Identity',
    '3x conversion rate improvement across all digital channels.',
    '2024',
    '/work/kyoto.png',
    'Tripling conversion through surgical restraint. Complete rebrand for a 40-year heritage house.',
    '["Identity System", "Campaign"]',
    0
);

INSERT OR IGNORE INTO projects (id, name, slug, category, result, year, image, summary, details, is_featured) 
VALUES (
    'proj_solaris_03',
    'Solaris',
    'solaris',
    'Climate Technology Brand',
    '$12M Series B funding secured within 4 months of rebrand.',
    '2025',
    '/work/solaris.png',
    'Making clean energy feel inevitable. Category positioning, identity, and product design for Series B climate tech.',
    '["Brand Strategy", "Product Design"]',
    0
);

INSERT OR IGNORE INTO projects (id, name, slug, category, result, year, image, summary, details, is_featured) 
VALUES (
    'proj_vantage_04',
    'Vantage',
    'vantage',
    'B2B SaaS Design System',
    '60% faster feature development cycles across 12 product teams.',
    '2024',
    '/work/vantage.png',
    'Engineering 230+ components for a $450M platform. Design system, documentation, and 18-month implementation.',
    '["Design System", "Component Library"]',
    1
);
