'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { MEDIA } from '@/components/motion/config';

interface WorksShowcaseProps {
  className?: string;
  children: ReactNode;
}

/**
 * Desktop (wide + tall enough, motion allowed): pins the works viewport and
 * converts vertical scroll into horizontal travel of `[data-works-track]`.
 * Everywhere else the native layout (horizontal overflow / grid / stack) stays.
 */
export function WorksShowcase({ className, children }: WorksShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const viewport = ref.current;
      const track = viewport?.querySelector<HTMLElement>('[data-works-track]');
      const progress = viewport?.querySelector<HTMLElement>('[data-works-progress]');
      const counter = viewport?.querySelector<HTMLElement>('[data-works-current]');
      if (!viewport || !track) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA.pinnedWorks, () => {
        // Switch CSS to pinned mode before measuring.
        viewport.setAttribute('data-pinned', 'true');
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        // Scroll length: slower than 1:1 so a short track still reads as a sequence.
        const scrollLength = () => Math.max(distance() * 2, window.innerHeight);
        const slideCount = track.querySelectorAll('[data-works-slide]').length;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: viewport,
            start: 'top top',
            end: () => `+=${scrollLength()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) gsap.set(progress, { scaleX: self.progress });
              if (counter && slideCount > 0) {
                const current = Math.min(slideCount, Math.floor(self.progress * slideCount) + 1);
                counter.textContent = String(current).padStart(2, '0');
              }
            },
          },
        });

        // Images drift against the travel direction (parallax inside the pinned track).
        track.querySelectorAll<HTMLElement>('[data-works-slide]').forEach((slide) => {
          const media = slide.querySelector<HTMLElement>('[data-parallax-media]');
          if (!media) return;
          gsap.fromTo(
            media,
            { xPercent: -5, scale: 1.12 },
            {
              xPercent: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: slide,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        });

        // Keyboard users: tabbing to a card scrolls the page to where it is visible.
        const onFocusIn = (event: FocusEvent) => {
          const st = tween.scrollTrigger;
          const slide = (event.target as HTMLElement).closest<HTMLElement>('[data-works-slide]');
          const total = distance();
          if (!st || !slide || total === 0) return;
          const padStart = parseFloat(getComputedStyle(track).paddingLeft) || 0;
          const ratio = gsap.utils.clamp(0, 1, (slide.offsetLeft - padStart) / total);
          window.scrollTo({ top: st.start + ratio * (st.end - st.start), behavior: 'instant' });
        };
        viewport.addEventListener('focusin', onFocusIn);

        return () => {
          viewport.removeEventListener('focusin', onFocusIn);
          viewport.removeAttribute('data-pinned');
        };
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} data-works-viewport>
      {children}
    </div>
  );
}
