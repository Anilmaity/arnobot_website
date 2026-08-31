import { Disposer, queryAll } from '@/lib/dom';
import type { Cleanup } from '@/types';

/**
 * Highlights the table-of-contents entry for the section currently being read
 * on the privacy policy and terms pages.
 *
 * style.css has always styled `.legal-toc-link.active`, but nothing ever added
 * the class — the sticky sidebar sat inert while the reader scrolled. This
 * supplies the missing half.
 *
 * The section whose heading is nearest the top of the viewport *without having
 * passed it* wins, which is what a reader perceives as "where I am". An
 * IntersectionObserver alone cannot answer that: several blocks are on screen
 * at once, and the entry that fires last is not necessarily the one being read.
 */
export function legalToc(): Cleanup {
  const disposer = new Disposer();

  const links = queryAll<HTMLAnchorElement>('.legal-toc-link');
  if (links.length === 0) return disposer.cleanup;

  const entries = links
    .map((link) => {
      const id = link.getAttribute('href')?.replace(/^#/, '') ?? '';
      const section = id ? document.getElementById(id) : null;
      return section ? { link, section } : null;
    })
    .filter((entry): entry is { link: HTMLAnchorElement; section: HTMLElement } => entry !== null);

  const first = entries[0];
  const last = entries[entries.length - 1];
  if (!first || !last) return disposer.cleanup;

  // Matches the header's docked height plus a little breathing room, so a
  // heading counts as "reached" at the point it clears the bar.
  const OFFSET = 96;

  let current: HTMLAnchorElement | null = null;

  const sync = () => {
    let active = first;

    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top - OFFSET <= 0) active = entry;
      else break;
    }

    // Once the page is scrolled to the bottom the last section may never reach
    // the offset, so claim it explicitly.
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (atBottom) active = last;

    if (active.link === current) return;
    current?.classList.remove('active');
    active.link.classList.add('active');
    current = active.link;
  };

  // rAF-throttled: scroll fires far more often than the highlight can change,
  // and each pass reads layout for every section.
  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      sync();
    });
  };

  sync();
  disposer.on(window, 'scroll', onScroll, { passive: true });
  disposer.on(window, 'resize', onScroll);
  disposer.add(() => current?.classList.remove('active'));

  return disposer.cleanup;
}
