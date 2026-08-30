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
      'Real-time telemetry & video feed',
    ],
    applications: [
      'Defence logistics & supply transport',
      'Ammunition carriage',
      'Industrial material handling',
      'Towing & surveillance',
      'Disaster response',
      'Hazardous zone deployment',
    ],
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
    mainImage: '/assets/images/products/atm/atm_main.png',
    brochure: '/assets/brochures/Saibya_Brochure.pdf',
    gallery: [
      '/assets/images/products/atm/atm_main.png',
      '/assets/images/products/atm/field_trial_5.jpg',
      '/assets/images/products/atm/field_trial_6.jpg',
    ],
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
    // No showcase — the block was commented out in the original product.php.
  },

  nexus: {
    id: 'nexus',
    name: 'NEXUS',
    subtitle: '(Compact Tactical Robot)',
    heroTitleLines: ['Rapid Tactical ', 'Reconnaissance'],
    heroBg: '/assets/images/hero-bg.png',
    heroVideo: '/assets/videos/products/nexus/nexus_trial_1.mp4',
    mainImage: '/assets/images/products/nexus/nexus_perspective.png',
    brochure: '/assets/brochures/Saibya_Brochure.pdf',
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
      'Low acoustic signature',
    ],
    applications: [
      'Defence surveillance',
      'Tactical & urban reconnaissance',
      'Indoor security inspection',
      'Border monitoring',
      'High-risk area scouting',
    ],
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
    mainImage: '/assets/images/products/altius/altius_main.jpg',
    brochure: '/assets/brochures/Altius_Brochure.pdf',
    gallery: [
      '/assets/images/products/altius/altius_main.jpg',
      '/assets/images/products/altius/altius_field_1.jpg',
      '/assets/images/products/altius/altius_field_2.jpg',
      '/assets/images/products/altius/altius_field_3.jpg',
      '/assets/images/products/altius/altius_field_4.jpg',
      '/assets/images/products/altius/altius_field_5.jpg',
      '/assets/images/products/altius/altius_field_6.jpg',
      '/assets/images/products/altius/altius_field_7.jpg',
      '/assets/images/products/altius/altius_field_8.jpg',
      '/assets/images/products/altius/altius_field_9.jpg',
      '/assets/images/products/altius/altius_field_10.jpg',
    ],
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
      'Data analytics integration',
      'Rugged industrial build',
    ],
    applications: [
      'Infrastructure inspection',
      'Industrial cleaning at height',
      'Surface painting & sand blasting',
      'Industrial surveillance',
      'Critical asset mapping',
    ],
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
