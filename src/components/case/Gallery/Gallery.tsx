import type { GalleryItem } from '@/types/content';
import { Container } from '@/components/ui/Container/Container';
import { SectionHeader } from '@/components/ui/SectionHeader/SectionHeader';
import { MediaFrame } from '@/components/ui/MediaFrame/MediaFrame';
import { Tag } from '@/components/ui/Tag/Tag';
import { Reveal } from '@/components/motion/Reveal';
import styles from './Gallery.module.scss';

interface GalleryProps {
  items: readonly GalleryItem[];
  index: string;
}

export function Gallery({ items, index }: GalleryProps) {
  // Every second half-width image is offset down for rhythm.
  let halfCount = 0;
  const offsets = items.map((item) => item.layout === 'half' && halfCount++ % 2 === 1);

  return (
    <section className={styles.section} aria-labelledby="gallery-title">
      <Container>
        <SectionHeader id="gallery-title" index={index} label="Gallery" title="Selected views." />

        <Reveal as="ul" className={styles.grid} each>
          {items.map((item, i) => (
            <li
              key={item.image.src}
              className={styles.item}
              data-layout={item.layout}
              data-offset={offsets[i] ? 'true' : undefined}
            >
              <figure className={styles.figure}>
                <MediaFrame
                  image={item.image}
                  aspectRatio={`${item.image.width} / ${item.image.height}`}
                  sizes={item.layout === 'wide' ? '(min-width: 768px) 90vw, 100vw' : '(min-width: 768px) 45vw, 100vw'}
                />
                <figcaption className={styles.caption}>
                  {item.image.placeholder ? <Tag tone="muted">Placeholder</Tag> : null}
                  <span>{item.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
