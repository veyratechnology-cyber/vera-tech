-- Populate VeyraTech Database with Content
-- Run this after creating the basic tables

-- Create additional required enums
DO $$ BEGIN
    CREATE TYPE admin_status AS ENUM ('ACTIVE', 'INACTIVE');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE insight_status AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE insight_category AS ENUM ('TECHNOLOGY_STRATEGY', 'ARTIFICIAL_INTELLIGENCE', 'AUTOMATION', 'DIGITAL_TRANSFORMATION', 'BUSINESS_TECHNOLOGY', 'DATA', 'CYBERSECURITY', 'CONSULTING');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  status admin_status DEFAULT 'ACTIVE',
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category insight_category NOT NULL,
  featured_image VARCHAR(500),
  author_id UUID REFERENCES admins(id),
  tags TEXT[],
  seo_title VARCHAR(500),
  seo_description TEXT,
  published_at TIMESTAMP,
  status insight_status DEFAULT 'DRAFT',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin user (password: Admin123!)
INSERT INTO admins (name, email, password_hash, status)
VALUES (
  'Admin User',
  'admin@veyratech.com',
  '$2b$10$rQZ5YJqKZXxGxH0p9vY8eOXKZ5LqN8xQp5YJqKZXxGxH0p9vY8eOK',
  'ACTIVE'
)
ON CONFLICT (email) DO NOTHING;

-- Clear existing services and insert fresh data
DELETE FROM services;

