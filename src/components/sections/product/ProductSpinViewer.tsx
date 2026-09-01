'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import SpinCue from '@/components/ui/SpinCue';
import type { ProductSpin } from '@/types';

/**
 * Pixels of drag that make one full revolution, as a multiple of the stage
 * width. Just over one width: a comfortable swipe turns the machine most of the
 * way round without the frames flicking past faster than they read.
 */
const DRAG_TRAVEL = 1.2;

/** Inertia after the pointer lifts, damped per frame as KeyShot VR does it. */
const DAMPING = 0.94;
const MIN_VELOCITY = 0.0025;

/** Frames a key press turns. */
const KEY_STEP = 1;
const PAGE_STEP = 3;

function framePath(dir: string, index: number): string {
  return `${dir}/frame-${String(index).padStart(2, '0')}.webp`;
}

interface ProductSpinViewerProps {
  readonly name: string;
  readonly spin: ProductSpin;
}

/**
 * Interactive 360 degree product render — the turntable frame set, spun by dragging.
 *
 * The frames are keyed to transparency and sit straight on the section, with no
 * panel or chrome around them: the machine is the element, and the only mark on
 * it is the orbit glyph that says it turns. Nothing moves on its own — the
 * render turns when, and only as far as, the reader turns it.
 *
 * The whole set is fetched and decoded up front and the stage does not turn
 * until it is, so a spin is pure compositing — never a fetch or a decode landing
 * mid-drag. Every frame stays in the DOM and only its opacity changes; rotation
 * is tracked as a float in a ref and only the rounded frame index reaches React,
 * which keeps a drag to one cheap re-render per pointer move rather than one per
 * pixel of travel.
 *
 * `touch-action: pan-y` on the stage is deliberate: a horizontal drag rotates,
 * a vertical one still scrolls the page, so the viewer cannot trap a reader
 * scrolling past it on a phone.
 */
export default function ProductSpinViewer({ name, spin }: ProductSpinViewerProps) {
  const { dir, frames, startIndex, width, height } = spin;

  const stageRef = useRef<HTMLDivElement | null>(null);
  /** Rotation as a fractional frame index; the source of truth while dragging. */
  const posRef = useRef(startIndex);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const engagedRef = useRef(false);

  const [frame, setFrame] = useState(startIndex);
  const [engaged, setEngaged] = useState(false);
  const [ready, setReady] = useState(false);

  const commit = useCallback(() => {
    setFrame(((Math.round(posRef.current) % frames) + frames) % frames);
  }, [frames]);

  const stopAnimation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  /** First touch of the stage; after it the orbit glyph steps back. */
  const engage = useCallback(() => {
    if (engagedRef.current) return;
    engagedRef.current = true;
    setEngaged(true);
  }, []);

  useEffect(() => stopAnimation, [stopAnimation]);

  /* Fetch and decode the whole turntable before it will turn.
     `decode()` is the part that matters: an image that has merely loaded is
     still decoded lazily, on the frame it is first painted — which lands as a
     stutter on the first turn, exactly when the reader is judging whether the
     thing is smooth. Awaiting it puts every frame in memory ready to paint. */
  useEffect(() => {
    let cancelled = false;

    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        image.src = src;
        image.decode().then(
          () => resolve(),
          () => {
            // Safari rejects decode() on some cached images, and a frame that
            // will not decode still must not hold the viewer shut.
            if (image.complete) resolve();
            else {
              image.onload = () => resolve();
              image.onerror = () => resolve();
            }
          },
        );
      });

    void Promise.all(
      Array.from({ length: frames }, (_, index) => preload(framePath(dir, index))),
    ).then(() => {
      if (!cancelled) setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [dir, frames]);

  const framesPerPixel = () => {
    const stageWidth = stageRef.current?.getBoundingClientRect().width ?? 600;
    return frames / (stageWidth * DRAG_TRAVEL);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!ready || (event.pointerType === 'mouse' && event.button !== 0)) return;
    engage();
    stopAnimation();
    draggingRef.current = true;
    velocityRef.current = 0;
    lastXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    // Drag right and the face nearest the reader travels right with the pointer.
    const step = (event.clientX - lastXRef.current) * framesPerPixel();
    lastXRef.current = event.clientX;
    posRef.current += step;
    velocityRef.current = step;
    commit();
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const glide = () => {
      velocityRef.current *= DAMPING;
      if (Math.abs(velocityRef.current) < MIN_VELOCITY) {
        rafRef.current = null;
        return;
      }
      posRef.current += velocityRef.current;
      commit();
      rafRef.current = requestAnimationFrame(glide);
    };
    rafRef.current = requestAnimationFrame(glide);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === 'ArrowRight'
        ? KEY_STEP
        : event.key === 'ArrowLeft'
          ? -KEY_STEP
          : event.key === 'PageUp'
            ? PAGE_STEP
            : event.key === 'PageDown'
              ? -PAGE_STEP
              : event.key === 'Home'
                ? 0
                : null;
    if (step === null || !ready) return;

    event.preventDefault();
    engage();
    stopAnimation();
    velocityRef.current = 0;
    posRef.current = step === 0 ? startIndex : posRef.current + step;
    commit();
  };

  const degrees = Math.round((frame / frames) * 360);

  return (
    <div className="product-details-image product-details-spin">
      <div
        ref={stageRef}
        className={`spin-stage${ready ? ' is-ready' : ''}${engaged ? ' is-engaged' : ''}`}
        role="slider"
        tabIndex={0}
        aria-label={`${name} 360-degree render. Drag, or use the arrow keys, to rotate.`}
        aria-valuemin={0}
        aria-valuemax={359}
        aria-valuenow={degrees}
        aria-valuetext={`Rotated ${degrees} degrees`}
        aria-orientation="horizontal"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <div className="spin-frames">
          {Array.from({ length: frames }, (_, index) => (
            <img
              key={index}
              className="spin-frame"
              src={framePath(dir, index)}
              alt={index === startIndex ? `${name} render` : ''}
              width={width}
              height={height}
              draggable={false}
              fetchPriority={index === startIndex ? 'high' : undefined}
              /* Already decoded by the preload above; sync keeps the swap from
                 being handed back to the decoder on the frame it is shown. */
              decoding="sync"
              style={{ opacity: index === frame ? 1 : 0 }}
            />
          ))}
        </div>

        {/* The one mark on the stage — the whole affordance, since a still
            render gives no sign that it turns. */}
        <SpinCue />
      </div>
    </div>
  );
}
