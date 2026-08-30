'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { startSiteBehaviors } from '@/lib/behaviors';

/**
 * Runs the scroll reveals, GSAP timelines and the industries carousel.
 *
 * The PHP site ran these once per page load. Client-side navigation keeps the
 * document alive, so they are torn down and restarted whenever the route — or
 * the `?id=` a product page is keyed on — changes.
 */
export default function SiteBehaviors() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  useEffect(() => startSiteBehaviors(), [routeKey]);

  return null;
}
