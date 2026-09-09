import React, { Suspense } from "react";
import { Card, CardContent } from "@/components/shared";
import { Loader2 } from "lucide-react";

interface PageWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function DefaultLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto text-secondary mb-3" size={40} />
        <p className="text-text-muted">Loading...</p>
      </div>
    </div>
  );
}

export function PageWrapper({ children, fallback }: PageWrapperProps) {
  return (
    <Suspense fallback={fallback || <DefaultLoadingFallback />}>
      {children}
    </Suspense>
  );
}

export function LoadingCard({ message = "Loading..." }: { message?: string }) {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto text-secondary mb-3" size={40} />
          <p className="text-text-muted">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
