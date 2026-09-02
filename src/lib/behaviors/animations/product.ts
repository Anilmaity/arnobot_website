import { gsap } from '@/lib/gsap';

const PLAY_ONCE = { toggleActions: 'play none none none' } as const;

/** True when at least one element matches — GSAP warns on empty targets. */
const present = (selector: string): boolean => document.querySelector(selector) !== null;

function detailsSection(): void {
  if (!present('.product-details')) return;

  // The left column is one of three things: a photo gallery, a 360° turntable
  // or a single render. Each enters the same way, from the left.
  const media = ['.main-product-img', '.product-details-spin', '.product-details-still'].filter(present);
  if (media.length > 0) {
    gsap.from(media.join(', '), {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.product-details', start: 'top 80%', ...PLAY_ONCE },
    });
  }

  if (present('.main-product-img')) {
    gsap.to('.main-product-img', {
      y: -10,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    });
  }

  gsap.from('.product-details-copy > *', {
    opacity: 0,
    x: 40,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.product-details-grid', start: 'top 80%', ...PLAY_ONCE },
  });
}

function specsSection(): void {
  if (!present('.product-specs-section')) return;

  // Products with feature rows render the icon band; the rest render two cards.
  if (present('.icon-band-columns')) {
    gsap.from('.icon-band-column', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.icon-band-columns', start: 'top 80%', ...PLAY_ONCE },
    });
    return;
  }

  if (!present('.specs-cards-grid')) return;

  gsap.from('.specs-cards-grid .specs-card', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.specs-cards-grid', start: 'top 80%', ...PLAY_ONCE },
  });
}

function showcaseSection(): void {
  if (!present('.product-showcase-section')) return;

  gsap.from('.showcase-header > *', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.product-showcase-section', start: 'top 80%', ...PLAY_ONCE },
  });

  gsap.from('.showcase-card', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.showcase-grid', start: 'top 85%', ...PLAY_ONCE },
  });
}

export function productAnimations(): void {
  detailsSection();
  specsSection();
  showcaseSection();
}
