import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Route } from 'next';
import Cta from '@/components/sections/Cta';
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from '@/components/ui/Icons';
import { INSIGHTS_BY_DATE } from '@/data/insights';
import styles from './article.module.css';

interface PageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

/** Every post is known at build time, so all of them can be prerendered. */
export function generateStaticParams(): Array<{ slug: string }> {
  return INSIGHTS_BY_DATE.map((post) => ({ slug: post.slug }));
}

/**
 * The post list is fixed, so anything outside it is a genuine 404.
 *
 * Without this, an unknown slug still renders — `notFound()` produces the
 * right page, but Next serves it from the prerender cache with a 200, which is
 * a soft 404: crawlers index a "not found" page as a real one.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = INSIGHTS_BY_DATE.find((entry) => entry.slug === slug);
  if (!post) return { title: 'Article not found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: 'article' },
  };
}

/**
 * /insights/[slug] — one article.
 *
 * The index and this page read the same `INSIGHTS_BY_DATE` list, so a post
 * cannot appear on one and be missing from the other, and "next" here means
 * the same thing as the order the index shows. An unknown slug is a 404 rather
 * than an empty page.
 */
export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const index = INSIGHTS_BY_DATE.findIndex((entry) => entry.slug === slug);
  if (index === -1) notFound();

  const post = INSIGHTS_BY_DATE[index]!;
  // Wrap around so the ends of the list are not dead ends.
  const previous = INSIGHTS_BY_DATE[(index - 1 + INSIGHTS_BY_DATE.length) % INSIGHTS_BY_DATE.length]!;
  const next = INSIGHTS_BY_DATE[(index + 1) % INSIGHTS_BY_DATE.length]!;
  const related = INSIGHTS_BY_DATE.filter(
    (entry) => entry.category === post.category && entry.slug !== slug,
  ).slice(0, 3);

  const hrefFor = (s: string) => `/insights/${s}` as Route;

  return (
    <main className={styles.page}>
      {/* `data-cinematic-hero` is what the header measures to decide when to
          dock; without it the bar would sit solid over the article from the
          first pixel, unlike every other page with a hero. */}
      <header className={styles.hero} data-cinematic-hero>
        <div className={styles.heroShell}>
          <Link href={'/insights' as Route} className={styles.back}>
            <ArrowLeftIcon size={16} aria-hidden="true" />
            All insights
          </Link>

          <span className={styles.heroCategory}>{post.category}</span>
          <h1 className={styles.heroTitle}>{post.title}</h1>

          <div className={styles.heroMeta}>
            <span>
              <CalendarIcon size={15} aria-hidden="true" />
              <time dateTime={post.isoDate}>{post.date}</time>
            </span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <div className={styles.mediaShell}>
        <figure className={styles.media}>
          <img src={post.image} alt="" />
        </figure>
      </div>

      <article className={styles.article}>
        <p className={styles.standfirst}>{post.excerpt}</p>

        {post.body.map((section) => (
          <section className={styles.section} key={section.heading}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
            <p className={styles.sectionText}>{section.text}</p>
          </section>
        ))}
      </article>

      {related.length > 0 ? (
        <section className={styles.related}>
          <div className={styles.relatedShell}>
            <h2 className={styles.relatedHeading}>More in {post.category}</h2>
            <div className={styles.relatedGrid}>
              {related.map((entry) => (
                <Link href={hrefFor(entry.slug)} className={styles.relatedCard} key={entry.slug}>
                  <span className={styles.relatedMedia}>
                    <img src={entry.image} alt="" loading="lazy" />
                  </span>
                  <span className={styles.relatedDate}>{entry.date}</span>
                  <span className={styles.relatedTitle}>{entry.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <nav className={styles.pager} aria-label="More articles">
        <Link href={hrefFor(previous.slug)} className={styles.pagerLink}>
          <span className={styles.pagerLabel}>
            <ArrowLeftIcon size={15} aria-hidden="true" />
            Previous
          </span>
          <span className={styles.pagerTitle}>{previous.title}</span>
        </Link>
        <Link href={hrefFor(next.slug)} className={`${styles.pagerLink} ${styles.pagerNext}`}>
          <span className={styles.pagerLabel}>
            Next
            <ArrowRightIcon size={15} aria-hidden="true" />
          </span>
          <span className={styles.pagerTitle}>{next.title}</span>
        </Link>
      </nav>

      <Cta />
    </main>
  );
}
