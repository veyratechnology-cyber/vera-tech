-- ============================================================
-- COMPLETE DATABASE SETUP FOR VEYRATECH
-- Run this entire file in Supabase SQL Editor
-- This creates ALL tables needed for the admin dashboard
-- ============================================================

-- Drop existing tables if they exist (in correct order to handle foreign keys)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS insights CASCADE;
DROP TABLE IF EXISTS industry_pages CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS project_milestones CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS consultation_history CASCADE;
DROP TABLE IF EXISTS consultation_reminders CASCADE;
DROP TABLE IF EXISTS consultations CASCADE;
DROP TABLE IF EXISTS prospects CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Drop existing types
DROP TYPE IF EXISTS audit_action CASCADE;
DROP TYPE IF EXISTS notification_type CASCADE;
DROP TYPE IF EXISTS insight_category CASCADE;
DROP TYPE IF EXISTS insight_status CASCADE;
DROP TYPE IF EXISTS document_type CASCADE;
DROP TYPE IF EXISTS assessment_type CASCADE;
DROP TYPE IF EXISTS assessment_status CASCADE;
DROP TYPE IF EXISTS project_stage CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;
DROP TYPE IF EXISTS proposal_status CASCADE;
DROP TYPE IF EXISTS reminder_type CASCADE;
DROP TYPE IF EXISTS consultation_outcome CASCADE;
DROP TYPE IF EXISTS meeting_type CASCADE;
DROP TYPE IF EXISTS consultation_type CASCADE;
DROP TYPE IF EXISTS consultation_status CASCADE;
DROP TYPE IF EXISTS priority CASCADE;
DROP TYPE IF EXISTS service_area CASCADE;
DROP TYPE IF EXISTS company_size CASCADE;
DROP TYPE IF EXISTS industry CASCADE;
DROP TYPE IF EXISTS prospect_status CASCADE;
DROP TYPE IF EXISTS lead_source CASCADE;
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS admin_status CASCADE;

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE admin_status AS ENUM ('ACTIVE', 'INACTIVE');

CREATE TYPE lead_status AS ENUM (
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'CONSULTATION',
  'PROPOSAL',
  'NEGOTIATION',
  'WON',
  'LOST',
  'NURTURE'
);

CREATE TYPE lead_source AS ENUM (
  'WEBSITE',
  'EMAIL',
  'PHONE',
  'LINKEDIN',
  'REFERRAL',
  'EVENT',
  'DIRECT_OUTREACH',
  'OTHER'
);

CREATE TYPE prospect_status AS ENUM (
  'NOT_CONTACTED',
  'EMAIL_SENT',
  'CALL_MADE',
  'REPLIED',
  'MEETING',
  'QUALIFIED',
  'FOLLOW_UP',
  'NOT_INTERESTED',
  'CONVERTED'
);

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

CREATE TYPE company_size AS ENUM (
  'SIZE_1_10',
  'SIZE_11_50',
  'SIZE_51_100',
  'SIZE_101_500',
  'SIZE_500_PLUS'
);

CREATE TYPE service_area AS ENUM (
  'TECHNOLOGY_STRATEGY',
  'AI_CONSULTING',
  'AUTOMATION',
  'DIGITAL_TRANSFORMATION',
  'SOFTWARE_SYSTEMS',
  'TECHNOLOGY_ADVISORY',
  'NOT_SURE'
);

CREATE TYPE priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

CREATE TYPE consultation_status AS ENUM (
  'NEW',
  'REVIEWING',
  'CONTACTED',
  'SCHEDULED',
  'COMPLETED',
  'CANCELLED',
  'CONVERTED',
  'NO_SHOW'
);

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

CREATE TYPE meeting_type AS ENUM ('GOOGLE_MEET', 'PHONE', 'IN_PERSON');

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

CREATE TYPE reminder_type AS ENUM ('REMINDER_24H', 'REMINDER_1H', 'REMINDER_10M');

