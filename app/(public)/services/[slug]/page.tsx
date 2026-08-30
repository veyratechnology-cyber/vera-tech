import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, CardContent } from "@/components/shared";
import { prisma } from "@/lib/prisma";
import { ArrowRight, CheckCircle, ArrowLeft, Target, Lightbulb, Package, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  try {
    const service = await prisma.service.findUnique({
      where: { slug: params.slug },
    });
    if (service) {
      return {
        title: `${service.name} | VeyraTech`,
        description: service.description,
      };
    }
  } catch (error) {}
  return { title: "Service | VeyraTech" };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  let service = null;
  try {
    service = await prisma.service.findUnique({
      where: { slug: params.slug },
    });
  } catch (error) {
    notFound();
  }

  if (!service || !service.published) {
    notFound();
  }

  // For now, treat these fields as plain text that might be JSON or newline-separated
  // We'll handle both formats
  const parseField = (field: string | null): string[] => {
    if (!field) return [];
    try {
      // Try parsing as JSON first
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // If not JSON, treat as newline-separated text
      return field.split('\n').filter(line => line.trim());
    }
  };

  const problemPoints = parseField(service.problem as string | null);
  const solutionPoints = parseField(service.solution as string | null);
  const deliverablesList = parseField(service.deliverables as string | null);
  const businessOutcomesList = parseField(service.businessOutcomes as string | null);
  
  // FAQ needs special handling
  let faqList: { question: string; answer: string }[] = [];
  if (service.faq) {
    try {
      const parsed = JSON.parse(service.faq as string);
      faqList = Array.isArray(parsed) ? parsed : [];
    } catch {
      // If not JSON, skip FAQ section
      faqList = [];
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-24 bg-primary text-text-primary overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-secondary hover:text-text-primary transition-colors mb-6 text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to Services
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6 leading-tight">
              {service.name}
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-3xl">
              {service.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Book a Consultation
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      {problemPoints.length > 0 && (
        <section className="py-16 md:py-20 bg-primary-dark">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-3">
                  Challenges We Address
                </h2>
                <p className="text-text-secondary">
                  Common obstacles organizations face that this service helps overcome
                </p>
              </div>

              <div className="space-y-4">
                {problemPoints.map((problem: string, index: number) => (
                  <div key={index} className="bg-primary rounded-lg p-6 border border-border hover:border-red-500/30 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed">{problem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {solutionPoints.length > 0 && (
        <section className="py-16 md:py-20 bg-primary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-3">
                  Our Approach
                </h2>
                <p className="text-text-secondary">
                  How we solve these challenges with proven strategies and methodologies
                </p>
              </div>

              <div className="space-y-4">
                {solutionPoints.map((solution: string, index: number) => (
                  <div key={index} className="bg-primary-dark rounded-lg p-6 border border-border hover:border-success/30 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={22} />
                      <p className="text-text-secondary leading-relaxed">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Deliverables Section */}
      {deliverablesList.length > 0 && (
        <section className="py-16 md:py-20 bg-primary-dark">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-3">
                  What You'll Receive
                </h2>
                <p className="text-text-secondary">
                  Tangible deliverables and outcomes from this service engagement
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliverablesList.map((deliverable: string, index: number) => (
                  <div key={index} className="bg-primary rounded-lg p-5 border border-border hover:border-secondary/30 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                      <p className="text-text-secondary text-sm leading-relaxed">{deliverable}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Business Outcomes Section */}
      {businessOutcomesList.length > 0 && (
        <section className="py-16 md:py-20 bg-primary">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-3">
                  Business Outcomes
                </h2>
                <p className="text-text-secondary">
                  Measurable results and value this service delivers to your organization
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businessOutcomesList.map((outcome: string, index: number) => (
                  <div key={index} className="bg-secondary/5 rounded-lg p-6 border border-secondary/20 hover:border-secondary/40 hover:shadow-sm transition-all">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shadow-sm">
                          <span className="text-text-primary font-semibold text-sm">{index + 1}</span>
                        </div>
                      </div>
                      <p className="text-text-secondary leading-relaxed pt-1.5 text-sm">{outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqList.length > 0 && (
        <section className="py-16 md:py-20 bg-primary-dark">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-text-secondary">
                  Common questions about this service
                </p>
              </div>

              <div className="space-y-4">
                {faqList.map((faq: { question: string; answer: string }, index: number) => (
                  <div key={index} className="bg-primary rounded-lg p-6 border border-border">
                    <h3 className="font-sora font-semibold text-lg text-text-primary mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-primary-dark border-t border-border">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold mb-4 text-text-primary">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl mb-10 text-text-secondary">
              Let's discuss how {service.name.toLowerCase()} can help your organization achieve its objectives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-consultation">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full sm:w-auto"
                >
                  Book a Consultation
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                >
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
