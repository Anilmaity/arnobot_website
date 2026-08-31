/**
 * Hand-off between the route-change scroll position (`ScrollToTop`) and the
 * GSAP refresh that follows it.
 *
 * `ScrollTrigger.refresh()` measures by jumping the page to 0 and then putting
 * the scroll back where it recorded it beforehand — a position that, across a
 * route change, belongs to the page the reader just left. Left alone it drags
 * them back down the page they have only just landed on.
 *
 * So whoever sets the scroll for a navigation records the target here, and the
 * refresh reasserts it afterwards. This also covers the case where the target
 * could not be reached the first time because the incoming page was still
 * suspended and the document was too short to scroll that far.
 */
let target: number | null = null;

/** Records the scroll offset a navigation just moved to. */
export function markScrollTarget(top: number): void {
  target = top;
}

/**
 * Reads and clears the target. Always call it, even when it will not be used,
 * so a stale target cannot leak into a later navigation.
 */
export function consumeScrollTarget(): number | null {
  const value = target;
  target = null;
  return value;
}
