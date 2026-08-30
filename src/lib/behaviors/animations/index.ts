import { gsap, ScrollTrigger } from '@/lib/gsap';
import { queryAll } from '@/lib/dom';
import type { Cleanup } from '@/types';
import { homeAnimations } from './home';
import { aboutAnimations } from './about';
import { productAnimations } from './product';

/**
 * Sections that own a bespoke entrance animation. Everything else marked
 * `.reveal` gets the shared fade-up below — same split as the original script.
 */
const SECTIONS_WITH_CUSTOM_ANIMATION = [
  'about',
  'excellence',
  'products',
  'environment',
  'industries',
  'cta',
  'about-story',
  'why-choose-us',
  'vision-mission',
  'leadership',
  'facility',
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
  const context = gsap.context(() => {
    defaultRevealAnimation();
    homeAnimations();
    aboutAnimations();
    productAnimations();
  });

  // Images and fonts settle after hydration; recompute trigger positions once.
  const frame = requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    cancelAnimationFrame(frame);
    context.revert();
  };
}
