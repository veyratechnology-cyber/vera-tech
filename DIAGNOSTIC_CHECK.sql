-- =====================================================
-- DIAGNOSTIC: Check what's actually in the database
-- Run this in Supabase SQL Editor to see the problem
-- =====================================================

-- 1. Check if tables exist
SELECT 
  'Table exists:' as info,
  table_name
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('services', 'industry_pages')
ORDER BY table_name;

-- 2. Check services table structure
SELECT 
  'Services columns:' as info,
  column_name, 
  data_type
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'services'
ORDER BY ordinal_position;

-- 3. Count records
SELECT 'Services count:' as info, COUNT(*) as count FROM services;
SELECT 'Industries count:' as info, COUNT(*) as count FROM industry_pages;

-- 4. Show actual service records (if any)
SELECT 
  'Existing services:' as info,
  id,
  name,
  slug,
  published,
  created_at
FROM services
ORDER BY display_order
LIMIT 10;

-- 5. Show actual industry records (if any)
SELECT 
  'Existing industries:' as info,
  id,
  name,
  slug,
  published,
  created_at
FROM industry_pages
ORDER BY display_order
LIMIT 10;

-- 6. Check for any errors or constraints
SELECT 
  'Constraints on services:' as info,
  conname as constraint_name,
  contype as constraint_type
FROM pg_constraint
WHERE conrelid = 'services'::regclass;

-- =====================================================
-- INSTRUCTIONS:
-- 1. Run this in Supabase SQL Editor
-- 2. Copy ALL the output
-- 3. Send it to me so I can diagnose the exact problem
-- =====================================================
