import Reveal from './Reveal';

const ROWS: { metric: string; trad: string; arn: string }[] = [
  { metric: 'Human safety risk', trad: 'High exposure', arn: 'Zero human risk' },
  { metric: 'Inspection frequency', trad: 'Periodic only', arn: 'Continuous monitoring' },
  { metric: 'Data intelligence', trad: 'Manual records', arn: 'AI-driven analytics' },
  { metric: 'Downtime impact', trad: 'High downtime', arn: 'Optimised efficiency' },
  { metric: 'Operational cost', trad: 'Recurring labour', arn: 'Long-term ROI' },
];

export default function Comparison() {
  return (
    <section id="compare" className="section-white">
      <div className="wrap">
        <Reveal style={{ marginBottom: 64 }}>
          <div className="eyebrow">Why ARNOBOT</div>
          <h2 className="display-xl">
            Traditional inspection vs.
            <br />
            autonomous robotics.
          </h2>
        </Reveal>
        <Reveal delay={1} className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th style={{ color: '#999' }}>Metric</th>
                <th style={{ color: '#999' }}>Traditional Inspection</th>
                <th>ARNOBOT System</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.metric}>
                  <td>{r.metric}</td>
                  <td>
                    <span className="cross">✕</span> {r.trad}
                  </td>
                  <td>
                    <span className="check">✓</span> {r.arn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
