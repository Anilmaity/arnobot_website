'use client';

import { useEffect } from 'react';

/**
 * Last-resort boundary: replaces the whole document when the root layout itself
 * fails, so it cannot rely on the site stylesheet being present.
 */
export default function GlobalError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error('[root] render error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#dfe1e5',
          color: '#070322',
          fontFamily: 'Inter, Arial, sans-serif',
          padding: '24px',
        }}
      >
        <main style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', Arial, sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(30px, 3.8vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: '0 0 16px',
            }}
          >
            Something went wrong
          </h1>
          <p style={{ margin: '0 0 24px', lineHeight: 1.6, color: '#5f626d' }}>
            The application failed to start. Please reload the page — if the problem persists, contact
            contact@arnobot.in.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              // Mirrors the site's .btn (theme.css --btn-*): ink ground, square,
              // 13px bold tracked caps.
              padding: '16px 32px',
              border: '2px solid #070322',
              borderRadius: 0,
              background: '#070322',
              color: '#fff',
              font: "700 13px/1.2 Inter, Arial, sans-serif",
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
          {error.digest ? (
            <p style={{ marginTop: '18px', fontSize: '12px', color: '#5f626d' }}>Reference: {error.digest}</p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
