-- ============================================================
-- VeyraTech Enhanced Consultation Booking System Migration
-- ============================================================
-- This migration extends the consultation system with:
-- - Multi-step booking fields
-- - Google Calendar integration
-- - Smart scheduling support
-- - Meeting notes and preparation
-- - Reminder system
-- - Consultation history tracking
-- ============================================================

BEGIN;

-- ============================================================
-- STEP 1: Create New Enums
-- ============================================================

-- Consultation Type Enum
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

-- Meeting Type Enum
CREATE TYPE meeting_type AS ENUM (
  'GOOGLE_MEET',
  'PHONE',
  'IN_PERSON'
);

-- Consultation Outcome Enum
CREATE TYPE consultation_outcome AS ENUM (
  'PROPOSAL_REQUIRED',
  'FOLLOW_UP_MEETING',
  'ASSESSMENT_REQUIRED',
  'SEND_QUOTATION',
  'IMPLEMENTATION_OPPORTUNITY',
  'CLIENT_NOT_READY',
  'NOT_QUALIFIED',
  'COMPLETED',
  'OTHER'
);

-- Reminder Type Enum
CREATE TYPE reminder_type AS ENUM (
  'REMINDER_24H',
  'REMINDER_1H',
  'REMINDER_10M'
);

-- ============================================================
-- STEP 2: Update Existing Enums
-- ============================================================

-- Update consultation_status enum to add NO_SHOW
ALTER TYPE consultation_status ADD VALUE IF NOT EXISTS 'NO_SHOW';

-- Update industry enum with new industries
ALTER TYPE industry RENAME TO industry_old;

CREATE TYPE industry AS ENUM (
  'REAL_ESTATE',
  'CONSTRUCTION',
  'FINANCE',
  'BANKING',
  'INSURANCE',
  'RETAIL',
  'HEALTHCARE',
  'HOSPITALITY',
  'EDUCATION',
  'MANUFACTURING',
  'LOGISTICS_TRANSPORT',
  'AGRICULTURE',
  'PROFESSIONAL_SERVICES',
  'TECHNOLOGY',
  'MEDIA_ENTERTAINMENT',
  'ECOMMERCE',
  'GOVERNMENT_NGO',
  'OTHER'
);

-- Migrate existing industry data
ALTER TABLE consultations ALTER COLUMN industry TYPE industry USING (
  CASE 
    WHEN industry::text = 'LOGISTICS' THEN 'LOGISTICS_TRANSPORT'::industry
    WHEN industry::text = 'GROWING_ENTERPRISES' THEN 'OTHER'::industry
    ELSE industry::text::industry
  END
);

ALTER TABLE leads ALTER COLUMN industry TYPE industry USING (
  CASE 
    WHEN industry::text = 'LOGISTICS' THEN 'LOGISTICS_TRANSPORT'::industry
    WHEN industry::text = 'GROWING_ENTERPRISES' THEN 'OTHER'::industry
    ELSE industry::text::industry
  END
);

ALTER TABLE prospects ALTER COLUMN industry TYPE industry USING (
  CASE 
    WHEN industry::text = 'LOGISTICS' THEN 'LOGISTICS_TRANSPORT'::industry
    WHEN industry::text = 'GROWING_ENTERPRISES' THEN 'OTHER'::industry
    ELSE industry::text::industry
  END
);

ALTER TABLE industry_pages ALTER COLUMN industry TYPE industry USING (
  CASE 
    WHEN industry::text = 'LOGISTICS' THEN 'LOGISTICS_TRANSPORT'::industry
    WHEN industry::text = 'GROWING_ENTERPRISES' THEN 'OTHER'::industry
    ELSE industry::text::industry
  END
);

DROP TYPE industry_old;

-- Update company_size enum
ALTER TYPE company_size RENAME TO company_size_old;

CREATE TYPE company_size AS ENUM (
  'SIZE_1_10',
  'SIZE_11_50',
  'SIZE_51_100',
  'SIZE_101_500',
  'SIZE_500_PLUS'
);

-- Migrate existing company size data
ALTER TABLE consultations ALTER COLUMN company_size TYPE company_size USING (
  CASE 
    WHEN company_size::text = 'SMALL' THEN 'SIZE_1_10'::company_size
    WHEN company_size::text = 'MEDIUM' THEN 'SIZE_11_50'::company_size
    WHEN company_size::text = 'LARGE' THEN 'SIZE_101_500'::company_size
    WHEN company_size::text = 'ENTERPRISE' THEN 'SIZE_500_PLUS'::company_size
    ELSE NULL
  END
);

ALTER TABLE leads ALTER COLUMN company_size TYPE company_size USING (
  CASE 
    WHEN company_size::text = 'SMALL' THEN 'SIZE_1_10'::company_size
    WHEN company_size::text = 'MEDIUM' THEN 'SIZE_11_50'::company_size
    WHEN company_size::text = 'LARGE' THEN 'SIZE_101_500'::company_size
    WHEN company_size::text = 'ENTERPRISE' THEN 'SIZE_500_PLUS'::company_size
    ELSE NULL
  END
);

