/** Concentric precision aerospace & robotics rings behind the home about image. */
const TIERS = [
  { radius: 330, spin: 'radar-spin-slow', gradient: 'ringGrad1', guide: 0.22, dash: '3 9', width: 1.8, arc: '160 360' },
  {
    radius: 275,
    spin: 'radar-spin-reverse',
    gradient: 'ringGrad2',
    guide: 0.18,
    dash: '5 7',
    width: 1.6,
    arc: '120 300',
  },
  { radius: 220, spin: 'radar-spin-mid', gradient: 'ringGrad1', guide: 0.2, dash: '3 6', width: 1.5, arc: '80 240' },
  { radius: 165, spin: 'radar-spin-inner', gradient: null, guide: 0.16, dash: '2 6', width: 1.3, arc: '50 120' },
] as const;

export default function RadarRings() {
  return (
    <div className="about-animated-circles" aria-hidden="true">
      <div className="radar-aura" />
      <div className="radar-sweep-beam" />

      <svg className="tech-radar-svg" viewBox="0 0 700 700">
        <defs>
          <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#234b91" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#234b91" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#234b91" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#234b91" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#234b91" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#234b91" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static precision guide circles */}
        {TIERS.map((tier) => (
          <circle
            key={`guide-${tier.radius}`}
            cx="350"
            cy="350"
            r={tier.radius}
            fill="none"
            stroke="rgba(35, 75, 145, 0.08)"
            strokeWidth="1"
          />
        ))}

        {/* Precision calibration tick marks */}
        <line x1="350" y1="12" x2="350" y2="28" stroke="rgba(35, 75, 145, 0.25)" strokeWidth="1" />
        <line x1="350" y1="672" x2="350" y2="688" stroke="rgba(35, 75, 145, 0.25)" strokeWidth="1" />
        <line x1="12" y1="350" x2="28" y2="350" stroke="rgba(35, 75, 145, 0.25)" strokeWidth="1" />
        <line x1="672" y1="350" x2="688" y2="350" stroke="rgba(35, 75, 145, 0.25)" strokeWidth="1" />

        {TIERS.map((tier) => (
          <g className={tier.spin} key={tier.spin}>
            <circle
              cx="350"
              cy="350"
              r={tier.radius}
              fill="none"
              stroke={`rgba(35, 75, 145, ${tier.guide})`}
              strokeWidth="1"
              strokeDasharray={tier.dash}
            />
            <circle
              cx="350"
              cy="350"
              r={tier.radius}
              fill="none"
              stroke={tier.gradient ? `url(#${tier.gradient})` : 'rgba(35, 75, 145, 0.28)'}
              strokeWidth={tier.width}
              strokeDasharray={tier.arc}
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
