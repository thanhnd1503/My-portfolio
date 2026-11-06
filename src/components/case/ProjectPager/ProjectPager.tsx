import Link from 'next/link';
import type { Project } from '@/types/content';
import { Container } from '@/components/ui/Container/Container';
import { ProjectVisual } from '@/components/ui/ProjectVisual/ProjectVisual';
import styles from './ProjectPager.module.scss';

interface ProjectPagerProps {
  previous: Project;
  next: Project;
}

export function ProjectPager({ previous, next }: ProjectPagerProps) {
  const items = [
    { project: previous, direction: 'previous' as const, label: 'Previous project' },
    { project: next, direction: 'next' as const, label: 'Next project' },
  ];

  return (
    <nav aria-label="More projects" className={styles.nav}>
      <Container className={styles.grid}>
        {items.map(({ project, direction, label }) => (
          <Link
            key={direction}
            href={`/work/${project.slug}`}
            className={styles.link}
            data-direction={direction}
            data-hover-scope
            data-cursor="view"
            rel={direction === 'next' ? 'next' : 'prev'}
          >
            <span className={styles.meta}>
              <span className={styles.arrow} aria-hidden="true">
                {direction === 'previous' ? '←' : '→'}
              </span>
              {label} — {project.index}
            </span>
            <span className={styles.title}>{project.title}</span>
            <ProjectVisual project={project} parallax="off" sizes="(min-width: 768px) 40vw, 100vw" className={styles.thumb} />
          </Link>
        ))}
      </Container>
    </nav>
  );
}
