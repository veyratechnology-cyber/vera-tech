-- Add meeting_location field for in-person meetings
-- Run this after the main consultation-booking-migration.sql

ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS meeting_location TEXT;

COMMENT ON COLUMN consultations.meeting_location IS 'Preferred location for in-person meetings';
