import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import type { ProjectImage } from '@/types/content';
import { withBasePath } from '@/lib/format';
import { Parallax } from '@/components/motion/Parallax';
import styles from './MediaFrame.module.scss';

export type ParallaxMode = 'always' | 'unpinned' | 'off';

interface MediaFrameProps {
  /** Image to render; omit and pass `children` for custom artwork. */
  image?: ProjectImage | null;
  children?: ReactNode;
  sizes?: string;
  priority?: boolean;
  parallax?: ParallaxMode;
  className?: string;
  /** CSS aspect-ratio, e.g. "16 / 9". Defaults to the stylesheet's 4 / 3. */
  aspectRatio?: string;
  [dataAttr: `data-${string}`]: string | boolean | undefined;
}

/**
 * Overflow-hidden frame with three layers:
 *   frame  → (optional) Parallax trigger
 *   media  → [data-parallax-media], moved by GSAP (6% headroom)
 *   inner  → hover zoom (CSS), so it never fights GSAP's transform
 * Hover reacts to any ancestor marked `data-hover-scope`.
 */
export function MediaFrame({
  image,
  children,
  sizes = '100vw',
  priority = false,
  parallax = 'always',
  className,
  aspectRatio,
  ...rest
}: MediaFrameProps) {
  const rootClass = className ? `${styles.frame} ${className}` : styles.frame;
  const style: CSSProperties | undefined = aspectRatio ? { aspectRatio } : undefined;

  const media = (
    <div className={styles.media} data-parallax-media>
      <div className={styles.inner}>
        {image ? (
          <Image
            src={withBasePath(image.src)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className={styles.image}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );

  if (parallax === 'off') {
    return (
      <div className={rootClass} style={style} data-parallax-frame {...rest}>
        {media}
      </div>
    );
  }

  return (
    <Parallax
      className={rootClass}
      style={style}
      data-parallax-frame
      disableWhenPinned={parallax === 'unpinned'}
      {...rest}
    >
      {media}
    </Parallax>
  );
}
