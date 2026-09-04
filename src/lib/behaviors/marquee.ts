import { Disposer, prefersReducedMotion, queryAll } from '@/lib/dom';
import type { Cleanup } from '@/types';

/** The drift when the markup names none: the pace the awards strip runs at. */
const DEFAULT_SPEED_PX_PER_SECOND = 75;

/** A backgrounded tab resumes with a huge gap; without a ceiling it would jump. */
const MAX_FRAME_SECONDS = 0.05;

/**
 * Makes every `[data-marquee]` strip something you can grab — the "Rewards
 * and Recognition" awards on the home page, the workshop rooms on /career.
 *
 * Each strip ships as a pure CSS marquee so it still turns with JS disabled.
 * This behaviour takes over on load: the strip becomes a real scroll
 * container with a grab cursor, the keyframes are switched off, and the drift
 * is driven by `scrollLeft` instead — which is what lets a drag interrupt it
 * and hand control back afterwards. `data-marquee-speed` is the drift in
 * pixels per second, and should match what the keyframes ran at so the
 * hand-over is invisible.
 *
 * The strip's first child is the track, and the track holds identical passes
 * — at least three. Resting scroll is kept inside the second one, so there is
 * a whole pass of runway on either side to wrap into and the seam never comes
 * into view.
 *
 * Touch is left to the browser: an overflow-x container already flicks and
 * scrolls natively, and doing it by hand would only cost the momentum.
 */
export function marquees(): Cleanup {
  const disposer = new Disposer();
  for (const strip of queryAll<HTMLElement>('[data-marquee]')) disposer.add(marquee(strip));
  return disposer.cleanup;
}

function marquee(strip: HTMLElement): Cleanup {
  const firstPass = strip.firstElementChild?.firstElementChild;
  if (!(firstPass instanceof HTMLElement)) return () => {};

  const speed = Number.parseFloat(strip.dataset.marqueeSpeed ?? '') || DEFAULT_SPEED_PX_PER_SECOND;
  const disposer = new Disposer();

  // Reduced motion keeps the strip still. It stays draggable — moving it
  // yourself is not the motion anyone asked to be spared.
  const drifts = !prefersReducedMotion();

  strip.classList.add('is-interactive');
  disposer.add(() => strip.classList.remove('is-interactive'));

  const passWidth = (): number => firstPass.getBoundingClientRect().width;

  /**
   * Pulls the scroll position back into the second pass and reports how far it
   * moved, so a drag in progress can shift its own baseline by the same amount
   * and not jerk under the visitor's cursor.
   */
  const wrap = (): number => {
    if (!drifts) return 0;
    const width = passWidth();
    if (width <= 0) return 0;

    const current = strip.scrollLeft;
    const wrapped = width + (((current - width) % width) + width) % width;
    const shift = wrapped - current;
    if (shift !== 0) strip.scrollLeft = wrapped;
    return shift;
  };

  let dragging = false;
  let pointerHeld = false;
  let settled = false;
  let dragPointer = -1;
  let dragOriginX = 0;
  let dragOriginScroll = 0;

  const endDrag = (): void => {
    pointerHeld = false;
    if (!dragging) return;
    dragging = false;
    if (strip.hasPointerCapture(dragPointer)) strip.releasePointerCapture(dragPointer);
    strip.classList.remove('is-dragging');
  };

  disposer.on(strip, 'pointerdown', (event) => {
    pointerHeld = true;
    // Touch and pen scroll the container natively; only the mouse needs help.
    if (event.pointerType !== 'mouse') return;

    dragging = true;
    dragPointer = event.pointerId;
    dragOriginX = event.clientX;
    dragOriginScroll = strip.scrollLeft;
    strip.setPointerCapture(event.pointerId);
    strip.classList.add('is-dragging');
  });

  disposer.on(strip, 'pointermove', (event) => {
    if (!dragging || event.pointerId !== dragPointer) return;
    event.preventDefault();
    strip.scrollLeft = dragOriginScroll - (event.clientX - dragOriginX);
    dragOriginScroll += wrap();
  });

  disposer.on(strip, 'pointerup', endDrag);
  disposer.on(strip, 'pointercancel', endDrag);

  // Holding still to read is the other half of being able to grab it.
  let hovering = false;
  disposer.on(strip, 'mouseenter', () => {
    hovering = true;
  });
  disposer.on(strip, 'mouseleave', () => {
    hovering = false;
  });
  disposer.on(strip, 'focusin', () => {
    hovering = true;
  });
  disposer.on(strip, 'focusout', () => {
    hovering = false;
  });

  if (drifts) {
    let frame = 0;
    let previous = 0;

    const step = (now: number): void => {
      frame = window.requestAnimationFrame(step);

      // The first pass only establishes a baseline; it must not advance.
      if (previous === 0) {
        previous = now;
        return;
      }
      const elapsed = Math.min((now - previous) / 1000, MAX_FRAME_SECONDS);
      previous = now;

      // Park inside the second pass once layout has a width to measure.
      if (!settled) {
        const width = passWidth();
        if (width <= 0) return;
        strip.scrollLeft = width;
        settled = true;
        return;
      }

      if (hovering || dragging || pointerHeld) return;
      strip.scrollLeft += speed * elapsed;
      wrap();
    };

    frame = window.requestAnimationFrame(step);
    disposer.add(() => window.cancelAnimationFrame(frame));
  }

  // A resize changes the pass width, so the resting position has to be retaken.
  disposer.on(window, 'resize', () => {
    settled = false;
  });

  return disposer.cleanup;
}
