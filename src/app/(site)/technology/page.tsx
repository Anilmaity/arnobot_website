import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Cta from '@/components/sections/Cta';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'Intelligent software, advanced GCS, and robust robotic ground vehicle platforms for extreme and mission-critical environments.',
};

const GCS_FEATURES: ReadonlyArray<{ readonly title: string; readonly body: string; readonly icon: ReactNode }> = [
  {
    title: 'Multi-Link Telemetry',
    body: 'Streams live diagnostics and control signals over secure local WiFi, long-range mesh radio, or mobile internet links.',
    icon: <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />,
  },
  {
    title: 'Real-Time Map Tracking',
    body: 'Tracks active vehicles and plans autonomous coordinates on a high-fidelity topographical map overlay.',
    icon: (
      <>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </>
    ),
  },
  {
    title: 'Geofencing & Safety Awareness',
    body: 'Enforces safety boundaries, detects local obstacles, and provides a remote emergency stop switch.',
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
];

const NAV_CHECKLIST: readonly string[] = [
  'Real-time SLAM (Simultaneous Localization & Mapping) for GPS-denied environments',
  'Intelligent Sensor Fusion blending LiDAR, depth cameras, IMUs, and ultrasonic data',
  'Adaptive dynamic path planning to navigate moving obstacles automatically',
  'Automated return-to-base system if communication links are disrupted',
];

const PLATFORM_SPECS: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: '4x4', label: 'All-Terrain Traction' },
  { value: 'IP65', label: 'Weather Protection' },
  { value: 'E-Stop', label: 'Physical Emergency Button' },
  { value: '100+ KG', label: 'Payload Capacity' },
];

/** Port of technology.php */
export default function TechnologyPage() {
  return (
    <main>
      <section className="tech-hero" id="tech-hero">
        <div className="tech-hero-container container">
          <div className="tech-hero-content">
            <span className="eyebrow">ARNOBOT Technology</span>
            <h1 className="russo">
              Pioneering
              <br />
              Autonomous Operations
            </h1>
            <p className="tech-hero-desc">
              Intelligent software, advanced GCS, and robust robotic ground vehicle platforms for extreme and
              mission-critical environments.
            </p>
          </div>
        </div>
      </section>

      <section className="tech-gcs reveal" id="tech-gcs">
        <div className="container tech-grid">
          <div className="tech-image">
            <div className="tech-img-frame">
              <img src="/assets/images/gcs_interface.png" alt="ARNOBOT Ground Control Station (GCS) user interface" />
            </div>
          </div>
          <div className="tech-copy">
            <span className="eyebrow">Mission Control Cockpit</span>
            <h2 className="russo section-title">
              Ground Control
              <br />
              Station (GCS)
            </h2>
            <p className="tech-desc">
              A Ground Control Station is the operator&apos;s cockpit for unmanned systems. It streams live video, tracks
              vehicles on a real-time map, plans autonomous missions, and enforces safety with geofencing, obstacle
              awareness, and one-click emergency stop — over WiFi, radio, or the internet.
            </p>

            <div className="tech-features">
              {GCS_FEATURES.map((feature) => (
                <div className="tech-feat-item" key={feature.title}>
                  <div className="tech-feat-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <div>
                    <h4 className="russo">{feature.title}</h4>
                    <p>{feature.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="tech-nav reveal" id="tech-nav">
        <div className="container tech-grid tech-grid--reverse">
          <div className="tech-image">
            <div className="tech-img-frame">
              <video className="tech-video" autoPlay muted loop playsInline controls>
                <source src="/assets/videos/techv.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="tech-copy">
            <span className="eyebrow">Intelligent Autonomy Stack</span>
            <h2 className="russo section-title">
              Autonomous Navigation
              <br />
              Engine
            </h2>
            <p className="tech-desc">
              At the heart of every ARNOBOT platform is our customized self-driving software engine. Using advanced
              sensor fusion and localized SLAM technology, our systems build real-time visual pathways and handle complex
              environments without relying on GPS.
            </p>

            <ul className="check-list tech-check-list">
              {NAV_CHECKLIST.map((item) => (
                <li key={item}>
                  <img src="/assets/icons/check.png" alt="" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="tech-platform reveal" id="tech-platform">
        <div className="container tech-grid">
          <div className="tech-image tech-image--contain">
            <img
              src="/assets/images/ugv_platform_isolated.png"
              alt="ARNOBOT 4x4 rugged unmanned ground vehicle platform"
            />
          </div>
          <div className="tech-copy">
            <span className="eyebrow">All-Terrain Drivetrain</span>
            <h2 className="russo section-title">
              4x4 Rugged Robotic
              <br />
              Platform
            </h2>
            <p className="tech-desc">
              Our hardware platforms are engineered to survive extreme physical conditions. Featuring a heavy-duty
              electric vehicle drivetrain, thick-tread tires, modular payload rails, and physical emergency switches,
              they are ready for industrial and security deployments.
            </p>

            <div className="tech-specs-grid">
              {PLATFORM_SPECS.map((spec) => (
                <div className="tech-spec-card" key={spec.label}>
                  <span className="tech-spec-num russo">{spec.value}</span>
                  <span className="tech-spec-label">{spec.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
