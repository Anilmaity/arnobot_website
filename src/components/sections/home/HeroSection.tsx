const HERO_VIDEO = '/assets/videos/saibya-hero.mp4';

export default function HeroSection() {
  return (
    <section className="hero hero-cinematic" id="home" data-cinematic-hero data-header-theme="dark">
      {/* Layer 0 — poster fallback, sits behind the video in case it never paints. */}
      <img className="hero-bg" src="/assets/images/hero-bg.png" alt="ARNOBOT robot payload field test" />
      {/* Layer 1 — the video is the hero background. */}
      <video className="hero-video" autoPlay muted loop playsInline>
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
