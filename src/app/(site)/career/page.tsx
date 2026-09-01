import type { Metadata } from 'next';
import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import CareerForm from '@/components/forms/CareerForm';
import FormAlert from '@/components/forms/FormAlert';
import { CheckCircleIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import { HQ_ADDRESS_LINES, SITE } from '@/data/site';
import styles from './career.module.css';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Build the robots that change the world — join the ARNOBOT engineering team.',
};

/* ---------------------------------------------------------------------------
   Content
   -------------------------------------------------------------------------- */

/** The strip under the hero. Every figure is one the rest of the site backs up. */
const STATS: ReadonlyArray<{ readonly value: string; readonly label: string }> = [
  { value: '04', label: 'Robot platforms in the field' },
  { value: '01', label: 'Autonomy core running on all of them' },
  { value: '06', label: 'Roles open right now' },
  { value: '05', label: 'Business days to a reply, every time' },
];

/** How the team works — the culture section, written as commitments rather than adjectives. */
const PRINCIPLES: ReadonlyArray<{ readonly title: string; readonly body: string; readonly icon: ReactNode }> = [
  {
    title: 'Go to the site',
    body: 'Specifications argue with each other. Sites do not. There is a site visit before the design review, and whoever writes the control loop has stood on the ground it will drive over.',
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
    name: 'Harshil Shah',
    role: 'Software & Website',
    shipped:
      'Software for the duct-cleaning platform and the rebuild of this site — the operator’s screen and the customer’s first screen, both in one quarter.',
  },
  {
    name: 'Prijen Balar',
    role: 'Duct Cleaning & SAIBYA',
    shipped:
      'The duct-cleaning system itself, plus the SAIBYA work running alongside it — two platforms carried through the same quarter.',
  },
  {
    name: 'Noman Menon',
    role: 'Hardware & Documentation',
    shipped:
      'Duct-cleaning hardware, and the technical documentation that ships with it — the part that decides whether a customer can run the machine without us in the room.',
  },
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

/** Line-art glyph for the principle cards. Sized by `.cardIcon svg`. */
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
      <section className={`${styles.hero} reveal`} id="career-hero" data-cinematic-hero>
        <BandMedia src="/assets/videos/Gecko_Showreel_Robots.mp4" preload="auto" />
        <div className={styles.heroInner}>
          <div className={styles.fadeUp}>
            <span className={styles.eyebrow}>Careers at {SITE.name}</span>
            <h1 className={styles.heroTitle}>Build the robots that go where people shouldn&apos;t</h1>
            <hr className={styles.rule} />
            <p className={styles.heroLead}>
              Autonomous ground platforms for hazardous inspection, defence and critical infrastructure. A small team,
              real hardware, and work that leaves the building.
            </p>
            <div className={styles.heroActions}>
              <a href="#open-roles" className={styles.btnLight}>
                See open roles
              </a>
              <a href="#apply" className={styles.btnOutline}>
                Send an open application
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — The numbers, as a caption under the hero rather than a section. */}
      <div className={styles.statsBand}>
        <ul className={styles.stats}>
          {STATS.map((stat) => (
            <li className={styles.stat} key={stat.label}>
              <span className={styles.statNumber}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3 — Why the work matters */}
      <section className={`${styles.section} reveal`} id="career-why">
        <div className={styles.split}>
          <div className={styles.fadeUp}>
            <span className={styles.eyebrow}>Why it matters</span>
            <h2 className={styles.sectionTitle}>Somebody still has to go inside the tank.</h2>
            <p className={styles.splitBody}>
              Pressure vessels, ship hulls, live substations, confined spaces underground. Checking whether any of them
              is safe is still done by a person with a torch, a permit, and a rescue team waiting outside.
            </p>
            <p className={styles.splitBody}>
              We build the machines that take that job instead. Four platforms, one autonomy core, and software that
              turns a pass through a hazardous space into a report somebody can read at a desk.
            </p>
          </div>
          <div className={`${styles.pullStat} ${styles.fadeUp} ${styles.d1}`}>
            <span className={styles.pullStatNumber}>0</span>
            <p className={styles.pullStatBody}>
              <strong>People we want inside a pressure vessel.</strong>
              That is the entire brief. Everything else on this page follows from it.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — Chapter marker: what the work is actually like */}
      <section className={`${styles.band} reveal`} id="career-life">
        <BandMedia src="/assets/videos/techv.mp4" />
        <div className={styles.bandInner}>
          <div className={styles.fadeUp}>
            <span className={styles.bandLabel}>Life at {SITE.name}</span>
            <hr className={styles.bandRule} />
          </div>
          <div className={`${styles.fadeUp} ${styles.d1}`}>
            <h2 className={styles.bandTitle}>Rust on our boots</h2>
            <p className={styles.bandBody}>
              Nothing here is finished at a desk. Every platform gets driven into a real site — dust, water, bad light,
              no signal — and comes back with a list of everything that broke. That list is the roadmap, and whoever
              wrote the code is usually the one holding the clipboard.
            </p>
          </div>
        </div>
      </section>

      {/* 5 — How we work */}
      <section className={`${styles.sectionTint} reveal`} id="career-principles">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>How we work</span>
          <hr className={styles.ruleCenter} />
          <h2 className={styles.sectionTitle}>Four things we hold each other to</h2>
          <p className={styles.sectionLead}>
            Not values on a wall. These are the arguments we actually have, settled in advance.
          </p>
        </div>
        <ul className={styles.grid4}>
          {PRINCIPLES.map((principle) => (
            <li className={styles.card} key={principle.title}>
              <span className={styles.cardIcon}>
                <Glyph>{principle.icon}</Glyph>
              </span>
              <h3 className={styles.cardTitle}>{principle.title}</h3>
              <p className={styles.cardBody}>{principle.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 6 — The people */}
      <section className={`${styles.section} reveal`} id="career-team">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>Who you would work with</span>
          <hr className={styles.ruleCenter} />
          <h2 className={styles.sectionTitle}>Engineers, and what they last shipped</h2>
          <p className={styles.sectionLead}>
            The team is small enough that everybody&apos;s work has a name attached to it. Here is the most recent
            quarter.
          </p>
        </div>
        <ul className={styles.grid3}>
          {PEOPLE.map((person) => (
            <li className={styles.card} key={person.name}>
              <h3 className={styles.personName}>{person.name}</h3>
              <span className={styles.personRole}>{person.role}</span>
              <div className={styles.personShip}>
                <span className={styles.personShipLabel}>Shipped this quarter</span>
                <p className={styles.personShipBody}>{person.shipped}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 7 — Open roles */}
      <section className={`${styles.sectionAuto} reveal`} id="open-roles">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>Open roles</span>
          <hr className={styles.ruleCenter} />
          <h2 className={styles.sectionTitle}>{ROLE_COUNT} positions open</h2>
          <p className={styles.sectionLead}>
            All based at the Ahmedabad workshop, where the robots are. Pick the one that fits and the form below will
            take it from there.
          </p>
        </div>

        <div className={`${styles.roles} ${styles.fadeUp} ${styles.d1}`}>
          {ROLE_GROUPS.map((group) => (
            <div className={styles.roleGroup} key={group.discipline}>
              <div className={styles.roleGroupHead}>
                <h3 className={styles.roleGroupName}>{group.discipline}</h3>
                <hr className={styles.roleGroupLine} />
                <span className={styles.roleGroupCount}>
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
                            <span className={styles.roleTag} key={tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className={styles.roleAction} aria-hidden="true">
                        Apply <span className={styles.roleArrow}>&rarr;</span>
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
            <a href="#apply" className={styles.btn}>
              Open application
            </a>
          </div>
        </div>
      </section>

      {/* 8 — Hiring process */}
      <section className={`${styles.processSection} reveal`} id="career-process">
        <div className={`${styles.sectionHead} ${styles.center} ${styles.fadeUp}`}>
          <span className={styles.eyebrow}>What happens next</span>
          <hr className={styles.ruleCenter} />
          <h2 className={styles.sectionTitle}>Four steps, three weeks</h2>
          <p className={styles.sectionLead}>
            The whole process, written down — so you know where you stand at every point in it.
          </p>
        </div>
        <ol className={styles.process}>
          {PROCESS.map((step, index) => (
            <li className={styles.processStep} key={step.name}>
              <span className={styles.processNum}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.processName}>{step.name}</h3>
              <p className={styles.processBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 9 — Apply */}
      <section className={`${styles.applySection} reveal`} id="apply">
        <div className={styles.applyGrid}>
          <div className={`${styles.applyAside} ${styles.fadeUp}`}>
            <span className={styles.eyebrow}>Apply</span>
            <h2 className={styles.applyTitle}>Start your application</h2>
            <p className={styles.applyBody}>
              Pick a role from the list above, or send an open application and tell us what you would build. Either way
              it reaches the same three people, and you will hear back inside five business days.
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
          <div className={`${styles.formShell} ${styles.fadeUp} ${styles.d1}`}>
            {applied ? (
              <div className={styles.successPanel} role="status" aria-live="polite">
                <div className={styles.successIcon}>
                  <CheckCircleIcon size={56} strokeWidth="1.5" />
                </div>
                <h3 className={styles.successTitle}>Application received</h3>
                <p className={styles.successBody}>
                  Thank you for applying to {SITE.name}. Your details and resume are with the team — we will come back
                  to you within five business days.
                </p>
                <Link href="/career" className={styles.btn}>
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

      <Cta />
    </main>
  );
}
