-- Fix admin password hash
-- Run this in Supabase SQL Editor

-- First, let's check if admin exists
SELECT id, email, status FROM admins WHERE email = 'admin@veyratech.com';

-- Update with correct bcryptjs hash for password: bonaventure123kenya
UPDATE admins 
SET password_hash = '$2a$10$fVVJicsc8m.BdGV8T7OtIOXV3yksfV/YGdjBgeoI1XCBa7mBjmIna'
WHERE email = 'admin@veyratech.com';

-- Verify the update
SELECT id, email, password_hash, status FROM admins WHERE email = 'admin@veyratech.com';
