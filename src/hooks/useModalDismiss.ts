'use client';

import { useEffect, type RefObject } from 'react';
import { lockScroll, trapFocus } from '@/lib/dom';

/**
 * Shared modal plumbing: Escape to close, background scroll lock, and a focus
 * trap that restores focus to the trigger on close.
 *
 * The original modals only handled Escape — focus stayed behind the overlay,
 * which made them unusable with a keyboard or screen reader.
 */
export function useModalDismiss(
  open: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const releaseScroll = lockScroll();
    const releaseFocus = containerRef.current ? trapFocus(containerRef.current) : undefined;

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      releaseFocus?.();
      releaseScroll();
    };
  }, [open, onClose, containerRef]);
}
