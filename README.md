# ARNOBOT — Next.js

The ARNOBOT corporate site, rebuilt from the original PHP project
(`C:\Users\Harshil\Downloads\arnobot\arnobot`) on **Next.js 16 (App Router) + React 19 +
TypeScript + Tailwind CSS 4**.

The brief was to keep the design, content, functionality and UX identical while
improving the implementation, so the visual layer is the original one and the
engineering around it is new.

## Running it

```bash
npm install
cp .env.example .env.local   # SMTP + reCAPTCHA secret — see "Forms & email"
npm run dev                  # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
```

Node 20.9+ (developed on Node 24).

## Stack

| | |
| --- | --- |
| Framework | Next.js 16.3.3, App Router, Turbopack |
| UI | React 19.2, TypeScript 5.9 (`strict`, `noUncheckedIndexedAccess`) |
| Styling | the original `style.css` + Tailwind CSS 4 (see below) |
| Animation | `gsap` 3.12.2 + ScrollTrigger (npm, was an unpinned CDN global) |
| Lightbox | `@fancyapps/ui` 6 (npm, was an unpinned CDN global) |
| Mail | `nodemailer` (was PHPMailer) |

## How Tailwind and `style.css` coexist

`public/assets/css/style.css` is the original stylesheet and remains the source of
truth for the design. It is served from `/public` via a `<link>` rather than bundled,
because bundling would rewrite its relative `url()`s and fail on one that points at a
file that does not exist (`cta-bg.webp`).

Tailwind is layered underneath it in `src/app/globals.css`:

- **Preflight is not imported.** Tailwind's reset would re-style headings, lists,
  images and borders that `style.css` already defines.
- Only the theme variables and the utilities actually used are emitted (~10 KB).
- The brand tokens (`--color-ink`, `--color-accent`, …) are re-declared with `@theme`
  so new UI can use `text-accent` / `bg-footer` and stay in sync.
- `container`, `visible` and `hidden` are excluded via `@source not inline(...)`:
  `style.css` owns those class names, and a competing `.container { width: 100% }`
  would have broken the page gutters on every `.container` page.

Tailwind is used for the parts that did not exist before — the loading skeleton,
error boundary and 404 — plus two small shims that `style.css` cannot express
(the dropdown caret position, formerly injected by JS at runtime).

## Structure

```
src/
  app/
    layout.tsx                 <html>, fonts, global CSS
    globals.css                Tailwind entry + a11y additions
    not-found.tsx              404 inside the site chrome
    global-error.tsx           root boundary (no stylesheet dependency)
    (site)/
      layout.tsx  error.tsx    site chrome + error boundary
      page.tsx, about/, technology/, product/, industries/,
      career/, contact/, blog/, blog-details/, press-release/,
      media-kit/, privacy-policy/, terms-conditions/
    intro/                     the standalone splash (home.php)
    api/contact | career | schedule-demo
  components/
    layout/    Header, Footer, SiteChrome, SiteBehaviors
    sections/  Cta, Ticker, StatusSection + per-page section components
    modals/    VideoModal, IndustryModal, DemoModal
    forms/     ContactForm, CareerForm, ResumeUpload, FormAlert
    ui/        Icons, Toast, Skeleton, PageLoading
    svg/       RadarRings, WhyChooseBackdrop, BlogHeroRadar, FooterRover
  hooks/       useDelegatedClick, useModalDismiss, useCopyToClipboard
  lib/
    behaviors/ revealOnScroll, industrySlider, animations/{home,about,product}
    email/     transport + templates
    dom.ts     Disposer, focus trap, scroll lock, cn()
    gsap.ts    single GSAP registration point
  data/        products, industries, pressReleases, blogArticles, site
  types/       shared domain types
```

Old `.php` URLs still work — `next.config.ts` permanently redirects all fifteen.

## Server vs client

Pages are Server Components. Interactivity is pushed to the smallest possible
client leaves:

- **Modals** (`VideoModal`, `IndustryModal`, `DemoModal`) listen for their triggers
  through one delegated document listener (`useDelegatedClick`), so pages that
  contain a trigger stay server-rendered instead of becoming client trees.
  The listener is **capture-phase**: React binds to the root container, so a
  bubble-phase listener would run after `next/link` had already navigated.
- The industry modal renders its robot cards from typed data — the original built
  them with `innerHTML`. No `innerHTML` remains anywhere.
- `Header`, `PressReleaseList`, `ProductGallery`, `TableOfContents` and the forms
  are client components that own their own state.

### `SiteBehaviors` and the Suspense boundary

`assets/js/main.js` was two 1,000-line `DOMContentLoaded` handlers. It is now typed
modules under `src/lib/behaviors/`, composed by `startSiteBehaviors()` and re-run on
navigation with full teardown (listeners removed, timers cleared, `gsap.context().revert()`).

The page-content Suspense boundary lives in `SiteChrome`, not in a `loading.tsx`.
That is deliberate: with `loading.tsx`, the layout hydrates *before* the page, so the
behaviours started writing GSAP inline styles onto server-rendered nodes React had
not hydrated yet — a reproducible hydration mismatch on `/`. Sharing one boundary
guarantees the content is hydrated first. `SiteBehaviors` sits in a nested boundary
so its `useSearchParams` cannot opt the page content out of static prerendering.

