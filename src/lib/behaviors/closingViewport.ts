import type { Cleanup } from '@/types';

/**
 * Publishes the footer's rendered height as `--footer-height`.
 *
 * The home page closes on a single screen: the CTA band grows to fill whatever
 * the footer leaves over. The footer is content-sized — its height moves with
 * the breakpoint and with how the address wraps — so it is measured rather than
 * hard-coded, and re-measured whenever it reflows.
 */
export function closingViewport(): Cleanup {
  const footer = document.querySelector<HTMLElement>('footer.footer');
  if (!footer) return () => {};

  const root = document.documentElement;
  const apply = () => {
    root.style.setProperty('--footer-height', `${Math.round(footer.getBoundingClientRect().height)}px`);
  };

  apply();
  const observer = new ResizeObserver(apply);
  observer.observe(footer);

  return () => {
    observer.disconnect();
    root.style.removeProperty('--footer-height');
  };
}
