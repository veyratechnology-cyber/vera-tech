"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Button, Input } from "@/components/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewConsultationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    prospectName: "",
    prospectEmail: "",
    scheduledAt: "",
    duration: "60",
    type: "DISCOVERY",
    status: "SCHEDULED",
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
      const response = await fetch("/api/admin/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          duration: parseInt(formData.duration),
        }),
      });

      if (response.ok) {
        router.push("/admin/consultations");
        router.refresh();
      } else {
        alert("Failed to create consultation");
      }
    } catch (error) {
      console.error("Error creating consultation:", error);
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
            href="/admin/consultations"
            className="flex items-center text-sm text-text-secondary hover:text-text-primary mb-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Consultations
          </Link>
          <h1 className="text-2xl font-bold text-text-primary">Schedule New Consultation</h1>
        </div>
      </div>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Prospect Name"
                name="prospectName"
                value={formData.prospectName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />

              <Input
                label="Prospect Email"
                name="prospectEmail"
                type="email"
                value={formData.prospectEmail}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />

              <Input
                label="Scheduled Date & Time"
                name="scheduledAt"
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={handleChange}
                required
              />

              <Input
                label="Duration (minutes)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                placeholder="60"
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Consultation Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="DISCOVERY">Discovery Call</option>
                  <option value="TECHNICAL">Technical Discussion</option>
                  <option value="PROPOSAL_REVIEW">Proposal Review</option>
                  <option value="FOLLOW_UP">Follow-up</option>
                  <option value="STRATEGIC">Strategic Planning</option>
                </select>
              </div>

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
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                  <option value="NO_SHOW">No Show</option>
                  <option value="RESCHEDULED">Rescheduled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Notes / Agenda
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Meeting agenda, topics to discuss, preparation notes..."
              />
            </div>

            <div className="flex justify-end gap-4">
              <Link href="/admin/consultations">
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
