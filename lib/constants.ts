// Admin CRM Constants

export const LEAD_STATUSES = [
  { value: "NEW", label: "New", color: "blue" },
  { value: "CONTACTED", label: "Contacted", color: "purple" },
  { value: "QUALIFIED", label: "Qualified", color: "green" },
  { value: "CONSULTATION", label: "Consultation", color: "orange" },
  { value: "PROPOSAL", label: "Proposal", color: "indigo" },
  { value: "NEGOTIATION", label: "Negotiation", color: "yellow" },
  { value: "WON", label: "Won", color: "success" },
  { value: "LOST", label: "Lost", color: "error" },
  { value: "NURTURE", label: "Nurture", color: "gray" },
];

export const LEAD_SOURCES = [
  { value: "WEBSITE", label: "Website" },
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Phone" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "REFERRAL", label: "Referral" },
  { value: "EVENT", label: "Event" },
  { value: "DIRECT_OUTREACH", label: "Direct Outreach" },
  { value: "OTHER", label: "Other" },
];

export const PROSPECT_STATUSES = [
  { value: "NOT_CONTACTED", label: "Not Contacted", color: "gray" },
  { value: "EMAIL_SENT", label: "Email Sent", color: "blue" },
  { value: "CALL_MADE", label: "Call Made", color: "purple" },
  { value: "REPLIED", label: "Replied", color: "green" },
  { value: "MEETING", label: "Meeting", color: "orange" },
  { value: "QUALIFIED", label: "Qualified", color: "success" },
  { value: "FOLLOW_UP", label: "Follow Up", color: "yellow" },
  { value: "NOT_INTERESTED", label: "Not Interested", color: "error" },
  { value: "CONVERTED", label: "Converted", color: "success" },
];

export const CONSULTATION_STATUSES = [
  { value: "NEW", label: "New", color: "blue" },
  { value: "REVIEWING", label: "Reviewing", color: "purple" },
  { value: "CONTACTED", label: "Contacted", color: "orange" },
  { value: "SCHEDULED", label: "Scheduled", color: "yellow" },
  { value: "COMPLETED", label: "Completed", color: "success" },
  { value: "CANCELLED", label: "Cancelled", color: "error" },
  { value: "CONVERTED", label: "Converted", color: "success" },
  { value: "NO_SHOW", label: "No Show", color: "error" },
];

export const CONSULTATION_TYPES = [
  { value: "AI_ADOPTION", label: "AI Adoption" },
  { value: "AI_STRATEGY", label: "AI Strategy" },
  { value: "BUSINESS_AUTOMATION", label: "Business Automation" },
  { value: "DIGITAL_TRANSFORMATION", label: "Digital Transformation" },
  { value: "TECHNOLOGY_STRATEGY", label: "Technology Strategy" },
  { value: "SOFTWARE_DEVELOPMENT", label: "Software / System Development" },
  { value: "TECHNOLOGY_AUDIT", label: "Technology Audit" },
  { value: "DATA_ANALYTICS", label: "Data & Analytics" },
  { value: "CYBERSECURITY", label: "Cybersecurity" },
  { value: "BUSINESS_PROCESS_OPTIMIZATION", label: "Business Process Optimization" },
  { value: "CUSTOM_SOLUTION", label: "Custom Technology Solution" },
  { value: "OTHER", label: "Other" },
];

export const MEETING_TYPES = [
  { value: "GOOGLE_MEET", label: "Google Meet", icon: "Video" },
  { value: "PHONE", label: "Phone Call", icon: "Phone" },
  { value: "IN_PERSON", label: "In-Person Meeting", icon: "MapPin" },
];

export const CONSULTATION_OUTCOMES = [
  { value: "PROPOSAL_REQUIRED", label: "Proposal Required" },
  { value: "FOLLOW_UP_MEETING", label: "Follow-up Meeting" },
  { value: "ASSESSMENT_REQUIRED", label: "Technology Assessment Required" },
  { value: "SEND_QUOTATION", label: "Send Quotation" },
  { value: "IMPLEMENTATION_OPPORTUNITY", label: "Implementation Opportunity" },
  { value: "CLIENT_NOT_READY", label: "Client Not Ready" },
  { value: "NOT_QUALIFIED", label: "Not Qualified" },
  { value: "COMPLETED", label: "Completed" },
  { value: "OTHER", label: "Other" },
];

