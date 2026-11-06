import type { Project } from '@/types/content';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Tag } from '@/components/ui/Tag/Tag';
import { Reveal } from '@/components/motion/Reveal';
import styles from './CaseOverview.module.scss';

interface CaseOverviewProps {
  project: Project;
  index: string;
}

/** Focus, technical context and detail sections — verified fields only. */
export function CaseOverview({ project, index }: CaseOverviewProps) {
  return (
    <section className={styles.section} aria-labelledby="overview-title">
      <Container>
        <SectionHeader id="overview-title" index={index} label="Overview" title="What the work involves." />

        <div className={styles.blocks}>
          {project.highlights.length > 0 ? (
            <Reveal className={styles.block}>
              <h3 className={styles.blockTitle}>Focus</h3>
              <ul className={styles.highlights}>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {project.stack.length > 0 ? (
            <Reveal className={styles.block}>
              <h3 className={styles.blockTitle}>Technical context</h3>
              <ul className={styles.tags}>
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Tag>{tech}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {project.sections.map((section) => (
            <Reveal key={section.title} className={styles.block}>
              <h3 className={styles.blockTitle}>{section.title}</h3>
              <ul className={styles.items}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
