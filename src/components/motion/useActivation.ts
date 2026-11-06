'use client';

import { useEffect, useState, type RefObject } from 'react';

export interface Activation {
  /** Becomes true (once) when the element comes near the viewport. */
  active: boolean;
  /** Whether the element was already on screen when it activated (e.g. after an anchor jump). */
  startedInView: boolean;
}

/**
 * Defers animation setup until an element approaches the viewport, keeping
 * SplitText/ScrollTrigger work out of the hydration commit. Sticky: never
 * deactivates. Default margin activates ~half a viewport before entry.
 */
export function useActivation(ref: RefObject<Element | null>, rootMargin = '0px 0px 50% 0px'): Activation {
  const [state, setState] = useState<Activation>({ active: false, startedInView: false });

  useEffect(() => {
    const el = ref.current;
    if (!el || state.active) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((e) => e.isIntersecting);
        if (!entry) return;
        const rect = entry.boundingClientRect;
        setState({ active: true, startedInView: rect.top < window.innerHeight && rect.bottom > 0 });
        observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, state.active]);

  return state;
}

/** True when an element is currently (at least partly) within the viewport. */
export function isOnScreen(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}
