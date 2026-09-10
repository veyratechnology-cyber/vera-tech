# 🔍 Google SEO Setup - Complete Guide

## Overview

Get your VeyraTech website ranked on Google search results with proper SEO optimization.

---

## 📋 STEP 1: Google Search Console Setup (10 minutes)

### 1.1 Add Your Site

1. Go to https://search.google.com/search-console
2. Click "Add Property"
3. Select "URL prefix"
4. Enter: `https://vera-tech.vercel.app`
5. Click "Continue"

### 1.2 Verify Ownership

**Method 1: HTML Meta Tag (Easiest)**

Google will give you a meta tag like:
```html
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```

We'll add this to your site in Step 2.

**Method 2: DNS Verification (Alternative)**

If using custom domain:
1. Google gives you a TXT record
2. Add to your domain DNS settings
3. Wait 5-10 minutes for verification

### 1.3 Submit Sitemap

1. After verification, go to "Sitemaps" in left menu
2. Add sitemap URL: `https://vera-tech.vercel.app/sitemap.xml`
3. Click "Submit"

---

## 📋 STEP 2: Add SEO Files to Your Site

### 2.1 Create robots.txt

This tells Google what to crawl.

**File**: `public/robots.txt`

```txt
# Allow all search engines to crawl
User-agent: *
Allow: /

# Don't crawl admin area
Disallow: /admin
Disallow: /admin-login
Disallow: /api/

# Sitemap location
Sitemap: https://vera-tech.vercel.app/sitemap.xml
```

### 2.2 Create sitemap.xml

**File**: `app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vera-tech.vercel.app'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Add more pages as needed
  ]
}
```

### 2.3 Update Root Layout with SEO Meta Tags

**File**: `app/layout.tsx`

Add Google verification meta tag and enhanced SEO:

```typescript
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
    'cloud solutions',
    'cybersecurity Kenya',
    'digital transformation',
    'software development Kenya',
    'VeyraTech',
    'enterprise technology',
    'business automation',
    'IT consulting Nairobi'
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
    description: 'Transform your business with enterprise technology consulting, cloud solutions, and cybersecurity services in Kenya.',
    images: [
      {
        url: '/og-image.png', // Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: 'VeyraTech - Technology Consulting Kenya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeyraTech | Technology Consulting Kenya',
    description: 'Enterprise technology consulting and digital solutions',
    images: ['/og-image.png'],
    creator: '@veyratech', // Add your Twitter handle
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
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Add from Step 1.2
  },
}
```

---

## 📋 STEP 3: Schema.org Structured Data

Add JSON-LD structured data for better Google understanding.

**File**: `app/layout.tsx` (add to body)

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VeyraTech',
    alternateName: 'Veyra Technology',
    url: 'https://vera-tech.vercel.app',
    logo: 'https://vera-tech.vercel.app/logo.png',
    description: 'Technology consulting and digital solutions provider in Kenya',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressRegion: 'Nairobi',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'admin@veyratech.com',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
    sameAs: [
      // Add your social media URLs
      'https://www.linkedin.com/company/veyratech',
      'https://twitter.com/veyratech',
      'https://facebook.com/veyratech',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Kenya',
    },
    serviceType: [
      'Technology Consulting',
      'Cloud Solutions',
      'Cybersecurity',
      'Digital Transformation',
      'Software Development',
    ],
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 📋 STEP 4: Page-Specific SEO

Add metadata to each page:

**Example**: `app/(public)/about/page.tsx`

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Technology Experts in Kenya',
  description: 'Learn about VeyraTech\'s mission to transform businesses through innovative technology solutions. Meet our expert team and discover our values.',
  openGraph: {
    title: 'About VeyraTech - Technology Consulting Kenya',
    description: 'Expert technology consulting team in Kenya',
    url: 'https://vera-tech.vercel.app/about',
  },
}

export default function AboutPage() {
  // Your page content
}
```

**For Services Page**: `app/(public)/services/page.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Technology Services - Cloud, Security & Consulting',
  description: 'Comprehensive technology services including cloud solutions, cybersecurity, software development, and IT consulting in Kenya. Transform your business today.',
  keywords: [
    'cloud services Kenya',
    'cybersecurity services',
    'IT consulting',
    'software development',
    'digital transformation services',
  ],
}
```

---

## 📋 STEP 5: Performance Optimization for SEO

Google ranks fast sites higher.

### 5.1 Image Optimization

Use Next.js Image component everywhere:

```typescript
import Image from 'next/image'

<Image
  src="/your-image.jpg"
  alt="Descriptive alt text for SEO"
  width={800}
  height={600}
  priority={false} // true only for above-the-fold images
  loading="lazy"
/>
```

### 5.2 Add Missing Alt Text

Check all images have descriptive alt text:
```typescript
<img src="/logo.png" alt="VeyraTech Logo - Technology Consulting Kenya" />
```

### 5.3 Compress Images

Before uploading images:
1. Use tools like TinyPNG or ImageOptim
2. Convert to WebP format
3. Resize to appropriate dimensions

---

## 📋 STEP 6: Content SEO Best Practices

### 6.1 Heading Structure

Use proper heading hierarchy:

```html
<h1>Main Page Title (only one per page)</h1>
  <h2>Major Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Major Section</h2>
