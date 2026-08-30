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
      <section className="flex min-h-[70vh] items-center justify-center px-6 py-32 text-center">
        <div className="mx-auto max-w-xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="russo mt-2 text-3xl leading-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted">{description}</p>
          {children ? <div className="mt-9 flex flex-wrap items-center justify-center gap-4">{children}</div> : null}
        </div>
      </section>
    </main>
  );
}
