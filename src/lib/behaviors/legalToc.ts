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

  /**
   * The line down the screen at which a heading takes over as "what I am
   * reading": clear of the docked header, then a quarter into the space it
   * leaves. Measuring against the header's own token keeps it honest when the
   * bar shrinks at narrow widths.
   *
   * Testing against the top edge of the viewport instead makes the sidebar lag
   * a section behind — a heading can fill the screen while the entry above it
   * is still lit, because its top has not yet crossed the bar.
   */
  const readingLine = () => {
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
    const top = (Number.isFinite(nav) ? nav : 62) + 16;
    return top + (window.innerHeight - top) * 0.25;
  };

  /**
   * Keeps the lit entry inside the sidebar's own scrollport, for a document
   * with more sections than fit beside it. No-ops when the list is short
   * enough to show every entry, which is the usual case.
   */
  const keepInView = (link: HTMLAnchorElement) => {
    const box = link.closest<HTMLElement>('.legal-toc');
    if (!box || box.scrollHeight <= box.clientHeight + 1) return;

    const linkRect = link.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    const margin = 12;

    if (linkRect.top < boxRect.top + margin) box.scrollTop -= boxRect.top + margin - linkRect.top;
    else if (linkRect.bottom > boxRect.bottom - margin) box.scrollTop += linkRect.bottom - (boxRect.bottom - margin);
  };

  let current: HTMLAnchorElement | null = null;

  const sync = () => {
    const line = readingLine();
    let active = first;

    for (const entry of entries) {
      if (entry.section.getBoundingClientRect().top <= line) active = entry;
      else break;
    }

    // Once the page is scrolled to the bottom the last section may never reach
    // the line, so claim it explicitly.
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (atBottom) active = last;

    if (active.link === current) return;
    current?.classList.remove('active');
    current?.removeAttribute('aria-current');
    active.link.classList.add('active');
    // Announces the same thing the highlight shows, for a screen reader.
    active.link.setAttribute('aria-current', 'true');
    current = active.link;
    keepInView(active.link);
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
  disposer.add(() => {
    current?.classList.remove('active');
    current?.removeAttribute('aria-current');
  });

  return disposer.cleanup;
}
