import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  index: string;
  label: string;
  title: string;
  /** id of the heading, used by the section's aria-labelledby. */
  id: string;
  intro?: string;
}

export function SectionHeader({ index, label, title, id, intro }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <Reveal as="p" self className={styles.meta}>
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} aria-hidden="true" />
        <span>{label}</span>
      </Reveal>
      <SplitReveal as="h2" id={id} className={styles.title}>
        {title}
      </SplitReveal>
      {intro ? (
        <Reveal as="p" self className={styles.intro}>
          {intro}
        </Reveal>
      ) : null}
    </header>
  );
}
