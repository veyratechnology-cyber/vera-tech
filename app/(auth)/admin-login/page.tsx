"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo, Button, Input, Alert } from "@/components/shared";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const error = searchParams.get("error");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginError("Invalid email or password");
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-primary-dark rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="full" theme="light" />
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-2xl font-sora font-bold text-text-primary mb-2">
              Private Administration
            </h1>
            <p className="text-text-secondary">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Error Messages */}
          {(loginError || error) && (
            <div className="mb-6">
              <Alert
                type="error"
                message={loginError || "Authentication failed. Please try again."}
              />
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@VeyraTech.com"
              autoComplete="email"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Authorized administrators only
            </p>
          </div>
        </div>

        {/* Development Hint */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-text-primary">
            <p className="font-semibold mb-1">Development Mode:</p>
            <p>Email: admin@VeyraTech.com</p>
            <p>Password: admin123</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-text-primary">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
