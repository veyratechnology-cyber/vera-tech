-- =====================================================
-- COMPLETE FIX FOR ALL 404 ERRORS
-- Services + Industries Database Insert
-- Run this in Supabase SQL Editor NOW!
-- =====================================================

-- Step 1: Delete existing data to avoid duplicates
DELETE FROM services WHERE slug IN (
  'digital-transformation',
  'cloud-solutions', 
  'cybersecurity',
  'ai-machine-learning',
  'software-development',
  'business-automation',
  'data-analytics',
  'technology-consulting'
);

DELETE FROM industry_pages WHERE slug IN (
  'real-estate',
  'construction',
  'logistics',
  'hospitality',
  'professional-services',
  'growing-enterprises'
);

-- =====================================================
-- SERVICES INSERT (8 Services)
-- =====================================================

-- 1. Digital Transformation
INSERT INTO services (
  id, name, slug, description, published,
  display_order, created_at, updated_at,
  problem, solution, deliverables, business_outcomes, faq
) VALUES (
  'srv_digital_transformation',
  'Digital Transformation',
  'digital-transformation',
  'Transform your business operations with modern technology and digital processes. We help organizations modernize legacy systems, streamline workflows, and build a technology foundation for sustainable growth.',
  'Zap',
  'TRANSFORMATION',
  true,
  true,
  1,
  NOW(),
  NOW(),
  -- Problem (JSON array)
  '["Legacy systems are slowing down your operations and limiting growth", "Different departments use disconnected tools causing data silos", "Manual processes consume valuable time and introduce errors", "Difficulty adapting to market changes due to inflexible technology", "High operational costs from maintaining outdated systems"]',
  -- Solution (JSON array)
  '["Comprehensive assessment of current systems and digital maturity", "Strategic roadmap for phased digital transformation", "Modern system architecture design and implementation", "Process automation and workflow optimization", "Change management and team training programs", "Integration of new technologies with existing systems"]',
  -- Deliverables (JSON array)
  '["Digital transformation strategy document", "Technology roadmap (12-36 months)", "System architecture diagrams", "Process automation workflows", "Integration implementation", "User training materials", "Change management plan", "Success metrics dashboard"]',
  -- Business Outcomes (JSON array)
  '["50-70% reduction in manual processing time", "Improved data accuracy and decision-making", "Increased operational efficiency and scalability", "Enhanced customer experience through digital channels", "Reduced IT maintenance costs", "Faster time-to-market for new initiatives", "Better collaboration across departments"]',
  -- FAQ (JSON array of objects)
  '[
    {
      "question": "How long does digital transformation take?",
      "answer": "Typically 6-18 months depending on scope. We break it into phases so you see value quickly while building toward the complete vision."
    },
    {
      "question": "Will this disrupt our current operations?",
      "answer": "We design transformation programs to minimize disruption. Changes are phased, thoroughly tested, and implemented with full support to ensure business continuity."
    },
    {
      "question": "What if our team resists change?",
      "answer": "Change management is built into our approach. We involve your team early, provide comprehensive training, and ensure everyone understands the benefits."
    },
    {
      "question": "Do we need to replace all our systems?",
      "answer": "Not necessarily. We assess what can be improved, integrated, or replaced. Often, strategic upgrades and integrations deliver better value than complete replacement."
    }
  ]'
);

