import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://resume.infoishai.com'

  // Static pages with their configurations
  const staticPages: {
    route: string
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never'
    priority: number
  }[] = [
    { route: '', changeFrequency: 'daily', priority: 1 },
    { route: '/templates', changeFrequency: 'weekly', priority: 0.9 },
    { route: '/login', changeFrequency: 'monthly', priority: 0.7 },
    { route: '/register', changeFrequency: 'monthly', priority: 0.7 },
    { route: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { route: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { route: '/help', changeFrequency: 'weekly', priority: 0.7 },
    { route: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { route: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  ]

  const routes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  return routes
}