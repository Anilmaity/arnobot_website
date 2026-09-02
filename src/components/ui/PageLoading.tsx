import Skeleton from '@/components/ui/Skeleton';

/**
 * Placeholder shown while page content streams in or a navigation is pending.
 * The header and footer stay on screen, so this only stands in for the body.
 *
 * Rendered as the fallback of the Suspense boundary in SiteChrome rather than
 * from a `loading.tsx`; see the note there for why the boundary lives in the
 * component tree.
 */
export default function PageLoading() {
  return (
    <main aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading page…</span>

      {/* Hero band — the same dark ground every hero opens on. */}
      <div className="flex min-h-[60svh] items-end bg-footer px-(--gutter) pt-32 pb-16">
        <div className="w-full max-w-3xl space-y-5">
          <Skeleton className="h-3 w-32 bg-white/15" />
          <Skeleton className="h-12 w-full max-w-2xl bg-white/15" />
          <Skeleton className="h-12 w-3/4 bg-white/15" />
          <Skeleton className="h-4 w-full max-w-lg bg-white/10" />
        </div>
      </div>

      {/* Content band */}
      <div className="px-(--gutter) py-20">
        <div className="mx-auto grid w-full max-w-(--measure) gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-4/3 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </main>
  );
}