-- 2. Cloud Solutions
INSERT INTO "Service" (
  id, name, slug, description, icon, category, published, featured,
  "displayOrder", "createdAt", "updatedAt",
  problem, solution, deliverables, "businessOutcomes", faq
) VALUES (
  'srv_cloud_solutions',
  'Cloud Solutions',
  'cloud-solutions',
  'Migrate to the cloud and leverage modern infrastructure for better performance, security, and cost efficiency. We help businesses move to AWS, Azure, or Google Cloud with zero downtime.',
  'Cloud',
  'INFRASTRUCTURE',
  true,
  true,
  2,
  NOW(),
  NOW(),
  -- Problem
  '["High infrastructure costs from on-premise servers", "Limited scalability during peak demand periods", "Difficulty maintaining and updating hardware", "Security concerns with local data storage", "Disaster recovery planning is complex and expensive", "Remote work challenges with on-premise systems"]',
  -- Solution
  '["Cloud readiness assessment and strategy development", "Right-sizing cloud resources for cost optimization", "Secure migration planning with zero-downtime approach", "Multi-cloud or hybrid cloud architecture design", "Automated backup and disaster recovery setup", "Cloud security implementation and monitoring", "Cost optimization and resource management"]',
  -- Deliverables
  '["Cloud migration strategy document", "Cost-benefit analysis", "Migration roadmap and timeline", "Cloud architecture design", "Security and compliance documentation", "Automated deployment pipelines", "Monitoring and alerting setup", "Cloud cost optimization plan"]',
  -- Business Outcomes
  '["30-50% reduction in infrastructure costs", "99.9%+ uptime and reliability", "Scale resources up or down based on demand", "Enhanced security with enterprise-grade protection", "Faster deployment of new applications", "Global accessibility for remote teams", "Automated backups and disaster recovery"]',
  -- FAQ
  '[
    {
      "question": "Which cloud provider should we choose?",
      "answer": "It depends on your specific needs. AWS has the broadest services, Azure integrates well with Microsoft tools, and Google Cloud excels at data analytics. We help you choose based on your requirements and budget."
    },
    {
      "question": "How long does cloud migration take?",
      "answer": "Simple migrations can take 2-4 weeks. Complex enterprise migrations may take 3-6 months. We break it into phases to minimize risk and deliver value incrementally."
    },
    {
      "question": "Will our data be secure in the cloud?",
      "answer": "Yes. Major cloud providers offer enterprise-grade security often superior to on-premise solutions. We implement encryption, access controls, and monitoring to ensure your data is protected."
    },
    {
      "question": "What about our existing software?",
      "answer": "Most modern applications work well in the cloud. For legacy systems, we assess compatibility and plan appropriate migration strategies or modernization approaches."
    }
  ]'
);

-- 3. Cybersecurity
INSERT INTO "Service" (
  id, name, slug, description, icon, category, published, featured,
  "displayOrder", "createdAt", "updatedAt",
  problem, solution, deliverables, "businessOutcomes", faq
) VALUES (
  'srv_cybersecurity',
  'Cybersecurity',
  'cybersecurity',
  'Protect your business from cyber threats with comprehensive security assessments, implementation, and monitoring. We help you build a robust security posture that safeguards your data and operations.',
  'Shield',
  'SECURITY',
  true,
  true,
  3,
  NOW(),
  NOW(),
  -- Problem
  '["Growing cyber threats targeting businesses of all sizes", "Lack of visibility into security vulnerabilities", "Compliance requirements (GDPR, PCI-DSS, etc.)", "Employee security awareness gaps", "No incident response plan in place", "Outdated security tools and practices"]',
  -- Solution
  '["Comprehensive security assessment and vulnerability scanning", "Security architecture design and implementation", "Multi-layer defense strategy (network, application, data)", "Security awareness training for employees", "Incident response plan development", "24/7 security monitoring and threat detection", "Compliance framework implementation"]',
  -- Deliverables
  '["Security assessment report", "Vulnerability analysis and remediation plan", "Security architecture documentation", "Firewall and network security configuration", "Endpoint protection deployment", "Security policies and procedures", "Employee training materials", "Incident response playbook"]',
  -- Business Outcomes
  '["Reduced risk of data breaches and cyber attacks", "Compliance with industry regulations", "Protected customer and business data", "Improved employee security awareness", "Faster detection and response to threats", "Peace of mind for leadership and stakeholders", "Reduced insurance premiums through better security"]',
  -- FAQ
  '[
    {
      "question": "Are we too small to be a cyber attack target?",
      "answer": "No. Small businesses are increasingly targeted because they often have weaker defenses. 43% of cyber attacks target small businesses."
    },
    {
      "question": "How much should we spend on cybersecurity?",
      "answer": "Typically 5-15% of IT budget depending on your industry and risk profile. We help you prioritize investments for maximum protection at your budget level."
    },
    {
      "question": "What happens if we get breached?",
      "answer": "With our incident response plan, you will have clear steps to contain, investigate, and recover from incidents quickly, minimizing damage and downtime."
    },
    {
      "question": "Do we need a full-time security team?",
      "answer": "Not necessarily. We can provide ongoing monitoring and management, supplementing your team or serving as your complete security function."
    }
  ]'
);

