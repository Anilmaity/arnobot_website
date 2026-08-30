/** Concentric radar backdrop behind the blog-details hero banner. */
export default function BlogHeroRadar() {
  return (
    <div className="hero-shape-backdrop" aria-hidden="true">
      <svg className="hero-radar-svg" viewBox="0 0 600 600" fill="none">
        <defs>
          <linearGradient id="heroShapeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#2563eb" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroShapeGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Concentric tech guide circles */}
        {[
          [280, 0.12],
          [220, 0.1],
          [160, 0.1],
          [100, 0.12],
        ].map(([radius, opacity]) => (
          <circle
            key={radius}
            cx="300"
            cy="300"
            r={radius}
            stroke={`rgba(56, 189, 248, ${opacity})`}
            strokeWidth="1"
          />
        ))}

        {/* Target crosshairs & calibration ticks */}
        <line x1="300" y1="10" x2="300" y2="30" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
        <line x1="300" y1="570" x2="300" y2="590" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
        <line x1="10" y1="300" x2="30" y2="300" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />
        <line x1="570" y1="300" x2="590" y2="300" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" />

        <g className="hero-shape-spin-slow">
          <circle cx="300" cy="300" r="280" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" strokeDasharray="4 12" />
          <circle
            cx="300"
            cy="300"
            r="280"
            stroke="url(#heroShapeGrad1)"
            strokeWidth="2.5"
            strokeDasharray="140 320"
            strokeLinecap="round"
          />
        </g>

        <g className="hero-shape-spin-reverse">
          <circle cx="300" cy="300" r="220" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="1" strokeDasharray="6 8" />
          <circle
            cx="300"
            cy="300"
            r="220"
            stroke="url(#heroShapeGrad2)"
            strokeWidth="2"
            strokeDasharray="100 260"
            strokeLinecap="round"
          />
        </g>

        <g className="hero-shape-spin-mid">
          <circle cx="300" cy="300" r="160" stroke="rgba(56, 189, 248, 0.22)" strokeWidth="1" strokeDasharray="4 6" />
          <circle
            cx="300"
            cy="300"
            r="160"
            stroke="#00f0ff"
            strokeWidth="1.5"
            strokeDasharray="60 180"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        <circle cx="300" cy="300" r="6" fill="#00f0ff" />
        <circle cx="300" cy="300" r="14" stroke="#00f0ff" strokeWidth="1" strokeDasharray="2 4" opacity="0.8" />
      </svg>
    </div>
  );
}
