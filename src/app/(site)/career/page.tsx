import type { Metadata } from 'next';
import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import CareerForm from '@/components/forms/CareerForm';
import FormAlert from '@/components/forms/FormAlert';
import { CheckCircleIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import { HQ_ADDRESS_LINES, SITE } from '@/data/site';
import { cn } from '@/lib/dom';
import styles from './career.module.css';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Build the robots that go where people shouldn’t — open roles on the ARNOBOT engineering team in Ahmedabad.',
};

/* ---------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */

/** How the team works — the culture section, written as commitments rather than adjectives. */
const PRINCIPLES: ReadonlyArray<{ readonly title: string; readonly body: string; readonly icon: ReactNode }> = [
  {
    title: 'Go to the site',
    body: 'Specifications argue with each other. Sites do not. There is a site visit before the design review, and whoever writes the control loop has stood on the ground it will drive\u00A0over.',
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  {
    title: 'A demo is not a delivery',
    body: 'Nothing counts as finished until it has run a full mission unattended, with somebody else operating it, on a day we did not get to choose.',
    icon: (
      <>
        <path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2" />
        <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1Z" />
        <path d="m9 13 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Own the whole loop',
    body: 'Sensor to enclosure to autonomy stack to the report the customer actually reads. No hand-offs at the boundary, and no layer that belongs to somebody else.',
    icon: (
      <>
        <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-7.6-4.2" />
        <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 7.6 4.2" />
        <polyline points="21 3 19.6 7.2 15.4 6" />
        <polyline points="3 21 4.4 16.8 8.6 18" />
      </>
    ),
  },
  {
    title: 'Simple enough to run at 6am',
    body: 'The crew using the robot has a shift to finish. If it takes a specialist to switch on, we designed it wrong — and that is a bug like any other.',
    icon: (
      <>
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
        <path d="M1 14h6M9 8h6M17 16h6" />
      </>
    ),
  },
];

/**
 * The team cards. Real names, real areas, and the one thing each person shipped
 * in the quarter — the section only works while that stays current, so refresh
 * `shipped` each quarter rather than letting a card go stale.
 */
const PEOPLE: ReadonlyArray<{ readonly name: string; readonly role: string; readonly shipped: string }> = [
  {
    name: 'Prijen Balar',
    role: 'Duct Cleaning & SAIBYA',
    shipped: 'The duct-cleaning system, with the SAIBYA platform work running alongside it.',
  },
  {
    name: 'Harshil Shah',
    role: 'Software & Website',
    shipped: 'Operator software for the duct-cleaning platform, and the rebuild of this site.',
  },
  {
    name: 'Noman Menon',
    role: 'Hardware & Documentation',
    shipped: 'Duct-cleaning hardware, and the documentation a customer runs the machine from.',
  },
];

/**
 * The four rooms of the Ahmedabad workshop — where the roles below are based.
 * Every photograph is of the actual floor, not a stock lab.
 */
const ROOMS: ReadonlyArray<{ readonly image: string; readonly label: string }> = [
  { image: '/assets/images/designassmbly1.jpg', label: 'Design & Assembly' },
  { image: '/assets/images/lab1.jpg', label: 'Electronics Lab' },
  { image: '/assets/images/proto.jpg', label: 'Prototyping Lab' },
  { image: '/assets/images/soft.jpg', label: 'Software Development' },
];

/**
 * Open roles, grouped by discipline. Titles match the options in
 * `CareerForm`, so a reader can pick the same name out of the form's select.
 */
const ROLE_GROUPS: ReadonlyArray<{
  readonly discipline: string;
  readonly roles: ReadonlyArray<{
    readonly title: string;
    readonly body: string;
    readonly tags: readonly string[];
  }>;
}> = [
  {
    discipline: 'Hardware & Firmware',
    roles: [
      {
        title: 'Robotics Engineer',
        body: 'Mechanical design and integration across the SAIBYA, NEXUS and ATM platforms — drivetrain, enclosure, payload mounts, and the tests that prove them.',
        tags: ['Ahmedabad', 'Full-time', '2 – 5 years'],
      },
      {
        title: 'Embedded Systems Developer',
        body: 'Motor control, sensor drivers and the real-time layer that keeps a fault local when the link or the satellite fix disappears.',
        tags: ['Ahmedabad', 'Full-time', '1 – 4 years'],
      },
    ],
  },
  {
    discipline: 'Software & Autonomy',
    roles: [
      {
        title: 'Computer Vision Engineer',
        body: 'Onboard detection and inspection perception — running on the robot, in bad light, with no cloud to fall back on.',
        tags: ['Ahmedabad / Hybrid', 'Full-time', '2 – 6 years'],
      },
      {
        title: 'Autonomy Engineer',
        body: 'Mapping, localisation and replanning for missions defined as an area to cover rather than a joystick input to follow.',
        tags: ['Ahmedabad', 'Full-time', '2 – 6 years'],
      },
    ],
  },
  {
    discipline: 'Research',
    roles: [
      {
        title: 'AI Research Intern',
        body: 'Six months on one hard problem, with a mentor and a robot to test it on. Open to final-year students and recent graduates.',
        tags: ['Ahmedabad', 'Internship', '6 months'],
      },
    ],
  },
  {
    discipline: 'Commercial',
    roles: [
      {
        title: 'Business Development Manager',
        body: 'Own the conversation with defence, energy and infrastructure customers, from the first site visit to a signed pilot.',
        tags: ['Ahmedabad', 'Full-time', '3+ years'],
      },
    ],
  },
];

/** What happens after the form is sent, in the order it happens. */
const PROCESS: ReadonlyArray<{ readonly name: string; readonly body: string }> = [
  {
    name: 'Application review',
    body: 'We read every one. A yes or a no inside five business days — no silent pipelines, no waiting on a portal.',
  },
  {
    name: 'Intro call',
    body: 'Thirty minutes with the person you would report to. What you have built, what we are building, and whether the two meet.',
  },
  {
    name: 'Technical conversation',
    body: 'One real problem off our own backlog, worked through together. No puzzles, no whiteboard trivia, no take-home marathon.',
  },
  {
    name: 'Workshop visit & offer',
    body: 'Come see the floor, meet the team and drive a robot. A decision lands within a week of the visit.',
  },
];

const ROLE_COUNT = ROLE_GROUPS.reduce((total, group) => total + group.roles.length, 0);

/* ---------------------------------------------------------------------------
   Building blocks
   -------------------------------------------------------------------------- */

/**
 * Decorative looping background for the hero and the chapter band, matching the
 * treatment on the technology page.
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

/** Line-art glyph for the principle cards. Sized by the global `.card-icon svg`. */
function Glyph({ children }: { readonly children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/* ---------------------------------------------------------------------------
   Page
   -------------------------------------------------------------------------- */

export default async function CareerPage({ searchParams }: PageProps) {
  const { success, error } = await searchParams;
  const applied = success !== undefined;

  return (
    <main className={styles.page}>
      {/* 1 — Hero */}
      <section className={cn('on-dark', 'section-screen', styles.hero, 'reveal')} id="career-hero" data-cinematic-hero data-header-theme="dark">
        <BandMedia src="/assets/videos/Gecko_Showreel_Robots.mp4" preload="auto" />
        <div className={styles.heroInner}>
          <div className="fade-up">
            <span className="eyebrow">Careers at {SITE.name}</span>
            <h1 className={cn('hero-title', styles.heroTitle)}>Build the robots that go where people shouldn&apos;t</h1>
            <p className={cn('hero-lead', styles.heroLead)}>
              Autonomous ground platforms for hazardous inspection, defence and critical infrastructure. A small team,
              real hardware, and work that leaves the building.
            </p>
            <div className={styles.heroActions}>
              <a href="#open-roles" className="btn btn-light">
                See open roles
              </a>
              <a href="#apply" className="btn btn-outline">
                Send an open application
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Why the work matters */}
      <section className="section-screen reveal" id="career-why">
        <div className={styles.split}>
          <div className="fade-up">
            <span className="eyebrow">Why it matters</span>
            <h2 className="section-title is-editorial">Somebody still has to go inside the tank.</h2>
            <p className={cn('section-lead', styles.splitBody)}>
              Pressure vessels, ship hulls, live substations, confined spaces underground. Checking whether any of them
              is safe is still done by a person with a torch, a permit, and a rescue team waiting outside.
            </p>
            <p className={cn('section-lead', styles.splitBody)}>
              We build the machines that take that job instead. Four platforms, one autonomy core, and software that
              turns a pass through a hazardous space into a report somebody can read at a desk.
            </p>
          </div>
          <div className={cn(styles.pullStat, 'fade-up', 'd1')}>
            <span className={styles.pullStatNumber}>0</span>
            <p className={styles.pullStatBody}>
              <strong>People we want inside a pressure vessel.</strong>
              That is the entire brief. Everything else on this page follows from it.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — Chapter marker: what the work is actually like */}
      <section className={cn('on-dark', 'section-screen', styles.band, 'reveal')} id="career-life" data-header-theme="dark">
        <BandMedia src="/assets/videos/techv.mp4" />
        <div className={styles.bandInner}>
          <div className="fade-up">
            <span className={cn('eyebrow', styles.bandLabel)}>Life at {SITE.name}</span>
            <h2 className="hero-title">Rust on our boots</h2>
            <p className={cn('hero-lead', styles.bandBody)}>
              Nothing here is finished at a desk. Every platform gets driven into a real site — dust, water, bad light,
              no signal — and the list of what broke is the roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — How we work */}
      <section className="section-screen is-wash reveal" id="career-principles">
        <div className={cn('section-head is-centered', styles.sectionHead, 'fade-up')}>
          <span className="eyebrow">How we work</span>
          <h2 className="section-title is-editorial">Four things we hold each other to</h2>
          <p className="section-lead">
            Not values on a wall. These are the arguments we actually have, settled in advance.
          </p>
        </div>
        <ul className={cn('card-grid', styles.grid4)}>
          {PRINCIPLES.map((principle) => (
            <li className={cn('card-cell', styles.card)} key={principle.title}>
              <span className="card-icon">
                <Glyph>{principle.icon}</Glyph>
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 5 — The people */}
      <section className="section-screen reveal" id="career-team">
        <div className={cn('section-head is-centered', styles.sectionHead, 'fade-up')}>
          <span className="eyebrow">Who you would work with</span>
          <h2 className="section-title is-editorial">Engineers, and what they last shipped</h2>
          <p className="section-lead">
            The team is small enough that everybody&apos;s work has a name attached to it. Here is the most recent
            quarter.
          </p>
        </div>
        <ul className={cn('card-grid', styles.grid3)}>
          {PEOPLE.map((person) => (
            <li className={cn('card-cell', styles.card)} key={person.name}>
              <h3 className={styles.personName}>{person.name}</h3>
              <span className={cn('micro-label', styles.personRole)}>{person.role}</span>
              <div className={styles.personShip}>
                <span className={cn('micro-label', styles.personShipLabel)}>Shipped this quarter</span>
                <p className={styles.personShipBody}>{person.shipped}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 — Facility: where the work happens */}
      <section className="section-screen is-wash reveal" id="facility">
        <div className={cn('section-head is-centered', styles.sectionHead, 'fade-up')}>
          <span className="eyebrow">Facility</span>
          <h2 className="section-title is-editorial">Built in-house</h2>
        </div>

        <ul className={cn('card-grid', styles.rooms, 'fade-up', 'd1')}>
          {ROOMS.map((room) => (
            <li className={styles.room} key={room.label}>
              {/* The visible label names the photo it sits on, so a matching
                  alt would have every tile announced twice. */}
              <img src={room.image} alt="" />
              <span className={cn('micro-label', styles.roomLabel)}>{room.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 — Open roles */}
      <section className="section-screen is-auto reveal" id="open-roles">
        <div className={cn('section-head is-centered', styles.sectionHead, 'fade-up')}>
          <span className="eyebrow">Open roles</span>
          <h2 className="section-title is-editorial">{ROLE_COUNT} positions open</h2>
          <p className="section-lead">
            All based at the Ahmedabad workshop, where the robots are. Pick the one that fits and the form below will
            take it from there.
          </p>
        </div>

        <div className={cn(styles.roles, 'fade-up', 'd1')}>
          {ROLE_GROUPS.map((group) => (
            <div className={styles.roleGroup} key={group.discipline}>
              <div className={styles.roleGroupHead}>
                <h3 className={cn('micro-label', styles.roleGroupName)}>{group.discipline}</h3>
                <hr className={styles.roleGroupLine} />
                <span className={cn('micro-label', styles.roleGroupCount)}>
                  {group.roles.length} {group.roles.length === 1 ? 'role' : 'roles'}
                </span>
              </div>

              <ul className={styles.roleList}>
                {group.roles.map((role) => (
                  <li className={styles.role} key={role.title}>
                    <a className={styles.roleLink} href="#apply">
                      <div>
                        <h4 className={styles.roleTitle}>{role.title}</h4>
                        <p className={styles.roleBody}>{role.body}</p>
                        <div className={styles.roleMeta}>
                          {role.tags.map((tag) => (
                            <span className="tag" key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className={cn('link-arrow', styles.roleAction)} aria-hidden="true">
                        Apply{' '}
                        <span className="btn-arrow" aria-hidden="true">
                          &rarr;
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.rolesFoot}>
            <p className={styles.rolesFootText}>
              <strong>Nothing here fits?</strong>
              Send an open application and tell us what you would build. We hire for the person more often than for the
              posting.
            </p>
            <a href="#apply" className="btn">
              Open application
            </a>
          </div>
        </div>
      </section>

      {/* 8 — Hiring process */}
      <section className={cn('on-dark', 'section-screen', styles.processSection, 'reveal')} id="career-process" data-header-theme="dark">
        <div className={cn('section-head is-centered', styles.sectionHead, 'fade-up')}>
          <span className="eyebrow">What happens next</span>
          <h2 className="section-title is-editorial">Four steps, three weeks</h2>
          <p className="section-lead">
            The whole process, written down — so you know where you stand at every point in it.
          </p>
        </div>
        <ol className={styles.process}>
          {PROCESS.map((step, index) => (
            <li className={cn('fade-up', index > 0 && `d${index}`, styles.processStep)} key={step.name}>
              <span className={cn('micro-label', styles.processNum)}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.processName}>{step.name}</h3>
              <p className={styles.processBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 9 — Apply */}
      <section className="section-screen is-auto is-wash reveal" id="apply">
        <div className={styles.applyGrid}>
          <div className={cn(styles.applyAside, 'fade-up')}>
            <span className="eyebrow">Apply</span>
            <h2 className={cn('section-title is-editorial', styles.applyTitle)}>Start your application</h2>
            <p className={cn('section-lead', styles.applyBody)}>
              Pick a role from the list above, or tell us what you would build. Either way it reaches the same three
              people.
            </p>

            <div className={styles.applyInfo}>
              <div className={styles.applyInfoItem}>
                <PhoneIcon size={18} />
                <span>{SITE.phone}</span>
              </div>
              <div className={styles.applyInfoItem}>
                <MailIcon size={18} />
                <span>{SITE.email}</span>
              </div>
              <div className={styles.applyInfoItem}>
                <PinIcon size={18} />
                <span>
                  {HQ_ADDRESS_LINES.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* The form is replaced by the receipt once /api/career redirects back
              with ?success=1 — the two never need to be on screen together. */}
          <div className={cn(styles.formShell, 'fade-up', 'd1')}>
            {applied ? (
              <div className={styles.successPanel} role="status" aria-live="polite">
                <div className={styles.successIcon}>
                  <CheckCircleIcon size={56} strokeWidth="1.5" />
                </div>
                <h3 className={cn('section-title is-editorial', styles.successTitle)}>Application received</h3>
                <p className={cn('section-lead', styles.successBody)}>
                  Thank you for applying to {SITE.name}. Your details and resume are with the team — we will come back
                  to you within five business days.
                </p>
                <Link href="/career" className="btn btn-accent">
                  Back to careers
                </Link>
              </div>
            ) : (
              <>
                <FormAlert error={error} />
                <CareerForm />
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
