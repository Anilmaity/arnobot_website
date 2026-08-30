import type { Metadata } from 'next';
import LegalPage, { LegalContactCard, LegalHighlight, type LegalSection } from '@/components/sections/legal/LegalPage';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Arnobot Private Limited collects, stores, transfers and processes personal and telemetry data.',
};

const SECTIONS: readonly LegalSection[] = [
  {
    id: 'section-1',
    number: '01',
    tocLabel: <>Overview &amp; Scope</>,
    heading: <>Overview &amp; Scope</>,
    content: (
      <>
        <p className="legal-text">
          Arnobot Private Limited (<strong>&quot;ARNOBOT&quot;</strong>, <strong>&quot;we&quot;</strong>,{' '}
          <strong>&quot;us&quot;</strong>, or <strong>&quot;our&quot;</strong>), headquartered in Ahmedabad, Gujarat,
          India, is committed to safeguarding the privacy and confidentiality of individuals, partners, defense and
          industrial clients who interact with our website (
          <a href="https://arnobot.in" style={{ color: '#2563eb', textDecoration: 'none' }}>
            arnobot.in
          </a>
          ), Ground Control Station (GCS) software, autonomous unmanned ground vehicles (UGVs), magnetic climbing
          robots, and field demonstration services.
        </p>
        <p className="legal-text">
          This Privacy Policy explains our practices regarding the collection, storage, transfer, and processing of
          personal identifiers, business contact information, and technical sensor data collected during client trials,
          demo requests, and website interactions.
        </p>
      </>
    ),
  },
  {
    id: 'section-2',
    number: '02',
    tocLabel: 'Information We Collect',
    heading: 'Information We Collect',
    content: (
      <>
        <p className="legal-text">
          We collect information that you directly provide to us, as well as data automatically generated when utilizing
          our platforms:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Direct Communications &amp; Demo Inquiries:</strong> Full name, professional email address, phone
            number, organization / defense establishment name, designation, and specific operational payload
            requirements submitted via demo scheduling and contact forms.
          </li>
          <li>
            <strong>Recruitment &amp; Careers:</strong> Resumes, CVs, portfolio links, academic credentials, and work
            history submitted through our career portal.
          </li>
          <li>
            <strong>Technical &amp; Log Data:</strong> IP address, device fingerprints, browser version, access
            timestamps, referring URLs, and operating system details collected automatically for site security.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-3',
    number: '03',
    tocLabel: <>Robotics &amp; Telemetry Data</>,
    heading: <>Robotics &amp; Telemetry Data</>,
    content: (
      <>
        <p className="legal-text">
          During deployment, validation trials, or software integration with ARNOBOT robotic platforms (such as SAIBYA,
          ATM, NEXUS, or ALTIUS), our on-board compute and GCS systems may process specialized operational datasets:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Vehicle Telemetry:</strong> Motor currents, battery health metrics, IMU orientation, velocity, wheel
            odometry, and system temperature logs.
          </li>
          <li>
            <strong>Spatial &amp; Environmental Data:</strong> LiDAR point clouds, ultrasonic depth readings, and
            localized SLAM map coordinates used exclusively for autonomous obstacle avoidance and path planning.
          </li>
          <li>
            <strong>Video &amp; Sensor Feeds:</strong> Optical and thermal video feeds streamed over encrypted links are
            processed locally on the client&apos;s designated Ground Control Station and are never stored or transmitted
            to external servers without explicit written authorization.
          </li>
        </ul>
        <LegalHighlight>
          <strong>Defense &amp; Confidential Site Notice:</strong> All mapping, point-cloud, and visual telemetry
          collected during non-disclosure-governed defense or industrial trials remain the exclusive property of the
          client and are sanitized in compliance with national security guidelines.
        </LegalHighlight>
      </>
    ),
  },
  {
    id: 'section-4',
    number: '04',
    tocLabel: <>Purpose &amp; Data Usage</>,
    heading: <>Purpose &amp; Data Usage</>,
    content: (
      <>
        <p className="legal-text">
          We utilize the collected information strictly for legitimate commercial and engineering purposes:
        </p>
        <ul className="legal-list">
          <li>To schedule, coordinate, and execute live robotic trials and product demonstrations.</li>
          <li>To respond to technical inquiries, send requested product brochures, and provide quotation details.</li>
          <li>
            To enhance robotics firmware stability, improve GCS user interfaces, and develop autonomous navigation
            models.
          </li>
          <li>To prevent fraud, secure network infrastructure, and comply with applicable statutory laws in India.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-5',
    number: '05',
    tocLabel: <>Data Storage &amp; Security</>,
    heading: <>Data Storage &amp; Security</>,
    content: (
      <>
        <p className="legal-text">
          ARNOBOT implements defense-grade physical, administrative, and technological security controls to prevent
          unauthorized access, alteration, or disclosure:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Encryption:</strong> All web communications are protected using TLS 1.3 encryption. Radio telemetry
            links between UGVs and GCS utilize AES-128/256 bit encrypted protocols.
          </li>
          <li>
            <strong>Access Controls:</strong> Client inquiry data and engineering logs are accessible solely to vetted
            personnel on a strict need-to-know basis with multi-factor authentication.
          </li>
          <li>
            <strong>Data Retention:</strong> Business inquiries are retained only for as long as necessary to fulfill the
            operational engagement or as required by Indian commercial records statutes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-6',
    number: '06',
    tocLabel: 'Third-Party Disclosures',
    heading: 'Third-Party Disclosures',
    content: (
      <>
        <p className="legal-text">
          <strong>We do not sell, rent, or trade your personal or telemetry data to third parties.</strong> Data may only
          be shared under the following limited circumstances:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Trusted Service Providers:</strong> Secure cloud hosting, enterprise email, and CRM providers bound
            by strict confidentiality and data protection agreements.
          </li>
          <li>
            <strong>Legal &amp; Regulatory Authorities:</strong> When mandated by valid court orders, government
            authorities, or law enforcement agencies under applicable Indian laws.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-7',
    number: '07',
    tocLabel: <>Cookies &amp; Tracking</>,
    heading: <>Cookies &amp; Tracking Technologies</>,
    content: (
      <p className="legal-text">
        Our website uses minimal, essential cookies required for site security, session maintenance, and anonymous
        traffic performance analytics. You can configure your browser to reject non-essential cookies without affecting
        core website navigation.
      </p>
    ),
  },
  {
    id: 'section-8',
    number: '08',
    tocLabel: <>Your Rights &amp; Choices</>,
    heading: <>Your Rights &amp; Choices</>,
    content: (
      <>
        <p className="legal-text">
          Under the Digital Personal Data Protection Act and applicable privacy regulations, you possess the right to:
        </p>
        <ul className="legal-list">
          <li>Request confirmation and a summary of personal information processed by ARNOBOT.</li>
          <li>Request correction or updating of inaccurate personal or business contact records.</li>
          <li>Request erasure of your personal data from our inquiry database, subject to legal retention obligations.</li>
          <li>Withdraw consent for marketing communications at any time.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'section-9',
    number: '09',
    tocLabel: <>Grievance &amp; Contact</>,
    heading: <>Grievance Officer &amp; Contact Details</>,
    content: (
      <>
        <p className="legal-text">
          If you have questions, concerns, or wish to exercise your data privacy rights, please contact our designated
          Grievance Officer:
        </p>
        <LegalContactCard
          heading="ARNOBOT Data Governance Office"
          items={[
            { label: 'Company Name:', value: <span>Arnobot Private Limited</span> },
            { label: 'Email Address:', value: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> },
            { label: 'Contact Number:', value: <span>{SITE.phone}</span> },
            {
              label: 'Headquarters Address:',
              value: <span>G-2, Parul Apartments, Satellite Road, Ahmedabad – 380015, Gujarat, India</span>,
            },
          ]}
        />
      </>
    ),
  },
];

/** Port of privacy-policy.php */
export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" heroId="privacy-hero" sections={SECTIONS} />;
}
