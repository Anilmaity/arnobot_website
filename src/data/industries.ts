import type { Industry, IndustryId } from '@/types';

/**
 * Industry detail copy shown in the home-page modal — ported from the
 * `industryData` object that lived inside assets/js/main.js.
 */
const INDUSTRIES: Readonly<Record<IndustryId, Industry>> = {
  defence: {
    id: 'defence',
    title: 'Defence & Security',
    desc: 'Critical operations in hazardous and combat zones. ARNOBOT designs autonomous unmanned ground platforms to handle scouting, route monitoring, and remote tactical supply delivery without risking human lives.',
    robots: [
      {
        name: 'ATM',
        desc: 'Any Terrain Machine. High-clearance heavy chassis designed to scale rocky industrial slopes.',
        image: '/assets/images/card-atm-tile.webp',
        specs: ['All-Terrain', 'Chassis-Suspension', '4x4 Drive', 'Dual GPS'],
      },
      {
        name: 'SAIBYA',
        desc: 'Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200\u00A0kg.',
        image: '/assets/images/card-saibya-tile.webp',
        specs: ['UGV', '200kg Load', '4x4 Drive', 'LiDAR SLAM'],
      },
      {
        name: 'NEXUS',
        desc: 'Tactical UGV platform optimized for perimeter patrol, tactical surveillance, and security integrations.',
        image: '/assets/images/card-nexus-tile.webp',
        specs: ['Tactical UGV', 'LiDAR', 'Thermal Cam', 'Mesh Network'],
      },
    ],
  },

  maritime: {
    id: 'maritime',
    title: 'Maritime & Marine',
    desc: 'Extreme saltwater environments require high-grade rugged robotic crawlers. ARNOBOT platforms inspect vessel hull walls, clean biofouling, and monitor harbor gates efficiently.',
    robots: [
      {
        name: 'ALTIUS',
        desc: 'Magnetic climbing robotic system designed for vertical steel wall inspection and cleaning.',
        image: '/assets/images/card-altius-tile.webp',
        specs: ['Climbing Robot', 'Magnetic', 'IP67 Waterproof', 'NDT Scan'],
      },
    ],
  },

  power: {
    id: 'power',
    title: 'Power & Utilities',
    desc: 'High-voltage switchyards, transformers, and nuclear facilities expose humans to intense safety risks. ARNOBOT robots replace personnel in routine inspections and critical structural mapping.',
    robots: [
      {
        name: 'ATM',
        desc: 'Any Terrain Machine. High-clearance heavy chassis designed to scale rocky industrial slopes.',
        image: '/assets/images/card-atm-tile.webp',
        specs: ['All-Terrain', 'Chassis-Suspension', '4x4 Drive', 'Dual GPS'],
      },
      {
        name: 'SAIBYA',
        desc: 'Rugged multi-mission ground platform carrying specialized sensor modules.',
        image: '/assets/images/card-saibya-tile.webp',
        specs: ['UGV', 'Modular Platform', 'Gas Sniffer', 'Thermal Engine'],
      },
    ],
  },

  industrial: {
    id: 'industrial',
    title: 'Industrial Operations',
    desc: 'Steel mills, smelting plants, paper mills, and chemical warehouses are hot, hazardous, and noisy. ARNOBOT platforms automate heavy material transport and structural inspection.',
    robots: [
      {
        name: 'SAIBYA',
        desc: 'Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200\u00A0kg.',
        image: '/assets/images/card-saibya-tile.webp',
        specs: ['UGV', 'Heavy Load', 'IP65 Weatherproof', 'Auto-Charger'],
      },
    ],
  },

  infrastructure: {
    id: 'infrastructure',
    title: 'Critical Infrastructure',
    desc: 'Railways, deep tunnels, dams, and remote cellular towers require continuous structural monitoring. ARNOBOT platforms scale long corridors and vertical walls without downtime.',
    robots: [
      {
        name: 'SAIBYA',
        desc: 'Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200\u00A0kg.',
        image: '/assets/images/card-saibya-tile.webp',
        specs: ['UGV', 'Heavy Load', 'IP65 Weatherproof', 'Auto-Charger'],
      },
      {
        name: 'ATM',
        desc: 'Any Terrain Machine. Heavy suspension chassis equipped with 3D LiDAR for spatial mapping.',
        image: '/assets/images/card-atm-tile.webp',
        specs: ['All-Terrain', 'LiDAR Mapping', 'GPS-Denied Navigation', 'Obstacle Avoidance'],
      },
    ],
  },

  asset: {
    id: 'asset',
    title: 'Asset Protection',
    desc: 'Continuous facility protection demands reliable 24/7 coverage. ARNOBOT platforms autonomously navigate preset paths, detect intruders, and report anomalies instantaneously.',
    robots: [
      {
        name: 'NEXUS',
        desc: 'Tactical surveillance UGV equipped with thermal imaging cameras, sirens, and obstacle avoidance.',
        image: '/assets/images/card-nexus-tile.webp',
        specs: ['Tactical Patrol', 'Thermal Analytics', 'LiDAR Avoidance', 'IP65 Waterproof'],
      },
    ],
  },

  solar: {
    id: 'solar',
    title: 'Solar Projects',
    desc: 'Dust buildup reduces solar farm output significantly. ARNOBOT provides specialized, lightweight tracking robots that clean solar panel assemblies without using water.',
    robots: [
      {
        name: 'SAIBYA',
        desc: 'Rugged heavy-payload unmanned ground vehicle (UGV). Supports payloads up to 200\u00A0kg.',
        image: '/assets/images/card-saibya-tile.webp',
        specs: ['UGV', 'Heavy Load', 'IP65 Weatherproof', 'Auto-Charger'],
      },
      {
        name: 'ALTIUS',
        desc: 'Vertical climbing robot customized with panel track guidance and high-efficiency waterless brush arrays.',
        image: '/assets/images/card-altius-tile.webp',
        specs: ['Lightweight UGV', 'Waterless Cleaning', 'Solar Special', 'Fast Brush'],
      },
    ],
  },
};