-- 4. AI & Machine Learning
INSERT INTO "Service" (
  id, name, slug, description, icon, category, published, featured,
  "displayOrder", "createdAt", "updatedAt",
  problem, solution, deliverables, "businessOutcomes", faq
) VALUES (
  'srv_ai_machine_learning',
  'AI & Machine Learning',
  'ai-machine-learning',
  'Harness the power of artificial intelligence to automate tasks, gain insights, and improve decision-making. We help you identify practical AI use cases and implement solutions that deliver measurable ROI.',
  'Brain',
  'AI',
  true,
  true,
  4,
  NOW(),
  NOW(),
  -- Problem
  '["Overwhelmed by AI hype—unsure where to start", "Repetitive tasks consuming employee time", "Data exists but not used for strategic decisions", "Customer service inquiries overwhelming your team", "Manual quality control processes missing defects", "Difficulty predicting demand and inventory needs"]',
  -- Solution
  '["AI readiness assessment and use case identification", "Data quality evaluation and preparation", "Custom machine learning model development", "AI chatbot and virtual assistant implementation", "Predictive analytics for business forecasting", "Computer vision for quality control", "Natural language processing for document automation", "Responsible AI framework and governance"]',
  -- Deliverables
  '["AI opportunity assessment report", "Use case prioritization matrix", "Proof of concept implementation", "Production ML model deployment", "Model monitoring dashboard", "API integration documentation", "Training data pipeline", "AI governance guidelines"]',
  -- Business Outcomes
  '["40-60% reduction in repetitive task time", "Improved forecast accuracy for better planning", "24/7 customer service availability", "Faster and more consistent quality control", "Data-driven insights for strategic decisions", "Automated document processing", "Enhanced customer personalization"]',
  -- FAQ
  '[
    {
      "question": "Do we need big data to use AI?",
      "answer": "Not always. Many practical AI applications work with modest data. We assess your data and recommend approaches that fit what you have."
    },
    {
      "question": "How accurate are AI predictions?",
      "answer": "It varies by use case. We set realistic expectations, measure accuracy, and continuously improve models. Most business applications achieve 80-95% accuracy."
    },
    {
      "question": "Will AI replace our employees?",
      "answer": "Our focus is augmentation, not replacement. AI handles repetitive tasks so your team can focus on higher-value work requiring human judgment and creativity."
    },
    {
      "question": "How long before we see ROI?",
      "answer": "Proof of concepts show value in 4-8 weeks. Full production implementations typically show measurable ROI within 6-12 months."
    }
  ]'
);

