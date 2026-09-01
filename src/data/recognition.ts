/**
 * The "Rewards and Recognition" strip on the home page.
 *
 * Sourced from ARNOBOT's own award register (APL/AWARD/2526/01, "List Of Award
 * & Recognisation", 2025-26) plus the two press outlets that covered the
 * company. `image` is the awarding body's or outlet's mark, held in
 * public/assets/recognition/; the trophy photographs from that same document
 * are kept alongside in public/assets/recognition/trophies/ if the strip is
 * ever reworked to show the awards themselves rather than who gave them.
 *
 * The strip sits beneath the words "Trusted by leading companies", so an entry
 * reads to defence and industrial buyers as a claim the company stands behind.
 * Treat this list as published copy rather than decoration.
 *
 * `image` is optional: an entry without one falls back to `mark`, a monogram
 * set as a seal in the same tile, so a distinction can go up before its
 * artwork does.
 */
export const RECOGNITION: ReadonlyArray<{
  readonly id: string;
  /** The distinction, as the caption under the badge. */
  readonly title: string;
  /** Path under public/. */
  readonly image?: string;
  /** 2-4 letters — the awarding body, shown when there is no artwork. */
  readonly mark?: string;
}> = [
  {
    id: 'startup-maharathi-mahakumbh',
    title: 'Startup Maharathi at Startup Mahakumbh 2025 — Winner',
    image: '/assets/recognition/startup-mahakumbh.webp',
  },
  {
    id: 'robotics-startup-of-the-year',
    title: 'Robotics Startup of the Year 2025 — World STEM & Robotics Olympiad',
    image: '/assets/recognition/wsro.webp',
  },
  {
    id: 'startup-demo-day-kpgu',
    title: 'Startup Demo Day 2025 at KPGU Vadodara, on National Startup Day',
    image: '/assets/recognition/kpgu-vadodara.png',
  },
  {
    id: 'karnavati-distinguished-lecture',
    title: 'Distinguished Lecture on Startups & Ecosystem — Karnavati University',
    image: '/assets/recognition/karnavati-university.png',
  },
  {
    id: 'pride-of-gujarat-defence',
    title: 'Pride of Gujarat, Defence category — Vibrant Gujarat 2026, Rajkot',
    image: '/assets/recognition/vibrant-gujarat.png',
  },
  {
    id: 'gujarat-first-coverage',
    title: 'Featured on Gujarat First News',
    image: '/assets/recognition/gujarat-first-news.png',
  },
  {
    id: 'city-bhaskar-coverage',
    title: 'Featured on City Bhaskar (Divya Bhaskar)',
    image: '/assets/recognition/city-bhaskar-divya-bhaskar.png',
  },
];
