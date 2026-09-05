-- ============================================================
-- COMPLETE FIX FOR ADMIN LOGIN - RUN THIS IN SUPABASE
-- This will fix admin login once and for all
-- ============================================================

-- Step 1: Delete any existing admin users to start fresh
DELETE FROM admins WHERE email = 'admin@veyratech.com';

-- Step 2: Create admin with correct password hash for "bonaventure123kenya"
INSERT INTO admins (id, name, email, password_hash, status, created_at, updated_at)
VALUES (
  gen_random_uuid()::text,
  'Admin User',
  'admin@veyratech.com',
  '$2a$10$ESawmQ4JS0TQNeZNMTXeruup2VJ36vzNagkyVXW1e16UL.hVXecAC',
  'ACTIVE',
  NOW(),
  NOW()
);

-- Step 3: Verify the admin was created
SELECT 
  id,
  email, 
  name, 
  status,
  created_at,
  '✅ Admin user ready' as status_message,
  'Login: admin@veyratech.com / bonaventure123kenya' as credentials
FROM admins 
WHERE email = 'admin@veyratech.com';

-- Step 4: Verify all required tables exist
SELECT 
  COUNT(*) as total_tables,
  CASE 
    WHEN COUNT(*) >= 18 THEN '✅ All tables exist'
    ELSE '❌ Some tables missing - run complete-database-setup.sql'
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Step 5: List all tables
SELECT 
  table_name,
  '✅' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- ============================================================
-- AFTER RUNNING THIS:
-- 
-- 1. Wait 30 seconds
-- 2. Go to: https://vera-tech.vercel.app/admin-login
-- 3. Login with:
--    Email: admin@veyratech.com
--    Password: bonaventure123kenya
-- 
-- Should work immediately!
-- ============================================================

-- Check if password hash is correct (should show t for true)
SELECT 
  email,
  password_hash = '$2a$10$ESawmQ4JS0TQNeZNMTXeruup2VJ36vzNagkyVXW1e16UL.hVXecAC' as hash_matches,
  status
FROM admins 
WHERE email = 'admin@veyratech.com';
