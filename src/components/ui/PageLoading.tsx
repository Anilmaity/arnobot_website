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
      <span className="sr-only absolute -m-px h-px w-px overflow-hidden">Loading page…</span>

      {/* Hero band */}
      <div className="flex min-h-[60vh] items-center bg-slate-100 px-6 pt-32 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto w-full max-w-[1270px] space-y-5">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-12 w-full max-w-2xl" />
          <Skeleton className="h-12 w-full max-w-xl" />
          <Skeleton className="h-5 w-full max-w-lg" />
          <Skeleton className="mt-4 h-12 w-48 rounded-2xl" />
        </div>
      </div>

      {/* Content band */}
      <div className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid w-full max-w-[1270px] gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-4/3 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>

      {/* Card grid band */}
      <div className="px-6 pb-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid w-full max-w-[1270px] gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton key={index} className="aspect-3/4 w-full" />
          ))}
        </div>
      </div>
    </main>
  );
}
