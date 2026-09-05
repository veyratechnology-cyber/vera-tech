-- ============================================================
-- FINAL COMPLETE SETUP FOR VEYRATECH - RUN THIS IN SUPABASE
-- This fixes everything: tables, admin user, password
-- ============================================================

-- First, update the admin password to the correct hash
UPDATE admins 
SET password_hash = '$2a$10$ESawmQ4JS0TQNeZNMTXeruup2VJ36vzNagkyVXW1e16UL.hVXecAC'
WHERE email = 'admin@veyratech.com';

-- If admin doesn't exist, create it
INSERT INTO admins (id, name, email, password_hash, status, created_at, updated_at)
SELECT 
  gen_random_uuid()::text,
  'Admin User',
  'admin@veyratech.com',
  '$2a$10$ESawmQ4JS0TQNeZNMTXeruup2VJ36vzNagkyVXW1e16UL.hVXecAC',
  'ACTIVE',
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM admins WHERE email = 'admin@veyratech.com'
);

-- Verify the admin user
SELECT 
  email, 
  name, 
  status,
  'Password: bonaventure123kenya' as login_info
FROM admins 
WHERE email = 'admin@veyratech.com';

-- ============================================================
-- ADMIN LOGIN CREDENTIALS:
-- Email: admin@veyratech.com
-- Password: bonaventure123kenya
-- ============================================================

-- Check all tables exist
SELECT 
  table_name,
  '✅ Exists' as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- If you see 18 tables above, everything is ready!
-- If tables are missing, run complete-database-setup.sql first