-- 5. Software Development
INSERT INTO "Service" (
  id, name, slug, description, icon, category, published, featured,
  "displayOrder", "createdAt", "updatedAt",
  problem, solution, deliverables, "businessOutcomes", faq
) VALUES (
  'srv_software_development',
  'Custom Software Development',
  'software-development',
  'Build custom applications tailored to your unique business needs. From web apps to mobile solutions, we develop software that gives you a competitive advantage.',
  'Code',
  'DEVELOPMENT',
  true,
  true,
  5,
  NOW(),
  NOW(),
  -- Problem
  '["Off-the-shelf software does not fit your unique processes", "Manual workflows that could be automated", "Need to integrate multiple disconnected systems", "Customer-facing applications requiring custom features", "Legacy systems that need modernization", "Mobile app needed to reach customers or enable field teams"]',
  -- Solution
  '["Requirements gathering and business analysis", "User experience design and prototyping", "Full-stack web application development", "Native and cross-platform mobile apps", "API development and system integration", "Legacy system modernization", "Ongoing maintenance and feature enhancements", "Agile development with regular feedback cycles"]',
  -- Deliverables
  '["Requirements specification document", "UI/UX design mockups", "Custom web or mobile application", "API documentation", "Automated testing suite", "Deployment and hosting setup", "User documentation and training", "Source code and technical documentation"]',
  -- Business Outcomes
  '["Software perfectly aligned with your processes", "Competitive advantage through unique capabilities", "Improved user experience for customers or employees", "Integrated data flow across systems", "Reduced manual work through automation", "Scalable platform that grows with your business", "Full ownership and control of your software"]',
  -- FAQ
  '[
    {
      "question": "How long does custom development take?",
      "answer": "Simple applications: 2-3 months. Medium complexity: 4-6 months. Enterprise systems: 6-12+ months. We break projects into phases so you see progress and value continuously."
    },
    {
      "question": "How much does custom software cost?",
      "answer": "It varies widely based on complexity. Simple tools start at $15K-$30K. Enterprise applications can be $100K+. We provide detailed estimates after understanding your needs."
    },
    {
      "question": "What if we need changes after launch?",
      "answer": "We offer ongoing support and enhancement packages. Many clients keep us on retainer for continuous improvements based on user feedback."
    },
    {
      "question": "Will we own the source code?",
      "answer": "Yes. You own all code and intellectual property we create for you. You are never locked into working with us."
    }
  ]'
);

-- 6. Business Automation
INSERT INTO "Service" (
  id, name, slug, description, icon, category, published, featured,
  "displayOrder", "createdAt", "updatedAt",
  problem, solution, deliverables, "businessOutcomes", faq
) VALUES (
  'srv_business_automation',
  'Business Automation',
  'business-automation',
  'Eliminate repetitive tasks and streamline workflows with intelligent automation. We help you identify automation opportunities and implement solutions that free your team for higher-value work.',
  'Zap',
  'AUTOMATION',
  true,
  true,
  6,
  NOW(),
  NOW(),
  -- Problem
  '["Employees spending hours on repetitive data entry", "Manual approval processes causing delays", "Copy-paste between different systems", "Email overload and manual sorting", "Repetitive report generation taking too long", "Human errors in routine processes"]',
  -- Solution
  '["Process mapping and automation opportunity analysis", "Workflow automation using modern tools (Zapier, Make, Power Automate)", "Robotic Process Automation (RPA) for legacy systems", "Document processing automation", "Email and notification automation", "Report generation automation", "Custom automation scripts and integrations", "Change management and user training"]',
  -- Deliverables
  '["Process documentation and automation roadmap", "Automated workflow implementations", "Integration between systems", "Automated reporting dashboards", "Error handling and monitoring setup", "User guides and training materials", "Process documentation", "ROI tracking dashboard"]',
  -- Business Outcomes
  '["50-80% reduction in manual task time", "Faster processing times for routine operations", "Reduced errors from manual data entry", "Employees freed for strategic work", "Consistent process execution", "24/7 operation without human intervention", "Measurable time and cost savings"]',
  -- FAQ
  '[
    {
      "question": "Which processes should we automate first?",
      "answer": "We help you prioritize based on frequency, time consumed, error rate, and business impact. Usually start with high-volume, rule-based processes."
    },
    {
      "question": "Will automation work with our existing systems?",
      "answer": "Almost always yes. Modern automation tools integrate with most systems through APIs, webhooks, or even screen automation for legacy applications."
    },
    {
      "question": "What if the process changes?",
      "answer": "Automation workflows can be updated easily. We design flexible solutions and can provide ongoing support for changes as your business evolves."
    },
    {
      "question": "How quickly can we see results?",
      "answer": "Simple automations can be implemented in days. Complex workflows may take 2-4 weeks. ROI is typically immediate once automation is live."
    }
  ]'
);

