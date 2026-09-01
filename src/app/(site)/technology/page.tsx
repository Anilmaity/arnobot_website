import type { Metadata } from 'next';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import styles from './technology.module.css';

export const metadata: Metadata = {
  title: 'Technology',
  description:
    'Intelligent software, advanced GCS, and robust robotic ground vehicle platforms for extreme and mission-critical environments.',
};

/* ---------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */

/* Parked with the Ground Control Station section further down, which is
   commented out for now. Restore both together. */
/*
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
*/

/**
 * The four layers drawn by `ArchitectureDiagram`, top to bottom. Order is the
 * diagram's order: the operator sits at the top, the hardware at the bottom.
 */
const ARCHITECTURE_LAYERS: ReadonlyArray<{
  readonly name: string;
  readonly role: string;
  readonly desc: string;
}> = [
  {
    name: 'Ground Control Station',
    role: 'the human layer',
    desc: 'Where a person plans the mission, watches it run, and takes it back.',
  },
  {
    name: 'Autonomy Engine',
    role: 'the thinking layer',
    desc: 'Runs on the robot. Fuses the sensors, holds the map, decides the next move.',
  },
  {
    name: 'Real-Time Control',
    role: 'the reflex layer',
    desc: 'Does not think. Reacts — thousands of times a second, deterministically.',
  },
  {
    name: 'Robot Hardware',
    role: 'the body layer',
    desc: 'The only layer that changes between platforms.',
  },
];

/** The onboard loop, in the order the robot runs it. One line each. */
const PERCEPTION_STEPS: ReadonlyArray<{ readonly name: string; readonly body: string }> = [
  { name: 'Perceive', body: 'Laser, camera and inertial data fused on the robot. Detection runs onboard, not in the cloud.' },
  { name: 'Localise', body: 'Centimetre-grade with a satellite fix. Its own map without one — underground, indoors, under steel.' },
  { name: 'Decide', body: 'Missions are an area, not a joystick input. It replans around obstacles and resumes the pass.' },
];

/**
 * Robustness, in the same three-card rhythm as the loop above. These are
 * qualities rather than a sequence, so the small accent line carries a tag
 * instead of a step number.
 */
const RELIABILITY_POINTS: ReadonlyArray<{ readonly tag: string; readonly name: string; readonly body: string }> = [
  {
    tag: 'BUILT',
    name: 'Sealed for the site',
    body: 'Enclosures, connectors and drivetrains specified for dust, water and washdown — so a shift in the mud, the rain or the dark is an ordinary day rather than an exception.',
  },
  {
    tag: 'SAFE',
    name: 'Faults stay local',
    body: 'Lose the link, the satellite fix or a sensor and the vehicle falls back to a safe state on its own. The reflex layer holds it there while the layers above recover.',
  },
  {
    tag: 'FIELD',
    name: 'Serviceable where it works',
    body: 'Attachments come off with standard tooling, and the same core runs on every platform — so a crew trained on one robot can keep the whole fleet moving.',
  },
];


/* ---------------------------------------------------------------------------
   Building blocks
   -------------------------------------------------------------------------- */

/**
 * Decorative looping background. `preload="metadata"` keeps the four chapter
 * markers from pulling their full payload before the visitor scrolls to them.
 */
function BandMedia({ src, preload = 'metadata' }: { readonly src: string; readonly preload?: 'metadata' | 'auto' }) {
  return (
    <div className={styles.media} aria-hidden="true">
      <video autoPlay muted loop playsInline preload={preload}>
        <source src={src} type="video/mp4" />
      </video>
      <div className={styles.scrim} />
    </div>
  );
}

/**
 * The full-bleed video marker that opens each part of the page. Text is held to
 * the left column so the right of the frame stays clear — that open third is
 * how the reader can tell there is video playing behind the words.
 */
