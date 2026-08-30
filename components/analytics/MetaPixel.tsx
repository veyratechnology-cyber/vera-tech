"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

/**
 * Meta Pixel (Facebook Pixel) Component
 * Tracks page views and custom events
 */

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

interface MetaPixelProps {
  pixelId: string;
}

export function MetaPixel({ pixelId }: MetaPixelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views on route change
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  // Skip if no pixel ID provided
  if (!pixelId) return null;

  return (
    <>
      {/* Meta Pixel Code */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Custom event tracking functions
export const trackEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, data);
  }
};

export const trackCustomEvent = (
  eventName: string,
  data?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, data);
  }
};

// Standard event helpers
export const trackLead = (data?: Record<string, any>) => {
  trackEvent("Lead", data);
};

export const trackContact = (data?: Record<string, any>) => {
  trackEvent("Contact", data);
};

export const trackCompleteRegistration = (data?: Record<string, any>) => {
  trackEvent("CompleteRegistration", data);
};

export const trackSchedule = (data?: Record<string, any>) => {
  trackEvent("Schedule", data);
};

export const trackSubmitApplication = (data?: Record<string, any>) => {
  trackEvent("SubmitApplication", data);
};

export const trackViewContent = (data?: Record<string, any>) => {
  trackEvent("ViewContent", data);
};

export default MetaPixel;
