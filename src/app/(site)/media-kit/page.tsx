import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import Ticker, { type TickerItem } from '@/components/sections/Ticker';
import BoilerplateCard from '@/components/sections/mediakit/BoilerplateCard';
import { DownloadIcon } from '@/components/ui/Icons';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Media Kit & Brand Assets',
  description: 'Official ARNOBOT boilerplate, brand logos, product renders and press contacts.',
};

const TICKER_ITEMS: readonly TickerItem[] = [
  { title: 'OFFICIAL BRAND ASSETS', text: 'High-Resolution Logos, Product Renders & Leadership Headshots' },
  { title: 'MISSION-CRITICAL ROBOTICS', text: 'Autonomous Ground Platforms for Contested & Hazardous Zones' },
  { title: 'PRESS RELATIONS DESK', text: 'Fast-Response Executive Interviews & Media Statements' },
  { title: 'MAKE IN INDIA ROBOTICS', text: '100% In-House Hardware, Avionics & Autonomy Perception Stack' },
];

const BOILERPLATE =
  'ARNOBOT is an advanced robotics and deep-tech innovation company developing mission-critical autonomous ground vehicles (UGVs) and magnetic climbing crawlers. Engineered to replace human personnel in non-permissive defense environments and hazardous confined industrial spaces, ARNOBOT combines sub-centimeter GPS-denied 3D LiDAR SLAM, encrypted multi-link mesh telemetry, and ruggedized all-terrain mobility to safeguard lives and automate critical inspection operations.';

const FAST_FACTS: ReadonlyArray<{ readonly label: string; readonly value: ReactNode }> = [
  { label: 'Headquarters:', value: 'Ahmedabad, Gujarat, India' },
  { label: 'Core Focus:', value: <>Tactical UGVs &bull; Magnetic Climbing NDT Robots</> },
  { label: 'Founded By:', value: <>Anmol Agrawal (Founder &amp; Chief Robotics Architect)</> },
  { label: 'Core Technologies:', value: '3D LiDAR SLAM, ROS 2, NVIDIA Edge AI, COFDM Mesh' },
  { label: 'Media Contact:', value: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> },
];

interface AssetCard {
  readonly icon: ReactNode;
  readonly title: ReactNode;
  readonly body: string;
  readonly action: { readonly kind: 'download'; readonly href: string; readonly label: string } | { readonly kind: 'link'; readonly label: string };
  readonly contactCard?: boolean;
}

const ASSET_CARDS: readonly AssetCard[] = [
  {
    icon: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
    title: <>Brand Logos &amp; Identity</>,
    body: 'Official ARNOBOT vector logos in dark, light, SVG, EPS, and high-res transparent PNG formats.',
    action: { kind: 'download', href: '/assets/images/logo.png', label: 'Download Logo Pack (PNG)' },
  },
  {
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </>
    ),
    title: 'High-Res Product Renders',
    body: '4K studio and tactical field captures of SAIBYA UGV, ALTIUS Climber, and Ground Station UI.',
    action: { kind: 'download', href: '/assets/images/saibya-field.webp', label: 'Download Product Imagery' },
  },
  {
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </>
    ),
    title: 'Company Factsheet (PDF)',
    body: 'Key statistics, leadership profiles, patent listings, and core technology capability summaries.',
    action: { kind: 'link', label: 'Request Official Factsheet' },
  },
];

/** Port of media-kit.php */
export default function MediaKitPage() {
  return (
    <main className="media-kit-page">
      <section className="blog-hero media-kit-hero" id="media-kit-hero" data-cinematic-hero>
        <div className="blog-hero-container">
          <div className="blog-hero-content reveal">
            <span className="eyebrow">Brand &amp; Press Resources</span>
            <h1 className="russo">
              Media Kit &amp;
              <br />
              Brand Assets
            </h1>
          </div>
        </div>
      </section>

      <Ticker items={TICKER_ITEMS} label="Brand & Innovation Ticker" />

      <div className="mk-main-container">
        <section className="mk-section reveal" id="boilerplate">
          <div className="mk-section-header">
            <span className="eyebrow">Company Overview</span>
            <h2 className="russo">About ARNOBOT &amp; Official Boilerplate</h2>
            <p className="mk-section-desc">
              Approved corporate descriptions for media, journalists, publications, and event organizers.
            </p>
          </div>

          <div className="mk-boilerplate-grid">
            <BoilerplateCard text={BOILERPLATE} />

            <div className="mk-fast-facts-card">
              <h4 className="russo">Key Company Fast Facts</h4>
              <ul className="mk-facts-list">
                {FAST_FACTS.map((fact) => (
                  <li key={fact.label}>
                    <strong>{fact.label}</strong>
                    <span>{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mk-section reveal" id="brand-resources">
          <div className="mk-section-header">
            <span className="eyebrow">Brand &amp; Media Kit</span>
            <h2 className="russo">Official Press Assets &amp; Brand Resources</h2>
            <p className="mk-section-desc">
              High-resolution logos, product photography, founder biographies, and official fact sheets for journalists
              and accredited publications.
            </p>
          </div>

          <div className="media-kit-grid">
            {ASSET_CARDS.map((card) => (
              <div className="media-kit-card" key={card.action.label}>
                <div className="media-kit-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#2563eb" strokeWidth="2" aria-hidden="true">
                    {card.icon}
                  </svg>
                </div>
                <h4 className="russo">{card.title}</h4>
                <p>{card.body}</p>
                {card.action.kind === 'download' ? (
                  <a href={card.action.href} download className="media-download-btn">
                    <DownloadIcon size={14} />
                    {card.action.label}
                  </a>
                ) : (
                  <Link href="/contact" className="media-download-btn">
                    <DownloadIcon size={14} />
                    {card.action.label}
                  </Link>
                )}
              </div>
            ))}

            <div className="media-kit-card media-kit-contact-card">
              <div className="media-kit-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#00f0ff" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h4 className="russo">Press &amp; Interview Inquiries</h4>
              <p>For press inquiries, executive interview requests, or speaker engagements, contact our PR team:</p>
              <Link href="/contact" className="btn btn-cta-primary" style={{ marginTop: '14px', fontSize: '12.5px' }}>
                Contact Press Desk &rarr;
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Cta />
    </main>
  );
}
