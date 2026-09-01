import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion, queryAll } from '@/lib/dom';
import type { Cleanup } from '@/types';
import { consumeScrollTarget } from '../scrollReset';
import { homeAnimations } from './home';
import { productAnimations } from './product';

/**
 * Sections that own a bespoke entrance animation. Everything else marked
 * `.reveal` gets the shared fade-up below — same split as the original script.
 */
const SECTIONS_WITH_CUSTOM_ANIMATION = [
  'about',
  'products',
  'environment',
  'industries',
  'cta',
  'product-details',
  'product-specs-section',
  'product-showcase-section',
] as const;

function defaultRevealAnimation(): void {
  // GSAP drives the reveals, so neutralise the CSS transition baked into `.reveal`.
  gsap.set('.reveal', { opacity: 1, y: 0, transition: 'none' });

  for (const section of queryAll('.reveal')) {
    const hasCustom = SECTIONS_WITH_CUSTOM_ANIMATION.some((name) => section.classList.contains(name));
    if (hasCustom) continue;

    gsap.from(section, {
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }
}

/**
 * Runs every scroll animation for the current page inside a `gsap.context`, so a
 * single `revert()` removes the tweens, the ScrollTriggers and any inline styles
 * GSAP applied. Sections that are not on the page are skipped by their own guards.
 */
export function pageAnimations(): Cleanup {
  // Read before the early return below, so a target can never leak into a
  // later navigation and move the page unasked.
  const scrollTarget = consumeScrollTarget();

  // Every animation below is a `.from()` that starts an element at opacity 0.
  // Skipping them leaves the page in its natural, fully visible state, so the
  // reduced-motion path needs no compensating "show everything" pass.
  if (prefersReducedMotion()) return () => {};

  const context = gsap.context(() => {
    defaultRevealAnimation();
    homeAnimations();
    productAnimations();
  });

  // Images and fonts settle after hydration; recompute trigger positions once.
  const frame = requestAnimationFrame(() => {
    ScrollTrigger.refresh();

    // refresh() ends by restoring the scroll position it recorded before
    // measuring — across a route change, the previous page's. Reassert where
    // this navigation actually belongs. `scrollTarget` is null when no
    // navigation set one (an in-page refresh), and then the restore stands.
    if (scrollTarget !== null && Math.round(window.scrollY) !== scrollTarget) {
      window.scrollTo({ top: scrollTarget, left: 0, behavior: 'instant' });
    }
  });

  return () => {
    cancelAnimationFrame(frame);
    context.revert();
  };
}