-- 7. Data Analytics
INSERT INTO "Service" (
  id, name, slug, description, icon, category, published, featured,
  "displayOrder", "createdAt", "updatedAt",
  problem, solution, deliverables, "businessOutcomes", faq
) VALUES (
  'srv_data_analytics',
  'Data Analytics',
  'data-analytics',
  'Turn your data into actionable insights with business intelligence and analytics solutions. We help you visualize data, identify trends, and make data-driven decisions.',
  'BarChart3',
  'ANALYTICS',
  true,
  true,
  7,
  NOW(),
  NOW(),
  -- Problem
  '["Data scattered across multiple systems", "No clear visibility into business performance", "Reports are outdated by the time they are generated", "Cannot answer strategic questions quickly", "Gut-feel decisions instead of data-driven ones", "Excel spreadsheets becoming unmanageable"]',
  -- Solution
  '["Data strategy and requirements assessment", "Data warehouse design and implementation", "ETL pipeline development", "Business intelligence dashboard creation", "Self-service analytics setup", "Predictive analytics models", "Data visualization best practices", "Analytics training for your team"]',
  -- Deliverables
  '["Data strategy document", "Centralized data warehouse", "Automated ETL pipelines", "Interactive BI dashboards (Power BI, Tableau, Looker)", "KPI tracking systems", "Automated reports and alerts", "Data governance framework", "Training materials"]',
  -- Business Outcomes
  '["Real-time visibility into business performance", "Faster and better decision-making", "Identify trends and opportunities early", "Reduced time spent on manual reporting", "Data-driven culture across organization", "Improved forecasting accuracy", "Competitive advantage through insights"]',
  -- FAQ
  '[
    {
      "question": "What if our data is messy?",
      "answer": "Most data is messy. Part of our work is data cleaning and standardization. We build pipelines that continuously clean and validate data."
    },
    {
      "question": "Which BI tool should we use?",
      "answer": "Depends on your ecosystem. Power BI works well with Microsoft. Tableau excels at visualization. Looker is great for technical teams. We help you choose."
    },
    {
      "question": "Can our team build reports themselves?",
      "answer": "Yes. We set up self-service analytics so non-technical users can create reports without coding. We also provide training and templates."
    },
    {
      "question": "How long until we see insights?",
      "answer": "Quick wins in 2-4 weeks with initial dashboards. Comprehensive analytics platform takes 2-3 months. We prioritize high-impact reports first."
    }
  ]'
);

-- 8. Technology Consulting
INSERT INTO "Service" (
  id, name, slug, description, icon, category, published, featured,
  "displayOrder", "createdAt", "updatedAt",
  problem, solution, deliverables, "businessOutcomes", faq
) VALUES (
  'srv_technology_consulting',
  'Technology Consulting',
  'technology-consulting',
  'Get expert guidance on technology strategy, architecture, and major technology decisions. We help you navigate complex choices and build technology roadmaps aligned with business goals.',
  'Lightbulb',
  'CONSULTING',
  true,
  true,
  8,
  NOW(),
  NOW(),
  -- Problem
  '["Unsure which technology investments to prioritize", "Technology decisions not aligned with business strategy", "Evaluating multiple vendors and solutions", "Need architecture review for scalability", "Technology debt slowing down innovation", "Lack of in-house technical expertise"]',
  -- Solution
  '["Technology strategy and roadmap development", "Enterprise architecture assessment and design", "Vendor evaluation and selection support", "Technology due diligence for M&A", "CTO-as-a-Service for growing companies", "Technical feasibility assessments", "Build vs buy analysis", "Technology governance framework"]',
  -- Deliverables
  '["Technology strategy document", "Multi-year technology roadmap", "Architecture diagrams and documentation", "Vendor evaluation matrix", "Technical risk assessment", "Budget planning guidance", "Governance framework", "Executive presentations"]',
  -- Business Outcomes
  '["Aligned technology and business strategy", "Better ROI on technology investments", "Reduced technology risk", "Clear priorities and roadmap", "Confident technology decisions", "Avoided costly mistakes", "Access to senior-level expertise"]',
  -- FAQ
  '[
    {
      "question": "When should we engage a technology consultant?",
      "answer": "During major technology decisions, rapid growth, M&A activity, digital transformation, or when your internal team needs specialized expertise."
    },
    {
      "question": "How is consulting different from other services?",
      "answer": "Consulting is advisory—we help you make decisions and plan. Other services are implementation—we build and deploy solutions. Often they work together."
    },
    {
      "question": "What if we disagree with recommendations?",
      "answer": "We present options with trade-offs, not mandates. You make the final decisions. Our job is to ensure you have the information to choose wisely."
    },
    {
      "question": "Can you supplement our internal team?",
      "answer": "Yes. Many clients use us as an extension of their team for specialized expertise, strategic planning, or during peak periods."
    }
  ]'
);

