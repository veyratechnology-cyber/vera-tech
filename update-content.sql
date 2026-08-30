-- Update services with full content
UPDATE services SET 
  problem = '["Unclear technology direction", "Poor ROI on tech investments", "Difficulty evaluating new technologies"]',
  solution = '["Technology assessment", "Clear roadmap aligned with goals", "Investment framework"]',
  deliverables = '["Technology Strategy Document", "3-Year Roadmap", "Investment Priorities"]',
  business_outcomes = '["Clear tech direction", "Optimized investments", "Faster decisions"]',
  faq = '[{"question":"How long does it take?","answer":"Typically 6-8 weeks"}]',
  seo_title = 'Technology Strategy & Planning | VeyraTech',
  seo_description = 'Strategic technology planning for your business'
WHERE slug = 'technology-strategy';

UPDATE services SET 
  problem = '["Uncertainty about AI value", "Difficulty separating hype from reality", "Cost and risk concerns"]',
  solution = '["AI opportunity assessment", "Use case identification", "Proof of concept development"]',
  deliverables = '["AI Assessment Report", "Prioritized Use Cases", "POC Results"]',
  business_outcomes = '["Clear AI value understanding", "Reduced implementation risk", "Faster AI adoption"]',
  faq = '[{"question":"Do we need a data science team?","answer":"Not necessarily. We help you leverage appropriate AI tools."}]',
  seo_title = 'AI Consulting & Implementation | VeyraTech',
  seo_description = 'Practical AI consulting focused on business outcomes'
WHERE slug = 'ai-consulting';

UPDATE services SET 
  problem = '["Manual repetitive tasks", "Human errors", "Inconsistent processes"]',
  solution = '["Process assessment", "Workflow optimization", "Automation implementation"]',
  deliverables = '["Process Assessment", "Automation Roadmap", "Implemented Solutions"]',
  business_outcomes = '["Time savings", "Reduced errors", "Consistent execution"]',
  faq = '[{"question":"Which processes first?","answer":"We prioritize based on impact and ROI."}]',
  seo_title = 'Business Process Automation | VeyraTech',
  seo_description = 'Intelligent automation that eliminates repetitive work'
WHERE slug = 'business-automation';

UPDATE services SET 
  problem = '["Legacy systems", "Manual processes", "Disconnected data", "Competitive pressure"]',
  solution = '["Digital maturity assessment", "Transformation strategy", "Technology modernization"]',
  deliverables = '["Digital Assessment", "Transformation Roadmap", "Modernization Plan"]',
  business_outcomes = '["Modern tech foundation", "Improved customer experience", "Greater agility"]',
  faq = '[{"question":"How long does it take?","answer":"Its a journey. We design phased approaches."}]',
  seo_title = 'Digital Transformation | VeyraTech',
  seo_description = 'Comprehensive digital transformation services'
WHERE slug = 'digital-transformation';

UPDATE services SET 
  problem = '["Too many software options", "Vendor claims evaluation", "Implementation failures"]',
  solution = '["Requirements analysis", "Vendor evaluation", "Implementation planning"]',
  deliverables = '["Requirements Document", "Vendor Evaluation", "Implementation Plan"]',
  business_outcomes = '["Confident decisions", "Reduced risk", "Better vendor terms"]',
  faq = '[{"question":"Are you vendor-agnostic?","answer":"Yes. We recommend based on your needs."}]',
  seo_title = 'Software & Systems Advisory | VeyraTech',
  seo_description = 'Expert software selection guidance'
WHERE slug = 'software-systems';

UPDATE services SET 
  problem = '["No tech leadership", "Strategic context missing", "Keeping up with changes"]',
  solution = '["Fractional CTO services", "Regular advisory", "Strategic decision support"]',
  deliverables = '["Advisory Sessions", "Strategic Recommendations", "Team Guidance"]',
  business_outcomes = '["Senior tech expertise", "Better decisions", "Cost-effective leadership"]',
  faq = '[{"question":"How does fractional CTO work?","answer":"Part-time leadership tailored to your needs."}]',
  seo_title = 'Technology Advisory Services | VeyraTech',
  seo_description = 'Fractional CTO and technology advisory'
