'use client';

import { useCallback, useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/dom';
import styles from './career.module.css';

export interface Room {
  readonly image: string;
  readonly label: string;
  readonly note: string;
}

/** How long each room holds the frame. Handed to the CSS as `--carousel-interval`. */
const INTERVAL_MS = 2940;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const pad = (n: number): string => String(n).padStart(2, '0');

/* The reduced-motion preference as an external store, so it is read during
   render rather than copied into state from an effect. The server has no
   preference to read, so it renders the moving version and the client
   corrects on hydration. */
const subscribeReducedMotion = (onChange: () => void): (() => void) => {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const readReducedMotion = (): boolean => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const readReducedMotionOnServer = (): boolean => false;

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" />
      <rect x="14" y="5" width="4" height="14" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * The rooms as a framed carousel under the section head: one wide frame
 * inside the page measure, the four photographs on a track that slides one
 * room to the next — on its own every interval, or on the arrows and the
 * segments — with only the room's own count, name and note written over the
 * foot of its slide.
 *
 * The turn pauses under the pointer, behind the pause button, and while the
 * tab is hidden. Under reduced motion it starts paused — the button then
 * reads "play" — and the CSS swaps the slide for an instant change.
 */
export default function FacilityCarousel({ rooms }: { readonly rooms: readonly Room[] }) {
  const [index, setIndex] = useState(0);
  // Bumped whenever the frame changes or the turn resumes, so the segment's
  // fill (keyed on it) restarts from zero in step with the timer.
  const [turn, setTurn] = useState(0);
  const [hovering, setHovering] = useState(false);
  // `null` until the reader presses the button; until then the motion
  // preference decides, so reduced motion starts the carousel held.
  const [heldChoice, setHeldChoice] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, readReducedMotionOnServer);
  const held = heldChoice ?? reducedMotion;

  const paused = held || hovering;

  const show = useCallback(
    (next: number): void => {
      setIndex(((next % rooms.length) + rooms.length) % rooms.length);
      setTurn((t) => t + 1);
    },
    [rooms.length],
  );

  useEffect(() => {
    if (paused || rooms.length < 2) return;
    const timer = window.setTimeout(() => {
      // A hidden tab re-arms rather than turns: the reader should come back
      // to the room they left, not to one they never saw.
      if (document.visibilityState === 'hidden') setTurn((t) => t + 1);
      else show(index + 1);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [paused, index, turn, rooms.length, show]);

  const resume = (): void => setTurn((t) => t + 1);

  return (
    <div
      className={cn(styles.carousel, paused && styles.isPaused)}
      role="region"
      aria-roledescription="carousel"
      aria-label="The workshop, room by room"
      style={{ '--carousel-interval': `${INTERVAL_MS}ms` } as CSSProperties}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        resume();
      }}
    >
      <div className={styles.carouselFrame}>
        {/* The track is every room side by side; moving it by whole frames is
            the slide. `aria-live` on the track reads the new room out once it
            has arrived; the slides off-frame are hidden from the reader. */}
        <div className={styles.carouselTrack} style={{ transform: `translateX(-${index * 100}%)` }} aria-live="polite">
          {rooms.map((room, i) => (
            <figure className={styles.slide} key={room.image} aria-hidden={i === index ? undefined : 'true'}>
              {/* Two copies of the photograph: a blurred one underneath that
                  covers the frame, and the photograph itself on top, whole.
                  The caption names the room, so a matching alt would have it
                  announced twice. Loaded up front so the next room is there
                  to slide to. */}
              <img className={styles.slideFill} src={room.image} alt="" aria-hidden="true" decoding="async" />
              <img className={styles.slideImg} src={room.image} alt="" decoding="async" draggable={false} />
              <div className={styles.slideScrim} aria-hidden="true" />
              <figcaption className={styles.slideCopy}>
                <span className={cn('micro-label', styles.slideIndex)}>
                  {pad(i + 1)} / {pad(rooms.length)}
                </span>
                <h3 className={styles.slideName}>{room.label}</h3>
                <p className={styles.slideNote}>{room.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className={styles.carouselControls}>
        <div className={styles.segments} role="group" aria-label="Rooms">
          {rooms.map((room, i) => (
            <button
              type="button"
              key={room.label}
              className={cn(styles.segment, i === index && styles.segmentActive, i < index && styles.segmentDone)}
              aria-label={`${room.label}, room ${i + 1} of ${rooms.length}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => show(i)}
            >
              {i === index ? <span className={styles.segmentFill} key={turn} aria-hidden="true" /> : null}
            </button>
          ))}
        </div>

        <div className={styles.carouselButtons}>
          <button type="button" className="icon-btn" aria-label="Previous room" onClick={() => show(index - 1)}>
            <ChevronLeftIcon size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={cn('icon-btn', styles.carouselPause)}
            aria-pressed={held}
            aria-label={held ? 'Play the rooms' : 'Pause the rooms'}
            onClick={() => {
              setHeldChoice(!held);
              resume();
            }}
          >
            {held ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button type="button" className="icon-btn" aria-label="Next room" onClick={() => show(index + 1)}>
            <ChevronRightIcon size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
