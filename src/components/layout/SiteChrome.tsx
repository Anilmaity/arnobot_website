import { Suspense, type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import SiteBehaviors from './SiteBehaviors';
import ScrollToTop from './ScrollToTop';
import PageLoading from '@/components/ui/PageLoading';
import VideoModal from '@/components/modals/VideoModal';
import IndustryModal from '@/components/modals/IndustryModal';
import DemoModal from '@/components/modals/DemoModal';

/**
 * Everything the PHP pages got from `require`-ing header.php + footer.php.
 *
 * Shared by the (site) route group and the root 404 so both render with the
 * full site design.
 *
 * The page-content Suspense boundary lives here rather than in a `loading.tsx`
 * so that `SiteBehaviors` sits *inside* it. The behaviours write inline styles
 * with GSAP; running them from the layout meant they could touch server-rendered
 * nodes before React had hydrated the page, which produced a hydration mismatch.
 * Sharing the boundary guarantees the content is hydrated before they start.
 */
export default function SiteChrome({ children }: { readonly children: ReactNode }) {
  return (
    <>
      {/*
        style.css is the stylesheet from the PHP build, pruned of the rules for
        pages the rebuild dropped. It is served straight from /public rather than
        bundled so every relative url() keeps resolving exactly as it did before.
      */}
      {/* eslint-disable-next-line @next/next/no-css-tags -- bundling would rewrite the
          relative url()s; serving it as a static file keeps the design identical. */}
      <link rel="stylesheet" precedence="site" href="/assets/css/style.css" />

      <div className="site">
        <Header />

        {/* Outside the content boundary: it must stay mounted while a page
            suspends, so it can tell a link click from a back/forward. */}
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>

        <Suspense fallback={<PageLoading />}>
          {children}
          {/* Nested so `useSearchParams` inside it cannot opt the page content out
              of static prerendering — this inner boundary renders nothing. */}
          <Suspense fallback={null}>
            <SiteBehaviors />
          </Suspense>
        </Suspense>

        <Footer />
        <VideoModal />
      </div>

      {/* Modals rendered outside `.site`, matching footer.php's structure. */}
      <IndustryModal />
      <DemoModal />
    </>
  );
}
