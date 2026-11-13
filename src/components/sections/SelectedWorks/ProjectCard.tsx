import Link from 'next/link';
import type { Project } from '@/types/content';
import { formatPeriod } from '@/lib/format';
import { ProjectVisual } from '@/components/ui/ProjectVisual/ProjectVisual';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <article className={styles.card} data-hover-scope data-cursor="view">
      <ProjectVisual
        project={project}
        priority={priority}
        parallax="unpinned"
        className={styles.visual}
        sizes="(min-width: 1200px) 45vw, (min-width: 768px) 50vw, 100vw"
      />

      <div className={styles.body}>
        <p className={styles.meta}>
          <span className={styles.index}>{project.index}</span>
          <span>{project.period ? formatPeriod(project.period) : project.client}</span>
        </p>

        <h3 className={styles.title}>
          {/* Stretched link: the whole card is clickable, but only one link is announced. */}
          <Link href={`/work/${project.slug}`} className={styles.link}>
            {project.title}
          </Link>
        </h3>

        <p className={styles.summary}>{project.summary}</p>

        {project.highlights.length > 0 ? (
          <ul className={styles.highlights} aria-label="Focus areas">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}

        <span className={styles.cta} aria-hidden="true">
          View project <span className={styles.arrow}>→</span>
        </span>
      </div>
    </article>
  );
}
