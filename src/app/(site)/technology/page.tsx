import type { Metadata } from 'next';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import ArchitectureDiagram from '@/components/sections/technology/ArchitectureDiagram';
import { cn } from '@/lib/dom';
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

/* The four-layer architecture — its copy, wiring and motion — lives with the
   diagram in src/components/sections/technology/ArchitectureDiagram.tsx. */

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
 * Temporary stand-in while a band's footage is out — the same deliberately
 * obvious "temp asset" card the home and About heroes show, with the card
 * held to the right third so it clears the band's copy. Pass it as `image`
 * in place of `video`; swap back when the clip lands.
 */
const BAND_PLACEHOLDER = '/assets/images/band-placeholder.webp';

/** A band shows either a looping clip or a still; never both. */
type BandSource =
  | { readonly video: string; readonly image?: undefined }
  | { readonly image: string; readonly video?: undefined };

/**
 * Decorative background — a looping clip, or a still while the clip is out.
 * `preload="metadata"` keeps the chapter markers from pulling their full
 * payload before the visitor scrolls to them.
 */
function BandMedia({ video, image, preload = 'metadata' }: BandSource & { readonly preload?: 'metadata' | 'auto' }) {
  return (
    <div className={styles.media} aria-hidden="true">
      {image ? (
        <img src={image} alt="" />
      ) : (
        <video autoPlay muted loop playsInline preload={preload}>
          <source src={video} type="video/mp4" />
        </video>
      )}
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
  id,
  ...source
}: BandSource & {
  readonly label: string;
  readonly title: string;
  readonly body?: string;
  readonly id?: string;
}) {
  return (
    <section className={cn('on-dark', styles.band, 'reveal')} id={id} data-header-theme="dark">
      <BandMedia {...source} />
      <div className={styles.bandInner}>
        <div className="fade-up">
          <span className="eyebrow">{label}</span>
          <h2 className="hero-title">{title}</h2>
          {body ? <p className={cn('hero-lead', styles.bandBody)}>{body}</p> : null}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default function TechnologyPage() {
  return (
    <main className={styles.page}>
      {/* 1 — Hero */}
      <section
        className={cn('on-dark', styles.hero, 'reveal')}
        id="tech-hero"
        data-cinematic-hero
        data-header-theme="dark"
      >
        <BandMedia video="/assets/videos/technology-hero.mp4" preload="auto" />
        <div className={styles.heroInner}>
          <div className="fade-up">
            <span className="eyebrow">ARNOBOT Technology</span>
            <h1 className={cn('hero-title', styles.heroTitle)}>The autonomy platform for critical ground</h1>
            <p className="hero-lead">
              Intelligent software, advanced ground control, and robust robotic vehicle platforms for extreme and
              mission-critical environments.
            </p>
          </div>
        </div>
      </section>

      {/* 2 — Statement */}
      <section className={cn('section-screen', styles.center, 'reveal')}>
        <div className={cn('fade-up', styles.statementInner)}>
          <div className={cn('section-head', 'is-centered', styles.sectionHead)}>
            <span className="eyebrow">Purpose-built platforms</span>
            <h2 className="section-title is-editorial">Specialized robots.</h2>
            <p className="section-lead">
              Purpose-built robotic platforms for different missions — from compact wireless robots to heavy-duty
              and vertical-climbing systems. Built with the flexibility to operate from RC to semi-autonomous to
              fully autonomous.
            </p>
          </div>
          <Link href="/product" className="btn">
            See how it works
          </Link>
        </div>
      </section>

      {/* Critical Areas. The clip is out; the band runs the temp card until
          the replacement footage lands. */}
      <ChapterBand
        id="tech-areas"
        label="Built for critical missions"
        title="Critical Areas"
        body="Underground, inside a vessel, along a night perimeter, under a steel hull — the ground our robots work on takes away the satellite fix, the radio link and the operator's line of sight, usually all at once."
        image={BAND_PLACEHOLDER}
      />

      {/* Hardware & Software — the architecture stack */}
      <section className={cn('section-screen', 'reveal')} id="tech-architecture">
        <div className={cn('section-head', 'is-centered', 'fade-up', styles.sectionHead)}>
          <span className="eyebrow">Hardware meets intelligence</span>
          <h2 className="section-title is-editorial">Hardware &amp; Software</h2>
          <p className="section-lead">
            One four-layer core, from remote control to full autonomy. For a new environment we change the body,
            not the intelligence.
          </p>
        </div>

        {/* The diagram assembles itself node by node once the section is in
            view, so it does not ride the section's fade-up. It is the
            section's own flex item so it can take the height left between the
            head and the pull quote and scale itself to fit one screen. */}
        <ArchitectureDiagram />

        <p className={cn('fade-up', 'd2', styles.pullQuote)}>
          Emergency stop is wired to the reflexes, not the brain — so it works even when the autonomy computer is fully
          loaded.
        </p>
      </section>

      {/* Software Overview. The band runs the GCS itself behind the words —
          the live dashboard, a completed mission with its planned and actual
          path, and a waypoint route on satellite. Real captures, drifted and
          cross-faded, so the section names the software over a picture of it. */}
      <ChapterBand
        id="tech-software"
        label="Intelligence behind every mission"
        title="Software Overview"
        body="The software runs on our platform: the operator interface, where missions are planned and monitored; the autonomy engine, which executes missions on the robot with or without a live connection; and the mission record, which is retrieved when the robot reconnects to the operator system."
        video="/assets/videos/gcs-software.mp4"
      />

      {/* The onboard loop — perceive, localise, decide. */}
      <section className={cn('section-screen', 'reveal')} id="tech-loop">
        <div className={cn('section-head', 'is-centered', 'fade-up', styles.sectionHead)}>
          <span className="eyebrow">How the robot thinks</span>
          <h2 className="section-title is-editorial">Perceive. Localise. Decide.</h2>
          <p className="section-lead">One loop, running onboard — with or without a link to the control room.</p>
        </div>
        <ol className={cn('card-grid', 'fade-up', 'd1', styles.steps)}>
          {PERCEPTION_STEPS.map((step, i) => (
            <li className={cn('card-cell', styles.step)} key={step.name}>
              <span className={cn('micro-label', styles.stepIndex)}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.name}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Analytics & Operations. Copy on the left, the GCS on a laptop on the
          right — the same split as the Origin section on About. The laptop is
          drawn in CSS rather than shot, so it stays sharp at every width and
          the screen carries our own software instead of a stock desk. */}
      <section className={cn('section-screen', 'reveal')} id="tech-analytics">
        <div className={styles.showcaseSplit}>
          <div className={cn(styles.showcaseCopy, 'fade-up')}>
            <span className="eyebrow">From data to mission impact</span>
            <h2 className="section-title is-editorial">Analytics &amp; Operations</h2>
            <p className="section-lead">
              Every pass comes back as data — the map, the route it actually drove, what it saw and when. Reviewed at
              a desk, long after the robot has left the site.
            </p>
          </div>
          {/* The screen runs the GCS itself: the live dashboard, then the
              Mission Reports view of a completed run with its planned route
              drawn against the path the robot actually drove — the section's
              sentence in two pictures. Both are real captures at the screen's
              own 1440x900, so the clip needs no crop. The poster is the second
              of them, which is what a visitor sees before the file lands. */}
          <figure className={cn('fade-up', 'd1', styles.showcase)}>
            <div className={styles.laptop}>
              <div className={styles.laptopLid}>
                <span className={styles.laptopCam} aria-hidden="true" />
                <div className={styles.laptopScreen}>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/assets/images/gcs-mission-report.webp"
                    aria-label="The ARNOBOT Ground Control Station: the live mission dashboard, then a completed mission reviewed afterwards — distance covered, time taken, waypoints reached, and the planned route drawn against the path actually driven."
                  >
                    <source src="/assets/videos/gcs-laptop.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className={styles.laptopBase} aria-hidden="true" />
            </div>
          </figure>
        </div>
      </section>

      {/* <section className={`${styles.section} reveal`} id="tech-gcs">
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
      <section className={cn('section-screen', 'reveal')} id="tech-reliability">
        <div className={cn('section-head', 'is-centered', 'fade-up', styles.sectionHead)}>
          <span className="eyebrow">Built tough. Built reliable.</span>
          <h2 className="section-title is-editorial">Robust &amp; Reliable</h2>
          <p className="section-lead">
            Hardware qualified for the ground it works on, and a control chain that keeps a fault local.
          </p>
        </div>
        <ul className={cn('card-grid', 'fade-up', 'd1', styles.steps)}>
          {RELIABILITY_POINTS.map((point) => (
            <li className={cn('card-cell', styles.step)} key={point.name}>
              <span className={cn('micro-label', styles.stepIndex)}>{point.tag}</span>
              <h3>{point.name}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <Cta />
    </main>
  );
}
