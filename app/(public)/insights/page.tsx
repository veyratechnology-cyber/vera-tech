import React from "react";
import Link from "next/link";
import { Button, Card, CardContent, Badge } from "@/components/shared";
import { getPublishedInsights } from "@/lib/db/queries";
import { INSIGHT_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Clock, 
  Search,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Target
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Articles | VeyraTech",
  description: "Expert insights on technology strategy, AI consulting, automation, and digital transformation from VeyraTech's consulting team.",
  keywords: ["technology insights", "AI articles", "business automation", "digital transformation", "tech consulting"],
};

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  // Return empty state for now since we don't have insights yet
  const insights: any[] = [];
  const total = 0;
  const totalPages = 0;
  const page = 1;
  const category = searchParams.category;

  // Get featured insight (most recent)
  const featuredInsight = insights[0];
  const regularInsights = insights.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-primary text-text-primary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-4">
              Insights & Articles
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              Expert perspectives on technology strategy, AI, automation, and digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-12 bg-primary-dark border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="text-secondary" size={24} />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Practical Insights</h3>
              <p className="text-sm text-text-secondary">Actionable advice you can implement</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="text-secondary" size={24} />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Industry Trends</h3>
              <p className="text-sm text-text-secondary">Stay ahead of technology changes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Target className="text-secondary" size={24} />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Best Practices</h3>
              <p className="text-sm text-text-secondary">Proven strategies that work</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="text-secondary" size={24} />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">Expert Knowledge</h3>
              <p className="text-sm text-text-secondary">From experienced consultants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-primary border-b border-border">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/insights">
              <Badge
                variant={!category ? "info" : "default"}
                className="cursor-pointer hover:opacity-80 transition-opacity px-4 py-2"
              >
                All Topics
              </Badge>
            </Link>
            {INSIGHT_CATEGORIES.map((cat) => (
              <Link key={cat.value} href={`/insights?category=${cat.value}`}>
                <Badge
                  variant={category === cat.value ? "info" : "default"}
                  className="cursor-pointer hover:opacity-80 transition-opacity px-4 py-2"
                >
                  {cat.label}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {insights.length === 0 ? (
        /* Empty State */
        <section className="py-20 bg-primary-dark">
          <div className="container-custom">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-primary-dark flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-text-muted" size={32} />
              </div>
              <h2 className="text-2xl font-sora font-bold text-text-primary mb-2">
                No Insights Yet
              </h2>
              <p className="text-text-secondary mb-6">
                We're working on creating valuable content. Check back soon for expert insights!
              </p>
              <Link href="/contact">
                <Button variant="primary">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Insight */}
          {featuredInsight && page === 1 && !category && (
            <section className="py-16 bg-primary-dark">
              <div className="container-custom">
                <div className="max-w-5xl mx-auto">
                  <div className="mb-4">
                    <Badge variant="success" className="text-sm">Featured Article</Badge>
                  </div>
                  <Link href={`/insights/${featuredInsight.slug}`}>
                    <div className="grid md:grid-cols-2 gap-8 items-center group cursor-pointer">
                      <div>
                        {featuredInsight.featuredImage ? (
                          <img
                            src={featuredInsight.featuredImage}
                            alt={featuredInsight.title}
                            className="w-full h-80 object-cover rounded-lg group-hover:shadow-xl transition-shadow"
                          />
                        ) : (
                          <div className="w-full h-80 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20 group-hover:shadow-xl transition-shadow">
                            <BookOpen className="text-secondary" size={64} />
                          </div>
                        )}
                      </div>
                      <div>
                        <Badge variant="info" className="mb-3">
                          {INSIGHT_CATEGORIES.find((c) => c.value === featuredInsight.category)?.label}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-4 group-hover:text-secondary transition-colors">
                          {featuredInsight.title}
                        </h2>
                        {featuredInsight.excerpt && (
                          <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                            {featuredInsight.excerpt}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
                          <div className="flex items-center gap-2">
                            <User size={16} />
                            <span>{featuredInsight.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{formatDate(featuredInsight.publishedAt!)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>5 min read</span>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all">
                          Read Full Article
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Insights Grid */}
          <section className="py-16 bg-primary">
            <div className="container-custom">
              <div className="max-w-6xl mx-auto">
                {(page === 1 && !category && regularInsights.length > 0) && (
                  <h2 className="text-2xl md:text-3xl font-sora font-bold text-text-primary mb-8">
                    Latest Insights
                  </h2>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(page === 1 && !category ? regularInsights : insights).map((insight) => (
                    <Link key={insight.id} href={`/insights/${insight.slug}`} className="group">
                      <div className="bg-primary-dark rounded-lg border border-border hover:border-secondary/30 hover:shadow-lg transition-all h-full flex flex-col">
                        {/* Image */}
                        {insight.featuredImage ? (
                          <div className="h-48 overflow-hidden rounded-t-lg">
                            <img
                              src={insight.featuredImage}
                              alt={insight.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="h-48 bg-secondary/10 rounded-t-lg flex items-center justify-center border-b border-secondary/20">
                            <BookOpen className="text-secondary" size={40} />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="mb-3">
                            <Badge variant="info" className="text-xs">
                              {INSIGHT_CATEGORIES.find((c) => c.value === insight.category)?.label}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-sora font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                            {insight.title}
                          </h3>
                          
                          {insight.excerpt && (
                            <p className="text-text-secondary mb-4 line-clamp-3 text-sm flex-grow">
                              {insight.excerpt}
                            </p>
                          )}
                          
                          <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mb-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-1">
                              <User size={14} />
                              <span>{insight.author.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{formatDate(insight.publishedAt!)}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 text-secondary font-medium text-sm group-hover:gap-3 transition-all">
                            Read More
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex gap-2">
                      {page > 1 && (
                        <Link
                          href={`/insights?${category ? `category=${category}&` : ""}page=${page - 1}`}
                        >
                          <Button variant="outline" size="sm">
                            Previous
                          </Button>
                        </Link>
                      )}
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          href={`/insights?${category ? `category=${category}&` : ""}page=${p}`}
                        >
                          <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              p === page
                                ? "bg-secondary text-white"
                                : "bg-primary-dark text-text-primary hover:bg-primary-dark border border-border"
                            }`}
                          >
                            {p}
                          </button>
                        </Link>
                      ))}
                      
                      {page < totalPages && (
                        <Link
                          href={`/insights?${category ? `category=${category}&` : ""}page=${page + 1}`}
                        >
                          <Button variant="outline" size="sm">
                            Next
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="text-secondary" size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-sora font-bold text-text-primary mb-4">
              Get Expert Insights Delivered
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Subscribe to receive the latest articles on technology strategy, AI, and digital transformation directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-secondary"
              />
              <Button variant="primary" size="lg">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-text-muted mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Talk to Expert CTA */}
      <section className="py-16 bg-secondary text-text-primary">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold mb-4">
              Need Expert Guidance?
            </h2>
            <p className="text-lg text-text-muted mb-8">
              Our consulting team can help you implement these strategies in your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-consultation">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-primary-dark text-secondary hover:bg-primary-dark">
                  Book a Consultation
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-primary-dark hover:text-secondary">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
