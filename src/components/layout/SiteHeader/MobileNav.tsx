'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import type { NavItem } from '@/types/content';
import styles from './SiteHeader.module.scss';

interface MobileNavProps {
  items: readonly NavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open) {
      // Return focus to the toggle only when closing (not on first render).
      if (wasOpen.current) toggleRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';

    // Everything outside the header becomes inert, so Tab stays inside the menu.
    const header = toggleRef.current?.closest('header');
    const background = Array.from(document.body.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el !== header && !el.contains(header ?? null),
    );
    background.forEach((el) => el.setAttribute('inert', ''));
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      background.forEach((el) => el.removeAttribute('inert'));
    };
  }, [open]);

  return (
    <div className={styles.mobile}>
      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? 'Close' : 'Menu'}</span>
        <span className={styles.toggleIcon} data-open={open} aria-hidden="true" />
      </button>

      <nav ref={panelRef} id={panelId} aria-label="Mobile" className={styles.panel} data-open={open} hidden={!open}>
        <ul className={styles.panelList}>
          {items.map((item, i) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.panelLink} onClick={() => setOpen(false)}>
                <span className={styles.panelIndex}>{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
