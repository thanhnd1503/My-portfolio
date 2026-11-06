# Architecture

## Principles

- **Server Components by default.** Every section is a React Server Component. Client Components are used only where browser APIs or state are needed (currently only `MobileNav`).
- **GSAP lives in Client Components only** (from Phase 2). Each animated section gets a thin client wrapper that owns its own `useGSAP` scope, so ScrollTriggers and SplitText instances are reverted on unmount. No global animation state.
- **Content is separate from presentation.** `src/content/*` holds typed data; `src/types/content.ts` defines the models.
- **Honest data.** Unknown values are typed `Pending<T> = T | null` and rendered as omitted or as a placeholder.

## Folder structure

```
src/
  app/
    layout.tsx             Root layout: fonts (next/font), metadata, header, skip link
    page.tsx               Home: composes the seven sections
    globals.scss           CSS custom properties (design tokens), reset, base styles
    not-found.tsx
    work/[slug]/page.tsx   Project detail pages (SSG via generateStaticParams)
  components/
    layout/                SiteHeader (+ client MobileNav), SkipLink
    sections/              Hero, Statement, SelectedWorks, Capabilities,
                           Experience, About, Contact — one folder each
    case/                  Case-study page: CaseHero (+ client CaseIntro), CaseOverview,
                           Architecture/ArchitectureShowcase, Gallery, ProjectPager
    ui/                    Container, SectionHeader, Tag, MediaFrame, ProjectVisual
  content/                 Typed portfolio data (single source of truth)
  lib/format.ts            Pure helpers (period formatting, placeholder resolution)
  styles/                  _tokens.scss (breakpoints, easings), _mixins.scss
  types/content.ts         Content models
docs/                      This file and the roadmap
```

SCSS modules import shared helpers with `@use 'mixins' as *;`. This resolves through `sassOptions.loadPaths` in `next.config.ts`.

## Design system

| Token                    | Value                         |
| ------------------------ | ----------------------------- |
| `--color-bg`             | `#08090B`                     |
| `--color-surface`        | `#15171B`                     |
| `--color-text`           | `#F2F0EB`                     |
| `--color-text-secondary` | `#92969D`                     |
| `--color-accent`         | `#A8B8C8`                     |
| `--font-display`         | Instrument Serif (headlines)  |
| `--font-sans`            | Inter (body)                  |
| `--font-mono`            | JetBrains Mono (labels/meta)  |

Type sizes (`--text-xs` … `--text-hero`) and spacing (`--gutter`, `--section-space`) are fluid `clamp()` values.

Breakpoints (mobile-first, via `@include from(...)` / `below(...)`):

| Name    | Min width | Experience                                   |
| ------- | --------- | -------------------------------------------- |
| mobile  | —         | Vertical cards, simplified layouts           |
| tablet  | 768px     | Adaptive two-column layouts                  |
| desktop | 1200px    | Full cinematic layout, horizontal works track |

`@include hover` applies hover styles only on fine pointers, so touch devices get no sticky hover states.

## Motion system

All GSAP code runs in Client Components. Server components keep the markup; a thin client shell or primitive animates it.

```
src/lib/gsap.ts                 Registers ScrollTrigger, SplitText, useGSAP (once); refreshes after fonts load
src/components/motion/
  config.ts                     Shared media queries (MEDIA) and eases
  Reveal.tsx                    Staggered fade/rise on scroll (group or `each`)
  SplitReveal.tsx               SplitText typography: `lines` (masked rise) or `scrub` (words brighten)
  ScrollProgress/               Fixed page progress bar (re-created per route)
src/components/sections/
  Hero/HeroScene.tsx            Intro timeline + scroll-driven background/content drift
  SelectedWorks/WorksShowcase.tsx  Pinned horizontal track
```

### Rules every motion component follows

- **Owned cleanup:** each one creates its tweens inside `useGSAP({ scope })` and a `gsap.matchMedia()`, and returns `mm.revert()`. Unmount, a route change or a breakpoint change reverts everything, including SplitText DOM and pin spacers.
- **Reduced motion:** every animation is registered under `(prefers-reduced-motion: no-preference)`. With `reduce`, nothing is split, pinned or hidden. Only the progress bar remains, without smoothing.
- **Reverse scrolling:** reveals use `toggleActions: 'play none none reverse'`; scroll-linked effects use `scrub`.
- **Resize:** `matchMedia` swaps modes at breakpoints, the pin uses `invalidateOnRefresh` with function-based values, and SplitText uses `autoSplit`, so it re-splits on width change and font load.
- **Accessibility:**
  - Reveals animate `opacity`, never `visibility`, so unrevealed content stays focusable.
  - Focusing inside unrevealed content completes the reveal at once.
  - SplitText keeps an `aria-label` with the full text.
  - The hero split is reverted after the intro.

