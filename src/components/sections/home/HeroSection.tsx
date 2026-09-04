/** The looping hero clip: six engineers working a UGV with its battery bay open,
    shot in the Ahmedabad lab. The camera is locked off, so the loop seam reads as
    a soft jitter rather than a jump.
    The poster is the clip's own first frame, so nothing shifts when it starts. */
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
