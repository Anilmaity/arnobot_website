'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { markScrollTarget } from '@/lib/behaviors/scrollReset';

/**
 * All three live at module scope rather than in refs: `not-found.tsx` renders
 * its own `SiteChrome`, so navigating from a page into a 404 swaps the layout
 * and remounts this component. Refs would reset with it — the remount would be
 * mistaken for a fresh document and the remembered positions would be lost.
 */
let documentSettled = false;
let cameFromHistory = false;
const positions = new Map<string, number>();

/** History entries are keyed by URL; `?id=` is what distinguishes the product pages. */
const urlKey = () => window.location.pathname + window.location.search;

/**
 * Owns the scroll position across client-side navigation.
 *
 * Following a link lands at the top of the new page. `<Link>` does not do this
 * on its own — it deliberately *keeps* the current scroll position whenever the
 * incoming page element is still inside the viewport, which for these full-bleed
 * hero sections means a link followed from halfway down one page drops the
 * reader into the middle of the next. The PHP site reloaded the document on
 * every link, which always started at the top.
 *
 * Back and forward instead return to where the reader was. The browser would
 * normally handle that itself, but GSAP sets `history.scrollRestoration` to
 * `"manual"` the first time it moves the page (see `gsap/Observer.js`), so the
 * positions are remembered here instead.
 *
 * Links carrying a `#hash` are left alone: they target a section, not the top.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    // Keyed off the live URL rather than a captured one, so a scroll landing in
    // the gap between the URL changing and the effect below cannot file the new
    // page's offset under the old page's key.
    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        positions.set(urlKey(), Math.round(window.scrollY));
      });
    };

    // Where the browser has a Navigation API, Next 16 drives client navigation
    // through it, and its `navigate` event fires *before* the router re-renders.
    // `popstate` does not: it arrives about 20ms later, after the effect below
    // has already run, so on its own it never gets to veto anything. Exactly one
    // of the two is wired up, so a late `popstate` also cannot re-arm the flag
    // after the effect has cleared it and leave the next link click unhandled.
    const navigationApi = (window as Window & { navigation?: EventTarget }).navigation;

    const onNavigate = (event: Event) => {
      if ((event as Event & { navigationType?: string }).navigationType === 'traverse') {
        cameFromHistory = true;
      }
    };
    const onPopState = () => {
      cameFromHistory = true;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    navigationApi?.addEventListener('navigate', onNavigate);
    if (!navigationApi) window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('scroll', onScroll);
      navigationApi?.removeEventListener('navigate', onNavigate);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  useEffect(() => {
    const fromHistory = cameFromHistory;
    cameFromHistory = false;

    // On the first render of a document the browser has already placed the
    // page — at the top for a fresh visit, at the saved offset after a reload.
    if (!documentSettled) {
      documentSettled = true;
      positions.set(urlKey(), Math.round(window.scrollY));
      return;
    }

    // An anchor link (`/page#section`) is asking for that section, not the top.
    if (window.location.hash) return;

    const top = fromHistory ? (positions.get(urlKey()) ?? 0) : 0;

    // `instant` overrides `html { scroll-behavior: smooth }` from style.css,
    // which would otherwise animate the whole page after it has already rendered.
    window.scrollTo({ top, left: 0, behavior: 'instant' });

    // GSAP's ScrollTrigger.refresh() runs a frame later and would put the
    // previous page's offset back. See `lib/behaviors/scrollReset`.
    markScrollTarget(top);
  }, [routeKey]);

  return null;
}
