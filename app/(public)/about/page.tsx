import React from "react";
import Link from "next/link";
import { Button, Card, CardContent } from "@/components/shared";
import { PRINCIPLES } from "@/lib/constants";
import { ArrowRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | VeyraTech - Real People, Not Corporate Robots",
  description: "We started VeyraTech because we were tired of seeing businesses get burned by consultants who care more about billable hours than actual results. Here's our story.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6">
              We're Not Your Typical Consultants
              <br />
              <span className="text-secondary">(And That's Intentional)</span>
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              VeyraTech was born from frustration with an industry that cares more about PowerPoint decks than actual results.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-sora font-bold text-text-primary mb-6">
                The Origin Story (The Real One)
              </h2>
              <p className="text-lg text-text-primary leading-relaxed mb-6">
                VeyraTech started because we got tired of watching businesses get sold solutions they didn't need by consultants who prioritized billable hours over outcomes.
              </p>
              <p className="text-lg text-text-primary leading-relaxed mb-6">
                We've all worked in those environments. The six-month "digital transformation" projects that delivered a 200-page strategy document and nothing else. The AI initiatives that cost hundreds of thousands and solved problems nobody had. The "enterprise solutions" that somehow made everything more complicated.
              </p>
              <p className="text-lg text-text-primary leading-relaxed mb-6">
                <strong>So we decided to do things differently.</strong>
              </p>
              <p className="text-lg text-text-primary leading-relaxed">
                We started VeyraTech with a simple idea: What if a consulting firm actually cared about solving problems instead of maximizing engagement length? What if we recommended the simplest solution that works, even if it means less revenue for us? What if we treated clients' money like our own?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Belief Section */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-6">
                How We're Different
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary-dark rounded-xl p-6 shadow-sm">
                <h3 className="font-sora font-bold text-xl text-red-600 mb-4">
                  Most Consultants
                </h3>
                <ul className="space-y-3 text-text-secondary">
                  <li>• Start with solutions looking for problems</li>
                  <li>• Recommend expensive enterprise software</li>
                  <li>• Deliver 100-slide decks nobody reads</li>
                  <li>• Maximize project length and billable hours</li>
                  <li>• Use buzzwords to sound smart</li>
                  <li>• Disappear after the contract ends</li>
                </ul>
              </div>
              <div className="bg-secondary text-white rounded-xl p-6 shadow-sm">
                <h3 className="font-sora font-bold text-xl mb-4">
                  VeyraTech
                </h3>
                <ul className="space-y-3">
                  <li>• Start by understanding your actual problems</li>
                  <li>• Recommend the simplest solution that works</li>
                  <li>• Deliver real, implemented solutions</li>
                  <li>• Help you get results as quickly as possible</li>
                  <li>• Explain everything in plain English</li>
                  <li>• Stick around to make sure it actually works</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-secondary text-white rounded-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-sora font-bold mb-6">
                Our One Rule
              </h2>
              <p className="text-2xl font-sora leading-relaxed">
                Would we recommend this solution
                <br />
                if it were our own money?
              </p>
              <p className="text-lg mt-6 text-gray-100">
                If the answer is no, we don't recommend it. Period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-4">
                Our Principles
              </h2>
              <p className="text-lg text-text-secondary">
                The values that guide every engagement and recommendation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRINCIPLES.map((principle, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <CheckCircle className="text-secondary" size={20} />
                      </div>
                      <div>
                        <h3 className="font-sora font-semibold text-xl mb-2">
                          {principle.title}
                        </h3>
                        <p className="text-text-secondary">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-8 text-center">
              How We Help Organizations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-sora font-semibold text-xl mb-4 text-secondary">
                  We Help You Understand
                </h3>
                <ul className="space-y-3 text-text-primary">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Technology problems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Existing technology environments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Automation opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Practical AI use cases</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-sora font-semibold text-xl mb-4 text-secondary">
                  We Help You Implement
                </h3>
                <ul className="space-y-3 text-text-primary">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Technology strategies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Software and systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Business process automation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={18} />
                    <span>Operational improvements</span>
                  </li>
                </ul>
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
              Sound Like Your Kind of People?
            </h2>
            <p className="text-xl mb-10 text-gray-100">
              If you're tired of consultant BS and just want someone to help solve your actual problems, let's talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-consultation">
                <Button variant="secondary" size="lg" className="bg-primary-dark text-secondary hover:bg-primary-dark">
                  Book a Free Consultation
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-primary-dark hover:text-secondary">
                  Just Email Us
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-text-muted">
              First conversation is always free. No sales pitch, no pressure.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
