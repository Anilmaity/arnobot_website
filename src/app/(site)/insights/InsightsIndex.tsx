'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { useMemo, useState } from 'react';
import { INSIGHT_CATEGORIES, INSIGHTS_BY_DATE, type InsightCategory, type InsightPost } from '@/data/insights';
import styles from './insights.module.css';

type Filter = 'All' | InsightCategory;

const articleHref = (slug: string) => `/insights/${slug}` as Route;

const FILTERS: readonly Filter[] = ['All', ...INSIGHT_CATEGORIES];

/** How many cards the grid opens with, and how many each "Load more" adds. */
const PAGE_SIZE = 6;

function Meta({ post }: { readonly post: InsightPost }) {
  return (
    <div className={styles.meta}>
      <span className={styles.category}>{post.category}</span>
      <time dateTime={post.isoDate}>{post.date}</time>
      <span className={styles.readTime}>{post.readTime}</span>
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
        <span className={styles.cardRead}>
          Read article <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}

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
      {/* Toggle buttons, not tabs. The ARIA tab pattern would promise arrow-key
          roving focus and a tabpanel for each control, and there is neither —
          `aria-pressed` says what these actually are. */}
      <div className={styles.filters} role="group" aria-label="Filter insights by category">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            className={option === filter ? `${styles.filter} ${styles.filterActive}` : styles.filter}
            onClick={() => choose(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* The count is announced so filtering is not a silent change for anyone
          using a screen reader. */}
      <p className={styles.count} role="status">
        {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        {filter === 'All' ? '' : ` in ${filter}`}
      </p>

      {featured ? (
        <article className={styles.featured}>
          <Link href={articleHref(featured.slug)} className={styles.featuredLink}>
            <span className={styles.featuredMedia}>
              <img src={featured.image} alt="" />
            </span>
            <span className={styles.featuredBody}>
              <Meta post={featured} />
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
              <span className={styles.cardRead}>
                Read article <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
        </article>
      ) : null}

      {shown.length > 0 ? (
        <div className={styles.grid}>
          {shown.map((post) => (
            <Card post={post} key={post.slug} />
          ))}
        </div>
      ) : null}

      {remaining > 0 ? (
        <div className={styles.loadMoreRow}>
          <button type="button" className={styles.loadMore} onClick={() => setVisible((n) => n + PAGE_SIZE)}>
            Load more articles
            <span className={styles.loadMoreCount}>{remaining} left</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
