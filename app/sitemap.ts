import { MetadataRoute } from 'next'

/**
 * Complete Dynamic Sitemap for VeyraTech
 * Includes all static pages + all services + all industries
 * Google will read this as XML automatically
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vera-tech.vercel.app'
  const currentDate = new Date()
  
  // All 8 services from your database
  const services = [
    'technology-strategy',
    'ai-consulting',
    'business-automation',
    'digital-transformation',
    'software-systems',
    'technology-advisory',
    'cloud-solutions',
    'cybersecurity'
  ]
  
  // All 6 industries from your database
  const industries = [
    'real-estate',
    'construction',
    'logistics',
    'hospitality',
    'professional-services',
    'growing-enterprises'
  ]
  
  const staticPages: MetadataRoute.Sitemap = [
    // Home page - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // Main navigation pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-we-work`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book-consultation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    
    // Legal pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
  
  // Add all service pages
  const servicePages: MetadataRoute.Sitemap = services.map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))
  
  // Add all industry pages
  const industryPages: MetadataRoute.Sitemap = industries.map(slug => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))
  
  // Combine all pages
  return [...staticPages, ...servicePages, ...industryPages]
}
