"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Select } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewLeadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    leadSource: "WEBSITE",
    industry: "",
    budget: "",
    message: "",
    status: "NEW",
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
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/leads");
        router.refresh();
      } else {
        alert("Failed to create lead");
      }
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/leads"
            className="flex items-center text-sm text-text-secondary hover:text-text-primary mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Leads
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Create New Lead</h1>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />

              {/* Email */}
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />

              {/* Phone */}
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
              />

              {/* Company */}
              <Input
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Inc."
              />

              {/* Job Title */}
              <Input
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="CEO"
              />

              {/* Lead Source */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Lead Source
                </label>
                <select
                  name="leadSource"
                  value={formData.leadSource}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="WEBSITE">Website</option>
                  <option value="REFERRAL">Referral</option>
                  <option value="SOCIAL_MEDIA">Social Media</option>
                  <option value="EMAIL_CAMPAIGN">Email Campaign</option>
                  <option value="EVENT">Event</option>
                  <option value="COLD_OUTREACH">Cold Outreach</option>
                  <option value="PARTNER">Partner</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              {/* Industry */}
              <Input
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Technology"
              />

              {/* Budget */}
              <Input
                label="Budget Range"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="$10,000 - $50,000"
              />

              {/* Status */}
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
                  <option value="PROPOSAL_SENT">Proposal Sent</option>
                  <option value="NEGOTIATION">Negotiation</option>
                  <option value="CONVERTED">Converted</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message / Notes
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Additional information about the lead..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Link href="/admin/leads">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Lead"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
