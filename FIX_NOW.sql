-- ============================================================================
-- FIX PASSWORD NOW - WORKS WITH EXISTING DATA
-- ============================================================================

-- Simply UPDATE the password hash (don't delete)
UPDATE admins 
SET 
  password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
  status = 'ACTIVE',
  updated_at = NOW()
WHERE email = 'admin@veyratech.com';

-- Verify it worked
SELECT 
  email,
  name,
  status,
  substring(password_hash, 1, 50) as hash_preview,
  CASE 
    WHEN password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay' 
    THEN '✅ SUCCESS - Login will now work!' 
    ELSE '❌ FAILED - Hash is: ' || substring(password_hash, 1, 50)
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
