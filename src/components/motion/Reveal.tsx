'use client';

import { useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE, MEDIA, REVEAL_START } from './config';
import { isOnScreen, useActivation } from './useActivation';

type RevealProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  /** Animate the element itself instead of its children. */
  self?: boolean;
  /** Custom targets inside the element (defaults to direct children). */
  selector?: string;
  /** Give every target its own trigger (long vertical lists) instead of one staggered group. */
  each?: boolean;
  stagger?: number;
  y?: number;
  start?: string;
  [dataAttr: `data-${string}`]: string | boolean | undefined;
};

/**
 * Staggered fade/rise reveal on scroll. Reverses when scrolling back up,
 * simplified below desktop, disabled with reduced motion.
 */
export function Reveal({
  as: Tag = 'div',
  children,
  self = false,
  selector,
  each = false,
  stagger = 0.08,
  y = 32,
  start = REVEAL_START,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { active } = useActivation(ref);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !active) return;

      const mm = gsap.matchMedia();
      mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const all: HTMLElement[] = self
          ? [el]
          : Array.from(selector ? el.querySelectorAll<HTMLElement>(selector) : (el.children as HTMLCollectionOf<HTMLElement>));
        // Anything already on screen at activation stays as-is (no hide → reveal flash).
        const targets = each ? all.filter((t) => !isOnScreen(t)) : isOnScreen(el) ? [] : all;
        if (targets.length === 0) return;

        // Opacity only (never `visibility`): hidden-but-unrevealed content must
        // stay focusable, otherwise keyboard users would skip it entirely.
        const from = { opacity: 0, y: desktop ? y : y * 0.6 };
        const to = { opacity: 1, y: 0, duration: desktop ? 1.1 : 0.8, ease: EASE.out };
        const toggleActions = 'play none none reverse';

        const tweens = each
          ? targets.map((target) =>
              gsap.fromTo(target, from, { ...to, scrollTrigger: { trigger: target, start, toggleActions } }),
            )
          : [
              gsap.fromTo(targets, from, {
                ...to,
                stagger: desktop ? stagger : stagger * 0.5,
                scrollTrigger: { trigger: el, start, toggleActions },
              }),
            ];

        // Focus inside not-yet-revealed content → reveal it immediately.
        const onFocusIn = (event: FocusEvent) => {
          tweens.forEach((tween, i) => {
            const owner = each ? targets[i] : el;
            if (owner?.contains(event.target as Node)) tween.progress(1);
          });
        };
        el.addEventListener('focusin', onFocusIn);
        return () => el.removeEventListener('focusin', onFocusIn);
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [active] },
  );

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
