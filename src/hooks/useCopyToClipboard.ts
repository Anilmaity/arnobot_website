'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TOAST_MS = 2500;

/**
 * Copies text (defaulting to the current URL) and flashes a confirmation flag —
 * the behaviour the inline `.copy-*` scripts implemented on each page.
 */
export function useCopyToClipboard(durationMs = TOAST_MS) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text?: string) => {
      try {
        await navigator.clipboard.writeText(text ?? window.location.href);
        setFailed(false);
      } catch {
        setFailed(true);
      }
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), durationMs);
    },
    [durationMs],
  );

  return { copy, copied, failed } as const;
}
