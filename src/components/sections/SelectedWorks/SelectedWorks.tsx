import { projects } from '@/content';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectCard } from './ProjectCard';
import { WorksShowcase } from './WorksShowcase';
import styles from './SelectedWorks.module.scss';

export function SelectedWorks() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title" data-section="work">
      <Container>
        <SectionHeader
          id="work-title"
          index="02"
          label="Selected Works"
          title="Systems I have worked on."
          intro="Enterprise CRM and automotive retail platforms built at Hanbiro VN for Korean clients."
        />
      </Container>

      {/*
        Desktop: pinned horizontal scroll (WorksShowcase), native horizontal overflow as fallback.
        Tablet: two-column grid. Mobile: vertical cards.
      */}
      <WorksShowcase className={styles.viewport}>
        <Reveal as="ul" className={styles.track} each data-works-track>
          {projects.map((project, i) => (
            <li key={project.slug} className={styles.slide} data-works-slide>
              <ProjectCard project={project} priority={i === 0} />
            </li>
          ))}
        </Reveal>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressLabel}>
            <span data-works-current>01</span> / {String(projects.length).padStart(2, '0')}
          </span>
          <span className={styles.progressBar}>
            <span className={styles.progressFill} data-works-progress />
          </span>
        </div>
      </WorksShowcase>
    </section>
  );
}
