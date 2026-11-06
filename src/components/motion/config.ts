/** Media queries shared by all motion components (used with gsap.matchMedia). */
export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1200px)',
  /** Pinned horizontal works: wide AND tall enough to fit a card while pinned. */
  pinnedWorks: '(min-width: 1200px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)',
} as const;

export const EASE = {
  out: 'expo.out',
  soft: 'power3.out',
} as const;

/** Default ScrollTrigger start for reveals. */
export const REVEAL_START = 'top 85%';
