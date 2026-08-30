import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VeyraTech",
  description: "VeyraTech privacy policy and data protection practices.",
};

export default function PrivacyPage() {
  return (
    <section className="section bg-primary-dark">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-sora font-bold mb-6">Privacy Policy</h1>
          <p className="text-text-secondary mb-8">Last updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Introduction</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              VeyraTech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Information We Collect</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-text-primary space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Company information</li>
              <li>Information you provide when requesting consultations or contacting us</li>
              <li>Business challenges and technology requirements you share with us</li>
            </ul>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-text-primary space-y-2">
              <li>Respond to your inquiries and requests</li>
              <li>Provide consulting services</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Data Security</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Information Sharing</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share information only:
            </p>
            <ul className="list-disc pl-6 mb-4 text-text-primary space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Your Rights</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-text-primary space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
            </ul>

            <h2 className="text-2xl font-sora font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="text-text-primary leading-relaxed mb-4">
              If you have questions about this Privacy Policy, please contact us at contact@VeyraTech.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
