import { TECH_CELLS } from '@/lib/data';
import Reveal from './Reveal';

export default function Technology() {
  return (
    <section id="technology">
      <div className="tech-split">
        <Reveal className="tech-left">
          <div className="eyebrow light">Intelligence Layer</div>
          <h2 className="display-lg" style={{ color: 'var(--white)', marginBottom: 24 }}>
            The AI that powers every mission.
          </h2>
          <p className="body-copy light">
            Computer vision, sensor fusion, and semi-autonomous navigation — operating where humans cannot, continuously
            collecting and acting on data.
          </p>
        </Reveal>
        <div className="tech-right">
          {TECH_CELLS.map((c) => (
            <div key={c.title} className="tech-cell">
              <div className="tech-cell-icon">{c.icon}</div>
              <div className="tech-cell-title">{c.title}</div>
              <div className="tech-cell-desc">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
