import React from "react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/shared";
import { prisma } from "@/lib/prisma";
import { 
  ArrowRight, 
  Building2, 
  Hammer, 
  Truck, 
  Hotel, 
  Briefcase, 
  TrendingUp 
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve | VeyraTech",
  description: "VeyraTech provides technology and AI consulting services tailored to the unique challenges of specific industries including Real Estate, Construction, Logistics, Hospitality, Professional Services, and Growing Enterprises.",
  keywords: ["industry solutions", "technology consulting", "AI consulting by industry", "digital transformation"],
};

// Force dynamic rendering - disable all static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Hardcoded industries as fallback
const STATIC_INDUSTRIES = [
  { id: '1', name: 'Real Estate', slug: 'real-estate', industry: 'REAL_ESTATE', description: 'Technology consulting for real estate companies.' },
  { id: '2', name: 'Construction', slug: 'construction', industry: 'CONSTRUCTION', description: 'Technology solutions for construction companies.' },
  { id: '3', name: 'Logistics & Transportation', slug: 'logistics', industry: 'LOGISTICS', description: 'Technology consulting for logistics companies.' },
  { id: '4', name: 'Hospitality', slug: 'hospitality', industry: 'HOSPITALITY', description: 'Technology solutions for hospitality businesses.' },
  { id: '5', name: 'Professional Services', slug: 'professional-services', industry: 'PROFESSIONAL_SERVICES', description: 'Technology for professional services firms.' },
  { id: '6', name: 'Growing Enterprises', slug: 'growing-enterprises', industry: 'GROWING_ENTERPRISES', description: 'Strategic technology for growing businesses.' },
];

// Industry icon mapping
const industryIcons: Record<string, React.ReactNode> = {
  "REAL_ESTATE": <Building2 size={32} />,
  "CONSTRUCTION": <Hammer size={32} />,
  "LOGISTICS": <Truck size={32} />,
  "HOSPITALITY": <Hotel size={32} />,
  "PROFESSIONAL_SERVICES": <Briefcase size={32} />,
  "GROWING_ENTERPRISES": <TrendingUp size={32} />,
};

export default async function IndustriesPage() {
  let industries = STATIC_INDUSTRIES;
  
  try {
    const dbIndustries = await prisma.industryPage.findMany({
      where: { published: true },
      orderBy: { displayOrder: "asc" },
    });
    if (dbIndustries && dbIndustries.length > 0) {
      industries = dbIndustries;
    }
  } catch (error) {
    console.error('Database error, using static industries:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 md:py-24 bg-primary text-text-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6 leading-tight">
              Industries We Serve
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
              Technology consulting tailored to the unique challenges, regulations, and opportunities within your industry.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Link 
                key={industry.id} 
                href={`/industries/${industry.slug}`}
                className="group"
              >
                <div className="bg-primary-dark rounded-lg border border-border hover:border-secondary/30 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="p-8">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="text-text-primary">
                          {industryIcons[industry.industry] || <Building2 size={32} />}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h2 className="font-sora font-bold text-xl text-text-primary mb-3 group-hover:text-secondary transition-colors">
                      {industry.name}
                    </h2>
                    <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3">
                      {industry.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center text-secondary font-medium group-hover:gap-2 transition-all">
                      <span>Learn More</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 md:py-20 bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-4">
                Industry-Specific Expertise
              </h2>
              <p className="text-lg text-text-secondary">
                We understand that every industry has its own unique challenges and requirements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="text-secondary" size={24} />
                </div>
                <h3 className="font-sora font-semibold text-lg text-text-primary mb-2">
                  Deep Understanding
                </h3>
                <p className="text-text-secondary">
                  We study your industry's challenges, regulations, and best practices
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-secondary" size={24} />
                </div>
                <h3 className="font-sora font-semibold text-lg text-text-primary mb-2">
                  Proven Results
                </h3>
                <p className="text-text-secondary">
                  Solutions tested and refined across multiple organizations
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="text-secondary" size={24} />
                </div>
                <h3 className="font-sora font-semibold text-lg text-text-primary mb-2">
                  Tailored Approach
                </h3>
                <p className="text-text-secondary">
                  Every solution customized to your specific business context
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-secondary text-text-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-lg md:text-xl text-text-muted mb-10">
              Our consulting methodology applies across all sectors. We focus on understanding your unique business challenges first.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-consultation">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-primary-dark text-secondary hover:bg-primary-dark">
                  Book a Consultation
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-primary-dark hover:text-secondary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
