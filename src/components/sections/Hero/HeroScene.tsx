'use client';

import { useRef, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { EASE, MEDIA } from '@/components/motion/config';

interface HeroSceneProps {
  className?: string;
  children: ReactNode;
}

/**
 * Client shell for the hero: intro timeline + scroll-driven background/content
 * drift. Markup stays in the server component; this only animates it.
 *
 * Pre-hide contract: when <html data-motion="on"> is set (inline script in the
 * root layout), hero elements are hidden by CSS until this component sets
 * `data-motion-ready`, so the server-rendered text never flashes before the intro.
 */
export function HeroScene({ className, children }: HeroSceneProps) {
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

        const [title] = q('[data-hero-title]');
        const background = q('[data-hero-background]');
        const horizon = q('[data-hero-horizon]');
        const fades = q('[data-hero-fade]');

        // --- Intro timeline -------------------------------------------------
        // Desktop: per-character rise. Below desktop: the title rises as one block
        // (cheaper, and no late re-paint of the largest text when the split reverts).
        const split = title && desktop ? SplitText.create(title, { type: 'chars', smartWrap: true }) : null;
        const tl = gsap.timeline({
          defaults: { ease: EASE.out },
          onComplete: () => split?.revert(), // restore kerning + plain DOM
        });

        tl.fromTo(background, { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.4, ease: 'power2.out' }, 0)
          .fromTo(horizon, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: 'power3.inOut' }, 0.2);

        if (title && split) {
          tl.set(title, { autoAlpha: 1 }, 0).fromTo(
            split.chars,
            { autoAlpha: 0, yPercent: 45 },
            { autoAlpha: 1, yPercent: 0, duration: 1.4, stagger: 0.035 },
            0.25,
          );
        } else if (title) {
          tl.fromTo(title, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.1);
        }

        // Body copy is already visible below desktop (see globals.scss).
        if (desktop) {
          tl.fromTo(fades, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.9);
        }

        // Inline styles are now in place; release the CSS pre-hide.
        html.setAttribute('data-motion-ready', '');

        // --- Scroll-driven drift (reverses naturally with scrub) -----------
        gsap
          .timeline({
            scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
            defaults: { ease: 'none' },
          })
          .to(q('[data-hero-grid]'), { yPercent: desktop ? 18 : 10 }, 0)
          .to(q('[data-hero-halo]'), { yPercent: desktop ? 35 : 20, scale: 1.15 }, 0)
          .to(q('[data-hero-content]'), { y: desktop ? -120 : -60, opacity: 0.25 }, 0);
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className={className} aria-labelledby="hero-title" data-section="hero">
      {children}
    </section>
  );
}
