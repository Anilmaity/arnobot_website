import IntelligenceCanvas from './IntelligenceCanvas';
import { ArrowRight } from './icons';

export function PanelIntelligence() {
  return (
    <section className="panel" id="panel1">
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <IntelligenceCanvas />
      </div>
      <div className="panel-grad" />
      <div className="panel-content">
        <h2 className="panel-h2">The intelligence behind every mission.</h2>
        <a href="#technology" className="panel-link">
          Explore Technology
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}

export function PanelRuggedness() {
  return (
    <section className="panel" id="panel2">
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/uploads/WhatsApp Image 2026-04-08 at 10.08.09 PM.jpeg"
          alt="ALTIUS climbing ship hull"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
        />
      </div>
      <div className="panel-grad" />
      <div className="panel-content">
        <h2 className="panel-h2">Built for environments humans can&apos;t enter.</h2>
        <a href="#products" className="panel-link">
          View All Robots
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
