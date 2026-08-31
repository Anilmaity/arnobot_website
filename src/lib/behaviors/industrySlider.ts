import { Disposer, prefersReducedMotion, queryAll } from '@/lib/dom';
import type { Cleanup } from '@/types';

const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 35;

function cardsPerView(): number {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 4;
}

/**
 * The home page "Industries We Serve" carousel — ported from initIndustrySlider()
 * in assets/js/main.js.
 *
 * Behaviour is unchanged except that autoplay is skipped for visitors who have
 * asked their OS to reduce motion.
 */
export function industrySlider(): Cleanup {
  const track = document.getElementById('indSliderTrack');
  const container = document.getElementById('indSliderTrackContainer');
  const prevBtn = document.getElementById('indSliderPrev');
  const nextBtn = document.getElementById('indSliderNext');
  const dotsContainer = document.getElementById('indSliderDots');

  if (!track || !container) return () => {};

  const cards = queryAll<HTMLElement>('.industry', track);
  if (cards.length === 0) return () => {};

  const disposer = new Disposer();
  const total = cards.length;

  let index = 0;
  let perView = cardsPerView();
  let maxIndex = Math.max(0, total - perView);
  let autoplayTimer: number | null = null;

  const update = (animate = true): void => {
    perView = cardsPerView();
    maxIndex = Math.max(0, total - perView);
    if (index > maxIndex) index = maxIndex;

    const firstCard = cards[0];
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = Number.parseFloat(window.getComputedStyle(track).gap) || (window.innerWidth <= 600 ? 16 : 24);
      track.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    }

    if (dotsContainer) {
      queryAll<HTMLElement>('.industry-dot', dotsContainer).forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }
  };

  const goTo = (next: number): void => {
    index = Math.max(0, Math.min(next, maxIndex));
    update();
  };

  const nextSlide = (): void => goTo(index < maxIndex ? index + 1 : 0);
  const prevSlide = (): void => goTo(index > 0 ? index - 1 : maxIndex);

  const stopAutoplay = (): void => {
    if (autoplayTimer !== null) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const startAutoplay = (): void => {
    stopAutoplay();
    if (prefersReducedMotion()) return;
    autoplayTimer = window.setInterval(nextSlide, AUTOPLAY_MS);
  };

  const renderDots = (): void => {
    if (!dotsContainer) return;
    dotsContainer.replaceChildren();

    const count = maxIndex + 1;
    if (count <= 1) return;

    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `industry-dot${i === index ? ' active' : ''}`;
      dot.setAttribute('aria-label', `Go to industry slide ${i + 1}`);
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      dot.addEventListener('click', (event) => {
        event.stopPropagation();
        goTo(i);
        startAutoplay();
      });
      dotsContainer.append(dot);
    }
  };

  if (nextBtn) {
    disposer.on(nextBtn, 'click', (event) => {
      event.stopPropagation();
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    disposer.on(prevBtn, 'click', (event) => {
      event.stopPropagation();
      prevSlide();
      startAutoplay();
    });
  }

  // Touch drag / swipe
  let startX = 0;
  let touching = false;

  disposer.on(
    container,
    'touchstart',
    (event) => {
      startX = event.touches[0]?.clientX ?? 0;
      touching = true;
    },
    { passive: true },
  );

  disposer.on(container, 'touchend', (event) => {
    if (!touching) return;
    touching = false;
    const delta = startX - (event.changedTouches[0]?.clientX ?? startX);
    if (delta > SWIPE_THRESHOLD) {
      nextSlide();
      startAutoplay();
    } else if (delta < -SWIPE_THRESHOLD) {
      prevSlide();
      startAutoplay();
    }
  });

  disposer.on(container, 'mouseenter', stopAutoplay);
  disposer.on(container, 'mouseleave', startAutoplay);
  // Pausing on keyboard focus keeps the carousel usable for keyboard visitors.
  disposer.on(container, 'focusin', stopAutoplay);
  disposer.on(container, 'focusout', startAutoplay);

  disposer.on(window, 'resize', () => {
    perView = cardsPerView();
    maxIndex = Math.max(0, total - perView);
    renderDots();
    update(false);
  });

  renderDots();
  update(false);
  disposer.timeout(() => update(false), 200);
  startAutoplay();
  disposer.add(stopAutoplay);
  disposer.add(() => dotsContainer?.replaceChildren());

  return disposer.cleanup;
}
