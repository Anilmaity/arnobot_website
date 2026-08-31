import type { Metadata } from 'next';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import { CalendarIcon, SearchIcon } from '@/components/ui/Icons';
import { BLOG_ARTICLE_LIST } from '@/data/blogArticles';

export const metadata: Metadata = {
  title: 'Robotics, AI & Autonomous Innovation',
  description: 'Engineering notes and field insights from the ARNOBOT robotics team.',
};

/** Port of blog.php */
export default function BlogPage() {
  return (
    <main className="blog-page">
      <section className="blog-hero" id="blog-hero" data-cinematic-hero>
        <div className="blog-hero-container">
          <div className="blog-hero-content reveal">
            <span className="eyebrow">ARNOBOT Insights</span>
            <h1 className="russo">
              Robotics, AI &amp;
              <br />
              Autonomous Innovation
            </h1>
          </div>
        </div>
      </section>

      <section className="blog-grid-section reveal" id="articles">
        <div className="blog-grid-container">
          {BLOG_ARTICLE_LIST.length > 0 ? (
            <div className="blog-cards-grid" id="blog-cards-grid">
              {BLOG_ARTICLE_LIST.map((article) => {
                const href = `/blog-details?id=${article.id}` as const;

                return (
                  <article className="blog-card" data-id={article.id} key={article.id}>
                    <Link href={href} className="blog-card-media" tabIndex={-1} aria-hidden="true">
                      <img src={article.heroThumb} alt="" className="blog-img" />
                    </Link>

                    <div className="blog-card-body">
                      <div className="blog-meta">
                        <span className="meta-item">
                          <CalendarIcon />
                          {article.date}
                        </span>
                      </div>

                      <h3 className="russo blog-card-title">
                        <Link href={href}>{article.title}</Link>
                      </h3>

                      <p className="blog-card-excerpt">{article.cardExcerpt}</p>

                      <div className="blog-card-footer">
                        <Link href={href} className="blog-read-link">
                          Read Article <span className="arrow">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="blog-no-results" id="blog-no-results">
              <SearchIcon size={48} />
              <h4 className="russo">No articles published yet</h4>
              <p>New engineering insights will appear here soon.</p>
            </div>
          )}
        </div>
      </section>

      <Cta />
    </main>
  );
}
