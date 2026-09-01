'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { cn, queryAll } from '@/lib/dom';
import { PRIMARY_NAV, PRODUCT_NAV, SECONDARY_NAV, SITE } from '@/data/site';
import { CaretIcon, CloseIcon } from '@/components/ui/Icons';

const DESKTOP_BREAKPOINT = 1024;
const MENU_WIDTH_FALLBACK = 220;
const EDGE_GUTTER = 8;
/** Frames to keep retrying focus while the menu's open transition runs. */
const MENU_FOCUS_ATTEMPTS = 10;
/** Fraction of the hero that must scroll past before the header docks. */
const HERO_MERGE_RATIO = 0.5;
/**
 * Routes whose hero the header dissolves into before docking as a solid bar.
 *
 * A route is listed here AND its hero element carries `data-cinematic-hero`,
 * which is what the scroll threshold measures. Legibility does not depend on
 * the hero being dark: `.header-over-hero` paints its own top scrim, so the
 * white nav reads over the light heroes (careers, contact, product) too.
 */
const CINEMATIC_HERO_ROUTES = new Set([
  '/',
  '/technology',
  '/about',
  '/product',
  '/industries',
  '/career',
  '/contact',
  '/blog',
  '/blog-details',
  '/press-release',
  '/media-kit',
]);

/**
 * Routes that dock the solid bar immediately, with no hero to dissolve into.
 * The legal pages open straight onto the document title on a white page, so a
 * floating glass panel has nothing to float over.
 */
const SOLID_HEADER_ROUTES = new Set(['/privacy-policy', '/terms-conditions']);

/**
 * Site header — port of includes/header.php.
 *
 * The original toggled classes imperatively from main.js; the same classes and
 * markup are now driven by React state, which keeps `aria-expanded`, focus and
 * the open/closed flags in sync automatically.
 */
