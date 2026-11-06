import type { ArchitectureShowcase as ArchitectureData } from '@/types/content';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import styles from './ArchitectureShowcase.module.scss';

interface ArchitectureShowcaseProps {
  architecture: ArchitectureData;
  index: string;
}

/**
 * Layered technical landscape + migration path. Intentionally a grouped
 * overview (no arrows between components) so it never implies an unverified topology.
 */
export function ArchitectureShowcase({ architecture, index }: ArchitectureShowcaseProps) {
  const { intro, layers, migration, disclaimer } = architecture;

  return (
    <section className={styles.section} aria-labelledby="architecture-title">
      <Container>
        <SectionHeader
          id="architecture-title"
          index={index}
          label="Technical architecture"
          title="The system, layer by layer."
          intro={intro}
        />

        <Reveal as="ol" className={styles.stack} each>
          {layers.map((layer, i) => (
            <li key={layer.id} className={styles.layer}>
              <span className={styles.node} aria-hidden="true" />
              <p className={styles.layerIndex}>L{String(i + 1).padStart(2, '0')}</p>
              <h3 className={styles.layerTitle}>{layer.title}</h3>
              <ul className={styles.chips}>
                {layer.items.map((item) => (
                  <li key={item} className={styles.chip}>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>

        {migration ? (
          <Reveal as="section" className={styles.migration} aria-labelledby="migration-title">
            <h3 id="migration-title" className={styles.migrationTitle}>
              Modernization path
            </h3>
            <div className={styles.flow}>
              <ul className={styles.flowGroup} aria-label="From">
                {migration.from.map((item) => (
                  <li key={item} className={`${styles.chip} ${styles.legacy}`}>
                    {item}
                  </li>
                ))}
              </ul>
              <span className={styles.arrow} aria-hidden="true">
                <span className={styles.arrowLine} />
                <span className={styles.arrowHead}>→</span>
              </span>
              <span className="visually-hidden">toward</span>
              <ul className={styles.flowGroup} aria-label="To">
                {migration.to.map((item) => (
                  <li key={item} className={`${styles.chip} ${styles.target}`}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className={styles.migrationText}>{migration.description}</p>
          </Reveal>
        ) : null}

        <p className={styles.disclaimer}>{disclaimer}</p>
      </Container>
    </section>
  );
}
