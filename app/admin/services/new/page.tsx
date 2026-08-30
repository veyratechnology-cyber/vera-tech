"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Button, Input } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewServicePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    features: "",
    benefits: "",
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
      // Convert features and benefits to JSON arrays
      const payload = {
        ...formData,
        features: formData.features.split("\n").filter(f => f.trim()),
        benefits: formData.benefits.split("\n").filter(b => b.trim()),
        displayOrder: parseInt(formData.displayOrder),
        isActive: formData.isActive === "true",
      };

      const response = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/services");
        router.refresh();
      } else {
        alert("Failed to create service");
      }
    } catch (error) {
      console.error("Error creating service:", error);
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
            href="/admin/services"
            className="flex items-center text-sm text-text-secondary hover:text-text-primary mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Services
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Create New Service</h1>
        </div>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Service Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Digital Transformation"
              />

              <Input
                label="Slug (URL)"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                placeholder="digital-transformation"
              />

              <div className="md:col-span-2">
                <Input
                  label="Tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Transform your business for the digital age"
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
                placeholder="Comprehensive service description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Features (one per line)
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Benefits (one per line)
              </label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/services">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Service"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
