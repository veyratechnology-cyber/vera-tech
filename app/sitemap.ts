import { MetadataRoute } from 'next'

/**
 * Sitemap for VeyraTech
 * Tells search engines which pages to crawl
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vera-tech.vercel.app'
  const currentDate = new Date()
  
  return [
    // Home page - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    
    // Main pages
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-consultation`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    
    // Add other public pages here as they're created
    // Example:
    // {
    //   url: `${baseUrl}/insights`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
  ]
}
