-- Add missing columns to existing tables

ALTER TABLE services ADD COLUMN IF NOT EXISTS business_outcomes TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_title VARCHAR(500);
ALTER TABLE services ADD COLUMN IF NOT EXISTS seo_description TEXT;

ALTER TABLE industry_pages ADD COLUMN IF NOT EXISTS relevant_services TEXT;
ALTER TABLE industry_pages ADD COLUMN IF NOT EXISTS seo_title VARCHAR(500);
ALTER TABLE industry_pages ADD COLUMN IF NOT EXISTS seo_description TEXT;

-- Verify
SELECT column_name FROM information_schema.columns WHERE table_name = 'services' ORDER BY ordinal_position;
SELECT column_name FROM information_schema.columns WHERE table_name = 'industry_pages' ORDER BY ordinal_position;
