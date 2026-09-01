import { Disposer, prefersReducedMotion } from '@/lib/dom';
import type { Cleanup } from '@/types';

/** Matches the drift the CSS keyframes run at, so the hand-over is invisible. */
const SPEED_PX_PER_SECOND = 75;

/** A backgrounded tab resumes with a huge gap; without a ceiling it would jump. */
const MAX_FRAME_SECONDS = 0.05;

/**
 * Makes the home page "Rewards and Recognition" strip something you can grab.
 *
 * The section ships as a pure CSS marquee so it still turns with JS disabled.
 * This behaviour takes over on load: the strip becomes a real scroll container
 * with a grab cursor, the keyframes are switched off, and the drift is driven
 * by `scrollLeft` instead — which is what lets a drag interrupt it and hand
 * control back afterwards.
 *
 * The track holds four identical passes. Resting scroll is kept inside the
 * second one, so there is a whole pass of runway on either side to wrap into
 * and the seam never comes into view.
 *
 * Touch is left to the browser: an overflow-x container already flicks and
 * scrolls natively, and doing it by hand would only cost the momentum.
 */
export function recognitionMarquee(): Cleanup {
  const marquee = document.getElementById('recognitionMarquee');
  const track = document.getElementById('recognitionTrack');
  if (!marquee || !track) return () => {};

  const firstPass = track.firstElementChild;
  if (!(firstPass instanceof HTMLElement)) return () => {};

  const disposer = new Disposer();

  // Reduced motion keeps the strip still. It stays draggable — moving it
  // yourself is not the motion anyone asked to be spared.
  const drifts = !prefersReducedMotion();

  marquee.classList.add('is-interactive');
  disposer.add(() => marquee.classList.remove('is-interactive'));

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

    const current = marquee.scrollLeft;
    const wrapped = width + (((current - width) % width) + width) % width;
    const shift = wrapped - current;
    if (shift !== 0) marquee.scrollLeft = wrapped;
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
    if (marquee.hasPointerCapture(dragPointer)) marquee.releasePointerCapture(dragPointer);
    marquee.classList.remove('is-dragging');
  };

  disposer.on(marquee, 'pointerdown', (event) => {
    pointerHeld = true;
    // Touch and pen scroll the container natively; only the mouse needs help.
    if (event.pointerType !== 'mouse') return;

    dragging = true;
    dragPointer = event.pointerId;
    dragOriginX = event.clientX;
    dragOriginScroll = marquee.scrollLeft;
    marquee.setPointerCapture(event.pointerId);
    marquee.classList.add('is-dragging');
  });

  disposer.on(marquee, 'pointermove', (event) => {
    if (!dragging || event.pointerId !== dragPointer) return;
    event.preventDefault();
    marquee.scrollLeft = dragOriginScroll - (event.clientX - dragOriginX);
    dragOriginScroll += wrap();
  });

  disposer.on(marquee, 'pointerup', endDrag);
  disposer.on(marquee, 'pointercancel', endDrag);

  // Holding still to read is the other half of being able to grab it.
  let hovering = false;
  disposer.on(marquee, 'mouseenter', () => {
    hovering = true;
  });
  disposer.on(marquee, 'mouseleave', () => {
    hovering = false;
  });
  disposer.on(marquee, 'focusin', () => {
    hovering = true;
  });
  disposer.on(marquee, 'focusout', () => {
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
        marquee.scrollLeft = width;
        settled = true;
        return;
      }

      if (hovering || dragging || pointerHeld) return;
      marquee.scrollLeft += SPEED_PX_PER_SECOND * elapsed;
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
