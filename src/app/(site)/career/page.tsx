import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import CareerForm from '@/components/forms/CareerForm';
import FormAlert from '@/components/forms/FormAlert';
import { CheckCircleIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/ui/Icons';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Build the robots that change the world — join the ARNOBOT engineering team.',
};

const ORBIT_RINGS: ReadonlyArray<{ readonly modifier: 1 | 2; readonly dots: ReadonlyArray<[string, string]> }> = [
  { modifier: 1, dots: [['AI', '0deg'], ['ROS', '120deg'], ['ML', '240deg']] },
  { modifier: 2, dots: [['HW', '60deg'], ['FW', '180deg'], ['CV', '300deg']] },
];

interface PageProps {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/** Port of career.php */
export default async function CareerPage({ searchParams }: PageProps) {
  const { success, error } = await searchParams;

  return (
    <main>
      <section className="career-hero" id="career-hero" data-cinematic-hero>
        <div className="career-hero-bg-wrap">
          <div className="career-hero-particles" id="career-particles" />
          <div className="career-hero-grid-overlay" />
        </div>

        <div className="career-hero-container">
          <div className="career-hero-content reveal">
            <span className="eyebrow">Join Our Mission</span>
            <h1 className="russo career-hero-title">
              Build the Robots
              <br />
              That Change the World
            </h1>
          </div>

          <div className="career-hero-visual reveal" aria-hidden="true">
            <div className="career-orbit-wrap">
              {ORBIT_RINGS.map((ring) => (
                <div className={`career-orbit-ring career-orbit-ring--${ring.modifier}`} key={ring.modifier}>
                  {ring.dots.map(([label, angle]) => (
                    <div className="career-orbit-dot" style={{ ['--angle' as string]: angle }} key={label}>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="career-center-badge">
                <span className="russo">{SITE.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="career-form-section reveal" id="career-form">
        <div className="career-form-container">
          <div className="career-form-left">
            <span className="eyebrow">Apply Now</span>
            <h2 className="russo career-form-title">
              Start Your Journey
              <br />
              with ARNOBOT
            </h2>
            <p className="career-form-desc">
              Ready to build the future? Submit your resume and tell us what drives you. Whether you&apos;re a seasoned
              engineer or a fresh grad with big ideas — we&apos;d love to hear from you.
            </p>

            <div className="career-form-info">
              <div className="career-form-info-item">
                <PhoneIcon size={18} />
                <span>{SITE.phone}</span>
              </div>
              <div className="career-form-info-item">
                <MailIcon size={18} />
                <span>{SITE.email}</span>
              </div>
              <div className="career-form-info-item">
                <PinIcon size={18} />
                <span>
                  {SITE.addressLines.map((line, index) => (
                    <Fragment key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="career-form-right">
            <FormAlert success={success} error={error} />
            <CareerForm />

            {/* Styled by style.css; shown by the theme once an application succeeds. */}
            <div className="career-success" id="career-success" aria-live="polite">
              <div className="career-success-icon">
                <CheckCircleIcon size={56} strokeWidth="1.8" />
              </div>
              <h3 className="russo">Application Received!</h3>
              <p>
                Thank you for applying to ARNOBOT. Our team will review your profile and reach out within 5 business
                days. We&apos;re excited to learn more about you!
              </p>
              <Link href="/career" className="btn" style={{ marginTop: '24px' }}>
                Back to Careers
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
