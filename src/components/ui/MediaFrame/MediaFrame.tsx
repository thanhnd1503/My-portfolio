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
  // UI screenshots are shown whole: the frame follows the image's own ratio
  // (overriding the 4/3 or 16/9 a layout asks for) and nothing crops the edges.
  const whole = image?.fit === 'contain';
  const style: CSSProperties | undefined = whole
    ? { aspectRatio: `${image.width} / ${image.height}` }
    : aspectRatio
      ? { aspectRatio }
      : undefined;

  const media = whole ? (
    <div className={`${styles.media} ${styles.whole}`}>
      <div className={styles.inner}>
        <Image
          src={withBasePath(image.src)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          unoptimized
          className={styles.image}
        />
      </div>
    </div>
  ) : (
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
            // Project images are pre-optimised WebP/SVG files. Serve them as-is so
            // UI screenshots aren't re-compressed (Next's default quality is 75),
            // and so dev matches the static GitHub Pages build.
            unoptimized
            className={styles.image}
          />
        ) : (
          children
        )}
      </div>
    </div>
  );

  // No image parallax for whole images: it would need headroom, i.e. cropping.
  if (parallax === 'off' || whole) {
    return (
      <div className={rootClass} style={style} data-parallax-frame data-fit={whole ? 'contain' : undefined} {...rest}>
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
