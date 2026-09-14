'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console
    console.error('[PAGE_ERROR]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-primary-dark rounded-lg p-8 border border-border">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Something went wrong
          </h2>
          <p className="text-text-secondary mb-6">
            We encountered an error while loading this page.
          </p>
          
          {error.digest && (
            <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-6">
              <p className="text-sm text-red-400 font-mono">
                Error ID: {error.digest}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button
              onClick={reset}
              variant="primary"
              className="w-full"
            >
              Try Again
            </Button>
            
            <Link href="/">
              <Button variant="outline" className="w-full">
                Go Home
              </Button>
            </Link>
          </div>

          <p className="text-xs text-text-muted mt-6">
            If this problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}
