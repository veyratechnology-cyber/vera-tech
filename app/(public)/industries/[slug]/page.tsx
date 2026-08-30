import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button, Card, CardContent } from "@/components/shared";
import { prisma } from "@/lib/prisma";
import { ArrowRight, CheckCircle, ArrowLeft, Building2 } from "lucide-react";
import type { Metadata } from "next";

interface IndustryPageProps {
  params: {
    slug: string;
  };
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  try {
    const industry = await prisma.industryPage.findUnique({
      where: { slug: params.slug },
    });
    if (industry) {
      return {
        title: `${industry.name} | VeyraTech`,
        description: industry.description,
      };
    }
  } catch (error) {}
  return { title: "Industry | VeyraTech" };
}

export default async function IndustryDetailPage({ params }: IndustryPageProps) {
  let industry = null;
  try {
    industry = await prisma.industryPage.findUnique({
      where: { slug: params.slug },
    });
  } catch (error) {
    notFound();
  }

  if (!industry || !industry.published) {
    notFound();
  }

  // Helper function to parse fields that could be either JSON or plain text
  const parseField = (field: string | null): string[] => {
    if (!field) return [];
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [field];
    } catch {
      // If it's not valid JSON, treat it as plain text
      return [field];
    }
  };

  // Parse JSON fields safely
  const challengesList = parseField(industry.challenges as string | null);
  const solutionsList = parseField(industry.solutions as string | null);
  const relevantServicesList = parseField(industry.relevantServices as string | null);
  const faqList = parseField(industry.faq as string | null);

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-secondary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-secondary transition-colors">
              Industries
            </Link>
            <span>/</span>
            <span className="text-secondary font-medium">{industry.name}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link href="/industries" className="inline-flex items-center gap-2 text-secondary hover:text-secondary-hover transition-colors mb-6">
              <ArrowLeft size={20} />
              Back to Industries
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                <Building2 className="text-white" size={32} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-sora font-bold leading-tight">
                {industry.name}
              </h1>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              {industry.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/book-consultation">
                <Button variant="primary" size="lg">
                  Book a Consultation
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges */}
      {challengesList.length > 0 && (
        <section className="section bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-dark mb-6">
                Common Technology Challenges in {industry.name}
              </h2>
              <div className="space-y-4">
                {challengesList.map((challenge: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          </div>
                        </div>
                        <p className="text-lg text-gray-700">{challenge}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Our Solutions */}
      {solutionsList.length > 0 && (
        <section className="section bg-background-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-dark mb-6">
                How We Help {industry.name} Organizations
              </h2>
              <div className="space-y-4">
                {solutionsList.map((solution: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                        <p className="text-lg text-gray-700">{solution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Relevant Services */}
      {relevantServicesList.length > 0 && (
        <section className="section bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-dark mb-6">
                Relevant Services for {industry.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relevantServicesList.map((service: string, index: number) => (
                  <Card key={index} hover>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={20} />
                        <p className="text-gray-700 font-medium">{service}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link href="/services">
                  <Button variant="outline" size="lg">
                    View All Services
                    <ArrowRight size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqList.length > 0 && (
        <section className="section bg-background-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-dark mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqList.map((item: string | { question: string; answer: string }, index: number) => {
                  // Handle both string and object formats
                  if (typeof item === 'string') {
                    return (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <p className="text-gray-600">{item}</p>
                        </CardContent>
                      </Card>
                    );
                  }
                  
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <h3 className="font-sora font-semibold text-xl text-text-dark mb-3">
                          {item.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section bg-secondary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold mb-6">
              Ready to Transform Your {industry.name} Business?
            </h2>
            <p className="text-xl mb-10 text-gray-100">
              Let's discuss how technology and AI can create competitive advantage for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-consultation">
                <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Book a Consultation
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/industries">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  View All Industries
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
