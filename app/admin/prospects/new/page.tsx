"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Button, Input } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProspectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    industry: "",
    qualificationScore: "0",
    status: "NEW",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/prospects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          qualificationScore: parseInt(formData.qualificationScore),
        }),
      });

      if (response.ok) {
        router.push("/admin/prospects");
        router.refresh();
      } else {
        alert("Failed to create prospect");
      }
    } catch (error) {
      console.error("Error creating prospect:", error);
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
            href="/admin/prospects"
            className="flex items-center text-sm text-text-secondary hover:text-text-primary mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Prospects
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Create New Prospect</h1>
        </div>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />

              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />

              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
              />

              <Input
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="CEO"
              />

              <Input
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Technology"
              />

              <Input
                label="Qualification Score (0-100)"
                name="qualificationScore"
                type="number"
                min="0"
                max="100"
                value={formData.qualificationScore}
                onChange={handleChange}
                placeholder="75"
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="QUALIFIED">Qualified</option>
                  <option value="MEETING_SCHEDULED">Meeting Scheduled</option>
                  <option value="PROPOSAL_SENT">Proposal Sent</option>
                  <option value="NEGOTIATING">Negotiating</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Additional notes about the prospect..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/prospects">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Prospect"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
