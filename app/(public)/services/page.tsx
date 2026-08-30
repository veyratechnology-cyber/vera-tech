import React from "react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/shared";
import { getPublishedServices } from "@/lib/db/queries";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | VeyraTech",
  description: "Technology consulting services including Technology Strategy, AI Consulting, Business Automation, Digital Transformation, Software & Systems, and Technology Advisory.",
};

// Force dynamic rendering - disable all static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Hardcoded services as fallback
const STATIC_SERVICES = [
  { id: '1', name: 'Technology Strategy & Planning', slug: 'technology-strategy', description: 'Strategic technology planning that aligns with your business objectives and creates competitive advantage.' },
  { id: '2', name: 'AI Consulting & Implementation', slug: 'ai-consulting', description: 'Practical AI consulting focused on real business problems and measurable outcomes.' },
  { id: '3', name: 'Business Process Automation', slug: 'business-automation', description: 'Intelligent automation that eliminates repetitive work and improves operational efficiency.' },
  { id: '4', name: 'Digital Transformation', slug: 'digital-transformation', description: 'Comprehensive digital transformation that modernizes operations and creates new business capabilities.' },
  { id: '5', name: 'Software & Systems Advisory', slug: 'software-systems', description: 'Expert guidance on software selection, implementation, and optimization.' },
  { id: '6', name: 'Technology Advisory Services', slug: 'technology-advisory', description: 'Ongoing technology advisory and fractional CTO services for growing organizations.' },
];

export default async function ServicesPage() {
  let services = STATIC_SERVICES;
  
  try {
    const dbServices = await getPublishedServices();
    if (dbServices && dbServices.length > 0) {
      services = dbServices;
    }
  } catch (error) {
    console.error('Database error, using static services:', error);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              We provide practical technology and AI consulting services designed to solve real business problems and create measurable value.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service) => (
              <Card key={service.id} hover>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-sora font-bold text-text-primary mb-4">
                    {service.name}
                  </h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="outline" size="sm">
                      Learn More
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-6">
              Problem First. Technology Second.
            </h2>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              VeyraTech never recommends technology simply because it is new, fashionable, or technically interesting. Every recommendation begins with understanding your business problem, desired outcomes, and current situation.
            </p>
            <div className="bg-primary-dark rounded-xl p-8 shadow-sm border border-border">
              <div className="space-y-4 text-left">
                {[
                  "Business problem",
                  "Desired outcome",
                  "Current situation",
                  "Available technology",
                  "Constraints",
                  "Security and privacy",
                  "Business value",
                  "Appropriate solution",
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="text-lg text-text-primary">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-secondary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold mb-6">
              Let's Discuss Your Technology Needs
            </h2>
            <p className="text-xl mb-10 text-text-secondary">
              Schedule a consultation to explore how we can help your organization.
            </p>
            <Link href="/book-consultation">
              <Button variant="secondary" size="lg" className="bg-primary-dark text-secondary hover:bg-primary-dark">
                Book a Consultation
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
