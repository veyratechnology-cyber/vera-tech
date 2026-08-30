import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: "admin@veyratech.com" },
    update: {},
    create: {
      name: "VeyraTech Admin",
      email: "admin@veyratech.com",
      passwordHash: hashedPassword,
      status: "ACTIVE",
    },
  });

  console.log("✅ Created admin user:", admin.email);

  // Create default services
  const services = [
    {
      name: "Technology Strategy",
      slug: "technology-strategy",
      description: "Help organizations understand their current technology environment, identify gaps, prioritize investments and build a practical roadmap.",
      problem: "Many organizations struggle with disconnected systems, unclear technology priorities, and difficulty aligning technology investments with business objectives.",
      solution: "We conduct comprehensive technology assessments, evaluate your current architecture, identify opportunities for improvement, and develop actionable roadmaps that align technology investments with business goals.",
      deliverables: "Technology assessment report, architecture evaluation, investment roadmap, implementation priorities, and strategic recommendations.",
      businessOutcomes: "Clear technology direction, optimized IT investments, reduced technical debt, improved operational efficiency, and alignment between technology and business strategy.",
      published: true,
      displayOrder: 1,
    },
    {
      name: "AI Consulting",
      slug: "ai-consulting",
      description: "Help organizations identify where artificial intelligence can create real business value.",
      problem: "Organizations face uncertainty about where AI can help their business, concerns about implementation complexity, and difficulty separating AI hype from practical applications.",
      solution: "We assess your AI readiness, identify high-value use cases specific to your operations, develop practical AI strategies, and guide responsible implementation focused on measurable business outcomes.",
      deliverables: "AI readiness assessment, use case identification, implementation roadmap, governance framework, and success metrics.",
      businessOutcomes: "Clear AI opportunities, reduced implementation risk, measurable business value, responsible AI adoption, and competitive advantage through intelligent automation.",
      published: true,
      displayOrder: 2,
    },
    {
      name: "Business Automation",
      slug: "business-automation",
      description: "Help organizations eliminate repetitive work and improve workflows.",
      problem: "Manual processes consume valuable time, create bottlenecks, introduce errors, and prevent employees from focusing on higher-value work.",
      solution: "We analyze your workflows, identify automation opportunities, design efficient processes, and implement solutions that eliminate repetitive tasks while improving accuracy and speed.",
      deliverables: "Process analysis, automation opportunities assessment, workflow designs, implementation plan, and integration documentation.",
      businessOutcomes: "Reduced manual work, faster processes, fewer errors, lower operational costs, improved employee satisfaction, and scalable operations.",
      published: true,
      displayOrder: 3,
    },
    {
      name: "Digital Transformation",
      slug: "digital-transformation",
      description: "Help organizations modernize fragmented and inefficient operations.",
      problem: "Legacy systems, disconnected processes, poor data visibility, and resistance to change prevent organizations from operating efficiently in a digital world.",
      solution: "We develop comprehensive transformation strategies that modernize operations, integrate systems, improve data visibility, and guide organizational change while minimizing disruption.",
      deliverables: "Current state assessment, transformation roadmap, change management plan, technology recommendations, and implementation strategy.",
      businessOutcomes: "Modernized operations, integrated systems, better decision-making through improved data, enhanced customer experience, and organizational agility.",
      published: true,
      displayOrder: 4,
    },
    {
      name: "Software & Systems",
      slug: "software-systems",
      description: "Build technology where an organization's requirements cannot be adequately served by existing systems.",
      problem: "Off-the-shelf software often doesn't fit unique business requirements, forcing organizations to adapt their processes or accept operational limitations.",
      solution: "We design and build custom business applications, internal systems, APIs, dashboards, and integrations tailored to your specific requirements and operational needs.",
      deliverables: "Requirements analysis, system design, custom software development, testing documentation, deployment, and ongoing support.",
      businessOutcomes: "Perfect-fit solutions, competitive differentiation, optimized workflows, better user adoption, and long-term operational efficiency.",
      published: true,
      displayOrder: 5,
    },
    {
      name: "Technology Advisory",
      slug: "technology-advisory",
      description: "Provide strategic technical guidance.",
      problem: "Organizations need trusted technical expertise for major technology decisions, vendor evaluations, architecture reviews, and ongoing strategic guidance.",
      solution: "We provide ongoing advisory services including architecture reviews, technology decision support, vendor evaluation, technical due diligence, and strategic planning guidance.",
      deliverables: "Expert recommendations, evaluation frameworks, architecture assessments, risk analyses, and strategic guidance documentation.",
      businessOutcomes: "Confident technology decisions, reduced implementation risk, optimized vendor relationships, sound architecture, and continuous improvement.",
      published: true,
      displayOrder: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  console.log(`✅ Created ${services.length} services`);

  // Create default industries
  const industries = [
    {
      name: "Real Estate",
      slug: "real-estate",
      industry: "REAL_ESTATE",
      description: "Technology solutions for real estate companies, property management, and real estate investment firms.",
      challenges: "Manual property management processes, disconnected systems, poor data visibility, inefficient tenant communication, and difficulty scaling operations.",
      solutions: "Property management automation, tenant portals, data integration, reporting dashboards, document automation, and operational efficiency improvements.",
      published: true,
      displayOrder: 1,
    },
    {
      name: "Construction",
      slug: "construction",
      industry: "CONSTRUCTION",
      description: "Technology solutions for construction companies, contractors, and project management firms.",
      challenges: "Project coordination complexity, disconnected field and office operations, manual reporting, document management challenges, and resource tracking difficulties.",
      solutions: "Project management systems, field-office integration, automated reporting, document management, resource planning tools, and collaboration platforms.",
      published: true,
      displayOrder: 2,
    },
    {
      name: "Logistics",
      slug: "logistics",
      industry: "LOGISTICS",
      description: "Technology solutions for logistics companies, freight forwarders, and supply chain operations.",
      challenges: "Route optimization, real-time tracking, manual coordination, data silos, carrier management, and operational visibility gaps.",
      solutions: "Route optimization, tracking systems, automated coordination, data integration, carrier management platforms, and operational dashboards.",
      published: true,
      displayOrder: 3,
    },
    {
      name: "Hospitality",
      slug: "hospitality",
      industry: "HOSPITALITY",
      description: "Technology solutions for hotels, restaurants, venues, and hospitality groups.",
      challenges: "Guest experience management, reservation coordination, staff scheduling, inventory management, and operational efficiency challenges.",
      solutions: "Guest management systems, reservation automation, staff scheduling tools, inventory systems, feedback management, and operational improvements.",
      published: true,
      displayOrder: 4,
    },
    {
      name: "Professional Services",
      slug: "professional-services",
      industry: "PROFESSIONAL_SERVICES",
      description: "Technology solutions for consulting firms, agencies, legal practices, and professional service organizations.",
      challenges: "Client management, project tracking, time tracking, billing complexity, document management, and collaboration challenges.",
      solutions: "Client management systems, project management tools, time and billing automation, document management, collaboration platforms, and reporting dashboards.",
      published: true,
      displayOrder: 5,
    },
    {
      name: "Growing Enterprises",
      slug: "growing-enterprises",
      industry: "GROWING_ENTERPRISES",
      description: "Technology solutions for rapidly growing businesses across various sectors.",
      challenges: "Scaling operational processes, system integration, data management, automation needs, and technology infrastructure that can't keep pace with growth.",
      solutions: "Scalable systems, process automation, data integration, infrastructure modernization, operational efficiency improvements, and growth-ready technology foundations.",
      published: true,
      displayOrder: 6,
    },
  ];

  for (const industry of industries) {
    await prisma.industryPage.upsert({
      where: { slug: industry.slug },
      update: {},
      create: industry as any,
    });
  }

  console.log(`✅ Created ${industries.length} industry pages`);

  // Create system settings
  const settings = [
    { key: "company_name", value: "VeyraTech", description: "Company name" },
    { key: "company_tagline", value: "Technology & AI Consulting", description: "Company tagline" },
    { key: "company_email", value: "contact@veyratech.com", description: "Primary contact email" },
    { key: "company_phone", value: "0745247211", description: "Primary contact phone" },
    { key: "company_website", value: "https://veyratech.com", description: "Company website URL" },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log(`✅ Created ${settings.length} system settings`);

  console.log("✨ Database seed completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during database seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
