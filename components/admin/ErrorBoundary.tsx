"use client";

import React from "react";
import { Card, CardContent, Button } from "@/components/shared";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <AlertTriangle
                className="mx-auto text-red-500 mb-4"
                size={48}
              />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Something went wrong
              </h3>
              <p className="text-text-muted mb-4">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
              >
                <RefreshCw size={18} className="mr-2" />
                Reload Page
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export function ErrorFallback({
  error,
  title = "Error loading data",
  description,
}: {
  error: string;
  title?: string;
  description?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center">
          <AlertTriangle className="mx-auto text-yellow-500 mb-3" size={40} />
          <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-text-muted mb-2">{error}</p>
          {description && (
            <p className="text-sm text-text-secondary mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
