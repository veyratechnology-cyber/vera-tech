-- ============================================================
-- VERIFY AND FIX ADMIN LOGIN
-- Run this COMPLETE file in Supabase SQL Editor
-- ============================================================

-- Step 1: Check if admin exists
SELECT 
    id, 
    email, 
    status, 
    created_at 
FROM admins 
WHERE email = 'admin@veyratech.com';

-- Step 2: Delete existing admin if exists (to start fresh)
DELETE FROM admins WHERE email = 'admin@veyratech.com';

-- Step 3: Create admin with correct bcryptjs hash
-- Password: bonaventure123kenya
-- Hash generated with: bcrypt.hashSync('bonaventure123kenya', 10)
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
    '$2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna',
    'ACTIVE',
    NOW(),
    NOW()
);

-- Step 4: Verify admin was created correctly
SELECT 
    id,
    name,
    email,
    password_hash,
    status,
    last_login_at,
    created_at,
    updated_at
FROM admins 
WHERE email = 'admin@veyratech.com';

-- Step 5: Test database connection
SELECT 
    'Database connection OK' as status,
    current_database() as database_name,
    version() as postgres_version;

-- Step 6: Verify all required tables exist
SELECT 
    table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN (
        'admins',
        'leads', 
        'prospects',
        'consultations',
        'proposals',
        'projects',
        'audit_logs'
    )
ORDER BY table_name;

-- Step 7: Show admin table structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'admins'
ORDER BY ordinal_position;

-- ============================================================
-- EXPECTED RESULTS:
-- ============================================================
-- After running this, you should see:
-- 1. One row deleted (if admin existed)
-- 2. One row inserted
-- 3. Admin details showing:
--    - email: admin@veyratech.com
--    - status: ACTIVE
--    - password_hash: $2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna
-- 4. Database connection: OK
-- 5. All 7 tables listed
-- 6. Admin table structure showing all columns
--
-- LOGIN CREDENTIALS:
-- Email: admin@veyratech.com
-- Password: bonaventure123kenya
-- ============================================================
