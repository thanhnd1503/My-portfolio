'use client';

import { useRef, type HTMLAttributes, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from './config';
import { useActivation } from './useActivation';

type ParallaxProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Travel of `[data-parallax-media]` in percent of its own height (each direction). */
  amount?: number;
  /**
   * Skip vertical parallax while the works track is pinned — WorksShowcase
   * drives a horizontal drift there instead.
   */
  disableWhenPinned?: boolean;
  [dataAttr: `data-${string}`]: string | boolean | undefined;
};

/** Scroll-scrubbed vertical image parallax inside an overflow-hidden frame. */
export function Parallax({ children, amount = 5, disableWhenPinned = false, ...rest }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { active } = useActivation(ref);

  useGSAP(
    () => {
      const frame = ref.current;
      const media = frame?.querySelector<HTMLElement>('[data-parallax-media]');
      if (!frame || !media || !active) return;

      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop, pinned: MEDIA.pinnedWorks }, (ctx) => {
        const { motion, desktop, pinned } = ctx.conditions as Record<'motion' | 'desktop' | 'pinned', boolean>;
        if (!motion || (disableWhenPinned && pinned)) return;
        const travel = desktop ? amount : amount * 0.6;

        gsap.fromTo(
          media,
          { yPercent: -travel },
          {
            yPercent: travel,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [active] },
  );

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
