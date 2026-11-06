import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 } as const;

interface OgCardProps {
  eyebrow: string;
  title: string;
  footerLeft: string;
  footerRight: string;
}

/** Shared Open Graph card in the site's palette (system fonts; no network fetch at build). */
export function renderOgCard({ eyebrow, title, footerLeft, footerRight }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: 'radial-gradient(circle at 85% 10%, rgba(168,184,200,0.18), rgba(8,9,11,0) 55%), #08090B',
          color: '#F2F0EB',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 22, letterSpacing: 4, color: '#92969D', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: '#A8B8C8' }} />
          {eyebrow}
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 22 ? 96 : 128, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(242,240,235,0.15)', paddingTop: 28, fontSize: 22, letterSpacing: 3, color: '#92969D', fontFamily: 'monospace', textTransform: 'uppercase' }}>
          <span>{footerLeft}</span>
          <span>{footerRight}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
