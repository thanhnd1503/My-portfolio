import type { ReactNode } from 'react';
import styles from './Tag.module.scss';

interface TagProps {
  children: ReactNode;
  tone?: 'default' | 'accent' | 'muted';
}

export function Tag({ children, tone = 'default' }: TagProps) {
  return <span className={`${styles.tag} ${styles[tone]}`}>{children}</span>;
}
