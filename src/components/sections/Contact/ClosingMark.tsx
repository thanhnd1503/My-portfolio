'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/components/motion/config';

interface ClosingMarkProps {
  className?: string;
  children: string;
}

/**
 * Cinematic closing transition: the outlined concept line rises letter by
 * letter as the page reaches its end, scrubbed to scroll (reverses on the way up).
 * Purely decorative (aria-hidden); static outline with reduced motion.
 */
export function ClosingMark({ className, children }: ClosingMarkProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const split = SplitText.create(el, {
          type: 'chars',
          aria: 'none',
          autoSplit: true,
          onSplit: (self) =>
            gsap
              .timeline({
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.5 },
                defaults: { ease: 'none' },
              })
              .fromTo(
                self.chars,
                { yPercent: 70, opacity: 0 },
                { yPercent: 0, opacity: 1, stagger: 0.04 },
                0,
              )
              .fromTo(el, { scale: 0.94 }, { scale: 1 }, 0),
        });
        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} aria-hidden="true" data-closing-mark>
      {children}
    </div>
  );
}
