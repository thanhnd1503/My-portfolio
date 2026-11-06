import Link from 'next/link';
import { navigation, profile } from '@/content';
import { displayName } from '@/lib/format';
import { HeaderShell } from './HeaderShell';
import { MobileNav } from './MobileNav';
import styles from './SiteHeader.module.scss';

export function SiteHeader() {
  const name = displayName(profile);

  return (
    <HeaderShell className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label={`${name} — home`}>
          <span className={styles.mark} aria-hidden="true" />
          <span>{name}</span>
        </Link>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul className={styles.list}>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav items={navigation} />
      </div>
    </HeaderShell>
  );
}
