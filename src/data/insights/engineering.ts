import type { InsightDraft } from './types';

/**
 * Engineering — how the platforms are built: carrying mass, holding to
 * steel, the invertible scout, the safe state, and environmental
 * specification. Figures follow `products.ts` and the technology page.
 */
export const ENGINEERING: readonly InsightDraft[] = [
  {
    slug: 'from-200-kg-to-500-kg',
    category: 'Engineering',
    title: 'From 200\u00A0kg to 500\u00A0kg',
    excerpt:
      'SAIBYA carries 200\u00A0kg on a 4×4 drivetrain; ATM carries 500\u00A0kg on front and rear suspension. What changes structurally when the payload more than doubles.',
    date: 'August 21, 2026',
    isoDate: '2026-08-21',
    image: '/assets/images/saibya-field.webp',
    body: [
      {
        heading: 'Two carriers, one job',
        paragraphs: [
          'SAIBYA carries 200\u00A0kg on a 4×4 high-traction drivetrain, with stair-climbing and all-terrain mobility. ATM carries 500\u00A0kg on all-terrain drive with front and rear suspension. The task is the same — move mass across ground that has no road — and almost nothing structural is shared between them.',
          'That is the honest answer to a question we are often asked: why not one bigger SAIBYA? Because the loads do not scale, they change character.',
        ],
      },
      {
        heading: 'Suspension changes the problem',
        paragraphs: [
          'At 200\u00A0kg the risk on rough ground is the ground: keeping traction, keeping the vehicle level enough to climb, keeping it from beaching on an edge. A stiff 4×4 chassis with high-traction drive answers that directly, and stair-climbing falls out of the same geometry.',
          'At 500\u00A0kg the risk is the load. A payload that heavy moving on its mounts is a bigger threat to the vehicle than the roughness under the wheels, so ATM runs front and rear suspension for load stability. The suspension is not there for comfort; it is there so the mass on top stays where it was put while the chassis works over a rocky industrial slope.',
        ],
      },
      {
        heading: 'Clearance, drive and where the weight sits',
        paragraphs: [
          'ATM is a high-clearance heavy chassis built to scale rocky industrial slopes, and clearance and stability pull against each other: a higher chassis clears more but carries its load higher. Resolving that is most of the mechanical design, and it is why the two vehicles do not share a frame. The drivetrain is also the part of the platform developed and protected in-house.',
          'The same argument decides where the payload is allowed to sit. On both vehicles the modular attachment interface is placed so that a full load keeps the centre of mass inside the envelope the suspension and the drive are designed around.',
        ],
      },
      {
        heading: 'What does not change',
        paragraphs: [
          'Above the hardware, nothing. Both carriers run the same four-layer core: ground station, autonomy engine, real-time control. Both take modular attachments, both stream real-time telemetry and video, both run under remote or autonomous control, and both fall back to a safe state on their own if the link, the fix or a sensor goes.',
          'So the job of the operator does not change with the size of the machine. Planning an area, watching it on the map, reaching for the stop — a crew that has done it on SAIBYA has done it on ATM.',
        ],
      },
      {
        heading: 'Choosing between them',
        paragraphs: [
          'SAIBYA is the vehicle for defence logistics, supply transport and ammunition carriage, for confined ground and for stairs, and for anything where 200\u00A0kg is enough and mobility is the constraint. ATM is the vehicle for heavy material transport, towing and industrial site operations, where the load is the constraint and the ground is a worksite rather than a stairwell.',
          'The two together cover the range without either being a compromise for the other, and that is exactly why there are two.',
        ],
      },
    ],
    summary: [
      'SAIBYA and ATM share a job and almost no structure, because loads change character rather than scale.',
      'At 200\u00A0kg the ground is the risk and a stiff 4×4 answers it; at 500\u00A0kg the load is the risk and suspension holds it.',
      'Clearance, drivetrain and where the payload sits are resolved differently on each frame.',
      'Above the hardware nothing changes, so an operator trained on one carrier has been trained on both.',
    ],
  },
  {
    slug: 'holding-a-machine-to-a-steel-wall',
    category: 'Engineering',
    title: 'Holding a Machine to a Steel Wall',
    excerpt:
      'Magnetic grip has to carry the robot, its tooling and a 30\u00A0kg payload — and stay predictable across welds, coatings and the edge of the plate.',
    date: 'August 1, 2026',
    isoDate: '2026-08-01',
    image: '/assets/images/product-altius.png',
    body: [
      {
        heading: 'The load path',
        paragraphs: [
          'ALTIUS is a vertical climbing robot for ferromagnetic surfaces. Its magnetic grip has to carry the robot, its tooling and a 30\u00A0kg vertical payload, with margin, while the machine is moving rather than parked. A magnet that holds a stationary robot is easy; a magnet that holds it through the load changes of driving up a wall with a brush or a blast nozzle on the front is the actual problem.',
          'The load path runs from the payload through the frame into the magnets and into the steel, and every element in it has to be sized for the worst moment in the mission rather than the average one.',
        ],
      },
      {
        heading: 'Welds, coatings and edges',
        paragraphs: [
          'Adhesion is not uniform across a real structure. Paint thickness changes the gap between magnet and steel; a weld bead lifts one side of the machine; the edge of a plate takes away half the metal the magnet was counting on. Each of those changes what the magnets are actually holding, and none of them appears on a drawing.',
          'The design answer is to treat grip as a budget that varies along the wall rather than a constant, and to keep the machine inside the budget everywhere it is allowed to go. The rugged industrial build is part of the same thinking: the frame has to be stiff enough that a lifted corner does not become a peeled machine.',
        ],
      },
      {
        heading: 'Tooling adds its own load',
        paragraphs: [
          'Interchangeable tooling means the payload is not a fixed mass or a fixed shape. An inspection instrument, a cleaning head, and a painting or sand-blasting attachment each load the machine differently — and a blast nozzle pushes back. The grip budget is therefore set by the worst tool in the worst orientation rather than the typical case.',
          'It also means the attachment interface is part of the structural design rather than a bolt-on, because a tool that shifts under load moves the centre of mass on a machine whose whole existence depends on where that mass is.',
        ],
      },
      {
        heading: 'Knowing what the wall is doing',
        paragraphs: [
          'A climber cannot afford to find out about a coating change by falling off it. Real-time video transmission is the operator’s view, and the vehicle’s own state — drawn thousands of times a second by the real-time control layer — is what the reflexes act on. If something in the load path looks wrong the machine holds rather than proceeds, and the operator decides what happens next.',
          'That is the same fall-back-to-a-safe-state behaviour every platform has; on a wall the safe state is simply to stop and grip.',
        ],
      },
      {
        heading: 'What the work is for',
        paragraphs: [
          'The reason to solve any of this is the surface it opens up: hulls, cranes, dam faces, plant walls and towers that would otherwise need scaffolding or rope access before anyone could look at them. Infrastructure inspection, industrial cleaning at height, surface painting and sand blasting, industrial surveillance and critical asset mapping are the listed applications, and every one of them starts with a machine that stays on the wall.',
          'The climbing work is one of the two areas covered by the IPs the company has filed. It is the part of the range we are least willing to buy in.',
        ],
      },
    ],
    summary: [
      'Magnetic grip has to carry the robot, the tooling and a 30\u00A0kg payload with margin, while moving.',
      'Paint, weld beads and plate edges all change what the magnets hold, so grip is a budget, not a constant.',
      'Interchangeable tooling means the worst tool in the worst orientation sets that budget.',
      'On a wall the safe state is to stop and grip, and the climbing work is protected by filed IP.',
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
    image: '/assets/images/product-nexus.png',
    body: [
      {
        heading: 'No wrong way to land',
        paragraphs: [
          'NEXUS is fully invertible and drives upside down, so a throw into a room or over a wall does not need to end the right way up. That one property decides most of the rest of the design: the chassis is symmetric top to bottom, the drive works either way, and the camera and antennas have to be usable whichever face is on the floor.',
          'Every feature that would break the symmetry — a taller sensor mast, a one-sided payload bay — has to justify itself against the moment the robot lands on the wrong side and stops being useful.',
        ],
      },
      {
        heading: 'Rapid deployment',
        paragraphs: [
          'At 3\u00A0kg the scout is carried rather than transported. That is what makes it useful for tactical and urban reconnaissance, indoor security inspection and scouting high-risk ground: it goes where the person goes, and it goes in first. Rapid deployment is not a feature on the list so much as the reason for the list.',
          'Weight is spent accordingly. Structure, drive and battery get the mass; anything that does not help the robot get into the room and send back a picture is a candidate for removal.',
        ],
      },
      {
        heading: 'What the operator sees',
        paragraphs: [
          'The point of a scout is what it sends back. The onboard camera streams live video to the operator, and control is encrypted, so what the scout sees reaches the person who threw it and nobody else. In the surveillance role the same platform carries thermal imaging and obstacle avoidance, patrolling a perimeter and reporting what it finds.',
          'The link is the one part of the system a 3\u00A0kg machine cannot armour, so the design assumes it will be marginal: the video degrades before the control does, and the control degrades before the robot does anything unsafe.',
        ],
      },
      {
        heading: 'Small does not mean simpler',
        paragraphs: [
          'NEXUS runs the same four-layer core as the 500\u00A0kg carrier: a ground station, an autonomy layer, real-time control and the hardware. What changes is how much of each fits, and fitting the stack into a machine that can be thrown is its own engineering problem. The body is the only layer that changes between platforms, and here the body is very small.',
          'The pay-off is that an operator trained on the ground vehicles is already trained on the scout, and a scout that finds something can hand off to a carrier on the same ground station.',
        ],
      },
      {
        heading: 'Where it goes',
        paragraphs: [
          'Defence surveillance, tactical and urban reconnaissance, indoor security inspection, border monitoring and high-risk area scouting are the listed applications, and they share a shape: a person needs to know what is on the other side of something before committing to it. NEXUS is designed to be the thing that goes and looks.',
          'It is also the platform that most often gets thrown, dropped and landed upside down in testing, which is the point.',
        ],
      },
    ],
    summary: [
      'Full invertibility decides the design: symmetric chassis, drive that works either way up, camera usable on both faces.',
      'At 3\u00A0kg the scout is carried, not transported, and weight goes only to what gets it into the room and sends a picture back.',
      'Live onboard video and encrypted control mean what it sees reaches the operator and nobody else.',
      'It runs the same four-layer core as the carriers, so one trained operator covers scout and carrier alike.',
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
    image: '/assets/images/saibya7.jpg',
    body: [
      {
        heading: 'Three things it can lose',
        paragraphs: [
          'The link to the operator, the satellite fix, or a sensor. Each degrades the vehicle differently: a lost link takes away supervision, a lost fix takes away absolute position, a lost sensor takes away part of the picture. None of them should end with a machine still moving on a stale plan, and none of them should require a person to be watching at the moment it happens.',
          'So the platform is designed around a state it can always reach on its own, and the question for every failure is how it gets there.',
        ],
      },
      {
        heading: 'Faults stay local',
        paragraphs: [
          'The principle is that a fault should be contained by the layer nearest to it. A lost fix is handled in the autonomy engine, which carries on with its own map and marks the position as map-derived rather than satellite-grade. A lost link is handled by the mission model, which was executing with or without a connection anyway. A lost sensor is handled by the perception stack, which knows what it can no longer see.',
          'What no layer is allowed to do is pass the problem downward as motion. Whatever is happening above, the layer that actually moves the machine has its own rule for what to do when the layers above stop making sense.',
        ],
      },
      {
        heading: 'The reflex layer holds',
        paragraphs: [
          'The vehicle falls back to a safe state on its own, and the real-time control layer keeps it there — deterministically, thousands of times a second, without waiting on the layers above to agree. That layer does not think and is not asked to; it reacts to the state it reads from the hardware and to the last valid command it was given, and if there is no valid command, it holds.',
          'The emergency stop is wired to this layer rather than to the autonomy computer, so a stop works even when that computer is fully loaded — which is exactly the condition a fault tends to produce.',
        ],
      },
      {
        heading: 'Geofence and obstacles never switch off',
        paragraphs: [
          'Safety awareness is kept independent of everything that can be lost. Geofencing and obstacle detection run on the robot from the sensors looking at the ground now, not from the fix and not from the link, so a degraded position costs accuracy rather than safety and a dropped link does not remove the boundary. The vehicle can be worse at its mission and still incapable of leaving the site.',
          'Multi-link telemetry — WiFi, mesh radio and mobile internet — makes a total link loss rare. The design does not rely on it being rare.',
        ],
      },
      {
        heading: 'Recovering deliberately',
        paragraphs: [
          'Coming back from a safe state is an operator decision made at the ground station, not something the machine does quietly the moment a link flickers. When the connection returns the operator sees the vehicle where it stopped, sees the mission record it kept while it was out of contact, and decides whether to resume, replan or recover it.',
          'A machine that resumes on its own is a machine that has decided the fault is over, and that is a judgement the design deliberately leaves to the person.',
        ],
      },
    ],
    summary: [
      'The link, the fix or a sensor can each be lost, and none may end with the vehicle moving on a stale plan.',
      'Each fault is contained by the layer nearest to it, and no layer may pass a problem downward as motion.',
      'The reflex layer holds the safe state deterministically, with the emergency stop wired to it rather than the brain.',
      'Geofence and obstacle detection never switch off, and recovery is an operator decision, not an automatic resume.',
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
    image: '/assets/images/prototyping.jpg',
    body: [
      {
        heading: 'Ordinary conditions',
        paragraphs: [
          'A shift in the mud, the rain or the dark should be an ordinary day. That is a specification decision made at the start of a platform, not a rating applied to it at the end, and it changes what gets drawn: where the seals go, which connectors are allowed, how a drivetrain is protected, what the crew is expected to do with a hose when the mission is over.',
          'The ground the machines are for — steel mills, ports, tunnels, defence formations — is hot, wet, dusty and noisy, and it does not get cleaner because a robot has arrived.',
        ],
      },
      {
        heading: 'Enclosures and connectors',
        paragraphs: [
          'Enclosures, connectors and drivetrains are chosen for ingress and for washdown, because the machine will be cleaned as roughly as it was used. A connector that survives a day in the field and fails in the wash bay has failed; a seal that keeps dust out but traps water in has failed differently. The specification treats the wash as part of the mission.',
          'Across the range that shows up as weatherproof and waterproof builds, and on the climber as a rugged industrial build that is expected to work in salt.',
        ],
      },
      {
        heading: 'Heat and service intervals',
        paragraphs: [
          'Dust and water are the visible half. Heat and long service intervals are the other, and they are design inputs from the first drawing rather than conditions the machine is later certified against. A platform that needs attention every few hours is a platform that does not get used, whatever it can do in between.',
          'The site visit before the design review is where these numbers come from. Whoever writes the control loop has stood on the ground it will drive over, and has usually come back with a note about the temperature.',
        ],
      },
      {
        heading: 'Service without special tools',
        paragraphs: [
          'A machine that is sealed for the site also has to be opened on the site. Attachments come off with standard tooling, so maintenance happens where the machine works rather than where the manufacturer is, and the same core runs on every platform so the routine is one routine. A crew trained on one robot keeps the whole fleet moving.',
          'The standard is the one on the careers page: simple enough to run at six in the morning. If it takes a specialist to switch on or to hose down, we designed it wrong.',
        ],
      },
      {
        heading: 'Proven before it ships',
        paragraphs: [
          'None of this is taken on trust. Every platform is proven on the ground it is meant for before it ships — plant floors, height, steel — and nothing counts as finished until it has run a full mission unattended, with somebody else operating it, on a day we did not get to choose. Bad weather is not a reason to postpone that test. It is the test.',
          'The result is a machine for which the wet, dirty, dark shift is not a special case, because it was never allowed to be one.',
        ],
      },
    ],
    summary: [
      'A shift in the mud, the rain or the dark is specified as an ordinary day from the first drawing.',
      'Enclosures, connectors and drivetrains are chosen for ingress and washdown, because the wash is part of the mission.',
      'Heat and long service intervals are design inputs, brought back from the site visit before the design review.',
      'Attachments come off with standard tooling, and every platform is proven unattended on real ground before it ships.',
    ],
  },
];
