import type { Metadata } from 'next';
import Cta from '@/components/sections/Cta';
import Ticker, { type TickerItem } from '@/components/sections/Ticker';
import PressReleaseList from '@/components/sections/press/PressReleaseList';
import { PRESS_RELEASES } from '@/data/pressReleases';

export const metadata: Metadata = {
  title: 'Press Releases & Official Announcements',
  description: 'Newsroom and media relations — official ARNOBOT dispatches and announcements.',
};

const TICKER_ITEMS: readonly TickerItem[] = [
  {
    title: 'DEFENSE & TACTICAL UGVs',
    text: 'SAIBYA All-Terrain Autonomous Reconnaissance & Perimeter Defense',
  },
  {
    title: 'INDUSTRIAL CLIMBING ROBOTICS',
    text: 'ALTIUS Magnetic Crawlers for Zero-Scaffolding NDT Inspections',
  },
  {
    title: 'GPS-DENIED AUTONOMY',
    text: 'Multi-Modal 3D LiDAR SLAM with Sub-Centimeter Edge Localization',
  },
  {
    title: 'ENCRYPTED C2 TELEMETRY',
    text: 'Anti-Jamming Dynamic Mesh Communications & Swarm Cockpits',
  },
  {
    title: 'ASSET SAFETY EXCELLENCE',
    text: 'API 653 & ASME Compliant Confined-Space Ultrasonic Audits',
  },
];

/** Port of press-release.php */
export default function PressReleasePage() {
  return (
    <main className="press-page">
      <section className="press-hero" id="press-hero" data-cinematic-hero>
        <div className="press-hero-container">
          <div className="press-hero-content reveal">
            <span className="eyebrow">Newsroom &amp; Media Relations</span>
            <h1 className="russo">
              Press Releases &amp;
              <br />
              Official Announcements
            </h1>
          </div>

          <div className="press-hero-visual reveal" aria-hidden="true">
            <div className="press-visual-stage">
              <div className="press-orbit-ring press-orbit-ring-1" />
              <div className="press-orbit-ring press-orbit-ring-2" />
              <div className="press-visual-glow" />
              <div className="press-visual-main-img">
                <img src="/assets/images/product-saibya.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker items={TICKER_ITEMS} label="Live Industry Focus Ticker" />

      <section className="press-main-section">
        <div className="press-container">
          <PressReleaseList releases={PRESS_RELEASES} />
        </div>
      </section>

      <Cta />
    </main>
  );
}