export const PREFERRED_CONTACT_METHODS = [
  { value: "EMAIL", label: "Email" },
  { value: "PHONE", label: "Phone" },
  { value: "WHATSAPP", label: "WhatsApp" },
];

export const PROPOSAL_STATUSES = [
  { value: "DRAFT", label: "Draft", color: "gray" },
  { value: "SENT", label: "Sent", color: "blue" },
  { value: "VIEWED", label: "Viewed", color: "purple" },
  { value: "ACCEPTED", label: "Accepted", color: "success" },
  { value: "REJECTED", label: "Rejected", color: "error" },
  { value: "EXPIRED", label: "Expired", color: "gray" },
];

export const PROJECT_STATUSES = [
  { value: "PLANNING", label: "Planning", color: "blue" },
  { value: "ACTIVE", label: "Active", color: "success" },
  { value: "ON_HOLD", label: "On Hold", color: "yellow" },
  { value: "COMPLETED", label: "Completed", color: "success" },
  { value: "CANCELLED", label: "Cancelled", color: "error" },
];

export const PROJECT_STAGES = [
  { value: "DISCOVERY", label: "Discovery" },
  { value: "ASSESSMENT", label: "Assessment" },
  { value: "STRATEGY", label: "Strategy" },
  { value: "DESIGN", label: "Design" },
  { value: "IMPLEMENTATION", label: "Implementation" },
  { value: "TESTING", label: "Testing" },
  { value: "DEPLOYMENT", label: "Deployment" },
  { value: "OPTIMIZATION", label: "Optimization" },
];

export const PRIORITIES = [
  { value: "LOW", label: "Low", color: "gray" },
  { value: "MEDIUM", label: "Medium", color: "blue" },
  { value: "HIGH", label: "High", color: "orange" },
  { value: "URGENT", label: "Urgent", color: "error" },
];

export const INDUSTRIES = [
  { value: "REAL_ESTATE", label: "Real Estate" },
  { value: "CONSTRUCTION", label: "Construction" },
  { value: "FINANCE", label: "Finance" },
  { value: "BANKING", label: "Banking" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "RETAIL", label: "Retail" },
  { value: "HEALTHCARE", label: "Healthcare" },
  { value: "HOSPITALITY", label: "Hospitality" },
  { value: "EDUCATION", label: "Education" },
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "LOGISTICS_TRANSPORT", label: "Logistics & Transport" },
  { value: "AGRICULTURE", label: "Agriculture" },
  { value: "PROFESSIONAL_SERVICES", label: "Professional Services" },
  { value: "TECHNOLOGY", label: "Technology" },
  { value: "MEDIA_ENTERTAINMENT", label: "Media & Entertainment" },
  { value: "ECOMMERCE", label: "E-commerce" },
  { value: "GOVERNMENT_NGO", label: "Government / NGO" },
  { value: "OTHER", label: "Other" },
];

export const COMPANY_SIZES = [
  { value: "SIZE_1_10", label: "1–10 employees" },
  { value: "SIZE_11_50", label: "11–50 employees" },
  { value: "SIZE_51_100", label: "51–100 employees" },
  { value: "SIZE_101_500", label: "101–500 employees" },
  { value: "SIZE_500_PLUS", label: "500+ employees" },
];

export const SERVICE_AREAS = [
  { value: "TECHNOLOGY_STRATEGY", label: "Technology Strategy" },
  { value: "AI_CONSULTING", label: "AI Consulting" },
  { value: "AUTOMATION", label: "Automation" },
  { value: "DIGITAL_TRANSFORMATION", label: "Digital Transformation" },
  { value: "SOFTWARE_SYSTEMS", label: "Software & Systems" },
  { value: "TECHNOLOGY_ADVISORY", label: "Technology Advisory" },
  { value: "NOT_SURE", label: "Not Sure" },
];

