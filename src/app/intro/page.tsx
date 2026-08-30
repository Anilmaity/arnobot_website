'use client';

import { useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './intro.module.css';

/**
 * Port of home.php — the standalone intro splash.
 *
 * It shipped its own complete document (no site header/footer and no style.css),
 * so it lives outside the (site) route group. The full-bleed black page styling
 * the original applied to html/body is applied on mount and reverted on unmount
 * so it cannot leak into the rest of the site.
 */
export default function IntroPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const { documentElement: html, body } = document;
    const previous = { html: html.getAttribute('style'), body: body.getAttribute('style') };

    const pageStyle: Partial<CSSStyleDeclaration> = {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      margin: '0',
      padding: '0',
      background: '#000',
      fontFamily: 'Arial, Helvetica, sans-serif',
    };
    Object.assign(html.style, pageStyle);
    Object.assign(body.style, pageStyle);

    return () => {
      for (const [element, style] of [
        [html, previous.html],
        [body, previous.body],
      ] as const) {
        if (style === null) element.removeAttribute('style');
        else element.setAttribute('style', style);
      }
    };
  }, []);

  const markIntroPlayed = useCallback(() => {
    try {
      sessionStorage.setItem('introPlayed', 'true');
    } catch {
      // Storage can be unavailable (private mode, blocked cookies).
    }
  }, []);

  /** Used by the video's `ended` event and the Enter key, which cannot click a link. */
  const enterWebsite = useCallback(() => {
    markIntroPlayed();
    router.push('/');
  }, [markIntroPlayed, router]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();
      enterWebsite();
    };

    const video = videoRef.current;
    video?.addEventListener('ended', enterWebsite);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      video?.removeEventListener('ended', enterWebsite);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [enterWebsite]);

  return (
    <>
      <div className={styles.videoBg}>
        <video id="introVideo" ref={videoRef} autoPlay muted playsInline>
          <source src="/assets/videos/indexv.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.overlay}>
        <div className={styles.content}>
          {/* next/link handles the navigation; the click only records the flag. */}
          <Link href="/" className={styles.enterBtn} id="enterBtn" onClick={markIntroPlayed}>
            Enter Website →
          </Link>
        </div>
      </div>
    </>
  );
}
