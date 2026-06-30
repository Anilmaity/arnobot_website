# ARNOBOT Website — Next.js

The ARNOBOT marketing site rebuilt as a Next.js (App Router + TypeScript) application,
ported from the original static `arnobot_index.html`.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **TypeScript**
- Fonts via `next/font/google` (Syne + DM Sans)
- Zero CSS framework — the original hand-written CSS lives in `app/globals.css`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx          Single-page composition of all sections
  globals.css       All styles
  icon.png          Favicon
components/
  Nav.tsx           Fixed nav (solidifies on scroll)
  Hero.tsx          Hero + HeroCanvas (radar HUD animation)
  HeroCanvas.tsx    Canvas: tactical radar / mission status HUD
  Panels.tsx        Two full-bleed panels (intelligence canvas + image)
  IntelligenceCanvas.tsx  Canvas: nav path / surveillance / targeting HUD
  Products.tsx      Product rows + detail modal (client)
  Technology.tsx    AI capability grid
  Industries.tsx    Industries served
  Comparison.tsx    Traditional vs. autonomous table
  Company.tsx       About + core values
  Careers.tsx       Open roles
  Contact.tsx       Contact details + form (client)
  Footer.tsx        Footer
  Reveal.tsx        IntersectionObserver scroll-reveal wrapper
  icons.tsx         Shared inline SVG icons
lib/
  data.ts           Products, industries, tech, values, jobs, creds
public/
  uploads/          Images and brochures
```

## Notes

- The contact form is client-side only (shows a success state); wire it to a real
  endpoint / API route to actually deliver messages.
- Product brochures (PDF) download from `public/uploads/`.
