'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Types `text` out one character at a time once the element scrolls into
 * view — the same effect as Magic UI's `TypingAnimation`, without the
 * dependency. The full text is laid out invisibly underneath so the block
 * keeps its final height from the first frame and nothing below it jumps.
 * With `repeatDelay`, the finished line is held that long, cleared, and typed
 * again for as long as the page is open. Readers who prefer reduced motion
 * get the whole text at once, and it stays.
 */
export default function TypingAnimation({
  text,
  className,
  duration = 38,
  delay = 0,
  repeatDelay,
}: {
  readonly text: string;
  readonly className?: string;
  /** Milliseconds per character. */
  readonly duration?: number;
  /** Milliseconds to wait after entering view before the first character. */
  readonly delay?: number;
  /** Milliseconds to hold the finished line before clearing it and typing it
      again. Leave unset to type once and stop. */
  readonly repeatDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // Start once, when at least a quarter of the block is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const raf = requestAnimationFrame(() => setCount(text.length));
      return () => cancelAnimationFrame(raf);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  // One step per timer: the next character, or — once the line is complete
  // and has been held for `repeatDelay` — a cleared line to type again.
  useEffect(() => {
    if (!started) return;
    let i = 0;
    let timer = 0;
    const step = () => {
      if (i >= text.length) {
        i = 0;
        setCount(0);
        timer = window.setTimeout(step, delay);
        return;
      }
      i += 1;
      setCount(i);
      if (i < text.length) timer = window.setTimeout(step, duration);
      else if (repeatDelay !== undefined) timer = window.setTimeout(step, repeatDelay);
    };
    timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [started, text, duration, delay, repeatDelay]);

  // The cursor leaves only when the line is finished for good; a repeating
  // line keeps it blinking through the hold.
  const done = count >= text.length && repeatDelay === undefined;

  return (
    <span
      ref={ref}
      className={['typing', done ? 'is-done' : '', className ?? ''].join(' ').trim()}
      style={{ position: 'relative', display: 'inline-block' }}
      aria-label={text}
    >
      {/* Structural styles are inline so the block is right even before the
          stylesheet arrives; style.css adds the cursor and wrapping. */}
      <span className="typing-sizer" style={{ visibility: 'hidden' }} aria-hidden="true">
        {text}
      </span>
      <span className="typing-text" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        {text.slice(0, count)}
        <span className="typing-cursor" />
      </span>
    </span>
  );
}