CREATE TYPE proposal_status AS ENUM (
  'DRAFT',
  'SENT',
  'VIEWED',
  'ACCEPTED',
  'REJECTED',
  'EXPIRED'
);

CREATE TYPE project_status AS ENUM (
  'PLANNING',
  'ACTIVE',
  'ON_HOLD',
  'COMPLETED',
  'CANCELLED'
);

CREATE TYPE project_stage AS ENUM (
  'DISCOVERY',
  'ASSESSMENT',
  'STRATEGY',
  'DESIGN',
  'IMPLEMENTATION',
  'TESTING',
  'DEPLOYMENT',
  'OPTIMIZATION'
);

CREATE TYPE assessment_status AS ENUM ('DRAFT', 'IN_REVIEW', 'COMPLETED', 'ARCHIVED');

CREATE TYPE assessment_type AS ENUM (
  'TECHNOLOGY_ASSESSMENT',
  'AI_READINESS_ASSESSMENT',
  'AUTOMATION_ASSESSMENT',
  'DIGITAL_TRANSFORMATION_ASSESSMENT'
);

CREATE TYPE document_type AS ENUM (
  'PROPOSAL',
  'CONTRACT',
  'ASSESSMENT',
  'REPORT',
  'PROJECT_FILE',
  'INVOICE',
  'CASE_STUDY',
  'INTERNAL',
  'OTHER'
);

CREATE TYPE insight_status AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

CREATE TYPE insight_category AS ENUM (
  'TECHNOLOGY_STRATEGY',
  'ARTIFICIAL_INTELLIGENCE',
  'AUTOMATION',
  'DIGITAL_TRANSFORMATION',
  'BUSINESS_TECHNOLOGY',
  'DATA',
  'CYBERSECURITY',
  'CONSULTING'
);

CREATE TYPE notification_type AS ENUM (
  'NEW_LEAD',
  'NEW_CONTACT',
  'NEW_CONSULTATION',
  'CONSULTATION_UPDATE',
  'PROPOSAL_ACTION',
  'PROJECT_DEADLINE',
  'NEW_MESSAGE',
  'SYSTEM_ALERT'
);

CREATE TYPE audit_action AS ENUM (
  'ADMIN_LOGIN',
  'FAILED_LOGIN',
  'LEAD_CREATED',
  'LEAD_UPDATED',
  'PROSPECT_CREATED',
  'PROSPECT_UPDATED',
  'CONSULTATION_CREATED',
  'CONSULTATION_UPDATED',
  'PROPOSAL_CREATED',
  'PROPOSAL_SENT',
  'PROPOSAL_ACCEPTED',
  'PROJECT_CREATED',
  'PROJECT_UPDATED',
  'DOCUMENT_UPLOADED',
  'DOCUMENT_DELETED',
  'INSIGHT_PUBLISHED',
  'SERVICE_UPDATED',
  'SETTINGS_CHANGED'
);

-- ============================================================
-- TABLES
-- ============================================================