```

### 6.2 Keywords

Target keywords in:
- ✅ Page titles
- ✅ H1 headings
- ✅ First paragraph
- ✅ Image alt text
- ✅ Meta descriptions
- ✅ URL slugs

**Example Keywords for VeyraTech**:
- Primary: "technology consulting Kenya"
- Secondary: "IT services Nairobi", "cloud solutions Kenya"
- Long-tail: "enterprise cybersecurity services Kenya"

### 6.3 Internal Linking

Link between your pages:
```tsx
<Link href="/services">Explore our technology services</Link>
```

---

## 📋 STEP 7: Google Business Profile (Optional but Recommended)

1. Go to https://business.google.com
2. Click "Manage now"
3. Enter business name: "VeyraTech"
4. Choose category: "Technology Consulting"
5. Add location: Nairobi, Kenya
6. Add phone: +254 745 247 211
7. Add website: https://vera-tech.vercel.app
8. Verify business

**Benefits**:
- Appears in Google Maps
- Shows in local search results
- Customer reviews
- Direct contact buttons

---

## 📋 STEP 8: Submit to Other Search Engines

### Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site: https://vera-tech.vercel.app
3. Verify ownership
4. Submit sitemap

### Yandex (Optional)

1. Go to https://webmaster.yandex.com
2. Add site
3. Verify and submit sitemap

---

## 📋 STEP 9: Monitor & Improve

### Google Search Console Monitoring

Check weekly:
- **Performance**: Clicks, impressions, CTR
- **Coverage**: Indexed pages, errors
- **Enhancements**: Mobile usability, Core Web Vitals
- **Links**: Who's linking to you

### Google Analytics Setup

1. Go to https://analytics.google.com
2. Create property for vera-tech.vercel.app
3. Get tracking ID
4. Add to site (I can help with this)

### Track These Metrics

- **Organic traffic**: Visitors from Google
- **Keywords**: What people search to find you
- **Bounce rate**: Should be < 60%
- **Average session duration**: Higher is better
- **Conversion rate**: Contact form submissions

---

## 📋 STEP 10: Local SEO for Kenya

### Add Location Keywords

Target Kenya-specific searches:
- "technology consulting Nairobi"
- "IT services Kenya"
- "cybersecurity companies in Kenya"
- "software development Nairobi"

### Create Location Pages (Future)

If serving multiple cities:
- /services/nairobi
- /services/mombasa
- /services/kisumu

### Get Listed on Local Directories

- Kenya Business Directory
- Yellow Pages Kenya
- Nairobi tech directories
- Industry-specific listings

---

## ✅ SEO CHECKLIST

### Technical SEO:
- [ ] robots.txt created
- [ ] sitemap.xml created and submitted
- [ ] Google Search Console verified
- [ ] SSL certificate (HTTPS) enabled
- [ ] Mobile-friendly (responsive design)
- [ ] Fast loading times (< 3 seconds)
- [ ] No broken links
- [ ] Clean URL structure

### On-Page SEO:
- [ ] Unique page titles (50-60 characters)
- [ ] Meta descriptions (150-160 characters)
- [ ] H1 tags on all pages
- [ ] Image alt text
- [ ] Internal linking
- [ ] Keyword optimization
- [ ] Schema.org markup

### Content SEO:
- [ ] High-quality, original content
- [ ] Regular blog posts (optional)
- [ ] Keyword research done
- [ ] Content addresses user intent
- [ ] Engaging, readable content

### Off-Page SEO:
- [ ] Google Business Profile claimed
- [ ] Social media profiles created
- [ ] Directory listings
- [ ] Backlink building (future)

---

## 🚀 QUICK WINS (Do These First)

1. **Add robots.txt** (5 min)
2. **Create sitemap.ts** (10 min)
3. **Verify Google Search Console** (10 min)
4. **Submit sitemap** (2 min)
5. **Add Google verification meta tag** (5 min)
6. **Optimize page titles and descriptions** (30 min)

Total time: ~1 hour for major SEO improvements!

---

## 📈 Expected Results Timeline

- **Week 1**: Google starts crawling
- **Week 2-4**: Pages start appearing in search
- **Month 2-3**: Rankings improve for branded searches
- **Month 3-6**: Rankings for competitive keywords
- **Month 6+**: Steady organic traffic growth

---

## 🎯 Target Rankings

**Month 1**:
- "VeyraTech" - Page 1
- "VeyraTech Kenya" - Page 1

**Month 3**:
- "technology consulting Kenya" - Top 20
- "IT services Nairobi" - Top 20

**Month 6**:
- "technology consulting Kenya" - Top 10
- "IT services Nairobi" - Top 10
- "cloud solutions Kenya" - Top 20

---

## 💡 Pro Tips

1. **Content is King**: Regularly publish helpful content
2. **Be Patient**: SEO takes 3-6 months to show results
3. **Mobile First**: Google prioritizes mobile-friendly sites
4. **Speed Matters**: Faster sites rank higher
5. **User Experience**: Low bounce rate = better rankings
6. **Get Reviews**: Positive reviews boost local SEO
7. **Social Signals**: Share content on social media
8. **Update Regularly**: Fresh content ranks better

---

**Next Steps**: 
1. I'll create the SEO files (robots.txt, sitemap.ts, meta tags)
2. You verify Google Search Console
3. Monitor rankings in 2-4 weeks
