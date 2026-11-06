import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { canonicalFor, metadataBase, ogImage, profile, site } from '@/content';
import { displayName } from '@/lib/format';
import { SiteHeader } from '@/components/layout/SiteHeader/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink/SkipLink';
import { ScrollProgress } from '@/components/motion/ScrollProgress/ScrollProgress';
import { Cursor } from '@/components/layout/Cursor/Cursor';
import { RouteTransition } from '@/components/layout/RouteTransition/RouteTransition';
import './globals.scss';

const sans = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-sans', display: 'swap' });
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});
const mono = JetBrains_Mono({ subsets: ['latin', 'vietnamese'], variable: '--font-mono', display: 'swap' });

const name = displayName(profile);
const homeCanonical = canonicalFor('/');
const homeOgImage = ogImage('home', `${profile.concept} — ${profile.title}`);

/**
 * Runs before first paint. Marks <html data-motion="on"> when motion is allowed
 * so the hero can stay hidden until its intro starts. Safety net: if the JS
 * bundle never runs, content is released after 4s.
 */
const motionBootstrap = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){d.setAttribute('data-motion','on');setTimeout(function(){d.setAttribute('data-motion-ready','')},4000)}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${name} — ${profile.title}`,
    template: `%s — ${name}`,
  },
  description: profile.positioning,
  applicationName: name,
  ...(profile.name ? { authors: [{ name: profile.name }], creator: profile.name } : {}),
  alternates: homeCanonical.alternates,
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: name,
    title: `${name} — ${profile.title}`,
    description: profile.positioning,
    url: homeCanonical.openGraphUrl,
    images: [homeOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${name} — ${profile.title}`,
    description: profile.positioning,
    images: [homeOgImage],
  },
  formatDetection: { email: false, telephone: false, address: false },
};

/** schema.org Person — only emitted once the owner's real name is set. */
const personJsonLd = profile.name
  ? {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      jobTitle: profile.title,
      description: profile.positioning,
      address: { '@type': 'PostalAddress', addressLocality: 'Ho Chi Minh City', addressCountry: 'VN' },
      ...(site.url ? { url: site.url } : {}),
    }
  : null;

export const viewport: Viewport = {
  themeColor: '#08090B',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
        {personJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
          />
        ) : null}
      </head>
      <body>
        <SkipLink />
        <SiteHeader />
        {children}
        {/* Last, so its 'max' range is measured after every pin on the page. */}
        <ScrollProgress />
        <RouteTransition />
        <Cursor />
      </body>
    </html>
  );
}
