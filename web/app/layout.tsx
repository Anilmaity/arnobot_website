import type { Metadata } from 'next';
import { Syne, DM_Sans, Inter } from 'next/font/google';

// Marketing-site fonts
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
});
// Hiring-assistant font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ARNOBOT',
  description:
    'Intelligent automation for defence, industrial inspection, and mission-critical environments. Made in India.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
