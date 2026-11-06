import { contact, profile } from '@/content';
import { contactDisplay, contactHref, displayName } from '@/lib/format';
import { Container } from '@/components/ui/Container/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SplitReveal } from '@/components/motion/SplitReveal';
import { ClosingMark } from './ClosingMark';
import { CopyEmail } from './CopyEmail';
import styles from './Contact.module.scss';

export function Contact() {
  const name = displayName(profile);
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer} aria-labelledby="contact-title" data-section="contact">
      <Container className={styles.inner}>
        <p className={styles.label}>
          <span className={styles.index}>06</span> Contact
        </p>

        <SplitReveal as="h2" id="contact-title" className={styles.heading}>
          {contact.heading}
        </SplitReveal>

        <div className={styles.columns}>
          <Reveal as="p" self className={styles.body}>
            {contact.body}
          </Reveal>

          <Reveal as="ul" className={styles.links} stagger={0.07}>
            {contact.links.map((link) => {
              const href = contactHref(link);
              const external = href !== null && link.kind !== 'email';

              return (
                <li key={link.kind} className={styles.linkRow} data-active={href ? 'true' : undefined}>
                  <span className={styles.linkLabel}>{link.label}</span>
                  {href ? (
                    <span className={styles.linkActions}>
                      <a
                        href={href}
                        className={styles.linkValue}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {contactDisplay(link)}
                        <span className={styles.arrow} aria-hidden="true">
                          ↗
                        </span>
                        {external ? <span className="visually-hidden"> (opens in a new tab)</span> : null}
                      </a>
                      {link.kind === 'email' && link.value ? <CopyEmail email={link.value} /> : null}
                    </span>
                  ) : (
                    // Placeholder until the owner provides a real value.
                    <span className={`${styles.linkValue} ${styles.pending}`}>{link.placeholder}</span>
                  )}
                </li>
              );
            })}
          </Reveal>
        </div>

        <ClosingMark className={styles.closing}>{profile.concept}</ClosingMark>

        <div className={styles.bottom}>
          <p>
            © {year} {name}
          </p>
          <p>{profile.location}</p>
          <a href="#top" className={styles.top}>
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