WHERE slug = 'technology-advisory';

-- Update industries with full content
UPDATE industry_pages SET 
  challenges = '["Legacy property systems", "Manual leasing processes", "Limited data visibility"]',
  solutions = '["System modernization", "Automated workflows", "Centralized analytics"]',
  relevant_services = '["Digital Transformation", "Business Automation", "Software Advisory"]',
  faq = '[{"question":"How can tech improve property management?","answer":"Modern systems automate tasks and improve tenant experience."}]',
  seo_title = 'Real Estate Technology Consulting | VeyraTech',
  seo_description = 'Technology consulting for real estate companies'
WHERE slug = 'real-estate';

UPDATE industry_pages SET 
  challenges = '["Project coordination", "Manual estimating", "Field-office communication gaps"]',
  solutions = '["Construction management software", "Mobile field solutions", "Automated estimating"]',
  relevant_services = '["Software Advisory", "Business Automation", "Technology Strategy"]',
  faq = '[{"question":"What tech gives best ROI?","answer":"Usually field communication tools and automated estimating."}]',
  seo_title = 'Construction Technology Consulting | VeyraTech',
  seo_description = 'Technology solutions for construction'
WHERE slug = 'construction';

UPDATE industry_pages SET 
  challenges = '["Route optimization", "Manual dispatch", "Limited shipment visibility"]',
  solutions = '["TMS implementation", "Automated routing", "Real-time tracking"]',
  relevant_services = '["Business Automation", "Software Advisory", "Digital Transformation"]',
  faq = '[{"question":"How to improve delivery efficiency?","answer":"Modern TMS typically reduces time 15-25% and cuts fuel costs."}]',
  seo_title = 'Logistics Technology Consulting | VeyraTech',
  seo_description = 'Technology for logistics companies'
WHERE slug = 'logistics';

UPDATE industry_pages SET 
  challenges = '["Disconnected booking systems", "Manual reservations", "Limited guest data"]',
  solutions = '["Integrated PMS", "Automated reservations", "Guest experience platforms"]',
  relevant_services = '["Digital Transformation", "Software Advisory", "Business Automation"]',
  faq = '[{"question":"What improves guest satisfaction?","answer":"Seamless booking, mobile check-in, and personalized service."}]',
  seo_title = 'Hospitality Technology Consulting | VeyraTech',
  seo_description = 'Technology for hospitality businesses'
WHERE slug = 'hospitality';

UPDATE industry_pages SET 
  challenges = '["Manual time tracking", "Inefficient project management", "Scattered client info"]',
  solutions = '["PSA automation", "Integrated project management", "Centralized CRM"]',
  relevant_services = '["Business Automation", "Software Advisory", "Technology Strategy"]',
  faq = '[{"question":"How to improve utilization?","answer":"Integrated resource management typically improves utilization 15-20%."}]',
  seo_title = 'Professional Services Technology | VeyraTech',
  seo_description = 'Technology for professional services'
WHERE slug = 'professional-services';

UPDATE industry_pages SET 
  challenges = '["Outgrowing systems", "No strategic tech context", "Competing priorities"]',
  solutions = '["Technology strategy", "System modernization", "Fractional CTO services"]',
  relevant_services = '["Technology Strategy", "Technology Advisory", "Software Advisory"]',
  faq = '[{"question":"When to hire full-time CTO?","answer":"When tech is core to business or you have 5+ developers."}]',
  seo_title = 'Technology for Growing Businesses | VeyraTech',
  seo_description = 'Strategic technology for growing enterprises'
WHERE slug = 'growing-enterprises';

SELECT 'Updated successfully' as result;