-- =====================================================
-- INDUSTRIES INSERT (6 Industries)
-- =====================================================

-- 1. Real Estate
INSERT INTO "IndustryPage" (
  id, name, slug, industry, description, published, "displayOrder",
  "createdAt", "updatedAt",
  challenges, solutions, "relevantServices", faq
) VALUES (
  'ind_real_estate',
  'Real Estate',
  'real-estate',
  'REAL_ESTATE',
  'Technology solutions for real estate companies, property management firms, and real estate investment trusts. We help modernize operations, improve tenant experiences, and leverage data for better decisions.',
  true,
  1,
  NOW(),
  NOW(),
  -- Challenges
  '["Manual property listing and management processes", "Disconnected systems for tenants, leases, and maintenance", "Limited visibility into property performance", "Inefficient maintenance request handling", "Paper-based lease and contract management", "Difficulty analyzing market trends and pricing"]',
  -- Solutions
  '["Property management system implementation and integration", "Tenant portal for self-service requests and payments", "Automated lease management and renewals", "Maintenance workflow automation", "Real estate analytics and reporting dashboards", "Virtual tour and digital marketing tools", "Document management and e-signature integration"]',
  -- Relevant Services
  '["Digital Transformation", "Business Automation", "Custom Software Development", "Data Analytics", "Cloud Solutions", "AI & Machine Learning"]',
  -- FAQ
  '[
    {
      "question": "How can technology improve tenant satisfaction?",
      "answer": "Tenant portals allow self-service maintenance requests, online payments, and real-time communication, leading to faster response times and better experiences."
    },
    {
      "question": "Can you integrate with our existing property management system?",
      "answer": "Yes. We work with major platforms like Yardi, AppFolio, and Buildium, as well as custom systems, to create integrated workflows."
    },
    {
      "question": "What ROI can we expect?",
      "answer": "Typical outcomes include 30-40% reduction in administrative time, faster lease cycles, improved tenant retention, and better property performance visibility."
    }
  ]'
);

-- 2. Construction
INSERT INTO "IndustryPage" (
  id, name, slug, industry, description, published, "displayOrder",
  "createdAt", "updatedAt",
  challenges, solutions, "relevantServices", faq
) VALUES (
  'ind_construction',
  'Construction',
  'construction',
  'CONSTRUCTION',
  'Technology consulting for construction companies, contractors, and engineering firms. We help streamline project management, improve field operations, and enhance collaboration.',
  true,
  2,
  NOW(),
  NOW(),
  -- Challenges
  '["Project delays due to coordination issues", "Paper-based plans and change orders", "Difficulty tracking equipment and materials", "Limited real-time visibility from job sites", "Safety compliance and incident reporting", "Budget overruns and poor cost tracking"]',
  -- Solutions
  '["Construction project management software implementation", "Mobile apps for field teams and inspections", "BIM (Building Information Modeling) integration", "Equipment tracking and maintenance systems", "Document management and version control", "Real-time job costing and budget tracking", "Safety management and compliance tools"]',
  -- Relevant Services
  '["Digital Transformation", "Custom Software Development", "Business Automation", "Cloud Solutions", "Data Analytics", "Cybersecurity"]',
  -- FAQ
  '[
    {
      "question": "Will technology work in harsh field conditions?",
      "answer": "Yes. We recommend rugged devices and offline-capable apps that sync when connectivity is available, ensuring reliability on job sites."
    },
    {
      "question": "How do we get field workers to adopt new technology?",
      "answer": "We focus on simple, intuitive tools that make their jobs easier. Training and change management are built into implementation."
    },
    {
      "question": "Can we track project costs in real-time?",
      "answer": "Absolutely. Modern construction management systems provide real-time cost tracking, helping you catch budget issues before they become problems."
    }
  ]'
);

