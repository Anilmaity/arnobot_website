import { gsap } from '@/lib/gsap';

const PLAY_ONCE = { toggleActions: 'play none none none' } as const;

function heroSection(): void {
  if (!document.querySelector('.about-hero')) return;

  const timeline = gsap.timeline();
  timeline.from('.about-hero-content .eyebrow', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' });
  timeline.from('.about-hero-content h1', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  timeline.from(
    '.about-hero-image img',
    { opacity: 0, x: 80, scale: 0.95, duration: 1, ease: 'power3.out' },
    '-=0.6',
  );

  gsap.to('.about-hero-image img', {
    y: -15,
    duration: 3.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  });
}

function storySection(): void {
  if (!document.querySelector('.about-story')) return;

  gsap.from('.about-story-content', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.about-story', start: 'top 80%', ...PLAY_ONCE },
  });

  gsap.from('.about-story-title > *', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.about-story', start: 'top 80%', ...PLAY_ONCE },
  });

  gsap.to('.about-story-icon img', {
    rotation: 360,
    ease: 'none',
    scrollTrigger: { trigger: '.about-story', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

function whyChooseUsSection(): void {
  if (!document.querySelector('.why-choose-us')) return;

  gsap.from('.why-choose-us-left > .eyebrow, .why-choose-us-left h2, .why-choose-us-desc', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.why-choose-us', start: 'top 80%', ...PLAY_ONCE },
  });

  gsap.from('.why-item', {
    opacity: 0,
    scale: 0.85,
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.why-choose-us-grid', start: 'top 85%', ...PLAY_ONCE },
  });

  gsap.to('.why-choose-us-right', {
    yPercent: 8,
    ease: 'none',
    scrollTrigger: { trigger: '.why-choose-us', start: 'top bottom', end: 'bottom top', scrub: true },
  });
}

function visionMissionSection(): void {
  if (!document.querySelector('.vision-mission')) return;

  gsap.from('.vision-mission-card', {
    opacity: 0,
    x: 50,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.vision-mission-cards', start: 'top 80%', ...PLAY_ONCE },
  });
}

function leadershipSection(): void {
  if (!document.querySelector('.leadership')) return;

  gsap.from('.leadership .section-title', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.leadership', start: 'top 80%', ...PLAY_ONCE },
  });
}

function facilitySection(): void {
  if (!document.querySelector('.facility')) return;

  if (document.querySelector('.facility-left')) {
    gsap.from('.facility-left > *', {
      opacity: 0,
      x: -40,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.facility', start: 'top 80%', ...PLAY_ONCE },
    });
  }

  if (document.querySelector('.facility-gallery')) {
    gsap.from('.facility-item', {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.facility-gallery', start: 'top 85%', ...PLAY_ONCE },
    });
  }

  if (document.querySelector('.facility-caption')) {
    gsap.from('.facility-caption', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.facility-caption', start: 'top 90%', ...PLAY_ONCE },
    });
  }
}

export function aboutAnimations(): void {
  heroSection();
  storySection();
  whyChooseUsSection();
  visionMissionSection();
  leadershipSection();
  facilitySection();
}
