/**
 * Site-level configuration.
 * TODO(owner): set NEXT_PUBLIC_SITE_URL (e.g. in .env.production) to the real
 * domain, e.g. https://example.com — enables canonical URLs, sitemap entries
 * and absolute Open Graph URLs. Never hard-code a guessed domain here.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || null,
  locale: 'en_US',
} as const;

/**
 * Base for resolving relative metadata URLs — only when the real domain is known.
 * Without it, canonical/og:url are omitted (never point search engines at a
 * wrong host) and Next resolves OG image URLs itself (deployment URL on Vercel,
 * localhost in development).
 */
export const metadataBase: URL | undefined = site.url ? new URL(site.url) : undefined;

/** Static export uses trailing slashes (`/work/x/`); keep canonical/sitemap URLs identical to served URLs. */
export function sitePath(path: string): string {
  if (process.env.NEXT_OUTPUT !== 'export' || path.endsWith('/')) return path;
  return `${path}/`;
}

/** Canonical + og:url fields for a path, or nothing when the domain is unknown. */
export function canonicalFor(path: string) {
  const resolved = sitePath(path);
  return site.url
    ? { alternates: { canonical: resolved }, openGraphUrl: resolved }
    : { alternates: undefined, openGraphUrl: undefined };
}

/** Open Graph image entry (see app/og/[image]/route.tsx). */
export function ogImage(name: string, alt: string) {
  return { url: `/og/${name}.png`, width: 1200, height: 630, alt, type: 'image/png' };
}
