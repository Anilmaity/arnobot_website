import { VALUES } from '@/lib/data';
import Reveal from './Reveal';

export default function Company() {
  return (
    <section id="company" className="section-dark">
      <div className="wrap">
        <div className="company-split">
          <Reveal>
            <div className="eyebrow light">About ARNOBOT</div>
            <h2 className="display-xl" style={{ color: 'var(--white)', marginBottom: 32 }}>
              Transforming how critical assets are inspected.
            </h2>
            <p className="body-copy light">
              With a strong foundation in unmanned ground vehicles, defence engineering, and automation, ARNOBOT builds
              robust robotic systems designed for extreme environments — backed by a vision to become India&apos;s
              leading robotics partner.
            </p>
            <div className="mission-block" style={{ marginTop: 40 }}>
              <div className="mission-q">Mission</div>
              <div className="mission-text">
                To make industrial maintenance safer, smarter, and more efficient through intelligent robotics.
              </div>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="eyebrow light">Core Values</div>
            <div className="values-list">
              {VALUES.map((v, i) => (
                <div key={v} className="value-row">
                  <span className="value-label">{v}</span>
                  <span className="value-n">{String(i + 1).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
