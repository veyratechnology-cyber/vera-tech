import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | VeyraTech",
  description: "VeyraTech terms of service and conditions of use.",
};

export default function TermsPage() {
  return (
    <section className="section bg-primary-dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-sora font-bold mb-6">Terms of Service</h1>
          <p className="text-text-secondary mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Agreement to Terms</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              By accessing or using VeyraTech's website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Services</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              VeyraTech provides technology and AI consulting services. The specific scope, deliverables, and terms of each engagement are defined in separate agreements between VeyraTech and the client.
            </p>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Use of Website</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              You may use our website for lawful purposes only. You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-text-primary space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Intellectual Property</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              All content on this website, including text, graphics, logos, and software, is the property of VeyraTech and is protected by copyright and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              VeyraTech shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services.
            </p>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Changes to Terms</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Contact Information</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us at contact@VeyraTech.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
