import { about, profile } from '@/content';
import { Container } from '@/components/ui/Container/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import styles from './About.module.scss';

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title" data-section="about">
      <Container className={styles.layout}>
        <div className={styles.intro}>
          <p className={styles.label}>
            <span className={styles.index}>05</span> About
          </p>
          <SplitReveal as="h2" id="about-title" className={styles.heading}>
            {about.heading}
          </SplitReveal>
        </div>

        <Reveal className={styles.copy} stagger={0.12}>
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal as="aside" className={styles.aside} aria-label="Principles and direction">
          <div>
            <h3 className={styles.asideTitle}>Values in practice</h3>
            <ul className={styles.inlineList}>
              {about.principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.asideTitle}>Currently exploring</h3>
            <ul className={styles.inlineList}>
              {about.exploring.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.asideTitle}>Direction</h3>
            <ol className={styles.path}>
              {profile.careerDirection.map((step, i) => (
                <li key={step} className={styles.step} data-current={i === 0}>
                  <span className={styles.stepMarker} aria-hidden="true" />
                  <span>{step}</span>
                  {i === 0 ? <span className={styles.now}>Current focus</span> : null}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
