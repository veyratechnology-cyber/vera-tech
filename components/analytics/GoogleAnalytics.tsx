"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

/**
 * Google Analytics 4 Component
 * Tracks page views and events
 */

declare global {
  interface Window {
    gtag: any;
    dataLayer: any;
  }
}

interface GoogleAnalyticsProps {
  measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views on route change
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", measurementId, {
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams, measurementId]);

  // Skip if no measurement ID provided
  if (!measurementId) return null;

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

// Event tracking helper
export const trackGAEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

export default GoogleAnalytics;
