/**
 * The careers section's content that more than one page reads: the open roles
 * (the filtered list on /career/open-positions and the role select in
 * `CareerForm`) and the hiring process, which /career walks through.
 *
 * `slug` is what the form posts and /api/career emails as the role, so keep
 * the values stable even when a title is reworded.
 */

export interface OpenRole {
  readonly slug: string;
  readonly title: string;
  readonly body: string;
  readonly tags: readonly string[];
}

export interface RoleGroup {
  /** The discipline's key in the filter on /career/open-positions. */
  readonly slug: string;
  readonly discipline: string;
  readonly roles: readonly OpenRole[];
}

/** Open roles, grouped by discipline, in the order the pages list them. */
export const ROLE_GROUPS: readonly RoleGroup[] = [
  {
    slug: 'hardware-firmware',
    discipline: 'Hardware & Firmware',
    roles: [
      {
        slug: 'robotics-engineer',
        title: 'Robotics Engineer',
        body: 'Mechanical design and integration across the SAIBYA, NEXUS and ATM platforms — drivetrain, enclosure, payload mounts, and the tests that prove them.',
        tags: ['Ahmedabad', 'Full-time', '2 – 5 years'],
      },
      {
        slug: 'embedded-developer',
        title: 'Embedded Systems Developer',
        body: 'Motor control, sensor drivers and the real-time layer that keeps a fault local when the link or the satellite fix disappears.',
        tags: ['Ahmedabad', 'Full-time', '1 – 4 years'],
      },
    ],
  },
  {
    slug: 'software-autonomy',
    discipline: 'Software & Autonomy',
    roles: [
      {
        slug: 'computer-vision',
        title: 'Computer Vision Engineer',
        body: 'Onboard detection and inspection perception — running on the robot, in bad light, with no cloud to fall back on.',
        tags: ['Ahmedabad / Hybrid', 'Full-time', '2 – 6 years'],
      },
      {
        slug: 'autonomy-engineer',
        title: 'Autonomy Engineer',
        body: 'Mapping, localisation and replanning for missions defined as an area to cover rather than a joystick input to follow.',
        tags: ['Ahmedabad', 'Full-time', '2 – 6 years'],
      },
    ],
  },
  {
    slug: 'research',
    discipline: 'Research',
    roles: [
      {
        slug: 'ai-intern',
        title: 'AI Research Intern',
        body: 'Six months on one hard problem, with a mentor and a robot to test it on. Open to final-year students and recent graduates.',
        tags: ['Ahmedabad', 'Internship', '6 months'],
      },
    ],
  },
  {
    slug: 'commercial',
    discipline: 'Commercial',
    roles: [
      {
        slug: 'business-dev',
        title: 'Business Development Manager',
        body: 'Own the conversation with defence, energy and infrastructure customers, from the first site visit to a signed pilot.',
        tags: ['Ahmedabad', 'Full-time', '3+ years'],
      },
    ],
  },
];

/** Every open role, in page order. */
export const OPEN_ROLES: readonly OpenRole[] = ROLE_GROUPS.flatMap((group) => group.roles);

export const ROLE_COUNT = OPEN_ROLES.length;

/** The one option in the form that is not a listed role. */
export const OPEN_APPLICATION = { slug: 'open-application', title: 'Open Application (Any Role)' } as const;

/** The pictogram on a hiring step's card; the page maps each key to an icon. */
export type HiringStepIcon = 'form' | 'call' | 'build' | 'visit';

/** One step of the hiring process. */
export interface HiringStep {
  readonly name: string;
  readonly icon: HiringStepIcon;
  /** Where the step falls on the three-week axis — the tag on the card. */
  readonly when: string;
  /** How long it takes, or how long until the answer — the one line a
   *  candidate scans for. Kept out of `detail` so it is not said twice. */
  readonly takes: string;
  /** The step in one line — what the candidate does, or gets. */
  readonly body: string;
  /** The commitment behind it: what it is, and what it is not. */
  readonly detail: string;
}

/** How to apply, and what happens after — four steps, in the order they happen. */
export const HIRING_PROCESS: readonly HiringStep[] = [
  {
    name: 'Apply',
    icon: 'form',
    when: 'Day 1',
    takes: 'Yes or no in five business days',
    body: 'Visit ARNOBOT → Careers → Apply Now. Complete the step-by-step quiz + questionnaire.',
    detail: 'We read every one — no silent pipelines, no waiting on a portal.',
  },
  {
    name: 'Intro call',
    icon: 'call',
    when: 'Week 1',
    takes: '30 minutes',
    body: 'A conversation with your future manager.',
    detail: 'What you have built, what we are building, and whether the two meet.',
  },
  {
    name: 'Technical round',
    icon: 'build',
    when: 'Week 2',
    takes: 'One live session',
    body: 'Work through a real problem from our backlog.',
    detail: 'Worked through together — no puzzles, no whiteboard trivia, no take-home marathon.',
  },
  {
    name: 'Workshop & offer',
    icon: 'visit',
    when: 'Week 3',
    takes: 'Decision within a week',
    body: 'Visit the workshop, meet the team, and drive a robot.',
    detail: 'Nothing is decided over a call alone — you see the place and the people first.',
  },
];
