import { Fragment } from 'react';
import { profile, skillCategories } from '@/content';
import { Container } from '@/components/ui/Container/Container';
import { HeroScene } from './HeroScene';
import { HeroXray } from './HeroXray';
import styles from './Hero.module.scss';

/** Short, professionally-used stack names label a few X-ray "system" nodes. */
const xrayLabels = skillCategories
  .flatMap((category) => category.skills)
  .filter((skill) => skill.context === 'professional' && skill.name.length <= 15)
  .map((skill) => skill.name);

export function Hero() {
  return (
    <HeroScene className={styles.hero}>
      <div className={styles.background} aria-hidden="true" data-hero-background>
        <span className={styles.grid} data-hero-grid />
        <span className={styles.halo} data-hero-halo />
        <span className={styles.horizon} data-hero-horizon />
      </div>

      <HeroXray labels={xrayLabels} />

      <Container className={styles.inner}>
        <div className={styles.content} data-hero-content>
          <div className={styles.topline}>
            <p className={styles.label} data-hero-fade>
              <span className="visually-hidden">Career direction: </span>
              {profile.careerDirection.join(' → ')}
            </p>
            <p className={styles.label} data-hero-fade>
              {profile.location}
            </p>
          </div>

          <div className={styles.bottom}>
            {/* The page's h1: the professional title (no separate display headline). */}
            <h1 id="hero-title" className={styles.role} data-hero-fade>
              {profile.titleLines.map((line, i) => (
                <Fragment key={line}>
                  {i > 0 ? ' ' : null}
                  <span>{line}</span>
                </Fragment>
              ))}
            </h1>
            <a href="#statement" className={styles.cue} data-hero-fade>
              <span className={styles.cueLine} aria-hidden="true" />
              Scroll
            </a>
          </div>
        </div>
      </Container>
    </HeroScene>
  );
}
