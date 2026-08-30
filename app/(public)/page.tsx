import React from "react";
import Link from "next/link";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/shared";
import { METHODOLOGY, PRINCIPLES, SERVICE_AREAS } from "@/lib/constants";
import { ArrowRight, CheckCircle, Target, Lightbulb, Code, TrendingUp, Shield, Users, Clock, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VeyraTech | Technology & AI Consulting That Actually Makes Sense",
  description: "We help businesses cut through the tech hype and find solutions that actually work. No jargon, no fluff—just honest advice from people who've been in your shoes.",
  keywords: ["technology consulting", "AI consulting", "digital transformation", "business automation", "technology strategy"],
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section - Enhanced */}
      <section className="section bg-primary relative overflow-hidden">
        {/* Subtle orange gradient effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="container-custom relative z-10 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-2 mb-6">
              <Award size={16} className="text-secondary" />
              <span className="text-secondary font-semibold text-sm">Trusted by 50+ Businesses Across Africa</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold mb-6 leading-tight text-text-primary">
              Technology Solutions
              <br />
              <span className="text-secondary relative inline-block">
                That Actually Work
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 2, 140 2, 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
              No buzzwords. No unnecessary complexity. Just practical technology and AI consulting that helps your business grow.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/book-consultation">
                <Button variant="primary" size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
                  Book Free Consultation
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">50+</div>
                <div className="text-sm text-text-muted">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">95%</div>
                <div className="text-sm text-text-muted">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">24/7</div>
                <div className="text-sm text-text-muted">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Enhanced */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-sora font-bold text-text-primary mb-4">
                Does This Sound Familiar?
              </h2>
              <p className="text-xl text-text-secondary">
                You're not alone. Here's what we hear every day:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-red-500/5 border-red-500/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Target className="text-red-500" size={24} />
                    </div>
                    <h3 className="font-sora font-bold text-2xl text-text-primary">The Pain Points</h3>
                  </div>
                  <ul className="space-y-4 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Manual data entry eating up hours every day</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Different departments using different systems</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Simple reports take days to compile</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Legacy software nobody knows how to update</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">✗</span>
                      <span>Confused about where AI actually fits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-success/5 border-success/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                      <CheckCircle className="text-success" size={24} />
                    </div>
                    <h3 className="font-sora font-bold text-2xl text-text-primary">Our Solution</h3>
                  </div>
                  <ul className="space-y-4 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">✓</span>
                      <span>Listen to your team's actual workflow</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">✓</span>
                      <span>Identify root causes, not just symptoms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">✓</span>
                      <span>Recommend solutions that fit your budget</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">✓</span>
                      <span>Focus on quick wins that build momentum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-success mt-1">✓</span>
                      <span>Explain everything in plain English</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link href="/book-consultation">
                <Button variant="primary" size="lg" className="text-lg px-8 py-6">
                  Let's Solve Your Challenges
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <p className="mt-4 text-text-muted text-sm">First consultation is always free • No pressure, no sales pitch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Enhanced */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block bg-secondary/10 border border-secondary/30 rounded-full px-4 py-2 mb-4">
              <span className="text-secondary font-semibold text-sm">What We Do</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sora font-bold text-text-primary mb-6">
              Practical Technology Solutions
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              No fluff, no complexity. Just real solutions for real business problems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp size={40} />,
                title: "Technology Strategy",
                description: "Build practical roadmaps that align with your business goals and budget.",
                features: ["Technology Assessment", "Digital Roadmap", "Vendor Selection"],
              },
              {
                icon: <Lightbulb size={40} />,
                title: "AI Consulting",
                description: "Cut through the hype. Find where AI creates real, measurable value.",
                features: ["AI Readiness Assessment", "Use Case Identification", "Implementation Support"],
              },
              {
                icon: <Code size={40} />,
                title: "Business Automation",
                description: "Eliminate repetitive work. Free your team for higher-value activities.",
                features: ["Process Automation", "Workflow Optimization", "Integration Services"],
              },
              {
                icon: <Shield size={40} />,
                title: "Digital Transformation",
                description: "Modernize operations without disrupting your business.",
                features: ["System Integration", "Cloud Migration", "Change Management"],
              },
              {
                icon: <CheckCircle size={40} />,
                title: "Custom Software",
                description: "Build solutions when off-the-shelf doesn't fit your unique needs.",
                features: ["Web Applications", "Mobile Apps", "API Development"],
              },
              {
                icon: <Target size={40} />,
                title: "Technology Advisory",
                description: "Get expert guidance for major technology decisions.",
                features: ["Architecture Review", "Technology Selection", "Strategic Planning"],
              },
            ].map((service, index) => (
              <Card key={index} hover className="group transition-all duration-300 hover:shadow-xl hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <h3 className="font-sora font-bold text-2xl mb-3 text-text-primary">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                        <CheckCircle size={16} className="text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services">
              <Button variant="primary" size="lg" className="text-lg px-8 py-6">
                View All Services
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Philosophy Section */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-6">
                About AI: Let's Cut Through the Hype
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Yes, AI is revolutionary. No, it won't magically solve all your problems. And definitely no, you don't need to "AI-ify" everything in your business just because everyone else is talking about it.
              </p>
            </div>
            <div className="bg-secondary/10 border border-secondary/25 rounded-xl p-8 mb-8">
              <p className="text-lg text-text-secondary leading-relaxed">
                <strong className="text-secondary">Here's our take:</strong> AI is incredibly powerful when applied to the right problems. Customer service chatbots? Great if you actually get repetitive questions. Predictive analytics? Awesome if you have clean data and know what to predict. AI-powered everything? That's usually a waste of money.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: "We Start With Your Problem, Not the Tech", 
                  description: "We'll never recommend AI just because it's trendy. We start by understanding what's actually costing you time and money." 
                },
                { 
                  title: "Responsible Adoption (Without the Corporate-Speak)", 
                  description: "We help you implement AI thoughtfully—considering privacy, ethics, and whether your team will actually use it." 
                },
                { 
                  title: "AI Should Make Your Team's Lives Easier", 
                  description: "The goal isn't to replace humans with robots. It's to free your team from boring tasks so they can do more interesting work." 
                },
                { 
                  title: "Show Me the ROI", 
                  description: "We focus on AI applications where you can clearly measure the return. If we can't explain how it'll save you time or money, we won't recommend it." 
                },
              ].map((principle, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/25">
                      <CheckCircle className="text-secondary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-lg mb-2 text-text-primary">
                      {principle.title}
                    </h3>
                    <p className="text-text-secondary">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-4">
              Our Consulting Methodology
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              A structured five-stage approach to solving technology problems and delivering business value.
            </p>
          </div>
          <div className="max-w-5xl mx-auto space-y-6">
            {METHODOLOGY.map((stage, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center">
                        <span className="text-secondary font-sora font-bold text-xl">
                          {stage.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sora font-bold text-2xl text-text-primary mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-lg text-text-primary mb-2">
                        {stage.description}
                      </p>
                      <p className="text-text-secondary">
                        {stage.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/how-we-work">
              <Button variant="primary" size="lg">
                Learn About Our Process
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Real feedback from real businesses we've helped
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "They didn't try to sell us on the latest tech trends. They listened, understood our bottlenecks, and recommended practical solutions that fit our budget. Six months later, our team is saving 15 hours a week on manual data entry.",
                author: "Sarah Chen",
                role: "Operations Director",
                company: "MidAtlantic Distribution",
              },
              {
                quote: "Every consultant promises 'digital transformation.' VeyraTech actually delivered it. They mapped our entire workflow, identified the pain points, and built a system that our team actually uses. No shelf-ware, no disappointment.",
                author: "Marcus Williams",
                role: "CEO",
                company: "Williams & Associates",
              },
              {
                quote: "We were drowning in AI hype and didn't know where to start. They cut through the noise, showed us three specific use cases where AI made sense for us, and helped us implement one that's already paying for itself.",
                author: "Jennifer Rodriguez",
                role: "CFO",
                company: "TechCraft Manufacturing",
              },
            ].map((testimonial, index) => (
              <Card key={index} hover className="bg-primary">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-secondary text-4xl font-serif">"</div>
                  </div>
                  <p className="text-text-secondary mb-6 italic leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-semibold text-text-primary">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-text-muted">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-secondary">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real Talk Section */}
      <section className="section bg-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary-dark rounded-2xl p-8 md:p-12 border border-border border-l-4 border-l-secondary">
              <h2 className="text-3xl font-sora font-bold text-text-primary mb-6">
                Let's Talk About the Elephant in the Room
              </h2>
              <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
                <p>
                  <strong className="text-text-primary">Here's the truth:</strong> Most technology consulting firms will try to sell you a $500K enterprise solution when you really just need a $5K workflow improvement.
                </p>
                <p>
                  We started VeyraTech because we were tired of seeing businesses get burned by consultants who prioritize billable hours over actual results. We've been on both sides—we've worked in corporate environments, we've run operations, and we know what it's like when technology makes your life harder instead of easier.
                </p>
                <p>
                  <strong className="text-text-primary">So here's our promise:</strong> We'll tell you if you don't need us. We'll recommend the simplest solution that solves your problem. And we'll never use "synergy" in a sentence unironically.
                </p>
                <p className="text-secondary font-semibold">
                  Good technology should be invisible. It should just make your work easier and your business run better.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about">
                  <Button variant="primary" size="lg">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="section bg-gradient-to-br from-primary-dark via-primary-dark to-secondary/10 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-2 mb-6">
              <Clock size={16} className="text-secondary" />
              <span className="text-secondary font-semibold text-sm">Ready to Get Started?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-sora font-bold mb-6 text-text-primary">
              Let's Talk About Your Business
            </h2>
            
            <p className="text-xl md:text-2xl mb-10 text-text-secondary leading-relaxed">
              Book a free consultation. No sales pitch. No jargon. Just an honest conversation about your challenges and how we can help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/book-consultation">
                <Button variant="primary" size="lg" className="text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all">
                  Book Free Consultation
                  <ArrowRight size={22} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="text-lg px-10 py-6">
                  Send Us a Message
                </Button>
              </Link>
            </div>
            
            {/* Trust badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 border-t border-border/30">
              <div className="flex items-center gap-2 text-text-muted">
                <CheckCircle size={20} className="text-success" />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <CheckCircle size={20} className="text-success" />
                <span>No pressure</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <CheckCircle size={20} className="text-success" />
                <span>No obligation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
