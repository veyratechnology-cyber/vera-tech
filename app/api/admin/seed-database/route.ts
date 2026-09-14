// EMERGENCY DATABASE SEEDER
// Visit: https://vera-tech.vercel.app/api/admin/seed-database
// This will insert ALL data directly into production database

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Industry } from "@prisma/client";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const results: any = {
      timestamp: new Date().toISOString(),
      operations: [],
    };

    // DELETE existing data
    try {
      await prisma.service.deleteMany({});
      results.operations.push("✅ Deleted existing services");
      
      await prisma.industryPage.deleteMany({});
      results.operations.push("✅ Deleted existing industries");
    } catch (error) {
      results.operations.push(`⚠️ Delete warning: ${error}`);
    }

    // INSERT SERVICES (8 services matching your app)
    const services = [
      {
        id: 'srv_technology_strategy',
        name: 'Technology Strategy',
        slug: 'technology-strategy',
        description: 'Build practical roadmaps that align with your business goals and budget. We help you prioritize technology investments and create clear paths forward.',
        published: true,
        displayOrder: 1,
        problem: '["Technology decisions not aligned with business strategy", "Unsure which investments to prioritize", "Lack of long-term technology roadmap", "Difficulty evaluating multiple vendors", "Technology debt slowing innovation"]',
        solution: '["Comprehensive technology assessment", "Strategic roadmap development", "Vendor evaluation and selection", "Architecture planning", "Investment prioritization", "Risk assessment"]',
        deliverables: '["Technology strategy document", "3-year technology roadmap", "Investment priorities", "Vendor recommendations", "Architecture guidelines", "Implementation plan"]',
        businessOutcomes: '["Aligned technology and business goals", "Clear investment priorities", "Reduced technology risk", "Better ROI on technology spend", "Confident decision-making"]',
        faq: '[{"question":"How long does strategy development take?","answer":"Typically 4-6 weeks including stakeholder interviews, analysis, and roadmap creation."}, {"question":"What if our needs change?","answer":"We build flexible roadmaps that can adapt. We recommend quarterly reviews to adjust priorities."}]'
      },
      {
        id: 'srv_ai_consulting',
        name: 'AI Consulting',
        slug: 'ai-consulting',
        description: 'Cut through the AI hype. Find where AI creates real, measurable value for your business. We help you identify practical use cases and implement solutions that deliver ROI.',
        published: true,
        displayOrder: 2,
        problem: '["Overwhelmed by AI hype - unsure where to start", "Dont know which AI use cases fit your business", "Concerned about AI costs and complexity", "Need to show ROI before major investment", "Want practical AI not bleeding edge experiments"]',
        solution: '["AI readiness assessment", "Use case identification workshop", "Proof of concept development", "ROI analysis and projections", "Vendor and tool selection", "Implementation roadmap", "Responsible AI framework"]',
        deliverables: '["AI opportunity assessment", "Prioritized use case list", "Working proof of concept", "ROI projections", "Implementation roadmap", "Vendor recommendations", "Risk mitigation plan"]',
        businessOutcomes: '["Clear AI strategy grounded in business value", "Proven concept before large investment", "40-60% reduction in targeted repetitive tasks", "Data-driven decision making", "Competitive advantage through automation"]',
        faq: '[{"question":"Do we need big data for AI?","answer":"Not necessarily. Many practical AI applications work with modest datasets. We assess what you have."}, {"question":"How long before we see ROI?","answer":"Proof of concepts show value in 4-8 weeks. Full implementations typically show ROI within 6-12 months."}]'
      },
      {
        id: 'srv_business_automation',
        name: 'Business Process Automation',
        slug: 'business-automation',
        description: 'Intelligent automation that eliminates repetitive work and improves operational efficiency. Free your team to focus on high-value activities.',
        published: true,
        displayOrder: 3,
        problem: '["Team spending hours on repetitive data entry", "Manual approval processes causing delays", "Copy-paste between different systems", "Email overwhelm and manual sorting", "Human errors in routine processes", "Reports taking too long to generate"]',
        solution: '["Process mapping and automation opportunities", "Workflow automation implementation", "RPA for legacy system integration", "Document processing automation", "Email and notification automation", "Report generation automation", "Integration between disconnected systems"]',
        deliverables: '["Process documentation", "Automation roadmap", "Implemented workflows", "System integrations", "Automated reports", "User training", "ROI tracking dashboard"]',
        businessOutcomes: '["50-80% reduction in manual task time", "Faster processing for routine operations", "Reduced errors from automation", "Employees freed for strategic work", "Consistent process execution", "Measurable cost savings"]',
        faq: '[{"question":"Which processes should we automate first?","answer":"We help prioritize based on frequency, time consumed, error rate, and business impact."}, {"question":"How quickly can we see results?","answer":"Simple automations in days. Complex workflows in 2-4 weeks. ROI is typically immediate."}]'
      },
      {
        id: 'srv_digital_transformation',
        name: 'Digital Transformation',
        slug: 'digital-transformation',
        description: 'Comprehensive digital transformation that modernizes operations and creates new business capabilities. Transform how you work without disrupting your business.',
        published: true,
        displayOrder: 4,
        problem: '["Legacy systems limiting growth and agility", "Disconnected tools creating data silos", "Manual processes consuming resources", "Difficulty adapting to market changes", "High operational costs", "Poor customer experience"]',
        solution: '["Digital maturity assessment", "Transformation strategy and roadmap", "Modern system architecture design", "Process reengineering", "Change management program", "Technology implementation", "Continuous improvement framework"]',
        deliverables: '["Digital transformation strategy", "12-36 month roadmap", "Architecture blueprints", "Process redesigns", "Implementation plan", "Change management program", "Success metrics framework"]',
        businessOutcomes: '["50-70% reduction in manual work", "Improved data accuracy and insights", "Increased operational efficiency", "Enhanced customer experience", "Reduced IT costs", "Faster time to market", "Better team collaboration"]',
        faq: '[{"question":"How long does transformation take?","answer":"Typically 6-18 months in phases. You see value quickly while building toward the complete vision."}, {"question":"Will this disrupt operations?","answer":"We design phased approaches to minimize disruption with thorough testing and support."}]'
      },
      {
        id: 'srv_software_systems',
        name: 'Software & Systems Advisory',
        slug: 'software-systems',
        description: 'Expert guidance on software selection, implementation, and optimization. Build or buy the right technology where your requirements cannot be met by existing systems.',
        published: true,
        displayOrder: 5,
        problem: '["Off-the-shelf software doesnt fit unique needs", "Considering build vs buy decision", "Need to integrate multiple systems", "Evaluating complex software vendors", "Implementation projects failing", "Systems not delivering expected value"]',
        solution: '["Requirements analysis", "Build vs buy assessment", "Vendor evaluation and RFP management", "Implementation planning", "System integration design", "Custom development when needed", "Optimization and training"]',
        deliverables: '["Requirements specification", "Build vs buy analysis", "Vendor comparison matrix", "Implementation roadmap", "Integration architecture", "Custom development if needed", "Training program"]',
        businessOutcomes: '["Right software for your specific needs", "Avoided costly mistakes", "Successful implementations", "Integrated systems and workflows", "Maximized software ROI", "Confident technology decisions"]',
        faq: '[{"question":"When should we build vs buy?","answer":"Build when competitive advantage requires unique capabilities. Buy when good solutions exist. We help you decide."}, {"question":"How do you evaluate vendors?","answer":"We assess functionality, cost, scalability, support, and long-term viability against your requirements."}]'
      },
      {
        id: 'srv_technology_advisory',
        name: 'Technology Advisory Services',
        slug: 'technology-advisory',
        description: 'Ongoing technology advisory and fractional CTO services for growing organizations. Get senior technical leadership without full-time cost.',
        published: true,
        displayOrder: 6,
        problem: '["Growing fast but lack technology leadership", "Technology decisions need expert input", "Need CTO-level guidance part-time", "Building technical team and need direction", "Technology strategy disconnected from business", "Ad-hoc technology approach creating issues"]',
        solution: '["Fractional CTO services", "Technology strategy and planning", "Architecture review and guidance", "Team building and mentorship", "Vendor management", "Technical due diligence", "Board-level technology reporting"]',
        deliverables: '["Regular strategy sessions", "Technology roadmap", "Architecture decisions", "Team development plan", "Vendor relationships", "Board reports", "On-demand technical guidance"]',
        businessOutcomes: '["Access to senior technology expertise", "Aligned technology strategy", "Better technology decisions", "Strong technical team", "Reduced technology risk", "Cost-effective vs full-time CTO"]',
        faq: '[{"question":"When should we hire a full-time CTO?","answer":"Typically at 50-100 employees or when complexity demands dedicated leadership. Until then, fractional provides better value."}, {"question":"How much time commitment?","answer":"Typically 1-2 days per week, flexible based on your needs and stage of growth."}]'
      },
      {
        id: 'srv_cloud_solutions',
        name: 'Cloud Solutions',
        slug: 'cloud-solutions',
        description: 'Migrate to cloud and leverage modern infrastructure for better performance, security, and cost efficiency. Move to AWS, Azure, or Google Cloud with zero downtime.',
        published: true,
        displayOrder: 7,
        problem: '["High infrastructure costs", "Limited scalability", "Difficulty maintaining hardware", "Security concerns", "Complex disaster recovery", "Remote work challenges"]',
        solution: '["Cloud readiness assessment", "Migration planning", "Zero-downtime migration", "Architecture design", "Security implementation", "Cost optimization", "Ongoing management"]',
        deliverables: '["Cloud strategy", "Migration roadmap", "Architecture design", "Security documentation", "Deployment automation", "Monitoring setup", "Cost optimization plan"]',
        businessOutcomes: '["30-50% infrastructure cost reduction", "99.9%+ uptime", "Flexible scaling", "Enhanced security", "Faster deployments", "Global accessibility", "Automated backups"]',
        faq: '[{"question":"Which cloud provider?","answer":"AWS for breadth, Azure for Microsoft integration, Google Cloud for analytics. We help you choose."}, {"question":"How long does migration take?","answer":"Simple: 2-4 weeks. Complex: 3-6 months. We break it into phases."}]'
      },
      {
        id: 'srv_cybersecurity',
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        description: 'Protect your business from cyber threats with comprehensive security assessments and implementation. Build robust security that safeguards operations.',
        published: true,
        displayOrder: 8,
        problem: '["Growing cyber threats", "Lack of security visibility", "Compliance requirements", "Employee awareness gaps", "No incident response plan", "Outdated security tools"]',
        solution: '["Security assessment", "Architecture design", "Multi-layer defense", "Employee training", "Incident response planning", "24/7 monitoring", "Compliance implementation"]',
        deliverables: '["Security assessment report", "Remediation plan", "Architecture documentation", "Security configuration", "Policies and procedures", "Training materials", "Incident playbook"]',
        businessOutcomes: '["Reduced breach risk", "Regulatory compliance", "Protected data", "Improved awareness", "Faster threat response", "Leadership confidence", "Lower insurance costs"]',
        faq: '[{"question":"Are we too small to be targeted?","answer":"No. 43% of attacks target small businesses due to weaker defenses."}, {"question":"How much to spend?","answer":"Typically 5-15% of IT budget depending on industry and risk."}]'
      }
    ];

    for (const service of services) {
      await prisma.service.create({ data: service });
    }
    results.operations.push(`✅ Inserted ${services.length} services`);

    // INSERT INDUSTRIES (6 industries)
    const industries = [
      {
        id: 'ind_real_estate',
        name: 'Real Estate',
        slug: 'real-estate',
        industry: Industry.REAL_ESTATE,
        description: 'Technology solutions for real estate companies, property management firms, and REITs. Modernize operations, improve tenant experiences, and leverage data.',
        published: true,
        displayOrder: 1,
        challenges: '["Manual property management", "Disconnected tenant systems", "Limited performance visibility", "Inefficient maintenance", "Paper-based leases", "Difficulty analyzing market trends"]',
        solutions: '["Property management system implementation", "Tenant self-service portals", "Automated lease management", "Maintenance workflow automation", "Real estate analytics", "Virtual tours", "Document management"]',
        relevantServices: '["Digital Transformation", "Business Process Automation", "Software & Systems Advisory", "Data Analytics", "Cloud Solutions"]',
        faq: '[{"question":"How can technology improve tenant satisfaction?","answer":"Self-service portals for maintenance requests, online payments, and real-time communication lead to faster response."}, {"question":"What ROI can we expect?","answer":"Typical: 30-40% reduction in admin time, faster lease cycles, improved retention."}]'
      },
      {
        id: 'ind_construction',
        name: 'Construction',
        slug: 'construction',
        industry: Industry.CONSTRUCTION,
        description: 'Technology consulting for construction companies, contractors, and engineering firms. Streamline project management and improve field operations.',
        published: true,
        displayOrder: 2,
        challenges: '["Project coordination delays", "Paper-based plans", "Equipment tracking difficulties", "Limited job site visibility", "Safety compliance issues", "Budget overruns"]',
        solutions: '["Project management software", "Mobile apps for field teams", "BIM integration", "Equipment tracking systems", "Document management", "Real-time job costing", "Safety management tools"]',
        relevantServices: '["Digital Transformation", "Software & Systems Advisory", "Business Process Automation", "Cloud Solutions"]',
        faq: '[{"question":"Will technology work in harsh conditions?","answer":"Yes. We recommend rugged devices and offline-capable apps that sync when connected."}, {"question":"Can we track costs in real-time?","answer":"Absolutely. Modern systems provide real-time cost tracking."}]'
      },
      {
        id: 'ind_logistics',
        name: 'Logistics & Transportation',
        slug: 'logistics',
        industry: Industry.LOGISTICS_TRANSPORT,
        description: 'Technology for logistics companies and transportation providers. Optimize routes, improve tracking, and enhance supply chain visibility.',
        published: true,
        displayOrder: 3,
        challenges: '["Manual dispatch planning", "Limited shipment visibility", "Paper-based delivery proof", "Inefficient warehouses", "Fleet maintenance challenges", "Route optimization difficulties"]',
        solutions: '["TMS implementation", "Real-time GPS tracking", "Route optimization", "WMS integration", "Driver mobile apps", "Predictive maintenance", "Supply chain analytics"]',
        relevantServices: '["Digital Transformation", "Business Process Automation", "AI Consulting", "Data Analytics", "Cloud Solutions"]',
        faq: '[{"question":"How can AI improve logistics?","answer":"AI optimizes routes, predicts delivery times, forecasts demand, and identifies maintenance needs."}, {"question":"Can technology reduce fuel costs?","answer":"Yes. Route optimization can reduce fuel consumption by 10-20%."}]'
      },
      {
        id: 'ind_hospitality',
        name: 'Hospitality',
        slug: 'hospitality',
        industry: Industry.HOSPITALITY,
        description: 'Technology for hotels, restaurants, and resorts. Enhance guest experiences, streamline operations, and increase revenue.',
        published: true,
        displayOrder: 4,
        challenges: '["Fragmented guest data", "Manual bookings", "Inconsistent experiences", "Operational inefficiencies", "Limited personalization", "Pricing optimization difficulties"]',
        solutions: '["PMS implementation", "Online booking engine", "Guest CRM", "Mobile guest services", "Housekeeping automation", "Revenue management", "Reputation management"]',
        relevantServices: '["Digital Transformation", "Software & Systems Advisory", "AI Consulting", "Business Process Automation", "Cloud Solutions"]',
        faq: '[{"question":"How can technology improve guest satisfaction?","answer":"Digital services, personalization, and fast response times create memorable experiences."}, {"question":"Can AI help with pricing?","answer":"Yes. AI analyzes demand, competitors, and events to recommend optimal rates."}]'
      },
      {
        id: 'ind_professional_services',
        name: 'Professional Services',
        slug: 'professional-services',
        industry: Industry.PROFESSIONAL_SERVICES,
        description: 'Technology for consulting firms, law firms, and accounting practices. Improve billability, client management, and project delivery.',
        published: true,
        displayOrder: 5,
        challenges: '["Inefficient time tracking", "Document version control", "Limited profitability visibility", "Manual client onboarding", "Disconnected collaboration", "Scaling difficulties"]',
        solutions: '["Practice management software", "Automated time tracking", "Client portals", "Project profitability tracking", "Workflow automation", "Knowledge management", "CRM implementation"]',
        relevantServices: '["Business Process Automation", "Software & Systems Advisory", "Cloud Solutions", "Digital Transformation"]',
        faq: '[{"question":"How to improve billable utilization?","answer":"Automated time tracking and reduced admin tasks help teams focus on billable work."}, {"question":"Is client data secure?","answer":"Yes. We implement enterprise-grade security with encryption and access controls."}]'
      },
      {
        id: 'ind_growing_enterprises',
        name: 'Growing Enterprises',
        slug: 'growing-enterprises',
        industry: Industry.OTHER,
        description: 'Strategic technology guidance for rapidly growing companies. Scale operations, build foundations, and support sustainable growth.',
        published: true,
        displayOrder: 6,
        challenges: '["Technology not keeping pace", "Outgrowing current systems", "Lack of technology strategy", "Headcount outpacing systems", "Need CTO guidance", "Scaling infrastructure"]',
        solutions: '["CTO-as-a-Service", "Technology roadmap", "Scalable architecture", "Process documentation", "Team building guidance", "Vendor management", "Budget planning"]',
        relevantServices: '["Technology Advisory Services", "Digital Transformation", "Cloud Solutions", "Business Process Automation", "Software & Systems Advisory"]',
        faq: '[{"question":"When to hire full-time CTO?","answer":"Typically at 50-100 employees or when complexity demands dedicated leadership."}, {"question":"How to build scalable systems?","answer":"We design architecture that grows with you, avoiding expensive rebuilds."}]'
      }
    ];

    for (const industry of industries) {
      await prisma.industryPage.create({ data: industry });
    }
    results.operations.push(`✅ Inserted ${industries.length} industries`);

    // Verify counts
    const serviceCount = await prisma.service.count();
    const industryCount = await prisma.industryPage.count();
    
    results.operations.push(`✅ Verified: ${serviceCount} services in database`);
    results.operations.push(`✅ Verified: ${industryCount} industries in database`);
    
    results.success = true;
    results.summary = {
      servicesInserted: services.length,
      industriesInserted: industries.length,
      totalRecords: services.length + industries.length
    };

    return NextResponse.json(results, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to seed database",
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

// Allow GET for testing (will show instructions)
export async function GET() {
  return NextResponse.json({
    message: "Database Seeder Endpoint",
    instructions: "Send a POST request to this endpoint to seed the database with all services and industries",
    warning: "This will DELETE existing data and insert fresh data",
    usage: "POST /api/admin/seed-database",
    note: "Data includes 8 services and 6 industries with full content"
  });
}
