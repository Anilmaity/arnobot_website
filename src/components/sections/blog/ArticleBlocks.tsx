import type { ReactNode } from 'react';

export interface ArticleImage {
  readonly src: string;
  readonly alt: string;
}

/** Two-up image showcase used between article sections. */
export function ImageGrid({ items, columns }: { readonly items: readonly ArticleImage[]; readonly columns: 2 | 3 }) {
  return (
    <div className={`blog-image-grid-${columns}`}>
      {items.map((item) => (
        <div className="blog-grid-image-item" key={item.src}>
          <div className="img-wrap">
            <img src={item.src} alt={item.alt} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function PullQuote({ children, author }: { readonly children: ReactNode; readonly author: string }) {
  return (
    <blockquote className="blog-tech-quote">
      <p>{children}</p>
      <div className="quote-author">{author}</div>
    </blockquote>
  );
}

export function SpecHighlight({
  icon,
  title,
  children,
}: {
  readonly icon: ReactNode;
  readonly title: ReactNode;
  readonly children: ReactNode;
}) {
  return (
    <div className="spec-highlight-card">
      <div className="spec-highlight-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {icon}
        </svg>
      </div>
      <div className="spec-highlight-info">
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
}

export function SectionHeading({ index, children }: { readonly index: number; readonly children: ReactNode }) {
  return (
    <h2 id={`section-${index}`} className="russo">
      {children}
    </h2>
  );
}
