import type { Metadata } from 'next';
import Link from 'next/link';
import Cta from '@/components/sections/Cta';
import WhyChooseBackdrop from '@/components/svg/WhyChooseBackdrop';

export const metadata: Metadata = {
  title: 'Company',
  description:
    'ARNOBOT is an emerging Indian robotics startup building intelligent unmanned ground vehicles for defence, industrial, maritime, and critical infrastructure applications.',
};

const WHY_ITEMS: ReadonlyArray<{ readonly icon: string; readonly alt: string; readonly label: readonly [string, string] }> = [
  { icon: '/assets/icons/mission.png', alt: 'Target Icon', label: ['Mission-Critical', 'Reliability'] },
  { icon: '/assets/icons/endtoend.png', alt: 'Gears Icon', label: ['End-to-End', 'Development'] },
  { icon: '/assets/icons/innovation.png', alt: 'Rocket Icon', label: ['Innovation-Driven', 'Engineering'] },
  { icon: '/assets/icons/icon4.png', alt: 'India Icon', label: ['Proudly Made', 'in India'] },
];

const FACILITY_ITEMS: ReadonlyArray<{ readonly image: string; readonly label: string }> = [
  { image: '/assets/images/designassmbly1.jpg', label: 'Design & Assembly' },
  { image: '/assets/images/lab1.jpg', label: 'Electronics Lab' },
  { image: '/assets/images/proto.jpg', label: 'Prototyping Lab' },
  { image: '/assets/images/soft.jpg', label: 'Software Development' },
];

/** Port of about.php */
export default function AboutPage() {
  return (
    <main>
      <section className="about-hero" id="about-hero">
        <div className="about-hero-container">
          <div className="about-hero-content">
            <span className="eyebrow">About Us</span>
            <h1 className="russo">
              Where Innovation
              <br />
              Meets Automation
            </h1>
          </div>
          <div className="about-hero-image">
            <img src="/assets/images/abt-hero.png" alt="ARNOBOT Robots" />
          </div>
        </div>
      </section>

      <section className="about-story reveal" id="about-story">
        <div className="about-story-icon">
          <img src="/assets/images/robot-gear.png" alt="" />
        </div>
        <div className="about-story-container">
          <div className="about-story-header">
            <div className="about-story-title">
              <span className="eyebrow">Our Story</span>
              <h2 className="russo">
                From Ideas to <br />
                Impact
              </h2>
            </div>
          </div>
          <div className="about-story-content">
            <p>
              ARNOBOT is an emerging Indian robotics startup building intelligent unmanned ground vehicles (UGVs) for
              defence, industrial, maritime, and critical infrastructure applications. By combining AI, robotics, and
              autonomous technologies, ARNOBOT is shaping the future of unmanned mobility with safer, smarter, and more
              efficient robotic solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="why-choose-us reveal" id="why-choose-us">
        <WhyChooseBackdrop />
        <div className="why-choose-us-container">
          <div className="why-choose-us-left">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="russo">
              Engineered for Reliability.
              <br />
              Built for Impact.
            </h2>
            <p className="why-choose-us-desc">
              At Arnobot, we build autonomous systems that enhance safety and efficiency.
            </p>

            <div className="why-choose-us-grid">
              {WHY_ITEMS.map((item) => (
                <div className="why-item" key={item.label.join(' ')}>
                  <div className="why-icon">
                    <img src={item.icon} alt={item.alt} />
                  </div>
                  <span className="why-label">
                    {item.label[0]}
                    <br />
                    {item.label[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="why-choose-us-right" />
        </div>
      </section>

      <section className="vision-mission reveal" id="vision-mission">
        <div className="vision-mission-container">
          <div className="vision-mission-cards">
            <div className="vision-mission-card">
              <div className="card-icon">
                <img src="/assets/icons/mission.png" alt="" />
              </div>
              <h3 className="russo">Our Vision</h3>
              <p>Arnobot visions is to become a global leader in robotics-driven asset lifecycle management.</p>
            </div>

            <div className="vision-mission-card">
              <div className="card-icon">
                <img src="/assets/icons/mission.png" alt="" />
              </div>
              <h3 className="russo">Our Mission</h3>
              <p>
                Arnobot&apos;s mission is to make industrial maintenance safer, smarter, and more efficient through
                intelligent robotics.
              </p>
            </div>

            <div className="vision-mission-card">
              <div className="card-icon">
                <img src="/assets/icons/mission.png" alt="" />
              </div>
              <h3 className="russo">Values</h3>
              <ul>
                <li>Engineering Excellence</li>
                <li>Safety First</li>
                <li>Client-Centric Innovation</li>
                <li>Data-Driven Decisions</li>
                <li>Made in India</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="leadership reveal" id="leadership">
        <div className="leadership-container">
          <h2 className="russo section-title">Our Leadership</h2>

          <div className="founder-message-wrap">
            <div className="founder-quote-body">
              <p>
                I am hopeful that our mission will instill the importance of our vision to our current team, as well as
                attract new engineers and partners with shared ambition. Arnobot is a mission-focused robotics company,
                and clarity around our technological focus empowers our team to make the highest-impact decisions for
                long-term safety and industrial automation.
              </p>
              <p>
                If you share our commitment to building intelligent unmanned systems for extreme environments, please
                explore our{' '}
                <Link href="/career" className="inline-link">
                  careers
                </Link>{' '}
                and technological solutions.
              </p>
              <p className="founder-closing">
                With strong engineering conviction, there is the potential to redefine autonomous robotics.
              </p>
            </div>

            <div className="founder-profile-block">
              <div className="founder-photo-box">
                <img src="/assets/images/ceo.jpg" alt="Anmol Shah" />
              </div>
              <div className="founder-sig-meta">
                <img src="/assets/images/sign1.png" alt="Anmol Shah signature" className="founder-signature-img" />
                <h3 className="founder-name">Anmol Shah</h3>
                <span className="founder-title">Founder &amp; CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="facility reveal" id="facility">
        <div className="facility-container">
          <div className="facility-grid">
            <div className="facility-left">
              <span className="eyebrow">Our Facility</span>
              <h2 className="russo">
                Build
                <br />
                In-House
              </h2>
            </div>

            <div className="facility-right">
              <div className="facility-gallery">
                {FACILITY_ITEMS.map((item) => (
                  <div className="facility-item" key={item.label}>
                    <div className="facility-photo">
                      <img src={item.image} alt={item.label} />
                    </div>
                    <span className="facility-label">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="facility-caption">
                <div className="facility-caption-icon">
                  <img src="/assets/icons/check.png" alt="" />
                </div>
                <p>Design, Manufacturing, Electronics, Software Development &amp; Rapid Prototyping under one roof.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </main>
  );
}
