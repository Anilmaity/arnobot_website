import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Cta from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Industries',
  description: "ARNOBOT's rugged robotic systems solve complex challenges across diverse, high-stakes sectors.",
};

interface PlatformSpec {
  readonly title: string;
  readonly body: string;
  readonly icon: ReactNode;
}

const PLATFORM_SPECS: readonly PlatformSpec[] = [
  {
    title: '4×4 All-Terrain',
    body: 'High-traction drive system for mud, sand, gravel, and steep slopes.',
    icon: (
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: '200 KG Payload',
    body: 'Modular flatbed deck for sensors, gear, and robotic arms.',
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2" />
      </>
    ),
  },
  {
    title: 'Mesh Telemetry',
    body: 'Real-time video and diagnostics over secure long-range mesh radio.',
    icon: (
      <path
        d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

interface IndustryCard {
  readonly tag: string;
  readonly desc: string;
  readonly image: string;
  readonly alt: string;
  readonly bullets: readonly string[];
  readonly large?: boolean;
}

const INDUSTRY_CARDS: readonly IndustryCard[] = [
  {
    tag: 'Defence & Security',
    desc: 'Custom UGVs for remote reconnaissance, border routes, and high-risk tactical logistics.',
    image: '/assets/images/defence.webp',
    alt: 'Defence & Security',
    bullets: [
      'Autonomous perimeter & border scouting',
      'Standoff threat & hazard detection',
      'Tactical supply carriage (200 kg)',
      'Remote weapon & sensor integrations',
    ],
    large: true,
  },
  {
    tag: 'Maritime & Marine',
    desc: 'Robotic crawlers and ROVs for ship hull cleaning and harbor surveillance.',
    image: '/assets/images/industry-maritime.webp',
    alt: 'Maritime & Marine',
    bullets: [
      'Robotic biofouling cleaning',
      'Non-Destructive Testing (NDT)',
      'Harbor security patrol',
      'Offshore platform inspections',
    ],
  },
  {
    tag: 'Power & Utilities',
    desc: 'Substation and nuclear facility remote inspections removing humans from danger zones.',
    image: '/assets/images/industry-power2.webp',
    alt: 'Power & Utilities',
    bullets: [
      'Thermal substation scanning',
      'Pipeline corridor inspection',
      'Switchyard structural monitoring',
      'Radiation-shielded inspections',
    ],
  },
  {
    tag: 'Industrial Logistics',
    desc: 'Material handling and inspection in mills, smelting plants, and chemical warehouses.',
    image: '/assets/images/industry-industrial.webp',
    alt: 'Industrial Logistics',
    bullets: [
      'Heavy material transport (200 kg)',
      'High-temp furnace area scouting',
      'Acoustic machinery checkups',
      'Chemical storage safety scans',
    ],
  },
  {
    tag: 'Infrastructure',
    desc: 'Structural health checks for railways, tunnels, dams, and telecom sites.',
    image: '/assets/images/industry-infra.webp',
    alt: 'Critical Infrastructure',
    bullets: [
      'Crack detection in tunnels',
      'Railway obstruction scans',
      'Dam wall integrity checks',
      'Remote telecom patrols',
    ],
  },
  {
    tag: 'Asset Protection',
    desc: '24/7 automated patrol and environmental monitoring for refineries and warehouses.',
    image: '/assets/images/industry-asset.webp',
    alt: 'Asset Protection',
    bullets: [
      'Automated route surveillance',
      'Instant intruder detection',
      'Storage tank leak alerts',
      'Thermal signature analytics',
    ],
  },
  {
    tag: 'Solar Farms',
    desc: 'Solar farm efficiency optimization via specialized panel cleaning robots, structural diagnostics, and condition mapping.',
    image: '/assets/images/industry-solar.webp',
    alt: 'Solar Farms',
    bullets: [
      'Waterless solar panel cleaning',
      'Thermal defect mapping',
      'Panel installation inspections',
      'Vegetation & ground maintenance',
    ],
    large: true,
  },
];

/** Port of industries.php */
export default function IndustriesPage() {
  return (
    <main>
      <section className="mk-hero" data-cinematic-hero>
        <div className="mk-hero-bg">
          <img src="/assets/images/abt-hero.png" alt="" aria-hidden="true" className="mk-hero-bg-img" />
        </div>
        <div className="mk-hero-inner">
          <div className="mk-hero-content">
            <span className="eyebrow">Industries Overview</span>
            <h1 className="russo mk-hero-title">
              Intelligent Automation
              <br />
              For Critical Fields
            </h1>
          </div>
        </div>
      </section>

      <section className="mk-platform reveal">
        <div className="mk-platform-inner container">
          <div className="mk-platform-visual">
            <div className="mk-platform-img-wrap">
              <img src="/assets/images/saibya-field.webp" alt="ARNOBOT SAIBYA UGV in the field" />
            </div>
            <div className="mk-float-badge mk-float-badge--a">
              <strong className="russo">200 KG</strong>
              <span>Payload</span>
            </div>
            <div className="mk-float-badge mk-float-badge--b">
              <strong className="russo">4×4</strong>
              <span>All-Terrain</span>
            </div>
            <div className="mk-float-badge mk-float-badge--c">
              <strong className="russo">Mesh</strong>
              <span>Telemetry</span>
            </div>
          </div>

          <div className="mk-platform-copy">
            <span className="eyebrow">The Platform Built for the Field</span>
            <h2 className="russo section-title">
              Multi-Mission 4×4
              <br />
              Autonomous UGV
            </h2>
            <p className="mk-platform-desc">
              Designed to execute operations in challenging terrains where human exposure is risky or impossible. This
              multi-mission platform accommodates customized attachments, sensors, and equipment payloads to meet the
              specific requirements of our key markets.
            </p>

            <div className="mk-platform-specs">
              {PLATFORM_SPECS.map((spec) => (
                <div className="mk-plat-spec" key={spec.title}>
                  <div className="mk-plat-spec-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      {spec.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="russo">{spec.title}</h4>
                    <p>{spec.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mk-industries reveal">
        <div className="container">
          <div className="mk-section-head center">
            <span className="eyebrow">Industries We Serve</span>
            <h2 className="section-title russo">Where We Make An Impact</h2>
            <p className="mk-section-sub">
              ARNOBOT&apos;s rugged robotic systems solve complex challenges across diverse, high-stakes sectors.
            </p>
          </div>

          <div className="mk-ind-grid">
            {INDUSTRY_CARDS.map((card) => (
              <article className={`mk-ind-card${card.large ? ' mk-ind-card--large' : ''}`} key={card.tag}>
                <div className="mk-ind-img">
                  <img src={card.image} alt={card.alt} />
                  <div className="mk-ind-overlay" />
                </div>
                <div className="mk-ind-content">
                  <span className="mk-ind-tag russo">{card.tag}</span>
                  <p className="mk-ind-desc">{card.desc}</p>
                  <ul className="mk-ind-list">
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mk-opp reveal">
        <div className="container-fluid">
          <div className="mk-section-head center">
            <span className="eyebrow">Industry Opportunity</span>
            <h2 className="russo section-title">India&apos;s Robotics Industry Potential</h2>
            <p className="mk-section-sub">
              Four high-growth sectors where autonomous systems are reshaping operations at scale.
            </p>
          </div>

          <div className="mk-opp-bento">
            <div className="mk-opp-tile mk-opp-tile--wide">
              <div className="mk-opp-tile-num russo">01</div>
              <div className="mk-opp-tile-body">
                <h3 className="russo mk-opp-tile-title">
                  Industrial Robotics Market <span className="mk-geo">(India)</span>
                </h3>
                <div className="mk-opp-stats">
                  <div className="mk-stat">
                    <strong className="russo">&#8377;13,000 Cr</strong>
                    <span>Market Size 2024</span>
                  </div>
                  <div className="mk-stat-arrow">→</div>
                  <div className="mk-stat">
                    <strong className="russo">&#8377;28,000 Cr</strong>
                    <span>Expected 2030</span>
                  </div>
                  <div className="mk-cagr-pill russo">13% CAGR</div>
                </div>
                <div className="mk-opp-drivers">
                  {['Smart factories', 'Labour shortage', 'Safety regulations', 'Automation adoption'].map((chip) => (
                    <span className="mk-driver-chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mk-opp-tile mk-opp-tile--dark">
              <div className="mk-opp-tile-num russo">02</div>
              <div className="mk-opp-tile-body">
                <h3 className="russo mk-opp-tile-title">Defence / Deeptech / Robotics</h3>
                <div className="mk-stat-highlight">
                  <span className="russo">&#8377;2.5 Lakh Cr</span>
                  <p>Defence Robotics &amp; AI</p>
                </div>
                <div className="mk-opp-stats mk-opp-stats--stacked">
                  <div className="mk-stat">
                    <strong className="russo">$30B</strong>
                    <span>India Deeptech by 2030</span>
                  </div>
                  <div className="mk-stat">
                    <strong className="russo">17–24%</strong>
                    <span>Drone / Autonomous CAGR</span>
                  </div>
                </div>
                <div className="mk-opp-drivers">
                  {['Atmanirbhar Bharat', 'Border security', 'Indigenous defence tech'].map((chip) => (
                    <span className="mk-driver-chip light" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mk-opp-tile">
              <div className="mk-opp-tile-num russo">03</div>
              <div className="mk-opp-tile-body">
                <h3 className="russo mk-opp-tile-title">Unmanned Ground Vehicle (UGV)</h3>
                <div className="mk-opp-stats">
                  <div className="mk-stat">
                    <strong className="russo">&#8377;26,000 Cr</strong>
                    <span>USD 3.2B (2025)</span>
                  </div>
                  <div className="mk-stat-arrow">→</div>
                  <div className="mk-stat">
                    <strong className="russo">&#8377;48,000 Cr</strong>
                    <span>USD 5.9B (2035)</span>
                  </div>
                </div>
                <div className="mk-cagr-pill russo">6–9% CAGR</div>
                <div className="mk-opp-drivers">
                  {['Military ops', 'Hazardous inspection', 'Border surveillance'].map((chip) => (
                    <span className="mk-driver-chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mk-opp-tile mk-opp-tile--accent">
              <div className="mk-opp-tile-num russo">04</div>
              <div className="mk-opp-tile-body">
                <h3 className="russo mk-opp-tile-title">Maritime &amp; Shipbuilding Market</h3>
                <div className="mk-stat-highlight">
                  <span className="russo">&#8377;3.5 Lakh Cr+</span>
                  <p>India Maritime Sector Size</p>
                </div>
                <div className="mk-opp-stats">
                  <div className="mk-stat">
                    <strong className="russo">6–8%</strong>
                    <span>Shipbuilding CAGR</span>
                  </div>
                </div>
                <div className="mk-tag-pill">Sagarmala &amp; Port Modernization</div>
                <div className="mk-opp-drivers">
                  {['Shipyards', 'Ports & logistics', 'Offshore platforms'].map((chip) => (
                    <span className="mk-driver-chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta primaryFontSize={null} />
    </main>
  );
}