-- Admins
CREATE TABLE admins (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  status admin_status DEFAULT 'ACTIVE',
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Leads
CREATE TABLE leads (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  industry industry,
  company_size company_size,
  service_interest service_area,
  business_challenge TEXT,
  lead_source lead_source DEFAULT 'WEBSITE',
  status lead_status DEFAULT 'NEW',
  priority priority DEFAULT 'MEDIUM',
  assigned_admin_id TEXT REFERENCES admins(id),
  last_contact_at TIMESTAMP,
  next_follow_up_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_assigned_admin ON leads(assigned_admin_id);
CREATE INDEX idx_leads_created_at ON leads(created_at);

-- Prospects
CREATE TABLE prospects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  company TEXT NOT NULL,
  industry industry,
  website TEXT,
  contact_person TEXT NOT NULL,
  job_title TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  linked_in TEXT,
  research_notes TEXT,
  problem_hypothesis TEXT,
  priority priority DEFAULT 'MEDIUM',
  contact_status prospect_status DEFAULT 'NOT_CONTACTED',
  assigned_admin_id TEXT REFERENCES admins(id),
  last_contact_at TIMESTAMP,
  next_follow_up_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_prospects_status ON prospects(contact_status);
CREATE INDEX idx_prospects_assigned_admin ON prospects(assigned_admin_id);

-- Consultations
CREATE TABLE consultations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  lead_id TEXT REFERENCES leads(id),
  
  -- Personal Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  job_title TEXT,
  preferred_contact_method TEXT,
  
  -- Company Information
  company TEXT,
  company_website TEXT,
  industry industry,
  company_size company_size,
  country TEXT,
  city TEXT,
  
  -- Consultation Information
  consultation_types consultation_type[] DEFAULT '{}',
  area_of_interest service_area,
  business_challenge TEXT,
  desired_outcome TEXT,
  current_technology TEXT,
  additional_info TEXT,
  
  -- Meeting Information
  preferred_date TIMESTAMP,
  preferred_time TEXT,
  actual_scheduled_at TIMESTAMP,
  meeting_type meeting_type,
  meeting_duration INTEGER DEFAULT 60,
  meeting_location TEXT,
  timezone TEXT DEFAULT 'Africa/Nairobi',
  
  -- Google Calendar Integration
  google_calendar_event_id TEXT,
  google_meet_link TEXT,
  
  -- Status & Assignment
  status consultation_status DEFAULT 'NEW',
  assigned_admin_id TEXT REFERENCES admins(id),
  
  -- Meeting Notes & Follow-up
  meeting_notes TEXT,
  key_problems TEXT,
  potential_solutions TEXT,
  client_concerns TEXT,
  budget_discussion TEXT,
  next_steps TEXT,
  
  -- Outcome & Follow-up
  outcome consultation_outcome,
  follow_up_date TIMESTAMP,
  follow_up_notes TEXT,
  
  -- History & Timestamps
  scheduled_at TIMESTAMP,
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  cancellation_reason TEXT,
  reschedule_count INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_consultations_status ON consultations(status);
CREATE INDEX idx_consultations_assigned_admin ON consultations(assigned_admin_id);
CREATE INDEX idx_consultations_scheduled_at ON consultations(actual_scheduled_at);
CREATE INDEX idx_consultations_google_event ON consultations(google_calendar_event_id);
CREATE INDEX idx_consultations_created_at ON consultations(created_at);

-- Consultation Reminders
CREATE TABLE consultation_reminders (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  consultation_id TEXT REFERENCES consultations(id) ON DELETE CASCADE,
  reminder_type reminder_type NOT NULL,
  scheduled_for TIMESTAMP NOT NULL,
  sent_at TIMESTAMP,
  recipient_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reminders_consultation ON consultation_reminders(consultation_id);
CREATE INDEX idx_reminders_scheduled_for ON consultation_reminders(scheduled_for);
CREATE INDEX idx_reminders_status ON consultation_reminders(status);

-- Consultation History
CREATE TABLE consultation_history (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  consultation_id TEXT REFERENCES consultations(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  previous_value TEXT,
  new_value TEXT,
  performed_by TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_history_consultation ON consultation_history(consultation_id);
CREATE INDEX idx_history_created_at ON consultation_history(created_at);

-- Proposals
CREATE TABLE proposals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  lead_id TEXT REFERENCES leads(id),
  client_company TEXT NOT NULL,
  title TEXT NOT NULL,
  problem TEXT NOT NULL,
  objectives TEXT NOT NULL,
  scope TEXT NOT NULL,
  deliverables TEXT NOT NULL,
  timeline TEXT NOT NULL,
  investment TEXT NOT NULL,
  terms TEXT,
  expiration_date TIMESTAMP,
  status proposal_status DEFAULT 'DRAFT',
  assigned_admin_id TEXT REFERENCES admins(id),
  sent_at TIMESTAMP,
  viewed_at TIMESTAMP,
  accepted_at TIMESTAMP,
  rejected_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_assigned_admin ON proposals(assigned_admin_id);

-- Projects
CREATE TABLE projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  proposal_id TEXT UNIQUE REFERENCES proposals(id),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT NOT NULL,
  service service_area NOT NULL,
  start_date TIMESTAMP,
  expected_completion TIMESTAMP,
  status project_status DEFAULT 'PLANNING',
  current_stage project_stage,
  progress INTEGER DEFAULT 0,
  assigned_admin_id TEXT REFERENCES admins(id),
  internal_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_assigned_admin ON projects(assigned_admin_id);

-- Project Milestones
CREATE TABLE project_milestones (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_milestones_project ON project_milestones(project_id);

-- Assessments
CREATE TABLE assessments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT REFERENCES projects(id),
  client_company TEXT NOT NULL,
  type assessment_type NOT NULL,
  objective TEXT NOT NULL,
  current_state TEXT NOT NULL,
  findings TEXT NOT NULL,
  risks TEXT,
  opportunities TEXT,
  recommendations TEXT NOT NULL,
  priority priority DEFAULT 'MEDIUM',
  next_steps TEXT,
  status assessment_status DEFAULT 'DRAFT',
  assigned_admin_id TEXT REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_assessments_status ON assessments(status);
CREATE INDEX idx_assessments_project ON assessments(project_id);

-- Documents
CREATE TABLE documents (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT REFERENCES projects(id),
  name TEXT NOT NULL,
  type document_type NOT NULL,
  company TEXT,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  version TEXT DEFAULT '1.0',
  uploaded_by_id TEXT REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_documents_type ON documents(type);

-- Services
CREATE TABLE services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  problem TEXT,
  solution TEXT,
  deliverables TEXT,
  business_outcomes TEXT,
  faq TEXT,
  seo_title TEXT,
  seo_description TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_published ON services(published);

-- Industry Pages
CREATE TABLE industry_pages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  industry industry NOT NULL,
  description TEXT NOT NULL,
  challenges TEXT,
  solutions TEXT,
  relevant_services TEXT,
  faq TEXT,
  seo_title TEXT,
  seo_description TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_industry_pages_slug ON industry_pages(slug);
CREATE INDEX idx_industry_pages_published ON industry_pages(published);

-- Insights (Blog)
CREATE TABLE insights (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category insight_category NOT NULL,
  featured_image TEXT,
  author_id TEXT REFERENCES admins(id),
  tags TEXT[] DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMP,
  status insight_status DEFAULT 'DRAFT',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_insights_slug ON insights(slug);
CREATE INDEX idx_insights_status ON insights(status);
CREATE INDEX idx_insights_category ON insights(category);
CREATE INDEX idx_insights_published_at ON insights(published_at);

-- Contact Messages
CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- Notifications
CREATE TABLE notifications (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  admin_id TEXT REFERENCES admins(id),
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_admin ON notifications(admin_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- System Settings
CREATE TABLE system_settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  admin_id TEXT REFERENCES admins(id),
  action audit_action NOT NULL,
  resource TEXT NOT NULL,
  resource_id TEXT,
  details TEXT,
  ip_address TEXT,
  user_agent TEXT,
  result TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================
-- INSERT DEFAULT ADMIN USER
-- Password: bonaventure123kenya
-- ============================================================

INSERT INTO admins (id, name, email, password_hash, status, created_at, updated_at)
VALUES (
  gen_random_uuid()::text,
  'Admin User',
  'admin@veyratech.com',
  '$2a$10$8YzO3xg5RxHJe.rK1PkCYOyLhLhqZYh4z6HBqH.FZV8vkGbJkZXTW',
  'ACTIVE',
  NOW(),
  NOW()
);

-- ============================================================
-- COMPLETE! All tables created successfully
-- Your admin login: admin@veyratech.com / bonaventure123kenya
-- ============================================================