### Responsive behaviour

| Feature                  | Mobile (<768) | Tablet (768–1199) | Desktop (≥1200)                              |
| ------------------------ | ------------- | ----------------- | -------------------------------------------- |
| Hero intro + drift       | yes (lighter) | yes (lighter)     | yes                                          |
| Split headings / scrub   | yes           | yes               | yes                                          |
| Reveals                  | 60% distance, half stagger | same | full                                     |
| Selected Works           | vertical cards | 2-col grid       | pinned horizontal when height ≥ 720px, else native horizontal scroll |

### Hero pre-hide contract

An inline script in `app/layout.tsx` sets `<html data-motion="on">` before first paint, but only when motion is allowed. CSS hides `[data-hero-title]`, `[data-hero-fade]` and `[data-hero-background]` until `HeroScene` has applied its inline start states and set `data-motion-ready`. Safety net: the script sets `data-motion-ready` itself after 4s. Without JS, or with reduced motion, nothing is hidden.

### Pinned works

`WorksShowcase` sets `data-pinned` on the viewport, which switches CSS to `overflow-x: clip` and header-clearing padding. It then pins at `top top` and scrubs the track's `x`. The scroll length is `max(distance × 2, viewport height)`. Focusing a card scrolls the page to the matching pin position, so keyboard users can always see the focused card.

### Hero X-ray lens (`sections/Hero/HeroXray.tsx`)

The hero's signature effect. There is no display headline and no photo: the page's h1 is the professional title in the hero's bottom block. It uses Canvas 2D and GSAP only.

- **System layer:** a canvas graph of nodes, edges and travelling request packets fills the hero. A few nodes are labelled with the owner's professionally used stack, from `skills.ts` (names of 15 characters or fewer). It uses a seeded PRNG, so the layout is the same on every visit. Outside the lens it shows at 14% through a CSS mask, intersected with a vertical fade.
- **Lens:**
  - It follows the mouse on fine pointers, and runs a slow figure-eight autopilot on touch screens or after 2.5s without mouse movement.
  - JS writes `--x / --y / --r` to the layer, and the canvas mask reveals the system at full strength inside the lens.
  - A HUD ring and tag (`SYSTEM LAYER`, coordinates) follow the lens.
- **Motion:** the lens opens at about 1.5s. Scrolling out of the hero widens it over the whole system, through a ScrollTrigger scrub on `power2.in` progress, while the HUD fades out.
- **Performance:**
  - Setup runs at idle time (`requestIdleCallback`), and there are no per-frame layout reads.
  - It pauses when the hero is off screen or the tab is hidden.
  - Touch devices render at 30fps and park the lens after 6.5s of wall-clock time; after that it only redraws while scrolling.
  - DPR is capped at 2 on desktop and 1.5 below it. Node count is 72 on desktop, 50 on tablet and 30 on mobile.
- **Reduced motion:** one static, faint frame. No lens, no ticker.

### Interactive layer (Phase 3)

| Piece | File | Behaviour |
| --- | --- | --- |
| Vertical parallax | `motion/Parallax.tsx` (used by `ui/ProjectVisual`) | Scrubs `[data-parallax-media]` ±5% (±3% below desktop). With `parallax="unpinned"` it stands down while the works track is pinned. |
| Pinned parallax | `SelectedWorks/WorksShowcase.tsx` | Media drift `xPercent −5 → 5` via `containerAnimation` tied to the track tween. |
| Card hover | `ProjectCard.module.scss`, `ProjectVisual.module.scss` | Triggered by an ancestor's `data-hover-scope`. The zoom runs on `.inner`, never on the GSAP-driven `.media`. Fine pointers only. |
| Custom cursor | `layout/Cursor/` | Follower ring added alongside the native cursor (which stays visible). States: `default`, `link` (interactive elements), `view` (`data-cursor="view"`). Mouse pointers only; `display: none` on touch and coarse pointers; no lag with reduced motion. |
| Route transition | `layout/RouteTransition/` | Capture-phase click interception for internal links to a different pathname: curtain covers, then `router.push`, then the curtain lifts once the new pathname renders. Skipped for same-page hashes, modifier clicks, `_blank`, downloads, and reduced motion. 2.5s safety reveal. |
| Hash alignment | `RouteTransition.tsx` → `alignToHash()` | After fonts load and pins are created, re-scrolls to `#hash` (pin spacers shift anchors and ScrollTrigger refresh restores stale positions). Runs on first load and on every route change. |
| Contact | `Contact/CopyEmail.tsx`, `Contact.module.scss` | Copy-email button with an `aria-live` status, rendered only once a real email exists. Active rows draw an accent hairline on hover. |