export default function Header() {
  const submenuId = useId();
  const pathname = usePathname();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number; arrow: number } | null>(null);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [tucked, setTucked] = useState(false);

  // Home and Technology both open on a full-bleed video hero, so the header
  // dissolves into it until the user scrolls off the hero, then docks as a
  // full-width solid bar. Every other route keeps the floating glass panel.
  const hasCinematicHero = CINEMATIC_HERO_ROUTES.has(pathname);
  const overHero = hasCinematicHero && !scrolledPastHero && !mobileOpen;
  const solid = (hasCinematicHero && !overHero) || SOLID_HEADER_ROUTES.has(pathname);

  useEffect(() => {
    if (!hasCinematicHero) return;

    const hero = document.querySelector<HTMLElement>('[data-cinematic-hero], .hero-cinematic');

    // Cached rather than measured per scroll event, so the listener never forces
    // a layout; the hero is viewport-height, so only a resize can change it.
    // `||` not `??`: a hero measured before layout reports 0, and a 0 threshold
    // would dock the solid bar at the very top of the page.
    const measure = () => (hero?.offsetHeight || window.innerHeight) * HERO_MERGE_RATIO;
    let threshold = measure();

    const onScroll = () => setScrolledPastHero(window.scrollY > threshold);
    const onResize = () => {
      threshold = measure();
      onScroll();
    };

    onScroll();
    // The hero can settle later than this effect — fonts, the poster image, and
    // the video all change its height — so re-measure once everything has loaded.
    window.addEventListener('load', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('load', onResize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [pathname, hasCinematicHero]);

  /**
   * Tucks the bar away while the reader scrolls down and brings it back the
   * moment they scroll up, so the page keeps its full height when reading and
   * the nav is one flick away when wanted.
   *
   * Held open near the top of the page — a bar that vanishes on the first
   * nudge of a hero reads as a glitch. An open menu stops the listener here
   * and is also answered by `barTucked` below, since sliding the anchor out
   * from under an open dropdown would strand it mid-air.
   */
  useEffect(() => {
    if (mobileOpen || dropdownOpen) return;

    /** Scroll below this and the bar stays put; roughly one hero-title height. */
    const HOLD_OPEN_ABOVE = 180;
    /** Movement under this is noise — a trackpad settling, an elastic bounce. */
    const DEAD_ZONE = 5;

    let last = window.scrollY;
    let queued = false;

    const sync = () => {
      queued = false;
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) < DEAD_ZONE) return;

      last = y;
      setTucked(delta > 0 && y > HOLD_OPEN_ABOVE);
    };

    // rAF-throttled: scroll fires far more often than the bar can change state.
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sync);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname, mobileOpen, dropdownOpen]);

  /* Derived rather than forced from the effect: an open menu has to keep the
     bar on screen, and computing that here avoids a second render pass. */
  const barTucked = tucked && !mobileOpen && !dropdownOpen;

  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Every menu item closes what it opened via its own onClick, so there is no
  // route-change effect here; this only serves the Escape key handler below.
  const closeAll = useCallback(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
    setMobileSubmenuOpen(false);
  }, []);

  /** Mirrors positionDropdown() from main.js: centre under the toggle, clamped to the viewport. */
  const positionDropdown = useCallback(() => {
    const toggle = toggleRef.current;
    const menu = menuRef.current;
    if (!toggle || !menu) return;

    const rect = toggle.getBoundingClientRect();
    const menuWidth = menu.offsetWidth || MENU_WIDTH_FALLBACK;
    const left = Math.max(
      EDGE_GUTTER,
      Math.min(rect.left + rect.width / 2 - menuWidth / 2, window.innerWidth - menuWidth - EDGE_GUTTER),
    );

    setMenuPosition({ top: rect.bottom + 10, left, arrow: rect.left + rect.width / 2 - left });
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    positionDropdown();

    const reposition = () => positionDropdown();
    window.addEventListener('resize', reposition, { passive: true });
    window.addEventListener('scroll', reposition, { passive: true });

    const onPointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('click', onPointerDown);

    return () => {
      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition);
      document.removeEventListener('click', onPointerDown);
    };
  }, [dropdownOpen, positionDropdown]);

  // Escape closes; widening past the mobile breakpoint closes the drawer.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (dropdownOpen) toggleRef.current?.focus();
      closeAll();
    };
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setMobileOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [dropdownOpen, closeAll]);

  // The drawer covers the page, so the page behind it must not scroll.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /**
   * Focuses the first or last menu item.
   *
   * `.dropdown-menu` is `visibility: hidden` until the `.open` class applies, and
   * focus() is a no-op on a hidden element — so this retries for a few frames
   * until the item actually takes focus instead of assuming one frame is enough.
   */
  const focusMenuItem = (position: 'first' | 'last', attemptsLeft = MENU_FOCUS_ATTEMPTS) => {
    requestAnimationFrame(() => {
      const menu = menuRef.current;
      if (!menu) return;

      const items = queryAll<HTMLAnchorElement>('a', menu);
      const target = position === 'first' ? items[0] : items[items.length - 1];
      if (!target) return;

      target.focus();
      if (document.activeElement !== target && attemptsLeft > 1) {
        focusMenuItem(position, attemptsLeft - 1);
      }
    });
  };

  const onToggleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    // Standard menu-button keys: Enter/Space toggle, arrows open and enter the menu.
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (dropdownOpen) {
        setDropdownOpen(false);
        return;
      }
      setDropdownOpen(true);
      focusMenuItem('first');
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setDropdownOpen(true);
      focusMenuItem(event.key === 'ArrowDown' ? 'first' : 'last');
    }
  };

  const onMenuKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const items = queryAll<HTMLAnchorElement>('a', event.currentTarget);
    if (items.length === 0) return;
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    const offset = event.key === 'ArrowDown' ? 1 : -1;
    items[(current + offset + items.length) % items.length]?.focus();
  };

  return (
    <>
      <header
        className={cn('header', overHero && 'header-over-hero', solid && 'header-solid', barTucked && 'header-tucked')}
      >
        <div className="header-inner">
          <Link href="/" className="logo-wrap">
            <img
              src={overHero ? '/assets/logos/logo-white.png' : '/assets/images/logotm.png'}
              alt={SITE.name}
              className="logo"
            />
          </Link>

          <nav className="main-nav" aria-label="Primary">
            {PRIMARY_NAV.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}

            <div className={cn('nav-dropdown', dropdownOpen && 'open')} ref={dropdownRef}>
              <div className="nav-dropdown-wrap">
                <button
                  type="button"
                  ref={toggleRef}
                  className="nav-dropdown-toggle"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-controls={submenuId}
                  onClick={(event) => {
                    event.stopPropagation();
                    setDropdownOpen((open) => !open);
                  }}
                  onKeyDown={onToggleKeyDown}
                >
                  PRODUCT
                  <CaretIcon />
                </button>

                <ul
                  id={submenuId}
                  ref={menuRef}
                  className="dropdown-menu"
                  onKeyDown={onMenuKeyDown}
                  style={
                    menuPosition
                      ? {
                          top: `${menuPosition.top}px`,
                          left: `${menuPosition.left}px`,
                          ['--arrow-left' as string]: `${menuPosition.arrow}px`,
                        }
                      : undefined
                  }
                >
                  {PRODUCT_NAV.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setDropdownOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {SECONDARY_NAV.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={cn('nav-toggle', mobileOpen && 'active')}
            id="nav-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={(event) => {
              event.stopPropagation();
              setMobileOpen((open) => !open);
            }}
          >
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
            <span className="hamburger-bar" />
          </button>
        </div>
      </header>

      <div className={cn('mobile-menu', mobileOpen && 'active')} id="mobile-menu" aria-hidden={!mobileOpen}>
        <div className="mobile-menu-backdrop" id="mobile-menu-backdrop" onClick={() => setMobileOpen(false)} />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-header">
            <Link href="/" className="mobile-menu-logo" onClick={() => setMobileOpen(false)}>
              <img src="/assets/images/logotm.png" alt={SITE.name} />
            </Link>
            <button
              type="button"
              className="mobile-menu-close"
              id="mobile-menu-close"
              aria-label="Close navigation menu"
              onClick={(event) => {
                event.stopPropagation();
                setMobileOpen(false);
              }}
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <div className="mobile-menu-body">
            <nav className="mobile-nav-links" aria-label="Mobile">
              {PRIMARY_NAV.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                  {link.mobileLabel}
                </Link>
              ))}

              <div className={cn('mobile-dropdown', mobileSubmenuOpen && 'open')}>
                <button
                  type="button"
                  className="mobile-dropdown-toggle"
                  aria-expanded={mobileSubmenuOpen}
                  aria-controls="mobile-products-submenu"
                  onClick={(event) => {
                    event.stopPropagation();
                    setMobileSubmenuOpen((open) => !open);
                  }}
                >
                  <span>Product</span>
                  <CaretIcon />
                </button>
                <ul
                  className={cn('mobile-submenu', mobileSubmenuOpen && 'open')}
                  id="mobile-products-submenu"
                  role="menu"
                >
                  {PRODUCT_NAV.map((item) => (
                    <li role="none" key={item.href}>
                      <Link href={item.href} role="menuitem" onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {SECONDARY_NAV.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                  {link.mobileLabel}
                </Link>
              ))}
            </nav>

            <div className="mobile-menu-footer">
              <Link href="/contact" className="btn-mobile-cta" onClick={() => setMobileOpen(false)}>
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header-shadow" />
    </>
  );
}
