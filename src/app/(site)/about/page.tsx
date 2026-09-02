import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Cta from '@/components/sections/Cta';
import { RocketIcon, TargetIcon } from '@/components/ui/Icons';
import TypingAnimation from '@/components/ui/TypingAnimation';
import WordRotate from '@/components/ui/WordRotate';
import { cn } from '@/lib/dom';
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
    note: 'SAIBYA, ATM, NEXUS and ALTIUS — from a 3\u00A0kg tactical scout to a 500\u00A0kg carrier.',
  },
  { value: '2', label: 'Awards', note: 'National and state recognition for engineering and innovation.' },
  { value: '4', label: 'IPs filed', note: 'Protecting the drivetrain and climbing work developed in-house.' },
  { value: '1', label: 'Publication', note: 'Peer-reviewed work on autonomous ground mobility.' },
];

/**
 * The stagger the four figures land on, so the band reads across as a set
 * rather than arriving as one block. `fade-up` and `d1`–`d3` are global.
 */
const STAT_DELAY: readonly string[] = ['', 'd1', 'd2', 'd3'];

/** The mission and the vision: one statement per screen, each typed out as
    it comes into view, held for three seconds, and typed again. */
const STATEMENTS: ReadonlyArray<{
  readonly id: string;
  readonly icon: ReactNode;
  readonly title: string;
  readonly body: string;
}> = [
  {
    id: 'mission',
    icon: <RocketIcon size={30} />,
    title: 'Our Mission',
    body: 'To make industrial maintenance safer, smarter, and more efficient through intelligent robotics.',
  },
  {
    id: 'vision',
    icon: <TargetIcon size={30} />,
    title: 'Our Vision',
    body: 'To become a global leader in robotics-driven asset lifecycle management.',
  },
];

/** The values, on a band of their own, one at a time at display scale, each
    typed out as it slides in. */
const VALUES = [
  'Engineering Excellence',
  'Safety First',
  'Client-Centric Innovation',
  'Data-Driven Decisions',
  'Made in India',
] as const;

/* ---------------------------------------------------------------------------
   Building blocks
   -------------------------------------------------------------------------- */

/**
 * Decorative looping background behind the hero. The hero is on screen at
 * load, so it preloads in full; a band further down the page would pass
 * `metadata` to keep it from pulling its payload before it is scrolled to.
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

/* ---------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

/** Company page. */
export default function AboutPage() {
  return (
    <main className={styles.page}>
      {/* Hero */}
      <section
        className={cn('on-dark', styles.hero, 'reveal')}
        id="about-hero"
        data-cinematic-hero
        data-header-theme="dark"
      >
        <BandMedia src="/assets/videos/Arnobot2.mp4" preload="auto" />
        <div className={styles.heroInner}>
          <div className="fade-up">
            <span className="eyebrow">About ARNOBOT</span>
            <h1 className="hero-title">
              Where innovation
              <br />
              meets automation
            </h1>
            <p className="hero-lead">
              An Indian robotics company building intelligent unmanned ground vehicles for defence, industrial,
              maritime and critical infrastructure work — the jobs that are still done by hand, in the places people
              should not have to go.
            </p>
            <div className={styles.heroActions}>
              <Link href="/product" className="btn btn-light">
                See the platforms
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Origin */}
      <section className="section-screen reveal" id="about-story">
        <div className={styles.inner}>
          <div className={styles.split}>
            <div className={cn(styles.splitCopy, 'fade-up')}>
              <span className="eyebrow">Origin</span>
              <h2 className="section-title is-editorial">From ideas to impact</h2>
              <p className="section-lead">
                ARNOBOT is an emerging Indian robotics startup building intelligent unmanned ground vehicles (UGVs) for
                defence, industrial, maritime and critical infrastructure applications. By combining AI, robotics and
                autonomous technologies, we are shaping the future of unmanned mobility with safer, smarter and more
                efficient robotic solutions.
              </p>
              <p className="section-lead">
                We did not start in a lab. We started on the ground our machines are meant to protect — on plant floors,
                at height, and on the steel our robots now climb — and that is still where every platform is proven
                before it ships.
              </p>
            </div>

            <figure className={cn(styles.figure, 'fade-up', 'd1')}>
              {/* The caption beneath names the photograph, so a matching alt
                  would have it announced twice. */}
              <img src="/assets/images/abt-full.jpg" alt="" />
              <figcaption className={cn('micro-label', styles.figureCaption)}>The team, mid-build</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Mission, then vision: one statement per screen, the wash alternating. */}
      {STATEMENTS.map((statement, index) => (
        <section
          className={cn('section-screen', index % 2 === 0 && 'is-wash', 'reveal')}
          id={statement.id}
          key={statement.id}
        >
          <div className={cn(styles.statement, 'fade-up')}>
            <span className={cn('card-icon', styles.statementIcon)}>{statement.icon}</span>
            <span className="eyebrow">{statement.title}</span>
            <h2 className="section-title is-editorial">
              <TypingAnimation text={statement.body} repeatDelay={3000} />
            </h2>
          </div>
        </section>
      ))}

      {/* Values */}
      <section className={cn('on-dark', 'section-screen', styles.valuesSection, 'reveal')} id="values" data-header-theme="dark">
        <div className={cn(styles.values, 'fade-up')}>
          <span className="eyebrow">Our Values</span>
          <p className="value-current is-display">
            <WordRotate words={VALUES} typing />
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-screen reveal" id="leadership">
        <div className={styles.inner}>
          <div className={cn('section-head', styles.sectionHead, 'fade-up')}>
            <span className="eyebrow">Leadership</span>
            <h2 className="section-title is-editorial">A letter from the founder</h2>
          </div>

          <div className={styles.letter}>
            <div className={cn(styles.letterBody, 'fade-up')}>
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

            <div className={cn(styles.signatory, 'fade-up', 'd1')}>
              <img className={styles.portrait} src="/assets/images/ceo.jpg" alt="Anmol Shah" />
              <div className={styles.signatoryMeta}>
                <img className={styles.signature} src="/assets/images/sign1.png" alt="Anmol Shah signature" />
                <h3 className={styles.signatoryName}>Anmol Shah</h3>
                <span className={cn('micro-label', styles.signatoryRole)}>Founder &amp; CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Record */}
      <section className="section-screen is-wash reveal" id="about-record">
        <div className={styles.inner}>
          <div className={cn('section-head', 'is-centered', styles.sectionHead, 'fade-up')}>
            <span className="eyebrow">Record</span>
            <h2 className="section-title is-editorial">What we have built so far</h2>
          </div>

          <ul className={cn('card-grid', styles.stats)}>
            {RECORD.map((entry, index) => (
              <li className={cn(styles.stat, 'fade-up', STAT_DELAY[index])} key={entry.label}>
                <strong className="stat-value">{entry.value}</strong>
                <span className={cn('micro-label', styles.statLabel)}>{entry.label}</span>
                <span className={styles.statNote}>{entry.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Cta />
    </main>
  );
}
