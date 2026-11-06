import type { Period, Profile, ContactLink } from '@/types/content';

export function formatPeriod(period: Period): string {
  const end = period.end === 'present' ? 'Present' : period.end;
  return `${period.start} – ${end}`;
}

export function displayName(profile: Profile): string {
  return profile.name ?? profile.namePlaceholder;
}

/** Resolves a contact link to an href, or null if the value is still pending. */
export function contactHref(link: ContactLink): string | null {
  if (!link.value) return null;
  return link.kind === 'email' ? `mailto:${link.value}` : link.value;
}

/** Human-readable form of a contact value (strips protocol for URLs). */
export function contactDisplay(link: ContactLink): string {
  if (!link.value) return link.placeholder;
  const short = link.value.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  try {
    return decodeURIComponent(short); // e.g. Vietnamese characters in LinkedIn slugs
  } catch {
    return short;
  }
}

/** Prefixes a root-relative public asset with the deploy base path (e.g. GitHub Pages subpath). */
export function withBasePath(src: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return base && src.startsWith('/') && !src.startsWith(base + '/') ? `${base}${src}` : src;
}
