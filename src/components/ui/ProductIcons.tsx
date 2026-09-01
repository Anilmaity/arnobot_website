import type { ReactNode } from 'react';
import type { ProductIconName } from '@/types';

/**
 * The line icons that mark each feature and application on a product page.
 *
 * Drawn on the same 24-unit grid and stroked with `currentColor`, like the
 * shared set in `Icons.tsx`, so a badge only has to set a colour and a size.
 *
 * Each glyph draws the thing its row names — a spring for suspension, a feather
 * for the 3 kg chassis, a padlock for the encrypted link — rather than a
 * decorative mark. The row should be recognisable from the icon before the
 * label is read; anything that needs the label to make sense is the wrong
 * drawing, so prefer an object over an abstraction.
 */
const GLYPHS: Readonly<Record<ProductIconName, ReactNode>> = {
  /* ---- Platform -------------------------------------------------------- */

  /** Hooked weight — payload capacity. */
  payload: (
    <>
      <path d="M9 7.5a3 3 0 0 1 6 0" />
      <path d="M6.8 7.5h10.4L19 20H5z" />
    </>
  ),
  /** Treaded wheel — the drivetrain. */
  drive: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 4v3.4M12 16.6V20M4 12h3.4M16.6 12H20" />
    </>
  ),
  /** Coil between two plates — suspension travel. */
  suspension: (
    <>
      <path d="M7 4h10M7 20h10" />
      <path d="M8.5 6.8h7l-7 2.6h7l-7 2.6h7l-7 2.6h7" />
    </>
  ),
  /** Flight of steps — stair climbing and broken ground. */
  stairs: <polyline points="3.5 19 3.5 15 9 15 9 11 14.5 11 14.5 7 20.5 7" />,
  /** Feather — an ultra-light chassis. */
  lightweight: (
    <>
      <path d="M19.5 4.5c-7 0-12 4-14 10.5L4 19.5l4.5-1.5C15 16 19.5 11 19.5 4.5z" />
      <path d="M15.5 8.5 8 16" />
    </>
  ),
  /** Two arrows turning a body over — drives inverted. */
  invertible: (
    <>
      <path d="M4 9.5a8 8 0 0 1 13.5-4.2" />
      <polyline points="17.5 2 17.5 5.8 13.7 5.8" />
      <path d="M20 14.5a8 8 0 0 1-13.5 4.2" />
      <polyline points="6.5 22 6.5 18.2 10.3 18.2" />
    </>
  ),
  /** Hard hat — a build made for an industrial site. */
  rugged: (
    <>
      <path d="M3.5 17.5h17" />
      <path d="M6 17.5v-3.2a6 6 0 0 1 12 0v3.2" />
      <path d="M10 9V5.5h4V9" />
    </>
  ),
  /** Horseshoe magnet — magnetic grip on steel. */
  magnet: (
    <>
      <path d="M6.5 20v-8a5.5 5.5 0 0 1 11 0v8" />
      <path d="M6.5 20h4v-4.5h-4M13.5 15.5h4V20h-4" />
    </>
  ),

  /* ---- Control & payload ----------------------------------------------- */

  /** Hand controller — remote and autonomous modes. */
  control: (
    <>
      <rect x="2.5" y="8.5" width="19" height="9" rx="4.5" />
      <path d="M6.5 13h3M8 11.5v3" />
      <circle cx="16" cy="13" r="1.1" />
    </>
  ),
  /** Padlock — an encrypted link. */
  encrypted: (
    <>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <path d="M12 14.5v2" />
    </>
  ),
  /** Stopwatch — rapid deployment. */
  rapid: (
    <>
      <circle cx="12" cy="13.5" r="7" />
      <path d="M12 10v3.5l2.2 1.6" />
      <path d="M9.5 3h5M12 3v3.5" />
    </>
  ),
  /** Muted speaker — a low acoustic signature. */
  quiet: (
    <>
      <path d="M3.5 9.5H7L11.5 6v12L7 14.5H3.5z" />
      <path d="M15.5 9.5 20.5 14.5M20.5 9.5 15.5 14.5" />
    </>
  ),
  /** Two blocks joined — interchangeable attachments. */
  modular: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
      <path d="M11 7h4a2 2 0 0 1 2 2v4" />
    </>
  ),
  /** Wrench — tooling that swaps out. */
  tooling: (
    <path d="M15.8 3.4a5.5 5.5 0 0 0-6.9 7L3.4 15.9v4.7h4.7l5.5-5.5a5.5 5.5 0 0 0 7-6.9l-3.2 3.2-3.5-3.5z" />
  ),

  /* ---- Feed & data ------------------------------------------------------ */

  /** Camera body — the onboard video feed. */
  feed: (
    <>
      <rect x="2.5" y="7" width="12" height="10" rx="1.5" />
      <path d="M14.5 11.5 21.5 8v8l-7-3.5z" />
    </>
  ),
  /** Broadcast arcs — real-time transmission off the machine. */
  transmit: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <path d="M8.6 15.4a4.8 4.8 0 0 1 0-6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8" />
      <path d="M5.8 18.2a8.8 8.8 0 0 1 0-12.4M18.2 5.8a8.8 8.8 0 0 1 0 12.4" />
    </>
  ),
  /** Rising bars — analytics off the collected data. */
  analytics: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M7 20.5v-5M12 20.5v-9M17 20.5v-13" />
    </>
  ),

  /* ---- Where it works --------------------------------------------------- */

  /** Shield — defence work. */
  defence: <path d="M12 3l7.5 3v5.5c0 4.6-3.1 8.2-7.5 10.2-4.4-2-7.5-5.6-7.5-10.2V6z" />,
  /** Banded crate — ammunition carriage. */
  ammunition: (
    <>
      <rect x="3" y="8" width="18" height="11" rx="1.5" />
      <path d="M3 11.5h18M9 8v11M15 8v11" />
      <path d="M6.5 8V5.5h11V8" />
    </>
  ),
  /** Flatbed truck — heavy transport and logistics. */
  transport: (
    <>
      <path d="M2.5 16.5v-9h10v9" />
      <path d="M12.5 11h4l3 3v2.5h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="16.5" cy="18" r="1.8" />
    </>
  ),
  /** Two chain links — towing. */
  towing: (
    <>
      <rect x="2.5" y="9" width="9.5" height="6" rx="3" />
      <rect x="12" y="9" width="9.5" height="6" rx="3" />
    </>
  ),
  /** Plant roofline — industrial site work. */
  industrial: <path d="M3 20V10.5l6 3.75V10.5l6 3.75V6l6 3.75V20z" />,
  /** Eye — surveillance. */
  surveillance: (
    <>
      <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  /** Binoculars — reconnaissance. */
  recon: (
    <>
      <circle cx="6.5" cy="15" r="3.6" />
      <circle cx="17.5" cy="15" r="3.6" />
      <path d="M9.6 13.6h4.8" />
      <path d="M5.4 11.6 7 4.5h3l.6 7M18.6 11.6 17 4.5h-3l-.6 7" />
    </>
  ),
  /** Office block — indoor inspection. */
  building: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="1" />
      <path d="M9 7.5h2M13 7.5h2M9 11.5h2M13 11.5h2M9 15.5h2M13 15.5h2" />
      <path d="M2.5 20.5h19" />
    </>
  ),
  /** Spanned arch — infrastructure inspection. */
  bridge: (
    <>
      <path d="M2.5 16.5c0-5.2 4.3-8.5 9.5-8.5s9.5 3.3 9.5 8.5" />
      <path d="M2.5 16.5h19" />
      <path d="M7 16.5v-3.2M12 16.5v-5M17 16.5v-3.2" />
      <path d="M2.5 20.5h19" />
    </>
  ),
  /** Folded map divided by a line — a border being watched. */
  border: (
    <>
      <path d="M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2z" />
      <path d="M12 5.2v3M12 10.5v3M12 15.8v3" />
    </>
  ),
  /** Radar sweep — scouting an unknown area. */
  radar: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12 18 6" />
    </>
  ),
  /** Warning triangle — disaster response. */
  disaster: (
    <>
      <path d="M12 4l8.5 15.5h-17z" />
      <path d="M12 10.5v3.5M12 17h.01" />
    </>
  ),
  /** Trefoil — hazardous zones. */
  hazard: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5V3M9.8 13.3 4.2 16.6M14.2 13.3l5.6 3.3" />
    </>
  ),
  /** Spray bottle — cleaning at height. */
  spray: (
    <>
      <rect x="8" y="8.5" width="6" height="11.5" rx="1" />
      <path d="M8 8.5V6h6v2.5" />
      <path d="M16.5 5.5h.01M19.5 7.5h.01M16.5 10h.01M19.5 12h.01" />
    </>
  ),
  /** Paint roller — surface coating and blasting. */
  paint: (
    <>
      <rect x="3.5" y="3.5" width="12" height="5" rx="1" />
      <path d="M15.5 6h3a2 2 0 0 1 2 2v1.5a2 2 0 0 1-2 2H12v2.5" />
      <rect x="10" y="14.5" width="4" height="6" rx="1" />
    </>
  ),
  /** Grass blades — cutting and clearing. */
  grass: (
    <>
      <path d="M3.5 20.5h17" />
      <path d="M6 20.5c0-4 1-6 2.5-7.5M11 20.5c0-5.5.8-8.5 2.5-10.5M16 20.5c0-4 .8-6.3 2.3-8" />
    </>
  ),
  /** Map panels with a marked point — asset mapping. */
  mapping: (
    <>
      <path d="M3.5 6.5 9 4.5v13l-5.5 2zM9 4.5l6 2v13l-6-2zM15 6.5l5.5-2v13l-5.5 2z" />
      <circle cx="12" cy="10.5" r="1.6" />
    </>
  ),
};

/**
 * Sized by its container rather than a prop, so the badge around it owns the
 * scale. Decorative: the row's own text carries the meaning.
 */
export function ProductIcon({ name }: { readonly name: ProductIconName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {GLYPHS[name]}
    </svg>
  );
}
