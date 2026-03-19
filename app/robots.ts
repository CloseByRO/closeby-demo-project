import type { MetadataRoute } from 'next'
import clientConfig from '@/config/client'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${clientConfig.website}/sitemap.xml`,
  }
}