-- 3. Logistics & Transportation
INSERT INTO "IndustryPage" (
  id, name, slug, industry, description, published, "displayOrder",
  "createdAt", "updatedAt",
  challenges, solutions, "relevantServices", faq
) VALUES (
  'ind_logistics',
  'Logistics & Transportation',
  'logistics',
  'LOGISTICS',
  'Technology solutions for logistics companies, freight forwarders, and transportation providers. We help optimize routes, improve tracking, and enhance supply chain visibility.',
  true,
  3,
  NOW(),
  NOW(),
  -- Challenges
  '["Manual dispatch and route planning", "Limited shipment visibility for customers", "Paper-based proof of delivery", "Inefficient warehouse operations", "Fleet maintenance tracking challenges", "Difficulty optimizing routes and reducing fuel costs"]',
  -- Solutions
  '["Transportation Management System (TMS) implementation", "Real-time GPS tracking and customer notifications", "Route optimization and dispatch automation", "Warehouse Management System (WMS) integration", "Mobile apps for drivers and warehouse staff", "Predictive maintenance for fleet management", "Supply chain analytics and reporting"]',
  -- Relevant Services
  '["Digital Transformation", "Business Automation", "AI & Machine Learning", "Data Analytics", "Cloud Solutions", "Custom Software Development"]',
  -- FAQ
  '[
    {
      "question": "How can AI improve logistics operations?",
      "answer": "AI can optimize routes, predict delivery times, forecast demand, and identify maintenance needs before vehicles break down."
    },
    {
      "question": "Will customers get real-time tracking?",
      "answer": "Yes. We implement tracking portals and automated notifications so customers always know where their shipments are."
    },
    {
      "question": "Can technology reduce fuel costs?",
      "answer": "Absolutely. Route optimization can reduce fuel consumption by 10-20%, and predictive maintenance prevents costly breakdowns."
    }
  ]'
);

-- 4. Hospitality
INSERT INTO "IndustryPage" (
  id, name, slug, industry, description, published, "displayOrder",
  "createdAt", "updatedAt",
  challenges, solutions, "relevantServices", faq
) VALUES (
  'ind_hospitality',
  'Hospitality',
  'hospitality',
  'HOSPITALITY',
  'Technology consulting for hotels, restaurants, resorts, and hospitality groups. We help enhance guest experiences, streamline operations, and increase revenue.',
  true,
  4,
  NOW(),
  NOW(),
  -- Challenges
  '["Fragmented guest data across systems", "Manual booking and reservation processes", "Inconsistent guest experiences", "Operational inefficiencies in housekeeping and maintenance", "Limited guest communication and personalization", "Revenue management and pricing optimization"]',
  -- Solutions
  '["Hotel Property Management System (PMS) implementation", "Online booking engine and channel management", "Guest relationship management (CRM)", "Mobile guest services and digital check-in", "Housekeeping and maintenance automation", "Revenue management and dynamic pricing", "Guest feedback and reputation management"]',
  -- Relevant Services
  '["Digital Transformation", "Custom Software Development", "AI & Machine Learning", "Business Automation", "Data Analytics", "Cloud Solutions"]',
  -- FAQ
  '[
    {
      "question": "How can technology improve guest satisfaction?",
      "answer": "Digital services, personalized communications, and fast response times create memorable experiences that drive positive reviews and repeat bookings."
    },
    {
      "question": "Can AI help with pricing?",
      "answer": "Yes. AI analyzes demand patterns, competitor pricing, and events to recommend optimal rates that maximize revenue and occupancy."
    },
    {
      "question": "What about online reputation management?",
      "answer": "We implement systems that monitor reviews, automate responses, and track sentiment to help you maintain a strong online presence."
    }
  ]'
);

