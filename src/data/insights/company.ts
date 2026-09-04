import type { InsightDraft } from './types';

/**
 * Company — the record, the way the team works, and the awards. Facts follow
 * the company page, the careers principles and `recognition.ts`.
 */
export const COMPANY: readonly InsightDraft[] = [
  {
    slug: 'a-year-of-recognition',
    category: 'Company',
    title: 'A Year of Recognition',
    excerpt:
      'Startup Maharathi at Startup Mahakumbh, Robotics Startup of the Year at the World STEM & Robotics Olympiad, and Pride of Gujarat in the defence category.',
    date: 'August 25, 2026',
    isoDate: '2026-08-25',
    image: '/assets/images/vision.jpg',
    body: [
      {
        heading: 'Why we keep a register',
        paragraphs: [
          'A small robotics company is judged on what it has built, and for most of its life that is a workshop full of prototypes that only the team has seen. External recognition is the first time anyone outside the building says what we do is real. So we keep a register of it — the awards, the stages and the press — and this is the year in it.',
          'Everything below sits on the home page under the words “Trusted by leading companies”. Defence and industrial buyers read that as a claim the company stands behind, and it is treated as published copy rather than decoration.',
        ],
      },
      {
        heading: 'Startup Mahakumbh',
        paragraphs: [
          'ARNOBOT was named Startup Maharathi in the B2B category at Startup Mahakumbh 2025, held at Bharat Mandapam in New Delhi. It is the largest gathering of the country’s startup ecosystem, and a B2B award there is judged on whether there is a business behind the demonstration.',
          'For a company whose customers are plants, ports and defence formations rather than consumers, that distinction was the one that mattered.',
        ],
      },
      {
        heading: 'Robotics Startup of the Year',
        paragraphs: [
          'The World STEM & Robotics Olympiad named ARNOBOT Robotics Startup of the Year 2025 at its Startup Awards. Alongside it, the platforms were shown at Startup Demo Day 2025 at KPGU Vadodara, held on National Startup Day, and the founder gave a Distinguished Lecture on startups and the ecosystem at Karnavati University.',
          'Awards from a robotics body and a stage in front of engineering students are different kinds of recognition, and we value both: one says the machines stand up, the other says the story of building them is worth telling.',
        ],
      },
      {
        heading: 'Pride of Gujarat',
        paragraphs: [
          'At Vibrant Gujarat 2026 in Rajkot, ARNOBOT was recognised as Pride of Gujarat in the defence category. The company is designed, built and headquartered in Ahmedabad, and the platforms are proven on ground in the state before they go anywhere else, so recognition from home carries its own weight.',
          'The award was covered by Gujarat First News and by City Bhaskar, the two outlets that have followed the company most closely.',
        ],
      },
      {
        heading: 'What it is for',
        paragraphs: [
          'None of this changes what the machines do. It changes who is willing to find out. A first meeting with a plant or a formation goes differently when the company has a record that somebody else has checked, and the register above is that record.',
          'The four platforms, the four IPs filed and the peer-reviewed publication are what we would rather be judged on. The awards are how a stranger learns those exist.',
        ],
      },
    ],
    summary: [
      'Startup Maharathi, B2B category, at Startup Mahakumbh 2025, Bharat Mandapam, New Delhi.',
      'Robotics Startup of the Year 2025 from the World STEM & Robotics Olympiad, with Demo Day at KPGU Vadodara and a lecture at Karnavati University.',
      'Pride of Gujarat, defence category, at Vibrant Gujarat 2026 in Rajkot, covered by Gujarat First News and City Bhaskar.',
      'The register is published copy: it tells a stranger the platforms, the IPs and the publication exist.',
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
    image: '/assets/images/designassmbly.webp',
    body: [
      {
        heading: 'Four disciplines, one building',
        paragraphs: [
          'Chassis, electronics, firmware and ground control are designed in the same place, by people who can walk to each other and look at the same machine. The workshop sits next to the desks on purpose. When the drivetrain engineer wants to know why the motor controller is behaving oddly on a slope, the person who wrote the controller is a few metres away and the slope is outside.',
          'This is not the usual way to build a robot. The usual way is to buy a chassis, buy a compute module, buy a radio, write the glue, and ship. It is faster to start and slower to change, and field robotics is a discipline where you change things constantly.',
        ],
      },
      {
        heading: 'A change is one change',
        paragraphs: [
          'When the four disciplines are in-house, altering the machine is one decision. Split across suppliers, the same alteration becomes four negotiations, four lead times and a schedule that belongs to nobody. A connector that needs to move because the enclosure is being resealed for washdown touches the mechanical drawing, the harness, the firmware pin map and the diagnostic screen at the ground station — and in one building that is an afternoon.',
          'The principle on the careers page is “own the whole loop”: sensor to enclosure to autonomy stack to the report the customer actually reads, with no hand-offs at the boundary and no layer that belongs to somebody else. Building under one roof is what makes the principle physically possible.',
        ],
      },
      {
        heading: 'Where the ideas come from',
        paragraphs: [
          'We did not start in a lab. We started on the ground our machines are meant to protect — on plant floors, at height, and on the steel our robots now climb — and that is still where every platform is proven before it ships. There is a site visit before the design review, and whoever writes the control loop has stood on the ground it will drive over.',
          'Site visits generate changes. A specification argues with other specifications; a site does not. Having every discipline in the room when the crew comes back is how those changes get made instead of filed.',
        ],
      },
      {
        heading: 'What it protects',
        paragraphs: [
          'The parts of the machine that are hardest to buy are the parts we are most careful to own. Four IPs have been filed protecting the drivetrain and the climbing work developed in-house, and a peer-reviewed publication on autonomous ground mobility came out of the same building. Those are not things a company assembling subsystems ends up with.',
          'It is also what makes the platforms adaptable. For a new environment we change the body, not the intelligence, and that is only a cheap sentence when the body is ours to change.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'Doing everything internally is slower to set up and harder to staff. It needs mechanical, electrical, firmware and software engineers who are willing to work across each other’s boundaries, and it needs a workshop that can build, break and rebuild rather than just assemble. That is a real cost and we pay it knowingly.',
          'It is worth it where the platform has to be changed often and quickly, and a machine that is proven on plant floors, at height and on steel before it ships is a machine that gets changed often and quickly.',
        ],
      },
    ],
    summary: [
      'Chassis, electronics, firmware and ground control are designed in one building, next to the workshop.',
      'A change to the machine is one decision rather than four supplier negotiations and a schedule.',
      'Site visits come before design reviews, and every platform is proven on the ground before it ships.',
      'Owning the whole loop is what the four IPs and the publication came out of, and it costs real staffing effort.',
    ],
  },
  {
    slug: 'four-platforms-one-core',
    category: 'Company',
    title: 'Four Platforms, One Core',
    excerpt:
      'From a 3\u00A0kg tactical scout to a 500\u00A0kg carrier, the same core runs underneath — so a crew trained on one robot can keep the whole fleet moving.',
    date: 'July 25, 2026',
    isoDate: '2026-07-25',
    image: '/assets/images/article-one-core.webp',
    body: [
      {
        heading: 'Three kilograms to five hundred',
        paragraphs: [
          'NEXUS is a 3\u00A0kg tactical robot that scouts ahead and drives upside down. SAIBYA is a 200\u00A0kg carrier on a 4×4 high-traction drive. ATM carries 500\u00A0kg on front and rear suspension. ALTIUS works vertically, holding a 30\u00A0kg payload to steel by magnetic grip. Four platforms, four very different jobs, and a weight range of better than a hundred to one.',
          'Looked at from the outside they are four products. Looked at from the ground station they are one.',
        ],
      },
      {
        heading: 'The core does not change',
        paragraphs: [
          'Under every platform the same four-layer core runs: the ground station where a person plans and supervises, the autonomy engine on the robot that fuses the sensors and decides the next move, the real-time control layer that reacts deterministically thousands of times a second, and the hardware. Only the hardware layer differs between machines.',
          'That is what keeps four machines from becoming four products to maintain. A fix to localisation lands on the scout and the carrier at once. An improvement to the mission planner reaches the climber the same day it reaches the ground vehicles.',
        ],
      },
      {
        heading: 'Training that carries across',
        paragraphs: [
          'The consequence a customer feels first is training. A crew trained on one robot can keep the whole fleet moving, because the ground station, the mission model, the geofence, the emergency stop and the diagnostics are the same whatever body is on the other end of the link. Learning ATM after SAIBYA is learning what a heavier vehicle does differently, not learning a new system.',
          'On a site with thin staffing that is the difference between a fleet that gets used and a fleet that waits for the one person who knows it.',
        ],
      },
      {
        heading: 'Serviceable where it works',
        paragraphs: [
          'The same thinking runs through the hardware. Attachments come off with standard tooling rather than a service visit, so a vehicle changes job in the field: inspection to towing, mapping to surveillance, cleaning to painting. Enclosures, connectors and drivetrains are specified for dust, water and washdown on every platform, so the maintenance routine is one routine.',
          'A crew that can keep one robot running can keep all of them running, and the spares and the habits carry across.',
        ],
      },
      {
        heading: 'Why it was built this way',
        paragraphs: [
          'A company of our size cannot afford four control stacks, four ground stations and four sets of field procedures, and no customer wants to learn them. Building one core and four bodies was the only way to cover the range from urban reconnaissance to heavy transport to vertical inspection without the whole thing collapsing under its own weight.',
          'It also happens to be the right way. For a new environment we change the body, not the intelligence — and the fifth platform, whatever it is, will run the same core on the first day.',
        ],
      },
    ],
    summary: [
      'NEXUS at 3\u00A0kg, SAIBYA at 200\u00A0kg, ATM at 500\u00A0kg and ALTIUS on the wall: four bodies with one four-layer core underneath.',
      'Only the hardware layer changes, so a fix or an improvement reaches every platform at once.',
      'A crew trained on one robot runs the fleet: the same ground station, mission model, geofence and stop.',
      'Attachments come off with standard tooling and every platform shares one maintenance routine.',
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
    image: '/assets/images/article-built-in-india.webp',
    body: [
      {
        heading: 'The record so far',
        paragraphs: [
          'Four robotic platforms — SAIBYA, ATM, NEXUS and ALTIUS, from a 3\u00A0kg tactical scout to a 500\u00A0kg carrier. Four IPs filed, protecting the drivetrain and the climbing work developed in-house. One peer-reviewed publication on autonomous ground mobility. All of it developed from Ahmedabad, by an emerging Indian robotics company building unmanned ground vehicles for defence, industrial, maritime and critical infrastructure work.',
          '“Made in India” is one of the five values on the company page. This is what it means in practice rather than on a banner.',
        ],
      },
      {
        heading: 'In-house by default',
        paragraphs: [
          'Design, electronics, firmware and control are built internally rather than assembled from imported subsystems. That is slower to start, and it is the reason the platforms can be adapted at all: a machine built from other people’s modules can only be changed within the limits those modules allow, and the limits are never where the site needs them to be.',
          'It is also why the intellectual property exists. A drivetrain that can be filed is a drivetrain that was designed here, not bought here.',
        ],
      },
      {
        heading: 'Built for where it works',
        paragraphs: [
          'Dust, heat and long service intervals are design inputs from the start, not conditions the machine is later certified against. Enclosures, connectors and drivetrains are specified for dust, water and washdown; the vehicle is expected to be cleaned as roughly as it was used. A shift in the mud, the rain or the dark is meant to be an ordinary day.',
          'Every platform is proven on the ground it is meant for before it ships — on plant floors, at height, and on the steel the climber now holds to. The ground is Indian ground, and the platforms are specified against it rather than against a datasheet written for somewhere cooler.',
        ],
      },
      {
        heading: 'Why indigenous matters to the customer',
        paragraphs: [
          'For a defence or critical infrastructure buyer, where the machine was designed is not a sentiment. It decides who can change the firmware, who holds the drawings, who can turn a spare around, and whether the control chain has a dependency that sits outside the country. A platform engineered in one building in Ahmedabad answers those questions with a single address.',
          'It also shortens the loop between a site and a fix. The crew that reports a problem and the engineers who solve it are in the same time zone and, more often than not, the same room.',
        ],
      },
      {
        heading: 'The mission behind it',
        paragraphs: [
          'The stated mission is to make industrial maintenance safer, smarter and more efficient through intelligent robotics; the stated vision is to become a global leader in robotics-driven asset lifecycle management. Both start from the same premise: the jobs that are still done by hand, in the places people should not have to go, are here, and the machines for them should be built here too.',
          'Four platforms, four IPs and a publication is the record so far. It is a starting point rather than a boast.',
        ],
      },
    ],
    summary: [
      'Four platforms, four IPs on the drivetrain and climbing work, and a peer-reviewed publication, all from Ahmedabad.',
      'Design, electronics, firmware and control are built in-house, which is why the platforms can be adapted.',
      'Dust, heat and washdown are design inputs from the start, and every platform is proven on local ground before it ships.',
      'For defence and infrastructure buyers, where a machine was designed decides who can change and support it.',
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
    image: '/assets/images/proto.jpg',
    body: [
      {
        heading: 'Field robotics is unforgiving',
        paragraphs: [
          'A machine that works on the bench and fails in the mud has not worked. That sentence is most of what a candidate needs to understand about the job. The discipline rewards people who find out early and cheaply that they were wrong — in the workshop, next to the machine — rather than people who are right on paper and surprised on site.',
          'We screen for that temperament before we screen for any particular skill, because the skills can be taught and the temperament mostly cannot.',
        ],
      },
      {
        heading: 'Close to the machine',
        paragraphs: [
          'The workshop sits next to the desks on purpose. Engineers here are expected to build, break and rebuild what they design, and there is a site visit before the design review: whoever writes the control loop has stood on the ground it will drive over. Specifications argue with each other. Sites do not.',
          'In an interview that shows up as a preference for the concrete. Somebody who wants to talk about the last thing they built that did not work, and what they did about it, is usually somebody who will be happy here.',
        ],
      },
      {
        heading: 'Across the stack',
        paragraphs: [
          'Because everything is developed in-house — chassis, electronics, firmware, ground control — the useful engineer is the one who can follow a problem from the chassis into the firmware and out to the ground station without waiting for it to be somebody else’s. The principle is to own the whole loop: sensor to enclosure to autonomy stack to the report the customer actually reads.',
          'Nobody arrives knowing every layer. What we look for is a refusal to stop at the boundary of the one they know.',
        ],
      },
      {
        heading: 'Finished means unattended',
        paragraphs: [
          'A demo is not a delivery. Nothing counts as finished until it has run a full mission unattended, with somebody else operating it, on a day we did not get to choose. Engineers who are comfortable with that standard tend to write different code and cut different metal: more margin, fewer special cases, more thought about what happens when the link drops.',
          'The other standard is that the machine must be simple enough to run at six in the morning. The crew using it has a shift to finish; if it takes a specialist to switch on, we designed it wrong, and that is a bug like any other.',
        ],
      },
      {
        heading: 'Who ends up here',
        paragraphs: [
          'The team is small, works in one building in Ahmedabad, and is on the careers page by name. Between them the four platforms, four filed IPs and a peer-reviewed publication came out of that room, which is the best argument we have that the approach works.',
          'If the paragraphs above sound like a place you would want to work rather than a list of warnings, the open positions are on the careers page.',
        ],
      },
    ],
    summary: [
      'A machine that works on the bench and fails in the mud has not worked; we hire for people who find that out early.',
      'The workshop is next to the desks, and the site visit comes before the design review.',
      'Everything is in-house, so the useful engineer follows a problem across chassis, firmware and ground station.',
      'Finished means a full mission unattended, run by somebody else, on a day we did not choose.',
    ],
  },
];
