import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Cta from '@/components/sections/Cta';
import { RocketIcon, ShieldCheckIcon, TargetIcon } from '@/components/ui/Icons';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'Company',
  description:
    'ARNOBOT is an emerging Indian robotics startup building intelligent unmanned ground vehicles for defence, industrial, maritime, and critical infrastructure applications.',
};

/* ---------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */

/**
 * The record, in the company's own published figures. This band is the only
 * place the site states the awards, filings and publication, and the platform
 * count matches the four on the products page.
 */
const RECORD: ReadonlyArray<{
  readonly value: string;
  readonly label: string;
  readonly note: string;
}> = [
  {
    value: '4',
    label: 'Robotic platforms',
    note: 'SAIBYA, ATM, NEXUS and ALTIUS — from a 3 kg tactical scout to a 500 kg carrier.',
  },
  { value: '2', label: 'Awards', note: 'National and state recognition for engineering and innovation.' },
  { value: '4', label: 'IPs filed', note: 'Protecting the drivetrain and climbing work developed in-house.' },
  { value: '1', label: 'Publication', note: 'Peer-reviewed work on autonomous ground mobility.' },
];

/**
 * Why the company is chosen, on the four icons the page has always used. The
 * supporting line under each says what the label means in practice, which is
 * the difference between a claim and a reason.
 */
const PRINCIPLES: ReadonlyArray<{
  readonly icon: string;
  readonly title: string;
  readonly body: string;
}> = [
  {
    icon: '/assets/icons/mission.png',
    title: 'Mission-critical reliability',
    body: 'Built for the shift where failure is not an option — sealed drivetrains, redundant control, and a safe state the vehicle can always fall back to.',
  },
  {
    icon: '/assets/icons/endtoend.png',
    title: 'End-to-end development',
    body: 'Chassis, electronics, firmware and ground control are designed under one roof, so a change to the machine is not a change to four suppliers.',
  },
  {
    icon: '/assets/icons/innovation.png',
    title: 'Innovation-driven engineering',
    body: 'AI, robotics and autonomy applied to problems that are still done by hand today — at height, underground, and inside live industrial plant.',
  },
  {
    icon: '/assets/icons/icon4.png',
    title: 'Proudly made in India',
    body: 'Designed, manufactured and supported locally, which keeps lead times short and the engineers who built a robot reachable by the crew running it.',
  },
];

/** Vision, mission and the values under them — the page's statement of direction. */
const PILLARS: ReadonlyArray<{
  readonly icon: ReactNode;
  readonly title: string;
  readonly body?: string;
  readonly items?: readonly string[];
}> = [
  {
    icon: <TargetIcon size={30} />,
    title: 'Our Vision',
    body: 'To become a global leader in robotics-driven asset lifecycle management.',
  },
  {
    icon: <RocketIcon size={30} />,
    title: 'Our Mission',
    body: 'To make industrial maintenance safer, smarter and more efficient through intelligent robotics.',
  },
  {
    icon: <ShieldCheckIcon size={30} />,
    title: 'Our Values',
    items: [
      'Engineering excellence',
      'Safety first',
      'Client-centric innovation',
      'Data-driven decisions',
      'Made in India',
    ],
  },
];

const ROOMS: ReadonlyArray<{ readonly image: string; readonly label: string }> = [
  { image: '/assets/images/designassmbly1.jpg', label: 'Design & Assembly' },
  { image: '/assets/images/lab1.jpg', label: 'Electronics Lab' },
  { image: '/assets/images/proto.jpg', label: 'Prototyping Lab' },
  { image: '/assets/images/soft.jpg', label: 'Software Development' },
];

/* ---------------------------------------------------------------------------
   Building blocks
   -------------------------------------------------------------------------- */

/**
 * Decorative looping background behind a media band. `preload="metadata"` on
 * the mid-page marker keeps it from pulling its full payload before the
 * visitor has scrolled anywhere near it.
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

/** The marker that opens each light section. */
function Chapter({ name }: { readonly name: string }) {
  return <span className={styles.chapter}>{name}</span>;
}

