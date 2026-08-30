const RANGE_RINGS = [
  { radius: 220, opacity: 0.07, width: 1 },
  { radius: 170, opacity: 0.09, width: 0.8 },
  { radius: 120, opacity: 0.12, width: 1 },
  { radius: 72, opacity: 0.18, width: 1.2 },
  { radius: 32, opacity: 0.28, width: 1.5 },
] as const;

const BRACKET_CORNERS = [
  { x: 140, y: -140 },
  { x: -140, y: -140 },
  { x: 140, y: 140 },
  { x: -140, y: 140 },
] as const;

const NODES = [
  { cx: 340, cy: 240, r: 4 },
  { cx: 560, cy: 240, r: 4 },
  { cx: 560, cy: 300, r: 5 },
  { cx: 700, cy: 340, r: 4 },
  { cx: 700, cy: 430, r: 4 },
  { cx: 840, cy: 300, r: 4.5 },
  { cx: 840, cy: 340, r: 4.5 },
  { cx: 200, cy: 300, r: 3.5 },
  { cx: 200, cy: 200, r: 3.5 },
] as const;

/** Decorative HUD backdrop behind the "Why Choose Us" section on the about page. */
export default function WhyChooseBackdrop() {
  return (
    <svg
      id="why-choose-svg"
      className="why-choose-bg-svg"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="tech-grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(55,94,157,0.05)" strokeWidth="0.5" />
        </pattern>
        <pattern id="tech-grid-major" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(55,94,157,0.08)" strokeWidth="0.8" />
        </pattern>
        <filter id="hud-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="reticle-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="url(#tech-grid-fine)" />
      <rect width="100%" height="100%" fill="url(#tech-grid-major)" />

      {/* Primary targeting reticle */}
      <g className="hud-primary-reticle" transform="translate(1080, 300)">
        {RANGE_RINGS.map((ring, index) => (
          <circle
            key={ring.radius}
            className={`range-ring ring-${index + 1}`}
            cx="0"
            cy="0"
            r={ring.radius}
            fill="none"
            stroke={`rgba(55,94,157,${ring.opacity})`}
            strokeWidth={ring.width}
          />
        ))}

        {/* Major graduation ticks every 45° */}
        <g stroke="rgba(55,94,157,0.35)" strokeWidth="1.2">
          <line x1="220" y1="0" x2="208" y2="0" />
          <line x1="-220" y1="0" x2="-208" y2="0" />
          <line x1="0" y1="220" x2="0" y2="208" />
          <line x1="0" y1="-220" x2="0" y2="-208" />
          <line x1="155.6" y1="155.6" x2="147.1" y2="147.1" />
          <line x1="-155.6" y1="155.6" x2="-147.1" y2="147.1" />
          <line x1="155.6" y1="-155.6" x2="147.1" y2="-147.1" />
          <line x1="-155.6" y1="-155.6" x2="-147.1" y2="-147.1" />
        </g>
        {/* Minor ticks every 22.5° */}
        <g stroke="rgba(55,94,157,0.18)" strokeWidth="0.8">
          <line x1="203" y1="84" x2="197" y2="81" />
          <line x1="84" y1="203" x2="81" y2="197" />
          <line x1="-84" y1="203" x2="-81" y2="197" />
          <line x1="-203" y1="84" x2="-197" y2="81" />
          <line x1="-203" y1="-84" x2="-197" y2="-81" />
          <line x1="-84" y1="-203" x2="-81" y2="-197" />
          <line x1="84" y1="-203" x2="81" y2="-197" />
          <line x1="203" y1="-84" x2="197" y2="-81" />
        </g>

        <g className="hud-crosshair" stroke="rgba(55,94,157,0.30)" strokeWidth="1" fill="none">
          <line x1="-240" y1="0" x2="-35" y2="0" />
          <line x1="35" y1="0" x2="240" y2="0" />
          <line x1="0" y1="-240" x2="0" y2="-35" />
          <line x1="0" y1="35" x2="0" y2="240" />
        </g>

        <g className="hud-sweep">
          <path d="M 0,0 L 220,0 A 220,220 0 0,1 155.6,155.6 Z" fill="url(#sweep-grad)" opacity="0.12" />
          <line x1="0" y1="0" x2="220" y2="0" stroke="rgba(55,94,157,0.55)" strokeWidth="1.5" />
        </g>

        <circle cx="0" cy="0" r="72" fill="none" stroke="rgba(55,94,157,0.35)" strokeWidth="1.5" strokeDasharray="8 4" />

        <circle cx="0" cy="0" r="5" fill="rgba(55,94,157,0.8)" filter="url(#reticle-glow)" />
        <circle cx="0" cy="0" r="2.5" fill="rgba(55,94,157,1)" />

        <g stroke="rgba(55,94,157,0.55)" strokeWidth="1.8" fill="none" strokeLinecap="square">
          <path d="M -140,-140 L -140,-110 M -140,-140 L -110,-140" />
          <path d="M 140,-140 L 140,-110 M 140,-140 L 110,-140" />
          <path d="M 140,140 L 140,110 M 140,140 L 110,140" />
          <path d="M -140,140 L -140,110 M -140,140 L -110,140" />
        </g>

        <g fill="rgba(55,94,157,0.45)" fontFamily="monospace" fontSize="9">
          <text x="228" y="-4">
            000°
          </text>
          <text x="-4" y="-228">
            090°
          </text>
          <text x="-255" y="-4">
            180°
          </text>
          <text x="-4" y="240">
            270°
          </text>
        </g>

        {BRACKET_CORNERS.map((corner) => (
          <circle
            key={`ring-${corner.x}-${corner.y}`}
            cx={corner.x}
            cy={corner.y}
            r="6"
            fill="none"
            stroke="rgba(55,94,157,0.40)"
            strokeWidth="1.2"
          />
        ))}
        {BRACKET_CORNERS.map((corner) => (
          <circle key={`dot-${corner.x}-${corner.y}`} cx={corner.x} cy={corner.y} r="2" fill="rgba(55,94,157,0.6)" />
        ))}
      </g>

      {/* Secondary targeting element */}
      <g className="hud-secondary-reticle" transform="translate(340, 160)">
        <circle cx="0" cy="0" r="55" fill="none" stroke="rgba(55,94,157,0.12)" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="0" cy="0" r="35" fill="none" stroke="rgba(55,94,157,0.18)" strokeWidth="1" />
        <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(55,94,157,0.28)" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3" fill="rgba(55,94,157,0.6)" />
        <line x1="-60" y1="0" x2="-16" y2="0" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
        <line x1="16" y1="0" x2="60" y2="0" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
        <line x1="0" y1="-60" x2="0" y2="-16" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
        <line x1="0" y1="16" x2="0" y2="60" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
        <g stroke="rgba(55,94,157,0.38)" strokeWidth="1.4" fill="none" strokeLinecap="square">
          <path d="M -42,-42 L -42,-28 M -42,-42 L -28,-42" />
          <path d="M 42,-42 L 42,-28 M 42,-42 L 28,-42" />
          <path d="M 42,42 L 42,28 M 42,42 L 28,42" />
          <path d="M -42,42 L -42,28 M -42,42 L -28,42" />
        </g>
        <circle
          className="hud-spin-slow"
          cx="0"
          cy="0"
          r="47"
          fill="none"
          stroke="rgba(55,94,157,0.20)"
          strokeWidth="1"
          strokeDasharray="15 40"
        />
      </g>

      {/* Third small target node */}
      <g className="hud-tertiary-reticle" transform="translate(620, 430)">
        <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(55,94,157,0.14)" strokeWidth="0.8" strokeDasharray="4 4" />
        <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(55,94,157,0.22)" strokeWidth="1" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="rgba(55,94,157,0.32)" strokeWidth="1" />
        <circle cx="0" cy="0" r="2.5" fill="rgba(55,94,157,0.55)" />
        <line x1="-35" y1="0" x2="-10" y2="0" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
        <line x1="10" y1="0" x2="35" y2="0" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
        <line x1="0" y1="-35" x2="0" y2="-10" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
        <line x1="0" y1="10" x2="0" y2="35" stroke="rgba(55,94,157,0.22)" strokeWidth="0.8" />
      </g>

      {/* Technical data lines connecting the elements */}
      <g fill="none" strokeLinecap="round">
        <polyline points="340,160 340,240 560,240 560,300 840,300" stroke="rgba(55,94,157,0.14)" strokeWidth="1.2" />
        <polyline points="620,430 700,430 700,340 840,340" stroke="rgba(55,94,157,0.14)" strokeWidth="1.2" />
        <polyline points="840,300 840,340 860,300" stroke="rgba(55,94,157,0.10)" strokeWidth="1" />
        <line x1="0" y1="60" x2="180" y2="60" stroke="rgba(55,94,157,0.08)" strokeWidth="0.8" />
        <line x1="0" y1="540" x2="250" y2="540" stroke="rgba(55,94,157,0.08)" strokeWidth="0.8" />
        <line x1="1300" y1="80" x2="1440" y2="80" stroke="rgba(55,94,157,0.08)" strokeWidth="0.8" />
        <line x1="1300" y1="520" x2="1440" y2="520" stroke="rgba(55,94,157,0.08)" strokeWidth="0.8" />
      </g>

      {/* Animated data flow lines */}
      <g fill="none" strokeLinecap="round">
        <polyline
          className="data-flow flow-1"
          points="340,160 340,240 560,240 560,300 840,300 860,300"
          stroke="rgba(55,94,157,0.7)"
          strokeWidth="1.5"
        />
        <polyline
          className="data-flow flow-2"
          points="620,430 700,430 700,340 840,340 860,320"
          stroke="rgba(55,94,157,0.7)"
          strokeWidth="1.5"
        />
        <polyline
          className="data-flow flow-3"
          points="100,300 200,300 200,200 340,200 340,160"
          stroke="rgba(55,94,157,0.7)"
          strokeWidth="1.5"
        />
      </g>

      {/* Precision node intersections */}
      <g fill="rgba(55,94,157,0.15)" stroke="rgba(55,94,157,0.45)" strokeWidth="1.2">
        {NODES.map((node) => (
          <circle key={`${node.cx}-${node.cy}`} cx={node.cx} cy={node.cy} r={node.r} />
        ))}
        <rect x="174" y="54" width="12" height="12" fill="none" stroke="rgba(55,94,157,0.28)" strokeWidth="1" />
        <rect x="1294" y="74" width="12" height="12" fill="none" stroke="rgba(55,94,157,0.28)" strokeWidth="1" />
      </g>

      <line className="scan-line" x1="0" y1="0" x2="1440" y2="0" stroke="rgba(55,94,157,0.25)" strokeWidth="1.5" />

      {/* Corner HUD brackets */}
      <g stroke="rgba(55,94,157,0.30)" strokeWidth="2" fill="none" strokeLinecap="square">
        <path d="M 0,0 L 60,0 M 0,0 L 0,50" />
        <path d="M 1440,0 L 1380,0 M 1440,0 L 1440,50" />
        <path d="M 0,600 L 60,600 M 0,600 L 0,550" />
        <path d="M 1440,600 L 1380,600 M 1440,600 L 1440,550" />
      </g>

      {/* Coordinate readout labels */}
      <g fill="rgba(55,94,157,0.25)" fontFamily="'Courier New',monospace" fontSize="10" letterSpacing="0.5">
        <text x="8" y="18">
          SYS:ACTIVE
        </text>
        <text x="8" y="590">
          LAT: 23.0225° N
        </text>
        <text x="1340" y="18">
          LON: 72.5714° E
        </text>
        <text x="1380" y="590">
          v2.4.1
        </text>
      </g>
    </svg>
  );
}
