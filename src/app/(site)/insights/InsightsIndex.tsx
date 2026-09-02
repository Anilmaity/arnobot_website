'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState } from 'react';
import { INSIGHT_CATEGORIES, INSIGHTS_BY_DATE, type InsightCategory, type InsightPost } from '@/data/insights';
import { cn } from '@/lib/dom';
import styles from './insights.module.css';

type Filter = 'All' | InsightCategory;

const articleHref = (slug: string) => `/insights/${slug}` as Route;

const FILTERS: readonly Filter[] = ['All', ...INSIGHT_CATEGORIES];

/** How many cards the grid opens with, and how many each "Load more" adds. */
const PAGE_SIZE = 6;

function Meta({ post }: { readonly post: InsightPost }) {
  return (
    <div className="meta-line">
      <span className={styles.category}>{post.category}</span>
      <time dateTime={post.isoDate}>{post.date}</time>
      <span>{post.readTime}</span>
    </div>
  );
}

/** Every post has a page, so the whole card is the link to it. */
function Card({ post }: { readonly post: InsightPost }) {
  return (
    <article className={styles.card}>
      <Link href={articleHref(post.slug)} className={styles.cardLink}>
        <span className={styles.cardMedia}>
          <img src={post.image} alt="" loading="lazy" />
        </span>
        <Meta post={post} />
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardExcerpt}>{post.excerpt}</p>
        <span className={cn('link-arrow', styles.cardRead)}>
          Read article
          <span className="btn-arrow" aria-hidden="true">
            &rarr;
          </span>
        </span>
      </Link>
    </article>
  );
}

/**
 * The two content screens under the hero. Both are rendered here rather than
 * in the page because one filter drives both: the newest of the selection
 * leads the first screen, the rest fill the second.
 *
 * Both sections stay mounted whatever the filter yields. The scroll reveal
 * observes `.reveal` sections once, at page load — a section that unmounted
 * and came back would never be marked visible, and its `fade-up` children
 * would stay hidden.
 */
export default function InsightsIndex() {
  const [filter, setFilter] = useState<Filter>('All');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const posts = useMemo(
    () =>
      filter === 'All' ? INSIGHTS_BY_DATE : INSIGHTS_BY_DATE.filter((post) => post.category === filter),
    [filter],
  );

  // The newest of whatever is selected leads the page; the rest fill the grid.
  const [featured, ...rest] = posts;
  const shown = rest.slice(0, visible);
  const remaining = rest.length - shown.length;

  const choose = (next: Filter): void => {
    setFilter(next);
    // A new filter is a new list — carrying the old page depth into it would
    // silently hide posts the visitor just asked to see.
    setVisible(PAGE_SIZE);
  };

  return (
    <>
      {/* 2 — The filter and the lead article */}
      <section className="section-screen reveal" id="latest">
        <div className={styles.shell}>
          <div className={cn('section-head is-centered', styles.sectionHead, 'fade-up')}>
            <span className="eyebrow">Latest</span>
            <h2 className="section-title is-editorial">Start with the newest</h2>
            <p className="section-lead">
              Pick a category, or read across all of them. The most recent article leads; the rest of the archive
              follows below.
            </p>
          </div>

          {/* Toggle buttons, not tabs. The ARIA tab pattern would promise
              arrow-key roving focus and a tabpanel for each control, and there
              is neither — `aria-pressed` says what these actually are. */}
          <div className="fade-up d1">
            <div className={styles.filters} role="group" aria-label="Filter insights by category">
              {FILTERS.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={filter === option}
                  className={cn(styles.filter, option === filter && styles.filterActive)}
                  onClick={() => choose(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* The count is announced so filtering is not a silent change for
                anyone using a screen reader. */}
            <p className={styles.count} role="status">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'}
              {filter === 'All' ? '' : ` in ${filter}`}
            </p>
          </div>

          {featured ? (
            <article className={cn(styles.featured, 'fade-up', 'd2')}>
              <Link href={articleHref(featured.slug)} className={styles.featuredLink}>
                <span className={styles.featuredMedia}>
                  <img src={featured.image} alt="" />
                </span>
                <span className={styles.featuredBody}>
                  <Meta post={featured} />
                  <h3 className={styles.featuredTitle}>{featured.title}</h3>
                  <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                  <span className={cn('link-arrow', styles.cardRead)}>
                    Read article
                    <span className="btn-arrow" aria-hidden="true">
                      &rarr;
                    </span>
                  </span>
                </span>
              </Link>
            </article>
          ) : null}
        </div>
      </section>

      {/* 3 — The archive */}
      <section className="section-screen is-wash reveal" id="articles">
        <div className={styles.shell}>
          <div className={cn('section-head is-centered', styles.sectionHead, 'fade-up')}>
            <span className="eyebrow">Archive</span>
            <h2 className="section-title is-editorial">
              {filter === 'All' ? 'Everything else we have written' : `More in ${filter}`}
            </h2>
          </div>

          {shown.length > 0 ? (
            <div className={cn(styles.grid, 'fade-up', 'd1')}>
              {shown.map((post) => (
                <Card post={post} key={post.slug} />
              ))}
            </div>
          ) : (
            <p className={cn(styles.emptyNote, 'fade-up', 'd1')}>
              That is the only article in {filter} so far.
            </p>
          )}

          {remaining > 0 ? (
            <div className={styles.loadMoreRow}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setVisible((n) => n + PAGE_SIZE)}
              >
                Load more articles
                <span className="btn-count">{remaining} left</span>
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
