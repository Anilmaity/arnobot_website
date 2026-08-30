import type { ReactNode } from 'react';
import { cn } from '@/lib/dom';

export interface LegalSection {
  /** Anchor target, e.g. `section-1` or `term-1`. */
  readonly id: string;
  /** Label shown in the sidebar table of contents. */
  readonly tocLabel: ReactNode;
  /** Two-digit badge shown beside the heading. */
  readonly number: string;
  readonly heading: ReactNode;
  readonly content: ReactNode;
}

interface LegalPageProps {
  readonly title: string;
  readonly heroId: string;
  /** `legal-hero-terms` adds the alternate hero treatment. */
  readonly heroModifier?: string;
  readonly sections: readonly LegalSection[];
}

/**
 * Shared layout for privacy-policy.php and terms-conditions.php, which used
 * identical markup around different copy.
 */
export default function LegalPage({ title, heroId, heroModifier, sections }: LegalPageProps) {
  return (
    <main>
      <section className={cn('legal-hero', heroModifier)} id={heroId}>
        <div className="legal-hero-container">
          <div className="legal-hero-content">
            <h1 className="russo">{title}</h1>
          </div>
        </div>
      </section>

      <section className="legal-section">
        <div className="legal-grid">
          <aside className="legal-toc">
            <h4 className="legal-toc-title">Table of Contents</h4>
            <ul className="legal-toc-list">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="legal-toc-link">
                    {index + 1}. {section.tocLabel}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <div className="legal-body">
            {sections.map((section) => (
              <article className="legal-block" id={section.id} key={section.id}>
                <h2 className="russo legal-block-title">
                  <span className="legal-num-badge">{section.number}</span>
                  {section.heading}
                </h2>
                {section.content}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/** Highlighted callout used inside a few legal sections. */
export function LegalHighlight({ children }: { readonly children: ReactNode }) {
  return (
    <div className="legal-highlight-box">
      <p>{children}</p>
    </div>
  );
}

export function LegalContactCard({ heading, items }: {
  readonly heading: string;
  readonly items: ReadonlyArray<{ readonly label: string; readonly value: ReactNode }>;
}) {
  return (
    <div className="legal-contact-card">
      <h4 className="russo" style={{ color: '#0f172a', margin: '0 0 10px', fontSize: '16px' }}>
        {heading}
      </h4>
      <div className="legal-contact-grid">
        {items.map((item) => (
          <div className="legal-contact-item" key={item.label}>
            <strong>{item.label}</strong>
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
