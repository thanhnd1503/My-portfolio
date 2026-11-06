import { Fragment } from 'react';
import { profile } from '@/content';
import { Container } from '@/components/ui/Container/Container';
import { HeroScene } from './HeroScene';
import styles from './Hero.module.scss';

export function Hero() {
  return (
    <HeroScene className={styles.hero}>
      <div className={styles.background} aria-hidden="true" data-hero-background>
        <span className={styles.grid} data-hero-grid />
        <span className={styles.halo} data-hero-halo />
        <span className={styles.horizon} data-hero-horizon />
      </div>

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

          <h1 id="hero-title" className={styles.title} data-hero-title>
            {profile.conceptLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 ? ' ' : null}
                <span className={styles.titleLine}>
                  {i === profile.conceptLines.length - 1 ? <em>{line}</em> : line}
                </span>
              </Fragment>
            ))}
          </h1>

          <div className={styles.bottom}>
            <p className={styles.role} data-hero-fade>
              {profile.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className={styles.positioning} data-hero-fade>
              {profile.positioning}
            </p>
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
