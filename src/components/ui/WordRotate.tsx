'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cycles through `words` one at a time: the current word slides out to the
 * right while the next slides in from the left, and it keeps going. The line
 * is one word tall, so the block never changes height. Readers who prefer
 * reduced motion see the words swap without sliding (the global reduced-motion
 * rule collapses the animations).
 */
export default function WordRotate({
  words,
  className,
  interval = 2600,
  onChange,
}: {
  readonly words: readonly string[];
  readonly className?: string;
  /** Milliseconds each word stays before the next one slides in. */
  readonly interval?: number;
  /** Called with the index of the word that has just slid in. */
  readonly onChange?: (index: number) => void;
}) {
  const [state, setState] = useState<{ index: number; previous: number | null }>({ index: 0, previous: null });
  const indexRef = useRef(0);

  useEffect(() => {
    if (words.length < 2) return;
    const timer = window.setInterval(() => {
      const previous = indexRef.current;
      const next = (previous + 1) % words.length;
      indexRef.current = next;
      setState({ index: next, previous });
      onChange?.(next);
    }, interval);
    return () => window.clearInterval(timer);
  }, [words, interval, onChange]);

  // The longest word, laid out invisibly in flow, gives the block its width
  // and height; the animated words are painted over it. Without it a
  // shrink-wrapped parent would collapse to zero width and the words would
  // hang off its edge instead of centring.
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '');

  return (
    <span
      className={['word-rotate', className ?? ''].join(' ').trim()}
      style={{ position: 'relative', display: 'inline-block' }}
      aria-live="polite"
    >
      {/* Structural styles are inline so the words stack even before the
          stylesheet arrives; style.css adds the slide animations. */}
      <span className="word-rotate-sizer" style={{ visibility: 'hidden', whiteSpace: 'nowrap' }} aria-hidden="true">
        {longest}
      </span>
      {state.previous !== null ? (
        <span
          className="word-rotate-word is-leaving"
          style={{ position: 'absolute', inset: 0, whiteSpace: 'nowrap' }}
          key={`out-${state.previous}-${state.index}`}
          aria-hidden="true"
          onAnimationEnd={() => setState((s) => ({ ...s, previous: null }))}
        >
          {words[state.previous]}
        </span>
      ) : null}
      <span
        className="word-rotate-word is-entering"
        style={{ position: 'absolute', inset: 0, whiteSpace: 'nowrap' }}
        key={`in-${state.index}`}
      >
        {words[state.index]}
      </span>
    </span>
  );
}
