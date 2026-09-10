-- ============================================================================
-- SIMPLE DATABASE FIX - Run this in Supabase SQL Editor
-- Only adds missing columns and fixes admin password
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. FIX ADMIN PASSWORD (CRITICAL)
-- ============================================================================

-- Update existing admin password
UPDATE admins 
SET password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
    updated_at = NOW()
WHERE email = 'admin@veyratech.com';

-- If admin doesn't exist, create it
INSERT INTO admins (id, name, email, password_hash, status, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'Administrator',
  'admin@veyratech.com',
  '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
  'ACTIVE',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- ============================================================================
-- 2. ADD MISSING COLUMNS TO EXISTING TABLES (IF THEY DON'T EXIST)
-- ============================================================================

-- Add missing columns to services table (if they don't exist)
DO $$ 
BEGIN
  -- Add problem column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='problem') THEN
    ALTER TABLE services ADD COLUMN problem TEXT;
  END IF;

  -- Add solution column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='solution') THEN
    ALTER TABLE services ADD COLUMN solution TEXT;
  END IF;

  -- Add deliverables column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='deliverables') THEN
    ALTER TABLE services ADD COLUMN deliverables TEXT;
  END IF;

  -- Add business_outcomes column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='business_outcomes') THEN
    ALTER TABLE services ADD COLUMN business_outcomes TEXT;
  END IF;

  -- Add faq column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='faq') THEN
    ALTER TABLE services ADD COLUMN faq TEXT;
  END IF;

  -- Add seo_title column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='seo_title') THEN
    ALTER TABLE services ADD COLUMN seo_title VARCHAR(255);
  END IF;

  -- Add seo_description column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='seo_description') THEN
    ALTER TABLE services ADD COLUMN seo_description TEXT;
  END IF;

  -- Add display_order column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='display_order') THEN
    ALTER TABLE services ADD COLUMN display_order INTEGER DEFAULT 0;
  END IF;
END $$;

-- ============================================================================
-- 3. VERIFY CRITICAL TABLES EXIST
-- ============================================================================

SELECT 
  'Table exists: ' || table_name as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN (
    'admins',
    'contact_messages',
    'leads',
    'consultations',
    'proposals',
    'projects',
    'services'
  )
ORDER BY table_name;

-- ============================================================================
-- 4. VERIFY ADMIN PASSWORD IS FIXED
-- ============================================================================

SELECT 
  email,
  name,
  status,
  substring(password_hash, 1, 30) as hash_preview,
  last_login_at,
  created_at
FROM admins 
WHERE email = 'admin@veyratech.com';

-- ============================================================================
-- Expected output:
-- 1. List of tables that exist
-- 2. Admin user with correct hash preview: $2a$10$x.x/hNXqWfHuHPosbmIQAu
-- ============================================================================

-- ============================================================================
-- LOGIN CREDENTIALS:
-- Email: admin@veyratech.com
-- Password: bonaventure123kenya
-- ============================================================================
