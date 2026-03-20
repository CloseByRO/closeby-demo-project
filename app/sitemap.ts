import type { MetadataRoute } from 'next'
import clientConfig from '@/config/client'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = clientConfig.website
  const now = new Date()

  return [
    // Core pages
    { url: base,                                  lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/despre`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/servicii`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/programari`,                  lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/faq`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,                     lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },

    // Service landing pages — high-intent keyword clusters
    { url: `${base}/anxietate-depresie`,          lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/terapie-cuplu`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/terapie-online`,              lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // Legal
    { url: `${base}/politica-confidentialitate`,  lastModified: now, changeFrequency: 'yearly',  priority: 0.1 },
    { url: `${base}/termeni`,                     lastModified: now, changeFrequency: 'yearly',  priority: 0.1 },
  ]
}
