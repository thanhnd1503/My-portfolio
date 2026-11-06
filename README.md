# Beyond the Interface — Developer Portfolio

A cinematic, minimal personal portfolio built with Next.js (App Router), React, TypeScript, SCSS Modules and GSAP.

## Scripts

| Command             | Purpose                         |
| ------------------- | ------------------------------- |
| `npm run dev`       | Start the dev server            |
| `npm run build`     | Production build (static)       |
| `npm run start`     | Serve the production build      |
| `npm run lint`      | ESLint (next/core-web-vitals)   |
| `npm run typecheck` | TypeScript, no emit             |

Requires Node.js ≥ 20.9.

## Deployment (GitHub Pages)

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml): lint → static build → deploy `out/` to https://thanhnd1503.github.io/My-portfolio/.

The workflow sets these variables (static hosting is opt-in, so `npm run dev` and `npm run start` keep working locally):

| Variable | Value in CI | Effect |
| --- | --- | --- |
| `NEXT_OUTPUT` | `export` | Static export to `out/` with trailing-slash URLs, unoptimised images |
| `NEXT_PUBLIC_BASE_PATH` | `/My-portfolio` | Serves the site under the repository subpath |
| `NEXT_PUBLIC_SITE_URL` | `https://thanhnd1503.github.io/My-portfolio` | Canonical URLs, absolute Open Graph URLs, sitemap |

Reproduce the Pages build locally with `npm run build:pages`; the output goes to `out/`. Moving to a custom domain means updating `NEXT_PUBLIC_SITE_URL`, and setting `NEXT_PUBLIC_BASE_PATH` to empty if the site is served from the domain root.

## Deployment configuration

Copy `.env.example` to `.env.production` (or set it in your hosting provider) and fill in:

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Real domain, e.g. `https://yourdomain.com`. Enables canonical URLs, absolute `og:url`/image URLs, sitemap entries and the sitemap line in robots.txt. |

Until it is set, the site deliberately emits **no** canonical or `og:url` (so a deployment never points search engines at a wrong host), the sitemap is empty, and `next build` prints a `metadataBase` warning. That is expected.

Person structured data (JSON-LD) is emitted only once `profile.name` is set.

## Updating content

All personal content lives in [`src/content/`](src/content). Presentation components never hold personal data.

| File            | Contains                                             |
| --------------- | ---------------------------------------------------- |
| `profile.ts`    | Name, title, positioning, statement, About narrative |
| `skills.ts`     | Skill categories and how each skill has been used    |
| `experience.ts` | Professional experience and education                |
| `projects.ts`   | Selected works (also drives `/work/[slug]` pages)    |
| `contact.ts`    | Email and social links                               |
| `navigation.ts` | Header navigation                                    |

### Replacing placeholder images

Every project image is currently a generated placeholder in `public/projects/<slug>/`. Each one is labelled "Placeholder image", and its gallery caption shows a "Placeholder" tag. To replace one:

1. Put the real file in `public/projects/<slug>/` (PNG, JPG, WebP or AVIF; recommended widths 1600px for covers and wide images, 1200px for half-width ones).
2. In `src/content/projects.ts`, replace the `placeholder(...)` / `placeholderGallery(...)` call with an object `{ src, alt, width, height }` (and a real `caption` for gallery items). Leave `placeholder` out, or set it to `false`.
3. Keep the important part of each image away from its edges. Parallax crops about 6% on each side and up to about 11% at the top and bottom.

Setting `cover: null` falls back to the typographic artwork; an empty `gallery: []` hides the gallery section.

Fields that are still unknown are `null` (or empty arrays). The UI omits them or shows an explicit placeholder; it never fills them with invented data. Search for `TODO(owner)` to find everything still waiting on input.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/ROADMAP.md](docs/ROADMAP.md).
