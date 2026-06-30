export interface Product {
  id: string;
  num: string;
  name: string;
  type: string;
  desc: string;
  img: string | null;
  brochure: string | null;
  features: string[];
  apps: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'saibya',
    num: '01',
    name: 'SAIBYA',
    type: 'Heavy-Duty UGV',
    desc: 'Robots for the future. A rugged, EV-based unmanned ground vehicle with stair-climbing capability — built for defence logistics, hazardous transport, and mission-critical ground operations.',
    img: '/uploads/saibya-nobg.png',
    brochure: '/uploads/Saibya_Brochure.pdf',
    features: [
      'EV-based mobility',
      'Stair climbing capability',
      'Wireless drive',
      'Rugged design',
      'Supports access to advancements',
      'Modular attachment system',
    ],
    apps: ['Defence Logistics', 'Ammunition Carriage', 'Industrial Handling', 'Disaster Response', 'Hazardous Zone Ops'],
  },
  {
    id: 'nexus',
    num: '02',
    name: 'NEXUS',
    type: 'Compact Tactical Robot',
    desc: 'Ultra-lightweight tracked tactical robot for surveillance, reconnaissance, and rapid deployment in high-risk environments.',
    img: '/uploads/nexus-nobg.png',
    brochure: null,
    features: [
      'Ultra-lightweight compact build',
      'HD camera system',
      'Remote tactical control',
      'Rapid deployment',
      'Low acoustic signature',
    ],
    apps: ['Defence Surveillance', 'Tactical Recon', 'Indoor Security', 'Border Monitoring', 'High-risk Scouting'],
  },
  {
    id: 'altius',
    num: '03',
    name: 'ALTIUS',
    type: 'Vertical Climbing Robot',
    desc: 'Robots that climb. An EV-based, waterproof magnetic climbing robot with cloud-based monitoring — built for inspection and cleaning of ferromagnetic surfaces in maritime, oil & gas, and manufacturing.',
    img: '/uploads/altius-nobg.png',
    brochure: '/uploads/Altius_Brochure.pdf',
    features: [
      'Magnetic wall climbing (IP-65)',
      'EV-based & wireless drive',
      'Multiple payload support',
      'Cloud-based monitoring platform',
      'Continuous power from station',
      'Modular tool capability',
    ],
    apps: ['Ship Hull Inspection', 'Oil & Gas', 'Manufacturing Inspection', 'Maritime Cleaning', 'Infrastructure Monitoring'],
  },
  {
    id: 'atm',
    num: '04',
    name: 'ATM',
    type: 'Any Terrain Machine',
    desc: "ARNOBOT's versatile unmanned ground vehicle engineered for reliable payload transport across slopes, stairs, and desert sands. Available in Remote, Semi-autonomous, and fully Autonomous variants.",
    img: '/uploads/WhatsApp Image 2026-04-08 at 10.08.30 PM.jpeg',
    brochure: null,
    features: [
      '140×90×90 cm frame · 150 kg weight',
      'Up to 500 kg payload capacity',
      '90 mm ground clearance',
      'Front & rear suspension',
      'Rear wheel drive',
      '60V 45Ah LFP battery · Autonomous available',
    ],
    apps: ['Surveillance', 'Defence Logistics', 'Towing', 'Grass Cutting', 'Search & Rescue', 'Industrial Transport'],
  },
];

export const INDUSTRIES: { name: string; tag: string }[] = [
  { name: 'Defence & Military', tag: 'Primary Sector' },
  { name: 'Oil & Gas', tag: 'Industrial' },
  { name: 'Maritime & Naval', tag: 'Industrial' },
  { name: 'Power Generation', tag: 'Infrastructure' },
  { name: 'Heavy Manufacturing', tag: 'Industrial' },
  { name: 'Disaster Response', tag: 'Emergency' },
  { name: 'Smart Infrastructure', tag: 'Infrastructure' },
  { name: 'Homeland Security', tag: 'Defence' },
];

export const TECH_CELLS: { icon: string; title: string; desc: string }[] = [
  { icon: '👁', title: 'Computer Vision', desc: 'Real-time defect detection and visual analytics on industrial and ferromagnetic surfaces.' },
  { icon: '📡', title: 'Sensor Fusion', desc: 'Multi-sensor integration — LiDAR, IMU, ultrasonic, and thermal data combined.' },
  { icon: '🧭', title: 'Autonomous Nav', desc: 'Semi and fully autonomous path planning for complex unstructured terrain.' },
  { icon: '☁', title: 'Cloud Dashboard', desc: 'Centralised remote monitoring, live telemetry, and data analytics.' },
];

export const VALUES: string[] = [
  'Engineering Excellence',
  'Safety First',
  'Client-Centric Innovation',
  'Data-Driven Decisions',
  'Made in India',
];

export const JOBS: { title: string; dept: string; type: string; loc: string }[] = [
  { title: 'Robotics Software Engineer', dept: 'Engineering', type: 'Full-time', loc: 'Ahmedabad' },
  { title: 'Mechanical Design Engineer (UGV)', dept: 'Hardware', type: 'Full-time', loc: 'Ahmedabad' },
  { title: 'Computer Vision Engineer', dept: 'AI / ML', type: 'Full-time', loc: 'Ahmedabad' },
  { title: 'Business Development Manager', dept: 'Sales', type: 'Full-time', loc: 'Pan India' },
  { title: 'Embedded Systems Engineer', dept: 'Engineering', type: 'Full-time', loc: 'Ahmedabad' },
];

export const CREDS: string[] = ['DPIIT', 'MSME', 'DGFT', 'SSIP', 'iHUB', 'KPGU'];
