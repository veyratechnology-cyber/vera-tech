-- ============================================================================
-- FIX ALL SERVICE 404 ERRORS - INSERT SERVICES INTO DATABASE
-- ============================================================================
-- Run this in Supabase SQL Editor to fix:
-- - /services/digital-transformation → 404
-- - /services/cloud-solutions → 404
-- - /services/cybersecurity → 404
-- - And all other service pages
-- ============================================================================

BEGIN;

-- Delete existing services (if any) to start fresh
DELETE FROM services;

-- ============================================================================
-- INSERT ALL SERVICES
-- ============================================================================

-- 1. DIGITAL TRANSFORMATION
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'Digital Transformation',
  'digital-transformation',
  'Transform your business with cutting-edge digital solutions that drive growth, improve efficiency, and create competitive advantage in the digital age.',
  E'• Legacy systems holding back innovation\n• Manual processes causing inefficiencies\n• Difficulty competing with digital-first companies\n• Poor customer experience across digital channels\n• Lack of data-driven decision making',
  E'• Comprehensive digital strategy development\n• Legacy system modernization\n• Process automation and digitization\n• Customer experience transformation\n• Data analytics and insights platform\n• Change management and training',
  E'• Digital transformation roadmap\n• Modernized technology infrastructure\n• Automated workflows and processes\n• Enhanced customer digital experience\n• Data analytics dashboards\n• Training and adoption support',
  E'• 40-60% reduction in manual processes\n• Improved customer satisfaction scores\n• Faster time-to-market for new services\n• Better data-driven decision making\n• Increased operational efficiency\n• Competitive advantage in digital markets',
  '[{"question":"How long does digital transformation take?","answer":"Typically 6-18 months depending on scope, but we work in iterative phases so you see benefits throughout the journey."},{"question":"What if my team resists change?","answer":"We include comprehensive change management and training to ensure smooth adoption and buy-in from all stakeholders."},{"question":"Can we transform gradually?","answer":"Yes! We recommend phased transformation to minimize disruption while delivering continuous value."}]',
  'Digital Transformation Services Kenya | Business Digitization | VeyraTech',
  'Transform your business with expert digital transformation services in Kenya. Modernize systems, automate processes, and drive growth with VeyraTech.',
  1,
  true,
  NOW(),
  NOW()
);

-- 2. CLOUD SOLUTIONS
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'Cloud Solutions & Migration',
  'cloud-solutions',
  'Migrate to the cloud and unlock scalability, flexibility, and cost savings with our expert cloud architecture and migration services.',
  E'• High infrastructure costs\n• Limited scalability during growth periods\n• Difficulty managing on-premise systems\n• Slow deployment of new features\n• Disaster recovery concerns\n• Geographical limitations',
  E'• Cloud strategy and architecture design\n• AWS, Azure, and Google Cloud expertise\n• Seamless cloud migration services\n• Multi-cloud and hybrid solutions\n• Cloud security and compliance\n• Cost optimization strategies\n• 24/7 cloud infrastructure management',
  E'• Cloud architecture blueprint\n• Migrated applications and data\n• Scalable cloud infrastructure\n• Security and compliance framework\n• Disaster recovery plan\n• Cost optimization report\n• Ongoing support and monitoring',
  E'• 30-50% reduction in infrastructure costs\n• 99.9% uptime and reliability\n• Instant scalability during demand spikes\n• Faster deployment (days vs months)\n• Enhanced security and compliance\n• Global accessibility\n• Pay-as-you-go flexibility',
  '[{"question":"Which cloud provider is best?","answer":"We recommend based on your specific needs. AWS for comprehensive services, Azure for Microsoft integration, Google Cloud for AI/ML workloads."},{"question":"Will migration cause downtime?","answer":"We plan migrations to minimize disruption, often using phased approaches with zero or minimal downtime."},{"question":"How secure is the cloud?","answer":"Major cloud providers offer enterprise-grade security, often exceeding what most organizations can achieve on-premise. We implement additional security layers tailored to your needs."}]',
  'Cloud Migration Services Kenya | AWS, Azure, Google Cloud | VeyraTech',
  'Expert cloud solutions and migration services in Kenya. AWS, Azure, and Google Cloud expertise. Reduce costs, scale effortlessly with VeyraTech.',
  2,
  true,
  NOW(),
  NOW()
);

