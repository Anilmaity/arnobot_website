import type { InsightDraft } from './types';

/**
 * Technology — the control stack: perception, localisation, the mission
 * model, the links back to the operator, and the four-layer architecture the
 * technology page draws.
 */
export const TECHNOLOGY: readonly InsightDraft[] = [
  {
    slug: 'holding-position-without-a-satellite-fix',
    category: 'Technology',
    title: 'Holding Position Without a Satellite Fix',
    excerpt:
      'With a satellite fix, localisation is centimetre-grade. Without one — underground, indoors, under steel — the vehicle has to build and trust its own map.',
    date: 'August 18, 2026',
    isoDate: '2026-08-18',
    image: '/assets/images/article-satellite-fix.webp',
    body: [
      {
        heading: 'Where the fix runs out',
        paragraphs: [
          'With a satellite fix, a ground vehicle knows where it is to the centimetre. That is the easy case, and it is also the case that disappears first. The ground our robots are built for — a tunnel, the inside of a vessel, a plant floor under a steel roof, the foot of a hull — takes the fix away, and usually takes the radio link and the operator’s line of sight with it.',
          'A machine that only works with a fix is a machine that works in the car park. So the question is not whether the vehicle can localise with satellites, but what it does in the long stretches where it cannot.',
        ],
      },
      {
        heading: 'Building the map on the move',
        paragraphs: [
          'Without an external reference the vehicle has to make its own. Laser, camera and inertial data are fused on the robot, and from that stream the autonomy layer builds a map of what is around it and places the vehicle inside it. The map is not downloaded and it is not sent up to a server to be assembled; it is held on the machine and grows as the machine moves.',
          'That is a deliberate choice rather than a convenience. The autonomy engine has to decide the next move from the map, and the next move cannot wait on a round trip to somewhere else. If the map lives where the decisions are made, a lost link costs the operator a picture, not the vehicle its position.',
        ],
      },
      {
        heading: 'Two references are better than none',
        paragraphs: [
          'A fix and a self-built map are not rivals. When both are available, the fix anchors the map to the real world and the map fills in the detail the fix does not carry — the wall, the doorway, the pallet that was not there yesterday. When the fix drops, the map keeps the vehicle placed relative to everything it has already seen.',
          'The transition between the two is where most of the work is. Coming out of a shed into open ground, the fix returns with a position that may not agree with where the map thinks the vehicle is, and the vehicle has to reconcile the two without lurching. Handling that seam cleanly is what makes a mixed site — half indoors, half out — drivable as one mission.',
        ],
      },
      {
        heading: 'Knowing when not to trust it',
        paragraphs: [
          'A map built without an external reference drifts. Over a long enough run the error accumulates, and a vehicle that trusts its own map completely will eventually be confident and wrong. The answer is not to pretend the drift is not there but to keep the safety functions independent of it.',
          'Geofencing and obstacle awareness stay active whatever the state of the fix. The obstacle in front of the vehicle is detected by the sensors looking at it now, not inferred from where the map says it should be. A degraded fix therefore costs the mission accuracy — a pass may need repeating — but it does not cost the site safety.',
        ],
      },
      {
        heading: 'What the operator sees',
        paragraphs: [
          'At the ground station the vehicle is tracked on a topographical map overlay whether or not it has a fix. What changes is the honesty of the display: the position is marked as satellite-grade or map-derived, so the operator knows how far to trust it before deciding whether to intervene.',
          'And when the link is gone as well, the mission record carries on being written on the vehicle. It is retrieved when the robot reconnects, so a pass through a GPS-denied space still comes back as data — the route it actually drove, what it saw, and when.',
        ],
      },
    ],
    summary: [
      'A satellite fix is the easy case, and it is the first thing a real site takes away.',
      'The vehicle fuses laser, camera and inertial data onboard and builds its own map, held on the machine where the decisions are made.',
      'Self-built maps drift, so geofencing and obstacle detection stay independent of localisation: a bad fix costs accuracy, not safety.',
      'The operator sees how much to trust the position, and the mission record is kept on the robot until it reconnects.',
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
    image: '/assets/images/article-detection-onboard.webp',
    body: [
      {
        heading: 'The link is the weakest part',
        paragraphs: [
          'Ask what fails first on a field deployment and the answer is almost never the motors, the battery or the software. It is the radio. Range, interference, a wall of steel between the vehicle and the operator, a mobile network that was fine in the morning — the link back is the one component whose behaviour the crew does not control.',
          'That sets a simple rule for where perception should live. Anything the vehicle has to know before it can act should not depend on a link that may not be there when it matters. If detecting an obstacle needs a server, the vehicle is blind exactly when it is out of contact.',
        ],
      },
      {
        heading: 'Fusion happens onboard',
        paragraphs: [
          'Laser, camera and inertial data are combined on the vehicle, and detection runs there too. The autonomy engine fuses the sensors, holds the map and decides the next move without reaching out to anything. A robot on our platform does not need to talk to a server to understand what is in front of it.',
          'This is also why the perception pipeline is designed to fit on the machine in the first place. It would be easier to run heavy models on a rack of GPUs and stream the answers down; it would also mean that the quality of the vehicle’s eyesight rose and fell with the signal bars.',
        ],
      },
      {
        heading: 'Latency is a safety property',
        paragraphs: [
          'Even a good link adds time. A frame sent up, processed and sent back arrives late by whatever the network decides that day, and a vehicle moving across a site cannot brake on a picture of where the obstacle was a moment ago. Keeping detection onboard makes the delay between seeing and reacting a property of the machine rather than of the network.',
          'It also lets the fast loop stay fast. Below the autonomy engine sits a real-time control layer that does not think but reacts, deterministically, thousands of times a second. That layer needs a steady feed of state from the hardware and a steady stream of decisions from above it; neither can be hostage to a round trip.',
        ],
      },
      {
        heading: 'Executing with or without a connection',
        paragraphs: [
          'The software is built in three parts: the operator interface, where missions are planned and monitored; the autonomy engine, which executes the mission on the robot with or without a live connection; and the mission record, which is retrieved when the robot reconnects. Perception is part of the second, which is why the second can keep going when the first is out of reach.',
          'A mission therefore does not stall when the vehicle passes behind a building or drops into a basement. It carries on covering the area it was given, replanning around what it meets, and the operator picks the picture back up when the link returns.',
        ],
      },
      {
        heading: 'What that leaves the ground station',
        paragraphs: [
          'Planning, supervision, and taking control back. The operator sets the mission, watches the vehicle on a real-time map, sees the live video when the link is good enough to carry it, and has a remote emergency stop within reach. Those are the jobs that suit a person at a desk, and they are the jobs the ground station is built around.',
          'What the ground station is not is a brain the vehicle borrows. The division is the same on every platform: the human layer plans and supervises; the thinking layer on the robot perceives and decides; the reflex layer beneath it reacts. The link between them carries commands and telemetry, and it is allowed to fail.',
        ],
      },
    ],
    summary: [
      'The radio link is the least reliable part of a field deployment, so nothing the vehicle needs in order to act may depend on it.',
      'Laser, camera and inertial data are fused on the robot, and detection runs there too.',
      'Onboard perception keeps the delay between seeing and reacting a property of the machine, not of the network.',
      'The ground station plans, supervises and can stop the vehicle; it is not a brain the robot borrows.',
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
    image: '/assets/images/lab.webp',
    body: [
      {
        heading: 'Three links, three failure modes',
        paragraphs: [
          'The ground station talks to the vehicle over secure local WiFi, long-range mesh radio, or a mobile internet link. They are not three copies of the same thing. WiFi is fast and short. Mesh radio reaches further and threads through a site by hopping, at the cost of bandwidth. Mobile internet goes as far as the network does and no further, and its quality is set by someone else’s tower.',
          'Because they fail for different reasons, they rarely fail together. Losing WiFi behind a wall is not the same event as losing a mobile signal in a valley. Carrying all three means one going down is a degradation rather than an outage.',
        ],
      },
      {
        heading: 'Diagnostics as well as control',
        paragraphs: [
          'The same links carry live diagnostics and control signals, and video when there is bandwidth to spare. That ordering matters. Knowing the state of the machine — where it is, what its battery is doing, whether a motor is running warm — is worth most exactly when the connection is marginal and the operator is deciding whether to let the mission continue.',
          'So the telemetry the operator needs to make that call is kept small and kept flowing, and the heavy stream is allowed to drop first. A thin link that still carries position and health is far more useful than a fat one that carries nothing.',
        ],
      },
      {
        heading: 'Choosing the link, not the operator',
        paragraphs: [
          'A crew on a site has a shift to finish. If switching from WiFi to radio is a menu the operator has to find while the vehicle is moving, it will be found too late. The link layer spans all four layers of the stack precisely so that the choice is made underneath the operator’s hands rather than in them.',
          'The same thinking applies to a mixed site. A vehicle that starts a mission inside a shed on local WiFi, drives out across a yard on mesh radio and finishes at the far fence on a mobile link has not had three connections from the operator’s point of view. It has had one, with a few moments of thinner video.',
        ],
      },
      {
        heading: 'When every link is gone',
        paragraphs: [
          'Lose all three and the vehicle is on its own, which is a state it is designed for rather than a state it is surprised by. The autonomy engine executes the mission with or without a live connection, so an area-coverage pass can carry on. If the situation calls for it, the vehicle falls back to a safe state and holds it until an operator is back in the loop.',
          'Nothing that happens while the link is down is lost. The mission record is written on the robot and retrieved when it reconnects, so the operator gets back the whole pass: the route it actually drove, what it saw and when.',
        ],
      },
      {
        heading: 'Stop is not a message',
        paragraphs: [
          'One command must never depend on a link at all. The emergency stop is wired to the real-time control layer — the reflexes — rather than to the autonomy computer, so it works even when that computer is fully loaded, and the remote stop switch at the ground station is a first-class control rather than one more packet in a queue.',
          'Multi-link telemetry is what keeps the operator informed. The reflex layer is what keeps the site safe if the operator cannot be. The two are designed separately for the same reason: the day the link matters most is the day it is least likely to be there.',
        ],
      },
    ],
    summary: [
      'WiFi, mesh radio and mobile internet fail under different conditions, so carrying all three turns an outage into a degradation.',
      'Position and health are kept flowing on a thin link; video is the first thing allowed to drop.',
      'Switching links happens underneath the operator, not in a menu they have to find mid-mission.',
      'With every link gone the vehicle carries on or falls back to a safe state, and the mission record is retrieved when it reconnects.',
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
    image: '/assets/images/article-mission-area.webp',
    body: [
      {
        heading: 'Give it ground, not a path',
        paragraphs: [
          'The most familiar way to run a ground robot is to drive it. A stick in the operator’s hand, a video feed on a screen, and an hour of concentration. It works, and every one of our platforms supports it, but it scales badly: one person, one machine, and a pass whose quality depends on how tired that person is by the end.',
          'The alternative is to describe the job rather than the movements. A mission on our platform is an area to cover and a set of coordinates to work through, planned at the ground station against a topographical map overlay. The vehicle is told what ground to cover and works out for itself how to cover it.',
        ],
      },
      {
        heading: 'Why a path is the wrong unit',
        paragraphs: [
          'A recorded path is brittle. The site the vehicle drives tomorrow is not quite the site it drove today: a vehicle is parked across the route, a pallet has been moved, a gate is shut. A machine following a path meets the obstacle and stops, and the mission is over until someone walks out to it.',
          'An area does not have that problem. The vehicle knows what it is supposed to cover, not merely where it is supposed to be next, so an obstacle is a detour rather than a dead end. This is also what lets a mission be planned in minutes rather than rehearsed.',
        ],
      },
      {
        heading: 'Replanning without losing the pass',
        paragraphs: [
          'Meeting an obstacle does not end the mission. The autonomy engine, which holds the map and decides the next move on the robot, plans around it and resumes the pass where it left off, so coverage stays complete. The parts of the area that were skipped to get past the obstacle are still owed, and the vehicle comes back for them.',
          'That bookkeeping happens on the vehicle, which means it keeps happening when the link to the ground station is thin or gone. The mission is executed with or without a live connection; the operator is watching, not steering.',
        ],
      },
      {
        heading: 'The operator stays in the loop',
        paragraphs: [
          'Describing the job instead of driving it does not remove the person; it changes what the person does. Live tracking shows where the vehicle is against the plan on a real-time map. A geofence marks the boundary it will not cross, obstacle detection is running locally, and a remote emergency stop is within reach the whole time.',
          'Between remote control and full autonomy there is a middle setting, and most sites live there. The vehicle runs the pass; the operator watches several things at once and steps in when something on the video needs a human decision.',
        ],
      },
      {
        heading: 'Every pass comes back as data',
        paragraphs: [
          'The other thing an area-based mission gives you is a record worth keeping. Because the plan was explicit, the difference between the plan and what actually happened is explicit too: the map, the route the vehicle really drove, what it saw and when. That comes back as data, reviewed at a desk long after the robot has left the site.',
          'Do that on a schedule and a survey stops being an event. The same area, covered the same way, produces a series of comparable passes — which is where the value of routine inspection actually sits.',
        ],
      },
    ],
    summary: [
      'A mission is an area to cover and coordinates to work through, planned against a map, not an hour of stick input.',
      'Paths break on the first parked truck; an area lets an obstacle be a detour instead of a dead end.',
      'The vehicle replans on the robot and resumes the pass, so coverage stays complete even with a poor link.',
      'The operator supervises with live tracking, a geofence and a remote stop, and every pass comes back as comparable data.',
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
    image: '/assets/images/soft.jpg',
    body: [
      {
        heading: 'One core, four layers',
        paragraphs: [
          'Every ARNOBOT platform, from the 3\u00A0kg scout to the 500\u00A0kg carrier, runs the same four-layer core. It is what lets the range cover remote control, semi-autonomous operation and full autonomy without becoming four different products, and it is what we mean when we say that for a new environment we change the body, not the intelligence.',
          'The layers are worth naming because each is allowed to decide different things, and the boundaries between them are where the safety of the whole machine is set.',
        ],
      },
      {
        heading: 'Ground station: the human layer',
        paragraphs: [
          'The top layer is the ground control station, and it is the only layer with a person in it. This is where a mission is planned against a map, watched as it runs, and taken back if it needs to be. Live video, vehicles on a real-time map, geofencing and a one-click emergency stop all live here, over WiFi, radio or the internet.',
          'It decides intent. What ground to cover, where the boundary is, whether to continue. It does not decide how to steer around the next obstacle, because by the time a person could, the vehicle has already met it.',
        ],
      },
      {
        heading: 'Autonomy: the thinking layer',
        paragraphs: [
          'The autonomy engine runs on the robot. It fuses laser, camera and inertial data, holds the map, and decides the next move. Given an area from the ground station it plans the pass, replans around what it meets, and resumes where it left off — with or without a live connection to the operator.',
          'This is the layer that makes the vehicle useful rather than merely controllable, and it is deliberately the layer with the most computation and the least authority over safety. It proposes the next move; the layer below it is the one that actually moves the machine.',
        ],
      },
      {
        heading: 'Reflex: the real-time layer',
        paragraphs: [
          'Beneath the autonomy engine sits real-time control. It does not think. It reacts, deterministically, thousands of times a second, driving the motors and reading state back from the hardware on a loop that runs whether or not the computer above it is busy. The command it takes from the autonomy layer is the next move; what it does with that is bounded by what it can see the machine doing.',
          'The emergency stop is wired here, to the reflexes, rather than to the brain. That is a design decision, not an accident of wiring: a stop that has to pass through the autonomy computer is a stop that fails when that computer is fully loaded, and a fully loaded computer is exactly when you want to stop.',
        ],
      },
      {
        heading: 'Payload: the only layer that changes',
        paragraphs: [
          'The bottom layer is the hardware — the body, the drivetrain, the attachment on top. It is the only layer that changes between platforms. SAIBYA carries 200\u00A0kg on a 4×4 drive, ATM carries 500\u00A0kg on front and rear suspension, NEXUS drives upside down at 3\u00A0kg, and ALTIUS climbs steel by magnetic grip. The three layers above them are the same.',
          'Spanning all four is the link layer, which carries mission and telemetry between the ground station and the vehicle and is allowed to fail. The consequence for a crew is simple: learn the ground station once, learn the stack once, and the fleet is the same machine in four bodies.',
        ],
      },
    ],
    summary: [
      'Every platform runs the same four-layer core: ground station, autonomy engine, real-time control and hardware.',
      'The human layer decides intent; the thinking layer on the robot decides the next move; the reflex layer executes it, deterministically.',
      'The emergency stop is wired to the reflexes, so it works even when the autonomy computer is fully loaded.',
      'Only the hardware layer changes between platforms, which is what lets one trained crew run the whole fleet.',
    ],
  },
];
