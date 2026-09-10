-- ============================================================================
-- QUICK FIX - Run this in Supabase SQL Editor
-- This fixes admin password and creates only missing tables
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- FIX ADMIN PASSWORD (MOST IMPORTANT)
-- ============================================================================

UPDATE admins 
SET password_hash = '$2a$10$x.x/hNXqWfHuHPosbmIQAuuLp6y3I45mU.vxGLkc6tpZ3tULLW6Ay',
    updated_at = NOW()
WHERE email = 'admin@veyratech.com';

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
-- CREATE CONTACT_MESSAGES TABLE (if doesn't exist)
-- ============================================================================

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

-- ============================================================================
-- CREATE NOTIFICATIONS TABLE (if doesn't exist)
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id) NOT NULL,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_admin_id ON notifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- ============================================================================
-- VERIFY WHAT EXISTS
-- ============================================================================

-- Check which tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Verify admin password
SELECT 
  email,
  status,
  substring(password_hash, 1, 30) as hash_preview
FROM admins 
WHERE email = 'admin@veyratech.com';

-- ============================================================================
-- LOGIN: admin@veyratech.com / bonaventure123kenya
-- ============================================================================
