"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea, Select, Alert } from "@/components/shared";
import { 
  INDUSTRIES, 
  COMPANY_SIZES, 
  CONSULTATION_TYPES, 
  MEETING_TYPES,
  PREFERRED_CONTACT_METHODS 
} from "@/lib/constants";
import { Calendar, Send } from "lucide-react";

export default function BookConsultationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    preferredContactMethod: "EMAIL",
    
    // Company Information
    company: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    country: "Kenya",
    city: "",
    
    // Consultation Information
    consultationTypes: [] as string[],
    businessChallenge: "",
    desiredOutcome: "",
    currentTechnology: "",
    additionalInfo: "",
    
    // Meeting Information
    meetingType: "GOOGLE_MEET",
    preferredDate: "",
    preferredTime: "",
    meetingLocation: "",  // For in-person meetings
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConsultationTypeToggle = (type: string) => {
    setFormData((prev) => {
      const types = prev.consultationTypes.includes(type)
        ? prev.consultationTypes.filter((t) => t !== type)
        : [...prev.consultationTypes, type];
      return { ...prev, consultationTypes: types };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to success page
        router.push(`/book-consultation/success?id=${data.id}`);
      } else {
        throw new Error(data.error || "Failed to submit");
      }
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again or contact us directly.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Calendar size={64} className="mx-auto mb-6 text-secondary" />
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6">
              Book a Consultation
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Let's discuss your technology challenges and explore how VeyraTech can help your organization achieve its goals.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {submitStatus && (
              <div className="mb-8">
                <Alert
                  type={submitStatus.type}
                  message={submitStatus.message}
                  dismissible
                  onDismiss={() => setSubmitStatus(null)}
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-primary rounded-xl p-6">
                <h2 className="text-2xl font-sora font-bold mb-6">Personal Information</h2>
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
                    label="Work Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254 712 345 678"
                  />
                  <Input
                    label="Job Title / Role"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g., CEO, CTO, Operations Manager"
                  />
                  <Select
                    label="Preferred Contact Method"
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select method" },
                      ...PREFERRED_CONTACT_METHODS.map((m) => ({
                        value: m.value,
                        label: m.label,
                      })),
                    ]}
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="bg-primary rounded-xl p-6">
                <h2 className="text-2xl font-sora font-bold mb-6">Company Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company Ltd"
                  />
                  <Input
                    label="Company Website"
                    name="companyWebsite"
                    type="url"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://yourcompany.com"
                  />
                  <Select
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select industry" },
                      ...INDUSTRIES.map((i) => ({ value: i.value, label: i.label })),
                    ]}
                  />
                  <Select
                    label="Company Size"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "Select company size" },
                      ...COMPANY_SIZES.map((c) => ({ value: c.value, label: c.label })),
                    ]}
                  />
                  <Input
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Kenya"
                  />
                  <Input
                    label="City / Location"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Nairobi"
                  />
                </div>
              </div>

              {/* Consultation Information */}
              <div className="bg-primary rounded-xl p-6">
                <h2 className="text-2xl font-sora font-bold mb-6">Consultation Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-3">
                      What areas do you need help with? (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {CONSULTATION_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleConsultationTypeToggle(type.value)}
                          className={`p-3 rounded-lg border-2 text-left transition-all text-sm ${
                            formData.consultationTypes.includes(type.value)
                              ? "border-secondary bg-secondary/10 text-secondary font-semibold"
                              : "border-border hover:border-secondary/50"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label="Main Business Challenge"
                    name="businessChallenge"
                    value={formData.businessChallenge}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the main challenge or opportunity you're looking to address..."
                  />

                  <Textarea
                    label="Desired Outcome"
                    name="desiredOutcome"
                    value={formData.desiredOutcome}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What would success look like? What are you hoping to achieve?"
                  />

                  <Textarea
                    label="Current Technology / Systems"
                    name="currentTechnology"
                    value={formData.currentTechnology}
                    onChange={handleChange}
                    rows={3}
                    placeholder="What systems, tools, or technology does your business currently use?"
                  />

                  <Textarea
                    label="Additional Information"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any other details you'd like to share..."
                  />
                </div>
              </div>

              {/* Meeting Information */}
              <div className="bg-primary rounded-xl p-6">
                <h2 className="text-2xl font-sora font-bold mb-6">Meeting Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-3">
                      Meeting Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {MEETING_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, meetingType: type.value }))
                          }
                          className={`p-4 rounded-lg border-2 text-center transition-all ${
                            formData.meetingType === type.value
                              ? "border-secondary bg-secondary/10 text-secondary font-semibold"
                              : "border-border hover:border-secondary/50"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Preferred Date"
                      name="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <Input
                      label="Preferred Time"
                      name="preferredTime"
                      type="time"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Show location field for in-person meetings */}
                  {formData.meetingType === "IN_PERSON" && (
                    <div className="bg-secondary/10 p-4 rounded-lg border-2 border-secondary">
                      <Textarea
                        label="Preferred Meeting Location *"
                        name="meetingLocation"
                        value={formData.meetingLocation}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Please suggest a convenient location for the in-person meeting (e.g., 'Coffee shop in Westlands, Nairobi' or 'Your office address' or 'Co-working space in CBD')"
                        required={formData.meetingType === "IN_PERSON"}
                      />
                      <p className="text-xs text-text-secondary mt-2">
                        💡 Since we operate remotely, please suggest a convenient public venue, your office, 
                        or a co-working space. We'll confirm the final meeting location with you.
                      </p>
                    </div>
                  )}

                  <div className="bg-primary-light p-4 rounded-lg">
                    <p className="text-sm text-text-secondary">
                      Select your preferred date and time. If your preferred slot is unavailable, 
                      we'll automatically find the closest available time and confirm with you.
                    </p>
                    <p className="text-xs text-text-muted mt-2">
                      💡 We accept bookings 24/7 to accommodate international clients across all time zones.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Book Consultation"}
                {!isSubmitting && <Send size={20} />}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
