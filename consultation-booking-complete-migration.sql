-- ============================================================
-- VeyraTech Complete Consultation Booking System Migration
-- ============================================================
-- This migration includes ALL enhancements for the premium
-- consultation booking system with Google Calendar integration
--
-- Run this entire file in your Supabase SQL Editor
-- ============================================================
-- Version: 2.0
-- Date: 2025-01-23
-- Features:
-- - Enhanced consultation fields (personal, company, meeting)
-- - Google Calendar integration
-- - Smart scheduling support
-- - Meeting location for in-person meetings
-- - Reminder system
-- - Consultation history tracking
-- - 24/7 availability for international clients
-- ============================================================

BEGIN;

-- ============================================================
-- STEP 1: Create New Enums
-- ============================================================

-- Consultation Type Enum (12 types)
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

-- Meeting Type Enum (3 types)
DO $$ BEGIN
  CREATE TYPE meeting_type AS ENUM (
    'GOOGLE_MEET',
    'PHONE',
    'IN_PERSON'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Consultation Outcome Enum (9 outcomes)
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

-- Reminder Type Enum (3 reminder times)
DO $$ BEGIN
  CREATE TYPE reminder_type AS ENUM (
    'DAY_BEFORE',
    'HOUR_BEFORE',
    'TEN_MINUTES'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================
-- STEP 2: Update Existing Enums
-- ============================================================

-- Update consultation_status enum (add NO_SHOW)
DO $$ BEGIN
  ALTER TYPE consultation_status ADD VALUE IF NOT EXISTS 'NO_SHOW';
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Update industry enum (expand to 18 industries)
DO $$ BEGIN
  -- Add new industries if they don't exist
  ALTER TYPE industry ADD VALUE IF NOT EXISTS 'MEDIA_ENTERTAINMENT';
  ALTER TYPE industry ADD VALUE IF NOT EXISTS 'ECOMMERCE';
  ALTER TYPE industry ADD VALUE IF NOT EXISTS 'GOVERNMENT_NGO';
  ALTER TYPE industry ADD VALUE IF NOT EXISTS 'OTHER';
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Update company_size enum (5 specific ranges)
DO $$ BEGIN
  ALTER TYPE company_size ADD VALUE IF NOT EXISTS 'SIZE_1_10';
  ALTER TYPE company_size ADD VALUE IF NOT EXISTS 'SIZE_11_50';
  ALTER TYPE company_size ADD VALUE IF NOT EXISTS 'SIZE_51_200';
  ALTER TYPE company_size ADD VALUE IF NOT EXISTS 'SIZE_201_500';
  ALTER TYPE company_size ADD VALUE IF NOT EXISTS 'SIZE_501_PLUS';
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ============================================================
-- STEP 3: Add New Columns to Consultations Table
-- ============================================================

-- Personal Information
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS job_title VARCHAR(255),
ADD COLUMN IF NOT EXISTS preferred_contact_method VARCHAR(50);

-- Company Information
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS company_website TEXT,
ADD COLUMN IF NOT EXISTS country VARCHAR(100),
ADD COLUMN IF NOT EXISTS city VARCHAR(100);

-- Consultation Details
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS consultation_types consultation_type[],
ADD COLUMN IF NOT EXISTS desired_outcome TEXT,
ADD COLUMN IF NOT EXISTS current_technology TEXT;

-- Meeting Information
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS actual_scheduled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS meeting_type meeting_type,
ADD COLUMN IF NOT EXISTS meeting_duration INTEGER DEFAULT 60,
ADD COLUMN IF NOT EXISTS meeting_location TEXT,  -- For in-person meetings
ADD COLUMN IF NOT EXISTS timezone VARCHAR(100) DEFAULT 'Africa/Nairobi';

-- Google Calendar Integration
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS google_calendar_event_id TEXT,
ADD COLUMN IF NOT EXISTS google_meet_link TEXT;

-- Meeting Notes & Preparation
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS meeting_notes TEXT,
ADD COLUMN IF NOT EXISTS key_problems TEXT,
ADD COLUMN IF NOT EXISTS potential_solutions TEXT,
ADD COLUMN IF NOT EXISTS client_concerns TEXT,
ADD COLUMN IF NOT EXISTS budget_discussion TEXT;

-- Outcome & Follow-up
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS outcome consultation_outcome,
ADD COLUMN IF NOT EXISTS follow_up_date DATE,
ADD COLUMN IF NOT EXISTS follow_up_notes TEXT;

-- History & Tracking
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT,
ADD COLUMN IF NOT EXISTS reschedule_count INTEGER DEFAULT 0;

-- ============================================================
-- STEP 4: Create Consultation Reminders Table
-- ============================================================

CREATE TABLE IF NOT EXISTS consultation_reminders (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  consultation_id TEXT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  reminder_type reminder_type NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT unique_consultation_reminder UNIQUE (consultation_id, reminder_type)
);

-- Create indexes for reminders table
CREATE INDEX IF NOT EXISTS idx_consultation_reminders_consultation_id 
  ON consultation_reminders(consultation_id);
  
CREATE INDEX IF NOT EXISTS idx_consultation_reminders_scheduled_for 
  ON consultation_reminders(scheduled_for);
  
CREATE INDEX IF NOT EXISTS idx_consultation_reminders_sent_at 
  ON consultation_reminders(sent_at);

-- ============================================================
-- STEP 5: Create Consultation History Table
-- ============================================================

CREATE TABLE IF NOT EXISTS consultation_history (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  consultation_id TEXT NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,  -- CREATED, SCHEDULED, RESCHEDULED, CANCELLED, COMPLETED, etc.
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for history table
CREATE INDEX IF NOT EXISTS idx_consultation_history_consultation_id 
  ON consultation_history(consultation_id);
  
CREATE INDEX IF NOT EXISTS idx_consultation_history_created_at 
  ON consultation_history(created_at DESC);

-- ============================================================
-- STEP 6: Create System Settings Table (if not exists)
-- ============================================================

CREATE TABLE IF NOT EXISTS system_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default consultation settings (24/7 availability for international clients)
INSERT INTO system_settings (key, value, description) VALUES
  ('consultation_default_duration', '60', 'Default consultation duration in minutes'),
  ('consultation_buffer_time', '15', 'Buffer time between consultations in minutes'),
  ('consultation_working_hours_start', '00:00', '24/7 availability - any time'),
  ('consultation_working_hours_end', '23:59', '24/7 availability - any time'),
  ('consultation_working_days', '["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"]', 'All days available for international clients')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  description = EXCLUDED.description,
  updated_at = CURRENT_TIMESTAMP;

-- ============================================================
-- STEP 7: Create Indexes for Performance
-- ============================================================

-- Indexes on consultations table for common queries
CREATE INDEX IF NOT EXISTS idx_consultations_actual_scheduled_at 
  ON consultations(actual_scheduled_at);
  
CREATE INDEX IF NOT EXISTS idx_consultations_status 
  ON consultations(status);
  
CREATE INDEX IF NOT EXISTS idx_consultations_meeting_type 
  ON consultations(meeting_type);
  
CREATE INDEX IF NOT EXISTS idx_consultations_google_calendar_event_id 
  ON consultations(google_calendar_event_id);
  
CREATE INDEX IF NOT EXISTS idx_consultations_created_at 
  ON consultations(created_at DESC);
  
CREATE INDEX IF NOT EXISTS idx_consultations_industry 
  ON consultations(industry);

-- Composite index for scheduling queries
CREATE INDEX IF NOT EXISTS idx_consultations_scheduling 
  ON consultations(actual_scheduled_at, status) 
  WHERE actual_scheduled_at IS NOT NULL;

-- ============================================================
-- STEP 8: Add Comments for Documentation
-- ============================================================

COMMENT ON COLUMN consultations.job_title IS 'Client''s job title or role';
COMMENT ON COLUMN consultations.preferred_contact_method IS 'EMAIL, PHONE, or WHATSAPP';
COMMENT ON COLUMN consultations.company_website IS 'Client company website URL';
COMMENT ON COLUMN consultations.country IS 'Client location country';
COMMENT ON COLUMN consultations.city IS 'Client location city';
COMMENT ON COLUMN consultations.consultation_types IS 'Array of consultation types client is interested in';
COMMENT ON COLUMN consultations.desired_outcome IS 'What the client hopes to achieve';
COMMENT ON COLUMN consultations.current_technology IS 'Client''s current technology stack/systems';
COMMENT ON COLUMN consultations.actual_scheduled_at IS 'Confirmed meeting date and time (may differ from preferredDate)';
COMMENT ON COLUMN consultations.meeting_type IS 'GOOGLE_MEET, PHONE, or IN_PERSON';
COMMENT ON COLUMN consultations.meeting_duration IS 'Meeting duration in minutes (default 60)';
COMMENT ON COLUMN consultations.meeting_location IS 'Preferred location for in-person meetings';
COMMENT ON COLUMN consultations.timezone IS 'Client timezone (default Africa/Nairobi)';
COMMENT ON COLUMN consultations.google_calendar_event_id IS 'Google Calendar event ID for sync';
COMMENT ON COLUMN consultations.google_meet_link IS 'Google Meet link for virtual meetings';
COMMENT ON COLUMN consultations.meeting_notes IS 'Notes taken during or before the meeting';
COMMENT ON COLUMN consultations.key_problems IS 'Key problems identified during consultation';
COMMENT ON COLUMN consultations.potential_solutions IS 'Potential solutions discussed';
COMMENT ON COLUMN consultations.client_concerns IS 'Client concerns or objections';
COMMENT ON COLUMN consultations.budget_discussion IS 'Budget discussion notes';
COMMENT ON COLUMN consultations.outcome IS 'Consultation outcome (PROPOSAL_SENT, PROJECT_STARTED, etc.)';
COMMENT ON COLUMN consultations.follow_up_date IS 'Date for follow-up contact';
COMMENT ON COLUMN consultations.follow_up_notes IS 'Notes for follow-up';
COMMENT ON COLUMN consultations.cancelled_at IS 'Date and time consultation was cancelled';
COMMENT ON COLUMN consultations.cancellation_reason IS 'Reason for cancellation';
COMMENT ON COLUMN consultations.reschedule_count IS 'Number of times consultation was rescheduled';

COMMENT ON TABLE consultation_reminders IS 'Tracks sent reminders (24h, 1h, 10min before meetings)';
COMMENT ON TABLE consultation_history IS 'Audit trail of all consultation changes';
COMMENT ON TABLE system_settings IS 'System-wide configuration settings';

-- ============================================================
-- STEP 9: Create Helper Function for Scheduling
-- ============================================================

-- Function to check for consultation conflicts
CREATE OR REPLACE FUNCTION check_consultation_conflict(
  p_start_time TIMESTAMP WITH TIME ZONE,
  p_end_time TIMESTAMP WITH TIME ZONE,
  p_exclude_id TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM consultations
    WHERE status IN ('SCHEDULED', 'NEW')
      AND actual_scheduled_at IS NOT NULL
      AND (p_exclude_id IS NULL OR id != p_exclude_id)
      AND (
        -- Check if times overlap
        (actual_scheduled_at, actual_scheduled_at + (meeting_duration || ' minutes')::INTERVAL) 
        OVERLAPS 
        (p_start_time, p_end_time)
      )
  );
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION check_consultation_conflict IS 'Check if a time slot conflicts with existing consultations';

-- ============================================================
-- STEP 10: Data Migration (if needed)
-- ============================================================

-- Migrate any existing consultations to have default values
UPDATE consultations
SET 
  meeting_duration = COALESCE(meeting_duration, 60),
  timezone = COALESCE(timezone, 'Africa/Nairobi'),
  reschedule_count = COALESCE(reschedule_count, 0)
WHERE meeting_duration IS NULL 
   OR timezone IS NULL 
   OR reschedule_count IS NULL;

-- Create history entries for existing consultations
INSERT INTO consultation_history (consultation_id, action, notes, created_at)
SELECT 
  id, 
  'CREATED', 
  'Migrated from existing consultation', 
  created_at
FROM consultations
WHERE id NOT IN (SELECT DISTINCT consultation_id FROM consultation_history)
ON CONFLICT DO NOTHING;

-- ============================================================
-- STEP 11: Grant Permissions (adjust as needed)
-- ============================================================

-- Grant permissions to authenticated users (adjust role as needed)
GRANT SELECT, INSERT, UPDATE ON consultations TO authenticated;
GRANT SELECT, INSERT ON consultation_reminders TO authenticated;
GRANT SELECT, INSERT ON consultation_history TO authenticated;
GRANT SELECT ON system_settings TO authenticated;

-- ============================================================
-- STEP 12: Verification Queries
-- ============================================================

-- Verify enums created
DO $$
BEGIN
  RAISE NOTICE 'Verification: Checking enums...';
  
  -- Check consultation_type enum
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consultation_type') THEN
    RAISE NOTICE '✓ consultation_type enum exists';
  ELSE
    RAISE WARNING '✗ consultation_type enum missing';
  END IF;
  
  -- Check meeting_type enum
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'meeting_type') THEN
    RAISE NOTICE '✓ meeting_type enum exists';
  ELSE
    RAISE WARNING '✗ meeting_type enum missing';
  END IF;
  
  -- Check consultation_outcome enum
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'consultation_outcome') THEN
    RAISE NOTICE '✓ consultation_outcome enum exists';
  ELSE
    RAISE WARNING '✗ consultation_outcome enum missing';
  END IF;
  
  -- Check reminder_type enum
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'reminder_type') THEN
    RAISE NOTICE '✓ reminder_type enum exists';
  ELSE
    RAISE WARNING '✗ reminder_type enum missing';
  END IF;
