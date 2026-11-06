'use client';

import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from '../config';
import styles from './ScrollProgress.module.scss';

/** Page-level scroll progress bar. Re-created per route so its range is correct. */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion }, (ctx) => {
        const { motion } = ctx.conditions as { motion: boolean };
        gsap.fromTo(
          fillRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: motion ? 0.4 : true } },
        );
      });
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div className={styles.bar} aria-hidden="true">
      <div ref={fillRef} className={styles.fill} />
    </div>
  );
}
