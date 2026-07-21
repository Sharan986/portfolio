import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gursharansingh.me';
  
  // Base static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/mobile`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ];

  // Dynamic mobile app routes based on available apps in G/OS
  const appIds = [
    'projects', 
    'files', 
    'gallery', 
    'hackhorizon', 
    'provn', 
    'onerepmaax', 
    'collabase'
  ];

  const dynamicRoutes = appIds.map((id) => ({
    url: `${baseUrl}/mobile/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
