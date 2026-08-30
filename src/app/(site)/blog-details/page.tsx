import type { Metadata } from 'next';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import ArticleBody from '@/components/sections/blog/ArticleBody';
import TableOfContents from '@/components/sections/blog/TableOfContents';
import BlogHeroRadar from '@/components/svg/BlogHeroRadar';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/Icons';
import { BLOG_ARTICLES, BLOG_ARTICLE_LIST, resolveArticleId } from '@/data/blogArticles';

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const article = BLOG_ARTICLES[resolveArticleId((await searchParams).id)];
  return { title: article.title, description: article.leadExcerpt };
}

/** Port of blog-details.php */
export default async function BlogDetailsPage({ searchParams }: PageProps) {
  const id = resolveArticleId((await searchParams).id);
  const article = BLOG_ARTICLES[id];
  const previous = BLOG_ARTICLES[article.prevId];
  const next = BLOG_ARTICLES[article.nextId];
  const related = BLOG_ARTICLE_LIST.filter((entry) => entry.id !== id);

  return (
    <main className="blog-details-page">
      <section className="blog-hero blog-details-hero" id="blog-hero">
        <div className="hero-grid-checks" />
        <BlogHeroRadar />
        <div className="hero-shape-glow" />

        <div className="blog-hero-container">
          <div className="blog-hero-content reveal">
            <h1 className="russo">{article.title}</h1>
          </div>
        </div>
      </section>

      <section className="blog-details-body-section">
        <div className="blog-details-layout">
          <article className="blog-details-main-content">
            <div className="blog-key-takeaways">
              <div className="takeaways-title">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <strong className="russo">Executive Summary &amp; Key Takeaways</strong>
              </div>
              <ul className="takeaways-list">
                {article.takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </div>

            <div className="blog-feature-image-card">
              <img src={article.heroImage} alt={article.title} />
            </div>

            <div className="blog-content-body">
              <ArticleBody id={id} />
            </div>

            <nav className="blog-post-navigation" aria-label="Article">
              <Link href={`/blog-details?id=${previous.id}`} className="post-nav-card post-nav-prev">
                <span className="post-nav-label">
                  <ArrowLeftIcon size={14} />
                  Previous Article
                </span>
                <span className="post-nav-title">{previous.title}</span>
              </Link>

              <Link href={`/blog-details?id=${next.id}`} className="post-nav-card post-nav-next">
                <span className="post-nav-label">
                  Next Article
                  <ArrowRightIcon size={14} />
                </span>
                <span className="post-nav-title">{next.title}</span>
              </Link>
            </nav>
          </article>

          <aside className="blog-details-sidebar">
            <div className="sidebar-widget">
              <h3 className="russo sidebar-widget-title">
                <span>Table of Contents</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" aria-hidden="true">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </h3>
              <TableOfContents entries={article.toc} />
            </div>

            <div className="sidebar-widget sidebar-related-widget">
              <h3 className="russo sidebar-widget-title">
                <span>Related Insights</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#2563eb" strokeWidth="2" aria-hidden="true">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </h3>

              {related.length > 0 ? (
                <div className="sidebar-related-list">
                  {related.map((entry) => (
                    <Link href={`/blog-details?id=${entry.id}`} className="sidebar-related-item" key={entry.id}>
                      <div className="sidebar-related-thumb">
                        <img src={entry.heroImage} alt="" />
                      </div>
                      <div className="sidebar-related-info">
                        <span className="sidebar-related-tag">{entry.category}</span>
                        <h5 className="sidebar-related-title">{entry.title}</h5>
                        <span className="sidebar-related-date">{entry.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="sidebar-related-date">No other articles yet.</p>
              )}

              <Link href="/blog" className="sidebar-view-all-link">
                View All Articles &rarr;
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <Cta />
    </main>
  );
}
