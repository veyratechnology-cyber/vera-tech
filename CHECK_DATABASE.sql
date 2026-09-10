-- ============================================================================
-- CHECK WHAT'S IN YOUR DATABASE RIGHT NOW
-- Run this in Supabase SQL Editor to see the problem
-- ============================================================================

-- See what password hash is currently in the database
SELECT 
  id,
  email,
  name,
  status,
  password_hash,
  last_login_at,
  created_at
FROM admins 
WHERE email = 'admin@veyratech.com';

-- Check if the hash is correct
SELECT 
  email,
  CASE 
    WHEN password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay' 
    THEN '✅ CORRECT - Login should work' 
    ELSE '❌ WRONG - This is why you get 401 error. Current hash is: ' || substring(password_hash, 1, 50)
  END as hash_check
FROM admins 
WHERE email = 'admin@veyratech.com';

-- ============================================================================
-- If you see "❌ WRONG", that's why login fails with 401
-- The password verification fails because the hash doesn't match
-- ============================================================================
