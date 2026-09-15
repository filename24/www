import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/search', '/api/llms'],
    },
    sitemap: 'https://filename24.github.io/www/sitemap.xml',
  };
}
