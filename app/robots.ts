import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration for VeyraTech
 * Next.js 14 will automatically generate this as /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin-login', '/admin/*', '/api/'],
      },
    ],
    sitemap: 'https://vera-tech.vercel.app/sitemap.xml',
  }
}
