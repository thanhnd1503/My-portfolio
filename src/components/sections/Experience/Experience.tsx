import { experience, education } from '@/content';
import { formatPeriod } from '@/lib/format';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Tag } from '@/components/ui/Tag/Tag';
import { Reveal } from '@/components/motion/Reveal';
import styles from './Experience.module.scss';

export function Experience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title" data-section="experience">
      <Container>
        <SectionHeader id="experience-title" index="04" label="Career" title="Experience & education." />

        <h3 className={styles.groupTitle}>Professional experience</h3>
        <Reveal as="ol" className={styles.list} each>
          {experience.map((entry) => (
            <li key={entry.id} className={styles.entry}>
              <p className={styles.period}>{formatPeriod(entry.period)}</p>

              <div className={styles.main}>
                <h4 className={styles.role}>{entry.role}</h4>
                {entry.organization ? <p className={styles.org}>{entry.organization}</p> : null}
                <p className={styles.focus}>{entry.focus}</p>
              </div>

              <div className={styles.details}>
                <ul className={styles.responsibilities}>
                  {entry.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {entry.technologies.length > 0 ? (
                  <ul className={styles.tags} aria-label="Technologies">
                    {entry.technologies.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </Reveal>

        <h3 className={styles.groupTitle}>Education & training</h3>
        <Reveal as="ul" className={styles.list} each>
          {education.map((entry) => (
            <li key={entry.id} className={`${styles.entry} ${styles.educationEntry}`}>
              <p className={styles.period}>{entry.period ?? entry.status}</p>
              <div className={styles.main}>
                <h4 className={styles.role}>{entry.institution}</h4>
                <p className={styles.focus}>{entry.programme}</p>
                {entry.period ? <p className={styles.focus}>{entry.status}</p> : null}
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