-- 5. Professional Services
INSERT INTO "IndustryPage" (
  id, name, slug, industry, description, published, "displayOrder",
  "createdAt", "updatedAt",
  challenges, solutions, "relevantServices", faq
) VALUES (
  'ind_professional_services',
  'Professional Services',
  'professional-services',
  'PROFESSIONAL_SERVICES',
  'Technology for consulting firms, law firms, accounting practices, and professional service organizations. We help improve billability, client management, and project delivery.',
  true,
  5,
  NOW(),
  NOW(),
  -- Challenges
  '["Inefficient time tracking and billing", "Document management and version control", "Limited visibility into project profitability", "Manual client onboarding processes", "Disconnected communication and collaboration", "Difficulty scaling without adding overhead"]',
  -- Solutions
  '["Practice management software implementation", "Automated time tracking and billing systems", "Client portal and secure document sharing", "Project profitability tracking and reporting", "Workflow automation for recurring processes", "Knowledge management systems", "Client relationship management (CRM)"]',
  -- Relevant Services
  '["Business Automation", "Custom Software Development", "Cloud Solutions", "Data Analytics", "Digital Transformation", "Cybersecurity"]',
  -- FAQ
  '[
    {
      "question": "How can we improve billable utilization?",
      "answer": "Automated time tracking, reduced administrative tasks, and clear project visibility help teams focus more time on billable work."
    },
    {
      "question": "Is our client data secure?",
      "answer": "Yes. We implement enterprise-grade security including encryption, access controls, and compliance with industry standards."
    },
    {
      "question": "Can we customize workflows to our practice?",
      "answer": "Absolutely. Every firm has unique processes. We tailor solutions to match how you actually work."
    }
  ]'
);

-- 6. Growing Enterprises
INSERT INTO "IndustryPage" (
  id, name, slug, industry, description, published, "displayOrder",
  "createdAt", "updatedAt",
  challenges, solutions, "relevantServices", faq
) VALUES (
  'ind_growing_enterprises',
  'Growing Enterprises',
  'growing-enterprises',
  'GROWING_ENTERPRISES',
  'Strategic technology guidance for rapidly growing companies. We help scale operations, build technology foundations, and support sustainable growth.',
  true,
  6,
  NOW(),
  NOW(),
  -- Challenges
  '["Technology not keeping pace with growth", "Outgrowing current systems and processes", "Lack of technology strategy and roadmap", "Adding headcount faster than building systems", "Need CTO-level guidance without full-time hire", "Scaling infrastructure and operations"]',
  -- Solutions
  '["CTO-as-a-Service for strategic technology leadership", "Technology roadmap aligned with growth plans", "Scalable system architecture design", "Process documentation and automation", "Team structure and hiring guidance", "Vendor selection and management", "Technology budget planning and optimization"]',
  -- Relevant Services
  '["Technology Consulting", "Digital Transformation", "Cloud Solutions", "Business Automation", "Custom Software Development", "Data Analytics"]',
  -- FAQ
  '[
    {
      "question": "When should we hire a full-time CTO?",
      "answer": "Typically when you reach 50-100 employees or your technology complexity demands dedicated leadership. Until then, fractional CTO services often provide better value."
    },
    {
      "question": "How do we build scalable systems from the start?",
      "answer": "We help you design architecture that can grow with you, avoiding the need for expensive rebuilds as you scale."
    },
    {
      "question": "What if our current systems are holding us back?",
      "answer": "We assess what can be improved versus replaced, creating a phased approach that maintains business continuity while modernizing."
    }
  ]'
);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check Services (should show 8)
SELECT id, name, slug, published FROM "Service" ORDER BY "displayOrder";

-- Check Industries (should show 6)
SELECT id, name, slug, published FROM "IndustryPage" ORDER BY "displayOrder";

-- =====================================================
-- SUCCESS!
-- All service pages (/services/*) and industry pages
-- (/industries/*) will now work!
-- =====================================================
