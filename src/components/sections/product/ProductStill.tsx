interface ProductStillProps {
  readonly name: string;
  readonly src: string;
}

/**
 * One image where a product has no turntable.
 *
 * It borrows the spin viewer's stage wholesale, so the details band is laid out
 * identically whichever a product ships — same machine sitting straight on the
 * section, same grounding shadow, no panel around it. What it drops is every
 * sign that anything turns: no grab cursor, no drag, no orbit glyph. `is-ready`
 * is set because there is nothing to wait for; the stage never shows a progress
 * cursor for an image that is simply there.
 *
 * The alt text names the machine and stops there: what lands here is a keyed
 * render on one product and a field photograph on another, and the stage does
 * not care which, so the description must not claim either.
 */
export default function ProductStill({ name, src }: ProductStillProps) {
  return (
    <div className="product-details-image product-details-spin product-details-still">
      <div className="spin-stage is-ready">
        <div className="spin-frames">
          <img className="spin-frame" src={src} alt={name} />
        </div>
      </div>
    </div>
  );
}
