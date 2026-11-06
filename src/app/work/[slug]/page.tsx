import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { canonicalFor, getAdjacentProjects, getProjectBySlug, ogImage, projects } from '@/content';
import { CaseHero } from '@/components/case/CaseHero/CaseHero';
import { CaseOverview } from '@/components/case/CaseOverview/CaseOverview';
import { ArchitectureShowcase } from '@/components/case/Architecture/ArchitectureShowcase';
import { Gallery } from '@/components/case/Gallery/Gallery';
import { ProjectPager } from '@/components/case/ProjectPager/ProjectPager';
import { Contact } from '@/components/sections/Contact/Contact';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const { alternates, openGraphUrl } = canonicalFor(`/work/${project.slug}`);
  return {
    title: project.title,
    description: project.summary,
    alternates,
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.summary,
      url: openGraphUrl,
      images: [ogImage(project.slug, project.title)],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.summary,
      images: [ogImage(project.slug, project.title)],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const adjacent = getAdjacentProjects(project.slug);

  // Number only the sections that actually render.
  let n = 0;
  const nextIndex = () => String(++n).padStart(2, '0');

  return (
    <>
      <main id="main">
        <CaseHero project={project} />
        <CaseOverview project={project} index={nextIndex()} />
        {project.architecture ? <ArchitectureShowcase architecture={project.architecture} index={nextIndex()} /> : null}
        {project.gallery.length > 0 ? <Gallery items={project.gallery} index={nextIndex()} /> : null}
        {adjacent ? <ProjectPager previous={adjacent.previous} next={adjacent.next} /> : null}
      </main>
      <Contact />
    </>
  );
}
