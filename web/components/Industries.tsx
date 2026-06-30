import { INDUSTRIES } from '@/lib/data';
import Reveal from './Reveal';

export default function Industries() {
  return (
    <section id="industries" className="section-white">
      <div className="wrap">
        <div className="industries-header">
          <Reveal>
            <div className="eyebrow">Industries Served</div>
            <h2 className="display-xl">Built for the world&apos;s most demanding environments.</h2>
          </Reveal>
          <Reveal delay={1} className="body-copy">
            From defence and oil &amp; gas to shipyards and disaster response — ARNOBOT systems are engineered to operate
            where failure is not an option.
          </Reveal>
        </div>
        <Reveal className="industries-list">
          {INDUSTRIES.map((ind, i) => (
            <div key={ind.name} className="industry-row">
              <div className="industry-row-left">
                <span className="industry-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="industry-name-row">{ind.name}</span>
              </div>
              <span className="industry-tag">{ind.tag}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
