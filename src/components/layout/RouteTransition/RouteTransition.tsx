'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import styles from './RouteTransition.module.scss';

const REDUCED = '(prefers-reduced-motion: reduce)';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Anchor hrefs include the basePath; router.push() adds it again, so strip it first. */
function stripBasePath(pathname: string): string {
  if (!BASE_PATH || !pathname.startsWith(BASE_PATH)) return pathname;
  return pathname.slice(BASE_PATH.length) || '/';
}

/**
 * Pins (pin-spacers) and font loading change page height after the browser or
 * router has already scrolled to `#hash`, and ScrollTrigger.refresh() restores
 * stale positions. WebKit additionally lets a stale *smooth* hash scroll finish
 * after any correction. So: force instant scrolling while aligning, correct the
 * offset relative to scroll-padding, and re-check until layout has settled.
 * Returns a cleanup.
 */
function alignToHash(): () => void {
  const html = document.documentElement;
  const timers: number[] = [];
  let frame = 0;
  let cancelled = false;
  const restore = () => {
    html.style.scrollBehavior = '';
  };
  const cleanup = () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    timers.forEach((t) => window.clearTimeout(t));
    restore();
  };

  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) {
    timers.push(window.setTimeout(restore, 50));
    return cleanup;
  }

  html.style.scrollBehavior = 'auto';
  const align = () => {
    if (cancelled) return;
    const target = document.getElementById(id);
    if (!target) return;
    const padding = parseFloat(getComputedStyle(html).scrollPaddingTop) || 0;
    const delta = target.getBoundingClientRect().top - padding;
    if (Math.abs(delta) > 1) window.scrollTo(0, window.scrollY + delta);
  };
  const run = () => {
    // Two frames: let ScrollTrigger create pins and finish its refresh first.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        align();
        timers.push(
          window.setTimeout(align, 350),
          window.setTimeout(() => {
            align();
            restore();
          }, 900),
        );
      });
    });
  };
  if (document.fonts?.status === 'loaded') run();
  else document.fonts?.ready.then(run);
  return cleanup;
}

export function RouteTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const revealRef = useRef<(() => void) | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const panel = ref.current;
    if (!panel) return;

    const reveal = () => {
      covering.current = false;
      gsap.killTweensOf(panel);
      gsap.to(panel, {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
        delay: 0.05,
        onComplete: () => {
          gsap.set(panel, { autoAlpha: 0 });
        },
      });
    };
    revealRef.current = reveal;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (window.matchMedia(REDUCED).matches) return;

      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page (incl. hash links)

      event.preventDefault();
      if (covering.current) return;
      covering.current = true;
      // Instant scrolling during the swap; alignToHash() restores it afterwards.
      document.documentElement.style.scrollBehavior = 'auto';

      gsap.killTweensOf(panel);
      gsap
        .timeline({ onComplete: () => router.push(stripBasePath(url.pathname) + url.search + url.hash) })
        .set(panel, { autoAlpha: 1, yPercent: 100 })
        .to(panel, { yPercent: 0, duration: 0.55, ease: 'power3.inOut' });

      // Safety net: never leave the curtain down.
      window.setTimeout(() => {
        if (covering.current) reveal();
      }, 2500);
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      gsap.killTweensOf(panel);
      revealRef.current = null;
    };
  }, [router]);

  // New route rendered (or first load) → lift the curtain and land on the hash target.
  useEffect(() => {
    if (covering.current) revealRef.current?.();
    return alignToHash();
  }, [pathname]);

  return (
    <div ref={ref} className={styles.curtain} aria-hidden="true">
      <span className={styles.mark} />
    </div>
  );
}
