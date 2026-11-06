'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface HeaderShellProps {
  className?: string;
  children: ReactNode;
}

/**
 * Fixed header element that marks itself `data-scrolled` once the page has
 * scrolled, so CSS can switch from transparent (over the hero) to a solid,
 * blurred bar that keeps scrolled content from showing through.
 */
export function HeaderShell({ className, children }: HeaderShellProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      header.toggleAttribute('data-scrolled', window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header ref={ref} className={className}>
      {children}
    </header>
  );
}