INSERT INTO services (name, slug, description, problem, solution, deliverables, business_outcomes, faq, seo_title, seo_description, display_order, published) 
VALUES
(
  'Technology Strategy & Planning',
  'technology-strategy',
  'Strategic technology planning that aligns with your business objectives and creates competitive advantage.',
  '["Unclear technology direction and priorities", "Technology investments not delivering expected ROI", "Difficulty evaluating emerging technologies like AI", "Technology decisions made in isolation from business strategy", "Competing priorities and limited resources"]',
  '["Comprehensive technology assessment of current state", "Clear technology roadmap aligned with business goals", "Prioritized initiatives with expected business impact", "Technology investment framework and governance", "Vendor evaluation and selection guidance"]',
  '["Technology Strategy Document", "3-Year Technology Roadmap", "Investment Priorities & Budget Recommendations", "Technology Governance Framework", "Vendor Evaluation Criteria", "Risk Assessment & Mitigation Plans"]',
  '["Clear technology direction aligned with business goals", "Optimized technology investments with measurable ROI", "Reduced technology risk and vendor lock-in", "Faster, more confident technology decisions", "Competitive advantage through strategic technology use"]',
  '[{"question":"How long does a technology strategy engagement take?","answer":"Typically 6-8 weeks, depending on organization size and complexity."}]',
  'Technology Strategy & Planning | VeyraTech',
  'Strategic technology planning aligned with business objectives.',
  1,
  true
),
(
  'AI Consulting & Implementation',
  'ai-consulting',
  'Practical AI consulting focused on real business problems and measurable outcomes, not hype.',
  '["Uncertainty about where AI can actually help", "Difficulty separating AI hype from reality", "Concerns about cost, complexity, and risk", "Lack of AI expertise", "Unclear ROI for AI initiatives"]',
  '["AI opportunity assessment", "Use case identification with ROI estimates", "Proof of concept development", "AI implementation roadmap", "Team training and capability building"]',
  '["AI Opportunity Assessment Report", "Prioritized AI Use Cases with ROI", "Proof of Concept Results", "AI Implementation Roadmap", "Training Materials"]',
  '["Clear understanding of where AI adds value", "Reduced risk through tested proofs of concept", "Faster time to AI-driven outcomes", "Internal AI capability", "Competitive advantage"]',
  '[{"question":"Do we need a data science team?","answer":"Not necessarily. We help you leverage AI tools appropriate for your resources."}]',
  'AI Consulting & Implementation | VeyraTech',
  'Practical AI consulting focused on business outcomes.',
  2,
  true
),
(
  'Business Process Automation',
  'business-automation',
  'Intelligent automation that eliminates repetitive work and improves operational efficiency.',
  '["Manual, repetitive tasks consuming time", "Human error in routine processes", "Inconsistent process execution", "Difficulty scaling operations", "Limited process visibility"]',
  '["Process assessment and automation identification", "Workflow design and optimization", "Automation tool selection", "Integration with existing systems", "Change management support"]',
  '["Process Assessment Report", "Automation Roadmap", "Workflow Designs", "Implemented Automation Solutions", "User Training Materials", "Performance Dashboards"]',
  '["Significant time savings", "Reduced errors", "Consistent execution", "Scale without proportional headcount", "Real-time operational visibility"]',
  '[{"question":"Which processes should we automate first?","answer":"We prioritize based on impact, feasibility, and ROI. High-volume, rule-based processes offer quickest wins."}]',
  'Business Process Automation | VeyraTech',
  'Intelligent automation that eliminates repetitive work.',
  3,
  true
),
(
  'Digital Transformation',
  'digital-transformation',
  'Comprehensive digital transformation that modernizes operations and creates new business capabilities.',
  '["Legacy systems limiting agility", "Manual processes in digital world", "Disconnected systems and data silos", "Difficulty meeting customer expectations", "Competitive pressure from digital-native companies"]',
  '["Digital maturity assessment", "Transformation strategy and roadmap", "Technology modernization planning", "Digital capability development", "Change management"]',
  '["Digital Maturity Assessment", "Transformation Strategy & Roadmap", "Technology Modernization Plan", "Business Case & ROI Analysis", "Change Management Plan", "Implementation Support"]',
  '["Modern, integrated technology foundation", "Improved customer experience", "Greater business agility", "New revenue opportunities", "Reduced operational costs"]',
  '[{"question":"How long does digital transformation take?","answer":"It is a journey. We design phased approaches that deliver value incrementally."}]',
  'Digital Transformation | VeyraTech',
  'Comprehensive digital transformation that modernizes operations.',
  4,
  true
),
(
  'Software & Systems Advisory',
  'software-systems',
  'Expert guidance on software selection, implementation, and optimization.',
  '["Overwhelming software options", "Difficulty evaluating vendor claims", "Implementation failures", "Software not meeting needs", "Poor system integration"]',
  '["Requirements gathering", "Vendor evaluation and selection", "Implementation planning", "Integration architecture design", "Vendor negotiation support"]',
  '["Requirements Document", "Vendor Evaluation Matrix", "Software Recommendation & Business Case", "Implementation Plan", "Integration Architecture"]',
  '["Confident software decisions", "Reduced implementation risk", "Software that fits needs", "Better vendor terms", "Successful adoption"]',
  '[{"question":"Do you recommend specific vendors?","answer":"We are vendor-agnostic. Recommendations are based on your specific requirements."}]',
  'Software & Systems Advisory | VeyraTech',
  'Expert software selection and implementation guidance.',
  5,
  true
),
(
  'Technology Advisory Services',
  'technology-advisory',
  'Ongoing technology advisory and fractional CTO services for growing organizations.',
  '["No dedicated technology leadership", "Technology decisions without context", "Difficulty keeping up with changes", "Need for objective advice", "Technology challenges slowing growth"]',
  '["Fractional CTO/CIO services", "Regular technology advisory sessions", "Strategic decision support", "Vendor and partner management", "Technology team guidance"]',
  '["Regular Advisory Sessions", "Technology Decision Recommendations", "Vendor Management Support", "Technology Team Guidance", "Strategic Updates", "On-demand Access"]',
  '["Access to senior technology expertise", "Better technology decisions", "Reduced technology risk", "Cost-effective alternative to full-time hire", "Technology as competitive advantage"]',
  '[{"question":"How does fractional CTO work?","answer":"We provide senior technology leadership on a part-time or retainer basis, tailored to your needs."}]',
  'Technology Advisory Services | VeyraTech',
  'Ongoing technology advisory and fractional CTO services.',
  6,
  true
);

-- Clear existing industries and insert fresh data
DELETE FROM industry_pages;

