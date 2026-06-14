-- Add theme column to projects table (JSON string with bg gradient and accent color)
ALTER TABLE projects ADD COLUMN theme TEXT;

-- Meridian — deep indigo/purple
UPDATE projects SET theme = '{"bg":"linear-gradient(145deg, #0E0C1A 0%, #181428 50%, #0A0814 100%)","accent":"rgba(120,100,200,0.1)"}' WHERE slug = 'meridian';

-- Kyoto Co. — warm amber/brown
UPDATE projects SET theme = '{"bg":"linear-gradient(145deg, #100A08 0%, #1C1410 100%)","accent":"rgba(196,164,107,0.08)"}' WHERE slug = 'kyoto-co';

-- Solaris — forest green
UPDATE projects SET theme = '{"bg":"linear-gradient(145deg, #080C08 0%, #0C1810 100%)","accent":"rgba(100,150,120,0.08)"}' WHERE slug = 'solaris';

-- Vantage — purple/pink
UPDATE projects SET theme = '{"bg":"linear-gradient(145deg, #0A0810 0%, #14081A 100%)","accent":"rgba(180,130,190,0.08)"}' WHERE slug = 'vantage';

-- Aurelia — rose/burgundy
UPDATE projects SET theme = '{"bg":"linear-gradient(145deg, #140A10 0%, #1C1018 100%)","accent":"rgba(180,100,140,0.08)"}' WHERE slug = 'aurelia';