-- 3. CYBERSECURITY SERVICES
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'Cybersecurity Services',
  'cybersecurity',
  'Protect your business from cyber threats with comprehensive security assessments, implementation, and monitoring services.',
  E'• Increasing cyber threats and attacks\n• Lack of security expertise in-house\n• Compliance requirements (GDPR, ISO 27001)\n• Vulnerable legacy systems\n• Risk of data breaches\n• Inadequate security monitoring',
  E'• Security assessment and audits\n• Penetration testing and vulnerability scanning\n• Security architecture design\n• Implementation of security controls\n• Security Operations Center (SOC) setup\n• Compliance consulting (ISO 27001, GDPR)\n• Incident response planning\n• Security awareness training',
  E'• Comprehensive security assessment report\n• Penetration testing results\n• Security architecture documentation\n• Implemented security controls\n• SOC setup and monitoring\n• Compliance certification support\n• Incident response playbook\n• Staff training completion',
  E'• Reduced risk of data breaches\n• Compliance with regulations\n• Protection of customer data\n• Reduced insurance premiums\n• Enhanced brand reputation\n• Peace of mind for stakeholders\n• Quick incident response capability',
  '[{"question":"How often should we do security assessments?","answer":"We recommend quarterly assessments for critical systems and annual comprehensive audits, with continuous monitoring in between."},{"question":"Are we compliant with GDPR?","answer":"We assess your current state and guide you through achieving and maintaining GDPR compliance with proper documentation and controls."},{"question":"What happens if we''re breached?","answer":"Our incident response service provides immediate expert support to contain, investigate, and recover from security incidents."}]',
  'Cybersecurity Services Kenya | Security Audits & Protection | VeyraTech',
  'Professional cybersecurity services in Kenya. Security assessments, penetration testing, and compliance. Protect your business with VeyraTech.',
  3,
  true,
  NOW(),
  NOW()
);

-- 4. AI & MACHINE LEARNING
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'AI & Machine Learning',
  'ai-machine-learning',
  'Harness the power of AI and machine learning to automate processes, gain insights, and create intelligent solutions that give you a competitive edge.',
  E'• Manual analysis of large datasets\n• Difficulty predicting trends and outcomes\n• Repetitive tasks consuming resources\n• Lack of personalization at scale\n• Missing insights hidden in data\n• Slow decision-making processes',
  E'• AI strategy and roadmap development\n• Custom machine learning models\n• Natural Language Processing (NLP)\n• Computer vision solutions\n• Predictive analytics\n• Chatbots and virtual assistants\n• AI-powered automation\n• Model deployment and monitoring',
  E'• AI strategy document\n• Custom-trained ML models\n• Deployed AI applications\n• Integration with existing systems\n• Model performance dashboards\n• Documentation and training\n• Ongoing model optimization',
  E'• Automated decision-making\n• Accurate predictions and forecasting\n• Personalized customer experiences\n• Reduced operational costs\n• Faster insights from data\n• Improved accuracy in tasks\n• Scalable intelligent systems',
  '[{"question":"Do we need a lot of data for AI?","answer":"It depends on the use case. We can start with existing data and implement strategies to collect more data over time."},{"question":"Is AI expensive to implement?","answer":"Costs vary by complexity, but modern cloud AI services make it more accessible than ever. We focus on high-ROI use cases first."},{"question":"How accurate are AI predictions?","answer":"Accuracy depends on data quality and model design. We target 85-95% accuracy for most business applications and continuously improve models."}]',
  'AI & Machine Learning Services Kenya | Custom AI Solutions | VeyraTech',
  'Expert AI and machine learning services in Kenya. Custom models, predictive analytics, and intelligent automation. Transform with VeyraTech.',
  4,
  true,
  NOW(),
  NOW()
);

