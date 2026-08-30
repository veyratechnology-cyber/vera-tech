"use client";

import React, { useState } from "react";
import { Button, Input, Textarea, Select, Alert } from "@/components/shared";
import { COMPANY } from "@/lib/constants";
import { Mail, Phone, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you for contacting us! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sora font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Have a question or want to discuss your technology needs? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section bg-primary-dark">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-sora font-bold mb-6">
                  Get In Touch
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Mail className="text-secondary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${COMPANY.email}`}
                        className="text-secondary hover:underline"
                      >
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                  {COMPANY.phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <Phone className="text-secondary" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a
                          href={`tel:${COMPANY.phone}`}
                          className="text-secondary hover:underline"
                        >
                          {COMPANY.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-8 p-6 bg-primary rounded-xl">
                  <h3 className="font-sora font-semibold mb-3">
                    Prefer to Book a Consultation?
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Schedule a consultation to discuss your specific needs in detail.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <a href="/book-consultation">Book a Consultation</a>
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-primary-dark rounded-xl p-8 shadow-sm border border-border">
                  <h2 className="text-2xl font-sora font-bold mb-6">
                    Send Us a Message
                  </h2>

                  {submitStatus && (
                    <div className="mb-6">
                      <Alert
                        type={submitStatus.type}
                        message={submitStatus.message}
                        dismissible
                        onDismiss={() => setSubmitStatus(null)}
                      />
                    </div>
                  )}

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
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                      />
                      <Input
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <Input
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                    />

                    <Textarea
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Tell us about your technology needs or questions..."
                    />

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      {!isSubmitting && <Send size={20} />}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
