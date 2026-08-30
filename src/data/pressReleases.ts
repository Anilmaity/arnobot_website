import type { PressRelease } from '@/types';

/** Press Releases Data — direct port of the $press_releases array in press-release.php. */
export const PRESS_RELEASES: readonly PressRelease[] = [
  {
    id: 1,
    tag: 'Defense & UGVs',
    badgeClass: 'pr-badge-defense',
    date: 'August 24, 2026',
    dateline: 'AHMEDABAD, INDIA',
    title: 'ARNOBOT Validates SAIBYA Heavy Tactical UGV in High-Altitude Non-Permissive Terrain Trials',
    excerpt:
      'ARNOBOT today announced the successful completion of rigorous 12-hour continuous endurance and multi-link encrypted mesh telemetry trials for its flagship SAIBYA Tactical UGV across extreme elevation terrain.',
    image: '/assets/images/saibya-field.webp',
    body: [
      'ARNOBOT, a pioneering developer of mission-critical autonomous robotics, has successfully concluded comprehensive field validation for its SAIBYA Heavy Tactical Unmanned Ground Vehicle (UGV) in contested high-altitude mountain environments.',
      'The multi-day exercise tested the platform’s all-terrain mobility, zero-turning-radius powertrain, and military-grade COFDM + Sub-GHz mesh radio links under simulated electronic warfare conditions. Operating continuously for over 12 hours without battery degradation, the UGV provided persistent 4K electro-optical and long-wave infrared (LWIR) surveillance back to a remote Ground Control Station located 5.2 kilometers away.',
      '“Asymmetric battlefield operations demand total situational awareness without putting human soldiers into hostile line-of-fire,” said Anmol Agrawal, Founder and Chief Robotics Architect at ARNOBOT. “SAIBYA’s successful trial demonstrates that Indian autonomous ground robotics can match and exceed global benchmarks in ruggedness, endurance, and encrypted communications resilience.”',
      'The SAIBYA platform is now slated for integration trials with specialized defense procurement units in Q4 2026.',
    ],
  },
  {
    id: 2,
    tag: 'Industrial NDT',
    badgeClass: 'pr-badge-industrial',
    date: 'August 05, 2026',
    dateline: 'MUMBAI, INDIA',
    title: 'Launch of ALTIUS Series II: Next-Gen Magnetic Climbing Robot for Zero-Scaffolding Petrochemical Audits',
    excerpt:
      'ARNOBOT unveils ALTIUS Series II, featuring proprietary neodymium adhesion tracks generating 350 kgf of continuous magnetic grip for inverted crawler inspections inside hazardous storage tanks.',
    image: '/assets/images/industry-asset.png',
    body: [
      'ARNOBOT today announced the global commercial availability of ALTIUS Series II, an automated non-destructive testing (NDT) magnetic crawler designed to eliminate human entry from confined and hazardous vertical metallic structures.',
      'Equipped with dual dry-coupled ultrasonic thickness probes and high-definition macro optical lenses, ALTIUS Series II captures over 100 ultrasonic data points per second. The system maps internal corrosion and wall thinning in full compliance with API 653 and ASME Section V standards.',
      '“Refinery shutdowns historically consume 3 to 4 weeks simply erecting internal scaffolding,” stated the Industrial Automation Division Lead. “ALTIUS Series II completes full volumetric hull scans in under 48 hours, saving operators hundreds of thousands of dollars while protecting maintenance technicians from toxic confined spaces.”',
      'ALTIUS Series II is currently being piloted across several major oil refining complexes and offshore marine terminals.',
    ],
  },
  {
    id: 3,
    tag: 'Defense & UGVs',
    badgeClass: 'pr-badge-defense',
    date: 'July 18, 2026',
    dateline: 'BENGALURU, INDIA',
    title: 'ARNOBOT Unveils Encrypted Multi-Link GCS Cockpit for Remote Multi-Agent Robotic Operations',
    excerpt:
      'New military-standard Ground Control Station (GCS) integrates real-time 3D LiDAR point-cloud streaming, swarmed telemetry, and AES-256 encrypted mission control.',
    image: '/assets/images/gcs_interface.png',
    body: [
      'At the National Aerospace & Defense Tech Expo, ARNOBOT demonstrated its next-generation Ground Control Station (GCS) telemetry cockpit, purpose-built for coordinating autonomous multi-agent UGV swarms.',
      'The software ecosystem processes dual-band video streams, live vehicle health diagnostics, and dynamic 3D costmaps generated onboard by edge neural accelerators with sub-45ms latency.',
      'Featuring fail-safe Automated Return-to-Base (RTB) protocols and jamming-resistant frequency hopping, the GCS enables a single tactical operator to supervise multiple robotic rovers in contested environments.',
    ],
  },
  {
    id: 4,
    tag: 'Corporate & Facility',
    badgeClass: 'pr-badge-corporate',
    date: 'June 29, 2026',
    dateline: 'AHMEDABAD, INDIA',
    title: 'ARNOBOT Expands R&D Prototyping & CNC Machining Facility to Double Robotic Chassis Output',
    excerpt:
      'New 15,000 sq. ft. engineering hub in Gujarat integrates aerospace-grade CNC machining, environmental stress chambers, and dedicated clean-room electronics assembly.',
    image: '/assets/images/designassmbly1.jpg',
    body: [
      'To meet surging demand from defense partners and heavy industrial conglomerates, ARNOBOT has completed the phase-two expansion of its Ahmedabad advanced manufacturing and prototyping center.',
      'The expanded facility houses multi-axis CNC fabrication centers, dynamic pull-test rigs for magnetic tracks, and a specialized environmental testing bay capable of simulating extreme desert heat, moisture ingress, and vibration shocks.',
      '“This strategic expansion allows us to scale production of our SAIBYA, ALTIUS, and ATM robotic lines while maintaining 100% in-house engineering and quality control under our Make-in-India commitment,” said the operations director.',
    ],
  },
  {
    id: 5,
    tag: 'Corporate & Facility',
    badgeClass: 'pr-badge-corporate',
    date: 'May 14, 2026',
    dateline: 'NEW DELHI, INDIA',
    title: 'ARNOBOT Honored with National Autonomous Robotics Excellence Award at Innovation Summit',
    excerpt:
      'Jury recognizes ARNOBOT’s breakthroughs in GPS-denied 3D LiDAR SLAM perception and ruggedized indigenous ground robotics architecture.',
    image: '/assets/images/electronic-lab.png',
    body: [
      'ARNOBOT has been conferred the prestigious "Excellence in Autonomous Systems Innovation" trophy at the annual India Robotics & Automation Summit.',
      'The recognition commends ARNOBOT’s multi-sensor fusion algorithms that combine 32-beam 3D LiDAR, stereo visual odometry, and tactical 9-axis IMUs to achieve sub-centimeter navigation inside GPS-denied environments such as subterranean tunnels and shielded metal facilities.',
      'The company was selected from over 120 national deep-tech contenders for its relentless focus on solving dangerous industrial and tactical challenges.',
    ],
  },
  {
    id: 6,
    tag: 'Industrial NDT',
    badgeClass: 'pr-badge-industrial',
    date: 'April 10, 2026',
    dateline: 'HYDERABAD, INDIA',
    title: 'Subterranean Multi-Sensor SLAM Milestone Achieved in GPS-Denied Underground Mine Trials',
    excerpt:
      'Autonomous rovers successfully construct centimeter-accurate 3D volumetric tunnels maps without human intervention or external beacon networks.',
    image: '/assets/images/saibya7.jpg',
    body: [
      'In collaboration with prominent mining infrastructure partners, ARNOBOT rovers completed end-to-end autonomous navigation trials through a 2.4-kilometer unmapped underground mining tunnel network.',
      'Navigating in zero natural light through dust clouds and uneven shale, the rover’s onboard edge neural compute module built dynamic voxel costmaps in real time, detecting structural hazards and avoiding dynamic equipment without loss of localization.',
      'The achievement proves the viability of unmanned ground systems for subterranean hazard assessment, pre-blast surveying, and post-incident emergency reconnaissance.',
    ],
  },
];
