import type { Metadata } from 'next';
// Marketing-only global styles (dark theme, hand-written CSS). Scoped to the
// (site) route group so it never loads on the hiring-assistant routes.
import '../globals.css';

export const metadata: Metadata = {
  title: 'ARNOBOT — Robotics Redefined',
  description:
    'Intelligent automation for defence, industrial inspection, and mission-critical environments. Made in India.',
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
