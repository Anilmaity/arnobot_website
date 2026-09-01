/**
 * Posts for the /insights index.
 *
 * Every entry is grounded in something the site already publishes — the four
 * platforms and their stated specifications in `products.ts`, the control
 * stack and field-readiness claims on the technology page, the record and
 * principles on the company page, and the award register behind
 * `recognition.ts`. Nothing here asserts a capability, figure, customer or
 * result that does not already appear elsewhere on the site.
 *
 * What is still editorial: the titles, the framing of each summary, and the
 * publication dates. Those are scaffolding for layout and are expected to be
 * rewritten — but they were written against the real product line rather than
 * invented, so replacing them is an edit rather than a correction.
 *
 * Images come from the site's existing library, matched to the platform or
 * sector each post is about.
 *
 * Every post has a page at /insights/[slug], built from `body` below, so the
 * cards on the index are links. Adding an entry here publishes an article; the
 * route prerenders from this list and rejects anything outside it.
 */

export type InsightCategory = 'Technology' | 'Industry' | 'Company' | 'Engineering';

/** One titled section of an article body. */
export interface ArticleSection {
  readonly heading: string;
  readonly text: string;
}

export interface InsightPost {
  readonly slug: string;
  readonly category: InsightCategory;
  readonly title: string;
  readonly excerpt: string;
  /** As displayed. */
  readonly date: string;
  /** Machine-readable twin of `date`, for <time datetime> and sorting. */
  readonly isoDate: string;
  readonly readTime: string;
  readonly image: string;
  /** The article itself. Rendered in order by /insights/[slug]. */
  readonly body: readonly ArticleSection[];
}

/** Filter order on the index. "All" is added by the UI. */
export const INSIGHT_CATEGORIES: readonly InsightCategory[] = [
  'Technology',
  'Industry',
  'Company',
  'Engineering',
];

/**
 * Grouped by category, which is how the file is easiest to edit and review.
 *
 * This is NOT display order — use `INSIGHTS_BY_DATE` for anything the reader
 * sees, or the index would feature whichever post happens to be written first
 * rather than the newest one.
 */
