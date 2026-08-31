import type { Metadata } from 'next';
import LegalPage, { LegalContactCard, LegalHighlight, type LegalSection } from '@/components/sections/legal/LegalPage';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions governing use of the ARNOBOT website, demos and robotic platforms.',
};

const SECTIONS: readonly LegalSection[] = [
  {
    id: 'term-1',
    number: '01',
    tocLabel: 'Acceptance of Terms',
    heading: 'Acceptance of Terms',
    content: (
      <>
        <p className="legal-text">
          Welcome to Arnobot Private Limited (<strong>&quot;ARNOBOT&quot;</strong>). By accessing our website (
          <a href="https://arnobot.in" className="legal-link">
            arnobot.in
          </a>
          ), scheduling a live field trial, downloading technical brochures, or entering into a commercial deployment for
          our autonomous robotic platforms (including SAIBYA, ATM, NEXUS, ALTIUS), you acknowledge that you have read,
          understood, and agreed to be legally bound by these Terms and Conditions.
        </p>
        <p className="legal-text">
          If you represent a corporate body, defense agency, or academic institution, you warrant that you have full
          legal authority to bind that organization to these terms.
        </p>
      </>
    ),
  },
  {
    id: 'term-2',
    number: '02',
    tocLabel: <>Product Specifications &amp; Demos</>,
    heading: <>Product Specifications &amp; Demonstrations</>,
    content: (
      <>
        <p className="legal-text">
          All specifications, payload capacities, speed ratings, and dimensional drawings presented on our website and
          marketing brochures are engineering benchmarks calculated under controlled test conditions.
        </p>
        <ul className="legal-list">
          <li>
            ARNOBOT reserves the right to modify hardware configurations, sensor payloads, or autonomous algorithms as
            part of ongoing product enhancements without prior notice.
          </li>
          <li>
            Scheduling a demonstration through our website constitutes an expression of interest and is subject to
            operational feasibility, geographic location, and formal confirmation by our engineering team.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'term-3',
    number: '03',
    tocLabel: <>Field Safety &amp; Operation</>,
    heading: <>Field Safety &amp; Operational Protocols</>,
    content: (
      <>
        <p className="legal-text">
          Operating unmanned ground vehicles, heavy payload rovers, and vertical magnetic climbing robots involves
          inherent kinetic and electromagnetic factors. Operators and demo attendees agree to adhere strictly to the
          following safety protocols:
        </p>
        <ul className="legal-list">
          <li>
            <strong>Qualified Personnel:</strong> Only certified ARNOBOT systems engineers or client personnel who have
            undergone official training are authorized to pilot robotic platforms during trials.
          </li>
          <li>
            <strong>Emergency Stop &amp; Geofencing:</strong> Operational boundaries, optical line-of-sight, and remote
            emergency stop (E-Stop) switches must remain active and functional at all times during autonomous
            navigation.
          </li>
          <li>
            <strong>Ferromagnetic Surface Inspection:</strong> Deployment of ALTIUS climbing units on storage tanks or
            ship hulls requires structural surface clearance verifying adequate magnetic permeability and load-bearing
            safety.
          </li>
        </ul>
        <LegalHighlight>
          <strong>Hazardous Zone Deployment:</strong> Operation in explosive or chemically hazardous atmospheres requires
          customized, certified intrinsically safe enclosures and specific pre-trial site authorization.
        </LegalHighlight>
      </>
    ),
  },
  {
    id: 'term-4',
    number: '04',
    tocLabel: 'Intellectual Property Rights',
    heading: 'Intellectual Property Rights',
    content: (
      <>
        <p className="legal-text">
          All proprietary technology, mechanical chassis designs, PCB layouts, firmware, SLAM navigation software, SLAM
          laser visualization, logos, trademarks (including <strong>ARNOBOT™</strong>, <strong>SAIBYA™</strong>,{' '}
          <strong>ATM™</strong>, <strong>NEXUS™</strong>, <strong>ALTIUS™</strong>), and digital media are the exclusive
          intellectual property of Arnobot Private Limited.
        </p>
        <ul className="legal-list">
          <li>
            You may not reverse-engineer, decompile, disassemble, clone, or replicate any mechanical or electronic
            component of ARNOBOT robotic systems.
          </li>
          <li>
            Content from our website and media kit may only be reproduced for non-commercial editorial press coverage
            with appropriate attribution to ARNOBOT.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'term-5',
    number: '05',
    tocLabel: <>Software &amp; GCS Licensing</>,
    heading: <>Software &amp; GCS Licensing</>,
    content: (
      <p className="legal-text">
        Software provided with ARNOBOT systems (such as our Ground Control Station cockpit, navigation stack, and
        telemetry dashboards) is licensed, not sold. Clients receive a non-exclusive, non-transferable license strictly
        for operating the designated hardware platform in accordance with the signed Master Services Agreement (MSA).
      </p>
    ),
  },
  {
    id: 'term-6',
    number: '06',
    tocLabel: <>Warranties &amp; Disclaimers</>,
    heading: <>Warranties &amp; Disclaimers</>,
    content: (
      <>
        <p className="legal-text">
          Except as explicitly provided in a separate written commercial contract or warranty deed:
        </p>
        <ul className="legal-list">
          <li>
            Information on this website is provided on an <strong>&quot;as is&quot;</strong> and{' '}
            <strong>&quot;as available&quot;</strong> basis without warranties of any kind, whether express or implied.
          </li>
          <li>
            ARNOBOT does not warrant that website functionality or remote telemetry servers will be uninterrupted or
            error-free in all geographic terrain or electronic-countermeasure environments.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'term-7',
    number: '07',
    tocLabel: 'Limitation of Liability',
    heading: 'Limitation of Liability',
    content: (
      <>
        <p className="legal-text">
          To the maximum extent permitted under applicable law, Arnobot Private Limited, its directors, officers, and
          engineers shall not be liable for any indirect, incidental, special, punitive, or consequential damages
          resulting from:
        </p>
        <ul className="legal-list">
          <li>Unauthorized modification or third-party payload integration with ARNOBOT platforms.</li>
          <li>Failure of client-provided telemetry networks, mesh radios, or GPS signals in denied zones.</li>
          <li>Operational downtime, loss of commercial data, or business interruption during trial evaluations.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'term-8',
    number: '08',
    tocLabel: <>Confidentiality &amp; NDA</>,
    heading: <>Confidentiality &amp; Non-Disclosure</>,
    content: (
      <p className="legal-text">
        Commercial quotations, custom payload engineering diagrams, and proprietary trial performance benchmarks shared
        during business engagements are strictly confidential. Both parties agree to protect such confidential
        information using the same degree of care used for their own proprietary data.
      </p>
    ),
  },
  {
    id: 'term-9',
    number: '09',
    tocLabel: <>Governing Law &amp; Jurisdiction</>,
    heading: <>Governing Law &amp; Dispute Resolution</>,
    content: (
      <>
        <p className="legal-text">
          These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of
          India. Any disputes, claims, or controversies arising out of or in connection with these terms shall be
          subject to the exclusive jurisdiction of the competent courts in{' '}
          <strong>Ahmedabad, Gujarat, India</strong>.
        </p>
        <LegalContactCard
          heading="Legal Inquiries & Corporate Communication"
          items={[
            { label: 'Legal Department:', value: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> },
            {
              label: 'Registered Office:',
              value: <span>G-2, Parul Apartments, Satellite Road, Ahmedabad – 380015, Gujarat, India</span>,
            },
          ]}
        />
      </>
    ),
  },
];

/** Port of terms-conditions.php (terms.php simply required this page). */
export default function TermsConditionsPage() {
  return (
    <LegalPage title="Terms & Conditions" heroId="terms-hero" heroModifier="legal-hero-terms" sections={SECTIONS} />
  );
}
