import { skillCategories, skillContextLabels } from '@/content';
import type { SkillContext } from '@/types/content';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import styles from './Capabilities.module.scss';

const CONTEXT_ORDER: readonly SkillContext[] = ['professional', 'training', 'personal', 'learning'];

export function Capabilities() {
  // Only show legend entries for contexts that are actually in use.
  const usedContexts = CONTEXT_ORDER.filter((ctx) =>
    skillCategories.some((category) => category.skills.some((skill) => skill.context === ctx)),
  );

  return (
    <section
      id="capabilities"
      className={styles.section}
      aria-labelledby="capabilities-title"
      data-section="capabilities"
    >
      <Container>
        <SectionHeader
          id="capabilities-title"
          index="03"
          label="Technical Capabilities"
          title="Tools, grouped by where they sit in a system."
          intro="Marked where each has been used in professional work; unmarked items are part of my toolkit outside that."
        />

        {usedContexts.length > 0 ? (
          <Reveal as="ul" className={styles.legend} aria-label="Legend">
            {usedContexts.map((ctx) => (
              <li key={ctx} className={styles.legendItem}>
                <span className={styles.dot} data-context={ctx} aria-hidden="true" />
                {skillContextLabels[ctx]}
              </li>
            ))}
          </Reveal>
        ) : null}

        {/* Reveal inner content, not the cells, so the hairline grid never flashes. */}
        <Reveal className={styles.grid} selector="[data-reveal]" each>
          {skillCategories.map((category, i) => (
            <article key={category.id} className={styles.category} aria-labelledby={`cap-${category.id}`}>
              <header className={styles.categoryHeader} data-reveal>
                <span className={styles.categoryIndex}>{String(i + 1).padStart(2, '0')}</span>
                <h3 id={`cap-${category.id}`} className={styles.categoryTitle}>
                  {category.title}
                </h3>
                <p className={styles.categorySummary}>{category.summary}</p>
              </header>

              <ul className={styles.skills} data-reveal>
                {category.skills.map((skill) => (
                  <li key={skill.name} className={styles.skill}>
                    <span>{skill.name}</span>
                    {skill.context ? (
                      <span className={styles.context}>
                        <span className={styles.dot} data-context={skill.context} aria-hidden="true" />
                        {skillContextLabels[skill.context]}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
