import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/resumes/',
          '/admin/',
          '/auth/',
        ],
      },
    ],
    sitemap: 'https://resume.infoishai.com/sitemap.xml',
  }
}