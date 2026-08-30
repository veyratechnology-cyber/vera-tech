-- Minimal Database Setup for VeyraTech
-- This creates only the essential tables needed for the public site

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create services table (if not exists)
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
  seo_title VARCHAR(500),
  seo_description TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create industry enum (if not exists)
DO $$ BEGIN
    CREATE TYPE industry AS ENUM ('REAL_ESTATE', 'CONSTRUCTION', 'LOGISTICS', 'HOSPITALITY', 'PROFESSIONAL_SERVICES', 'GROWING_ENTERPRISES', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create industry_pages table (if not exists)
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
  seo_title VARCHAR(500),
  seo_description TEXT,
  display_order INTEGER DEFAULT 0 NOT NULL,
  published BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create contact_messages table (if not exists)
CREATE TABLE IF NOT EXISTS contact_messages (
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

-- Check if services exist, if not add them
INSERT INTO services (name, slug, description, problem, solution, deliverables, business_outcomes, faq, seo_title, seo_description, display_order, published) 
SELECT * FROM (VALUES
(
  'Technology Strategy & Planning',
  'technology-strategy',
  'Strategic technology planning that aligns with your business objectives and creates competitive advantage.',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  'Technology Strategy & Planning | VeyraTech',
  'Strategic technology planning aligned with business objectives.',
  1,
  true
),
(
  'AI Consulting & Implementation',
  'ai-consulting',
  'Practical AI consulting focused on real business problems and measurable outcomes.',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  'AI Consulting & Implementation | VeyraTech',
  'Practical AI consulting focused on business outcomes.',
  2,
  true
),
(
  'Business Process Automation',
  'business-automation',
  'Intelligent automation that eliminates repetitive work and improves operational efficiency.',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  'Business Process Automation | VeyraTech',
  'Intelligent automation that eliminates repetitive work.',
  3,
  true
)
) AS v(name, slug, description, problem, solution, deliverables, business_outcomes, faq, seo_title, seo_description, display_order, published)
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = v.slug);

-- Add sample industry page
INSERT INTO industry_pages (name, slug, industry, description, challenges, solutions, relevant_services, faq, seo_title, seo_description, display_order, published)
SELECT * FROM (VALUES
(
  'Real Estate',
  'real-estate',
  'REAL_ESTATE'::industry,
  'Technology consulting for real estate companies.',
  '[]',
  '[]',
  '[]',
  '[]',
  'Real Estate Technology Consulting | VeyraTech',
  'Technology consulting for real estate companies.',
  1,
  true
)
) AS v(name, slug, industry, description, challenges, solutions, relevant_services, faq, seo_title, seo_description, display_order, published)
WHERE NOT EXISTS (SELECT 1 FROM industry_pages WHERE slug = v.slug);
