'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import StatusSection from '@/components/sections/StatusSection';

/** Error boundary for every page inside the site chrome. */
export default function SiteError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error('[site] render error:', error);
  }, [error]);

  return (
    <StatusSection
      eyebrow="Something went wrong"
      title="This page failed to load"
      description="An unexpected error interrupted the page. Trying again usually clears it — if it keeps happening, get in touch and we will take a look."
    >
      <button type="button" className="btn btn-cta-primary" onClick={reset}>
        Try again
      </button>
      <Link href="/" className="btn">
        Back to home
      </Link>
      {error.digest ? <p className="w-full text-xs text-muted">Reference: {error.digest}</p> : null}
    </StatusSection>
  );
}
