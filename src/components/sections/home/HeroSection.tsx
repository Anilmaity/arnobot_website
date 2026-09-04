/** The looping hero clip: a montage of all four platforms at work — SAIBYA
    driving itself down a perimeter road, NEXUS crossing leaf litter, ALTIUS
    magnetised to a ship hull at the Alang yard, ATM throwing dust on a river
    bank — cross-dissolved, and dissolving back into the first shot so the loop
    closes on a cut of the same kind as every other. No one is in frame in any
    of the four.

    The whole product line is in the footage, which is what lets the copy over
    it stay to a single line. The poster is the clip's own first frame, so
    nothing shifts when it starts. */
const HERO_VIDEO = '/assets/videos/home-hero.mp4';
const HERO_POSTER = '/assets/images/home-hero-poster.webp';

export default function HeroSection() {
  return (
    <section className="hero hero-cinematic" id="home" data-cinematic-hero data-header-theme="dark">
      {/* Layer 1 — the footage. `.hero.hero-cinematic` keeps a dark ground
          beneath it, so the poster carries the frame until playback starts. */}
      <video className="hero-video" autoPlay muted loop playsInline poster={HERO_POSTER}>
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
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