-- 5. CUSTOM SOFTWARE DEVELOPMENT
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'Custom Software Development',
  'software-development',
  'Build powerful custom software solutions tailored to your unique business needs, from web applications to mobile apps and enterprise systems.',
  E'• Off-the-shelf software doesn''t fit needs\n• Legacy systems needing replacement\n• Manual workflows need automation\n• Poor integration between systems\n• Scalability limitations\n• High licensing costs for generic software',
  E'• Requirements analysis and design\n• Web application development\n• Mobile app development (iOS & Android)\n• Enterprise software solutions\n• API development and integration\n• Database design and optimization\n• Quality assurance and testing\n• Deployment and maintenance',
  E'• Fully functional custom software\n• Source code and documentation\n• User and admin interfaces\n• Mobile applications (if applicable)\n• API documentation\n• Testing and QA reports\n• Deployment and training\n• Ongoing support and maintenance',
  E'• Perfect fit for your business processes\n• Competitive advantage through unique features\n• Better user adoption and satisfaction\n• Improved efficiency and productivity\n• Scalable as your business grows\n• Lower long-term costs vs licenses\n• Full control over features and updates',
  '[{"question":"How long does custom development take?","answer":"Simple applications: 2-3 months. Complex systems: 6-12 months. We use agile methodology to deliver working features continuously."},{"question":"What if requirements change mid-project?","answer":"Our agile approach accommodates changes. We work in sprints and adjust based on feedback and evolving needs."},{"question":"Do you support after launch?","answer":"Yes! We provide ongoing support, maintenance, and enhancement services to ensure your software evolves with your business."}]',
  'Custom Software Development Kenya | Web & Mobile Apps | VeyraTech',
  'Professional custom software development in Kenya. Web applications, mobile apps, and enterprise solutions tailored to your needs. VeyraTech.',
  5,
  true,
  NOW(),
  NOW()
);

-- 6. BUSINESS PROCESS AUTOMATION
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'Business Process Automation',
  'business-automation',
  'Automate repetitive tasks and workflows to increase efficiency, reduce errors, and free your team to focus on high-value activities.',
  E'• Time wasted on repetitive manual tasks\n• Human errors in data entry\n• Slow approval workflows\n• Difficulty tracking process status\n• Inconsistent execution of procedures\n• High operational costs',
  E'• Process analysis and mapping\n• Workflow automation design\n• RPA (Robotic Process Automation)\n• Document workflow automation\n• Email and communication automation\n• Integration between systems\n• Custom automation scripts\n• Monitoring and optimization',
  E'• Process documentation and maps\n• Automated workflows\n• Integration connectors\n• Automated reporting\n• Monitoring dashboards\n• Training and documentation\n• ROI analysis report',
  E'• 50-80% time savings on automated tasks\n• 95%+ reduction in manual errors\n• Faster process completion times\n• Real-time process visibility\n• Reduced operational costs\n• Happier employees (less repetitive work)\n• Better compliance and audit trails',
  '[{"question":"What processes can be automated?","answer":"Almost any repetitive process: data entry, report generation, approvals, notifications, file management, and system synchronization."},{"question":"Will automation replace our staff?","answer":"No. Automation handles repetitive tasks, freeing your staff for strategic, creative, and customer-focused work where humans excel."},{"question":"How quickly do we see ROI?","answer":"Most automation projects pay for themselves within 6-12 months through time savings and error reduction."}]',
  'Business Process Automation Kenya | Workflow Automation | VeyraTech',
  'Automate your business processes in Kenya. RPA, workflow automation, and system integration. Increase efficiency with VeyraTech.',
  6,
  true,
  NOW(),
  NOW()
);

-- 7. DATA ANALYTICS & BUSINESS INTELLIGENCE
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'Data Analytics & BI',
  'data-analytics',
  'Transform raw data into actionable insights with powerful analytics solutions, dashboards, and business intelligence systems.',
  E'• Data scattered across multiple systems\n• Difficulty making data-driven decisions\n• Lack of real-time business insights\n• Manual report generation\n• Unable to identify trends and patterns\n• No visibility into key metrics',
  E'• Data strategy and architecture\n• Data warehouse design and setup\n• ETL (Extract, Transform, Load) pipelines\n• Interactive dashboards (Power BI, Tableau)\n• Advanced analytics and reporting\n• Predictive analytics\n• Self-service BI tools\n• Data governance frameworks',
  E'• Centralized data warehouse\n• Automated data pipelines\n• Interactive dashboards\n• Custom reports\n• Mobile BI apps\n• Predictive models\n• Training and documentation\n• Data governance policies',
  E'• Single source of truth for data\n• Real-time business insights\n• Faster, data-driven decisions\n• Identification of opportunities and risks\n• Improved forecasting accuracy\n• Better resource allocation\n• Competitive intelligence',
  '[{"question":"What tools do you use for BI?","answer":"We work with Power BI, Tableau, Looker, and custom solutions depending on your needs, budget, and technical environment."},{"question":"Can non-technical staff use the dashboards?","answer":"Absolutely! We design intuitive, self-service dashboards that business users can explore without technical knowledge."},{"question":"How do you ensure data quality?","answer":"We implement data validation, cleansing, and governance processes to ensure accuracy, consistency, and reliability."}]',
  'Data Analytics & Business Intelligence Kenya | BI Dashboards | VeyraTech',
  'Expert data analytics and BI services in Kenya. Transform data into insights with dashboards, reports, and predictive analytics. VeyraTech.',
  7,
  true,
  NOW(),
  NOW()
);

