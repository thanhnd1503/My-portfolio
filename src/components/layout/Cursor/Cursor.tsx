'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './Cursor.module.scss';

type CursorState = 'default' | 'link' | 'view';

/** Fine pointer + hover capable only. Touch / pen / coarse pointers never get it. */
const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label';

/**
 * Follower ring that complements (never replaces) the native cursor.
 * States: default dot, `link` ring over interactive elements, `view` label
 * over elements marked `data-cursor="view"`.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(
      { fine: FINE_POINTER, motion: '(prefers-reduced-motion: no-preference)' },
      (ctx) => {
        const { fine, motion } = ctx.conditions as { fine: boolean; motion: boolean };
        if (!fine) return;

        const duration = motion ? 0.45 : 0;
        const xTo = gsap.quickTo(el, 'x', { duration, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration, ease: 'power3.out' });
        let visible = false;
        let state: CursorState = 'default';

        const setState = (next: CursorState) => {
          if (next === state) return;
          state = next;
          el.dataset.state = next;
        };

        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return;
          if (!visible) {
            // First move: jump into place, then fade in.
            gsap.set(el, { x: event.clientX, y: event.clientY });
            gsap.to(el, { autoAlpha: 1, duration: 0.3 });
            visible = true;
          }
          xTo(event.clientX);
          yTo(event.clientY);

          const target = event.target as Element | null;
          if (target?.closest('[data-cursor="view"]')) setState('view');
          else if (target?.closest(INTERACTIVE)) setState('link');
          else setState('default');
        };

        const hide = () => {
          visible = false;
          gsap.to(el, { autoAlpha: 0, duration: 0.3 });
        };
        const onDown = () => el.setAttribute('data-pressed', '');
        const onUp = () => el.removeAttribute('data-pressed');

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerdown', onDown);
        window.addEventListener('pointerup', onUp);
        document.documentElement.addEventListener('pointerleave', hide);
        window.addEventListener('blur', hide);

        return () => {
          window.removeEventListener('pointermove', onMove);
          window.removeEventListener('pointerdown', onDown);
          window.removeEventListener('pointerup', onUp);
          document.documentElement.removeEventListener('pointerleave', hide);
          window.removeEventListener('blur', hide);
          gsap.set(el, { autoAlpha: 0 });
        };
      },
    );

    return () => mm.revert();
  });

  return (
    <div ref={ref} className={styles.cursor} data-state="default" aria-hidden="true">
      <span className={styles.ring} />
      <span className={styles.label}>View</span>
    </div>
  );
}
