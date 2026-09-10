import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vera-tech.vercel.app'),
  title: {
    default: 'VeyraTech | Technology Consulting & Digital Solutions Kenya',
    template: '%s | VeyraTech'
  },
  description: 'VeyraTech delivers enterprise technology consulting, cloud solutions, cybersecurity, and digital transformation services in Kenya. Transform your business with expert technology solutions.',
  keywords: [
    'technology consulting Kenya',
    'IT services Kenya',
    'cloud solutions Kenya',
    'cybersecurity Kenya',
    'digital transformation Kenya',
    'software development Kenya',
    'VeyraTech',
    'enterprise technology',
    'business automation',
    'IT consulting Nairobi',
    'AI consulting Kenya',
    'technology strategy',
    'cloud migration Kenya',
    'managed IT services'
  ],
  authors: [{ name: 'VeyraTech' }],
  creator: 'VeyraTech',
  publisher: 'VeyraTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vera-tech.vercel.app',
    siteName: 'VeyraTech',
    title: 'VeyraTech | Technology Consulting & Digital Solutions Kenya',
    description: 'Transform your business with enterprise technology consulting, cloud solutions, cybersecurity, and digital transformation services in Kenya.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VeyraTech - Technology Consulting Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeyraTech | Technology Consulting Kenya',
    description: 'Enterprise technology consulting and digital solutions in Kenya',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  // Add Google verification code after you get it from Google Search Console
  // verification: {
  //   google: 'YOUR_GOOGLE_VERIFICATION_CODE',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured data for better SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VeyraTech',
    alternateName: 'Veyra Technology',
    url: 'https://vera-tech.vercel.app',
    logo: 'https://vera-tech.vercel.app/logo.png',
    description: 'Technology consulting and digital solutions provider in Kenya specializing in cloud solutions, cybersecurity, and digital transformation',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressRegion: 'Nairobi',
      addressLocality: 'Nairobi',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'admin@veyratech.com',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
      areaServed: 'KE',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    serviceType: [
      'Technology Consulting',
      'Cloud Solutions',
      'Cybersecurity Services',
      'Digital Transformation',
      'Software Development',
      'IT Consulting',
      'Business Automation',
    ],
    knowsAbout: [
      'Cloud Computing',
      'Cybersecurity',
      'Digital Transformation',
      'Software Development',
      'IT Infrastructure',
      'Business Technology',
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        {/* Analytics */}
        {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        )}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