END $$;

-- Verify tables created
DO $$
BEGIN
  RAISE NOTICE 'Verification: Checking tables...';
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'consultation_reminders') THEN
    RAISE NOTICE '✓ consultation_reminders table exists';
  ELSE
    RAISE WARNING '✗ consultation_reminders table missing';
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'consultation_history') THEN
    RAISE NOTICE '✓ consultation_history table exists';
  ELSE
    RAISE WARNING '✗ consultation_history table missing';
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'system_settings') THEN
    RAISE NOTICE '✓ system_settings table exists';
  ELSE
    RAISE WARNING '✗ system_settings table missing';
  END IF;
END $$;

-- Verify new columns added
DO $$
DECLARE
  column_count INTEGER;
BEGIN
  RAISE NOTICE 'Verification: Checking new columns...';
  
  SELECT COUNT(*) INTO column_count
  FROM information_schema.columns
  WHERE table_name = 'consultations'
    AND column_name IN (
      'job_title', 'preferred_contact_method', 'company_website',
      'country', 'city', 'consultation_types', 'desired_outcome',
      'current_technology', 'actual_scheduled_at', 'meeting_type',
      'meeting_duration', 'meeting_location', 'timezone',
      'google_calendar_event_id', 'google_meet_link', 'meeting_notes',
      'key_problems', 'potential_solutions', 'client_concerns',
      'budget_discussion', 'outcome', 'follow_up_date',
      'follow_up_notes', 'cancelled_at', 'cancellation_reason',
      'reschedule_count'
    );
  
  IF column_count = 26 THEN
    RAISE NOTICE '✓ All 26 new columns added to consultations table';
  ELSE
    RAISE WARNING '✗ Expected 26 columns, found %', column_count;
  END IF;
