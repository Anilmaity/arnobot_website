import type { BlogArticle, BlogArticleId } from '@/types';

/** Detailed static article data — ported from the $articles array in blog-details.php. */
export const BLOG_ARTICLES: Readonly<Record<BlogArticleId, BlogArticle>> = {
  1: {
    id: 1,
    slug: 'next-gen-ugv-systems-defense-tactical',
    category: 'Defense & Tactical UGV',
    title: 'Next-Gen UGV Systems: Transforming Defense & Reconnaissance in Extreme Terrains',
    leadExcerpt:
      'Deploying autonomous unmanned ground platforms equipped with multi-link encrypted mesh telemetry, thermal sensor suites, and obstacle-avoidance AI across contested frontline operations.',
    cardExcerpt:
      'How unmanned ground platforms equipped with multi-link mesh telemetry, thermal vision, and obstacle-avoidance AI are redefining perimeter defense and tactical frontline operations.',
    heroThumb: '/assets/images/saibya1.jpg',
    heroImage: '/assets/images/saibya-field.webp',
    date: 'August 24, 2026',
    readTime: '6 min read',
    author: 'Anmol Shah',
    role: 'Founder & Chief Robotics Architect',
    takeaways: [
      'Unmanned Ground Vehicles (UGVs) bridge high-risk tactical reconnaissance gaps in contested environments without exposing personnel to frontline hazards.',
      'Encrypted multi-link mesh telemetry (COFDM + Sub-GHz) guarantees low-latency video and C2 data over 5+ km NLOS ranges in jammed RF conditions.',
      'Modular sensor payloads (thermal/LWIR, pan-tilt zoom optics, directional microphones) enable real-time perimeter surveillance and threat categorization.',
      'Independent high-torque hub motor powertrains and skid-steering provide zero-radius turning across loose scree, mud, and rubble.',
    ],
    tags: ['TacticalUGV', 'DefenseTech', 'FieldRobotics', 'MeshTelemetry', 'ThermalVision', 'EdgeAI'],
    prevId: 3,
    nextId: 2,
    toc: [
      '1. Operational Challenges in Terrains',
      '2. Encrypted Multi-Link Mesh Telemetry',
      '3. Multi-Sensor AI Surveillance',
      '4. Precision Prototyping & Lab',
      '5. Summary & Future Outlook',
    ],
  },

  2: {
    id: 2,
    slug: 'zero-risk-tank-pipeline-inspection-climbing-robots',
    category: 'Industrial Asset Inspection',
    title: 'Zero-Risk Tank & Pipeline Inspection: The Rise of Magnetic Climbing Crawlers',
    leadExcerpt:
      'Eliminating hazardous confined-space human entry in petrochemical storage tanks and high-temperature pipelines through ultrasonic NDT payloads and specialized vertical climbing robots.',
    cardExcerpt:
      'Eliminating hazardous confined-space human entry in petrochemical tanks and high-temperature pipelines through ultrasonic NDT payloads and specialized vertical crawlers.',
    heroThumb: '/assets/images/ALTIUS.png',
    heroImage: '/assets/images/ALTIUS.png',
    date: 'August 18, 2026',
    readTime: '7 min read',
    author: 'Engineering Robotics Team',
    role: 'Asset Robotics Division',
    takeaways: [
      'Eliminates dangerous confined-space human entry into chemical storage tanks, distillation columns, and flare stacks.',
      'Rare-earth Neodymium permanent magnetic tracks deliver >350 kgf adhesion on vertical and inverted ferromagnetic surfaces.',
      'Integrated ultrasonic thickness (UT) probes capture continuous wall-thinning and corrosion topography with sub-millimeter precision.',
      'Reduces scheduled maintenance shutdown downtime from multiple weeks to under 48 hours, yielding major ROI.',
    ],
    tags: [
      'NDTInspection',
      'ClimbingRobots',
      'AssetIntegrity',
      'Petrochemical',
      'UltrasonicTesting',
      'SafetyFirst',
    ],
    prevId: 1,
    nextId: 3,
    toc: [
      '1. Confined-Space Inspection Crisis',
      '2. Magnetic Adhesion & Inverted Crawling',
      '3. Ultrasonic NDT Payloads',
      '4. Mechanical R&D & Testing',
      '5. Conclusion & Asset Safety',
    ],
  },

  3: {
    id: 3,
    slug: 'beyond-gps-autonomous-navigation-lidar-slam',
    category: 'AI & Autonomous Navigation',
    title: 'Beyond GPS: Autonomous Navigation in GPS-Denied Environments via 3D LiDAR SLAM',
    leadExcerpt:
      'A deep technical look into ARNOBOT’s multi-sensor fusion pipeline delivering sub-centimeter autonomous mapping and obstacle path planning in underground tunnels and metallic facilities.',
    cardExcerpt:
      'A deep technical look into ARNOBOT’s multi-sensor fusion pipeline enabling sub-centimeter autonomous mapping and path planning in underground tunnels and metallic structures.',
    heroThumb: '/assets/images/gcs_interface.png',
    heroImage: '/assets/images/gcs_interface.png',
    date: 'August 10, 2026',
    readTime: '8 min read',
    author: 'Software & Autonomy Division',
    role: 'Perception & Neural Systems Lab',
    takeaways: [
      'Multi-sensor fusion fuses 3D LiDAR point clouds, stereo visual odometry, and high-rate IMUs via Extended Kalman Filtering.',
      'Achieves sub-1.5 cm localization accuracy in subterranean tunnels, dense metal warehouses, and enclosed industrial plants without satellite fix.',
      'Real-time neural semantic segmentation detects personnel, moving equipment, and transient hazards within 20 milliseconds.',
      'Centralized Ground Control Station (GCS) provides 3D waypoint planning, dynamic geofencing, and automated return-to-base failsafes.',
    ],
    tags: ['LiDARSLAM', 'GPSDenied', 'AutonomousAI', 'SensorFusion', 'EdgeCompute', 'RoboticsGCS'],
    prevId: 2,
    nextId: 1,
    toc: [
      '1. GPS-Denied Autonomy Challenges',
      '2. 3D LiDAR & Visual-Inertial Fusion',
      '3. Dynamic Obstacle Costmaps',
      '4. Embedded Software Infrastructure',
      '5. Summary & Industrial Integration',
    ],
  },
};

export const BLOG_ARTICLE_LIST: readonly BlogArticle[] = Object.values(BLOG_ARTICLES);

function isArticleId(value: number): value is BlogArticleId {
  return Object.prototype.hasOwnProperty.call(BLOG_ARTICLES, value);
}

/** Mirrors blog-details.php: an unknown or missing id falls back to article 1. */
export function resolveArticleId(rawId: string | string[] | undefined): BlogArticleId {
  const raw = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = Number.parseInt(raw ?? '', 10);
  return isArticleId(id) ? id : 1;
}
