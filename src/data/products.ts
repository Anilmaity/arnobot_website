import type { Product, ProductId } from '@/types';

/**
 * Product data definitions from the official "Product data.docx",
 * ported from the $products array in product.php.
 */
export const PRODUCTS: Readonly<Record<ProductId, Product>> = {
  saibya: {
    id: 'saibya',
    name: 'SAIBYA',
    subtitle: '(Heavy-Duty UGV)',
    heroTitleLines: ['Robots for ', 'the Future'],
    heroBg: '/assets/images/hero-bg.png',
    heroVideo: '/assets/videos/products/saibya/saibya_hero_full.mp4',
    /* The front-on pose the turntable opens on, at the render's full resolution;
       see the note on ALTIUS below. The hero plays no video here; the clip it
       used to autoplay is the first card in the showcase band. */
    heroImage: '/assets/renders/saibya-hero.webp',
    mainImage: '/assets/images/products/saibya/saibya_main.png',
    brochure: '/assets/brochures/Saibya_Brochure.pdf',
    gallery: [
      '/assets/images/products/saibya/saibya_main.png',
      '/assets/images/products/saibya/product_saibya.png',
      '/assets/images/products/saibya/saibya_1.jpg',
      '/assets/images/products/saibya/saibya_2.jpg',
      '/assets/images/products/saibya/saibya_3.jpg',
      '/assets/images/products/saibya/saibya_4.jpg',
      '/assets/images/products/saibya/saibya_5.jpg',
      '/assets/images/products/saibya/saibya_6.jpg',
      '/assets/images/products/saibya/saibya_8.jpg',
      '/assets/images/products/saibya/saibya_9.jpg',
      '/assets/images/products/saibya/field_trial_1.jpg',
      '/assets/images/products/saibya/field_trial_3.jpg',
    ],
    overview:
      'SAIBYA is a rugged, high-payload unmanned ground vehicle designed for defence logistics, hazardous material transport, industrial inspection, and mission-critical ground operations.',
    specs: [
      ['Type', 'Unmanned Ground Vehicle (UGV)'],
      ['Payload Capacity', '200 kg'],
      ['Drive System', '4×4 All-Terrain Drive'],
    ],
    features: [
      '200 kg payload capacity',
      '4×4 high-traction drive',
      'Stair-climbing & all-terrain mobility',
      'Remote, semi-autonomous & fully autonomous control',
      'Modular attachment capability',
    ],
    applications: [
      'Defence logistics & supply transport',
      'Ammunition carriage',
      'Industrial material handling',
      'Towing & surveillance',
      'Disaster response',
    ],
    /* The lists above, marked with an icon each. Same wording, trimmed only
       where the icon already says it. */
    featureItems: [
      { icon: 'payload', lead: '200 kg', label: 'payload capacity' },
      { icon: 'drive', lead: '4×4', label: 'high-traction drive' },
      { icon: 'stairs', label: 'Stair-climbing & all-terrain mobility' },
      { icon: 'control', label: 'Remote, semi-autonomous & fully autonomous control' },
      { icon: 'modular', label: 'Modular attachment capability' },
    ],
    applicationItems: [
      { icon: 'defence', label: 'Defence logistics & supply transport' },
      { icon: 'ammunition', label: 'Ammunition carriage' },
      { icon: 'industrial', label: 'Industrial material handling' },
      { icon: 'towing', label: 'Towing & surveillance' },
      { icon: 'disaster', label: 'Disaster response' },
    ],
    /* 72 frames, one every 5 degrees, keyed out of the KeyShot studio render.
       It opens on 44, the front-on pose. */
    spin: {
      dir: '/assets/renders/saibya-360',
      frames: 72,
      startIndex: 44,
      width: 720,
      height: 491,
    },
    showcase: [
      {
        title: 'Defence Logistics & Field Trials',
        img: '/assets/images/products/saibya/field_trial_1.jpg',
        video: '/assets/videos/products/saibya/saibya_hero_full.mp4',
      },
      {
        title: 'All-Terrain Dynamic Trials',
        img: '/assets/images/products/saibya/saibya_main.png',
        video: '/assets/videos/products/saibya/saibya_diadem_demo.mp4',
      },
      {
        title: 'Field Operations Demonstration',
        img: '/assets/images/products/saibya/field_trial_3.jpg',
        video: '/assets/videos/products/saibya/saibya_whatsapp_demo1.mp4',
      },
    ],
  },

  atm: {
    id: 'atm',
    name: 'ATM',
    subtitle: '(High-Payload UGV)',
    heroTitleLines: ['Any Terrain ', 'Machine'],
    heroBg: '/assets/images/hero-bg.png',
    heroVideo: '/assets/videos/products/atm/atm_vehicle_demo.mp4',
    // The loaded render is the hero, as on the other three products. The demo
    // clip above is no longer played here — it stays reachable from the Heavy
    // Load Transport card in Product Showcase & Operations below.
    heroImage: '/assets/renders/atm-hero.webp',
    // The same render carries the details band, on the turntable's own stage.
    // ATM has no 360 frame set, so `stillRender` shows the one render rather
    // than a strip of photographs of it. The field photographs are still in
    // public/assets/images/products/atm/ if the gallery is ever wanted back.
    stillRender: '/assets/renders/atm-hero.webp',
    mainImage: '/assets/renders/atm-hero.webp',
    // TODO: no PDF yet — the page falls back to "Request Brochure".
    brochure: '/assets/brochures/ATM_Brochure.pdf',
    gallery: [],
    overview:
      "ATM is Arnobot's highest-capacity unmanned ground vehicle, built to move heavy loads across worksite and field terrain with stability where lighter platforms cannot operate.",
    specs: [
      ['Type', 'Unmanned Ground Vehicle (UGV)'],
      ['Payload Capacity', '500 kg'],
      ['Drive System', 'All-Terrain Drive with Suspension'],
    ],
    features: [
      '500 kg payload capacity',
      'Front & rear suspension for load stability',
      'Remote & autonomous control',
      'Modular attachment capability',
      'Real-time telemetry & video feed',
    ],
    applications: [
      'Heavy material transport & logistics',
      'Towing',
      'Industrial site operations',
      'Surveillance',
      'Grass cutting',
    ],
    featureItems: [
      { icon: 'payload', lead: '500 kg', label: 'payload capacity' },
      { icon: 'suspension', label: 'Front & rear suspension for load stability' },
      { icon: 'control', label: 'Remote & autonomous control' },
      { icon: 'modular', label: 'Modular attachment capability' },
      { icon: 'feed', label: 'Real-time telemetry & video feed' },
    ],
    applicationItems: [
      { icon: 'transport', label: 'Heavy material transport & logistics' },
      { icon: 'towing', label: 'Towing' },
      { icon: 'industrial', label: 'Industrial site operations' },
      { icon: 'surveillance', label: 'Surveillance' },
      { icon: 'grass', label: 'Grass cutting' },
    ],
    // ATM ships only one clip (atm_vehicle_demo.mp4), so all three cards open
    // it. Point each at its own footage as more is captured.
    showcase: [
      {
        title: 'Heavy Load Transport',
        img: '/assets/images/products/atm/atm_field_1.jpg',
        video: '/assets/videos/products/atm/atm_vehicle_demo.mp4',
      },
      {
        title: 'All-Terrain Field Operations',
        img: '/assets/images/products/atm/atm_field_7.jpg',
        video: '/assets/videos/products/atm/atm_vehicle_demo.mp4',
      },
      {
        title: 'Suspension & Drivetrain',
        img: '/assets/images/products/atm/atm_wheel.png',
        video: '/assets/videos/products/atm/atm_vehicle_demo.mp4',
      },
    ],
  },

  nexus: {
    id: 'nexus',
    name: 'NEXUS',
    subtitle: '(Compact Tactical Robot)',
    heroTitleLines: ['Rapid Tactical ', 'Reconnaissance'],
    heroBg: '/assets/images/hero-bg.png',
    heroVideo: '/assets/videos/products/nexus/nexus_trial_1.mp4',
    /* The front-on pose the turntable opens on, at the render's full resolution;
       see the note on ALTIUS below. The hero plays no video here — the clip it
       used to autoplay is the first card in the showcase band. */
    heroImage: '/assets/renders/nexus-hero.webp',
    mainImage: '/assets/images/products/nexus/nexus_perspective.png',
    // TODO: no PDF yet — the page falls back to "Request Brochure".
    brochure: '/assets/brochures/Nexus_Brochure.pdf',
    gallery: [
      '/assets/images/products/nexus/nexus_perspective.png',
      '/assets/images/products/nexus/nexus_front.jpg',
      '/assets/images/products/nexus/nexus_top.png',
      '/assets/images/products/nexus/nexus_right.png',
      '/assets/images/products/nexus/nexus_back.png',
      '/assets/images/products/nexus/nexus_render_1.jpg',
      '/assets/images/products/nexus/nexus_render_2.jpg',
      '/assets/images/products/nexus/nexus_render_3.jpg',
      '/assets/images/products/nexus/nexus_render_4.jpg',
    ],
    overview:
      'A lightweight, portable tactical robot primarily designed for surveillance, reconnaissance, and rapid tactical deployment in confined and high-risk spaces.',
    specs: [
      ['Type', 'Compact Tactical Ground Robot'],
      ['Weight Class', '3 kg'],
    ],
    features: [
      'Ultra-lightweight (3 kg)',
      'Fully invertible — drives upside down',
      'Onboard camera with live video feed',
      'Encrypted remote tactical control',
      'Rapid deployment capability',
    ],
    applications: [
      'Defence surveillance',
      'Tactical & urban reconnaissance',
      'Indoor security inspection',
      'Border monitoring',
      'High-risk area scouting',
    ],
    featureItems: [
      { icon: 'lightweight', lead: '3 kg', label: 'ultra-lightweight platform' },
      { icon: 'invertible', label: 'Fully invertible — drives upside down' },
      { icon: 'feed', label: 'Onboard camera with live video feed' },
      { icon: 'encrypted', label: 'Encrypted remote tactical control' },
      { icon: 'rapid', label: 'Rapid deployment capability' },
    ],
    applicationItems: [
      { icon: 'defence', label: 'Defence surveillance' },
      { icon: 'recon', label: 'Tactical & urban reconnaissance' },
      { icon: 'building', label: 'Indoor security inspection' },
      { icon: 'border', label: 'Border monitoring' },
      { icon: 'radar', label: 'High-risk area scouting' },
    ],
    /* 72 frames, one every 5 degrees, keyed out of the KeyShot studio render.
       It opens on 9, the front-on pose. */
    spin: {
      dir: '/assets/renders/nexus-360',
      frames: 72,
      startIndex: 9,
      width: 720,
      height: 526,
    },
    showcase: [
      {
        title: 'Invertible Reconnaissance Demo',
        img: '/assets/images/products/nexus/nexus_render_1.jpg',
        video: '/assets/videos/products/nexus/nexus_trial_1.mp4',
      },
      {
        title: 'Tactical Mobility & Scouting',
        img: '/assets/images/products/nexus/nexus_front.jpg',
        video: '/assets/videos/products/nexus/nexus_trial_2.mp4',
      },
    ],
  },

  altius: {
    id: 'altius',
    name: 'ALTIUS',
    subtitle: '(Vertical Climbing Robot)',
    heroTitleLines: ['Vertical Climbing ', 'Robotics'],
    heroBg: '/assets/images/hero-bg.png',
    heroVideo: '/assets/videos/products/altius/Cleaning Attachment.mp4',
    /* The front-on pose the spin below opens on, cut from the same turntable at
       the full resolution the render carries — the hero draws it across most of
       the screen, far larger than the turntable ever draws a frame, so it gets a
       still of its own rather than the set being encoded at hero size. It is
       held to the right of the band by the still-hero rules in globals.css so
       it clears the title column. The hero plays no video here. */
    heroImage: '/assets/renders/altius-hero.webp',
    /* The turntable below replaces the still gallery on the page; this stays as
       the fallback any consumer that only knows about images still gets. */
    mainImage: '/assets/renders/altius-hero.webp',
    brochure: '/assets/brochures/Altius_Brochure.pdf',
    gallery: [],
    overview:
      'ALTIUS is a vertical climbing robot built for advanced inspection, cleaning and monitoring of high-altitude and hard to reach places for ferromagnetic surfaces.',
    specs: [
      ['Type', 'Vertical Climbing Robot'],
      ['Vertical Payload', '30 kg'],
    ],
    features: [
      '30 kg vertical payload capacity',
      'Magnetic grip for secure climbing on steel surfaces',
      'Interchangeable tooling support',
      'Real-time video transmission',
      'Rugged industrial build',
    ],
    applications: [
      'Infrastructure inspection',
      'Industrial cleaning at height',
      'Surface painting & sand blasting',
      'Industrial surveillance',
      'Critical asset mapping',
    ],
    featureItems: [
      { icon: 'payload', lead: '30 kg', label: 'vertical payload capacity' },
      { icon: 'magnet', label: 'Magnetic grip for secure climbing on steel surfaces' },
      { icon: 'tooling', label: 'Interchangeable tooling support' },
      { icon: 'transmit', label: 'Real-time video transmission' },
      { icon: 'rugged', label: 'Rugged industrial build' },
    ],
    applicationItems: [
      { icon: 'bridge', label: 'Infrastructure inspection' },
      { icon: 'spray', label: 'Industrial cleaning at height' },
      { icon: 'paint', label: 'Surface painting & sand blasting' },
      { icon: 'surveillance', label: 'Industrial surveillance' },
      { icon: 'mapping', label: 'Critical asset mapping' },
    ],
    /* 72 frames, one every 5 degrees, keyed out of the KeyShot studio render.
       It opens on 63, the front-on pose. */
    spin: {
      dir: '/assets/renders/altius-360',
      frames: 72,
      startIndex: 63,
      width: 720,
      height: 513,
    },
    showcase: [
      {
        title: 'Cleaning Attachment Trial',
        img: '/assets/images/products/altius/altius_field_1.jpg',
        video: '/assets/videos/products/altius/Cleaning Attachment.mp4',
      },
      {
        title: 'Payload Capacity Test',
        img: '/assets/images/products/altius/altius_field_10.jpg',
        video: '/assets/videos/products/altius/Payload Capacity.mp4',
      },
      {
        title: 'GroundStation Setup & Control',
        img: '/assets/images/products/altius/altius_field_3.jpg',
        video: '/assets/videos/products/altius/GroundStation_setup.mp4',
      },
    ],
  },
};

export const DEFAULT_PRODUCT_ID: ProductId = 'saibya';

export const PRODUCT_IDS = Object.keys(PRODUCTS) as readonly ProductId[];

function isProductId(value: string): value is ProductId {
  return Object.prototype.hasOwnProperty.call(PRODUCTS, value);
}

/** Mirrors product.php: an unknown or missing `id` falls back to SAIBYA. */
export function resolveProduct(rawId: string | string[] | undefined): Product {
  const raw = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = raw?.trim().toLowerCase() ?? '';
  return PRODUCTS[isProductId(id) ? id : DEFAULT_PRODUCT_ID];
}
