import React from "react";
import Link from "next/link";
import { Button, Badge } from "@/components/shared";
import { getPublishedInsightBySlug } from "@/lib/db/queries";
import { INSIGHT_CATEGORIES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const insight = await getPublishedInsightBySlug(params.slug);
    if (insight) {
      return {
        title: `${insight.title} | VeyraTech Insights`,
        description: insight.seoDescription || insight.excerpt || insight.title,
      };
    }
  } catch (error) {}
  return { title: "Insight | VeyraTech" };
}

export default async function InsightDetailPage({ params }: Props) {
  let insight = null;
  try {
    insight = await getPublishedInsightBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  if (!insight) {
    notFound();
  }

  const categoryLabel = INSIGHT_CATEGORIES.find(
    (c) => c.value === insight.category
  )?.label;

  return (
    <>
      {/* Back Navigation */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="container-custom">
          <Link href="/insights">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={16} />
              Back to Insights
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="section bg-white">
        <div className="container-custom">
          <article className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge variant="info">{categoryLabel}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6">
              {insight.title}
            </h1>
            {insight.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {insight.excerpt}
              </p>
            )}
            <div className="flex items-center gap-6 text-gray-600 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User size={20} />
                <span className="font-medium">{insight.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={20} />
                <span>{formatDate(insight.publishedAt!)}</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Featured Image */}
      {insight.featuredImage && (
        <section className="bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={insight.featuredImage}
                  alt={insight.title}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="section bg-white">
        <div className="container-custom">
          <article className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: insight.content }}
            />
          </article>
        </div>
      </section>

      {/* Tags */}
      {insight.tags && insight.tags.length > 0 && (
        <section className="py-8 bg-background-light">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-semibold mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {insight.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-secondary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-sora font-bold mb-6">
              Need Help With Your Technology Strategy?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Let's discuss how RoyalTech can help your organization.
            </p>
            <Link href="/book-consultation">
              <Button variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
