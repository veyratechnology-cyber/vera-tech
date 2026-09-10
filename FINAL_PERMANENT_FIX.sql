-- ============================================================================
-- FINAL PERMANENT FIX - MUST RUN IN SUPABASE
-- This fixes the 401 login error permanently
-- ============================================================================

-- ============================================================================
-- CRITICAL: FIX ADMIN PASSWORD HASH
-- The 401 error means password verification is failing
-- ============================================================================

-- First, let's see what's in the database
SELECT 
  id,
  email,
  name,
  status,
  substring(password_hash, 1, 40) as current_hash,
  last_login_at,
  created_at
FROM admins 
WHERE email = 'admin@veyratech.com';

-- Now update with the CORRECT hash
UPDATE admins 
SET 
  password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
  status = 'ACTIVE',
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
ON CONFLICT (email) DO UPDATE SET
  password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
  status = 'ACTIVE',
  updated_at = NOW();

-- Verify the hash was updated
SELECT 
  email,
  status,
  substring(password_hash, 1, 40) as new_hash,
  CASE 
    WHEN password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay' 
    THEN '✅ CORRECT HASH' 
    ELSE '❌ WRONG HASH - RUN AGAIN' 
  END as status_check
FROM admins 
WHERE email = 'admin@veyratech.com';

-- ============================================================================
-- Expected output: status_check should show "✅ CORRECT HASH"
-- If it shows "❌ WRONG HASH", run this script again
-- ============================================================================

-- ============================================================================
-- LOGIN CREDENTIALS (TEST IMMEDIATELY AFTER RUNNING THIS):
-- URL: https://vera-tech.vercel.app/admin-login
-- Email: admin@veyratech.com
-- Password: bonaventure123kenya
-- ============================================================================
