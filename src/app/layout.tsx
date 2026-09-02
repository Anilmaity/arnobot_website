import type { Metadata, Viewport } from 'next';
import { SITE } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  icons: { icon: '/assets/images/inc.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    // `style.css` sets `html { scroll-behavior: smooth }`. Next 16 stopped
    // overriding that during route transitions unless this attribute opts in,
    // which left it animating (and dropping) the scroll it manages itself.
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/*
          Space Grotesk (headings, bold only) + Inter (body, navigation, buttons).
          style.css references both by their literal family names, so they are
          fetched from Google Fonts rather than aliased through next/font.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- next/font renames the
            family to a generated identifier, but style.css asks for "Inter" and
            "Space Grotesk" by name, so the font must keep those exact names. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
