# Roadmap

## Phase 1 — Foundation (done)

- Project initialised (Next.js 16, React 19, TypeScript 5.9, SCSS Modules, GSAP installed)
- Folder architecture, typed content models, centralised content
- Global design system (tokens, typography, mixins, focus and reduced-motion base)
- Shared layout: header with accessible mobile menu, skip link
- Seven static sections plus `/work/[slug]` detail pages
- Responsive at mobile, tablet and desktop

## Phase 2 — Core Scroll Animations (done)

- GSAP initialisation (`src/lib/gsap.ts`)
- Hero cinematic intro (background, horizon line, character rise, staggered meta) and scroll-driven drift
- Scroll-driven typography: masked line reveals on section headings; word scrub on the statement
- Pinned horizontal Selected Works (desktop), with an in-section progress bar and counter
- Global scroll progress bar
- Section reveals (staggered groups and per-item triggers)

## Phase 3 — Interactive Experience (done)

- Image parallax: vertical scrub everywhere; horizontal drift inside the pinned track (`containerAnimation`)
- Hover animations: nav underline, card zoom/title/CTA underline, capability rows, experience roles, contact rows
- Custom cursor: follower ring with link/view states; fine pointers only
- Navigation transitions: curtain between routes, plus a hash-anchor alignment fix
- Contact interactions (copy email)

## Phase 4 — Project Case Studies (done)

- Dynamic routes (SSG) with data-driven section composition
- Case hero with intro timeline (title lines, meta, cover clip-reveal)
- Technical architecture showcase (Enterprise CRM; verified layers + migration path)
- Galleries with labelled placeholder images (`public/projects/*`)
- Previous / Next navigation with wrap-around

## Phase 5 — Responsive & Performance (done)

- Mobile adaptation: simplified intros below desktop, lazy animation setup
- Reduced motion: audited (all GSAP under `matchMedia`, CSS transitions neutralised, no curtain, no cursor lag, instant anchor scrolling)
- Images: AVIF/WebP via next/image; crop-safe placeholders. No video in the project yet.
- SEO: metadata, Open Graph and Twitter cards, generated OG images, canonical URLs, sitemap and robots (domain-gated), JSON-LD Person (name-gated)
- Accessibility: axe (WCAG 2.1 AA + best practice) clean at rest; mobile menu focus management and `inert`
- Cross-browser: Chrome, Firefox 131, WebKit 18 (Playwright on Linux). WebKit hash-scroll race fixed.
- Lighthouse (local production build): see the Phase 5 summary

## Not yet verified

- Real iOS Safari / Android Chrome devices (address-bar resize, momentum scroll during the pin)
- Lighthouse on the real hosting (CDN, HTTP/2, compression), which will differ from localhost

## Risks

- **SplitText and fonts:** split only after `document.fonts.ready`, and re-split on resize (SplitText `autoSplit`) to avoid broken lines.
- **Pinning and anchor links:** pin spacing changes page height; `ScrollTrigger.refresh()` after fonts and images load, and verify `/#contact` style anchors still land correctly.
- **Horizontal track accessibility:** keep cards as real links in DOM order; keyboard focus inside a pinned track must scroll the page to the card.
- **next/font/google** downloads fonts at build time; offline builds need self-hosted fonts via `next/font/local`.

## Content waiting on the owner

Search the codebase for `TODO(owner)`.

- Display name (`profile.name`)
- Contact values: email, GitHub, LinkedIn, portfolio URL
- Employer name for the experience entry (optional)
- Skill classification for: Database Design, Linux, Docker, Git, System Troubleshooting, React.js, Next.js
- Projects 02 and 03: role, context (professional or personal), stack, verified details
- Real project images to replace the placeholders in `public/projects/` (see README)
- Architecture details for projects 02 and 03 (currently `architecture: null`, so the section is hidden)
