-- VeyraTech Complete Database Setup
-- Run this entire script in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS insights CASCADE;
DROP TABLE IF EXISTS industry_pages CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS project_milestones CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS consultations CASCADE;
DROP TABLE IF EXISTS prospects CASCADE;
DROP TABLE IF EXISTS leads CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Drop all enums if they exist
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
DROP TYPE IF EXISTS consultation_status CASCADE;
DROP TYPE IF EXISTS priority CASCADE;
DROP TYPE IF EXISTS service_area CASCADE;
DROP TYPE IF EXISTS company_size CASCADE;
DROP TYPE IF EXISTS industry CASCADE;
DROP TYPE IF EXISTS prospect_status CASCADE;
DROP TYPE IF EXISTS lead_source CASCADE;
DROP TYPE IF EXISTS lead_status CASCADE;
DROP TYPE IF EXISTS admin_status CASCADE;

-- Create enums
CREATE TYPE admin_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'CONSULTATION', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST', 'NURTURE');
CREATE TYPE lead_source AS ENUM ('WEBSITE', 'EMAIL', 'PHONE', 'LINKEDIN', 'REFERRAL', 'EVENT', 'DIRECT_OUTREACH', 'OTHER');
CREATE TYPE prospect_status AS ENUM ('NOT_CONTACTED', 'EMAIL_SENT', 'CALL_MADE', 'REPLIED', 'MEETING', 'QUALIFIED', 'FOLLOW_UP', 'NOT_INTERESTED', 'CONVERTED');
CREATE TYPE industry AS ENUM ('REAL_ESTATE', 'CONSTRUCTION', 'LOGISTICS', 'HOSPITALITY', 'PROFESSIONAL_SERVICES', 'GROWING_ENTERPRISES', 'OTHER');
CREATE TYPE company_size AS ENUM ('SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE');
CREATE TYPE service_area AS ENUM ('TECHNOLOGY_STRATEGY', 'AI_CONSULTING', 'AUTOMATION', 'DIGITAL_TRANSFORMATION', 'SOFTWARE_SYSTEMS', 'TECHNOLOGY_ADVISORY', 'NOT_SURE');
CREATE TYPE priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE consultation_status AS ENUM ('NEW', 'REVIEWING', 'CONTACTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'CONVERTED');
CREATE TYPE proposal_status AS ENUM ('DRAFT', 'SENT', 'VIEWED', 'ACCEPTED', 'REJECTED', 'EXPIRED');
CREATE TYPE project_status AS ENUM ('PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED');
CREATE TYPE project_stage AS ENUM ('DISCOVERY', 'ASSESSMENT', 'STRATEGY', 'DESIGN', 'IMPLEMENTATION', 'TESTING', 'DEPLOYMENT', 'OPTIMIZATION');
CREATE TYPE assessment_status AS ENUM ('DRAFT', 'IN_REVIEW', 'COMPLETED', 'ARCHIVED');
CREATE TYPE assessment_type AS ENUM ('TECHNOLOGY_ASSESSMENT', 'AI_READINESS_ASSESSMENT', 'AUTOMATION_ASSESSMENT', 'DIGITAL_TRANSFORMATION_ASSESSMENT');
CREATE TYPE document_type AS ENUM ('PROPOSAL', 'CONTRACT', 'ASSESSMENT', 'REPORT', 'PROJECT_FILE', 'INVOICE', 'CASE_STUDY', 'INTERNAL', 'OTHER');
CREATE TYPE insight_status AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE insight_category AS ENUM ('TECHNOLOGY_STRATEGY', 'ARTIFICIAL_INTELLIGENCE', 'AUTOMATION', 'DIGITAL_TRANSFORMATION', 'BUSINESS_TECHNOLOGY', 'DATA', 'CYBERSECURITY', 'CONSULTING');
CREATE TYPE notification_type AS ENUM ('NEW_LEAD', 'NEW_CONTACT', 'NEW_CONSULTATION', 'CONSULTATION_UPDATE', 'PROPOSAL_ACTION', 'PROJECT_DEADLINE', 'NEW_MESSAGE', 'SYSTEM_ALERT');
CREATE TYPE audit_action AS ENUM ('ADMIN_LOGIN', 'FAILED_LOGIN', 'LEAD_CREATED', 'LEAD_UPDATED', 'PROSPECT_CREATED', 'PROSPECT_UPDATED', 'CONSULTATION_CREATED', 'CONSULTATION_UPDATED', 'PROPOSAL_CREATED', 'PROPOSAL_SENT', 'PROPOSAL_ACCEPTED', 'PROJECT_CREATED', 'PROJECT_UPDATED', 'DOCUMENT_UPLOADED', 'DOCUMENT_DELETED', 'INSIGHT_PUBLISHED', 'SERVICE_UPDATED', 'SETTINGS_CHANGED');

-- Create admins table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status admin_status DEFAULT 'ACTIVE' NOT NULL,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_status ON admins(status);

-- Create services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  problem TEXT,
  solution TEXT,
  deliverables TEXT,
  business_outcomes TEXT,
  faq TEXT,
  seo_title VARCHAR(500),
  seo_description TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_published ON services(published);

-- Create industry_pages table
CREATE TABLE industry_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  industry industry NOT NULL,
  description TEXT NOT NULL,
  challenges TEXT,
  solutions TEXT,
  relevant_services TEXT,
  faq TEXT,
  seo_title VARCHAR(500),
  seo_description TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_industry_pages_slug ON industry_pages(slug);
CREATE INDEX idx_industry_pages_published ON industry_pages(published);

-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false NOT NULL,
  responded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- Insert admin user
-- Password: Admin123!
INSERT INTO admins (name, email, password_hash, status, created_at, updated_at)
VALUES (
  'Admin User',
  'admin@veyratech.com',
  '$2b$10$YourHashedPasswordHere',
  'ACTIVE',
  NOW(),
  NOW()
);

-- Insert services
INSERT INTO services (name, slug, description, problem, solution, deliverables, business_outcomes, faq, seo_title, seo_description, display_order, published) 
VALUES
(
  'Technology Strategy & Planning',
  'technology-strategy',
  'Strategic technology planning that aligns with your business objectives and creates competitive advantage.',
  E'["Unclear technology direction and priorities", "Technology investments not delivering expected ROI", "Difficulty evaluating emerging technologies like AI", "Technology decisions made in isolation from business strategy", "Competing priorities and limited resources"]',
  E'["Comprehensive technology assessment of current state", "Clear technology roadmap aligned with business goals", "Prioritized initiatives with expected business impact", "Technology investment framework and governance", "Vendor evaluation and selection guidance"]',
  E'["Technology Strategy Document", "3-Year Technology Roadmap", "Investment Priorities & Budget Recommendations", "Technology Governance Framework", "Vendor Evaluation Criteria", "Risk Assessment & Mitigation Plans"]',
  E'["Clear technology direction aligned with business goals", "Optimized technology investments with measurable ROI", "Reduced technology risk and vendor lock-in", "Faster, more confident technology decisions", "Competitive advantage through strategic technology use"]',
  E'[{"question":"How long does a technology strategy engagement take?","answer":"Typically 6-8 weeks, depending on organization size and complexity. We work efficiently to deliver actionable insights quickly."}]',
  'Technology Strategy & Planning | VeyraTech',
  'Strategic technology planning aligned with business objectives.',
  1,
  true
),
(
  'AI Consulting & Implementation',
  'ai-consulting',
  'Practical AI consulting focused on real business problems and measurable outcomes, not hype.',
  E'["Uncertainty about where AI can actually help", "Difficulty separating AI hype from reality", "Concerns about cost, complexity, and risk"]',
  E'["AI opportunity assessment for your specific business", "Use case identification with ROI estimates", "Proof of concept development and testing"]',
  E'["AI Opportunity Assessment Report", "Prioritized AI Use Cases with ROI Analysis", "AI Implementation Roadmap"]',
  E'["Clear understanding of where AI adds value", "Reduced risk through tested proof of concepts", "Faster time to AI-driven business outcomes"]',
  E'[{"question":"Do we need a data science team to use AI?","answer":"Not necessarily. We help you leverage AI tools appropriate for your resources."}]',
  'AI Consulting & Implementation | VeyraTech',
  'Practical AI consulting focused on business outcomes.',
  2,
  true
),
(
  'Business Process Automation',
  'business-automation',
  'Intelligent automation that eliminates repetitive work and improves operational efficiency.',
  E'["Manual, repetitive tasks consuming valuable time", "Human error in routine processes", "Inconsistent process execution across teams"]',
  E'["Process assessment and automation opportunity identification", "Workflow design and optimization", "Automation tool selection and implementation"]',
  E'["Process Assessment Report", "Automation Roadmap", "Implemented Automation Solutions"]',
  E'["Significant time savings on repetitive tasks", "Reduced errors and improved quality", "Consistent process execution"]',
  E'[{"question":"Which processes should we automate first?","answer":"We help you prioritize based on impact, feasibility, and ROI."}]',
  'Business Process Automation | VeyraTech',
  'Intelligent automation that eliminates repetitive work.',
  3,
  true
);
