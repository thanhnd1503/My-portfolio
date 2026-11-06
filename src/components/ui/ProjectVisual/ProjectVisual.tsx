import type { Project } from '@/types/content';
import { MediaFrame, type ParallaxMode } from '@/components/ui/MediaFrame/MediaFrame';
import styles from './ProjectVisual.module.scss';

interface ProjectVisualProps {
  project: Project;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** 'unpinned': vertical parallax only when the works track isn't pinned. */
  parallax?: ParallaxMode;
  aspectRatio?: string;
}

/** Project cover, or an abstract typographic composition when no cover is set. */
export function ProjectVisual({ project, priority, sizes, className, parallax, aspectRatio }: ProjectVisualProps) {
  return (
    <MediaFrame
      image={project.cover}
      priority={priority}
      sizes={sizes}
      className={className}
      parallax={parallax}
      aspectRatio={aspectRatio}
    >
      <div className={styles.placeholder} aria-hidden="true">
        <span className={styles.grid} />
        <span className={styles.glow} />
        <span className={styles.numeral}>{project.index}</span>
      </div>
    </MediaFrame>
  );
}