function ChapterBand({
  label,
  title,
  body,
  video,
  id,
}: {
  readonly label: string;
  readonly title: string;
  readonly body?: string;
  readonly video: string;
  readonly id?: string;
}) {
  return (
    <section className={`${styles.band} reveal`} id={id}>
      <BandMedia src={video} />
      <div className={styles.bandInner}>
        <div className={styles.fadeUp}>
          <span className={styles.bandLabel}>{label}</span>
          <hr className={styles.bandRule} />
        </div>
        <div className={`${styles.fadeUp} ${styles.d1}`}>
          <h2 className={styles.bandTitle}>{title}</h2>
          {body ? <p className={styles.bandBody}>{body}</p> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * The four-layer stack, drawn rather than listed. Arrows run down between the
 * layers; the one between Autonomy Engine and Real-Time Control runs both ways,
 * because the two exchange status many times a second. The link layer is a rail
 * beside all four rather than a fifth box, since it spans them.
 *
 * `viewBox` units are the design's own grid, so the diagram scales cleanly and
 * the labels stay in proportion at any width.
 */
function ArchitectureDiagram() {
  const BOX_H = 96;
  const GAP = 40;
  const TOP = 12;

  return (
    <svg
      className={styles.stackSvg}
      viewBox="0 0 720 580"
      role="img"
      aria-label="Arnobot system architecture: Ground Control Station, Autonomy Engine, Real-Time Control and Robot Hardware, with a link layer spanning all four."
    >
      <defs>
        <marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className={styles.stackArrowHead} />
        </marker>
        <marker id="arwUp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" className={styles.stackArrowHead} />
        </marker>
      </defs>

      {ARCHITECTURE_LAYERS.map((layer, i) => {
        const y = TOP + i * (BOX_H + GAP);
        return (
          <g key={layer.name} className={styles.stackLayer} style={{ transitionDelay: `${0.1 + i * 0.12}s` }}>
            <rect x="8" y={y} width="536" height={BOX_H} rx="4" className={styles.stackBox} />
            <text x="32" y={y + 38} className={styles.stackName}>
              {layer.name}
            </text>
            <text x="32" y={y + 64} className={styles.stackRole}>
              {layer.role}
            </text>
            <text x="32" y={y + 84} className={styles.stackDesc}>
              {layer.desc}
            </text>
          </g>
        );
      })}

      {/* Connectors. Index 1 is the two-way link between thinking and reflexes. */}
      {[0, 1, 2].map((i) => {
        const y1 = TOP + i * (BOX_H + GAP) + BOX_H + 6;
        const y2 = y1 + GAP - 14;
        const twoWay = i === 1;
        return (
          <line
            key={i}
            x1="276"
            y1={twoWay ? y1 + 4 : y1}
            x2="276"
            y2={y2}
            className={`${styles.stackArrow} ${styles.stackLayer}`}
            style={{ transitionDelay: `${0.22 + i * 0.12}s` }}
            markerEnd="url(#arw)"
            markerStart={twoWay ? 'url(#arwUp)' : undefined}
          />
        );
      })}

      {/* Link layer — a rail beside the stack, not a fifth box. */}
      <g className={styles.stackLayer} style={{ transitionDelay: '0.6s' }}>
        <line x1="584" y1={TOP} x2="584" y2={TOP + 4 * BOX_H + 3 * GAP} className={styles.stackRail} />
        <text x="604" y={TOP + 30} className={styles.stackName}>
          Link layer
        </text>
        <text x="604" y={TOP + 56} className={styles.stackRole}>
          spans all four
        </text>
        <text x="604" y={TOP + 84} className={styles.stackDesc}>
          Site wireless,
        </text>
        <text x="604" y={TOP + 104} className={styles.stackDesc}>
          cellular, long-range
        </text>
        <text x="604" y={TOP + 124} className={styles.stackDesc}>
          RF override, or a
        </text>
        <text x="604" y={TOP + 144} className={styles.stackDesc}>
          tether where radio
        </text>
        <text x="604" y={TOP + 164} className={styles.stackDesc}>
          cannot reach.
        </text>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function TechnologyPage() {
  return (
    <main className={styles.page}>
      {/* 1 — Hero */}
      <section className={`${styles.hero} reveal`} id="tech-hero" data-cinematic-hero>
        <BandMedia src="/assets/videos/Cantilever_Header.mp4" preload="auto" />
        <div className={styles.heroInner}>
          <div className={styles.fadeUp}>
            <span className={styles.eyebrow}>ARNOBOT Technology</span>
            <h1 className={styles.heroTitle}>The autonomy platform for critical ground</h1>
            <hr className={styles.rule} />
            <p className={styles.heroLead}>
              Intelligent software, advanced ground control, and robust robotic vehicle platforms for extreme and
              mission-critical environments.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — Statement */}
      <section className={`${styles.section} ${styles.center} reveal`}>
        <div className={`${styles.statementInner} ${styles.fadeUp}`}>
          <h2 className={styles.statementTitle}>Four specialized robots.</h2>
          <p className={styles.statementLead}>
           Four purpose-built platforms. From compact wireless robots to heavy-duty and vertical-climbing systems — built for different missions, with the flexibility to operate from RC to semi-autonomous to fully autonomous.
          </p>
          <Link href="/product" className={styles.btn}>
            See how it works
          </Link>
        </div>
      </section>

      {/* Critical Areas */}
      <ChapterBand
        id="tech-areas"
        label="Built for critical missions"
        title="Critical Areas"
        body="Underground, inside a vessel, along a night perimeter, under a steel hull — the ground our robots work on takes away the satellite fix, the radio link and the operator's line of sight, usually all at once."
        video="/assets/videos/Gecko_Showreel_Robots.mp4"
      />

      {/* Hardware & Software — the architecture stack */}
      <section className={`${styles.section} reveal`} id="tech-architecture">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>Hardware meets intelligence</span>
          <hr className={styles.ruleCenter} />
          <h3 className={styles.sectionTitle}>Hardware &amp; Software</h3>
          <p className={styles.sectionLead}>
            Four bodies, one four-layer core. For a new environment we change the body, not the intelligence.
          </p>
        </div>

        <figure className={`${styles.diagram} ${styles.fadeUp} ${styles.d1}`}>
          <ArchitectureDiagram />
        </figure>

        <p className={`${styles.pullQuote} ${styles.fadeUp} ${styles.d2}`}>
          Emergency stop is wired to the reflexes, not the brain — so it works even when the autonomy computer is fully
          loaded.
        </p>
      </section>

      {/* Software Overview */}
      <ChapterBand
        label="Intelligence behind every mission"
        title="Software Overview"
        video="/assets/videos/products/altius/GroundStation_setup.mp4"
      />

      {/* The onboard loop — perceive, localise, decide. */}
      <section className={`${styles.sectionTight} reveal`} id="tech-loop">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>How the robot thinks</span>
          <hr className={styles.ruleCenter} />
          <h3 className={styles.sectionTitle}>Perceive. Localise. Decide.</h3>
          <p className={styles.sectionLead}>One loop, running onboard — with or without a link to the control room.</p>
        </div>
        <ol className={`${styles.steps} ${styles.fadeUp} ${styles.d1}`}>
          {PERCEPTION_STEPS.map((step, i) => (
            <li className={styles.step} key={step.name}>
              <span className={styles.stepIndex}>{String(i + 1).padStart(2, '0')}</span>
              <h4 className={styles.stepName}>{step.name}</h4>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Analytics & Operations. The clip is already a laptop standing on white,
          so it is shown whole on a white section — no crop, no scrim, no
          knocked-back opacity. Cropping it into a full-bleed band cut the
          machine off at the edges and hid the screen. */}
      <section className={`${styles.showcaseSection} reveal`} id="tech-analytics">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>From data to mission impact</span>
          <hr className={styles.ruleCenter} />
          <h3 className={styles.sectionTitle}>Analytics &amp; Operations</h3>
          <p className={styles.sectionLead}>
            Every pass comes back as data — the map, the route it actually drove, what it saw and when. Reviewed at a
            desk, long after the robot has left the site.
          </p>
        </div>
        <figure className={`${styles.showcase} ${styles.fadeUp} ${styles.d1}`}>
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/assets/videos/Gecko_Software_on_Laptop.mp4" type="video/mp4" />
          </video>
        </figure>
      </section>

      {/* <section className={`${styles.sectionTight} reveal`} id="tech-gcs">
        <div className={styles.split}>
          <div className={`${styles.splitMedia} ${styles.fadeUp}`}>
            <img src="/assets/images/gcs_interface.png" alt="ARNOBOT Ground Control Station (GCS) user interface" />
          </div>
          <div className={`${styles.fadeUp} ${styles.d1}`}>
            <span className={styles.eyebrow}>Mission control cockpit</span>
            <h3 className={styles.blockTitle}>Ground Control Station (GCS)</h3>
            <p className={styles.blockBody}>
              The operator&apos;s cockpit: live video, vehicles on a real-time map, mission planning, geofencing and a
              one-click emergency stop — over WiFi, radio or the internet.
            </p>
            <ul className={styles.featureList}>
              {GCS_FEATURES.map((feature) => (
                <li className={styles.feature} key={feature.title}>
                  <span className={styles.featureIcon}>
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
                  </span>
                  <span>
                    <span className={styles.featureTitle}>{feature.title}</span>
                    <span className={styles.featureBody}>{feature.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section> */}


      {/* Robust & Reliable — the same card rhythm as the loop above, on light
          ground, so the argument sits above the spec table rather than behind
          another full-screen video. */}
      <section className={`${styles.sectionTight} reveal`} id="tech-reliability">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>Built tough. Built reliable.</span>
          <hr className={styles.ruleCenter} />
          <h3 className={styles.sectionTitle}>Robust &amp; Reliable</h3>
          <p className={styles.sectionLead}>
            Hardware qualified for the ground it works on, and a control chain that keeps a fault local.
          </p>
        </div>
        <ul className={`${styles.steps} ${styles.fadeUp} ${styles.d1}`}>
          {RELIABILITY_POINTS.map((point) => (
            <li className={styles.step} key={point.name}>
              <span className={styles.stepIndex}>{point.tag}</span>
              <h4 className={styles.stepName}>{point.name}</h4>
              <p className={styles.stepBody}>{point.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <Cta />
    </main>
  );
}
