import { statement } from '@/content';
import { Container } from '@/components/ui/Container/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import styles from './Statement.module.scss';

export function Statement() {
  return (
    <section id="statement" className={styles.section} aria-labelledby="statement-title" data-section="statement">
      <Container>
        <p className={styles.label}>
          <span className={styles.index}>01</span> Introduction
        </p>

        {/* Scroll-driven typography: words brighten as the reader scrolls. */}
        <SplitReveal as="h2" id="statement-title" className={styles.lead} mode="scrub">
          {statement.lead}
        </SplitReveal>

        <Reveal className={styles.columns}>
          <p className={styles.body}>{statement.body}</p>

          <div>
            <h3 className={styles.listTitle}>Where I focus</h3>
            <Reveal as="ol" className={styles.list} stagger={0.06}>
              {statement.focusAreas.map((area, i) => (
                <li key={area} className={styles.item}>
                  <span className={styles.itemIndex}>{String(i + 1).padStart(2, '0')}</span>
                  {area}
                </li>
              ))}
            </Reveal>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
