// Temporary placeholder while the hero video is out. It is a deliberately
// obvious "temp asset" card in the site's own type and colours. Swap back to a
// <video className="hero-video"> when the new footage lands — the CSS layers
// (.hero-bg z-0, ::after scrim z-2) are unchanged.
const HERO_PLACEHOLDER = '/assets/images/hero-placeholder.webp';

export default function HeroSection() {
  return (
    <section className="hero hero-cinematic" id="home" data-cinematic-hero data-header-theme="dark">
      {/* Layer 0 — the placeholder is the hero background. */}
      <img className="hero-bg" src={HERO_PLACEHOLDER} alt="" />
      {/* Layer 2 — the dark gradient scrim is `.hero-cinematic::after`. */}

      {/* Layer 3 — copy. */}
      <div className="hero-content">
        <span className="eyebrow">Robotics Redefined</span>
        <h1 className="russo">
          Building Autonomous <br />
          Systems For Industry
        </h1>
      </div>
    </section>
  );
}
