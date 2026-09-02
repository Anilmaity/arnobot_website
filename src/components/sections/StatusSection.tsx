import type { ReactNode } from 'react';

/**
 * Shared shell for the full-page status screens (404, error boundary), styled to
 * sit comfortably between the site header and footer.
 */
export default function StatusSection({
  eyebrow,
  title,
  description,
  children,
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: ReactNode;
  readonly children?: ReactNode;
}) {
  return (
    <main>
      <section className="status-section">
        <div className="status-inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="russo">{title}</h1>
          <p>{description}</p>
          {children ? <div className="status-actions">{children}</div> : null}
        </div>
      </section>
    </main>
  );
}
