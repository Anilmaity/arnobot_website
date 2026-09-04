import type { Product, ProductId } from '@/types';

/**
 * Product data definitions from the official "Product data.docx",
 * ported from the $products array in product.php.
 */
const PRODUCTS: Readonly<Record<ProductId, Product>> = {
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
    heroImage: '/assets/images/products/saibya/saibya_hero.webp',
    heroImageAlt:
      'Saibya Max standing on a dirt track during a field trial, surveillance mast and amber beacon raised, out-of-focus greenery behind it',
    mainImage: '/assets/renders/saibya-hero.webp',
    brochure: '/assets/brochures/Saibya_Brochure.pdf',
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
    /* 72 frames, one every 5 degrees, rendered in Cycles from the Fusion OBJ
       (ArnobotDoc `02-Products/turntable.py`) with the matte-gunmetal body.
       No contact shadow is baked in — `.spin-frame` draws its own drop-shadow
       off the alpha, so a rendered one would double up.
       It opens on 18, the front-on pose. */
    spin: {
      dir: '/assets/renders/saibya-360',
      frames: 72,
      startIndex: 18,
      width: 720,
      height: 491,
    },
    /* Photographs of the machine, cropped to the cards' 3:2 rather than dropped
       in as portrait phone shots that `cover` then cut in half.
       Two builds exist and the difference is visible, so the cards say which is
       which: the turntable above and cards 1 and 3 are the standard Saibya —
       black deck, knobbly ATV tyres, front bumper bar, the platform these specs
       describe. Card 2 is Saibya Max, the larger surveillance fit with the mast,
       twin rear wheels and ribbed tyres. Every professional photograph Arnobot
       has of this product line is of the Max; the two standard-Saibya shots are
       field phone photographs, which is why they are the lower-resolution pair.
       All three clips are cut from the Santoor product shoot, which only ever
       filmed the Max — there is no footage of the standard build anywhere, so
       cards 1 and 3 pair a standard-Saibya still with a Max clip. Their titles
       are therefore build-neutral; only card 2, whose still is also the Max,
       names the build. Card 1 used to read "Defence Logistics & Field Trials";
       neither its still nor its clip carries a load, so "Logistics" is gone. */
    showcase: [
      {
        title: 'Defence Field Trials',
        img: '/assets/images/products/saibya/saibya_desert_trial.webp',
        video: '/assets/videos/products/saibya/saibya_hero_full.mp4',
      },
      {
        title: 'Saibya Max — Surveillance Fit Trials',
        img: '/assets/images/products/saibya/saibya_max_surveillance.webp',
        video: '/assets/videos/products/saibya/saibya_diadem_demo.mp4',
      },
      {
        title: 'Field Operations Demonstration',
        img: '/assets/images/products/saibya/saibya_solar_inspection.webp',
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
    // The loaded render, re-keyed off its own RGB: the shipped file left the
    // studio backdrop's grey under every transparent pixel, which WebP's chroma
    // subsampling then bled back out as a halo tracing the whole silhouette.
    heroImage: '/assets/images/products/atm/atm_hero.webp',
    heroImageAlt:
      'The camouflaged ATM towing a Honda CR-V across gravel at dusk, dust hanging in the SUV\'s headlights, ARNOBOT lettering legible along its flank',
    // ATM has no turntable, so the details band shows one image on the same
    // stage. It is a photograph of the machine working rather than the hero
    // render again — the render already fills the band above it, and showing it
    // twice on one screen said nothing the second time.
    stillRender: '/assets/images/products/atm/atm_field_grass.webp',
    mainImage: '/assets/renders/atm-hero.webp',
    // TODO: no PDF yet — the page falls back to "Request Brochure".
    brochure: '/assets/brochures/ATM_Brochure.pdf',
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
    /* The three cards used to carry two photographs of SAIBYA and a 200px crop
       upscaled 3.4×; they now carry ATM's own trial footage, one still per card.
       Card 1 opens the car-pull clip cut from the Car-Pull-2026-03-12 drone
       rushes — the machine towing a loaded SUV, which is the only footage that
       answers for "Heavy Load Transport". It lives at the site-root demo1.mp4
       because that file was already committed for ATM and this is what it now
       holds; the name is legacy, the content is not. Cards 2 and 3 share
       atm_vehicle_demo.mp4, the official demo reel, cut to the riverbed dust run
       — the reel is captioned in-picture by Arnobot, and this segment carries
       only the product name, not the two later cards that misspell "active". */
    showcase: [
      {
        title: 'Heavy Load Transport',
        img: '/assets/images/products/atm/atm_car_pull.webp',
        video: '/assets/videos/demo1.mp4',
      },
      {
        title: 'All-Terrain Field Operations',
        img: '/assets/images/products/atm/atm_dust_run.webp',
        video: '/assets/videos/products/atm/atm_vehicle_demo.mp4',
      },
      {
        title: 'Suspension & Drivetrain',
        img: '/assets/images/products/atm/atm_drivetrain.webp',
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
    heroImage: '/assets/images/products/nexus/nexus_hero.webp',
    heroImageAlt:
      'The wheeled NEXUS straddling a split tree root with both headlights lit, rocker arms articulated over the bark',
    mainImage: '/assets/renders/nexus-hero.webp',
    // TODO: no PDF yet — the page falls back to "Request Brochure".
    brochure: '/assets/brochures/Nexus_Brochure.pdf',
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
    /* Card 1 used to show a green four-wheeled buggy on blue-spoked RC wheels —
       a render of an older machine altogether, not this product. Both cards now
       carry photographs of Nexus in the field.
       Those photographs are of the WHEELED build; the hero and the turntable
       above are the TRACKED Mark-3. The two are visibly different machines, so
       the titles name the build rather than leaving a reader to assume the
       tracks in the viewer and the wheels in the cards are the same thing. */
    showcase: [
      {
        title: 'Wheeled Nexus — Invertible Drive Trial',
        img: '/assets/images/products/nexus/nexus_invertible_trial.webp',
        video: '/assets/videos/products/nexus/nexus_trial_1.mp4',
      },
      {
        title: 'Wheeled Nexus — Rough-Terrain Traverse',
        img: '/assets/images/products/nexus/nexus_root_traverse.webp',
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
    heroVideo: '/assets/videos/products/altius/cleaning-attachment.mp4',
    /* The front-on pose the spin below opens on, cut from the same turntable at
       the full resolution the render carries — the hero draws it across most of
       the screen, far larger than the turntable ever draws a frame, so it gets a
       still of its own rather than the set being encoded at hero size. It is
       the hero photograph is the Alang hull trial — the only footage that
       exists of this machine at work. The hero plays no video here. */
    heroImage: '/assets/images/products/altius/altius_hero.webp',
    heroImageAlt:
      'ALTIUS magnetised part-way up a ship hull on its tether at the Alang yard, two ARNOBOT operators in hard hats watching from the ground below',
    /* The turntable below replaces the still gallery on the page; this stays as
       the fallback any consumer that only knows about images still gets. */
    mainImage: '/assets/renders/altius-hero.webp',
    brochure: '/assets/brochures/Altius_Brochure.pdf',
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
    /* 72 frames, one every 5 degrees, rendered in Cycles from the Fusion OBJ
       (ArnobotDoc `02-Products/turntable.py`, `--up y`) with the top plate and
       shrouds on the same matte gunmetal as the Saibya deck, and the world HDRI
       raised to 1.0 — at the pipeline default of 0.25 a metallic body has nothing
       to reflect off these near-vertical surfaces and renders black.
       `mainImage` above is cut from frame 0 of this same set, so the two must be
       regenerated together.
       It opens on 0, the front-on pose. */
    spin: {
      dir: '/assets/renders/altius-360',
      frames: 72,
      startIndex: 0,
      width: 720,
      height: 513,
    },
    /* Two of these cards used to caption a flat CG orthographic view on white as
       a field trial, and the third captioned the Alang hull climb — the one
       genuinely photographic image on the product pages — as a payload test.
       Each title now describes what its still actually shows, and each still is
       a frame from Arnobot's own trial footage.
       The clips have since been cut and now match those titles too: card 1 is
       the branded climber running the wall in "Vertical Drive Check Phase 2"
       (shot portrait, cropped to landscape on the same framing as its still),
       card 2 is the Alang yard hull climb, card 3 is the operators working the
       tether and controller at the foot of that hull. The `cleaning-attachment`
       and `payload-capacity` filenames are legacy and describe footage that does
       not exist — Arnobot has never filmed a cleaning head or a payload test.
       The titles describe the clips; the filenames do not. */
    showcase: [
      {
        title: 'Magnetic Climb — Vertical Drive Trial',
        img: '/assets/images/products/altius/altius_wall_climb.webp',
        video: '/assets/videos/products/altius/cleaning-attachment.mp4',
      },
      {
        title: 'Ship Hull Climb — Alang Yard Trial',
        img: '/assets/images/products/altius/altius_alang_climb.webp',
        video: '/assets/videos/products/altius/payload-capacity.mp4',
      },
      {
        title: 'Ground Station Setup & Control',
        img: '/assets/images/products/altius/altius_groundstation.webp',
        video: '/assets/videos/products/altius/GroundStation_setup.mp4',
      },
    ],
  },
};

const DEFAULT_PRODUCT_ID: ProductId = 'saibya';

function isProductId(value: string): value is ProductId {
  return Object.prototype.hasOwnProperty.call(PRODUCTS, value);
}

/** Mirrors product.php: an unknown or missing `id` falls back to SAIBYA. */
export function resolveProduct(rawId: string | string[] | undefined): Product {
  const raw = Array.isArray(rawId) ? rawId[0] : rawId;
  const id = raw?.trim().toLowerCase() ?? '';
  return PRODUCTS[isProductId(id) ? id : DEFAULT_PRODUCT_ID];
}
