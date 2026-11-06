import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * Static hosting (GitHub Pages) is opt-in via env so `next dev` / `next start`
 * keep working locally:
 *   NEXT_OUTPUT=export            → static export to ./out
 *   NEXT_PUBLIC_BASE_PATH=/repo   → serve under a subpath (e.g. /My-portfolio)
 * See .github/workflows/deploy.yml.
 */
const isStaticExport = process.env.NEXT_OUTPUT === 'export';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: 'export' as const, trailingSlash: true } : {}),
  ...(basePath ? { basePath } : {}),
  images: isStaticExport
    ? // No image optimisation server on static hosting: serve files as-is.
      { unoptimized: true }
    : // Real project images (once added) are served as AVIF/WebP at responsive sizes.
      { formats: ['image/avif', 'image/webp'] },
  sassOptions: {
    // Lets every SCSS module write `@use 'mixins' as *;` without relative paths.
    loadPaths: [path.join(process.cwd(), 'src/styles')],
  },
};

export default nextConfig;
