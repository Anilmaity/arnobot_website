import HeroCanvas from './HeroCanvas';
import { ArrowRight } from './icons';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-media" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <HeroCanvas />
      </div>
      <div className="hero-grad" />
      <div className="hero-content">
        <div className="hero-eyebrow">Made in India · Industrial Robotics</div>
        <h1 className="hero-h1">
          Robotics
          <br />
          <span>Redefined.</span>
        </h1>
        <p className="hero-sub">
          Intelligent automation for defence, industrial inspection, and mission-critical environments.
        </p>
        <div className="hero-actions">
          <a href="#products" className="btn-hero-primary">Explore Robots</a>
          <a href="#contact" className="btn-hero-ghost">
            Request a Demo
            <ArrowRight />
          </a>
        </div>
      </div>
      <div className="hero-scroll-cue">
        <div className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </div>
    </section>
  );
}
