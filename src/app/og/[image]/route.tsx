import { getProjectBySlug, profile, projects } from '@/content';
import { displayName, formatPeriod } from '@/lib/format';
import { renderOgCard } from '@/lib/og';

/**
 * Open Graph images as real `.png` files (`/og/home.png`, `/og/<slug>.png`).
 * A route handler is used instead of the `opengraph-image` convention because
 * static export writes that convention without a file extension, which static
 * hosts (GitHub Pages) serve with the wrong content type.
 */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ image: 'home.png' }, ...projects.map((project) => ({ image: `${project.slug}.png` }))];
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const project = getProjectBySlug(image.replace(/\.png$/, ''));
  const name = displayName(profile);

  if (!project) {
    return renderOgCard({
      eyebrow: name,
      title: profile.concept,
      footerLeft: profile.titleLines[0] ?? profile.title,
      footerRight: profile.location,
    });
  }

  return renderOgCard({
    eyebrow: `Project ${project.index} · ${name}`,
    title: project.title,
    footerLeft: formatPeriod(project.period),
    footerRight: profile.location,
  });
}
