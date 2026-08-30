import { gsap } from '@/lib/gsap';

const PLAY_ONCE = { toggleActions: 'play none none none' } as const;

function detailsSection(): void {
  if (!document.querySelector('.product-details')) return;

  gsap.from('.main-product-img', {
    opacity: 0,
    x: -50,
    scale: 0.95,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.product-details', start: 'top 80%', ...PLAY_ONCE },
  });

  gsap.to('.main-product-img', {
    y: -10,
    duration: 3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });

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
  if (!document.querySelector('.product-specs-section')) return;

  gsap.from('.specs-cards-grid .specs-card:nth-child(1)', {
    opacity: 0,
    x: -50,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.specs-cards-grid', start: 'top 80%', ...PLAY_ONCE },
  });

  gsap.from('.specs-cards-grid .specs-card:nth-child(2)', {
    opacity: 0,
    x: 50,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.specs-cards-grid', start: 'top 80%', ...PLAY_ONCE },
  });
}

function showcaseSection(): void {
  if (!document.querySelector('.product-showcase-section')) return;

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
    y: 50,
    scale: 0.95,
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
