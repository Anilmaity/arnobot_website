'use client';

import { useEffect, useState } from 'react';
import { cn, queryAll } from '@/lib/dom';

const SCROLL_OFFSET = 140;

/**
 * Sticky table of contents with scroll-spy highlighting — port of the inline
 * blog-details.php script.
 */
export default function TableOfContents({ entries }: { readonly entries: readonly string[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = queryAll<HTMLElement>('.blog-content-body h2[id]');
    if (headings.length === 0) return;

    const update = () => {
      const scrollPosition = window.scrollY + SCROLL_OFFSET;
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.offsetTop <= scrollPosition) current = heading.id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [entries]);

  return (
    <ul className="toc-list" id="toc-list">
      {entries.map((label, index) => {
        const id = `section-${index + 1}`;
        return (
          <li className="toc-item" key={label}>
            <a
              href={`#${id}`}
              className={cn('toc-link', activeId === id && 'active')}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
