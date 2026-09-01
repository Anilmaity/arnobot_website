import type { Metadata } from 'next';
import Cta from '@/components/sections/Cta';
import InsightsIndex from './InsightsIndex';
import styles from './insights.module.css';

export const metadata: Metadata = {
  title: 'Insights & Perspectives',
  description:
    'Engineering notes and field perspectives from the ARNOBOT team — autonomous robotics, industrial inspection and the systems behind them.',
};

/**
 * /insights — the article index.
 *
 * Header, category filter, a featured lead and a paged grid. The filter and
 * paging are the only stateful parts, so they live in `InsightsIndex`; the
 * page itself stays server-rendered.
 *
 * Note there is an older `/blog` index still in the tree, reachable only by
 * URL. This supersedes it. Nothing links to it now except a route list in
 * Header.tsx, so it can be retired or redirected here once someone decides
 * what happens to the three articles behind /blog-details.
 */
export default function InsightsPage() {
  return (
    <main className={styles.page}>
      {/* `data-cinematic-hero` is what the header measures to decide when to
          stop floating and dock — the same treatment the home page hero gets. */}
      <section className={`${styles.hero} reveal`} data-cinematic-hero>
        <div className={styles.shell}>
          <span className="eyebrow">ARNOBOT Insights</span>
          <h1 className={styles.heroTitle}>Insights &amp; Perspectives</h1>
          <p className={styles.heroLead}>
            Notes from the workshop and the field — on autonomous robotics, industrial inspection, and the engineering
            decisions behind machines built to work where people should not have to.
          </p>
        </div>
      </section>

      <section className={`${styles.body} reveal`} id="articles">
        <div className={styles.shell}>
          <InsightsIndex />
        </div>
      </section>

      <Cta />
    </main>
  );
}
