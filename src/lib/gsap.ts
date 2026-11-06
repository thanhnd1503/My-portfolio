'use client';

/**
 * Single place where GSAP plugins are registered. Import GSAP from here in
 * Client Components only — never from Server Components.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Mobile address-bar show/hide resizes the viewport; don't re-measure for that.
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Web fonts change text metrics → re-measure trigger positions once loaded.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
