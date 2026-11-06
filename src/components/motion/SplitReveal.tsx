'use client';

import { useRef, type ElementType } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { EASE, MEDIA, REVEAL_START } from './config';
import { isOnScreen, useActivation } from './useActivation';

interface SplitRevealProps {
  as?: ElementType;
  id?: string;
  className?: string;
  children: string;
  /**
   * lines: masked line-by-line rise (headings).
   * scrub: words brighten as the reader scrolls through the text (statements).
   */
  mode?: 'lines' | 'scrub';
}

/**
 * SplitText-driven typography. Re-splits on resize / font load (autoSplit),
 * keeps an aria-label with the full text, and renders plain text when motion
 * is reduced.
 */
export function SplitReveal({ as: Tag = 'h2', id, className, children, mode = 'lines' }: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { active } = useActivation(ref);

  useGSAP(
    () => {
      const el = ref.current;
      // Already on screen at activation → leave the text untouched.
      if (!el || !active || isOnScreen(el)) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA.motion, () => {
        const split =
          mode === 'lines'
            ? SplitText.create(el, {
                type: 'lines',
                mask: 'lines',
                linesClass: 'split-line',
                autoSplit: true,
                onSplit: (self) =>
                  gsap.from(self.lines, {
                    yPercent: 110,
                    duration: 1.3,
                    ease: EASE.out,
                    stagger: 0.1,
                    scrollTrigger: { trigger: el, start: REVEAL_START, toggleActions: 'play none none reverse' },
                  }),
              })
            : SplitText.create(el, {
                type: 'words',
                autoSplit: true,
                onSplit: (self) =>
                  gsap.fromTo(
                    self.words,
                    // 0.4 keeps dimmed words ≥ 3:1 contrast (large text) at every scroll position.
                    { opacity: 0.4 },
                    {
                      opacity: 1,
                      ease: 'none',
                      stagger: 0.1,
                      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true },
                    },
                  ),
              });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [active] },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
