import Link from 'next/link';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main id="main" className={styles.main}>
      <p className={styles.label}>404</p>
      <h1 className={styles.title}>This page sits beyond the interface.</h1>
      <Link href="/" className={styles.link}>
        ← Back home
      </Link>
    </main>
  );
}
