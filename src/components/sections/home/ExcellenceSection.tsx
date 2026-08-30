const METRICS: ReadonlyArray<{ readonly icon: string; readonly value?: string; readonly label: string }> = [
  { icon: '/assets/icons/icon1.png', value: '2', label: 'Awards' },
  { icon: '/assets/icons/icon2.png', value: '2', label: 'IPs' },
  { icon: '/assets/icons/icon3.png', value: '1', label: 'Publication' },
  { icon: '/assets/icons/icon4.png', label: 'Made in India' },
];

export default function ExcellenceSection() {
  return (
    <section className="excellence reveal">
      <div className="excellence-title">
        <span className="eyebrow">Engineering Excellence</span>
        <h2 className="section-title">
          Driven by Innovation,
          <br />
          Built for Impact
        </h2>
      </div>

      <div className="metrics">
        {METRICS.map((metric) => (
          <div className="metric" key={metric.label}>
            <img src={metric.icon} alt="" />
            <p>
              {metric.value ? <strong>{metric.value}</strong> : null}
              <span>{metric.label}</span>
            </p>
          </div>
        ))}
      </div>

      <span className="excellence-line" />
    </section>
  );
}
