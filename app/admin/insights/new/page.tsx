"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Button, Input } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewInsightPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "ARTICLE",
    tags: "",
    isPublished: "false",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData({ ...formData, title: value, slug });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert tags to array
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
        isPublished: formData.isPublished === "true",
      };

      const response = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/insights");
        router.refresh();
      } else {
        alert("Failed to create insight");
      }
    } catch (error) {
      console.error("Error creating insight:", error);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/insights"
            className="flex items-center text-sm text-text-secondary hover:text-text-primary mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Insights
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Create New Insight</h1>
        </div>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="The Future of Digital Transformation"
                />
              </div>

              <Input
                label="Slug (URL)"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="future-of-digital-transformation"
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="ARTICLE">Article</option>
                  <option value="CASE_STUDY">Case Study</option>
                  <option value="WHITE_PAPER">White Paper</option>
                  <option value="REPORT">Report</option>
                  <option value="NEWS">News</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Input
                  label="Tags (comma-separated)"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="digital transformation, technology, innovation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  name="isPublished"
                  value={formData.isPublished}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="false">Draft</option>
                  <option value="true">Published</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="A brief summary of the insight..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Full article content (supports Markdown)..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/insights">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Insight"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