export function getIndustry(id: string | null | undefined): Industry | undefined {
  if (!id) return undefined;
  return Object.prototype.hasOwnProperty.call(INDUSTRIES, id)
    ? INDUSTRIES[id as IndustryId]
    : undefined;
}

/**
 * The cards rendered in the home-page industries slider, in display order.
 *
 * Every picture is a photograph of our own hardware on a real trial — the card
 * art used to be generated imagery, including a weaponised turret vehicle we do
 * not build. `alt` says what the frame actually shows rather than restating the
 * label above it, so the two are not read as the same sentence twice.
 *
 * The image area is 190px tall and about 279px wide on a 1440px screen, and it
 * sits under `grayscale(80%)` until the card is hovered. Two consequences the
 * card art has to respect: lettering on the machine is a smudge at that size,
 * so nothing legible can be claimed for it, and the frames have to separate on
 * composition and tone rather than on colour.
 *
 * `defence` and `industrial` were both re-shot from the 60 MP Saibya Max set
 * for that reason. Defence was a soft, distant frame against a blank overcast
 * sky whose alt asserted "Indian Army markings" that are four pixels wide on
 * the card; industrial was a pair of gloved hands fitting a wheel to a bare
 * chassis on a studio sweep — a person, not a machine, and not a real place.
 *
 * Note `power` and `asset` exist in INDUSTRIES (they are reachable from the
 * modal) but have never had a card here.
 */
export const HOME_INDUSTRY_CARDS: ReadonlyArray<{
  readonly id: IndustryId;
  readonly label: string;
  readonly image: string;
  readonly alt: string;
}> = [
  {
    id: 'defence',
    label: 'Defence & Security',
    image: '/assets/images/card-industry-defence-v2.webp',
    alt: 'Saibya Max surveillance UGV working through dry scrub below a weathered compound wall, mast and beacon up',
  },
  {
    id: 'maritime',
    label: 'Maritime & Shipbuilding',
    image: '/assets/images/card-industry-maritime.webp',
    alt: 'Two ARNOBOT engineers in hard hats watching an ALTIUS crawler climb a ship hull at the Alang yard',
  },
  {
    id: 'industrial',
    label: 'Industrial Operations',
    image: '/assets/images/card-industry-industrial-v2.webp',
    alt: 'Saibya Max heavy-payload UGV standing on a compacted earth haul track at a site trial',
  },
  {
    id: 'infrastructure',
    label: 'Critical Infrastructure',
    image: '/assets/images/card-industry-infra.webp',
    alt: 'ATM Any Terrain Machine crossing open ground below a high-voltage transmission tower',
  },
  {
    id: 'solar',
    label: 'Solar Projects',
    image: '/assets/images/card-industry-solar.webp',
    alt: 'ATM Any Terrain Machine parked on open ground at a site survey',
  },
];