INSERT INTO industry_pages (name, slug, industry, description, challenges, solutions, relevant_services, faq, seo_title, seo_description, display_order, published)
VALUES
(
  'Real Estate',
  'real-estate',
  'REAL_ESTATE',
  'Technology consulting tailored to real estate companies facing digital transformation challenges.',
  '["Legacy property management systems", "Manual leasing and tenant processes", "Limited data visibility across properties", "Disconnected marketing and operations", "Difficulty adapting to proptech innovations"]',
  '["Property management system modernization", "Automated leasing workflows", "Centralized data and analytics", "Integrated marketing and operations platforms", "Strategic proptech evaluation and adoption"]',
  '["Digital Transformation", "Business Process Automation", "Software & Systems Advisory", "Technology Strategy"]',
  '[{"question":"How can technology improve property management?","answer":"Modern systems automate routine tasks, provide real-time visibility, and improve tenant experience."}]',
  'Real Estate Technology Consulting | VeyraTech',
  'Technology consulting for real estate companies.',
  1,
  true
),
(
  'Construction',
  'construction',
  'CONSTRUCTION',
  'Technology solutions for construction companies to improve project management and operational efficiency.',
  '["Project coordination challenges", "Manual estimating and bidding", "Poor field-to-office communication", "Document management issues", "Limited project visibility"]',
  '["Construction management software implementation", "Mobile field solutions", "Automated estimating tools", "Cloud-based document management", "Real-time project dashboards"]',
  '["Software & Systems Advisory", "Business Process Automation", "Technology Strategy"]',
  '[{"question":"What technology improvements give the best ROI?","answer":"Usually field-to-office communication tools and automated estimating deliver fastest returns."}]',
  'Construction Technology Consulting | VeyraTech',
  'Technology solutions for construction companies.',
  2,
  true
),
(
  'Logistics & Transportation',
  'logistics',
  'LOGISTICS',
  'Technology consulting for logistics and transportation companies to optimize operations and reduce costs.',
  '["Route optimization challenges", "Manual dispatch and scheduling", "Limited shipment visibility", "Inefficient warehouse operations", "Customer communication gaps"]',
  '["Transportation management systems", "Automated dispatch and routing", "Real-time tracking solutions", "Warehouse management optimization", "Customer portal implementation"]',
  '["Business Process Automation", "Software & Systems Advisory", "Digital Transformation"]',
  '[{"question":"How can we improve delivery efficiency?","answer":"Modern TMS and routing systems typically reduce delivery time by 15-25% while cutting fuel costs."}]',
  'Logistics Technology Consulting | VeyraTech',
  'Technology consulting for logistics companies.',
  3,
  true
),
(
  'Hospitality',
  'hospitality',
  'HOSPITALITY',
  'Technology solutions for hotels, restaurants, and hospitality businesses to enhance guest experience.',
  '["Disconnected booking and operations systems", "Manual reservation management", "Limited guest data and personalization", "Inefficient staff coordination", "Poor online presence"]',
  '["Integrated property management systems", "Automated reservation workflows", "Guest experience platforms", "Staff coordination tools", "Digital marketing and online booking"]',
  '["Digital Transformation", "Software & Systems Advisory", "Business Process Automation"]',
  '[{"question":"What technology improves guest satisfaction most?","answer":"Seamless booking, mobile check-in, and personalized service through integrated systems make the biggest impact."}]',
  'Hospitality Technology Consulting | VeyraTech',
  'Technology solutions for hospitality businesses.',
  4,
  true
),
(
  'Professional Services',
  'professional-services',
  'PROFESSIONAL_SERVICES',
  'Technology consulting for professional services firms to improve client delivery and operations.',
  '["Manual time tracking and billing", "Inefficient project management", "Scattered client information", "Limited collaboration tools", "Difficulty scaling delivery"]',
  '["Professional services automation", "Integrated project and resource management", "Centralized client management", "Modern collaboration platforms", "Delivery process optimization"]',
  '["Business Process Automation", "Software & Systems Advisory", "Technology Strategy"]',
  '[{"question":"How can we improve utilization rates?","answer":"Integrated resource and project management typically improves utilization by 15-20% through better visibility."}]',
  'Professional Services Technology | VeyraTech',
  'Technology for professional services firms.',
  5,
  true
),
(
  'Growing Enterprises',
  'growing-enterprises',
  'GROWING_ENTERPRISES',
  'Strategic technology guidance for growing businesses navigating scale and complexity.',
  '["Outgrowing current systems", "Technology decisions without strategic context", "Difficulty finding technology leadership", "Competing technology priorities", "Budget constraints"]',
  '["Technology strategy and roadmap", "System modernization planning", "Fractional CTO services", "Vendor evaluation and selection", "Technology team building"]',
  '["Technology Strategy", "Technology Advisory Services", "Software & Systems Advisory"]',
  '[{"question":"When should we hire a full-time CTO?","answer":"Typically when technology becomes core to your business model or you have 5+ developers. Fractional CTO bridges the gap."}]',
  'Technology Consulting for Growing Businesses | VeyraTech',
  'Strategic technology for growing enterprises.',
  6,
  true
);

-- Success message
SELECT 'Database populated successfully!' as result;
SELECT COUNT(*) || ' services created' as services_count FROM services;
SELECT COUNT(*) || ' industries created' as industries_count FROM industry_pages;
