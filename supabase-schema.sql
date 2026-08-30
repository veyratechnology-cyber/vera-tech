CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
    CREATE TYPE admin_status AS ENUM ('ACTIVE', 'INACTIVE');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONSULTATION', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST', 'NURTURE');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE lead_source AS ENUM ('WEBSITE', 'EMAIL', 'PHONE', 'LINKEDIN', 'REFERRAL', 'EVENT', 'DIRECT_OUTREACH', 'OTHER');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE prospect_status AS ENUM ('NOT_CONTACTED', 'EMAIL_SENT', 'CALL_MADE', 'REPLIED', 'MEETING', 'QUALIFIED', 'FOLLOW_UP', 'NOT_INTERESTED', 'CONVERTED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE industry AS ENUM ('REAL_ESTATE', 'CONSTRUCTION', 'LOGISTICS', 'HOSPITALITY', 'PROFESSIONAL_SERVICES', 'GROWING_ENTERPRISES', 'OTHER');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE company_size AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE service_area AS ENUM ('TECHNOLOGY_STRATEGY', 'AI_CONSULTING', 'AUTOMATION', 'DIGITAL_TRANSFORMATION', 'SOFTWARE_SYSTEMS', 'TECHNOLOGY_ADVISORY', 'NOT_SURE');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE consultation_status AS ENUM ('NEW', 'REVIEWING', 'CONTACTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'CONVERTED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE proposal_status AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE project_stage AS ENUM ('DISCOVERY', 'ASSESSMENT', 'STRATEGY', 'DESIGN', 'IMPLEMENTATION', 'TESTING', 'DEPLOYMENT', 'OPTIMIZATION');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE assessment_status AS ENUM ('DRAFT', 'IN_REVIEW', 'COMPLETED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE assessment_type AS ENUM ('TECHNOLOGY_ASSESSMENT', 'AI_READINESS_ASSESSMENT', 'AUTOMATION_ASSESSMENT', 'DIGITAL_TRANSFORMATION_ASSESSMENT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE document_type AS ENUM ('PROPOSAL', 'CONTRACT', 'ASSESSMENT', 'REPORT', 'PROJECT_FILE', 'INVOICE', 'CASE_STUDY', 'INTERNAL', 'OTHER');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE insight_status AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE insight_category AS ENUM ('TECHNOLOGY_STRATEGY', 'ARTIFICIAL_INTELLIGENCE', 'AUTOMATION', 'DIGITAL_TRANSFORMATION', 'BUSINESS_TECHNOLOGY', 'DATA', 'CYBERSECURITY', 'CONSULTING');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE notification_type AS ENUM ('NEW_LEAD', 'NEW_CONTACT', 'NEW_CONSULTATION', 'CONSULTATION_UPDATE', 'PROPOSAL_ACTION', 'PROJECT_DEADLINE', 'NEW_MESSAGE', 'SYSTEM_ALERT');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE audit_action AS ENUM ('ADMIN_LOGIN', 'FAILED_LOGIN', 'LEAD_CREATED', 'LEAD_UPDATED', 'PROSPECT_CREATED', 'PROSPECT_UPDATED', 'CONSULTATION_CREATED', 'CONSULTATION_UPDATED', 'PROPOSAL_CREATED', 'PROPOSAL_SENT', 'PROPOSAL_ACCEPTED', 'PROJECT_CREATED', 'PROJECT_UPDATED', 'DOCUMENT_UPLOADED', 'DOCUMENT_DELETED', 'INSIGHT_PUBLISHED', 'SERVICE_UPDATED', 'SETTINGS_CHANGED');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status admin_status DEFAULT 'ACTIVE' NOT NULL,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_status ON admins(status);

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(500),
  industry industry,
  company_size company_size,
  service_interest service_area,
  business_challenge TEXT,
  lead_source lead_source DEFAULT 'WEBSITE' NOT NULL,
  status lead_status DEFAULT 'NEW' NOT NULL,
  priority priority DEFAULT 'MEDIUM' NOT NULL,
  assigned_admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  last_contact_at TIMESTAMP,
  next_follow_up_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_admin ON leads(assigned_admin_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company VARCHAR(255) NOT NULL,
  industry industry,
  website VARCHAR(500),
  contact_person VARCHAR(255) NOT NULL,
  job_title VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  linked_in VARCHAR(500),
  research_notes TEXT,
  problem_hypothesis TEXT,
  priority priority DEFAULT 'MEDIUM' NOT NULL,
  contact_status prospect_status DEFAULT 'NOT_CONTACTED' NOT NULL,
  assigned_admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  last_contact_at TIMESTAMP,
  next_follow_up_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(contact_status);
CREATE INDEX IF NOT EXISTS idx_prospects_assigned_admin ON prospects(assigned_admin_id);
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);

CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  industry industry,
  company_size company_size,
  area_of_interest service_area,
  business_challenge TEXT,
  preferred_date TIMESTAMP,
  preferred_time VARCHAR(50),
  additional_info TEXT,
  status consultation_status DEFAULT 'NEW' NOT NULL,
  assigned_admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMP,
  completed_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_consultations_assigned_admin ON consultations(assigned_admin_id);
CREATE INDEX IF NOT EXISTS idx_consultations_scheduled_at ON consultations(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_consultations_lead_id ON consultations(lead_id);

CREATE TABLE IF NOT EXISTS proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  client_company VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  problem TEXT NOT NULL,
  objectives TEXT NOT NULL,
  scope TEXT NOT NULL,
  deliverables TEXT NOT NULL,
  timeline TEXT NOT NULL,
  investment TEXT NOT NULL,
  terms TEXT,
  expiration_date TIMESTAMP,
  status proposal_status DEFAULT 'DRAFT' NOT NULL,
  assigned_admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  sent_at TIMESTAMP,
  viewed_at TIMESTAMP,
  accepted_at TIMESTAMP,
  rejected_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_assigned_admin ON proposals(assigned_admin_id);
CREATE INDEX IF NOT EXISTS idx_proposals_lead_id ON proposals(lead_id);

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID UNIQUE REFERENCES proposals(id) ON DELETE SET NULL,
  name VARCHAR(500) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  service service_area NOT NULL,
  start_date TIMESTAMP,
  expected_completion TIMESTAMP,
  status project_status DEFAULT 'PLANNING' NOT NULL,
  current_stage project_stage,
  progress INT DEFAULT 0 NOT NULL CHECK (progress >= 0 AND progress <= 100),
  assigned_admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  internal_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_assigned_admin ON projects(assigned_admin_id);
CREATE INDEX IF NOT EXISTS idx_projects_proposal_id ON projects(proposal_id);

CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_due_date ON project_milestones(due_date);

CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  client_company VARCHAR(255) NOT NULL,
  type assessment_type NOT NULL,
  objective TEXT NOT NULL,
  current_state TEXT NOT NULL,
  findings TEXT NOT NULL,
  risks TEXT,
  opportunities TEXT,
  recommendations TEXT NOT NULL,
  priority priority DEFAULT 'MEDIUM' NOT NULL,
  next_steps TEXT,
  status assessment_status DEFAULT 'DRAFT' NOT NULL,
  assigned_admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_assessments_status ON assessments(status);
CREATE INDEX IF NOT EXISTS idx_assessments_project_id ON assessments(project_id);
CREATE INDEX IF NOT EXISTS idx_assessments_assigned_admin ON assessments(assigned_admin_id);

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  name VARCHAR(500) NOT NULL,
  type document_type NOT NULL,
  company VARCHAR(255),
  file_path VARCHAR(1000) NOT NULL,
  file_size INT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  version VARCHAR(50) DEFAULT '1.0' NOT NULL,
  uploaded_by_id UUID NOT NULL REFERENCES admins(id) ON DELETE RESTRICT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(type);
CREATE INDEX IF NOT EXISTS idx_documents_uploaded_by ON documents(uploaded_by_id);

CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  problem TEXT,
  solution TEXT,
  deliverables TEXT,
  business_outcomes TEXT,
  faq TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  display_order INT DEFAULT 0 NOT NULL,
  published BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(published);

CREATE TABLE IF NOT EXISTS industry_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  industry industry NOT NULL,
  description TEXT NOT NULL,
  challenges TEXT,
  solutions TEXT,
  relevant_services TEXT,
  faq TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  display_order INT DEFAULT 0 NOT NULL,
  published BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_industry_pages_slug ON industry_pages(slug);
CREATE INDEX IF NOT EXISTS idx_industry_pages_published ON industry_pages(published);

CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category insight_category NOT NULL,
  featured_image VARCHAR(1000),
  author_id UUID NOT NULL REFERENCES admins(id) ON DELETE RESTRICT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  seo_title VARCHAR(255),
  seo_description TEXT,
  published_at TIMESTAMP,
  status insight_status DEFAULT 'DRAFT' NOT NULL,
  view_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_insights_slug ON insights(slug);
CREATE INDEX IF NOT EXISTS idx_insights_status ON insights(status);
CREATE INDEX IF NOT EXISTS idx_insights_category ON insights(category);
CREATE INDEX IF NOT EXISTS idx_insights_published_at ON insights(published_at);
CREATE INDEX IF NOT EXISTS idx_insights_author_id ON insights(author_id);

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(1000),
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_admin_id ON notifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_system_settings_key ON system_settings(key);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  action audit_action NOT NULL,
  resource VARCHAR(255) NOT NULL,
  resource_id UUID,
  details TEXT,
  ip_address VARCHAR(100),
  user_agent TEXT,
  result VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_admin_id ON audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
DROP TRIGGER IF EXISTS update_prospects_updated_at ON prospects;
DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;
DROP TRIGGER IF EXISTS update_proposals_updated_at ON proposals;
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
DROP TRIGGER IF EXISTS update_project_milestones_updated_at ON project_milestones;
DROP TRIGGER IF EXISTS update_assessments_updated_at ON assessments;
DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
DROP TRIGGER IF EXISTS update_services_updated_at ON services;
DROP TRIGGER IF EXISTS update_industry_pages_updated_at ON industry_pages;
DROP TRIGGER IF EXISTS update_insights_updated_at ON insights;
DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
DROP TRIGGER IF EXISTS update_system_settings_updated_at ON system_settings;

CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON consultations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_milestones_updated_at BEFORE UPDATE ON project_milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_industry_pages_updated_at BEFORE UPDATE ON industry_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_insights_updated_at BEFORE UPDATE ON insights FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO system_settings (key, value, description) VALUES
  ('company_name', 'VeyraTech', 'Company name'),
  ('company_tagline', 'Technology & AI Consulting', 'Company tagline'),
  ('company_email', 'contact@veyratech.com', 'Primary contact email'),
  ('company_phone', '0745247211', 'Primary contact phone'),
  ('company_address', '', 'Company physical address'),
  ('company_website', 'https://veyratech.com', 'Company website URL'),
  ('smtp_enabled', 'false', 'Enable SMTP email sending'),
  ('smtp_host', '', 'SMTP server host'),
  ('smtp_port', '587', 'SMTP server port'),
  ('smtp_user', '', 'SMTP username'),
  ('smtp_from_email', '', 'Email from address'),
  ('smtp_from_name', 'VeyraTech', 'Email from name'),
  ('meta_pixel_enabled', 'false', 'Enable Meta Pixel tracking'),
  ('meta_pixel_id', '', 'Meta Pixel ID'),
  ('google_analytics_enabled', 'false', 'Enable Google Analytics'),
  ('google_analytics_id', '', 'Google Analytics ID')
ON CONFLICT (key) DO NOTHING;
