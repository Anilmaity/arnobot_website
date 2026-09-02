'use client';

import { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/dom';
import { useDelegatedClick } from '@/hooks/useDelegatedClick';
import { useModalDismiss } from '@/hooks/useModalDismiss';
import { CloseIcon } from '@/components/ui/Icons';

/**
 * Video lightbox — port of the `#video-modal` markup in includes/footer.php and
 * the play-trigger handling in main.js.
 *
 * Any element carrying `.play-trigger` with a `data-video` attribute opens it,
 * so pages stay server-rendered.
 */
export default function VideoModal() {
  const [src, setSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => setSrc(null), []);

  useDelegatedClick('.play-trigger', (element, event) => {
    const videoSrc = element.dataset.video;
    if (!videoSrc) return;
    event.preventDefault();
    setSrc(videoSrc);
    // Autoplay can be refused (e.g. a Low Power Mode device); the controls remain.
    requestAnimationFrame(() => void videoRef.current?.play().catch(() => undefined));
  });

  useModalDismiss(src !== null, close, containerRef);

  return (
    <div
      id="video-modal"
      className={cn('video-modal', src && 'active')}
      aria-hidden={src === null}
      role="dialog"
      aria-modal={src !== null}
      aria-label="Video player"
    >
      <div className="video-modal-overlay" onClick={close} />
      <div className="video-modal-container" ref={containerRef}>
        <button type="button" className="icon-btn on-dark video-modal-close" aria-label="Close video player" onClick={close}>
          <CloseIcon size={18} />
        </button>
        <div className="video-modal-content">
          {/* Keyed so React swaps the element and the browser reloads the source. */}
          {src ? (
            <video id="modal-video" key={src} ref={videoRef} src={src} controls playsInline autoPlay>
              Your browser does not support the video tag.
            </video>
          ) : (
            <video id="modal-video" controls playsInline>
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