## Forms & email

Unchanged contracts:

- **Contact** — real POST to `/api/contact`, validates, verifies reCAPTCHA, sends the
  email, redirects to `/contact?success=1` or `?error=required|email|captcha|mail`.
- **Careers** — multipart POST to `/api/career` with the resume attached (5 MB,
  `.pdf/.doc/.docx`), redirects the same way.
- **Schedule a demo** — `fetch` POST to `/api/schedule-demo` returning
  `{ status, message }`.

All three keep working without JavaScript. Submit buttons now disable and show a
pending label, and failures render in an inline live region instead of `alert()`.

> **Credentials come from the environment.** The PHP scripts hard-coded a Gmail
> account and app password in source. They are now `SMTP_USER` / `SMTP_PASS` (and
> `RECAPTCHA_SECRET_KEY`) — see `.env.example`. **Until those are set the forms
> validate but cannot send mail.**

## Loading, error, empty, hover, focus, disabled

- **Loading** — `PageLoading` skeleton behind the site chrome while content streams.
- **Error** — `(site)/error.tsx` with a retry button and the error digest;
  `global-error.tsx` as the inline-styled last resort.
- **Empty** — press-release filters, the blog index and the related-articles sidebar
  all render an empty state when their list is empty; the product showcase is omitted
  when a product has none.
- **Focus** — the original stylesheet defined no focus style at all. `:focus-visible`
  rings are added globally; they never fire on mouse clicks, so the resting design is
  untouched. Modals trap focus and restore it on close.
- **Disabled** — form submit buttons disable with `aria-busy` while submitting.
- **Reduced motion** — the industries carousel does not autoplay, and skeletons do not
  pulse, for visitors who ask their OS to reduce motion.

## Accessibility notes

`aria-expanded`, `aria-selected` and `aria-current` are now driven by React state
rather than set by hand. The PRODUCT menu is a real `<button>` with the standard
menu-button keys (Enter/Space/ArrowUp/ArrowDown); it repeats four declarations from
`.main-nav a` in `globals.css` because it no longer matches that selector.

The press-release headlines stay anchors on purpose. Turning them into buttons broke
the design twice — Chrome's user-agent `button { text-transform: none }` dropped the
uppercase, and the heading's `-webkit-line-clamp` stopped applying — so they carry
`role="button"` plus keyboard activation instead.

## Deliberate deviations

- Clean URLs, with permanent redirects from the old `.php` paths.
- GSAP and Fancybox are npm dependencies instead of unpinned CDN globals. The CDN URL
  already served Fancybox v6, where `animated`, `wheel: "zoom"` and the top-level
  `Toolbar`/`Thumbs` options no longer exist and were silently ignored — only
  `dragToClose` ever applied, so that is all the lightbox now passes.
- Google Fonts stays a `<link>`: `style.css` asks for "Outfit" and "Russo One" by
  name, and `next/font` would rename the families.
- Duplicate `id`s in the contact form (`cf-name`, `cf-email`, `cf-phone` were each
  used twice) are now unique, so `<label for>` works.
- Dead code from the PHP build is gone: the unreachable blog search/modal, the
  reading-progress bar that referenced a non-existent element, `set_intro.php`,
  `product.php`'s uncalled `shareProduct()`, and GSAP blocks targeting selectors that
  no longer exist (`.journey`, `.market-*`, `.leader-card`).
- The demo modal had two competing submit handlers (one faked success on a timer).
  Only the real submission remains.
- `assets/drive_downloads/` (125 MB of unreferenced raw footage) was not copied.

## Known pre-existing issue carried over

`style.css` references `../images/cta-bg.webp`, which does not exist in the asset
folder (only `cta-bg.png`). Left as-is — changing it would change the CTA background.

## Verification

`npm run build`, `npm run lint` and `npm run typecheck` are clean.

Checked in headless Chrome against a production build:

- All 15 routes plus the 404 return the expected status; all 15 legacy `.php`
  redirects resolve to the right path.
- All 106 distinct `/assets/**` URLs referenced across the rendered pages resolve.
- Zero page errors and zero console errors on every page; no horizontal overflow at
  1440px or 390px; `.container` keeps its `style.css` width (i.e. Tailwind's
  same-named utility is not leaking in).
- **No hydration mismatches** — 4 loads of every page.
- **45 scripted interaction checks** pass: industry modal (incl. focus trap, scroll
  lock, Escape, keyboard activation), video lightbox, industries slider, demo modal,
  desktop dropdown (positioning, `aria-expanded`, arrow-key focus), mobile drawer and
  submenu, SPA navigation re-init without duplicate handlers, product gallery hover
  swap, Fancybox, showcase videos, press filters/modal, blog TOC scroll-spy, media-kit
  copy toast, contact reCAPTCHA gate, form alert states, 404, intro isolation, and API
  validation for all three endpoints.
- **Pixel-diffed** 59 desktop and 91 mobile screenshots against the pre-refactor
  build. Every page height matches, and the remaining differences are confined to
  video playback frames, the marquee/carousel/radar animation phase, and Google Maps
  tiles — verified by inspecting the diff images.
