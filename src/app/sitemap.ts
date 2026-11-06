import type { MetadataRoute } from 'next';
import { projects, site, sitePath } from '@/content';

/** Generated at build time (required for static export). */
export const dynamic = 'force-static';

/** Empty until NEXT_PUBLIC_SITE_URL is set — a sitemap needs absolute URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  return [
    { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${site.url}${sitePath(`/work/${project.slug}`)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
