import Link from 'next/link';
import type { Project } from '@/types/content';
import { formatPeriod } from '@/lib/format';
import { Container } from '@/components/ui/Container/Container';
import { ProjectVisual } from '@/components/ui/ProjectVisual/ProjectVisual';
import { CaseIntro } from './CaseIntro';
import styles from './CaseHero.module.scss';

const CONTEXT_LABEL = { professional: 'Professional work', personal: 'Personal project' } as const;

export function CaseHero({ project }: { project: Project }) {
  // Only verified fields become facts.
  const facts: { label: string; value: string }[] = [];
  if (project.client) facts.push({ label: 'Client', value: project.client });
  if (project.period) facts.push({ label: 'Period', value: formatPeriod(project.period) });
  if (project.role) facts.push({ label: 'Role', value: project.role });
  if (project.context) facts.push({ label: 'Context', value: CONTEXT_LABEL[project.context] });

  return (
    <CaseIntro className={styles.hero}>
      <Container>
        <Link href="/#work" className={styles.back} data-intro-fade>
          ← All work
        </Link>

        <div className={styles.heading}>
          <p className={styles.index} data-intro-fade>
            Project {project.index}
          </p>
          <h1 className={styles.title} data-intro-title>
            {project.title}
          </h1>
          <p className={styles.summary} data-intro-fade>
            {project.summary}
          </p>
        </div>

        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label} className={styles.fact} data-intro-fade>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          {project.url ? (
            <div className={styles.fact} data-intro-fade>
              <dt>Live</dt>
              <dd>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className={styles.external}>
                  Visit site ↗<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </Container>

      <Container>
        <div data-intro-cover>
          <ProjectVisual project={project} priority sizes="100vw" className={styles.cover} />
        </div>
      </Container>
    </CaseIntro>
  );
}