export const INSIGHT_CATEGORIES = [
  { value: "TECHNOLOGY_STRATEGY", label: "Technology Strategy" },
  { value: "ARTIFICIAL_INTELLIGENCE", label: "Artificial Intelligence" },
  { value: "AUTOMATION", label: "Automation" },
  { value: "DIGITAL_TRANSFORMATION", label: "Digital Transformation" },
  { value: "BUSINESS_TECHNOLOGY", label: "Business Technology" },
  { value: "DATA", label: "Data" },
  { value: "CYBERSECURITY", label: "Cybersecurity" },
  { value: "CONSULTING", label: "Consulting" },
];

export const INSIGHT_STATUSES = [
  { value: "DRAFT", label: "Draft", color: "gray" },
  { value: "SCHEDULED", label: "Scheduled", color: "yellow" },
  { value: "PUBLISHED", label: "Published", color: "success" },
  { value: "ARCHIVED", label: "Archived", color: "gray" },
];

// Company Information
export const COMPANY = {
  name: "VeyraTech",
  tagline: "Technology & AI Consulting",
  description: "VeyraTech partners with businesses to design and implement practical technology solutions that drive growth, efficiency, and competitive advantage.",
  email: "contact@veyratech.com",
  phone: "0745247211",
  address: "",
  website: "https://veyratech.com",
};

// Public Navigation
export const PUBLIC_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

// Company Principles
export const PRINCIPLES = [
  {
    title: "Client-Centric",
    description: "Your success is our success. We prioritize understanding your unique challenges and tailoring solutions that deliver real business value.",
  },
  {
    title: "Practical Innovation",
    description: "We blend cutting-edge technology with pragmatic implementation, ensuring solutions that are both innovative and immediately actionable.",
  },
  {
    title: "Transparent Partnership",
    description: "We believe in open communication, clear expectations, and collaborative relationships built on trust and mutual respect.",
  },
  {
    title: "Long-Term Value",
    description: "We focus on sustainable solutions that grow with your business, not quick fixes that require constant replacement.",
  },
];

// Methodology Steps
export const METHODOLOGY = [
  {
    number: "01",
    phase: "Discovery",
    title: "Understanding Your Challenges",
    description: "We begin by deeply understanding your business, challenges, goals, and current technology landscape through collaborative workshops and assessments.",
    details: "We begin by deeply understanding your business, challenges, goals, and current technology landscape through collaborative workshops and assessments.",
    deliverables: ["Current state assessment", "Problem definition", "Opportunity identification"],
  },
  {
    number: "02",
    phase: "Strategy",
    title: "Crafting Your Roadmap",
    description: "We develop a clear, actionable technology strategy aligned with your business objectives, complete with prioritized initiatives and expected outcomes.",
    details: "We develop a clear, actionable technology strategy aligned with your business objectives, complete with prioritized initiatives and expected outcomes.",
    deliverables: ["Technology strategy", "Implementation roadmap", "Business case & ROI analysis"],
  },
  {
    number: "03",
    phase: "Implementation",
    title: "Bringing Solutions to Life",
    description: "We work alongside your team to implement solutions, whether that's AI systems, automation, software development, or process transformation.",
    details: "We work alongside your team to implement solutions, whether that's AI systems, automation, software development, or process transformation.",
    deliverables: ["Solution development", "System integration", "Training & enablement"],
  },
  {
    number: "04",
    phase: "Optimization",
    title: "Continuous Improvement",
    description: "We measure results, gather feedback, and continuously refine solutions to ensure they continue delivering value as your business evolves.",
    details: "We measure results, gather feedback, and continuously refine solutions to ensure they continue delivering value as your business evolves.",
    deliverables: ["Performance monitoring", "Iterative improvements", "Ongoing support"],
  },
];

// Admin Navigation
export const ADMIN_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "LayoutDashboard",
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: "Users",
  },
  {
    label: "Prospects",
    href: "/admin/prospects",
    icon: "UserPlus",
  },
  {
    label: "Consultations",
    href: "/admin/consultations",
    icon: "Calendar",
  },
  {
    label: "Proposals",
    href: "/admin/proposals",
    icon: "FileText",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: "Briefcase",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: "BarChart3",
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: "Wrench",
  },
  {
    label: "Industries",
    href: "/admin/industries",
    icon: "Building2",
  },
  {
    label: "Insights",
    href: "/admin/insights",
    icon: "Lightbulb",
  },
];