export const INSIGHTS: readonly InsightPost[] = [
  // ---------------------------------------------------------------- Technology
  {
    slug: 'holding-position-without-a-satellite-fix',
    category: 'Technology',
    title: 'Holding Position Without a Satellite Fix',
    excerpt:
      'With a satellite fix, localisation is centimetre-grade. Without one — underground, indoors, under steel — the vehicle has to build and trust its own map.',
    date: 'August 18, 2026',
    isoDate: '2026-08-18',
    readTime: '7 min read',
    image: '/assets/images/gcs_interface.png',
    body: [
      {
        heading: 'Where the fix runs out',
        text:
          'With a satellite fix, localisation is centimetre-grade. Underground, indoors and under steel there is no fix at all, and the vehicle has to fall back on what it can sense for itself.',
      },
      {
        heading: 'Building the map on the move',
        text:
          'Laser, camera and inertial data are fused on the robot. The autonomy layer holds that map and decides the next move from it, rather than waiting on a link to somewhere else.',
      },
      {
        heading: 'Knowing when not to trust it',
        text:
          'A map built without an external reference drifts. Geofencing and obstacle awareness stay active regardless, so a degraded fix costs accuracy rather than safety.',
      },
    ],
  },
  {
    slug: 'detection-runs-on-the-robot',
    category: 'Technology',
    title: 'Detection Runs on the Robot, Not in the Cloud',
    excerpt:
      'Laser, camera and inertial data are fused onboard. Why perception stays on the vehicle when the link back is the least reliable part of the system.',
    date: 'August 4, 2026',
    isoDate: '2026-08-04',
    readTime: '6 min read',
    image: '/assets/images/sofetware.webp',
    body: [
      {
        heading: 'The link is the weakest part',
        text:
          'Radio is the least reliable component in a field deployment. Anything that has to happen before the vehicle can act should not depend on it.',
      },
      {
        heading: 'Fusion happens onboard',
        text:
          'Laser, camera and inertial data are combined on the vehicle, and detection runs there too. The robot does not need to reach a server to understand what is in front of it.',
      },
      {
        heading: 'What that leaves the ground station',
        text:
          'Planning, supervision, and taking control back. The operator sets the mission and watches it run; the vehicle handles the part that cannot wait for a round trip.',
      },
    ],
  },
  {
    slug: 'three-ways-back-to-the-operator',
    category: 'Technology',
    title: 'Three Ways Back to the Operator',
    excerpt:
      'Local WiFi, long-range mesh radio and mobile internet each fail differently. How multi-link telemetry keeps diagnostics and control moving when one drops.',
    date: 'July 21, 2026',
    isoDate: '2026-07-21',
    readTime: '6 min read',
    image: '/assets/images/lab.jpg',
    body: [
      {
        heading: 'Three links, three failure modes',
        text:
          'Secure local WiFi, long-range mesh radio and mobile internet fail under different conditions. Carrying all three means one going down is a degradation rather than an outage.',
      },
      {
        heading: 'Diagnostics as well as control',
        text:
          'The same links carry live diagnostics and video, not just commands. Knowing the state of the machine matters most exactly when the connection is marginal.',
      },
      {
        heading: 'When every link is gone',
        text:
          'Lose them all and the vehicle falls back to a safe state on its own, and holds it until an operator is back in the loop.',
      },
    ],
  },
  {
    slug: 'a-mission-is-an-area-not-a-joystick-input',
    category: 'Technology',
    title: 'A Mission Is an Area, Not a Joystick Input',
    excerpt:
      'Give the vehicle ground to cover rather than a path to follow, and it can replan around what it meets and resume the pass where it left off.',
    date: 'July 7, 2026',
    isoDate: '2026-07-07',
    readTime: '5 min read',
    image: '/assets/images/ugv-platform-field.webp',
    body: [
      {
        heading: 'Give it ground, not a path',
        text:
          'A mission is an area to cover and a set of coordinates to work through, planned against a topographical map overlay, not a stick input held for an hour.',
      },
      {
        heading: 'Replanning without losing the pass',
        text:
          'Meeting an obstacle does not end the mission. The vehicle plans around it and resumes the pass where it left off, so coverage stays complete.',
      },
      {
        heading: 'The operator stays in the loop',
        text:
          'Live tracking shows where the vehicle is against the plan, with a geofence around it and a remote stop within reach.',
      },
    ],
  },
  {
    slug: 'four-layers-one-machine',
    category: 'Technology',
    title: 'Four Layers, One Machine',
    excerpt:
      'Ground station, autonomy, reflex and payload. What each layer is allowed to decide, and why only the last one changes between platforms.',
    date: 'June 23, 2026',
    isoDate: '2026-06-23',
    readTime: '8 min read',
    image: '/assets/images/soft.jpg',
    body: [
      {
        heading: 'Ground station',
        text:
          'Where a person plans the mission, watches it run, and takes it back. Everything an operator does happens at this layer.',
      },
      {
        heading: 'Autonomy and reflex',
        text:
          'Autonomy runs on the robot: it fuses the sensors, holds the map and decides the next move. Beneath it the reflex layer does not think, it reacts, deterministically, thousands of times a second.',
      },
      {
        heading: 'Payload',
        text:
          'The only layer that changes between platforms. The three underneath are the same whether the machine is a 3 kg scout or a 500 kg carrier.',
      },
    ],
  },

  // ------------------------------------------------------------------ Industry
  {
    slug: 'inspection-at-height-without-scaffolding',
    category: 'Industry',
    title: 'Inspection at Height Without the Scaffolding',
    excerpt:
      'ALTIUS holds a 30 kg vertical payload on steel by magnetic grip, with interchangeable tooling. What that changes about surveying a structure nobody wants to climb.',
    date: 'August 11, 2026',
    isoDate: '2026-08-11',
    readTime: '6 min read',
    image: '/assets/images/industry-industrial.webp',
    body: [
      {
        heading: 'What access actually costs',
        text:
          'Reaching the surface is usually more expensive than inspecting it. Scaffolding, permits and downtime dominate the bill before anyone looks at the steel.',
      },
      {
        heading: 'Thirty kilograms, held by magnets',
        text:
          'ALTIUS climbs steel on magnetic grip and carries a 30 kg vertical payload, so the instrument goes to the structure instead of the structure being wrapped in access equipment.',
      },
      {
        heading: 'Tooling that changes with the job',
        text:
          'Interchangeable tooling covers inspection, cleaning at height, and surface painting or sand blasting, with real-time video coming back throughout.',
      },
    ],
  },
  {
    slug: 'steel-salt-and-access-offshore',
    category: 'Industry',
    title: 'Steel, Salt and Access Offshore',
    excerpt:
      'Maritime assets are steel, which suits a magnetic climber, and remote, which does not suit a survey crew. Where the two facts meet.',
    date: 'July 28, 2026',
    isoDate: '2026-07-28',
    readTime: '5 min read',
    image: '/assets/images/industry-maritime.webp',
    body: [
      {
        heading: 'Maritime assets are steel',
        text:
          'Hulls, cranes and terminal structures are ferrous and largely vertical, which is the surface a magnetic climber is built for.',
      },
      {
        heading: 'Getting there is most of the job',
        text:
          'Offshore and dockside assets are hard to reach and expensive to crew. Sending a machine changes what a routine survey costs to schedule.',
      },
      {
        heading: 'Built for washdown',
        text:
          'Enclosures, connectors and drivetrains are specified for dust, water and washdown, so salt exposure is an ordinary shift rather than an exception.',
      },
    ],
  },
  {
    slug: 'critical-asset-mapping-as-a-routine',
    category: 'Industry',
    title: 'Critical Asset Mapping as a Routine, Not an Event',
    excerpt:
      'Infrastructure inspection and asset mapping are listed capabilities on the same platform. What changes when a survey becomes repeatable rather than exceptional.',
    date: 'July 14, 2026',
    isoDate: '2026-07-14',
    readTime: '7 min read',
    image: '/assets/images/industry-infra.webp',
    body: [
      {
        heading: 'Survey as a habit, not an event',
        text:
          'Infrastructure inspection and critical asset mapping are listed capabilities on the same platform. When a survey is repeatable it stops being a project.',
      },
      {
        heading: 'One platform, different payloads',
        text:
          'The payload layer is the only thing that changes between jobs. Mapping, inspection and surveillance run on the same core and the same controls.',
      },
      {
        heading: 'A record that compounds',
        text:
          'Every pass produces a comparable record. The value is less in any single survey than in the series they form over the life of a structure.',
      },
    ],
  },
  {
    slug: 'covering-ground-on-generation-sites',
    category: 'Industry',
    title: 'Covering Ground on Generation Sites',
    excerpt:
      'Power and solar assets are mostly distance. On area-based missions, real-time video feed, and inspection that fits around a plant that stays running.',
    date: 'June 30, 2026',
    isoDate: '2026-06-30',
    readTime: '6 min read',
    image: '/assets/images/industry-power2.webp',
    body: [
      {
        heading: 'Generation sites are mostly distance',
        text:
          'Power and solar assets are spread over ground that a person crosses slowly. Coverage, not complexity, is the constraint.',
      },
      {
        heading: 'Missions measured in area',
        text:
          'Giving the vehicle an area to work through suits an asset like this better than driving it. It replans around what it meets and resumes the pass.',
      },
      {
        heading: 'Working around a plant that stays on',
        text:
          'Real-time telemetry and video mean an inspection can be watched as it happens, and a geofence keeps the vehicle clear of what must not be approached.',
      },
    ],
  },
  {
    slug: 'carrying-the-load-off-the-soldier',
    category: 'Industry',
    title: 'Carrying the Load Off the Soldier',
    excerpt:
      'Defence logistics, supply transport and ammunition carriage are what SAIBYA is built for. The case for moving mass by machine in contested ground.',
    date: 'June 16, 2026',
    isoDate: '2026-06-16',
    readTime: '6 min read',
    image: '/assets/images/defence.webp',
    body: [
      {
        heading: 'Two hundred kilograms',
        text:
          'SAIBYA carries 200 kg on a 4x4 high-traction drivetrain, which is the difference between a patrol carrying its own supply and a machine carrying it for them.',
      },
      {
        heading: 'Terrain that has no road',
        text:
          'Stair-climbing and all-terrain mobility mean the route does not have to be prepared, and the platform stays usable in confined ground.',
      },
      {
        heading: 'Remote, semi-autonomous or autonomous',
        text:
          'The same platform runs under direct control, with assistance, or on its own, chosen to match how much attention the crew can spare.',
      },
    ],
  },

  // ------------------------------------------------------------------- Company
  {
    slug: 'a-year-of-recognition',
    category: 'Company',
    title: 'A Year of Recognition',
    excerpt:
      'Startup Maharathi at Startup Mahakumbh, Robotics Startup of the Year at the World STEM & Robotics Olympiad, and Pride of Gujarat in the defence category.',
    date: 'August 25, 2026',
    isoDate: '2026-08-25',
    readTime: '4 min read',
    image: '/assets/images/vision.jpg',
    body: [
      {
        heading: 'Startup Mahakumbh',
        text:
          'Startup Maharathi in the B2B category at Startup Mahakumbh 2025, held at Bharat Mandapam in New Delhi.',
      },
      {
        heading: 'Robotics Startup of the Year',
        text:
          'Named Robotics Startup of the Year at the Startup Awards run by the World STEM and Robotics Olympiad, alongside a Startup Demo Day showing at KPGU Vadodara on National Startup Day.',
      },
      {
        heading: 'Pride of Gujarat',
        text:
          'Recognised in the defence category at Vibrant Gujarat 2026 in Rajkot, with coverage from Gujarat First News and City Bhaskar.',
      },
    ],
  },
  {
    slug: 'why-we-build-under-one-roof',
    category: 'Company',
    title: 'Why We Build Under One Roof',
    excerpt:
      'Chassis, electronics, firmware and ground control are designed in the same building — so a change to the machine is not a change to four suppliers.',
    date: 'August 8, 2026',
    isoDate: '2026-08-08',
    readTime: '5 min read',
    image: '/assets/images/designassmbly.jpg',
    body: [
      {
        heading: 'Four disciplines, one building',
        text:
          'Chassis, electronics, firmware and ground control are designed in the same place, by people who can walk to each other and look at the same machine.',
      },
      {
        heading: 'A change is one change',
        text:
          'When the four are in-house, altering the machine is one decision. Split across suppliers it becomes four negotiations and a schedule.',
      },
      {
        heading: 'What it costs',
        text:
          'Doing everything internally is slower to set up and harder to staff. It is worth it where the platform has to be changed often and quickly.',
      },
    ],
  },
  {
    slug: 'four-platforms-one-core',
    category: 'Company',
    title: 'Four Platforms, One Core',
    excerpt:
      'From a 3 kg tactical scout to a 500 kg carrier, the same core runs underneath — so a crew trained on one robot can keep the whole fleet moving.',
    date: 'July 25, 2026',
    isoDate: '2026-07-25',
    readTime: '5 min read',
    image: '/assets/images/facility-prototyping.png',
    body: [
      {
        heading: 'Three kilograms to five hundred',
        text:
          'NEXUS at 3 kg scouts ahead, SAIBYA carries 200 kg, ATM carries 500 kg, and ALTIUS works vertically on steel. Four platforms covering very different jobs.',
      },
      {
        heading: 'The core does not change',
        text:
          'Ground station, autonomy and reflex are shared. Only the payload layer differs, which is what keeps four machines from becoming four products to maintain.',
      },
      {
        heading: 'Training that carries across',
        text:
          'A crew trained on one robot can keep the whole fleet moving, and attachments come off with standard tooling rather than a service visit.',
      },
    ],
  },
  {
    slug: 'designed-and-built-in-india',
    category: 'Company',
    title: 'Designed and Built in India',
    excerpt:
      'Four platforms, four IPs filed and a peer-reviewed publication, engineered in-house from Ahmedabad. What indigenous development looks like in practice.',
    date: 'July 11, 2026',
    isoDate: '2026-07-11',
    readTime: '5 min read',
    image: '/assets/images/designassmbly1.jpg',
    body: [
      {
        heading: 'The record so far',
        text:
          'Four robotic platforms, four IPs filed, and a peer-reviewed publication on autonomous ground mobility, developed from Ahmedabad.',
      },
      {
        heading: 'In-house by default',
        text:
          'Design, electronics, firmware and control are built internally rather than assembled from imported subsystems, which is what makes the platforms adaptable.',
      },
      {
        heading: 'Built for where it works',
        text:
          'Dust, heat and long service intervals are design inputs from the start, not conditions the machine is later certified against.',
      },
    ],
  },
  {
    slug: 'what-we-look-for-in-engineers',
    category: 'Company',
    title: 'What We Look For in Engineers',
    excerpt:
      'Field robotics rewards people who like being wrong quickly, in the workshop, next to the machine. How the team is built and what we screen for.',
    date: 'June 27, 2026',
    isoDate: '2026-06-27',
    readTime: '6 min read',
    image: '/assets/images/proto.jpg',
    body: [
      {
        heading: 'Field robotics is unforgiving',
        text:
          'A machine that works on the bench and fails in the mud has not worked. The discipline rewards people who find that out early and cheaply.',
      },
      {
        heading: 'Close to the machine',
        text:
          'The workshop sits next to the desks on purpose. Engineers here are expected to build, break and rebuild what they design.',
      },
      {
        heading: 'Across the stack',
        text:
          'Because everything is developed in-house, the useful engineer is the one who can follow a problem from the chassis into the firmware and out to the ground station.',
      },
    ],
  },

  // --------------------------------------------------------------- Engineering
  {
    slug: 'from-200-kg-to-500-kg',
    category: 'Engineering',
    title: 'From 200 kg to 500 kg',
    excerpt:
      'SAIBYA carries 200 kg on a 4×4 drivetrain; ATM carries 500 kg on front and rear suspension. What changes structurally when the payload more than doubles.',
    date: 'August 21, 2026',
    isoDate: '2026-08-21',
    readTime: '8 min read',
    image: '/assets/images/saibya-field.webp',
    body: [
      {
        heading: 'Two carriers, one job',
        text:
          'SAIBYA carries 200 kg on a 4x4 high-traction drivetrain. ATM carries 500 kg. The task is the same; almost nothing structural is.',
      },
      {
        heading: 'Suspension changes the problem',
        text:
          'ATM runs front and rear suspension for load stability, because at that mass the load moving is a bigger risk than the ground being rough.',
      },
      {
        heading: 'Modularity at both ends',
        text:
          'Both take modular attachments and both stream real-time telemetry and video, so the job of the operator does not change with the size of the machine.',
      },
    ],
  },
  {
    slug: 'holding-a-machine-to-a-steel-wall',
    category: 'Engineering',
    title: 'Holding a Machine to a Steel Wall',
    excerpt:
      'Magnetic grip has to carry the robot, its tooling and a 30 kg payload — and stay predictable across welds, coatings and the edge of the plate.',
    date: 'August 1, 2026',
    isoDate: '2026-08-01',
    readTime: '7 min read',
    image: '/assets/images/product-altius.png',
    body: [
      {
        heading: 'The load path',
        text:
          'Magnetic grip has to carry the robot, its tooling and a 30 kg vertical payload, with margin, while the machine is moving rather than parked.',
      },
      {
        heading: 'Welds, coatings and edges',
        text:
          'Adhesion is not uniform across a real structure. Paint thickness, weld beads and the edge of a plate all change what the magnets are holding.',
      },
      {
        heading: 'Tooling adds its own load',
        text:
          'Interchangeable tooling means the payload is not a fixed mass or a fixed shape, so the grip budget is set by the worst case rather than the typical one.',
      },
    ],
  },
  {
    slug: 'three-kilograms-that-drives-upside-down',
    category: 'Engineering',
    title: 'Three Kilograms That Drives Upside Down',
    excerpt:
      'NEXUS is fully invertible, so there is no wrong way to land it. Designing a scout where rapid deployment beats every other consideration.',
    date: 'July 18, 2026',
    isoDate: '2026-07-18',
    readTime: '6 min read',
    image: '/assets/images/product-nexus.png',
    body: [
      {
        heading: 'No wrong way to land',
        text:
          'NEXUS is fully invertible and drives upside down, so a throw into a room or over a wall does not need to end the right way up.',
      },
      {
        heading: 'Rapid deployment',
        text:
          'At 3 kg it is carried rather than transported, which is what makes it useful for urban reconnaissance, indoor inspection and scouting high-risk ground.',
      },
      {
        heading: 'Encrypted control',
        text:
          'Tactical control is encrypted and the onboard camera streams live, so what the scout sees reaches the operator and nobody else.',
      },
    ],
  },
  {
    slug: 'the-state-it-falls-back-to',
    category: 'Engineering',
    title: 'The State It Falls Back To',
    excerpt:
      'Lose the link, the satellite fix or a sensor, and the vehicle holds a safe state on its own while the layers above sort themselves out.',
    date: 'July 4, 2026',
    isoDate: '2026-07-04',
    readTime: '7 min read',
    image: '/assets/images/saibya7.jpg',
    body: [
      {
        heading: 'Three things it can lose',
        text:
          'The link, the satellite fix, or a sensor. Each degrades the vehicle differently, and none of them should end with it still moving on a stale plan.',
      },
      {
        heading: 'The reflex layer holds',
        text:
          'The vehicle falls back to a safe state on its own. The reflex layer keeps it there, deterministically, without waiting on the layers above to agree.',
      },
      {
        heading: 'Recovering deliberately',
        text:
          'Coming back from a safe state is an operator decision at the ground station, not something the machine does quietly the moment a link flickers.',
      },
    ],
  },
  {
    slug: 'specified-for-dust-water-and-washdown',
    category: 'Engineering',
    title: 'Specified for Dust, Water and Washdown',
    excerpt:
      'Enclosures, connectors and drivetrains chosen so a shift in the mud, the rain or the dark is an ordinary day rather than an exception.',
    date: 'June 20, 2026',
    isoDate: '2026-06-20',
    readTime: '6 min read',
    image: '/assets/images/prototyping.jpg',
    body: [
      {
        heading: 'Ordinary conditions',
        text:
          'A shift in the mud, the rain or the dark should be an ordinary day. That is a specification decision made early, not a rating applied at the end.',
      },
      {
        heading: 'Enclosures and connectors',
        text:
          'Enclosures, connectors and drivetrains are chosen for ingress and for washdown, because the machine will be cleaned as roughly as it was used.',
      },
      {
        heading: 'Service without special tools',
        text:
          'Attachments come off with standard tooling, so maintenance happens where the machine works rather than where the manufacturer is.',
      },
    ],
  },
];

/**
 * Display order: newest first.
 *
 * Derived rather than hand-maintained, so the index's featured slot and the
 * article pager cannot disagree about which post is newest or what "next"
 * means. Sorting on the ISO field keeps it a string comparison.
 */
export const INSIGHTS_BY_DATE: readonly InsightPost[] = [...INSIGHTS].sort((a, b) =>
  b.isoDate.localeCompare(a.isoDate),
);
