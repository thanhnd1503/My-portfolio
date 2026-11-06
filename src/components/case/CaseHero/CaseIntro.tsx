'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { EASE, MEDIA } from '@/components/motion/config';

interface CaseIntroProps {
  className?: string;
  children: ReactNode;
}

/**
 * Case-study intro: masked title lines, staggered meta, cover clip reveal.
 * Shares the hero pre-hide contract (see globals.scss / app/layout.tsx).
 */
export function CaseIntro({ className, children }: CaseIntroProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const html = document.documentElement;
      const q = gsap.utils.selector(root);

      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) {
          html.setAttribute('data-motion-ready', '');
          return;
        }
        const [title] = q('[data-intro-title]');
        const split =
          title && desktop ? SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'split-line' }) : null;

        const tl = gsap.timeline({ defaults: { ease: EASE.out }, onComplete: () => split?.revert() });
        if (title && split) {
          tl.set(title, { autoAlpha: 1 }, 0).fromTo(
            split.lines,
            { yPercent: 110 },
            { yPercent: 0, duration: 1.3, stagger: 0.1 },
            0.1,
          );
        } else if (title) {
          tl.fromTo(title, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.1);
        }
        // Body copy is already visible below desktop (see globals.scss).
        if (desktop) {
          tl.fromTo(q('[data-intro-fade]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.07 }, 0.35);
        }
        tl.fromTo(
          q('[data-intro-cover]'),
          { autoAlpha: 1, clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' },
          0.3,
        );

        html.setAttribute('data-motion-ready', '');
        return () => split?.revert();
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className={className}>
      {children}
    </header>
  );
}