/* ---------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

/** Company page. */
export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={`${styles.hero} reveal`} id="about-hero" data-cinematic-hero>
        <BandMedia src="/assets/videos/Arnobot2.mp4" preload="auto" />
        <div className={styles.heroInner}>
          <div className={styles.fadeUp}>
            <span className={styles.eyebrow}>About ARNOBOT</span>
            <h1 className={styles.heroTitle}>
              Where innovation
              <br />
              meets automation
            </h1>
            <hr className={styles.rule} />
            <p className={styles.heroLead}>
              An Indian robotics company building intelligent unmanned ground vehicles for defence, industrial,
              maritime and critical infrastructure work — the jobs that are still done by hand, in the places people
              should not have to go.
            </p>
            <div className={styles.heroActions}>
              <Link href="/product" className={styles.btn}>
                See the platforms
              </Link>
              <Link href="/contact" className={styles.btnGhost}>
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className={`${styles.section} reveal`} id="about-story">
        <div className={styles.inner}>
          <div className={styles.split}>
            <div className={`${styles.splitCopy} ${styles.fadeUp}`}>
              <Chapter name="Origin" />
              <h2 className={styles.sectionTitle}>From ideas to impact</h2>
              <hr className={styles.rule} />
              <p className={styles.lead}>
                ARNOBOT is an emerging Indian robotics startup building intelligent unmanned ground vehicles (UGVs) for
                defence, industrial, maritime and critical infrastructure applications. By combining AI, robotics and
                autonomous technologies, we are shaping the future of unmanned mobility with safer, smarter and more
                efficient robotic solutions.
              </p>
              <p className={styles.lead}>
                We did not start in a lab. We started on the ground our machines are meant to protect — on plant floors,
                at height, and on the steel our robots now climb — and that is still where every platform is proven
                before it ships.
              </p>
            </div>

            <figure className={`${styles.figure} ${styles.fadeUp} ${styles.d1}`}>
              {/* The caption beneath names the photograph, so a matching alt
                  would have it announced twice. */}
              <img src="/assets/images/abt-full.jpg" alt="" />
              <figcaption className={styles.figureCaption}>The team, mid-build</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Record */}
      <section className={`${styles.sectionWash} reveal`} id="about-record">
        <div className={styles.inner}>
          <div className={`${styles.sectionHead} ${styles.fadeUp}`}>
            <Chapter name="Record" />
            <h2 className={styles.sectionTitle}>What we have built so far</h2>
          </div>

          <ul className={styles.stats}>
            {RECORD.map((entry) => (
              <li className={styles.stat} key={entry.label}>
                <strong className={styles.statValue}>{entry.value}</strong>
                <span className={styles.statLabel}>{entry.label}</span>
                <span className={styles.statNote}>{entry.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Chapter marker */}
      <section className={`${styles.band} reveal`}>
        <BandMedia src="/assets/videos/techv.mp4" />
        <div className={styles.bandInner}>
          <div className={styles.fadeUp}>
            <span className={styles.bandLabel}>Engineered for reliability</span>
            <hr className={styles.bandRule} />
            <h2 className={styles.bandTitle}>Built for impact</h2>
            <p className={styles.bandBody}>
              At ARNOBOT we build autonomous systems that enhance safety and efficiency — machines that go where the
              risk is so that people do not have to.
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className={`${styles.section} reveal`} id="why-choose-us">
        <div className={styles.inner}>
          <div className={`${styles.sectionHead} ${styles.fadeUp}`}>
            <Chapter name="Principles" />
            <h2 className={styles.sectionTitle}>How we work</h2>
            <p className={styles.lead}>
              Four commitments that decide what we build, and what we refuse to ship.
            </p>
          </div>

          <ul className={`${styles.cards} ${styles.fadeUp} ${styles.d1}`}>
            {PRINCIPLES.map((item) => (
              <li className={styles.card} key={item.title}>
                <img className={styles.cardBadge} src={item.icon} alt="" />
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Direction */}
      <section className={`${styles.sectionWash} reveal`} id="vision-mission">
        <div className={styles.inner}>
          <div className={`${styles.sectionHead} ${styles.fadeUp}`}>
            <Chapter name="Direction" />
            <h2 className={styles.sectionTitle}>Where we are going</h2>
          </div>

          <ul className={`${styles.pillars} ${styles.fadeUp} ${styles.d1}`}>
            {PILLARS.map((pillar) => (
              <li className={styles.pillar} key={pillar.title}>
                <span className={styles.cardIcon}>{pillar.icon}</span>
                <h3 className={styles.cardTitle}>{pillar.title}</h3>
                {pillar.body ? <p className={styles.cardBody}>{pillar.body}</p> : null}
                {pillar.items ? (
                  <ul className={styles.pillarList}>
                    {pillar.items.map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Leadership */}
      <section className={`${styles.section} reveal`} id="leadership">
        <div className={styles.inner}>
          <div className={`${styles.sectionHead} ${styles.fadeUp}`}>
            <Chapter name="Leadership" />
            <h2 className={styles.sectionTitle}>A letter from the founder</h2>
          </div>

          <div className={styles.letter}>
            <div className={`${styles.letterBody} ${styles.fadeUp}`}>
              <p>
                I am hopeful that our mission will instill the importance of our vision to our current team, as well as
                attract new engineers and partners with shared ambition. Arnobot is a mission-focused robotics company,
                and clarity around our technological focus empowers our team to make the highest-impact decisions for
                long-term safety and industrial automation.
              </p>
              <p>
                If you share our commitment to building intelligent unmanned systems for extreme environments, please
                explore our <Link href="/career">careers</Link> and technological solutions.
              </p>
              <p className={styles.letterClosing}>
                With strong engineering conviction, there is the potential to redefine autonomous robotics.
              </p>
            </div>

            <div className={`${styles.signatory} ${styles.fadeUp} ${styles.d1}`}>
              <img className={styles.portrait} src="/assets/images/ceo.jpg" alt="Anmol Shah" />
              <div className={styles.signatoryMeta}>
                <img className={styles.signature} src="/assets/images/sign1.png" alt="Anmol Shah signature" />
                <h3 className={styles.signatoryName}>Anmol Shah</h3>
                <span className={styles.signatoryRole}>Founder &amp; CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility */}
      <section className={`${styles.sectionWash} reveal`} id="facility">
        <div className={styles.inner}>
          <div className={`${styles.sectionHead} ${styles.fadeUp}`}>
            <Chapter name="Facility" />
            <h2 className={styles.sectionTitle}>Built in-house</h2>
            <p className={styles.lead}>
              Four rooms, one building. A design change reaches a running prototype the same week.
            </p>
          </div>

          <ul className={`${styles.rooms} ${styles.fadeUp} ${styles.d1}`}>
            {ROOMS.map((room) => (
              <li className={styles.room} key={room.label}>
                {/* The visible label names the photo it sits on, so a matching
                    alt would have every tile announced twice. */}
                <img src={room.image} alt="" />
                <span className={styles.roomLabel}>{room.label}</span>
              </li>
            ))}
          </ul>

          <div className={`${styles.roomsNote} ${styles.fadeUp} ${styles.d2}`}>
            <img src="/assets/icons/check.png" alt="" />
            <p>
              Design, manufacturing, electronics, software development and rapid prototyping under one roof.
            </p>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
