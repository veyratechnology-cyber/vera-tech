import React from "react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/shared";
import { METHODOLOGY } from "@/lib/constants";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work | VeyraTech",
  description: "Our five-stage consulting methodology: Discover, Diagnose, Design, Implement, and Optimize. A structured approach to solving technology problems.",
};

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section bg-primary text-text-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6">
              How We Work
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              A structured five-stage methodology for solving technology problems and delivering measurable business value.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto space-y-8">
            {METHODOLOGY.map((stage, index) => (
              <Card key={index}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center shadow-lg">
                        <span className="text-text-primary font-sora font-bold text-2xl">
                          {stage.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-sora font-bold text-3xl text-text-primary mb-3">
                        {stage.title}
                      </h2>
                      <p className="text-xl text-text-primary mb-4 font-medium">
                        {stage.description}
                      </p>
                      <p className="text-text-secondary leading-relaxed">
                        {stage.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models Section */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-4">
                Flexible Engagement Models
              </h2>
              <p className="text-lg text-text-secondary">
                We adapt our approach to match your organization's needs and objectives.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-xl mb-3">
                    Assessment & Strategy
                  </h3>
                  <p className="text-text-secondary">
                    Understand your current state, identify opportunities, and develop actionable roadmaps.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-xl mb-3">
                    Implementation Projects
                  </h3>
                  <p className="text-text-secondary">
                    Turn strategy into reality with hands-on implementation of technology solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-sora font-semibold text-xl mb-3">
                    Ongoing Advisory
                  </h3>
                  <p className="text-text-secondary">
                    Receive continuous strategic guidance for technology decisions and initiatives.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Approach Section */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-8 text-center">
              Why This Approach Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary text-white flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-sora font-semibold text-xl mb-2">
                    Problem-Centric, Not Technology-Centric
                  </h3>
                  <p className="text-text-secondary">
                    We start by understanding your business challenge before considering technology options. This ensures recommendations align with actual needs rather than trends.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary text-white flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-sora font-semibold text-xl mb-2">
                    Evidence-Based Recommendations
                  </h3>
                  <p className="text-text-secondary">
                    Every recommendation is grounded in analysis of your actual situation, not generic best practices or vendor marketing.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary text-white flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-sora font-semibold text-xl mb-2">
                    Implementation Focus
                  </h3>
                  <p className="text-text-secondary">
                    We don't just deliver reports. We work with you to implement solutions and ensure they create the intended business value.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary text-white flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="font-sora font-semibold text-xl mb-2">
                    Knowledge Transfer
                  </h3>
                  <p className="text-text-secondary">
                    We build your team's capability alongside delivering solutions, ensuring long-term success beyond the engagement.
                  </p>
                </div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 text-gray-100">
              Schedule a consultation to discuss your technology challenges and explore how we can help.
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
