import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { readonly size?: number };

/**
 * The inline SVGs the PHP templates repeated across pages, de-duplicated.
 * All are decorative by default (`aria-hidden`) — the surrounding control
 * carries the accessible name.
 */
function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" {...props}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </Icon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.56a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </Icon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Icon>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <Icon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </Icon>
  );
}

export function CaretIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="dropdown-caret"
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 1L5.5 6L10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Company page — Vision / Mission / Values.

   Drawn as one set: identical 24x24 box, identical stroke weight, each glyph
   optically centred and sized to the same visual area. The three replaced
   standalone SVG files that had been drawn in three different idioms — one
   stroke-based, one filled with varying opacity, one a mix — which is why they
   never read as siblings. Silhouettes are deliberately distinct (a circle, a
   vertical form and a pointed shield) so the three are told apart at a glance.
   -------------------------------------------------------------------------- */

/** Concentric target — the goal being aimed at. */
export function TargetIcon(props: IconProps) {
  return (
    <Icon strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </Icon>
  );
}

/** Rocket — the mission under way. */
export function RocketIcon(props: IconProps) {
  return (
    <Icon strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.5c2.6 2.4 4 5.6 4 9v4H8v-4c0-3.4 1.4-6.6 4-9Z" />
      <circle cx="12" cy="9.5" r="1.9" />
      <path d="M8 12.5 5.5 15.2V19L8 17.4" />
      <path d="M16 12.5l2.5 2.7V19L16 17.4" />
      <path d="M10.4 19.2c.5 1.4 1.1 2.2 1.6 2.3.5-.1 1.1-.9 1.6-2.3" />
    </Icon>
  );
}

/** Shield and check — the principles held to. */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <Icon strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.5 20 5.5v6c0 4.4-3.1 8.4-8 10-4.9-1.6-8-5.6-8-10v-6Z" />
      <path d="m8.8 11.9 2.2 2.2 4.2-4.3" />
    </Icon>
  );
}