DROP TYPE company_size_old;

-- ============================================================
-- STEP 3: Add New Columns to consultations Table
-- ============================================================

-- Personal Information
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS job_title VARCHAR(255);
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS preferred_contact_method VARCHAR(50);

-- Company Information
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS company_website VARCHAR(500);
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS country VARCHAR(100);
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS city VARCHAR(100);

-- Consultation Information
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS consultation_types consultation_type[] DEFAULT ARRAY[]::consultation_type[];
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS desired_outcome TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS current_technology TEXT;

-- Meeting Information
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS actual_scheduled_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS meeting_type meeting_type;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS meeting_duration INTEGER DEFAULT 60;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS timezone VARCHAR(100) DEFAULT 'Africa/Nairobi';

-- Google Calendar Integration
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS google_calendar_event_id VARCHAR(255);
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS google_meet_link VARCHAR(500);

-- Meeting Notes & Preparation
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS meeting_notes TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS key_problems TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS potential_solutions TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS client_concerns TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS budget_discussion TEXT;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS next_steps TEXT;

-- Outcome & Follow-up
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS outcome consultation_outcome;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS follow_up_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS follow_up_notes TEXT;

-- History
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS cancellation_reason VARCHAR(500);
ALTER TABLE consultations ADD COLUMN IF NOT EXISTS reschedule_count INTEGER DEFAULT 0;

-- ============================================================
-- STEP 4: Create Indexes for New Columns
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_consultations_actual_scheduled_at ON consultations(actual_scheduled_at);
CREATE INDEX IF NOT EXISTS idx_consultations_google_calendar_event_id ON consultations(google_calendar_event_id);
CREATE INDEX IF NOT EXISTS idx_consultations_meeting_type ON consultations(meeting_type);
CREATE INDEX IF NOT EXISTS idx_consultations_outcome ON consultations(outcome);

-- ============================================================
-- STEP 5: Create consultation_reminders Table
-- ============================================================

CREATE TABLE IF NOT EXISTS consultation_reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  reminder_type reminder_type NOT NULL,
  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  recipient_type VARCHAR(20) NOT NULL, -- 'client' or 'admin'
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_consultation_reminder
    FOREIGN KEY (consultation_id) 
    REFERENCES consultations(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_consultation_reminders_consultation_id ON consultation_reminders(consultation_id);
CREATE INDEX IF NOT EXISTS idx_consultation_reminders_scheduled_for ON consultation_reminders(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_consultation_reminders_status ON consultation_reminders(status);

-- ============================================================
-- STEP 6: Create consultation_history Table
-- ============================================================

CREATE TABLE IF NOT EXISTS consultation_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consultation_id UUID NOT NULL REFERENCES consultations(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  previous_value TEXT,
  new_value TEXT,
  performed_by VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  CONSTRAINT fk_consultation_history
    FOREIGN KEY (consultation_id) 
    REFERENCES consultations(id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_consultation_history_consultation_id ON consultation_history(consultation_id);
CREATE INDEX IF NOT EXISTS idx_consultation_history_created_at ON consultation_history(created_at);

-- ============================================================
-- STEP 7: Create System Settings for Scheduling
-- ============================================================

INSERT INTO system_settings (id, key, value, description, updated_at)
VALUES 
  (uuid_generate_v4(), 'consultation_default_duration', '60', 'Default consultation duration in minutes', NOW()),
  (uuid_generate_v4(), 'consultation_buffer_time', '15', 'Buffer time between consultations in minutes', NOW()),
  (uuid_generate_v4(), 'consultation_working_hours_start', '09:00', 'Working hours start time (24h format)', NOW()),
  (uuid_generate_v4(), 'consultation_working_hours_end', '17:00', 'Working hours end time (24h format)', NOW()),
  (uuid_generate_v4(), 'consultation_working_days', '["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY"]', 'Working days (JSON array)', NOW())
ON CONFLICT (key) DO NOTHING;

COMMIT;

-- ============================================================
-- Verification Queries (Run these after migration)
-- ============================================================

-- Check new enums
-- SELECT unnest(enum_range(NULL::consultation_type));
-- SELECT unnest(enum_range(NULL::meeting_type));
-- SELECT unnest(enum_range(NULL::consultation_outcome));
-- SELECT unnest(enum_range(NULL::reminder_type));

-- Check new columns
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'consultations' ORDER BY ordinal_position;

-- Check new tables
-- SELECT table_name FROM information_schema.tables WHERE table_name IN ('consultation_reminders', 'consultation_history');

-- Check system settings
-- SELECT * FROM system_settings WHERE key LIKE 'consultation%';
