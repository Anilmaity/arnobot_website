/**
 * The mark that says a render can be turned: two arrows carrying a box round.
 *
 * It is the only chrome on the 360 viewer, and the product hero repeats it over
 * the render it opens with, so the two read as the same object.
 *
 * Decorative in both places — the viewer carries the label on its slider, and
 * the hero has its heading — so it is hidden from assistive technology rather
 * than announced twice.
 */
export default function SpinCue({ className = 'spin-cue' }: { readonly className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path
          d="M6.13 22.65A11.9 11.9 0 0 1 11.16 5.13"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M25.87 9.35A11.9 11.9 0 0 1 20.84 26.87"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path d="M15.43 3.55 10.42 7.92 8.78 3.41Z" fill="currentColor" />
        <path d="M16.57 28.45 21.58 24.08 23.22 28.59Z" fill="currentColor" />
        {/* the box the arrows turn, lit like a solid so it reads as an object
            in space rather than a flat tile */}
        <path d="M16 9.4 21.6 12.5 16 15.6 10.4 12.5Z" fill="currentColor" opacity="0.5" />
        <path d="M10.4 12.5 16 15.6 16 21.6 10.4 18.5Z" fill="currentColor" />
        <path d="M21.6 12.5 16 15.6 16 21.6 21.6 18.5Z" fill="currentColor" opacity="0.76" />
      </svg>
    </span>
  );
}