END $$;

-- Show summary
SELECT 
  'Consultations' as table_name,
  COUNT(*) as total_records,
  COUNT(actual_scheduled_at) as scheduled_count,
  COUNT(google_calendar_event_id) as with_calendar_sync,
  COUNT(meeting_location) as with_location
FROM consultations;

COMMIT;

-- ============================================================
-- Migration Complete! 
-- ============================================================
-- Next Steps:
-- 1. Verify all checks passed above (look for ✓ marks)
-- 2. Test booking a consultation from the frontend
-- 3. Configure Google Calendar integration (see GOOGLE_CALENDAR_SETUP.md)
-- 4. Set up Vercel cron job for reminders
-- 5. Update environment variables in Vercel
-- ============================================================

-- Show final success message
DO $$
BEGIN
  RAISE NOTICE '';
  RAISE NOTICE '================================================';
  RAISE NOTICE '✅ MIGRATION COMPLETED SUCCESSFULLY!';
  RAISE NOTICE '================================================';
  RAISE NOTICE 'Enhanced Consultation Booking System is now ready.';
  RAISE NOTICE '';
  RAISE NOTICE 'Features enabled:';
  RAISE NOTICE '  • 24/7 booking availability (all days, any time)';
  RAISE NOTICE '  • Google Calendar integration';
  RAISE NOTICE '  • Meeting location for in-person consultations';
  RAISE NOTICE '  • Smart scheduling with conflict detection';
  RAISE NOTICE '  • Automated reminders (24h, 1h, 10min)';
  RAISE NOTICE '  • Complete audit trail';
  RAISE NOTICE '';
  RAISE NOTICE 'Tables created: 3';
  RAISE NOTICE '  • consultation_reminders';
  RAISE NOTICE '  • consultation_history';
  RAISE NOTICE '  • system_settings';
  RAISE NOTICE '';
  RAISE NOTICE 'Columns added: 26 new fields to consultations table';
  RAISE NOTICE '';
  RAISE NOTICE 'Ready for production! 🚀';
  RAISE NOTICE '================================================';
END $$;
