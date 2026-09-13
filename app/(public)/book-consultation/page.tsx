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
import { Calendar, Send, User, Building2, MessageSquare, CalendarCheck, ArrowRight, ArrowLeft, Check } from "lucide-react";

// Multi-step form steps
const STEPS = [
  { id: 1, name: "Personal Info", icon: User },
  { id: 2, name: "Company Info", icon: Building2 },
  { id: 3, name: "Consultation", icon: MessageSquare },
  { id: 4, name: "Schedule", icon: CalendarCheck },
];

export default function BookConsultationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
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

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Personal Info
        return !!(formData.name && formData.email);
      case 2: // Company Info
        return true; // All optional
      case 3: // Consultation Info
        return true; // All optional
      case 4: // Schedule
        return true; // All optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step: number) => {
    // Can only go to completed steps or next step
    if (step <= currentStep || validateStep(currentStep)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="bg-primary rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <User className="text-secondary" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-sora font-bold">Personal Information</h2>
                <p className="text-sm text-text-secondary">Tell us about yourself</p>
              </div>
            </div>
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
              <div className="md:col-span-2">
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
          </div>
        );

      case 2:
        return (
          <div className="bg-primary rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <Building2 className="text-secondary" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-sora font-bold">Company Information</h2>
                <p className="text-sm text-text-secondary">About your organization</p>
              </div>
            </div>
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
        );

      case 3:
        return (
          <div className="bg-primary rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <MessageSquare className="text-secondary" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-sora font-bold">Consultation Details</h2>
                <p className="text-sm text-text-secondary">What can we help you with?</p>
              </div>
            </div>
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
        );

      case 4:
        return (
          <div className="bg-primary rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                <CalendarCheck className="text-secondary" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-sora font-bold">Schedule Meeting</h2>
                <p className="text-sm text-text-secondary">Pick your preferred time</p>
              </div>
            </div>
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
        );

      default:
        return null;
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

      {/* Multi-Step Form */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {STEPS.map((step, index) => {
                  const StepIcon = step.icon;
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  const isClickable = isCompleted || isCurrent;

                  return (
                    <React.Fragment key={step.id}>
                      {/* Step Circle */}
                      <div className="flex flex-col items-center flex-1">
                        <button
                          type="button"
                          onClick={() => isClickable && goToStep(step.id)}
                          disabled={!isClickable}
                          className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all mb-2 ${
                            isCompleted
                              ? "bg-secondary border-secondary text-primary cursor-pointer hover:scale-110"
                              : isCurrent
                              ? "bg-primary border-secondary text-secondary shadow-lg shadow-secondary/50 animate-pulse"
                              : "bg-primary-light border-border text-text-muted cursor-not-allowed"
                          }`}
                        >
                          {isCompleted ? (
                            <Check size={24} />
                          ) : (
                            <StepIcon size={20} />
                          )}
                        </button>
                        <span
                          className={`text-xs md:text-sm font-medium text-center ${
                            isCompleted || isCurrent
                              ? "text-text-primary"
                              : "text-text-muted"
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>

                      {/* Connector Line */}
                      {index < STEPS.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 -mt-12 transition-all ${
                            isCompleted
                              ? "bg-secondary"
                              : "bg-border"
                          }`}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Error Alert */}
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

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Step Content */}
              <div className="mb-8 animate-fadeIn">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                {/* Back Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={currentStep === 1 ? "invisible" : ""}
                >
                  <ArrowLeft size={20} />
                  Back
                </Button>

                {/* Progress Text */}
                <span className="text-sm text-text-secondary hidden md:block">
                  Step {currentStep} of {STEPS.length}
                </span>

                {/* Next/Submit Button */}
                {currentStep < STEPS.length ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                  >
                    Next
                    <ArrowRight size={20} />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={!validateStep(currentStep)}
                  >
                    {isSubmitting ? "Submitting..." : "Book Consultation"}
                    {!isSubmitting && <Send size={20} />}
                  </Button>
                )}
              </div>
            </form>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                Need help? Call us at{" "}
                <a
                  href="tel:+254745247211"
                  className="text-secondary hover:underline font-medium"
                >
                  +254 745 247 211
                </a>{" "}
                or email{" "}
                <a
                  href="mailto:admin@veyratech.com"
                  className="text-secondary hover:underline font-medium"
                >
                  admin@veyratech.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
