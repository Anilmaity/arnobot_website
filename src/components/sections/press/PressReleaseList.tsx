'use client';

import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/dom';
import { useModalDismiss } from '@/hooks/useModalDismiss';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Toast from '@/components/ui/Toast';
import { CalendarIcon, CloseIcon, LinkIcon, SearchIcon } from '@/components/ui/Icons';
import type { PressCategory, PressRelease } from '@/types';

type Filter = 'all' | PressCategory;

const FILTERS: ReadonlyArray<{ readonly value: Filter; readonly label: string }> = [
  { value: 'all', label: 'All Dispatches' },
  { value: 'Defense & UGVs', label: 'Defense & UGVs' },
  { value: 'Industrial NDT', label: 'Industrial NDT' },
  { value: 'Corporate & Facility', label: 'Corporate & Facility' },
];

/**
 * Newsroom listing — port of the grid, category tabs and detail modal that
 * press-release.php drove with an inline script.
 *
 * Filtering is React state instead of toggling `style.display` on DOM nodes, and
 * the modal body is rendered from typed data rather than assembled innerHTML.
 */
export default function PressReleaseList({ releases }: { readonly releases: readonly PressRelease[] }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [openId, setOpenId] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { copy, copied, failed } = useCopyToClipboard();

  const close = useCallback(() => setOpenId(null), []);

  /**
   * The headlines stay anchors rather than buttons: style.css targets
   * `.spotlight-title a` / `.press-card-title a`, and a button also picks up the
   * user-agent `text-transform: none` and breaks the heading's -webkit-line-clamp.
   * They therefore carry an explicit button role plus keyboard activation.
   */
  const onTitleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>, id: number) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setOpenId(id);
  };
  useModalDismiss(openId !== null, close, modalRef);

  const [spotlight, ...rest] = releases;
  const matches = useCallback((release: PressRelease) => filter === 'all' || release.tag === filter, [filter]);

  const visibleRest = useMemo(() => rest.filter(matches), [rest, matches]);
  const spotlightVisible = spotlight ? matches(spotlight) : false;
  const isEmpty = !spotlightVisible && visibleRest.length === 0;

  const active = openId === null ? null : (releases.find((release) => release.id === openId) ?? null);

  if (!spotlight) {
    return (
      <div className="press-no-results" id="press-no-results">
        <SearchIcon size={48} />
        <h4 className="russo">No press releases yet</h4>
        <p>Official dispatches will appear here as they are published.</p>
      </div>
    );
  }

  return (
    <>
      <div className="press-filter-wrapper">
        <div className="press-filter-tabs" role="tablist" aria-label="Press release categories">
          {FILTERS.map((tab) => (
            <button
              type="button"
              key={tab.value}
              role="tab"
              aria-selected={filter === tab.value}
              className={cn('press-filter-btn', filter === tab.value && 'active')}
              data-filter={tab.value}
              onClick={() => setFilter(tab.value)}
            >
              {tab.value === 'all' ? `${tab.label} (${releases.length})` : tab.label}
            </button>
          ))}
        </div>
      </div>

      {spotlightVisible ? (
        <div className="press-spotlight-card" data-category={spotlight.tag} data-id={spotlight.id}>
          <div className="spotlight-media">
            <img src={spotlight.image} alt={spotlight.title} />
            <span className="spotlight-live-pill">
              <span className="live-dot" />
              LATEST OFFICIAL DISPATCH
            </span>
          </div>
          <div className="spotlight-content">
            <div className="spotlight-meta">
              <span className={`press-tag-badge ${spotlight.badgeClass}`}>{spotlight.tag}</span>
              <span className="spotlight-date">
                <CalendarIcon size={14} />
                {spotlight.date}
              </span>
            </div>

            <div className="spotlight-dateline">{spotlight.dateline} —</div>

            <h2 className="russo spotlight-title">
              <a
                className="open-press-modal"
                role="button"
                tabIndex={0}
                data-id={spotlight.id}
                onClick={() => setOpenId(spotlight.id)}
                onKeyDown={(event) => onTitleKeyDown(event, spotlight.id)}
              >
                {spotlight.title}
              </a>
            </h2>

            <p className="spotlight-excerpt">{spotlight.excerpt}</p>

            <div className="spotlight-actions">
              <button
                type="button"
                className="btn btn-cta-primary open-press-modal"
                data-id={spotlight.id}
                onClick={() => setOpenId(spotlight.id)}
              >
                Full Press Release
              </button>
              <button type="button" className="btn btn-press-share copy-pr-link" onClick={() => void copy()}>
                <LinkIcon size={14} />
                Share Release
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="press-grid" id="press-grid">
        {visibleRest.map((release) => (
          <article className="press-card" data-category={release.tag} data-id={release.id} key={release.id}>
            <div className="press-card-media">
              <img src={release.image} alt={release.title} />
              <span className={`press-tag-badge ${release.badgeClass}`}>{release.tag}</span>
            </div>
            <div className="press-card-body">
              <div className="press-card-meta">
                <span className="press-card-date">
                  <CalendarIcon size={13} />
                  {release.date}
                </span>
                <span className="press-dateline-pill">{release.dateline}</span>
              </div>

              <h3 className="russo press-card-title">
                <a
                  className="open-press-modal"
                  role="button"
                  tabIndex={0}
                  data-id={release.id}
                  onClick={() => setOpenId(release.id)}
                  onKeyDown={(event) => onTitleKeyDown(event, release.id)}
                >
                  {release.title}
                </a>
              </h3>

              <p className="press-card-excerpt">{release.excerpt}</p>

              <div className="press-card-footer">
                <button
                  type="button"
                  className="press-read-btn open-press-modal"
                  data-id={release.id}
                  onClick={() => setOpenId(release.id)}
                >
                  Read Full Statement <span className="arrow">&rarr;</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isEmpty ? (
        <div className="press-no-results" id="press-no-results">
          <SearchIcon size={48} />
          <h4 className="russo">No press releases found</h4>
          <p>No dispatches match your search or filter criteria. Try resetting the filter tab.</p>
          <button type="button" className="btn btn-cta-primary reset-filter-btn" onClick={() => setFilter('all')}>
            View All Releases
          </button>
        </div>
      ) : null}

      <div
        className={cn('press-modal-backdrop', active && 'active')}
        id="press-modal-backdrop"
        aria-hidden={active === null}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div
          className="press-modal-container"
          role="dialog"
          aria-modal={active !== null}
          aria-labelledby="modal-pr-title"
          ref={modalRef}
        >
          <button
            type="button"
            className="press-modal-close"
            id="press-modal-close"
            aria-label="Close press release"
            onClick={close}
          >
            <CloseIcon size={20} />
          </button>

          <div className="press-modal-header">
            <div className="press-modal-tags">
              <span className={`press-tag-badge ${active?.badgeClass ?? 'pr-badge-defense'}`} id="modal-pr-tag">
                {active?.tag ?? ''}
              </span>
              <span className="press-modal-date" id="modal-pr-date">
                {active?.date ?? ''}
              </span>
            </div>
            <h2 className="russo press-modal-title" id="modal-pr-title">
              {active?.title ?? ''}
            </h2>
            <div className="press-modal-dateline" id="modal-pr-dateline">
              {active ? `${active.dateline} — ` : ''}
            </div>
          </div>

          <div className="press-modal-media" id="modal-pr-media-wrap">
            {active ? <img src={active.image} alt={active.title} id="modal-pr-img" /> : null}
          </div>

          <div className="press-modal-body" id="modal-pr-body">
            {active?.body.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
          </div>

          <div className="press-modal-footer">
            <div className="modal-pr-contacts">
              <strong>Media Contact:</strong>
              <span>
                ARNOBOT Corporate Communications • <a href="mailto:contact@arnobot.in">contact@arnobot.in</a>
              </span>
            </div>
            <div className="modal-pr-actions">
              <button type="button" className="btn btn-press-share copy-modal-link" onClick={() => void copy()}>
                <LinkIcon size={14} />
                Copy Link
              </button>
              <button type="button" className="btn btn-cta-primary" id="modal-close-btn" onClick={close}>
                Done Reading
              </button>
            </div>
          </div>
        </div>
      </div>

      <Toast
        id="press-toast"
        show={copied}
        message={failed ? 'Copying is blocked — select and copy manually.' : 'Press release link copied to clipboard!'}
      />
    </>
  );
}
