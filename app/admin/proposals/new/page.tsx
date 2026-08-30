"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Button, Input } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProposalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    clientCompany: "",
    clientEmail: "",
    description: "",
    scope: "",
    timeline: "",
    budget: "",
    status: "DRAFT",
    sendEmail: false,
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
      const response = await fetch("/api/admin/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/proposals");
        router.refresh();
      } else {
        alert("Failed to create proposal");
      }
    } catch (error) {
      console.error("Error creating proposal:", error);
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
            href="/admin/proposals"
            className="flex items-center text-sm text-text-secondary hover:text-text-primary mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Proposals
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Create New Proposal</h1>
        </div>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Proposal Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Digital Transformation Strategy"
                />
              </div>

              <Input
                label="Client Company"
                name="clientCompany"
                value={formData.clientCompany}
                onChange={handleChange}
                required
                placeholder="Acme Corporation"
              />

              <Input
                label="Client Email"
                name="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={handleChange}
                required
                placeholder="contact@acme.com"
              />

              <Input
                label="Timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                placeholder="3-6 months"
              />

              <Input
                label="Budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                placeholder="50000"
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
                  <option value="DRAFT">Draft</option>
                  <option value="SENT">Sent</option>
                  <option value="VIEWED">Viewed</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sendEmail"
                    checked={formData.sendEmail}
                    onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                    className="w-4 h-4 text-secondary focus:ring-secondary border-border rounded"
                  />
                  <span className="text-sm font-medium text-text-primary">
                    Send proposal via email to client
                  </span>
                </label>
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
                placeholder="Brief overview of the proposal..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Scope of Work
              </label>
              <textarea
                name="scope"
                value={formData.scope}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Detailed scope of work..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/proposals">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Proposal"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
