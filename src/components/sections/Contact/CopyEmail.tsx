'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.scss';

interface CopyEmailProps {
  email: string;
}

/** Copies the email address; announces the result to screen readers. */
export function CopyEmail({ email }: CopyEmailProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('failed');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <>
      <button type="button" className={styles.copy} onClick={copy} data-status={status}>
        {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}
      </button>
      <span className="visually-hidden" role="status" aria-live="polite">
        {status === 'copied' ? 'Email address copied to clipboard' : status === 'failed' ? 'Could not copy email address' : ''}
      </span>
    </>
  );
}
