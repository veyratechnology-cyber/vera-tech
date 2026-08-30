"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Button, Input } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewIndustryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    challenges: "",
    solutions: "",
    displayOrder: "0",
    isActive: "true",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData({ ...formData, name: value, slug });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert challenges and solutions to JSON arrays
      const payload = {
        ...formData,
        challenges: formData.challenges.split("\n").filter(c => c.trim()),
        solutions: formData.solutions.split("\n").filter(s => s.trim()),
        displayOrder: parseInt(formData.displayOrder),
        isActive: formData.isActive === "true",
      };

      const response = await fetch("/api/admin/industries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/industries");
        router.refresh();
      } else {
        alert("Failed to create industry");
      }
    } catch (error) {
      console.error("Error creating industry:", error);
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
            href="/admin/industries"
            className="flex items-center text-sm text-text-secondary hover:text-text-primary mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Industries
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Create New Industry</h1>
        </div>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Industry Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Healthcare"
              />

              <Input
                label="Slug (URL)"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="healthcare"
              />

              <div className="md:col-span-2">
                <Input
                  label="Tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Innovative solutions for healthcare providers"
                />
              </div>

              <Input
                label="Display Order"
                name="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={handleChange}
                placeholder="0"
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  name="isActive"
                  value={formData.isActive}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Comprehensive industry overview..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Key Challenges (one per line)
              </label>
              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Challenge 1&#10;Challenge 2&#10;Challenge 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Our Solutions (one per line)
              </label>
              <textarea
                name="solutions"
                value={formData.solutions}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Solution 1&#10;Solution 2&#10;Solution 3"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/industries">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Industry"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
