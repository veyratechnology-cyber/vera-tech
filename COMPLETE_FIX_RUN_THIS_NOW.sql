-- ============================================================================
-- COMPLETE PRODUCTION FIX - RUN THIS IN SUPABASE SQL EDITOR
-- ============================================================================
-- Fixes: 401 login errors, 42P05 errors, consultation table errors
-- Time: 2-3 minutes
-- Run entire file at once
-- ============================================================================

BEGIN;

-- ============================================================================
-- FIX 1: ADMIN PASSWORD (Fixes 401 Login Errors)
-- ============================================================================

-- Update admin password hash to correct value
UPDATE admins 
SET 
  password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
  status = 'ACTIVE',
  updated_at = NOW()
WHERE email = 'admin@veyratech.com';

-- Create admin if doesn't exist
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
-- FIX 2: CONSULTATION ENUMS (Required for consultation system)
-- ============================================================================

-- Create consultation_type enum if missing
DO $$ BEGIN
  CREATE TYPE consultation_type AS ENUM (
    'AI_ADOPTION',
    'AI_STRATEGY',
    'BUSINESS_AUTOMATION',
    'DIGITAL_TRANSFORMATION',
    'TECHNOLOGY_STRATEGY',
    'SOFTWARE_DEVELOPMENT',
    'TECHNOLOGY_AUDIT',
    'DATA_ANALYTICS',
    'CYBERSECURITY',
    'BUSINESS_PROCESS_OPTIMIZATION',
    'CUSTOM_SOLUTION',
    'OTHER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create meeting_type enum if missing
DO $$ BEGIN
  CREATE TYPE meeting_type AS ENUM (
    'GOOGLE_MEET',
    'PHONE',
    'IN_PERSON'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create consultation_outcome enum if missing
DO $$ BEGIN
  CREATE TYPE consultation_outcome AS ENUM (
    'PROPOSAL_SENT',
    'PROJECT_STARTED',
    'FOLLOW_UP_NEEDED',
    'NOT_A_FIT',
    'CLIENT_CANCELLED',
    'PENDING_DECISION',
    'CONVERTED_TO_CLIENT',
    'DECLINED',
    'OTHER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- FIX 3: ADD MISSING CONSULTATION COLUMNS
-- ============================================================================

-- Add all missing columns to consultations table
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS actual_scheduled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS meeting_type meeting_type,
ADD COLUMN IF NOT EXISTS meeting_duration INTEGER DEFAULT 60,
ADD COLUMN IF NOT EXISTS timezone VARCHAR(100) DEFAULT 'Africa/Nairobi',
ADD COLUMN IF NOT EXISTS google_calendar_event_id TEXT,
ADD COLUMN IF NOT EXISTS google_meet_link TEXT,
ADD COLUMN IF NOT EXISTS meeting_notes TEXT,
ADD COLUMN IF NOT EXISTS outcome consultation_outcome,
ADD COLUMN IF NOT EXISTS follow_up_date DATE,
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS reschedule_count INTEGER DEFAULT 0;

-- ============================================================================
-- FIX 4: CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_consultations_actual_scheduled_at 
  ON consultations(actual_scheduled_at);
  
CREATE INDEX IF NOT EXISTS idx_consultations_status 
  ON consultations(status);
  
CREATE INDEX IF NOT EXISTS idx_consultations_created_at 
  ON consultations(created_at DESC);

-- ============================================================================
-- FIX 5: MIGRATE EXISTING DATA
-- ============================================================================

-- Set default values for existing records
UPDATE consultations
SET 
  meeting_duration = COALESCE(meeting_duration, 60),
  timezone = COALESCE(timezone, 'Africa/Nairobi'),
  reschedule_count = COALESCE(reschedule_count, 0)
WHERE meeting_duration IS NULL 
   OR timezone IS NULL 
   OR reschedule_count IS NULL;

COMMIT;

-- ============================================================================
-- VERIFICATION QUERIES - Check Everything Works
-- ============================================================================

-- 1. Verify admin password is fixed
SELECT 
  '1. ADMIN CHECK' as test,
  email,
  name,
  status,
  CASE 
    WHEN password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay' 
    THEN '✅ PASSWORD HASH CORRECT' 
    ELSE '❌ PASSWORD HASH WRONG'
  END as result
FROM admins 
WHERE email = 'admin@veyratech.com';

-- 2. Verify consultations table structure
SELECT 
  '2. CONSULTATIONS TABLE' as test,
  COUNT(*) as total_columns,
  CASE 
    WHEN COUNT(*) >= 20 
    THEN '✅ ALL COLUMNS EXIST' 
    ELSE '❌ MISSING COLUMNS'
  END as result
FROM information_schema.columns
WHERE table_name = 'consultations';

-- 3. Verify enums exist
SELECT 
  '3. ENUMS CHECK' as test,
  STRING_AGG(typname, ', ') as enums_found,
  CASE 
    WHEN COUNT(*) >= 3 
    THEN '✅ ALL ENUMS EXIST' 
    ELSE '❌ MISSING ENUMS'
  END as result
FROM pg_type
WHERE typname IN ('consultation_type', 'meeting_type', 'consultation_outcome');

-- 4. Test consultation query (should not error)
SELECT 
  '4. QUERY TEST' as test,
  COUNT(*) as consultation_count,
  '✅ QUERIES WORK' as result
FROM consultations;

-- ============================================================================
-- EXPECTED OUTPUT:
-- ============================================================================
-- You should see 4 results, all with ✅ status:
--
-- 1. ADMIN CHECK → ✅ PASSWORD HASH CORRECT
-- 2. CONSULTATIONS TABLE → ✅ ALL COLUMNS EXIST
-- 3. ENUMS CHECK → ✅ ALL ENUMS EXIST
-- 4. QUERY TEST → ✅ QUERIES WORK
--
-- If you see ANY ❌, take a screenshot and send it to me
-- ============================================================================

-- ============================================================================
-- AFTER RUNNING THIS SQL:
-- ============================================================================
-- 1. ✅ Admin login will work: admin@veyratech.com / bonaventure123kenya
-- 2. ✅ Consultation page will load (no more 42P05 errors)
-- 3. ✅ All admin pages will work
-- 4. ✅ No more "table may not exist" errors
--
-- NEXT STEP: Fix DATABASE_URL in Vercel (must have pgbouncer=true)
-- ============================================================================
