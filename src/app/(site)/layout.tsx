import type { ReactNode } from 'react';
import SiteChrome from '@/components/layout/SiteChrome';

/** Every page that used to `require` includes/header.php + includes/footer.php. */
export default function SiteLayout({ children }: { readonly children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
