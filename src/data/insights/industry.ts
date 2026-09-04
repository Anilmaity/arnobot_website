import type { InsightDraft } from './types';

/**
 * Industry — what the platforms change on the ground they are sold into:
 * industrial structures, maritime steel, critical infrastructure, generation
 * sites and defence logistics. Sector framing follows `industries.ts`.
 */
export const INDUSTRY: readonly InsightDraft[] = [
  {
    slug: 'inspection-at-height-without-scaffolding',
    category: 'Industry',
    title: 'Inspection at Height Without the Scaffolding',
    excerpt:
      'ALTIUS holds a 30\u00A0kg vertical payload on steel by magnetic grip, with interchangeable tooling. What that changes about surveying a structure nobody wants to climb.',
    date: 'August 11, 2026',
    isoDate: '2026-08-11',
    image: '/assets/images/article-inspection-at-height.webp',
    body: [
      {
        heading: 'What access actually costs',
        paragraphs: [
          'Reaching the surface is usually more expensive than inspecting it. On a steel mill, a smelting plant, a paper mill or a chemical warehouse, the instrument that reads the wall is a small part of the bill. The scaffolding, the permit to erect it, the hours the plant is down while it goes up and the people standing on it in a hot, hazardous, noisy space are the rest.',
          'That is why inspection at height is done less often than anyone thinks it should be. The structure does not get worse because it is surveyed rarely; it gets surveyed rarely because the survey is an event.',
        ],
      },
      {
        heading: 'Thirty kilograms, held by magnets',
        paragraphs: [
          'ALTIUS is a vertical climbing robot built for the hard-to-reach ferromagnetic surfaces those plants are made of. It holds itself to steel by magnetic grip and carries a 30\u00A0kg vertical payload, so the instrument goes to the structure instead of the structure being wrapped in access equipment before anyone can look at it.',
          'The robot is a rugged industrial build, specified for the same dust, water and washdown as the rest of the range. Real-time video comes back to the operator throughout, so what the climber sees on the wall is seen on the ground as it happens rather than after the descent.',
        ],
      },
      {
        heading: 'Tooling that changes with the job',
        paragraphs: [
          'A climber that only inspects would still be worth sending up, but the same platform carries interchangeable tooling. The listed applications run from infrastructure inspection and critical asset mapping to industrial cleaning at height and surface painting or sand blasting — different jobs on the same wall, which usually means the same scaffold would have gone up more than once.',
          'Changing the tool rather than the machine is the point. The crew learns one robot and one ground station; what changes between a survey and a coat of paint is the attachment on the front.',
        ],
      },
      {
        heading: 'Where people should not have to go',
        paragraphs: [
          'None of this removes people from the job. It moves them from the wall to the ground station, where the video is, and it changes what they are exposed to. A person on a scaffold inside a hot plant is doing two hard things at once: staying safe at height and paying attention to the steel. Splitting those lets the attention go where it is needed.',
          'It also changes who can do the work. A survey that needed a rope-access team becomes one that needs an operator, and an operator can be trained on the platform far faster than a climber can be qualified.',
        ],
      },
      {
        heading: 'From an event to a routine',
        paragraphs: [
          'Once access stops dominating the cost, the sensible interval changes. A survey that can be run without a scaffold can be run more often, in the same way each time, and the passes start to add up to a record of how the structure is changing rather than a snapshot of how it was.',
          'That series is worth more than any one survey in it, and it is only possible when the survey is cheap enough to repeat. Taking the scaffolding out of the equation is what makes it cheap enough.',
        ],
      },
    ],
    summary: [
      'On industrial structures, getting to the surface costs more than inspecting it, which is why it happens so rarely.',
      'ALTIUS climbs steel by magnetic grip with a 30\u00A0kg vertical payload and sends real-time video down as it goes.',
      'Interchangeable tooling covers inspection, cleaning at height, and painting or sand blasting on the same platform.',
      'Without the scaffold, a survey becomes cheap enough to repeat, and repeated surveys become a record.',
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
    image: '/assets/images/article-maritime-steel.webp',
    body: [
      {
        heading: 'Maritime assets are steel',
        paragraphs: [
          'Hulls, cranes, harbour gates and terminal structures are ferrous and largely vertical, which is exactly the surface a magnetic climber is built for. ALTIUS holds itself to steel by magnetic grip and carries a 30\u00A0kg vertical payload, so the same platform that surveys a plant wall can work a hull side or a crane leg without the surface being prepared for it.',
          'That is a happy accident of the sector rather than a design target, but it is a large one. Most of what a port or a fleet owns is a magnetic surface that somebody is paid to look at.',
        ],
      },
      {
        heading: 'Getting there is most of the job',
        paragraphs: [
          'The other fact about maritime assets is that they are hard to reach. An offshore structure needs a boat and a weather window; a dockside asset needs a crew and a slot in the terminal’s day. Sending people to look at steel is expensive not because looking is hard but because arriving is.',
          'A machine changes what a routine survey costs to schedule. It travels as cargo, it does not need a rope-access qualification, and it can be put on the structure by an operator rather than a team. Real-time video means the person who needs to see the surface can be on the quay, or further away than that.',
        ],
      },
      {
        heading: 'Hull walls and biofouling',
        paragraphs: [
          'Extreme saltwater environments call for high-grade rugged crawlers, and the jobs are the ones the sector has always had: inspecting hull walls, cleaning biofouling, monitoring harbour gates. ALTIUS carries interchangeable tooling, so inspection and cleaning at height are two attachments on one platform rather than two visits by two contractors.',
          'The listed capabilities on the vertical climber — inspection, cleaning, surface painting and sand blasting, surveillance, critical asset mapping — map onto a vessel’s maintenance cycle almost one to one.',
        ],
      },
      {
        heading: 'Built for washdown',
        paragraphs: [
          'Salt is corrosive, wet and everywhere, and a machine that is precious about it will not last a season. Enclosures, connectors and drivetrains across the range are specified for dust, water and washdown from the start, so salt exposure is an ordinary shift rather than an exception the crew has to work around.',
          'The practical consequence is that the robot is cleaned the way the rest of the equipment on a quay is cleaned — with a hose — and goes back in the case.',
        ],
      },
      {
        heading: 'Where the two facts meet',
        paragraphs: [
          'Put the two facts together and the maritime case for a climbing robot writes itself. The asset is a magnetic surface, so the machine can hold on to it. The asset is remote, so the machine is cheaper to send than a crew. Everything else — the tooling, the video link, the washdown-rated build — is what makes the first two facts usable.',
          'It is the same platform, the same ground station and the same core that runs on the ground vehicles. What is different offshore is only the wall.',
        ],
      },
    ],
    summary: [
      'Hulls, cranes and terminal structures are ferrous and vertical: the surface a magnetic climber is built for.',
      'Reaching an offshore or dockside asset costs more than looking at it, which is what a machine changes.',
      'One platform with interchangeable tooling covers hull inspection and biofouling cleaning.',
      'Enclosures, connectors and drivetrains are specified for washdown, so salt is a normal shift.',
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
    image: '/assets/images/article-asset-mapping.webp',
    body: [
      {
        heading: 'Survey as a habit, not an event',
        paragraphs: [
          'Railways, deep tunnels, dams and remote cellular towers need continuous structural monitoring, and almost none of them get it. They get an inspection when one is due, planned as a project, staffed as a project, and filed as a project. The structure changes every day in between.',
          'Infrastructure inspection and critical asset mapping are listed capabilities on the same platform, and the reason to put them together is that a map is only really useful when there is a previous one to compare it with. When a survey is repeatable it stops being a project.',
        ],
      },
      {
        heading: 'Long corridors and vertical walls',
        paragraphs: [
          'Infrastructure has two shapes. There is the long corridor — a tunnel, a track, a pipeline easement — that a ground vehicle covers by driving, and there is the vertical wall — a dam face, a tower, a bridge member — that a climber covers by holding on. The range has a platform for each, and both run the same core and the same ground station.',
          'ATM carries a heavy suspension chassis with 3D LiDAR for spatial mapping and works without a satellite fix, which is what a tunnel demands. ALTIUS takes the wall. The record they produce comes back to the same desk.',
        ],
      },
      {
        heading: 'One platform, different payloads',
        paragraphs: [
          'The payload layer is the only thing that changes between jobs. Mapping, inspection and surveillance run on the same core with the same controls, and attachments come off with standard tooling rather than a service visit. A crew trained on one robot keeps the whole fleet moving.',
          'That matters more for infrastructure than for almost any other sector, because the assets are spread thin across a region and the people who look after them are spread thinner. A platform the local crew can run beats a specialist team that has to be booked.',
        ],
      },
      {
        heading: 'A record that compounds',
        paragraphs: [
          'Every pass comes back as data — the map, the route the vehicle actually drove, what it saw and when — and is reviewed at a desk, long after the robot has left the site. Do that once and you have a survey. Do it on a schedule, the same way each time, and you have a series in which the interesting thing is the difference between passes.',
          'The value is less in any single survey than in what the surveys form over the life of the structure. That is only possible when each one is cheap and routine enough to keep doing.',
        ],
      },
      {
        heading: 'Without downtime',
        paragraphs: [
          'The reason routine mapping has not happened before is that the asset had to stop for it. A machine that can scale a corridor or a wall while the railway keeps running, the dam keeps holding and the tower keeps transmitting removes the last argument for waiting until something is due.',
          'Monitoring becomes something the asset has, rather than something that is done to it.',
        ],
      },
    ],
    summary: [
      'Railways, tunnels, dams and towers need continuous monitoring and mostly get periodic projects instead.',
      'A ground vehicle takes the long corridor and a climber takes the vertical wall, on the same core and the same ground station.',
      'Only the payload changes between mapping, inspection and surveillance, so a local crew can run every job.',
      'Repeated passes form a record whose value is in the difference between them, and they can run without downtime.',
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
    image: '/assets/images/article-generation-sites.webp',
    body: [
      {
        heading: 'Generation sites are mostly distance',
        paragraphs: [
          'A switchyard, a transformer compound or a solar field is not complicated ground. It is a great deal of ground, laid out in rows, that a person crosses slowly and with care. Coverage, not complexity, is the constraint — and coverage is what a ground vehicle is good at.',
          'The exposure is the other half of the story. High-voltage switchyards, transformers and nuclear facilities put people at real risk during routine work, and the routine work is exactly the part a machine can take.',
        ],
      },
      {
        heading: 'Missions measured in area',
        paragraphs: [
          'On our platform a mission is an area to cover and a set of coordinates to work through, planned against a topographical map overlay at the ground station. That suits a generation site better than driving the vehicle ever could: the operator marks the rows, the vehicle works through them, replans around what it meets, and resumes the pass where it left off.',
          'Run the same area on a schedule and the passes become comparable. What changed since last week is what the operator looks at; what stayed the same is what the data confirms.',
        ],
      },
      {
        heading: 'Working around a plant that stays on',
        paragraphs: [
          'Nobody switches off a power station for an inspection. Real-time telemetry and a video feed mean a pass can be watched as it happens from outside the fence, and a geofence keeps the vehicle clear of what must not be approached. Obstacle detection runs on the robot, and a remote emergency stop is within the operator’s reach for the whole mission.',
          'For a site that is live, that combination is what makes routine coverage acceptable. The plant carries on; the survey fits around it.',
        ],
      },
      {
        heading: 'The right size of machine',
        paragraphs: [
          'Generation sites are where the heavier platforms earn their weight. ATM carries 500\u00A0kg on front and rear suspension for load stability, streams real-time telemetry and video, and takes modular attachments — and its listed applications include the unglamorous work a site actually needs, from towing and industrial site operations to grass cutting between the rows.',
          'SAIBYA takes the same core into a 200\u00A0kg carrier with a 4×4 high-traction drive and stair-climbing, all-terrain mobility. Between them, the sensor package a routine inspection needs is well within what either can carry.',
        ],
      },
      {
        heading: 'Solar: dust and water',
        paragraphs: [
          'A solar farm adds one more distance problem. Dust buildup reduces output significantly, cleaning uses water where there is little of it, and the array is long. Platforms customised with panel track guidance and waterless brush arrays are the sector-specific answer, and they run on the same ground station and the same area-based missions as everything else.',
          'The pattern across power and solar is the same: a lot of ground, a plant that stays running, and a job that improves the more routinely it is done.',
        ],
      },
    ],
    summary: [
      'Switchyards, transformer compounds and solar fields are simple ground in large quantity; coverage is the constraint.',
      'Area-based missions let the operator mark the rows and the vehicle work through them, replanning and resuming.',
      'Real-time telemetry, video, a geofence and a remote stop make routine coverage of a live plant acceptable.',
      'ATM and SAIBYA carry the sensor package with margin; solar adds waterless cleaning on the same platform.',
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
    image: '/assets/images/article-defence-logistics.webp',
    body: [
      {
        heading: 'Two hundred kilograms',
        paragraphs: [
          'SAIBYA carries 200\u00A0kg on a 4×4 high-traction drivetrain. That figure is the difference between a patrol carrying its own supply and a machine carrying it for them, and it is where the platform starts: a rugged, high-payload unmanned ground vehicle for defence logistics, supply transport and ammunition carriage.',
          'The weight is not the only point. Mass that moves by machine is mass that is not on a person’s back, and a person who is not carrying it is a person who can pay attention to the ground.',
        ],
      },
      {
        heading: 'Terrain that has no road',
        paragraphs: [
          'A supply route in contested ground is not a road. Stair-climbing and all-terrain mobility mean the route does not have to be prepared before the vehicle can use it, and the platform stays usable in confined ground where a wheeled truck would have to stop and a person would have to carry.',
          'The drivetrain is what makes that possible, and it is one of the parts of the platform developed and protected in-house, along with the climbing work on ALTIUS.',
        ],
      },
      {
        heading: 'Remote, semi-autonomous or autonomous',
        paragraphs: [
          'The same platform runs under direct remote control, with assistance, or fully autonomously, chosen to match how much attention the crew can spare. A vehicle that can be driven when the situation calls for a hand on the stick and left to cover ground when it does not is more useful than one that insists on either.',
          'The control chain underneath does not change with the mode. The reflex layer holds the machine to a safe state if the link, the fix or a sensor goes, and the emergency stop is wired to it rather than to the autonomy computer.',
        ],
      },
      {
        heading: 'Scouting ahead',
        paragraphs: [
          'Logistics is one half of the defence picture; the other is knowing what is ahead before committing a person to it. NEXUS is the 3\u00A0kg scout: fully invertible, so there is no wrong way to throw it into a room or over a wall, with an onboard camera streaming live and encrypted remote tactical control. Scouting, route monitoring and remote tactical supply delivery are the jobs the two platforms split between them.',
          'Both run the same core and the same ground station, so the operator who plans a supply run is the operator who watches the scout.',
        ],
      },
      {
        heading: 'Beyond the supply run',
        paragraphs: [
          'The listed applications for SAIBYA run past logistics — towing and surveillance, industrial material handling, disaster response — because a carrier with modular attachments and a 4×4 drive is a general-purpose machine that happens to have been specified for the hardest case. Attachments come off with standard tooling, so the same vehicle changes job in the field.',
          'The platform is designed, built and proven in India, from Ahmedabad, on ground like the ground it is meant for.',
        ],
      },
    ],
    summary: [
      'SAIBYA carries 200\u00A0kg on a 4×4 high-traction drive, which is mass that is no longer on a person’s back.',
      'Stair-climbing and all-terrain mobility mean the route does not have to be prepared first.',
      'Remote, semi-autonomous and fully autonomous control on one platform, with the safety chain unchanged by the mode.',
      'NEXUS scouts ahead at 3\u00A0kg on the same core and the same ground station.',
    ],
  },
];
