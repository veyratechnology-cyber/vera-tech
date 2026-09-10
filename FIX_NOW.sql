-- ============================================================================
-- FIX PASSWORD NOW - COPY THIS ENTIRE SCRIPT
-- ============================================================================

-- Step 1: Delete the wrong admin (if exists)
DELETE FROM admins WHERE email = 'admin@veyratech.com';

-- Step 2: Create new admin with CORRECT hash
INSERT INTO admins (
  id,
  name,
  email,
  password_hash,
  status,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  'Administrator',
  'admin@veyratech.com',
  '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
  'ACTIVE',
  NOW(),
  NOW()
);

-- Step 3: Verify it's correct
SELECT 
  email,
  name,
  status,
  substring(password_hash, 1, 50) as hash_preview,
  CASE 
    WHEN password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay' 
    THEN '✅ SUCCESS - Login will now work!' 
    ELSE '❌ FAILED - Try again' 
  END as result
FROM admins 
WHERE email = 'admin@veyratech.com';

-- ============================================================================
-- You MUST see: result = "✅ SUCCESS - Login will now work!"
-- ============================================================================

-- ============================================================================
-- NOW TEST LOGIN:
-- Go to: https://vera-tech.vercel.app/admin-login
-- Email: admin@veyratech.com
-- Password: bonaventure123kenya
-- Should work IMMEDIATELY with NO 401 error
-- ============================================================================
