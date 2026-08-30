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
          fontFamily: 'Outfit, Arial, sans-serif',
          padding: '24px',
        }}
      >
        <main style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 12px', letterSpacing: '0.5px' }}>Something went wrong</h1>
          <p style={{ margin: '0 0 24px', lineHeight: 1.6, color: '#5f626d' }}>
            The application failed to start. Please reload the page — if the problem persists, contact
            contact@arnobot.in.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '14px 32px',
              borderRadius: '14px',
              border: 0,
              background: '#11153a',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 600,
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
