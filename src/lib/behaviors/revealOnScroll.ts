import { Disposer, queryAll } from '@/lib/dom';
import type { Cleanup } from '@/types';

/**
 * Adds `.visible` to `.reveal` sections as they scroll into view.
 * Ported from the IntersectionObserver at the top of assets/js/main.js.
 */
export function revealOnScroll(): Cleanup {
  const disposer = new Disposer();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      }
    },
    { threshold: 0.12 },
  );

  for (const section of queryAll('.reveal')) observer.observe(section);
  disposer.observe(observer);

  return disposer.cleanup;
}