-- 8. TECHNOLOGY CONSULTING
INSERT INTO services (
  id, name, slug, description, problem, solution, deliverables, business_outcomes, faq,
  seo_title, seo_description, display_order, published, created_at, updated_at
) VALUES (
  gen_random_uuid(),
  'Technology Consulting',
  'technology-consulting',
  'Expert technology guidance to help you make informed decisions, optimize your IT investments, and align technology with business goals.',
  E'• Uncertain about technology investments\n• Misalignment between IT and business goals\n• Outdated technology strategy\n• Difficulty evaluating vendors and solutions\n• Lack of in-house technical expertise\n• Poor ROI on technology spending',
  E'• Technology strategy development\n• IT assessment and roadmap\n• Vendor selection and evaluation\n• Solution architecture design\n• Technology due diligence\n• CTO advisory services\n• IT governance frameworks\n• Innovation workshops',
  E'• Technology strategy document\n• IT assessment report\n• Technology roadmap (1-3 years)\n• Vendor evaluation matrix\n• Architecture blueprints\n• Cost-benefit analysis\n• Implementation recommendations\n• Executive presentations',
  E'• Aligned technology and business strategy\n• Optimized technology investments\n• Reduced technology risks\n• Better vendor negotiations\n• Access to expert knowledge\n• Faster time to market\n• Competitive advantage through technology',
  '[{"question":"Do you work with our existing IT team?","answer":"Yes! We complement your team with specialized expertise and strategic guidance while building their capabilities."},{"question":"How long is a typical engagement?","answer":"Strategy projects: 4-8 weeks. Advisory retainers: 3-12 months. We adapt to your needs."},{"question":"Can you help with vendor selection?","answer":"Yes! We provide unbiased evaluation of vendors and solutions based on your requirements, budget, and technical fit."}]',
  'Technology Consulting Services Kenya | IT Strategy | VeyraTech',
  'Expert technology consulting in Kenya. IT strategy, solution architecture, and vendor selection. Optimize your technology investments with VeyraTech.',
  8,
  true,
  NOW(),
  NOW()
);

COMMIT;

-- ============================================================================
-- VERIFICATION - Check Services Were Created
-- ============================================================================

-- Show all services
SELECT 
  '✅ SERVICES CREATED' as status,
  name,
  slug,
  published,
  display_order
FROM services
ORDER BY display_order;

-- ============================================================================
-- EXPECTED OUTPUT:
-- ============================================================================
-- You should see 8 services:
-- 1. Digital Transformation (digital-transformation)
-- 2. Cloud Solutions & Migration (cloud-solutions)
-- 3. Cybersecurity Services (cybersecurity)
-- 4. AI & Machine Learning (ai-machine-learning)
-- 5. Custom Software Development (software-development)
-- 6. Business Process Automation (business-automation)
-- 7. Data Analytics & BI (data-analytics)
-- 8. Technology Consulting (technology-consulting)
--
-- All should be published = true
-- ============================================================================

-- ============================================================================
-- TEST YOUR PAGES:
-- ============================================================================
-- After running this SQL, test these URLs (should work, no 404):
-- • https://vera-tech.vercel.app/services/digital-transformation
-- • https://vera-tech.vercel.app/services/cloud-solutions
-- • https://vera-tech.vercel.app/services/cybersecurity
-- • https://vera-tech.vercel.app/services/ai-machine-learning
-- • https://vera-tech.vercel.app/services/software-development
-- • https://vera-tech.vercel.app/services/business-automation
-- • https://vera-tech.vercel.app/services/data-analytics
-- • https://vera-tech.vercel.app/services/technology-consulting
-- ============================================================================

-- ============================================================================
-- NEXT: Run COMPLETE_FIX_RUN_THIS_NOW.sql to fix authentication errors
-- ============================================================================
