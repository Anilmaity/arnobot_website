'use client';

import { useEffect, useRef } from 'react';

/**
 * Listens for activation of elements matching `selector` anywhere in the document.
 *
 * The triggers (play buttons, industry cards, "Schedule a Demo" links) live in
 * server-rendered page markup. Delegating from one document listener lets those
 * pages stay Server Components instead of becoming client trees just to open a
 * modal — the approach the original main.js used, but scoped and typed.
 *
 * Enter/Space are handled too, so triggers that are not natively buttons still
 * work for keyboard users once they carry `role="button"` and `tabindex`.
 */
export function useDelegatedClick(
  selector: string,
  handler: (element: HTMLElement, event: Event) => void,
  { enabled = true }: { enabled?: boolean } = {},
): void {
  // Kept in a ref so the document listener is registered once, not on every render.
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!enabled) return;

    const resolve = (event: Event): HTMLElement | null =>
      (event.target as Element | null)?.closest<HTMLElement>(selector) ?? null;

    const onClick = (event: MouseEvent) => {
      const element = resolve(event);
      if (element) handlerRef.current(element, event);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const element = resolve(event);
      // Native buttons and links already emit a click for these keys.
      if (!element || element.matches('a, button')) return;
      event.preventDefault();
      handlerRef.current(element, event);
    };

    // Capture phase: React attaches its own listeners to the root container, so a
    // bubble-phase listener on `document` would run *after* next/link had already
    // navigated. Capturing lets a handler call preventDefault() first — Link then
    // sees `defaultPrevented` and stays put, which is how the original inline
    // handlers (bound directly to each element) behaved.
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [selector, enabled]);
}
